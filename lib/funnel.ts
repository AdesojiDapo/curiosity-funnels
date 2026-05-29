export type Choice = { id: string; label: string; emoji?: string };

export type Step =
  | { id: string; type: "cover"; title: string; subtitle?: string; cta: string; image?: string }
  | { id: string; type: "single"; question: string; help?: string; field: string; choices: Choice[]; required?: boolean }
  | { id: string; type: "multi"; question: string; help?: string; field: string; choices: Choice[]; min?: number }
  | { id: string; type: "text"; question: string; help?: string; field: string; placeholder?: string; multiline?: boolean; required?: boolean }
  | { id: string; type: "email"; question: string; help?: string; field?: string; cta: string }
  | { id: string; type: "phone"; question: string; help?: string; field?: string; cta: string; required?: boolean }
  | { id: string; type: "social"; quotes: { quote: string; author: string }[]; cta: string }
  | { id: string; type: "result"; title: string; body: string; cta: string; href: string; secondaryCta?: string; secondaryHref?: string };

export type Funnel = {
  slug: string;
  title: string;
  subtitle: string;
  brand: { accent?: string; bg?: string; logo?: string };
  steps: Step[];
  meta?: { ogImage?: string; price?: string };
};
