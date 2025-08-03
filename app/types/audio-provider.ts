export interface AudioType {
  id?: string;
  title: string;
  src: string;
  artist?: string;
  album?: string;
  coverImageUrl?: string;
  duration?: number; 
}

export interface AudioProviderType {
  playback: boolean;
  volume: number;
  elapsed: number;
  duration: number;
  loading: boolean;
  error: string | null;
  currentTrack: AudioType | null;
  play: () => void;
  pause: () => void;
  stop: () => void;
  setVolume: (vol: number) => void;
  setTrack: (track: AudioType) => void;
}
