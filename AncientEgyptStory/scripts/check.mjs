// Pemeriksaan tanpa dependency: node scripts/check.mjs
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const P = (...a) => path.join(root, ...a);
const errs = [];
const warn = [];
const ok = (c, m) => { if (!c) errs.push(m); };

const vo = P('public/audio/voiceover');
for (const f of ['master.wav', 'master.srt', 'timings.json']) ok(fs.existsSync(path.join(vo, f)), 'Hilang: public/audio/voiceover/' + f);
if (errs.length) { console.error(errs.join('\n')); process.exit(1); }

const T = JSON.parse(fs.readFileSync(path.join(vo, 'timings.json'), 'utf8'));
ok(T.fps === 30, 'FPS bukan 30: ' + T.fps);
T.segments.forEach((s, i) => {
  ok(s.index === i + 1, 'Urutan segmen salah di ' + i);
  if (!fs.existsSync(path.join(vo, s.file))) warn.push('Segmen audio tidak ada (opsional): ' + s.file);
});

// durasi master.wav
const wav = fs.readFileSync(path.join(vo, 'master.wav'));
const sr = wav.readUInt32LE(24), byteRate = wav.readUInt32LE(28);
let off = 12, dataLen = 0;
while (off < wav.length - 8) { const id = wav.toString('ascii', off, off + 4), n = wav.readUInt32LE(off + 4); if (id === 'data') { dataLen = n; break; } off += 8 + n; }
const wavFrames = Math.ceil((dataLen / byteRate) * T.fps);
ok(Math.abs(wavFrames - T.totalFrames) <= 2, `Durasi master.wav (${wavFrames} frame, ${sr} Hz) tidak sesuai totalFrames ${T.totalFrames}`);

// SRT vs timings (teks & waktu)
const cues = fs.readFileSync(path.join(vo, 'master.srt'), 'utf8').replace(/\r/g, '').split(/\n\s*\n/).filter((b) => b.trim());
ok(cues.length === T.segments.length, `Jumlah cue SRT (${cues.length}) != segmen (${T.segments.length})`);
cues.forEach((c, i) => { const l = c.trim().split('\n'); ok(l.slice(2).join(' ').trim() === T.segments[i].text, 'Teks SRT != timings.json pada cue ' + (i + 1)); });

// scenes.js: jalankan validateScenes di Node
let src = fs.readFileSync(P('src/scenes.js'), 'utf8').replace(/import timings from .*;\n/, 'const timings = ' + JSON.stringify(T) + ';\n');
const mod = await import('data:text/javascript;base64,' + Buffer.from(src).toString('base64'));
try { mod.validateScenes(); } catch (e) { errs.push(e.message); }
ok(mod.SCENES.length === T.segments.length, 'Jumlah scene salah');

// aset yang dirujuk
mod.SCENES.forEach((s) => s.sfx.forEach((x) => ok(fs.existsSync(P('public/sfx', x.file + '.wav')), 'SFX hilang: ' + x.file)));
mod.MUSIC.forEach((m) => ok(fs.existsSync(P('public/music', m.track + '.wav')), 'Musik hilang: ' + m.track));
ok(mod.MUSIC_VOLUME >= 0.1 && mod.MUSIC_VOLUME <= 0.15, 'Volume musik di luar 0.10-0.15');

// tanpa TypeScript, master.wav hanya sekali
const walk = (d) => fs.readdirSync(d, {withFileTypes: true}).flatMap((e) => e.name === 'node_modules' ? [] : e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const files = walk(root);
ok(!files.some((f) => /\.tsx?$/.test(f)), 'Ada file TypeScript');
const refs = walk(P('src')).filter((f) => /\.(jsx?)$/.test(f)).reduce((n, f) => n + (fs.readFileSync(f, 'utf8').match(/<Audio[^>]*VO_FILE/g) || []).length, 0);
ok(refs === 1, 'master.wav harus dipakai tepat satu <Audio>, ditemukan ' + refs);

if (warn.length) console.log('Catatan: ' + warn.length + ' file segments/*.wav tidak ada (tidak dipakai render, hanya referensi).');
if (errs.length) { console.error('GAGAL:\n- ' + errs.join('\n- ')); process.exit(1); }
console.log(`OK: ${T.segments.length} segmen, ${T.totalFrames} frame @ ${T.fps} fps (${T.totalDuration}s), ${mod.SCENES.length} scene, ${mod.MUSIC.length} bagian musik.`);
