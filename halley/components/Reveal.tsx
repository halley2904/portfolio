'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/* Adds .in to .rv / .reveal-group elements as they scroll into view, after the intro. */
export default function Reveal() {
  const path = usePathname();
  useEffect(() => {
    let io: IntersectionObserver | null = null, mo: MutationObserver | null = null;
    const seen = new WeakSet<Element>();
    const keep = new MutationObserver((ms) => ms.forEach((m) => { const t = m.target as Element; if (seen.has(t) && !t.classList.contains('in')) t.classList.add('in'); }));
    keep.observe(document.body, { attributes: true, attributeFilter: ['class'], subtree: true });
    const start = () => {
      io = new IntersectionObserver(
        (es) => es.forEach((e) => { if (e.isIntersecting) { seen.add(e.target); e.target.classList.add('in'); io!.unobserve(e.target); } }),
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
      );
      const scan = () => document.querySelectorAll('.rv:not(.in), .reveal-group:not(.in)').forEach((el) => io!.observe(el));
      scan();
      mo = new MutationObserver(scan); mo.observe(document.body, { childList: true, subtree: true });
    };
    if ((window as any).__introDone) start(); else window.addEventListener('intro:done', start, { once: true });
    const fallback = setTimeout(() => { if (!io) start(); }, 2600);
    return () => { io?.disconnect(); mo?.disconnect(); keep.disconnect(); clearTimeout(fallback); window.removeEventListener('intro:done', start); };
  }, [path]);
  return null;
}
