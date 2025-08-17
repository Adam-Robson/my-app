import List from "@/app/components/audio-player/playlist/list";
import Card from "@/app/components/audio-player/playlist/card";
import { useAudio } from '@/app/contexts/audio-provider';
import { playlist as tracks } from '@/app/data/playlist';

export default function Playlist() {
  const { playlist, showPlaylist, setShowPlaylist } = useAudio();
  return (
      <>  
      <Card playlist={playlist} showPlaylist={showPlaylist} setShowPlaylist={setShowPlaylist} />
      <List tracks={tracks} onClose={() => setShowPlaylist} />
    </> 
    )
  }

