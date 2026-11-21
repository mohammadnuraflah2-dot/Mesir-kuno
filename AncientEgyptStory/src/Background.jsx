import React from 'react';
import {BACKGROUNDS} from './backgrounds.jsx';
import {layerTransform} from './camera.js';

// Empat lapis dengan parallax: far -> mid -> stage (karakter & properti) -> near.
export const Background = ({name, cam, p, t, children}) => {
  const make = BACKGROUNDS[name];
  if (!make) throw new Error('Background tidak dikenal: ' + name);
  const L = make({t});
  return (
    <g>
      <g transform={layerTransform(cam, p, 0.3, 0.7)}>{L.far}</g>
      <g transform={layerTransform(cam, p, 0.72, 0.92)}>{L.mid}</g>
      <g transform={layerTransform(cam, p, 0.85, 1)}>{children}</g>
      <g transform={layerTransform(cam, p, 1.35, 1.25)}>{L.near}</g>
    </g>
  );
};
