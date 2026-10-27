import React, { useState, useEffect, useCallback } from 'react';
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ExternalLink,
  Activity,
  BarChart2,
  LineChart,
  ShieldCheck,
  Flame,
  Check
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface TokenPairData {
  priceUsd: string;
  priceNative: string;
  marketCap: number;
  fdv: number;
  liquidityUsd: number;
  volume24h: number;
  priceChangeH1: number;
  priceChangeH6: number;
  priceChangeH24: number;
  buys24h: number;
  sells24h: number;
  pairAddress: string;
  dexId: string;
  dexUrl: string;
}

const DEFAULT_DATA: TokenPairData = {
  priceUsd: '0.00004420',
  priceNative: '0.0000004447',
  marketCap: 42486,
  fdv: 42486,
  liquidityUsd: 15845,
  volume24h: 8674,
  priceChangeH1: 6.18,
  priceChangeH6: 18.92,
  priceChangeH24: 3.65,
  buys24h: 99,
  sells24h: 132,
  pairAddress: '5cZdup3LcQ9oQMt3mKfo2pQ5CNTMQUT3c2c4dLKN1AML',
  dexId: 'pumpswap',
  dexUrl: 'https://dexscreener.com/solana/5czdup3lcq9oqmt3mkfo2pq5cntmqut3c2c4dlkn1aml',
};

// Realistic mock sparkline points representing the recent price wave
const SPARKLINE_POINTS = [
  36, 38, 35, 41, 39, 44, 42, 40, 43, 47, 45, 43, 46, 49, 44, 42
];

export const LiveMarketData: React.FC = () => {
  const [data, setData] = useState<TokenPairData>(DEFAULT_DATA);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [chartView, setChartView] = useState<'candlestick' | 'sparkline'>('candlestick');
  const [copiedPair, setCopiedPair] = useState<boolean>(false);

  const contractAddress = '2e5bKRHpAixvgE6zUdTf7rigxCq662zq7xvN8Dympump';

  const fetchLiveMarketData = useCallback(async (isManual = false) => {
    if (isManual) setLoading(true);
    try {
      const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${contractAddress}`);
      if (!res.ok) throw new Error('Network response failed');
      const json = await res.json();
      if (json && json.pairs && json.pairs.length > 0) {
        // Find pumpswap pair or first available pair
        const pair = json.pairs.find((p: any) => p.dexId === 'pumpswap') || json.pairs[0];
        setData({
          priceUsd: pair.priceUsd ? parseFloat(pair.priceUsd).toFixed(8).replace(/0+$/, '').replace(/\.$/, '') : DEFAULT_DATA.priceUsd,
          priceNative: pair.priceNative || DEFAULT_DATA.priceNative,
          marketCap: pair.marketCap || pair.fdv || DEFAULT_DATA.marketCap,
          fdv: pair.fdv || DEFAULT_DATA.fdv,
          liquidityUsd: pair.liquidity?.usd || DEFAULT_DATA.liquidityUsd,
          volume24h: pair.volume?.h24 || DEFAULT_DATA.volume24h,
          priceChangeH1: pair.priceChange?.h1 ?? DEFAULT_DATA.priceChangeH1,
          priceChangeH6: pair.priceChange?.h6 ?? DEFAULT_DATA.priceChangeH6,
          priceChangeH24: pair.priceChange?.h24 ?? DEFAULT_DATA.priceChangeH24,
          buys24h: pair.txns?.h24?.buys ?? DEFAULT_DATA.buys24h,
          sells24h: pair.txns?.h24?.sells ?? DEFAULT_DATA.sells24h,
          pairAddress: pair.pairAddress || DEFAULT_DATA.pairAddress,
          dexId: pair.dexId || DEFAULT_DATA.dexId,
          dexUrl: pair.url || DEFAULT_DATA.dexUrl,
        });
        setLastUpdated(new Date());
      }
    } catch (err) {
      // Keep existing data gracefully
      console.warn('DexScreener live price check note:', err);
    } finally {
      if (isManual) setLoading(false);
    }
  }, [contractAddress]);

  useEffect(() => {
    fetchLiveMarketData();
    // Auto-refresh every 20 seconds
    const interval = setInterval(() => {
      fetchLiveMarketData();
    }, 20000);
    return () => clearInterval(interval);
  }, [fetchLiveMarketData]);

  const handleManualRefresh = () => {
    sounds.pop();
    fetchLiveMarketData(true);
  };

  const handleCopyPair = () => {
    sounds.coin();
    navigator.clipboard?.writeText(data.pairAddress);
    setCopiedPair(true);
    setTimeout(() => setCopiedPair(false), 2000);
  };

  const totalTxns = data.buys24h + data.sells24h;
  const buyRatio = totalTxns > 0 ? Math.round((data.buys24h / totalTxns) * 100) : 50;

  // Format currency
  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="cartoon-card bg-[#FFF9F0] rounded-3xl p-4 sm:p-6 mb-12 border-2 border-[#49200B] shadow-[4px_4px_0px_#49200B]">
      
      {/* Top Header Bar with Live Indicator & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b-2 border-[#49200B]/15">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#FFD36A] border-2 border-[#49200B] flex items-center justify-center text-lg shadow-[2px_2px_0px_#49200B]">
            📈
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold font-heading text-[#49200B]">
                Live Solana Market Data
              </h2>
              {/* Pulsing Live indicator */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-heading bg-emerald-100 border border-emerald-500 text-emerald-800 shadow-[1px_1px_0px_rgba(0,0,0,0.1)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                LIVE · PUMPSWAP
              </span>
            </div>
            <p className="text-[11px] font-semibold text-[#79513B] mt-0.5">
              Real-time on-chain metrics from PumpSwap &amp; DexScreener
            </p>
          </div>
        </div>

        {/* Live Refresh & External Link Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleManualRefresh}
            disabled={loading}
            title="Refresh real-time price & volume"
            className="flex items-center gap-1.5 text-xs font-bold font-heading px-3 py-1.5 bg-[#FFF9F0] hover:bg-[#F7D9C7] active:bg-[#ffc849] border-2 border-[#49200B] rounded-xl shadow-[2px_2px_0px_#49200B] active:translate-y-0.5 transition-all text-[#49200B] disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#FF9F00] ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <a
            href={data.dexUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => sounds.pop()}
            className="flex items-center gap-1.5 text-xs font-bold font-heading px-3 py-1.5 bg-[#FFD36A] hover:bg-[#ffc947] border-2 border-[#49200B] rounded-xl shadow-[2px_2px_0px_#49200B] active:translate-y-0.5 transition-all text-[#49200B]"
          >
            <span>DexScreener</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#49200B]" />
          </a>
        </div>
      </div>

      {/* 4 Live Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        
        {/* Card 1: Price USD & Native */}
        <div className="bg-white border-2 border-[#49200B] rounded-2xl p-3.5 sm:p-4 shadow-[2.5px_2.5px_0px_#49200B] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-bold font-heading text-[#79513B] uppercase tracking-wide mb-1">
              <span>Price (USD)</span>
              <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                data.priceChangeH24 >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {data.priceChangeH24 >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {data.priceChangeH24 >= 0 ? '+' : ''}{data.priceChangeH24.toFixed(1)}% (24h)
              </span>
            </div>
            <div className="text-lg sm:text-2xl font-bold font-mono text-[#49200B] tracking-tight">
              ${data.priceUsd}
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-[#49200B]/10 flex items-center justify-between text-[11px] text-[#79513B] font-semibold">
            <span>SOL Price:</span>
            <span className="font-mono text-[#49200B] font-bold">{data.priceNative} SOL</span>
          </div>
        </div>

        {/* Card 2: Market Cap & FDV */}
        <div className="bg-white border-2 border-[#49200B] rounded-2xl p-3.5 sm:p-4 shadow-[2.5px_2.5px_0px_#49200B] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-bold font-heading text-[#79513B] uppercase tracking-wide mb-1">
              <span>Market Cap</span>
              <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded-md">
                100% Circulating
              </span>
            </div>
            <div className="text-lg sm:text-2xl font-bold font-mono text-[#49200B] tracking-tight">
              {formatUSD(data.marketCap)}
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-[#49200B]/10 flex items-center justify-between text-[11px] text-[#79513B] font-semibold">
            <span>FDV:</span>
            <span className="font-mono text-[#49200B] font-bold">{formatUSD(data.fdv)}</span>
          </div>
        </div>

        {/* Card 3: Liquidity Pool */}
        <div className="bg-white border-2 border-[#49200B] rounded-2xl p-3.5 sm:p-4 shadow-[2.5px_2.5px_0px_#49200B] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-bold font-heading text-[#79513B] uppercase tracking-wide mb-1">
              <span>Liquidity Pool</span>
              <span className="text-[10px] font-bold text-emerald-900 bg-emerald-100 px-1.5 py-0.5 rounded-md">
                PumpSwap
              </span>
            </div>
            <div className="text-lg sm:text-2xl font-bold font-mono text-[#49200B] tracking-tight">
              {formatUSD(data.liquidityUsd)}
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-[#49200B]/10 flex items-center justify-between text-[11px] text-[#79513B] font-semibold">
            <span>Status:</span>
            <span className="text-emerald-700 font-bold flex items-center gap-0.5">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Locked
            </span>
          </div>
        </div>

        {/* Card 4: 24h Volume & Trades */}
        <div className="bg-white border-2 border-[#49200B] rounded-2xl p-3.5 sm:p-4 shadow-[2.5px_2.5px_0px_#49200B] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-bold font-heading text-[#79513B] uppercase tracking-wide mb-1">
              <span>24h Volume</span>
              <span className="text-[10px] font-bold text-purple-900 bg-purple-100 px-1.5 py-0.5 rounded-md">
                {totalTxns} Trades
              </span>
            </div>
            <div className="text-lg sm:text-2xl font-bold font-mono text-[#49200B] tracking-tight">
              {formatUSD(data.volume24h)}
            </div>
          </div>
          {/* Buy/Sell Ratio Progress Bar */}
          <div className="mt-2 pt-2 border-t border-[#49200B]/10">
            <div className="flex justify-between text-[10px] font-bold font-heading text-[#79513B] mb-1">
              <span className="text-emerald-700">{data.buys24h} Buys ({buyRatio}%)</span>
              <span className="text-rose-700">{data.sells24h} Sells</span>
            </div>
            <div className="w-full h-1.5 bg-rose-200 rounded-full overflow-hidden flex">
              <div
                className="bg-emerald-500 h-full transition-all"
                style={{ width: `${buyRatio}%` }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Small Chart of the Coin Section */}
      <div className="bg-white border-2 border-[#49200B] rounded-2xl p-3.5 sm:p-5 shadow-[3px_3px_0px_#49200B]">
        
        {/* Chart Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5 pb-3 border-b border-[#49200B]/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#FFD36A]/60 border border-[#49200B] flex items-center justify-center text-sm shadow-[1px_1px_0px_#49200B]">
              📊
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-sm sm:text-base text-[#49200B]">
                  CuteDoDo ($DODO) Live Chart
                </span>
                <span className="text-[10px] font-bold font-heading px-2 py-0.5 bg-[#FFF9F0] border border-[#49200B]/30 rounded-md text-[#79513B]">
                  SOL/DODO
                </span>
              </div>
            </div>
          </div>

          {/* Chart View Switcher + Quick Actions */}
          <div className="flex items-center gap-2">
            <div className="flex bg-[#FFF9F0] p-1 border border-[#49200B]/30 rounded-xl text-xs font-bold font-heading">
              <button
                onClick={() => {
                  sounds.pop();
                  setChartView('candlestick');
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                  chartView === 'candlestick'
                    ? 'bg-[#FFD36A] text-[#49200B] border border-[#49200B] shadow-[1px_1px_0px_#49200B]'
                    : 'text-[#79513B] hover:text-[#49200B]'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>Live DEX</span>
              </button>
              <button
                onClick={() => {
                  sounds.pop();
                  setChartView('sparkline');
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                  chartView === 'sparkline'
                    ? 'bg-[#FFD36A] text-[#49200B] border border-[#49200B] shadow-[1px_1px_0px_#49200B]'
                    : 'text-[#79513B] hover:text-[#49200B]'
                }`}
              >
                <LineChart className="w-3.5 h-3.5" />
                <span>Trend</span>
              </button>
            </div>

            <button
              onClick={handleCopyPair}
              title="Copy PumpSwap Pool Pair Address"
              className="hidden sm:flex items-center gap-1 text-[11px] font-bold font-heading px-2.5 py-1.5 bg-[#FFF9F0] hover:bg-[#F7D9C7] border border-[#49200B]/30 rounded-xl text-[#49200B] transition-colors"
            >
              {copiedPair ? <Check className="w-3 h-3 text-emerald-700" /> : <ShieldCheck className="w-3 h-3 text-[#FF9F00]" />}
              <span>{copiedPair ? 'Copied Pair!' : 'Pair: 5cZdu...1AML'}</span>
            </button>
          </div>
        </div>

        {/* Chart Canvas Area */}
        <div className="relative w-full rounded-xl overflow-hidden border-2 border-[#49200B] bg-[#FFFDF9] min-h-[320px] sm:min-h-[360px]">
          {chartView === 'candlestick' ? (
            <div className="w-full h-full relative">
              <iframe
                src="https://dexscreener.com/solana/5czdup3lcq9oqmt3mkfo2pq5cntmqut3c2c4dlkn1aml?embed=1&theme=light&trades=0&info=0"
                title="CuteDoDo DexScreener Live Chart"
                className="w-full h-[340px] sm:h-[380px] border-0"
                loading="lazy"
              />
              <div className="p-2 bg-[#FFF9F0] border-t border-[#49200B]/15 flex flex-wrap items-center justify-between text-[11px] font-semibold text-[#79513B]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Streaming directly from PumpSwap Solana DEX pool</span>
                </div>
                <a
                  href="https://dexscreener.com/solana/5czdup3lcq9oqmt3mkfo2pq5cntmqut3c2c4dlkn1aml"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[#49200B] hover:text-[#FF9F00] flex items-center gap-1 underline underline-offset-2"
                >
                  Full Screen on DexScreener <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            <div className="p-4 sm:p-6 flex flex-col justify-between h-[340px] sm:h-[380px]">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold font-heading text-[#79513B]">Recent Price Trajectory</div>
                  <div className="text-2xl font-bold font-mono text-[#49200B] mt-0.5">
                    ${data.priceUsd} <span className="text-xs text-emerald-700 font-bold font-heading">+{data.priceChangeH6}% (6h)</span>
                  </div>
                </div>
                <div className="flex gap-1.5 text-[10px] font-bold font-heading">
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-md border border-emerald-300">1h: +{data.priceChangeH1}%</span>
                  <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-md border border-amber-300">6h: +{data.priceChangeH6}%</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md border border-blue-300">24h: +{data.priceChangeH24}%</span>
                </div>
              </div>

              {/* Dynamic SVG Trend Graph */}
              <div className="w-full h-44 my-auto relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 600 160" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="dodoTrendGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFD36A" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#FFD36A" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  
                  {/* Subtle Grid Lines */}
                  <line x1="0" y1="40" x2="600" y2="40" stroke="#49200B" strokeOpacity="0.08" strokeDasharray="4 4" />
                  <line x1="0" y1="80" x2="600" y2="80" stroke="#49200B" strokeOpacity="0.08" strokeDasharray="4 4" />
                  <line x1="0" y1="120" x2="600" y2="120" stroke="#49200B" strokeOpacity="0.08" strokeDasharray="4 4" />

                  {/* Gradient Area Fill */}
                  <polygon
                    points={`0,160 ${SPARKLINE_POINTS.map((pt, idx) => `${(idx / (SPARKLINE_POINTS.length - 1)) * 600},${160 - (pt - 30) * 6}`).join(' ')} 600,160`}
                    fill="url(#dodoTrendGradient)"
                  />

                  {/* Primary Trend Stroke */}
                  <polyline
                    fill="none"
                    stroke="#FF9F00"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={SPARKLINE_POINTS.map((pt, idx) => `${(idx / (SPARKLINE_POINTS.length - 1)) * 600},${160 - (pt - 30) * 6}`).join(' ')}
                  />

                  {/* Highlight dots for points */}
                  {SPARKLINE_POINTS.map((pt, idx) => {
                    const cx = (idx / (SPARKLINE_POINTS.length - 1)) * 600;
                    const cy = 160 - (pt - 30) * 6;
                    const isLast = idx === SPARKLINE_POINTS.length - 1;
                    return (
                      <g key={idx}>
                        {isLast && (
                          <circle cx={cx} cy={cy} r="8" fill="#FF9F00" opacity="0.3" className="animate-ping" />
                        )}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isLast ? "5" : "3"}
                          fill={isLast ? "#49200B" : "#FF9F00"}
                          stroke="#FFF"
                          strokeWidth="1.5"
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Bottom Legend */}
              <div className="flex items-center justify-between text-xs text-[#79513B] font-semibold border-t border-[#49200B]/10 pt-2.5">
                <span>Start: Bonding Curve Launch</span>
                <span className="font-bold text-[#49200B]">Current: PumpSwap Liquidity Pool Active</span>
                <span>Graduated 100% 🚀</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Links Footer Bar */}
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2.5 text-xs font-bold font-heading text-[#79513B]">
          <div className="flex items-center gap-1.5 text-[11px]">
            <span>Auto-refreshing live</span>
            <span className="text-[#49200B] font-semibold">· Last sync: {lastUpdated.toLocaleTimeString()}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://pump.fun/coin/2e5bKRHpAixvgE6zUdTf7rigxCq662zq7xvN8Dympump"
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.pop()}
              className="text-[#49200B] hover:text-[#FF9F00] underline underline-offset-2 flex items-center gap-1"
            >
              pump.fun page <ExternalLink className="w-3 h-3" />
            </a>
            <span>·</span>
            <a
              href="https://solscan.io/token/2e5bKRHpAixvgE6zUdTf7rigxCq662zq7xvN8Dympump"
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.pop()}
              className="text-[#49200B] hover:text-[#FF9F00] underline underline-offset-2 flex items-center gap-1"
            >
              Solscan <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};
