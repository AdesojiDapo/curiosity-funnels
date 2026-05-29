import { loadFunnel } from "@/lib/load";
import FunnelRunner from "@/components/FunnelRunner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curiosity Web | Websites built to be read by humans and AI",
  description:
    "Websites built by Curiosity. Standard £2,499. Premium £4,995. Bespoke from £9,995. AEO, WCAG 2.1 AA, and Core Web Vitals 95+ are the floor, not extras."
};

export default function CuriosityWebPage() {
  const enquiry = loadFunnel("curiosity-web-enquiry");
  return (
    <main id="top" className="min-h-screen flex flex-col">
      <Nav />
      <Hero />
      <Problem />
      <Tiers />
      <Why />
      <Process />
      <Faq />
      <EnquirySection funnel={enquiry!} />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="px-6 py-5 flex items-center justify-between border-b border-white/5 sticky top-0 z-10 backdrop-blur bg-ink/80">
      <a href="#top" className="serif text-xl">Curiosity<span className="dot" /></a>
      <nav className="hidden sm:flex gap-6 text-sm text-white/70">
        <a href="#tiers" className="hover:text-amber">Tiers</a>
        <a href="#why" className="hover:text-amber">Why Curiosity</a>
        <a href="#faq" className="hover:text-amber">FAQ</a>
      </nav>
      <a href="#enquire" className="btn-ghost text-sm">Start an enquiry</a>
    </header>
  );
}

function Hero() {
  return (
    <section className="px-6 pt-24 pb-20 max-w-4xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 text-amber text-xs tracking-widest uppercase mb-6">
        <span>●</span><span>Curiosity Web</span>
      </div>
      <h1 className="text-5xl md:text-6xl leading-[1.05]">
        A new website that <span style={{ color: "var(--amber)" }}>ChatGPT, Claude, and Google</span> can read.
      </h1>
      <p className="mt-6 text-white/70 text-lg max-w-2xl mx-auto">
        AEO, WCAG 2.1 AA, and Core Web Vitals 95+ are not extras. They're the floor. Three fixed tiers from <span data-gbp="2499">£2,499</span>, delivered in 14 to 30 days.
      </p>
      <div className="mt-10 flex gap-3 justify-center flex-wrap">
        <a href="#enquire" className="btn-primary">Get my proposal</a>
        <a href="#tiers" className="btn-ghost">See the tiers</a>
      </div>
      <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto text-sm">
        <Stat n="95+" l="Core Web Vitals" />
        <Stat n="2.1 AA" l="WCAG accessibility" />
        <Stat n="14 days" l="Fastest delivery" />
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="serif text-3xl text-amber">{n}</div>
      <div className="text-white/50 mt-1">{l}</div>
    </div>
  );
}

function Problem() {
  return (
    <section className="px-6 py-20 border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl">Most agency sites fail one of three tests.</h2>
        <p className="mt-4 text-white/70">Built fast on a template, pretty for ten seconds, and quietly broken once a real buyer arrives.</p>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          <Card title="Invisible to AI">
            ChatGPT, Claude, and Perplexity describe your competitor in detail and skip you. No schema, no clear answers, no facts the model can quote.
          </Card>
          <Card title="Slow on mobile">
            Three hero videos, twelve scripts, a chat widget you forgot about. Lighthouse score below 60. Every second of delay costs conversions.
          </Card>
          <Card title="Hard to use">
            Tiny tap targets, low contrast, no keyboard nav. WCAG fails. UK Equality Act fails. Real buyers leave; you never see the bounce.
          </Card>
        </div>
      </div>
    </section>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-5 border border-white/10">
      <div className="serif text-xl">{title}</div>
      <p className="mt-2 text-white/70 text-sm">{children}</p>
    </div>
  );
}

function Tiers() {
  return (
    <section id="tiers" className="px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl">Three tiers. Fixed prices. No surprises.</h2>
        <p className="mt-3 text-white/70">All prices in GBP. International invoices on request.</p>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          <Tier
            name="Standard"
            price="£2,499"
            gbp="2499"
            cadence="from"
            blurb="Up to 5 pages. Delivered in 14 days."
            features={[
              "Homepage, About, Services, Case Studies, Contact",
              "Mobile-first responsive design",
              "AEO schema and clear LLM-friendly facts",
              "WCAG 2.1 AA, contrast and keyboard tested",
              "Core Web Vitals 95+ on real-world devices",
              "Hosted on Cloudflare Pages, free SSL"
            ]}
          />
          <Tier
            name="Premium"
            price="£4,995"
            gbp="4995"
            cadence="from"
            blurb="10+ pages, light CMS. Delivered in 30 days."
            highlight
            features={[
              "Everything in Standard",
              "10+ pages, plus a blog or news section",
              "Decap or Sanity CMS (no monthly fee)",
              "Custom illustrations or photography direction",
              "Two rounds of revisions",
              "30-day post-launch fix window"
            ]}
          />
          <Tier
            name="Bespoke"
            price="£9,995"
            gbp="9995"
            cadence="from"
            blurb="Ecommerce, integrations, multilingual."
            features={[
              "Everything in Premium",
              "Stripe checkout or Shopify integration",
              "CRM (HubSpot, Pipedrive) and analytics wiring",
              "Multilingual or geo-routed content",
              "Custom interactive elements",
              "Scoped to your project, fixed quote"
            ]}
          />
        </div>
        <p className="mt-6 text-white/50 text-sm">
          Already bought a Curiosity Site Audit? £499 is credited against any Curiosity Web project booked within 30 days.
        </p>
      </div>
    </section>
  );
}

function Tier({
  name,
  price,
  gbp,
  cadence,
  blurb,
  features,
  highlight
}: {
  name: string;
  price: string;
  gbp: string;
  cadence: string;
  blurb: string;
  features: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={
        "rounded-2xl p-6 border " +
        (highlight ? "border-amber bg-amber/[0.06]" : "border-white/10")
      }
    >
      {highlight && <div className="text-amber text-xs uppercase tracking-widest mb-2">Most picked</div>}
      <div className="serif text-2xl">{name}</div>
      <div className="mt-3 flex items-end gap-2">
        <div className="text-white/50 text-sm">{cadence}</div>
        <div className="serif text-4xl" data-gbp={gbp}>{price}</div>
      </div>
      <div className="mt-2 text-white/60 text-sm">{blurb}</div>
      <ul className="mt-5 space-y-2 text-sm text-white/80">
        {features.map((f) => (
          <li key={f} className="flex gap-2"><span className="text-amber">✓</span><span>{f}</span></li>
        ))}
      </ul>
      <a href="#enquire" className={"mt-6 inline-block " + (highlight ? "btn-primary" : "btn-ghost")}>
        Start with {name}
      </a>
    </div>
  );
}

function Why() {
  return (
    <section id="why" className="px-6 py-20 border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl">Why Curiosity, not the agency on the high street.</h2>
        <div className="mt-10 grid md:grid-cols-2 gap-5">
          <Card title="AEO is the differentiator">
            Most agencies have never heard of Answer Engine Optimisation. We bake it in: structured data, clear facts the LLMs quote, content shaped to be cited.
          </Card>
          <Card title="Accessibility is not a checkbox">
            WCAG 2.1 AA tested with a real keyboard, real screen reader, and contrast checks. UK Equality Act compliant.
          </Card>
          <Card title="Performance is non-negotiable">
            Core Web Vitals 95+ on a mid-range Android, not a top-end iPhone. Tested on a real device before handover.
          </Card>
          <Card title="One person, end to end">
            You talk to the person building it. No account manager, no offshore team, no surprises.
          </Card>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps: { n: string; t: string; d: string }[] = [
    { n: "Day 0", t: "Enquiry", d: "Three questions through this page. Curiosity replies within 1 working day with a fixed proposal." },
    { n: "Day 1–3", t: "Discovery", d: "30-minute call. Brand, audience, content inventory, success metrics. Written brief shared." },
    { n: "Day 4–10", t: "Design", d: "Homepage and one inner page mocked. One revision round. Sign-off in writing." },
    { n: "Day 11–25", t: "Build", d: "Full site built, content loaded, AEO and accessibility checks run continuously." },
    { n: "Day 26–30", t: "Launch", d: "Deploy to Cloudflare. Real-device performance test. 30-day fix window starts." }
  ];
  return (
    <section className="px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl">What 30 days looks like.</h2>
        <div className="mt-10 space-y-4">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-5 rounded-2xl p-4 border border-white/10">
              <div className="text-amber serif text-xl w-24 shrink-0">{s.n}</div>
              <div>
                <div className="serif text-lg">{s.t}</div>
                <div className="text-white/70 text-sm mt-1">{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const qs: { q: string; a: string }[] = [
    {
      q: "Do you charge a deposit?",
      a: "50% on signed proposal, 50% on launch. No hidden fees. International clients can pay in their currency on request."
    },
    {
      q: "Who writes the content?",
      a: "You provide raw copy or interview notes. Curiosity polishes for AEO and clarity. Full copywriting is an add-on quoted separately."
    },
    {
      q: "What CMS do you use?",
      a: "Premium uses Decap CMS (Git-backed, free) or Sanity (small monthly fee). Bespoke can use whatever the project requires. No WordPress unless specifically requested."
    },
    {
      q: "Do you handle ongoing maintenance?",
      a: "30 days of post-launch fixes are included. After that, ongoing support is £149 per month or £1,499 per year, covering performance monitoring, security updates, and small content edits."
    },
    {
      q: "Can I keep my current site live during the build?",
      a: "Yes. We build on a staging URL and switch DNS on launch day. Zero downtime."
    },
    {
      q: "What if it's not 95+ on Core Web Vitals?",
      a: "It will be. If it isn't on launch day, we fix it before invoicing the second half."
    }
  ];
  return (
    <section id="faq" className="px-6 py-20 border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl">Frequently asked.</h2>
        <div className="mt-10 divide-y divide-white/10 rounded-2xl border border-white/10">
          {qs.map((item) => (
            <details key={item.q} className="group p-5">
              <summary className="cursor-pointer flex items-center justify-between gap-4">
                <span className="serif text-lg">{item.q}</span>
                <span className="text-amber text-2xl group-open:rotate-45 transition">+</span>
              </summary>
              <p className="mt-3 text-white/70 text-sm">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnquirySection({ funnel }: { funnel: any }) {
  return (
    <section id="enquire" className="px-6 py-24">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl">Three questions. Then a proposal.</h2>
        <p className="mt-3 text-white/70">No call required unless you want one. Replies within 1 working day from admin@curiositybyade.com.</p>
      </div>
      <FunnelRunner funnel={funnel} embed />
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-auto px-6 py-10 border-t border-white/5 text-white/50 text-sm">
      <div className="max-w-5xl mx-auto flex flex-wrap gap-3 justify-between">
        <div className="serif text-base">
          Curiosity<span className="dot" />
        </div>
        <div>All enquiries: <a className="text-amber" href="mailto:admin@curiositybyade.com">admin@curiositybyade.com</a></div>
      </div>
    </footer>
  );
}
