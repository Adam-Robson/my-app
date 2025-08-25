import { type SongType } from '@/types/song';

export type PlaylistType = {
  tracks: SongType[];
  onClose: () => void;
}
