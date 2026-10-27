import React, { useState } from 'react';
import { PieChart, ShieldCheck, CheckCircle2, Lock, Flame, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const Tokenomics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'public' | 'guardian' | 'charity' | 'dev'>('all');

  const allocations = [
    {
      id: 'public',
      label: 'Public Floating Market (Bonding Curve Pool)',
      percentage: '86.44%',
      tokens: '864,400,000 $DODO',
      description: 'pump.fun bonding curve pool, the vast super-majority. Open to everyone in fair launch with zero private rounds or VC allocation.',
      color: 'bg-[#FFD36A]',
      border: 'border-[#49200B]',
      barWidth: '86.44%',
    },
    {
      id: 'guardian',
      label: 'Guardian Diamond-Hand Floor (Wallets)',
      percentage: '8.75%',
      tokens: '87,500,000 $DODO',
      description: 'Doxxed team, guardians and family diamond-hand floor across verified public wallets (including founder’s grandma and guardians). Every address is public, non-dumping, and publicly verifiable on Solscan.',
      color: 'bg-[#C6EAD7]',
      border: 'border-[#49200B]',
      barWidth: '8.75%',
    },
    {
      id: 'dev',
      label: 'Core Operations & Ecosystem Growth (Dev Wallet)',
      percentage: '3.66%',
      tokens: '36,600,000 $DODO',
      description: 'Website hosting, high-speed RPC nodes, custom community bots, and continuous platform growth. Managed transparently.',
      color: 'bg-[#FF9F00]',
      border: 'border-[#49200B]',
      barWidth: '3.66%',
    },
    {
      id: 'charity',
      label: 'Verified Charity & Community Impact Pool',
      percentage: '1.15%',
      tokens: '11,500,000 $DODO',
      description: 'Dedicated to registered animal shelters & street dog rescues. Holders vote on allocations with verifiable on-chain Solscan transaction proofs.',
      color: 'bg-[#F7D9C7]',
      border: 'border-[#49200B]',
      barWidth: '1.15%',
    },
  ];

  return (
    <section id="tokenomics" className="py-8 sm:py-12 md:py-24 bg-[#BFE8F7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-[#49200B] rounded-xl text-xs font-bold font-heading text-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] mb-2 sm:mb-3">
            <span>🪙 Clean Tokenomics</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#49200B] tracking-tight mb-2 sm:mb-3">
            Where Every <span className="text-[#FF9F00] underline decoration-[#49200B]/30">$DODO</span> Goes
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#49200B]/85 font-semibold leading-relaxed">
            1,000,000,000 $DODO in total. Nothing more can ever be minted. Total group allocation is locked at exactly <strong className="text-[#49200B]">13.56%</strong> across guardian wallets (8.75%), dev operations (3.66%), and charity (1.15%), with <strong className="text-[#49200B]">86.44%</strong> on the public market. <strong className="text-[#49200B]">0% of supply</strong> is set aside for marketing.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start mb-8 sm:mb-16">
          
          {/* Column 1: 3D Coin Badge & Supply Distribution Graph (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="cartoon-card bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 w-full max-w-sm text-center">
              <div className="relative w-36 h-36 xs:w-44 xs:h-44 sm:w-52 sm:h-52 mx-auto mb-3 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#49200B] shadow-[2.5px_3px_0px_#49200B] sm:shadow-[3px_4px_0px_#49200B] bg-[#FFD36A] animate-float">
                <img
                  src="/assets/images/cutedodo_coin_badge_1791659647166.jpg"
                  alt="3D CuteDodo Coin Badge"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="inline-block bg-[#FFD36A] border-2 border-[#49200B] px-3 py-1 sm:px-4 sm:py-1.5 rounded-xl sm:rounded-2xl text-xs sm:text-base font-bold font-heading text-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] sm:shadow-[2px_2px_0px_#49200B] mb-1.5">
                1,000,000,000 Total $DODO
              </div>
              <p className="text-[11px] sm:text-xs font-bold font-heading text-[#79513B] mb-3">
                Hard Capped Supply · Zero Inflation
              </p>

              {/* Progress representation bar */}
              <div className="w-full h-5 sm:h-6 rounded-xl border-2 border-[#49200B] bg-white overflow-hidden flex shadow-[1px_1px_0px_#49200B]">
                <div style={{ width: '86.44%' }} className="bg-[#FFD36A] h-full" title="86.44% Public Floating Market" />
                <div style={{ width: '8.75%' }} className="bg-[#C6EAD7] h-full" title="8.75% Guardian Diamond-Hand Floor" />
                <div style={{ width: '3.66%' }} className="bg-[#FF9F00] h-full" title="3.66% Dev Operations" />
                <div style={{ width: '1.15%' }} className="bg-[#F7D9C7] h-full" title="1.15% Charity Impact Pool" />
              </div>

              <div className="flex justify-between text-[10px] sm:text-[11px] font-bold font-heading text-[#49200B] mt-1.5 px-1">
                <span>Public: 86.44%</span>
                <span>Guardians: 8.75%</span>
                <span>Dev: 3.66%</span>
                <span className="text-[#FF9F00]">Charity: 1.15%</span>
              </div>

              {/* Verified Supply Distribution Graph Bars */}
              <div className="w-full mt-4 pt-3.5 border-t border-[#49200B]/15 text-left space-y-2.5">
                <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold font-heading text-[#49200B]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1D77D4] inline-block" />
                    Supply Distribution Graph
                  </span>
                  <span className="text-[10px] font-mono bg-[#FFF9F0] border border-[#49200B]/20 px-1.5 py-0.5 rounded text-[#49200B]">
                    13.56% Group / 86.44% Market
                  </span>
                </div>

                {/* 1. Public Floating Market */}
                <div className="bg-[#FFF9F0] border border-[#49200B]/25 rounded-xl p-2 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 bg-white border border-[#49200B]/30 rounded h-4 overflow-hidden flex items-center p-0.5">
                      <div style={{ width: '86.44%' }} className="h-full bg-[#202020] rounded-sm transition-all duration-700" />
                    </div>
                    <span className="font-extrabold text-xs text-[#111827] shrink-0 font-mono">86.44%</span>
                  </div>
                  <div className="text-[11px] font-bold text-[#1F2937] leading-tight">
                    Public Floating Market (Bonding Curve Pool)
                  </div>
                </div>

                {/* 2. Guardian Diamond-Hand Floor */}
                <div className="bg-[#FFF9F0] border border-[#49200B]/25 rounded-xl p-2 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 bg-white border border-[#49200B]/30 rounded h-4 overflow-hidden flex items-center p-0.5">
                      <div style={{ width: '8.75%' }} className="h-full bg-[#202020] rounded-sm transition-all duration-700" />
                    </div>
                    <span className="font-extrabold text-xs text-[#111827] shrink-0 font-mono">8.75%</span>
                  </div>
                  <div className="text-[11px] font-bold text-[#1F2937] leading-tight">
                    8.75% Guardian Diamond-Hand Floor (Wallets)
                  </div>
                </div>

                {/* 3. Core Operations */}
                <div className="bg-[#FFF9F0] border border-[#49200B]/25 rounded-xl p-2 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 bg-white border border-[#49200B]/30 rounded h-4 overflow-hidden flex items-center p-0.5">
                      <div style={{ width: '3.66%' }} className="h-full bg-[#202020] rounded-sm transition-all duration-700" />
                    </div>
                    <span className="font-extrabold text-xs text-[#111827] shrink-0 font-mono">3.66%</span>
                  </div>
                  <div className="text-[11px] font-bold text-[#1F2937] leading-tight">
                    3.66% Core Operations &amp; Ecosystem Growth (Dev Wallet)
                  </div>
                </div>

                {/* 4. Charity Impact Pool */}
                <div className="bg-[#FFF9F0] border border-[#49200B]/25 rounded-xl p-2 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 bg-white border border-[#49200B]/30 rounded h-4 overflow-hidden flex items-center p-0.5">
                      <div style={{ width: '1.15%' }} className="h-full bg-[#202020] rounded-sm transition-all duration-700" />
                    </div>
                    <span className="font-extrabold text-xs text-[#111827] shrink-0 font-mono">1.15%</span>
                  </div>
                  <div className="text-[11px] font-bold text-[#1F2937] leading-tight">
                    1.15% Verified Charity &amp; Community Impact Pool
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Allocation Breakdown List (7 Cols) */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            {allocations.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  sounds.pop();
                  setActiveTab(item.id as typeof activeTab);
                }}
                className={`cartoon-card p-3.5 sm:p-5 rounded-2xl cursor-pointer transition-all ${
                  activeTab === item.id ? 'bg-[#FFD36A] border-2 border-[#49200B]' : 'bg-white'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-[#49200B] ${item.color}`} />
                    <h3 className="text-base sm:text-lg font-bold font-heading text-[#49200B]">
                      {item.label}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-[11px] sm:text-xs font-bold font-mono text-[#49200B] bg-[#FFF9F0] border border-[#49200B]/30 px-2 sm:px-2.5 py-0.5 rounded-lg">
                      {item.tokens}
                    </span>
                    <span className="text-sm sm:text-base font-extrabold font-heading text-[#49200B]">
                      {item.percentage}
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#79513B] font-medium leading-relaxed mb-2">
                  {item.description}
                </p>

                {/* Individual Proportion Bar */}
                <div className="w-full bg-[#FFF9F0] border border-[#49200B]/20 rounded-lg h-3 overflow-hidden p-0.5">
                  <div
                    style={{ width: item.barWidth }}
                    className="h-full bg-[#202020] rounded-sm transition-all duration-500"
                  />
                </div>
              </div>
            ))}

            {/* Zero Marketing Note */}
            <div className="p-3 sm:p-4 bg-white border-2 border-[#49200B] rounded-2xl shadow-[2px_2px_0px_#49200B] flex items-center gap-2.5 sm:gap-3">
              <span className="text-xl sm:text-2xl">🌱</span>
              <div className="text-xs sm:text-sm font-semibold text-[#49200B]">
                <strong className="font-heading">0% Marketing Tokens:</strong> Ads, trending, and listings are paid in SOL directly from our own personal pocket. We never sell $DODO to pay for ads.
              </div>
            </div>
          </div>

        </div>

        {/* Technical Specs Table */}
        <div className="cartoon-card bg-[#cdf0a7] rounded-2xl sm:rounded-3xl p-4 sm:p-8">
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
                  2e5bKRHpAixvgE6zUdTf7rigxCq662zq7xvN8Dympump
                </div>
              </div>
              <button
                onClick={() => {
                  sounds.coin();
                  navigator.clipboard?.writeText('2e5bKRHpAixvgE6zUdTf7rigxCq662zq7xvN8Dympump');
                }}
                className="cartoon-btn px-3 py-1.5 bg-[#FFD36A] hover:bg-[#ffc947] text-xs font-bold font-heading text-[#49200B] rounded-xl border border-[#49200B] shrink-0 self-start sm:self-auto flex items-center gap-1 shadow-[1px_1px_0px_#49200B]"
              >
                <span>Copy CA</span>
              </button>
            </div>

          </div>

          <p className="text-xs sm:text-sm text-[#79513B] font-medium leading-relaxed text-center sm:text-left">
            Trading on pump.fun, a Solana DEX or Jupiter carries the platform&apos;s own small swap fee and Solana network fees; $DODO itself adds no tax.
          </p>
        </div>

      </div>
    </section>
  );
};
