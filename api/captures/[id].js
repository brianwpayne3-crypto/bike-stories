import { get, list } from "@vercel/blob";

async function streamToText(stream) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let text = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    text += decoder.decode(value, { stream: true });
  }

  text += decoder.decode();
  return text;
}

async function readJson(pathname) {
  const result = await get(pathname, { access: "private", useCache: false });
  if (!result || result.statusCode !== 200) return null;
  return JSON.parse(await streamToText(result.stream));
}

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", ["GET"]);
    return response.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { id } = request.query;
  if (!id || Array.isArray(id)) {
    return response.status(400).json({ ok: false, error: "Capture ID required" });
  }

  const { blobs } = await list({ prefix: "captures/" });
  const blob = blobs.find((candidate) => candidate.pathname.endsWith(`/${id}.json`));

  if (!blob) {
    return response.status(404).json({ ok: false, error: "Capture not found" });
  }

  const capture = await readJson(blob.pathname);
  if (!capture) {
    console.error("BIKE_STORIES_CAPTURE_READ_FAILED", blob.pathname);
    return response.status(502).json({ ok: false, error: "Could not read capture" });
  }

  const enrichmentPathname = `enrichments/flickr/${id}.json`;
  const flickr = await readJson(enrichmentPathname).catch(() => null);

  return response.status(200).json({
    ...capture,
    flickrPhotoId: flickr?.flickrPhotoId ?? capture.flickrPhotoId ?? null,
    enrichments: { flickr: flickr ?? null },
  });
}
