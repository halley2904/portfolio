import { site } from '../content/site';

export default function Footer() {
  return (
    <footer className="bg-ink text-cream" data-dark>
      <div className="wrap flex flex-col gap-4 border-t border-ink-line py-8 text-[13px] text-cream-faint md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span className="font-mono text-[11.5px] uppercase tracking-[0.14em]">{site.identity.join(' · ')}</span>
        <a href="#main" className="uline w-fit">Back to top</a>
      </div>
    </footer>
  );
}
