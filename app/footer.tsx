'use client';

import AudioPlayer from '@/app/components/audio-player/audio-player';
import { HeadphonesIcon } from '@phosphor-icons/react';
import { useState } from 'react';

export default function Footer() {
  const [showPlayer, setShowPlayer] = useState(false);
  return (
    <footer className="max-w-screen-xl w-full h-60 relative z-20 flex justify-between items-center p-8">
      <div className="">pnw, usa</div>
      <AudioPlayer showPlayer={showPlayer} setShowPlayer={setShowPlayer} />
        <button
          className={`z-50 p-2 rounded-full shadow-lg ${showPlayer ? 'cursor-default pointer-events-none' : 'opacity-100'}`}
          onClick={() => setShowPlayer(true)}
          title="Show player"
        >
          <HeadphonesIcon size={18} />
        </button>
    </footer>
  );
}
  
