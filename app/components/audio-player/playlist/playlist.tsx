import PlaylistList from "@/components/audio-player/playlist/playlist-list";
import PlaylistCard from "@/components/audio-player/playlist/playlist-card";
import { useAudio } from '@/contexts/audio-provider';
import { playlist as tracks } from '@/data/playlist';

export default function Playlist() {
  const { playlist, showPlaylist, setShowPlaylist } = useAudio();
  return (
    <div className="">
      <div
        className={[
          'absolute top-0 right-0 z-[60]',
          'h-full w-[22rem]',
          'rounded-md shadow-xl ring-1 ring-black/10',
          'bg-[var(--secondary)]/92 backdrop-blur-md',
          'flex flex-col',
          'transition-transform duration-500 ease-out',
          'transition-opacity duration-300 ease-out',
          showPlaylist
            ? 'translate-x-0 opacity-100 pointer-events-auto'
            : 'translate-x-full opacity-0 pointer-events-none',
        ].join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label="Playlist"
        aria-hidden={!showPlaylist}
      >
        <PlaylistCard playlist={playlist} showPlaylist={showPlaylist} setShowPlaylist={setShowPlaylist} />
        <PlaylistList tracks={tracks} onClose={() => setShowPlaylist} />
      </div>

    </div>
  )
}

