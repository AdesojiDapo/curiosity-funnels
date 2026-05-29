# Curiosity Funnels

Mobile-first funnel builder by Curiosity. v0.1: published-funnel renderer + JSON-authored funnels + lead capture.

Lives at `funnels.curiositybyade.com`.

## Quick start

```
npm install
npm run dev
```

Open http://localhost:3210 for the index, or jump straight to a funnel:

- http://localhost:3210/f/ai-visibility-audit
- http://localhost:3210/f/site-audit
- http://localhost:3210/f/curiosity-web

## Authoring a new funnel

Drop a JSON file into `funnels/`. Schema lives in `lib/funnel.ts`. Step types:

- `cover` (hero + CTA)
- `single` (single-choice)
- `multi` (multi-choice)
- `text` (short or multiline)
- `email` (captures and POSTs to `/api/lead`)
- `phone` (optional or required)
- `social` (testimonials carousel)
- `result` (CTA + optional secondary CTA)

## Lead capture

POST `/api/lead` writes to `.data/leads.jsonl` and POSTs to `LEAD_WEBHOOK_URL` if set. Set the webhook to any of: a Make.com scenario, a Zapier hook, a Slack incoming webhook, a tiny Cloudflare Worker that emails `admin@curiositybyade.com`.

## Brand rules

Public surfaces use the Curiosity name. Never the founder's name. Amber `#e8a44a` on ink `#0c0e14`. Self-hosted Fraunces + Inter (drop woff2s into `public/fonts/` and import in `app/globals.css`). All enquiries to `admin@curiositybyade.com`. Prices canonical in GBP.

## Roadmap

- v0.2: drag-drop editor at `/edit/[slug]`, auth via magic link, Postgres backend.
- v0.3: analytics (step drop-off, completion), A/B testing.
- v0.4: Stripe checkout block, Calendly block, conditional branching.
- v0.5: custom domain per funnel.
