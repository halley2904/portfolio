'use client';
import { useRef } from 'react';

/* Footer wordmark: letters lift toward the pointer. */
export default function Signature({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="select-none overflow-hidden px-4 pb-6 pt-10"
      onPointerMove={(e) => {
        ref.current!.querySelectorAll<HTMLElement>('span[data-l]').forEach((s) => {
          const r = s.getBoundingClientRect();
          const d = Math.abs(e.clientX - (r.left + r.width / 2));
          const k = Math.max(0, 1 - d / 260);
          s.style.transform = `translateY(${-k * 12}%)`;
          s.style.color = k > 0.15 ? `rgba(183,230,200,${Math.min(1, k * 1.3)})` : '';
        });
      }}
      onPointerLeave={() => ref.current!.querySelectorAll<HTMLElement>('span[data-l]').forEach((s) => { s.style.transform = ''; s.style.color = ''; })}>
      <p className="reveal-group wordmark whitespace-nowrap text-center font-serif text-[15vw] leading-[1.05] tracking-[-0.05em]">
        {text.split('').map((c, i) => (
          <span key={i} className="mask" style={{ ['--d' as string]: `${i * 0.04}s` }}>
            <span data-l className="inline-block transition-[transform,color] duration-500 ease-soft">{c === ' ' ? ' ' : c}</span>
          </span>
        ))}
      </p>
    </div>
  );
}
