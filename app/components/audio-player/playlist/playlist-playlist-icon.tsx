
import { PlaylistIcon } from '@phosphor-icons/react';

type PlaylistIconType = {
  showPlaylist: boolean;
  setShowPlaylist: React.Dispatch<React.SetStateAction<boolean>>
  className?: string;
}

export default function PlaylistPlaylistIcon({ setShowPlaylist, showPlaylist }: PlaylistIconType) {
  return (
    <div className="flex items-center">
      <button
        onClick={() => setShowPlaylist(v => !v)}
        title={showPlaylist ? 'Hide playlist' : 'Show playlist'}
        aria-expanded={showPlaylist}
        aria-controls="player-playlist"
      >
        <PlaylistIcon
          className={`
          w-5 h-5 transition-transform 
          ${showPlaylist
              ? 'rotate-180 text-[var(--accent)]'
              : 'rotate'
            }`}
        />
      </button>
    </div>
  );
}
