import React from 'react';
import { Heart, Scale, Lock, Globe2, PawPrint } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
export const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#F7D9C7] border border-[#49200B]/30 rounded-xl text-xs font-bold font-heading text-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] mb-3">
            <span>🐾 About CuteDoDo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#49200B] tracking-tight mb-4">
            The Real Dog Behind <span className="text-[#FF9F00]">$DODO</span>
          </h2>
          <p className="text-base sm:text-lg text-[#79513B] font-medium leading-relaxed">
            Dodo is a 1.2-year-old CuteDODO from Chennai, India. He loves dressing up, long naps and every person who walks through the door. $DODO turns that joy into a community, and part of it goes back to dogs who don&apos;t have a home yet.
          </p>
          <p className="text-sm font-bold text-[#49200B] mt-2 font-heading">
            Inspired by one happy CuteDODO. Dedicated to giving every dog a home.
          </p>
        </div>

        {/* Big Heartwarming Story Showcase */}
        <div className="cartoon-card bg-white rounded-3xl p-6 sm:p-8 lg:p-10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Story Text */}
            <div className="lg:col-span-7 space-y-4 text-[#49200B] leading-relaxed font-medium">
              <div className="flex items-center gap-2 text-[#FF9F00] font-heading font-bold text-lg">
                <Heart className="w-5 h-5 fill-[#FF9F00] text-[#FF9F00]" />
                <span>In a small home in Tamil Nadu...</span>
              </div>
              
              <p className="text-base sm:text-lg text-[#49200B] font-semibold">
                In a small home in Tamil Nadu, a fluffy little guy named CuteDODO came into VJDurga’s family 1.5–2 years ago. From the first day, this happy soul filled every corner with love and laughter.
              </p>

              <p className="text-sm sm:text-base text-[#79513B]">
                Kids play with him, grandma sits beside him, and every visitor falls in love the moment they see his smiling face. CuteDODO is sharp, active and full of fun—he keeps the whole house smiling every single day.
              </p>

              <div className="p-4 bg-[#FFF9F0] border-2 border-[#49200B] rounded-2xl shadow-[2px_2px_0px_#49200B]">
                <p className="text-sm sm:text-base font-bold font-heading text-[#49200B]">
                  Seeing how much joy one small dog can bring, the VJDurga family and close friends decided to do something bigger.
                </p>
                <p className="text-xs sm:text-sm text-[#79513B] mt-1 font-medium">
                  We are launching CuteDODO token not for quick pumps, but for a real long-term mission: A true charity that helps street dogs—giving water to thirsty ones, food to hungry ones, and shelter to those who have none.
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#79513B]">
                Real people stand behind this project who are <strong className="text-[#49200B]">doxxed, genuine dog lovers</strong> from different countries, connected through VJDurga’s journey across 7 nations and the web3 world. Guardian wallets never sell. Donation wallets openly show every help that reaches the dogs.
              </p>

              <p className="text-base font-bold font-heading text-[#49200B] pt-2">
                &ldquo;This is not just a coin. This is a family dog’s story turning into hope for thousands of other dogs. For everyone who believes in the pure love of pets... CuteDODO is here to stay and make a real difference.&rdquo;
              </p>
            </div>

            {/* Wholesome Illustration */}
            <div className="lg:col-span-5">
              <div style={{ width: '473.337px', height: '411.725px', maxWidth: '100%' }} className="relative rounded-3xl overflow-hidden border-2 border-[#49200B] shadow-[4px_5px_0px_#49200B] bg-[#FFF9F0] flex flex-col">
                <img
                  src="/assets/images/cutedodo_saving_strays_1791659633565.jpg"
                  alt="CuteDODO sharing food and clean water with street puppies"
                  className="w-full h-auto object-cover"
                />
                <div className="p-3 bg-[#FFF9F0] border-t-2 border-[#49200B] flex items-center justify-between text-xs font-bold font-heading text-[#49200B]">
                  <span>🐾 DODO feeding street puppies in Chennai</span>
                  <span className="text-[11px] bg-[#FFD36A] px-2 py-0.5 rounded-lg border border-[#49200B]">100% Real Cause</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Open Launch */}
          <div
            onMouseEnter={() => sounds.pop()}
            className="cartoon-card bg-[#c3a592] text-[#49200B] rounded-3xl p-6 hover:-translate-y-1 hover:shadow-[4px_5px_0px_#49200B] transition-all duration-200 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#49200B] flex items-center justify-center text-2xl mb-4 shadow-[2px_2px_0px_#49200B] group-hover:scale-105 transition-transform">
              <Scale className="w-6 h-6 text-[#49200B]" />
            </div>
            <h3 className="text-xl font-extrabold font-heading text-[#49200B] mb-2">
              Open Launch
            </h3>
            <p className="text-sm text-[#49200B]/90 font-semibold leading-relaxed">
              Launched on pump.fun. No presale, no private round. Every team wallet that buys at launch is listed on our Transparency page.
            </p>
          </div>

          {/* Card 2: Authorities Revoked */}
          <div
            onMouseEnter={() => sounds.pop()}
            className="cartoon-card bg-[#7fab86] text-[#49200B] rounded-3xl p-6 hover:-translate-y-1 hover:shadow-[4px_5px_0px_#49200B] transition-all duration-200 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#49200B] flex items-center justify-center text-2xl mb-4 shadow-[2px_2px_0px_#49200B] group-hover:scale-105 transition-transform">
              <Lock className="w-6 h-6 text-[#49200B]" />
            </div>
            <h3 className="text-xl font-extrabold font-heading text-[#49200B] mb-2">
              Authorities Revoked
            </h3>
            <p className="text-sm text-[#49200B]/90 font-semibold leading-relaxed">
              Mint and freeze authority are revoked at launch, so no new $DODO can be created and no wallet can be frozen. Check it on Solscan.
            </p>
          </div>

          {/* Card 3: Graduates On-Chain */}
          <div
            onMouseEnter={() => sounds.pop()}
            className="cartoon-card bg-[#7f7ca1] text-white rounded-3xl p-6 hover:-translate-y-1 hover:shadow-[4px_5px_0px_#49200B] transition-all duration-200 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#49200B] flex items-center justify-center text-2xl mb-4 shadow-[2px_2px_0px_#49200B] group-hover:scale-105 transition-transform">
              <Globe2 className="w-6 h-6 text-[#7f7ca1]" />
            </div>
            <h3 className="text-xl font-extrabold font-heading text-white mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
              Graduates On-Chain
            </h3>
            <p className="text-sm text-indigo-100 font-semibold leading-relaxed">
              When the pump.fun bonding curve completes (around a $69k market cap), liquidity moves to a Solana DEX automatically.
            </p>
          </div>

          {/* Card 4: Paws for a Cause */}
          <div
            onMouseEnter={() => sounds.pop()}
            className="cartoon-card bg-[#987178] text-white rounded-3xl p-6 hover:-translate-y-1 hover:shadow-[4px_5px_0px_#49200B] transition-all duration-200 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#49200B] flex items-center justify-center text-2xl mb-4 shadow-[2px_2px_0px_#49200B] group-hover:scale-105 transition-transform">
              <PawPrint className="w-6 h-6 text-[#987178]" />
            </div>
            <h3 className="text-xl font-extrabold font-heading text-white mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
              Paws for a Cause
            </h3>
            <p className="text-sm text-rose-100 font-semibold leading-relaxed">
              1% of the supply is set aside for pet shelters and orphanages, starting in India. Holders vote on which shelters receive it.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
