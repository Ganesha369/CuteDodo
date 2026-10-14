import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/soundEffects';

export const CartoonScrollProgressDog: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 inset-x-0 z-50 pointer-events-none select-none h-1 sm:h-1.5 bg-[#FFF9F0]/80 border-b border-[#49200B]/10"
      aria-hidden="true"
    >
      {/* Sleek Warm Golden Progress Track */}
      <div
        className="h-full bg-[#FFD36A] transition-all duration-75 relative"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Subtle Animated Little CuteDODO sprinting on the edge */}
        <div
          className="absolute -right-3 -top-2 w-5 h-5 sm:w-6 sm:h-6 animate-dog-gallop pointer-events-auto cursor-pointer"
          onClick={() => {
            sounds.bark();
            sounds.bell();
          }}
          title="CuteDODO scrolling along with you! Click for a bark!"
        >
          <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-sm overflow-visible">
            {/* Wagging Tail */}
            <path d="M 6 20 C 2 15 2 10 5 8 C 8 9 8 14 7 19 Z" fill="#F7D9C7" stroke="#49200B" strokeWidth="1" className="animate-tail-fast" />
            {/* Body */}
            <ellipse cx="18" cy="22" rx="11" ry="8" fill="#FFF9F0" stroke="#49200B" strokeWidth="1.2" />
            <path d="M 13 16 C 18 15 23 18 22 24 C 18 27 13 26 13 20 Z" fill="#FF9F00" />
            {/* Head */}
            <circle cx="28" cy="16" r="7.5" fill="#FFF9F0" stroke="#49200B" strokeWidth="1.2" />
            {/* Ears */}
            <ellipse cx="23" cy="16" rx="2.5" ry="5.5" fill="#79513B" stroke="#49200B" strokeWidth="1" className="animate-ear-bounce" />
            <ellipse cx="33" cy="16" rx="2.5" ry="5.5" fill="#79513B" stroke="#49200B" strokeWidth="1" className="animate-ear-bounce" />
            {/* Eyes */}
            <circle cx="26" cy="15" r="1.1" fill="#49200B" />
            <circle cx="30" cy="15" r="1.1" fill="#49200B" />
            {/* Muzzle */}
            <ellipse cx="28" cy="18" rx="2.2" ry="1.6" fill="#F7D9C7" stroke="#49200B" strokeWidth="0.8" />
            <circle cx="28" cy="17.5" r="0.8" fill="#49200B" />
            {/* Topknot ribbon */}
            <polygon points="28,8 29.5,8 28.8,6.5" fill="#FF9F00" stroke="#49200B" strokeWidth="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
};
