'use client';

import { useAudio } from '@/app/contexts/audio-provider';
import {
  PlayIcon,
  PauseIcon,
  SkipForwardIcon,
  SkipBackIcon,
  WarningIcon,
  SpinnerBallIcon,
  XIcon,
} from '@phosphor-icons/react';
import Volume from '@/app/components/audio-player/volume';
import Icon from '@/app/components/audio-player/playlist/icon';
import Playlist from '@/app/components/audio-player/playlist/playlist';
import { AudioPlayerType } from '@/app/types/audio-player';


export default function AudioPlayer({ showPlayer, setShowPlayer }: AudioPlayerType) {
  const {
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
    safePct,
    formatTime,
    showPlaylist,
    setShowPlaylist
  } = useAudio();


  if (!showPlayer) return null;

  return (
    <div
      className={`
        fixed left-1/2 -translate-x-1/2 bottom-6 z-[60]
        w-[min(720px,92vw)] bg-[var(--primary-50)]
        flex flex-col 
        rounded-md shadow-lg p-4 
      `}
      aria-hidden={!showPlayer}
    >
      <div
        className={`
          audio-player relative overflow-visible
          w-full rounded-md shadow-lg p-4 flex
          flex-col gap-2
        `}
      >
        <div className="flex justify-end">
          <button
            onClick={() => setShowPlayer(false)}
            title="Hide player"
            className="opacity-80 hover:opacity-100 transition-opacity"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <Icon showPlaylist={showPlaylist} setShowPlaylist={setShowPlaylist} />
        <div className={`
          relative grid 
          grid-cols-[auto,1fr,auto] 
          items-center gap-3 min-w-0
        `}>
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
                <SpinnerBallIcon className="w-4 h-4" />
                Loading…
              </span>
            ) : error ? (
              <span className="inline-flex items-center gap-2 text-red-400">
                <WarningIcon className="w-4 h-4" />
                Playback error
              </span>
            ) : trackTitle ? (
              trackTitle
            ) : (
              'No song loaded'
            )}
          </div>

          <div className="flex justify-evenly items-end gap-3 shrink-0">
            <button onClick={previous} disabled={loading} title="Previous">
              <SkipBackIcon className="w-5 h-5" />
            </button>

            {playback ? (
              <button onClick={pause} disabled={loading} title="Pause">
                <PauseIcon className="w-6 h-6" />
              </button>
            ) : (
              <button onClick={play} disabled={loading || !!error} title="Play">
                <PlayIcon className="w-6 h-6" />
              </button>
            )}

            <button onClick={next} disabled={loading} title="Next">
              <SkipForwardIcon className="w-5 h-5" />
            </button>
            <div className="max-w-sm w-full">
              <Volume />
            </div>
          </div>
        </div>
        {showPlaylist && <Playlist />}
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
