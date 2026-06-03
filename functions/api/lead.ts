interface Env {
  LEAD_WEBHOOK_URL?: string;
  RESEND_API_KEY?: string;
  LEAD_TO?: string;
  LEAD_FROM?: string;
}

const FUNNEL_TITLES: Record<string, string> = {
  "ai-visibility-audit": "The AI Visibility Audit (£99)",
  "site-audit": "Curiosity Site Audit (£499 / £1,199)",
  "curiosity-web": "Curiosity Web (from £2,499)",
  "curiosity-web-enquiry": "Curiosity Web enquiry (from /web)"
};

function formatAnswers(answers: Record<string, any>): string {
  return Object.entries(answers)
    .map(([k, v]) => `  ${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
    .join("\n");
}

async function sendEmail(env: Env, record: any): Promise<void> {
  if (!env.RESEND_API_KEY) return;
  const to = env.LEAD_TO || "admin@curiositybyade.com";
  const from = env.LEAD_FROM || "Curiosity Funnels <leads@curiositybyade.com>";
  const title = FUNNEL_TITLES[record.slug] || record.slug;
  const utmTag = record.utm?.src || record.utm?.utm_source;
  const subject = utmTag
    ? `New lead [${utmTag}]: ${title}`
    : `New lead: ${title}`;
  const answers = formatAnswers(record.answers || {});
  const utm = record.utm && Object.keys(record.utm).length > 0
    ? formatAnswers(record.utm)
    : "  (none — direct or untagged)";
  const text = [
    `New funnel lead.`,
    ``,
    `Funnel: ${title}`,
    `When: ${record.receivedAt}`,
    `ID: ${record.id}`,
    ``,
    `Source:`,
    utm,
    ``,
    `Answers:`,
    answers,
    ``,
    `User agent: ${record.ua || "n/a"}`
  ].join("\n");

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({ from, to, subject, text })
  });
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

  const tasks: Promise<unknown>[] = [];

  if (env.RESEND_API_KEY) {
    tasks.push(sendEmail(env, record).catch((e) => console.error("resend failed", e)));
  }

  if (env.LEAD_WEBHOOK_URL) {
    tasks.push(
      fetch(env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(record)
      }).catch((e) => console.error("webhook failed", e))
    );
  }

  if (tasks.length === 0) {
    console.log("lead (no notifier configured)", record);
  } else {
    await Promise.all(tasks);
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
