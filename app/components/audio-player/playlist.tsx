'use client';

import { useAudio } from '@/app/contexts/audio-provider';
import { AudioType } from '@/app/types/audio-provider';
import clsx from 'clsx';

interface PlaylistProps {
  tracks: AudioType[];
}

export default function Playlist({ tracks }: PlaylistProps) {
  const { currentTrack, setTrack, playback } = useAudio();

  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      <h2 className="text-xl font-bold mb-2">Playlist</h2>
      <ul className="flex flex-col gap-1">
        {tracks.map((track, index) => {
          const isActive = currentTrack?.src === track.src;
          return (
            <li
              key={index}
              className={clsx(
                'p-3 rounded cursor-pointer transition-all',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              )}
              onClick={() => setTrack(track)}
            >
              {track.title}
              {isActive && playback && ' 🔊'}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
