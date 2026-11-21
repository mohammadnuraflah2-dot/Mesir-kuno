import {Easing, interpolate} from 'remotion';

// Preset kamera. z = zoom [awal, akhir], fx/fy = titik tengah kamera [awal, akhir] (default 540,960).
export const CAMS = {
  static: {z: [1, 1]},
  pushSlow: {z: [1, 1.1]},
  push: {z: [1, 1.2]},
  pushHard: {z: [1, 1.45]},
  pullSlow: {z: [1.1, 1]},
  pull: {z: [1.22, 1]},
  panL: {z: [1.14, 1.14], fx: [650, 430]},
  panR: {z: [1.14, 1.14], fx: [430, 650]},
  pushL: {z: [1, 1.22], fx: [580, 440]},
  pushR: {z: [1, 1.22], fx: [500, 640]},
  pullL: {z: [1.25, 1.02], fx: [440, 540]},
  pullR: {z: [1.25, 1.02], fx: [640, 540]},
  rise: {z: [1.12, 1.12], fy: [1120, 840]},
  drop: {z: [1.12, 1.12], fy: [840, 1120]},
  pushUp: {z: [1, 1.25], fy: [1000, 800]},
};

export const resolveCam = (c) => {
  const base = typeof c === 'string' ? CAMS[c] : c;
  if (!base) throw new Error('Kamera tidak dikenal: ' + JSON.stringify(c));
  return {z: base.z || [1, 1], fx: base.fx || [540, 540], fy: base.fy || [960, 960]};
};

const ease = Easing.inOut(Easing.sin);
export const lerpRange = (r, p) => interpolate(p, [0, 1], r, {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

// f = faktor parallax posisi, zf = faktor zoom layer.
export const layerTransform = (cam, p, f, zf) => {
  const z = 1 + (lerpRange(cam.z, p) - 1) * zf;
  const cx = 540 + (lerpRange(cam.fx, p) - 540) * f;
  const cy = 960 + (lerpRange(cam.fy, p) - 960) * f;
  return `translate(540 960) scale(${z.toFixed(4)}) translate(${(-cx).toFixed(2)} ${(-cy).toFixed(2)})`;
};
