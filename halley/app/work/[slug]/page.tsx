import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects, to, type Block, type Project } from '../../../content/site';
import CaseToc from '../../../components/CaseToc';
import Flow from '../../../components/Flow';
import Mask from '../../../components/Mask';
import ProjectArt from '../../../components/ProjectArt';
import Footer from '../../../components/Footer';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.title, description: p.outcome, openGraph: { title: `${p.title} | Halley Patel`, description: p.outcome } };
}

const Arrow = () => (
  <svg className="arr" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
);

function Blocks({ blocks, p }: { blocks: Block[]; p: Project }) {
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'p':
            return <p key={i} className="rv max-w-[680px] text-[18px] leading-[1.7] text-txt/85">{b.text}</p>;
          case 'list':
            return (
              <ul key={i} className="rv max-w-[680px] divide-y divide-txt/10 border-y border-txt/10">
                {b.items.map((t) => (
                  <li key={t} className="flex gap-4 py-3.5 text-[16.5px] leading-relaxed">
                    <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-sage-deep" />{t}
                  </li>
                ))}
              </ul>
            );
          case 'stats':
            return (
              <div key={i} className="rv grid gap-3 sm:grid-cols-3">
                {b.items.map((s) => (
                  <div key={s.label} className="rounded-[22px] border border-txt/10 bg-white/50 p-6">
                    <p className="font-serif text-[44px] leading-none tracking-[-0.04em] text-sage-deep">{s.value}</p>
                    <p className="mt-3 text-[14.5px] text-txt-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            );
          case 'decisions':
            return (
              <div key={i} className="grid gap-3">
                {b.items.map((d, k) => (
                  <div key={d.decision} className="rv group grid gap-4 rounded-[22px] border border-txt/10 bg-white/50 p-6 transition-colors duration-500 hover:border-sage-deep/40 md:grid-cols-[auto_1fr_1fr] md:gap-8 md:p-7" style={{ ['--d' as string]: `${k * 0.06}s` }}>
                    <span className="font-mono text-[11px] tracking-[0.14em] text-txt-faint">D{k + 1}</span>
                    <div>
                      <p className="eyebrow text-sage-deep">Decision</p>
                      <p className="mt-2 text-[16.5px] font-semibold leading-snug">{d.decision}</p>
                    </div>
                    <div>
                      <p className="eyebrow text-clay">Trade-off</p>
                      <p className="mt-2 text-[15.5px] leading-relaxed text-txt-muted">{d.tradeoff}</p>
                    </div>
                  </div>
                ))}
              </div>
            );
          case 'diagram':
            return <Flow key={i} d={p.diagram} />;
          case 'callout':
            return (
              <p key={i} className="rv flex max-w-[680px] gap-3 rounded-[18px] border border-dashed border-txt/20 bg-paper-2/60 p-5 text-[15px] leading-relaxed text-txt-muted">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-clay" />{b.text}
              </p>
            );
          case 'links':
            return p.links.length ? (
              <div key={i} className="grid gap-3 sm:grid-cols-2">
                {p.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="rv group flex items-center justify-between rounded-[22px] border border-txt/10 bg-white/50 p-6 transition-[border-color,transform] duration-500 ease-soft hover:-translate-y-1 hover:border-sage-deep/40">
                    <span>
                      <span className="eyebrow text-txt-faint">Open</span>
                      <span className="mt-2 block font-serif text-[24px] tracking-[-0.02em]">{l.label}</span>
                      <span className="mt-1 block max-w-[260px] truncate font-mono text-[11.5px] text-txt-faint">{l.href.replace(/^https?:\/\//, '')}</span>
                    </span>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-cream"><Arrow /></span>
                  </a>
                ))}
              </div>
            ) : null;
        }
      })}
    </div>
  );
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = projects.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      {/* header */}
      <section className="relative overflow-hidden bg-ink text-cream" data-dark>
        <div className="pointer-events-none absolute -right-40 top-0 h-[560px] w-[560px] rounded-full bg-sage/10 blur-[120px]" />
        <div className="wrap relative pb-16 pt-32 md:pb-20 md:pt-40">
          <a href={to('/#work', `/work/${p.slug}/`)} className="rv group inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.14em] text-cream-faint hover:text-mint">
            <svg className="rotate-180 transition-transform duration-500 group-hover:-translate-x-1" width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            All work
          </a>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
            <div>
              <p className="rv eyebrow flex items-center gap-3 text-cream-faint"><span className="text-mint">Project {p.no}</span><span className="h-px w-8 bg-cream/20" />{p.kind}</p>
              <h1 className="reveal-group mt-6 font-serif text-[clamp(44px,6.6vw,96px)] leading-[0.98] tracking-[-0.045em]"><Mask text={p.title} step={0.06} /></h1>
              <p className="rv mt-8 max-w-[680px] font-serif text-[22px] italic leading-[1.4] tracking-[-0.01em] text-mint md:text-[26px]" style={{ ['--d' as string]: '.35s' }}>{p.outcome}</p>
            </div>
            <div>
            <div className="rv relative mb-8 aspect-[16/10] overflow-hidden rounded-[26px] border border-cream/10 bg-paper p-5 shadow-[0_40px_80px_-40px_rgba(0,0,0,.8)] md:p-6" style={{ ['--d' as string]: '.3s' }}>
              <span className="absolute left-5 top-4 z-10 font-mono text-[10.5px] tracking-[0.14em] text-txt-faint md:left-6">{p.no} / {String(projects.length).padStart(2, '0')}</span>
              <span className="absolute right-5 top-3.5 z-10 chip border-txt/15 bg-paper text-[11.5px] text-txt-muted md:right-6">{p.category}</span>
              <div className="h-full pt-6"><ProjectArt slug={p.slug} /></div>
            </div>
            <dl className="rv grid grid-cols-2 gap-x-6 gap-y-6 border-t border-ink-line pt-6 text-[14.5px] lg:grid-cols-1" style={{ ['--d' as string]: '.45s' }}>
              <div><dt className="eyebrow text-cream-faint">Type</dt><dd className="mt-1.5">{p.category}</dd></div>
              <div><dt className="eyebrow text-cream-faint">Role</dt><dd className="mt-1.5 text-cream-muted">{p.role}</dd></div>
              {p.links.length > 0 && (
                <div className="col-span-2 lg:col-span-1"><dt className="eyebrow text-cream-faint">Links</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {p.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="chip group gap-1.5 border-cream/20 hover:border-mint hover:text-mint">{l.label}<Arrow /></a>)}
                  </dd>
                </div>
              )}
            </dl>
            </div>
          </div>
          {p.disclosure && (
            <p className="rv mt-12 flex max-w-[860px] gap-3 rounded-[18px] border border-[#E9C46A]/30 bg-[#E9C46A]/[.06] p-5 text-[14.5px] leading-relaxed text-cream-muted">
              <span className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#E9C46A]">Note</span>{p.disclosure}
            </p>
          )}
        </div>
      </section>

      {/* body */}
      <section className="grain bg-paper py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-20">
          <aside><CaseToc items={p.sections.map(({ id, title }) => ({ id, title }))} /></aside>
          <div id="case-body" className="min-w-0 space-y-20 md:space-y-24">
            {p.sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <p className="rv font-mono text-[11.5px] tracking-[0.14em] text-sage-deep">{String(i + 1).padStart(2, '0')}</p>
                <h2 className="rv mt-3 font-serif text-[34px] leading-[1.05] tracking-[-0.035em] md:text-[44px]">{s.title}</h2>
                <div className="mt-8"><Blocks blocks={s.blocks} p={p} /></div>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* next */}
      <section className="bg-paper-2">
        <a href={to(`/work/${next.slug}/`, `/work/${p.slug}/`)} className="group block">
          <div className="wrap grid items-center gap-10 py-16 md:grid-cols-[1fr_380px] md:py-20">
            <div>
              <p className="eyebrow text-txt-faint">Next case study · {next.no}</p>
              <p className="mt-4 font-serif text-[clamp(36px,5vw,64px)] leading-[1] tracking-[-0.04em] transition-colors duration-500 group-hover:text-sage-deep">{next.title}</p>
              <p className="mt-4 max-w-[560px] text-[16px] text-txt-muted">{next.outcome}</p>
            </div>
            <div className="aspect-[16/9] overflow-hidden rounded-[24px] border border-txt/10 bg-paper p-5 transition-transform duration-700 ease-soft group-hover:-translate-y-1"><ProjectArt slug={next.slug} /></div>
          </div>
        </a>
      </section>
      <Footer />
    </>
  );
}
