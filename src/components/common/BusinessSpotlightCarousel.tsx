import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import catAutoIcon from '../../assets/images/cat_auto_icon_1794849496755.jpg';
import catFashionIcon from '../../assets/images/cat_fashion_icon_1794849495720.jpg';
import catFitnessIcon from '../../assets/images/cat_fitness_icon_1794849495193.jpg';
import catFoodIcon from '../../assets/images/cat_food_icon_1794849495342.jpg';
import catHealthIcon from '../../assets/images/cat_health_icon_1794849498087.jpg';
import catMoreIcon from '../../assets/images/cat_more_icon_1794849497871.jpg';
import catRealEstateIcon from '../../assets/images/cat_realestate_icon_1794849496896.jpg';
import catTechIcon from '../../assets/images/cat_tech_icon_1794849496005.jpg';
import { BUSINESS_CATEGORIES } from '../../constants/mockData';
import { BusinessCategory } from '../../models/types';
import { ASSETS } from '../../theme/tokens';

const CATEGORY_IMAGES: Record<
  BusinessCategory,
  { src: string; imgClass: string }
> = {
  Food: { src: catFoodIcon, imgClass: 'w-12 h-12 scale-[1.18]' },
  Fitness: { src: catFitnessIcon, imgClass: 'w-12 h-12 scale-[1.08]' },
  Fashion: { src: catFashionIcon, imgClass: 'w-12 h-12 scale-[1.1]' },
  'IT Services': { src: catTechIcon, imgClass: 'w-12 h-12 scale-[1.12]' },
  'Real Estate': { src: catRealEstateIcon, imgClass: 'w-12 h-12 scale-[1.12]' },
  Automotive: { src: catAutoIcon, imgClass: 'w-12 h-12 scale-[1.12]' },
  Healthcare: { src: catHealthIcon, imgClass: 'w-12 h-12 scale-[1.18]' },
  More: { src: catMoreIcon, imgClass: 'w-11 h-11 scale-[1.02]' },
};

const CATEGORY_CIRCLE_STYLES: Record<BusinessCategory, string> = {
  Food: 'bg-[#FFF0DB]',
  Fitness: 'bg-[#FFE7E5]',
  Fashion: 'bg-[#FCE8F6]',
  'IT Services': 'bg-[#E5F0FF]',
  'Real Estate': 'bg-[#E4F6EC]',
  Automotive: 'bg-[#FFF3D6]',
  Healthcare: 'bg-[#E2F5F4]',
  More: 'bg-[#EFEAFF]',
};

interface HeroSlide {
  id: string;
  actionType: 'list' | 'community' | 'businesses';
  variant?: 'default' | 'promote';
  eyebrow: string;
  titleLines: [string, string];
  subtitle: string;
  cta: string;
  image: string;
  renderMode: 'img' | 'sprite';
  aspectClass: string;
  bgSize?: string;
  bgPosition?: string;
  maskGradient: string;
  cardGradient: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide_promote_business',
    actionType: 'list',
    variant: 'promote',
    eyebrow: 'Yadav Community',
    titleLines: ['Promote Your', 'Business'],
    subtitle: 'Showcase your services, products, and ideas to the Yadav Community.',
    cta: 'Promote Now',
    image: ASSETS.promoteBusinessHeroBanner,
    renderMode: 'img',
    aspectClass: 'aspect-[2/1]',
    maskGradient:
      'linear-gradient(108deg, transparent 0%, transparent 52.4%, rgba(0,0,0,0.88) 57%, #000 61%)',
    cardGradient: 'linear-gradient(135deg, #FFFDF9 0%, #FEF6E9 55%, #FCEBD2 100%)',
  },
  {
    id: 'slide_community_showcase',
    actionType: 'list',
    variant: 'default',
    eyebrow: 'Yadav Community',
    titleLines: ['Showcase Your', 'Business & Ideas'],
    subtitle: 'Promote your business, share ideas, and grow together as a community.',
    cta: 'List Now',
    image: ASSETS.communityHeroBanner,
    renderMode: 'img',
    aspectClass: 'aspect-[736/408]',
    maskGradient:
      'linear-gradient(106deg, transparent 0%, transparent 52.6%, rgba(0,0,0,0.85) 57.5%, #000 62%)',
    cardGradient: 'linear-gradient(135deg, #FBF4EA 0%, #FCF1E0 55%, #FAE6D3 100%)',
  },
  {
    id: 'slide_share_grow',
    actionType: 'community',
    variant: 'default',
    eyebrow: 'Community Network',
    titleLines: ['Share Ideas &', 'Grow Together'],
    subtitle: 'Discuss, mentor, and build new opportunities across global Yadav chapters.',
    cta: 'Explore Groups',
    image: ASSETS.communityPillarsTrio,
    renderMode: 'sprite',
    aspectClass: 'aspect-[5/6]',
    bgSize: '375.6% 104.3%',
    bgPosition: '99.3% 50%',
    maskGradient:
      'linear-gradient(96deg, transparent 0%, transparent 45.5%, rgba(0,0,0,0.86) 54%, #000 62%)',
    cardGradient: 'linear-gradient(135deg, #FFFBF3 0%, #FEF3DF 58%, #FDE2BD 100%)',
  },
  {
    id: 'slide_verified_directory',
    actionType: 'businesses',
    variant: 'default',
    eyebrow: 'Verified Directory',
    titleLines: ['Explore Trusted', 'Yadav Businesses'],
    subtitle: 'Support verified member ventures, startups, hospitality, and local services.',
    cta: 'Browse Directory',
    image: ASSETS.communityPillarsTrio,
    renderMode: 'sprite',
    aspectClass: 'aspect-square',
    bgSize: '313% 104.3%',
    bgPosition: '0.8% 50%',
    maskGradient:
      'linear-gradient(104deg, transparent 0%, transparent 14%, rgba(0,0,0,0.82) 34%, #000 52%)',
    cardGradient: 'linear-gradient(135deg, #FBF4EA 0%, #FCEFD9 55%, #F9DEC0 100%)',
  },
];

const MegaphoneVectorIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
    <g transform="rotate(-14 24 24)">
      <path
        d="M11 21 C11 19.3 12.3 18 14 18 L18 18 L31 11.5 C32.3 10.9 33.8 11.8 33.8 13.3 L33.8 31.7 C33.8 33.2 32.3 34.1 31 33.5 L18 27 L14 27 C12.3 27 11 25.7 11 24 Z"
        fill="#F2690D"
      />
      <path
        d="M15 27 L17.6 35.2 C18 36.4 19.5 36.8 20.6 36 C21.3 35.4 21.5 34.5 21.2 33.6 L19 27 Z"
        fill="#DF5A06"
      />
      <path d="M38 17 L43 13.5" stroke="#F2690D" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M39 22.5 L45 22.5" stroke="#F2690D" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M38 28 L43 31.5" stroke="#F2690D" strokeWidth="2.8" strokeLinecap="round" />
    </g>
  </svg>
);

interface BusinessHeroCarouselProps {
  onListNow?: () => void;
  onNavigateCommunity?: () => void;
  onNavigateBusinesses?: () => void;
}

export const BusinessHeroCarousel: React.FC<BusinessHeroCarouselProps> = ({
  onListNow,
  onNavigateCommunity,
  onNavigateBusinesses,
}) => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (heroPaused) return;
    const timer = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [heroPaused]);

  const activeSlide = HERO_SLIDES[heroIndex];
  const isPromote = activeSlide.variant === 'promote';

  const handleSlideCta = () => {
    if (activeSlide.actionType === 'community') {
      onNavigateCommunity?.();
      return;
    }
    if (activeSlide.actionType === 'businesses') {
      onNavigateBusinesses?.();
      return;
    }
    onListNow?.();
  };

  return (
    <section
      aria-label="Community Business Spotlight"
      onMouseEnter={() => setHeroPaused(true)}
      onMouseLeave={() => setHeroPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const deltaX = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
        if (Math.abs(deltaX) > 40) {
          setHeroIndex((prev) =>
            deltaX < 0
              ? (prev + 1) % HERO_SLIDES.length
              : (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
          );
        }
        touchStartX.current = null;
      }}
      className="relative rounded-3xl overflow-hidden border border-[#EADBC2]/90 shadow-[0_10px_28px_rgba(6,27,70,0.08)]"
      style={{ background: activeSlide.cardGradient }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative min-h-[218px] sm:min-h-[258px] md:min-h-[280px] flex items-center"
        >
          {/* Decorative Soft Bottom Wave for Promote Slide */}
          {isPromote && (
            <svg
              viewBox="0 0 600 120"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="pointer-events-none select-none absolute bottom-0 left-0 w-full h-20 sm:h-24 z-[1] opacity-70"
              style={{
                maskImage: 'linear-gradient(90deg, black 0%, black 34%, transparent 58%)',
                WebkitMaskImage: 'linear-gradient(90deg, black 0%, black 34%, transparent 58%)',
              }}
            >
              <path
                d="M0 95 C100 108 190 36 330 56 C440 72 520 102 600 84 L600 120 L0 120 Z"
                fill="url(#promoteWave)"
              />
              <defs>
                <linearGradient id="promoteWave" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FCE6C5" />
                  <stop offset="55%" stopColor="#F5BD79" />
                  <stop offset="100%" stopColor="#F5BD79" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {/* Full-Height Seamlessly Blended Right Scenic Artwork */}
          <div
            aria-hidden="true"
            className={`pointer-events-none select-none absolute inset-y-0 right-0 h-full ${activeSlide.aspectClass} z-0 overflow-hidden`}
          >
            {activeSlide.renderMode === 'sprite' ? (
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${activeSlide.image})`,
                  backgroundSize: activeSlide.bgSize,
                  backgroundPosition: activeSlide.bgPosition,
                  backgroundRepeat: 'no-repeat',
                  maskImage: activeSlide.maskGradient,
                  WebkitMaskImage: activeSlide.maskGradient,
                }}
              />
            ) : (
              <img
                src={activeSlide.image}
                alt=""
                className="relative z-10 w-full h-full object-cover object-right"
                style={{
                  maskImage: activeSlide.maskGradient,
                  WebkitMaskImage: activeSlide.maskGradient,
                }}
              />
            )}
          </div>

          {/* Mobile Soft Cream Readability Scrim */}
          <div
            aria-hidden="true"
            className="sm:hidden pointer-events-none absolute inset-y-0 left-0 w-[64%] z-[5] bg-gradient-to-r from-[#FBF4EA] via-[#FBF4EA]/85 to-transparent"
          />

          {/* Left Editorial Copy & CTA */}
          {isPromote ? (
            <div className="relative z-10 w-[62%] sm:w-[55%] px-5 sm:px-8 pt-4 pb-11 sm:py-6 sm:pb-12 space-y-1.5 sm:space-y-2">
              <img
                src={ASSETS.promoteFeatherCrest}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                className="w-28 sm:w-36 h-8 sm:h-10 object-contain object-left -ml-1 pointer-events-none select-none"
              />
              <div className="flex items-start gap-2 sm:gap-3">
                <h2 className="font-sans font-extrabold leading-[1.03] tracking-tight">
                  <span className="block text-[20px] sm:text-[29px] md:text-[32px] text-[#061B46]">
                    {activeSlide.titleLines[0]}
                  </span>
                  <span className="block text-[25px] sm:text-[38px] md:text-[42px] text-[#E2600A]">
                    {activeSlide.titleLines[1]}
                  </span>
                </h2>
                <MegaphoneVectorIcon className="w-8 h-8 sm:w-11 sm:h-11 shrink-0 mt-1" />
              </div>
              <p className="text-[11.5px] sm:text-[14px] text-[#475467] leading-snug max-w-[235px] sm:max-w-[330px]">
                {activeSlide.subtitle}
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleSlideCta}
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#FA6400] hover:bg-[#E85B00] text-white text-xs sm:text-[13px] font-semibold shadow-[0_6px_16px_rgba(250,100,0,0.28)] active:scale-95 transition-all cursor-pointer"
                >
                  <span>{activeSlide.cta}</span>
                  <svg
                    viewBox="0 0 20 20"
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 10h12" />
                    <path d="m11 5 5 5-5 5" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="relative z-10 w-[62%] sm:w-[54%] px-5 sm:px-8 pt-5 pb-11 sm:py-7 sm:pb-12 space-y-2 sm:space-y-2.5">
              <p className="text-[13px] sm:text-base font-bold text-[#FA6400] tracking-tight leading-none">
                {activeSlide.eyebrow}
              </p>
              <h2 className="font-sans text-[21px] sm:text-[31px] md:text-[34px] font-extrabold text-[#061B46] leading-[1.08] tracking-tight">
                <span className="block">{activeSlide.titleLines[0]}</span>
                <span className="block">{activeSlide.titleLines[1]}</span>
              </h2>
              <p className="text-[11.5px] sm:text-[14px] text-[#475467] leading-snug max-w-[240px] sm:max-w-[330px]">
                {activeSlide.subtitle}
              </p>
              <div className="pt-1 sm:pt-1.5">
                <button
                  type="button"
                  onClick={handleSlideCta}
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#FA6400] hover:bg-[#E85B00] text-white text-xs sm:text-sm font-semibold shadow-[0_6px_16px_rgba(250,100,0,0.28)] active:scale-95 transition-all cursor-pointer"
                >
                  <span>{activeSlide.cta}</span>
                  <svg
                    viewBox="0 0 20 20"
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 10h12" />
                    <path d="m11 5 5 5-5 5" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Bottom-Left Carousel Dots */}
      <div className="absolute bottom-3.5 left-5 sm:left-8 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((slide, idx) => {
          const isCurrent = idx === heroIndex;
          return (
            <button
              key={slide.id}
              type="button"
              aria-label={`Show slide ${idx + 1}: ${slide.titleLines.join(' ')}`}
              onClick={() => setHeroIndex(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                isCurrent
                  ? 'w-2.5 bg-[#FA6400]'
                  : 'w-2.5 bg-[#061B46]/15 hover:bg-[#061B46]/35'
              }`}
            />
          );
        })}
      </div>
    </section>
  );
};

interface BusinessCategoryCirclesProps {
  activeCategory: BusinessCategory | null;
  onSelectCategory: (category: BusinessCategory) => void;
}

export const BusinessCategoryCircles: React.FC<BusinessCategoryCirclesProps> = ({
  activeCategory,
  onSelectCategory,
}) => (
  <section aria-label="Business Categories">
    <div className="flex items-start gap-3.5 overflow-x-auto no-scrollbar py-1 px-0.5 sm:grid sm:grid-cols-8 sm:gap-2">
      {BUSINESS_CATEGORIES.map((cat) => {
        const isSelected = activeCategory === cat.id;
        const iconAsset = CATEGORY_IMAGES[cat.id];
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className="flex flex-col items-center shrink-0 min-w-[66px] sm:min-w-0 group cursor-pointer active:scale-95 transition-transform"
          >
            <span
              className={`w-15 h-15 sm:w-16 sm:h-16 rounded-full overflow-hidden flex items-center justify-center transition-all shadow-[0_3px_10px_rgba(6,27,70,0.08)] border border-white/80 ${
                CATEGORY_CIRCLE_STYLES[cat.id]
              } ${
                isSelected
                  ? 'ring-2 ring-[#E9A526] ring-offset-2 ring-offset-[#FFF8ED] scale-105'
                  : 'group-hover:scale-105'
              }`}
            >
              <img
                src={iconAsset.src}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                className={`${iconAsset.imgClass} object-contain mix-blend-multiply brightness-[1.07] contrast-[1.06] pointer-events-none select-none`}
              />
            </span>
            <span
              className={`mt-1.5 text-[11.5px] font-semibold text-center leading-tight whitespace-nowrap ${
                isSelected ? 'text-[#0B347A]' : 'text-[#061B46]'
              }`}
            >
              {cat.label}
            </span>
          </button>
        );
      })}
    </div>
  </section>
);

interface CommunityPillarsShowcaseProps {
  onSelectHeritage: () => void;
  onSelectPromote: () => void;
  onSelectGrow: () => void;
}

export const CommunityPillarsShowcase: React.FC<CommunityPillarsShowcaseProps> = ({
  onSelectHeritage,
  onSelectPromote,
  onSelectGrow,
}) => {
  const pillars = [
    {
      id: 'pillar_heritage',
      label: 'Yadav Heritage & Community',
      bgPosition: '0.8% 50%',
      onClick: onSelectHeritage,
    },
    {
      id: 'pillar_promote',
      label: 'Promote Your Business — Create ads and reach the Yadav community',
      bgPosition: '50% 50%',
      onClick: onSelectPromote,
    },
    {
      id: 'pillar_grow',
      label: 'Share Ideas & Grow Together — Discuss, collaborate, and build opportunities',
      bgPosition: '99.3% 50%',
      onClick: onSelectGrow,
    },
  ];

  return (
    <section aria-label="Community Highlights" className="pt-0.5">
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar py-1 px-0.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible">
        {pillars.map((pillar) => (
          <button
            key={pillar.id}
            type="button"
            onClick={pillar.onClick}
            aria-label={pillar.label}
            className="w-[70%] shrink-0 snap-start sm:w-auto aspect-square rounded-2xl overflow-hidden border border-[#EADBC2] shadow-[0_6px_18px_rgba(6,27,70,0.08)] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(6,27,70,0.13)] active:scale-[0.98] transition-all cursor-pointer bg-[#FFF8ED]"
            style={{
              backgroundImage: `url(${ASSETS.communityPillarsTrio})`,
              backgroundSize: '313% 104.3%',
              backgroundPosition: pillar.bgPosition,
              backgroundRepeat: 'no-repeat',
            }}
          />
        ))}
      </div>
    </section>
  );
};
