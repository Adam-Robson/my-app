'use client';

import AudioPlayer from '@/components/audio-player/audio-player';
import { HeadphonesIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import '@/components/layout/footer.css';

export default function Footer() {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <footer
      className="
        max-w-screen-lg w-full mx-auto h-60 relative z-20
        flex items-center justify-between p-8
      "
    >
      <div className="text-sm/6 text-center">pnw, usa</div>

      {/* The player is fixed to the viewport to eliminate any footer-side effects */}
      <AudioPlayer showPlayer={showPlayer} setShowPlayer={setShowPlayer} />

      <div className="player-toggle-container flex flex-col items-end select-none">
        <button
          className={`
            player-toggle inline-flex items-center justify-center
            w-10 h-10 rounded-md
            ${showPlayer ? 'cursor-default pointer-events-none' : ''}
          `}
          onClick={() => setShowPlayer(true)}
          title="Show player"
          aria-pressed={showPlayer}
        >
          {/* Fix the icon’s intrinsic box so glyph changes can’t shift anything */}
          <HeadphonesIcon className="w-6 h-6" />
        </button>

        {/* Keep label space stable; fade it instead of removing text */}
        <span
          className={`
            player-toggle-label block text-sm h-4
            /* Reserve width equal to longest label: "audio" -> 5ch */
            w-[5ch] text-right leading-4 transition-opacity duration-150
            ${showPlayer ? 'opacity-0' : 'opacity-100'}
          `}
          aria-hidden={showPlayer}
        >
          audio
        </span>
      </div>
    </footer>
  );
}
