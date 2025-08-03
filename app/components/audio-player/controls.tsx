'use client';

import { useAudio } from '@/app/contexts/audio-provider';
import Volume from '@/app/components/audio-player/volume';
import {
  PlayIcon,
  StopIcon,
  PauseIcon,
  SkipForwardIcon,
  SkipBackIcon,
  SpinnerBallIcon,
  WarningIcon
} from '@phosphor-icons/react';

export default function Controls() {
  const {
    playback,
    play,
    pause,
    stop,
    elapsed,
    duration,
    next,
    previous,
    currentTrack,
    loading,
    error,
  } = useAudio();

  if (!currentTrack) return null;

  return (
    <div className="w-full h-full flex justify-between items-center">
      <h2 className="font-medium text-lg">{currentTrack.title}</h2>

      {loading && (
        <div className="text-sm mb-2 animate-pulse text-[var(--accent)]">
          <SpinnerBallIcon size={18} />
        </div>
      )}

      {error && (
        <div className="text-sm mb-2 text-[var(--accent)]">
          ⚠ {error}
          <WarningIcon size={18} />
        </div>
      )}

      <div className="flex gap-2 mb-2">
        <button
          onClick={previous}
          disabled={loading || !!error}
          className="px-3 py-1 rounded bg-[var(--primary)] disabled:opacity-50"
        >
          {<SkipBackIcon size={18} />}
        </button>
        <button
          onClick={playback ? pause : play}
          disabled={loading || !!error}
          className="px-3 py-1 rounded bg-[var(--primary)] disabled:opacity-50"
        >
          {playback ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
        </button>
        <button
          onClick={stop}
          disabled={loading || !!error}
          className="px-3 py-1 rounded bg-[var(--primary)] disabled:opacity-50"
        >
          <StopIcon size={18} />
        </button>
        <button
          onClick={next}
          disabled={loading || !!error}
          className="px-3 py-1 rounded bg-[var(--primary)] disabled:opacity-50"
        >
          <SkipForwardIcon size={18} />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <Volume />
      </div>

      <div className="text-sm">
        ⏱ {elapsed.toFixed(1)} / {duration.toFixed(1)}s
      </div>
    </div>
  );
}
