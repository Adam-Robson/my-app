'use client';
import { AudioPlayerProvider } from "@/app/contexts/audio-provider";

export default function Providers({ 
  children 
}: { children: React.ReactNode }) {
  return (
    <AudioPlayerProvider>
      {children}
    </AudioPlayerProvider>
  );
}
