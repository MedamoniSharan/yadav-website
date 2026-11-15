import React from 'react';
import { Check, Heart, Plus, Star } from 'lucide-react';
import { Business } from '../../models/types';
import { SafeImage, VerifiedBadge } from '../common/KrishnaDecorations';

interface BusinessCardProps {
  business: Business;
  onOpen: (business: Business) => void;
  onToggleFavorite: (id: string) => void;
  onToggleFollow: (id: string) => void;
  compact?: boolean;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  onOpen,
  onToggleFavorite,
  onToggleFollow,
  compact = false,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#EADBC2]/80 shadow-[0_3px_12px_rgba(6,27,70,0.06)] overflow-hidden flex flex-col">
      {/* Cover Image with Rating & Favorite overlay matching Screen 3 */}
      <div className="relative aspect-[16/11] bg-[#061B46] overflow-hidden">
        <button
          type="button"
          onClick={() => onOpen(business)}
          className="w-full h-full block cursor-pointer group"
          aria-label={`Open ${business.name}`}
        >
          <SafeImage
            src={business.coverImage}
            alt={business.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
        </button>

        {/* Rating Badge Bottom-Left */}
        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-white/95 shadow-sm flex items-center gap-1 text-[11px] font-bold text-[#061B46] tabular-nums pointer-events-none">
          <Star className="w-3 h-3 fill-[#E9A526] text-[#E9A526]" />
          <span>{business.rating.toFixed(1)}</span>
          <span className="font-normal text-[#667085]">({business.reviewCount})</span>
        </div>

        {/* Favorite Heart Button Bottom-Right */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(business.id);
          }}
          aria-label={business.isFavorite ? `Remove ${business.name} from favorites` : `Favorite ${business.name}`}
          className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-black/45 border border-white/75 backdrop-blur-xs flex items-center justify-center text-white hover:bg-black/65 transition-transform active:scale-90 cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 ${
              business.isFavorite ? 'fill-[#E11D48] text-[#E11D48]' : 'text-white'
            }`}
          />
        </button>
      </div>

      {/* Card Body */}
      <div className={`p-3 flex-1 flex flex-col justify-between ${compact ? '' : 'gap-2'}`}>
        <button
          type="button"
          onClick={() => onOpen(business)}
          className="text-left w-full cursor-pointer"
        >
          <div className="flex items-center gap-1">
            <h3 className="text-[13.5px] font-bold text-[#061B46] truncate">
              {business.name}
            </h3>
            {business.verified && <VerifiedBadge size={13} />}
          </div>
          <p className="text-[11.5px] text-[#667085] truncate mt-0.5">{business.subCategory}</p>
        </button>

        <div className="pt-2 flex items-center justify-between gap-2">
          <span className="text-[11px] text-[#667085] truncate">{business.location.split(',')[0]}</span>
          <button
            type="button"
            onClick={() => onToggleFollow(business.id)}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors shrink-0 cursor-pointer ${
              business.isFollowed
                ? 'bg-[#EEF4FF] text-[#0B347A] border border-[#0B347A]/20'
                : 'bg-royal-pill text-white hover:brightness-110'
            }`}
          >
            {business.isFollowed ? (
              <>
                <Check className="w-3 h-3" />
                <span>Following</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3" />
                <span>Follow</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
