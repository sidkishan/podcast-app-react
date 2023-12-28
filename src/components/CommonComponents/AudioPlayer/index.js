import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
const AudioPlayer = ({ audioSrc, image, isPlaying, setIsPlaying }) => {
  const [duration, setDuration] = useState(0);
  const [currentTimestamp, setCurrentTimestamp] = useState(0);
  const [volumeLevel, setVolumeLevel] = useState(0.5);
  //const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef();

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isMuted) {
      audioRef.current.volume = volumeLevel;
    } else {
      audioRef.current.volume = 0;
    }
  }, [isMuted]);
  //use effect for handling audio timestamps
  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);
  const handleTimeUpdate = () => {
    setCurrentTimestamp(audioRef.current.currentTime);
  };
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };
  const handleEnded = () => {
    setCurrentTimestamp(audioRef.current.currentTime);
    setIsPlaying(false);
  };
  const handleAudioDuration = (e) => {
    setCurrentTimestamp(e.target.value);
    audioRef.current.currentTime = e.target.value;
  };
  const handleVolume = (e) => {
    setVolumeLevel(e.target.value);
    audioRef.current.volume = e.target.value;
  };
  const handleMuteUnmute = () => {
    if (!isMuted) {
      setIsMuted(true);
      setVolumeLevel(0);
    } else {
      setIsMuted(false);
      setVolumeLevel(0.5);
    }
  };
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };
  return (
    <div className="custom-audio-player">
      <img src={image} alt="display-pic" className="display-pic" />
      <audio src={audioSrc} ref={audioRef} />
      <p onClick={() => setIsPlaying(!isPlaying)} className="play-pause">
        {isPlaying ? <FaPause /> : <FaPlay />}
      </p>
      <div className="duration-flex">
        {/* player */}
        <p>{formatTime(currentTimestamp)}</p>
        <input
          type="range"
          value={currentTimestamp}
          onChange={handleAudioDuration}
          className="duration-input play-pause"
          max={duration}
          step={0.01}
        />
        <p>{formatTime(duration - currentTimestamp)}</p>
        <br />
        {/* volume slider */}
        <p onClick={handleMuteUnmute} className="play-pause">
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </p>
        <input
          type="range"
          value={volumeLevel}
          min={0}
          max={1}
          step={0.01}
          onChange={handleVolume}
          className="volume-input play-pause"
        />
      </div>
    </div>
  );
};
export default AudioPlayer;
