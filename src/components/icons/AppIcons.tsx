import React from 'react';

export interface IconProps {
  className?: string;
  filled?: boolean;
  strokeWidth?: number;
}

/* ============================================================================
 * INSTAGRAM-STYLE NAVIGATION & CHROME ICONS
 * ========================================================================== */

export const IgHomeIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
  filled = false,
}) =>
  filled ? (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z" />
    </svg>
  );

export const IgShopIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
  filled = false,
}) =>
  filled ? (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.66 0-3 1.34-3 3v10c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V9c0-1.66-1.34-3-3-3Zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2Zm0 10c-2.21 0-4-1.79-4-4a1 1 0 1 1 2 0c0 1.1.9 2 2 2s2-.9 2-2a1 1 0 1 1 2 0c0 2.21-1.79 4-4 4Z" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 7h12a2 2 0 0 1 2 2v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V9a2 2 0 0 1 2-2Z" />
      <path d="M9 7V6a3 3 0 0 1 6 0v1" />
      <path d="M9.5 11.5a2.5 2.5 0 0 0 5 0" />
    </svg>
  );

export const IgPlusIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', strokeWidth = 2.4 }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IgCreateSquareIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
  filled = false,
}) =>
  filled ? (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.002 2H6.998A4.998 4.998 0 0 0 2 6.998v10.004A4.998 4.998 0 0 0 6.998 22h10.004A4.998 4.998 0 0 0 22 17.002V6.998A4.998 4.998 0 0 0 17.002 2Zm-.502 11h-3.5v3.5a1 1 0 1 1-2 0V13H7.5a1 1 0 1 1 0-2H11V7.5a1 1 0 1 1 2 0V11h3.5a1 1 0 1 1 0 2Z" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );

export const IgCommunityIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
  filled = false,
}) =>
  filled ? (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-8 2c-3.866 0-7 2.239-7 5v1.5A1.5 1.5 0 0 0 3.5 22h11a1.5 1.5 0 0 0 1.5-1.5V19c0-2.761-3.134-5-7-5Zm8 1c-.68 0-1.33.112-1.93.314C16.86 16.57 18 18.188 18 20v1.5c0 .172-.029.338-.082.493H20.5A1.5 1.5 0 0 0 22 20.5V19.5c0-2.485-2.239-4.5-5-4.5Z" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="9.2" cy="7.5" r="3.5" />
      <path d="M2.8 20.2c.3-3.2 2.9-5.4 6.4-5.4s6.1 2.2 6.4 5.4" />
      <circle cx="17.2" cy="8.5" r="2.5" />
      <path d="M17.5 14.8c2.3.3 3.9 1.8 4.2 4.3" />
    </svg>
  );

export const IgProfileIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
  filled = false,
}) =>
  filled ? (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 4.2a3.3 3.3 0 1 1-3.3 3.3A3.3 3.3 0 0 1 12 6.2Zm0 13.8a7.95 7.95 0 0 1-5.67-2.37 4.78 4.78 0 0 1 4.22-2.53h2.9a4.78 4.78 0 0 1 4.22 2.53A7.95 7.95 0 0 1 12 20Z" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="12" cy="9.5" r="3" />
      <path d="M6.8 18.8a6 6 0 0 1 10.4 0" />
    </svg>
  );

export const IgReelsIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
  filled = false,
}) =>
  filled ? (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.5 2H6.5A4.5 4.5 0 0 0 2 6.5v11A4.5 4.5 0 0 0 6.5 22h11a4.5 4.5 0 0 0 4.5-4.5v-11A4.5 4.5 0 0 0 17.5 2Zm-7.95 6.8-.9-3.8h3.05l.9 3.8H9.55Zm5.5 0-.9-3.8h3.35a2.5 2.5 0 0 1 2.45 2.02l.42 1.78H15.05ZM4.05 7.02A2.5 2.5 0 0 1 6.5 5h.52l.9 3.8H3.63l.42-1.78Zm5.7 10.46v-5.76a.65.65 0 0 1 .98-.56l4.85 2.88a.65.65 0 0 1 0 1.12l-4.85 2.88a.65.65 0 0 1-.98-.56Z" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <path d="M2.5 8.5h19" />
      <path d="m7.5 2.5 2.5 6M14 2.5l2.5 6" />
      <path d="M10.2 12.2v5.6l4.9-2.8-4.9-2.8Z" fill="currentColor" stroke="none" />
    </svg>
  );

export const IgSearchIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" />
    <line x1="16.511" x2="22" y1="16.511" y2="22" />
  </svg>
);

export const IgBellIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
  filled = false,
}) =>
  filled ? (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.9 15.2 18 14v-3.8c0-3.1-2-5.7-4.8-6.4V3a1.2 1.2 0 1 0-2.4 0v.8C8 4.5 6 7.1 6 10.2V14l-.9 1.2A1.5 1.5 0 0 0 6.3 17.6h11.4a1.5 1.5 0 0 0 1.2-2.4ZM12 21a2.7 2.7 0 0 0 2.6-2H9.4A2.7 2.7 0 0 0 12 21Z" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6.2 10.2a5.8 5.8 0 0 1 11.6 0c0 3.7 1.3 5.4 2.1 6.3.3.4.05 1-.5 1H4.6c-.55 0-.8-.6-.5-1 .8-.9 2.1-2.6 2.1-6.3Z" />
      <path d="M9.6 19.8a2.5 2.5 0 0 0 4.8 0" />
    </svg>
  );

export const IgMenuIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
  </svg>
);

export const IgSettingsIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="3.2" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1.08 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
  </svg>
);

export const IgBackIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M19 12H5M11.5 5.5 5 12l6.5 6.5" />
  </svg>
);

export const IgChevronRightIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const IgCloseIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

/* ============================================================================
 * INSTAGRAM ENGAGEMENT & FEED ACTION ICONS
 * ========================================================================== */

export const IgHeartIcon: React.FC<IconProps> = ({
  className = 'w-5 h-5',
  filled = false,
}) =>
  filled ? (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938Z" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938Z" />
    </svg>
  );

export const IgCommentIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" />
  </svg>
);

export const IgSharePlaneIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <line x1="22" x2="9.218" y1="3" y2="10.083" />
    <polygon points="11.698 20.334 22 3.001 2 3.001 9.218 10.083 11.698 20.334" />
  </svg>
);

export const IgBookmarkIcon: React.FC<IconProps> = ({
  className = 'w-5 h-5',
  filled = false,
}) =>
  filled ? (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polygon points="20 21 12 13.44 4 21 4 3 20 3 20 21" />
    </svg>
  );

export const IgMoreDotsIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <circle cx="6" cy="12" r="1.75" />
    <circle cx="12" cy="12" r="1.75" />
    <circle cx="18" cy="12" r="1.75" />
  </svg>
);

/* ============================================================================
 * MEDIA & PLAYER ICONS
 * ========================================================================== */

export const IgPhotoIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
    <path d="m21 15-4.6-4.6a1.4 1.4 0 0 0-2 0L6 18.8" />
  </svg>
);

export const IgCalendarIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="4.5" width="18" height="16.5" rx="3.5" />
    <path d="M8 2.5v3M16 2.5v3M3 9.5h18" />
    <circle cx="12" cy="14.8" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

export const IgPlayIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M7.5 4.86a1.3 1.3 0 0 1 1.97-1.11l10.6 6.44a1.3 1.3 0 0 1 0 2.22l-10.6 6.44A1.3 1.3 0 0 1 7.5 17.74V4.86Z" />
  </svg>
);

export const IgPauseIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <rect x="6" y="4.5" width="4.2" height="15" rx="1.4" />
    <rect x="13.8" y="4.5" width="4.2" height="15" rx="1.4" />
  </svg>
);

export const IgVolumeOnIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M13.6 3.3a1 1 0 0 0-1.1.18L7.6 8H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h3.6l4.9 4.52A1 1 0 0 0 14.2 19.8V4.2a1 1 0 0 0-.6-.9Zm3.7 3.6a1 1 0 0 0-.1 1.4 5.5 5.5 0 0 1 0 7.4 1 1 0 1 0 1.5 1.32 7.5 7.5 0 0 0 0-10.04 1 1 0 0 0-1.4-.08Zm2.7-2.6a1 1 0 0 0-.1 1.4 9.2 9.2 0 0 1 0 12.6 1 1 0 1 0 1.48 1.34 11.2 11.2 0 0 0 0-15.28 1 1 0 0 0-1.38-.06Z" />
  </svg>
);

export const IgVolumeOffIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M13.6 3.3a1 1 0 0 0-1.1.18L7.6 8H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h3.6l4.9 4.52A1 1 0 0 0 14.2 19.8V4.2a1 1 0 0 0-.6-.9ZM21.7 8.3a1 1 0 0 0-1.4 0L18.5 10.1l-1.8-1.8a1 1 0 1 0-1.4 1.4l1.8 1.8-1.8 1.8a1 1 0 1 0 1.4 1.4l1.8-1.8 1.8 1.8a1 1 0 1 0 1.4-1.4l-1.8-1.8 1.8-1.8a1 1 0 0 0 0-1.4Z" />
  </svg>
);

export const IgExpandIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
);

/* ============================================================================
 * CATEGORY & UTILITY ICONS (UNIFIED ROUNDED GEOMETRIC STYLE)
 * ========================================================================== */

export const IgFoodIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M6 3v7a2.5 2.5 0 0 0 5 0V3M8.5 3v18" />
    <path d="M16 3c1.6 1.8 2.2 4 2.2 6.5V13h-3V21" />
  </svg>
);

export const IgFitnessIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M7.5 12h9" />
    <rect x="4" y="8" width="3.5" height="8" rx="1.2" />
    <rect x="16.5" y="8" width="3.5" height="8" rx="1.2" />
    <path d="M2 10v4M22 10v4" />
  </svg>
);

export const IgFashionIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M6 8h12l1.2 11a2 2 0 0 1-2 2.2H6.8a2 2 0 0 1-2-2.2L6 8Z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </svg>
);

export const IgTechIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="4" y="5" width="16" height="11" rx="2" />
    <path d="M2.5 19h19" />
  </svg>
);

export const IgRealEstateIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M4 21V9.5L12 4l8 5.5V21" />
    <path d="M2.5 21h19M9.5 21v-5.5h5V21" />
  </svg>
);

export const IgAutoIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M5 11.5 6.8 6.8A2 2 0 0 1 8.67 5.5h6.66a2 2 0 0 1 1.87 1.3L19 11.5" />
    <rect x="3" y="11.5" width="18" height="6" rx="2" />
    <path d="M5 17.5V19M19 17.5V19" />
    <circle cx="7" cy="14.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="17" cy="14.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const IgHealthIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 20.5s-7.5-4.7-7.5-10.2A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3.3c0 5.5-7.5 10.2-7.5 10.2Z" />
    <path d="M12 10.2v4.6M9.7 12.5h4.6" />
  </svg>
);

export const IgMoreGridIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <circle cx="7.5" cy="7.5" r="2.6" />
    <circle cx="16.5" cy="7.5" r="2.6" />
    <circle cx="7.5" cy="16.5" r="2.6" />
    <circle cx="16.5" cy="16.5" r="2.6" />
  </svg>
);

export const IgStarIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.6a1 1 0 0 1 .9.56l2.58 5.23 5.77.84a1 1 0 0 1 .55 1.71l-4.17 4.07.99 5.75a1 1 0 0 1-1.45 1.05L12 19.09l-5.17 2.72a1 1 0 0 1-1.45-1.05l.99-5.75-4.17-4.07a1 1 0 0 1 .55-1.71l5.77-.84 2.58-5.23a1 1 0 0 1 .9-.56Z" />
  </svg>
);

export const IgCheckIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const IgDoubleCheckIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="m2.5 12.5 4.2 4.2L15.5 7.5" />
    <path d="m8.8 16.7 1.2 1.1L21 6.5" />
  </svg>
);

export const IgMapPinIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 1 0-13 0c0 5.4 6.5 11 6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
);

export const IgPhoneIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M21 16.5v3a2 2 0 0 1-2.18 2 19.7 19.7 0 0 1-8.6-3.07 19.4 19.4 0 0 1-6-6A19.7 19.7 0 0 1 1.15 3.8 2 2 0 0 1 3.13 1.6h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.1 9.5a16 16 0 0 0 6 6l1.26-1.28a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 21 16.5Z" />
  </svg>
);

export const IgExternalLinkIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M14 4h6v6M10 14 20 4M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
  </svg>
);

export const IgTagIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.6 3.5H5.5a2 2 0 0 0-2 2v7.1a2 2 0 0 0 .59 1.42l6.9 6.9a2 2 0 0 0 2.82 0l6.1-6.1a2 2 0 0 0 0-2.82l-6.9-6.9a2 2 0 0 0-1.41-.6Z" />
    <circle cx="7.8" cy="7.8" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

export const IgEditIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7.5 18.5 3 20l1.5-4.5 12-12Z" />
  </svg>
);

export const IgPostGridIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
  </svg>
);

export const IgMegaphoneIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="m18 5-10 4H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h3l10 4V5Z" />
    <path d="M7.5 15 9 20h2.5l-1-5" />
    <path d="M21 9.5v5" />
  </svg>
);

export const IgBriefcaseIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="7" width="18" height="13" rx="2.5" />
    <path d="M8.5 7V5a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 5v2" />
    <path d="M3 12.5h18" />
  </svg>
);

export const IgSparklesIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" />
    <path d="M18.5 3.5v3M17 5h3M5.5 17.5v3M4 19h3" />
  </svg>
);

export const IgMailIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const IgLockIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="4" y="10.5" width="16" height="10" rx="2.5" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
  </svg>
);

export const IgLogoutIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5M21 12H9" />
  </svg>
);

export const IgUserPlusIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="9.5" cy="7.5" r="3.5" />
    <path d="M3 20c.4-3.3 3-5.5 6.5-5.5S15.6 16.7 16 20" />
    <path d="M19 8v6M16 11h6" />
  </svg>
);
