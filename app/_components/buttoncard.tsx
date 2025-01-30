'use client';
import { useState } from 'react'
import AudioPlayer from "@/_components/_audio-player/AudioPlayer"
import { FiSpeaker, FiX } from 'react-icons/fi';
import { AudioProvider } from '@/_contexts/AudioProvider';
import './buttoncard.css';

export default function Buttoncard() {
    const [isCardVisible, setCardVisible] = useState<boolean>(false);
    const title = "LE FOG";
    const onClose = () => setCardVisible(false);

  return (
    <div className="buttoncard can">
      <button 
        onClick={() => setCardVisible(true)} 
        className="toggle-player"
      >
          <FiSpeaker size={48} />
      </button>
      {isCardVisible && (
        <div className={`buttoncard-overlay ${isCardVisible ? 'visible' : ''}`}>
          <div className="buttoncard-container can">
            <button className="buttoncard-close-button" onClick={onClose}>
              <FiX size={28} />
            </button>
            <h2 className="buttoncard-title sm:block md:hidden">{title}</h2>
            <div className="buttoncard-content">
              <AudioProvider>
                <AudioPlayer />
              </AudioProvider>
            </div>
          </div>
        </div>
        )}

    </div>
  )
}
