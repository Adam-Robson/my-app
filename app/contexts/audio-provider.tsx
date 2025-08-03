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
import { playlist as tracks } from '@/app/data/playlist';

const AudioPlayerContext = createContext<AudioProviderType | undefined>(undefined);

export function useAudio(): AudioProviderType {
  const context = useContext(AudioPlayerContext);
  if (!context) throw new Error('useAudio must be used within AudioPlayerProvider');
  return context;
};

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const soundRef = useRef<Howl | null>(null);
  
  const [playlist] = useState<AudioType[]>(tracks)
  const [playback, setPlayback] = useState(false);
  const [volume, setVolumeState] = useState(1);
  const [muted, setMuted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<AudioType | null>(null);
  const [interaction, setInteraction] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('volume', String(volume));
  }, [volume]);

  useEffect(() => {
    const index = currentTrack
      ? tracks.findIndex((t) => t.src === currentTrack.src)
      : -1;
    if (index >= 0) {
      localStorage.setItem('trackIndex', String(index));
    }
  }, [currentTrack]);
  
  useEffect(() => {
    const mark = () => setInteraction(true);

    window.addEventListener('click', mark, { once: true });
    window.addEventListener('keydown', mark, { once: true });

    return () => {
      window.removeEventListener('click', mark);
      window.removeEventListener('keydown', mark);
    };
  }, []);

  // ensure track is always set
  useEffect(() => {
    if (!currentTrack && playlist.length > 0) {
      setTrack(playlist[0]);
    } 
  }, [currentTrack, playlist]);

  const setTrack = (track: AudioType) => {
    setCurrentTrack(track);
  };
  
  const getCurrentIndex = () => {
    return currentTrack ? playlist.findIndex(t => t.src === currentTrack.src) : -1;
  }
  const play = () => {
    if (!interaction) return;

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
    if (vol === 0 && !muted) {
      setMuted(true);
      soundRef.current?.mute(true);
    } else if (vol > 0 && muted) {
      setMuted(false);
      soundRef.current?.mute(false);
    }
  };
  
  const toggleMute = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    soundRef.current?.mute(newMuted);
  };
  
  const next = () => {
    const index = getCurrentIndex();
    if (playlist.length === 0) return;

    const nextIndex = (index + 1) % playlist.length;
    setCurrentTrack(playlist[nextIndex]);
  };

  const previous = () => {
    const index = getCurrentIndex();
    if (playlist.length === 0) return;

    const prevIndex = (index - 1 + playlist.length) % playlist.length;
    setCurrentTrack(playlist[prevIndex]);
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
        next();
      },
      onloaderror: (_, err) => {
        setError(`Error loading: ${err}`);
        setLoading(false);
      },
    });

    soundRef.current = sound;
    sound.play();
  };
  
  // load the volume and the current track from local storage is saved
  useEffect(() => {
    const savedVolume = localStorage.getItem('volume');
    const savedIndex = localStorage.getItem('trackIndex');

    if (savedVolume !== null) {
      const vol = parseFloat(savedVolume);
      setVolumeState(vol);
    }

    if (savedIndex !== null) {
      const index = parseInt(savedIndex, 10);
      if (!isNaN(index) && tracks[index]) {
        setCurrentTrack(tracks[index]);
      }
    }
  }, []);

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
    muted,
    toggleMute,
    next,
    previous,
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
