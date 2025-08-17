'use client';

import { SongType } from '@/app/types/song';
import type { PlaylistType } from '@/app/types/playlist';
import { XIcon } from '@phosphor-icons/react';
import { useAudio } from '@/app/contexts/audio-provider';


export default function List({ tracks, onClose }: PlaylistType) {
  const { setTrack, currentTrack } = useAudio();

  return (
    <div
      className={[
        'absolute inset-0 z-50 rounded-md',
        'flex flex-col overflow-hidden',
        'backdrop-blur-md ring-1 ring-black/10 shadow-xl',
        'transition-all duration-300 ease-out',
        'opacity-100 scale-[1]',
      ].join(' ')}
      style={{ background: 'color-mix(in oklab, var(--secondary) 92%, transparent)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Playlist"
    >
      <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-black/10">
        <button
          type="button"
          onClick={onClose}
          title="Close playlist"
          className="p-1 rounded hover:bg-black/5 active:scale-95 transition"
          aria-label="Close playlist"
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>

      <ul className="min-h-0 flex-1 overflow-y-auto p-2 space-y-2 text-sm">
        {tracks.map((track: SongType) => (
          <li key={track.id}>
            <button
              type="button"
              onClick={() => {
                setTrack(track);
                onClose();
              }}
              className={[
                'w-full text-left px-2 py-1 rounded hover:bg-black/5 transition',
                currentTrack?.src === track.src ? 'text-amber-800 font-medium' : '',
              ].join(' ')}
              title={track.title}
            >
              {track.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
