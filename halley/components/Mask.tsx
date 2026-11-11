/* Splits text into words that slide up from a mask when revealed. */
export default function Mask({ text, delay = 0, step = 0.05, className = '' }: { text: string; delay?: number; step?: number; className?: string }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        <span key={i} className={`mask ${className}`} style={{ ['--d' as string]: `${delay + i * step}s` }}>
          <span>{w}&nbsp;</span>
        </span>
      ))}
    </>
  );
}
