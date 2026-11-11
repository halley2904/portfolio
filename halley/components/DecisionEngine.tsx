'use client';

import { useEffect, useRef } from 'react';

/*
  Signature visual. Tangled threads (a complex problem) resolve through one
  product node into three decisions. Driven either by time (auto) or by an
  external 0..1 progress value (scroll).
*/

const W = 600;
const H = 560;
const N = 16;
const NODE = { x: 318, y: 280, w: 140, h: 62 };
const OUT = [
  { y: 130, label: 'Approve', c: '#B7E6C8' },
  { y: 280, label: 'Review', c: '#E9D9A6' },
  { y: 430, label: 'Escalate', c: '#E6A98C' },
];
const INPUTS = ['records', 'guidelines', 'images', 'requests', 'policies', 'signals'];

type Pt = [number, number];
type Line = { ordered: Pt[]; tangled: Pt[]; out: number; seed: number };

const rnd = (s: number) => { const x = Math.sin(s * 12.9898) * 43758.5453; return x - Math.floor(x); };
const ease = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
const clamp = (v: number) => Math.max(0, Math.min(1, v));

function build(): Line[] {
  const lines: Line[] = [];
  for (let i = 0; i < N; i++) {
    const y = 40 + (i / (N - 1)) * (H - 80);
    const out = Math.min(2, Math.floor((i / N) * 3));
    const oy = OUT[out].y + ((i % 3) - 1) * 7;
    const inY = NODE.y + (y - NODE.y) * 0.16;
    const exY = NODE.y + (oy - NODE.y) * 0.16;
    const ordered: Pt[] = [[0, y], [150, y], [200, inY], [NODE.x - NODE.w / 2, inY], [NODE.x + NODE.w / 2, exY], [NODE.x + NODE.w / 2 + 70, exY], [W - 170, oy], [W - 116, oy]];
    const tangled: Pt[] = ordered.map((p, k) => {
      if (k === 0) return [0, 40 + rnd(i * 7.1 + 1) * (H - 80)];
      if (k === 7) return [W - 116, 70 + rnd(i * 3.3 + 9) * (H - 140)];
      return [Math.max(20, Math.min(W - 130, p[0] + (rnd(i * 13.7 + k) - 0.5) * 340)), Math.max(16, Math.min(H - 16, H / 2 + (rnd(i * 5.9 + k * 2.3) - 0.5) * (H - 40)))];
    });
    lines.push({ ordered, tangled, out, seed: rnd(i + 0.5) * 10 });
  }
  return lines;
}

export default function DecisionEngine({ progress, showHint = false }: { progress?: { current: number }; showHint?: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const chipRefs = useRef<(SVGGElement | null)[]>([]);
  const nodeRef = useRef<SVGGElement>(null);
  const labelRefs = useRef<(SVGTextElement | null)[]>([]);
  const hoverRef = useRef(false);

  useEffect(() => {
    const lines = build();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let u = reduce ? 1 : 0, raf = 0, last = performance.now(), visible = true;
    const start = last;
    const glow = [0, 0, 0];
    const pulses = lines.map((l) => ({ p: rnd(l.seed), v: 0.0001 + rnd(l.seed + 2) * 0.00008 }));
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    if (svgRef.current) io.observe(svgRef.current);

    const frame = (now: number) => {
      const dt = Math.min(50, now - last); last = now;
      if (!visible) { raf = requestAnimationFrame(frame); return; }
      const t = now - start;
      let e: number, flow: number, lit: number;
      if (progress) {
        const P = progress.current;
        e = ease(clamp((P - 0.18) / 0.42));
        flow = clamp((P - 0.55) / 0.15);
        lit = clamp((P - 0.72) / 0.18);
      } else {
        let target = t < 1500 ? 0 : 1;
        if (hoverRef.current) target = 0;
        u += Math.sign(target - u) * Math.min(Math.abs(target - u), (target > u ? 0.00042 : 0.0011) * dt);
        e = ease(u); flow = e > 0.98 ? 1 : 0; lit = e;
      }
      lines.forEach((l, i) => {
        const wob = (1 - e) * 10;
        const P = l.ordered.map((p, k) => {
          const q = l.tangled[k];
          const w = k === 0 || k === 7 ? 0 : Math.sin(t * 0.0011 + l.seed + k) * wob;
          return [q[0] + (p[0] - q[0]) * e, q[1] + (p[1] - q[1]) * e + w] as Pt;
        });
        const d = `M${P[0][0]},${P[0][1]} C${P[1][0]},${P[1][1]} ${P[2][0]},${P[2][1]} ${P[3][0]},${P[3][1]} L${P[4][0]},${P[4][1]} C${P[5][0]},${P[5][1]} ${P[6][0]},${P[6][1]} ${P[7][0]},${P[7][1]}`;
        const el = pathRefs.current[i];
        if (el) { el.setAttribute('d', d); el.style.stroke = `rgba(${e > 0.97 ? '183,230,200' : '238,241,234'},${0.2 + 0.3 * e})`; }
        const dot = dotRefs.current[i];
        if (dot && el) {
          if (flow > 0 && !reduce) {
            const pl = pulses[i]; pl.p += pl.v * dt;
            if (pl.p > 1) { pl.p = 0; glow[l.out] = 1; }
            const pt = el.getPointAtLength(pl.p * el.getTotalLength());
            dot.setAttribute('cx', String(pt.x)); dot.setAttribute('cy', String(pt.y));
            dot.style.opacity = String(flow * Math.min(1, pl.p * 8, (1 - pl.p) * 8));
          } else dot.style.opacity = '0';
        }
      });
      OUT.forEach((_, k) => {
        glow[k] = Math.max(0, glow[k] - dt * 0.0016);
        const c = chipRefs.current[k];
        if (c) {
          c.style.opacity = String(0.2 + 0.8 * lit);
          c.style.transform = `translateX(${(1 - lit) * 14}px)`;
          const r = c.querySelector('rect'); if (r) r.style.fill = `rgba(183,230,200,${0.06 + glow[k] * 0.22})`;
        }
      });
      labelRefs.current.forEach((lb) => { if (lb) lb.style.opacity = String(0.55 - 0.25 * e); });
      if (nodeRef.current) { nodeRef.current.style.opacity = String(0.3 + 0.7 * e); nodeRef.current.style.transform = `scale(${0.9 + 0.1 * e})`; }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [progress]);

  return (
    <div className="relative select-none" onMouseEnter={() => (hoverRef.current = true)} onMouseLeave={() => (hoverRef.current = false)}>
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Tangled inputs resolving through one product into three decisions: approve, review, escalate">
        <defs>
          <radialGradient id="nodeglow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#B7E6C8" stopOpacity=".24" /><stop offset="100%" stopColor="#B7E6C8" stopOpacity="0" /></radialGradient>
        </defs>
        {INPUTS.map((t, k) => (
          <text key={t} ref={(el) => { labelRefs.current[k] = el; }} x={2} y={40 + ((k * 2.6 + 1) / (N - 1)) * (H - 80) - 9} className="fill-cream font-mono" fontSize="10.5" letterSpacing="1.2">{t.toUpperCase()}</text>
        ))}
        {Array.from({ length: N }).map((_, i) => <path key={i} ref={(el) => { pathRefs.current[i] = el; }} fill="none" strokeWidth={1.15} strokeLinecap="round" />)}
        {Array.from({ length: N }).map((_, i) => <circle key={i} ref={(el) => { dotRefs.current[i] = el; }} r={2.6} fill="#D6F5E1" style={{ opacity: 0 }} />)}
        <g ref={nodeRef} style={{ transformOrigin: `${NODE.x}px ${NODE.y}px` }}>
          <circle cx={NODE.x} cy={NODE.y} r={120} fill="url(#nodeglow)" />
          <rect x={NODE.x - NODE.w / 2} y={NODE.y - NODE.h / 2} width={NODE.w} height={NODE.h} rx={31} fill="#191d19" stroke="rgba(183,230,200,.5)" />
          <text x={NODE.x} y={NODE.y + 7} textAnchor="middle" fontSize="22" className="fill-cream font-serif" fontStyle="italic">product</text>
        </g>
        {OUT.map((o, k) => (
          <g key={o.label} ref={(el) => { chipRefs.current[k] = el; }} style={{ transition: 'transform .2s linear' }}>
            <rect x={W - 112} y={o.y - 20} width={110} height={40} rx={20} stroke="rgba(183,230,200,.45)" fill="rgba(183,230,200,.06)" />
            <circle cx={W - 93} cy={o.y} r={3.8} fill={o.c} />
            <text x={W - 82} y={o.y + 4.5} fontSize="13.5" className="fill-cream font-sans" fontWeight={600}>{o.label}</text>
          </g>
        ))}
      </svg>
      {showHint && <p className="mt-2 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-cream-faint">Hover to see the problem</p>}
    </div>
  );
}
