import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AuthModal } from '../components/common/AuthModal';
import { NotificationDrawer } from '../components/common/NotificationDrawer';
import { BottomNav } from '../components/navigation/BottomNav';
import { DesktopSidebar } from '../components/navigation/DesktopSidebar';
import { useApp } from '../context/AppContext';
import { PostContentType } from '../models/types';
import { BusinessesScreen } from '../screens/BusinessesScreen/BusinessesScreen';
import { CommunityScreen } from '../screens/CommunityScreen/CommunityScreen';
import { CreatePostScreen } from '../screens/CreatePostScreen/CreatePostScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen/ProfileScreen';
import { SplashScreen } from '../screens/SplashScreen/SplashScreen';

export const AppRouter: React.FC = () => {
  const {
    showSplash,
    activeTab,
    toast,
    isAuthenticated,
    unreadNotificationsCount,
    playNotificationSound,
  } = useApp();
  const [notifOpen, setNotifOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [createMode, setCreateMode] = useState<PostContentType>('post');

  const handleOpenNotifications = () => {
    setNotifOpen(true);
    if (unreadNotificationsCount > 0) {
      playNotificationSound();
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8ED] text-[#061B46] flex flex-col md:flex-row">
      {/* Screen 1: Splash Screen */}
      <AnimatePresence>{showSplash && <SplashScreen />}</AnimatePresence>

      {/* Responsive Desktop Left Rail */}
      <DesktopSidebar onOpenNotifications={handleOpenNotifications} />

      {/* Main Screen Content Area */}
      <main className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeTab === 'home' && (
              <HomeScreen
                onOpenNotifications={handleOpenNotifications}
                onOpenAuth={() => setAuthModalOpen(true)}
                onSelectCreateMode={(mode) => setCreateMode(mode)}
              />
            )}
            {activeTab === 'businesses' && <BusinessesScreen />}
            {activeTab === 'create' && <CreatePostScreen initialMode={createMode} />}
            {activeTab === 'community' && <CommunityScreen />}
            {activeTab === 'profile' && (
              <ProfileScreen onOpenAuth={() => setAuthModalOpen(true)} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Mobile Bottom Navigation */}
      <BottomNav />

      {/* Notification Drawer */}
      <NotificationDrawer isOpen={notifOpen} onClose={() => setNotifOpen(false)} />

      {/* Auth Modal (when signed out or triggered via menu) */}
      <AuthModal
        isOpen={authModalOpen || !isAuthenticated}
        onClose={isAuthenticated ? () => setAuthModalOpen(false) : undefined}
      />

      {/* Global Toast Feedback */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#061B46] text-[#F5D58B] border border-[#E9A526]/50 shadow-xl text-xs font-semibold whitespace-nowrap max-w-[90vw] truncate"
            role="status"
            aria-live="polite"
          >
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
