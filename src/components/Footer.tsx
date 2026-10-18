import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { FooterWalkingDog } from './FooterWalkingDog';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#B7F34A] text-[#49200B] pt-16 pb-24 border-t-4 border-[#49200B] relative">
      {/* Animated Shih Tzu Dog Walking on Top Edge of Footer (reference image) */}
      <FooterWalkingDog />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white border-2 border-[#49200B] flex items-center justify-center text-xl shadow-[2px_2px_0px_#49200B]">
                🐶
              </div>
              <span className="text-2xl font-bold font-cartoon text-[#49200B] tracking-tight">
                CuteDoDo <span className="bg-[#49200B] text-[#B7F34A] px-2 py-0.5 rounded-lg text-lg ml-1 font-mono font-black">$DODO</span>
              </span>
            </div>

            <p className="text-sm text-[#49200B]/90 font-medium leading-relaxed max-w-sm">
              Paws over Profits 🐾 A Solana community meme token inspired by Dodo the CuteDODO, with 1% of supply set aside for registered pet shelters and stray dog relief.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs bg-[#49200B] text-[#B7F34A] px-3.5 py-1.5 rounded-full font-black border-2 border-[#49200B] shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
                🇮🇳 Born in Tamil Nadu, Loved Globally
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-black font-cartoon text-[#49200B] uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-bold text-[#49200B]/80">
              <li>
                <a href="#about" onClick={() => sounds.pop()} className="hover:text-black hover:underline transition-colors">
                  About Dodo
                </a>
              </li>
              <li>
                <a href="#tokenomics" onClick={() => sounds.pop()} className="hover:text-black hover:underline transition-colors">
                  Tokenomics
                </a>
              </li>
              <li>
                <a href="#buy" onClick={() => sounds.pop()} className="hover:text-black hover:underline transition-colors">
                  How to Buy
                </a>
              </li>
              <li>
                <a href="#charity" onClick={() => sounds.pop()} className="hover:text-black hover:underline transition-colors">
                  Charity &amp; Proof
                </a>
              </li>
              <li>
                <a href="#wallets" onClick={() => sounds.pop()} className="hover:text-black hover:underline transition-colors">
                  Transparency
                </a>
              </li>
              <li>
                <a href="#roadmap" onClick={() => sounds.pop()} className="hover:text-black hover:underline transition-colors">
                  Roadmap
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-black font-cartoon text-[#49200B] uppercase tracking-wider mb-4">
              Community
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-bold text-[#49200B]/80">
              <li>
                <a
                  href="https://t.me/+pjv_zrm5Cjc1MWNl"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.pop()}
                  className="hover:text-black hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span>Telegram</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#49200B]" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/CuteDODO_18"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.pop()}
                  className="hover:text-black hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span>X (Twitter)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#49200B]" />
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/9f7bBxgRS9"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.pop()}
                  className="hover:text-black hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span>Discord</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#49200B]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Solana Ecosystem */}
          <div>
            <h4 className="text-sm font-black font-cartoon text-[#49200B] uppercase tracking-wider mb-4">
              Solana Ecosystem
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-bold text-[#49200B]/80">
              <li>
                <a
                  href="https://pump.fun/coin/2e5bKRHpAixvgE6zUdTf7rigxCq662zq7xvN8Dympump"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.pop()}
                  className="hover:text-black hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span>pump.fun ($DODO)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#49200B]" />
                </a>
              </li>
              <li>
                <a
                  href="https://jup.ag"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.pop()}
                  className="hover:text-black hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span>Jupiter Swap</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#49200B]" />
                </a>
              </li>
              <li>
                <a
                  href="https://dexscreener.com/solana/2e5bKRHpAixvgE6zUdTf7rigxCq662zq7xvN8Dympump"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.pop()}
                  className="hover:text-black hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span>DexScreener Chart</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#49200B]" />
                </a>
              </li>
              <li>
                <a
                  href="https://solscan.io/token/2e5bKRHpAixvgE6zUdTf7rigxCq662zq7xvN8Dympump"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.pop()}
                  className="hover:text-black hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span>Solscan Verified</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#49200B]" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border-2 border-[#49200B] text-xs text-[#49200B] leading-relaxed font-medium mb-8 shadow-[3px_3px_0px_#49200B]">
          <strong className="text-[#49200B] font-black block mb-1 text-sm">Disclaimer:</strong>
          $DODO is a meme coin with no intrinsic value or expectation of financial return. It is not an investment or security. Crypto prices are volatile and you can lose all you put in. Do your own research and only use money you can afford to lose.
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t-2 border-[#49200B]/20 text-xs text-[#49200B] font-bold">
          <div>
            © 2026 CuteDoDo. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-[#49200B]">
            <span>Made with</span>
            <Heart className="w-4 h-4 fill-rose-600 text-rose-600 mx-0.5" />
            <span>for Dodo and stray doggos everywhere</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
