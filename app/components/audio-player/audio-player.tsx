'use client';

import { useState } from 'react';
import { useAudio } from '@/app/contexts/audio-provider';
import {
  PlayIcon,
  PauseIcon,
  SkipForwardIcon,
  SkipBackIcon,
  PlaylistIcon,
  WarningIcon,
  SpinnerBallIcon,
} from '@phosphor-icons/react';
import Volume from '@/app/components/audio-player/volume';
import Playlist from '@/app/components/audio-player/playlist';

export default function AudioPlayer() {
  const {
    playlist,
    playback,
    play,
    pause,
    next,
    previous,
    currentTrack,
    elapsed,
    duration,
    loading,
    error,
  } = useAudio();

  const [showPlaylist, setShowPlaylist] = useState(false);

  const formatTime = (time: number) => {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-neutral-900 text-white z-50">
      <div className="w-full max-w-screen-xl mx-auto px-4 py-3 flex flex-col gap-2">
        {/* Controls Row */}
        <div className="flex items-center justify-between relative">
          {/* Playlist (expands upward above player) */}
          {showPlaylist && (
            <div className="absolute bottom-full left-0 w-full">
              <Playlist tracks={playlist} />
            </div>
          )}

          {/* Track Info */}
          <div className="flex-1 truncate text-sm font-medium">
            {loading ? (
              <SpinnerBallIcon className="w-5 h-5" size={18} />
            ) : error ? (
              <WarningIcon className="w-5 h-5" size={18} />
            ) : (
              currentTrack?.title ?? 'No song loaded'
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button onClick={previous} disabled={loading}>
              <SkipBackIcon className="w-5 h-5" size={18} />
            </button>

            {playback ? (
              <button onClick={pause} disabled={loading}>
                <PauseIcon className="w-6 h-6" size={18} />
              </button>
            ) : (
              <button onClick={play} disabled={loading || !!error}>
                <PlayIcon className="w-6 h-6" size={18} />
              </button>
            )}

            <button onClick={next} disabled={loading}>
              <SkipForwardIcon className="w-5 h-5" size={18} />
            </button>

            <Volume />

            {/* Toggle Playlist */}
            <button onClick={() => setShowPlaylist((v) => !v)}>
              <PlaylistIcon
                className={`w-5 h-5 transition-transform ${
                  showPlaylist ? 'rotate-360 text-[var(--accent)]' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span>{formatTime(elapsed)}</span>
          <div className="flex-grow bg-neutral-700 rounded h-1 overflow-hidden">
            <div
              className="bg-white h-1 transition-all duration-300 ease-linear"
              style={{ width: `${(elapsed / duration) * 100 || 0}%` }}
            />
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
