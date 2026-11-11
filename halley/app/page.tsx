import { resumeLink, site, to, evaluation, about } from '../content/site';
import HeroPortrait from '../components/HeroPortrait';
import CaseFile from '../components/CaseFile';
import WorkGrid from '../components/WorkGrid';
import Principles from '../components/Principles';
import CopyEmail from '../components/CopyEmail';
import Mask from '../components/Mask';
import Magnetic from '../components/Magnetic';
import Marquee from '../components/Marquee';
import Signature from '../components/Signature';
import Socials from '../components/Socials';
import EvalArt from '../components/EvalArt';
import LocalTime from '../components/LocalTime';

function Eyebrow({ n, children, dark = false, count }: { n: string; children: React.ReactNode; dark?: boolean; count?: string }) {
  return (
    <div className={`rv flex items-center gap-4 border-b pb-5 ${dark ? 'border-ink-line' : 'border-txt/12'}`}>
      <span className={`grid h-9 w-9 place-items-center rounded-full font-mono text-[12px] ${dark ? 'bg-mint text-ink' : 'bg-ink text-cream'}`}>{n}</span>
      <span className={`text-[15px] font-semibold tracking-[-0.01em] ${dark ? 'text-cream' : 'text-txt'}`}>{children}</span>
      {count && <span className={`ml-auto font-mono text-[11.5px] uppercase tracking-[0.14em] ${dark ? 'text-cream-faint' : 'text-txt-faint'}`}>{count}</span>}
    </div>
  );
}

const EVAL_ICONS = [
  <><path d="M4 19V9M10 19V5M16 19v-7M22 19H2" /></>,
  <><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></>,
  <><rect x="3" y="4" width="18" height="14" rx="2" /><circle cx="9" cy="10" r="2" /><path d="M21 15l-5-5-8 8" /></>,
  <><path d="M4 6h10M4 12h7M4 18h10" /><circle cx="18" cy="12" r="3" /><path d="M20.2 14.2L22 16" /></>,
  <><path d="M4 4h16v4H4zM4 10h10v4H4zM4 16h16v4H4z" /></>,
  <><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" /><path d="M9 12l2 2 4-4" /></>,
];

export default function Home() {
  const r = resumeLink();
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-ink text-cream" data-dark>
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-60" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden>
          {Array.from({ length: 9 }).map((_, i) => (
            <path key={i} pathLength={1} className="rv line-draw" style={{ ['--d' as string]: `${0.4 + i * 0.08}s` }}
              d={`M-20 ${120 + i * 80} C 380 ${60 + i * 90}, 620 ${520 - i * 30}, 1460 ${300 + i * 40}`}
              fill="none" stroke="rgba(183,230,200,.07)" strokeWidth="1" />
          ))}
        </svg>
        <div className="pointer-events-none absolute -right-40 top-0 h-[680px] w-[680px] rounded-full bg-sage/10 blur-[130px]" />
        <div className="wrap relative grid min-h-[100svh] items-center gap-12 pb-14 pt-28 sm:pt-32 xl:grid-cols-[1.1fr_.9fr] xl:gap-10 xl:pb-12 xl:pt-28">
          <div>
            <p className="rv eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-cream-muted">
              <span className="relative inline-flex h-2 w-2"><span className="absolute inset-0 animate-ping rounded-full bg-mint/60" /><span className="relative h-2 w-2 rounded-full bg-mint" /></span>
              Open to AI product roles
            </p>
            <p className="rv mt-6 font-serif text-[22px] italic text-mint" style={{ ['--d' as string]: '.05s' }}>Hi, I&apos;m Halley.</p>
            <h1 className="reveal-group mt-3 font-serif text-[clamp(40px,5.3vw,80px)] leading-[0.98] tracking-[-0.045em]">
              <Mask text={site.headline.lead} delay={0.1} step={0.045} />
              <span className="mask" style={{ ['--d' as string]: '0.6s' }}><span className="italic text-mint">{site.headline.accent}</span></span>
            </h1>
            <p className="rv mt-7 max-w-[540px] text-[17px] leading-relaxed text-cream-muted" style={{ ['--d' as string]: '.7s' }}>{site.statement}</p>
            <div className="rv mt-9 flex flex-wrap items-center gap-3" style={{ ['--d' as string]: '.8s' }}>
              <Magnetic>
                <a href="#work" className="btn group bg-mint text-ink hover:bg-mint-glow">
                  View selected work
                  <svg className="arr-r" width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
              </Magnetic>
              <Magnetic><a href={r.href} target={r.ext ? "_blank" : undefined} rel="noopener noreferrer" className="btn border border-cream/25 text-cream hover:border-cream/60">{r.label}</a></Magnetic>
            </div>
            <div className="rv mt-10" style={{ ['--d' as string]: '.9s' }}><Socials dark /></div>
          </div>
          <div className="reveal-group order-first px-2 xl:order-none xl:px-0"><HeroPortrait /></div>
        </div>
        <div className="wrap relative flex items-center justify-between pb-8 font-mono text-[11px] uppercase tracking-[0.16em] text-cream-faint">
          <span className="hidden md:inline">{site.identity.join('  ·  ')}</span>
          <span className="hidden items-center gap-3 md:flex">Scroll<span className="relative block h-8 w-px overflow-hidden bg-cream/15"><span className="scroll-dot absolute inset-x-0 top-0 h-3 bg-mint" /></span></span>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="grain relative scroll-mt-16 bg-paper py-24 md:py-32">
        <div className="wrap"><Eyebrow n="01" count="Who I am">About me</Eyebrow></div>
        <div className="wrap mt-10 grid gap-14 lg:grid-cols-[1.15fr_.85fr] lg:gap-24">
          <div>
            <h2 className="reveal-group font-serif text-[clamp(38px,5vw,70px)] leading-[1] tracking-[-0.04em]">
              <Mask text="From data science" /><br /><span className="mask" style={{ ['--d' as string]: '.12s' }}><span className="italic text-sage-deep">to product judgment.</span></span>
            </h2>
            <p className="rv mt-8 max-w-[640px] text-[19px] leading-[1.65] text-txt/85">{about.intro}</p>
            <div className="rv mt-10">
              <p className="eyebrow text-txt-faint">Current strengths</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {about.strengths.map((s, i) => (
                  <span key={s} className="chip border-txt/15 bg-paper/70 text-txt transition-colors duration-300 hover:border-sage-deep hover:bg-sage-deep hover:text-cream" style={{ transitionDelay: `${i * 10}ms` }}>{s}</span>
                ))}
              </div>
              <p className="mt-8 max-w-[560px] text-[16px] leading-relaxed text-txt-muted"><span className="font-semibold text-txt">Interested in </span>{about.interests}</p>
            </div>
          </div>
          <div className="space-y-4">
            {about.education.map((e, i) => (
              <div key={e.title} className="rv group rounded-[26px] border border-txt/10 bg-white/50 p-7 transition-colors duration-500 hover:border-sage-deep/40" style={{ ['--d' as string]: `${i * 0.1}s` }}>
                <div className="flex items-start justify-between gap-4">
                  <p className="eyebrow text-sage-deep">{e.place}</p>
                  {e.note && <span className="chip border-sage-deep/30 font-mono text-[11.5px] text-sage-deep">{e.note}</span>}
                </div>
                <p className="mt-4 font-serif text-[25px] leading-[1.12] tracking-[-0.02em]">{e.title}</p>
              </div>
            ))}
            <div className="rv rounded-[26px] bg-ink p-7 text-cream" style={{ ['--d' as string]: '.2s' }}>
              <p className="eyebrow text-cream-faint">The path</p>
              <ol className="mt-6 space-y-5">
                {about.path.map((s, i) => (
                  <li key={s.title} className="relative flex gap-4">
                    <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${i === about.path.length - 1 ? 'border border-mint' : 'bg-mint'}`} />
                    {i < about.path.length - 1 && <span className="absolute left-[4.5px] top-5 h-[calc(100%+4px)] w-px bg-cream/15" />}
                    <div><p className="text-[16px] font-semibold">{s.title}</p><p className="mt-0.5 text-[14px] text-cream-muted">{s.note}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW I WORK ================= */}
      <section id="approach" className="relative scroll-mt-16 overflow-hidden bg-ink py-24 text-cream md:py-32" data-dark>
        <div className="pointer-events-none absolute right-0 top-1/3 h-[600px] w-[600px] rounded-full bg-sage/10 blur-[140px]" />
        <div className="wrap relative">
          <Eyebrow n="02" dark count="4 steps">How I work</Eyebrow>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <h2 className="reveal-group font-serif text-[clamp(38px,5vw,68px)] leading-[1] tracking-[-0.04em]">
              <Mask text="From a tangled problem" /><br /><span className="mask" style={{ ['--d' as string]: '.12s' }}><span className="italic text-mint">to a clear decision.</span></span>
            </h2>
            <p className="rv max-w-[460px] text-[17px] leading-relaxed text-cream-muted">Follow one case through the four steps I use on every product. It plays on its own; tap a step to jump.</p>
          </div>
          <CaseFile />
        </div>
      </section>

      {/* ================= WORK ================= */}
      <section id="work" className="grain scroll-mt-16 bg-paper py-24 md:py-32">
        <div className="wrap">
          <Eyebrow n="03" count="4 case studies">Selected work</Eyebrow>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <h2 className="reveal-group font-serif text-[clamp(38px,5vw,68px)] leading-[1] tracking-[-0.04em]">
              <Mask text="Four products," /><br /><span className="mask" style={{ ['--d' as string]: '.12s' }}><span className="italic text-sage-deep">four kinds of judgment.</span></span>
            </h2>
            <p className="rv max-w-[460px] text-[17px] leading-relaxed text-txt-muted">Production AI, a governance platform, an AI-assisted product and a strategy teardown. Open any card for the full case study.</p>
          </div>
          <WorkGrid />
        </div>
      </section>

      <Marquee items={['Evidence over confidence', 'Uncertainty is a product state', 'Humans own consequential calls', 'Protect the core', 'Governance ends in a decision']} dark />

      {/* ================= EVALUATION ================= */}
      <section id="evaluation" className="scroll-mt-16 bg-ink py-24 text-cream md:py-32" data-dark>
        <div className="wrap">
          <Eyebrow n="04" dark count="6 capabilities">AI evaluation & technical skills</Eyebrow>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <h2 className="reveal-group font-serif text-[clamp(38px,5vw,68px)] leading-[1] tracking-[-0.04em]">
              <Mask text="Evaluation is a" /><br /><span className="mask" style={{ ['--d' as string]: '.12s' }}><span className="italic text-mint">product decision.</span></span>
            </h2>
            <p className="rv max-w-[460px] text-[17px] leading-relaxed text-cream-muted">The technical work matters because of what it lets a product promise. Each piece is written as what it means for the product.</p>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {evaluation.map((e, i) => (
              <div key={e.title} className="rv eval-card group relative flex flex-col overflow-hidden rounded-[26px] border border-ink-line bg-ink-2/60 transition-[border-color,transform,box-shadow] duration-700 ease-soft hover:-translate-y-1.5 hover:border-mint/35 hover:shadow-[0_30px_60px_-30px_rgba(183,230,200,.25)]" style={{ ['--d' as string]: `${(i % 3) * 0.08}s` }}>
                <div className="relative h-[150px] border-b border-ink-line bg-[radial-gradient(circle_at_50%_120%,rgba(143,179,154,.14),transparent_70%)] px-6 pt-6">
                  <EvalArt i={i} />
                  <span className="absolute left-5 top-4 font-mono text-[10.5px] tracking-[0.14em] text-cream-faint">0{i + 1}</span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-ink-line bg-ink text-mint transition-transform duration-700 ease-soft group-hover:-rotate-6 group-hover:scale-110">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{EVAL_ICONS[i]}</svg>
                    </span>
                    <h3 className="font-serif text-[22px] leading-[1.1] tracking-[-0.02em]">{e.title}</h3>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-cream-muted">{e.implication}</p>
                  <span className="mt-auto inline-flex w-fit items-center gap-2 pt-6 font-mono text-[10.5px] uppercase tracking-[0.12em] text-mint">
                    <span className="h-1.5 w-1.5 rounded-full bg-mint" />{e.fact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW I THINK ================= */}
      <section id="thinking" className="grain scroll-mt-16 bg-paper py-24 md:py-32">
        <div className="wrap">
          <Eyebrow n="05" count="5 principles">How I make product decisions</Eyebrow>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <h2 className="reveal-group font-serif text-[clamp(38px,5vw,68px)] leading-[1] tracking-[-0.04em]">
              <Mask text="Judgment you can" /><br /><span className="mask" style={{ ['--d' as string]: '.12s' }}><span className="italic text-sage-deep">point to.</span></span>
            </h2>
            <p className="rv max-w-[460px] text-[17px] leading-relaxed text-txt-muted">Five product decisions from my work. Each one shaped what a product does when the stakes are real.</p>
          </div>
          <Principles />
        </div>
      </section>

      {/* ================= CONTACT + FOOTER ================= */}
      <section id="contact" className="relative scroll-mt-16 overflow-hidden bg-ink pt-24 text-cream md:pt-32" data-dark>
        <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-sage/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-40 h-[420px] w-[420px] rounded-full bg-mint/[.06] blur-[120px]" />
        <div className="wrap relative">
          <Eyebrow n="06" dark count="Let's talk">Contact</Eyebrow>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-end">
            <h2 className="reveal-group font-serif text-[clamp(42px,6vw,88px)] leading-[0.98] tracking-[-0.045em]">
              <Mask text="Let's build something that" /> <span className="mask" style={{ ['--d' as string]: '.25s' }}><span className="italic text-mint">decides well.</span></span>
            </h2>
            <p className="rv max-w-[420px] text-[17px] leading-relaxed text-cream-muted">Open to AI Product Manager and technical product roles, and to conversations with founders building AI products.</p>
          </div>

          <div className="rv mt-14 overflow-hidden rounded-[30px] border border-ink-line bg-ink-2/50">
            <div className="grid lg:grid-cols-[1.3fr_1fr]">
              <div className="border-b border-ink-line p-7 md:p-10 lg:border-b-0 lg:border-r">
                <p className="eyebrow text-cream-faint">Write to me</p>
                <div className="mt-5"><CopyEmail email={site.email} /></div>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Magnetic><a href={`mailto:${site.email}`} className="btn group bg-mint text-ink hover:bg-mint-glow">Send an email<svg className="arr-r" width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></a></Magnetic>
                  <Magnetic><a href={r.href} target={r.ext ? "_blank" : undefined} rel="noopener noreferrer" className="btn border border-cream/25 hover:border-cream/60">{r.label}</a></Magnetic>
                </div>
              </div>
              <div className="flex flex-col justify-between gap-8 p-7 md:p-10">
                <div>
                  <p className="eyebrow text-cream-faint">Find me on</p>
                  <div className="mt-5"><Socials dark big /></div>
                </div>
                <dl className="grid grid-cols-2 gap-4 border-t border-ink-line pt-6 text-[14px]">
                  <div><dt className="eyebrow text-cream-faint">Status</dt><dd className="mt-2 flex items-center gap-2"><span className="relative flex h-2 w-2"><span className="absolute inset-0 animate-ping rounded-full bg-mint/60" /><span className="relative h-2 w-2 rounded-full bg-mint" /></span>Open to roles</dd></div>
                  <div><dt className="eyebrow text-cream-faint">Local time</dt><dd className="mt-2"><LocalTime /> IST</dd></div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-20 border-t border-ink-line">
          <Signature text="Halley Patel" />
        </div>
        <div className="wrap relative flex flex-col gap-4 border-t border-ink-line py-7 text-[13px] text-cream-faint md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} {site.name} · Designed with care</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em]">{site.identity.join(' · ')}</span>
          <a href={to('/#main', '/')} className="group inline-flex w-fit items-center gap-3 text-cream-muted hover:text-mint">
            Back to top
            <span className="grid h-9 w-9 place-items-center rounded-full border border-cream/20 transition-[transform,border-color] duration-500 ease-soft group-hover:-translate-y-1 group-hover:border-mint">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 13V3M4 7l4-4 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
