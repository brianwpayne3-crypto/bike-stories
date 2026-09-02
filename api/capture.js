import { put } from "@vercel/blob";
import { randomUUID } from "node:crypto";

function parseMetadata(metadata) {
  if (typeof metadata !== "string") return metadata ?? null;

  try {
    return JSON.parse(metadata);
  } catch {
    return metadata;
  }
}

export default async function handler(request, response) {
  if (request.method === "GET") {
    return response.status(200).json({
      ok: true,
      service: "bike-stories-capture",
    });
  }

  if (request.method !== "POST") {
    response.setHeader("Allow", ["GET", "POST"]);
    return response.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const receivedAt = new Date().toISOString();
  const captureId = randomUUID();
  const payload = request.body ?? {};
  const capture = {
    id: captureId,
    receivedAt,
    thought: payload.thought ?? null,
    metadata: parseMetadata(payload.metadata),
    flickrPhotoId: null,
    rawPayload: payload,
  };

  const datePath = receivedAt.slice(0, 10).replaceAll("-", "/");
  const pathname = `captures/${datePath}/${captureId}.json`;

  const blob = await put(pathname, JSON.stringify(capture, null, 2), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
  });

  console.log(
    "BIKE_STORIES_CAPTURE_PERSISTED",
    JSON.stringify({ id: captureId, receivedAt, pathname }),
  );

  return response.status(201).json({
    ok: true,
    id: captureId,
    receivedAt,
    pathname,
    persisted: true,
    blobUrl: blob.url,
  });
}
