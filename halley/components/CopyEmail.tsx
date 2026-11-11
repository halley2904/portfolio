'use client';
import { useState } from 'react';

export default function CopyEmail({ email }: { email: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard?.writeText(email).then(() => { setDone(true); setTimeout(() => setDone(false), 1800); }); }}
      className="group relative inline-flex items-center gap-3 text-left"
      aria-label={`Copy email address ${email}`}
    >
      <span className="uline font-serif text-[26px] tracking-[-0.02em] md:text-[40px]">{email}</span>
      <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full border border-cream/25 text-[11px] transition-colors group-hover:border-mint">
        <svg className={`absolute transition-all duration-300 ${done ? 'scale-50 opacity-0' : ''}`} width="15" height="15" viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" stroke="currentColor" strokeWidth="1.4" /></svg>
        <svg className={`absolute text-mint transition-all duration-300 ${done ? '' : 'scale-50 opacity-0'}`} width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      <span className={`absolute -top-7 left-0 font-mono text-[11px] uppercase tracking-[0.14em] text-mint transition-opacity duration-300 ${done ? 'opacity-100' : 'opacity-0'}`}>Copied</span>
    </button>
  );
}
