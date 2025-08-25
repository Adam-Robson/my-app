'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '@/contexts/audio-provider';
import { PlayIcon, PauseIcon, SkipForwardIcon, SkipBackIcon, XIcon } from '@phosphor-icons/react';
import Volume from '@/components/audio-player/volume';
import PlaylistPlaylistIcon from '@/components/audio-player/playlist/playlist-playlist-icon';
import PlaylistList from '@/components/audio-player/playlist/playlist-list';
import { AudioPlayerType } from '@/types/audio-player';

export default function AudioPlayer({ showPlayer, setShowPlayer }: AudioPlayerType) {
  const {
    playback, play, pause, next, previous,
    elapsed, duration, loading, error, trackTitle,
    safePct, formatTime, showPlaylist, setShowPlaylist, playlist,
  } = useAudio();

  return (
    // FIXED WRAPPER stays outside of any transformed element
    <div className="fixed left-1/2 bottom-6 -translate-x-1/2 z-50 w-[min(32rem,calc(100vw-13rem))] px-4">
      <div className="relative">
        {/* Backdrop */}
        <AnimatePresence>
          {showPlaylist && (
            <motion.button
              key="backdrop"
              aria-label="Close playlist backdrop"
              onClick={() => setShowPlaylist(false)}
              className="fixed inset-0 z-[49] bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showPlayer && (
            <motion.div
              key="player-box"
              className="relative z-[51] bg-[var(--primary-50)]/70 rounded-md shadow-lg backdrop-blur-md p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.6 }}
              style={{ transformOrigin: 'right bottom' }}
            >
              {/* Close player */}
              <button
                onClick={() => setShowPlayer(false)}
                title="Hide player"
                className="ml-auto opacity-80 hover:opacity-100 transition-opacity"
              >
                <XIcon className="w-5 h-5" />
              </button>

              {/* Playlist toggle */}
              <div className="relative">
                <PlaylistPlaylistIcon showPlaylist={showPlaylist} setShowPlaylist={setShowPlaylist} />
              </div>

              {/* Title + Controls */}
              <div className="relative grid grid-cols-[1fr,auto] items-center gap-3 min-w-0 max-w-2xl mx-auto w-full">
                <div
                  className="min-w-0 truncate text-sm font-medium select-none"
                  aria-live="polite"
                  title={loading ? 'Loading…' : error ? 'Playback error' : (trackTitle || 'No song loaded')}
                >
                  {trackTitle || (loading ? 'Loading…' : error ? 'Playback error' : '—')}
                </div>

                <div className="flex items-center justify-center gap-3 shrink-0">
                  <button className="w-10 h-10 inline-flex items-center justify-center rounded-md" onClick={previous} disabled={loading} title="Previous">
                    <SkipBackIcon className="w-5 h-5" />
                  </button>

                  <button className="w-10 h-10 inline-flex items-center justify-center rounded-md" onClick={playback ? pause : play} disabled={loading || !!error} title={playback ? 'Pause' : 'Play'}>
                    {playback ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                  </button>

                  <button className="w-10 h-10 inline-flex items-center justify-center rounded-md" onClick={next} disabled={loading} title="Next">
                    <SkipForwardIcon className="w-5 h-5" />
                  </button>

                  <div className="w-40">
                    <Volume />
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-2 text-xs mt-2">
                <span className="tabular-nums">{formatTime(elapsed)}</span>
                <div className="flex-grow bg-neutral-700/60 rounded h-1 overflow-hidden">
                  <div className="bg-white h-1 transition-[width] duration-300 ease-linear" style={{ width: `${safePct}%` }} />
                </div>
                <span className="tabular-nums">{formatTime(duration)}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PLAYLIST SHEET (sibling; slides over player) */}
        <AnimatePresence>
          {showPlaylist && (
            <motion.aside
              key="sheet"
              className="absolute top-0 right-0 z-[52] h-full w-[22rem] rounded-md shadow-xl ring-1 ring-black/10 bg-[var(--secondary)]/70 backdrop-blur-md flex flex-col"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ x: { type: 'tween', duration: 0.45, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.25 } }}
              role="dialog"
              aria-modal="true"
              aria-label="Playlist"
            >
              <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-black/10">
                <div className="text-sm font-medium opacity-80">Playlist</div>
                <button onClick={() => setShowPlaylist(false)} className="p-1 rounded hover:bg-black/5 active:scale-95 transition" aria-label="Close playlist">
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-2">
                <PlaylistList tracks={playlist} onClose={() => setShowPlaylist(false)} />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
