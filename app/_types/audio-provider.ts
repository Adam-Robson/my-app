export interface ISong {
  id: number;
  title: string;
  album: string;
  artist: string;
  url: string;
  duration: string;
}

export interface IAudioContext {
  playlist: ISong[];
  song: ISong;
  currentIndex: number;
  playback: boolean;
  handleVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMuteChange: () => void;
  handlePlayPause: () => void;
  handleSongChange: (newIndex: number) => void;
  handlePreviousSong: () => void;
  handleNextSong: () => void;
  volumeChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  elapsed: string;
  duration: string;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  mute: boolean;
  setMute: React.Dispatch<React.SetStateAction<boolean>>;
  volumeSliderRef: React.RefObject<HTMLInputElement | null>;
}

export interface IAudioProviderProps {
  children: React.ReactNode;
  initialVolume?: number;
  initialIndex?: number;
}

export interface IAudioPlayerToggleProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
