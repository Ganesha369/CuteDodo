import React, { useState } from 'react';
import { Sparkles, Heart, Bell, Music, Smile } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface CartoonDogWalkMarqueeProps {
  className?: string;
}

export const CartoonDogWalkMarquee: React.FC<CartoonDogWalkMarqueeProps> = ({ className = '' }) => {
  const [isZooming, setIsZooming] = useState(false);
  const [pats, setPats] = useState(0);
  const [thought, setThought] = useState('Happily strolling through the neighbourhood! 🐾🌸');

  const handleDogClick = () => {
    sounds.bark();
    sounds.bell();
    setIsZooming(true);
    setPats((p) => p + 1);

    const thoughts = [
      'Zoomie mode activated! Weeee! 🚀🐾',
      'Grandma is making sweet idlis for breakfast! 🥣',
      'Look at my shiny golden bell go ding-ding! 🔔',
      'The neighbor cat waved at me from the wall! 🐱',
      '1% of tokens feed street dog friends in Chennai! 🐶❤️',
      'I love walking with my wonderful family pack! ✨',
    ];
    setThought(thoughts[Math.floor(Math.random() * thoughts.length)]);

    setTimeout(() => {
      setIsZooming(false);
    }, 2400);
  };

  return (
    <div
      className={`relative w-full overflow-hidden bg-linear-to-r from-amber-100 via-emerald-100 to-sky-100 border-y-3 border-amber-950 py-3 sm:py-4 select-none ${className}`}
      aria-label="CuteDODO Walking Parade Animation"
    >
      {/* Decorative cartoon background elements */}
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#3d2314_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Ground Grass Path with Paw Prints */}
      <div className="absolute bottom-0 inset-x-0 h-4 bg-emerald-400 border-t-2 border-amber-950 pointer-events-none" />

      {/* Main Track Container */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        
        {/* Left Badge / Live Action Prompt */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-400 border-2.5 border-amber-950 shadow-[2px_3px_0px_#3d2314] flex items-center justify-center text-xl sm:text-2xl animate-wag">
            🐕
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-black font-cartoon text-amber-950">
                Happy Dog Walk Parade
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-white border border-amber-950 rounded-full text-emerald-800 shadow-[1px_1px_0px_#3d2314]">
                60 FPS Cartoon Rig
              </span>
            </div>
            <p className="text-xs font-semibold text-amber-900/80">
              Tap Dodo to trigger Zoomie Trot &amp; Ring Collar Bell!
            </p>
          </div>
        </div>

        {/* Center: Walking Mascot Rig with Speech Bubble */}
        <div
          onClick={handleDogClick}
          className="relative flex items-center gap-4 cursor-pointer group hover:scale-105 transition-transform"
          title="Click Dodo to cheer him up!"
        >
          {/* Playful Floating Speech Bubble */}
          <div className="bg-white border-2 border-amber-950 rounded-2xl px-3 py-1.5 shadow-[2px_2px_0px_#3d2314] text-xs font-bold text-amber-950 max-w-xs text-center flex items-center gap-1.5">
            <Smile className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">{thought}</span>
          </div>

          {/* CuteDODO Walking Character Rig */}
          <div className={`relative ${isZooming ? 'animate-dog-gallop' : 'animate-wag'}`}>
            <svg viewBox="0 0 100 80" className="w-20 sm:w-24 h-16 sm:h-20 overflow-visible">
              {/* Speed lines when zooming */}
              {isZooming && (
                <g className="opacity-80">
                  <line x1="-10" y1="35" x2="-2" y2="35" stroke="#3D2314" strokeWidth="2" strokeLinecap="round" />
                  <line x1="-16" y1="45" x2="-4" y2="45" stroke="#3D2314" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="-8" y1="55" x2="0" y2="55" stroke="#3D2314" strokeWidth="1.8" strokeLinecap="round" />
                </g>
              )}

              {/* Tail Wag */}
              <g className={isZooming ? 'animate-tail-fast' : 'animate-tail'}>
                <path d="M 18 42 C 6 32 4 20 12 15 C 18 16 18 28 16 38 Z" fill="#F5F5F4" stroke="#3D2314" strokeWidth="2" />
              </g>

              {/* Body */}
              <ellipse cx="45" cy="46" rx="24" ry="17" fill="#FFFBEB" stroke="#3D2314" strokeWidth="2.2" />
              <path d="M 34 33 C 44 32 54 38 52 50 C 46 56 34 54 34 43 Z" fill="#D97706" />

              {/* Walking Legs with coordinated alternate cycle */}
              <ellipse
                cx="30"
                cy="62"
                rx="5"
                ry="3.5"
                fill="#FFFBEB"
                stroke="#3D2314"
                strokeWidth="1.8"
                className={isZooming ? 'animate-bounce' : ''}
              />
              <ellipse cx="38" cy="63" rx="5" ry="3.5" fill="#FFFBEB" stroke="#3D2314" strokeWidth="1.8" />
              <ellipse cx="58" cy="63" rx="5.5" ry="3.8" fill="#FFFBEB" stroke="#3D2314" strokeWidth="1.8" />
              <ellipse
                cx="66"
                cy="61"
                rx="5.5"
                ry="3.8"
                fill="#FFFBEB"
                stroke="#3D2314"
                strokeWidth="1.8"
                className={isZooming ? 'animate-bounce' : ''}
              />

              {/* Collar & Golden Bell */}
              <path d="M 54 36 Q 62 42 70 36" stroke="#DC2626" strokeWidth="3.2" fill="none" strokeLinecap="round" />
              <circle cx="62" cy="41" r="3.5" fill="#FBBF24" stroke="#3D2314" strokeWidth="1.2" />

              {/* Head */}
              <circle cx="68" cy="30" r="15" fill="#FFFBEB" stroke="#3D2314" strokeWidth="2.2" />
              <ellipse cx="58" cy="25" rx="5" ry="7" fill="#D97706" />
              <ellipse cx="78" cy="25" rx="5" ry="7" fill="#D97706" />

              {/* Floppy Ears */}
              <ellipse cx="57" cy="31" rx="5" ry="11" fill="#B45309" stroke="#3D2314" strokeWidth="1.8" className="animate-ear-bounce" />
              <ellipse cx="79" cy="31" rx="5" ry="11" fill="#B45309" stroke="#3D2314" strokeWidth="1.8" className="animate-ear-bounce" />

              {/* Cheerful Eyes */}
              <circle cx="63" cy="28" r="2.2" fill="#1C1917" />
              <circle cx="64" cy="27" r="0.8" fill="#FFFFFF" />
              <circle cx="73" cy="28" r="2.2" fill="#1C1917" />
              <circle cx="74" cy="27" r="0.8" fill="#FFFFFF" />

              {/* Muzzle & Button Nose */}
              <ellipse cx="68" cy="34" rx="5" ry="3.5" fill="#FEF3C7" stroke="#3D2314" strokeWidth="1.2" />
              <ellipse cx="68" cy="33" rx="2.2" ry="1.6" fill="#1C1917" />

              {/* Big Smile with Lolling Tongue */}
              <path d="M 65 36 Q 68 39 71 36" stroke="#3D2314" strokeWidth="1.5" fill="none" />
              <path d="M 66 37 Q 68 44 70 37" fill="#FB7185" stroke="#3D2314" strokeWidth="1" />

              {/* Red Topknot Ribbon */}
              <polygon points="68,14 71,14 69.5,10" fill="#EF4444" stroke="#3D2314" strokeWidth="0.8" />
              <circle cx="69.5" cy="14" r="1.8" fill="#FBBF24" stroke="#3D2314" strokeWidth="0.8" />
            </svg>

            {/* Little hopping cartoon sparrow beside him */}
            <div className="absolute -bottom-1 -right-8 w-6 h-6 animate-bounce">
              <svg viewBox="0 0 20 20" className="w-full h-full">
                <circle cx="10" cy="10" r="6" fill="#F59E0B" stroke="#3D2314" strokeWidth="1" />
                <polygon points="15,9 19,10 15,11" fill="#DC2626" />
                <circle cx="12" cy="8" r="1" fill="#000" />
                <path d="M 5 12 L 2 15" stroke="#3D2314" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Stats & Sound prompt */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 bg-white border-2 border-amber-950 rounded-xl shadow-[2px_2px_0px_#3d2314] text-xs font-bold text-amber-950 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Patted: {pats} times</span>
          </div>

          <button
            onClick={handleDogClick}
            className="cartoon-btn px-3 py-1.5 bg-amber-400 hover:bg-amber-300 rounded-xl text-xs font-bold text-amber-950 flex items-center gap-1"
          >
            <Bell className="w-3.5 h-3.5 text-amber-950" />
            <span>Ring Bell</span>
          </button>
        </div>

      </div>
    </div>
  );
};
