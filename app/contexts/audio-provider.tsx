'use client';

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from 'react';
import { Howl } from 'howler';
import { AudioProviderType } from '@/app/types/audio-provider';
import { playlist as tracks } from '@/app/data/playlist';
import { SongType } from '../types/song';

const AudioPlayerContext = createContext<AudioProviderType | undefined>(undefined);

export function useAudio(): AudioProviderType {
  const context = useContext(AudioPlayerContext);
  if (!context) throw new Error('useAudio must be used within AudioPlayerProvider');
  return context;
}

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const soundRef = useRef<Howl | null>(null);

  const [playlist] = useState<SongType[]>(tracks);
  const [currentTrack, setCurrentTrack] = useState<SongType | null>(null);

  const [playback, setPlayback] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);

  // Track first user interaction (to allow audio playback)
  useEffect(() => {
    const mark = () => setUserInteracted(true);
    window.addEventListener('click', mark, { once: true });
    window.addEventListener('keydown', mark, { once: true });
    return () => {
      window.removeEventListener('click', mark);
      window.removeEventListener('keydown', mark);
    };
  }, []);

  useEffect(() => {
    const savedVolume = parseFloat(localStorage.getItem('volume') || '1');
    const savedIndex = parseInt(localStorage.getItem('trackIndex') || '0', 10);

    if (!isNaN(savedVolume)) setVolume(savedVolume);
    if (!isNaN(savedIndex) && playlist[savedIndex]) {
      setCurrentTrack(playlist[savedIndex]);
    } else if (playlist.length > 0) {
      setCurrentTrack(playlist[0]);
    }
  }, [playlist]);

  const loadTrack = (track: SongType) => {
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.unload();
    }

    setLoading(true);

    const sound = new Howl({
      src: [track.src],
      html5: true,
      autoplay: false,
      volume,
      mute: muted,
      onload: () => {
        setDuration(sound.duration());
        setLoading(false);
        setError(null);
      },
      onplay: () => {
        setPlayback(true);

        // Start updating elapsed time immediately
        const update = () => {
          if (sound.playing()) {
            setElapsed(sound.seek() as number);
            requestAnimationFrame(update);
          }
        };
        requestAnimationFrame(update);
      },
      onpause: () => {
        setPlayback(false);
      },
      onend: () => {
        setPlayback(false);
        setElapsed(0);
        next(); // advance to next track
      },
      onloaderror: (_, err) => {
        setError(`Error loading: ${err}`);
        setLoading(false);
      },
    });

    soundRef.current = sound;
    sound.play();
  };

  const setTrack = (track: SongType, autoPlay = false) => {
    setCurrentTrack(track);
    const index = playlist.findIndex(t => t.src === track.src);
    if (index >= 0) localStorage.setItem('trackIndex', String(index));

    loadTrack(track);
    if (autoPlay && userInteracted) soundRef.current?.play();
  };

  const play = () => {
    if (!userInteracted || !currentTrack) return;
    if (!soundRef.current) loadTrack(currentTrack);
    soundRef.current?.play();
    setPlayback(true);
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

  const toggleMute = () => {
    setMuted(!muted);
    soundRef.current?.mute(!muted);
  };

  const updateVolume = (vol: number) => {
    setVolume(vol);
    soundRef.current?.volume(vol);
    if (vol === 0) {
      setMuted(true);
      soundRef.current?.mute(true);
    } else if (muted) {
      setMuted(false);
      soundRef.current?.mute(false);
    }
    localStorage.setItem('volume', String(vol));
  };

  const normalizedTrack = useMemo(() => {
    if (!currentTrack) return undefined;
    if (typeof currentTrack === 'object' && 'title' in currentTrack) {
      return currentTrack as { title?: string };
    }
    if (typeof currentTrack === 'number') return playlist?.[currentTrack];
    return undefined;
  }, [currentTrack, playlist]);

  const trackTitle = normalizedTrack?.title ?? '';

  const safePct = useMemo(() => {
    const d = Number(duration);
    const e = Number(elapsed);
    if (!Number.isFinite(d) || d <= 0 || !Number.isFinite(e) || e < 0) return 0;
    return Math.max(0, Math.min(100, (e / d) * 100));
  }, [elapsed, duration]);

  useEffect(() => {
    let frameId: number;

    const trackTime = () => {
      if (soundRef.current?.playing()) {
        setElapsed(soundRef.current.seek() as number);
        frameId = requestAnimationFrame(trackTime);
      }
    };

    if (playback) frameId = requestAnimationFrame(trackTime);
    return () => cancelAnimationFrame(frameId);
  }, [playback]);

  const getIndex = () => currentTrack ? playlist.findIndex(t => t.src === currentTrack.src) : -1;

  const next = () => {
    const i = getIndex();
    if (i < 0 || playlist.length === 0) return;
    const nextTrack = playlist[(i + 1) % playlist.length];
    setTrack(nextTrack, true);
  };

  const previous = () => {
    const i = getIndex();
    if (i < 0 || playlist.length === 0) return;
    const prevTrack = playlist[(i - 1 + playlist.length) % playlist.length];
    setTrack(prevTrack, true);
  };

  const value: AudioProviderType = {
    playlist,
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
    setVolume: updateVolume,
    normalizedTrack: () => normalizedTrack ?? {},
    trackTitle,
    safePct: () => safePct
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
}
