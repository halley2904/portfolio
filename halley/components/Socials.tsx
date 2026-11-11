import { site } from '../content/site';

const ICONS: Record<string, React.ReactNode> = {
  LinkedIn: <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.05c.53-1 1.83-2.05 3.76-2.05 4.02 0 4.76 2.64 4.76 6.08v5.47h-4v-4.85c0-1.16-.02-2.65-1.62-2.65-1.62 0-1.87 1.26-1.87 2.57v4.93h-4v-11Z" />,
  GitHub: <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />,
  X: <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.17h1.7L7.4 4.74H5.58l11.09 14.43Z" />,
  WhatsApp: <path d="M12.04 2a9.9 9.9 0 0 0-8.48 15l-1.4 5.13 5.25-1.38A9.9 9.9 0 1 0 12.04 2Zm5.8 14.03c-.25.7-1.44 1.33-1.98 1.38-.51.05-1 .24-3.36-.7-2.84-1.12-4.65-4.03-4.79-4.22-.14-.18-1.14-1.52-1.14-2.9 0-1.38.72-2.05.98-2.34.25-.28.55-.35.74-.35l.53.01c.17 0 .4-.07.62.47.24.56.8 1.94.86 2.08.07.14.12.3.02.49-.1.18-.14.3-.28.46-.14.16-.3.36-.42.48-.14.14-.29.29-.12.57.16.28.73 1.2 1.56 1.95 1.08.96 1.98 1.26 2.26 1.4.28.14.45.12.61-.07.17-.19.7-.82.89-1.1.18-.28.37-.23.62-.14.25.1 1.6.76 1.88.9.27.13.46.2.52.32.07.11.07.66-.18 1.36Z" />,
};

export default function Socials({ dark = false, big = false }: { dark?: boolean; big?: boolean }) {
  const list = ([['LinkedIn', site.linkedin], ['GitHub', site.github], ['X', site.x], ['WhatsApp', site.whatsapp]] as const).filter(([, h]) => h);
  return (
    <div className="flex flex-wrap gap-2">
      {list.map(([n, h]) => (
        <a key={n} href={h} target="_blank" rel="noopener noreferrer" aria-label={n}
          className={`group inline-flex items-center gap-2.5 rounded-full border transition-[border-color,background-color,color] duration-400 ${big ? 'px-5 py-3 text-[14.5px]' : 'h-11 w-11 justify-center'} ${dark ? 'border-cream/20 text-cream hover:border-mint hover:bg-mint hover:text-ink' : 'border-txt/15 hover:border-ink hover:bg-ink hover:text-cream'}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="transition-transform duration-500 ease-soft group-hover:scale-110">{ICONS[n]}</svg>
          {big && <span className="font-medium">{n}</span>}
        </a>
      ))}
    </div>
  );
}
