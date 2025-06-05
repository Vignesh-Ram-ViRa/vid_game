import { useState, useRef } from "react";
import "./CenterTile.css";

const CenterTile = ({ videoSrc, images, placeholderImage }) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleClick = () => {
    if (!playing) {
      setPlaying(true);
      const video = videoRef.current;
      video.muted = true;
      video.play();
    }
    else
      setPlaying(false);
  };

  const handleVideoEnd = () => {
    setPlaying(false);
    videoRef.current.currentTime = 0;
  };

  const backgroundStyle = {
    backgroundImage: playing
      ? "none"
      : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${images[9999] || placeholderImage})`
  };

  return (
    <div
      key="center"
      onClick={handleClick}
      style={backgroundStyle}
      className={`center-tile ${playing ? "video-playing" : ""}`}
    >
      {!playing && (
        <div className="center-tile-content">
          <div>Vidhya turns</div>
          <div>30+1</div>
          <div className="viraCredit">- A Board Game By Vira </div>
          <div className="playButton">( Click to watch her life bloom ⏯️ )</div>
        </div>
      )}

      <video
        ref={videoRef}
        src={videoSrc}
        onEnded={handleVideoEnd}
        muted
        playsInline
        className={`tile-video ${playing ? "visible" : ""}`}
      />
    </div>
  );
};

export default CenterTile;