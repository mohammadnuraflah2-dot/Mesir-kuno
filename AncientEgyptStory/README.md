# AncientEgyptStory (Remotion, JavaScript + JSX)

1080x1920 · 30 FPS · 8619 frame (287,27 dtk) · 51 segmen voice-over.

    npm install
    npm run check      # validasi timing, SRT, aset (tanpa dependency)
    npm run start      # preview
    npx remotion render AncientEgyptStory out/video.mp4

Catatan:
- Karakter dan background digambar prosedural (SVG) di kode, jadi folder public/characters dan public/backgrounds sengaja kosong.
- Musik dan SFX di public/music dan public/sfx adalah placeholder hasil sintesis (scripts/make_audio.py). Ganti dengan file asli bernama sama bila ada.
- Timestamp per kata DIPERKIRAKAN dari timestamp kalimat di master.srt (bukan forced alignment).
