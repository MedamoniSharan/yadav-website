import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { ASSETS } from '../../theme/tokens';

export const SplashScreen: React.FC = () => {
  const { dismissSplash } = useApp();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = async () => {
      try {
        video.muted = false;
        await video.play();
      } catch {
        // Browser blocked unmuted autoplay on initial load; fall back to muted autoplay
        try {
          video.muted = true;
          await video.play();
        } catch {
          // Safety timeout below handles dismissal if autoplay is blocked
        }
      }
    };

    tryPlay();
  }, []);

  // Safety timeout so users are never trapped if playback stalls or errors
  useEffect(() => {
    const fallbackMs = videoFailed ? 2800 : 12000;
    const timer = window.setTimeout(() => {
      dismissSplash();
    }, fallbackMs);
    return () => window.clearTimeout(timer);
  }, [dismissSplash, videoFailed]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
      onClick={dismissSplash}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') dismissSplash();
      }}
      aria-label="Yadav Community Intro"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden cursor-pointer select-none"
      style={{
        background: 'linear-gradient(180deg, #014187 0%, #032B69 52%, #012856 100%)',
      }}
    >
      {/* Responsive 9:16 Intro Video Frame */}
      <div className="relative h-full w-full flex items-center justify-center md:p-4">
        <div className="relative aspect-[9/16] w-[min(100%,calc(100dvh*9/16))] md:w-[min(100%,calc(94dvh*9/16))] overflow-hidden md:rounded-3xl md:shadow-[0_24px_70px_rgba(0,0,0,0.55)] md:border md:border-[#E9A526]/35 bg-[#012856]">
          {videoFailed ? (
            <img
              src={ASSETS.krishnaSplash}
              alt="Yadav Community — Lord Krishna playing flute in Vrindavan with cows"
              className="w-full h-full object-cover object-center"
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
              className="w-full h-full object-cover object-center"
            />
          )}

          <span className="sr-only">Loading Yadav Community...</span>
        </div>
      </div>
    </motion.div>
  );
};
