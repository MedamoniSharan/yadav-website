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
  PostComment,
  UserProfile,
} from '../models/types';

const STORAGE_KEY = 'yadav_community_app_state_v1';

export interface PersistedAppState {
  isAuthenticated: boolean;
  user: UserProfile;
  businesses: Business[];
  posts: CommunityPost[];
  groups: CommunityGroup[];
  notifications: AppNotification[];
}

const delay = (ms = 220) => new Promise((resolve) => setTimeout(resolve, ms));

function loadInitialState(): PersistedAppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as PersistedAppState;
      if (parsed && parsed.user && Array.isArray(parsed.posts)) {
        const migratedPosts = parsed.posts.map((post) => ({
          ...post,
          media: post.media.map((m) => {
            if (m.id === 'med_fitzone_vid' && !m.url.endsWith('.mp4')) {
              return { ...m, url: '/assets/videos/fitzone-reel.mp4' };
            }
            if (m.id === 'med_biryani_vid' && !m.url.endsWith('.mp4')) {
              return { ...m, url: '/assets/videos/biryani-reel.mp4' };
            }
            return m;
          }),
        }));
        return { ...parsed, posts: migratedPosts };
      }
    }
  } catch {
    // Fallback cleanly to initial seed data
  }
  return {
    isAuthenticated: true,
    user: INITIAL_USER,
    businesses: INITIAL_BUSINESSES,
    posts: INITIAL_POSTS,
    groups: INITIAL_GROUPS,
    notifications: INITIAL_NOTIFICATIONS,
  };
}

function saveState(state: PersistedAppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota issues
  }
}

export const communityService = {
  async fetchBootstrapState(): Promise<PersistedAppState> {
    await delay(140);
    return loadInitialState();
  },

  persistState(state: PersistedAppState): void {
    saveState(state);
  },

  async login(credentials: AuthCredentials): Promise<{ user: UserProfile; token: string }> {
    await delay(420);
    if (!credentials.email.includes('@') || credentials.password.length < 4) {
      throw new Error('Please enter a valid email address and password (min 4 characters).');
    }
    const state = loadInitialState();
    const updatedUser: UserProfile = {
      ...state.user,
      email: credentials.email,
    };
    saveState({ ...state, isAuthenticated: true, user: updatedUser });
    return {
      user: updatedUser,
      token: 'jwt_yadav_community_' + Date.now(),
    };
  },

  async register(credentials: AuthCredentials): Promise<{ user: UserProfile; token: string }> {
    await delay(480);
    if (!credentials.fullName?.trim()) {
      throw new Error('Full name is required to join Yadav Community.');
    }
    if (!credentials.email.includes('@') || credentials.password.length < 4) {
      throw new Error('Please enter a valid email and password (min 4 characters).');
    }
    const state = loadInitialState();
    const newUser: UserProfile = {
      ...state.user,
      fullName: credentials.fullName.trim(),
      email: credentials.email.trim(),
      location: credentials.location?.trim() || 'Hyderabad, Telangana',
    };
    saveState({ ...state, isAuthenticated: true, user: newUser });
    return {
      user: newUser,
      token: 'jwt_yadav_community_' + Date.now(),
    };
  },

  async requestPasswordReset(email: string): Promise<string> {
    await delay(380);
    if (!email.includes('@')) {
      throw new Error('Please enter a valid registered email address.');
    }
    return `Password reset link sent to ${email}.`;
  },

  async publishPost(
    newPost: Omit<
      CommunityPost,
      'id' | 'likesCount' | 'isLiked' | 'comments' | 'sharesCount' | 'isSaved' | 'createdAt' | 'feedTabs'
    >,
  ): Promise<CommunityPost> {
    await delay(450);
    const created: CommunityPost = {
      ...newPost,
      id: `post_${Date.now()}`,
      likesCount: 1,
      isLiked: true,
      comments: [],
      sharesCount: 0,
      isSaved: false,
      createdAt: 'Just now',
      feedTabs: ['For You', 'Following', 'Trending'],
      isMine: true,
    };
    return created;
  },

  async addComment(authorName: string, authorAvatar: string, text: string): Promise<PostComment> {
    await delay(200);
    return {
      id: `cmt_${Date.now()}`,
      authorName,
      authorAvatar,
      text: text.trim(),
      createdAt: 'Just now',
    };
  },
};
