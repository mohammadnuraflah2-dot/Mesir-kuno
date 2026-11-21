import React from 'react';
import {interpolate, spring, useVideoConfig} from 'remotion';
import {Jar} from './art.jsx';

const OUT = '#0b0b0b';
const SW = 7;
const rad = (d) => (d * Math.PI) / 180;

// Desain karakter generik (tanpa nama pribadi untuk figuran). Warna & bentuk konsisten di semua scene.
const ROLES = {
  ramesses3: {body: 'kilt', skin: '#c98a4b', cloth: '#f4efe0', accent: '#f2c14e', rim: '#1f4e9c', head: 'crown3', beard: true, sash: null},
  tiye: {body: 'dress', skin: '#d89a5c', cloth: '#efe3c6', accent: '#f2c14e', rim: '#2aa6a0', head: 'queen', sash: null},
  pentawere: {body: 'kilt', skin: '#c58a50', cloth: '#e9e0c8', accent: '#2aa6a0', rim: '#f2c14e', head: 'prince', sash: '#2aa6a0'},
  ramesses4: {body: 'kilt', skin: '#cf9457', cloth: '#fbf6e8', accent: '#d4a017', rim: '#b3392b', head: 'heir', sash: '#b3392b'},
  guard: {body: 'kilt', skin: '#b97a43', cloth: '#d8c8a0', accent: '#8a6a2b', rim: '#5a3a1a', head: 'guard', sash: '#5a3a1a', item: 'spear', pose: 'spear'},
  official: {body: 'robe', skin: '#bf7f48', cloth: '#efe7d0', accent: '#2a6fb0', rim: '#f2c14e', head: 'wig', sash: '#2a6fb0'},
  servant: {body: 'kilt', skin: '#b77a47', cloth: '#e5d9bb', accent: '#c9a24a', rim: '#8a6a2b', head: 'cloth', sash: null},
  scientist: {body: 'coat', skin: '#e0b48a', cloth: '#ffffff', accent: '#4a90c0', rim: '#222', head: 'sci', sash: null},
  scientistB: {body: 'coat', skin: '#8a5a3a', cloth: '#f4f8fb', accent: '#c05a4a', rim: '#222', head: 'sciB', sash: null},
};

const POSES = {
  stand: {L: [10, 6], R: [10, 6], amp: 4},
  regal: {L: [-40, -105], R: [-40, -105], amp: 2},
  point: {L: [10, 6], R: [82, 96], amp: 3},
  raise: {L: [148, 168], R: [148, 168], amp: 6},
  shock: {L: [96, 140], R: [96, 140], amp: 8},
  hold: {L: [20, -70], R: [20, -70], amp: 3},
  spear: {L: [14, 8], R: [14, 4], amp: 2},
  think: {L: [10, 6], R: [60, -110], amp: 2},
  talk: {L: [30, -20], R: [45, 30], amp: 11},
  beckon: {L: [10, 6], R: [70, 140], amp: 9},
};

const Arm = ({side, ang, color, sleeve, t, ph, amp}) => {
  const sx = side * 78;
  const sy = -315;
  const sw = amp * Math.sin(t / (21 + (ph % 5)) + ph + (side > 0 ? 1 : 0));
  const ua = rad(ang[0] + sw);
  const la = rad(ang[1] + sw * 1.4);
  const ex = sx + side * Math.sin(ua) * 88;
  const ey = sy + Math.cos(ua) * 88;
  const wx = ex + side * Math.sin(la) * 82;
  const wy = ey + Math.cos(la) * 82;
  const pts = `${sx},${sy} ${ex},${ey} ${wx},${wy}`;
  return {
    wrist: [wx, wy],
    node: (
      <g strokeLinecap="round" strokeLinejoin="round" fill="none">
        <polyline points={pts} stroke={OUT} strokeWidth={42} />
        <polyline points={pts} stroke={sleeve || color} strokeWidth={30} />
        <circle cx={wx} cy={wy} r={19} fill={color} stroke={OUT} strokeWidth={6} />
      </g>
    ),
  };
};

const Leg = ({hx, ang, color, trouser}) => {
  const fx = hx + Math.sin(rad(ang)) * 100;
  const fy = -100 + Math.cos(rad(ang)) * 100;
  return (
    <g strokeLinecap="round">
      <line x1={hx} y1={-100} x2={fx} y2={fy} stroke={OUT} strokeWidth={44} />
      <line x1={hx} y1={-100} x2={fx} y2={fy} stroke={trouser || color} strokeWidth={32} />
      <ellipse cx={fx + (hx > 0 ? 8 : -8)} cy={fy + 2} rx={30} ry={13} fill={trouser ? '#2a2a2a' : '#8a6a2b'} stroke={OUT} strokeWidth={6} />
    </g>
  );
};

const Stripes = ({x1, x2, y, n, color}) => (
  <g stroke={color} strokeWidth="3" opacity=".55">
    {Array.from({length: n}).map((_, i) => (
      <line key={i} x1={x1 + ((x2 - x1) * (i + 1)) / (n + 1)} y1={y} x2={x1 + ((x2 - x1) * (i + 1)) / (n + 1)} y2={y + 55} />
    ))}
  </g>
);

const HeadBack = ({kind, R}) => {
  const s = {stroke: OUT, strokeWidth: SW, strokeLinejoin: 'round'};
  switch (kind) {
    case 'crown3':
      return (
        <g {...s}>
          <path d="M-104 -30 L-136 190 L-70 196 L-80 40 Z" fill={R.rim} />
          <path d="M104 -30 L136 190 L70 196 L80 40 Z" fill={R.rim} />
          <path d="M-120 60 L-128 150 M120 60 L128 150" stroke={R.accent} strokeWidth="8" />
        </g>
      );
    case 'queen':
      return (
        <g {...s}>
          <path d="M-110 -40 Q-136 160 -108 270 L108 270 Q136 160 110 -40 Z" fill="#14100e" />
          <path d="M-100 -20 Q-150 80 -134 200 Q-100 120 -92 40 Z" fill={R.accent} />
          <path d="M100 -20 Q150 80 134 200 Q100 120 92 40 Z" fill={R.accent} />
        </g>
      );
    case 'prince':
      return (
        <g {...s}>
          <circle cx="0" cy="-6" r="110" fill="#14100e" />
          <path d="M96 -20 Q140 40 120 130" fill="none" stroke="#14100e" strokeWidth="20" />
          <circle cx="120" cy="136" r="12" fill={R.rim} />
        </g>
      );
    case 'guard':
      return (
        <g {...s}>
          <path d="M-104 -20 L-116 90 L-80 80 Z" fill="#7a6035" />
          <path d="M104 -20 L116 90 L80 80 Z" fill="#7a6035" />
        </g>
      );
    case 'wig':
      return (
        <g {...s}>
          <path d="M-108 -30 L-126 140 L-84 140 L-92 40 Z" fill="#14100e" />
          <path d="M108 -30 L126 140 L84 140 L92 40 Z" fill="#14100e" />
        </g>
      );
    case 'cloth':
      return (
        <g {...s}>
          <path d="M-104 -20 L-114 100 L-80 90 Z" fill="#e5d9bb" />
          <path d="M104 -20 L114 100 L80 90 Z" fill="#e5d9bb" />
        </g>
      );
    default:
      return null;
  }
};

const HeadFront = ({kind, R, t}) => {
  const s = {stroke: OUT, strokeWidth: SW, strokeLinejoin: 'round'};
  switch (kind) {
    case 'crown3':
      return (
        <g {...s}>
          <path d="M-102 -40 A102 102 0 0 1 102 -40 Z" fill={R.rim} />
          {[-60, -30, 0, 30, 60].map((x) => (
            <path key={x} d={`M${x} -138 L${x * 1.05} -42`} stroke={R.accent} strokeWidth="5" />
          ))}
          <rect x="-104" y="-52" width="208" height="18" fill={R.accent} />
          <path d="M-62 -140 L-52 -190 L52 -190 L62 -140 Z" fill="#b3392b" />
          <path d="M-42 -190 Q-48 -300 0 -312 Q48 -300 42 -190 Z" fill="#f6f1e4" />
          <path d="M0 -312 Q-24 -330 -8 -352" fill="none" strokeWidth="5" />
          <circle cx="0" cy="-66" r="11" fill={R.accent} />
        </g>
      );
    case 'queen':
      return (
        <g {...s}>
          <path d="M-104 -30 A104 104 0 0 1 104 -30 Z" fill="#14100e" />
          <rect x="-104" y="-50" width="208" height="16" fill={R.accent} />
          <rect x="-46" y="-158" width="92" height="46" fill={R.accent} />
          <path d="M-30 -158 Q-50 -250 -22 -318 Q12 -250 -4 -158 Z" fill="#f3e3a6" />
          <path d="M30 -158 Q50 -250 22 -318 Q-12 -250 4 -158 Z" fill="#e8c76a" />
          <circle cx="0" cy="-66" r="11" fill={R.rim} />
        </g>
      );
    case 'prince':
      return (
        <g {...s}>
          <path d="M-100 -20 A100 100 0 0 1 100 -20 Q0 -62 -100 -20 Z" fill="#14100e" />
          <rect x="-101" y="-40" width="202" height="13" fill={R.accent} />
          <circle cx="0" cy="-56" r="9" fill={R.rim} />
        </g>
      );
    case 'heir':
      return (
        <g {...s}>
          <path d="M-100 -30 A100 100 0 0 1 100 -30 Z" fill="#1f4e9c" />
          <ellipse cx="0" cy="-118" rx="92" ry="74" fill="#1f4e9c" />
          {[-48, -16, 16, 48].map((x, i) => (
            <circle key={i} cx={x} cy={-130 + (i % 2) * 18} r="7" fill="#f2c14e" stroke="none" />
          ))}
          <rect x="-102" y="-46" width="204" height="16" fill="#f2c14e" />
          <circle cx="0" cy="-62" r="10" fill="#b3392b" />
        </g>
      );
    case 'guard':
      return (
        <g {...s}>
          <path d="M-104 -20 A104 104 0 0 1 104 -20 Z" fill="#8a6a2b" />
          <rect x="-104" y="-44" width="208" height="14" fill="#c9a24a" />
          <path d="M-30 -102 V-60 M0 -104 V-60 M30 -102 V-60" stroke="#5a3a1a" strokeWidth="5" />
        </g>
      );
    case 'wig':
      return (
        <g {...s}>
          <path d="M-106 -10 A106 106 0 0 1 106 -10 Q0 -56 -106 -10 Z" fill="#14100e" />
          <rect x="-104" y="-44" width="208" height="14" fill={R.rim} />
        </g>
      );
    case 'cloth':
      return (
        <g {...s}>
          <path d="M-104 -20 A104 104 0 0 1 104 -20 Z" fill="#e5d9bb" />
          <rect x="-104" y="-40" width="208" height="12" fill="#8a6a2b" />
        </g>
      );
    case 'sci':
    case 'sciB':
      return (
        <g {...s}>
          <path d="M-100 -10 A100 100 0 0 1 100 -10 Q40 -50 -100 -10 Z" fill={kind === 'sci' ? '#5a3a22' : '#14100e'} />
        </g>
      );
    default:
      return null;
  }
};

const Face = ({expr, look, t, R, glasses}) => {
  const blink = t % 118 < 5 ? 0.12 : 1;
  const base = {
    neutral: {ry: 12, bl: [-22, -22], mouth: 'M-18 62 Q0 67 18 62'},
    serious: {ry: 9, bl: [-14, -26], mouth: 'M-17 64 H17'},
    smile: {ry: 11, bl: [-26, -26], mouth: 'M-24 56 Q0 84 24 56'},
    worried: {ry: 13, bl: [-30, -14], mouth: 'M-19 70 Q0 56 19 70'},
    shock: {ry: 17, bl: [-36, -36], mouth: null},
    ambitious: {ry: 7, bl: [-17, -25], mouth: 'M-20 66 Q6 68 24 54'},
    focus: {ry: 10, bl: [-16, -24], mouth: 'M-12 64 Q0 66 12 64'},
  }[expr || 'neutral'];
  const ox = look * 12;
  const eyes = [-1, 1].map((sd) => {
    const cx = sd * 38 + ox;
    const cy = 8;
    return (
      <g key={sd}>
        <ellipse cx={cx} cy={cy} rx={9} ry={base.ry * blink} fill="#0b0b0b" />
        <path d={`M${cx + sd * 9} ${cy} l${sd * 16} -5`} stroke="#0b0b0b" strokeWidth="5" strokeLinecap="round" />
        {expr === 'ambitious' && <rect x={cx - 11} y={cy - base.ry - 2} width={22} height={base.ry + 1} fill={R.skin} />}
        <line x1={cx - sd * 22} y1={cy + base.bl[0]} x2={cx + sd * 18} y2={cy + base.bl[1]} stroke="#0b0b0b" strokeWidth="7" strokeLinecap="round" />
      </g>
    );
  });
  return (
    <g>
      {eyes}
      {glasses && (
        <g fill="rgba(200,230,255,.25)" stroke="#0b0b0b" strokeWidth="5">
          <circle cx={-38 + ox} cy={8} r={27} />
          <circle cx={38 + ox} cy={8} r={27} />
          <path d={`M${-11 + ox} 8 H${11 + ox}`} />
        </g>
      )}
      <path d={`M${ox} 24 Q${ox + 11} 40 ${ox} 46`} stroke="#0b0b0b" strokeWidth="5" fill="none" strokeLinecap="round" />
      <g transform={`translate(${ox * 0.7} 0)`}>
        {base.mouth ? (
          <path d={base.mouth} stroke="#0b0b0b" strokeWidth="6" fill="none" strokeLinecap="round" />
        ) : (
          <ellipse cx="0" cy="70" rx="12" ry="17" fill="#3a0f0f" stroke="#0b0b0b" strokeWidth="5" />
        )}
      </g>
    </g>
  );
};

export const Character = ({
  who,
  x,
  y = 1250,
  scale = 1,
  flip = false,
  pose,
  expr = 'neutral',
  look = 0,
  enter = 'none',
  delay = 0,
  walk = false,
  move = null,
  shadow = false,
  ghost = false,
  opacity = 1,
  item,
  sit = false,
  frame,
  p,
}) => {
  const {fps} = useVideoConfig();
  const R = ROLES[who];
  if (!R) throw new Error('Karakter tidak dikenal: ' + who);
  const poseName = pose || R.pose || 'stand';
  const PO = POSES[poseName];
  if (!PO) throw new Error('Pose tidak dikenal: ' + poseName);
  const itemName = item === undefined ? R.item : item;
  const ph = (who.length * 7 + Math.round(x)) % 53;
  const t = frame + ph;

  const e = enter === 'none' ? 1 : spring({frame: Math.max(0, frame - delay), fps, config: {damping: 16, stiffness: 90, mass: 0.8}, durationInFrames: 38});
  const fadeIn = enter === 'none' ? 1 : interpolate(frame - delay, [0, 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  let dx = 0;
  let dy = 0;
  let sc = 1;
  if (enter === 'left') dx = (1 - e) * -460;
  if (enter === 'right') dx = (1 - e) * 460;
  if (enter === 'rise') dy = (1 - e) * 280;
  if (enter === 'pop') sc = 0.4 + 0.6 * e;
  const mv = move ? move[0] + (move[1] - move[0]) * (p || 0) : 0;
  const walking = walk;
  const bob = walking ? -Math.abs(Math.sin(t / 5)) * 11 : Math.sin(t / 16) * 3.2;
  const squash = 1 + (walking ? 0 : 0.012 * Math.sin(t / 16));
  const legSwing = walking ? Math.sin(t / 5) * 26 : 0;
  const tilt = Math.sin(t / 37) * 2.2 + look * 3;
  const bodyDy = sit ? 82 : 0;

  const armColor = R.skin;
  const sleeve = R.body === 'coat' ? R.cloth : null;
  const walkAmp = walking ? 14 : 0;
  const aL = Arm({side: -1, ang: PO.L, color: armColor, sleeve, t, ph, amp: PO.amp + walkAmp * 0.3});
  const aR = Arm({side: 1, ang: PO.R, color: armColor, sleeve, t, ph: ph + 2, amp: PO.amp + walkAmp * 0.3});
  const [rwx, rwy] = aR.wrist;
  const [lwx, lwy] = aL.wrist;

  let filter;
  if (shadow) filter = 'brightness(0)';
  else if (ghost) filter = 'drop-shadow(0 0 22px rgba(160,235,255,.95)) saturate(.6) brightness(1.15)';
  const op = opacity * fadeIn * (ghost ? 0.62 : 1) * (shadow ? 0.78 : 1);

  const body = (() => {
    if (R.body === 'dress') {
      return (
        <g stroke={OUT} strokeWidth={SW} strokeLinejoin="round">
          <path d="M-74 -330 L74 -330 L100 -12 L-100 -12 Z" fill={R.cloth} />
          <Stripes x1={-90} x2={90} y={-170} n={6} color="#8a6a2b" />
          <rect x="-84" y="-196" width="168" height="18" fill={R.accent} />
          <path d="M-98 -44 L98 -44 L100 -12 L-100 -12 Z" fill={R.accent} />
        </g>
      );
    }
    if (R.body === 'coat') {
      return (
        <g stroke={OUT} strokeWidth={SW} strokeLinejoin="round">
          <path d="M-82 -330 L82 -330 L94 -62 L-94 -62 Z" fill={R.cloth} />
          <path d="M-30 -330 L0 -200 L30 -330" fill={R.skin} />
          <path d="M-30 -330 L0 -200 L30 -330" fill="none" />
          <path d="M0 -200 V-62" />
          <rect x="30" y="-250" width="32" height="26" fill="#fff" />
          <circle cx="-5" cy="-165" r="6" fill="#999" />
        </g>
      );
    }
    return (
      <g stroke={OUT} strokeWidth={SW} strokeLinejoin="round">
        <path d="M-78 -330 L78 -330 L66 -170 L-66 -170 Z" fill={R.cloth} />
        {R.sash && <path d="M-78 -330 L-50 -330 L66 -170 L40 -170 Z" fill={R.sash} />}
        <path d={R.body === 'robe' ? 'M-68 -168 L68 -168 L92 -42 L-92 -42 Z' : 'M-68 -168 L68 -168 L88 -90 L-88 -90 Z'} fill={R.cloth} />
        <Stripes x1={-80} x2={80} y={R.body === 'robe' ? -150 : -160} n={5} color="#8a6a2b" />
        <rect x="-70" y="-182" width="140" height="18" fill={R.accent} />
        <path d="M-70 -332 A70 70 0 0 0 70 -332 Z" fill={R.rim === '#222' ? R.accent : R.accent} />
      </g>
    );
  })();

  const legs = (() => {
    if (sit) {
      return (
        <g stroke={OUT} strokeWidth={SW}>
          <rect x="-58" y="-14" width="34" height="22" fill={R.skin} />
          <rect x="24" y="-14" width="34" height="22" fill={R.skin} />
          <ellipse cx="-44" cy="12" rx="32" ry="13" fill="#8a6a2b" />
          <ellipse cx="44" cy="12" rx="32" ry="13" fill="#8a6a2b" />
        </g>
      );
    }
    if (R.body === 'dress') {
      return (
        <g stroke={OUT} strokeWidth={6}>
          <ellipse cx={-34 + legSwing * 0.5} cy={-4} rx="34" ry="13" fill="#8a6a2b" />
          <ellipse cx={34 - legSwing * 0.5} cy={-4} rx="34" ry="13" fill="#8a6a2b" />
        </g>
      );
    }
    const trouser = R.body === 'coat' ? '#3a424a' : null;
    return (
      <g>
        <Leg hx={-34} ang={legSwing} color={R.skin} trouser={trouser} />
        <Leg hx={34} ang={-legSwing} color={R.skin} trouser={trouser} />
      </g>
    );
  })();

  const itemNode = (() => {
    if (!itemName) return null;
    if (itemName === 'spear') {
      return (
        <g>
          <line x1={rwx} y1={rwy + 90} x2={rwx} y2={-640} stroke={OUT} strokeWidth="16" strokeLinecap="round" />
          <line x1={rwx} y1={rwy + 90} x2={rwx} y2={-640} stroke="#7a5428" strokeWidth="9" strokeLinecap="round" />
          <polygon points={`${rwx - 16},-630 ${rwx},-710 ${rwx + 16},-630`} fill="#c6ccd2" stroke={OUT} strokeWidth="5" />
          <circle cx={rwx} cy={rwy} r={19} fill={armColor} stroke={OUT} strokeWidth="6" />
        </g>
      );
    }
    if (itemName === 'scroll') {
      const cx = (rwx + lwx) / 2;
      const cy = (rwy + lwy) / 2;
      return (
        <g transform={`translate(${cx} ${cy})`}>
          <rect x="-62" y="-20" width="124" height="40" rx="18" fill="#efe0b0" stroke={OUT} strokeWidth="6" />
          <path d="M-40 -6 H40 M-40 8 H30" stroke="#7a3a1a" strokeWidth="4" />
          <circle cx="-62" cy="0" r="12" fill="#c9a24a" stroke={OUT} strokeWidth="4" />
          <circle cx="62" cy="0" r="12" fill="#c9a24a" stroke={OUT} strokeWidth="4" />
        </g>
      );
    }
    if (itemName === 'jar') return <g><Jar x={rwx + 26} y={rwy + 52} s={0.55} /><circle cx={rwx} cy={rwy} r={19} fill={armColor} stroke={OUT} strokeWidth="6" /></g>;
    if (itemName === 'tablet') {
      const cx = (rwx + lwx) / 2;
      const cy = (rwy + lwy) / 2;
      return (
        <g transform={`translate(${cx} ${cy}) rotate(-8)`}>
          <rect x="-44" y="-56" width="88" height="112" rx="8" fill="#d6dde3" stroke={OUT} strokeWidth="6" />
          <path d="M-26 -30 H26 M-26 -8 H26 M-26 14 H10" stroke="#456" strokeWidth="5" />
        </g>
      );
    }
    if (itemName === 'tray') return <g><ellipse cx={rwx + 10} cy={rwy - 12} rx="64" ry="14" fill="url(#goldG)" stroke={OUT} strokeWidth="5" /><circle cx={rwx - 10} cy={rwy - 40} r="20" fill="#c0392b" stroke={OUT} strokeWidth="4" /></g>;
    return null;
  })();

  return (
    <g
      transform={`translate(${x + dx + mv} ${y + dy}) scale(${(flip ? -1 : 1) * scale * sc} ${scale * sc})`}
      opacity={op}
      style={filter ? {filter} : undefined}
    >
      {legs}
      <g transform={`translate(0 ${bodyDy + bob}) scale(1 ${squash})`}>
        <rect x="-24" y="-352" width="48" height="36" fill={R.skin} stroke={OUT} strokeWidth="6" />
        {body}
        {aL.node}
        {aR.node}
        {itemNode}
        <g transform={`rotate(${tilt} 0 -340)`}>
          <g transform="translate(0 -430)">
            <HeadBack kind={R.head} R={R} />
            <circle cx="0" cy="0" r="100" fill={R.skin} stroke={OUT} strokeWidth={SW} />
            <circle cx="-100" cy="6" r="16" fill={R.skin} stroke={OUT} strokeWidth="6" />
            <circle cx="100" cy="6" r="16" fill={R.skin} stroke={OUT} strokeWidth="6" />
            {R.beard && <path d="M-16 86 L16 86 L12 190 L-12 190 Z" fill="#1d3a6a" stroke={OUT} strokeWidth="6" />}
            <Face expr={expr} look={look} t={t} R={R} glasses={R.head === 'sci' || R.head === 'sciB'} />
            <HeadFront kind={R.head} R={R} t={t} />
          </g>
        </g>
      </g>
    </g>
  );
};

export const CHARACTER_IDS = Object.keys(ROLES);
export const POSE_IDS = Object.keys(POSES);
