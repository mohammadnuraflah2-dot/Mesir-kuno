// Pemetaan visual untuk SEMUA segmen voice-over.
// Semua angka timing (startFrame, durationInFrames, fps, totalFrames) dibaca dari public/audio/voiceover/timings.json.
import timings from '../public/audio/voiceover/timings.json';

export const FPS = timings.fps;
export const TOTAL_FRAMES = timings.totalFrames;
export const CROSSFADE_FRAMES = 8;
export const VO_FILE = 'audio/voiceover/master.wav';
export const SRT_FILE = 'audio/voiceover/master.srt';

// ---------- helper penulisan ----------
const CH = (who, x, o = {}) => ({who, x, y: 1300, scale: 1, ...o});
const PR = (type, x, y, s, o = {}) => ({type, x, y, s, ...o});
const R3 = (o = {}) => CH('ramesses3', 540, {sit: true, y: 1215, pose: 'regal', expr: 'serious', ...o});
const R4 = (o = {}) => CH('ramesses4', 540, {sit: true, y: 1215, pose: 'regal', expr: 'serious', ...o});
const GUARD = (x, o = {}) => CH('guard', x, {...o});
const ROYAL_MUMMY = (x = 540, y = 1130, s = 0.85, o = {}) => PR('mummy', x, y, s, {variant: 'royal', ...o});
const GOAT_MUMMY = (x = 540, y = 1130, s = 0.85, o = {}) => PR('mummy', x, y, s, {variant: 'goat', ...o});

// ---------- peta per segmen ----------
// transition: 'cut' | 'crossfade' | 'black'. shots[].at = posisi awal shot (0..1) di dalam scene.
const MAP = {
  1: {
    transition: 'black',
    sfx: [{file: 'ambience-palace', loop: true, vol: 0.14}, {file: 'footsteps', at: 20, vol: 0.2}],
    shots: [
      {bg: 'city', cam: 'pushSlow', tone: 'warm', fx: ['dust', 'haze'], chars: [
        CH('servant', 120, {walk: true, item: 'jar', move: [0, 190], y: 1330, scale: 0.85, enter: 'left'}),
        CH('servant', 960, {walk: true, flip: true, item: 'tray', move: [0, -170], y: 1340, scale: 0.85, enter: 'right', delay: 6}),
        CH('official', 540, {y: 1350, scale: 0.8, pose: 'talk', expr: 'neutral', enter: 'fade'}),
      ]},
      {at: 0.5, xfade: 8, bg: 'palace', cam: 'pushL', tone: 'warm', fx: ['dust', 'rays'], chars: [
        CH('tiye', 330, {pose: 'regal', expr: 'neutral', enter: 'left', walk: true, move: [0, 90], y: 1330}),
        CH('servant', 800, {flip: true, item: 'jar', pose: 'stand', y: 1340, scale: 0.9}),
        CH('servant', 960, {flip: true, walk: true, item: 'tray', move: [0, -150], y: 1350, scale: 0.8}),
      ]},
    ],
  },
  2: {
    transition: 'cut',
    sfx: [{file: 'ambience-palace', loop: true, vol: 0.14}],
    shots: [
      {bg: 'palace', cam: 'panR', tone: 'warm', fx: ['dust', 'rays'], chars: [
        CH('servant', 250, {walk: true, item: 'jar', move: [0, 240], y: 1340, scale: 0.9}),
        CH('servant', 900, {walk: true, flip: true, item: 'tray', move: [0, -260], y: 1350, scale: 0.85}),
        CH('official', 560, {pose: 'hold', item: 'scroll', expr: 'focus', y: 1330, scale: 0.9}),
      ]},
      {at: 0.55, xfade: 8, bg: 'throne', cam: 'push', tone: 'warm', fx: ['dust', 'rays', 'flicker'], chars: [
        GUARD(170, {scale: 0.95}), GUARD(910, {flip: true, scale: 0.95}), R3(),
      ]},
    ],
  },
  3: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-palace', loop: true, vol: 0.12}],
    shots: [
      {bg: 'palace', cam: 'pull', tone: ['warm', 'ominous'], fx: ['dust', 'haze'],
        props: [PR('shadows', 540, 1200, 1, {list: [{x: -120, y: 1160, s: 1.3, kind: 'wig'}, {x: 1020, y: 1160, s: 1.3, kind: 'crown'}]})],
        chars: [
          CH('tiye', 560, {pose: 'regal', expr: 'serious', look: 1, y: 1330, enter: 'fade'}),
          CH('guard', 150, {shadow: true, scale: 0.9, y: 1320, opacity: 0.8}),
        ]},
    ],
  },
  4: {
    transition: 'cut',
    sfx: [{file: 'impact', at: 0, vol: 0.55}],
    shots: [
      {bg: 'throne', cam: 'pushHard', tone: 'ominous', fx: ['shake', {flash: {at: 0, len: 9, color: '255,60,40', peak: 0.55}}, 'dust'], vignette: 0.8, chars: [
        R3({scale: 1.05}),
        CH('tiye', 820, {shadow: true, scale: 1.25, y: 1330, opacity: 0.9}),
      ]},
    ],
  },
  5: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-palace', loop: true, vol: 0.1}, {file: 'heartbeat', at: 60, vol: 0.3}],
    shots: [
      {bg: 'palace', cam: 'pushSlow', tone: 'dark', fx: ['dust', 'flicker'], vignette: 0.75, chars: [
        CH('tiye', 540, {scale: 1.7, y: 1530, expr: 'ambitious', pose: 'regal', enter: 'fade'}),
      ]},
      {at: 0.5, xfade: 10, bg: 'throne', cam: 'pullL', tone: 'ominous', fx: ['dust', 'rays'], chars: [
        R3({scale: 0.9, y: 1210}),
        CH('tiye', 250, {scale: 1.25, y: 1400, expr: 'ambitious', look: 1, pose: 'regal', enter: 'left'}),
      ]},
    ],
  },
  6: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-palace', loop: true, vol: 0.14}],
    shots: [
      {bg: 'throne', cam: 'push', tone: 'warm', fx: ['rays', 'dust', 'flicker'], chars: [
        GUARD(170), GUARD(910, {flip: true}), R3({scale: 1.1}),
      ]},
    ],
  },
  7: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-battle', loop: true, vol: 0.22}, {file: 'sword', at: 130, vol: 0.3}],
    shots: [
      {bg: 'battleLand', cam: 'pushR', tone: 'warm', fx: ['dust', 'smoke'],
        props: [PR('army', 760, 1250, 0.85, {rows: 3, cols: 5})],
        chars: [CH('ramesses3', 280, {pose: 'point', expr: 'serious', scale: 1.15, y: 1360, enter: 'left'})]},
      {at: 0.34, xfade: 8, bg: 'seaBattle', cam: 'panL', tone: 'warm', fx: ['smoke', 'dust'],
        props: [
          PR('ship', 250, 1130, 0.75, {kind: 'sea', ph: 0}),
          PR('ship', 640, 1090, 0.5, {kind: 'sea', ph: 2}),
          PR('ship', 850, 1250, 0.8, {kind: 'egypt', ph: 4}),
        ]},
      {at: 0.68, xfade: 8, bg: 'battleLand', cam: 'pushL', tone: ['warm', 'dark'], fx: ['shake', 'dust', 'smoke'],
        props: [PR('army', 250, 1260, 0.8, {rows: 3, cols: 4, col: '#d8c8a0'}), PR('army', 840, 1250, 0.8, {rows: 3, cols: 4, col: '#7a2a1a'})],
        chars: [GUARD(540, {pose: 'raise', item: null, y: 1380, scale: 1.1, expr: 'shock'})]},
    ],
  },
  8: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-battle', loop: true, vol: 0.16}, {file: 'ambience-palace', at: 80, loop: true, vol: 0.12}],
    shots: [
      {bg: 'battleLand', cam: 'pull', tone: 'warm', fx: ['dust', 'haze'],
        props: [PR('army', 540, 1240, 0.9, {rows: 3, cols: 6})],
        chars: [CH('ramesses3', 540, {pose: 'raise', expr: 'smile', y: 1400, scale: 1.2})]},
      {at: 0.5, xfade: 10, bg: 'throne', cam: 'pushSlow', tone: 'warm', fx: ['rays', 'dust', 'flicker'], chars: [GUARD(170), GUARD(910, {flip: true}), R3()]},
    ],
  },
  9: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-palace', loop: true, vol: 0.12}],
    shots: [
      {bg: 'throne', cam: 'panL', tone: ['warm', 'dark'], fx: ['dust', 'flicker'],
        props: [PR('shadows', 540, 1200, 1, {list: [{x: 120, y: 1190, s: 1.1, kind: 'wig'}, {x: 950, y: 1190, s: 1.1, kind: 'crown'}]})],
        chars: [R3()]},
    ],
  },
  10: {
    transition: 'crossfade',
    sfx: [{file: 'footsteps', at: 0, vol: 0.25}, {file: 'ambience-palace', loop: true, vol: 0.1}],
    shots: [
      {bg: 'palace', cam: 'pushR', tone: 'dark', fx: ['dust', 'haze'], chars: [
        CH('tiye', 200, {walk: true, move: [0, 320], expr: 'serious', pose: 'regal', y: 1340, scale: 1.05, enter: 'left'}),
      ]},
    ],
  },
  11: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-palace', loop: true, vol: 0.1}],
    shots: [
      {bg: 'throne', cam: 'pushR', tone: ['warm', 'dark'], fx: ['rays', 'dust'], chars: [
        CH('pentawere', 150, {scale: 0.92, y: 1330, look: 1, expr: 'serious', enter: 'left', delay: 10}),
        CH('tiye', 350, {scale: 1.05, y: 1330, look: 1, expr: 'ambitious', pose: 'regal'}),
      ]},
    ],
  },
  12: {
    transition: 'cut',
    sfx: [{file: 'heartbeat', at: 0, vol: 0.4}],
    shots: [
      {bg: 'palace', cam: 'pushHard', tone: 'ominous', fx: ['shake', 'dust'], vignette: 0.85, chars: [
        CH('tiye', 540, {scale: 1.9, y: 1620, expr: 'serious', pose: 'regal'}),
      ]},
    ],
  },
  13: {
    transition: 'cut',
    sfx: [{file: 'ambience-palace', loop: true, vol: 0.1}],
    shots: [
      {bg: 'throne', cam: 'pushR', tone: 'warm', fx: ['rays', 'dust', 'flicker'], chars: [
        R3({scale: 0.95, y: 1212}),
        CH('ramesses4', 830, {pose: 'regal', expr: 'serious', scale: 1.05, y: 1330, enter: 'right', delay: 8}),
      ]},
    ],
  },
  14: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-palace', loop: true, vol: 0.1}],
    shots: [
      {bg: 'throne', cam: 'panL', tone: 'warm', fx: ['rays', 'dust'], chars: [
        R3({scale: 0.9, y: 1210}),
        CH('pentawere', 190, {scale: 0.95, y: 1330, expr: 'worried', opacity: 0.88, look: 1}),
        CH('ramesses4', 830, {scale: 1.05, y: 1330, pose: 'regal', expr: 'serious'}),
      ]},
      {at: 0.55, xfade: 8, bg: 'throne', cam: 'push', tone: ['cool', 'dark'], fx: ['dust', 'flicker'], chars: [
        CH('tiye', 820, {scale: 1, y: 1330, expr: 'ambitious', look: -1, opacity: 0.85}),
        CH('pentawere', 430, {scale: 1.35, y: 1470, expr: 'worried', pose: 'think'}),
      ]},
    ],
  },
  15: {
    transition: 'crossfade',
    shots: [
      {bg: 'palace', cam: 'push', tone: 'dark', fx: ['dust', 'flicker'], chars: [
        CH('tiye', 360, {scale: 1.4, y: 1470, expr: 'serious', pose: 'talk'}),
        CH('pentawere', 770, {scale: 1.2, y: 1420, flip: true, expr: 'worried', look: -1}),
      ]},
    ],
  },
  16: {
    transition: 'crossfade',
    shots: [
      {bg: 'throne', cam: 'pushR', tone: 'warm', fx: ['rays', 'dust'], chars: [
        CH('tiye', 250, {scale: 1.1, y: 1340, pose: 'point', expr: 'ambitious', look: 1}),
        CH('pentawere', 470, {scale: 0.95, y: 1340, expr: 'serious', look: 1}),
      ]},
    ],
  },
  17: {
    transition: 'crossfade',
    sfx: [{file: 'footsteps', at: 0, vol: 0.25}, {file: 'torch', loop: true, vol: 0.12}],
    shots: [
      {bg: 'corridor', cam: 'push', tone: 'dark', fx: ['dust', 'flicker'], chars: [
        CH('tiye', 700, {walk: true, move: [-220, 40], pose: 'regal', expr: 'ambitious', y: 1380, scale: 0.9}),
      ]},
    ],
  },
  18: {
    transition: 'crossfade',
    sfx: [{file: 'torch', loop: true, vol: 0.14}, {file: 'whoosh', at: 70, vol: 0.2}],
    shots: [
      {bg: 'secretRoom', cam: 'pushSlow', tone: 'dark', fx: ['flicker', 'dust'], chars: [
        CH('tiye', 540, {pose: 'talk', expr: 'ambitious', y: 1330, scale: 1.05}),
        CH('official', 210, {pose: 'stand', look: 1, expr: 'serious', y: 1345, scale: 0.9, enter: 'left'}),
        CH('official', 880, {flip: true, pose: 'think', look: -1, y: 1345, scale: 0.9, enter: 'right', delay: 8}),
        GUARD(90, {y: 1360, scale: 0.85}),
      ]},
      {at: 0.38, xfade: 8, bg: 'secretRoom', cam: 'pushHard', tone: 'ominous', fx: ['flicker', 'dust'], chars: [
        CH('official', 330, {scale: 1.25, y: 1430, pose: 'think', expr: 'serious', look: 1}),
        CH('tiye', 720, {scale: 1.25, y: 1430, flip: true, expr: 'ambitious', pose: 'talk', look: -1}),
      ]},
      {at: 0.72, xfade: 8, bg: 'secretRoom', cam: 'push', tone: 'dark', fx: ['flicker'],
        props: [PR('shadows', 540, 1250, 1, {list: [{x: 140, y: 1200, s: 1.4, kind: 'wig'}, {x: 540, y: 1220, s: 1.7, kind: 'crown'}, {x: 940, y: 1200, s: 1.4}]})],
        chars: [GUARD(320, {y: 1360, shadow: true}), CH('official', 780, {y: 1360, shadow: true, flip: true})]},
    ],
  },
  19: {
    transition: 'cut',
    sfx: [{file: 'whoosh', at: 0, vol: 0.2}],
    shots: [
      {bg: 'secretRoom', cam: 'pushHard', tone: 'ominous', fx: ['flicker', 'dust'], vignette: 0.8, chars: [
        CH('official', 540, {scale: 1.85, y: 1590, pose: 'think', expr: 'serious', look: 1}),
      ]},
    ],
  },
  20: {
    transition: 'crossfade',
    sfx: [{file: 'scroll', at: 8, vol: 0.4}, {file: 'footsteps', at: 80, vol: 0.2}],
    shots: [
      {bg: 'secretRoom', cam: 'panR', tone: 'dark', fx: ['flicker', 'dust'], chars: [
        CH('official', 330, {pose: 'hold', item: 'scroll', expr: 'focus', y: 1340, scale: 1.1, look: 1}),
        CH('guard', 790, {flip: true, y: 1350, scale: 0.95, look: -1}),
      ]},
      {at: 0.5, xfade: 8, bg: 'corridor', cam: 'pushHard', tone: 'dark', fx: ['dust', 'flicker'], chars: [
        GUARD(300, {walk: true, move: [0, 150], y: 1380, scale: 0.9}),
        GUARD(780, {walk: true, flip: true, move: [0, -150], y: 1380, scale: 0.9}),
      ]},
    ],
  },
  21: {
    transition: 'crossfade',
    sfx: [{file: 'torch', loop: true, vol: 0.14}],
    shots: [
      {bg: 'corridor', cam: 'pushHard', tone: 'ominous', fx: ['dust', 'flicker', 'smoke'], chars: [
        GUARD(330, {y: 1390, scale: 0.9, look: 1, expr: 'serious'}),
        CH('official', 760, {flip: true, pose: 'talk', y: 1390, scale: 0.9, look: -1, expr: 'ambitious'}),
      ]},
    ],
  },
  22: {
    transition: 'crossfade',
    sfx: [{file: 'torch', loop: true, vol: 0.12}, {file: 'whoosh', at: 100, vol: 0.25}],
    shots: [
      {bg: 'secretRoom', cam: 'push', tone: 'dark', fx: ['flicker', 'dust'], chars: [
        CH('tiye', 330, {pose: 'talk', expr: 'ambitious', y: 1330, look: 1}),
        CH('pentawere', 740, {flip: true, look: -1, expr: 'serious', y: 1340, enter: 'right', delay: 6, scale: 0.95}),
        CH('official', 120, {y: 1350, scale: 0.85, look: 1}),
      ]},
      {at: 0.52, xfade: 10, bg: 'throne', cam: 'pushHard', tone: 'ominous', fx: ['rays', 'haze', 'dust'], vignette: 0.8, chars: [
        CH('pentawere', 540, {sit: true, y: 1215, pose: 'regal', ghost: true, expr: 'serious', enter: 'fade'}),
      ]},
    ],
  },
  23: {
    transition: 'cut',
    sfx: [{file: 'footsteps', at: 0, vol: 0.3}],
    shots: [
      {bg: 'corridor', cam: 'pushHard', tone: 'night', fx: ['flicker', 'dust'], vignette: 0.8, chars: [
        GUARD(310, {shadow: true, walk: true, move: [0, 120], y: 1380, scale: 0.95}),
        CH('official', 780, {shadow: true, walk: true, flip: true, move: [0, -120], y: 1380, scale: 0.95}),
      ]},
    ],
  },
  24: {
    transition: 'cut',
    sfx: [{file: 'heartbeat', at: 0, vol: 0.4}, {file: 'impact', at: 84, vol: 0.55}],
    shots: [
      {bg: 'bedroom', cam: 'pushSlow', tone: 'night', fx: ['dust', 'flicker'],
        props: [PR('dagger', 770, 1130, 1.25, {at: 9999})],
        chars: [CH('ramesses3', 400, {sit: true, y: 1110, pose: 'stand', expr: 'neutral', look: -1})]},
      {at: 0.62, bg: 'bedroom', cam: 'pushHard', tone: 'danger', fx: ['shake', {flash: {at: 6, len: 10, color: '255,255,255', peak: 0.85}}], vignette: 0.85,
        props: [PR('dagger', 770, 1130, 1.25, {at: 6})],
        chars: [CH('ramesses3', 400, {sit: true, y: 1110, pose: 'stand', expr: 'shock', look: 1, shadow: true})]},
    ],
  },
  25: {
    transition: 'cut',
    sfx: [{file: 'footsteps', at: 0, vol: 0.35}, {file: 'sword', at: 50, vol: 0.25}],
    shots: [
      {bg: 'corridor', cam: 'pullL', tone: 'dark', fx: ['dust', 'smoke', 'flicker'], chars: [
        GUARD(230, {walk: true, move: [0, 280], y: 1390, scale: 0.95}),
        CH('official', 820, {pose: 'shock', expr: 'shock', flip: true, y: 1390, scale: 0.95}),
        CH('official', 560, {pose: 'think', expr: 'worried', y: 1380, scale: 0.85, look: -1}),
      ]},
    ],
  },
  26: {
    transition: 'cut',
    sfx: [{file: 'impact', at: 0, vol: 0.5}, {file: 'scroll', at: 12, vol: 0.4}],
    shots: [
      {bg: 'palace', cam: 'pushHard', tone: 'ominous', fx: ['shake', {flash: {at: 0, len: 8, peak: 0.7}}], chars: [
        GUARD(300, {pose: 'point', y: 1380, scale: 1.15}),
        CH('official', 740, {pose: 'shock', expr: 'shock', y: 1380, scale: 1.15, flip: true}),
      ]},
    ],
  },
  27: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-court', loop: true, vol: 0.1}, {file: 'footsteps', at: 80, vol: 0.25}],
    shots: [
      {bg: 'palace', cam: 'pushL', tone: ['dark', 'cool'], fx: ['dust', 'flicker'], chars: [
        CH('official', 780, {flip: true, pose: 'hold', item: 'scroll', expr: 'focus', y: 1340, look: -1}),
        CH('official', 300, {pose: 'stand', expr: 'worried', y: 1350, scale: 0.95, look: 1}),
      ]},
      {at: 0.5, xfade: 8, bg: 'corridor', cam: 'push', tone: 'dark', fx: ['dust', 'flicker'], chars: [
        GUARD(260, {walk: true, move: [0, 150], y: 1390, scale: 0.9}),
        CH('official', 540, {walk: true, move: [0, 150], expr: 'worried', pose: 'stand', y: 1390, scale: 0.9}),
        GUARD(820, {walk: true, move: [0, 150], flip: true, y: 1390, scale: 0.9}),
      ]},
    ],
  },
  28: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-court', loop: true, vol: 0.16}, {file: 'scroll', at: 80, vol: 0.4}],
    shots: [
      {bg: 'courtroom', cam: 'push', tone: 'dark', fx: ['dust', 'flicker'], chars: [
        CH('official', 340, {y: 978, scale: 0.7, pose: 'stand', expr: 'serious'}),
        CH('official', 540, {y: 978, scale: 0.78, pose: 'hold', item: 'scroll', expr: 'focus'}),
        CH('official', 740, {y: 978, scale: 0.7, pose: 'stand', expr: 'serious', flip: true}),
      ]},
      {at: 0.34, xfade: 10, bg: 'courtroom', cam: 'pushSlow', tone: 'sepia', fx: ['dust', 'flicker'],
        props: [PR('papyrus', 540, 840, 1.1, {variant: 'turin'})]},
      {at: 0.7, xfade: 10, bg: 'courtroom', cam: 'pushUp', tone: 'dark', fx: ['dust', 'flicker'], chars: [
        CH('official', 340, {y: 978, scale: 0.7, expr: 'serious'}),
        CH('official', 540, {y: 978, scale: 0.78, expr: 'serious'}),
        CH('official', 740, {y: 978, scale: 0.7, expr: 'serious', flip: true}),
        CH('official', 250, {y: 1430, expr: 'worried', scale: 1.05, look: 1}),
        GUARD(850, {y: 1430, flip: true, scale: 1.05}),
      ]},
    ],
  },
  29: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-court', loop: true, vol: 0.16}, {file: 'gavel', at: 100, vol: 0.5}],
    shots: [
      {bg: 'courtroom', cam: 'pushUp', tone: 'dark', fx: ['dust', 'flicker'], chars: [
        CH('official', 340, {y: 978, scale: 0.7, expr: 'serious'}),
        CH('official', 540, {y: 978, scale: 0.78, expr: 'serious', pose: 'hold', item: 'scroll'}),
        CH('official', 740, {y: 978, scale: 0.7, expr: 'serious', flip: true}),
        CH('official', 190, {y: 1440, expr: 'worried', scale: 1.0, look: 1}),
        CH('official', 890, {y: 1440, expr: 'worried', scale: 1.0, flip: true, look: -1}),
        CH('pentawere', 540, {y: 1450, scale: 1.2, expr: 'worried', look: 0, pose: 'stand'}),
      ]},
    ],
  },
  30: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-tomb', loop: true, vol: 0.2}, {file: 'footsteps', at: 20, vol: 0.2}],
    shots: [
      {bg: 'mummyChamber', cam: 'pullSlow', tone: 'cool', fx: ['dustBlue', 'dof', 'raysBlue'],
        props: [ROYAL_MUMMY(660, 1140, 0.8)],
        chars: [CH('scientist', 200, {walk: true, move: [0, 130], y: 1360, expr: 'focus', enter: 'left', pose: 'stand'})]},
    ],
  },
  31: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-tomb', loop: true, vol: 0.2}, {file: 'heartbeat', at: 5, vol: 0.3}],
    shots: [
      {bg: 'mummyChamber', cam: {z: [1.0, 1.5], fx: [540, 380], fy: [960, 1060]}, tone: ['cool', 'dark'], fx: ['dustBlue', 'dof'],
        props: [ROYAL_MUMMY(540, 1130, 0.95), PR('question', 540, 640, 1.1)]},
    ],
  },
  32: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-tomb', loop: true, vol: 0.2}],
    shots: [
      {bg: 'tomb', cam: 'pull', tone: ['warm', 'dark'], fx: ['dust', 'haze', 'rays'],
        props: [ROYAL_MUMMY(540, 1140, 0.85)]},
    ],
  },
  33: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-tomb', loop: true, vol: 0.22}],
    shots: [
      {bg: 'tomb', cam: 'drop', tone: 'dark', fx: ['dust', 'smoke', 'haze'], vignette: 0.8,
        props: [ROYAL_MUMMY(540, 1140, 0.8)]},
    ],
  },
  34: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-ct', loop: true, vol: 0.14}, {file: 'scanner', at: 40, vol: 0.28}],
    shots: [
      {bg: 'ctRoom', cam: 'pushR', tone: 'sci', fx: ['dustBlue', 'raysBlue'],
        props: [PR('ct', 560, 1130, 0.9)],
        chars: [
          CH('scientist', 150, {pose: 'hold', item: 'tablet', expr: 'focus', y: 1350, look: 1, enter: 'left'}),
          CH('scientistB', 960, {flip: true, pose: 'point', expr: 'focus', y: 1350, look: -1, enter: 'right', delay: 6, scale: 0.95}),
        ]},
      {at: 0.5, xfade: 8, bg: 'ctRoom', cam: 'push', tone: 'sci', fx: ['dustBlue'],
        props: [PR('ct', 540, 1100, 1.05)],
        chars: [CH('scientist', 140, {pose: 'think', expr: 'focus', y: 1350, look: 1})]},
    ],
  },
  35: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-ct', loop: true, vol: 0.14}, {file: 'whoosh', at: 60, vol: 0.2}],
    shots: [
      {bg: 'ctRoom', cam: 'pushHard', tone: 'sci', fx: ['raysBlue', 'dustBlue'],
        props: [PR('monitor', 540, 920, 0.8, {mode: 'ct'})],
        chars: [
          CH('scientist', 110, {pose: 'shock', expr: 'shock', y: 1380, scale: 0.9, look: 1}),
          CH('scientistB', 970, {flip: true, pose: 'shock', expr: 'shock', y: 1380, scale: 0.9, look: -1}),
        ]},
    ],
  },
  36: {
    transition: 'cut',
    sfx: [{file: 'impact', at: 0, vol: 0.65}, {file: 'heartbeat', at: 10, vol: 0.4}],
    shots: [
      {bg: 'mummyChamber', cam: {z: [1.1, 1.95], fx: [300, 208], fy: [1050, 1118]}, tone: 'dark', fx: ['shake', {flash: {at: 0, len: 12, peak: 0.8}}, 'dustBlue'], vignette: 0.85,
        props: [ROYAL_MUMMY(540, 1120, 1.15, {wound: true})]},
      {at: 0.5, xfade: 8, bg: 'ctRoom', cam: 'push', tone: 'sci', fx: ['raysBlue', 'dustBlue'],
        props: [PR('monitor', 540, 940, 1.05, {mode: 'neck', label: 'LUKA SAYATAN'})]},
    ],
  },
  37: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-ct', loop: true, vol: 0.12}, {file: 'scroll', at: 70, vol: 0.2}],
    shots: [
      {bg: 'ctRoom', cam: 'pushL', tone: 'sci', fx: ['raysBlue', 'dustBlue'],
        props: [PR('monitor', 560, 900, 0.78, {mode: 'neck', label: 'LUKA SAYATAN'}), PR('tag', 540, 280, 1, {text: 'DUGAAN: SENJATA TAJAM', size: 44, border: '#f2c14e'})],
        chars: [
          CH('scientist', 130, {pose: 'point', expr: 'focus', y: 1380, look: 1, scale: 0.95}),
          CH('scientistB', 960, {flip: true, pose: 'think', expr: 'focus', y: 1380, look: -1, scale: 0.95}),
        ]},
    ],
  },
  38: {
    transition: 'crossfade',
    sfx: [{file: 'footsteps', at: 0, vol: 0.25}],
    shots: [
      {bg: 'ctRoom', cam: 'panR', tone: ['sci', 'dark'], fx: ['dustBlue'], chars: [
        CH('scientist', 260, {walk: true, move: [0, 420], y: 1380, expr: 'focus', pose: 'hold', item: 'tablet'}),
        CH('scientistB', 120, {walk: true, move: [0, 420], y: 1390, expr: 'focus', pose: 'stand', scale: 0.95}),
      ]},
    ],
  },
  39: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-tomb', loop: true, vol: 0.18}],
    shots: [
      {bg: 'unknownRoom', cam: 'pushSlow', tone: 'dark', fx: ['dustBlue', 'raysBlue'],
        props: [GOAT_MUMMY(540, 1130, 0.85), PR('tag', 540, 380, 1, {text: 'UNKNOWN MAN E', size: 50, border: '#f2c14e'})],
        chars: [
          CH('scientist', 170, {walk: true, move: [0, 110], y: 1380, expr: 'focus', pose: 'stand', look: 1}),
          CH('scientistB', 940, {flip: true, y: 1380, expr: 'focus', pose: 'think', look: -1, enter: 'right', delay: 10}),
        ]},
    ],
  },
  40: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-tomb', loop: true, vol: 0.18}],
    shots: [
      {bg: 'unknownRoom', cam: 'panR', tone: ['dark', 'cool'], fx: ['dustBlue'],
        props: [
          ROYAL_MUMMY(250, 1130, 0.5),
          GOAT_MUMMY(840, 1130, 0.5),
          PR('tag', 250, 700, 0.8, {text: 'MUMI KERAJAAN', size: 40}),
          PR('tag', 840, 700, 0.8, {text: 'UNKNOWN MAN E', size: 40, border: '#f2c14e'}),
        ]},
    ],
  },
  41: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-tomb', loop: true, vol: 0.18}, {file: 'scroll', at: 120, vol: 0.2}],
    shots: [
      {bg: 'unknownRoom', cam: {z: [1.1, 1.8], fx: [330, 120], fy: [1050, 1136]}, tone: 'dark', fx: ['dustBlue', 'raysBlue'],
        props: [GOAT_MUMMY(540, 1120, 1.1)]},
      {at: 0.52, xfade: 10, bg: 'unknownRoom', cam: 'pullR', tone: 'dark', fx: ['dustBlue'],
        props: [GOAT_MUMMY(640, 1130, 0.8)],
        chars: [CH('scientist', 150, {pose: 'think', expr: 'focus', y: 1380, look: 1, scale: 1.0}), CH('scientistB', 960, {flip: true, pose: 'hold', item: 'tablet', y: 1390, expr: 'focus', look: -1, scale: 0.9})]},
    ],
  },
  42: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-ct', loop: true, vol: 0.14}, {file: 'scanner', at: 30, vol: 0.25}],
    shots: [
      {bg: 'dnaLab', cam: 'pushR', tone: 'sci', fx: ['raysBlue', 'dustBlue'],
        props: [PR('monitor', 700, 920, 0.8, {mode: 'dna'})],
        chars: [CH('scientist', 190, {pose: 'hold', item: 'tablet', expr: 'focus', y: 1360, look: 1, enter: 'left'})]},
      {at: 0.45, xfade: 10, bg: 'dnaLab', cam: 'push', tone: 'sci', fx: ['raysBlue', 'dustBlue'],
        props: [PR('lineage', 540, 940, 1.18)]},
    ],
  },
  43: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-tomb', loop: true, vol: 0.18}, {file: 'whoosh', at: 40, vol: 0.25}],
    shots: [
      {bg: 'unknownRoom', cam: 'push', tone: ['dark', 'cool'], fx: ['dustBlue', 'raysBlue'],
        props: [GOAT_MUMMY(540, 1200, 0.8), PR('question', 850, 520, 0.8), PR('tag', 540, 300, 1, {text: 'DUGAAN PENELITI', size: 46, border: '#f2c14e'})],
        chars: [CH('pentawere', 540, {y: 1000, scale: 0.85, ghost: true, expr: 'serious', pose: 'stand', enter: 'fade', delay: 25})]},
    ],
  },
  44: {
    transition: 'crossfade',
    sfx: [{file: 'torch', loop: true, vol: 0.12}],
    shots: [
      {bg: 'secretRoom', cam: 'pushSlow', tone: 'sepia', fx: ['flicker', 'dust'],
        props: [PR('shadows', 540, 1250, 1, {list: [{x: 140, y: 1200, s: 1.4, kind: 'wig'}, {x: 940, y: 1200, s: 1.4}]})],
        chars: [CH('pentawere', 540, {scale: 1.25, y: 1400, expr: 'serious', look: 0, pose: 'stand'})]},
    ],
  },
  45: {
    transition: 'cut',
    sfx: [{file: 'impact', at: 0, vol: 0.5}],
    shots: [
      {bg: 'throne', cam: 'pushSlow', tone: 'ominous', fx: ['rays', 'haze', 'dust'], vignette: 0.85, chars: [
        CH('tiye', 290, {shadow: true, scale: 1.2, y: 1340, look: 1}),
        CH('pentawere', 790, {shadow: true, scale: 1.1, y: 1340, flip: true, look: -1}),
      ]},
    ],
  },
  46: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-palace', loop: true, vol: 0.1}],
    shots: [
      {bg: 'throne', cam: 'pushR', tone: 'sepia', fx: ['rays', 'dust'], chars: [
        CH('pentawere', 190, {scale: 0.95, y: 1330, look: 1, expr: 'serious'}),
        CH('tiye', 380, {scale: 1.1, y: 1330, look: 1, pose: 'point', expr: 'ambitious'}),
      ]},
    ],
  },
  47: {
    transition: 'cut',
    sfx: [{file: 'impact', at: 0, vol: 0.45}],
    shots: [
      {bg: 'throne', cam: 'pushHard', tone: 'gray', fx: ['shake', 'dust'], vignette: 0.85, chars: [
        CH('tiye', 540, {scale: 1.55, y: 1470, expr: 'worried', pose: 'shock'}),
      ]},
    ],
  },
  48: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-palace', loop: true, vol: 0.1}, {file: 'torch', at: 120, loop: true, vol: 0.1}],
    shots: [
      {bg: 'throne', cam: 'push', tone: 'warm', fx: ['rays', 'dust', 'flicker'], chars: [
        GUARD(170), GUARD(910, {flip: true}), R4({scale: 1.1}),
      ]},
      {at: 0.5, xfade: 10, bg: 'nightExt', cam: 'pullSlow', tone: 'night', fx: ['dustBlue', 'flicker'], vignette: 0.8, chars: [
        CH('pentawere', 540, {scale: 1.0, y: 1340, expr: 'worried', pose: 'stand', look: 0, enter: 'fade'}),
      ]},
    ],
  },
  49: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-palace', loop: true, vol: 0.14}],
    shots: [
      {bg: 'palace', cam: 'pull', tone: 'warm', fx: ['rays', 'dust', 'haze'], chars: [
        CH('tiye', 200, {scale: 0.82, y: 1350, pose: 'regal', expr: 'neutral'}),
        CH('ramesses3', 420, {scale: 0.9, y: 1350, pose: 'regal', expr: 'serious'}),
        CH('ramesses4', 680, {scale: 0.82, y: 1350, pose: 'regal', expr: 'serious', flip: true}),
        CH('pentawere', 890, {scale: 0.82, y: 1350, expr: 'serious', flip: true}),
      ]},
    ],
  },
  50: {
    transition: 'crossfade',
    sfx: [{file: 'ambience-palace', loop: true, vol: 0.12}, {file: 'impact', at: 40, vol: 0.4}],
    shots: [
      {bg: 'palace', cam: 'pullSlow', tone: ['warm', {gray: 0.95, br: 0.5, sat: 0.4}], fx: ['smoke', 'dust'], vignette: 0.8, chars: [
        CH('tiye', 200, {scale: 0.82, y: 1350, pose: 'regal', expr: 'worried'}),
        CH('ramesses3', 420, {scale: 0.9, y: 1350, pose: 'regal', expr: 'serious'}),
        CH('ramesses4', 680, {scale: 0.82, y: 1350, pose: 'regal', expr: 'serious', flip: true}),
        CH('pentawere', 890, {scale: 0.82, y: 1350, expr: 'worried', flip: true}),
      ]},
    ],
  },
  51: {
    transition: 'crossfade',
    fadeOut: 45,
    sfx: [{file: 'ambience-tomb', loop: true, vol: 0.18}, {file: 'heartbeat', at: 30, vol: 0.3}],
    shots: [
      {bg: 'tomb', cam: {z: [1.0, 1.55], fx: [540, 340], fy: [960, 1090]}, tone: ['dark', 'dark'], fx: ['dust', 'rays', 'haze'], vignette: 0.8,
        props: [ROYAL_MUMMY(540, 1130, 0.95, {wound: true})]},
    ],
  },
};

// Musik latar: dari awal segmen `from` sampai awal segmen `to` (52 = akhir video).
const MUSIC_PLAN = [
  {track: 'egypt-mystic', from: 1, to: 3},
  {track: 'tense-suspense', from: 3, to: 6},
  {track: 'egypt-mystic', from: 6, to: 9},
  {track: 'tense-suspense', from: 9, to: 18},
  {track: 'secret-pulse', from: 18, to: 26},
  {track: 'court-solemn', from: 26, to: 30},
  {track: 'science-mystery', from: 30, to: 45},
  {track: 'reveal-epic', from: 45, to: 52},
];
export const MUSIC_VOLUME = 0.12;

const segs = timings.segments;

export const SCENES = segs.map((seg, i) => {
  const spec = MAP[seg.index];
  if (!spec) throw new Error('Segmen ' + seg.index + ' belum dipetakan di scenes.js');
  const visualStart = i === 0 ? 0 : seg.startFrame;
  const next = segs[i + 1];
  const visualEnd = next ? next.startFrame : TOTAL_FRAMES;
  const transition = i === 0 ? 'black' : spec.transition;
  return {
    id: 's' + String(seg.index).padStart(2, '0'),
    segment: seg.index,
    // timing voice-over asli (tidak diubah):
    startFrame: seg.startFrame,
    durationInFrames: seg.durationInFrames,
    // rentang visual: dari awal segmen ini sampai awal segmen berikutnya (jeda tetap berupa visual, audio tidak digeser)
    visualStart,
    visualDuration: visualEnd - visualStart,
    lead: transition === 'crossfade' ? CROSSFADE_FRAMES : 0,
    transition,
    fadeOut: spec.fadeOut || 0,
    background: spec.shots[0].bg,
    characters: Array.from(new Set(spec.shots.flatMap((s) => (s.chars || []).map((c) => c.who)))),
    camera: spec.shots.map((s) => s.cam || 'static'),
    effects: Array.from(new Set(spec.shots.flatMap((s) => (s.fx || []).filter((f) => typeof f === 'string')))),
    voiceOver: {file: seg.file, start: seg.start, end: seg.end, duration: seg.duration, startFrame: seg.startFrame, durationInFrames: seg.durationInFrames, text: seg.text},
    subtitles: {source: SRT_FILE, cueIndex: seg.index, text: seg.text},
    sfx: spec.sfx || [],
    shots: spec.shots,
  };
});

export const MUSIC = MUSIC_PLAN.map((m) => {
  const a = SCENES.find((s) => s.segment === m.from);
  const b = SCENES.find((s) => s.segment === m.to);
  const start = a.visualStart;
  const end = b ? b.visualStart : TOTAL_FRAMES;
  return {track: m.track, startFrame: start, durationInFrames: end - start};
});

export const validateScenes = () => {
  const errors = [];
  if (SCENES.length !== segs.length) errors.push('Jumlah scene != jumlah segmen');
  let cursor = 0;
  SCENES.forEach((s, i) => {
    if (s.segment !== i + 1) errors.push('Urutan segmen salah di indeks ' + i);
    if (s.visualStart !== cursor) errors.push('Celah/overlap visual pada ' + s.id);
    cursor += s.visualDuration;
    if (s.visualDuration <= 0) errors.push('Durasi visual <= 0 pada ' + s.id);
    if (s.startFrame !== segs[i].startFrame || s.durationInFrames !== segs[i].durationInFrames) errors.push('Timing menyimpang dari timings.json pada ' + s.id);
    let last = -1;
    s.shots.forEach((sh, k) => {
      const at = sh.at === undefined ? k / s.shots.length : sh.at;
      if (at <= last && k > 0) errors.push('Urutan shot salah pada ' + s.id);
      last = at;
    });
  });
  if (cursor !== TOTAL_FRAMES) errors.push('Total frame visual (' + cursor + ') != totalFrames (' + TOTAL_FRAMES + ')');
  const mapped = Object.keys(MAP).length;
  if (mapped !== segs.length) errors.push('MAP berisi ' + mapped + ' entri, timings.json berisi ' + segs.length + ' segmen');
  if (errors.length) throw new Error('Validasi scenes gagal:\n- ' + errors.join('\n- '));
  return true;
};
