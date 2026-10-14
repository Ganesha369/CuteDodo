import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Palette, Shuffle, RotateCcw, Sliders, Eye, Sun } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export interface GradientTheme {
  id: string;
  name: string;
  color1: string; // Blue tone
  color2: string; // Mint tone
  neonColor: string; // Neon highlight
  description: string;
}

export const GRADIENT_PRESETS: GradientTheme[] = [
  {
    id: 'blue-mint',
    name: 'Blue & Mint',
    color1: '#0284c7', // Sky Blue
    color2: '#10b981', // Fresh Mint
    neonColor: '#38bdf8', // Neon Cyan
    description: 'Classic fluted glass with cool blue, fresh mint, and neon cyan rays',
  },
  {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    color1: '#2563eb', // Royal Blue
    color2: '#059669', // Emerald Mint
    neonColor: '#67e8f9', // Electric Cyan
    description: 'High-energy cyber aesthetic with intense neon highlights',
  },
  {
    id: 'deep-ocean',
    name: 'Deep Ocean',
    color1: '#1e3a8a', // Deep Blue
    color2: '#14b8a6', // Teal Mint
    neonColor: '#2dd4bf', // Neon Aquamarine
    description: 'Moody ocean depths with luminous bioluminescent mint highlights',
  },
  {
    id: 'electric-violet',
    name: 'Electric Iris',
    color1: '#4338ca', // Indigo Blue
    color2: '#0d9488', // Dark Mint
    neonColor: '#a78bfa', // Neon Iris
    description: 'Electric violet-blue gradient glowing through frosted fluted blinds',
  },
  {
    id: 'aurora-mint',
    name: 'Aurora Borealis',
    color1: '#0369a1', // Glacier Blue
    color2: '#34d399', // Bright Spring Mint
    neonColor: '#4ade80', // Neon Aurora Green
    description: 'Shimmering polar aurora seen through frosted architectural glass',
  },
];

interface InteractiveFlutedBackdropProps {
  onThemeChange?: (theme: GradientTheme) => void;
}

export const InteractiveFlutedBackdrop: React.FC<InteractiveFlutedBackdropProps> = ({
  onThemeChange,
}) => {
  const [selectedThemeId, setSelectedThemeId] = useState<string>('blue-mint');
  const [color1, setColor1] = useState<string>('#0284c7');
  const [color2, setColor2] = useState<string>('#10b981');
  const [neonColor, setNeonColor] = useState<string>('#38bdf8');
  
  // Flute blinds style: 'fine' (8px) | 'classic' (14px) | 'wide' (22px)
  const [fluteStyle, setFluteStyle] = useState<'fine' | 'classic' | 'wide'>('classic');
  const [motionSpeed, setMotionSpeed] = useState<'gentle' | 'active' | 'ambient'>('active');
  const [showToolControls, setShowToolControls] = useState<boolean>(true);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle pointer tracking for interactive motion
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setMousePos({ x, y });
  };

  const handleSelectPreset = (preset: GradientTheme) => {
    sounds.pop();
    setSelectedThemeId(preset.id);
    setColor1(preset.color1);
    setColor2(preset.color2);
    setNeonColor(preset.neonColor);
    onThemeChange?.(preset);
  };

  const handleShuffle = () => {
    sounds.coin();
    const blues = ['#0284c7', '#2563eb', '#1d4ed8', '#0369a1', '#0ea5e9', '#3b82f6'];
    const mints = ['#10b981', '#14b8a6', '#059669', '#34d399', '#2dd4bf', '#0d9488'];
    const neons = ['#38bdf8', '#67e8f9', '#a7f3d0', '#5eead4', '#4ade80', '#c4b5fd'];
    
    const randomBlue = blues[Math.floor(Math.random() * blues.length)];
    const randomMint = mints[Math.floor(Math.random() * mints.length)];
    const randomNeon = neons[Math.floor(Math.random() * neons.length)];
    
    setSelectedThemeId('custom');
    setColor1(randomBlue);
    setColor2(randomMint);
    setNeonColor(randomNeon);
  };

  const handleReset = () => {
    sounds.whoosh();
    const defaultPreset = GRADIENT_PRESETS[0];
    setSelectedThemeId(defaultPreset.id);
    setColor1(defaultPreset.color1);
    setColor2(defaultPreset.color2);
    setNeonColor(defaultPreset.neonColor);
    setFluteStyle('classic');
    setMotionSpeed('active');
  };

  // Determine flute pattern spacing
  const fluteSpacing = fluteStyle === 'fine' ? '8px' : fluteStyle === 'classic' ? '14px' : '24px';
  const fluteHalf = fluteStyle === 'fine' ? '4px' : fluteStyle === 'classic' ? '7px' : '12px';

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute inset-0 w-full h-full overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ============================================================ */}
      {/* 1. LAYER A: DEEP ABSTRACT GRADIENT MESH BACKDROP             */}
      {/* ============================================================ */}
      <div
        className="absolute inset-0 transition-colors duration-700 ease-out"
        style={{
          background: `radial-gradient(ellipse at 20% 30%, ${color1}dd 0%, #030712 75%),
                       radial-gradient(ellipse at 80% 70%, ${color2}bb 0%, #030712 75%),
                       linear-gradient(135deg, #030712 0%, #081b29 50%, #041416 100%)`,
        }}
      />

      {/* ============================================================ */}
      {/* 2. LAYER B: DYNAMIC ABSTRACT MOTION BLOBS (WAVES & CURSOR)   */}
      {/* ============================================================ */}
      {/* Blob 1: Blue Wave (floating top-left / center) */}
      <div
        className={`absolute rounded-full blur-[70px] pointer-events-none transition-all duration-1000 ${
          motionSpeed === 'active'
            ? 'animate-pulse'
            : motionSpeed === 'gentle'
            ? 'opacity-80'
            : 'opacity-60'
        }`}
        style={{
          left: `${15 + (mousePos.x - 50) * 0.15}%`,
          top: `${20 + (mousePos.y - 50) * 0.15}%`,
          width: '55vw',
          height: '55vw',
          maxWidth: '650px',
          maxHeight: '650px',
          background: `radial-gradient(circle, ${color1} 0%, ${color1}66 50%, transparent 75%)`,
          transform: 'translate(-50%, -50%)',
          transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      />

      {/* Blob 2: Mint Wave (floating bottom-right / center) */}
      <div
        className={`absolute rounded-full blur-[80px] pointer-events-none transition-all duration-1000 ${
          motionSpeed === 'active'
            ? 'animate-pulse'
            : ''
        }`}
        style={{
          left: `${75 - (mousePos.x - 50) * 0.15}%`,
          top: `${70 - (mousePos.y - 50) * 0.15}%`,
          width: '60vw',
          height: '60vw',
          maxWidth: '700px',
          maxHeight: '700px',
          background: `radial-gradient(circle, ${color2} 0%, ${color2}66 45%, transparent 75%)`,
          transform: 'translate(-50%, -50%)',
          transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      />

      {/* Blob 3: Neon Highlight (Direct Interactive Pointer Tracking) */}
      <div
        className="absolute rounded-full blur-[45px] pointer-events-none transition-transform duration-300 ease-out"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          width: isHovered ? '320px' : '220px',
          height: isHovered ? '320px' : '220px',
          background: `radial-gradient(circle, ${neonColor}ee 0%, ${neonColor}88 35%, transparent 70%)`,
          transform: 'translate(-50%, -50%)',
          boxShadow: `0 0 100px ${neonColor}66`,
        }}
      />

      {/* Angular neon specular sweep line */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-color-dodge transition-all duration-700"
        style={{
          background: `linear-gradient(${115 + (mousePos.x - 50) * 0.3}deg, transparent 35%, ${neonColor}44 48%, ${neonColor}88 50%, ${neonColor}44 52%, transparent 65%)`,
        }}
      />

      {/* ============================================================ */}
      {/* 3. LAYER C: FLUTED GLASS BLINDS (VERTICAL REEDED TEXTURE)   */}
      {/* ============================================================ */}
      {/* Fluted glass ribbed cylindrical ridges */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-90"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.14) 0px,
            rgba(255, 255, 255, 0.28) 2px,
            rgba(255, 255, 255, 0.08) 4px,
            rgba(0, 0, 0, 0.45) ${fluteHalf},
            rgba(0, 0, 0, 0.15) calc(${fluteHalf} + 2px),
            rgba(255, 255, 255, 0.22) calc(${fluteSpacing} - 2px),
            rgba(255, 255, 255, 0.05) ${fluteSpacing}
          )`,
          backgroundSize: `${fluteSpacing} 100%`,
        }}
      />

      {/* Secondary specular gleam reflecting off glass flutes */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.35) 0px,
            rgba(255, 255, 255, 0.0) 2px,
            transparent ${fluteSpacing}
          )`,
          backgroundSize: `${fluteSpacing} 100%`,
          transform: `translateX(${(mousePos.x - 50) * 0.1}px)`,
        }}
      />

      {/* Frosted Glass Refraction Blur */}
      <div className="absolute inset-0 backdrop-blur-[6px] pointer-events-none" />

      {/* ============================================================ */}
      {/* 4. LAYER D: TACTILE FILM GRAIN / NOISE FILTER                */}
      {/* ============================================================ */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.28] mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="fluted-noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#fluted-noise-filter)" />
      </svg>

      {/* ============================================================ */}
      {/* 5. LAYER E: CONTRAST PROTECTION SCRIM (TEXT READABILITY)    */}
      {/* ============================================================ */}
      {/* Deep vignette scrim ensuring 100% text contrast and readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/75 via-[#030712]/70 to-[#030712]/85 pointer-events-none" />

      {/* Top subtle border glow accent */}
      <div
        className="absolute top-0 inset-x-0 h-[2px] transition-colors duration-500"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${neonColor} 50%, transparent 100%)`,
        }}
      />

      {/* ============================================================ */}
      {/* 6. INTERACTIVE MOTION TOOL FLOATING BAR                     */}
      {/* ============================================================ */}
      <div className="absolute top-3 inset-x-0 z-30 px-4 sm:px-6 pointer-events-auto flex justify-center">
        <div className="w-full max-w-4xl bg-slate-900/90 hover:bg-slate-900/95 transition-all duration-300 border border-slate-700/80 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.6)] backdrop-blur-md px-3.5 py-2.5">
          
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            
            {/* Title & Badge */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: neonColor }} />
              <div className="flex items-center gap-1.5 text-xs font-bold text-white font-heading">
                <Palette className="w-3.5 h-3.5 text-emerald-400" />
                <span>Motion Tool: Fluted Glass &amp; Gradient</span>
              </div>
              <span className="hidden sm:inline-block text-[10px] font-semibold text-emerald-300 bg-emerald-950/90 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                Interactive Backdrop
              </span>
            </div>

            {/* Quick Actions (Presets & Tool Toggle) */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={handleShuffle}
                className="cartoon-btn flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-600 shadow-sm active:translate-y-0.5 transition-all"
                title="Randomize gradient & neon colors"
              >
                <Shuffle className="w-3 h-3 text-cyan-400" />
                <span className="hidden sm:inline">Shuffle</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="cartoon-btn p-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-600 transition-colors"
                title="Reset to default Blue & Mint"
              >
                <RotateCcw className="w-3 h-3" />
              </button>

              <button
                type="button"
                onClick={() => {
                  sounds.pop();
                  setShowToolControls(!showToolControls);
                }}
                className={`cartoon-btn flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all ${
                  showToolControls
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black'
                    : 'bg-slate-800 text-slate-300 border-slate-600 hover:text-white'
                }`}
              >
                <Sliders className="w-3 h-3" />
                <span>{showToolControls ? 'Hide Controls' : 'Edit Gradient'}</span>
              </button>
            </div>
          </div>

          {/* Expanded Controls Drawer */}
          {showToolControls && (
            <div className="mt-3 pt-2.5 border-t border-slate-700/60 grid grid-cols-1 md:grid-cols-12 gap-3 text-xs text-slate-300 animate-fadeIn">
              
              {/* Presets Strip (6 cols) */}
              <div className="md:col-span-7 space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">
                  Preset Color Gradients:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {GRADIENT_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                        selectedThemeId === preset.id
                          ? 'bg-slate-800 text-white border-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.3)] ring-1 ring-cyan-400'
                          : 'bg-slate-900/90 text-slate-400 border-slate-700/80 hover:text-slate-200 hover:border-slate-500'
                      }`}
                    >
                      <span className="flex items-center -space-x-1 shrink-0">
                        <span className="w-2.5 h-2.5 rounded-full border border-black/40" style={{ backgroundColor: preset.color1 }} />
                        <span className="w-2.5 h-2.5 rounded-full border border-black/40" style={{ backgroundColor: preset.color2 }} />
                        <span className="w-2.5 h-2.5 rounded-full border border-black/40" style={{ backgroundColor: preset.neonColor }} />
                      </span>
                      <span>{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Color Pickers (3 cols) */}
              <div className="md:col-span-3 space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">
                  Change Colors:
                </span>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1 text-[11px] cursor-pointer" title="Pick Blue Gradient Tone">
                    <input
                      type="color"
                      value={color1}
                      onChange={(e) => {
                        setColor1(e.target.value);
                        setSelectedThemeId('custom');
                      }}
                      className="w-5 h-5 rounded cursor-pointer border border-slate-600 bg-transparent"
                    />
                    <span className="text-[10px]">Blue</span>
                  </label>

                  <label className="flex items-center gap-1 text-[11px] cursor-pointer" title="Pick Mint Gradient Tone">
                    <input
                      type="color"
                      value={color2}
                      onChange={(e) => {
                        setColor2(e.target.value);
                        setSelectedThemeId('custom');
                      }}
                      className="w-5 h-5 rounded cursor-pointer border border-slate-600 bg-transparent"
                    />
                    <span className="text-[10px]">Mint</span>
                  </label>

                  <label className="flex items-center gap-1 text-[11px] cursor-pointer" title="Pick Neon Highlight Color">
                    <input
                      type="color"
                      value={neonColor}
                      onChange={(e) => {
                        setNeonColor(e.target.value);
                        setSelectedThemeId('custom');
                      }}
                      className="w-5 h-5 rounded cursor-pointer border border-slate-600 bg-transparent"
                    />
                    <span className="text-[10px]">Neon</span>
                  </label>
                </div>
              </div>

              {/* Flute Blind Width (2 cols) */}
              <div className="md:col-span-2 space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">
                  Fluted Blinds:
                </span>
                <div className="flex items-center gap-1">
                  {(['fine', 'classic', 'wide'] as const).map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => {
                        sounds.pop();
                        setFluteStyle(style);
                      }}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold capitalize transition-colors ${
                        fluteStyle === style
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  );
};
