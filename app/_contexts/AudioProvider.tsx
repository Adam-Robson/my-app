"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Howl, Howler } from "howler";

import type {
  IAudioContext,
  IAudioProviderProps,
} from "@/_types/audio-provider";

export const playlist = [
  {
    id: 0,
    title: "They Call Her Lou",
    album: "unreleased",
    artist: "lefog",
    url: "/audio/lou.mp3",
    duration: "02:35",
  },
  {
    id: 1,
    title: "Draw From the Sleep Well",
    album: "unreleased",
    artist: "lefog",
    url: "/audio/well.mp3",
    duration: "03:45",
  },
];

const AudioContext = createContext<IAudioContext | null>(null);

const formatTime = (seconds: number): string => {
  if (!seconds || !Number.isFinite(seconds) || seconds < 0) {
    return "00:00";
  }
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

export function AudioProvider({
  children,
  initialVolume = 0.5,
  initialIndex = 0,
}: IAudioProviderProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [playback, setPlayback] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(initialVolume);
  const [mute, setMute] = useState<boolean>(false);
  const [elapsed, setElapsed] = useState<string>("00:00");
  const [duration, setDuration] = useState<string>("00:00");
  const [error, setError] = useState<string | null>(null);

  const songRef = useRef<Howl | null>(null);
  const volumeSliderRef = useRef<HTMLInputElement>(null);
  const frameRef = useRef<number>(0);

  const song = useMemo(() => playlist[currentIndex], [currentIndex]);

  const initializeHowl = useCallback((songUrl: string): Howl => {
    try {
      const newSong = new Howl({
        src: [songUrl],
        html5: true,
        preload: "metadata",
        autoplay: false,
        loop: false,
        volume: volume,
        onload: () => {
          const durationSeconds = newSong.duration() as number;
          setDuration(formatTime(durationSeconds));
          setError(null);
        },
        onloaderror: (_id, error) => {
          setError(`Failed to load audio: ${error}`);
          console.error("Audio load error:", error);
        },
        onplayerror: (_id, error) => {
          setError(`Failed to play audio: ${error}`);
          console.error("Audio play error:", error);
        },
        onplay: () => setPlayback(true),
        onpause: () => setPlayback(false),
        onend: () => handleNextSong(),
        onstop: () => {
          setPlayback(false);
          setElapsed("00:00");
        },
      });
      return newSong;
    } catch (error) {
      setError(`Failed to initialize audio: ${error}`);
      console.error("Howl initialization error:", error);
      throw error;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSongChange = useCallback(
    (newIndex: number) => {
      if (newIndex < 0 || newIndex >= playlist.length) {
        setError("Invalid song index");
        return;
      }

      try {
        if (songRef.current) {
          songRef.current.unload();
        }

        setCurrentIndex(newIndex);
        const selectedSong = playlist[newIndex]?.url;

        if (!selectedSong) {
          setError("Invalid song URL");
          return;
        }

        songRef.current = initializeHowl(selectedSong);

        if (playback) {
          songRef.current.play();
        }
      } catch (error) {
        setError(`Failed to change song: ${error}`);
        console.error("Song change error:", error);
      }
    },
    [initializeHowl, playback]
  );

  const handleVolumeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(event.target.value);
      setVolume(newVolume);
      if (mute && newVolume > 0) {
        setMute(false);
      }
      if (songRef.current) {
        songRef.current.volume(newVolume);
      }
    },
    [mute]
  );

  const handleMuteChange = useCallback(() => {
    setMute((prevMute) => {
      const newMute = !prevMute;
      if (songRef.current) {
        if (newMute) {
          songRef.current.mute(true);
        } else {
          songRef.current.mute(false);
          songRef.current.volume(volume);
        }
      }
      return newMute;
    });
  }, [volume]);

  const handlePlayPause = useCallback(async () => {
    if (!songRef.current) return;

    try {
      if (Howler.ctx.state === "suspended") {
        await Howler.ctx.resume();
      }

      if (songRef.current.playing()) {
        songRef.current.pause();
      } else {
        songRef.current.play();
      }
    } catch (error) {
      setError(`Playback error: ${error}`);
      console.error("Play/Pause error:", error);
    }
  }, []);

  const handleNextSong = useCallback(() => {
    const nextIndex = currentIndex < playlist.length - 1 ? currentIndex + 1 : 0;
    handleSongChange(nextIndex);
  }, [currentIndex, handleSongChange]);

  const handlePreviousSong = useCallback(() => {
    const nextIndex = currentIndex > 0 ? currentIndex - 1 : playlist.length - 1;
    handleSongChange(nextIndex);
  }, [currentIndex, handleSongChange]);

  const volumeChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    handleVolumeChange?.(event);
    const value = ((volume ?? 0) * 100).toFixed(2);
    event.target.style.backgroundSize = `${value}% 100%`;    
  }, [volume, handleVolumeChange]);

  useEffect(() => {
    if (volumeSliderRef?.current) {
      const value = ((volume ?? 0) * 100).toFixed(2);
      volumeSliderRef.current.style.backgroundSize = `${value}% 100%`;
    }
  }, [volume, volumeSliderRef]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (songRef.current && !mute) {
        songRef.current.volume(volume);
      }
    }, 200);
    return () => clearTimeout(handler);
  }, [volume, mute]);

  useEffect(() => {
    if (!playlist.length) {
      setError("Playlist is empty");
      return;
    }

    const selectedSong = playlist[currentIndex]?.url;
    if (!selectedSong) {
      setError("Invalid song URL");
      return;
    }

    try {
      songRef.current = initializeHowl(selectedSong);
    } catch (error) {
      setError(`Initialization error: ${error}`);
    }

    return () => {
      if (songRef.current) {
        songRef.current.stop();
        songRef.current.unload();
      }
    };
  }, [currentIndex, initializeHowl]);

  useEffect(() => {
    const updateElapsed = () => {
      if (playback && songRef.current) {
        const currentSeconds = songRef.current.seek() as number;
        setElapsed(formatTime(currentSeconds));
      }
      frameRef.current = requestAnimationFrame(updateElapsed);
    };

    if (playback) {
      updateElapsed();
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [playback]);

  const contextValue = useMemo(
    () => ({
      playlist,
      song,
      currentIndex,
      playback,
      volume,
      setVolume,
      mute,
      setMute,
      handleVolumeChange,
      handleMuteChange,
      handlePlayPause,
      handleSongChange,
      handlePreviousSong,
      handleNextSong,
      volumeChangeHandler,
      elapsed,
      duration,
      error,
      volumeSliderRef,
    }),
    [
      song,
      currentIndex,
      playback,
      volume,
      mute,
      elapsed,
      duration,
      error,
      handleVolumeChange,
      handleMuteChange,
      handlePlayPause,
      handleSongChange,
      handlePreviousSong,
      handleNextSong,
      volumeChangeHandler,
    ]
  );

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
}

// Hook
export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (context === null) {
    throw new Error("useAudioContext must be used within AudioProvider");
  }
  return context;
};
