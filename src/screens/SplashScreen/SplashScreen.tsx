import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { unlockNotificationAudio } from '../../services/notificationSound';
import { ASSETS } from '../../theme/tokens';
import { IgVolumeOffIcon } from '../../components/icons/AppIcons';

export const SplashScreen: React.FC = () => {
  const { dismissSplash } = useApp();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [autoplayMuted, setAutoplayMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = async () => {
      try {
        video.muted = false;
        video.volume = 1;
        await video.play();
        setAutoplayMuted(false);
      } catch {
        // Mobile browsers block unmuted autoplay on cold load; fall back to muted autoplay
        try {
          video.muted = true;
          await video.play();
          setAutoplayMuted(true);
        } catch {
          // Safety timeout handles dismissal if autoplay is fully restricted
        }
      }
    };

    tryPlay();
  }, []);

  // Safety timeout so users are never trapped if playback stalls or errors
  useEffect(() => {
    const fallbackMs = videoFailed ? 2800 : 14000;
    const timer = window.setTimeout(() => {
      dismissSplash();
    }, fallbackMs);
    return () => window.clearTimeout(timer);
  }, [dismissSplash, videoFailed]);

  const handleSplashTap = () => {
    unlockNotificationAudio();
    const video = videoRef.current;
    if (video && autoplayMuted && video.muted && !videoFailed) {
      try {
        video.muted = false;
        video.volume = 1;
        video.play().catch(() => {});
        setAutoplayMuted(false);
        return;
      } catch {
        // Fall through to dismiss if unmute fails
      }
    }
    dismissSplash();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
      onClick={handleSplashTap}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleSplashTap();
      }}
      aria-label="Yadav Community Intro"
      className="fixed inset-0 z-50 h-[100dvh] w-screen flex items-center justify-center overflow-hidden cursor-pointer select-none"
      style={{
        background: 'linear-gradient(180deg, #014187 0%, #032B69 52%, #012856 100%)',
      }}
    >
      {/* Responsive Intro Video Frame fitting all mobile portrait, mobile landscape, tablet, and desktop screens */}
      <div className="relative h-full w-full flex items-center justify-center md:p-4">
        <div className="relative w-full h-full md:w-auto md:h-[min(94dvh,880px)] md:aspect-[9/16] md:max-w-[94vw] overflow-hidden md:rounded-3xl md:shadow-[0_24px_70px_rgba(0,0,0,0.55)] md:border md:border-[#E9A526]/35 bg-[#012856]">
          {videoFailed ? (
            <img
              src={ASSETS.krishnaSplash}
              alt="Yadav Community — Lord Krishna playing flute in Vrindavan with cows"
              className="w-full h-full object-cover object-center max-md:landscape:object-contain"
            />
          ) : (
            <video
              ref={videoRef}
              src={ASSETS.introVideo}
              poster={ASSETS.krishnaSplash}
              autoPlay
              playsInline
              preload="auto"
              onEnded={dismissSplash}
              onError={() => setVideoFailed(true)}
              aria-label="Yadav Community animated Krishna flute intro"
              className="w-full h-full object-cover object-center max-md:landscape:object-contain"
            />
          )}

          {/* Subtle muted icon indicator when mobile browser blocked autoplay audio until first tap */}
          {autoplayMuted && !videoFailed && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/35 backdrop-blur-xs border border-[#E9A526]/40 flex items-center justify-center text-[#F5D58B] animate-pulse"
            >
              <IgVolumeOffIcon className="w-4 h-4" />
            </span>
          )}

          <span className="sr-only">Loading Yadav Community...</span>
        </div>
      </div>
    </motion.div>
  );
};
