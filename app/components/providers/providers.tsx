'use client';
import { ReactNode } from 'react';
import { AudioPlayerProvider } from "@/contexts/audio-provider";
import { ThemeProvider } from "@/contexts/theme-provider";
import IconProvider from "@/contexts/icon-provider";

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
