import React from 'react';
import { CheckCircle2, Circle, Clock, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface PhaseData {
  phaseNumber: string;
  badge: 'Next' | 'Planned';
  title: string;
  badgeColor: string;
  items: string[];
}

export const Roadmap: React.FC = () => {
  const phases: PhaseData[] = [
    {
      phaseNumber: 'Phase 01',
      badge: 'Next',
      title: 'Launch',
      badgeColor: 'bg-[#FFD36A] text-[#49200B]',
      items: [
        'Public launch on pump.fun',
        'Mint & freeze authority revoked',
        'Website with live chart & swap',
        'Telegram, X & Discord community',
      ],
    },
    {
      phaseNumber: 'Phase 02',
      badge: 'Planned',
      title: 'Graduation',
      badgeColor: 'bg-[#C6EAD7] text-[#49200B]',
      items: [
        'Complete the bonding curve',
        'DEX liquidity & Jupiter routing',
        'DexScreener profile & token info',
        'First holder vote on shelters',
      ],
    },
    {
      phaseNumber: 'Phase 03',
      badge: 'Planned',
      title: 'Paws for a Cause',
      badgeColor: 'bg-[#F7D9C7] text-[#49200B]',
      items: [
        'First donation to a shelter in India',
        'Public charity wallet & receipts',
        'Adoption stories from the shelters',
        'Dodo meme & sticker packs',
      ],
    },
    {
      phaseNumber: 'Phase 04',
      badge: 'Planned',
      title: 'Grow the Pack',
      badgeColor: 'bg-[#FFD36A] text-[#49200B]',
      items: [
        'CoinGecko & CoinMarketCap applications',
        'Shelter partners beyond India',
        'Dodo merch, proceeds to the fund',
        'Community-led events',
      ],
    },
  ];

  return (
    <section id="roadmap" className="py-8 sm:py-12 md:py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD36A] border border-[#49200B]/30 rounded-xl text-xs font-bold font-heading text-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] mb-2 sm:mb-3">
            <span>🗺️ The Master Paw Plan</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#49200B] tracking-tight mb-2 sm:mb-3">
            The Plan, <span className="text-[#FF9F00]">Paw by Paw</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#79513B] font-medium">
            Goals, not promises. Each phase is updated here as it happens.
          </p>
        </div>

        {/* 4 Phases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {phases.map((ph, phIdx) => {
            const phaseBgs = ['bg-[#f0c8ed]', 'bg-[#f6dfb9]', 'bg-[#bef0c4]', 'bg-[#96ece5]'];
            const cardBg = phaseBgs[phIdx] || 'bg-[#FFF9F0]';

            return (
              <div
                key={ph.phaseNumber}
                className={`cartoon-card ${cardBg} rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="text-[11px] sm:text-xs font-mono font-bold text-[#79513B]">
                      {ph.phaseNumber}
                    </span>
                    <span className={`text-[11px] sm:text-xs font-bold font-heading px-2 sm:px-2.5 py-0.5 rounded-lg border border-[#49200B] shadow-[1px_1px_0px_#49200B] ${ph.badgeColor}`}>
                      {ph.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#49200B] mb-3 sm:mb-4">
                    {ph.title}
                  </h3>

                  <ul className="space-y-3">
                    {ph.items.map((item, itemIdx) => {
                      const isPhase4Item2 = phIdx === 3 && itemIdx === 1;

                      return (
                        <li
                          key={itemIdx}
                          className={`flex items-start gap-2.5 text-xs sm:text-sm text-[#79513B] font-medium ${
                            isPhase4Item2 ? 'bg-[#c7b6b6] p-1.5 rounded-xl border border-[#49200B]/20' : ''
                          }`}
                        >
                          <div className="w-5 h-5 rounded-lg bg-white border border-[#49200B]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#FF9F00]">
                            🐾
                          </div>
                          <span className={`leading-snug ${isPhase4Item2 ? 'bg-[#e5dae5] px-1.5 py-0.5 rounded-md text-[#49200B] font-bold' : ''}`}>
                            {item}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-[#49200B]/15 text-[11px] font-semibold text-[#79513B] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#FF9F00]" />
                  <span>Phase Status: {ph.badge}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
