'use client';
import { useEffect, useRef } from 'react';
import { asset, metrics, site, to } from '../content/site';
import Counter from './Counter';

/* Arched portrait with a slowly turning text ring and three evidence cards that drift with the pointer. */
export default function HeroPortrait() {
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wrap.current; if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const move = (e: PointerEvent) => { tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5; };
    const loop = () => {
      x += (tx - x) * 0.06; y += (ty - y) * 0.06;
      el.querySelectorAll<HTMLElement>('[data-depth]').forEach((n) => { const d = +n.dataset.depth!; n.style.transform = `translate3d(${x * d}px, ${y * d}px, 0)`; });
      raf = requestAnimationFrame(loop);
    };
    addEventListener('pointermove', move); raf = requestAnimationFrame(loop);
    return () => { removeEventListener('pointermove', move); cancelAnimationFrame(raf); };
  }, []);
  const pos = ['-left-[58px] top-[16%] sm:-left-20 xl:-left-24 xl:top-[14%]', '-right-[58px] top-[50%] sm:-right-16 xl:top-[44%]', '-left-[50px] -bottom-[3%] sm:-left-14 xl:bottom-[6%]'];
  return (
    <div ref={wrap} className="relative mx-auto w-[66%] max-w-[340px] sm:w-[56%] xl:max-w-[440px] xl:w-full">
      <div data-depth="-14" className="relative">
        <div className="hero-photo relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[36px] bg-ink-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(site.photo || '/halley.jpg')} alt="Halley Patel" className="h-full w-full scale-[1.06] object-cover object-[50%_30%]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
        </div>
        <span className="pointer-events-none absolute -inset-3 rounded-t-[999px] rounded-b-[44px] border border-mint/25" />
      </div>
      {/* turning ring */}
      <div data-depth="22" className="absolute -right-8 -top-5 h-[92px] w-[92px] sm:h-[120px] sm:w-[120px] md:-right-10 md:-top-8 md:h-[150px] md:w-[150px]">
        <div className="grid h-full w-full place-items-center rounded-full bg-mint text-ink shadow-[0_20px_50px_-20px_rgba(183,230,200,.6)]">
          <svg viewBox="0 0 200 200" className="ring-spin absolute inset-0 h-full w-full">
            <defs><path id="rp" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" /></defs>
            <text fontSize="13" letterSpacing="2.1" className="font-mono" fill="#121512"><textPath href="#rp">AI PRODUCT MANAGER · STRATEGY · EVALUATION · </textPath></text>
          </svg>
          <span className="font-serif text-[22px] italic sm:text-[26px] md:text-[30px]">hp</span>
        </div>
      </div>
      {/* evidence cards */}
      <div>
        {metrics.map((m, i) => (
          <a key={m.label} href={to(m.href || '/', '/')} data-depth={String([30, 42, 24][i])}
            className={`hero-chip group block rounded-[18px] border border-cream/12 bg-ink-2/80 p-3.5 absolute w-[116px] rounded-[14px] px-3 py-2.5 shadow-[0_20px_40px_-20px_rgba(0,0,0,.6)] backdrop-blur-md transition-colors hover:border-mint/50 sm:w-[170px] sm:rounded-[18px] sm:p-3.5 xl:w-[200px] xl:p-4 ${pos[i]}`}
            style={{ ['--d' as string]: `${1.1 + i * 0.12}s` }}>
            <span className="block font-serif text-[20px] leading-none tracking-[-0.03em] text-cream sm:text-[26px] xl:text-[32px]"><Counter value={m.value} suffix={m.suffix} /></span>
            <span className="mt-1 block text-[10.5px] leading-snug text-cream-muted sm:text-[12px] xl:text-[13px]">{m.label}</span>
            <span className="mt-2 hidden font-mono text-[10px] uppercase tracking-[0.12em] text-cream-faint transition-colors group-hover:text-mint xl:block">{m.source}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
