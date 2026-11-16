import React, { useMemo, useState } from 'react';
import { PostCard } from '../../components/cards/PostCard';
import {
  BusinessCategoryCircles,
  BusinessHeroCarousel,
  CommunityPillarsShowcase,
} from '../../components/common/BusinessSpotlightCarousel';
import {
  GoldenCowEmblem,
  OrnamentalLotusDivider,
  SafeImage,
  VerifiedBadge,
} from '../../components/common/KrishnaDecorations';
import {
  IgBellIcon,
  IgChevronRightIcon,
  IgCloseIcon,
  IgCommunityIcon,
  IgLogoutIcon,
  IgMenuIcon,
  IgPhotoIcon,
  IgShopIcon,
  IgSparklesIcon,
} from '../../components/icons/AppIcons';
import { useApp } from '../../context/AppContext';
import { BusinessCategory, FeedTab } from '../../models/types';
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
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesTab =
        feedTab === 'For You'
          ? post.feedTabs.includes('For You')
          : post.feedTabs.includes('Following') ||
            businesses.some((b) => b.id === post.businessId && b.isFollowed);

      const matchesQuick =
        homeQuickFilter === 'all'
          ? true
          : homeQuickFilter === 'videos'
            ? post.contentType === 'video' || post.media.some((m) => m.type === 'video')
            : post.contentType === 'event';

      const matchesCategory =
        !selectedCategory || selectedCategory === 'More'
          ? true
          : post.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesTab && matchesQuick && matchesCategory;
    });
  }, [posts, feedTab, homeQuickFilter, selectedCategory, businesses]);

  const featuredBusinesses = useMemo(() => businesses.slice(0, 3), [businesses]);

  return (
    <div className="min-h-screen bg-[#FFF8ED] pb-24 md:pb-10 overflow-x-clip">
      {/* Krishna Navy Header */}
      <header className="bg-krishna-header text-white px-3 sm:px-4 pt-3 pb-3.5 rounded-b-[24px] shadow-[0_6px_20px_rgba(6,27,70,0.2)]">
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

        {/* Featured Business Spotlight Carousel & Category Circles */}
        <div className="pt-2 space-y-4">
          <BusinessHeroCarousel
            onListNow={() => setActiveTab('create')}
            onNavigateCommunity={() => setActiveTab('community')}
            onNavigateBusinesses={() => setActiveTab('businesses')}
          />

          <BusinessCategoryCircles
            activeCategory={selectedCategory}
            onSelectCategory={(cat) => {
              if (cat === 'More') {
                setActiveTab('businesses');
                return;
              }
              setSelectedCategory((prev) => (prev === cat ? null : cat));
            }}
          />

          <CommunityPillarsShowcase
            onSelectHeritage={() => setActiveTab('community')}
            onSelectPromote={() => setActiveTab('create')}
            onSelectGrow={() => setActiveTab('community')}
          />
        </div>


        {/* Responsive 2-column desktop / 1-column mobile feed layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Primary Feed Column */}
          <div className="lg:col-span-8 space-y-3.5">
            {/* Feed Segmented Navigation (For You | Following) */}
            <div className="border-b border-[#EADBC2]/90">
              <div className="grid grid-cols-2 items-center max-w-md mx-auto sm:max-w-none">
                {(['For You', 'Following'] as FeedTab[]).map((tab) => {
                  const active = feedTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setFeedTab(tab)}
                      className="relative flex flex-col items-center justify-center pt-1 pb-2.5 cursor-pointer group"
                    >
                      <span
                        className={`px-6 py-2 rounded-full text-[14px] font-semibold transition-all whitespace-nowrap ${
                          active
                            ? 'bg-[#FA6400] text-white shadow-[0_4px_12px_rgba(250,100,0,0.28)]'
                            : 'text-[#061B46]/80 group-hover:text-[#061B46] group-hover:bg-[#061B46]/5'
                        }`}
                      >
                        {tab}
                      </span>
                      {active && (
                        <span
                          aria-hidden="true"
                          className="absolute bottom-0 w-14 h-[2.5px] rounded-full bg-[#FA6400]"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Quick / Category Filter Indicator */}
            {(homeQuickFilter !== 'all' || selectedCategory !== null) && (
              <div className="flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-[#061B46]/5 border border-[#061B46]/15 text-xs">
                <span className="font-semibold text-[#061B46] truncate">
                  Showing{' '}
                  {[
                    homeQuickFilter === 'videos'
                      ? 'Community Videos'
                      : homeQuickFilter === 'events'
                        ? 'Community Events'
                        : null,
                    selectedCategory ? `${selectedCategory} Updates` : null,
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setHomeQuickFilter('all');
                    setSelectedCategory(null);
                  }}
                  className="font-semibold text-[#0B347A] hover:underline cursor-pointer shrink-0"
                >
                  Show All
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
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {selectedCategory && (
                    <button
                      type="button"
                      onClick={() => setActiveTab('businesses')}
                      className="px-4 py-2 rounded-full border border-[#0B347A] text-[#0B347A] text-xs font-semibold hover:bg-[#FFF8ED] cursor-pointer"
                    >
                      Browse {selectedCategory} Businesses
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setHomeQuickFilter('all');
                      setSelectedCategory(null);
                      setFeedTab('For You');
                    }}
                    className="px-4 py-2 rounded-full bg-royal-pill text-white text-xs font-semibold cursor-pointer"
                  >
                    Reset Feed Filters
                  </button>
                </div>
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
          className="fixed inset-0 z-50 h-[100dvh] bg-black/50 backdrop-blur-xs flex md:hidden"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="w-72 bg-[#FFF8ED] h-full max-h-[100dvh] shadow-2xl flex flex-col border-r border-[#EADBC2] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-krishna-header text-white p-4 shrink-0">
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <div className="flex items-center gap-2 min-w-0">
                  <GoldenCowEmblem className="w-11 h-9 shrink-0 -mt-0.5" />
                  <div className="min-w-0">
                    <span className="block font-display text-[17px] font-semibold text-[#F5D58B] leading-tight truncate">
                      Yadav Community
                    </span>
                    <span className="block text-[10px] text-white/75 tracking-wide">
                      Connect • Promote • Grow
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  className="p-1.5 rounded-full hover:bg-white/10 shrink-0 cursor-pointer"
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

            <div className="flex-1 overflow-y-auto px-4 pt-3.5 pb-2 flex flex-col justify-between gap-3">
              <div className="space-y-1 text-sm font-medium text-[#061B46]">
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

              {/* Peacock Heritage Artwork inside Sidebar Drawer */}
              <div className="relative flex items-end justify-between gap-2 pt-1 px-1">
                <div className="pb-2 space-y-0.5 max-w-[125px]">
                  <p className="font-display text-xs font-bold text-[#061B46]">
                    Yadav Heritage
                  </p>
                  <p className="text-[10.5px] leading-snug text-[#667085]">
                    Uniting community founders &amp; culture.
                  </p>
                </div>
                <img
                  src={ASSETS.peacockSidebar}
                  alt="Peacock Heritage Ornament"
                  className="w-28 h-32 object-contain object-bottom shrink-0 drop-shadow-[0_6px_14px_rgba(6,27,70,0.16)] pointer-events-none select-none"
                />
              </div>
            </div>

            <div
              className="px-4 py-3.5 border-t border-[#EADBC2] bg-[#FFF8ED] shrink-0"
              style={{ paddingBottom: 'max(14px, env(safe-area-inset-bottom, 0px))' }}
            >
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => {
                    setDrawerOpen(false);
                    logoutUser();
                    onOpenAuth();
                  }}
                  className="w-full py-2.5 px-4 rounded-full bg-[#FEF2F2] hover:bg-[#FEE2E2] active:scale-[0.99] border border-[#FECACA] text-[#DC2626] text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <IgLogoutIcon className="w-4 h-4 text-[#DC2626] shrink-0" />
                  <span>Sign Out</span>
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
