'use client';
import { ReactNode } from 'react';
import { AudioPlayerProvider } from "@/app/contexts/audio-provider";
import { ThemeProvider } from "@/app/contexts/theme-provider";
import IconProvider from "@/app/contexts/icon-provider";

export default function Providers({ 
  children 
}: { children: ReactNode }) {
  return (
      <IconProvider>
        <ThemeProvider>
          <AudioPlayerProvider>
            {children}
          </AudioPlayerProvider>
        </ThemeProvider>
      </IconProvider>
  );
}
