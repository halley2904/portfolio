'use client';
import { useRef } from 'react';

/* Gentle pull toward the pointer. */
export default function Magnetic({ children, strength = 0.22, className = '' }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span ref={ref} className={`inline-block transition-transform duration-500 ease-soft ${className}`}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const r = ref.current!.getBoundingClientRect();
        ref.current!.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px, ${(e.clientY - r.top - r.height / 2) * strength}px)`;
      }}
      onPointerLeave={() => { ref.current!.style.transform = ''; }}>
      {children}
    </span>
  );
}
