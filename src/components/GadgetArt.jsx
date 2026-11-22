import { useId } from 'react';

// Draws a clean gadget illustration. Used whenever a product has no photo.
function shade(hex, a) {
  const n = parseInt(hex.replace('#', ''), 16);
  let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const t = a < 0 ? 0 : 255, p = Math.abs(a);
  r = Math.round((t - r) * p + r); g = Math.round((t - g) * p + g); b = Math.round((t - b) * p + b);
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
}

export default function GadgetArt({ kind = 'phone', color = '#334155', className = '', title }) {
  const id = useId().replace(/:/g, '');
  const c = color;
  const dk = shade(c, -0.35);
  const lt = shade(c, 0.35);
  const WALLS = [['#38bdf8', '#6366f1', '#ec4899'], ['#34d399', '#0ea5e9', '#6366f1'], ['#fbbf24', '#f97316', '#ef4444'], ['#a78bfa', '#ec4899', '#f97316'], ['#22d3ee', '#3b82f6', '#8b5cf6']];
  const w = WALLS[parseInt(c.replace('#', ''), 16) % WALLS.length];
  const wall = (
    <linearGradient id={`${id}w`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor={w[0]} /><stop offset=".55" stopColor={w[1]} /><stop offset="1" stopColor={w[2]} />
    </linearGradient>
  );
  const body = (() => {
    switch (kind) {
      case 'phone':
        return (<>
          <rect x="62" y="20" width="76" height="160" rx="15" fill={dk} />
          <rect x="65" y="23" width="70" height="154" rx="12" fill={c} />
          <rect x="68" y="26" width="64" height="148" rx="10" fill={`url(#${id}w)`} />
          <rect x="91" y="30" width="18" height="5" rx="2.5" fill="#0b1220" />
          <text x="100" y="62" fontSize="17" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="Poppins,Arial">9:41</text>
          {[0, 1, 2, 3].map((j) => [0, 1, 2, 3].map((i) => (
            <rect key={`${i}${j}`} x={74 + i * 14} y={84 + j * 17} width="11" height="11" rx="3" fill="#fff" opacity={0.55 + ((i + j) % 3) * 0.15} />
          )))}
          <rect x="138" y="62" width="2.5" height="22" rx="1" fill={dk} />
        </>);
      case 'laptop':
        return (<>
          <rect x="38" y="48" width="124" height="84" rx="7" fill={dk} />
          <rect x="43" y="53" width="114" height="74" rx="3" fill={`url(#${id}w)`} />
          <circle cx="100" cy="50.5" r="1.3" fill="#94a3b8" />
          <path d="M22 134 H178 L170 148 Q168 152 162 152 H38 Q32 152 30 148 Z" fill={c} />
          <rect x="84" y="134" width="32" height="4" rx="2" fill={dk} />
          <circle cx="75" cy="90" r="16" fill="#fff" opacity=".18" /><circle cx="118" cy="104" r="22" fill="#fff" opacity=".12" />
        </>);
      case 'tablet':
        return (<>
          <rect x="26" y="46" width="148" height="108" rx="12" fill={c} />
          <rect x="30" y="50" width="140" height="100" rx="9" fill={dk} />
          <rect x="34" y="54" width="132" height="92" rx="6" fill={`url(#${id}w)`} />
          <circle cx="100" cy="52" r="1.3" fill="#94a3b8" />
          <circle cx="74" cy="92" r="20" fill="#fff" opacity=".16" /><circle cx="128" cy="110" r="26" fill="#fff" opacity=".12" />
          <text x="100" y="104" fontSize="20" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="Poppins,Arial">9:41</text>
        </>);
      case 'watch':
        return (<>
          <rect x="76" y="12" width="48" height="176" rx="16" fill={c} />
          {[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx="100" cy={26 + i * 6} r="1.4" fill={dk} opacity=".6" />)}
          {[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx="100" cy={160 + i * 5} r="1.4" fill={dk} opacity=".6" />)}
          <rect x="58" y="56" width="84" height="88" rx="26" fill="#1f2937" />
          <rect x="62" y="60" width="76" height="80" rx="23" fill="#050b16" />
          <rect x="62" y="60" width="76" height="80" rx="23" fill={`url(#${id}w)`} opacity=".35" />
          <text x="100" y="108" fontSize="25" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="Poppins,Arial">10:09</text>
          <circle cx="100" cy="124" r="4" fill="#4ade80" /><rect x="144" y="82" width="5" height="18" rx="2.5" fill="#6b7280" />
        </>);
      case 'headphones':
        return (<>
          <path d="M50 118 V104 A50 50 0 0 1 150 104 V118" fill="none" stroke={dk} strokeWidth="13" strokeLinecap="round" />
          <path d="M50 118 V104 A50 50 0 0 1 150 104 V118" fill="none" stroke={c} strokeWidth="8" strokeLinecap="round" />
          <rect x="36" y="104" width="32" height="58" rx="15" fill={dk} /><rect x="40" y="108" width="24" height="50" rx="12" fill={c} />
          <rect x="132" y="104" width="32" height="58" rx="15" fill={dk} /><rect x="136" y="108" width="24" height="50" rx="12" fill={c} />
          <ellipse cx="52" cy="133" rx="7" ry="16" fill={lt} opacity=".5" /><ellipse cx="148" cy="133" rx="7" ry="16" fill={lt} opacity=".5" />
        </>);
      case 'earbuds':
        return (<>
          <rect x="48" y="96" width="104" height="72" rx="34" fill={c} stroke={shade(c, -0.15)} strokeWidth="2" />
          <path d="M52 124 H148" stroke={shade(c, -0.2)} strokeWidth="2" />
          <circle cx="100" cy="146" r="3" fill="#4ade80" />
          <g><ellipse cx="72" cy="58" rx="15" ry="17" fill={shade(c, 0.1)} stroke={shade(c, -0.25)} strokeWidth="1.5" /><rect x="66" y="66" width="9" height="30" rx="4.5" fill={shade(c, 0.1)} stroke={shade(c, -0.25)} strokeWidth="1.5" /></g>
          <g><ellipse cx="128" cy="58" rx="15" ry="17" fill={shade(c, 0.1)} stroke={shade(c, -0.25)} strokeWidth="1.5" /><rect x="125" y="66" width="9" height="30" rx="4.5" fill={shade(c, 0.1)} stroke={shade(c, -0.25)} strokeWidth="1.5" /></g>
        </>);
      case 'speaker':
        return (<>
          <rect x="58" y="26" width="84" height="148" rx="22" fill={dk} />
          <rect x="62" y="30" width="76" height="140" rx="19" fill={c} />
          <circle cx="100" cy="80" r="24" fill={dk} /><circle cx="100" cy="80" r="14" fill={shade(c, 0.1)} /><circle cx="100" cy="80" r="5" fill={dk} />
          <circle cx="100" cy="134" r="20" fill={dk} /><circle cx="100" cy="134" r="11" fill={shade(c, 0.1)} />
          <circle cx="100" cy="46" r="3" fill={lt} />
        </>);
      case 'gamepad':
        return (<>
          <path d="M44 128 Q34 92 64 80 H136 Q166 92 156 128 Q150 160 126 142 L116 128 H84 L74 142 Q50 160 44 128Z" fill={c} stroke={dk} strokeWidth="3" strokeLinejoin="round" />
          <rect x="65" y="98" width="22" height="7" rx="2" fill={dk} /><rect x="72.5" y="90.5" width="7" height="22" rx="2" fill={dk} />
          <circle cx="132" cy="94" r="5" fill="#f87171" /><circle cx="143" cy="104" r="5" fill="#4ade80" /><circle cx="121" cy="104" r="5" fill="#60a5fa" /><circle cx="132" cy="114" r="5" fill="#fbbf24" />
          <circle cx="88" cy="122" r="8" fill={dk} /><circle cx="112" cy="122" r="8" fill={dk} />
        </>);
      case 'console':
        return (<>
          <rect x="62" y="22" width="30" height="156" rx="12" fill={c} stroke={dk} strokeWidth="2" />
          <rect x="108" y="22" width="30" height="156" rx="12" fill={c} stroke={dk} strokeWidth="2" />
          <rect x="88" y="30" width="24" height="140" rx="6" fill={dk} />
          <rect x="94" y="40" width="12" height="3" rx="1.5" fill="#60a5fa" /><circle cx="100" cy="160" r="3" fill="#60a5fa" />
          <path d="M70 36 V164 M130 36 V164" stroke={dk} strokeWidth="1" opacity=".3" />
        </>);
      case 'camera':
        return (<>
          <path d="M34 78 H70 L76 64 H124 L130 78 H166 Q172 78 172 84 V148 Q172 154 166 154 H34 Q28 154 28 148 V84 Q28 78 34 78Z" fill={dk} />
          <rect x="28" y="92" width="144" height="62" rx="8" fill={c} opacity=".28" />
          <circle cx="100" cy="112" r="35" fill="#0b1220" /><circle cx="100" cy="112" r="27" fill="#1f2937" stroke="#475569" strokeWidth="2" />
          <circle cx="100" cy="112" r="15" fill={`url(#${id}w)`} /><circle cx="94" cy="106" r="4" fill="#fff" opacity=".7" />
          <rect x="40" y="62" width="16" height="10" rx="3" fill={c} /><circle cx="152" cy="92" r="4" fill="#ef4444" />
        </>);
      case 'tv':
        return (<>
          <rect x="16" y="40" width="168" height="104" rx="6" fill="#0b1220" />
          <rect x="20" y="44" width="160" height="96" rx="3" fill={`url(#${id}w)`} />
          <circle cx="62" cy="86" r="22" fill="#fff" opacity=".15" /><circle cx="130" cy="102" r="30" fill="#fff" opacity=".1" />
          <path d="M84 144 H116 L122 160 H78Z" fill={dk} /><rect x="62" y="158" width="76" height="6" rx="3" fill={c} />
        </>);
      case 'powerbank':
        return (<>
          <rect x="62" y="26" width="76" height="148" rx="14" fill={c} />
          <rect x="62" y="26" width="76" height="148" rx="14" fill="none" stroke={dk} strokeWidth="2" />
          <rect x="72" y="40" width="56" height="30" rx="6" fill={dk} />
          {[0, 1, 2, 3].map((i) => <circle key={i} cx={82 + i * 12} cy="55" r="3.5" fill={i < 3 ? '#4ade80' : '#334155'} />)}
          <rect x="82" y="162" width="36" height="6" rx="3" fill={dk} /><path d="M100 86 L90 112 H100 L96 134 L112 104 H102Z" fill={lt} opacity=".8" />
        </>);
      case 'charger':
        return (<>
          <rect x="66" y="48" width="68" height="76" rx="12" fill={c} stroke={dk} strokeWidth="2" />
          <rect x="82" y="30" width="7" height="20" rx="2" fill="#9ca3af" /><rect x="111" y="30" width="7" height="20" rx="2" fill="#9ca3af" />
          <rect x="88" y="108" width="24" height="10" rx="4" fill={dk} />
          <path d="M100 124 V140 Q100 170 70 170" fill="none" stroke={dk} strokeWidth="5" strokeLinecap="round" />
        </>);
      case 'keyboard':
        return (<>
          <rect x="14" y="68" width="172" height="70" rx="9" fill={dk} />
          {[0, 1, 2, 3].map((r) => Array.from({ length: r === 3 ? 7 : 12 }).map((_, i) => (
            <rect key={`${r}-${i}`} x={(r === 3 ? 38 + i * 17 : 21 + i * 13.2)} y={75 + r * 14} width={r === 3 ? (i === 3 ? 15 : 15) : 11} height="11" rx="2.5" fill={r % 2 ? lt : c} opacity=".95" />
          )))}
        </>);
      case 'router':
        return (<>
          <rect x="52" y="36" width="9" height="76" rx="4.5" fill={dk} /><rect x="139" y="36" width="9" height="76" rx="4.5" fill={dk} />
          <rect x="94" y="28" width="9" height="84" rx="4.5" fill={dk} />
          <rect x="34" y="108" width="132" height="44" rx="12" fill={c} stroke={dk} strokeWidth="2" />
          {[0, 1, 2, 3].map((i) => <circle key={i} cx={62 + i * 16} cy="130" r="3.5" fill={i < 3 ? '#4ade80' : '#fbbf24'} />)}
          <rect x="132" y="126" width="20" height="8" rx="4" fill={dk} />
        </>);
      default:
        return <rect x="60" y="40" width="80" height="120" rx="14" fill={c} />;
    }
  })();
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label={title || kind} xmlns="http://www.w3.org/2000/svg">
      <defs>{wall}</defs>
      <ellipse cx="100" cy="184" rx="62" ry="6" fill="#000" opacity=".08" />
      {body}
    </svg>
  );
}
