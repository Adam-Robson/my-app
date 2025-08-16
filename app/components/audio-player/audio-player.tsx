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
  XIcon,
} from '@phosphor-icons/react';
import Volume from '@/app/components/audio-player/volume';
import Playlist from '@/app/components/audio-player/playlist';
import { AudioPlayerType } from '@/app/types/audio-player';
import formatTime from '@/app/utils/format-time';

export default function AudioPlayer({ showPlayer, setShowPlayer }: AudioPlayerType) {
  const {
    playlist,
    playback,
    play,
    pause,
    next,
    previous,
    elapsed,
    duration,
    loading,
    error,
    trackTitle,
    safePct
  } = useAudio();

  const [showPlaylist, setShowPlaylist] = useState(false);

  if (!showPlayer) return null;

  return (
    <div className="w-[min(92vw,48rem)] fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="relative w-full bg-[var(--secondary)] text-[var(--text-primary)] rounded-md shadow-lg px-4 py-3 flex flex-col gap-2">
        {/* Close */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowPlayer(false)}
            title="Hide player"
            className="opacity-80 hover:opacity-100 transition-opacity"
          >
            <XIcon className="w-5 h-5" size={18} />
          </button>
        </div>

        {/* Grid row: [left auto] [middle 1fr] [right auto] */}
        <div className="relative grid grid-cols-[auto,1fr,auto] items-center gap-3 min-w-0">
          {/* Left: Playlist toggle */}
          <div className="flex items-center">
            <button
              onClick={() => setShowPlaylist(v => !v)}
              title={showPlaylist ? 'Hide playlist' : 'Show playlist'}
              aria-expanded={showPlaylist}
              aria-controls="player-playlist"
            >
              <PlaylistIcon
                className={`w-5 h-5 transition-transform ${showPlaylist ? 'rotate-180 text-[var(--accent)]' : 'rotate-0'}`}
              />
            </button>
          </div>

          {/* Middle: Title (takes leftover space) */}
          <div
            className="min-w-0 truncate text-sm font-medium select-none"
            aria-live="polite"
            title={
              loading
                ? 'Loading…'
                : error
                  ? 'Playback error'
                  : trackTitle || 'No song loaded'
            }
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <SpinnerBallIcon className="w-4 h-4" size={16} />
                Loading…
              </span>
            ) : error ? (
              <span className="inline-flex items-center gap-2 text-red-400">
                <WarningIcon className="w-4 h-4" size={16} />
                Playback errorsdsas
              </span>
            ) : trackTitle ? (
              trackTitle
            ) : (
              'No song loaded'
            )}
          </div>

          <div className="flex justify-evenly items-end gap-3 shrink-0">
            <button onClick={previous} disabled={loading} title="Previous">
              <SkipBackIcon className="w-5 h-5" size={18} />
            </button>

            {playback ? (
              <button onClick={pause} disabled={loading} title="Pause">
                <PauseIcon className="w-6 h-6" size={18} />
              </button>
            ) : (
              <button onClick={play} disabled={loading || !!error} title="Play">
                <PlayIcon className="w-6 h-6" size={18} />
              </button>
            )}

            <button onClick={next} disabled={loading} title="Next">
              <SkipForwardIcon className="w-5 h-5" size={18} />
            </button>

            <Volume />
          </div>
        </div>

        {showPlaylist && (
          <div
            id="player-playlist"
            className="
              block mt-2 z-50
              sm:absolute sm:left-0 
              sm:right-0 sm:-top-2 
              sm:translate-y-[-100%] sm:mt-0
            "
            role="dialog"
            aria-label="Playlist"
          >
            <Playlist tracks={playlist} />
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span className="tabular-nums">{formatTime(elapsed)}</span>
          <div className="flex-grow bg-neutral-700 rounded h-1 overflow-hidden">
            <div
              className="bg-white h-1 transition-all duration-300 ease-linear"
              style={{ width: `${safePct}%` }}
            />
          </div>
          <span className="tabular-nums">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
