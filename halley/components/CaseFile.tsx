'use client';
import { useEffect, useRef, useState } from 'react';

/*
  "Live case file": one illustrative record moves through four product steps.
  Every slot is always in the layout (empty dashed slot -> filled), so the height
  never changes and the page never jumps while it plays.
*/

const STEPS = [
  { k: 'Understand', t: 'Read the mess', d: 'Find the signals that matter in a messy record, and the gaps that should worry us.', o: '2 signals · 2 gaps found', q: 'Which of these actually changes the outcome?' },
  { k: 'Define', t: 'Write down what good means', d: 'Turn a clinical guideline into a rule the system can be tested against.', o: 'One testable rule', q: 'How will we know the system got it right?' },
  { k: 'Build', t: 'Score it, with guardrails', d: 'The model scores risk, and is honest about how confident it is.', o: 'Score 0.82 · medium confidence', q: 'What should happen when the model is unsure?' },
  { k: 'Decide', t: 'Route it to a person', d: 'High risk with medium confidence goes to review, with the evidence attached.', o: '1 case to review · evidence attached', q: 'Who owns this call, and what do they need to see?' },
];
const DUR = 3200;      // per step
const HOLD = 1400;     // extra pause on the final state before looping

const FIELDS: { k: string; v: string; mark?: 'sig' | 'gap'; at?: number }[] = [
  { k: 'Member', v: '67 · F' },
  { k: 'Primary diagnosis', v: 'Heart failure' },
  { k: 'Admissions, last 90 days', v: '3', mark: 'sig', at: 0 },
  { k: 'Discharge note', v: 'Missing', mark: 'gap', at: 1 },
  { k: 'Follow-up booked', v: 'No', mark: 'gap', at: 2 },
  { k: 'Medication changes', v: '4', mark: 'sig', at: 3 },
];

/* a slot that is always in the layout: dashed + label when empty, content when filled */
function Slot({ on, label, children, className = '' }: { on: boolean; label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative grid ${className}`}>
      <div className={`col-start-1 row-start-1 flex items-center justify-center rounded-[14px] border border-dashed border-txt/20 font-mono text-[10.5px] uppercase tracking-[0.14em] text-txt-faint transition-opacity duration-300 ${on ? 'opacity-0' : 'opacity-100'}`}>
        {label}
      </div>
      <div className={`col-start-1 row-start-1 transition-all duration-500 ease-soft ${on ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
        {children}
      </div>
    </div>
  );
}

export default function CaseFile() {
  const box = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [fill, setFill] = useState(0);
  const [hl, setHl] = useState(0);
  const st = useRef({ step: 0, t0: 0, on: false, paused: false, started: false });

  useEffect(() => {
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      const s = st.current;
      s.on = e.isIntersecting;
      if (e.isIntersecting && !s.started) { s.started = true; s.step = 0; s.t0 = performance.now(); setStep(0); setHl(0); }
    }, { threshold: 0.12 });
    if (box.current) io.observe(box.current);
    const loop = (now: number) => {
      const s = st.current;
      if (s.on && s.started && !s.paused) {
        const len = s.step === STEPS.length - 1 ? DUR + HOLD : DUR;
        const k = (now - s.t0) / len;
        if (k >= 1) { s.step = (s.step + 1) % STEPS.length; s.t0 = now; setStep(s.step); setFill(0); if (s.step === 0) setHl(0); }
        else setFill(k);
        if (s.step === 0) setHl(Math.min(4, Math.floor(k * 7)));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);

  const go = (i: number) => { const s = st.current; s.started = true; s.step = i; s.t0 = performance.now(); setStep(i); setFill(0); setHl(i > 0 ? 4 : 0); };
  const r = (n: number) => step >= n;
  const marks = step === 0 ? hl : 4;

  return (
    <div ref={box} className="mt-14 [overflow-anchor:none]"
      onMouseEnter={() => (st.current.paused = true)}
      onMouseLeave={() => { const s = st.current; s.paused = false; s.t0 = performance.now() - fill * (s.step === STEPS.length - 1 ? DUR + HOLD : DUR); }}>

      {/* stepper */}
      <div className="grid grid-cols-4 gap-2 md:gap-4" role="tablist" aria-label="How I work, step by step">
        {STEPS.map((s, i) => (
          <button key={s.k} role="tab" aria-selected={i === step} onClick={() => go(i)} className="group text-left">
            <span className="relative block h-[2px] overflow-hidden rounded-full bg-cream/10">
              <span className="absolute inset-y-0 left-0 bg-mint" style={{ width: i < step ? '100%' : i === step ? `${fill * 100}%` : '0%' }} />
            </span>
            <span className="mt-3 flex flex-col gap-1 md:mt-4 md:flex-row md:items-baseline md:gap-2">
              <span className={`font-mono text-[11px] tracking-[0.12em] transition-colors ${i <= step ? 'text-mint' : 'text-cream-faint'}`}>0{i + 1}</span>
              <span className={`truncate text-[12.5px] font-semibold transition-colors sm:text-[14px] md:text-[15px] ${i === step ? 'text-cream' : 'text-cream/45 group-hover:text-cream/75'}`}>{s.k}</span>
            </span>
          </button>
        ))}
      </div>

      {/* stage */}
      <div className="relative mt-8 overflow-hidden rounded-[32px] border border-ink-line bg-[radial-gradient(120%_90%_at_20%_0%,rgba(143,179,154,.12),transparent_60%)] bg-ink-2/50 p-5 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-12">

          {/* ---- the case card ---- */}
          <div className="relative">
            <div className={`relative overflow-hidden rounded-[22px] bg-paper p-6 text-txt shadow-[0_40px_80px_-40px_rgba(0,0,0,.7)] transition-transform duration-700 ease-soft md:p-7 ${r(3) ? 'lg:-rotate-[1deg]' : ''}`}>
              {/* scan band (build) */}
              <span className={`pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-mint/0 via-mint/35 to-mint/0 ${step === 2 ? 'cf-scan' : 'opacity-0'}`} />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-txt-faint">Case file</p>
                  <p className="mt-1.5 whitespace-nowrap font-serif text-[22px] leading-none tracking-[-0.02em] sm:text-[26px]">Claim #48213</p>
                </div>
                <span key={step} className={`chip cf-pop shrink-0 font-mono text-[10.5px] uppercase tracking-[0.1em] ${r(3) ? 'border-[#C9A84E]/50 bg-[#E9D9A6]/40 text-[#7A6320]' : r(1) ? 'border-sage-deep/30 bg-sage-soft/50 text-sage-deep' : 'border-txt/15 text-txt-faint'}`}>
                  {r(3) ? 'Needs review' : r(2) ? 'Scoring' : r(1) ? 'Rule applied' : 'Incoming'}
                </span>
              </div>

              <dl className="mt-6 divide-y divide-txt/10 border-y border-txt/10">
                {FIELDS.map((f) => {
                  const on = f.mark && f.at !== undefined && marks > f.at;
                  return (
                    <div key={f.k} className="relative flex items-center justify-between gap-4 py-2.5 text-[14px]">
                      <dt className="text-txt-muted">{f.k}</dt>
                      <dd className="relative mr-1 font-semibold">
                        <span className={`absolute -left-1.5 -right-0.5 -inset-y-0.5 origin-left rounded-[5px] transition-transform duration-500 ease-soft ${f.mark === 'gap' ? 'bg-[#E6A98C]/45' : 'bg-mint/70'} ${on ? 'scale-x-100' : 'scale-x-0'}`} />
                        <span className="relative">{f.v}</span>
                      </dd>
                    </div>
                  );
                })}
              </dl>

              {/* rule (define) */}
              <Slot on={r(1)} label="02 · Rule goes here" className="mt-5">
                <div className="flex items-start gap-3 rounded-[14px] border border-sage-deep/30 bg-sage-soft/40 p-3.5">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-sage-deep font-mono text-[10px] text-cream">IF</span>
                  <p className="text-[13.5px] leading-snug"><span className="font-semibold">High risk</span> when readmission score is <span className="font-mono">≥ 0.70</span>, or two or more care gaps.
                    <span className="mt-1 block font-mono text-[10.5px] uppercase tracking-[0.1em] text-sage-deep">From clinical guideline · testable</span></p>
                </div>
              </Slot>

              {/* score (build) */}
              <Slot on={r(2)} label="03 · Score goes here" className="mt-4">
                <div className="px-0.5 pb-0.5 pt-1">
                  <div className="flex items-center justify-between text-[12.5px]">
                    <span className="font-mono uppercase tracking-[0.1em] text-txt-faint">Risk score</span>
                    <span className="font-mono font-semibold">0.82</span>
                  </div>
                  <div className="relative mt-5 h-2.5 rounded-full bg-txt/10">
                    <span className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sage to-[#C98B6B] transition-[width] duration-[900ms] ease-soft" style={{ width: r(2) ? '82%' : '0%' }} />
                    <span className="absolute -top-1.5 h-5 w-[2px] bg-txt" style={{ left: '70%' }} />
                    <span className="absolute -top-5 -translate-x-1/2 font-mono text-[10px] text-txt-muted" style={{ left: '70%' }}>0.70</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-[12px]">
                    <span className="chip border-txt/15">Confidence: <b className="ml-1">medium</b></span>
                    <span className="chip border-txt/15">Guardrail: <b className="ml-1 text-sage-deep">passed</b></span>
                  </div>
                </div>
              </Slot>

              {/* routed (decide) */}
              <Slot on={r(3)} label="04 · Decision goes here" className="mt-4">
                <div className="flex items-center justify-between gap-3 rounded-[14px] bg-txt/[.04] px-3.5 py-3">
                  <p className="text-[13px] leading-snug text-txt-muted">Routed to <b className="text-txt">care team review</b><span className="block font-mono text-[10.5px] uppercase tracking-[0.1em] text-txt-faint">Evidence attached</span></p>
                  <span className={`shrink-0 rotate-[-8deg] rounded-[10px] border-2 border-sage-deep px-3 py-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-sage-deep transition-all duration-500 ${r(3) ? 'scale-100 opacity-90' : 'scale-150 opacity-0'}`}
                    style={{ transitionTimingFunction: 'cubic-bezier(.3,1.6,.5,1)', transitionDelay: r(3) ? '.3s' : '0s' }}>
                    Human sign-off
                  </span>
                </div>
              </Slot>
            </div>
            <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-cream-faint">Illustrative example · not real patient data</p>
          </div>

          {/* ---- narration + queue ---- */}
          <div className="flex flex-col gap-8">
            {/* all four stacked in one grid cell: height = tallest, never changes */}
            <div className="grid">
              {STEPS.map((s, i) => (
                <div key={s.k} aria-hidden={i !== step} className={`col-start-1 row-start-1 transition-all duration-500 ease-soft ${i === step ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}>
                  <span className="font-serif text-[64px] italic leading-none text-mint/80 md:text-[80px]">0{i + 1}</span>
                  <p className="mt-3 font-serif text-[28px] leading-[1.1] tracking-[-0.025em] md:text-[34px]">{s.t}</p>
                  <p className="mt-3 max-w-[440px] text-[16px] leading-relaxed text-cream-muted">{s.d}</p>
                  <div className="mt-7 border-l-2 border-mint/40 pl-4">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-cream-faint">The question I ask</p>
                    <p className="mt-1.5 font-serif text-[20px] italic leading-snug text-cream/90 md:text-[22px]">{s.q}</p>
                  </div>
                  <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/[.06] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-mint"><span className="h-1.5 w-1.5 rounded-full bg-mint" />Output: {s.o}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[22px] border border-ink-line bg-ink/60 p-5 lg:mt-auto">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-cream-faint">Decision queue</p>
              <div className="mt-4 grid grid-cols-3 gap-2.5">
                {[
                  { n: 'Approve', c: '#B7E6C8', base: 41 },
                  { n: 'Needs review', c: '#E9D9A6', base: 11 },
                  { n: 'Escalate', c: '#E6A98C', base: 3 },
                ].map((q, i) => {
                  const hit = i === 1 && r(3);
                  return (
                    <div key={q.n} className={`relative rounded-[14px] border p-3 transition-colors duration-500 ${hit ? 'border-[#E9D9A6]/60 bg-[#E9D9A6]/[.07]' : 'border-ink-line'}`}>
                      <span className="flex items-start gap-1.5 text-[10.5px] font-semibold leading-tight text-cream/80 sm:text-[11.5px]"><span className="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: q.c }} />{q.n}</span>
                      <span key={hit ? 'h' : 'n'} className={`mt-2 block font-serif text-[28px] leading-none tracking-[-0.03em] tabular-nums ${hit ? 'cf-pop' : ''}`}>{q.base + (hit ? 1 : 0)}</span>
                      <span className="mt-3 block space-y-1">
                        {[0, 1].map((k) => <span key={k} className="block h-1.5 rounded-full bg-cream/10" style={{ width: `${70 - k * 20}%` }} />)}
                      </span>
                      {/* reserved row: fixed height, only fades */}
                      <span className={`mt-2 block h-[22px] rounded-md bg-paper px-2 py-1 font-mono text-[9.5px] text-ink transition-all duration-500 ${hit ? 'translate-y-0 opacity-100' : i === 1 ? 'translate-y-1 opacity-0' : 'hidden'}`} style={{ transitionDelay: hit ? '.5s' : '0s' }}>
                        #48213<span className="hidden sm:inline"> · 3 evidence</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
