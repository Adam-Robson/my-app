export interface AudioType {
  id?: string;
  title: string;
  src: string;
  artist?: string;
  album?: string;
  cover?: string;
  duration?: string; 
}

export interface AudioProviderType {
  playback: boolean;
  volume: number;
  muted: boolean;
  toggleMute: () => void;
  next: () => void;
  previous: () => void;
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
