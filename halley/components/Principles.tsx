'use client';
import { useState } from 'react';
import { principles } from '../content/site';

export default function Principles() {
  const [open, setOpen] = useState(0);
  return (
    <div className="mt-12 border-t border-txt/15">
      {principles.map((p, i) => (
        <div key={p.title} className={`rv border-b border-txt/15 ${open === i ? 'open' : ''}`} style={{ ['--d' as string]: `${i * 0.05}s` }}>
          <button className="group flex w-full items-center gap-5 py-7 text-left md:gap-10 md:py-8" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            <span className="w-8 shrink-0 font-mono text-[12px] tracking-[0.12em] text-txt-faint">0{i + 1}</span>
            <span className={`flex-1 font-serif text-[26px] leading-[1.1] tracking-[-0.03em] transition-colors duration-500 md:text-[38px] ${open === i ? 'text-txt' : 'text-txt/70 group-hover:text-txt'}`}>{p.title}</span>
            <span className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors duration-500 ${open === i ? 'border-sage-deep bg-sage-deep text-cream' : 'border-txt/20'}`}>
              <span className="absolute h-[1.5px] w-3.5 bg-current" />
              <span className={`absolute h-3.5 w-[1.5px] bg-current transition-transform duration-500 ${open === i ? 'scale-y-0' : ''}`} />
            </span>
          </button>
          <div className="acc-body">
            <div>
              <div className="grid gap-4 pb-8 pl-[52px] pr-14 md:grid-cols-[1fr_auto] md:pl-[72px]">
                <p className="max-w-[620px] text-[17px] leading-relaxed text-txt-muted">{p.body}</p>
                <span className="chip h-fit w-fit border-sage-deep/30 text-sage-deep">From {p.from}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
