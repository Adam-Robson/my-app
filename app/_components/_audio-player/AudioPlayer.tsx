import AudioControls from "./AudioControls";
import AudioPlaylist from "./AudioPlaylist";
import { useAudioContext } from "@/_contexts/AudioProvider";
import "./audio-player.css";

export default function AudioPlayer() {
  const { song, playback, elapsed, duration } = useAudioContext() ?? {};
  return (
    <div className="audio-player">
        <AudioPlaylist />
        
        <div className="now-playing">
          {playback && (
            <>
              <div className="song-title">{song.title}</div>
              <div className="song-timing">
                {elapsed} / {duration}
              </div>
            </>
          )}
        </div>
        <AudioControls />
    </div>
  );
}
