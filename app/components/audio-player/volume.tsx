import { useAudio } from '@/app/contexts/audio-provider';
import {
  SpeakerSimpleNoneIcon,
  SpeakerSimpleLowIcon,
  SpeakerSimpleHighIcon,
  SpeakerSimpleXIcon,
} from '@phosphor-icons/react';

export default function Volume() {
  const { volume, setVolume, muted, toggleMute } = useAudio();

  const getIcon = () => {
    if (muted || volume === 0) return <SpeakerSimpleXIcon />;
    if (volume < 0.4) return <SpeakerSimpleLowIcon />;
    if (volume < 0.7) return <SpeakerSimpleHighIcon />;
    return <SpeakerSimpleNoneIcon />;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(event.target.value));

  };

  return (
    <div className="max-w-md w-full flex items-center flex-end gap-3 mt-4">
      <button
        onClick={toggleMute}
        className="text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
        aria-label="Toggle Mute"
      >
        {getIcon()}
      </button>

      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={muted ? 0 : volume}
        onChange={handleChange}
        className="
          appearance-none h-2 w-full rounded-full
          bg-[var(--platinum)] accent-[var(--accent)]
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:bg-[var(--accent)]
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:cursor-pointer
          transition-all
        "
      />
    </div>
  );
}
