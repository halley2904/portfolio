'use client';
import { useEffect, useRef, useState } from 'react';
import DecisionEngine from './DecisionEngine';

const STEPS = [
  { k: 'Understand the mess', d: 'Records, guidelines, requests and policies. Every real problem arrives tangled.', p: 0.08 },
  { k: 'Define what good means', d: 'Domain rules become requirements a system can actually be tested against.', p: 0.42 },
  { k: 'Build the workflow', d: 'One product routes the inputs, with guardrails and a person in control.', p: 0.66 },
  { k: 'Decide with evidence', d: 'Approve, review or escalate, measured against cases experts agree on.', p: 1 },
];
const DUR = 3600;

/* Plays the four steps on its own once visible. Click any step to jump. */
export default function ProcessAuto() {
  const box = useRef<HTMLDivElement>(null);
  const prog = useRef(0);
  const [step, setStep] = useState(0);
  const [fill, setFill] = useState(0);
  const st = useRef({ step: 0, t0: 0, on: false, paused: false });

  useEffect(() => {
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      st.current.on = e.isIntersecting;
      if (e.isIntersecting && !st.current.t0) st.current.t0 = performance.now();
    }, { threshold: 0.35 });
    if (box.current) io.observe(box.current);
    const loop = (now: number) => {
      const s = st.current;
      if (s.on && s.t0 && !s.paused) {
        const k = (now - s.t0) / DUR;
        if (k >= 1) { s.step = (s.step + 1) % STEPS.length; s.t0 = now; setStep(s.step); setFill(0); if (s.step === 0) prog.current = 0; }
        else setFill(k);
      }
      const target = STEPS[s.step].p;
      prog.current += (target - prog.current) * 0.045;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);

  const go = (i: number) => { st.current.step = i; st.current.t0 = performance.now(); setStep(i); setFill(0); };

  return (
    <div ref={box} className="mt-14 grid items-center gap-6 lg:grid-cols-[.9fr_1.1fr] lg:gap-16"
      onMouseEnter={() => (st.current.paused = true)} onMouseLeave={() => { st.current.paused = false; st.current.t0 = performance.now() - fill * DUR; }}>
      <ol className="order-2 space-y-2.5 lg:order-1" role="tablist" aria-label="How I work, step by step">
        {STEPS.map((s, i) => (
          <li key={s.k}>
            <button role="tab" aria-selected={i === step} onClick={() => go(i)}
              className={`group relative w-full overflow-hidden rounded-[20px] border p-5 text-left transition-[border-color,background-color] duration-500 ${i === step ? 'border-mint/35 bg-ink-2' : 'border-ink-line hover:border-cream/20'}`}>
              <div className="flex items-center gap-4">
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-mono text-[11.5px] transition-colors duration-500 ${i === step ? 'bg-mint text-ink' : i < step ? 'bg-mint/20 text-mint' : 'border border-cream/20 text-cream-faint'}`}>
                  {i < step ? '✓' : `0${i + 1}`}
                </span>
                <span className={`font-serif text-[21px] tracking-[-0.02em] transition-colors duration-500 md:text-[23px] ${i === step ? 'text-cream' : 'text-cream/55 group-hover:text-cream/80'}`}>{s.k}</span>
              </div>
              <p className={`overflow-hidden pl-12 text-[15px] leading-relaxed text-cream-muted transition-[max-height,opacity,margin] duration-700 ease-soft ${i === step ? 'mt-2.5 max-h-24 opacity-100' : 'mt-0 max-h-0 opacity-0'}`}>{s.d}</p>
              {i === step && <span className="absolute bottom-0 left-0 h-[2px] bg-mint" style={{ width: `${fill * 100}%` }} />}
            </button>
          </li>
        ))}
      </ol>
      <div className="relative order-1 rounded-[30px] border border-ink-line bg-ink-2/40 p-4 md:p-8 lg:order-2">
        <span className="absolute left-5 top-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-cream-faint md:left-8 md:top-6">Step {step + 1} of 4 · {STEPS[step].k}</span>
        <div className="pt-6"><DecisionEngine progress={prog} /></div>
      </div>
    </div>
  );
}
