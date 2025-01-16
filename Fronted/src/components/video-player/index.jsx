import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";

function VideoPlayer({
  width = "100%",
  height = "100%",
  url,
  onProgressUpdate,
  progressData,
}) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const handleFullScreen = useCallback(() => {
    if (!isFullScreen) {
      if (playerContainerRef.current.requestFullscreen) {
        playerContainerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  }, [isFullScreen]);

  function handleMouseMove() {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
  }

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  useEffect(() => {
    if (played === 1) {
      onProgressUpdate({
        ...progressData,
        progressValue: played,
      });
    }
  }, [played]);

  return (
    <div
      ref={playerContainerRef}
      style={{ width, height }}
      className="video-player-container"
      onMouseMove={handleMouseMove}
    >
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={({ played }) => setPlayed(played)}
        width="100%"
        height="100%"
      />
      {showControls && (
        <div className="controls">
          <Button onClick={() => setPlaying(!playing)}>
            {playing ? <Pause /> : <Play />}
          </Button>
          <Button onClick={() => setMuted(!muted)}>
            {muted ? <VolumeX /> : <Volume2 />}
          </Button>
          <Slider
            value={volume}
            onChange={(v) => setVolume(v)}
            max={1}
            step={0.1}
          />
          <Slider
            value={played}
            onChange={(value) => {
              playerRef.current.seekTo(value);
            }}
            max={1}
            step={0.01}
          />
          <Button onClick={handleFullScreen}>
            {isFullScreen ? <Minimize /> : <Maximize />}
          </Button>
        </div>
      )}
    </div>
  );
}

// Define PropTypes
VideoPlayer.propTypes = {
  width: PropTypes.string, // Optional string for video width
  height: PropTypes.string, // Optional string for video height
  url: PropTypes.string.isRequired, // Required string for video URL
  onProgressUpdate: PropTypes.func.isRequired, // Required function for progress updates
  progressData: PropTypes.object, // Optional object for progress data
};

export default VideoPlayer;
