'use client';
import { ReactNode } from 'react';
import { AudioPlayerProvider } from "@/app/contexts/audio-provider";
import { ThemeProvider } from "@/app/contexts/theme-provider";

export default function Providers({ 
  children 
}: { children: ReactNode }) {
  return (
      <ThemeProvider>
        <AudioPlayerProvider>
          {children}
        </AudioPlayerProvider>
      </ThemeProvider>
  );
}
