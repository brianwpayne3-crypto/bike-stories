import { get, list, put } from "@vercel/blob";
import OAuth from "oauth-1.0a";
import crypto from "node:crypto";

const FLICKR_REST_URL = "https://www.flickr.com/services/rest/";

async function streamToText(stream) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let text = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    text += decoder.decode(value, { stream: true });
  }
  return text + decoder.decode();
}

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function oauthClient() {
  return new OAuth({
    consumer: { key: requiredEnv("FLICKR_API_KEY"), secret: requiredEnv("FLICKR_API_SECRET") },
    signature_method: "HMAC-SHA1",
    hash_function(baseString, key) {
      return crypto.createHmac("sha1", key).update(baseString).digest("base64");
    },
  });
}

async function flickrCall(method, params = {}) {
  const oauth = oauthClient();
  const token = {
    key: requiredEnv("FLICKR_ACCESS_TOKEN"),
    secret: requiredEnv("FLICKR_ACCESS_SECRET"),
  };
  const query = new URLSearchParams({ method, format: "json", nojsoncallback: "1", ...params });
  const url = `${FLICKR_REST_URL}?${query}`;
  const auth = oauth.toHeader(oauth.authorize({ url, method: "GET" }, token));
  const result = await fetch(url, { headers: auth });
  if (!result.ok) throw new Error(`Flickr HTTP ${result.status} from ${method}`);
  const payload = await result.json();
  if (payload.stat !== "ok") throw new Error(`Flickr API error from ${method}: ${payload.message || payload.code}`);
  return payload;
}

function metadataValue(metadata, group, key) {
  return metadata?.[group]?.[key] ?? metadata?.[key] ?? null;
}

function sourceFingerprint(capture) {
  const metadata = capture.metadata || {};
  const dateTimeOriginal = metadataValue(metadata, "{Exif}", "DateTimeOriginal");
  const subsec = metadataValue(metadata, "{Exif}", "SubsecTimeOriginal");
  const offset = metadataValue(metadata, "{Exif}", "OffsetTimeOriginal");
  const width = Number(metadataValue(metadata, "{Exif}", "PixelXDimension") || metadata.PixelWidth || 0);
  const height = Number(metadataValue(metadata, "{Exif}", "PixelYDimension") || metadata.PixelHeight || 0);
  if (!dateTimeOriginal || !width || !height) throw new Error("Capture lacks required EXIF timestamp/dimensions");
  return { dateTimeOriginal, subsec: subsec == null ? null : String(subsec), offset, width, height };
}

function flickrDate(value) {
  return value.replace(/^(\d{4}):(\d{2}):(\d{2})/, "$1-$2-$3");
}

function shiftSeconds(dateString, seconds) {
  const [datePart, timePart] = flickrDate(dateString).split(" ");
  const [y, m, d] = datePart.split("-").map(Number);
  const [hh, mm, ss] = timePart.split(":").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d, hh, mm, ss + seconds));
  return date.toISOString().slice(0, 19).replace("T", " ");
}

async function originalDimensions(photoId) {
  const payload = await flickrCall("flickr.photos.getSizes", { photo_id: photoId });
  const largest = payload.sizes.size.reduce((best, size) => {
    const area = Number(size.width) * Number(size.height);
    const bestArea = Number(best.width) * Number(best.height);
    return area > bestArea ? size : best;
  });
  return { width: Number(largest.width), height: Number(largest.height) };
}

function exifMap(payload) {
  const result = {};
  for (const item of payload?.photo?.exif || []) {
    const value = item?.raw?._content ?? item?.clean?._content ?? null;
    if (value != null) {
      if (item.tag) result[item.tag.toLowerCase()] = String(value);
      if (item.label) result[item.label.toLowerCase()] = String(value);
    }
  }
  return result;
}

function pickExif(map, names) {
  for (const name of names) {
    if (map[name.toLowerCase()] != null) return map[name.toLowerCase()];
  }
  return null;
}

async function exactExifMatches(photoId, source) {
  const payload = await flickrCall("flickr.photos.getExif", { photo_id: photoId });
  const map = exifMap(payload);
  const date = pickExif(map, ["DateTimeOriginal", "Date and Time (Original)"]);
  const subsec = pickExif(map, ["SubSecTimeOriginal", "SubsecTimeOriginal", "Sub-Sec Time Original"]);
  const sourceDate = flickrDate(source.dateTimeOriginal);
  const dateMatches = date ? flickrDate(date) === sourceDate : false;
  const subsecMatches = source.subsec == null ? true : subsec === source.subsec;
  return { date, subsec, dateMatches, subsecMatches, exact: dateMatches && subsecMatches };
}

async function readCapture(id) {
  const { blobs } = await list({ prefix: "captures/" });
  const blob = blobs.find((candidate) => candidate.pathname.endsWith(`/${id}.json`));
  if (!blob) return null;
  const result = await get(blob.pathname, { access: "private", useCache: false });
  if (!result || result.statusCode !== 200) throw new Error("Could not read capture");
  return { capture: JSON.parse(await streamToText(result.stream)), pathname: blob.pathname };
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", ["POST"]);
    return response.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const { id } = request.query;
    if (!id || Array.isArray(id)) return response.status(400).json({ ok: false, error: "Capture ID required" });
    const stored = await readCapture(id);
    if (!stored) return response.status(404).json({ ok: false, error: "Capture not found" });

    const source = sourceFingerprint(stored.capture);
    const search = await flickrCall("flickr.photos.search", {
      user_id: "me",
      min_taken_date: shiftSeconds(source.dateTimeOriginal, -120),
      max_taken_date: shiftSeconds(source.dateTimeOriginal, 120),
      extras: "date_taken",
      per_page: "100",
    });

    const dimensionMatches = [];
    for (const photo of search.photos.photo || []) {
      const dimensions = await originalDimensions(photo.id);
      const matches = (dimensions.width === source.width && dimensions.height === source.height) ||
        (dimensions.width === source.height && dimensions.height === source.width);
      if (matches) dimensionMatches.push({ ...photo, dimensions });
    }

    const inspected = [];
    for (const photo of dimensionMatches) {
      inspected.push({ ...photo, exif: await exactExifMatches(photo.id, source) });
    }
    const exact = inspected.filter((photo) => photo.exif.exact);

    const status = exact.length === 1 ? "matched" : exact.length === 0 ? "no-match" : "ambiguous";
    const enrichment = {
      captureId: id,
      resolvedAt: new Date().toISOString(),
      status,
      flickrPhotoId: exact.length === 1 ? exact[0].id : null,
      sourceFingerprint: source,
      candidateCount: (search.photos.photo || []).length,
      dimensionMatchCount: dimensionMatches.length,
      exactMatchCount: exact.length,
      candidates: inspected.map((photo) => ({ id: photo.id, datetaken: photo.datetaken, dimensions: photo.dimensions, exif: photo.exif })),
    };

    const pathname = `enrichments/flickr/${id}.json`;
    await put(pathname, JSON.stringify(enrichment, null, 2), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    console.log("BIKE_STORIES_FLICKR_RESOLVED", JSON.stringify({ captureId: id, status, flickrPhotoId: enrichment.flickrPhotoId }));
    return response.status(status === "matched" ? 200 : 409).json({ ok: status === "matched", ...enrichment, enrichmentPathname: pathname });
  } catch (error) {
    console.error("BIKE_STORIES_FLICKR_RESOLVE_FAILED", error);
    return response.status(500).json({ ok: false, error: error.message });
  }
}
