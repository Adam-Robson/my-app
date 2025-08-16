'use client';

import { useAudio } from '@/app/contexts/audio-provider';
import { SongType } from '@/app/types/song';
import type { PlaylistType } from '@/app/types/playlist';

export default function Playlist({ tracks }: PlaylistType) {
  const { setTrack, currentTrack } = useAudio();

  return (
    <div className={`
      absolute bottom-full left-0
      w-full shadow-lg rounded-xl 
      max-h-72 overflow-y-auto
      transition-all duration-400
      animate-slideUp
    `}>
      <ul className="p-4 space-y-2 text-sm">
        {tracks.map((track: SongType) => (
          <li
            key={track.id}
            className={`cursor-pointer ${currentTrack?.src === track.src ? 'text-amber-800 font-medium' : ''}`}
            onClick={() => setTrack(track)}>{track.title}</li>
        ))}
      </ul>
    </div>
  );
}
