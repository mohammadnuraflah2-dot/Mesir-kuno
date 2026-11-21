import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Hiero, rnd} from './art.jsx';

const OUT = '#0b0b0b';
const FONT = 'Arial Black, Impact, Arial, sans-serif';
const clamp01 = (v) => Math.max(0, Math.min(1, v));

// ---------- Mumi ----------
const Mummy = ({variant = 'royal', wound = false, t, glow = 0}) => {
  const goat = variant === 'goat';
  const pulse = 0.65 + 0.35 * Math.sin(t / 5);
  const lines = [];
  for (let i = 0; i < 17; i++) {
    const x = -250 + i * 36;
    lines.push(<path key={i} d={`M${x} -70 L${x + 16} 40`} stroke="rgba(60,40,20,.55)" strokeWidth="4" />);
  }
  return (
    <g>
      <rect x="-460" y="40" width="920" height="64" rx="10" fill="#8a7a62" stroke={OUT} strokeWidth="6" />
      <rect x="-420" y="100" width="60" height="90" fill="#6a5a46" stroke={OUT} strokeWidth="5" />
      <rect x="360" y="100" width="60" height="90" fill="#6a5a46" stroke={OUT} strokeWidth="5" />
      <rect x="-290" y="-74" width="680" height="118" rx="52" fill={goat ? '#7a5632' : '#eadfc0'} stroke={OUT} strokeWidth="7" />
      {!goat && lines}
      {goat && (
        <g>
          <polygon points="-200,-60 -90,-70 -60,-10 -170,10" fill="#5a3b1f" opacity=".85" />
          <polygon points="0,-66 140,-60 170,0 40,20" fill="#8c6a40" opacity=".9" />
          <polygon points="220,-50 340,-40 330,20 230,30" fill="#4d3219" opacity=".85" />
          <path d="M-200 -20 l30 0 M-60 -30 l0 30 M100 -40 l0 28 M240 -10 l40 0" stroke="#d8c8a0" strokeWidth="4" strokeDasharray="6 8" />
        </g>
      )}
      {!goat && (
        <g>
          <rect x="-110" y="-58" width="160" height="40" rx="18" fill="#d9b54a" stroke={OUT} strokeWidth="5" />
          <rect x="-110" y="-12" width="160" height="40" rx="18" fill="#c8a038" stroke={OUT} strokeWidth="5" />
        </g>
      )}
      <circle cx="-340" cy="-18" r="84" fill={goat ? '#7a5632' : 'url(#goldG)'} stroke={OUT} strokeWidth="7" />
      {!goat && (
        <g>
          <path d="M-420 -30 L-440 60 L-380 70 L-384 0 Z" fill="#1f4e9c" stroke={OUT} strokeWidth="5" />
          <path d="M-262 -30 L-246 60 L-300 70 L-296 0 Z" fill="#1f4e9c" stroke={OUT} strokeWidth="5" />
          <path d="M-410 -46 A76 76 0 0 1 -270 -46 Z" fill="#1f4e9c" stroke={OUT} strokeWidth="5" />
          <ellipse cx="-364" cy="-14" rx="10" ry="8" fill={OUT} />
          <ellipse cx="-316" cy="-14" rx="10" ry="8" fill={OUT} />
          <path d="M-352 22 H-328" stroke={OUT} strokeWidth="6" />
        </g>
      )}
      {goat && (
        <g>
          <ellipse cx="-364" cy="-24" rx="9" ry="8" fill={OUT} />
          <ellipse cx="-318" cy="-24" rx="9" ry="8" fill={OUT} />
          <ellipse cx="-340" cy="20" rx="17" ry="30" fill="#1a0c06" stroke={OUT} strokeWidth="5" />
        </g>
      )}
      {glow > 0 && <circle cx="-300" cy="0" r={420 * glow} fill="url(#glowBlue)" opacity=".35" />}
      {wound && (
        <g>
          <circle cx="-282" cy="-6" r={120 * pulse + 40} fill="url(#glowRed)" opacity=".55" />
          <circle cx="-282" cy="-6" r="70" fill="none" stroke="#fff3c0" strokeWidth="4" strokeDasharray="10 8" opacity={pulse} />
          <path d="M-318 -46 Q-282 -8 -246 -62" fill="none" stroke="#2a0606" strokeWidth="14" strokeLinecap="round" />
          <path d="M-318 -46 Q-282 -8 -246 -62" fill="none" stroke="#ff7a4a" strokeWidth="5" strokeLinecap="round" opacity={pulse} />
        </g>
      )}
    </g>
  );
};

// ---------- Pemindai CT (tampak samping) ----------
const CtScanner = ({t, p = 0}) => {
  const slide = interpolate(p, [0, 0.75], [-520, 40], {extrapolateRight: 'clamp', easing: Easing.inOut(Easing.sin)});
  const beam = 0.5 + 0.5 * Math.sin(t / 3);
  return (
    <g>
      <rect x="-700" y="70" width="1400" height="34" rx="8" fill="#2c353d" stroke={OUT} strokeWidth="6" />
      <g transform={`translate(${slide} -40) scale(.7)`}>
        <Mummy variant="royal" t={t} />
      </g>
      <rect x="-60" y="-330" width="240" height="470" rx="26" fill="#d4dde4" stroke={OUT} strokeWidth="7" />
      <rect x="-60" y="-330" width="60" height="470" rx="26" fill="#aebac3" stroke={OUT} strokeWidth="7" />
      <rect x="-30" y="-290" width="170" height="90" rx="10" fill="#06131b" stroke={OUT} strokeWidth="5" />
      <path d={`M-20 ${-245} q20 -${20 + 12 * Math.sin(t / 5)} 40 0 t40 0 t40 0 t30 0`} stroke="#4ad0ff" strokeWidth="5" fill="none" />
      <circle cx="140" cy="-300" r="9" fill={beam > 0.5 ? '#5dff9a' : '#ff5a4a'} />
      <rect x="-60" y="-90" width="240" height="150" fill="#1b2630" stroke={OUT} strokeWidth="6" opacity=".0" />
      <rect x="170" y="-30" width="14" height="130" fill="#7fe3ff" opacity={0.35 + 0.5 * beam} />
      <circle cx="177" cy="30" r="150" fill="url(#glowBlue)" opacity={0.25 + 0.35 * beam} />
    </g>
  );
};

const Tag = ({text, color = '#ffffff', bg = 'rgba(10,18,28,.88)', border = '#4ad0ff', size = 44, w}) => {
  const width = w || text.length * size * 0.62 + 50;
  return (
    <g>
      <rect x={-width / 2} y={-size * 0.95} width={width} height={size * 1.6} rx="12" fill={bg} stroke={border} strokeWidth="5" />
      <text x="0" y={size * 0.2} textAnchor="middle" fontFamily={FONT} fontWeight="900" fontSize={size} fill={color}>
        {text}
      </text>
    </g>
  );
};

// ---------- Monitor: neck / ct / dna ----------
const Helix = ({t, w = 220, h = 520, color1 = '#4ad0ff', color2 = '#f2c14e'}) => {
  const n = 18;
  const rungs = [];
  const a = [];
  const b = [];
  for (let i = 0; i <= n; i++) {
    const y = -h / 2 + (h * i) / n;
    const ph = i * 0.65 + t / 12;
    const x1 = Math.sin(ph) * (w / 2);
    const x2 = -x1;
    a.push(`${x1.toFixed(1)},${y.toFixed(1)}`);
    b.push(`${x2.toFixed(1)},${y.toFixed(1)}`);
    rungs.push(<line key={i} x1={x1} y1={y} x2={x2} y2={y} stroke="#cfe9ff" strokeWidth="4" opacity={0.35 + 0.4 * Math.abs(Math.cos(ph))} />);
  }
  return (
    <g>
      {rungs}
      <polyline points={a.join(' ')} fill="none" stroke={color1} strokeWidth="9" strokeLinejoin="round" />
      <polyline points={b.join(' ')} fill="none" stroke={color2} strokeWidth="9" strokeLinejoin="round" />
    </g>
  );
};

const Monitor = ({mode = 'neck', t, label}) => {
  const pulse = 0.55 + 0.45 * Math.sin(t / 4);
  return (
    <g>
      <rect x="-380" y="-490" width="760" height="980" rx="34" fill="#0b141c" stroke="#8fa3b3" strokeWidth="14" />
      <rect x="-350" y="-460" width="700" height="920" rx="16" fill="#03090d" />
      {mode === 'neck' && (
        <g>
          <path d="M-190 -440 Q-20 -380 150 -440" fill="none" stroke="#9fb6c4" strokeWidth="6" opacity=".6" />
          <path d="M-250 -300 Q-190 -120 -240 160 Q-250 330 -170 440" fill="none" stroke="#6f8696" strokeWidth="8" opacity=".6" />
          <path d="M240 -300 Q200 -100 250 140 Q260 330 210 440" fill="none" stroke="#6f8696" strokeWidth="8" opacity=".6" />
          {Array.from({length: 7}).map((_, i) => (
            <g key={i}>
              <rect x="-130" y={-360 + i * 86} width="86" height="62" rx="16" fill="#d7e6ee" stroke="#8fa3b3" strokeWidth="5" opacity=".92" />
              <path d={`M-130 ${-330 + i * 86} l-52 12 l52 18 Z`} fill="#c2d4de" />
            </g>
          ))}
          <ellipse cx="120" cy="-60" rx="26" ry="150" fill="#05080b" stroke="#5a6f7c" strokeWidth="6" />
          <path d="M260 -60 Q150 -26 -40 -66" fill="none" stroke="#000" strokeWidth="26" strokeLinecap="round" />
          <path d="M260 -60 Q150 -26 -40 -66" fill="none" stroke="#ff8a5a" strokeWidth="8" strokeLinecap="round" opacity={pulse} />
          <circle cx="110" cy="-50" r={130 * (0.8 + 0.2 * pulse)} fill="url(#glowRed)" opacity=".45" />
          <circle cx="110" cy="-50" r="108" fill="none" stroke="#fff3c0" strokeWidth="5" strokeDasharray="14 10" opacity={pulse} />
          <path d="M215 -140 L300 -240" stroke="#fff3c0" strokeWidth="5" />
          <g transform="translate(120 -290)">
            <Tag text={label || 'LUKA SAYATAN'} color="#ffd9a8" border="#ff8a5a" size={38} />
          </g>
        </g>
      )}
      {mode === 'ct' && (
        <g>
          <circle cx="0" cy="-60" r="250" fill="none" stroke="#4ad0ff" strokeWidth="6" opacity=".7" />
          <circle cx="0" cy="-60" r="170" fill="rgba(120,180,200,.12)" stroke="#8fe8ff" strokeWidth="4" />
          <circle cx="0" cy="-60" r="40" fill="#d7e6ee" opacity=".85" />
          {Array.from({length: 10}).map((_, i) => (
            <path key={i} d={`M-250 ${-300 + i * 60} H250`} stroke="#4ad0ff" strokeWidth="2" opacity=".18" />
          ))}
          <rect x="-250" y={-300 + ((t * 5) % 480)} width="500" height="10" fill="#8fe8ff" opacity=".6" />
          <g transform="translate(0 380)">
            <Tag text={label || 'PEMINDAIAN CT'} size={40} />
          </g>
        </g>
      )}
      {mode === 'dna' && (
        <g>
          <g transform="translate(0 -20)">
            <Helix t={t} w={260} h={640} />
          </g>
          <g transform="translate(0 400)">
            <Tag text={label || 'ANALISIS DNA'} size={40} />
          </g>
        </g>
      )}
    </g>
  );
};

// ---------- Silsilah (visual ilmiah sederhana) ----------
const Lineage = ({t, p = 0}) => {
  const reveal = clamp01(p * 2.2);
  const dash = 700 * (1 - reveal);
  return (
    <g>
      <rect x="-330" y="-470" width="660" height="940" rx="30" fill="rgba(4,12,20,.92)" stroke="#4ad0ff" strokeWidth="8" />
      <g transform="translate(0 -300)">
        <circle r="90" fill="url(#goldG)" stroke={OUT} strokeWidth="7" />
        <path d="M-80 -20 A80 80 0 0 1 80 -20 Z" fill="#1f4e9c" stroke={OUT} strokeWidth="5" />
        <ellipse cx="-30" cy="0" rx="9" ry="8" fill={OUT} />
        <ellipse cx="30" cy="0" rx="9" ry="8" fill={OUT} />
        <path d="M-18 40 H18" stroke={OUT} strokeWidth="6" />
        <g transform="translate(0 140)"><Tag text="RAMESSES III" size={34} /></g>
      </g>
      <path d="M0 -140 V120" stroke="#f2c14e" strokeWidth="10" strokeDasharray="700" strokeDashoffset={dash} />
      <g transform="translate(0 -10)" opacity={reveal}>
        <Tag text="GARIS KETURUNAN LAKI-LAKI" size={26} border="#f2c14e" />
      </g>
      <g transform="translate(0 270)" opacity={clamp01(reveal * 1.4)}>
        <circle r="84" fill="#7a5632" stroke={OUT} strokeWidth="7" />
        <ellipse cx="-28" cy="-10" rx="9" ry="8" fill={OUT} />
        <ellipse cx="28" cy="-10" rx="9" ry="8" fill={OUT} />
        <ellipse cx="0" cy="34" rx="15" ry="26" fill="#1a0c06" stroke={OUT} strokeWidth="5" />
        <g transform="translate(0 134)"><Tag text="UNKNOWN MAN E" size={34} /></g>
      </g>
      <circle cx="0" cy="270" r={130 + 10 * Math.sin(t / 6)} fill="none" stroke="#4ad0ff" strokeWidth="4" strokeDasharray="12 12" opacity={reveal * 0.7} />
    </g>
  );
};

// ---------- Papirus ----------
const Papyrus = ({variant, t, p = 0, label}) => {
  const open = interpolate(p, [0, 0.4], [0.35, 1], {extrapolateRight: 'clamp'});
  const w = 640 * open;
  return (
    <g>
      <rect x={-w / 2} y="-260" width={w} height="520" rx="14" fill="#e9d6a2" stroke={OUT} strokeWidth="7" />
      <rect x={-w / 2 - 26} y="-280" width="52" height="560" rx="26" fill="#c9a86a" stroke={OUT} strokeWidth="6" />
      <rect x={w / 2 - 26} y="-280" width="52" height="560" rx="26" fill="#c9a86a" stroke={OUT} strokeWidth="6" />
      {[0, 1, 2, 3, 4].map((r) => (
        <g key={r} opacity={open}>
          <Hiero x={-w / 2 + 40} y={-220 + r * 78} w={w - 80} h={44} seed={80 + r} color={r % 2 ? '#7a2a1a' : '#2a1808'} opacity={0.85} />
        </g>
      ))}
      {variant === 'turin' && (
        <g transform="translate(0 340)">
          <Tag text={label || 'PAPIRUS YUDISIAL TURIN'} size={34} border="#f2c14e" />
        </g>
      )}
    </g>
  );
};

// ---------- Kapal ----------
const Ship = ({kind = 'sea', t, ph = 0}) => {
  const sea = kind === 'sea';
  const bob = Math.sin(t / 12 + ph) * 8;
  const hull = sea ? '#3a2a20' : '#8a5a2a';
  const sail = sea ? '#7a1f1a' : '#f1e8d2';
  return (
    <g transform={`translate(0 ${bob}) rotate(${Math.sin(t / 15 + ph) * 2})`}>
      <path d="M-220 0 Q-250 -70 -210 -110 Q-60 -40 0 -40 Q60 -40 210 -110 Q250 -70 220 0 Q0 60 -220 0 Z" fill={hull} stroke={OUT} strokeWidth="6" />
      <path d="M-210 -110 Q-232 -170 -196 -196 M210 -110 Q232 -170 196 -196" fill="none" stroke={OUT} strokeWidth="12" strokeLinecap="round" />
      <circle cx="-196" cy="-200" r="16" fill={sea ? '#b3392b' : '#f2c14e'} stroke={OUT} strokeWidth="5" />
      <circle cx="196" cy="-200" r="16" fill={sea ? '#b3392b' : '#f2c14e'} stroke={OUT} strokeWidth="5" />
      <line x1="0" y1="-40" x2="0" y2="-330" stroke={OUT} strokeWidth="14" />
      <path d="M-6 -320 Q-130 -240 -120 -120 Q0 -80 120 -120 Q130 -240 6 -320 Z" fill={sail} stroke={OUT} strokeWidth="6" />
      <path d="M-70 -230 H70 M-90 -170 H90" stroke={OUT} strokeWidth="4" opacity=".4" />
      {[-140, -70, 0, 70, 140].map((x) => (
        <line key={x} x1={x} y1={-10} x2={x + 20} y2={50 + 6 * Math.sin(t / 6 + x)} stroke={OUT} strokeWidth="7" />
      ))}
    </g>
  );
};

// ---------- Pasukan ----------
const Soldier = ({x, y, s, t, col, ph}) => (
  <g transform={`translate(${x} ${y + Math.abs(Math.sin(t / 7 + ph)) * -6}) scale(${s})`}>
    <line x1="34" y1="20" x2="34" y2="-250" stroke={OUT} strokeWidth="9" />
    <polygon points="26,-246 34,-290 42,-246" fill="#c6ccd2" stroke={OUT} strokeWidth="4" />
    <rect x="-24" y="-96" width="48" height="96" rx="10" fill={col} stroke={OUT} strokeWidth="5" />
    <rect x="-24" y="-96" width="48" height="26" fill="#f1e8d2" stroke={OUT} strokeWidth="4" />
    <circle cx="0" cy="-128" r="30" fill="#b97a43" stroke={OUT} strokeWidth="5" />
    <path d="M-30 -132 A30 30 0 0 1 30 -132 Z" fill="#8a6a2b" stroke={OUT} strokeWidth="4" />
    <ellipse cx="-34" cy="-60" rx="22" ry="40" fill="#7a5428" stroke={OUT} strokeWidth="5" />
  </g>
);

const Army = ({rows = 3, cols = 7, t, col = '#d8c8a0', dir = 1}) => (
  <g>
    {Array.from({length: rows}).map((_, r) =>
      Array.from({length: cols}).map((_, c) => (
        <Soldier key={r + '-' + c} x={(c - (cols - 1) / 2) * 130 * (1 - r * 0.08) + (r % 2) * 40} y={r * -50} s={0.9 - r * 0.15} t={t} col={col} ph={r * 3 + c} />
      ))
    ).reverse()}
  </g>
);

// ---------- Bayangan di dinding ----------
const Shadows = ({list = [], t}) => (
  <g style={{filter: 'blur(4px)'}} opacity=".6">
    {list.map((o, i) => (
      <g key={i} transform={`translate(${o.x + Math.sin(t / 30 + i) * 8} ${o.y || 1100}) scale(${o.s || 1.6})`}>
        <circle cx="0" cy="-330" r="70" fill="#000" />
        <path d="M-120 0 Q-120 -230 -50 -250 L50 -250 Q120 -230 120 0 Z" fill="#000" />
        {o.kind === 'wig' && <path d="M-80 -360 L-100 -230 L100 -230 L80 -360 Z" fill="#000" />}
        {o.kind === 'crown' && <path d="M-40 -380 L0 -520 L40 -380 Z" fill="#000" />}
      </g>
    ))}
  </g>
);

// ---------- Bayangan pengancam (tidak eksplisit) ----------
const DaggerShadow = ({t, at = 40}) => {
  const k = clamp01((t - at) / 8);
  const rot = interpolate(k, [0, 1], [-35, 28], {easing: Easing.in(Easing.quad)});
  return (
    <g style={{filter: 'blur(5px)'}} opacity=".72">
      <circle cx="-80" cy="-250" r="90" fill="#000" />
      <path d="M-260 300 Q-260 -130 -140 -170 L0 -170 Q60 -120 60 300 Z" fill="#000" />
      <g transform={`translate(40 -110) rotate(${rot})`}>
        <path d="M-26 0 L26 0 L20 -230 L-20 -230 Z" fill="#000" />
        <circle cx="0" cy="-250" r="34" fill="#000" />
        <polygon points="-18,-270 18,-270 0,-470" fill="#000" />
      </g>
    </g>
  );
};

const Question = ({t}) => (
  <g>
    <circle r="190" fill="url(#glowWhite)" opacity={0.5 + 0.2 * Math.sin(t / 8)} />
    <text x="0" y="90" textAnchor="middle" fontFamily={FONT} fontWeight="900" fontSize="260" fill="#fff6d0" stroke="#000" strokeWidth="10" paintOrder="stroke">?</text>
  </g>
);

const Banner = ({text, size = 44, color, border}) => <Tag text={text} size={size} color={color} border={border} />;

export const Prop = ({type, x = 540, y = 1250, s = 1, rot = 0, opacity = 1, frame, p = 0, ...rest}) => {
  const t = frame;
  let node = null;
  switch (type) {
    case 'mummy': node = <Mummy t={t} {...rest} />; break;
    case 'ct': node = <CtScanner t={t} p={p} />; break;
    case 'monitor': node = <Monitor t={t} {...rest} />; break;
    case 'helix': node = <Helix t={t} {...rest} />; break;
    case 'lineage': node = <Lineage t={t} p={p} />; break;
    case 'papyrus': node = <Papyrus t={t} p={p} {...rest} />; break;
    case 'ship': node = <Ship t={t} {...rest} />; break;
    case 'army': node = <Army t={t} {...rest} />; break;
    case 'shadows': node = <Shadows t={t} {...rest} />; break;
    case 'dagger': node = <DaggerShadow t={t} {...rest} />; break;
    case 'question': node = <Question t={t} />; break;
    case 'tag': node = <Banner {...rest} />; break;
    default: throw new Error('Properti tidak dikenal: ' + type);
  }
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={opacity}>
      {node}
    </g>
  );
};
