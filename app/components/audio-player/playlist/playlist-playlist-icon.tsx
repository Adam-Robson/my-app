
import { PlaylistIcon } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

type PlaylistIconType = {
  showPlaylist: boolean;
  setShowPlaylist: React.Dispatch<React.SetStateAction<boolean>>
  className?: string;
}

export default function PlaylistPlaylistIcon({ setShowPlaylist, showPlaylist }: PlaylistIconType) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.2 }}
      onClick={() => setShowPlaylist(v => !v)}
      title={showPlaylist ? 'Hide playlist' : 'Show playlist'}
      aria-expanded={showPlaylist}
      aria-controls="player-playlist"
    >
      <PlaylistIcon className={`w-5 h-5 transition-transform ${showPlaylist ? 'rotate-180 text-[var(--accent)]' : ''}`} />
    </motion.button>
  );
}
