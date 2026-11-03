import { useEffect, useRef, useState } from "react";
import Countdown from "../component/Countdown";
import logo from "../assets/Grand_Theft_Auto_VI_logo_(with_gradient).svg.webp";
import backgroundMusic from "../assets/Chimbala x Omega - Se Me Nota - (Agarrame) - (Video Oficial).mp3";
import trailerPrimary from "../assets/videoplayback.mp4";
import trailerSecondary from "../assets/videoplayback (1).mp4";

function Main() {
  const audioRef = useRef(null);
  const audioButtonRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const videos = [trailerPrimary, trailerSecondary];

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return undefined;
    }

    audio.volume = 1;
    audio.loop = true;

    const syncAudioState = () => {
      setIsAudioPlaying(!audio.paused && !audio.ended);
    };

    const startPlayback = () => {
      audio
        .play()
        .then(() => {
          syncAudioState();
        })
        .catch(() => {
          syncAudioState();
        });
    };

    const autoClickAudioButton = () => {
      if (audio.paused) {
        audioButtonRef.current?.click();
      }
    };

    const handlePlay = () => {
      setIsAudioPlaying(true);
    };

    const handlePause = () => {
      setIsAudioPlaying(false);
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        startPlayback();
      }
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handlePause);
    audio.addEventListener("loadedmetadata", startPlayback);
    audio.addEventListener("canplay", startPlayback);
    audio.addEventListener("canplaythrough", startPlayback);
    audio.addEventListener("canplaythrough", autoClickAudioButton);

    audio.load();
    startPlayback();
    autoClickAudioButton();
    const autoClickTimers = [
      window.setTimeout(autoClickAudioButton, 0),
      window.setTimeout(autoClickAudioButton, 250),
      window.setTimeout(autoClickAudioButton, 1000),
    ];
    window.addEventListener("focus", startPlayback);
    window.addEventListener("pageshow", startPlayback);
    window.addEventListener("pageshow", autoClickAudioButton);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handlePause);
      audio.removeEventListener("loadedmetadata", startPlayback);
      audio.removeEventListener("canplay", startPlayback);
      audio.removeEventListener("canplaythrough", startPlayback);
      audio.removeEventListener("canplaythrough", autoClickAudioButton);
      autoClickTimers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("focus", startPlayback);
      window.removeEventListener("pageshow", startPlayback);
      window.removeEventListener("pageshow", autoClickAudioButton);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleAudioToggle = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      audio
        .play()
        .then(() => {
          setIsAudioPlaying(true);
        })
        .catch(() => {
          setIsAudioPlaying(false);
        });
      return;
    }

    audio.pause();
    setIsAudioPlaying(false);
  };

  return (
    <div className="main-page">
      <audio ref={audioRef} src={backgroundMusic} autoPlay loop preload="auto" />

      <div className="top-bar">
        <a
          className="top-bar-logo-link"
          href="https://www.rockstargames.com/fr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="main-logo" src={logo} alt="Logo GTA VI" />
        </a>
        <Countdown className="Countdown" futureDate="2026-11-19T00:00:00" />
      </div>

      <div className="audio-controls">
        <button
          ref={audioButtonRef}
          className="audio-toggle"
          type="button"
          onClick={handleAudioToggle}
        >
          {isAudioPlaying ? "Couper la musique" : "Activer la musique"}
        </button>
      </div>

      <section className="video-showcase" aria-label="Bandes-annonces GTA VI">
        <div className="video-frame">
          <video
            key={videos[currentVideoIndex]}
            className="media-video"
            src={videos[currentVideoIndex]}
            autoPlay
            muted
            playsInline
            preload="auto"
            controls={false}
            onEnded={() => {
              setCurrentVideoIndex((index) => (index + 1) % videos.length);
            }}
          />
        </div>
      </section>
    </div>
  );
}

export default Main;
