'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import { Howl } from 'howler';
import { AudioType, AudioProviderType } from '@/app/types/audio-provider';

const AudioPlayerContext = createContext<AudioProviderType | undefined>(undefined);

export function useAudio(): AudioProviderType {
  const context = useContext(AudioPlayerContext);
  if (!context) throw new Error('useAudio must be used within AudioPlayerProvider');
  return context;
};

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const soundRef = useRef<Howl | null>(null);
  
  const [playback, setPlayback] = useState(false);
  const [volume, setVolumeState] = useState(1);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<AudioType | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setTrack = (track: AudioType) => {
    setCurrentTrack(track);
  };

  const play = () => {
    if (!soundRef.current && currentTrack) {
      loadAndPlay(currentTrack);
    } else {
      soundRef.current?.play();
      setPlayback(true);
    }
  };

  const pause = () => {
    soundRef.current?.pause();
    setPlayback(false);
  };

  const stop = () => {
    soundRef.current?.stop();
    setPlayback(false);
    setElapsed(0);
  };

  const setVolume = (vol: number) => {
    setVolumeState(vol);
    soundRef.current?.volume(vol);
  };

  const loadAndPlay = (track: AudioType) => {
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.unload();
    }

    setLoading(true);
    const sound = new Howl({
      src: [track.src],
      html5: true,
      volume,
      onload: () => {
        setDuration(sound.duration());
        setLoading(false);
        setError(null);
      },
      onplay: () => {
        setPlayback(true);
      },
      onpause: () => {
        setPlayback(false);
      },
      onend: () => {
        setPlayback(false);
        setElapsed(0);
      },
      onloaderror: (_, err) => {
        setError(`Error loading: ${err}`);
        setLoading(false);
      },
    });

    soundRef.current = sound;
    sound.play();
  };

  // Auto-load new track when set
  useEffect(() => {
    if (currentTrack) {
      loadAndPlay(currentTrack);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

  // Track elapsed time
  useEffect(() => {
    let animationFrameId: number;

    const updateElapsed = () => {
      const sound = soundRef.current;
      if (sound?.playing()) {
        setElapsed(sound.seek() as number);
        animationFrameId = requestAnimationFrame(updateElapsed);
      }
    };

    if (playback) {
      animationFrameId = requestAnimationFrame(updateElapsed);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [playback]);

  const value: AudioProviderType = {
    playback,
    volume,
    elapsed,
    duration,
    loading,
    error,
    currentTrack,
    setTrack,
    play,
    pause,
    stop,
    setVolume,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
