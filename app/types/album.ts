
import { type SongType } from '@/types/song';

export interface AlbumType {
  id: string;
  title: string;
  artist: string;
  cover: string;
  year: string;
  description: string;
  songs: SongType[];
}
