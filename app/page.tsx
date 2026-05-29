import Link from "next/link";
import { listFunnels } from "@/lib/load";

type Surface = { kind: "funnel"; slug: string; title: string; subtitle: string; href: string } | { kind: "page"; slug: string; title: string; subtitle: string; href: string };

const HIDE_FROM_INDEX = new Set(["curiosity-web-enquiry"]);
const REPLACE_WITH_PAGE: Record<string, { title: string; subtitle: string; href: string }> = {
  "curiosity-web": {
    title: "Curiosity Web (landing page)",
    subtitle: "Long-scroll landing page for Curiosity Web. Tiers, FAQ, embedded 3-step enquiry funnel.",
    href: "/web"
  }
};

export default function Home() {
  const all = listFunnels();
  const surfaces: Surface[] = all
    .filter((f) => !HIDE_FROM_INDEX.has(f.slug))
    .map((f) => {
      const repl = REPLACE_WITH_PAGE[f.slug];
      if (repl) return { kind: "page", slug: f.slug, title: repl.title, subtitle: repl.subtitle, href: repl.href };
      return { kind: "funnel", slug: f.slug, title: f.title, subtitle: f.subtitle, href: `/f/${f.slug}` };
    });

  return (
    <main className="min-h-screen flex flex-col">
      <header className="px-6 py-5 flex items-center justify-between border-b border-white/5">
        <div className="serif text-xl">
          Curiosity Funnels<span className="dot" />
        </div>
        <a className="btn-ghost text-sm" href="mailto:admin@curiositybyade.com">Email Curiosity →</a>
      </header>

      <section className="px-6 pt-20 pb-16 max-w-3xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl leading-[1.05]">
          Mobile funnels and landing pages for <span style={{ color: "var(--amber)" }}>Curiosity services</span>.
        </h1>
        <p className="mt-6 text-white/70 text-lg max-w-xl mx-auto">
          Internal authoring tool. Swipe-through funnels for impulse buys, long-scroll pages for considered ones.
        </p>
        <div className="mt-10 flex gap-3 justify-center flex-wrap">
          <Link href="/f/ai-visibility-audit" className="btn-primary">See a live funnel</Link>
          <Link href="/web" className="btn-ghost">See a landing page</Link>
        </div>
      </section>

      <section id="surfaces" className="px-6 pb-24 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl mb-6">Live surfaces</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {surfaces.map((s) => (
            <Link
              key={s.slug}
              href={s.href}
              className="block rounded-2xl p-5 border border-white/10 hover:border-amber transition"
            >
              <div className="text-sm text-white/60 flex items-center gap-2">
                <span className="uppercase tracking-widest text-[10px] text-amber">
                  {s.kind === "page" ? "Page" : "Funnel"}
                </span>
                <span>{s.href}</span>
              </div>
              <div className="serif text-2xl mt-1">{s.title}</div>
              <div className="text-white/70 text-sm mt-2">{s.subtitle}</div>
              <div className="mt-4 text-amber text-sm">Open →</div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="mt-auto px-6 py-8 border-t border-white/5 text-white/50 text-sm flex flex-wrap gap-3 justify-between">
        <div>Curiosity Funnels. A Curiosity product. Internal.</div>
        <div>All enquiries: <a className="text-amber" href="mailto:admin@curiositybyade.com">admin@curiositybyade.com</a></div>
      </footer>
    </main>
  );
}
