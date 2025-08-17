
import { XIcon } from '@phosphor-icons/react';
import List from '@/app/components/audio-player/playlist/list';
import { SongType } from '@/app/types/song';

type PlaylistCardType = {
  playlist: SongType[];
  showPlaylist: boolean;
  setShowPlaylist: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Card({ playlist, showPlaylist, setShowPlaylist, }: PlaylistCardType) {
  return (
    <>
      {showPlaylist && (
        <div
          id="player-playlist"
          role="dialog"
          aria-modal="true"
          aria-label="Playlist"
          className="absolute inset-0 z-[70]"
        >
          <button
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowPlaylist(false)}
            aria-label="Close playlist backdrop"
            tabIndex={-1}
          />

          <div className="relative h-full w-full p-2">
            <div
              className="
              h-full w-full rounded-md shadow-xl ring-1 ring-black/10
              bg-[var(--secondary)]/92 backdrop-blur-md
              flex flex-col
            "
            >
              <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-black/10">
                <div className="text-sm font-medium opacity-80">Playlist</div>
                <button
                  onClick={() => setShowPlaylist(false)}
                  className="p-1 rounded hover:bg-black/5 active:scale-95 transition"
                  aria-label="Close playlist"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-2">
                <List tracks={playlist} onClose={() => setShowPlaylist(false)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
