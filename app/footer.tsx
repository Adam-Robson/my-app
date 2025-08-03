'use client';

import AudioPlayer from '@/app/components/audio-player/audio-player';

export default function Footer() {
  
  return (
    <footer className="h-60 w-full relative z-20 flex justify-between items-end px-4 py-8">
      <div className="">pnw, usa</div>
      <AudioPlayer />
    </footer>
  );
}
  
