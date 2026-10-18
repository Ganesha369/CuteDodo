import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowDownUp,
  Wallet,
  Sparkles,
  ExternalLink,
  Check,
  Copy,
  RefreshCw,
  LogOut,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

declare global {
  interface Window {
    solana?: any;
    phantom?: {
      solana?: any;
    };
    solflare?: any;
    backpack?: any;
  }
}

// Public Solana Mainnet JSON-RPC endpoints for real-time balance
const SOLANA_RPC_ENDPOINTS = [
  'https://api.mainnet-beta.solana.com',
  'https://solana-rpc.publicnode.com',
  'https://rpc.ankr.com/solana',
];

const fetchRealSolBalance = async (address: string): Promise<string> => {
  if (!address) return '0.000 SOL';
  for (const endpoint of SOLANA_RPC_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getBalance',
          params: [address, { commitment: 'confirmed' }],
        }),
      });
      if (!response.ok) continue;
      const data = await response.json();
      if (data?.result?.value !== undefined) {
        const sol = data.result.value / 1e9;
        return `${sol.toFixed(4)} SOL`;
      }
    } catch {
      // try fallback RPC
    }
  }
  return '0.000 SOL';
};

const getWalletProvider = (walletName: string) => {
  if (typeof window === 'undefined') return null;

  if (walletName === 'Phantom') {
    return window.phantom?.solana || (window.solana?.isPhantom ? window.solana : null);
  }
  if (walletName === 'Solflare') {
    return window.solflare?.isSolflare ? window.solflare : null;
  }
  if (walletName === 'Backpack') {
    return window.backpack?.isBackpack ? window.backpack : null;
  }
  return window.solana || null;
};

export const HowToBuy: React.FC = () => {
  const [solAmount, setSolAmount] = useState<string>('0.5');
  const [slippage, setSlippage] = useState<string>('1.0');
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [walletBalance, setWalletBalance] = useState<string>('0.000 SOL');
  const [connectedWalletName, setConnectedWalletName] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isRefreshingBalance, setIsRefreshingBalance] = useState(false);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [copiedCA, setCopiedCA] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [swapStatusMessage, setSwapStatusMessage] = useState<string | null>(null);

  const CA = '2e5bKRHpAixvgE6zUdTf7rigxCq662zq7xvN8Dympump';

  // Approx calculated DODO rate based on hypothetical SOL price ($160) and $DODO launch valuation
  const estimatedDodo = solAmount && !isNaN(parseFloat(solAmount))
    ? Math.floor(parseFloat(solAmount) * 2315000).toLocaleString()
    : '0';

  // Real-time periodic balance updates every 15s when wallet is connected
  useEffect(() => {
    if (!walletConnected || !walletAddress) return;
    const interval = setInterval(async () => {
      const bal = await fetchRealSolBalance(walletAddress);
      setWalletBalance(bal);
    }, 15000);
    return () => clearInterval(interval);
  }, [walletConnected, walletAddress]);

  // Silent auto-reconnect if already trusted in Phantom
  useEffect(() => {
    let isMounted = true;
    const tryAutoConnect = async () => {
      const phantom = getWalletProvider('Phantom');
      if (phantom && phantom.isPhantom) {
        try {
          const resp = await phantom.connect({ onlyIfTrusted: true });
          const pubkey = resp?.publicKey?.toString() || phantom.publicKey?.toString();
          if (pubkey && isMounted) {
            setWalletAddress(pubkey);
            setConnectedWalletName('Phantom');
            setWalletConnected(true);
            const bal = await fetchRealSolBalance(pubkey);
            if (isMounted) setWalletBalance(bal);
          }
        } catch {
          // not previously connected, silent
        }
      }
    };
    tryAutoConnect();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleRefreshBalance = useCallback(async () => {
    if (!walletAddress) return;
    setIsRefreshingBalance(true);
    sounds.pop();
    const bal = await fetchRealSolBalance(walletAddress);
    setWalletBalance(bal);
    setTimeout(() => setIsRefreshingBalance(false), 500);
  }, [walletAddress]);

  const disconnectWallet = useCallback(async () => {
    const provider = getWalletProvider(connectedWalletName);
    try {
      if (provider && typeof provider.disconnect === 'function') {
        await provider.disconnect();
      }
    } catch {
      // ignore
    }
    setWalletConnected(false);
    setWalletAddress('');
    setWalletBalance('0.000 SOL');
    setConnectedWalletName('');
    setSwapStatusMessage(null);
    setWalletError(null);
    sounds.pop();
  }, [connectedWalletName]);

  const connectRealWallet = async (walletName: string) => {
    setIsConnecting(true);
    setWalletError(null);

    const provider = getWalletProvider(walletName);

    if (!provider) {
      setIsConnecting(false);
      sounds.pop();
      if (walletName === 'Phantom') {
        window.open('https://phantom.com/download', '_blank', 'noreferrer');
      } else if (walletName === 'Solflare') {
        window.open('https://solflare.com/', '_blank', 'noreferrer');
      } else if (walletName === 'Backpack') {
        window.open('https://backpack.app/', '_blank', 'noreferrer');
      }
      setWalletError(`${walletName} wallet extension not detected. Opening install page...`);
      return;
    }

    try {
      sounds.bell();
      const resp = await provider.connect();
      const pubkey = resp?.publicKey?.toString() || provider.publicKey?.toString();

      if (pubkey) {
        setWalletAddress(pubkey);
        setConnectedWalletName(walletName);
        setWalletConnected(true);
        setShowWalletModal(false);
        sounds.coin();

        // Fetch real-time live balance immediately
        const bal = await fetchRealSolBalance(pubkey);
        setWalletBalance(bal);

        // Real-time event listeners
        if (typeof provider.on === 'function') {
          provider.on('accountChanged', async (newPubkey: any) => {
            if (newPubkey) {
              const updatedKey = newPubkey.toString();
              setWalletAddress(updatedKey);
              const updatedBal = await fetchRealSolBalance(updatedKey);
              setWalletBalance(updatedBal);
            } else {
              disconnectWallet();
            }
          });

          provider.on('disconnect', () => {
            disconnectWallet();
          });
        }
      } else {
        setWalletError('Failed to retrieve account address from wallet.');
      }
    } catch (err: any) {
      console.error('Wallet connect error:', err);
      sounds.pop();
      if (err?.code === 4001 || err?.message?.toLowerCase().includes('user rejected')) {
        setWalletError('Connection request was declined in your wallet.');
      } else {
        setWalletError(err?.message || 'Failed to connect to wallet.');
      }
    } finally {
      setIsConnecting(false);
    }
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
      title: 'Check the Verified CA',
      description: 'Always use our official verified contract address (CA: 2e5bKRHp...pump). Copy it with one click below.',
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
    <section id="buy" className="py-8 sm:py-12 md:py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD36A] border border-[#49200B]/30 rounded-xl text-xs font-bold font-heading text-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] mb-2 sm:mb-3">
            <span>🚀 Easy Guide</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#49200B] tracking-tight mb-2 sm:mb-3">
            Get <span className="text-[#FF9F00]">$DODO</span> in 4 Steps
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#79513B] font-medium">
            New to Solana? It takes about five minutes.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 mb-8 sm:mb-16">
          {steps.map((st) => {
            const isStep1 = st.step === '1';
            const cardBg =
              st.step === '1'
                ? 'bg-[#FFD36A]'
                : st.step === '2'
                ? 'bg-[#C6EAD7]'
                : st.step === '3'
                ? 'bg-[#BFE8F7]'
                : 'bg-[#F7D9C7]';

            const handleCardClick = () => {
              if (isStep1) {
                sounds.pop();
                const a = document.createElement('a');
                a.href = 'https://phantom.com/';
                a.target = '_blank';
                a.rel = 'noreferrer';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }
            };

            return (
              <div
                key={st.step}
                onClick={isStep1 ? handleCardClick : undefined}
                onKeyDown={
                  isStep1
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleCardClick();
                        }
                      }
                    : undefined
                }
                role={isStep1 ? 'button' : undefined}
                tabIndex={isStep1 ? 0 : undefined}
                title={isStep1 ? 'Click to visit phantom.com' : undefined}
                className={`cartoon-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 relative flex flex-col justify-between ${cardBg} ${
                  isStep1
                    ? 'cursor-pointer hover:-translate-y-1 hover:shadow-[4px_6px_0px_#49200B] transition-all group'
                    : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#FFD36A] border-2 border-[#49200B] flex items-center justify-center font-heading font-extrabold text-base sm:text-xl text-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] sm:shadow-[2px_2px_0px_#49200B]">
                      {st.step}
                    </div>
                    <span className="text-2xl sm:text-3xl">{st.icon}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
                    <h3 className="text-lg sm:text-xl font-bold font-heading text-[#49200B]">
                      {st.title}
                    </h3>
                    {isStep1 && (
                      <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#49200B] shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-[#79513B] font-medium leading-relaxed">
                    {st.description}
                  </p>
                </div>

                {isStep1 && (
                  <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#49200B]/15">
                    <div className="w-full py-1.5 px-2 bg-white hover:bg-amber-100 text-[11px] sm:text-xs font-bold font-heading text-[#49200B] rounded-xl flex items-center justify-center gap-1.5 shadow-[1.5px_1.5px_0px_#49200B] border border-[#49200B]/30 transition-colors">
                      <span>Get Phantom Wallet</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}

                {st.step === '3' && (
                  <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#49200B]/15">
                    <div className="font-mono text-[10px] text-[#49200B] font-bold bg-white/90 border border-[#49200B]/30 rounded-lg px-2 py-1 mb-2 truncate text-center select-all" title={CA}>
                      {CA}
                    </div>
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
            );
          })}
        </div>

        {/* Indian Users Special Guide: KoinBX to Phantom Wallet */}
        <div className="cartoon-card bg-[#FFF9F0] border-2 border-[#49200B] rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-[3px_4px_0px_#49200B] sm:shadow-[4px_5px_0px_#49200B] mb-8 sm:mb-16">
          {/* Guide Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-[#49200B]/15">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFD36A] border border-[#49200B]/30 rounded-xl text-xs font-bold font-heading text-[#49200B] shadow-[1px_1px_0px_#49200B] mb-2">
                <span>🇮🇳 India Community Guide</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-heading text-[#49200B]">
                Step-by-Step Guide: Transferring SOL from KoinBX to Phantom Wallet
              </h3>
              <p className="text-xs sm:text-sm text-[#79513B] font-medium mt-1 max-w-2xl">
                Simple 3-phase guide for Indian users to deposit INR, buy SOL with PAN card KYC on KoinBX, and transfer directly to Phantom.
              </p>
            </div>

            {/* Quick Action Links */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
              <a
                href="https://phantom.com/download"
                target="_blank"
                rel="noreferrer"
                onClick={() => sounds.pop()}
                className="cartoon-btn px-3.5 py-2 bg-[#BFE8F7] hover:bg-[#aadef2] text-[#49200B] font-bold font-heading text-xs sm:text-sm rounded-xl flex items-center gap-1.5 border-2 border-[#49200B] shadow-[2px_2px_0px_#49200B] transition-transform hover:-translate-y-0.5"
                title="Download Phantom Wallet for Android / iOS / Browser"
              >
                <span>👻 Phantom App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://koinbx.com/"
                target="_blank"
                rel="noreferrer"
                onClick={() => sounds.pop()}
                className="cartoon-btn px-3.5 py-2 bg-[#FFD36A] hover:bg-[#ffc947] text-[#49200B] font-bold font-heading text-xs sm:text-sm rounded-xl flex items-center gap-1.5 border-2 border-[#49200B] shadow-[2px_2px_0px_#49200B] transition-transform hover:-translate-y-0.5"
                title="Visit KoinBX Exchange"
              >
                <span>🪙 KoinBX Exchange</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 3 Phase Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
            
            {/* PHASE 1: SET UP PHANTOM WALLET */}
            <div className="cartoon-card bg-[#9fe1ff] border-2 border-[#49200B] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-[2px_2px_0px_#49200B]">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#49200B]/15">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#BFE8F7] border border-[#49200B] flex items-center justify-center text-sm shadow-[1px_1px_0px_#49200B]">
                      👻
                    </span>
                    <span className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#79513B]">
                      Phase 1
                    </span>
                  </div>
                  <span className="text-[13px] font-extrabold font-heading text-[#49200B] bg-[#BFE8F7] px-2 py-0.5 rounded-md border border-[#49200B]/30">
                    Wallet Setup
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-bold font-heading text-[#49200B] mb-3">
                  SET UP PHANTOM WALLET
                </h4>

                <div className="space-y-3.5 text-xs sm:text-sm text-[#79513B]">
                  {/* Step 1.1 */}
                  <div className="bg-white/80 border border-[#49200B]/20 rounded-xl p-3">
                    <div className="font-bold font-heading text-[#49200B] flex items-center gap-1.5 mb-1">
                      <span className="w-4 h-4 rounded-full bg-[#BFE8F7] border border-[#49200B]/40 text-[10px] font-bold flex items-center justify-center text-[#49200B]">1</span>
                      <span className="text-[15px]">Download Phantom App:</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-[#79513B] leading-relaxed mb-2">
                      Search for &ldquo;Phantom&rdquo; on the Google Play Store (Android) or Apple App Store (iPhone) and install it.
                    </p>
                    <a
                      href="https://phantom.com/download"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sounds.pop()}
                      className="inline-flex items-center gap-1 font-bold text-[#49200B] underline hover:text-[#FF9F00]"
                    >
                      <span className="text-[13px]">phantom.com/download</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Step 1.2 */}
                  <div className="bg-white/80 border border-[#49200B]/20 rounded-xl p-3">
                    <div className="font-bold font-heading text-[#49200B] flex items-center gap-1.5 mb-1">
                      <span className="w-4 h-4 rounded-full bg-[#BFE8F7] border border-[#49200B]/40 text-[10px] font-bold flex items-center justify-center text-[#49200B]">2</span>
                      <span className="text-[15px]">Create a Wallet:</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-[#79513B] leading-relaxed">
                      Open Phantom and select &ldquo;Create a new wallet&rdquo;. Set up your passcode and securely save your Secret Recovery Phrase.
                    </p>
                  </div>

                  {/* Step 1.3 */}
                  <div className="bg-white/80 border border-[#49200B]/20 rounded-xl p-3">
                    <div className="font-bold font-heading text-[#49200B] flex items-center gap-1.5 mb-1">
                      <span className="w-4 h-4 rounded-full bg-[#BFE8F7] border border-[#49200B]/40 text-[10px] font-bold flex items-center justify-center text-[#49200B]">3</span>
                      <span className="text-[15px]">Copy your Solana Wallet Address:</span>
                    </div>
                    <ul className="text-[11px] sm:text-xs space-y-1 text-[#79513B] list-disc list-inside">
                      <li>Tap &ldquo;Add Funds&rdquo;</li>
                      <li>Select &ldquo;Transfer Crypto&rdquo;</li>
                      <li>Choose &ldquo;Solana&rdquo; (SOL)</li>
                      <li>Tap the copy icon to copy your Solana wallet address to your clipboard.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#49200B]/10 flex items-center justify-between text-[11px] font-bold text-[#49200B]">
                <span>Status: Personal Solana Address Ready</span>
                <span>✅</span>
              </div>
            </div>

            {/* PHASE 2: SET UP KOINBX & BUY SOL */}
            <div className="cartoon-card bg-[#ffefa1] border-2 border-[#49200B] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-[2px_2px_0px_#49200B]">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#49200B]/15">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#FFD36A] border border-[#49200B] flex items-center justify-center text-sm shadow-[1px_1px_0px_#49200B]">
                      🇮🇳
                    </span>
                    <span className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#79513B]">
                      Phase 2
                    </span>
                  </div>
                  <span className="text-[13px] font-extrabold font-heading text-[#49200B] bg-[#FFD36A] px-2 py-0.5 rounded-md border border-[#49200B]/30">
                    INR to SOL
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-bold font-heading text-[#49200B] mb-3">
                  SET UP KOINBX &amp; BUY SOL
                </h4>

                <div className="space-y-3.5 text-xs sm:text-sm text-[#79513B]">
                  {/* Step 2.1 */}
                  <div className="bg-white/80 border border-[#49200B]/20 rounded-xl p-3">
                    <div className="font-bold font-heading text-[#49200B] flex items-center gap-1.5 mb-1">
                      <span className="w-4 h-4 rounded-full bg-[#FFD36A] border border-[#49200B]/40 text-[10px] font-bold flex items-center justify-center text-[#49200B]">1</span>
                      <span className="text-[15px]">Create &amp; Verify Account:</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-[#79513B] leading-relaxed mb-2">
                      Open KoinBX and sign up for an account. Complete your KYC verification using your PAN card.
                    </p>
                    <a
                      href="https://koinbx.com/"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sounds.pop()}
                      className="inline-flex items-center gap-1 font-bold text-[#49200B] underline hover:text-[#FF9F00]"
                    >
                      <span className="text-[13px]">koinbx.com</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Step 2.2 */}
                  <div className="bg-white/80 border border-[#49200B]/20 rounded-xl p-3">
                    <div className="font-bold font-heading text-[#49200B] flex items-center gap-1.5 mb-1">
                      <span className="w-4 h-4 rounded-full bg-[#FFD36A] border border-[#49200B]/40 text-[10px] font-bold flex items-center justify-center text-[#49200B]">2</span>
                      <span className="text-[15px]">Buy SOL Coin:</span>
                    </div>
                    <ul className="text-[11px] sm:text-xs space-y-1 text-[#79513B] list-disc list-inside">
                      <li>Deposit funds into your KoinBX account.</li>
                      <li>Go to the trade section, search for SOL.</li>
                      <li>Complete your purchase.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#49200B]/10 flex items-center justify-between text-[11px] font-bold text-[#49200B]">
                <span>Status: SOL in KoinBX Balance</span>
                <span>☀️</span>
              </div>
            </div>

            {/* PHASE 3: WITHDRAW SOL TO PHANTOM WALLET */}
            <div className="cartoon-card bg-[#9dffa3] border-2 border-[#49200B] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-[2px_2px_0px_#49200B]">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#49200B]/15">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#C6EAD7] border border-[#49200B] flex items-center justify-center text-sm shadow-[1px_1px_0px_#49200B]">
                      ⚡
                    </span>
                    <span className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#79513B]">
                      Phase 3
                    </span>
                  </div>
                  <span className="text-[13px] font-extrabold font-heading text-[#49200B] bg-[#C6EAD7] px-2 py-0.5 rounded-md border border-[#49200B]/30">
                    Withdrawal
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-bold font-heading text-[#49200B] mb-3">
                  WITHDRAW SOL TO PHANTOM WALLET
                </h4>

                <div className="space-y-3.5 text-xs sm:text-sm text-[#79513B]">
                  {/* Step 3.1 */}
                  <div className="bg-white/80 border border-[#49200B]/20 rounded-xl p-3">
                    <div className="font-bold font-heading text-[#49200B] flex items-center gap-1.5 mb-1">
                      <span className="w-4 h-4 rounded-full bg-[#C6EAD7] border border-[#49200B]/40 text-[10px] font-bold flex items-center justify-center text-[#49200B]">1</span>
                      <span className="text-[15px]">Start Withdrawal:</span>
                    </div>
                    <ul className="text-[11px] sm:text-xs space-y-1 text-[#79513B] list-disc list-inside">
                      <li>Go to the &ldquo;Asset&rdquo; section in KoinBX.</li>
                      <li>Tap the &ldquo;Withdraw&rdquo; option.</li>
                      <li>Select &ldquo;SOL&rdquo; in the coin selection section.</li>
                    </ul>
                  </div>

                  {/* Step 3.2 */}
                  <div className="bg-white/80 border border-[#49200B]/20 rounded-xl p-3">
                    <div className="font-bold font-heading text-[#49200B] flex items-center gap-1.5 mb-1">
                      <span className="w-4 h-4 rounded-full bg-[#C6EAD7] border border-[#49200B]/40 text-[10px] font-bold flex items-center justify-center text-[#49200B]">2</span>
                      <span className="text-[15px]">Enter Withdrawal Details:</span>
                    </div>
                    <ul className="text-[11px] sm:text-xs space-y-1 text-[#79513B] list-disc list-inside">
                      <li>Under &ldquo;Network&rdquo;, select &ldquo;Solana&rdquo;.</li>
                      <li>Paste the Solana wallet address you copied from the Phantom app.</li>
                      <li>
                        Enter the amount of SOL you wish to withdraw (<span className="font-bold text-[#49200B]">Minimum transfer amount: 0.04490703 SOL</span>).
                      </li>
                    </ul>
                  </div>

                  {/* Step 3.3 */}
                  <div className="bg-white/80 border border-[#49200B]/20 rounded-xl p-3">
                    <div className="font-bold font-heading text-[#49200B] flex items-center gap-1.5 mb-1">
                      <span className="w-4 h-4 rounded-full bg-[#C6EAD7] border border-[#49200B]/40 text-[10px] font-bold flex items-center justify-center text-[#49200B]">3</span>
                      <span className="text-[15px]">Complete Verification:</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-[#79513B] leading-relaxed">
                      Enter the OTP sent to your registered mobile number. Confirm the transaction. The SOL will be transferred to your Phantom wallet shortly.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#49200B]/10 flex items-center justify-between text-[11px] font-bold text-[#49200B]">
                <span>Status: SOL Ready in Phantom</span>
                <span>🎉</span>
              </div>
            </div>

          </div>

          {/* Guide Bottom Callout */}
          <div className="mt-6 p-3.5 sm:p-4 bg-[#FFD36A]/40 border-2 border-[#49200B] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🐶</span>
              <p className="text-xs sm:text-sm font-bold font-heading text-[#49200B]">
                SOL is in your Phantom? You are ready to swap for $DODO below or on pump.fun!
              </p>
            </div>
            <a
              href="#buy"
              onClick={() => sounds.pop()}
              className="cartoon-btn px-4 py-2 bg-[#FFD36A] hover:bg-[#ffc947] text-[#49200B] font-bold font-heading text-xs rounded-xl border border-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] shrink-0"
            >
              <span>Scroll to Swap Box ↓</span>
            </a>
          </div>
        </div>

        {/* Jupiter Swap Box Interface */}
        <div className="max-w-xl mx-auto">
          <div className="cartoon-card bg-[#ffdda7] rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-[3px_4px_0px_#49200B] sm:shadow-[4px_5px_0px_#49200B]">
            
            <div className="flex items-center justify-between pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-[#49200B]/15">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#49200B]">
                  Swap SOL for $DODO
                </h3>
                <p className="text-[11px] sm:text-xs text-[#79513B] font-medium">
                  Powered by Jupiter aggregator &amp; pump.fun
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] sm:text-xs font-bold font-heading text-[#49200B] bg-[#FFD36A] border border-[#49200B] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg">
                  Slippage: {slippage}%
                </span>
              </div>
            </div>

            {/* Input SOL */}
            <div className="bg-white border-2 border-[#49200B] rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-2.5 sm:mb-3">
              <div className="flex flex-wrap items-center justify-between text-[11px] sm:text-xs font-bold font-heading text-[#79513B] mb-1 gap-1">
                <span>You Pay</span>
                <div className="flex items-center gap-1.5">
                  <span>
                    Balance:{' '}
                    <strong className="text-[#49200B] font-mono">
                      {walletConnected ? walletBalance : '0.000 SOL'}
                    </strong>
                  </span>
                  {walletConnected && (
                    <>
                      <button
                        type="button"
                        onClick={handleRefreshBalance}
                        title="Refresh live balance from Solana Mainnet"
                        className="text-[#79513B] hover:text-[#49200B] p-0.5 rounded transition-transform hover:rotate-180"
                      >
                        <RefreshCw className={`w-3 h-3 ${isRefreshingBalance ? 'animate-spin' : ''}`} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const rawSol = parseFloat(walletBalance);
                          if (!isNaN(rawSol) && rawSol > 0.005) {
                            setSolAmount((rawSol - 0.005).toFixed(3));
                          } else if (!isNaN(rawSol) && rawSol > 0) {
                            setSolAmount(rawSol.toFixed(3));
                          }
                        }}
                        className="px-1.5 py-0.5 bg-[#FFD36A] hover:bg-[#ffc947] text-[10px] font-extrabold text-[#49200B] rounded border border-[#49200B]/30 shadow-[1px_1px_0px_#49200B] cursor-pointer"
                      >
                        MAX
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <input
                  type="number"
                  value={solAmount}
                  onChange={(e) => setSolAmount(e.target.value)}
                  placeholder="0.0"
                  step="0.1"
                  min="0"
                  className="bg-transparent text-xl sm:text-2xl font-extrabold font-mono text-[#49200B] focus:outline-none w-2/3"
                />
                <div className="flex items-center gap-1.5 bg-[#FFD36A] border-2 border-[#49200B] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl font-bold font-heading text-xs sm:text-sm text-[#49200B] shadow-[1px_1px_0px_#49200B]">
                  <span>☀️ SOL</span>
                </div>
              </div>
            </div>

            {/* Invert Arrow */}
            <div className="flex justify-center -my-1 relative z-10">
              <button
                onClick={() => sounds.pop()}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FFD36A] border-2 border-[#49200B] flex items-center justify-center text-[#49200B] shadow-[1px_2px_0px_#49200B] hover:rotate-180 transition-transform duration-300"
              >
                <ArrowDownUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Output $DODO */}
            <div className="bg-white border-2 border-[#49200B] rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4">
              <div className="flex justify-between text-[11px] sm:text-xs font-bold font-heading text-[#79513B] mb-1">
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

            {/* Official Token CA Banner */}
            <div className="p-3.5 sm:p-4 bg-[#feac7d] border-2 border-[#49200B] rounded-2xl text-center mb-6 shadow-[2px_2px_0px_#49200B]">
              <div className="text-xl mb-1">🐶</div>
              <h4 className="text-sm sm:text-base font-bold font-heading text-[#49200B] mb-1">
                Official Contract Address (CA)
              </h4>
              <div className="font-mono text-[11px] sm:text-xs font-bold text-[#49200B] break-all bg-white/90 p-2 rounded-xl border border-[#49200B]/30 mb-2.5 select-all shadow-inner">
                {CA}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={handleCopyCA}
                  className="cartoon-btn px-3 py-1.5 bg-[#FFD36A] hover:bg-[#ffc947] text-xs font-bold font-heading text-[#49200B] rounded-xl border border-[#49200B] flex items-center gap-1.5 shadow-[1px_1px_0px_#49200B]"
                >
                  {copiedCA ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCA ? 'CA Copied!' : 'Copy CA'}</span>
                </button>
                <a
                  href={`https://pump.fun/coin/${CA}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.pop()}
                  className="cartoon-btn px-3 py-1.5 bg-white hover:bg-amber-100 text-xs font-bold font-heading text-[#49200B] rounded-xl border border-[#49200B] flex items-center gap-1.5 shadow-[1px_1px_0px_#49200B]"
                >
                  <span>Trade on pump.fun</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Primary Action Button / Connected Wallet State */}
            {!walletConnected ? (
              <button
                onClick={() => {
                  sounds.pop();
                  setWalletError(null);
                  setShowWalletModal(true);
                }}
                className="cartoon-btn w-full py-3.5 bg-[#FFD36A] hover:bg-[#ffc947] text-[#49200B] font-heading text-lg font-bold rounded-2xl flex items-center justify-center gap-2 border-2 border-[#49200B] shadow-[3px_3px_0px_#49200B]"
              >
                <Wallet className="w-5 h-5 text-[#49200B]" />
                <span>Connect Solana Wallet</span>
              </button>
            ) : (
              <div className="space-y-3">
                {/* Real-time Connected Wallet Card */}
                <div className="bg-white/90 border-2 border-[#49200B] rounded-2xl p-3 sm:p-4 shadow-[2px_2px_0px_#49200B]">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-xs font-bold font-heading text-[#49200B]">
                        Connected: <strong className="text-emerald-800">{connectedWalletName}</strong>
                      </span>
                      <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded border border-emerald-800/20">
                        Mainnet-Beta
                      </span>
                    </div>
                    <a
                      href={`https://solscan.io/account/${walletAddress}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-bold text-[#79513B] hover:text-[#49200B] underline flex items-center gap-0.5"
                      title="View account on Solscan"
                    >
                      <span>Solscan</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="flex items-center justify-between gap-2 bg-[#e9fab5] border border-[#49200B]/30 rounded-xl px-2.5 py-1.5">
                    <span className="font-mono text-xs font-bold text-[#49200B] truncate" title={walletAddress}>
                      {walletAddress.slice(0, 6)}...{walletAddress.slice(-6)}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        sounds.coin();
                        navigator.clipboard?.writeText(walletAddress);
                        setCopiedAddress(true);
                        setTimeout(() => setCopiedAddress(false), 2000);
                      }}
                      className="text-[11px] font-bold text-[#79513B] hover:text-[#49200B] flex items-center gap-1 shrink-0"
                    >
                      {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedAddress ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#49200B]/10 text-xs">
                    <span className="text-[#79513B] font-medium">Real-Time SOL Balance:</span>
                    <span className="font-mono font-extrabold text-[#49200B] flex items-center gap-1.5">
                      <span>{walletBalance}</span>
                      <button
                        type="button"
                        onClick={handleRefreshBalance}
                        title="Refresh balance"
                        className="text-[#79513B] hover:text-[#49200B]"
                      >
                        <RefreshCw className={`w-3 h-3 ${isRefreshingBalance ? 'animate-spin' : ''}`} />
                      </button>
                    </span>
                  </div>
                </div>

                {/* Swap Action Button */}
                <button
                  onClick={() => {
                    sounds.coin();
                    const entered = parseFloat(solAmount);
                    const currentBal = parseFloat(walletBalance);
                    if (isNaN(entered) || entered <= 0) {
                      setSwapStatusMessage('Please enter a valid amount of SOL to swap.');
                      setTimeout(() => setSwapStatusMessage(null), 5000);
                      return;
                    }
                    if (!isNaN(currentBal) && entered > currentBal) {
                      setSwapStatusMessage(`Insufficient SOL balance! You have ${walletBalance}, but entered ${solAmount} SOL.`);
                      setTimeout(() => setSwapStatusMessage(null), 6000);
                      return;
                    }
                    setSwapStatusMessage(`Ready to swap! Connected wallet (${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}) will sign transaction once $DODO bonding curve on pump.fun opens! 🚀🐾`);
                    setTimeout(() => setSwapStatusMessage(null), 7000);
                  }}
                  className="cartoon-btn w-full py-3.5 bg-[#C6EAD7] hover:bg-[#b2e4c7] text-[#49200B] font-heading text-lg font-bold rounded-2xl flex items-center justify-center gap-2 border-2 border-[#49200B] shadow-[3px_3px_0px_#49200B]"
                >
                  <Sparkles className="w-5 h-5 text-[#49200B]" />
                  <span>Swap SOL for $DODO</span>
                </button>

                {swapStatusMessage && (
                  <div className="p-3 bg-white border-2 border-[#49200B] rounded-xl text-xs font-bold font-heading text-[#49200B] text-center shadow-[1.5px_1.5px_0px_#49200B]">
                    {swapStatusMessage}
                  </div>
                )}

                <button
                  onClick={disconnectWallet}
                  className="w-full text-[#79513B] hover:text-red-700 underline text-center font-heading flex items-center justify-center gap-1 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mt-[13px]" />
                  <span className="font-bold text-[15px] mt-[13px]">Disconnect Wallet</span>
                </button>
              </div>
            )}

            <p className="text-[11px] text-[#79513B] text-center mt-4 font-medium">
              Your wallet signs every trade; this website never holds your funds or keys.
            </p>

          </div>
        </div>

        {/* Real Solana Wallet Connect Modal */}
        {showWalletModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
            <div className="cartoon-card bg-[#FFF9F0] rounded-3xl p-5 sm:p-6 max-w-sm w-full border-2 border-[#49200B] shadow-[4px_5px_0px_#49200B]">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#49200B]/15">
                <div>
                  <h4 className="text-xl font-bold font-heading text-[#49200B]">
                    Connect Solana Wallet
                  </h4>
                  <p className="text-[11px] text-[#79513B]">
                    Connect your real browser extension or app
                  </p>
                </div>
                <button
                  onClick={() => setShowWalletModal(false)}
                  className="text-[#49200B] font-bold p-1 hover:bg-[#F7D9C7] rounded-lg"
                >
                  ✕
                </button>
              </div>

              {walletError && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-300 rounded-xl text-xs text-rose-800 font-medium flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{walletError}</span>
                </div>
              )}

              <div className="space-y-3">
                {[
                  {
                    name: 'Phantom',
                    desc: 'Most popular Solana wallet',
                    icon: '👻',
                    isInstalled: typeof window !== 'undefined' && Boolean(window.phantom?.solana?.isPhantom || window.solana?.isPhantom),
                    downloadUrl: 'https://phantom.com/download',
                  },
                  {
                    name: 'Solflare',
                    desc: 'Secure web & mobile wallet',
                    icon: '☀️',
                    isInstalled: typeof window !== 'undefined' && Boolean(window.solflare?.isSolflare),
                    downloadUrl: 'https://solflare.com/',
                  },
                  {
                    name: 'Backpack',
                    desc: 'Web3 & crypto wallet',
                    icon: '🎒',
                    isInstalled: typeof window !== 'undefined' && Boolean(window.backpack?.isBackpack),
                    downloadUrl: 'https://backpack.app/',
                  },
                ].map((w) => (
                  <button
                    key={w.name}
                    disabled={isConnecting}
                    onClick={() => connectRealWallet(w.name)}
                    className="cartoon-btn w-full p-3 bg-white hover:bg-[#F7D9C7] border-2 border-[#49200B] rounded-2xl flex items-center justify-between text-left shadow-[2px_2px_0px_#49200B] transition-all disabled:opacity-60"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{w.icon}</span>
                      <div>
                        <div className="text-sm font-bold font-heading text-[#49200B] flex items-center gap-1.5">
                          <span>{w.name}</span>
                          {w.isInstalled ? (
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded-full border border-emerald-300">
                              Detected
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded-full border border-amber-300">
                              Install ↗
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#79513B]">{w.desc}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      {isConnecting ? (
                        <RefreshCw className="w-4 h-4 animate-spin text-[#FF9F00]" />
                      ) : (
                        <span className="text-xs font-bold text-[#FF9F00]">Connect →</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-[#49200B]/10 text-center text-[11px] text-[#79513B]">
                New to Solana? Install{' '}
                <a
                  href="https://phantom.com/download"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold underline text-[#49200B]"
                >
                  Phantom
                </a>{' '}
                or follow our guide above.
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
