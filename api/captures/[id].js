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

  const result = await get(blob.pathname, { access: "private", useCache: false });
  if (!result || result.statusCode !== 200) {
    console.error("BIKE_STORIES_CAPTURE_READ_FAILED", result?.statusCode, blob.pathname);
    return response.status(502).json({ ok: false, error: "Could not read capture" });
  }

  const capture = JSON.parse(await streamToText(result.stream));
  return response.status(200).json(capture);
}
