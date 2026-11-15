import React from 'react';
import { useApp } from '../../context/AppContext';
import { AppNotification } from '../../models/types';
import { ASSETS } from '../../theme/tokens';
import {
  IgBellIcon,
  IgCloseIcon,
  IgCommentIcon,
  IgCommunityIcon,
  IgDoubleCheckIcon,
  IgHeartIcon,
  IgShopIcon,
  IgUserPlusIcon,
  IgVolumeOffIcon,
  IgVolumeOnIcon,
} from '../icons/AppIcons';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const {
    notifications,
    unreadNotificationsCount,
    markAllNotificationsRead,
    markNotificationRead,
    notificationSoundEnabled,
    toggleNotificationSound,
    playNotificationSound,
    triggerSampleNotification,
    setActiveTab,
  } = useApp();

  if (!isOpen) return null;

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'like':
        return <IgHeartIcon filled className="w-4 h-4 text-[#ED4956]" />;
      case 'comment':
        return <IgCommentIcon className="w-4 h-4 text-[#0B347A]" />;
      case 'follow':
        return <IgUserPlusIcon className="w-4 h-4 text-[#087D75]" />;
      case 'group':
        return <IgCommunityIcon filled className="w-4 h-4 text-[#7C5CFC]" />;
      case 'business':
        return <IgShopIcon filled className="w-4 h-4 text-[#D99B27]" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Community Notifications"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#FFF8ED] h-full shadow-2xl flex flex-col border-l border-[#EADBC2]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-krishna-header text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <IgBellIcon className="w-5 h-5 text-[#F5D58B] shrink-0" filled={unreadNotificationsCount > 0} />
            <h2 className="font-display text-xl font-semibold">Notifications</h2>
            {unreadNotificationsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#E9A526] text-[#061B46] text-xs font-bold tabular-nums">
                {unreadNotificationsCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={toggleNotificationSound}
              aria-label={
                notificationSoundEnabled
                  ? 'Mute Jai Shri Krishna notification sound'
                  : 'Enable Jai Shri Krishna notification sound'
              }
              title={
                notificationSoundEnabled
                  ? 'Sound On: "Jai Shri Krishna"'
                  : 'Notification Sound Muted'
              }
              className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full hover:bg-white/10 text-[#F5D58B] cursor-pointer"
            >
              {notificationSoundEnabled ? (
                <IgVolumeOnIcon className="w-5 h-5" />
              ) : (
                <IgVolumeOffIcon className="w-5 h-5 text-white/60" />
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close notifications"
              className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full hover:bg-white/10 cursor-pointer"
            >
              <IgCloseIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="px-4 py-2.5 bg-white border-b border-[#EADBC2] flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={triggerSampleNotification}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#061B46] bg-[#FFF8ED] border border-[#EADBC2] hover:border-[#D99B27] px-2.5 py-1 rounded-full cursor-pointer whitespace-nowrap"
          >
            <IgVolumeOnIcon className="w-3.5 h-3.5 text-[#D99B27]" />
            <span>Test &ldquo;Jai Shri Krishna&rdquo;</span>
          </button>
          <button
            type="button"
            onClick={markAllNotificationsRead}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B347A] hover:underline cursor-pointer whitespace-nowrap"
          >
            <IgDoubleCheckIcon className="w-3.5 h-3.5" />
            <span>Mark all read</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[#EADBC2]/70">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#667085] space-y-2">
              <img
                src={ASSETS.ornamentTempleBells}
                alt=""
                aria-hidden="true"
                className="w-12 h-12 mx-auto object-contain opacity-80"
              />
              <p>You are all caught up! No new notifications.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <button
                key={notif.id}
                type="button"
                onClick={() => {
                  playNotificationSound();
                  markNotificationRead(notif.id);
                  if (notif.targetTab) {
                    setActiveTab(notif.targetTab);
                  }
                  onClose();
                }}
                className={`w-full text-left px-4 py-3.5 flex items-start gap-3 transition-colors cursor-pointer ${
                  notif.read ? 'bg-[#FFF8ED] hover:bg-white' : 'bg-white hover:bg-[#FFFBF4]'
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-[#FFF8ED] border border-[#EADBC2] flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={`text-[13px] leading-snug ${
                        notif.read ? 'font-medium text-[#1D2939]' : 'font-bold text-[#061B46]'
                      }`}
                    >
                      {notif.title}
                    </p>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-[#E9A526] shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-xs text-[#667085] mt-0.5 line-clamp-2">{notif.message}</p>
                  <span className="text-[11px] text-[#98A2B3] mt-1 inline-block">
                    {notif.timeAgo}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
