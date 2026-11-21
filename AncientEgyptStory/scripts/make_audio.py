# Menghasilkan musik latar & SFX placeholder (sintesis prosedural, tanpa jaringan).
# Jalankan: python3 scripts/make_audio.py   (butuh numpy)
import numpy as np, wave, os
SR = 22050
rng = np.random.default_rng(7)
os.makedirs('public/music', exist_ok=True)
os.makedirs('public/sfx', exist_ok=True)

def save(path, x, peak=0.9):
    x = np.asarray(x, dtype=np.float64)
    m = np.max(np.abs(x)) or 1.0
    x = x / m * peak
    with wave.open(path, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype('<i2').tobytes())

def tt(d): return np.arange(int(SR * d)) / SR
def lp(x, k):
    k = max(1, int(k)); return np.convolve(x, np.ones(k) / k, mode='same')
def env_ad(n, a, d):
    t = np.arange(n) / SR
    return np.minimum(t / a, 1.0) * np.exp(-t / d)
def pluck(freq, dur, bright=3):
    t = tt(dur); s = np.zeros_like(t)
    for h in range(1, 6): s += np.sin(2 * np.pi * freq * h * t) / (h ** bright)
    return s * env_ad(len(t), 0.005, dur / 3)
def loop_add(buf, snd, start):
    n = len(buf); idx = (int(start) + np.arange(len(snd))) % n; np.add.at(buf, idx, snd)
def periodic_sine(f, L, t):
    cyc = max(1, round(f * L)); return np.sin(2 * np.pi * cyc / L * t)

SCALE = [293.66, 311.13, 369.99, 392.0, 440.0, 466.16, 554.37, 587.33]

def music(name, L, root, pad_mix, notes, pulse=0, trem=0, tension=0, sci=False, bass_pulse=0):
    t = tt(L); n = len(t); m = np.zeros(n)
    for k, (mult, amp) in enumerate(pad_mix):
        f = root * mult
        lfo = 0.6 + 0.4 * periodic_sine(0.1 * (k + 1), L, t + k)
        m += amp * lfo * (periodic_sine(f, L, t) + 0.4 * periodic_sine(f * 2.0, L, t))
    if tension: m += tension * periodic_sine(root * 1.0595 * 2, L, t) * (0.5 + 0.5 * periodic_sine(0.2, L, t))
    if trem: m *= 1 - trem * (0.5 + 0.5 * periodic_sine(5.0, L, t))
    for (st, fi, dur, amp) in notes:
        loop_add(m, amp * pluck(SCALE[fi], dur), st * SR)
    if pulse:
        step = L / pulse
        for i in range(pulse):
            k = np.sin(2 * np.pi * 55 * tt(0.4)) * env_ad(int(0.4 * SR), 0.003, 0.12)
            loop_add(m, 0.9 * k, i * step * SR)
    if bass_pulse:
        step = L / bass_pulse
        for i in range(bass_pulse):
            loop_add(m, 0.5 * pluck(root / 2, 0.8, 2), i * step * SR)
    if sci:
        for i in range(int(L * 2)):
            loop_add(m, 0.25 * np.sin(2 * np.pi * (SCALE[(i * 3) % 8] * 2) * tt(0.18)) * env_ad(int(0.18 * SR), 0.004, 0.05), i * 0.5 * SR)
    m = lp(m, 2)
    save(f'public/music/{name}.wav', m, 0.8)

L = 24.0
music('egypt-mystic', L, 73.42, [(1, 1.0), (1.5, 0.6), (2, 0.35)],
      [(1, 0, 2.5, .5), (3, 2, 2.0, .45), (5, 3, 2.5, .4), (7.5, 2, 2.0, .45), (10, 1, 3, .4), (13, 2, 2, .4), (16, 3, 2.5, .45), (19, 4, 3, .4), (22, 2, 2.2, .35)])
music('tense-suspense', L, 61.74, [(1, 1.0), (1.0595, 0.5), (1.5, 0.4)], [(4, 1, 3, .3), (11, 0, 3, .3), (17, 6, 3.5, .25)], trem=0.5, tension=0.6, pulse=24)
music('secret-pulse', L, 65.41, [(1, 1.0), (1.5, 0.4), (2.0, 0.3)], [(2, 2, 1.5, .35), (8, 1, 1.5, .35), (14, 3, 1.5, .3), (20, 1, 2.5, .35)], trem=0.3, tension=0.4, bass_pulse=48)
music('court-solemn', L, 55.0, [(1, 1.0), (1.5, 0.5), (2, 0.4), (3, 0.2)], [(0, 0, 4, .35), (6, 3, 4, .3), (12, 0, 4, .35), (18, 2, 4, .3)], pulse=12)
music('science-mystery', L, 82.41, [(1, 0.8), (1.5, 0.5), (2.5, 0.3)], [(6, 5, 3, .3), (15, 3, 3, .3)], sci=True, tension=0.3)
music('reveal-epic', L, 49.0, [(1, 1.0), (1.5, 0.7), (2, 0.6), (3, 0.4), (4, 0.2)], [(0, 0, 5, .5), (6, 2, 5, .45), (12, 4, 5, .5), (18, 3, 5, .45)], pulse=6, tension=0.2)

def noise(d): return rng.standard_normal(int(SR * d))
def sfx(name, x, peak=0.9): save(f'public/sfx/{name}.wav', x, peak)

t = tt(1.6); sfx('impact', (np.sin(2 * np.pi * (60 - 25 * t) * t) * np.exp(-t * 3.2)) + lp(noise(1.6), 40) * np.exp(-t * 6) * 1.2)
t = tt(1.2); sfx('whoosh', lp(noise(1.2), 14) * np.sin(np.pi * t / 1.2) ** 2)
t = tt(4.0); c = np.zeros_like(t)
for _ in range(60): loop_add(c, rng.uniform(.2, 1) * noise(0.01) * np.exp(-np.arange(int(.01 * SR)) / 40), rng.uniform(0, 4) * SR)
sfx('torch', lp(noise(4.0), 60) * 0.5 + c * 0.8)
f = np.zeros(int(3 * SR))
for i in range(6): loop_add(f, lp(noise(0.2), 30) * np.exp(-np.arange(int(.2 * SR)) / 900) * (0.8 if i % 2 else 1), (0.2 + i * 0.5) * SR)
sfx('footsteps', f)
t = tt(1.0); sfx('scroll', lp(noise(1.0), 5) * (np.sin(np.pi * t) ** 0.5) * (0.5 + 0.5 * np.sin(2 * np.pi * 14 * t)))
t = tt(1.4); sfx('sword', sum(np.sin(2 * np.pi * f0 * t) for f0 in (1200, 1810, 2630, 3400)) * np.exp(-t * 5) + noise(1.4) * np.exp(-t * 40) * 0.8)
t = tt(0.6); sfx('gavel', np.sin(2 * np.pi * 180 * t) * np.exp(-t * 22) + lp(noise(0.6), 6) * np.exp(-t * 60))
h = np.zeros(int(2 * SR))
for s in (0.1, 0.4): loop_add(h, np.sin(2 * np.pi * 50 * tt(0.3)) * env_ad(int(.3 * SR), .01, .08), s * SR)
sfx('heartbeat', h)
t = tt(3.0); sfx('scanner', np.sin(2 * np.pi * (180 + 40 * np.sin(2 * np.pi * 0.7 * t)) * t) * 0.5 + (np.sin(2 * np.pi * 900 * t) * (np.sin(2 * np.pi * 2 * t) > 0.8)) * 0.3)

def amb(name, fc, tone=0, drum=0, wob=0.2):
    t = tt(8.0); a = lp(noise(8.0), fc) * (1 + wob * periodic_sine(0.25, 8, t))
    if tone: a += tone * periodic_sine(110, 8, t) * 0.05
    if drum:
        for i in range(int(drum)): loop_add(a, 0.4 * np.sin(2 * np.pi * 70 * tt(.25)) * env_ad(int(.25 * SR), .004, .08), i * 8 / drum * SR)
    sfx(f'ambience-{name}', a, 0.8)
amb('palace', 60, tone=.4); amb('battle', 25, drum=16, wob=.5); amb('court', 90, tone=.3); amb('tomb', 140, tone=.7, wob=.4); amb('ct', 25, tone=1.2, wob=.05)
print('ok')
