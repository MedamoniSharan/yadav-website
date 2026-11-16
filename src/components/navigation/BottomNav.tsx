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

  const renderOuterTab = (
    tab: Exclude<MainTabId, 'create'>,
    label: string,
    icon: React.ReactNode,
  ) => {
    const isActive = activeTab === tab;
    return (
      <button
        key={tab}
        type="button"
        onClick={() => handleSelect(tab)}
        aria-label={label}
        aria-current={isActive ? 'page' : undefined}
        title={label}
        className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center transition-all active:scale-95 cursor-pointer ${
          isActive
            ? 'bg-white text-[#18181B] shadow-[0_3px_12px_rgba(0,0,0,0.28)]'
            : 'bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 text-white/90'
        }`}
      >
        {icon}
      </button>
    );
  };

  return (
    <nav
      aria-label="Primary Mobile Navigation"
      className="md:hidden fixed left-1/2 -translate-x-1/2 z-40 w-[min(324px,calc(100vw-28px))]"
      style={{ bottom: 'max(14px, env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="bg-[#252527]/95 backdrop-blur-xl rounded-full p-2 border border-white/12 shadow-[0_14px_34px_rgba(6,27,70,0.34)]">
        <div className="grid grid-cols-5 items-center gap-1.5">
          {renderOuterTab('home', 'Home', <IgHomeIcon className="w-[22px] h-[22px]" filled={false} />)}

          {renderOuterTab(
            'businesses',
            'Businesses',
            <IgShopIcon className="w-[21px] h-[21px]" filled={false} />,
          )}

          {/* Center Glowing Orb Create Button */}
          <button
            type="button"
            onClick={() => handleSelect('create')}
            aria-label="Create Post or Advertisement"
            aria-current={activeTab === 'create' ? 'page' : undefined}
            title="Publish & Promote"
            className={`relative w-12 h-12 mx-auto rounded-full flex items-center justify-center transition-all active:scale-95 cursor-pointer overflow-hidden ${
              activeTab === 'create'
                ? 'ring-2 ring-white scale-105 shadow-[0_0_20px_rgba(250,100,0,0.6)]'
                : 'ring-1 ring-white/30 shadow-[0_4px_16px_rgba(250,100,0,0.42)] hover:scale-105'
            }`}
            style={{
              background:
                'radial-gradient(circle at 28% 24%, #FFF6D6 0%, rgba(255,246,214,0) 44%), radial-gradient(circle at 75% 22%, #A855F7 0%, rgba(168,85,247,0) 52%), radial-gradient(circle at 24% 78%, #38BDF8 0%, rgba(56,189,248,0) 54%), linear-gradient(135deg, #FBBF24 0%, #FA6400 50%, #EC4899 100%)',
            }}
          >
            <IgPlusIcon
              className="w-6 h-6 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]"
              strokeWidth={2.5}
            />
          </button>

          {renderOuterTab(
            'community',
            'Community',
            <IgCommunityIcon className="w-[22px] h-[22px]" filled={false} />,
          )}

          {renderOuterTab(
            'profile',
            'Profile',
            <IgProfileIcon className="w-[22px] h-[22px]" filled={false} />,
          )}
        </div>
      </div>
    </nav>
  );
};
