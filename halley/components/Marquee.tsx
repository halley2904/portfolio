export default function Marquee({ items, dark = false }: { items: string[]; dark?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className={`relative overflow-hidden border-y py-6 ${dark ? 'border-ink-line bg-ink text-cream' : 'border-txt/10 bg-paper-2 text-txt'}`} aria-hidden>
      <div className="marquee flex w-max gap-12 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12 font-serif text-[32px] italic tracking-[-0.02em] md:text-[44px]">
            {t}<span className={`h-2.5 w-2.5 rounded-full ${dark ? 'bg-mint' : 'bg-sage-deep'}`} />
          </span>
        ))}
      </div>
    </div>
  );
}
