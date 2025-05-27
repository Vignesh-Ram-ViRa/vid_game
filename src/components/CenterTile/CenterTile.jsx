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
        <>
          Vidhya turns
          <br />
          30+1
        </>
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