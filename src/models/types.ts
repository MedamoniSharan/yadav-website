export type MainTabId = 'home' | 'businesses' | 'create' | 'community' | 'profile';

export type FeedTab = 'For You' | 'Following' | 'Trending';

export type BusinessCategory =
  | 'Food'
  | 'Fitness'
  | 'Fashion'
  | 'IT Services'
  | 'Real Estate'
  | 'Automotive'
  | 'Healthcare'
  | 'More';

export type PostContentType = 'post' | 'video' | 'event';

export interface UserProfile {
  id: string;
  fullName: string;
  verified: boolean;
  roleLabel: string;
  location: string;
  avatar: string;
  email: string;
  phone: string;
  bio: string;
  businessName?: string;
  postsCount: number;
  likesCount: number;
  groupsCount: number;
  savedCount: number;
}

export interface Business {
  id: string;
  name: string;
  category: BusinessCategory;
  subCategory: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  location: string;
  description: string;
  coverImage: string;
  logoBadge: string;
  phone: string;
  website: string;
  offerBanner: string;
  isFollowed: boolean;
  isFavorite: boolean;
}

export interface PostMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  duration?: string;
}

export interface PostComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  contentType: PostContentType;
  businessId?: string;
  authorName: string;
  authorAvatar: string;
  authorLogoText?: string;
  isVerified: boolean;
  isSponsored: boolean;
  location: string;
  category: string;
  description: string;
  contactInfo?: string;
  websiteUrl?: string;
  media: PostMedia[];
  likesCount: number;
  isLiked: boolean;
  comments: PostComment[];
  sharesCount: number;
  isSaved: boolean;
  createdAt: string;
  feedTabs: FeedTab[];
  eventDate?: string;
  eventVenue?: string;
  isMine?: boolean;
}

export interface GroupDiscussionPost {
  id: string;
  groupId: string;
  authorName: string;
  authorAvatar: string;
  role: string;
  content: string;
  createdAt: string;
  likesCount: number;
  isLiked: boolean;
  comments: PostComment[];
}

export interface CommunityGroup {
  id: string;
  name: string;
  iconKey: 'discussion' | 'promotions' | 'jobs' | 'events';
  iconBg: string;
  membersCount: number;
  membersLabel: string;
  description: string;
  isJoined: boolean;
  discussions: GroupDiscussionPost[];
}

export interface AppNotification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'group' | 'business';
  title: string;
  message: string;
  timeAgo: string;
  read: boolean;
  targetTab?: MainTabId;
}

export interface AuthCredentials {
  email: string;
  password: string;
  fullName?: string;
  location?: string;
}
