import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { ASSETS } from '../../theme/tokens';

export const SplashScreen: React.FC = () => {
  const { dismissSplash } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      dismissSplash();
    }, 2800);
    return () => clearTimeout(timer);
  }, [dismissSplash]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
      onClick={dismissSplash}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') dismissSplash();
      }}
      aria-label="Yadav Community Splash Screen — Tap to continue"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden cursor-pointer select-none"
      style={{
        background: 'linear-gradient(180deg, #014187 0%, #032B69 52%, #012856 100%)',
      }}
    >
      {/* Responsive 9:16 Splash Artwork Container — preserves full Krishna, branding, cows & arch on every screen */}
      <div className="relative h-full w-full flex items-center justify-center md:p-4">
        <div className="relative aspect-[9/16] w-[min(100%,calc(100dvh*9/16))] md:w-[min(100%,calc(94dvh*9/16))] overflow-hidden md:rounded-3xl md:shadow-[0_24px_70px_rgba(0,0,0,0.55)] md:border md:border-[#E9A526]/35">
          <img
            src={ASSETS.krishnaSplash}
            alt="Yadav Community — Lord Krishna playing flute in Vrindavan with cows"
            className="w-full h-full object-cover object-center"
          />

          {/* Seamless mask + live animated golden loading bar positioned exactly over the bottom bar slot */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-[93.5%] w-[30%] h-[1.7%] rounded-full flex items-center justify-center px-[3px]"
            style={{
              background: 'linear-gradient(180deg, #273D15 0%, #1E3315 100%)',
            }}
            aria-hidden="true"
          >
            <div className="w-full h-[76%] rounded-full bg-white/25 overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.55, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(180deg, #FFF5C0 0%, #F5C75B 55%, #E39F24 100%)',
                }}
              />
            </div>
          </div>

          <span className="sr-only">Loading Yadav Community... Tap anywhere to enter.</span>
        </div>
      </div>
    </motion.div>
  );
};
