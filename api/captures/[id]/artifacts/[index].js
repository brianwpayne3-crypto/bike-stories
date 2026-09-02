import { get } from "@vercel/blob";

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

async function readJsonBlob(pathname) {
  const result = await get(pathname, { access: "private", useCache: false });
  if (!result || result.statusCode !== 200) return null;
  return JSON.parse(await streamToText(result.stream));
}

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", ["GET"]);
    return response.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const { id, index, format } = request.query;
    if (!id || Array.isArray(id)) return response.status(400).json({ ok: false, error: "Capture ID required" });
    const artifactIndex = Number(index);
    if (!Number.isInteger(artifactIndex) || artifactIndex < 0) return response.status(400).json({ ok: false, error: "Valid artifact index required" });

    const enrichment = await readJsonBlob(`enrichments/flickr/${id}.json`);
    if (!enrichment) return response.status(404).json({ ok: false, error: "Flickr enrichment not found" });
    const artifact = enrichment.artifacts?.find((item) => item.artifactIndex === artifactIndex);
    if (!artifact) return response.status(404).json({ ok: false, error: "Artifact not found" });
    if (artifact.status !== "matched" || !artifact.imageSource) return response.status(409).json({ ok: false, error: "Artifact is not uniquely resolved" });

    const image = await fetch(artifact.imageSource);
    if (!image.ok) throw new Error(`Flickr image fetch failed with HTTP ${image.status}`);
    const contentType = image.headers.get("content-type") || "image/jpeg";
    const bytes = Buffer.from(await image.arrayBuffer());
    response.setHeader("Cache-Control", "private, max-age=300");
    response.setHeader("X-Robots-Tag", "noindex, nofollow");

    if (format === "base64") {
      return response.status(200).json({ ok: true, captureId: id, artifactIndex, flickrPhotoId: artifact.flickrPhotoId, contentType, byteLength: bytes.length, base64: bytes.toString("base64") });
    }

    response.setHeader("Content-Type", contentType);
    response.setHeader("Content-Length", String(bytes.length));
    return response.status(200).send(bytes);
  } catch (error) {
    console.error("BIKE_STORIES_ARTIFACT_PROXY_FAILED", error);
    return response.status(500).json({ ok: false, error: error.message });
  }
}
