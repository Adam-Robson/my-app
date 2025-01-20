import { useAudioContext } from "@/_contexts/AudioProvider";
import {
  FiPlay,
  FiPause,
  FiSkipBack,
  FiSkipForward,
  FiVolume,
  FiVolumeX,
  FiVolume1,
  FiVolume2,
} from "react-icons/fi";
import "./audio-controls.css";

export default function AudioControls() {
  const {
    volume,
    mute,
    playback,
    handlePlayPause,
    volumeChangeHandler,
    handleMuteChange,
    handlePreviousSong,
    handleNextSong,
    volumeSliderRef,
  } = useAudioContext() ?? {};

  return (
    <div className="audio-controls">
      <section className="song-controls">
        <button onClick={handlePreviousSong} className="control-button">
          <FiSkipBack size={32} />
          <label className="control-label">Previous</label>
        </button>

        <button onClick={handlePlayPause} className="control-button">
          {playback ? <FiPause size={36} /> : <FiPlay size={36} />}
          <label className="control-label">{playback ? "Pause" : "Play"}</label>
        </button>

        <button onClick={handleNextSong} className="control-button">
          <FiSkipForward size={32} />
          <label className="control-label">Next</label>
        </button>
      </section>

      <section className="volume-controls">
        <button
          id="mute"
          type="button"
          aria-label="Mute"
          onClick={handleMuteChange}
          className="control-button"
        >
          {mute ? (
            <FiVolumeX size={32} />
          ) : volume <= 0.2 ? (
            <FiVolume size={32} />
          ) : volume <= 0.65 ? (
            <FiVolume1 size={32} />
          ) : (
            <FiVolume2 size={32} />
          )}
          <label className="control-label">{mute ? "Unmute" : "Mute"}</label>
        </button>

        <div className="volume">
          <input
            id="volume"
            ref={volumeSliderRef}
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={volumeChangeHandler}
          />
        </div>
      </section>
    </div>
  );
}
