import React from 'react';
import { useApp } from '../../context/AppContext';
import { MainTabId } from '../../models/types';
import { ASSETS } from '../../theme/tokens';
import {
  GoldenCowEmblem,
  OrnamentalGoldDivider,
  SafeImage,
  VerifiedBadge,
} from '../common/KrishnaDecorations';
import {
  IgBellIcon,
  IgCommunityIcon,
  IgCreateSquareIcon,
  IgHomeIcon,
  IgLogoutIcon,
  IgProfileIcon,
  IgShopIcon,
  IgSparklesIcon,
} from '../icons/AppIcons';

interface DesktopSidebarProps {
  onOpenNotifications: () => void;
  onOpenAuth?: () => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  onOpenNotifications,
  onOpenAuth,
}) => {
  const {
    activeTab,
    setActiveTab,
    user,
    unreadNotificationsCount,
    replaySplash,
    isAuthenticated,
    logoutUser,
  } = useApp();

  const navItems: { id: MainTabId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home Feed', icon: <IgHomeIcon className="w-5 h-5" filled={activeTab === 'home'} /> },
    { id: 'businesses', label: 'Businesses', icon: <IgShopIcon className="w-5 h-5" filled={activeTab === 'businesses'} /> },
    { id: 'community', label: 'Community', icon: <IgCommunityIcon className="w-5 h-5" filled={activeTab === 'community'} /> },
    { id: 'profile', label: 'My Profile', icon: <IgProfileIcon className="w-5 h-5" filled={activeTab === 'profile'} /> },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 shrink-0 bg-krishna-header text-white min-h-screen sticky top-0 border-r border-[#E9A526]/20 shadow-xl z-30">
      {/* Brand Lockup */}
      <div className="px-4 lg:px-5 pt-6 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 text-left w-full cursor-pointer group"
        >
          <span className="shrink-0 -mt-0.5 px-1 inline-flex items-center justify-center transition-transform group-hover:scale-105">
            <GoldenCowEmblem className="w-12 h-10 lg:w-14 lg:h-12" />
          </span>
          <div className="min-w-0">
            <h1 className="font-display text-[21px] lg:text-[22px] font-semibold tracking-wide text-[#F5D58B] leading-tight whitespace-nowrap">
              Yadav Community
            </h1>
            <p className="text-[11px] text-white/75 tracking-wide whitespace-nowrap">
              Connect • Promote • Grow
            </p>
          </div>
        </button>
        <OrnamentalGoldDivider className="w-40 h-4 mx-auto mt-3 opacity-85" />
      </div>

      {/* Primary Navigation */}
      <nav aria-label="Desktop Navigation" className="flex-1 px-4 py-3 space-y-1.5">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-white/15 text-[#F5D58B] shadow-sm border border-[#E9A526]/40'
                  : 'text-white/85 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}

        <div className="pt-3">
          <button
            type="button"
            onClick={() => setActiveTab('create')}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-full bg-gold-orb text-[#061B46] font-semibold text-sm shadow-lg hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
          >
            <IgCreateSquareIcon className="w-5 h-5" filled={activeTab === 'create'} />
            <span>Create Post / Ad</span>
          </button>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onOpenNotifications}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-white/85 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-3.5">
              <IgBellIcon className="w-5 h-5" filled={unreadNotificationsCount > 0} />
              <span>Notifications</span>
            </span>
            {unreadNotificationsCount > 0 && (
              <span className="min-w-[22px] h-[22px] px-1.5 rounded-full bg-[#E9A526] text-[#061B46] text-xs font-bold flex items-center justify-center tabular-nums">
                {unreadNotificationsCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Member Card & Splash Replay */}
      <div className="p-4 border-t border-white/10 space-y-3 relative overflow-hidden">
        <div className="flex items-end justify-between gap-2 px-1">
          <div className="pb-1 min-w-0">
            <p className="font-display text-xs font-semibold text-[#F5D58B]">
              Yadav Community
            </p>
            <p className="text-[10.5px] text-white/70 leading-snug">
              Heritage &amp; Enterprise
            </p>
          </div>
          <img
            src={ASSETS.peacockSidebar}
            alt="Peacock Heritage Ornament"
            className="w-16 h-20 object-contain object-bottom shrink-0 drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)] pointer-events-none select-none"
          />
        </div>
        <button
          type="button"
          onClick={replaySplash}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs text-[#F5D58B]/85 hover:text-[#F5D58B] hover:bg-white/5 transition-colors cursor-pointer"
        >
          <IgSparklesIcon className="w-3.5 h-3.5" />
          <span>View Welcome Screen</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-white/10 hover:bg-white/15 transition-colors text-left cursor-pointer"
        >
          <SafeImage
            src={user.avatar}
            alt={user.fullName}
            className="w-10 h-10 rounded-full object-cover border-2 border-[#E9A526]/70 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-white truncate">{user.fullName}</span>
              {user.verified && <VerifiedBadge size={13} />}
            </div>
            <p className="text-[11px] text-white/70 truncate">{user.location}</p>
          </div>
        </button>

        {isAuthenticated && (
          <button
            type="button"
            onClick={() => {
              logoutUser();
              onOpenAuth?.();
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-full bg-red-500/15 hover:bg-red-500/25 border border-red-400/35 text-xs font-semibold text-red-200 transition-colors cursor-pointer"
          >
            <IgLogoutIcon className="w-4 h-4 text-[#F87171] shrink-0" />
            <span>Sign Out</span>
          </button>
        )}
      </div>
    </aside>
  );
};
