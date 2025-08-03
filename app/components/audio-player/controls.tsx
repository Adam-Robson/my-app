'use client';

import { useAudio } from '@/app/contexts/audio-provider';

export default function Controls() {
  const {
    playback,
    play,
    pause,
    stop,
    elapsed,
    duration,
    volume,
    setVolume,
    currentTrack,
  } = useAudio();

  if (!currentTrack) return null;

  return (
    <div className="mt-4 p-4 border rounded-md shadow w-full max-w-md">
      <h2 className="font-semibold text-lg mb-2">{currentTrack.title}</h2>
      <div className="flex gap-2 mb-2">
        <button onClick={playback ? pause : play}>
          {playback ? '⏸ Pause' : '▶️ Play'}
        </button>
        <button onClick={stop}>⏹ Stop</button>
      </div>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="w-full mb-2"
      />
      <div className="text-sm">
        ⏱ {elapsed.toFixed(1)} / {duration.toFixed(1)}s
      </div>
    </div>
  );
}
