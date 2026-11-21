import React from 'react';

export const C = {
  outline: '#0b0b0b',
  gold: '#f2c14e',
  goldDark: '#b8860b',
  lapis: '#1f4e9c',
  turq: '#2aa6a0',
  red: '#b3392b',
  linen: '#f1e8d2',
  sand: '#d9b36a',
};

export const rnd = (n) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// Semua gradien dipakai lewat id (url(#...)). Dirender sekali per <svg>.
export const Defs = () => (
  <defs>
    <linearGradient id="skyDay" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#f8cf78" />
      <stop offset=".55" stopColor="#ee9a4d" />
      <stop offset="1" stopColor="#b2683a" />
    </linearGradient>
    <linearGradient id="skyDusk" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#3a2540" />
      <stop offset=".6" stopColor="#b8582e" />
      <stop offset="1" stopColor="#e7a04a" />
    </linearGradient>
    <linearGradient id="skyNight" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#04070f" />
      <stop offset="1" stopColor="#1c2a52" />
    </linearGradient>
    <linearGradient id="skySea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#5c3a3a" />
      <stop offset=".6" stopColor="#e0873c" />
      <stop offset="1" stopColor="#f7c46a" />
    </linearGradient>
    <linearGradient id="seaG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#2f6f86" />
      <stop offset="1" stopColor="#0f2f45" />
    </linearGradient>
    <linearGradient id="wallStone" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#d1ab70" />
      <stop offset="1" stopColor="#8f6a36" />
    </linearGradient>
    <linearGradient id="wallDark" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#2c1e13" />
      <stop offset="1" stopColor="#0f0a06" />
    </linearGradient>
    <linearGradient id="wallBlue" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#1c3b4a" />
      <stop offset="1" stopColor="#0b1a22" />
    </linearGradient>
    <linearGradient id="floorGold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#e6bb62" />
      <stop offset="1" stopColor="#7b5324" />
    </linearGradient>
    <linearGradient id="floorDark" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#3d2c1b" />
      <stop offset="1" stopColor="#100a06" />
    </linearGradient>
    <linearGradient id="floorStone" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#7e6a50" />
      <stop offset="1" stopColor="#2c2318" />
    </linearGradient>
    <linearGradient id="sandG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#e6bf7a" />
      <stop offset="1" stopColor="#a77c46" />
    </linearGradient>
    <linearGradient id="labWall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#53606b" />
      <stop offset="1" stopColor="#2a323a" />
    </linearGradient>
    <linearGradient id="labFloor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#4a535b" />
      <stop offset="1" stopColor="#1b2025" />
    </linearGradient>
    <linearGradient id="pillarLit" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#e9c78e" />
      <stop offset=".5" stopColor="#bd8f50" />
      <stop offset="1" stopColor="#6c4a22" />
    </linearGradient>
    <linearGradient id="pillarDark" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#5a4128" />
      <stop offset=".5" stopColor="#2b1c0f" />
      <stop offset="1" stopColor="#0d0804" />
    </linearGradient>
    <linearGradient id="goldG" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#ffe08a" />
      <stop offset=".5" stopColor="#e0a92a" />
      <stop offset="1" stopColor="#8d6410" />
    </linearGradient>
    <linearGradient id="spotG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#dfe8ff" stopOpacity=".5" />
      <stop offset="1" stopColor="#dfe8ff" stopOpacity=".06" />
    </linearGradient>
    <radialGradient id="glowOrange">
      <stop offset="0" stopColor="#ffb347" stopOpacity=".95" />
      <stop offset=".35" stopColor="#ff8a1f" stopOpacity=".45" />
      <stop offset="1" stopColor="#ff6a00" stopOpacity="0" />
    </radialGradient>
    <radialGradient id="glowWhite">
      <stop offset="0" stopColor="#fff6d0" stopOpacity=".95" />
      <stop offset=".4" stopColor="#ffe9a0" stopOpacity=".4" />
      <stop offset="1" stopColor="#ffe9a0" stopOpacity="0" />
    </radialGradient>
    <radialGradient id="glowBlue">
      <stop offset="0" stopColor="#9fe8ff" stopOpacity=".9" />
      <stop offset=".4" stopColor="#4aa8ff" stopOpacity=".35" />
      <stop offset="1" stopColor="#2a6fff" stopOpacity="0" />
    </radialGradient>
    <radialGradient id="glowRed">
      <stop offset="0" stopColor="#ff6a4a" stopOpacity=".95" />
      <stop offset=".4" stopColor="#d02a1a" stopOpacity=".4" />
      <stop offset="1" stopColor="#a00" stopOpacity="0" />
    </radialGradient>
    <filter id="blurSoft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" />
    </filter>
  </defs>
);

// Kolom hieroglif acak-deterministik (bentuk dekoratif, bukan teks nyata).
export const Hiero = ({x, y, w, h, color = '#3a2410', seed = 1, opacity = 0.7}) => {
  const n = Math.max(1, Math.floor(h / 40));
  const out = [];
  for (let i = 0; i < n; i++) {
    const r = rnd(seed * 13 + i);
    const cy = y + i * 40 + 20;
    const cx = x + w / 2;
    const k = Math.floor(r * 6);
    if (k === 0) out.push(<circle key={i} cx={cx} cy={cy} r={Math.min(9, w / 4)} />);
    else if (k === 1) out.push(<rect key={i} x={cx - w * 0.28} y={cy - 8} width={w * 0.56} height={16} />);
    else if (k === 2) out.push(<g key={i}><circle cx={cx} cy={cy - 8} r={7} /><path d={`M${cx} ${cy - 1} V${cy + 14} M${cx - 9} ${cy + 5} H${cx + 9}`} /></g>);
    else if (k === 3) out.push(<path key={i} d={`M${cx - w * 0.3} ${cy} q${w * 0.15} -14 ${w * 0.3} 0 t${w * 0.3} 0`} />);
    else if (k === 4) out.push(<g key={i}><path d={`M${cx - w * 0.3} ${cy} Q${cx} ${cy - 14} ${cx + w * 0.3} ${cy} Q${cx} ${cy + 14} ${cx - w * 0.3} ${cy}`} /><circle cx={cx} cy={cy} r={3} /></g>);
    else out.push(<path key={i} d={`M${cx - 10} ${cy + 10} L${cx} ${cy - 10} L${cx + 10} ${cy + 10} Z`} />);
  }
  return <g stroke={color} strokeWidth="3.2" fill="none" opacity={opacity} strokeLinecap="round">{out}</g>;
};

export const Pillar = ({x, w = 130, top = 120, bottom = 1280, dark = false, seed = 1, lit = 1}) => {
  const g = dark ? 'url(#pillarDark)' : 'url(#pillarLit)';
  const ink = dark ? '#000' : '#2a1808';
  const band = dark ? '#3a2a14' : '#c7452f';
  return (
    <g>
      <rect x={x - w / 2} y={top + 80} width={w} height={bottom - top - 120} fill={g} stroke={ink} strokeWidth="3" />
      <path d={`M${x - w * 0.62} ${top + 92} L${x - w * 0.8} ${top + 36} Q${x} ${top - 44} ${x + w * 0.8} ${top + 36} L${x + w * 0.62} ${top + 92} Z`} fill={g} stroke={ink} strokeWidth="3" />
      {[-0.3, 0, 0.3].map((k) => (
        <path key={k} d={`M${x + w * k} ${top + 88} V${top + 30}`} stroke={ink} strokeWidth="3" opacity=".5" />
      ))}
      <rect x={x - w / 2} y={top + 100} width={w} height={22} fill={band} opacity={0.85 * lit} />
      <rect x={x - w / 2} y={bottom - 150} width={w} height={20} fill={band} opacity={0.85 * lit} />
      <Hiero x={x - w * 0.34} y={top + 140} w={w * 0.68} h={bottom - top - 320} seed={seed} color={dark ? '#000' : '#3a2410'} opacity={dark ? 0.5 : 0.7} />
      <rect x={x - w * 0.62} y={bottom - 40} width={w * 1.24} height={40} fill={g} stroke={ink} strokeWidth="3" />
    </g>
  );
};

export const Torch = ({x, y, t = 0, s = 1, glow = 1}) => {
  const f = 1 + 0.12 * Math.sin(t * 0.7 + x) + 0.08 * Math.sin(t * 1.9 + x * 3) + 0.05 * Math.sin(t * 3.3);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="0" cy="-60" r={190 * f * glow} fill="url(#glowOrange)" />
      <rect x="-9" y="0" width="18" height="120" fill="#4a2f16" stroke="#120a04" strokeWidth="3" />
      <path d="M-26 -6 H26 L16 14 H-16 Z" fill="#8d6410" stroke="#120a04" strokeWidth="3" />
      <g transform={`scale(${1 + (f - 1) * 0.6} ${f})`}>
        <path d="M0 -10 C-34 -40 -20 -80 0 -112 C22 -80 34 -42 0 -10 Z" fill="#ff7a1a" stroke="#6a2a05" strokeWidth="2" />
        <path d="M0 -14 C-16 -34 -8 -58 0 -74 C10 -58 16 -34 0 -14 Z" fill="#ffd45a" />
      </g>
    </g>
  );
};

export const Brazier = ({x, y, t = 0, s = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Torch x={0} y={-70} t={t} s={1.25} glow={0.9} />
    <path d="M-60 -10 H60 L40 50 H-40 Z" fill="url(#goldG)" stroke="#2a1808" strokeWidth="4" />
    <rect x="-12" y="50" width="24" height="120" fill="#7a5320" stroke="#2a1808" strokeWidth="3" />
    <rect x="-46" y="168" width="92" height="16" fill="#7a5320" stroke="#2a1808" strokeWidth="3" />
  </g>
);

export const Pyramid = ({x, y, w, h, col = '#c98f55', shade = '#a06a3a'}) => (
  <g>
    <polygon points={`${x - w / 2},${y} ${x},${y - h} ${x + w / 2},${y}`} fill={col} />
    <polygon points={`${x},${y - h} ${x + w / 2},${y} ${x + w * 0.04},${y}`} fill={shade} />
  </g>
);

export const Palm = ({x, y, s = 1, col = '#1d3a1c', trunk = '#4a3118'}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-10 0 Q-30 -160 10 -330 L28 -326 Q-4 -160 22 0 Z" fill={trunk} />
    {[-70, -40, -10, 20, 50, 80].map((a, i) => (
      <path key={i} d={`M14 -330 Q${Math.sin((a * Math.PI) / 180) * 120 + 14} ${-380 + Math.abs(a) * 0.4} ${Math.sin((a * Math.PI) / 180) * 230 + 14} ${-300 + Math.abs(a) * 1.1} Q${Math.sin((a * Math.PI) / 180) * 120 + 14} ${-350 + Math.abs(a) * 0.4} 14 -322 Z`} fill={col} />
    ))}
  </g>
);

export const Statue = ({x, y, s = 1, col = 'url(#pillarLit)', ink = '#2a1808'}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-95" y="-70" width="190" height="70" fill={col} stroke={ink} strokeWidth="4" />
    <rect x="-70" y="-300" width="140" height="240" rx="18" fill={col} stroke={ink} strokeWidth="4" />
    <circle cx="0" cy="-360" r="56" fill={col} stroke={ink} strokeWidth="4" />
    <path d="M-64 -380 Q0 -470 64 -380 L88 -250 L52 -250 L52 -340 L-52 -340 L-52 -250 L-88 -250 Z" fill="#c7a24a" stroke={ink} strokeWidth="4" />
    <rect x="-12" y="-322" width="24" height="60" fill="#8d6410" stroke={ink} strokeWidth="3" />
    <path d="M-60 -200 H60 M-60 -150 H60" stroke={ink} strokeWidth="3" opacity=".5" />
  </g>
);

export const Jar = ({x, y, s = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-34 -110 C-70 -70 -60 -10 -26 0 H26 C60 -10 70 -70 34 -110 Z" fill="url(#goldG)" stroke="#2a1808" strokeWidth="4" />
    <rect x="-22" y="-134" width="44" height="26" rx="6" fill="url(#goldG)" stroke="#2a1808" strokeWidth="4" />
    <path d="M-40 -70 H40" stroke="#2a1808" strokeWidth="3" opacity=".5" />
  </g>
);

// Lantai dengan garis perspektif.
export const Floor = ({y = 1280, grad = 'floorGold', vpY = 760, lines = 9, lineColor = 'rgba(0,0,0,.28)'}) => {
  const out = [];
  for (let i = -lines; i <= lines; i++) {
    out.push(<line key={'v' + i} x1={540 + i * 50} y1={y} x2={540 + i * 330} y2={1960} stroke={lineColor} strokeWidth="2.5" />);
  }
  [0.05, 0.16, 0.34, 0.6, 1].forEach((k, i) => {
    const yy = y + (1960 - y) * k;
    out.push(<line key={'h' + i} x1={-360} y1={yy} x2={1440} y2={yy} stroke={lineColor} strokeWidth={2 + i} />);
  });
  return (
    <g>
      <rect x={-360} y={y} width={1800} height={1960 - y} fill={`url(#${grad})`} />
      {out}
    </g>
  );
};

export const Stars = ({n = 60, seed = 3, y0 = -100, y1 = 700, t = 0}) => (
  <g fill="#fff">
    {Array.from({length: n}).map((_, i) => (
      <circle key={i} cx={-300 + rnd(seed + i) * 1700} cy={y0 + rnd(seed * 3 + i) * (y1 - y0)} r={1 + rnd(i + 9) * 2.2} opacity={0.5 + 0.5 * Math.sin(t / 20 + i)} />
    ))}
  </g>
);
