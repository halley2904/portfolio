'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { resumeLink, site, to } from '../content/site';

const LINKS = [
  ['About', '/#about'],
  ['Approach', '/#approach'],
  ['Work', '/#work'],
  ['Evaluation', '/#evaluation'],
  ['Thinking', '/#thinking'],
  ['Contact', '/#contact'],
];

export default function Nav() {
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname() || '/';

  useEffect(() => {
    const check = () => {
      setScrolled(window.scrollY > 12);
      const els = document.elementsFromPoint(window.innerWidth / 2, 40);
      const el = els.find((e) => !e.closest('header'));
      setDark(!!el?.closest('[data-dark]'));
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    window.addEventListener('intro:done', () => setTimeout(check, 50));
    const iv = setInterval(check, 400); setTimeout(() => clearInterval(iv), 4000);
    return () => { window.removeEventListener('scroll', check); window.removeEventListener('resize', check); };
  }, []);

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);
  const [active, setActive] = useState('');
  useEffect(() => {
    const ids = LINKS.map(([, h]) => h.split('#')[1]);
    const on = () => {
      let cur = '';
      ids.forEach((id) => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < innerHeight * 0.4) cur = id; });
      setActive(cur);
    };
    on(); addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, []);

  const tone = dark ? 'text-cream' : 'text-txt';
  const bg = scrolled ? (dark ? 'bg-ink/70 border-ink-line' : 'bg-paper/75 border-txt/10') : 'bg-transparent border-transparent';

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-500 ${bg} ${tone}`}>
        <div className="wrap flex h-[68px] items-center justify-between">
          <a href={to('/', path)} className="group flex items-center gap-2.5" aria-label="Halley Patel, home">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-current/30 font-serif text-[14px] italic">hp</span>
            <span className="font-serif text-[19px] tracking-[-0.02em]">Halley Patel</span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {LINKS.map(([l, h]) => (
              <a key={l} href={to(h, path)} className={`navlink text-[14px] font-medium transition-opacity hover:opacity-100 ${active === h.split('#')[1] ? 'on opacity-100' : 'opacity-70'}`}>{l}</a>
            ))}
            <a href={resumeLink(path).href} target="_blank" rel="noopener noreferrer" className={`btn !px-4 !py-2 text-[13.5px] ${dark ? 'bg-mint text-ink hover:bg-mint-glow' : 'bg-ink text-cream hover:bg-sage-deep'}`} >
              Résumé
            </a>
          </nav>
          <button className="relative h-10 w-10 lg:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            <span className={`absolute left-2 right-2 top-[15px] h-[1.5px] bg-current transition-transform duration-500 ${open ? 'translate-y-[4.5px] rotate-45' : ''}`} />
            <span className={`absolute left-2 right-2 top-[24px] h-[1.5px] bg-current transition-transform duration-500 ${open ? '-translate-y-[4.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </header>
      <div className={`fixed inset-0 z-40 bg-ink text-cream transition-[clip-path] duration-700 ease-soft lg:hidden ${open ? '[clip-path:circle(150%_at_100%_0)]' : '[clip-path:circle(0%_at_100%_0)]'}`} data-dark>
        <nav className="wrap flex h-full flex-col justify-center gap-2 pt-16" aria-label="Mobile">
          {LINKS.map(([l, h], i) => (
            <a key={l} href={to(h, path)} onClick={() => setOpen(false)} className="font-serif text-[44px] leading-[1.15] tracking-[-0.03em]" style={{ transition: `opacity .6s ${0.15 + i * 0.05}s, transform .6s ${0.15 + i * 0.05}s`, opacity: open ? 1 : 0, transform: open ? 'none' : 'translateY(16px)' }}>
              {l}
            </a>
          ))}
          <a href={resumeLink(path).href} target={resumeLink().ext ? "_blank" : undefined} rel="noopener noreferrer" className="btn mt-8 w-fit bg-mint text-ink">{resumeLink().label}</a>
        </nav>
      </div>
    </>
  );
}
