import React from 'react';
import {AbsoluteFill, Audio, Composition, Sequence, interpolate, staticFile} from 'remotion';
import {SCENES, MUSIC, MUSIC_VOLUME, FPS, TOTAL_FRAMES, VO_FILE, validateScenes} from './scenes.js';
import {Scene} from './Scene.jsx';
import {WordSubtitle} from './WordSubtitle.jsx';

validateScenes();

const VO_VOLUME = 1;

// Musik latar: satu Sequence per bagian, fade in/out agar perpindahan trek halus.
const MusicBed = ({m}) => {
  const fade = 24;
  return (
    <Sequence from={m.startFrame} durationInFrames={m.durationInFrames}>
      <Audio
        src={staticFile('music/' + m.track + '.wav')}
        loop
        volume={(f) =>
          MUSIC_VOLUME *
          interpolate(f, [0, fade, m.durationInFrames - fade, m.durationInFrames], [0, 1, 1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
        }
      />
    </Sequence>
  );
};

// SFX per scene: loop = ambience selama scene; at = posisi (frame) di dalam scene.
const SceneSfx = ({scene}) => (
  <>
    {scene.sfx.map((s, i) => {
      const from = scene.visualStart + (s.loop ? 0 : s.at || 0);
      const dur = s.loop ? scene.visualDuration : Math.max(1, scene.visualDuration - (s.at || 0));
      return (
        <Sequence key={scene.id + '-sfx-' + i} from={from} durationInFrames={dur}>
          <Audio
            src={staticFile('sfx/' + s.file + '.wav')}
            loop={!!s.loop}
            volume={(f) => {
              const base = s.vol === undefined ? 0.2 : s.vol;
              return s.loop ? base * interpolate(f, [0, 12, dur - 12, dur], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : base;
            }}
          />
        </Sequence>
      );
    })}
  </>
);

export const AncientEgyptStory = () => (
  <AbsoluteFill style={{backgroundColor: '#000'}}>
    {SCENES.map((scene) => (
      <Sequence
        key={scene.id}
        name={scene.id + ' · segmen ' + scene.segment}
        from={scene.visualStart - scene.lead}
        durationInFrames={scene.visualDuration + scene.lead}
      >
        <Scene scene={scene} />
      </Sequence>
    ))}
    {MUSIC.map((m, i) => (
      <MusicBed key={'music' + i} m={m} />
    ))}
    {SCENES.map((scene) => (
      <SceneSfx key={'sfx-' + scene.id} scene={scene} />
    ))}
    {/* master.wav diputar SATU KALI dari frame 0, tanpa dipotong/diubah kecepatan */}
    <Audio src={staticFile(VO_FILE)} volume={VO_VOLUME} />
    <WordSubtitle />
  </AbsoluteFill>
);

export const RemotionRoot = () => (
  <Composition
    id="AncientEgyptStory"
    component={AncientEgyptStory}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={1080}
    height={1920}
  />
);
