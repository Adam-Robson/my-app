import Controls from "@/app/components/audio-player/controls";
import Playlist from "@/app/components/audio-player/playlist";
import { tracks } from "@/app/data/tracks";

export default function AudioPlayer() {
  return (
    <div>
      <Playlist tracks={tracks} />
      <Controls />
    </div>
  );
}
