import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  INITIAL_BUSINESSES,
  INITIAL_GROUPS,
  INITIAL_NOTIFICATIONS,
  INITIAL_POSTS,
  INITIAL_USER,
} from '../constants/mockData';
import {
  AppNotification,
  AuthCredentials,
  Business,
  CommunityGroup,
  CommunityPost,
  MainTabId,
  UserProfile,
} from '../models/types';
import { communityService } from '../services/communityService';
import {
  isNotificationSoundEnabled,
  playJaiShriKrishna,
  setNotificationSoundEnabled,
  unlockNotificationAudio,
} from '../services/notificationSound';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}

interface AppContextValue {
  showSplash: boolean;
  dismissSplash: () => void;
  replaySplash: () => void;
  activeTab: MainTabId;
  setActiveTab: (tab: MainTabId) => void;
  navigateBack: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile;
  businesses: Business[];
  posts: CommunityPost[];
  groups: CommunityGroup[];
  notifications: AppNotification[];
  unreadNotificationsCount: number;
  selectedBusinessId: string | null;
  setSelectedBusinessId: (id: string | null) => void;
  selectedGroupId: string | null;
  setSelectedGroupId: (id: string | null) => void;
  homeQuickFilter: 'all' | 'videos' | 'events';
  setHomeQuickFilter: (filter: 'all' | 'videos' | 'events') => void;
  isFeedMuted: boolean;
  toggleFeedMute: () => void;
  toast: ToastMessage | null;
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;
  toggleLikePost: (postId: string) => void;
  toggleSavePost: (postId: string) => void;
  sharePost: (postId: string) => void;
  addPostComment: (postId: string, text: string) => Promise<void>;
  createNewPost: (
    post: Omit<
      CommunityPost,
      'id' | 'likesCount' | 'isLiked' | 'comments' | 'sharesCount' | 'isSaved' | 'createdAt' | 'feedTabs'
    >,
  ) => Promise<void>;
  toggleFollowBusiness: (businessId: string) => void;
  toggleFavoriteBusiness: (businessId: string) => void;
  toggleJoinGroup: (groupId: string) => void;
  addGroupDiscussion: (groupId: string, content: string) => void;
  toggleLikeGroupDiscussion: (groupId: string, discussionId: string) => void;
  addGroupDiscussionComment: (groupId: string, discussionId: string, text: string) => void;
  markAllNotificationsRead: () => void;
  markNotificationRead: (id: string) => void;
  notificationSoundEnabled: boolean;
  toggleNotificationSound: () => void;
  playNotificationSound: (force?: boolean) => void;
  triggerSampleNotification: () => void;
  updateUserProfile: (patch: Partial<UserProfile>) => void;
  loginUser: (creds: AuthCredentials) => Promise<void>;
  registerUser: (creds: AuthCredentials) => Promise<void>;
  logoutUser: () => void;
  resetPassword: (email: string) => Promise<string>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTabState] = useState<MainTabId>('home');
  const [tabHistory, setTabHistory] = useState<MainTabId[]>(['home']);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [businesses, setBusinesses] = useState<Business[]>(INITIAL_BUSINESSES);
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_POSTS);
  const [groups, setGroups] = useState<CommunityGroup[]>(INITIAL_GROUPS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [homeQuickFilter, setHomeQuickFilter] = useState<'all' | 'videos' | 'events'>('all');
  const [isFeedMuted, setIsFeedMuted] = useState(true);
  const [notificationSoundEnabled, setSoundEnabledState] = useState<boolean>(() =>
    isNotificationSoundEnabled(),
  );
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const toggleFeedMute = useCallback(() => {
    setIsFeedMuted((prev) => !prev);
  }, []);

  const showToast = useCallback((text: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = String(Date.now());
    setToast({ id, type, text });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 2800);
  }, []);

  const playNotificationSound = useCallback((force = false) => {
    playJaiShriKrishna(force);
  }, []);

  const toggleNotificationSound = useCallback(() => {
    setSoundEnabledState((prev) => {
      const next = !prev;
      setNotificationSoundEnabled(next);
      if (next) {
        playJaiShriKrishna(true);
        showToast('Notification sound enabled ("Jai Shri Krishna")', 'info');
      } else {
        showToast('Notification sound muted', 'info');
      }
      return next;
    });
  }, [showToast]);

  const addNotification = useCallback(
    (item: Omit<AppNotification, 'id' | 'timeAgo' | 'read'>) => {
      const created: AppNotification = {
        ...item,
        id: `notif_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        timeAgo: 'Just now',
        read: false,
      };
      setNotifications((prev) => [created, ...prev]);
      playJaiShriKrishna();
    },
    [],
  );

  const triggerSampleNotification = useCallback(() => {
    addNotification({
      type: 'business',
      title: 'Jai Shri Krishna · Community Alert',
      message: 'New business offer & community meetup update in Hyderabad.',
      targetTab: 'home',
    });
    showToast('Jai Shri Krishna — New notification received');
  }, [addNotification, showToast]);

  useEffect(() => {
    const handleFirstGesture = () => {
      unlockNotificationAudio();
    };
    window.addEventListener('pointerdown', handleFirstGesture, { passive: true });
    window.addEventListener('keydown', handleFirstGesture, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    communityService.fetchBootstrapState().then((state) => {
      if (!mounted) return;
      setIsAuthenticated(state.isAuthenticated);
      setUser(state.user);
      setBusinesses(state.businesses);
      setPosts(state.posts);
      setGroups(state.groups);
      setNotifications(state.notifications);
      setIsLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      communityService.persistState({
        isAuthenticated,
        user,
        businesses,
        posts,
        groups,
        notifications,
      });
    }
  }, [isLoading, isAuthenticated, user, businesses, posts, groups, notifications]);

  const dismissSplash = useCallback(() => setShowSplash(false), []);
  const replaySplash = useCallback(() => setShowSplash(true), []);

  const setActiveTab = useCallback((tab: MainTabId) => {
    setActiveTabState(tab);
    setTabHistory((prev) => (prev[prev.length - 1] === tab ? prev : [...prev.slice(-6), tab]));
  }, []);

  const navigateBack = useCallback(() => {
    setTabHistory((prev) => {
      if (prev.length <= 1) {
        setActiveTabState('home');
        return ['home'];
      }
      const next = prev.slice(0, -1);
      setActiveTabState(next[next.length - 1] || 'home');
      return next;
    });
  }, []);

  const toggleLikePost = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const nextLiked = !post.isLiked;
        return {
          ...post,
          isLiked: nextLiked,
          likesCount: Math.max(0, post.likesCount + (nextLiked ? 1 : -1)),
        };
      }),
    );
  }, []);

  const toggleSavePost = useCallback(
    (postId: string) => {
      setPosts((prev) =>
        prev.map((post) => {
          if (post.id !== postId) return post;
          const nextSaved = !post.isSaved;
          setUser((u) => ({
            ...u,
            savedCount: Math.max(0, u.savedCount + (nextSaved ? 1 : -1)),
          }));
          showToast(nextSaved ? 'Saved to your bookmarks' : 'Removed from saved posts', 'info');
          return { ...post, isSaved: nextSaved };
        }),
      );
    },
    [showToast],
  );

  const sharePost = useCallback(
    (postId: string) => {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, sharesCount: post.sharesCount + 1 } : post,
        ),
      );
      if (navigator.clipboard && window.location) {
        navigator.clipboard.writeText(window.location.href).catch(() => {});
      }
      showToast('Post link copied & shared with community!');
    },
    [showToast],
  );

  const addPostComment = useCallback(
    async (postId: string, text: string) => {
      if (!text.trim()) return;
      const comment = await communityService.addComment(user.fullName, user.avatar, text);
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, comments: [...post.comments, comment] } : post,
        ),
      );
      addNotification({
        type: 'comment',
        title: 'Comment posted in feed',
        message: `"${text.trim()}"`,
        targetTab: 'home',
      });
      showToast('Comment posted');
    },
    [user.fullName, user.avatar, addNotification, showToast],
  );

  const createNewPost = useCallback(
    async (
      newPost: Omit<
        CommunityPost,
        'id' | 'likesCount' | 'isLiked' | 'comments' | 'sharesCount' | 'isSaved' | 'createdAt' | 'feedTabs'
      >,
    ) => {
      const created = await communityService.publishPost(newPost);
      setPosts((prev) => [created, ...prev]);
      setUser((u) => ({ ...u, postsCount: u.postsCount + 1 }));
      addNotification({
        type: 'business',
        title: 'Published to Yadav Community',
        message: `Your ${created.contentType} for ${created.authorName} is now live.`,
        targetTab: 'home',
      });
      showToast('Published to Yadav Community!');
      setActiveTab('home');
    },
    [addNotification, setActiveTab, showToast],
  );

  const toggleFollowBusiness = useCallback(
    (businessId: string) => {
      const target = businesses.find((b) => b.id === businessId);
      const nextFollowed = target ? !target.isFollowed : false;
      setBusinesses((prev) =>
        prev.map((b) => (b.id === businessId ? { ...b, isFollowed: !b.isFollowed } : b)),
      );
      if (target) {
        showToast(nextFollowed ? `Following ${target.name}` : `Unfollowed ${target.name}`, 'info');
        if (nextFollowed) {
          addNotification({
            type: 'follow',
            title: `Following ${target.name}`,
            message: 'You will receive updates and member offers from this business.',
            targetTab: 'businesses',
          });
        }
      }
    },
    [businesses, addNotification, showToast],
  );

  const toggleFavoriteBusiness = useCallback(
    (businessId: string) => {
      setBusinesses((prev) =>
        prev.map((b) => {
          if (b.id !== businessId) return b;
          const next = !b.isFavorite;
          showToast(
            next ? `Added ${b.name} to favorites` : `Removed ${b.name} from favorites`,
            'info',
          );
          return { ...b, isFavorite: next };
        }),
      );
    },
    [showToast],
  );

  const toggleJoinGroup = useCallback(
    (groupId: string) => {
      const target = groups.find((g) => g.id === groupId);
      const nextJoined = target ? !target.isJoined : false;
      setGroups((prev) =>
        prev.map((g) => {
          if (g.id !== groupId) return g;
          const next = !g.isJoined;
          const nextCount = Math.max(0, g.membersCount + (next ? 1 : -1));
          return {
            ...g,
            isJoined: next,
            membersCount: nextCount,
          };
        }),
      );
      if (target) {
        setUser((u) => ({
          ...u,
          groupsCount: Math.max(0, u.groupsCount + (nextJoined ? 1 : -1)),
        }));
        showToast(
          nextJoined ? `Joined ${target.name}` : `Left ${target.name}`,
          nextJoined ? 'success' : 'info',
        );
        if (nextJoined) {
          addNotification({
            type: 'group',
            title: `Welcome to ${target.name}`,
            message: 'Stay tuned for community discussions and member meetups.',
            targetTab: 'community',
          });
        }
      }
    },
    [groups, addNotification, showToast],
  );

  const addGroupDiscussion = useCallback(
    (groupId: string, content: string) => {
      if (!content.trim()) return;
      setGroups((prev) =>
        prev.map((g) => {
          if (g.id !== groupId) return g;
          return {
            ...g,
            discussions: [
              {
                id: `gd_${Date.now()}`,
                groupId,
                authorName: user.fullName,
                authorAvatar: user.avatar,
                role: `${user.roleLabel} · ${user.location}`,
                content: content.trim(),
                createdAt: 'Just now',
                likesCount: 1,
                isLiked: true,
                comments: [],
              },
              ...g.discussions,
            ],
          };
        }),
      );
      addNotification({
        type: 'group',
        title: 'Discussion posted to group',
        message: content.trim(),
        targetTab: 'community',
      });
      showToast('Discussion posted to group');
    },
    [user, addNotification, showToast],
  );

  const toggleLikeGroupDiscussion = useCallback((groupId: string, discussionId: string) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          discussions: g.discussions.map((d) => {
            if (d.id !== discussionId) return d;
            const nextLiked = !d.isLiked;
            return {
              ...d,
              isLiked: nextLiked,
              likesCount: Math.max(0, d.likesCount + (nextLiked ? 1 : -1)),
            };
          }),
        };
      }),
    );
  }, []);

  const addGroupDiscussionComment = useCallback(
    (groupId: string, discussionId: string, text: string) => {
      if (!text.trim()) return;
      setGroups((prev) =>
        prev.map((g) => {
          if (g.id !== groupId) return g;
          return {
            ...g,
            discussions: g.discussions.map((d) => {
              if (d.id !== discussionId) return d;
              return {
                ...d,
                comments: [
                  ...d.comments,
                  {
                    id: `gdc_${Date.now()}`,
                    authorName: user.fullName,
                    authorAvatar: user.avatar,
                    text: text.trim(),
                    createdAt: 'Just now',
                  },
                ],
              };
            }),
          };
        }),
      );
      addNotification({
        type: 'comment',
        title: 'Reply posted in group discussion',
        message: text.trim(),
        targetTab: 'community',
      });
      showToast('Reply added');
    },
    [user.fullName, user.avatar, addNotification, showToast],
  );

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const updateUserProfile = useCallback(
    (patch: Partial<UserProfile>) => {
      setUser((prev) => ({ ...prev, ...patch }));
      showToast('Profile updated successfully');
    },
    [showToast],
  );

  const loginUser = useCallback(
    async (creds: AuthCredentials) => {
      const { user: loggedInUser } = await communityService.login(creds);
      setUser(loggedInUser);
      setIsAuthenticated(true);
      showToast(`Welcome back, ${loggedInUser.fullName}!`);
    },
    [showToast],
  );

  const registerUser = useCallback(
    async (creds: AuthCredentials) => {
      const { user: registered } = await communityService.register(creds);
      setUser(registered);
      setIsAuthenticated(true);
      showToast(`Welcome to Yadav Community, ${registered.fullName}!`);
    },
    [showToast],
  );

  const logoutUser = useCallback(() => {
    setIsAuthenticated(false);
    showToast('Signed out of Yadav Community', 'info');
  }, [showToast]);

  const resetPassword = useCallback(async (email: string) => {
    return communityService.requestPasswordReset(email);
  }, []);

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        showSplash,
        dismissSplash,
        replaySplash,
        activeTab,
        setActiveTab,
        navigateBack,
        isAuthenticated,
        isLoading,
        user,
        businesses,
        posts,
        groups,
        notifications,
        unreadNotificationsCount,
        selectedBusinessId,
        setSelectedBusinessId,
        selectedGroupId,
        setSelectedGroupId,
        homeQuickFilter,
        setHomeQuickFilter,
        isFeedMuted,
        toggleFeedMute,
        toast,
        showToast,
        toggleLikePost,
        toggleSavePost,
        sharePost,
        addPostComment,
        createNewPost,
        toggleFollowBusiness,
        toggleFavoriteBusiness,
        toggleJoinGroup,
        addGroupDiscussion,
        toggleLikeGroupDiscussion,
        addGroupDiscussionComment,
        markAllNotificationsRead,
        markNotificationRead,
        notificationSoundEnabled,
        toggleNotificationSound,
        playNotificationSound,
        triggerSampleNotification,
        updateUserProfile,
        loginUser,
        registerUser,
        logoutUser,
        resetPassword,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
