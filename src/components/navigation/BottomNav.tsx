import React from 'react';
import { useApp } from '../../context/AppContext';
import { MainTabId } from '../../models/types';
import {
  IgCommunityIcon,
  IgHomeIcon,
  IgPlusIcon,
  IgProfileIcon,
  IgShopIcon,
} from '../icons/AppIcons';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const handleSelect = (tab: MainTabId) => {
    setActiveTab(tab);
  };

  return (
    <nav
      aria-label="Primary Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EADBC2] shadow-[0_-4px_20px_rgba(6,27,70,0.08)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="grid grid-cols-5 items-end h-[64px] max-w-lg mx-auto px-1">
        {/* Home */}
        <button
          type="button"
          onClick={() => handleSelect('home')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1.5 transition-colors cursor-pointer ${
            activeTab === 'home' ? 'text-[#061B46]' : 'text-[#5C6B84] hover:text-[#061B46]'
          }`}
        >
          <IgHomeIcon className="w-[23px] h-[23px]" filled={activeTab === 'home'} />
          <span
            className={`text-[11px] mt-0.5 leading-tight whitespace-nowrap ${
              activeTab === 'home' ? 'font-bold text-[#061B46]' : 'font-medium'
            }`}
          >
            Home
          </span>
        </button>

        {/* Businesses */}
        <button
          type="button"
          onClick={() => handleSelect('businesses')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1.5 transition-colors cursor-pointer ${
            activeTab === 'businesses' ? 'text-[#061B46]' : 'text-[#5C6B84] hover:text-[#061B46]'
          }`}
        >
          <IgShopIcon className="w-[23px] h-[23px]" filled={activeTab === 'businesses'} />
          <span
            className={`text-[11px] mt-0.5 leading-tight whitespace-nowrap ${
              activeTab === 'businesses' ? 'font-bold text-[#061B46]' : 'font-medium'
            }`}
          >
            Businesses
          </span>
        </button>

        {/* Center Elevated Create (+) Button */}
        <div className="flex flex-col items-center justify-end pb-2">
          <button
            type="button"
            onClick={() => handleSelect('create')}
            aria-label="Create Post or Advertisement"
            className={`w-[52px] h-[52px] -mt-5 rounded-full bg-gold-orb text-white flex items-center justify-center shadow-[0_6px_18px_rgba(233,165,38,0.55)] ring-4 ring-[#FFF8ED] transition-transform active:scale-95 cursor-pointer ${
              activeTab === 'create' ? 'ring-[#E9A526]/40 scale-105' : ''
            }`}
          >
            <IgPlusIcon className="w-7 h-7" strokeWidth={2.5} />
          </button>
        </div>

        {/* Community */}
        <button
          type="button"
          onClick={() => handleSelect('community')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1.5 transition-colors cursor-pointer ${
            activeTab === 'community' ? 'text-[#061B46]' : 'text-[#5C6B84] hover:text-[#061B46]'
          }`}
        >
          <IgCommunityIcon className="w-[23px] h-[23px]" filled={activeTab === 'community'} />
          <span
            className={`text-[11px] mt-0.5 leading-tight whitespace-nowrap ${
              activeTab === 'community' ? 'font-bold text-[#061B46]' : 'font-medium'
            }`}
          >
            Community
          </span>
        </button>

        {/* Profile */}
        <button
          type="button"
          onClick={() => handleSelect('profile')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1.5 transition-colors cursor-pointer ${
            activeTab === 'profile' ? 'text-[#061B46]' : 'text-[#5C6B84] hover:text-[#061B46]'
          }`}
        >
          <IgProfileIcon className="w-[23px] h-[23px]" filled={activeTab === 'profile'} />
          <span
            className={`text-[11px] mt-0.5 leading-tight whitespace-nowrap ${
              activeTab === 'profile' ? 'font-bold text-[#061B46]' : 'font-medium'
            }`}
          >
            Profile
          </span>
        </button>
      </div>
    </nav>
  );
};
