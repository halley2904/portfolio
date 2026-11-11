'use client';
import { useState } from 'react';
import { projects, to, type Category } from '../content/site';
import ProjectArt from './ProjectArt';
import Spot from './Spot';

const FILTERS: ('All' | Category)[] = ['All', 'Production', 'Product build', 'Strategy'];

export default function WorkGrid() {
  const [f, setF] = useState<'All' | Category>('All');
  const list = projects.filter((p) => f === 'All' || p.category === f);
  return (
    <>
      <div className="rv mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
        {FILTERS.map((x) => (
          <button key={x} role="tab" aria-selected={f === x} onClick={() => setF(x)}
            className={`chip transition-colors duration-300 ${f === x ? 'border-ink bg-ink text-cream' : 'border-txt/15 text-txt-muted hover:border-txt/40 hover:text-txt'}`}>
            {x}
            <span className="ml-2 font-mono text-[10.5px] opacity-60">{x === 'All' ? projects.length : projects.filter((p) => p.category === x).length}</span>
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {list.map((p, i) => (
          <Spot key={p.slug} className="rv group rounded-[28px]" >
            <a href={to(`/work/${p.slug}/`, '/')} className="flex h-full flex-col overflow-hidden rounded-[28px] border border-txt/10 bg-white/45 transition-[border-color,transform,box-shadow] duration-500 ease-soft hover:-translate-y-1 hover:border-txt/20 hover:shadow-[0_30px_60px_-30px_rgba(40,50,40,.35)]" style={{ transitionDelay: '0s' }}>
              <div className="relative aspect-[16/9] overflow-hidden border-b border-txt/10 bg-paper-2/70 px-6 pt-6">
                <span className="absolute left-6 top-5 font-mono text-[11px] tracking-[0.16em] text-txt-faint">{p.no} / 04</span>
                <span className="absolute right-6 top-5 chip border-txt/15 bg-paper/80 !py-0.5 text-[11px] text-txt-muted">{p.category}</span>
                <div className="h-full w-full pt-4 transition-transform duration-700 ease-soft group-hover:scale-[1.04]"><ProjectArt slug={p.slug} /></div>
              </div>
              <div className="flex flex-1 flex-col p-7 md:p-8">
                <p className="eyebrow text-sage-deep">{p.kind}</p>
                <h3 className="mt-3 font-serif text-[30px] leading-[1.05] tracking-[-0.03em] md:text-[34px]">{p.title}</h3>
                <p className="mt-4 text-[15.5px] leading-relaxed text-txt-muted">{p.outcome}</p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => <span key={t} className="chip border-txt/10 text-txt-muted">{t}</span>)}
                </div>
                <span className="mt-auto inline-flex items-center gap-3 pt-8 text-[14.5px] font-semibold">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-cream transition-[transform,background-color] duration-500 ease-soft group-hover:rotate-45 group-hover:bg-sage-deep">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                  </span>
                  Read the case study
                </span>
              </div>
            </a>
          </Spot>
        ))}
      </div>
    </>
  );
}
