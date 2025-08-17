'use client';

import AudioPlayer from '@/app/components/audio-player/audio-player';
import { HeadphonesIcon } from '@phosphor-icons/react';
import { useState } from 'react';

import '@/app/components/layout/footer.css';


export default function Footer() {
  const [showPlayer, setShowPlayer] = useState(false);
  return (
    <footer className="max-w-screen-xl w-full mx-auto h-60 relative z-20 flex justify-between items-center p-8">
      <div className="text-sm/6 text-center">pnw, usa</div>
      <AudioPlayer showPlayer={showPlayer} setShowPlayer={setShowPlayer} />
      <div className="player-toggle-container">
        <button
          className={`
            player-toggle z-50
            ${showPlayer && 'cursor-default pointer-events-none'}
          `}
          onClick={() => setShowPlayer(true)}
          title="Show player"
        >
          <HeadphonesIcon />
        </button>
        <label className="player-toggle-label text-sm text-center">
          {showPlayer ? '' : 'audio'}
        </label>
      </div>
    </footer>
  );
}

