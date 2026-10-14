import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { HeaderDodo } from './HeaderDodo';

interface NavbarProps {
  onOpenBuyModal?: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBuyModal,
  soundEnabled,
  setSoundEnabled,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
    if (next) sounds.bell();
  };

  const navLinks = [
    { label: 'About Dodo', href: '#about' },
    { label: 'Life Scenes 🎬', href: '#scenes' },
    { label: 'Tokenomics', href: '#tokenomics' },
    { label: 'How to Buy', href: '#buy' },
    { label: 'Charity', href: '#charity' },
    { label: 'Wallets', href: '#wallets' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FFF9F0]/95 backdrop-blur-md border-b border-[#49200B]/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4 md:gap-8">
          
          {/* Zone 1: Brand Wordmark + Floating Animated Dodo Mascot */}
          <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
            <a
              href="#"
              onClick={() => {
                sounds.bark();
              }}
              className="flex items-center gap-2.5 group"
            >
              {/* Floating Animated Header Dodo Character */}
              <HeaderDodo />

              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold font-heading tracking-tight text-[#49200B] group-hover:text-[#FF9F00] transition-colors">
                  CuteDoDo <span className="text-[#FF9F00]">$DODO</span>
                </span>
                <span className="text-[10px] font-semibold text-[#79513B] tracking-wide -mt-1 hidden sm:block">
                  Solana's Most Wholesome Shih Tzu
                </span>
              </div>
            </a>
          </div>

          {/* Zone 2: Concise, clean navigation links without heavy pill borders */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-[#79513B]">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => sounds.pop()}
                className="hover:text-[#49200B] hover:text-[#FF9F00] transition-colors whitespace-nowrap shrink-0 py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary CTA + Restyled Sound control */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Mute cartoon sounds' : 'Enable cartoon sounds'}
              className="p-2 sm:px-3 sm:py-2 text-xs font-bold rounded-xl bg-[#FFF9F0] hover:bg-[#F7D9C7] border-2 border-[#49200B] text-[#49200B] flex items-center gap-1.5 shadow-[2px_2px_0px_#49200B] active:translate-y-0.5 transition-all"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-[#FF9F00]" />
                  <span className="hidden sm:inline">Sound ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-[#79513B]/60" />
                  <span className="hidden sm:inline">Muted</span>
                </>
              )}
            </button>

            <a
              href="#buy"
              onClick={() => {
                sounds.coin();
                if (onOpenBuyModal) onOpenBuyModal();
              }}
              className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold font-heading text-[#49200B] bg-[#FFD36A] hover:bg-[#ffc947] border-2 border-[#49200B] rounded-2xl flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-[2.5px_2.5px_0px_#49200B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#49200B] transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#49200B]" />
              <span>Buy $DODO</span>
            </a>

            {/* Mobile hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#FFF9F0] hover:bg-[#F7D9C7] border-2 border-[#49200B] text-[#49200B] shadow-[2px_2px_0px_#49200B]"
              aria-label="Toggle Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 px-2 border-t border-[#49200B]/15 bg-[#FFF9F0] rounded-b-2xl grid grid-cols-2 gap-2 text-xs font-bold text-[#49200B]">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => {
                  sounds.pop();
                  setMobileMenuOpen(false);
                }}
                className="p-2 rounded-xl hover:bg-[#F7D9C7] text-[#79513B] hover:text-[#49200B] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
