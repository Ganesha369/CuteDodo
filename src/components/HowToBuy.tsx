import React, { useState } from 'react';
import { ArrowDownUp, Wallet, ShieldCheck, Sparkles, ExternalLink, Check, Copy } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const HowToBuy: React.FC = () => {
  const [solAmount, setSolAmount] = useState<string>('0.5');
  const [slippage, setSlippage] = useState<string>('1.0');
  const [walletConnected, setWalletConnected] = useState(false);
  const [connectedWalletName, setConnectedWalletName] = useState('');
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [copiedCA, setCopiedCA] = useState(false);
  const [swapStatusMessage, setSwapStatusMessage] = useState<string | null>(null);

  const CA = 'Coming soon';

  // Approx calculated DODO rate based on hypothetical SOL price ($160) and $DODO launch valuation
  const estimatedDodo = solAmount && !isNaN(parseFloat(solAmount))
    ? Math.floor(parseFloat(solAmount) * 2315000).toLocaleString()
    : '0';

  const handleConnectWallet = (wallet: string) => {
    sounds.bell();
    setConnectedWalletName(wallet);
    setWalletConnected(true);
    setShowWalletModal(false);
  };

  const handleCopyCA = () => {
    sounds.coin();
    navigator.clipboard?.writeText(CA);
    setCopiedCA(true);
    setTimeout(() => setCopiedCA(false), 2000);
  };

  const steps = [
    {
      step: '1',
      title: 'Get a Solana Wallet',
      description: 'Install Phantom, Solflare or Backpack from the official app store or phantom.com / solflare.com.',
      icon: '👛',
    },
    {
      step: '2',
      title: 'Add SOL',
      description: 'Buy SOL on an exchange and send it to your wallet. Keep a little extra for network fees.',
      icon: '🪙',
    },
    {
      step: '3',
      title: 'Check the CA',
      description: 'Only use the contract address shown on this site and our official channels. Copy it with the button at the top.',
      icon: '🔍',
    },
    {
      step: '4',
      title: 'Swap Right Here',
      description: 'Use the swap box below: connect your wallet, enter the SOL amount, confirm in your wallet. Welcome to the pack!',
      icon: '🎉',
    },
  ];

  return (
    <section id="buy" className="py-16 md:py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFD36A] border border-[#49200B]/30 rounded-xl text-xs font-bold font-heading text-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] mb-3">
            <span>🚀 Easy Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#49200B] tracking-tight mb-3">
            Get <span className="text-[#FF9F00]">$DODO</span> in 4 Steps
          </h2>
          <p className="text-base sm:text-lg text-[#79513B] font-medium">
            New to Solana? It takes about five minutes.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((st) => (
            <div
              key={st.step}
              className={`cartoon-card rounded-3xl p-6 relative flex flex-col justify-between ${
                st.step === '1'
                  ? 'bg-[#FFD36A]'
                  : st.step === '2'
                  ? 'bg-[#C6EAD7]'
                  : st.step === '3'
                  ? 'bg-[#BFE8F7]'
                  : 'bg-[#F7D9C7]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#FFD36A] border-2 border-[#49200B] flex items-center justify-center font-heading font-extrabold text-xl text-[#49200B] shadow-[2px_2px_0px_#49200B]">
                    {st.step}
                  </div>
                  <span className="text-3xl">{st.icon}</span>
                </div>
                <h3 className="text-xl font-bold font-heading text-[#49200B] mb-2">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#79513B] font-medium leading-relaxed">
                  {st.description}
                </p>
              </div>

              {st.step === '3' && (
                <div className="mt-4 pt-3 border-t border-[#49200B]/15">
                  <button
                    onClick={handleCopyCA}
                    className="w-full cartoon-btn py-1.5 px-2 bg-white hover:bg-[#F7D9C7] text-xs font-bold font-heading text-[#49200B] rounded-xl flex items-center justify-center gap-1.5"
                  >
                    {copiedCA ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCA ? 'CA Copied!' : 'Copy Verified CA'}</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Jupiter Swap Box Interface */}
        <div className="max-w-xl mx-auto">
          <div className="cartoon-card bg-[#FFF9F0] rounded-3xl p-6 sm:p-8 shadow-[4px_5px_0px_#49200B]">
            
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#49200B]/15">
              <div>
                <h3 className="text-2xl font-bold font-heading text-[#49200B]">
                  Swap SOL for $DODO
                </h3>
                <p className="text-xs text-[#79513B] font-medium">
                  Powered by Jupiter aggregator &amp; pump.fun
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold font-heading text-[#49200B] bg-[#FFD36A] border border-[#49200B] px-2.5 py-1 rounded-lg">
                  Slippage: {slippage}%
                </span>
              </div>
            </div>

            {/* Input SOL */}
            <div className="bg-white border-2 border-[#49200B] rounded-2xl p-4 mb-3">
              <div className="flex justify-between text-xs font-bold font-heading text-[#79513B] mb-1">
                <span>You Pay</span>
                <span>Balance: {walletConnected ? '2.45 SOL' : '0.00 SOL'}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <input
                  type="number"
                  value={solAmount}
                  onChange={(e) => setSolAmount(e.target.value)}
                  placeholder="0.0"
                  step="0.1"
                  min="0"
                  className="bg-transparent text-2xl font-extrabold font-mono text-[#49200B] focus:outline-none w-2/3"
                />
                <div className="flex items-center gap-1.5 bg-[#FFD36A] border-2 border-[#49200B] px-3 py-1.5 rounded-xl font-bold font-heading text-xs sm:text-sm text-[#49200B] shadow-[1px_1px_0px_#49200B]">
                  <span>☀️ SOL</span>
                </div>
              </div>
            </div>

            {/* Invert Arrow */}
            <div className="flex justify-center -my-1 relative z-10">
              <button
                onClick={() => sounds.pop()}
                className="w-8 h-8 rounded-full bg-[#FFD36A] border-2 border-[#49200B] flex items-center justify-center text-[#49200B] shadow-[1px_2px_0px_#49200B] hover:rotate-180 transition-transform duration-300"
              >
                <ArrowDownUp className="w-4 h-4" />
              </button>
            </div>

            {/* Output $DODO */}
            <div className="bg-white border-2 border-[#49200B] rounded-2xl p-4 mb-4">
              <div className="flex justify-between text-xs font-bold font-heading text-[#79513B] mb-1">
                <span>You Receive (Estimated)</span>
                <span>1% for stray dogs included</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="text-2xl font-extrabold font-mono text-[#49200B] truncate w-2/3">
                  {estimatedDodo}
                </div>
                <div className="flex items-center gap-1.5 bg-[#FFD36A] border-2 border-[#49200B] px-3 py-1.5 rounded-xl font-bold font-heading text-xs sm:text-sm text-[#49200B] shadow-[1px_1px_0px_#49200B]">
                  <span>🐶 $DODO</span>
                </div>
              </div>
            </div>

            {/* Slippage options */}
            <div className="flex items-center justify-between gap-2 mb-6 text-xs font-bold font-heading text-[#49200B]">
              <span className="text-[#79513B]">Slippage Tolerance:</span>
              <div className="flex gap-1.5">
                {['0.5', '1.0', '2.0'].map((val) => (
                  <button
                    key={val}
                    onClick={() => {
                      sounds.pop();
                      setSlippage(val);
                    }}
                    className={`px-2.5 py-1 rounded-lg border-2 border-[#49200B] transition-all ${
                      slippage === val ? 'bg-[#FFD36A] font-extrabold shadow-[1px_1px_0px_#49200B]' : 'bg-white'
                    }`}
                  >
                    {val}%
                  </button>
                ))}
              </div>
            </div>

            {/* Launch Banner / Status */}
            <div className="p-4 bg-[#F7D9C7] border-2 border-[#49200B] rounded-2xl text-center mb-6 shadow-[2px_2px_0px_#49200B]">
              <div className="text-xl mb-1">🐶</div>
              <h4 className="text-base font-bold font-heading text-[#49200B] mb-1">
                $DODO is launching soon
              </h4>
              <p className="text-xs text-[#79513B] leading-relaxed font-medium">
                The swap box switches on automatically as soon as the token is live. Follow our channels so you don&apos;t miss the launch.
              </p>
            </div>

            {/* Primary Action Button */}
            {!walletConnected ? (
              <button
                onClick={() => {
                  sounds.pop();
                  setShowWalletModal(true);
                }}
                className="cartoon-btn w-full py-3.5 bg-[#FFD36A] hover:bg-[#ffc947] text-[#49200B] font-heading text-lg font-bold rounded-2xl flex items-center justify-center gap-2 border-2 border-[#49200B] shadow-[3px_3px_0px_#49200B]"
              >
                <Wallet className="w-5 h-5 text-[#49200B]" />
                <span>Connect Solana Wallet</span>
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    sounds.coin();
                    setSwapStatusMessage('Token launch pending! You are connected and ready to buy the moment trading opens on pump.fun! 🚀🐾');
                    setTimeout(() => setSwapStatusMessage(null), 5000);
                  }}
                  className="cartoon-btn w-full py-3.5 bg-[#C6EAD7] hover:bg-[#b2e4c7] text-[#49200B] font-heading text-lg font-bold rounded-2xl flex items-center justify-center gap-2 border-2 border-[#49200B] shadow-[3px_3px_0px_#49200B]"
                >
                  <Sparkles className="w-5 h-5 text-[#49200B]" />
                  <span>Ready to Swap (Connected: {connectedWalletName})</span>
                </button>
                {swapStatusMessage && (
                  <div className="p-3 bg-[#C6EAD7] border-2 border-[#49200B] rounded-xl text-xs font-bold font-heading text-[#49200B] text-center animate-bounce">
                    {swapStatusMessage}
                  </div>
                )}
                <button
                  onClick={() => {
                    setWalletConnected(false);
                    setSwapStatusMessage(null);
                  }}
                  className="w-full text-xs text-[#79513B] underline text-center font-heading"
                >
                  Disconnect Wallet
                </button>
              </div>
            )}

            <p className="text-[11px] text-[#79513B] text-center mt-4 font-medium">
              Your wallet signs every trade; this website never holds your funds or keys.
            </p>

          </div>
        </div>

        {/* Wallet Connect Modal */}
        {showWalletModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
            <div className="cartoon-card bg-[#FFF9F0] rounded-3xl p-6 max-w-sm w-full border-2 border-[#49200B] shadow-[4px_5px_0px_#49200B]">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#49200B]/15">
                <h4 className="text-xl font-bold font-heading text-[#49200B]">
                  Connect Solana Wallet
                </h4>
                <button
                  onClick={() => setShowWalletModal(false)}
                  className="text-[#49200B] font-bold p-1 hover:bg-[#F7D9C7] rounded-lg"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Phantom', desc: 'Most popular Solana wallet', icon: '👻' },
                  { name: 'Solflare', desc: 'Secure web & mobile wallet', icon: '☀️' },
                  { name: 'Backpack', desc: 'Web3 & crypto wallet', icon: '🎒' },
                ].map((w) => (
                  <button
                    key={w.name}
                    onClick={() => handleConnectWallet(w.name)}
                    className="cartoon-btn w-full p-3 bg-white hover:bg-[#F7D9C7] border-2 border-[#49200B] rounded-2xl flex items-center gap-3 text-left shadow-[2px_2px_0px_#49200B]"
                  >
                    <span className="text-2xl">{w.icon}</span>
                    <div>
                      <div className="text-sm font-bold font-heading text-[#49200B]">{w.name}</div>
                      <div className="text-[11px] text-[#79513B]">{w.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
