import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeBanner } from './components/MarqueeBanner';
import { About } from './components/About';
import { InteractiveDogScenes } from './components/InteractiveDogScenes';
import { Gallery } from './components/Gallery';
import { Playroom } from './components/Playroom';
import { Tokenomics } from './components/Tokenomics';
import { HowToBuy } from './components/HowToBuy';
import { CharityMilestones } from './components/CharityMilestones';
import { PublicWallets } from './components/PublicWallets';
import { Roadmap } from './components/Roadmap';
import { Community } from './components/Community';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { InteractiveMouseTrail } from './components/InteractiveMouseTrail';
import { CartoonScrollProgressDog } from './components/CartoonScrollProgressDog';
import { WhitepaperModal } from './components/WhitepaperModal';
import { sounds } from './utils/soundEffects';
import { Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showWhitepaper, setShowWhitepaper] = useState(false);
  const [activeView, setActiveView] = useState<'all' | 'scenes' | 'story' | 'tokenomics' | 'charity' | 'wallets' | 'playroom'>('all');
  const [floatingToast, setFloatingToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setFloatingToast(msg);
    setTimeout(() => setFloatingToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] text-[#49200B] flex flex-col selection:bg-[#FFD36A] selection:text-[#49200B] overflow-x-hidden max-w-full relative">
      
      {/* Cartoon Scroll Progress Track with Sprinting CuteDODO */}
      <CartoonScrollProgressDog />

      {/* Top Navigation */}
      <Navbar
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenWhitepaper={() => setShowWhitepaper(true)}
        onOpenBuyModal={() => {
          const el = document.getElementById('buy');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Clean Secondary Navigation: Explore View strip */}
      <div style={{ marginTop: '-8px' }} className="bg-[#FFF9F0]/95 border-b border-[#49200B]/15 py-2 px-3 sm:px-4 sticky top-[72px] z-40 backdrop-blur-md">
        <div style={{ marginTop: '7px' }} className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3 overflow-x-auto no-scrollbar scroll-smooth">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs font-bold font-heading text-[#79513B] hidden sm:inline mr-1">
              Explore View:
            </span>
            {[
              { id: 'all', label: '🌟 Full Experience' },
              { id: 'scenes', label: '🎬 5 Animated Scenes' },
              { id: 'story', label: '📖 Story & Photos' },
              { id: 'playroom', label: '🎮 Dodo Playroom' },
              { id: 'tokenomics', label: '🪙 Tokenomics & Buy' },
              { id: 'charity', label: '🐾 Charity & Strays' },
              { id: 'wallets', label: '👁️ Public Wallets' },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  sounds.pop();
                  setActiveView(v.id as typeof activeView);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-1 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                  activeView === v.id
                    ? 'bg-[#FFD36A] text-[#49200B] border-2 border-[#49200B] shadow-[2px_2px_0px_#49200B] -translate-y-0.5'
                    : 'bg-[#FFF9F0] text-[#79513B] border border-[#49200B]/20 hover:bg-[#F7D9C7] hover:text-[#49200B]'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 shrink-0 text-xs font-bold text-[#79513B]">
            <span>🐾 1% to Pet Shelters</span>
            <span>·</span>
            <span>0% Tax</span>
            <span>·</span>
            <span className="text-emerald-700 font-semibold">Doxxed Team</span>
          </div>
        </div>
      </div>

      {/* Continuous Right-to-Left Text Marquee under header */}
      <MarqueeBanner variant="chocolate" direction="rtl" />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {activeView === 'all' && (
          <>
            {/* Section 1: Hero */}
            <div id="section-hero" className="relative w-full bg-[#FFF9F0] overflow-hidden">
              <Hero />
            </div>

            {/* Marquee Separator 1 */}
            <MarqueeBanner
              variant="gold"
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

            {/* Section 2: About (The Real Dog Story) */}
            <div id="section-about" className="relative w-full bg-[#FFF3E8] border-b border-[#49200B]/10">
              <About />
            </div>

            {/* Marquee Separator 2 */}
            <MarqueeBanner
              variant="mint"
              direction="ltr"
              icon="🎬"
              customMessages={[
                "5 ANIMATED LIFE SCENES",
                "PARK STROLL WITH DAD",
                "GRANDMA'S LAP & VERANDA",
                "SHARING MEALS WITH STREET DOGS",
                "PLAYFUL ZOOMIES & TAIL WAGS",
              ]}
            />

            {/* Section 3: Interactive Dog Scenes (5 Life Scenes Theater) */}
            <div id="section-scenes" className="relative w-full bg-[#caf5ff] border-b border-[#49200B]/10">
              <InteractiveDogScenes />
            </div>

            {/* Marquee Separator 3 */}
            <MarqueeBanner
              variant="chocolate"
              direction="rtl"
              icon="📸"
              customMessages={[
                "MEET THE REAL DODO",
                "100% REAL SHIHTZU MASCOT",
                "NO STOCK PHOTOS",
                "MEMORIES FROM CHENNAI",
                "FAMILY PHOTO SCRAPBOOK",
              ]}
            />

            {/* Section 4: Gallery (Scrapbook & Candids) */}
            <div id="section-gallery" className="relative w-full bg-[#ffe1e1] border-b border-[#49200B]/10">
              <Gallery />
            </div>

            {/* Marquee Separator 4 */}
            <MarqueeBanner
              variant="peach"
              direction="ltr"
              icon="🎮"
              customMessages={[
                "DODO PLAYROOM & ARCADE",
                "FEED TREATS & PLAY FETCH",
                "DRESS UP DODO WITH STICKERS",
                "FUN MEME CREATOR",
                "CLICK TO HEAR CUTE BARKS",
              ]}
            />

            {/* Section 5: Playroom (Care & Stickers) */}
            <div id="section-playroom" className="relative w-full bg-[#F3F5FD] border-b border-[#49200B]/10">
              <Playroom />
            </div>

            {/* Marquee Separator 5 */}
            <MarqueeBanner
              variant="amber"
              direction="rtl"
              icon="🪙"
              customMessages={[
                "CLEAN TOKENOMICS",
                "0% BUY TAX & 0% SELL TAX",
                "0% MARKETING TOKENS",
                "LP BURNED FOREVER",
                "IMMUTABLE & AUDITED CONTRACT",
              ]}
            />

            {/* Section 6: Tokenomics */}
            <div id="section-tokenomics" className="relative w-full bg-[#BFE8F7] border-b border-[#49200B]/10">
              <Tokenomics />
            </div>

            {/* Marquee Separator 6 */}
            <MarqueeBanner
              variant="mint"
              direction="ltr"
              icon="🚀"
              customMessages={[
                "EASY 4-STEP BUY GUIDE",
                "SOLANA SPEED & LOW FEES",
                "PHANTOM & SOLFLARE READY",
                "JUPITER AGGREGATOR SWAP",
                "GET $DODO IN 5 MINUTES",
              ]}
            />

            {/* Section 7: How To Buy */}
            <div id="section-howtobuy" className="relative w-full bg-[#F2FBF6] border-b border-[#49200B]/10">
              <HowToBuy />
            </div>

            {/* Marquee Separator 7 */}
            <MarqueeBanner
              variant="coral"
              direction="rtl"
              icon="❤️"
              customMessages={[
                "1% PET SHELTER DONATION VAULT",
                "DIRECT AID TO STRAY RESCUES",
                "SOLSCAN VERIFIABLE PROOF",
                "CHENNAI SHELTERS FIRST",
                "COMMUNITY VOTED CAUSES",
              ]}
            />

            {/* Section 8: Charity Milestones */}
            <div id="section-charity" className="relative w-full bg-[#FF9F00] border-b border-[#49200B]/10">
              <CharityMilestones />
            </div>

            {/* Marquee Separator 8 */}
            <MarqueeBanner
              variant="gold"
              direction="ltr"
              icon="👁️"
              customMessages={[
                "100% PUBLIC GUARDIAN WALLETS",
                "DOXXED FOUNDER & GRANDMOTHER",
                "ZERO SECRETS ON SOLSCAN",
                "ALL 7 NATION ALLIES LISTED",
                "WATCH WALLETS IN REAL TIME",
              ]}
            />

            {/* Section 9: Public Wallets */}
            <div id="section-wallets" className="relative w-full bg-[#FAFAF5] border-b border-[#49200B]/10">
              <PublicWallets />
            </div>

            {/* Marquee Separator 9 */}
            <MarqueeBanner
              variant="sky"
              direction="rtl"
              icon="🗺️"
              customMessages={[
                "THE MASTER PAW ROADMAP",
                "FAIR OPEN LAUNCH",
                "DEXSCREENER & CMC",
                "DODO MERCH FOR CHARITY",
                "GLOBAL SHELTER EXPANSION",
              ]}
            />

            {/* Section 10: Roadmap */}
            <div id="section-roadmap" className="relative w-full bg-[#F6F4FF] border-b border-[#49200B]/10">
              <Roadmap />
            </div>

            {/* Marquee Separator 10 */}
            <MarqueeBanner
              variant="amber"
              direction="ltr"
              icon="🐶"
              customMessages={[
                "JOIN THE CUTE DODO FAMILY",
                "OFFICIAL TELEGRAM PACK",
                "DAILY DODO PHOTOS ON X",
                "COMMUNITY DRIVEN FUTURE",
                "PURE LOVE NO DRAMA",
              ]}
            />

            {/* Section 11: Community */}
            <div id="section-community" className="relative w-full bg-[#FFF8EB] border-b border-[#49200B]/10">
              <Community />
            </div>

            {/* Marquee Separator 11 */}
            <MarqueeBanner
              variant="mint"
              direction="rtl"
              icon="❓"
              customMessages={[
                "FREQUENTLY ASKED QUESTIONS",
                "ZERO HIDDEN SECRETS",
                "BUILT FOR THE LONG HAUL",
                "SAFE & VERIFIED ON SOLANA",
                "READ THE WHOLESOME ANSWERS",
              ]}
            />

            {/* Section 12: FAQ */}
            <div id="section-faq" className="relative w-full bg-[#87CEEB]">
              <FAQ />
            </div>
          </>
        )}

        {activeView === 'scenes' && (
          <div className="pt-2 space-y-0">
            <div className="bg-[#F0FAF4]"><InteractiveDogScenes /></div>
            <MarqueeBanner variant="gold" direction="rtl" icon="🎮" />
            <div className="bg-[#F3F5FD]"><Playroom /></div>
            <MarqueeBanner variant="mint" direction="ltr" icon="🐶" />
            <div className="bg-[#FFF8EB]"><Community /></div>
          </div>
        )}

        {activeView === 'story' && (
          <div className="pt-2 space-y-0">
            <div className="bg-[#FFF9F0]"><Hero /></div>
            <MarqueeBanner variant="gold" direction="rtl" icon="🐾" />
            <div className="bg-[#FFF3E8]"><About /></div>
            <MarqueeBanner variant="mint" direction="ltr" icon="🎬" />
            <div className="bg-[#F0FAF4]"><InteractiveDogScenes /></div>
            <MarqueeBanner variant="chocolate" direction="rtl" icon="📸" />
            <div className="bg-[#FFFBEA]"><Gallery /></div>
            <MarqueeBanner variant="peach" direction="ltr" icon="🎮" />
            <div className="bg-[#F3F5FD]"><Playroom /></div>
            <MarqueeBanner variant="amber" direction="rtl" icon="🐶" />
            <div className="bg-[#FFF8EB]"><Community /></div>
          </div>
        )}

        {activeView === 'playroom' && (
          <div className="pt-2 space-y-0">
            <div className="bg-[#F3F5FD]"><Playroom /></div>
            <MarqueeBanner variant="mint" direction="ltr" icon="🎬" />
            <div className="bg-[#F0FAF4]"><InteractiveDogScenes /></div>
            <MarqueeBanner variant="chocolate" direction="rtl" icon="📸" />
            <div className="bg-[#FFFBEA]"><Gallery /></div>
            <MarqueeBanner variant="amber" direction="ltr" icon="🐶" />
            <div className="bg-[#FFF8EB]"><Community /></div>
          </div>
        )}

        {activeView === 'tokenomics' && (
          <div className="pt-2 space-y-0">
            <div className="bg-[#BFE8F7]"><Tokenomics /></div>
            <MarqueeBanner variant="mint" direction="ltr" icon="🚀" />
            <div className="bg-[#F2FBF6]"><HowToBuy /></div>
            <MarqueeBanner variant="sky" direction="rtl" icon="🗺️" />
            <div className="bg-[#F6F4FF]"><Roadmap /></div>
            <MarqueeBanner variant="gold" direction="ltr" icon="❓" />
            <div className="bg-[#87CEEB]"><FAQ /></div>
          </div>
        )}

        {activeView === 'charity' && (
          <div className="pt-2 space-y-0">
            <div className="bg-[#FF9F00]"><CharityMilestones /></div>
            <MarqueeBanner variant="mint" direction="ltr" icon="🎬" />
            <div className="bg-[#F0FAF4]"><InteractiveDogScenes /></div>
            <MarqueeBanner variant="peach" direction="rtl" icon="🐾" />
            <div className="bg-[#FFF3E8]"><About /></div>
            <MarqueeBanner variant="gold" direction="ltr" icon="👁️" />
            <div className="bg-[#FAFAF5]"><PublicWallets /></div>
          </div>
        )}

        {activeView === 'wallets' && (
          <div className="pt-2 space-y-0">
            <div className="bg-[#FAFAF5]"><PublicWallets /></div>
            <MarqueeBanner variant="amber" direction="rtl" icon="🪙" />
            <div className="bg-[#BFE8F7]"><Tokenomics /></div>
            <MarqueeBanner variant="coral" direction="ltr" icon="❤️" />
            <div className="bg-[#FFF1F3]"><CharityMilestones /></div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Official Whitepaper PDF Viewer Modal */}
      <WhitepaperModal
        isOpen={showWhitepaper}
        onClose={() => setShowWhitepaper(false)}
      />

      {/* Interactive Mouse Pointer Trail & Cartoon Click Ripples across the landing page */}
      <InteractiveMouseTrail />



      {/* Floating Toast Notification */}
      {floatingToast && (
        <div className="fixed bottom-20 right-5 z-50 bg-[#49200B] text-[#FFF9F0] border-2 border-[#FFD36A] px-4 py-2.5 rounded-2xl shadow-[3px_3px_0px_#49200B] text-xs sm:text-sm font-bold flex items-center gap-2 animate-bounce">
          <Heart className="w-4 h-4 fill-[#FF9F00] text-[#FF9F00]" />
          <span>{floatingToast}</span>
        </div>
      )}

    </div>
  );
}
