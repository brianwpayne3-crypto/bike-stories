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

  const capture = {
    receivedAt: new Date().toISOString(),
    payload: request.body ?? null,
  };

  // Experiment #8: prove the Shortcut -> HTTP endpoint leg first.
  // Vercel function logs are intentionally the temporary sink; durable
  // persistence is the next decision after we verify the phone flow.
  console.log("BIKE_STORIES_CAPTURE", JSON.stringify(capture));

  return response.status(201).json({
    ok: true,
    receivedAt: capture.receivedAt,
  });
}
