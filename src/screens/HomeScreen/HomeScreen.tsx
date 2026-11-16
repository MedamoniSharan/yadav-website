import React, { useMemo, useState } from 'react';
import { PostCard } from '../../components/cards/PostCard';
import {
  GoldenCowEmblem,
  OrnamentalLotusDivider,
  SafeImage,
  VerifiedBadge,
} from '../../components/common/KrishnaDecorations';
import {
  IgBellIcon,
  IgCalendarIcon,
  IgChevronRightIcon,
  IgCloseIcon,
  IgCommunityIcon,
  IgMenuIcon,
  IgPhotoIcon,
  IgReelsIcon,
  IgSearchIcon,
  IgShopIcon,
  IgSparklesIcon,
} from '../../components/icons/AppIcons';
import { useApp } from '../../context/AppContext';
import { FeedTab } from '../../models/types';
import { ASSETS } from '../../theme/tokens';

interface HomeScreenProps {
  onOpenNotifications: () => void;
  onOpenAuth: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onOpenNotifications,
  onOpenAuth,
}) => {
  const {
    user,
    posts,
    businesses,
    groups,
    unreadNotificationsCount,
    setActiveTab,
    setSelectedBusinessId,
    homeQuickFilter,
    setHomeQuickFilter,
    replaySplash,
    isAuthenticated,
    logoutUser,
  } = useApp();

  const [feedTab, setFeedTab] = useState<FeedTab>('For You');
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesTab =
        feedTab === 'For You'
          ? post.feedTabs.includes('For You')
          : feedTab === 'Following'
            ? post.feedTabs.includes('Following') ||
              businesses.some((b) => b.id === post.businessId && b.isFollowed)
            : post.feedTabs.includes('Trending') || post.likesCount >= 200;

      const matchesQuick =
        homeQuickFilter === 'all'
          ? true
          : homeQuickFilter === 'videos'
            ? post.contentType === 'video' || post.media.some((m) => m.type === 'video')
            : post.contentType === 'event';

      const matchesQuery =
        !q ||
        post.authorName.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.location.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);

      return matchesTab && matchesQuick && matchesQuery;
    });
  }, [posts, feedTab, homeQuickFilter, searchQuery, businesses]);

  const featuredBusinesses = useMemo(() => businesses.slice(0, 3), [businesses]);

  return (
    <div className="min-h-screen bg-[#FFF8ED] pb-24 md:pb-10 overflow-x-clip">
      {/* Krishna Navy Header matching Screen 2 */}
      <header className="bg-krishna-header text-white px-3 sm:px-4 pt-3.5 pb-4 rounded-b-[24px] shadow-[0_6px_20px_rgba(6,27,70,0.2)]">
        <div className="max-w-5xl mx-auto">
          {/* Top App Row */}
          <div className="flex items-center justify-between gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
                className="min-w-[38px] min-h-[38px] sm:min-w-[40px] sm:min-h-[40px] -ml-1 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer md:hidden"
              >
                <IgMenuIcon className="w-6 h-6 text-white" />
              </button>

              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <GoldenCowEmblem className="w-12 h-10 sm:w-14 sm:h-11 shrink-0 -mt-0.5 mx-1" />
                <span className="font-display text-[22px] sm:text-2xl font-semibold text-[#F5D58B] tracking-wide truncate">
                  Yadav Community
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={onOpenNotifications}
                aria-label="Notifications"
                className="relative min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <IgBellIcon className="w-[22px] h-[22px] text-white" filled={unreadNotificationsCount > 0} />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-[#ED4956] text-white text-[10px] font-bold flex items-center justify-center tabular-nums ring-2 ring-[#061B46]">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                aria-label="Go to My Profile"
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#E9A526] shadow-sm cursor-pointer shrink-0"
              >
                <SafeImage
                  src={user.avatar}
                  alt={user.fullName}
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-3 relative">
            <IgSearchIcon className="w-4 h-4 text-[#F5D58B]/80 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search businesses, posts, members..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white/10 border border-white/15 text-sm text-white placeholder-white/65 focus:outline-none focus:border-[#E9A526]/70 focus:bg-white/15 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-1 cursor-pointer"
              >
                <IgCloseIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 4 Quick Navigation Cards */}
          <div className="mt-3.5 grid grid-cols-4 gap-2.5">
            <button
              type="button"
              onClick={() => setActiveTab('businesses')}
              className="flex flex-col items-center justify-center py-2.5 px-1 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all active:scale-95 cursor-pointer"
            >
              <IgShopIcon className="w-6 h-6 text-[#F5D58B]" />
              <span className="mt-1.5 text-[11.5px] font-medium text-white whitespace-nowrap">
                Businesses
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                setHomeQuickFilter(homeQuickFilter === 'videos' ? 'all' : 'videos')
              }
              className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-2xl border transition-all active:scale-95 cursor-pointer ${
                homeQuickFilter === 'videos'
                  ? 'bg-[#E9A526]/25 border-[#F5D58B] shadow-inner'
                  : 'bg-white/10 hover:bg-white/15 border-white/15'
              }`}
            >
              <IgReelsIcon className="w-6 h-6 text-[#F5D58B]" filled={homeQuickFilter === 'videos'} />
              <span className="mt-1.5 text-[11.5px] font-medium text-white whitespace-nowrap">
                Videos
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                setHomeQuickFilter(homeQuickFilter === 'events' ? 'all' : 'events')
              }
              className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-2xl border transition-all active:scale-95 cursor-pointer ${
                homeQuickFilter === 'events'
                  ? 'bg-[#E9A526]/25 border-[#F5D58B] shadow-inner'
                  : 'bg-white/10 hover:bg-white/15 border-white/15'
              }`}
            >
              <IgCalendarIcon className="w-6 h-6 text-[#F5D58B]" />
              <span className="mt-1.5 text-[11.5px] font-medium text-white whitespace-nowrap">
                Events
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('community')}
              className="flex flex-col items-center justify-center py-2.5 px-1 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all active:scale-95 cursor-pointer"
            >
              <IgCommunityIcon className="w-6 h-6 text-[#F5D58B]" />
              <span className="mt-1.5 text-[11.5px] font-medium text-white whitespace-nowrap">
                Groups
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-3.5 sm:px-6 pt-3 space-y-3.5">
        {/* Global Community Banner matching Screen 2 with Pop-Out Ornaments */}
        <section
          aria-label="Global Yadav Community Banner"
          className="relative overflow-visible my-1.5 sm:my-2 text-white px-2 sm:px-8 py-3 sm:py-3.5"
        >
          {/* Inner Clipped Navy Card Backdrop */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-r from-[#061B46] via-[#0B3C6E] to-[#07486B] shadow-[0_8px_22px_rgba(6,27,70,0.18)] border border-[#E9A526]/45"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  'radial-gradient(circle at 50% 45%, rgba(233,165,38,0.32) 0%, transparent 65%)',
              }}
            />
          </div>

          {/* Left Peacock Feather: large & popping in-and-out of compact box */}
          <img
            src={ASSETS.peacockFeather}
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none absolute z-20 -left-4 -bottom-4 sm:-left-5 sm:-bottom-5 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain -rotate-12 drop-shadow-[0_6px_14px_rgba(6,27,70,0.45)]"
          />

          {/* Right Golden Flute: large & popping in-and-out of compact box */}
          <img
            src={ASSETS.goldenFlute}
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none absolute z-20 -right-3 -bottom-3 sm:-right-4 sm:-bottom-4 w-28 h-16 sm:w-36 sm:h-20 md:w-44 md:h-24 object-contain -rotate-12 drop-shadow-[0_6px_14px_rgba(6,27,70,0.45)]"
          />

          <div className="relative z-10 text-center px-8 sm:px-20 md:px-24">
            <h2 className="font-display text-[17px] sm:text-[23px] md:text-[25px] font-semibold text-[#F5D58B] leading-tight tracking-normal sm:tracking-wide drop-shadow-xs">
              A Global Yadav Community
            </h2>
            <p className="text-[11px] sm:text-[13.5px] text-white/90 mt-0.5 leading-snug">
              for Business, Networking &amp; Growth.
            </p>
          </div>
        </section>

        {/* Responsive 2-column desktop / 1-column mobile feed layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Primary Feed Column */}
          <div className="lg:col-span-8 space-y-3.5">
            {/* Feed Segmented Navigation (For You | Following | Trending) */}
            <div className="bg-white rounded-full p-1 border border-[#EADBC2] shadow-xs grid grid-cols-3 gap-1">
              {(['For You', 'Following', 'Trending'] as FeedTab[]).map((tab) => {
                const active = feedTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setFeedTab(tab)}
                    className={`py-2 px-3 rounded-full text-[13px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      active
                        ? 'bg-royal-pill text-white shadow-sm'
                        : 'text-[#061B46]/75 hover:text-[#061B46] hover:bg-[#FFF8ED]'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Active Quick Filter Indicator if Videos/Events selected */}
            {homeQuickFilter !== 'all' && (
              <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#061B46]/5 border border-[#061B46]/15 text-xs">
                <span className="font-semibold text-[#061B46]">
                  Showing {homeQuickFilter === 'videos' ? 'Community Videos' : 'Community Events'}
                </span>
                <button
                  type="button"
                  onClick={() => setHomeQuickFilter('all')}
                  className="font-semibold text-[#0B347A] hover:underline cursor-pointer"
                >
                  Show All Posts
                </button>
              </div>
            )}

            {/* Posts List */}
            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#EADBC2] p-8 text-center space-y-3">
                <img
                  src={ASSETS.ornamentCowStandingCalf}
                  alt=""
                  aria-hidden="true"
                  className="w-24 h-24 mx-auto object-contain"
                />
                <OrnamentalLotusDivider className="w-40 h-5 mx-auto opacity-80" />
                <p className="text-sm font-semibold text-[#061B46]">
                  No posts match your current filter.
                </p>
                <p className="text-xs text-[#667085]">
                  Try switching feed tabs or publish a new community update!
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setHomeQuickFilter('all');
                    setFeedTab('For You');
                  }}
                  className="px-4 py-2 rounded-full bg-royal-pill text-white text-xs font-semibold cursor-pointer"
                >
                  Reset Feed Filters
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                {filteredPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>

          {/* Desktop Right Rail (Hidden on mobile so mobile stays identical to Screen 2) */}
          <aside className="hidden lg:block lg:col-span-4 space-y-4 sticky top-4">
            <div className="bg-white rounded-2xl border border-[#EADBC2] p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={ASSETS.pinkLotus}
                    alt=""
                    aria-hidden="true"
                    className="w-5 h-5 object-contain"
                  />
                  <h3 className="font-display text-lg font-bold text-[#061B46]">
                    Featured Businesses
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('businesses')}
                  className="text-xs font-semibold text-[#0B347A] hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <span>View All</span>
                  <IgChevronRightIcon className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2.5">
                {featuredBusinesses.map((biz) => (
                  <button
                    key={biz.id}
                    type="button"
                    onClick={() => {
                      setSelectedBusinessId(biz.id);
                      setActiveTab('businesses');
                    }}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-[#FFF8ED] transition-colors text-left cursor-pointer"
                  >
                    <SafeImage
                      src={biz.coverImage}
                      alt={biz.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#EADBC2]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-[#061B46] truncate">
                          {biz.name}
                        </span>
                        {biz.verified && <VerifiedBadge size={12} />}
                      </div>
                      <p className="text-[11px] text-[#667085] truncate">{biz.subCategory}</p>
                      <p className="text-[11px] font-semibold text-[#D99B27] tabular-nums">
                        ★ {biz.rating.toFixed(1)} ({biz.reviewCount})
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#EADBC2] p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-[#061B46]">
                  Active Groups
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('community')}
                  className="text-xs font-semibold text-[#0B347A] hover:underline cursor-pointer"
                >
                  Explore
                </button>
              </div>
              <div className="space-y-2">
                {groups.map((grp) => (
                  <button
                    key={grp.id}
                    type="button"
                    onClick={() => setActiveTab('community')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[#FFF8ED] hover:bg-[#FBF1E0] transition-colors text-left cursor-pointer"
                  >
                    <span className="text-xs font-semibold text-[#061B46] truncate">
                      {grp.name}
                    </span>
                    <span className="text-[11px] text-[#667085] tabular-nums shrink-0">
                      {grp.membersLabel}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cultural & Culinary Heritage Spotlight */}
            <div className="bg-white rounded-2xl border border-[#EADBC2] p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-[#061B46]">
                  Heritage &amp; Local Pride
                </h3>
                <img
                  src={ASSETS.ornamentKrishnaCrown}
                  alt=""
                  aria-hidden="true"
                  className="w-7 h-5 object-contain"
                />
              </div>
              <div className="flex items-center gap-3 bg-[#FFF8ED] rounded-xl p-3 border border-[#EADBC2]/70">
                <img
                  src={ASSETS.ornamentCowStandingCalf}
                  alt="Gau Seva & Yadav Dairy Heritage"
                  className="w-16 h-16 object-contain shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#061B46]">
                    Dairy, Food &amp; Swadeshi Craft
                  </p>
                  <p className="text-[11px] text-[#667085] mt-0.5 leading-snug">
                    Support verified Yadav-owned restaurants, organic farms &amp; dairies.
                  </p>
                </div>
                <img
                  src={ASSETS.ornamentButterPot}
                  alt="Makhan Matki"
                  aria-hidden="true"
                  className="w-14 h-14 object-contain shrink-0 drop-shadow-[0_3px_8px_rgba(6,27,70,0.18)]"
                />
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('businesses')}
                className="w-full py-2 rounded-full border border-[#D99B27] text-xs font-semibold text-[#061B46] hover:bg-[#FFF8ED] transition-colors cursor-pointer"
              >
                Explore Verified Directory
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Slide-Out Menu Drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex md:hidden"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="w-72 bg-[#FFF8ED] h-full shadow-2xl flex flex-col border-r border-[#EADBC2]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-krishna-header text-white p-5">
              <div className="flex items-center justify-between mb-3">
                <GoldenCowEmblem className="w-12 h-10 -mt-0.5" />
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  className="p-1.5 rounded-full hover:bg-white/10 cursor-pointer"
                >
                  <IgCloseIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <SafeImage
                  src={user.avatar}
                  alt={user.fullName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#E9A526]"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-bold text-white truncate">{user.fullName}</p>
                    {user.verified && <VerifiedBadge size={13} />}
                  </div>
                  <p className="text-xs text-[#F5D58B] truncate">{user.location}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-4 space-y-1.5 text-sm font-medium text-[#061B46]">
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  setActiveTab('businesses');
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-white cursor-pointer"
              >
                <IgShopIcon className="w-4 h-4 text-[#D99B27]" />
                <span>Business Directory</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  setActiveTab('community');
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-white cursor-pointer"
              >
                <IgCommunityIcon className="w-4 h-4 text-[#D99B27]" />
                <span>Community Groups</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  setActiveTab('create');
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-white cursor-pointer"
              >
                <IgPhotoIcon className="w-4 h-4 text-[#D99B27]" />
                <span>Publish Advertisement</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  replaySplash();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-white cursor-pointer"
              >
                <IgSparklesIcon className="w-4 h-4 text-[#D99B27]" />
                <span>View Welcome Splash</span>
              </button>
            </div>

            <div className="p-4 border-t border-[#EADBC2]">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => {
                    setDrawerOpen(false);
                    logoutUser();
                    onOpenAuth();
                  }}
                  className="w-full py-2.5 rounded-full border border-[#0B347A] text-[#0B347A] text-xs font-semibold cursor-pointer"
                >
                  Switch Account / Sign Out
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setDrawerOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full py-2.5 rounded-full bg-royal-pill text-white text-xs font-semibold cursor-pointer"
                >
                  Sign In / Register
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
