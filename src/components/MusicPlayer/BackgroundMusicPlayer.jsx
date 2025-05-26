import { useEffect, useRef, useState } from "react";
import { playlist } from '../../constants/music.js';

const BackgroundMusicPlayer = () => {
  

  const audioRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [canPlay, setCanPlay] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);

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

    if (isTabActive) {
      audio.play().catch((err) => {
        console.warn("Play failed:", err);
      });
    } else {
      audio.pause();
    }
  }, [canPlay, isTabActive, trackIndex]);

  // Handle track end — shuffle next
  const handleEnded = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } while (nextIndex === trackIndex && playlist.length > 1);
    setTrackIndex(nextIndex);
  };

  // Render only after user interaction
  return canPlay ? (
    <audio
      ref={audioRef}
      src={playlist[trackIndex]}
      autoPlay
      onEnded={handleEnded}
      style={{ display: "none" }}
    />
  ) : null;
};

export default BackgroundMusicPlayer;
