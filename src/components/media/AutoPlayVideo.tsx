import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  IgExpandIcon,
  IgPauseIcon,
  IgPlayIcon,
  IgVolumeOffIcon,
  IgVolumeOnIcon,
} from '../icons/AppIcons';

interface AutoPlayVideoProps {
  src: string;
  poster?: string;
  durationLabel?: string;
  alt: string;
  aspectClass?: string;
  onExpand?: () => void;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export const AutoPlayVideo: React.FC<AutoPlayVideoProps> = ({
  src,
  poster,
  durationLabel = '0:45',
  alt,
  aspectClass = 'aspect-[16/9]',
  onExpand,
}) => {
  const { isFeedMuted, toggleFeedMute } = useApp();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [userPaused, setUserPaused] = useState(false);
  const [progressPct, setProgressPct] = useState(0);
  const [remainingText, setRemainingText] = useState(durationLabel);
  const [flashIcon, setFlashIcon] = useState<'play' | 'pause' | null>(null);

  // Keep DOM muted attribute synced with global Instagram-style mute state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isFeedMuted;
    }
  }, [isFeedMuted]);

  // Instagram-style IntersectionObserver: auto-play in viewport, pause out of viewport
  useEffect(() => {
    const el = containerRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
            if (!userPaused) {
              video.muted = isFeedMuted;
              const playPromise = video.play();
              if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(() => {
                  // Fallback: ensure muted autoplay if browser blocked unmuted
                  video.muted = true;
                  video.play().catch(() => {});
                });
              }
              setIsPlaying(true);
            }
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: [0.15, 0.45, 0.75] },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [userPaused, isFeedMuted]);

  const triggerFlash = (state: 'play' | 'pause') => {
    setFlashIcon(state);
    setTimeout(() => {
      setFlashIcon((prev) => (prev === state ? null : prev));
    }, 550);
  };

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      setUserPaused(false);
      video.muted = isFeedMuted;
      video.play().catch(() => {});
      setIsPlaying(true);
      triggerFlash('play');
    } else {
      setUserPaused(true);
      video.pause();
      setIsPlaying(false);
      triggerFlash('pause');
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const pct = (video.currentTime / video.duration) * 100;
    setProgressPct(pct);
    const remaining = Math.max(0, Math.ceil(video.duration - video.currentTime));
    setRemainingText(formatTime(remaining));
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-xl overflow-hidden bg-[#061B46] ${aspectClass} select-none group`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted={isFeedMuted}
        loop
        playsInline
        preload="auto"
        aria-label={alt}
        onTimeUpdate={handleTimeUpdate}
        onClick={handleTogglePlay}
        className="w-full h-full object-cover cursor-pointer"
      />

      {/* Subtle bottom contrast scrim */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/55 to-transparent" />

      {/* Center Play/Pause Flash or Paused Indicator */}
      {(flashIcon || !isPlaying) && (
        <button
          type="button"
          onClick={handleTogglePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
        >
          <span className="w-12 h-12 rounded-full bg-black/55 border-2 border-white/90 text-white flex items-center justify-center backdrop-blur-xs shadow-lg transition-transform">
            {flashIcon === 'pause' || !isPlaying ? (
              <IgPlayIcon className="w-5 h-5 ml-0.5" />
            ) : (
              <IgPauseIcon className="w-5 h-5" />
            )}
          </span>
        </button>
      )}

      {/* Top-Right Expand Fullscreen Button */}
      {onExpand && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onExpand();
          }}
          aria-label="Open full video player"
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          <IgExpandIcon className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Bottom-Left Live Remaining Time */}
      <span className="pointer-events-none absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 text-white text-[11px] font-semibold tabular-nums">
        {remainingText}
      </span>

      {/* Bottom-Right Instagram-Style Mute / Unmute Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleFeedMute();
        }}
        aria-label={isFeedMuted ? 'Unmute video' : 'Mute video'}
        className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs border border-white/20 transition-transform active:scale-90 cursor-pointer"
      >
        {isFeedMuted ? <IgVolumeOffIcon className="w-4 h-4" /> : <IgVolumeOnIcon className="w-4 h-4" />}
      </button>

      {/* Bottom Progress Bar */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[3px] bg-white/25">
        <div
          className="h-full bg-[#E9A526] transition-[width] duration-150 ease-linear"
          style={{ width: `${progressPct}%` }}
        />
      </div>
    </div>
  );
};
