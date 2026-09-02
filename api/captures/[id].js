import { list } from "@vercel/blob";

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

  const blobResponse = await fetch(blob.url, {
    headers: process.env.BLOB_READ_WRITE_TOKEN
      ? { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` }
      : undefined,
  });

  if (!blobResponse.ok) {
    console.error("BIKE_STORIES_CAPTURE_READ_FAILED", blobResponse.status, blob.pathname);
    return response.status(502).json({ ok: false, error: "Could not read capture" });
  }

  const capture = await blobResponse.json();
  return response.status(200).json(capture);
}
