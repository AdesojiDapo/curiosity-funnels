import { notFound } from "next/navigation";
import { loadFunnel, listFunnels } from "@/lib/load";
import FunnelRunner from "@/components/FunnelRunner";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return listFunnels().map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const f = loadFunnel(params.slug);
  if (!f) return { title: "Funnel not found" };
  return { title: `${f.title} | Curiosity`, description: f.subtitle };
}

export default function Page({ params }: { params: { slug: string } }) {
  const f = loadFunnel(params.slug);
  if (!f) notFound();
  return <FunnelRunner funnel={f} />;
}
