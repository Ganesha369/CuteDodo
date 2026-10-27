import React, { useState } from 'react';
import { ShieldCheck, ExternalLink, Copy, Check, Lock, Heart } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface WalletEntry {
  id: string;
  name: string;
  role: string;
  address: string;
  type: 'charity' | 'dev' | 'guardian';
  note?: string;
  country: string;
  holder: string;
}

export const PublicWallets: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'charity' | 'guardian' | 'dev'>('all');

  const wallets: WalletEntry[] = [
    {
      id: 'dev-1',
      name: 'CuteDodo Dev Wallet',
      role: '3.66% Core Operations & Dev',
      address: 'HRE98kgFUGGz6d6HqjW8wRV7dfKwyNSsvnJ8AaEK4bxJ',
      type: 'dev',
      note: 'Platform infrastructure, RPC endpoints, domain hosting, and open-source tooling.',
      country: 'Chennai',
      holder: 'VJDurga Core Dev',
    },
    {
      id: 'charity-1',
      name: 'DoDo Charity Wallet',
      role: '1.15% Verified Charity & Impact Pool',
      address: 'ASNxk6W4NhkUtYwyqotmtLx4FzTcgNLhQEvN6mFcsAX4',
      type: 'charity',
      note: 'A public multi-sig charity wallet. Holders vote on shelters, every donation has Solscan receipts.',
      country: 'Dodo Chennai',
      holder: 'Public Multi-Sig Community',
    },
    {
      id: 'guardian-vv',
      name: 'Gaurdian Wallet VV',
      role: 'Guardian Holding (Never Sell)',
      address: '9zT8H3RQSBAQJn7e5rzQPpjo8YzqdEJZAgo6NgpCpkVT',
      type: 'guardian',
      country: 'Chile',
      holder: 'VV',
    },
    {
      id: 'guardian-yg',
      name: 'Gaurdian Wallet YG',
      role: 'Guardian Holding (Never Sell)',
      address: 'GjrZkvj7Z88acevqiLbS8ex9zujnzmMyhwUjtKR4vJ2t',
      type: 'guardian',
      country: 'Chile',
      holder: 'YG',
    },
    {
      id: 'guardian-vara',
      name: 'Guardian Wallet VARA',
      role: 'Guardian Holding (Never Sell)',
      address: 'Dii6GDaHpVENErgRUWPH6x8RATigGSPEQ8BECHh6JaZ1',
      type: 'guardian',
      country: 'India',
      holder: 'VARA',
    },
    {
      id: 'guardian-knam',
      name: 'Gaurdian Wallet KNAM',
      role: 'Guardian Holding (Never Sell)',
      address: 'HkBkyjAMh8pjNxeuprRLSZJB15V4Ys3a8KpJgSXWuNbk',
      type: 'guardian',
      country: 'Uruguay',
      holder: 'KNAM',
    },
    {
      id: 'guardian-grandma',
      name: 'Gaurdian Wallet Grandma',
      role: 'Protected Family Holding',
      address: '6tkzCuR7uyFC2wKbyTnac6XhDfQNNVdgybQExhhTH5Pk',
      type: 'guardian',
      country: 'Chennai',
      holder: 'Grandma',
    },
    {
      id: 'guardian-rdy',
      name: 'Gaurdian Wallet RDY',
      role: 'Guardian Holding (Never Sell)',
      address: '7amkfwmLJstZbkLKPepQ2eu6ywDt2HNtRF9YR8Nb2sVu',
      type: 'guardian',
      country: 'London, UK',
      holder: 'RDY',
    },
    {
      id: 'guardian-vis',
      name: 'Guardian Wallet VIS',
      role: 'Guardian Holding (Never Sell)',
      address: '3RU1K6AmNkoJV6Zjo49GYB5GqqidXVwkQN531Aj9chrH',
      type: 'guardian',
      country: 'London, UK',
      holder: 'VIS',
    },
    {
      id: 'guardian-sel',
      name: 'Guardian Wallet SEL',
      role: 'Guardian Holding (Never Sell)',
      address: '4sr95oeZDzYMYw6NWavMEzDaKR9Hz4J1UcQB42p9i1c3',
      type: 'guardian',
      country: 'USA',
      holder: 'SEL',
    },
    {
      id: 'guardian-gan',
      name: 'Guardian Wallet GAN',
      role: 'Guardian Holding (Never Sell)',
      address: 'Fsv6TgkPVSN4yKCPVNZEP3MAakjw46fR6YRaTf38rHC7',
      type: 'guardian',
      country: 'Bangalore India',
      holder: 'GAN',
    },
    {
      id: 'guardian-yas',
      name: 'Gaurdian Wallet YAS',
      role: 'Guardian Holding (Never Sell)',
      address: '6V9HyFbYL1nve7T8VHamS3BD3pEu5AqzWBRFijy4FxLY',
      type: 'guardian',
      country: 'Bangalore India',
      holder: 'YAS',
    },
    {
      id: 'guardian-lak-1',
      name: 'Guardian Wallet LAK',
      role: 'Guardian Holding (Never Sell)',
      address: '9B8bjouksxuKEqzm9ivW9Hthdtvj3QsUCv5U4N3LmM24',
      type: 'guardian',
      country: 'Guardian',
      holder: 'LAK',
    },
    {
      id: 'guardian-lak-2',
      name: 'Guardian Wallet LAK',
      role: 'Guardian Holding (Never Sell)',
      address: 'EVQz1cT2MQoS7LVLmJkrKiurLaWQtGKtR1gYMzk45dya',
      type: 'guardian',
      country: 'Guardian',
      holder: 'LAK',
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
    <section id="wallets" className="py-8 sm:py-12 md:py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C6EAD7] border border-[#49200B]/30 rounded-xl text-xs font-bold font-heading text-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] mb-2 sm:mb-3">
            <span>👁️ 100% On-Chain Visibility</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#49200B] tracking-tight mb-2 sm:mb-3">
            Public Wallets &amp; <span className="text-[#FF9F00]">Transparency</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#79513B] font-medium leading-relaxed">
            Every team, guardian, and charity wallet, so you can check balances and transfers yourself. No hidden insider allocations.
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
            {[
              { id: 'all', label: 'All Wallets (14)' },
              { id: 'charity', label: 'Charity (1.15% Pool)' },
              { id: 'guardian', label: 'Guardian Wallets (8.75%)' },
              { id: 'dev', label: 'Dev Operations (3.66%)' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  sounds.pop();
                  setFilter(t.id as typeof filter);
                }}
                className={`cartoon-btn px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-sm font-bold font-heading rounded-xl ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-8 sm:mb-12">
          {filteredWallets.map((w, idx) => {
            const isCopied = copiedId === w.id;
            const cardBg = idx === 0 ? 'bg-[#f9dba6]' : idx === 1 ? 'bg-[#c2f8d1]' : 'bg-[#FFF9F0]';

            return (
              <div
                key={w.id}
                className={`cartoon-card ${cardBg} rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 flex flex-col justify-between`}
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

                  {w.note && (
                    <p className="text-[11px] text-amber-900/80 font-medium leading-snug line-clamp-2 mb-2">
                      {w.note}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5 pt-2 border-t border-amber-950/10">
                  <div className="font-mono text-[10px] bg-amber-50 border border-amber-950/30 rounded-lg px-2 py-1 truncate text-amber-950 select-all" title={w.address}>
                    {w.address}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(w.id, w.address)}
                      className="flex-1 cartoon-btn py-1 bg-amber-200 hover:bg-amber-300 text-amber-950 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-emerald-800" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>

                    <a
                      href={`https://solscan.io/account/${w.address}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sounds.pop()}
                      className="cartoon-btn px-2.5 py-1 bg-white hover:bg-amber-50 text-amber-950 rounded-lg text-[11px] font-bold flex items-center justify-center gap-0.5 shrink-0 transition-colors"
                      title={`View ${w.name} on Solscan Explorer`}
                    >
                      <span>Solscan ↗</span>
                    </a>
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
