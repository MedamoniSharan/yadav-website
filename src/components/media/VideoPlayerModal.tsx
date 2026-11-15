import React, { useEffect, useState } from 'react';
import { ExternalLink, Pause, Play, Volume2, VolumeX, X } from 'lucide-react';
import { SafeImage, VerifiedBadge } from '../common/KrishnaDecorations';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  thumbnailUrl: string;
  videoUrl: string;
  durationLabel?: string;
  onOpenBusiness?: () => void;
}

function parseDurationSeconds(label = '0:45'): number {
  const parts = label.split(':').map(Number);
  if (parts.length === 2 && !Number.isNaN(parts[0]) && !Number.isNaN(parts[1])) {
    return parts[0] * 60 + parts[1];
  }
  return 45;
}

function formatSec(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  thumbnailUrl,
  videoUrl,
  durationLabel = '0:45',
  onOpenBusiness,
}) => {
  const totalSeconds = parseDurationSeconds(durationLabel);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const isRealVideoFile =
    videoUrl.startsWith('blob:') ||
    videoUrl.startsWith('data:video') ||
    /\.(mp4|webm|mov)(\?|$)/i.test(videoUrl);

  useEffect(() => {
    if (!isOpen) {
      setElapsed(0);
      setIsPlaying(true);
      return;
    }
    if (isRealVideoFile || !isPlaying) return;

    const timer = setInterval(() => {
      setElapsed((prev) => (prev + 1 >= totalSeconds ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, isPlaying, isRealVideoFile, totalSeconds]);

  if (!isOpen) return null;

  const progressPct = totalSeconds > 0 ? Math.min(100, (elapsed / totalSeconds) * 100) : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Video player: ${title}`}
    >
      <div className="relative w-full max-w-lg rounded-2xl overflow-hidden bg-[#061B46] border border-[#E9A526]/40 shadow-2xl">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#061B46]/95 border-b border-white/10">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-semibold text-white truncate">{title}</h3>
              <VerifiedBadge size={14} />
            </div>
            <p className="text-xs text-[#F5D58B]/85 truncate">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Viewport */}
        <div className="relative aspect-video bg-black overflow-hidden">
          {isRealVideoFile ? (
            <video
              src={videoUrl}
              poster={thumbnailUrl}
              controls
              autoPlay
              playsInline
              muted={isMuted}
              className="w-full h-full object-contain"
            />
          ) : (
            <>
              <SafeImage
                src={thumbnailUrl}
                alt={title}
                className={`w-full h-full object-cover transition-transform duration-[4000ms] ease-linear ${
                  isPlaying ? 'scale-105' : 'scale-100'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
                className="absolute inset-0 flex items-center justify-center group cursor-pointer"
              >
                <span className="w-16 h-16 rounded-full bg-black/55 border-2 border-white/90 text-white flex items-center justify-center backdrop-blur-sm transition-transform group-hover:scale-105">
                  {isPlaying ? (
                    <Pause className="w-7 h-7 fill-white" />
                  ) : (
                    <Play className="w-7 h-7 fill-white ml-1" />
                  )}
                </span>
              </button>

              {/* Simulated interactive timeline */}
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-6 bg-gradient-to-t from-black/85 to-transparent">
                <div
                  className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden mb-2 cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                    setElapsed(Math.round(ratio * totalSeconds));
                  }}
                >
                  <div
                    className="h-full bg-[#E9A526] transition-all duration-300"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsPlaying((p) => !p)}
                      className="hover:text-[#F5D58B] cursor-pointer"
                    >
                      {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <span className="tabular-nums text-white/85">
                      {formatSec(elapsed)} / {durationLabel}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMuted((m) => !m)}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    className="p-1 hover:text-[#F5D58B] cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer CTA */}
        {onOpenBusiness && (
          <div className="px-4 py-3 bg-[#FFF8ED] flex items-center justify-between gap-3">
            <span className="text-xs font-medium text-[#061B46] truncate">
              Discover member offers &amp; business details
            </span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenBusiness();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-royal-pill text-white text-xs font-semibold shrink-0 cursor-pointer hover:brightness-110"
            >
              <span>Visit Business</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
