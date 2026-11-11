'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    (window as any).__lenis = lenis;
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      const i = href.indexOf('#');
      if (i < 0) return;
      const before = href.slice(0, i);
      if (before && !location.pathname.endsWith(before.replace(/^(\.\.\/)+/, '').replace('index.html', '')) && before !== 'index.html' && before !== '/') return;
      const el = document.getElementById(href.slice(i + 1));
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -10 });
    };
    document.addEventListener('click', onClick);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); document.removeEventListener('click', onClick); };
  }, []);
  return null;
}
