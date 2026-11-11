/* Small abstract illustrations for each project card. Pure SVG, animated with CSS on hover. */

const ink = '#1B1F1C';

function Risk() {
  const bars = [38, 54, 46, 70, 62, 84, 58, 92, 76, 66, 48, 34];
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full">
      <line x1="16" y1="150" x2="304" y2="150" stroke={ink} strokeOpacity=".15" />
      <line x1="16" y1="62" x2="304" y2="62" stroke="#C98B6B" strokeDasharray="3 5" strokeOpacity=".7" />
      <text x="302" y="56" textAnchor="end" fontSize="9" fontFamily="IBM Plex Mono" fill="#C98B6B">HIGH RISK</text>
      {bars.map((h, i) => {
        const hi = h > 88 - 3 || i === 5 || i === 7;
        return (
          <rect key={i} x={24 + i * 23} y={150 - h} width="13" height={h} rx="3"
            fill={hi ? '#3E6A50' : ink} fillOpacity={hi ? 0.85 : 0.12}
            className="origin-bottom transition-transform duration-700 ease-soft group-hover:[transform:scaleY(1.06)]"
            style={{ transformBox: 'fill-box', transitionDelay: `${i * 25}ms` }} />
        );
      })}
      <circle cx="207" cy="58" r="13" fill="none" stroke="#C98B6B" strokeWidth="1.5" className="transition-[stroke-dashoffset] duration-1000 ease-soft group-hover:[stroke-dashoffset:0]" strokeDasharray="82" strokeDashoffset="82" />
    </svg>
  );
}

function Lens() {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full">
      <line x1="40" y1="150" x2="280" y2="150" stroke={ink} strokeOpacity=".15" />
      <line x1="40" y1="150" x2="40" y2="20" stroke={ink} strokeOpacity=".15" />
      <line x1="40" y1="150" x2="200" y2="22" stroke={ink} strokeOpacity=".2" strokeDasharray="3 5" />
      <path d="M40 150 C 80 132, 100 96, 130 84 S 180 40, 200 24" fill="none" stroke="#3E6A50" strokeWidth="2.2" strokeLinecap="round"
        strokeDasharray="260" strokeDashoffset="260" className="transition-[stroke-dashoffset] duration-1000 ease-soft group-hover:[stroke-dashoffset:0]" />
      <path d="M40 150 C 80 132, 100 96, 130 84 S 180 40, 200 24" fill="none" stroke="#3E6A50" strokeWidth="2.2" strokeLinecap="round" strokeOpacity=".25" />
      {[[70, 136], [100, 110], [130, 84], [165, 54], [200, 24]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.5" fill="#3E6A50" />)}
      <g transform="translate(210 64)">
        <rect width="96" height="64" rx="12" fill="#fff" fillOpacity=".55" stroke={ink} strokeOpacity=".12" />
        <text x="12" y="22" fontSize="8.5" fontFamily="IBM Plex Mono" fill={ink} fillOpacity=".55">VERDICT</text>
        <circle cx="16" cy="42" r="4" fill="#E9C46A" />
        <text x="25" y="45.5" fontSize="10" fontFamily="Manrope Variable" fontWeight="700" fill={ink}>With conditions</text>
      </g>
    </svg>
  );
}

function Scope() {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full">
      {[0, 1].map((c) => (
        <g key={c} transform={`translate(${36 + c * 132} 26)`}>
          <rect width="112" height="128" rx="12" fill="#fff" fillOpacity={c ? 0.75 : 0.45} stroke={ink} strokeOpacity=".12" />
          <text x="12" y="20" fontSize="8.5" fontFamily="IBM Plex Mono" fill={ink} fillOpacity=".5">{c ? 'REQUEST' : 'AGREED SCOPE'}</text>
          {[0, 1, 2, 3, 4].map((r) => (
            <rect key={r} x="12" y={34 + r * 17} width={c && r === 3 ? 64 : 88 - (r % 2) * 18} height="7" rx="3.5"
              fill={c && r === 3 ? '#C98B6B' : ink} fillOpacity={c && r === 3 ? 0.85 : 0.13} />
          ))}
        </g>
      ))}
      <g className="transition-transform duration-700 ease-soft group-hover:[transform:translateY(-4px)]">
        <circle cx="160" cy="146" r="15" fill="#F5F0E6" stroke="#3E6A50" strokeWidth="1.5" />
        <text x="160" y="151" textAnchor="middle" fontSize="15" fontFamily="Fraunces Variable" fontStyle="italic" fill="#3E6A50">?</text>
      </g>
    </svg>
  );
}

function Contexts() {
  const pts = [[160, 90, 30], [92, 52, 18], [228, 52, 18], [74, 124, 16], [246, 124, 16], [160, 156, 14], [160, 26, 14]] as const;
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full">
      {pts.slice(1).map(([x, y], i) => <line key={i} x1="160" y1="90" x2={x} y2={y} stroke={ink} strokeOpacity=".14" />)}
      {pts.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={i === 0 ? '#3E6A50' : '#fff'} fillOpacity={i === 0 ? 0.9 : 0.6} stroke={i === 0 ? 'none' : ink} strokeOpacity=".15"
          className="transition-transform duration-700 ease-soft group-hover:[transform:scale(1.08)]" style={{ transformBox: 'fill-box', transformOrigin: 'center', transitionDelay: `${i * 40}ms` }} />
      ))}
      <text x="160" y="94" textAnchor="middle" fontSize="9" fontFamily="IBM Plex Mono" fill="#F5F0E6">CORE</text>
      <circle cx="228" cy="52" r="18" fill="none" stroke="#C98B6B" strokeWidth="1.5" strokeDasharray="3 4" />
      <circle cx="246" cy="124" r="16" fill="none" stroke="#C98B6B" strokeWidth="1.5" strokeDasharray="3 4" />
    </svg>
  );
}

export default function ProjectArt({ slug }: { slug: string }) {
  if (slug.startsWith('payer')) return <Risk />;
  if (slug === 'payorlens') return <Lens />;
  if (slug === 'scopeguard') return <Scope />;
  return <Contexts />;
}
