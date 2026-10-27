import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, RotateCcw, Copy, Check } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface AllocationItem {
  id: string;
  name: string;
  share: string;
  percentageNum: number;
  tokens: string;
  color: string;
  borderColor: string;
  darkColor: string;
  description: string;
  details: string;
}

export const Tokenomics: React.FC = () => {
  const [selectedAllocation, setSelectedAllocation] = useState<string | null>(null);
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);
  const [animationKey, setAnimationKey] = useState<number>(0);
  const [copiedCA, setCopiedCA] = useState(false);

  const CA = '2e5bKRHpAixvgE6zUdTf7rigxCq662zq7xvN8Dympump';

  const allocations: AllocationItem[] = [
    {
      id: 'public',
      name: 'Public, pump.fun bonding curve',
      share: '86.44%',
      percentageNum: 86.44,
      tokens: '864,400,000',
      color: '#F5C243',
      borderColor: '#D4A017',
      darkColor: '#B78103',
      description: 'The vast super-majority of tokens entered directly into the pump.fun bonding curve with open public access, zero VC allocation, and zero presale favoritism.',
      details: 'Graduated from pump.fun to open DEX liquidity. Completely decentralized and free of artificial lockups.',
    },
    {
      id: 'guardian',
      name: '10 Guardian wallets (together)',
      share: '8.75%',
      percentageNum: 8.75,
      tokens: '87,500,000',
      color: '#C83A26',
      borderColor: '#A82816',
      darkColor: '#8C1F10',
      description: 'Doxxed family and trusted community guardians holding long-term diamond-hand reserves across 10 transparent, public wallets.',
      details: 'All 10 guardian wallet addresses are published openly on cutedodo.com with live Solscan verification.',
    },
    {
      id: 'dev',
      name: 'Dev wallet',
      share: '3.66%',
      percentageNum: 3.66,
      tokens: '36,600,000',
      color: '#1E293B',
      borderColor: '#0F172A',
      darkColor: '#090D16',
      description: 'Dedicated to platform maintenance, high-speed Solana RPC nodes, custom community bots, and continuous ecosystem development.',
      details: 'Under 5% creator holding verified by TokenSniffer security audit.',
    },
    {
      id: 'charity',
      name: 'Charity wallet',
      share: '1.15%',
      percentageNum: 1.15,
      tokens: '11,500,000',
      color: '#22C55E',
      borderColor: '#16A34A',
      darkColor: '#15803D',
      description: 'Set aside exclusively for real animal rescue foundations, pet hospital emergency funds, and stray dog welfare causes.',
      details: '11,500,000 $DODO in public wallet with every grant and donation verified on-chain.',
    },
  ];

  const handleCopyCA = () => {
    sounds.coin();
    navigator.clipboard?.writeText(CA);
    setCopiedCA(true);
    setTimeout(() => setCopiedCA(false), 2000);
  };

  const handleReplayAnimation = () => {
    sounds.bell();
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <section id="tokenomics" className="py-8 sm:py-12 md:py-20 bg-[#BFE8F7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border-2 border-[#49200B] rounded-xl text-xs font-bold font-heading text-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] mb-2 sm:mb-3">
            <span>🪙 Tokenomics</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#49200B] tracking-tight mb-2 sm:mb-3">
            Where Every <span className="text-[#FF9F00] underline decoration-[#49200B]/30">$DODO</span> Goes
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#49200B]/85 font-semibold leading-relaxed">
            1,000,000,000 $DODO in total. Nothing more can ever be minted. Total group allocation is locked at exactly <strong className="text-[#49200B]">13.56%</strong> across 10 guardian wallets (8.75%), dev operations (3.66%), and charity (1.15%), with <strong className="text-[#49200B]">86.44%</strong> on the public market. <strong className="text-[#49200B]">0% marketing tax</strong>.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* TWO-COLUMN SIDE-BY-SIDE SECTION: SUPPLY CARD (IMAGE) + PIE CHART & TABLE  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-8 sm:mb-12">
          
          {/* ======================================================================= */}
          {/* LEFT COLUMN: SUPPLY DISTRIBUTION CARD (EXACT MATCH TO image_89c15cd0.png) */}
          {/* ======================================================================= */}
          <div className="lg:col-span-5 cartoon-card bg-[#FFFDF8] border-2 sm:border-[3px] border-[#49200B] rounded-3xl p-5 sm:p-7 shadow-[4px_5px_0px_#49200B] sm:shadow-[6px_7px_0px_#49200B] flex flex-col items-center">
            
            {/* 3D Gold Embossed CuteDoDo Coin Image */}
            <div className="w-full max-w-[280px] aspect-square rounded-3xl border-2 sm:border-[2.5px] border-[#49200B] overflow-hidden bg-[#2D1F14] shadow-[2.5px_2.5px_0px_#49200B] mb-5 relative group">
              <img
                src="/assets/images/cutedodo_coin_badge_1791659647166.jpg"
                alt="CuteDoDo 2026 Gold Coin"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // Fallback in case path differs
                  (e.target as HTMLImageElement).src = '/favicon.png';
                }}
              />
            </div>

            {/* 1,000,000,000 Total $DODO Button Badge */}
            <button
              onClick={() => {
                sounds.coin();
              }}
              className="cartoon-btn w-full max-w-[320px] py-2.5 px-4 bg-[#FFD36A] hover:bg-[#ffc947] border-2 border-[#49200B] rounded-2xl font-black font-heading text-[#49200B] text-base sm:text-lg text-center shadow-[2px_2px_0px_#49200B] transition-transform active:scale-95"
            >
              1,000,000,000 Total $DODO
            </button>

            {/* Subtitle */}
            <div className="text-xs sm:text-sm font-bold text-[#49200B]/80 mt-2 mb-4 text-center">
              Hard Capped Supply · Zero Inflation
            </div>

            {/* Multi-segment Colored Progress Bar */}
            <div className="w-full">
              <div className="h-6 sm:h-7 rounded-full border-2 border-[#49200B] bg-[#FFF9EE] flex overflow-hidden p-0.5 shadow-[1.5px_1.5px_0px_#49200B]">
                {/* 86.44% Public Market (Yellow) */}
                <div
                  style={{ width: '86.44%' }}
                  className="h-full bg-[#FFD36A] rounded-l-full border-r border-[#49200B]/20 transition-all duration-700"
                  title="Public Market: 86.44%"
                />
                {/* 8.75% Guardian Wallets (Mint / Sage Green) */}
                <div
                  style={{ width: '8.75%' }}
                  className="h-full bg-[#ADEFD1] border-r border-[#49200B]/20 transition-all duration-700"
                  title="Guardians: 8.75%"
                />
                {/* 3.66% Dev Wallet (Dark Slate) */}
                <div
                  style={{ width: '3.66%' }}
                  className="h-full bg-[#1E293B] border-r border-[#49200B]/20 transition-all duration-700"
                  title="Dev: 3.66%"
                />
                {/* 1.15% Charity Wallet (Orange) */}
                <div
                  style={{ width: '1.15%' }}
                  className="h-full bg-[#EA580C] rounded-r-full transition-all duration-700"
                  title="Charity: 1.15%"
                />
              </div>

              {/* Legend Row directly under the bar */}
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-extrabold font-heading text-[#49200B] mt-2 px-1">
                <span>Public: 86.44%</span>
                <span>Guardians: 8.75%</span>
                <span>Dev: 3.66%</span>
                <span className="text-[#EA580C]">Charity: 1.15%</span>
              </div>
            </div>

            {/* Divider line */}
            <div className="w-full border-t border-[#49200B]/15 my-4 sm:my-5" />

            {/* Supply Distribution Graph Header */}
            <div className="w-full flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] shrink-0" />
                <h4 className="font-extrabold font-heading text-xs sm:text-sm text-[#111827]">
                  Supply Distribution Graph
                </h4>
              </div>
              <div className="px-2.5 py-0.5 bg-white border border-[#49200B]/30 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold text-[#49200B] shadow-xs">
                13.56% Group / 86.44% Market
              </div>
            </div>

            {/* 4 Distribution Rows matching reference image */}
            <div className="w-full space-y-2.5">
              
              {/* Row 1: Public Floating Market */}
              <div className="bg-[#FFF9EE] border border-[#49200B]/25 rounded-2xl p-2.5 sm:p-3 shadow-xs">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <div className="flex-1 h-3.5 bg-white border border-[#49200B]/30 rounded-full overflow-hidden p-0.5">
                    <div
                      style={{ width: '86.44%' }}
                      className="h-full bg-[#1F2937] rounded-full transition-all duration-700"
                    />
                  </div>
                  <span className="font-mono font-extrabold text-xs sm:text-sm text-[#111827] shrink-0">
                    86.44%
                  </span>
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-[#111827]">
                  Public Floating Market (Bonding Curve Pool)
                </div>
              </div>

              {/* Row 2: Guardian Diamond-Hand Floor */}
              <div className="bg-[#FFF9EE] border border-[#49200B]/25 rounded-2xl p-2.5 sm:p-3 shadow-xs">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <div className="flex-1 h-3.5 bg-white border border-[#49200B]/30 rounded-full overflow-hidden p-0.5">
                    <div
                      style={{ width: '8.75%' }}
                      className="h-full bg-[#1F2937] rounded-full transition-all duration-700"
                    />
                  </div>
                  <span className="font-mono font-extrabold text-xs sm:text-sm text-[#111827] shrink-0">
                    8.75%
                  </span>
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-[#111827]">
                  8.75% Guardian Diamond–Hand Floor (Wallets)
                </div>
              </div>

              {/* Row 3: Core Operations & Ecosystem Growth */}
              <div className="bg-[#FFF9EE] border border-[#49200B]/25 rounded-2xl p-2.5 sm:p-3 shadow-xs">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <div className="flex-1 h-3.5 bg-white border border-[#49200B]/30 rounded-full overflow-hidden p-0.5">
                    <div
                      style={{ width: '3.66%' }}
                      className="h-full bg-[#1F2937] rounded-full transition-all duration-700"
                    />
                  </div>
                  <span className="font-mono font-extrabold text-xs sm:text-sm text-[#111827] shrink-0">
                    3.66%
                  </span>
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-[#111827]">
                  3.66% Core Operations &amp; Ecosystem Growth (Dev Wallet)
                </div>
              </div>

              {/* Row 4: Verified Charity & Community Impact Pool */}
              <div className="bg-[#FFF9EE] border border-[#49200B]/25 rounded-2xl p-2.5 sm:p-3 shadow-xs">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <div className="flex-1 h-3.5 bg-white border border-[#49200B]/30 rounded-full overflow-hidden p-0.5">
                    <div
                      style={{ width: '1.15%' }}
                      className="h-full bg-[#1F2937] rounded-full transition-all duration-700"
                    />
                  </div>
                  <span className="font-mono font-extrabold text-xs sm:text-sm text-[#111827] shrink-0">
                    1.15%
                  </span>
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-[#111827]">
                  1.15% Verified Charity &amp; Community Impact Pool
                </div>
              </div>

            </div>

          </div>

          {/* ======================================================================= */}
          {/* RIGHT COLUMN: ANIMATED PIE CHART & TABLE (WHO HOLDS WHAT)               */}
          {/* ======================================================================= */}
          <div className="lg:col-span-7 cartoon-card bg-[#FDF8EE] border-2 sm:border-[3px] border-[#49200B] rounded-3xl p-4 sm:p-7 shadow-[4px_5px_0px_#49200B] sm:shadow-[6px_7px_0px_#49200B]">
            
            {/* Card Title & Subtitle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#49200B]/15">
              <div>
                <div className="text-[11px] sm:text-xs font-extrabold font-mono text-[#79513B] uppercase tracking-wider mb-1">
                  03 · TOKENOMICS
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#111827]">
                  Who holds what
                </h3>
                <p className="text-xs sm:text-sm text-[#49200B]/80 font-medium mt-1">
                  Total supply is fixed at 1,000,000,000 $DODO and mint authority is disabled, so no new tokens can ever be created. Zero marketing tax.
                </p>
              </div>

              <button
                onClick={handleReplayAnimation}
                className="cartoon-btn self-start sm:self-auto px-3.5 py-1.5 bg-white hover:bg-amber-100 text-[#49200B] text-xs font-bold font-heading rounded-xl border border-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] flex items-center gap-1.5 shrink-0 transition-transform active:scale-95"
                title="Replay animated pie chart"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#FF9F00]" />
                <span>Replay Animation</span>
              </button>
            </div>

            {/* SVG Animated Pie Chart Section */}
            <div className="my-5 flex flex-col items-center justify-center">
              <div className="w-full max-w-xl relative">
                
                <svg
                  key={animationKey}
                  viewBox="0 0 660 360"
                  className="w-full h-auto select-none overflow-visible drop-shadow-sm"
                >
                  <defs>
                    <filter id="slice-shadow" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
                    </filter>
                    <filter id="hover-glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.3" />
                    </filter>
                  </defs>

                  {/* Pie Chart Group with entrance animation */}
                  <g className="animate-[spin_0.8s_cubic-bezier(0.16,1,0.3,1)] origin-[240px_180px]">
                    
                    {/* 1. PUBLIC SLICE (86.44%) */}
                    <g
                      className="cursor-pointer transition-transform duration-300"
                      onMouseEnter={() => {
                        sounds.pop();
                        setHoveredSlice('public');
                      }}
                      onMouseLeave={() => setHoveredSlice(null)}
                      onClick={() => {
                        sounds.coin();
                        setSelectedAllocation(selectedAllocation === 'public' ? null : 'public');
                      }}
                      style={{
                        transform: hoveredSlice === 'public' || selectedAllocation === 'public' ? 'scale(1.025)' : 'scale(1)',
                        transformOrigin: '240px 180px',
                      }}
                    >
                      <path
                        d="M 240 180 L 355.94 249.17 A 135 135 0 1 1 368.39 138.28 Z"
                        fill="#F5C243"
                        stroke="#FFFFFF"
                        strokeWidth="2.5"
                        filter={hoveredSlice === 'public' ? 'url(#hover-glow)' : 'url(#slice-shadow)'}
                      />
                      <text
                        x="170"
                        y="175"
                        textAnchor="middle"
                        fill="#111827"
                        className="font-extrabold font-heading"
                        fontSize="32"
                        fontWeight="900"
                      >
                        86.44%
                      </text>
                      <text
                        x="170"
                        y="204"
                        textAnchor="middle"
                        fill="#1F2937"
                        className="font-bold font-heading"
                        fontSize="16"
                        fontWeight="700"
                      >
                        Public
                      </text>
                    </g>

                    {/* 2. GUARDIAN WALLETS SLICE (8.75%) */}
                    <g
                      className="cursor-pointer transition-transform duration-300"
                      onMouseEnter={() => {
                        sounds.pop();
                        setHoveredSlice('guardian');
                      }}
                      onMouseLeave={() => setHoveredSlice(null)}
                      onClick={() => {
                        sounds.coin();
                        setSelectedAllocation(selectedAllocation === 'guardian' ? null : 'guardian');
                      }}
                      style={{
                        transform: hoveredSlice === 'guardian' || selectedAllocation === 'guardian' ? 'scale(1.045) translate(3px, -2px)' : 'scale(1)',
                        transformOrigin: '240px 180px',
                      }}
                    >
                      <path
                        d="M 240 180 L 368.39 138.28 A 135 135 0 0 1 371.27 211.52 Z"
                        fill="#C83A26"
                        stroke="#FFFFFF"
                        strokeWidth="2.5"
                        filter={hoveredSlice === 'guardian' ? 'url(#hover-glow)' : 'url(#slice-shadow)'}
                      />
                    </g>

                    {/* 3. DEV WALLET SLICE (3.66%) */}
                    <g
                      className="cursor-pointer transition-transform duration-300"
                      onMouseEnter={() => {
                        sounds.pop();
                        setHoveredSlice('dev');
                      }}
                      onMouseLeave={() => setHoveredSlice(null)}
                      onClick={() => {
                        sounds.coin();
                        setSelectedAllocation(selectedAllocation === 'dev' ? null : 'dev');
                      }}
                      style={{
                        transform: hoveredSlice === 'dev' || selectedAllocation === 'dev' ? 'scale(1.05) translate(4px, 1px)' : 'scale(1)',
                        transformOrigin: '240px 180px',
                      }}
                    >
                      <path
                        d="M 240 180 L 371.27 211.52 A 135 135 0 0 1 360.63 240.62 Z"
                        fill="#1E293B"
                        stroke="#FFFFFF"
                        strokeWidth="2.5"
                        filter={hoveredSlice === 'dev' ? 'url(#hover-glow)' : 'url(#slice-shadow)'}
                      />
                    </g>

                    {/* 4. CHARITY WALLET SLICE (1.15%) */}
                    <g
                      className="cursor-pointer transition-transform duration-300"
                      onMouseEnter={() => {
                        sounds.pop();
                        setHoveredSlice('charity');
                      }}
                      onMouseLeave={() => setHoveredSlice(null)}
                      onClick={() => {
                        sounds.coin();
                        setSelectedAllocation(selectedAllocation === 'charity' ? null : 'charity');
                      }}
                      style={{
                        transform: hoveredSlice === 'charity' || selectedAllocation === 'charity' ? 'scale(1.06) translate(4px, 3px)' : 'scale(1)',
                        transformOrigin: '240px 180px',
                      }}
                    >
                      <path
                        d="M 240 180 L 360.63 240.62 A 135 135 0 0 1 355.94 249.17 Z"
                        fill="#22C55E"
                        stroke="#FFFFFF"
                        strokeWidth="2.5"
                        filter={hoveredSlice === 'charity' ? 'url(#hover-glow)' : 'url(#slice-shadow)'}
                      />
                    </g>

                  </g>

                  {/* Pointer Leader Lines & Callout Labels */}
                  {/* Guardian Callout */}
                  <g
                    className="cursor-pointer transition-opacity duration-200"
                    onMouseEnter={() => setHoveredSlice('guardian')}
                    onMouseLeave={() => setHoveredSlice(null)}
                    onClick={() => setSelectedAllocation(selectedAllocation === 'guardian' ? null : 'guardian')}
                  >
                    <polyline
                      points="373,150 410,120 460,95 478,95"
                      fill="none"
                      stroke="#1E293B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="478"
                      cy="95"
                      r="4.5"
                      fill="#C83A26"
                      stroke="#1E293B"
                      strokeWidth="1.5"
                    />
                    <text
                      x="494"
                      y="92"
                      fill="#111827"
                      className="font-extrabold font-heading"
                      fontSize="19"
                      fontWeight="800"
                    >
                      8.75%
                    </text>
                    <text
                      x="494"
                      y="111"
                      fill="#4B5563"
                      className="font-medium font-sans"
                      fontSize="13"
                      fontWeight="600"
                    >
                      10 Guardian wallets
                    </text>
                  </g>

                  {/* Dev Wallet Callout */}
                  <g
                    className="cursor-pointer transition-opacity duration-200"
                    onMouseEnter={() => setHoveredSlice('dev')}
                    onMouseLeave={() => setHoveredSlice(null)}
                    onClick={() => setSelectedAllocation(selectedAllocation === 'dev' ? null : 'dev')}
                  >
                    <polyline
                      points="369,224 415,220 460,205 478,205"
                      fill="none"
                      stroke="#1E293B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="478"
                      cy="205"
                      r="4.5"
                      fill="#1E293B"
                      stroke="#1E293B"
                      strokeWidth="1.5"
                    />
                    <text
                      x="494"
                      y="202"
                      fill="#111827"
                      className="font-extrabold font-heading"
                      fontSize="19"
                      fontWeight="800"
                    >
                      3.66%
                    </text>
                    <text
                      x="494"
                      y="221"
                      fill="#4B5563"
                      className="font-medium font-sans"
                      fontSize="13"
                      fontWeight="600"
                    >
                      Dev wallet
                    </text>
                  </g>

                  {/* Charity Wallet Callout */}
                  <g
                    className="cursor-pointer transition-opacity duration-200"
                    onMouseEnter={() => setHoveredSlice('charity')}
                    onMouseLeave={() => setHoveredSlice(null)}
                    onClick={() => setSelectedAllocation(selectedAllocation === 'charity' ? null : 'charity')}
                  >
                    <polyline
                      points="358,247 400,265 460,285 478,285"
                      fill="none"
                      stroke="#1E293B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="478"
                      cy="285"
                      r="4.5"
                      fill="#22C55E"
                      stroke="#1E293B"
                      strokeWidth="1.5"
                    />
                    <text
                      x="494"
                      y="282"
                      fill="#111827"
                      className="font-extrabold font-heading"
                      fontSize="19"
                      fontWeight="800"
                    >
                      1.15%
                    </text>
                    <text
                      x="494"
                      y="301"
                      fill="#4B5563"
                      className="font-medium font-sans"
                      fontSize="13"
                      fontWeight="600"
                    >
                      Charity wallet
                    </text>
                  </g>

                </svg>

              </div>
            </div>

            {/* Allocation Table */}
            <div className="w-full mt-2 overflow-hidden rounded-2xl border-2 border-[#1E293B] shadow-[2.5px_3px_0px_#1E293B]">
              
              {/* Dark Navy Table Header */}
              <div className="bg-[#142238] text-white px-3 sm:px-5 py-2.5 flex items-center justify-between text-xs sm:text-sm font-extrabold tracking-wider uppercase font-heading select-none">
                <span className="w-1/2 sm:w-2/5">ALLOCATION</span>
                <span className="w-1/4 text-center sm:text-right">SHARE</span>
                <span className="w-1/4 sm:w-1/3 text-right">TOKENS</span>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-[#49200B]/10 bg-white font-sans">
                {allocations.map((item) => {
                  const isSelected = selectedAllocation === item.id;
                  const isHovered = hoveredSlice === item.id;

                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setHoveredSlice(item.id)}
                      onMouseLeave={() => setHoveredSlice(null)}
                      onClick={() => {
                        sounds.pop();
                        setSelectedAllocation(isSelected ? null : item.id);
                      }}
                      className={`px-3 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between text-xs sm:text-sm cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-amber-100/90'
                          : isHovered
                          ? 'bg-[#FFF9EE]'
                          : 'bg-[#FFFDF9] hover:bg-[#FFF9EE]'
                      }`}
                    >
                      {/* Allocation Column */}
                      <div className="w-1/2 sm:w-2/5 flex items-center gap-2 sm:gap-2.5 min-w-0 pr-2">
                        <span
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-md shrink-0 border border-black/30 shadow-xs"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-bold text-[#111827] truncate text-xs sm:text-sm">
                          {item.name}
                        </span>
                      </div>

                      {/* Share Column */}
                      <div className="w-1/4 text-center sm:text-right font-extrabold font-mono text-[#111827] text-xs sm:text-sm">
                        {item.share}
                      </div>

                      {/* Tokens Column */}
                      <div className="w-1/4 sm:w-1/3 text-right font-bold font-mono text-[#111827] text-xs sm:text-sm">
                        {item.tokens}
                      </div>
                    </div>
                  );
                })}

                {/* Total Row */}
                <div className="bg-[#FDE8B5] px-3 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between text-xs sm:text-sm font-extrabold text-[#111827] border-t-2 border-[#1E293B]">
                  <div className="w-1/2 sm:w-2/5 font-heading text-xs sm:text-base">
                    Total
                  </div>
                  <div className="w-1/4 text-center sm:text-right font-mono font-black text-xs sm:text-base">
                    100.00%
                  </div>
                  <div className="w-1/4 sm:w-1/3 text-right font-mono font-black text-xs sm:text-base">
                    1,000,000,000
                  </div>
                </div>

              </div>
            </div>

            {/* Interactive Selected Banner */}
            {selectedAllocation && (
              <div className="mt-4 p-3.5 bg-white border-2 border-[#49200B] rounded-2xl shadow-[2px_2px_0px_#49200B] animate-fadeIn">
                {(() => {
                  const item = allocations.find((a) => a.id === selectedAllocation);
                  if (!item) return null;
                  return (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full border border-black/30"
                            style={{ backgroundColor: item.color }}
                          />
                          <h4 className="font-bold font-heading text-sm text-[#49200B]">
                            {item.name} ({item.share})
                          </h4>
                        </div>
                        <span className="font-mono font-bold text-[11px] bg-[#FFF9EE] px-2 py-0.5 rounded border border-[#49200B]/30 text-[#49200B]">
                          {item.tokens} $DODO
                        </span>
                      </div>
                      <p className="text-xs text-[#79513B] font-medium leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Launch Method Disclosed Box */}
            <div className="mt-4 p-3 sm:p-4 bg-[#FFF0D4] border-2 border-[#49200B] rounded-2xl shadow-[2px_2px_0px_#49200B]">
              <p className="text-xs text-[#49200B] font-semibold leading-relaxed">
                <strong className="font-heading font-extrabold text-[#49200B]">Launch method:</strong> $DODO was created on pump.fun using the Smithii pump.fun bundler tool. The dev wallet, 10 Guardian wallets and charity wallet are 100% disclosed with on-chain transparency.
              </p>
            </div>

          </div>

        </div>

        {/* Technical Specs & Safety Table */}
        <div className="cartoon-card bg-[#cdf0a7] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 border-[#49200B] shadow-[3px_4px_0px_#49200B]">
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#49200B] mb-4 sm:mb-6 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF9F00]" />
            <span>Token Specification &amp; Contract Safety</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 mb-4 sm:mb-6">
            
            <div className="bg-white border-2 border-[#49200B] rounded-xl p-3 sm:p-4 shadow-[1.5px_1.5px_0px_#49200B] sm:shadow-[2px_2px_0px_#49200B]">
              <div className="text-[10px] sm:text-xs font-bold font-heading text-[#79513B] uppercase tracking-wider mb-0.5 sm:mb-1">Token Symbol</div>
              <div className="text-lg sm:text-xl font-extrabold font-heading text-[#49200B]">$DODO</div>
            </div>

            <div className="bg-white border-2 border-[#49200B] rounded-xl p-3 sm:p-4 shadow-[1.5px_1.5px_0px_#49200B] sm:shadow-[2px_2px_0px_#49200B]">
              <div className="text-[10px] sm:text-xs font-bold font-heading text-[#79513B] uppercase tracking-wider mb-0.5 sm:mb-1">Network</div>
              <div className="text-base sm:text-xl font-bold font-heading text-[#49200B]">Solana (SPL)</div>
            </div>

            <div className="bg-white border-2 border-[#49200B] rounded-xl p-3 sm:p-4 shadow-[1.5px_1.5px_0px_#49200B] sm:shadow-[2px_2px_0px_#49200B]">
              <div className="text-[10px] sm:text-xs font-bold font-heading text-[#79513B] uppercase tracking-wider mb-0.5 sm:mb-1">Total Supply</div>
              <div className="text-base sm:text-xl font-bold font-mono text-[#49200B]">1,000,000,000</div>
            </div>

            <div className="bg-white border-2 border-[#49200B] rounded-xl p-3 sm:p-4 shadow-[1.5px_1.5px_0px_#49200B] sm:shadow-[2px_2px_0px_#49200B]">
              <div className="text-[10px] sm:text-xs font-bold font-heading text-[#79513B] uppercase tracking-wider mb-0.5 sm:mb-1">Token Tax</div>
              <div className="text-base sm:text-xl font-bold font-heading text-emerald-800">0% Buy / 0% Sell</div>
            </div>

            <div className="bg-white border-2 border-[#49200B] rounded-xl p-3 sm:p-4 shadow-[1.5px_1.5px_0px_#49200B] sm:shadow-[2px_2px_0px_#49200B]">
              <div className="text-[10px] sm:text-xs font-bold font-heading text-[#79513B] uppercase tracking-wider mb-0.5 sm:mb-1">Mint Authority</div>
              <div className="text-sm sm:text-base font-bold text-[#49200B] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Revoked at launch
              </div>
            </div>

            <div className="bg-white border-2 border-[#49200B] rounded-xl p-3 sm:p-4 shadow-[1.5px_1.5px_0px_#49200B] sm:shadow-[2px_2px_0px_#49200B]">
              <div className="text-[10px] sm:text-xs font-bold font-heading text-[#79513B] uppercase tracking-wider mb-0.5 sm:mb-1">Freeze Authority</div>
              <div className="text-sm sm:text-base font-bold text-[#49200B] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Revoked at launch
              </div>
            </div>

            <div className="sm:col-span-2 lg:col-span-3 bg-white border-2 border-[#49200B] rounded-xl p-3 sm:p-4 shadow-[1.5px_1.5px_0px_#49200B] sm:shadow-[2px_2px_0px_#49200B] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="min-w-0">
                <div className="text-[10px] sm:text-xs font-bold font-heading text-[#79513B] uppercase tracking-wider mb-0.5 sm:mb-1">
                  Official Contract Address (Solana SPL)
                </div>
                <div className="text-xs sm:text-sm font-mono font-bold text-[#49200B] break-all select-all">
                  {CA}
                </div>
              </div>
              <button
                onClick={handleCopyCA}
                className="cartoon-btn px-3.5 py-1.5 bg-[#FFD36A] hover:bg-[#ffc947] text-xs font-bold font-heading text-[#49200B] rounded-xl border border-[#49200B] shrink-0 self-start sm:self-auto flex items-center gap-1.5 shadow-[1px_1px_0px_#49200B]"
              >
                {copiedCA ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCA ? 'Copied!' : 'Copy CA'}</span>
              </button>
            </div>

          </div>

          <p className="text-xs sm:text-sm text-[#79513B] font-medium leading-relaxed text-center sm:text-left">
            Trading on PumpSwap, pump.fun, or a Solana DEX carries only the platform&apos;s native small swap fee and standard Solana network gas; $DODO itself adds 0% tax.
          </p>
        </div>

      </div>
    </section>
  );
};
