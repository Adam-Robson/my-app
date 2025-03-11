import AudioControls from "./AudioControls";
import AudioPlaylist from "./AudioPlaylist";
import { useAudioContext } from "@/_contexts/AudioProvider";
import "./audio-player.css";
import Image from "next/image";

export default function AudioPlayer() {
  const { song, playback, elapsed, duration } = useAudioContext() ?? {};
  return (
    <div className="audio-player">

      <Image 
        height={400}
        width={400}
        src="/favicon.svg" 
        alt="Logo" 
        className="player-logo hidden md:block mt-8 pt-1d2" 
      />
      

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
