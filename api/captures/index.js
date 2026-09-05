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

  const captures = [];
  let cursor;

  do {
    const page = await list({ prefix: "captures/", cursor });

    for (const blob of page.blobs) {
      if (!blob.pathname.endsWith(".json")) continue;

      const capture = await readJson(blob.pathname).catch(() => null);
      if (!capture) continue;

      const flickr = await readJson(`enrichments/flickr/${capture.id}.json`).catch(() => null);
      captures.push({
        ...capture,
        flickrPhotoId: flickr?.flickrPhotoId ?? capture.flickrPhotoId ?? null,
        enrichments: { flickr: flickr ?? null },
        pathname: blob.pathname,
      });
    }

    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  captures.sort((a, b) => String(b.receivedAt).localeCompare(String(a.receivedAt)));

  return response.status(200).json({
    ok: true,
    count: captures.length,
    captures,
  });
}
