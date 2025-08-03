'use client';

import { ReactNode } from 'react';

export default function AudioPlayerAnchor({ children }: { children: ReactNode}) {
  return (
    <div className="w-full p-2 flex justify-between items-center">
      <div className="text-sm">all site content was handcrafted in the pacific northwest usa</div>
      <div className="flex items-center gap-4">{
        children
      }</div>
    </div>
    
  );
}
