import { useEffect, useRef, useState } from "react";
import { playlist } from '../../constants/music.js';
import { Volume2, VolumeX } from "lucide-react";
import './BackgroundMusicPlayer.css';

const BackgroundMusicPlayer = () => {
  const audioRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [canPlay, setCanPlay] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  // Pick a random track initially
  useEffect(() => {
    setTrackIndex(Math.floor(Math.random() * playlist.length));
  }, []);

  // Detect user interaction once
  useEffect(() => {
    const enableAudio = () => {
      setCanPlay(true);
      document.removeEventListener("click", enableAudio);
      document.removeEventListener("keydown", enableAudio);
      document.removeEventListener("touchstart", enableAudio);
    };

    document.addEventListener("click", enableAudio);
    document.addEventListener("keydown", enableAudio);
    document.addEventListener("touchstart", enableAudio);

    return () => {
      document.removeEventListener("click", enableAudio);
      document.removeEventListener("keydown", enableAudio);
      document.removeEventListener("touchstart", enableAudio);
    };
  }, []);

  // Handle tab visibility
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabActive(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Control audio play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !canPlay) return;

    if (isTabActive && !isMuted) {
      audio.play().catch((err) => {
        console.warn("Play failed:", err);
      });
    } else {
      audio.pause();
    }
  }, [canPlay, isTabActive, trackIndex, isMuted]);

  // Handle track end — shuffle next
  const handleEnded = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } while (nextIndex === trackIndex && playlist.length > 1);
    setTrackIndex(nextIndex);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      {canPlay && (
        <>
          <audio
            ref={audioRef}
            src={playlist[trackIndex]}
            autoPlay
            onEnded={handleEnded}
            style={{ display: "none" }}
          />
          
          {/* SVG Gradients Definition */}
          <svg className="music-gradients">
            <defs>
              <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f8f9fa" stopOpacity="0.9" />
                <stop offset="25%" stopColor="#e9ecef" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#c0c0c0" stopOpacity="1" />
                <stop offset="75%" stopColor="#adb5bd" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#6c757d" stopOpacity="0.9" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Music Container - Matches Dice Style */}
          <div
            onClick={toggleMute}
            className={`music-container ${isMuted ? 'muted' : ''}`}
            title={isMuted ? "Unmute Music" : "Mute Music"}
          >
            <div className="music-icon">
              {isMuted ? (
                <VolumeX />
              ) : (
                <Volume2 />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BackgroundMusicPlayer;