/* ------------------------------------------------------------------
   All site content lives here. Edit text, links, metrics or projects
   in this one file; every page reads from it.
------------------------------------------------------------------- */

export const site = {
  name: 'Halley Patel',
  url: 'https://halleypatel.vercel.app',
  role: 'AI Product Manager',
  identity: ['AI Product Manager', 'AI Product Builder', 'Product Strategy & Evaluation'],
  headline: { lead: 'I turn complex problems into products that make', accent: 'better decisions.' },
  statement:
    'I work at the intersection of product strategy, AI systems and business outcomes, translating ambiguous problems into structured requirements, reliable workflows and measurable product decisions.',
  email: 'halley1837patel@gmail.com',
  linkedin: 'https://www.linkedin.com/in/hp29',
  github: 'https://github.com/halley2904',
  resume: '/Halley_Patel_Resume.pdf' as string,
  photo: '/halley.jpg',
  x: 'https://x.com/halleyyy29',
  whatsapp: '' as string,
};

export const to = (path: string, from = '/') => {
  if (process.env.NEXT_PUBLIC_PREVIEW !== '1') return path;
  const [p, hash] = path.split('#');
  const depth = from.split('/').filter(Boolean).length;
  const up = '../'.repeat(depth);
  const clean = (p || '/').replace(/^\//, '').replace(/\/$/, '');
  const file = clean ? `${clean}/index.html` : 'index.html';
  if (!clean && hash !== undefined && depth === 0) return `#${hash}`;
  return up + file + (hash !== undefined ? `#${hash}` : '');
};

export const asset = (file: string, from = '/') =>
  process.env.NEXT_PUBLIC_PREVIEW === '1' ? '../'.repeat(from.split('/').filter(Boolean).length) + file.replace(/^\//, '') : file;

export const resumeLink = (from = '/') =>
  site.resume
    ? { href: asset(site.resume, from), label: 'View résumé', download: false, ext: true }
    : { href: `mailto:${site.email}?subject=R%C3%A9sum%C3%A9%20request`, label: 'Request résumé', download: false, ext: false };

export type Metric = { value: number; suffix: string; label: string; source: string; href?: string };

export const metrics: Metric[] = [
  { value: 15000, suffix: '+', label: 'records analyzed', source: 'Payer AI & Clinical Risk', href: '/work/payer-ai-clinical-risk/' },
  { value: 7500, suffix: '+', label: 'images evaluated', source: 'Vision-language model evaluation', href: '/#evaluation' },
  { value: 712, suffix: '', label: 'expert-reviewed ground-truth cases', source: 'LLM evaluation & benchmarking', href: '/#evaluation' },
];

export const offer = {
  title: 'AI Product Clarity + Prototype Sprint',
  subtitle: 'From idea to a scoped MVP and testable prototype',
  description:
    'I help founders and small teams turn an ambiguous AI product idea into a clear V1 scope, AI workflow design and a clickable or low-code prototype — so you can validate before committing to full engineering.',
  deliverables: [
    'Problem framing and primary target user',
    'Prioritised V1 feature list and core user journey',
    'AI workflow logic, guardrails and uncertainty handling',
    '3–6 screen clickable or low-code prototype',
    'Short handoff note for developers or next steps',
  ],
  timeline: '1–2 weeks',
  price: '₹18,000–35,000 introductory (fixed scope)',
  note: '50% upfront. Scope is one focused product concept or feature set. Not full production engineering.',
  cta: 'Email me a 2-sentence description of the problem',
  evidence: 'Process demonstrated in ScopeGuard (discovery → prototype) and PayorLens (governance & evaluation).',
};

/* NOTE: Full projects, evaluation, principles, about arrays must be restored from git history (commit 8c0c525) if this build is incomplete. This is a partial restore to unbreak the site while we re-add the full content. */
