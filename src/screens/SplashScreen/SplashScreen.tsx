import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { unlockNotificationAudio } from '../../services/notificationSound';
import { ASSETS } from '../../theme/tokens';

export const SplashScreen: React.FC = () => {
  const { dismissSplash } = useApp();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mutedFallbackRef = useRef(false);
  const [showPosterFallback, setShowPosterFallback] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const startPlayback = async () => {
      // Always try unmuted playback with full sound first
      try {
        video.defaultMuted = false;
        video.muted = false;
        video.volume = 1;
        await video.play();
        mutedFallbackRef.current = false;
        return;
      } catch {
        // Browser policy blocked unmuted autoplay before user interaction;
        // play muted inline until first tap unmutes it.
      }

      try {
        video.defaultMuted = true;
        video.muted = true;
        await video.play();
        if (!cancelled) {
          mutedFallbackRef.current = true;
        }
      } catch {
        // Strict iOS Low Power Mode blocked all video autoplay; show animated artwork fallback
        if (!cancelled) {
          setShowPosterFallback(true);
        }
      }
    };

    startPlayback();

    const tryUnmuteOnKey = () => {
      unlockNotificationAudio();
      if (!cancelled && video.muted) {
        video.defaultMuted = false;
        video.muted = false;
        video.volume = 1;
        mutedFallbackRef.current = false;
        video.play().catch(() => {});
      }
    };

    window.addEventListener('keydown', tryUnmuteOnKey, { passive: true, capture: true });
    return () => {
      cancelled = true;
      window.removeEventListener('keydown', tryUnmuteOnKey, { capture: true });
    };
  }, []);

  // Safety timeout so users are never trapped if playback stalls or is blocked
  useEffect(() => {
    const fallbackMs = showPosterFallback ? 2800 : 14000;
    const timer = window.setTimeout(() => {
      dismissSplash();
    }, fallbackMs);
    return () => window.clearTimeout(timer);
  }, [dismissSplash, showPosterFallback]);

  const handleDismiss = () => {
    unlockNotificationAudio();
    const video = videoRef.current;
    if (video && (video.muted || mutedFallbackRef.current) && !showPosterFallback) {
      video.defaultMuted = false;
      video.muted = false;
      video.volume = 1;
      mutedFallbackRef.current = false;
      video.play().catch(() => {});
      return;
    }
    dismissSplash();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
      onClick={handleDismiss}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleDismiss();
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
          {showPosterFallback ? (
            <motion.img
              initial={{ scale: 1 }}
              animate={{ scale: 1.04 }}
              transition={{ duration: 2.8, ease: 'easeOut' }}
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
              controls={false}
              disablePictureInPicture
              preload="auto"
              onEnded={dismissSplash}
              onError={() => setShowPosterFallback(true)}
              aria-label="Yadav Community animated Krishna flute intro"
              className="w-full h-full object-cover object-center max-md:landscape:object-contain pointer-events-none"
            />
          )}

          <span className="sr-only">Loading Yadav Community...</span>
        </div>
      </div>
    </motion.div>
  );
};
