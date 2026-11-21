import React, {useEffect, useMemo, useState} from 'react';
import {AbsoluteFill, cancelRender, continueRender, delayRender, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

export const SRT_PATH = 'audio/voiceover/master.srt';

const toSec = (s) => {
  const m = s.trim().match(/(\d+):(\d+):(\d+)[,.](\d+)/);
  if (!m) throw new Error('Timestamp SRT tidak valid: ' + s);
  return Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]) + Number('0.' + m[4]);
};

export const parseSrt = (text) =>
  text
    .replace(/\r/g, '')
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map((b) => {
      const lines = b.split('\n');
      const ti = lines.findIndex((l) => l.includes('-->'));
      const [a, c] = lines[ti].split('-->');
      return {start: toSec(a), end: toSec(c), text: lines.slice(ti + 1).join(' ').trim()};
    });

// Master.srt hanya punya timestamp per kalimat. Timestamp tiap kata DIPERKIRAKAN dengan membagi durasi kalimat
// proporsional terhadap panjang kata (+ bobot jeda untuk tanda baca). Bukan forced-alignment audio.
export const buildWords = (cues, fps) => {
  const out = [];
  cues.forEach((cue, ci) => {
    const toks = cue.text.split(/\s+/).filter(Boolean);
    if (!toks.length) return;
    const weights = toks.map((w, i) => {
      const letters = w.replace(/[^\p{L}\p{N}]/gu, '').length;
      let wt = Math.max(2, letters) + 2.5;
      if (i < toks.length - 1) {
        if (/(\.\.\.|…)$/.test(w)) wt += 8;
        else if (/[.!?]$/.test(w)) wt += 7;
        else if (/[,;:]$/.test(w)) wt += 3.5;
      }
      return wt;
    });
    const total = weights.reduce((a, b) => a + b, 0);
    let acc = 0;
    const s0 = cue.start * fps;
    const span = (cue.end - cue.start) * fps;
    toks.forEach((w, i) => {
      const a = s0 + (acc / total) * span;
      acc += weights[i];
      const b = s0 + (acc / total) * span;
      out.push({text: w, start: Math.round(a), end: Math.round(b), cue: ci, last: i === toks.length - 1, cueEnd: Math.round(cue.end * fps)});
    });
  });
  return out;
};

export const WordSubtitle = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const [cues, setCues] = useState(null);
  const [handle] = useState(() => delayRender('Memuat master.srt'));

  useEffect(() => {
    fetch(staticFile(SRT_PATH))
      .then((r) => {
        if (!r.ok) throw new Error('master.srt tidak ditemukan di public/' + SRT_PATH);
        return r.text();
      })
      .then((t) => {
        setCues(parseSrt(t));
        continueRender(handle);
      })
      .catch((e) => cancelRender(e));
  }, [handle]);

  const words = useMemo(() => (cues ? buildWords(cues, fps) : []), [cues, fps]);
  let cur = null;
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const nextStart = words[i + 1] && words[i + 1].cue === w.cue ? words[i + 1].start : w.cueEnd + 3;
    if (frame >= w.start && frame < nextStart) {
      cur = w;
      break;
    }
  }
  if (!cur) return null;
  const local = frame - cur.start;
  const pop = spring({frame: local, fps, config: {damping: 11, stiffness: 240, mass: 0.5}, durationInFrames: 10});
  const scale = interpolate(pop, [0, 1], [0.62, 1]);
  const size = Math.min(124, Math.floor(980 / (cur.text.length * 0.6)));
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '70%',
          transform: `translateY(-50%) scale(${scale})`,
          textAlign: 'center',
          fontFamily: 'Arial Black, Impact, Arial, sans-serif',
          fontWeight: 900,
          fontSize: size,
          lineHeight: 1.1,
          color: '#ffffff',
          WebkitTextStroke: `${Math.round(size * 0.14)}px #000`,
          paintOrder: 'stroke fill',
          textShadow: '0 6px 18px rgba(0,0,0,.6)',
          padding: '0 40px',
          whiteSpace: 'nowrap',
        }}
      >
        {cur.text}
      </div>
    </AbsoluteFill>
  );
};
