import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {rnd} from './art.jsx';

export const GRADES = {
  none: {},
  warm: {tint: '#ffb454', ta: 0.2, blend: 'soft-light', sat: 1.12, br: 1.03},
  dark: {tint: '#05060f', ta: 0.4, blend: 'multiply', sat: 0.88, br: 0.92},
  ominous: {tint: '#2a0d1a', ta: 0.4, blend: 'multiply', sat: 0.8, br: 0.9},
  danger: {tint: '#c01818', ta: 0.3, blend: 'multiply', sat: 1.05, br: 0.95},
  cool: {tint: '#5aa0ff', ta: 0.22, blend: 'soft-light', sat: 0.9},
  sci: {tint: '#2ad0ff', ta: 0.16, blend: 'soft-light', sat: 0.92, br: 0.97},
  night: {tint: '#0a1a4a', ta: 0.4, blend: 'multiply', sat: 0.9, br: 0.95},
  sepia: {sepia: 0.85, sat: 0.9, br: 0.96},
  gray: {gray: 0.9, br: 0.8},
};

const num = (a, b, k, d, p) => {
  const x = a[k] === undefined ? d : a[k];
  const y = b[k] === undefined ? d : b[k];
  return x + (y - x) * p;
};

export const gradeStyle = (tone, p) => {
  if (!tone) return {filter: undefined, tint: null};
  let a = tone;
  let b = tone;
  if (Array.isArray(tone)) {
    a = tone[0];
    b = tone[1];
  }
  const ga = typeof a === 'string' ? GRADES[a] : a;
  const gb = typeof b === 'string' ? GRADES[b] : b;
  if (!ga || !gb) throw new Error('Tone tidak dikenal: ' + JSON.stringify(tone));
  const k = Array.isArray(tone) ? p : 0;
  const sat = num(ga, gb, 'sat', 1, k);
  const br = num(ga, gb, 'br', 1, k);
  const sepia = num(ga, gb, 'sepia', 0, k);
  const gray = num(ga, gb, 'gray', 0, k);
  const ta = num(ga, gb, 'ta', 0, k);
  return {
    filter: `saturate(${sat.toFixed(3)}) brightness(${br.toFixed(3)}) sepia(${sepia.toFixed(3)}) grayscale(${gray.toFixed(3)})`,
    tint: ta > 0.001 ? {color: gb.tint || ga.tint, opacity: ta, blend: gb.blend || ga.blend || 'multiply'} : null,
  };
};

const Vignette = ({s = 0.6}) => (
  <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 46%, rgba(0,0,0,0) 45%, rgba(0,0,0,${s}) 100%)`}} />
);

const Dust = ({frame, n = 34, color = '255,230,170'}) => (
  <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
    {Array.from({length: n}).map((_, i) => {
      const sp = 0.25 + rnd(i + 3) * 0.55;
      const y = (((rnd(i + 50) * 1920 - frame * sp * 1.6) % 1920) + 1920) % 1920;
      const x = rnd(i) * 1080 + Math.sin(frame / 40 + i) * 26;
      return <circle key={i} cx={x} cy={y} r={1.6 + rnd(i + 9) * 3.2} fill={`rgba(${color},${0.22 + rnd(i + 20) * 0.38})`} />;
    })}
  </svg>
);

const Rays = ({frame, color = '255,226,150', strength = 0.28}) => (
  <AbsoluteFill style={{mixBlendMode: 'screen', opacity: strength + 0.06 * Math.sin(frame / 40)}}>
    <svg width="1080" height="1920" viewBox="0 0 1080 1920">
      <defs>
        <linearGradient id="rayG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={`rgb(${color})`} stopOpacity=".95" />
          <stop offset="1" stopColor={`rgb(${color})`} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points="120,-40 300,-40 620,1500 260,1500" fill="url(#rayG)" />
      <polygon points="520,-40 640,-40 980,1500 700,1500" fill="url(#rayG)" opacity=".75" />
      <polygon points="880,-40 1000,-40 1180,1400 980,1400" fill="url(#rayG)" opacity=".55" />
    </svg>
  </AbsoluteFill>
);

const Haze = ({frame}) => (
  <AbsoluteFill style={{background: 'linear-gradient(to top, rgba(255,214,150,.28) 0%, rgba(255,214,150,0) 45%)', opacity: 0.75 + 0.2 * Math.sin(frame / 60)}} />
);

const Smoke = ({frame}) => (
  <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0, filter: 'blur(26px)'}}>
    {Array.from({length: 9}).map((_, i) => {
      const y = 1950 - (((frame * (0.8 + rnd(i) * 0.9) + rnd(i + 4) * 1900) % 1950));
      const x = rnd(i + 11) * 1080 + Math.sin(frame / 50 + i) * 60;
      return <circle key={i} cx={x} cy={y} r={110 + rnd(i + 2) * 120} fill="rgba(210,200,190,.14)" />;
    })}
  </svg>
);

const Flicker = ({frame}) => {
  const f = 0.5 + 0.5 * Math.sin(frame * 0.9) * Math.sin(frame * 0.37 + 1);
  return <AbsoluteFill style={{background: 'rgba(255,150,40,1)', mixBlendMode: 'soft-light', opacity: 0.1 + 0.12 * f}} />;
};

const Flash = ({frame, at = 0, len = 10, color = '255,255,255', peak = 0.9}) => {
  const o = interpolate(frame - at, [0, 1, len], [0, peak, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return o > 0.001 ? <AbsoluteFill style={{background: `rgb(${color})`, opacity: o}} /> : null;
};

const Dof = () => (
  <AbsoluteFill
    style={{
      backdropFilter: 'blur(3px)',
      WebkitBackdropFilter: 'blur(3px)',
      WebkitMaskImage: 'radial-gradient(ellipse at 50% 46%, transparent 52%, #000 100%)',
      maskImage: 'radial-gradient(ellipse at 50% 46%, transparent 52%, #000 100%)',
    }}
  />
);

// fx: array berisi string ('dust', 'rays', 'haze', 'smoke', 'flicker', 'dof', 'raysBlue') atau objek {flash:{at,len,color}}.
export const Effects = ({fx = [], frame, vignette = 0.6}) => (
  <>
    {fx.map((f, i) => {
      if (typeof f === 'string') {
        if (f === 'dust') return <Dust key={i} frame={frame} />;
        if (f === 'dustBlue') return <Dust key={i} frame={frame} color="170,220,255" />;
        if (f === 'rays') return <Rays key={i} frame={frame} />;
        if (f === 'raysBlue') return <Rays key={i} frame={frame} color="150,210,255" strength={0.22} />;
        if (f === 'haze') return <Haze key={i} frame={frame} />;
        if (f === 'smoke') return <Smoke key={i} frame={frame} />;
        if (f === 'flicker') return <Flicker key={i} frame={frame} />;
        if (f === 'dof') return <Dof key={i} />;
        if (f === 'shake') return null; // ditangani ShotView
        throw new Error('Efek tidak dikenal: ' + f);
      }
      if (f.flash) return <Flash key={i} frame={frame} {...f.flash} />;
      throw new Error('Efek tidak dikenal: ' + JSON.stringify(f));
    })}
    <Vignette s={vignette} />
  </>
);
