import { XIcon } from '@phosphor-icons/react';
import PlaylistList from '@/app/components/audio-player/playlist/playlist-list';
import { SongType } from '@/app/types/song';

type PlaylistCardType = {
  playlist: SongType[];
  showPlaylist: boolean;
  setShowPlaylist: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Place this component inside a wrapper that is `relative` and shares the same stacking context
 * as your audio player dock. E.g., the dock container can be `fixed bottom-6 right-6 z-40 relative`.
 */
export default function PlaylistCard({
  playlist,
  showPlaylist,
  setShowPlaylist,
}: PlaylistCardType) {
  return (
    <div
      id="player-playlist"
      role="dialog"
      aria-modal="true"
      aria-label="Playlist"
      className="pointer-events-none" // only enable pointer events when open on child nodes
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close playlist backdrop"
        onClick={() => setShowPlaylist(false)}
        className={[
          'fixed inset-0 z-[68]',
          'transition-opacity duration-300 ease-out',
          showPlaylist ? 'opacity-60 pointer-events-auto' : 'opacity-0 pointer-events-none',
          'bg-black',
        ].join(' ')}
      />

      {/* Sliding sheet (anchored to bottom-right). 
          Use `fixed` if you want it global; `absolute` if inside a relative dock. */}
      <div
        className={[
          'fixed bottom-6 right-6 z-[70]',         // or `absolute bottom-0 right-0` if inside a relative dock
          'w-[22rem] max-h-[60vh]',
          'rounded-md shadow-xl ring-1 ring-black/10',
          'bg-[var(--secondary)]/92 backdrop-blur-md',
          'flex flex-col',
          'transition-transform duration-500 ease-out',
          showPlaylist ? 'translate-x-0 pointer-events-auto' : 'translate-x-full',
        ].join(' ')}
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

        <div className="min-h-32 flex-1 overflow-y-auto p-2">
          <PlaylistList tracks={playlist} onClose={() => setShowPlaylist(false)} />
        </div>
      </div>
    </div>
  );
}
