'use client';


import { useAudio } from '@/app/contexts/audio-provider';
import Volume from '@/app/components/audio-player/volume';
import {
  PlayIcon,
  StopIcon,
  PauseIcon,
  SkipForwardIcon,
  SkipBackIcon,
  SpinnerBallIcon,
  WarningIcon
} from '@phosphor-icons/react';


export default function Control() {
  return (
    <div className="h-full w-full flex justify-center items-center bg-pink-100">
      Control
    </div>    
  )
}
