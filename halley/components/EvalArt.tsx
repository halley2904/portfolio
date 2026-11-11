/* Small living instruments for the six evaluation cards. CSS-animated, calmer at rest, livelier on hover. */

const M = '#B7E6C8';
const F = 'rgba(238,241,234,.16)';
const box = 'h-full w-full';

function Bench() {
  const rows = [[0.92, 1], [0.78, 1], [0.55, 0], [0.86, 1], [0.64, 1]];
  return (
    <svg viewBox="0 0 260 120" className={box}>
      {rows.map(([w, ok], i) => (
        <g key={i} transform={`translate(10 ${12 + i * 21})`}>
          <rect width="190" height="7" rx="3.5" fill={F} />
          <rect width={190 * w} height="7" rx="3.5" fill={ok ? M : '#E6A98C'} className="ea-grow" style={{ animationDelay: `${i * 0.18}s` }} />
          <text x="214" y="7.5" fontSize="10" fontFamily="IBM Plex Mono" fill={ok ? M : '#E6A98C'} className="ea-fade" style={{ animationDelay: `${0.6 + i * 0.18}s` }}>{ok ? 'PASS' : 'FAIL'}</text>
        </g>
      ))}
    </svg>
  );
}

function Regression() {
  return (
    <svg viewBox="0 0 260 120" className={box}>
      {Array.from({ length: 24 }).map((_, i) => {
        const x = 18 + (i % 8) * 30, y = 22 + Math.floor(i / 8) * 34;
        return <circle key={i} cx={x} cy={y} r="7" fill={F} className="ea-test" style={{ animationDelay: `${i * 0.11}s` }} />;
      })}
      <rect x="4" y="2" width="28" height="116" rx="14" fill="none" stroke={M} strokeOpacity=".5" className="ea-sweep" />
    </svg>
  );
}

function Vision() {
  return (
    <svg viewBox="0 0 260 120" className={box}>
      <rect x="40" y="8" width="180" height="104" rx="12" fill="rgba(238,241,234,.05)" stroke={F} />
      <path d="M52 100 L100 56 L132 84 L160 62 L208 100 Z" fill="rgba(183,230,200,.12)" />
      <circle cx="178" cy="34" r="9" fill="rgba(233,217,166,.35)" />
      <rect x="92" y="46" width="52" height="44" rx="4" fill="none" stroke={M} strokeDasharray="4 3" className="ea-fade" />
      <text x="92" y="41" fontSize="8.5" fontFamily="IBM Plex Mono" fill={M} className="ea-fade">OBJECT 0.94</text>
      <rect x="40" y="8" width="180" height="2" fill={M} className="ea-scan" />
    </svg>
  );
}

function Rag() {
  return (
    <svg viewBox="0 0 260 120" className={box}>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(12 ${12 + i * 36})`}>
          <rect width="62" height="26" rx="6" fill="rgba(238,241,234,.05)" stroke={F} />
          <rect x="9" y="8" width="38" height="3" rx="1.5" fill={F} /><rect x="9" y="15" width="26" height="3" rx="1.5" fill={F} />
        </g>
      ))}
      {[25, 61, 97].map((y, i) => (
        <path key={i} d={`M74 ${y} C 120 ${y}, 130 60, 168 60`} fill="none" stroke={M} strokeOpacity=".6" strokeDasharray="4 5" className="ea-flow" style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
      <rect x="168" y="38" width="82" height="44" rx="10" fill="rgba(183,230,200,.1)" stroke={M} strokeOpacity=".5" />
      <text x="180" y="57" fontSize="9" fontFamily="IBM Plex Mono" fill={M}>ANSWER</text>
      <text x="180" y="71" fontSize="8.5" fontFamily="IBM Plex Mono" fill="rgba(238,241,234,.5)">[1] [2] [3]</text>
    </svg>
  );
}

function Pipeline() {
  const raw = [[18, 18, 30, -8], [36, 50, 22, 10], [14, 80, 34, -4], [44, 96, 18, 14]];
  return (
    <svg viewBox="0 0 260 120" className={box}>
      {raw.map(([x, y, w, r], i) => <rect key={i} x={x} y={y} width={w} height="12" rx="3" fill={F} transform={`rotate(${r} ${x + w / 2} ${y + 6})`} />)}
      <path d="M92 60 H132" stroke={M} strokeOpacity=".6" strokeDasharray="4 5" className="ea-flow" />
      <path d="M126 54 L134 60 L126 66" fill="none" stroke={M} strokeOpacity=".7" strokeWidth="1.5" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} className="ea-slide" style={{ animationDelay: `${i * 0.2}s` }}>
          <rect x="146" y={20 + i * 22} width="100" height="14" rx="4" fill="rgba(183,230,200,.12)" stroke={M} strokeOpacity=".35" />
          <text x="153" y={30 + i * 22} fontSize="8" fontFamily="IBM Plex Mono" fill={M}>{['id', 'date', 'amount', 'status'][i]}</text>
        </g>
      ))}
    </svg>
  );
}

function Monitor() {
  return (
    <svg viewBox="0 0 260 120" className={box}>
      <line x1="10" y1="40" x2="250" y2="40" stroke="#E6A98C" strokeOpacity=".6" strokeDasharray="3 5" />
      <text x="248" y="34" textAnchor="end" fontSize="8" fontFamily="IBM Plex Mono" fill="#E6A98C">ALERT</text>
      <path d="M10 92 L40 88 L70 94 L100 84 L130 90 L160 78 L190 62 L220 46 L250 34" fill="none" stroke={M} strokeWidth="1.8" pathLength={1} className="ea-draw" />
      <circle cx="250" cy="34" r="4" fill="#E6A98C" className="ea-ping" />
    </svg>
  );
}

const ART = [Bench, Regression, Vision, Rag, Pipeline, Monitor];

export default function EvalArt({ i }: { i: number }) {
  const A = ART[i % ART.length];
  return <A />;
}
