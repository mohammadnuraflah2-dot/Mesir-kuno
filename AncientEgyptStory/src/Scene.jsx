import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Defs, rnd} from './art.jsx';
import {Background} from './Background.jsx';
import {Character} from './Character.jsx';
import {Prop} from './Props.jsx';
import {Effects, gradeStyle} from './Effects.jsx';
import {resolveCam} from './camera.js';

const clamp01 = (v) => Math.max(0, Math.min(1, v));

// Satu shot = satu background + kamera + karakter + properti + efek.
export const ShotView = ({shot, frame, duration, opacity = 1}) => {
  const p = clamp01(frame / Math.max(1, duration - 1));
  const cam = resolveCam(shot.cam || 'static');
  const g = gradeStyle(shot.tone, p);
  const fx = shot.fx || [];
  const shake = fx.includes('shake');
  const sx = shake ? (rnd(frame * 3.1) - 0.5) * 12 : 0;
  const sy = shake ? (rnd(frame * 5.7 + 2) - 0.5) * 12 : 0;
  const props = shot.props || [];
  return (
    <AbsoluteFill style={{opacity, filter: g.filter, transform: shake ? `translate(${sx}px, ${sy}px) scale(1.03)` : undefined}}>
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position: 'absolute', left: 0, top: 0}}>
        <Defs />
        <Background name={shot.bg} cam={cam} p={p} t={frame}>
          {props.filter((pr) => !pr.front).map((pr, i) => (
            <Prop key={'b' + i} {...pr} frame={frame} p={p} />
          ))}
          {(shot.chars || []).map((c, i) => (
            <Character key={'c' + i} {...c} frame={frame} p={p} />
          ))}
          {props.filter((pr) => pr.front).map((pr, i) => (
            <Prop key={'f' + i} {...pr} frame={frame} p={p} />
          ))}
        </Background>
      </svg>
      {g.tint ? <AbsoluteFill style={{background: g.tint.color, opacity: g.tint.opacity, mixBlendMode: g.tint.blend}} /> : null}
      <Effects fx={fx} frame={frame} vignette={shot.vignette === undefined ? 0.6 : shot.vignette} />
    </AbsoluteFill>
  );
};

export const shotBounds = (scene) => {
  const n = scene.shots.length;
  const dur = scene.visualDuration;
  return scene.shots.map((s, i) => {
    const start = Math.round((s.at === undefined ? i / n : s.at) * dur);
    const nxt = i < n - 1 ? scene.shots[i + 1] : null;
    const end = nxt ? Math.round((nxt.at === undefined ? (i + 1) / n : nxt.at) * dur) : dur;
    return {start, end};
  });
};

export const Scene = ({scene}) => {
  const frame = useCurrentFrame();
  const lead = scene.lead || 0;
  const f = frame - lead;
  const dur = scene.visualDuration;
  const bounds = shotBounds(scene);
  const local = Math.max(0, f);
  let idx = 0;
  bounds.forEach((b, i) => {
    if (local >= b.start) idx = i;
  });
  const b = bounds[idx];
  const inShot = local - b.start;
  const shotDur = Math.max(1, b.end - b.start);
  const shot = scene.shots[idx];
  const xf = shot.xfade === undefined ? 0 : shot.xfade === true ? 8 : shot.xfade;
  const prev = idx > 0 ? bounds[idx - 1] : null;
  const showPrev = xf > 0 && prev && inShot < xf;
  const sceneOpacity = scene.transition === 'crossfade' && lead > 0 ? interpolate(frame, [0, lead], [0, 1], {extrapolateRight: 'clamp'}) : 1;
  const blackIn = scene.transition === 'black' ? interpolate(frame, [0, scene.blackFrames || 14], [1, 0], {extrapolateRight: 'clamp'}) : 0;
  const fadeOut = scene.fadeOut ? interpolate(f, [dur - scene.fadeOut, dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 0;
  return (
    <AbsoluteFill style={{opacity: sceneOpacity, backgroundColor: '#000'}}>
      {showPrev ? <ShotView shot={scene.shots[idx - 1]} frame={prev.end - prev.start + inShot} duration={prev.end - prev.start} /> : null}
      <ShotView shot={shot} frame={inShot} duration={shotDur} opacity={showPrev ? inShot / xf : 1} />
      {blackIn > 0 ? <AbsoluteFill style={{backgroundColor: '#000', opacity: blackIn}} /> : null}
      {fadeOut > 0 ? <AbsoluteFill style={{backgroundColor: '#000', opacity: fadeOut}} /> : null}
    </AbsoluteFill>
  );
};
