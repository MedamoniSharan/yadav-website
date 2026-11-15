import React from 'react';
import { Bell, Home, PlusCircle, Sparkles, Store, User, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MainTabId } from '../../models/types';
import {
  GoldenCowEmblem,
  OrnamentalGoldDivider,
  SafeImage,
  VerifiedBadge,
} from '../common/KrishnaDecorations';

interface DesktopSidebarProps {
  onOpenNotifications: () => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ onOpenNotifications }) => {
  const { activeTab, setActiveTab, user, unreadNotificationsCount, replaySplash } = useApp();

  const navItems: { id: MainTabId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home Feed', icon: <Home className="w-5 h-5" /> },
    { id: 'businesses', label: 'Businesses', icon: <Store className="w-5 h-5" /> },
    { id: 'community', label: 'Community', icon: <Users className="w-5 h-5" /> },
    { id: 'profile', label: 'My Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 shrink-0 bg-krishna-header text-white min-h-screen sticky top-0 border-r border-[#E9A526]/20 shadow-xl z-30">
      {/* Brand Lockup */}
      <div className="px-6 pt-6 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 text-left w-full cursor-pointer group"
        >
          <GoldenCowEmblem className="w-9 h-9 shrink-0 transition-transform group-hover:scale-105" />
          <div className="min-w-0">
            <h1 className="font-display text-[22px] font-semibold tracking-wide text-[#F5D58B] leading-tight whitespace-nowrap">
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
            <PlusCircle className="w-5 h-5" />
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
              <Bell className="w-5 h-5" />
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
      <div className="p-4 border-t border-white/10 space-y-3">
        <button
          type="button"
          onClick={replaySplash}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs text-[#F5D58B]/85 hover:text-[#F5D58B] hover:bg-white/5 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
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
      </div>
    </aside>
  );
};
