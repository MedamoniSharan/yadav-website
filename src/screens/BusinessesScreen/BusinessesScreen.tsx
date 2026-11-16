import React, { useMemo, useState } from 'react';
import { BusinessCard } from '../../components/cards/BusinessCard';
import { PostCard } from '../../components/cards/PostCard';
import {
  SafeImage,
  VerifiedBadge,
  VrindavanSilhouetteFooter,
} from '../../components/common/KrishnaDecorations';
import {
  IgAutoIcon,
  IgBackIcon,
  IgCheckIcon,
  IgChevronRightIcon,
  IgCloseIcon,
  IgExternalLinkIcon,
  IgFashionIcon,
  IgFitnessIcon,
  IgFoodIcon,
  IgHealthIcon,
  IgHeartIcon,
  IgMapPinIcon,
  IgMoreGridIcon,
  IgPhoneIcon,
  IgPlusIcon,
  IgRealEstateIcon,
  IgSearchIcon,
  IgTechIcon,
} from '../../components/icons/AppIcons';
import { BUSINESS_CATEGORIES } from '../../constants/mockData';
import { useApp } from '../../context/AppContext';
import { Business, BusinessCategory } from '../../models/types';
import { ASSETS } from '../../theme/tokens';

const CATEGORY_ICONS: Record<BusinessCategory, React.ReactNode> = {
  Food: <IgFoodIcon className="w-6 h-6" />,
  Fitness: <IgFitnessIcon className="w-6 h-6" />,
  Fashion: <IgFashionIcon className="w-6 h-6" />,
  'IT Services': <IgTechIcon className="w-6 h-6" />,
  'Real Estate': <IgRealEstateIcon className="w-6 h-6" />,
  Automotive: <IgAutoIcon className="w-6 h-6" />,
  Healthcare: <IgHealthIcon className="w-6 h-6" />,
  More: <IgMoreGridIcon className="w-6 h-6" />,
};

export const BusinessesScreen: React.FC = () => {
  const {
    businesses,
    posts,
    selectedBusinessId,
    setSelectedBusinessId,
    toggleFollowBusiness,
    toggleFavoriteBusiness,
    navigateBack,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<BusinessCategory | null>(null);
  const [showAllBusinesses, setShowAllBusinesses] = useState(false);

  const selectedBusiness: Business | null = useMemo(
    () => businesses.find((b) => b.id === selectedBusinessId) || null,
    [businesses, selectedBusinessId],
  );

  const filteredBusinesses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return businesses.filter((b) => {
      const matchesCat =
        !activeCategory || activeCategory === 'More' ? true : b.category === activeCategory;
      const matchesSearch =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.subCategory.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [businesses, activeCategory, searchQuery]);

  const displayedBusinesses =
    showAllBusinesses || searchQuery.trim() || activeCategory
      ? filteredBusinesses
      : filteredBusinesses.slice(0, 2);

  const businessPosts = useMemo(() => {
    if (!selectedBusiness) return [];
    return posts.filter((p) => p.businessId === selectedBusiness.id);
  }, [posts, selectedBusiness]);

  return (
    <div className="min-h-screen bg-[#FFF8ED] pb-24 md:pb-2 flex flex-col">
      {/* Krishna Navy Header matching Screen 3 */}
      <header className="relative bg-krishna-header text-white px-4 pt-3.5 pb-5 rounded-b-[24px] shadow-[0_6px_20px_rgba(6,27,70,0.2)] overflow-hidden">
        <img
          src={ASSETS.peacockFeatherTransparent}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute -top-1 right-1 w-24 h-16 object-contain opacity-95"
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={navigateBack}
              aria-label="Go back"
              className="min-w-[44px] min-h-[44px] -ml-2 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <IgBackIcon className="w-5 h-5 text-white" />
            </button>

            <h1 className="font-display text-[24px] sm:text-[26px] font-semibold tracking-wide text-white">
              Businesses
            </h1>

            <div className="w-[44px]" aria-hidden="true" />
          </div>

          {/* Search Pill */}
          <div className="mt-3 relative">
            <IgSearchIcon className="w-4 h-4 text-[#667085] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search businesses in your community..."
              className="w-full pl-10 pr-9 py-2.5 rounded-full bg-white text-sm text-[#061B46] placeholder-[#667085] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E9A526]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] hover:text-[#061B46] p-1 cursor-pointer"
              >
                <IgCloseIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-5 space-y-6">
        {/* 8 Business Categories Grid */}
        <section aria-label="Business Categories">
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 sm:gap-3">
            {BUSINESS_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() =>
                    setActiveCategory(isSelected ? null : cat.id)
                  }
                  className={`flex flex-col items-center justify-center py-3 px-1.5 rounded-2xl bg-white transition-all cursor-pointer active:scale-95 ${
                    isSelected
                      ? 'border-2 border-[#E9A526] shadow-[0_4px_14px_rgba(233,165,38,0.22)]'
                      : 'border border-[#EADBC2]/80 shadow-[0_2px_8px_rgba(6,27,70,0.04)] hover:border-[#D99B27]'
                  }`}
                >
                  <span className="text-[#D99B27]">{CATEGORY_ICONS[cat.id]}</span>
                  <span className="mt-1.5 text-[11px] font-semibold text-[#061B46] text-center leading-tight whitespace-nowrap">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Featured Businesses Section */}
        <section aria-label="Featured Businesses" className="space-y-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <img
                src={ASSETS.ornamentKrishnaCrown}
                alt=""
                aria-hidden="true"
                className="w-6 h-5 object-contain shrink-0"
              />
              <h2 className="font-display text-[21px] font-bold text-[#061B46]">
                {activeCategory && activeCategory !== 'More'
                  ? `${activeCategory} Businesses`
                  : 'Featured Businesses'}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => {
                if (activeCategory) {
                  setActiveCategory(null);
                  setShowAllBusinesses(true);
                } else {
                  setShowAllBusinesses((v) => !v);
                }
              }}
              className="inline-flex items-center gap-0.5 text-xs font-semibold text-[#0B347A] hover:underline cursor-pointer whitespace-nowrap"
            >
              <span>{showAllBusinesses ? 'Show Featured' : 'View All'}</span>
              <IgChevronRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          {displayedBusinesses.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#EADBC2] p-8 text-center space-y-3">
              <img
                src={ASSETS.ornamentCowLying}
                alt=""
                aria-hidden="true"
                className="w-24 h-24 mx-auto object-contain"
              />
              <p className="text-sm font-semibold text-[#061B46]">
                No businesses found matching your criteria.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory(null);
                }}
                className="px-4 py-2 rounded-full bg-royal-pill text-white text-xs font-semibold cursor-pointer"
              >
                Show All Businesses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {displayedBusinesses.map((biz) => (
                <BusinessCard
                  key={biz.id}
                  business={biz}
                  onOpen={(b) => setSelectedBusinessId(b.id)}
                  onToggleFavorite={toggleFavoriteBusiness}
                  onToggleFollow={toggleFollowBusiness}
                />
              ))}
            </div>
          )}

          {/* Carousel Pagination Dots matching Screen 3 when showing Featured */}
          {!showAllBusinesses && !searchQuery && !activeCategory && (
            <div className="flex items-center justify-center gap-1.5 pt-1">
              <button
                type="button"
                aria-label="Page 1"
                onClick={() => setShowAllBusinesses(false)}
                className="w-2 h-2 rounded-full bg-[#D99B27] cursor-pointer"
              />
              {[1, 2, 3, 4].map((dot) => (
                <button
                  key={dot}
                  type="button"
                  aria-label={`View all page ${dot + 1}`}
                  onClick={() => setShowAllBusinesses(true)}
                  className="w-1.5 h-1.5 rounded-full bg-[#D99B27]/35 hover:bg-[#D99B27]/70 cursor-pointer"
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Vrindavan Pastoral Silhouettes Footer */}
      <VrindavanSilhouetteFooter className="mt-auto pt-4" />

      {/* Business Profile Detail Modal */}
      {selectedBusiness && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/65 backdrop-blur-xs sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={selectedBusiness.name}
          onClick={() => setSelectedBusinessId(null)}
        >
          <div
            className="w-full max-w-xl bg-[#FFF8ED] rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E9A526]/40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cover Banner */}
            <div className="relative h-48 sm:h-56 bg-[#061B46]">
              <SafeImage
                src={selectedBusiness.coverImage}
                alt={selectedBusiness.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061B46]/90 via-black/20 to-black/30" />

              <button
                type="button"
                onClick={() => setSelectedBusinessId(null)}
                aria-label="Close business profile"
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 cursor-pointer"
              >
                <IgCloseIcon className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-1.5">
                  <h2 className="font-display text-2xl font-bold leading-tight">
                    {selectedBusiness.name}
                  </h2>
                  {selectedBusiness.verified && <VerifiedBadge size={18} />}
                </div>
                <p className="text-xs text-[#F5D58B] mt-0.5">
                  {selectedBusiness.subCategory} · ★ {selectedBusiness.rating.toFixed(1)} (
                  {selectedBusiness.reviewCount} reviews)
                </p>
              </div>
            </div>

            <div className="p-5 space-y-4">
              {/* Primary Actions */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => toggleFollowBusiness(selectedBusiness.id)}
                  className={`flex-1 py-2.5 px-4 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    selectedBusiness.isFollowed
                      ? 'bg-white border border-[#0B347A] text-[#0B347A]'
                      : 'bg-royal-pill text-white shadow-sm'
                  }`}
                >
                  {selectedBusiness.isFollowed ? (
                    <>
                      <IgCheckIcon className="w-4 h-4" />
                      <span>Following Business</span>
                    </>
                  ) : (
                    <>
                      <IgPlusIcon className="w-4 h-4" strokeWidth={2.4} />
                      <span>Follow Business</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => toggleFavoriteBusiness(selectedBusiness.id)}
                  aria-label="Save favorite"
                  className="min-w-[44px] min-h-[42px] px-3.5 rounded-full bg-white border border-[#EADBC2] flex items-center justify-center gap-1.5 text-xs font-semibold text-[#061B46] cursor-pointer"
                >
                  <IgHeartIcon
                    filled={selectedBusiness.isFavorite}
                    className={`w-4 h-4 ${
                      selectedBusiness.isFavorite
                        ? 'text-[#ED4956]'
                        : 'text-[#667085]'
                    }`}
                  />
                  <span>{selectedBusiness.isFavorite ? 'Saved' : 'Save'}</span>
                </button>
              </div>

              {/* Community Offer Callout */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#061B46] to-[#0B347A] text-white p-4 border border-[#E9A526]/40 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold text-[#F5D58B] uppercase tracking-wider">
                    Yadav Community Member Benefit
                  </p>
                  <p className="text-sm font-semibold mt-0.5">{selectedBusiness.offerBanner}</p>
                </div>
                <img
                  src={ASSETS.ornamentKrishnaCrown}
                  alt=""
                  aria-hidden="true"
                  className="w-12 h-9 object-contain shrink-0 opacity-95"
                />
              </div>

              {/* About & Contact */}
              <div className="bg-white rounded-2xl border border-[#EADBC2] p-4 space-y-3">
                <p className="text-sm text-[#1D2939] leading-relaxed">
                  {selectedBusiness.description}
                </p>

                <div className="pt-2 border-t border-[#F4E9D6] space-y-2 text-xs text-[#475467]">
                  <div className="flex items-center gap-2">
                    <IgMapPinIcon className="w-4 h-4 text-[#D99B27] shrink-0" />
                    <span>{selectedBusiness.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IgPhoneIcon className="w-4 h-4 text-[#D99B27] shrink-0" />
                    <a
                      href={`tel:${selectedBusiness.phone.replace(/\s+/g, '')}`}
                      onClick={() => showToast(`Calling ${selectedBusiness.phone}`, 'info')}
                      className="font-medium text-[#0B347A] hover:underline"
                    >
                      {selectedBusiness.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <IgExternalLinkIcon className="w-4 h-4 text-[#D99B27] shrink-0" />
                    <button
                      type="button"
                      onClick={() =>
                        showToast(`Opening ${selectedBusiness.website}`, 'info')
                      }
                      className="font-medium text-[#0B347A] hover:underline truncate cursor-pointer"
                    >
                      {selectedBusiness.website}
                    </button>
                  </div>
                </div>
              </div>

              {/* Business Advertisements */}
              <div className="space-y-3">
                <h3 className="font-display text-lg font-bold text-[#061B46]">
                  Recent Advertisements &amp; Updates
                </h3>
                {businessPosts.length === 0 ? (
                  <p className="text-xs text-[#667085] bg-white rounded-2xl border border-[#EADBC2] p-4">
                    No active advertisements posted yet by {selectedBusiness.name}.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {businessPosts.map((p) => (
                      <PostCard key={p.id} post={p} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
