import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

const dataDir = path.join(process.cwd(), ".data");
const leadsFile = path.join(dataDir, "leads.jsonl");

export async function POST(req: Request) {
  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad-json" }, { status: 400 });
  }

  const record = { id: crypto.randomUUID(), receivedAt: new Date().toISOString(), ...payload };

  try {
    fs.mkdirSync(dataDir, { recursive: true });
    fs.appendFileSync(leadsFile, JSON.stringify(record) + "\n");
  } catch (e) {
    console.error("lead write failed", e);
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(record)
      });
    } catch (e) {
      console.error("webhook failed", e);
    }
  }

  return NextResponse.json({ ok: true, id: record.id });
}
