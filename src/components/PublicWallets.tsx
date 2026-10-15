import React, { useState } from 'react';
import { ShieldCheck, ExternalLink, Copy, Check, Users, Heart, Lock } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface WalletEntry {
  id: string;
  name: string;
  role: string;
  address: string;
  type: 'charity' | 'dev' | 'guardian';
  note: string;
  country: string;
  holder: string;
}

export const PublicWallets: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'charity' | 'guardian' | 'dev'>('all');

  const wallets: WalletEntry[] = [
    {
      id: 'charity-1',
      name: 'Charity Wallet (Pet Shelters)',
      role: '1% of total supply for pet shelters',
      address: 'ASNxk6W4NhkUtYwyqotmtLx4FzTcgNLhQEvN6mFcsAX4',
      type: 'charity',
      note: 'A public multi-sig charity wallet. Holders vote on shelters, every donation has Solscan receipts.',
      country: 'India & Global',
      holder: 'Public Multi-Sig Community',
    },
    {
      id: 'dev-1',
      name: 'Dev Wallet',
      role: 'Website, tools and upkeep',
      address: 'Publishing soon',
      type: 'dev',
      note: 'Platform infrastructure, RPC endpoints, domain hosting, and open-source tooling.',
      country: 'Chennai, TN',
      holder: 'VJDurga Core Dev',
    },
    {
      id: 'guardian-1',
      name: 'Guardian Wallet 1 (Founder)',
      role: 'VJDurga Founder Wallet',
      address: 'Publishing soon',
      type: 'guardian',
      note: 'Doxxed founder wallet. Never sell policy; permanent believer in CuteDoDo mission.',
      country: 'India (Tamil Nadu)',
      holder: 'VJDurga',
    },
    {
      id: 'guardian-2',
      name: 'Guardian Wallet 2 (Grandmother)',
      role: 'Founder’s Grandma’s Wallet',
      address: 'Publishing soon',
      type: 'guardian',
      note: 'Dodo sits beside grandma every single afternoon in Chennai. Protected family holding.',
      country: 'India (Chennai)',
      holder: 'Dodo’s Grandma',
    },
    {
      id: 'guardian-3',
      name: 'Guardian Wallet 3 (Family Core)',
      role: 'VJDurga Family Home',
      address: 'Publishing soon',
      type: 'guardian',
      note: 'The small home where Dodo came into our lives 1.5–2 years ago.',
      country: 'India (Tamil Nadu)',
      holder: 'Immediate Family',
    },
    {
      id: 'guardian-4',
      name: 'Guardian Wallet 4 (Singapore)',
      role: 'Web3 Dog Lover & Tech Ally',
      address: 'Publishing soon',
      type: 'guardian',
      note: 'Connected via VJDurga’s 7-nation journey; early ecosystem backer.',
      country: 'Singapore 🇸🇬',
      holder: 'K. Tan (Global Friend)',
    },
    {
      id: 'guardian-5',
      name: 'Guardian Wallet 5 (United Kingdom)',
      role: 'Animal Welfare Advocate',
      address: 'Publishing soon',
      type: 'guardian',
      note: 'Passionate rescuer of shelter terriers in London.',
      country: 'United Kingdom 🇬🇧',
      holder: 'Oliver M.',
    },
    {
      id: 'guardian-6',
      name: 'Guardian Wallet 6 (Japan)',
      role: 'Meme Community Lead',
      address: 'Publishing soon',
      type: 'guardian',
      note: 'Shiba & CuteDODO lover connected through web3 art circles.',
      country: 'Japan 🇯🇵',
      holder: 'Ren T.',
    },
    {
      id: 'guardian-7',
      name: 'Guardian Wallet 7 (United Arab Emirates)',
      role: 'Ecosystem Partner',
      address: 'Publishing soon',
      type: 'guardian',
      note: 'Dog shelter sponsor and Middle East crypto alliance.',
      country: 'UAE 🇦🇪',
      holder: 'Tariq A.',
    },
    {
      id: 'guardian-8',
      name: 'Guardian Wallet 8 (Canada)',
      role: 'Rescue Coordinator',
      address: 'Publishing soon',
      type: 'guardian',
      note: 'Cold-weather foster home volunteer; huge Dodo fan.',
      country: 'Canada 🇨🇦',
      holder: 'Sarah B.',
    },
    {
      id: 'guardian-9',
      name: 'Guardian Wallet 9 (Australia)',
      role: 'Community Moderator',
      address: 'Publishing soon',
      type: 'guardian',
      note: 'Discord and telegram volunteer managing global timezones.',
      country: 'Australia 🇦🇺',
      holder: 'Liam W.',
    },
    {
      id: 'guardian-10',
      name: 'Guardian Wallet 10 (Germany)',
      role: 'Smart Contract Auditor',
      address: 'Publishing soon',
      type: 'guardian',
      note: 'Independent reviewer of SPL safety and revoked permissions.',
      country: 'Germany 🇩🇪',
      holder: 'Max K.',
    },
  ];

  const filteredWallets = wallets.filter((w) => {
    if (filter === 'all') return true;
    return w.type === filter;
  });

  const handleCopy = (id: string, addr: string) => {
    sounds.coin();
    navigator.clipboard?.writeText(addr);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="wallets" className="py-16 md:py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#C6EAD7] border border-[#49200B]/30 rounded-xl text-xs font-bold font-heading text-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] mb-3">
            <span>👁️ 100% On-Chain Visibility</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#49200B] tracking-tight mb-3">
            Public Wallets &amp; <span className="text-[#FF9F00]">Transparency</span>
          </h2>
          <p className="text-base sm:text-lg text-[#79513B] font-medium leading-relaxed">
            Every team and charity wallet, so you can check balances and transfers yourself. No hidden insider allocations.
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {[
              { id: 'all', label: 'All Wallets (12)' },
              { id: 'charity', label: 'Charity (1% Shelter)' },
              { id: 'guardian', label: '10 Guardian Wallets' },
              { id: 'dev', label: 'Dev & Infrastructure' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  sounds.pop();
                  setFilter(t.id as typeof filter);
                }}
                className={`cartoon-btn px-3.5 py-1.5 text-xs sm:text-sm font-bold font-heading rounded-xl ${
                  filter === t.id
                    ? 'bg-[#FFD36A] text-[#49200B] border-2 border-[#49200B] shadow-[2px_2px_0px_#49200B]'
                    : 'bg-[#FFF9F0] text-[#79513B] border border-[#49200B]/30 hover:bg-[#F7D9C7]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Wallets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {filteredWallets.map((w, idx) => {
            const isCopied = copiedId === w.id;
            const cardBg = idx === 0 ? 'bg-[#f9dcb7]' : idx === 1 ? 'bg-[#c2f8d1]' : 'bg-[#FFF9F0]';

            return (
              <div
                key={w.id}
                className={`cartoon-card ${cardBg} rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-start justify-between gap-1.5 mb-1.5">
                    <div className="min-w-0 pr-1">
                      <h3 className="font-heading font-bold text-xs sm:text-sm text-[#49200B] leading-tight truncate" title={w.name}>
                        {w.name}
                      </h3>
                      <div className="text-[10px] sm:text-[11px] font-bold text-[#FF9F00] leading-tight truncate">
                        {w.role}
                      </div>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md border border-[#49200B]/30 bg-white font-bold font-heading text-[#49200B] shrink-0">
                      {w.country}
                    </span>
                  </div>

                  <p className="text-[11px] text-amber-900/80 font-medium leading-snug line-clamp-2 mb-2">
                    {w.note}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-amber-950/10">
                  <div className="font-mono text-[10px] bg-amber-50 border border-amber-950/30 rounded-lg px-2 py-1 truncate text-amber-950" title={w.address}>
                    {w.address}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {w.type === 'charity' ? (
                      <>
                        <button
                          onClick={() => handleCopy(w.id, w.address)}
                          className="flex-1 cartoon-btn py-1 bg-amber-200 hover:bg-amber-300 text-amber-950 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1"
                        >
                          {isCopied ? <Check className="w-3 h-3 text-emerald-800" /> : <Copy className="w-3 h-3" />}
                          <span>{isCopied ? 'Copied' : 'Copy'}</span>
                        </button>

                        <a
                          href={`https://solscan.io/account/${w.address}`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => sounds.pop()}
                          className="cartoon-btn px-2.5 py-1 bg-white hover:bg-amber-50 text-amber-950 rounded-lg text-[11px] font-bold flex items-center justify-center gap-0.5 shrink-0"
                          title="View on Solscan Explorer"
                        >
                          <span>Solscan ↗</span>
                        </a>
                      </>
                    ) : (
                      <div className="w-full py-1 bg-amber-100/70 border border-amber-950/30 text-amber-900 rounded-lg text-[10px] font-bold text-center truncate px-1">
                        Public at pump.fun launch
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Guardian Transparency Promise Banner */}
        <div id="transparency" className="cartoon-card bg-amber-300 rounded-3xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8">
              <div className="flex items-center gap-2 text-amber-950 font-cartoon font-bold text-xl mb-2">
                <Lock className="w-6 h-6 text-amber-900" />
                <span>Our Unbreakable Transparency Promise</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-950/90 font-semibold leading-relaxed">
                Guardian wallets never sell. Real people stand behind this project—genuine dog lovers from different countries, connected through VJDurga’s journey across 7 nations and the web3 world. Every donation wallet openly documents every single rupee and SOL that reaches pet shelters and thirsty, hungry stray dogs.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-center md:justify-end">
              <a
                href="#charity"
                onClick={() => sounds.pop()}
                className="cartoon-btn px-6 py-3 bg-white hover:bg-amber-50 text-amber-950 font-cartoon font-bold rounded-2xl flex items-center gap-2 text-sm shadow-[3px_3px_0px_#3d2314]"
              >
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                <span>See Donation Milestones</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
