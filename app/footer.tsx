'use client';

import AudioPlayer from '@/app/components/audio-player/audio-player';

export default function Footer() {
  
  return (
    <footer className="h-60 w-full relative p-2 z-20 flex justify-between items-end my-6 bg-slate-200">
      <div className="">pnw, usa</div>
      <AudioPlayer />
    </footer>
  );
}
  
