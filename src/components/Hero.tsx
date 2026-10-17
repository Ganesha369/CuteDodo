import React, { useState } from 'react';
import { Copy, Check, ExternalLink, ArrowRight, ShieldCheck, Heart, Sparkles, MousePointer } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { ForestDriveScene } from './ForestDriveScene';
import { GardenFamilyPlayScene } from './GardenFamilyPlayScene';
import { CartoonDogWalkMarquee } from './CartoonDogWalkMarquee';
import { MarqueeBanner } from './MarqueeBanner';

interface HeroProps {
  onOpenBuyModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBuyModal }) => {
  const [copied, setCopied] = useState(false);
  const [liveMode, setLiveMode] = useState(false);
  const [mascotMood, setMascotMood] = useState<'happy' | 'barking' | 'eating'>('happy');
  const [speechBubbleText, setSpeechBubbleText] = useState('Woof! Welcome to my pack! 🐾');



  const contractAddress = 'Coming soon';

  const handleCopy = () => {
    sounds.coin();
    navigator.clipboard?.writeText('Coming soon');
    setCopied(true);
    setSpeechBubbleText('Token CA is coming soon at launch! Join Telegram & X! 🎉');
    setTimeout(() => setCopied(false), 2400);
  };

  const handleMascotClick = () => {
    sounds.bark();
    setMascotMood('barking');
    const quotes = [
      'Woof! Grandma gave me belly scratches today! ❤️',
      'Solana speed: 400ms! CuteDODO zoomies: 200ms! 🚀',
      'Every coin helps street dogs get food and water! 🐶🥣',
      'No marketing dump! 100% wholesome family love! ✨',
      'Did you hear my collar bell jingle? Ding! 🔔'
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setSpeechBubbleText(randomQuote);
    setTimeout(() => setMascotMood('happy'), 1200);
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#FFF9F0] border-b border-[#49200B]/10"> 

      {/* (1) Top Div: from top h-[840px] on desktop, natural adaptive fit on mobile, containing the background video and hero content */}
      <div id="hero-top" className="relative w-full min-h-0 py-8 sm:py-12 lg:py-0 lg:h-[840px] overflow-hidden flex flex-col justify-center bg-[#FFF9F0]">

        {/* Background video - inside (1) top div, fully mobile responsive across all screens */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center md:object-right opacity-100 transition-opacity"
          >
            <source src="/assets/videos/dodo.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Gradient overlay - transparent enough so video is vibrant on mobile and tablet */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]
            bg-gradient-to-b
            from-[#FFF9F0]/25
            via-transparent
            to-[#FFF9F0]/20
            lg:bg-gradient-to-r
            lg:from-[#FFF9F0]/95
            lg:via-[#FFF9F0]/20
            lg:to-transparent"
        />

        {/* Whimsical storybook background decorative elements */}
        <div className="absolute top-6 left-6 text-2xl sm:text-3xl opacity-25 select-none animate-bounce" aria-hidden="true">🦴</div>
        <div className="absolute top-20 right-8 sm:right-12 text-xl sm:text-2xl text-[#FF9F00] opacity-35 select-none animate-pulse" aria-hidden="true">🐾</div>
        <div className="absolute bottom-16 left-1/4 text-2xl sm:text-3xl opacity-20 select-none" aria-hidden="true">✨</div>
        <div className="absolute top-1/2 right-6 text-2xl sm:text-3xl opacity-20 select-none" aria-hidden="true">🥣</div>
        <div className="absolute -top-24 -right-24 w-72 sm:w-96 h-72 sm:h-96 bg-[#F7D9C7]/30 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute top-1/3 -left-20 w-64 sm:w-80 h-64 sm:h-80 bg-[#FFD36A]/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        {/* Hero Content Container (Fully responsive on mobile, tablet, and desktop) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        
        {/* Top Tagline / Mission Kickers */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-4 text-[11px] sm:text-xs md:text-sm font-bold font-heading text-[#49200B]">
          <span className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-[#F7D9C7] border border-[#49200B]/30 rounded-xl shadow-[1.5px_1.5px_0px_#49200B]">
            🐾 A real dog. A real cause. On Solana.
          </span>
          <span className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-[#ffc849] border border-[#49200B]/30 rounded-xl shadow-[1.5px_1.5px_0px_#49200B]">
            ⛓️ Built on Solana
          </span>
          <span className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-[#FFD36A] border border-[#49200B]/30 rounded-xl shadow-[1.5px_1.5px_0px_#49200B]">
            ❤️ 1% for pet shelters
          </span>
        </div>

        {/* 2-Column Split: Story Hero + Interactive Mascot Illustrated Scene */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-8 lg:mb-16">
          
          {/* Column 1: Copy & Call-To-Actions (7 Cols) */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-[#49200B] tracking-tight leading-[1.15] mb-2 sm:mb-4">
              The Most Wholesome Family Movement on{' '}
              
<span className="text-[#FF9F00] text-3xl sm:text-5xl lg:text-7xl font-extrabold block sm:inline">
  SOLANA
</span>
            </h1>

            <p className="text-sm sm:text-xl lg:text-2xl font-bold font-heading text-[#80371d] mb-3 sm:mb-4">
              Big Memes. Bigger Heart. Saving strays, one block at a time.
            </p>


            {/* Token CA Container */}
            <div style={{ minHeight: '75px', paddingTop: '5px' }} className="bg-[#FFF9F0] border-2 border-[#49200B] rounded-2xl p-2.5 sm:p-4 shadow-[2.5px_2.5px_0px_#49200B] sm:shadow-[3px_3px_0px_#49200B] mb-5 sm:mb-6 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                <span className="text-[11px] sm:text-xs font-bold font-heading text-[#79513B] uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF9F00]" /> Token CA (Solana)
                </span>
                <span className="text-[10px] sm:text-xs font-bold font-heading px-2 py-0.5 bg-[#FFD36A] border border-[#49200B] rounded-md text-[#49200B]">
                  Coming Soon
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 font-mono text-[11px] sm:text-sm text-[#49200B] font-semibold bg-white border border-[#49200B]/30 rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 truncate">
                  {contractAddress}
                </div>
                <button
                  onClick={handleCopy}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#FFD36A] hover:bg-[#ffc947] border-2 border-[#49200B] rounded-xl text-xs sm:text-sm font-bold font-heading text-[#49200B] flex items-center gap-1.5 shrink-0 shadow-[2px_2px_0px_#49200B] active:translate-y-0.5 transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-800" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#49200B]" />
                      <span>Copy CA</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-4 mb-5 sm:mb-6">
              <a
                href="#buy"
                onClick={() => {
                  sounds.coin();
                  if (onOpenBuyModal) onOpenBuyModal();
                }}
                className="w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3.5 bg-[#FFD36A] hover:bg-[#ffc947] text-[#49200B] font-heading text-sm sm:text-lg font-bold rounded-2xl flex items-center justify-center gap-2 border-2 border-[#49200B] shadow-[2.5px_2.5px_0px_#49200B] sm:shadow-[3.5px_3.5px_0px_#49200B] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#49200B]" />
                <span>Buy $DODO</span>
              </a>

              <a
                href="#community"
                onClick={() => sounds.pop()}
                className="w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3.5 bg-white hover:bg-[#F7D9C7] text-[#49200B] font-heading text-sm sm:text-lg font-bold rounded-2xl flex items-center justify-center gap-2 border-2 border-[#49200B] shadow-[2.5px_2.5px_0px_#49200B] sm:shadow-[3.5px_3.5px_0px_#49200B] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <span>Join the Community</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#49200B]" />
              </a>
            </div>

            {/* Quick Community Pack Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-xs font-bold font-heading text-[#79513B]">
              <span className="text-[#49200B]">Join the pack:</span>
              <a
                href="https://t.me/+pjv_zrm5Cjc1MWNl"
                target="_blank"
                rel="noreferrer"
                onClick={() => sounds.pop()}
                className="hover:scale-105 transition-transform flex items-center gap-1.5 text-[#ffecec] bg-[#24A1DE] border border-[#49200B]/30 px-3 py-1.5 rounded-xl shadow-[1.5px_1.5px_0px_#49200B] font-bold"
              >
                ✈️ Telegram
              </a>
              <a
                href="https://x.com/CuteDODO_18"
                target="_blank"
                rel="noreferrer"
                onClick={() => sounds.pop()}
                className="hover:scale-105 transition-transform flex items-center gap-1.5 text-[#ffffff] bg-[#0d0d0d] border border-[#49200B]/30 px-3 py-1.5 rounded-xl shadow-[1.5px_1.5px_0px_#49200B] font-bold"
              >
                𝕏 Twitter
              </a>
              <a
                href="https://discord.gg/9f7bBxgRS9"
                target="_blank"
                rel="noreferrer"
                onClick={() => sounds.pop()}
                className="hover:scale-105 transition-transform flex items-center gap-1.5 text-[#fffbfb] bg-[#5865f2] border border-[#49200B]/30 px-3 py-1.5 rounded-xl shadow-[1.5px_1.5px_0px_#49200B] font-bold"
              >
                👾 Discord
              </a>
            </div>

          </div>

          {/* Column 2: Large Storybook Illustrated Scene for Mascot (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-end mt-auto self-end">
            
            {/* Playful Storybook Speech Bubble */}
            <div
              onClick={handleMascotClick}
              className="relative mb-2 sm:mb-4 bg-white/95 border-2 border-[#49200B] rounded-2xl px-3.5 py-2 sm:px-5 sm:py-3 shadow-[2.5px_2.5px_0px_#49200B] text-xs sm:text-sm font-bold font-heading text-[#49200B] max-w-[260px] sm:max-w-xs text-center animate-bounce translate-x-0 lg:translate-x-4 lg:mr-10 cursor-pointer select-none transition-transform hover:scale-105 active:scale-95"
              title="Click to hear Dodo bark!"
            >
              <div className="flex items-center justify-center gap-1.5 mb-0.5 text-[10px] text-[#FF9F00] uppercase font-bold tracking-wider">
                <span>🔊 Dodo says:</span>
              </div>
              <p>{speechBubbleText}</p>
              {/* Bubble pointer */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-r-2 border-b-2 border-[#49200B] rotate-45"></div>
            </div>
          </div>

        </div>
        </div>
      </div>
      {/* End of (1) Top Div */}

      {/* Marquee effect where the div is separated */}
      <MarqueeBanner
        variant="chocolate"
        speed="normal"
        direction="rtl"
        icon="🐾"
        customMessages={[
          "ADOPT KINDNESS",
          "LOVE YOUR FOUR-LEGGED FRIENDS",
          "1% DEDICATED TO PET SHELTERS",
          "PROUD FAMILY MOVEMENT ON SOLANA",
          "EVERY PAW DESERVES LOVE",
          "100% TRANSPARENT FAMILY WALLETS",
        ]}
      />

      {/* (2) Remaining Div: Railway scene, cartoon dog parade, garden scene, live market data, 4 pillars */}
      <div id="hero-remaining" className="relative w-full py-8 sm:py-12 md:py-16 bg-[#f1fff0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

        {/* Forest Road Trip Scene: Owner and Shih Tzu Dog Driving on Infinite Wavy Road */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌲</span>
              <h2 className="text-lg sm:text-xl font-bold font-heading text-[#49200B]">
                Forest Road Trip · Owner &amp; Shih Tzu CuteDODO on Infinite Wavy Highway
              </h2>
            </div>
            <span className="text-xs font-bold font-heading text-[#79513B] hidden sm:inline">
              Cruising through the emerald pine forest with windows down &amp; ears flapping in the breeze!
            </span>
          </div>
          <ForestDriveScene />
        </div>

        {/* Continuous Cartoon Dog Walk Parade Divider */}
        <CartoonDogWalkMarquee className="mb-10 rounded-3xl border-2 border-[#49200B] shadow-[3px_3px_0px_#49200B]" />

        {/* Sunny Chennai Garden Scene: CuteDODO Playing with Kids & Owner's Family */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏡</span>
              <h2 className="text-lg sm:text-xl font-bold font-heading text-[#49200B]">
                CuteDODO&apos;s Sunny Garden · Playing with Kids &amp; Family
              </h2>
            </div>
            <span className="text-xs font-bold font-heading text-[#49200B] bg-[#C6EAD7] border border-[#49200B] px-3 py-0.5 rounded-full shadow-[1px_1px_0px_#49200B]">
              ✨ Interactive Cartoon Studio Rig
            </span>
          </div>
          <GardenFamilyPlayScene />
        </div>

        {/* Live Market Data Card Strip */}
        <div className="cartoon-card bg-[#FFF9F0] rounded-3xl p-5 sm:p-6 mb-12">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#49200B]/15">
            <div className="flex items-center gap-2">
              <span className="text-xl" role="img" aria-label="chart">📈</span>
              <h2 className="text-lg sm:text-xl font-bold font-heading text-[#49200B]">
                Live Solana Market Data
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-[#79513B] hidden sm:inline">
                Live market data appears here automatically once $DODO is launched.
              </span>
              <button
                onClick={() => {
                  sounds.pop();
                  setLiveMode(!liveMode);
                }}
                className="text-xs font-bold font-heading px-3 py-1.5 bg-[#FFD36A] hover:bg-[#ffc947] border-2 border-[#49200B] rounded-xl shadow-[2px_2px_0px_#49200B] active:translate-y-0.5 transition-all text-[#49200B]"
              >
                {liveMode ? 'Mode: Live Sim' : 'Mode: Pre-Launch'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border-2 border-[#49200B] rounded-2xl p-4 shadow-[2px_2px_0px_#49200B]">
              <div className="text-xs font-bold font-heading text-[#79513B] uppercase tracking-wide mb-1">Price (USD)</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#49200B]">
                {liveMode ? '$0.0000692' : 'Soon'}
              </div>
              <div className="text-[11px] text-[#FF9F00] font-semibold mt-1">
                {liveMode ? '🟢 +14.2% (1h)' : 'pump.fun launch'}
              </div>
            </div>

            <div className="bg-white border-2 border-[#49200B] rounded-2xl p-4 shadow-[2px_2px_0px_#49200B]">
              <div className="text-xs font-bold font-heading text-[#79513B] uppercase tracking-wide mb-1">Market Cap</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#49200B]">
                {liveMode ? '$69,200' : 'Soon'}
              </div>
              <div className="text-[11px] text-[#FF9F00] font-semibold mt-1">
                {liveMode ? 'Bonding curve: 98%' : 'Fair Launch Curve'}
              </div>
            </div>

            <div className="bg-white border-2 border-[#49200B] rounded-2xl p-4 shadow-[2px_2px_0px_#49200B]">
              <div className="text-xs font-bold font-heading text-[#79513B] uppercase tracking-wide mb-1">Liquidity</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#49200B]">
                {liveMode ? '$28,450' : 'Soon'}
              </div>
              <div className="text-[11px] text-[#FF9F00] font-semibold mt-1">
                {liveMode ? 'Raydium Migration' : 'Auto LP on DEX'}
              </div>
            </div>

            <div className="bg-white border-2 border-[#49200B] rounded-2xl p-4 shadow-[2px_2px_0px_#49200B]">
              <div className="text-xs font-bold font-heading text-[#79513B] uppercase tracking-wide mb-1">24h Volume</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#49200B]">
                {liveMode ? '$142,800' : 'Soon'}
              </div>
              <div className="text-[11px] text-[#FF9F00] font-semibold mt-1">
                {liveMode ? '3,842 trades' : 'Tracking upon launch'}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid (Bold vibrant cartoon card design with high-contrast readable text) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Pillar 1: Marketing Tokens */}
          <div
            onMouseEnter={() => sounds.pop()}
            className="cartoon-card bg-[#ff8049] text-white rounded-3xl p-5 hover:-translate-y-1 hover:shadow-[4px_5px_0px_#49200B] transition-all duration-200 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#49200B] flex items-center justify-center text-lg font-extrabold font-heading text-[#ff8049] mb-3 shadow-[2px_2px_0px_#49200B] group-hover:scale-105 transition-transform">
              0%
            </div>
            <h3 className="text-lg font-bold font-heading text-white mb-1.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
              Marketing tokens
            </h3>
            <p className="text-xs sm:text-sm text-orange-100 leading-relaxed font-semibold">
              Ads, trending and listings are paid in SOL from our own pocket. We never sell $DODO to pay for ads.
            </p>
          </div>

          {/* Pillar 2: Every Team Wallet Public */}
          <div
            onMouseEnter={() => sounds.pop()}
            className="cartoon-card bg-[#30c9a2] text-white rounded-3xl p-5 hover:-translate-y-1 hover:shadow-[4px_5px_0px_#49200B] transition-all duration-200 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#49200B] flex items-center justify-center text-2xl mb-3 shadow-[2px_2px_0px_#49200B] group-hover:scale-105 transition-transform">
              👁️
            </div>
            <h3 className="text-lg font-bold font-heading text-white mb-1.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
              Every team wallet public
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-semibold">
              Each Guardian, dev and charity wallet is listed with its Solscan link, so you can watch every move.
            </p>
          </div>

          {/* Pillar 3: For Pet Shelters */}
          <div
            onMouseEnter={() => sounds.pop()}
            className="cartoon-card bg-[#d74a6c] text-white rounded-3xl p-5 hover:-translate-y-1 hover:shadow-[4px_5px_0px_#49200B] transition-all duration-200 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#49200B] flex items-center justify-center text-lg font-extrabold font-heading text-[#d74a6c] mb-3 shadow-[2px_2px_0px_#49200B] group-hover:scale-105 transition-transform">
              1%
            </div>
            <h3 className="text-lg font-bold font-heading text-white mb-1.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
              For pet shelters
            </h3>
            <p className="text-xs sm:text-sm text-rose-100 leading-relaxed font-semibold">
              A public charity wallet. Holders vote on the shelters, and every donation is posted with proof.
            </p>
          </div>

          {/* Pillar 4: Buy & Sell Tax */}
          <div
            onMouseEnter={() => sounds.pop()}
            className="cartoon-card bg-[#7369ea] text-white rounded-3xl p-5 hover:-translate-y-1 hover:shadow-[4px_5px_0px_#49200B] transition-all duration-200 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#49200B] flex items-center justify-center text-lg font-extrabold font-heading text-[#7369ea] mb-3 shadow-[2px_2px_0px_#49200B] group-hover:scale-105 transition-transform">
              0%
            </div>
            <h3 className="text-lg font-bold font-heading text-white mb-1.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
              Buy &amp; sell tax
            </h3>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed font-semibold">
              A standard Solana token. Mint and freeze authority are revoked at launch.
            </p>
          </div>

        </div>

        {/* Read Transparency Promise Link */}
        <div className="mt-8 text-center">
          <a
            href="#transparency"
            onClick={() => sounds.pop()}
            className="inline-flex items-center gap-2 text-sm sm:text-base font-bold font-heading text-[#49200B] hover:text-[#FF9F00] underline decoration-2 underline-offset-4 transition-colors"
          >
            Read our Transparency promise →
          </a>
        </div>

        </div>
      </div>
      {/* End of (2) Remaining Div */}
    </section>
  );
};
