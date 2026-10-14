import React from 'react';

interface MarqueeBannerProps {
  variant?: 'dark' | 'amber' | 'cream' | 'chocolate' | 'gold' | 'mint' | 'peach' | 'sky' | 'coral' | 'indigo';
  speed?: 'normal' | 'slow' | 'fast';
  direction?: 'rtl' | 'ltr';
  customMessages?: string[];
  icon?: string;
  className?: string;
}

export const MarqueeBanner: React.FC<MarqueeBannerProps> = ({
  variant = 'chocolate',
  direction = 'rtl',
  customMessages,
  icon = '🐾',
  className = '',
}) => {
  const defaultMessages = [
    'ADOPT KINDNESS',
    'LOVE YOUR FOUR-LEGGED FRIENDS',
    '1% DEDICATED TO PET SHELTERS',
    'PROUD FAMILY MOVEMENT ON SOLANA',
    'CUTE DODO BRINGS SMILES EVERYWHERE',
    '100% TRANSPARENT FAMILY WALLETS',
  ];

  const messages = customMessages || defaultMessages;

  // Background & border themes matching Hachikohood & CuteDoDo cartoon palette
  const variantStyles: Record<string, string> = {
    chocolate: 'bg-[#49200B] text-[#FFD36A] border-y-2 border-[#49200B]',
    dark: 'bg-[#191C2D] text-[#FFF3DC] border-y-2 border-[#16364D]',
    amber: 'bg-[#FFD36A] text-[#49200B] border-y-2 border-[#49200B]',
    gold: 'bg-[#FFD36A] text-[#49200B] border-y-2 border-[#49200B]',
    cream: 'bg-[#FFF9F0] text-[#49200B] border-y-2 border-[#49200B]/20',
    mint: 'bg-[#C6EAD7] text-[#1B4332] border-y-2 border-[#1B4332]/40',
    peach: 'bg-[#F7D9C7] text-[#49200B] border-y-2 border-[#49200B]/40',
    sky: 'bg-[#DCEBFF] text-[#16364D] border-y-2 border-[#16364D]/40',
    coral: 'bg-[#FFE2E5] text-[#9F1239] border-y-2 border-[#9F1239]/40',
    indigo: 'bg-[#4338CA] text-[#E0E7FF] border-y-2 border-[#312E81]',
  };

  const animClass = direction === 'rtl' ? 'animate-marquee-rtl' : 'animate-marquee-ltr';

  const renderContentGroup = (keySuffix: string) => (
    <div key={keySuffix} className="flex items-center shrink-0">
      {messages.map((text, idx) => (
        <span
          key={`${keySuffix}-${idx}`}
          className="inline-flex items-center text-xs sm:text-sm md:text-base font-extrabold font-heading tracking-wider uppercase whitespace-nowrap px-4 sm:px-6 py-2.5 sm:py-3 select-none"
        >
          <span>{text}</span>
          <span className="mx-4 sm:mx-6 text-sm sm:text-base" aria-hidden="true">
            {icon}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`relative w-full overflow-hidden ${variantStyles[variant] || variantStyles.chocolate} ${className} z-20 pointer-events-none`}
      aria-label="Continuous Announcement Ticker"
    >
      <div className={`flex w-max ${animClass}`}>
        {/* Render twice for seamless continuous loop */}
        {renderContentGroup('group-1')}
        {renderContentGroup('group-2')}
      </div>
    </div>
  );
};
