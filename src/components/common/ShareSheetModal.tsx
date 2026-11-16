import React, { useEffect, useState } from 'react';
import { SafeImage } from './KrishnaDecorations';
import { IgCheckIcon, IgCloseIcon, IgSharePlaneIcon } from '../icons/AppIcons';

export interface SharePayload {
  postId?: string;
  title: string;
  subtitle?: string;
  text: string;
  image?: string;
  url?: string;
}

interface ShareSheetModalProps {
  payload: SharePayload | null;
  onClose: () => void;
  onCompleteShare: (channelLabel: string, postId?: string, customToast?: string) => void;
}

export const ShareSheetModal: React.FC<ShareSheetModalProps> = ({
  payload,
  onClose,
  onCompleteShare,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [payload]);

  useEffect(() => {
    if (!payload) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [payload, onClose]);

  if (!payload) return null;

  const baseUrl =
    payload.url ||
    (typeof window !== 'undefined' ? window.location.href : 'https://yadav-community.app');
  const snippet =
    payload.text.length > 140 ? `${payload.text.slice(0, 137)}...` : payload.text;
  const formattedMessage = `${payload.title} — ${snippet}\n\nJoin Yadav Community: ${baseUrl}`;
  const encodedFull = encodeURIComponent(formattedMessage);
  const encodedUrl = encodeURIComponent(baseUrl);
  const encodedShort = encodeURIComponent(`${payload.title}: ${snippet}`);
  const encodedSubject = encodeURIComponent(`Yadav Community · ${payload.title}`);

  const copyToClipboard = (textToCopy: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).catch(() => {});
    }
  };

  const handleCopyLink = () => {
    copyToClipboard(baseUrl);
    setCopied(true);
    onCompleteShare('Copy Link', payload.postId, 'Link copied to clipboard!');
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handleInstagramShare = () => {
    copyToClipboard(formattedMessage);
    onCompleteShare(
      'Instagram',
      payload.postId,
      'Caption & link copied! Paste in Instagram DM, Story, or Post.',
    );
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: `Yadav Community — ${payload.title}`,
          text: snippet,
          url: baseUrl,
        });
        onCompleteShare('System Share', payload.postId, 'Shared successfully!');
        onClose();
        return;
      } catch (err) {
        if ((err as Error)?.name === 'AbortError') return;
      }
    }
    copyToClipboard(formattedMessage);
    onCompleteShare('Share', payload.postId, 'Post details & link copied for sharing!');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/55 backdrop-blur-xs sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Share post"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md bg-[#FFF8ED] rounded-t-3xl sm:rounded-3xl border border-[#E9A526]/45 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle (Mobile) + Header */}
        <div className="bg-krishna-header text-white px-5 pt-2.5 pb-4">
          <div className="w-10 h-1 rounded-full bg-white/30 mx-auto mb-3 sm:hidden" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IgSharePlaneIcon className="w-5 h-5 text-[#F5D58B]" />
              <h2 className="font-display text-xl font-semibold text-[#F5D58B] tracking-wide">
                Share with Community
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close share options"
              className="min-w-[36px] min-h-[36px] rounded-full flex items-center justify-center text-white/80 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <IgCloseIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Post / Discussion Preview */}
          <div className="bg-white rounded-2xl border border-[#EADBC2] p-3 flex items-start gap-3 shadow-xs">
            {payload.image && (
              <SafeImage
                src={payload.image}
                alt={payload.title}
                className="w-11 h-11 rounded-full object-cover border border-[#E9A526]/60 shrink-0"
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#061B46] truncate">{payload.title}</p>
              {payload.subtitle && (
                <p className="text-[11px] text-[#667085] truncate">{payload.subtitle}</p>
              )}
              <p className="text-xs text-[#1D2939] mt-1 line-clamp-2 leading-relaxed">
                {payload.text}
              </p>
            </div>
          </div>

          {/* App Share Targets Grid (WhatsApp, Instagram, Messages, Telegram, Facebook, X, Email, Copy Link) */}
          <div className="grid grid-cols-4 gap-y-4 gap-x-2">
            {/* WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodedFull}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onCompleteShare('WhatsApp', payload.postId, 'Opening WhatsApp share...')}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <span className="w-13 h-13 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-sm group-hover:scale-105 group-active:scale-95 transition-transform">
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" aria-hidden="true">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm5.76 14.01c-.24.68-1.41 1.3-1.95 1.38-.5.07-1.13.1-1.83-.12-.42-.13-.96-.31-1.66-.61-2.92-1.26-4.82-4.21-4.96-4.41-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.77-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2 .89 2.15.07.15.12.32.02.51-.1.19-.15.32-.29.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.45.29.15.46.12.63-.07.17-.19.72-.85.92-1.14.19-.29.39-.24.66-.15.27.1 1.71.81 2 .95.29.15.48.22.56.34.07.12.07.7-.17 1.38Z" />
                </svg>
              </span>
              <span className="text-[11px] font-medium text-[#061B46] text-center leading-tight">
                WhatsApp
              </span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleInstagramShare}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <span
                className="w-13 h-13 rounded-2xl text-white flex items-center justify-center shadow-sm group-hover:scale-105 group-active:scale-95 transition-transform"
                style={{
                  background:
                    'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </span>
              <span className="text-[11px] font-medium text-[#061B46] text-center leading-tight">
                Instagram
              </span>
            </a>

            {/* Messages (SMS) */}
            <a
              href={`sms:?body=${encodedFull}`}
              onClick={() => onCompleteShare('Messages', payload.postId, 'Opening Messages app...')}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <span className="w-13 h-13 rounded-2xl bg-[#34C759] text-white flex items-center justify-center shadow-sm group-hover:scale-105 group-active:scale-95 transition-transform">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
                  <path d="M12 3C6.48 3 2 6.82 2 11.53c0 2.57 1.35 4.88 3.51 6.45-.18 1.24-.73 2.51-1.59 3.35-.14.14-.04.38.15.36 1.8-.18 3.4-.84 4.53-1.64 1.07.31 2.21.48 3.4.48 5.52 0 10-3.82 10-8.53C22 6.82 17.52 3 12 3Z" />
                </svg>
              </span>
              <span className="text-[11px] font-medium text-[#061B46] text-center leading-tight">
                Messages
              </span>
            </a>

            {/* Telegram */}
            <a
              href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedShort}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onCompleteShare('Telegram', payload.postId, 'Opening Telegram share...')}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <span className="w-13 h-13 rounded-2xl bg-[#229ED9] text-white flex items-center justify-center shadow-sm group-hover:scale-105 group-active:scale-95 transition-transform">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
                  <path d="M21.43 4.35a1.2 1.2 0 0 0-1.22-.18L2.88 11.15a1.1 1.1 0 0 0 .06 2.06l4.38 1.45 1.72 5.36a.9.9 0 0 0 1.47.4l2.53-2.37 4.46 3.29a1.2 1.2 0 0 0 1.88-.72l2.63-15.17a1.2 1.2 0 0 0-.58-1.1ZM9.56 14.3l-.55 3.63-1.15-3.58 9.9-6.27-8.2 6.22Z" />
                </svg>
              </span>
              <span className="text-[11px] font-medium text-[#061B46] text-center leading-tight">
                Telegram
              </span>
            </a>

            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedShort}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onCompleteShare('Facebook', payload.postId, 'Opening Facebook share...')}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <span className="w-13 h-13 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center shadow-sm group-hover:scale-105 group-active:scale-95 transition-transform">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
                  <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.87.24-1.46 1.5-1.46H16.7V4.95c-.3-.04-1.33-.13-2.53-.13-2.5 0-4.22 1.53-4.22 4.33V11H7.2v3h2.75v8h3.55Z" />
                </svg>
              </span>
              <span className="text-[11px] font-medium text-[#061B46] text-center leading-tight">
                Facebook
              </span>
            </a>

            {/* X / Twitter */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodedShort}&url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onCompleteShare('X', payload.postId, 'Opening X share...')}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <span className="w-13 h-13 rounded-2xl bg-[#111827] text-white flex items-center justify-center shadow-sm group-hover:scale-105 group-active:scale-95 transition-transform">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
                </svg>
              </span>
              <span className="text-[11px] font-medium text-[#061B46] text-center leading-tight">
                X
              </span>
            </a>

            {/* Email */}
            <a
              href={`mailto:?subject=${encodedSubject}&body=${encodedFull}`}
              onClick={() => onCompleteShare('Email', payload.postId, 'Opening email draft...')}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <span className="w-13 h-13 rounded-2xl bg-[#0B347A] text-white flex items-center justify-center shadow-sm group-hover:scale-105 group-active:scale-95 transition-transform">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2.5" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </span>
              <span className="text-[11px] font-medium text-[#061B46] text-center leading-tight">
                Email
              </span>
            </a>

            {/* Copy Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <span
                className={`w-13 h-13 rounded-2xl flex items-center justify-center shadow-sm border transition-all group-hover:scale-105 group-active:scale-95 ${
                  copied
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-[#061B46] border-[#E9A526]/60'
                }`}
              >
                {copied ? (
                  <IgCheckIcon className="w-6 h-6" strokeWidth={2.4} />
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                )}
              </span>
              <span className="text-[11px] font-medium text-[#061B46] text-center leading-tight">
                {copied ? 'Copied!' : 'Copy Link'}
              </span>
            </button>
          </div>

          {/* Native Share Sheet / More Apps Button */}
          <button
            type="button"
            onClick={handleNativeShare}
            className="w-full py-3 px-4 rounded-2xl bg-royal-pill text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
          >
            <IgSharePlaneIcon className="w-4 h-4 text-[#F5D58B]" />
            <span>More Share Options</span>
          </button>
        </div>
      </div>
    </div>
  );
};
