import React, { useState } from 'react';
import { ASSETS } from '../../theme/tokens';

/**
 * Traditional golden cow emblem matching Screen 1 (Splash) and Screen 2 (Header & FitZone logo)
 */
export const GoldenCowEmblem: React.FC<{ className?: string; walk?: boolean }> = ({
  className = 'w-8 h-8',
  walk = true,
}) => (
  <img
    src={ASSETS.cowOutlinePack}
    alt=""
    aria-hidden="true"
    className={`object-contain pointer-events-none select-none ${walk ? 'animate-cow-walk' : ''} ${className}`}
  />
);

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
  <div className={`pointer-events-none select-none overflow-hidden ${className}`} aria-hidden="true">
    <img
      src={ASSETS.vrindavanCreamSilhouette}
      alt=""
      className="w-full max-w-4xl mx-auto h-20 sm:h-24 object-contain object-bottom opacity-95"
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
