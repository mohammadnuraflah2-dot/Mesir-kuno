import React from 'react';
import {Brazier, Floor, Hiero, Jar, Palm, Pillar, Pyramid, Stars, Statue, Torch, rnd} from './art.jsx';

const X0 = -360;
const WW = 1800;
const Sky = ({g, h = 1300}) => <rect x={X0} y={-250} width={WW} height={h + 250} fill={`url(#${g})`} />;
const Wall = ({g = 'wallStone', y = -250, h = 1530}) => <rect x={X0} y={y} width={WW} height={h} fill={`url(#${g})`} />;

// ---------- Kota Mesir ----------
const city = ({t}) => ({
  far: (
    <g>
      <Sky g="skyDay" h={1180} />
      <circle cx="540" cy="560" r="420" fill="url(#glowWhite)" />
      <circle cx="540" cy="560" r="120" fill="#fff4c4" />
      <Pyramid x={150} y={1060} w={560} h={400} />
      <Pyramid x={900} y={1060} w={440} h={310} />
      <Pyramid x={540} y={1060} w={300} h={210} col="#d19a60" />
      <rect x={X0} y={1050} width={WW} height={140} fill="#e0b070" opacity=".8" />
    </g>
  ),
  mid: (
    <g>
      {Array.from({length: 13}).map((_, i) => {
        const w = 110 + rnd(i) * 70, h = 170 + rnd(i + 20) * 230, x = -340 + i * 140;
        return (
          <g key={i}>
            <rect x={x} y={1190 - h} width={w} height={h} fill="#d9aa68" stroke="#7a5428" strokeWidth="3" />
            <rect x={x + w * 0.62} y={1190 - h} width={w * 0.38} height={h} fill="#b88848" opacity=".7" />
            <rect x={x + 18} y={1190 - h + 40} width={22} height={34} fill="#3b2410" />
            <rect x={x + 18} y={1190 - h + 110} width={22} height={34} fill="#3b2410" />
          </g>
        );
      })}
      <polygon points="330,1190 380,560 470,560 500,1190" fill="#e4b874" stroke="#7a5428" strokeWidth="4" />
      <polygon points="580,1190 610,560 700,560 750,1190" fill="#d3a35f" stroke="#7a5428" strokeWidth="4" />
      <rect x={500} y={780} width={80} height={410} fill="url(#goldG)" stroke="#5a3a10" strokeWidth="4" />
      <Hiero x={392} y={620} w={60} h={440} seed={4} />
      <Hiero x={630} y={620} w={60} h={440} seed={9} />
      <Palm x={90} y={1230} s={1.05} />
      <Palm x={990} y={1240} s={0.95} />
      <rect x={X0} y={1180} width={WW} height={70} fill="#2f7fa3" />
      <path d={`M${X0} 1210 q60 -14 120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0`} stroke="#b9ecff" strokeWidth="3" fill="none" opacity=".6" />
      <rect x={X0} y={1250} width={WW} height={700} fill="url(#sandG)" />
    </g>
  ),
  near: (
    <g>
      <Palm x={-130} y={1990} s={2.1} col="#0b1a0b" trunk="#1b1208" />
      <Palm x={1200} y={2000} s={1.9} col="#0b1a0b" trunk="#1b1208" />
    </g>
  ),
});

// ---------- Aula istana emas ----------
const palace = ({t}) => ({
  far: (
    <g>
      <Wall />
      <rect x={400} y={460} width={280} height={790} rx="140" fill="url(#goldG)" stroke="#3a2208" strokeWidth="5" />
      <rect x={440} y={520} width={200} height={730} rx="100" fill="#180f08" />
      <circle cx="540" cy="900" r="150" fill="url(#glowOrange)" opacity=".7" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={-60 + i * 340} y={300} width={70} height={300} fill={i % 2 ? '#1f4e9c' : '#b3392b'} stroke="#2a1808" strokeWidth="3" />
          <path d={`M${-60 + i * 340} 600 l35 40 l35 -40`} fill="#f2c14e" stroke="#2a1808" strokeWidth="3" />
        </g>
      ))}
      <Pillar x={290} top={330} bottom={1230} w={90} seed={2} />
      <Pillar x={790} top={330} bottom={1230} w={90} seed={5} />
    </g>
  ),
  mid: (
    <g>
      <Floor y={1280} grad="floorGold" />
      <ellipse cx={540} cy={1330} rx={420} ry={50} fill="#fff3b0" opacity=".18" />
      <Pillar x={-60} top={80} bottom={1290} w={150} seed={1} />
      <Pillar x={170} top={110} bottom={1285} w={130} seed={3} />
      <Pillar x={910} top={110} bottom={1285} w={130} seed={7} />
      <Pillar x={1140} top={80} bottom={1290} w={150} seed={8} />
      <Jar x={90} y={1300} s={1.0} />
      <Jar x={1000} y={1304} s={0.9} />
      <Jar x={300} y={1296} s={0.7} />
      <Jar x={790} y={1296} s={0.7} />
      <rect x={430} y={1250} width={220} height={70} rx="8" fill="url(#goldG)" stroke="#2a1808" strokeWidth="4" />
      <path d="M430 1262 H650" stroke="#2a1808" strokeWidth="3" />
    </g>
  ),
  near: (
    <g>
      <Pillar x={-120} top={-120} bottom={2000} w={270} dark seed={11} />
      <Pillar x={1200} top={-120} bottom={2000} w={270} dark seed={12} />
    </g>
  ),
});

// ---------- Ruang takhta ----------
const throne = ({t}) => ({
  far: (
    <g>
      <Wall />
      <circle cx="540" cy="560" r="300" fill="url(#glowOrange)" opacity=".55" />
      <circle cx="540" cy="540" r="190" fill="url(#goldG)" stroke="#3a2208" strokeWidth="6" />
      <circle cx="540" cy="540" r="130" fill="#e25b2c" stroke="#3a2208" strokeWidth="5" />
      <path d="M350 540 q-130 -40 -240 30 q110 -10 240 30 M730 540 q130 -40 240 30 q-110 -10 -240 30" fill="url(#goldG)" stroke="#3a2208" strokeWidth="5" />
      <rect x={X0} y={800} width={WW} height={90} fill="#1f4e9c" opacity=".85" />
      <Hiero x={-300} y={802} w={1700} h={86} seed={3} color="#f2c14e" opacity={0.9} />
      <Statue x={120} y={1240} s={1.6} />
      <Statue x={960} y={1240} s={1.6} />
    </g>
  ),
  mid: (
    <g>
      <Floor y={1280} grad="floorStone" lineColor="rgba(0,0,0,.3)" />
      <polygon points="470,1280 610,1280 940,1960 140,1960" fill="#a83426" opacity=".85" />
      <polygon points="470,1280 480,1280 200,1960 140,1960" fill="#f2c14e" opacity=".5" />
      <rect x={150} y={1235} width={780} height={46} fill="#b9945a" stroke="#2a1808" strokeWidth="4" />
      <rect x={210} y={1195} width={660} height={44} fill="#c9a468" stroke="#2a1808" strokeWidth="4" />
      <rect x={280} y={1155} width={520} height={44} fill="#d6b277" stroke="#2a1808" strokeWidth="4" />
      <rect x={400} y={720} width={280} height={440} rx="16" fill="url(#goldG)" stroke="#2a1808" strokeWidth="6" />
      <rect x={430} y={760} width={220} height={360} rx="10" fill="#1f4e9c" stroke="#2a1808" strokeWidth="4" />
      <Hiero x={450} y={780} w={180} h={320} seed={6} color="#f2c14e" opacity={0.9} />
      <rect x={350} y={940} width={60} height={210} rx="10" fill="url(#goldG)" stroke="#2a1808" strokeWidth="5" />
      <rect x={670} y={940} width={60} height={210} rx="10" fill="url(#goldG)" stroke="#2a1808" strokeWidth="5" />
      <Brazier x={140} y={1230} t={t} s={0.8} />
      <Brazier x={940} y={1230} t={t} s={0.8} />
    </g>
  ),
  near: (
    <g>
      <Pillar x={-110} top={-120} bottom={2000} w={260} dark seed={21} />
      <Pillar x={1190} top={-120} bottom={2000} w={260} dark seed={22} />
    </g>
  ),
});

// ---------- Koridor ----------
const corridor = ({t}) => {
  const ds = [1, 0.62, 0.4, 0.26];
  return {
    far: (
      <g>
        <Wall g="wallDark" />
        <rect x={430} y={540} width={220} height={430} rx="110" fill="#ffd98a" />
        <circle cx={540} cy={760} r={300} fill="url(#glowOrange)" opacity=".8" />
        <polygon points={`${X0},-250 330,420 330,1100 ${X0},1960`} fill="#20150c" />
        <polygon points={`1440,-250 750,420 750,1100 1440,1960`} fill="#1a1109" />
        <polygon points={`${X0},-250 1440,-250 750,420 330,420`} fill="#120b06" />
      </g>
    ),
    mid: (
      <g>
        <polygon points={`330,1100 750,1100 1440,1960 ${X0},1960`} fill="url(#floorDark)" />
        {[...ds].reverse().map((d, k) => {
          const dx = 215 + 560 * d * 0.78;
          const top = 760 - 760 * d;
          const bottom = 760 + 520 * d + 80;
          return (
            <g key={k}>
              <Pillar x={540 - dx} top={top} bottom={bottom} w={120 * d + 24} seed={k + 1} dark />
              <Pillar x={540 + dx} top={top} bottom={bottom} w={120 * d + 24} seed={k + 5} dark />
              <Torch x={540 - dx * 0.7} y={760 + 20 * d} t={t + k * 9} s={0.9 * d + 0.3} />
              <Torch x={540 + dx * 0.7} y={760 + 20 * d} t={t + k * 7} s={0.9 * d + 0.3} />
            </g>
          );
        })}
        <ellipse cx={540} cy={1500} rx={300} ry={60} fill="#ffb347" opacity=".08" />
      </g>
    ),
    near: (
      <g>
        <Pillar x={-60} top={-120} bottom={2000} w={250} dark seed={31} />
        <Pillar x={1140} top={-120} bottom={2000} w={250} dark seed={32} />
        <Torch x={150} y={1000} t={t} s={1.6} />
        <Torch x={930} y={1000} t={t + 5} s={1.6} />
      </g>
    ),
  };
};

// ---------- Kamar Firaun ----------
const bedroom = ({t}) => ({
  far: (
    <g>
      <Wall g="wallBlue" />
      <path d="M390 840 V460 Q540 280 690 460 V840 Z" fill="url(#skyNight)" stroke="#d3a84a" strokeWidth="10" />
      <g transform="translate(-0 0)"><Stars n={26} seed={2} y0={420} y1={800} t={t} /></g>
      <circle cx={600} cy={520} r={52} fill="#fff6d0" />
      <circle cx={600} cy={520} r={150} fill="url(#glowWhite)" opacity=".4" />
      <circle cx={582} cy={508} r={44} fill="#f4e2a0" opacity=".0" />
      <rect x={40} y={330} width={100} height={700} fill="#7a1f1a" opacity=".9" />
      <rect x={940} y={330} width={100} height={700} fill="#7a1f1a" opacity=".9" />
    </g>
  ),
  mid: (
    <g>
      <Floor y={1240} grad="floorDark" lineColor="rgba(255,200,120,.1)" />
      <ellipse cx={540} cy={1480} rx={420} ry={90} fill="#7a1f1a" opacity=".85" />
      <rect x={150} y={1010} width={780} height={110} rx="14" fill="url(#goldG)" stroke="#2a1808" strokeWidth="5" />
      <rect x={170} y={930} width={740} height={110} rx="30" fill="#e9dfc8" stroke="#2a1808" strokeWidth="5" />
      <rect x={150} y={880} width={36} height={300} rx="8" fill="url(#goldG)" stroke="#2a1808" strokeWidth="5" />
      <rect x={894} y={880} width={36} height={300} rx="8" fill="url(#goldG)" stroke="#2a1808" strokeWidth="5" />
      <path d="M200 960 H880" stroke="#bfae8a" strokeWidth="4" />
      <Jar x={60} y={1260} s={0.9} />
      <Torch x={1010} y={860} t={t} s={1.2} />
    </g>
  ),
  near: (
    <g>
      <rect x={-300} y={-100} width={420} height={2100} fill="#2c0d0b" opacity=".95" />
      <rect x={960} y={-100} width={480} height={2100} fill="#2c0d0b" opacity=".95" />
    </g>
  ),
});

// ---------- Medan perang darat ----------
const battleLand = ({t}) => ({
  far: (
    <g>
      <Sky g="skyDusk" h={1100} />
      <circle cx={760} cy={720} r={340} fill="url(#glowOrange)" opacity=".7" />
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse key={i} cx={-100 + i * 330} cy={380 + rnd(i) * 160} rx={190} ry={70 + rnd(i + 3) * 40} fill="#2a1a1a" opacity=".55" />
      ))}
      <path d="M-360 1090 Q40 960 420 1080 T1000 1060 T1440 1090 V1300 H-360 Z" fill="#b88650" />
      <path d="M-360 1150 Q200 1040 620 1140 T1440 1130 V1300 H-360 Z" fill="#9d6c3c" />
    </g>
  ),
  mid: (
    <g>
      <rect x={X0} y={1180} width={WW} height={800} fill="url(#sandG)" />
      {[120, 380, 700, 960].map((x, i) => (
        <g key={i}>
          <rect x={x} y={760 + (i % 2) * 40} width={8} height={440} fill="#3a2410" />
          <path d={`M${x + 8} ${760 + (i % 2) * 40} h120 l-30 40 l30 40 h-120 Z`} fill={i % 2 ? '#1f4e9c' : '#b3392b'} stroke="#2a1808" strokeWidth="3" />
        </g>
      ))}
    </g>
  ),
  near: (
    <g>
      {[60, 240, 880, 1010].map((x, i) => (
        <g key={i} transform={`rotate(${(i % 2 ? 1 : -1) * 12} ${x} 1900)`}>
          <rect x={x} y={1500} width={8} height={420} fill="#2a1808" />
          <polygon points={`${x - 6},1500 ${x + 4},1440 ${x + 14},1500`} fill="#9aa0a6" />
        </g>
      ))}
      <path d="M-360 1960 Q200 1800 700 1900 T1440 1880 V2000 H-360 Z" fill="#6b4a28" />
    </g>
  ),
});

// ---------- Pertempuran laut ----------
const seaBattle = ({t}) => ({
  far: (
    <g>
      <Sky g="skySea" h={900} />
      <circle cx={540} cy={820} r={420} fill="url(#glowOrange)" opacity=".8" />
      <circle cx={540} cy={830} r={110} fill="#ffe7a6" />
      {[0, 1, 2, 3].map((i) => (
        <ellipse key={i} cx={-60 + i * 360} cy={300 + rnd(i + 8) * 160} rx={240} ry={60} fill="#3a2a2a" opacity=".55" />
      ))}
      <rect x={X0} y={900} width={WW} height={1100} fill="url(#seaG)" />
      <path d={`M${X0} 900 H1440`} stroke="#ffd9a0" strokeWidth="5" opacity=".6" />
    </g>
  ),
  mid: (
    <g>
      {[0, 1, 2, 3].map((r) => (
        <path key={r} d={`M${X0} ${1020 + r * 90} ${Array.from({length: 15}).map((_, i) => `q60 ${-18 - r * 4 + 6 * Math.sin(t / 14 + i + r)} 120 0`).join(' ')}`} stroke="#bfe9ff" strokeWidth={3 + r} fill="none" opacity={0.35 - r * 0.05} />
      ))}
    </g>
  ),
  near: (
    <g>
      <path d={`M${X0} 1870 ${Array.from({length: 15}).map((_, i) => `q60 ${-50 + 12 * Math.sin(t / 10 + i)} 120 0`).join(' ')} V2000 H${X0} Z`} fill="#0b2433" opacity=".95" />
    </g>
  ),
});

// ---------- Ruang pengadilan ----------
const courtroom = ({t}) => ({
  far: (
    <g>
      <Wall g="wallDark" />
      <path d="M540 280 Q420 420 520 620 L540 700 L560 620 Q660 420 540 280 Z" fill="#e9dfc8" stroke="#2a1808" strokeWidth="5" />
      <path d="M540 290 V690" stroke="#2a1808" strokeWidth="4" />
      <circle cx={540} cy={470} r={260} fill="url(#glowOrange)" opacity=".25" />
      <Hiero x={-300} y={760} w={1700} h={120} seed={14} color="#c9a24a" opacity={0.6} />
      <Pillar x={300} top={300} bottom={1180} w={80} dark seed={4} />
      <Pillar x={780} top={300} bottom={1180} w={80} dark seed={6} />
    </g>
  ),
  mid: (
    <g>
      <Floor y={1260} grad="floorStone" lineColor="rgba(0,0,0,.35)" />
      <rect x={160} y={980} width={760} height={290} fill="#8e7048" stroke="#1a1008" strokeWidth="5" />
      <rect x={160} y={960} width={760} height={34} fill="#c8a468" stroke="#1a1008" strokeWidth="5" />
      <Hiero x={190} y={1020} w={700} h={200} seed={18} color="#2a1808" opacity={0.6} />
      <rect x={440} y={780} width={200} height={190} fill="#c8a468" stroke="#1a1008" strokeWidth="5" />
      <Pillar x={20} top={60} bottom={1290} w={150} dark seed={9} />
      <Pillar x={1060} top={60} bottom={1290} w={150} dark seed={10} />
      <Torch x={150} y={900} t={t} s={1.2} />
      <Torch x={930} y={900} t={t + 4} s={1.2} />
    </g>
  ),
  near: (
    <g>
      <Pillar x={-120} top={-120} bottom={2000} w={260} dark seed={41} />
      <Pillar x={1200} top={-120} bottom={2000} w={260} dark seed={42} />
    </g>
  ),
});

// ---------- Ruang rahasia ----------
const secretRoom = ({t}) => ({
  far: (
    <g>
      <Wall g="wallDark" />
      <rect x={440} y={560} width={200} height={690} rx="100" fill="#0a0604" />
      <Hiero x={-300} y={420} w={700} h={140} seed={22} color="#8a6a30" opacity={0.35} />
      <Hiero x={700} y={420} w={700} h={140} seed={23} color="#8a6a30" opacity={0.35} />
      <path d="M540 -100 V300" stroke="#3a2410" strokeWidth="5" />
      <circle cx={540} cy={330} r={30} fill="#ffd27a" />
      <circle cx={540} cy={330} r={360} fill="url(#glowOrange)" opacity={0.75 + 0.1 * Math.sin(t / 5)} />
    </g>
  ),
  mid: (
    <g>
      <Floor y={1270} grad="floorDark" lineColor="rgba(255,200,120,.07)" />
      <Pillar x={90} top={150} bottom={1290} w={110} dark seed={33} />
      <Pillar x={990} top={150} bottom={1290} w={110} dark seed={34} />
      <rect x={290} y={1190} width={500} height={90} rx="8" fill="#6b4a28" stroke="#1a1008" strokeWidth="5" />
      <rect x={310} y={1270} width={36} height={80} fill="#4a3118" />
      <rect x={734} y={1270} width={36} height={80} fill="#4a3118" />
      <rect x={350} y={1166} width={160} height={28} rx="12" fill="#e8dcc0" stroke="#1a1008" strokeWidth="4" />
      <rect x={540} y={1170} width={150} height={24} rx="10" fill="#dfd2b0" stroke="#1a1008" strokeWidth="4" />
      <Torch x={720} y={1150} t={t} s={0.55} glow={0.8} />
    </g>
  ),
  near: (
    <g>
      <rect x={-300} y={-100} width={400} height={2100} fill="#080503" opacity=".92" />
      <rect x={980} y={-100} width={460} height={2100} fill="#080503" opacity=".92" />
    </g>
  ),
});

// ---------- Ruang mumi ----------
const mummyChamber = ({t}) => ({
  far: (
    <g>
      <Wall g="wallBlue" />
      <rect x={X0} y={340} width={WW} height={120} fill="#c9a24a" opacity=".55" />
      <Hiero x={-300} y={346} w={1700} h={110} seed={31} color="#0b1a22" opacity={0.7} />
      <rect x={X0} y={900} width={WW} height={100} fill="#1f4e9c" opacity=".6" />
      <Hiero x={-300} y={905} w={1700} h={90} seed={37} color="#f2c14e" opacity={0.65} />
      <circle cx={540} cy={640} r={330} fill="url(#glowBlue)" opacity=".3" />
    </g>
  ),
  mid: (
    <g>
      <Floor y={1270} grad="floorStone" lineColor="rgba(0,0,0,.4)" />
      <Pillar x={70} top={120} bottom={1290} w={140} dark seed={51} />
      <Pillar x={1010} top={120} bottom={1290} w={140} dark seed={52} />
      <Torch x={190} y={760} t={t} s={1.1} />
      <Torch x={890} y={760} t={t + 6} s={1.1} />
      <Jar x={280} y={1290} s={0.9} />
      <Jar x={800} y={1290} s={0.9} />
    </g>
  ),
  near: (
    <g>
      <rect x={-300} y={-100} width={380} height={2100} fill="#05090c" opacity=".9" />
      <rect x={1000} y={-100} width={440} height={2100} fill="#05090c" opacity=".9" />
    </g>
  ),
});

// ---------- Ruang CT / laboratorium ----------
const makeLab = (dna) => ({t}) => ({
  far: (
    <g>
      <Wall g="labWall" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={-120 + i * 400} y={-60} width={300} height={60} fill="#e8f4ff" opacity={0.85} />
      ))}
      <rect x={160} y={360} width={760} height={460} rx="14" fill="#07131c" stroke="#9db3c4" strokeWidth="8" />
      {Array.from({length: 12}).map((_, i) => (
        <path key={i} d={`M190 ${400 + i * 34} H${890 - rnd(i + dna) * 300}`} stroke="#4ad0ff" strokeWidth="4" opacity=".55" />
      ))}
      <circle cx={540} cy={590} r={sceneR(t)} fill="none" stroke="#4ad0ff" strokeWidth="5" opacity=".6" />
      <circle cx={540} cy={590} r={sceneR(t) * 0.55} fill="none" stroke="#8fe8ff" strokeWidth="3" opacity=".5" />
    </g>
  ),
  mid: (
    <g>
      <Floor y={1260} grad="labFloor" lineColor="rgba(160,200,230,.15)" />
      <rect x={-260} y={1080} width={460} height={190} rx="10" fill="#38434d" stroke="#0b0f13" strokeWidth="5" />
      <rect x={-200} y={900} width={160} height={150} rx="8" fill="#06131b" stroke="#9db3c4" strokeWidth="5" />
      <rect x={-20} y={920} width={150} height={130} rx="8" fill="#06131b" stroke="#9db3c4" strokeWidth="5" />
      <path d={`M-190 ${1000} q30 -${40 + 20 * Math.sin(t / 8)} 60 0 t60 0`} stroke="#4ad0ff" strokeWidth="5" fill="none" />
      <circle cx={70} cy={985} r={30 + 4 * Math.sin(t / 6)} fill="none" stroke="#8fe8ff" strokeWidth="4" />
      <rect x={900} y={1100} width={400} height={170} rx="10" fill="#38434d" stroke="#0b0f13" strokeWidth="5" />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={940 + i * 40} cy={1130} r={9} fill={Math.sin(t / 6 + i * 1.7) > 0 ? '#5dff9a' : '#ff5a4a'} />
      ))}
    </g>
  ),
  near: (
    <g>
      <rect x={-300} y={-100} width={360} height={2100} fill="#0a0e12" opacity=".85" />
      <rect x={1020} y={-100} width={420} height={2100} fill="#0a0e12" opacity=".85" />
      <path d={`M-100 400 Q200 520 ${420} 380`} stroke="#10161b" strokeWidth="26" fill="none" />
    </g>
  ),
});
const sceneR = (t) => 150 + 14 * Math.sin(t / 15);

// ---------- Ruang Unknown Man E ----------
const unknownRoom = ({t}) => ({
  far: (
    <g>
      <Wall g="wallBlue" />
      <rect x={X0} y={-250} width={WW} height={1600} fill="#02050a" opacity=".78" />
      <polygon points="470,-120 610,-120 960,1290 120,1290" fill="url(#spotG)" opacity={0.85 + 0.05 * Math.sin(t / 30)} />
    </g>
  ),
  mid: (
    <g>
      <Floor y={1280} grad="floorStone" lineColor="rgba(0,0,0,.5)" />
      <ellipse cx={540} cy={1300} rx={440} ry={64} fill="#e6efff" opacity=".28" />
      <rect x={110} y={1160} width={860} height={50} rx="8" fill="#6a5a48" stroke="#0b0b0b" strokeWidth="5" />
      <rect x={160} y={1210} width={60} height={110} fill="#4a3d2f" />
      <rect x={860} y={1210} width={60} height={110} fill="#4a3d2f" />
    </g>
  ),
  near: (
    <g>
      <rect x={-300} y={-100} width={330} height={2100} fill="#010204" opacity=".95" />
      <rect x={1050} y={-100} width={390} height={2100} fill="#010204" opacity=".95" />
    </g>
  ),
});

// ---------- Makam kerajaan ----------
const tomb = ({t}) => ({
  far: (
    <g>
      <Wall g="wallBlue" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={X0} y={200 + i * 230} width={WW} height={90} fill={i % 2 ? '#1f4e9c' : '#c9a24a'} opacity=".6" />
          <Hiero x={-300} y={204 + i * 230} w={1700} h={82} seed={50 + i} color={i % 2 ? '#f2c14e' : '#0b1a22'} opacity={0.75} />
        </g>
      ))}
      <circle cx={540} cy={850} r={420} fill="url(#glowOrange)" opacity=".28" />
      <path d="M380 1230 V800 Q380 650 540 650 Q700 650 700 800 V1230 Z" fill="url(#goldG)" stroke="#2a1808" strokeWidth="6" />
      <path d="M440 700 Q540 620 640 700 V820 H440 Z" fill="#1f4e9c" stroke="#2a1808" strokeWidth="5" />
      <path d="M420 900 H660 M420 960 H660 M420 1020 H660" stroke="#2a1808" strokeWidth="4" opacity=".55" />
    </g>
  ),
  mid: (
    <g>
      <Floor y={1270} grad="floorStone" lineColor="rgba(0,0,0,.4)" />
      <Pillar x={90} top={220} bottom={1290} w={140} seed={61} />
      <Pillar x={990} top={220} bottom={1290} w={140} seed={62} />
      <Torch x={210} y={790} t={t} s={1.1} />
      <Torch x={870} y={790} t={t + 5} s={1.1} />
      <Jar x={300} y={1300} s={0.8} />
      <Jar x={780} y={1300} s={0.8} />
    </g>
  ),
  near: (
    <g>
      <rect x={-300} y={-100} width={380} height={2100} fill="#05090c" opacity=".92" />
      <rect x={1000} y={-100} width={440} height={2100} fill="#05090c" opacity=".92" />
    </g>
  ),
});

// ---------- Eksterior malam ----------
const nightExt = ({t}) => ({
  far: (
    <g>
      <Sky g="skyNight" h={1200} />
      <Stars n={80} seed={5} y0={-150} y1={800} t={t} />
      <circle cx={820} cy={380} r={420} fill="url(#glowWhite)" opacity=".28" />
      <circle cx={820} cy={380} r={78} fill="#fff6d0" />
      <path d="M-360 1120 Q100 1010 520 1100 T1440 1090 V1300 H-360 Z" fill="#0f1730" />
    </g>
  ),
  mid: (
    <g>
      <polygon points="300,1230 340,560 460,560 500,1230" fill="#0b1224" />
      <polygon points="580,1230 620,560 740,560 790,1230" fill="#0b1224" />
      <rect x={500} y={780} width={80} height={450} fill="#050a14" />
      {[120, 960].map((x) => <rect key={x} x={x} y={900} width={60} height={330} fill="#0b1224" />)}
      <Torch x={430} y={1130} t={t} s={0.8} />
      <Torch x={650} y={1130} t={t + 3} s={0.8} />
      <rect x={X0} y={1230} width={WW} height={800} fill="#0a1020" />
    </g>
  ),
  near: (
    <g>
      <Palm x={-110} y={1990} s={2} col="#02050b" trunk="#02050b" />
      <Palm x={1190} y={2000} s={1.8} col="#02050b" trunk="#02050b" />
    </g>
  ),
});

export const BACKGROUNDS = {
  city,
  palace,
  throne,
  corridor,
  bedroom,
  battleLand,
  seaBattle,
  courtroom,
  secretRoom,
  mummyChamber,
  ctRoom: makeLab(0),
  dnaLab: makeLab(7),
  unknownRoom,
  tomb,
  nightExt,
};
