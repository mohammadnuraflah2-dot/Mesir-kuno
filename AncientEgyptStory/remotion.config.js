import {Config} from '@remotion/cli/config';

// Entry point supaya perintah `npx remotion render AncientEgyptStory out/video.mp4` bisa dipakai tanpa path.
Config.setEntryPoint('./src/index.jsx');
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(88);
Config.setOverwriteOutput(true);
// Hemat RAM (penting di Android/Termux). Naikkan jika perangkat kuat.
Config.setConcurrency(1);
