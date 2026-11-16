import React, { useId, useState } from 'react';
import { ASSETS } from '../../theme/tokens';

/**
 * Traditional golden cow emblem with articulated 4-leg quadruped walking animation
 */
export const GoldenCowEmblem: React.FC<{ className?: string; walk?: boolean }> = ({
  className = 'w-8 h-8',
  walk = true,
}) => {
  const gradId = useId();

  return (
    <svg
      viewBox="0 0 124 96"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-visible ${walk ? 'animate-cow-walk' : ''} ${className}`}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F8DF9C" />
          <stop offset="50%" stopColor="#E9B23B" />
          <stop offset="100%" stopColor="#C9881B" />
        </linearGradient>
      </defs>

      <g className={walk ? 'cow-torso-bob' : ''} stroke={`url(#${gradId})`} strokeLinecap="round" strokeLinejoin="round">
        {/* Far-side Back Right Leg (behind torso, subtly muted for 3D leg separation) */}
        <g transform="translate(34, 53)" opacity="0.72">
          <g className={walk ? 'cow-leg-br' : ''}>
            <path d="M -2.5 0 C -3.5 6, -4.5 11, -3.5 16.5" strokeWidth="2.8" />
            <path d="M 2.5 0 C 1.5 6, 0 11, 0 16.5" strokeWidth="2.8" />
            <g transform="translate(-1.8, 16.5)">
              <g className={walk ? 'cow-shin-br' : ''}>
                <path d="M -1.5 0 L 0.5 15 L 3 16" strokeWidth="2.5" />
                <path d="M 1.6 0 L 3 14.5" strokeWidth="2.4" />
              </g>
            </g>
          </g>
        </g>

        {/* Far-side Front Right Leg (behind torso, subtly muted for 3D leg separation) */}
        <g transform="translate(81, 56)" opacity="0.72">
          <g className={walk ? 'cow-leg-fr' : ''}>
            <path d="M -2.2 0 L -1.8 14.5" strokeWidth="2.8" />
            <path d="M 2.2 0 L 1.4 14.5" strokeWidth="2.8" />
            <g transform="translate(-0.2, 14.5)">
              <g className={walk ? 'cow-shin-fr' : ''}>
                <path d="M -1.4 0 L -0.4 14.5 L 2.2 15.5" strokeWidth="2.5" />
                <path d="M 1.4 0 L 2.2 14" strokeWidth="2.4" />
              </g>
            </g>
          </g>
        </g>

        {/* Tail */}
        <g transform="translate(24, 46)">
          <g className={walk ? 'cow-tail-sway' : ''}>
            <path d="M 0 0 C -5 6, -7 14, -6 22" strokeWidth="2.9" />
            <path d="M -6 22 C -8.5 25.5, -7.5 29.5, -5.5 31.5 C -3 28.5, -3 25, -6 22 Z" strokeWidth="2.4" fill={`url(#${gradId})`} fillOpacity="0.3" />
          </g>
        </g>

        {/* Rump, Back, Withers, Neck, Horns, Head & Belly Silhouette */}
        <path
          d="M 24 46 C 25 36, 36 33, 49 36.5 C 62 40, 73 36.5, 82 28.5 C 85 26, 89 23.5, 93 23 C 97 22.5, 101 25, 105 29.5 C 109.5 34, 113 37.5, 112.5 41.5 C 112 45, 107.5 46.5, 102.5 45.5 C 97 44.5, 92.5 48, 88.5 54 C 86.5 57, 84 58.5, 81 59.5"
          strokeWidth="3.6"
        />
        {/* Ear */}
        <path d="M 86 25.5 C 81.5 23.5, 77 19.5, 76 16 C 80 17.5, 84.5 20.5, 87.5 24" strokeWidth="2.8" />
        {/* Curved Upward Horn */}
        <path d="M 93.5 22.5 C 96 17.5, 98.5 13, 95 8.5 C 100.5 11.5, 100.5 17.5, 96.5 23.5" strokeWidth="2.8" />
        {/* Eye */}
        <circle cx="99.5" cy="31" r="1.6" fill={`url(#${gradId})`} stroke="none" />
        {/* Belly & Udder */}
        <path d="M 75 59.5 C 65 63.5, 53 63.5, 44.5 61.5 C 43 66.5, 40 67.5, 38 65.5 C 37 68.5, 34.5 67.5, 33.5 63" strokeWidth="3.2" />

        {/* Near-side Back Left Leg */}
        <g transform="translate(29, 53)">
          <g className={walk ? 'cow-leg-bl' : ''}>
            <path d="M -2.8 0 C -4 6, -4.8 11.5, -3.5 17" strokeWidth="3.0" />
            <path d="M 2.6 0 C 1.5 6, 0.2 11.5, 0.2 17" strokeWidth="3.0" />
            <g transform="translate(-1.6, 17)">
              <g className={walk ? 'cow-shin-bl' : ''}>
                <path d="M -1.6 0 L 0.6 15.5 L 3.4 16.5" strokeWidth="2.8" />
                <path d="M 1.6 0 L 3.2 15" strokeWidth="2.7" />
              </g>
            </g>
          </g>
        </g>

        {/* Near-side Front Left Leg */}
        <g transform="translate(76, 56.5)">
          <g className={walk ? 'cow-leg-fl' : ''}>
            <path d="M -2.4 0 L -1.8 14.8" strokeWidth="3.0" />
            <path d="M 2.4 0 L 1.6 14.8" strokeWidth="3.0" />
            <g transform="translate(-0.1, 14.8)">
              <g className={walk ? 'cow-shin-fl' : ''}>
                <path d="M -1.5 0 L -0.4 14.8 L 2.5 15.8" strokeWidth="2.8" />
                <path d="M 1.5 0 L 2.4 14.2" strokeWidth="2.7" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

/**
 * Ornamental golden divider seen below the tagline on the Splash Screen
 */
export const OrnamentalGoldDivider: React.FC<{ className?: string }> = ({ className = 'w-52 h-7' }) => (
  <img
    src={ASSETS.ornamentCurvedDivider}
    alt=""
    aria-hidden="true"
    className={`object-contain pointer-events-none select-none ${className}`}
  />
);

/**
 * Ornamental golden lotus divider
 */
export const OrnamentalLotusDivider: React.FC<{ className?: string }> = ({
  className = 'w-60 h-7',
}) => (
  <img
    src={ASSETS.ornamentLotusDivider}
    alt=""
    aria-hidden="true"
    className={`object-contain pointer-events-none select-none ${className}`}
  />
);

/**
 * Traditional golden filigree corners for featured cards & banners
 */
export const GoldenCornerFrame: React.FC<{ sizeClass?: string }> = ({
  sizeClass = 'w-8 h-8 sm:w-10 sm:h-10',
}) => (
  <>
    <img
      src={ASSETS.ornamentGoldenCorner}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none select-none absolute top-1.5 left-1.5 object-contain opacity-85 ${sizeClass}`}
    />
    <img
      src={ASSETS.ornamentGoldenCorner}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none select-none absolute top-1.5 right-1.5 object-contain opacity-85 scale-x-[-1] ${sizeClass}`}
    />
  </>
);

/**
 * Blue verified badge matching Screen 2 & Screen 6
 */
export const VerifiedBadge: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className="inline-block shrink-0"
    aria-label="Verified"
  >
    <path
      d="M12 2L14.8 3.9L18.1 3.7L19.4 6.8L22 8.9L21.3 12L22 15.1L19.4 17.2L18.1 20.3L14.8 20.1L12 22L9.2 20.1L5.9 20.3L4.6 17.2L2 15.1L2.7 12L2 8.9L4.6 6.8L5.9 3.7L9.2 3.9L12 2Z"
      fill="#1D7AFC"
    />
    <path
      d="M8.5 12.2L10.8 14.5L15.7 9.6"
      stroke="#FFFFFF"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Vrindavan pastoral golden silhouette footer accent (seen at bottom of Businesses screen)
 */
export const VrindavanSilhouetteFooter: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`pointer-events-none select-none overflow-hidden w-full ${className}`} aria-hidden="true">
    <img
      src={ASSETS.vrindavanCreamSilhouette}
      alt=""
      className="w-full max-w-6xl mx-auto h-auto object-contain object-bottom mix-blend-multiply brightness-[1.05] scale-[1.08] sm:scale-[1.05] origin-bottom"
    />
  </div>
);

/**
 * Resilient image component with fallback container so no broken image ever appears
 */
export const SafeImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}> = ({ src, alt, className = '', fallbackLabel }) => {
  const [errored, setErrored] = useState(false);

  if (errored || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#061B46] via-[#0B347A] to-[#087D75] text-[#F5D58B] p-3 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <GoldenCowEmblem className="w-8 h-8 mb-1 opacity-85" walk={false} />
        <span className="text-[11px] font-medium line-clamp-1">{fallbackLabel || alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      className={className}
      onError={() => setErrored(true)}
    />
  );
};

export const PeacockCornerDecorations: React.FC = () => (
  <>
    <img
      src={ASSETS.peacockFeather}
      alt=""
      aria-hidden="true"
      className="pointer-events-none select-none fixed md:absolute bottom-14 md:bottom-0 -left-3 w-20 sm:w-24 h-20 sm:h-24 object-contain opacity-95 -rotate-12 z-10"
    />
    <img
      src={ASSETS.peacockFeather}
      alt=""
      aria-hidden="true"
      className="pointer-events-none select-none fixed md:absolute bottom-14 md:bottom-0 -right-3 w-20 sm:w-24 h-20 sm:h-24 object-contain opacity-95 scale-x-[-1] -rotate-12 z-10"
    />
  </>
);
