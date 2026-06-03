"use client";

import { useEffect, useMemo, useState } from "react";
import type { Funnel, Step } from "@/lib/funnel";

type Answers = Record<string, string | string[]>;

type Utm = Record<string, string>;

const UTM_KEYS = [
  "src",
  "prospect",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term"
];

function readUtm(): Utm {
  if (typeof window === "undefined") return {};
  const out: Utm = {};
  const params = new URLSearchParams(window.location.search);
  UTM_KEYS.forEach((k) => {
    const v = params.get(k);
    if (v) out[k] = v;
  });
  const ref = document.referrer;
  if (ref) out.referrer = ref;
  return out;
}

export default function FunnelRunner({ funnel, embed = false }: { funnel: Funnel; embed?: boolean }) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [utm, setUtm] = useState<Utm>({});

  const key = `cf:answers:${funnel.slug}`;
  const utmKey = `cf:utm:${funnel.slug}`;

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
      if (raw) setAnswers(JSON.parse(raw));
    } catch {}
    try {
      const fresh = readUtm();
      if (Object.keys(fresh).length > 0) {
        setUtm(fresh);
        window.localStorage.setItem(utmKey, JSON.stringify(fresh));
      } else {
        const cached = window.localStorage.getItem(utmKey);
        if (cached) setUtm(JSON.parse(cached));
      }
    } catch {}
  }, [key, utmKey]);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(answers));
    } catch {}
  }, [answers, key]);

  const steps = funnel.steps;
  const step = steps[idx];
  const progress = useMemo(() => (idx / Math.max(steps.length - 1, 1)) * 100, [idx, steps.length]);

  function next() {
    if (idx < steps.length - 1) setIdx(idx + 1);
  }
  function back() {
    if (idx > 0) setIdx(idx - 1);
  }

  function setField(field: string, value: string | string[]) {
    setAnswers((a) => ({ ...a, [field]: value }));
  }

  async function submitLead(extra: Partial<Answers> = {}) {
    setSubmitting(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          slug: funnel.slug,
          answers: { ...answers, ...extra },
          utm,
          ts: new Date().toISOString(),
          ua: navigator.userAgent
        })
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (embed) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 max-w-phone w-full mx-auto flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <button onClick={back} disabled={idx === 0} className="text-white/60 disabled:opacity-30 text-sm">← Back</button>
          <div className="text-white/40 text-xs">{idx + 1}/{steps.length}</div>
        </div>
        <div className="h-1 rounded-full progress-track overflow-hidden mb-5">
          <div className="h-full progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <section key={step.id} className="step-enter flex flex-col min-h-[420px]">
          <StepView
            step={step}
            answers={answers}
            setField={setField}
            next={next}
            submitting={submitting}
            submitted={submitted}
            onCapture={submitLead}
          />
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-5 pt-5 pb-3 max-w-phone w-full mx-auto">
        <div className="flex items-center justify-between mb-3">
          <button onClick={back} disabled={idx === 0} className="text-white/60 disabled:opacity-30 text-sm">← Back</button>
          <div className="serif text-sm">Curiosity<span className="dot" /></div>
          <div className="text-white/40 text-xs">{idx + 1}/{steps.length}</div>
        </div>
        <div className="h-1 rounded-full progress-track overflow-hidden">
          <div className="h-full progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <section key={step.id} className="step-enter flex-1 px-5 pb-10 pt-6 max-w-phone w-full mx-auto flex flex-col">
        <StepView
          step={step}
          answers={answers}
          setField={setField}
          next={next}
          submitting={submitting}
          submitted={submitted}
          onCapture={submitLead}
        />
      </section>

      <footer className="px-5 py-4 max-w-phone w-full mx-auto text-white/40 text-xs text-center">
        Powered by Curiosity Funnels
      </footer>
    </div>
  );
}

function StepView({
  step,
  answers,
  setField,
  next,
  submitting,
  submitted,
  onCapture
}: {
  step: Step;
  answers: Answers;
  setField: (f: string, v: string | string[]) => void;
  next: () => void;
  submitting: boolean;
  submitted: boolean;
  onCapture: (extra?: Partial<Answers>) => Promise<void>;
}) {
  if (step.type === "cover") {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl leading-tight">{step.title}</h1>
          {step.subtitle && <p className="mt-4 text-white/70">{step.subtitle}</p>}
        </div>
        <button className="btn-primary mt-6" onClick={next}>{step.cta}</button>
      </div>
    );
  }

  if (step.type === "single") {
    const current = (answers[step.field] as string) || "";
    return (
      <div className="flex flex-col h-full">
        <h2 className="text-2xl">{step.question}</h2>
        {step.help && <p className="mt-2 text-white/60 text-sm">{step.help}</p>}
        <div className="mt-6 flex flex-col gap-2">
          {step.choices.map((c) => (
            <button
              key={c.id}
              data-selected={current === c.id}
              className="choice text-left px-4 py-4 rounded-2xl flex items-center gap-3"
              onClick={() => {
                setField(step.field, c.id);
                setTimeout(next, 180);
              }}
            >
              {c.emoji && <span className="text-xl">{c.emoji}</span>}
              <span>{c.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step.type === "multi") {
    const current = (answers[step.field] as string[]) || [];
    const toggle = (id: string) => {
      const has = current.includes(id);
      setField(step.field, has ? current.filter((x) => x !== id) : [...current, id]);
    };
    const min = step.min ?? 1;
    return (
      <div className="flex flex-col h-full">
        <h2 className="text-2xl">{step.question}</h2>
        {step.help && <p className="mt-2 text-white/60 text-sm">{step.help}</p>}
        <div className="mt-6 flex flex-col gap-2 flex-1">
          {step.choices.map((c) => (
            <button
              key={c.id}
              data-selected={current.includes(c.id)}
              className="choice text-left px-4 py-4 rounded-2xl flex items-center gap-3"
              onClick={() => toggle(c.id)}
            >
              {c.emoji && <span className="text-xl">{c.emoji}</span>}
              <span>{c.label}</span>
            </button>
          ))}
        </div>
        <button className="btn-primary mt-6" disabled={current.length < min} onClick={next}>Continue</button>
      </div>
    );
  }

  if (step.type === "text") {
    const current = (answers[step.field] as string) || "";
    return (
      <div className="flex flex-col h-full">
        <h2 className="text-2xl">{step.question}</h2>
        {step.help && <p className="mt-2 text-white/60 text-sm">{step.help}</p>}
        <div className="mt-6 flex-1">
          {step.multiline ? (
            <textarea
              className="field min-h-[140px]"
              placeholder={step.placeholder}
              value={current}
              onChange={(e) => setField(step.field, e.target.value)}
            />
          ) : (
            <input
              className="field"
              placeholder={step.placeholder}
              value={current}
              onChange={(e) => setField(step.field, e.target.value)}
            />
          )}
        </div>
        <button className="btn-primary mt-6" disabled={step.required && !current.trim()} onClick={next}>Continue</button>
      </div>
    );
  }

  if (step.type === "email") {
    const field = step.field || "email";
    const current = (answers[field] as string) || "";
    const valid = /.+@.+\..+/.test(current);
    return (
      <div className="flex flex-col h-full">
        <h2 className="text-2xl">{step.question}</h2>
        {step.help && <p className="mt-2 text-white/60 text-sm">{step.help}</p>}
        <input
          type="email"
          inputMode="email"
          className="field mt-6"
          placeholder="you@company.com"
          value={current}
          onChange={(e) => setField(field, e.target.value)}
        />
        <button
          className="btn-primary mt-6"
          disabled={!valid || submitting}
          onClick={async () => {
            await onCapture({ [field]: current });
            next();
          }}
        >
          {submitting ? "Sending…" : step.cta}
        </button>
        <p className="mt-3 text-white/40 text-xs">We email from admin@curiositybyade.com. No spam, ever.</p>
      </div>
    );
  }

  if (step.type === "phone") {
    const field = step.field || "phone";
    const current = (answers[field] as string) || "";
    const valid = current.replace(/\D/g, "").length >= 7;
    return (
      <div className="flex flex-col h-full">
        <h2 className="text-2xl">{step.question}</h2>
        {step.help && <p className="mt-2 text-white/60 text-sm">{step.help}</p>}
        <input
          type="tel"
          inputMode="tel"
          className="field mt-6"
          placeholder="+44 …"
          value={current}
          onChange={(e) => setField(field, e.target.value)}
        />
        <button
          className="btn-primary mt-6"
          disabled={(step.required && !valid) || submitting}
          onClick={async () => {
            if (valid) await onCapture({ [field]: current });
            next();
          }}
        >
          {step.required ? step.cta : "Continue"}
        </button>
        {!step.required && (
          <button className="mt-3 text-white/50 text-sm" onClick={next}>Skip</button>
        )}
      </div>
    );
  }

  if (step.type === "social") {
    return (
      <div className="flex flex-col h-full">
        <h2 className="text-2xl">What buyers say</h2>
        <div className="mt-6 flex flex-col gap-3 flex-1">
          {step.quotes.map((q, i) => (
            <div key={i} className="rounded-2xl p-4 border border-white/10">
              <div className="serif text-lg leading-snug">"{q.quote}"</div>
              <div className="mt-2 text-white/50 text-sm">{q.author}</div>
            </div>
          ))}
        </div>
        <button className="btn-primary mt-6" onClick={next}>{step.cta}</button>
      </div>
    );
  }

  if (step.type === "result") {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 text-amber text-sm mb-3">
            <span>●</span>
            <span>{submitted ? "Saved" : "Ready"}</span>
          </div>
          <h1 className="text-4xl leading-tight">{step.title}</h1>
          <p className="mt-4 text-white/75">{step.body}</p>
        </div>
        <a className="btn-primary text-center" href={step.href}>{step.cta}</a>
        {step.secondaryCta && step.secondaryHref && (
          <a className="btn-ghost mt-3 text-center" href={step.secondaryHref}>{step.secondaryCta}</a>
        )}
      </div>
    );
  }

  return null;
}
