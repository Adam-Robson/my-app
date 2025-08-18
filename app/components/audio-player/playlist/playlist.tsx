import PlaylistList from "@/app/components/audio-player/playlist/playlist-list";
import PlaylistCard from "@/app/components/audio-player/playlist/playlist-card";
import { useAudio } from '@/app/contexts/audio-provider';
import { playlist as tracks } from '@/app/data/playlist';

export default function Playlist() {
  const { playlist, showPlaylist, setShowPlaylist } = useAudio();
  return (
    <>
      <PlaylistCard playlist={playlist} showPlaylist={showPlaylist} setShowPlaylist={setShowPlaylist} />
      <PlaylistList tracks={tracks} onClose={() => setShowPlaylist} />
    </>
  )
}

