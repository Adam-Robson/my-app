'use client';

import AudioPlayer from '@/app/components/audio-player/audio-player';
import { HeadphonesIcon } from '@phosphor-icons/react';
import { useState } from 'react';

export default function Footer() {
  const [showPlayer, setShowPlayer] = useState(false);
  return (
    <footer className="h-60 w-full relative z-20 flex justify-between items-end px-4 py-8">
      <div className="">pnw, usa</div>
      <AudioPlayer showPlayer={showPlayer} setShowPlayer={setShowPlayer} />
      {!showPlayer && (
        <button
          className="fixed bottom-4 right-4 z-50 bg-neutral-800 text-white p-2 rounded-full shadow-lg hover:bg-neutral-700"
          onClick={() => setShowPlayer(true)}
          title="Show player"
        >
          <HeadphonesIcon size={18} />
        </button>
      )}
    </footer>
  );
}
  
