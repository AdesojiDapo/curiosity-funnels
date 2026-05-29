import Link from "next/link";
import { listFunnels } from "@/lib/load";

export default function Home() {
  const funnels = listFunnels();
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
          Mobile funnels that <span style={{ color: "var(--amber)" }}>convert strangers</span> into qualified buyers.
        </h1>
        <p className="mt-6 text-white/70 text-lg max-w-xl mx-auto">
          A swipe-through, question-led page that takes someone from cold tap to checkout in under ninety seconds. Built for service businesses.
        </p>
        <div className="mt-10 flex gap-3 justify-center flex-wrap">
          <Link href="/f/ai-visibility-audit" className="btn-primary">See a live funnel</Link>
          <a href="#funnels" className="btn-ghost">Browse funnels</a>
        </div>
      </section>

      <section id="funnels" className="px-6 pb-24 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl mb-6">Live funnels</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {funnels.map((f) => (
            <Link
              key={f.slug}
              href={`/f/${f.slug}`}
              className="block rounded-2xl p-5 border border-white/10 hover:border-amber transition"
            >
              <div className="text-sm text-white/60">/{f.slug}</div>
              <div className="serif text-2xl mt-1">{f.title}</div>
              <div className="text-white/70 text-sm mt-2">{f.subtitle}</div>
              <div className="mt-4 text-amber text-sm">Open →</div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="mt-auto px-6 py-8 border-t border-white/5 text-white/50 text-sm flex flex-wrap gap-3 justify-between">
        <div>Curiosity Funnels. A Curiosity product.</div>
        <div>All enquiries: <a className="text-amber" href="mailto:admin@curiositybyade.com">admin@curiositybyade.com</a></div>
      </footer>
    </main>
  );
}
