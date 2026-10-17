import React, { useState } from 'react';
import { Heart, ExternalLink, CheckCircle2, Vote, Sparkles, Shield, Camera } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface Milestone {
  target: string;
  title: string;
  desc: string;
  proof: string;
  status: 'Ready' | 'Upcoming';
  icon: string;
}

export const CharityMilestones: React.FC = () => {
  const [shelterVotes, setShelterVotes] = useState<Record<string, number>>({
    blueCrossChennai: 342,
    cupaBangalore: 215,
    strayReliefDelhi: 189,
    sarvohamAnimalTrust: 278,
  });
  const [hasVoted, setHasVoted] = useState(false);

  const totalVotes = Object.values(shelterVotes).reduce((a, b) => a + b, 0);

  const castVote = (id: string) => {
    if (hasVoted) return;
    sounds.bell();
    setShelterVotes((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
    setHasVoted(true);
  };

  const donationWallet = 'ASNxk6W4NhkUtYwyqotmtLx4FzTcgNLhQEvN6mFcsAX4';
  const [copiedDonation, setCopiedDonation] = useState(false);

  const copyDonationWallet = () => {
    sounds.coin();
    navigator.clipboard?.writeText(donationWallet);
    setCopiedDonation(true);
    setTimeout(() => setCopiedDonation(false), 2000);
  };

  const milestones: Milestone[] = [
    {
      target: 'Launch',
      title: 'Charity wallet goes public',
      desc: 'The charity wallet address is published on this page, so anyone can watch its balance.',
      proof: 'Proof: wallet address on Solscan',
      status: 'Ready',
      icon: '🔐',
    },
    {
      target: '$100k',
      title: 'First meals for strays',
      desc: 'Food for stray-dog shelters in Chennai, Dodo’s home town.',
      proof: 'Proof: Solscan transfer + photos on X & Telegram',
      status: 'Upcoming',
      icon: '🥣',
    },
    {
      target: '$300k',
      title: 'Holders pick the shelters',
      desc: 'A community poll chooses recognised animal shelters in India to receive support.',
      proof: 'Proof: poll result + Solscan transfer',
      status: 'Upcoming',
      icon: '🗳️',
    },
    {
      target: '$500k',
      title: 'Vet care',
      desc: 'Funding medical care for injured and sick street animals.',
      proof: 'Proof: Solscan transfer + shelter receipt',
      status: 'Upcoming',
      icon: '🩺',
    },
    {
      target: '$1M',
      title: 'Rescue & shelter support',
      desc: 'Larger support for rescue work and shelter space.',
      proof: 'Proof: Solscan transfer + video from the shelters',
      status: 'Upcoming',
      icon: '🏡',
    },
    {
      target: '$3M',
      title: 'Beyond India',
      desc: 'Shelters outside India, chosen only by $DODO holders.',
      proof: 'Proof: vote results published here',
      status: 'Upcoming',
      icon: '🌍',
    },
    {
      target: '$5M',
      title: 'A long-term shelter fund',
      desc: 'A lasting fund for animal welfare, if holders vote for it.',
      proof: 'Proof: full donation list on this site',
      status: 'Upcoming',
      icon: '🏆',
    },
  ];

  return (
    <section id="charity" className="py-8 sm:py-12 md:py-24 bg-[#ffb32c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-[#49200B] rounded-xl text-xs font-bold font-heading text-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] mb-2 sm:mb-3">
            <span>🐾 Paws for a Cause</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#49200B] tracking-tight mb-2 sm:mb-3">
            Real Milestones. Real Donations. <span className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]">Real Receipts.</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#49200B] font-semibold leading-relaxed">
            Where every milestone feeds a stray. <strong className="text-[#49200B] underline decoration-white decoration-2">1% of the supply sits in a public charity wallet</strong>. As $DODO grows, donations go out at these market-cap goals, and every one is posted here with its Solscan link and photos.
          </p>

          {/* Official Public Charity Donation Address Box */}
          <div className="mt-4 sm:mt-6 inline-flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 bg-white border-2 border-[#49200B] p-2 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl shadow-[2.5px_2.5px_0px_#49200B] sm:shadow-[3px_3px_0px_#49200B] max-w-xl mx-auto">
            <span className="text-[11px] sm:text-xs font-bold font-heading text-[#49200B] shrink-0">Official Charity Wallet:</span>
            <span className="font-mono text-[10px] sm:text-xs font-bold text-[#49200B] bg-[#FFF9F0] border border-[#49200B]/30 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg truncate max-w-[220px] sm:max-w-[280px]">
              {donationWallet}
            </span>
            <button
              onClick={copyDonationWallet}
              className="cartoon-btn px-2.5 py-0.5 sm:px-3 sm:py-1 bg-[#B7F34A] hover:bg-[#a6e637] text-[#49200B] text-[11px] sm:text-xs font-bold font-heading rounded-lg sm:rounded-xl flex items-center gap-1 shrink-0"
            >
              {copiedDonation ? 'Copied ✓' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Milestone Timeline Cards */}
        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-16 max-w-4xl mx-auto">
          {milestones.map((m) => (
            <div
              key={m.target}
              className="cartoon-card bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 transition-all hover:bg-[#FFFDF9]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#FFD36A] border-2 border-[#49200B] flex flex-col items-center justify-center shrink-0 shadow-[1.5px_1.5px_0px_#49200B] sm:shadow-[2px_2px_0px_#49200B]">
                    <span className="text-lg sm:text-xl">{m.icon}</span>
                    <span className="text-[10px] sm:text-[11px] font-bold font-heading text-[#49200B] mt-0.5">{m.target}</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold font-heading text-[#49200B]">
                      {m.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#79513B] font-medium mt-0.5 sm:mt-1">
                      {m.desc}
                    </p>
                    <div className="mt-1.5 sm:mt-2 text-xs font-semibold text-[#FF9F00] flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-[#FF9F00]" />
                      <span>{m.proof}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 self-end sm:self-center">
                  <span className={`text-xs font-bold font-heading px-3 py-1.5 rounded-xl border-2 border-[#49200B] shadow-[1px_1px_0px_#49200B] ${
                    m.status === 'Ready'
                      ? 'bg-[#C6EAD7] text-[#49200B]'
                      : 'bg-[#FFF9F0] text-[#79513B]'
                  }`}>
                    {m.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notice on bonding curve */}
        <p className="text-xs text-center text-[#49200B] font-semibold max-w-2xl mx-auto mb-16">
          Market-cap milestones are goals, not promises. The pump.fun bonding curve completes at around a $69k market cap, after which $DODO trades on a Solana DEX.
        </p>

        {/* Interactive Holder Shelter Voting Box */}
        <div className="cartoon-card bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-[#49200B]/15">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#49200B] flex items-center gap-2">
                <Vote className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF9F00]" />
                <span>Community Shelter Voting Poll</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#79513B] font-medium">
                Holders vote on which recognized shelter receives the next grant allocation!
              </p>
            </div>
            <div className="text-[11px] sm:text-xs font-bold font-heading text-[#49200B] bg-[#FFD36A] border-2 border-[#49200B] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl shadow-[1.5px_1.5px_0px_#49200B] sm:shadow-[2px_2px_0px_#49200B]">
              Total Votes: {totalVotes}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              {
                id: 'blueCrossChennai',
                name: 'Blue Cross of India (Chennai)',
                location: 'Chennai, Tamil Nadu',
                mission: 'Dodo’s hometown animal hospital and 24/7 rescue sanctuary',
              },
              {
                id: 'cupaBangalore',
                name: 'CUPA Animal Shelter (Bangalore)',
                location: 'Bangalore, Karnataka',
                mission: 'Compassion Unlimited Plus Action for injured street dogs',
              },
              {
                id: 'sarvohamAnimalTrust',
                name: 'Sarvoham Animal Sanctuary',
                location: 'Bengaluru',
                mission: 'Dedicated shelter for paralyzed and senior street dogs',
              },
              {
                id: 'strayReliefDelhi',
                name: 'Stray Relief and Animal Welfare (STRAW)',
                location: 'India Nationwide',
                mission: 'Animal welfare, emergency medical aid and stray feeding',
              },
            ].map((shelter) => {
              const votes = shelterVotes[shelter.id] || 0;
              const percentage = Math.round((votes / totalVotes) * 100);

              return (
                <div
                  key={shelter.id}
                  className="bg-white border-2 border-[#49200B] rounded-2xl p-4 shadow-[2px_2px_0px_#49200B] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h4 className="font-heading font-bold text-base text-[#49200B]">
                        {shelter.name}
                      </h4>
                      <span className="text-xs font-bold font-mono text-[#79513B] shrink-0">
                        {percentage}%
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-[#FF9F00] mb-2">
                      📍 {shelter.location}
                    </div>
                    <p className="text-xs text-[#79513B] mb-3 font-medium">
                      {shelter.mission}
                    </p>
                  </div>

                  <div>
                    {/* Vote progress bar */}
                    <div className="w-full h-3 bg-[#FFF9F0] rounded-full border border-[#49200B] overflow-hidden mb-3">
                      <div
                        className="h-full bg-[#FFD36A] rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <button
                      disabled={hasVoted}
                      onClick={() => castVote(shelter.id)}
                      className={`w-full py-2 rounded-xl text-xs font-bold font-heading border-2 border-[#49200B] transition-all ${
                        hasVoted
                          ? 'bg-[#F7D9C7] text-[#79513B] opacity-80 cursor-default'
                          : 'cartoon-btn bg-[#FFD36A] hover:bg-[#ffc947] text-[#49200B]'
                      }`}
                    >
                      {hasVoted ? 'Vote Recorded ✓' : 'Vote For This Shelter 🐾'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
