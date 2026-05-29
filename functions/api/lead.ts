interface Env {
  LEAD_WEBHOOK_URL?: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let payload: any;
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "bad-json" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }

  const record = {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    ...payload
  };

  if (env.LEAD_WEBHOOK_URL) {
    try {
      await fetch(env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(record)
      });
    } catch (e) {
      console.error("webhook failed", e);
    }
  } else {
    console.log("lead (no webhook)", record);
  }

  return new Response(JSON.stringify({ ok: true, id: record.id }), {
    headers: { "content-type": "application/json" }
  });
};

export const onRequestOptions: PagesFunction = async () =>
  new Response(null, {
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type"
    }
  });
