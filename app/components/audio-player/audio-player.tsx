'use client';

import { useAudio } from '@/app/contexts/audio-provider';
import {
  PlayIcon, PauseIcon, SkipForwardIcon, SkipBackIcon, XIcon,
} from '@phosphor-icons/react';
import Volume from '@/app/components/audio-player/volume';
import PlaylistPlaylistIcon from '@/app/components/audio-player/playlist/playlist-playlist-icon';
import Playlist from '@/app/components/audio-player/playlist/playlist';
import { AudioPlayerType } from '@/app/types/audio-player';

export default function AudioPlayer({ showPlayer, setShowPlayer }: AudioPlayerType) {
  const {
    playback, play, pause, next, previous,
    elapsed, duration, loading, error, trackTitle,
    safePct, formatTime, showPlaylist, setShowPlaylist
  } = useAudio();

  if (!showPlayer) return null;

  return (
    <div
      className="
        max-w-3xl w-full mx-auto fixed
        left-1/2 bottom-6 -translate-x-1/2
        bg-[var(--primary-50)]/70 flex flex-col
        rounded-md shadow-lg backdrop-blur-md
        p-4 z-50
      "
      aria-hidden={!showPlayer}
    >
      <div
        className="
          max-w-2xl mx-auto w-full relative
          overflow-visible flex flex-col gap-2
          rounded-md p-4
        "
      >
        {/* Close */}
        <button
          onClick={() => setShowPlayer(false)}
          title="Hide player"
          className="ml-auto opacity-80 hover:opacity-100 transition-opacity"
        >
          <XIcon className="w-5 h-5" />
        </button>

        {/* Playlist toggle icon, positioned so it doesn't push layout */}
        <div className="relative">
          <PlaylistPlaylistIcon
            showPlaylist={showPlaylist}
            setShowPlaylist={setShowPlaylist}
          />
          {/* Overlay the playlist so its mount doesn't shift siblings */}
          {showPlaylist && (
            <div className="absolute z-40 top-8 right-0">
              <Playlist />
            </div>
          )}
        </div>

        {/* Title + Controls row */}
        <div
          className="
            relative grid
            grid-cols-[1fr,auto] items-center gap-3 min-w-0
          "
        >
          {/* Title (kept empty-safe and non-shifting) */}
          <div
            className="min-w-0 truncate text-sm font-medium select-none"
            aria-live="polite"
            title={
              loading ? 'Loading…' : error ? 'Playback error' : (trackTitle || 'No song loaded')
            }
          >
            {trackTitle || (loading ? 'Loading…' : error ? 'Playback error' : '—')}
          </div>

          {/* Transport + Volume with fixed button boxes */}
          <div className="flex items-center justify-center gap-3 shrink-0">
            <button
              onClick={previous}
              disabled={loading}
              title="Previous"
              className="w-10 h-10 inline-flex items-center justify-center rounded-md"
            >
              <SkipBackIcon className="w-5 h-5" />
            </button>

            <button
              onClick={playback ? pause : play}
              disabled={loading || !!error}
              title={playback ? 'Pause' : 'Play'}
              className="w-10 h-10 inline-flex items-center justify-center rounded-md"
            >
              {playback ? (
                <PauseIcon className="w-5 h-5" />
              ) : (
                <PlayIcon className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={next}
              disabled={loading}
              title="Next"
              className="w-10 h-10 inline-flex items-center justify-center rounded-md"
            >
              <SkipForwardIcon className="w-5 h-5" />
            </button>

            <div className="w-40">
              <Volume />
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 text-xs">
          <span className="tabular-nums">{formatTime(elapsed)}</span>
          <div className="flex-grow bg-neutral-700/60 rounded h-1 overflow-hidden">
            <div
              className="bg-white h-1 transition-[width] duration-300 ease-linear"
              style={{ width: `${safePct}%` }}
            />
          </div>
          <span className="tabular-nums">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
