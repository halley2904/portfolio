'use client';
import { useEffect, useState } from 'react';

export default function CaseToc({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const on = () => {
      let cur = items[0]?.id;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) cur = it.id;
      }
      setActive(cur);
      const body = document.getElementById('case-body');
      if (body) {
        const r = body.getBoundingClientRect();
        setProg(Math.max(0, Math.min(1, (window.innerHeight * 0.35 - r.top) / r.height)));
      }
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [items]);
  return (
    <>
      <nav className="sticky top-24 hidden lg:block" aria-label="Case study sections">
        <div className="relative pl-5">
          <span className="absolute left-0 top-1 h-[calc(100%-8px)] w-px bg-txt/15" />
          <span className="absolute left-0 top-1 w-px bg-sage-deep transition-[height] duration-300" style={{ height: `calc(${prog * 100}% - 8px)` }} />
          <ol className="space-y-2.5">
            {items.map((it, i) => (
              <li key={it.id}>
                <a href={`#${it.id}`} className={`flex gap-3 text-[13.5px] transition-colors duration-300 ${active === it.id ? 'font-semibold text-txt' : 'text-txt-faint hover:text-txt-muted'}`}>
                  <span className="w-5 font-mono text-[11px] leading-[20px]">{String(i + 1).padStart(2, '0')}</span>
                  {it.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>
      <div className="fixed inset-x-0 top-[68px] z-40 h-[2px] bg-transparent lg:hidden">
        <div className="h-full bg-sage-deep transition-[width] duration-200" style={{ width: `${prog * 100}%` }} />
      </div>
    </>
  );
}
