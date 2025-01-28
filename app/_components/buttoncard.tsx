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
    <div className="buttoncard">
      <button 
        onClick={() => setCardVisible(true)} 
        className="toggle-player"
      >
          <FiSpeaker size={48} />
      </button>
      {isCardVisible && (
        <div className={`card-overlay ${isCardVisible ? 'visible' : ''}`}>
          <div className="card-container">
            <button className="card-close-button" onClick={onClose}>
              <FiX size={28} />
            </button>
            <h2 className="card-title">{title}</h2>
            <div className="card-content">
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
