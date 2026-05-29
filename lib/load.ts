import fs from "node:fs";
import path from "node:path";
import type { Funnel } from "./funnel";

const dir = path.join(process.cwd(), "funnels");

export function loadFunnel(slug: string): Funnel | null {
  const file = path.join(dir, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8")) as Funnel;
}

export function listFunnels(): Funnel[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as Funnel)
    .sort((a, b) => a.title.localeCompare(b.title));
}
