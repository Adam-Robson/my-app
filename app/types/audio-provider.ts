import { SongType } from "./song";

export interface AudioProviderType {
  playlist: SongType[];
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
  currentTrack: SongType | null;
  play: () => void;
  pause: () => void;
  stop: () => void;
  setVolume: (vol: number) => void;
  setTrack: (track: SongType) => void;
}
