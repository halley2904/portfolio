'use client';
import { useEffect, useState } from 'react';

/* Opening sequence: the signature is written, a counter fills, the curtain lifts. Once per session. */
export default function Intro() {
  const [phase, setPhase] = useState<'on' | 'out' | 'gone'>('on');
  const [n, setN] = useState(0);
  useEffect(() => {
    const done = () => { (window as any).__introDone = true; window.dispatchEvent(new Event('intro:done')); };
    let seen = false;
    try { seen = sessionStorage.getItem('hp-intro') === '1'; sessionStorage.setItem('hp-intro', '1'); } catch {}
    if (seen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPhase('gone'); done(); return; }
    document.documentElement.style.overflow = 'hidden';
    const t0 = performance.now(), D = 1500;
    let raf = 0;
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / D);
      setN(Math.round(100 * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(step);
      else setTimeout(() => { setPhase('out'); done(); document.documentElement.style.overflow = ''; setTimeout(() => setPhase('gone'), 1100); }, 250);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);
  if (phase === 'gone') return null;
  return (
    <div data-dark className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-cream transition-[clip-path] duration-[1000ms] ease-soft ${phase === 'out' ? '[clip-path:inset(0_0_100%_0_round_0_0_50%_50%)]' : '[clip-path:inset(0_0_0_0_round_0)]'}`} aria-hidden>
      <svg viewBox="0 0 240 120" className="w-[200px] md:w-[260px]">
        <text x="120" y="88" textAnchor="middle" className="intro-sig font-serif" fontStyle="italic" fontSize="96">Halley</text>
      </svg>
      <div className="mt-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-cream-faint">
        <span>Problems</span>
        <span className="relative h-px w-28 overflow-hidden bg-cream/15"><span className="absolute inset-y-0 left-0 bg-mint" style={{ width: `${n}%` }} /></span>
        <span>Decisions</span>
      </div>
      <span className="absolute bottom-8 right-8 font-serif text-[64px] leading-none tracking-[-0.04em] text-cream/15 tabular-nums md:text-[96px]">{n}</span>
    </div>
  );
}
