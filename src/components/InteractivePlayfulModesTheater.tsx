import React, { useState } from 'react';
import { Sparkles, Trophy, Heart, Smile, Play, Volume2, Award, Zap } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

type PlayMode = 'tug' | 'belly' | 'zoomies' | 'treats' | 'dream';

export const InteractivePlayfulModesTheater: React.FC = () => {
  const [activeMode, setActiveMode] = useState<PlayMode>('tug');
  const [funScore, setFunScore] = useState(100);
  const [isActionActive, setIsActionActive] = useState(false);

  const triggerAction = () => {
    setIsActionActive(true);
    setFunScore((s) => s + 25);

    if (activeMode === 'tug') {
      sounds.bark();
      sounds.boing();
    } else if (activeMode === 'belly') {
      sounds.giggle();
      sounds.bell();
    } else if (activeMode === 'zoomies') {
      sounds.whoosh();
      sounds.coin();
    } else if (activeMode === 'treats') {
      sounds.chew();
      sounds.bell();
    } else {
      sounds.pop();
    }

    setTimeout(() => setIsActionActive(false), 1400);
  };

  const modes: { id: PlayMode; title: string; emoji: string; desc: string; buttonText: string }[] = [
    {
      id: 'tug',
      title: 'Tug-of-War Battle',
      emoji: '🪢',
      desc: 'Dodo grips the braided cotton rope with total playful focus, shaking his fluffy head and wagging his tail like a propeller!',
      buttonText: 'Pull Rope! 🪢',
    },
    {
      id: 'belly',
      title: 'Belly-Up Grass Roll',
      emoji: '❤️',
      desc: 'Rolling over in the fresh Chennai lawn, kicking his paws happily in the air while soaking in warm sunshine and gentle belly rubs.',
      buttonText: 'Tickle Tummy! ✨',
    },
    {
      id: 'zoomies',
      title: 'Lightning Zoomies',
      emoji: '⚡',
      desc: 'Full-speed figure-8 sprints around the garden chairs! Faster than a Solana transaction (400ms)!',
      buttonText: 'Trigger Zoomies! 🚀',
    },
    {
      id: 'treats',
      title: 'Snack Catch Master',
      emoji: '🦴',
      desc: 'Sitting upright on hind paws with puppy eyes, waiting for Grandma to toss a crunchy homemade biscuit.',
      buttonText: 'Toss Biscuit! 🥣',
    },
    {
      id: 'dream',
      title: 'Sweet Mango Tree Nap',
      emoji: '💤',
      desc: 'Curled in a cozy ball under the breeze, dreaming about puppy friends and endless green parks.',
      buttonText: 'Pet Gently 🍃',
    },
  ];

  const current = modes.find((m) => m.id === activeMode) || modes[0];

  return (
    <div className="cartoon-card bg-[#FFF9F0] rounded-3xl p-5 sm:p-8 mb-14 overflow-hidden relative">
      {/* Decorative cartoon background */}
      <div className="absolute top-2 right-4 text-4xl opacity-15 select-none pointer-events-none">🐾</div>
      <div className="absolute bottom-2 left-4 text-4xl opacity-15 select-none pointer-events-none">✨</div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#49200B]/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F7D9C7] border border-[#49200B]/30 rounded-xl text-xs font-bold font-heading text-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#49200B]" />
            <span>Cartoon Animation Studio · Dog Playfulness Modes</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#49200B]">
            Interactive Playfulness Playground
          </h3>
        </div>

        {/* Fun Meter Score Badge */}
        <div className="flex items-center gap-2 bg-white border-2 border-[#49200B] rounded-2xl px-4 py-2 shadow-[2px_2px_0px_#49200B] shrink-0 self-start sm:self-auto">
          <Trophy className="w-5 h-5 text-[#FF9F00]" />
          <div>
            <div className="text-[10px] font-bold text-[#79513B] uppercase">Happiness XP</div>
            <div className="text-base sm:text-lg font-black font-mono text-[#49200B]">{funScore} PTS</div>
          </div>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => {
              sounds.pop();
              setActiveMode(m.id);
            }}
            className={`cartoon-btn px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold font-heading flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeMode === m.id
                ? 'bg-[#FFD36A] text-[#49200B] shadow-[3px_3px_0px_#49200B] -translate-y-0.5'
                : 'bg-white text-[#79513B] hover:bg-[#FFF3DC] border border-[#49200B]/20'
            }`}
          >
            <span>{m.emoji}</span>
            <span>{m.title}</span>
          </button>
        ))}
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Animated Visual Canvas (7 Cols) */}
        <div className="lg:col-span-7 relative h-64 sm:h-80 bg-linear-to-b from-sky-100 via-emerald-50 to-emerald-200 rounded-3xl border-3 border-amber-950 overflow-hidden shadow-inner flex items-center justify-center">
          
          {/* Animated Environment Details */}
          <div className="absolute top-4 left-6 text-2xl opacity-40 animate-float">☁️</div>
          <div className="absolute top-8 right-10 text-2xl opacity-40 animate-float" style={{ animationDelay: '1s' }}>🌸</div>
          <div className="absolute bottom-4 inset-x-0 h-10 bg-emerald-300 border-t-2 border-amber-950" />

          {/* MODE 1: TUG OF WAR */}
          {activeMode === 'tug' && (
            <div className="relative flex items-center justify-center">
              {/* Rope */}
              <div className={`relative flex items-center ${isActionActive ? 'animate-bounce' : ''}`}>
                {/* Hand pulling from left */}
                <div className="w-12 h-6 bg-amber-200 border-2 border-amber-950 rounded-xl flex items-center justify-center text-xs font-bold shadow-[2px_2px_0px_#3d2314]">
                  Pull!
                </div>
                {/* Braided Rope */}
                <div className="w-20 sm:w-28 h-4 bg-linear-to-r from-amber-600 via-amber-700 to-amber-800 border-y-2 border-amber-950 flex items-center justify-around">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="w-1 h-full bg-amber-400 rotate-12" />
                  ))}
                </div>
              </div>

              {/* Dodo Tug Rig */}
              <div className={`relative ${isActionActive ? 'animate-dog-gallop' : 'animate-wag'}`}>
                <svg viewBox="0 0 90 70" className="w-28 sm:w-36 h-22 sm:h-28 overflow-visible">
                  <path d="M 12 36 C 4 28 2 16 8 12 C 14 14 14 24 12 32 Z" fill="#F5F5F4" stroke="#3D2314" strokeWidth="2" className="animate-tail-fast" />
                  <ellipse cx="40" cy="40" rx="22" ry="16" fill="#FFFBEB" stroke="#3D2314" strokeWidth="2" />
                  <path d="M 30 28 C 40 26 48 32 46 44 C 40 50 30 48 30 38 Z" fill="#D97706" />
                  <ellipse cx="28" cy="56" rx="5" ry="3" fill="#FFFBEB" stroke="#3D2314" strokeWidth="1.5" />
                  <ellipse cx="54" cy="54" rx="5.5" ry="3.5" fill="#FFFBEB" stroke="#3D2314" strokeWidth="1.5" />
                  {/* Head tugging back */}
                  <circle cx="62" cy="28" r="14" fill="#FFFBEB" stroke="#3D2314" strokeWidth="2" />
                  {/* Clenched teeth gripping rope */}
                  <rect x="70" y="28" width="10" height="6" rx="2" fill="#FFFFFF" stroke="#3D2314" strokeWidth="1.5" />
                  <line x1="75" y1="28" x2="75" y2="34" stroke="#3D2314" strokeWidth="1" />
                  {/* Determined playful eyes */}
                  <path d="M 58 24 Q 61 22 64 24" stroke="#3D2314" strokeWidth="2" fill="none" />
                  <path d="M 66 24 Q 69 22 72 24" stroke="#3D2314" strokeWidth="2" fill="none" />
                  <ellipse cx="54" cy="28" rx="4" ry="10" fill="#B45309" stroke="#3D2314" strokeWidth="1.5" className="animate-ear-bounce" />
                  <ellipse cx="72" cy="28" rx="4" ry="10" fill="#B45309" stroke="#3D2314" strokeWidth="1.5" className="animate-ear-bounce" />
                </svg>
              </div>
            </div>
          )}

          {/* MODE 2: BELLY RUB */}
          {activeMode === 'belly' && (
            <div className={`relative flex flex-col items-center ${isActionActive ? 'animate-belly-wiggle' : 'animate-wag'}`}>
              <div className="text-3xl mb-1 animate-bounce">💖</div>
              <svg viewBox="0 0 90 70" className="w-32 sm:w-40 h-24 sm:h-30 overflow-visible rotate-180">
                <ellipse cx="45" cy="35" rx="26" ry="18" fill="#FFFBEB" stroke="#3D2314" strokeWidth="2" />
                <path d="M 35 24 C 45 22 55 28 53 40 C 47 46 35 44 35 34 Z" fill="#D97706" />
                {/* 4 Paws up in the air wiggling happily */}
                <ellipse cx="30" cy="18" rx="5" ry="4" fill="#FFFBEB" stroke="#3D2314" strokeWidth="1.5" className="animate-bounce" />
                <ellipse cx="42" cy="16" rx="5" ry="4" fill="#FFFBEB" stroke="#3D2314" strokeWidth="1.5" className="animate-bounce" />
                <ellipse cx="52" cy="16" rx="5" ry="4" fill="#FFFBEB" stroke="#3D2314" strokeWidth="1.5" className="animate-bounce" />
                <ellipse cx="64" cy="18" rx="5" ry="4" fill="#FFFBEB" stroke="#3D2314" strokeWidth="1.5" className="animate-bounce" />
                {/* Head with joyful closed eyes */}
                <circle cx="70" cy="45" r="14" fill="#FFFBEB" stroke="#3D2314" strokeWidth="2" />
                <path d="M 66 42 Q 69 46 72 42" stroke="#3D2314" strokeWidth="2" fill="none" />
                <path d="M 74 42 Q 77 46 80 42" stroke="#3D2314" strokeWidth="2" fill="none" />
                <circle cx="65" cy="48" r="2.5" fill="#FB7185" opacity="0.8" />
                <circle cx="81" cy="48" r="2.5" fill="#FB7185" opacity="0.8" />
              </svg>
            </div>
          )}

          {/* MODE 3: ZOOMIES */}
          {activeMode === 'zoomies' && (
            <div className={`relative flex items-center justify-center ${isActionActive ? 'animate-dog-gallop' : 'animate-wag'}`}>
              {/* Rainbow speed trail */}
              <div className="absolute -left-12 inset-y-0 flex flex-col justify-center gap-1 opacity-75">
                <div className="w-16 h-1.5 bg-rose-400 rounded-full" />
                <div className="w-20 h-1.5 bg-amber-400 rounded-full" />
                <div className="w-14 h-1.5 bg-sky-400 rounded-full" />
              </div>
              <svg viewBox="0 0 100 80" className="w-32 sm:w-40 h-24 sm:h-30 overflow-visible">
                <path d="M 12 40 C 2 30 0 18 8 14 C 14 16 14 26 12 36 Z" fill="#F5F5F4" stroke="#3D2314" strokeWidth="2" className="animate-tail-fast" />
                <ellipse cx="45" cy="46" rx="24" ry="17" fill="#FFFBEB" stroke="#3D2314" strokeWidth="2.2" />
                <path d="M 34 33 C 44 32 54 38 52 50 C 46 56 34 54 34 43 Z" fill="#D97706" />
                <ellipse cx="28" cy="62" rx="6" ry="4" fill="#FFFBEB" stroke="#3D2314" strokeWidth="1.8" />
                <ellipse cx="68" cy="60" rx="6" ry="4" fill="#FFFBEB" stroke="#3D2314" strokeWidth="1.8" />
                <circle cx="68" cy="30" r="15" fill="#FFFBEB" stroke="#3D2314" strokeWidth="2.2" />
                <ellipse cx="57" cy="31" rx="5" ry="11" fill="#B45309" stroke="#3D2314" strokeWidth="1.8" className="animate-ear-bounce" />
                <ellipse cx="79" cy="31" rx="5" ry="11" fill="#B45309" stroke="#3D2314" strokeWidth="1.8" className="animate-ear-bounce" />
                <circle cx="63" cy="28" r="2.5" fill="#1C1917" />
                <circle cx="73" cy="28" r="2.5" fill="#1C1917" />
                <ellipse cx="68" cy="34" rx="5" ry="3.5" fill="#FEF3C7" stroke="#3D2314" strokeWidth="1.2" />
                <ellipse cx="68" cy="33" rx="2" ry="1.5" fill="#1C1917" />
                <path d="M 66 37 Q 68 44 70 37" fill="#FB7185" stroke="#3D2314" strokeWidth="1" />
              </svg>
            </div>
          )}

          {/* MODE 4: SNACK TREATS */}
          {activeMode === 'treats' && (
            <div className="relative flex flex-col items-center">
              {/* Dropping Treat */}
              <div className={`text-3xl mb-2 ${isActionActive ? 'animate-bounce' : 'animate-float'}`}>
                🦴
              </div>
              <svg viewBox="0 0 80 80" className="w-28 sm:w-36 h-28 sm:h-36 overflow-visible">
                {/* Sitting Upright Begging */}
                <ellipse cx="40" cy="54" rx="18" ry="20" fill="#FFFBEB" stroke="#3D2314" strokeWidth="2" />
                {/* Hind paws grounded */}
                <ellipse cx="26" cy="68" rx="6" ry="4" fill="#FFFBEB" stroke="#3D2314" strokeWidth="1.5" />
                <ellipse cx="54" cy="68" rx="6" ry="4" fill="#FFFBEB" stroke="#3D2314" strokeWidth="1.5" />
                {/* Front paws lifted up begging */}
                <ellipse cx="32" cy="42" rx="4.5" ry="5.5" fill="#FFFBEB" stroke="#3D2314" strokeWidth="1.5" className="animate-bounce" />
                <ellipse cx="48" cy="42" rx="4.5" ry="5.5" fill="#FFFBEB" stroke="#3D2314" strokeWidth="1.5" className="animate-bounce" />
                {/* Head looking up */}
                <circle cx="40" cy="26" r="14" fill="#FFFBEB" stroke="#3D2314" strokeWidth="2" />
                <circle cx="35" cy="24" r="2.5" fill="#1C1917" />
                <circle cx="45" cy="24" r="2.5" fill="#1C1917" />
                <ellipse cx="40" cy="30" rx="4.5" ry="3" fill="#FEF3C7" stroke="#3D2314" strokeWidth="1.2" />
                <ellipse cx="40" cy="29" rx="1.8" ry="1.4" fill="#1C1917" />
                <path d="M 38 33 Q 40 37 42 33" stroke="#3D2314" strokeWidth="1.5" fill="#FB7185" />
              </svg>
            </div>
          )}

          {/* MODE 5: DREAMING NAP */}
          {activeMode === 'dream' && (
            <div className="relative flex flex-col items-center">
              {/* Dream Cloud Bubble */}
              <div className="bg-white border-2 border-amber-950 rounded-2xl px-3 py-1 text-xs font-bold text-amber-950 shadow-[2px_2px_0px_#3d2314] flex items-center gap-1.5 mb-2 animate-float">
                <span>💭 Dreaming of:</span>
                <span>🦴 🎾 🐶 🥩</span>
              </div>
              <svg viewBox="0 0 90 60" className="w-32 sm:w-40 h-22 sm:h-28 overflow-visible">
                {/* Curled up Sleeping Pup */}
                <ellipse cx="45" cy="35" rx="26" ry="16" fill="#FFFBEB" stroke="#3D2314" strokeWidth="2" />
                <path d="M 35 24 C 45 22 55 28 53 40 C 47 46 35 44 35 34 Z" fill="#D97706" />
                <circle cx="60" cy="32" r="12" fill="#FFFBEB" stroke="#3D2314" strokeWidth="2" />
                {/* Peaceful sleeping curved eyes */}
                <path d="M 57 32 Q 60 35 63 32" stroke="#3D2314" strokeWidth="1.8" fill="none" />
                <path d="M 65 32 Q 68 35 71 32" stroke="#3D2314" strokeWidth="1.8" fill="none" />
                {/* Soft Zzz */}
                <text x="68" y="16" fill="#0284C7" fontSize="12" fontWeight="black" fontFamily="monospace" className="animate-pulse">
                  Zzz...
                </text>
              </svg>
            </div>
          )}

        </div>

        {/* Story & Interactive Trigger Card (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full bg-white border-2 border-amber-950 rounded-3xl p-5 shadow-[4px_4px_0px_#3d2314]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{current.emoji}</span>
              <h4 className="text-xl sm:text-2xl font-bold font-cartoon text-amber-950">
                {current.title}
              </h4>
            </div>
            <p className="text-sm text-amber-900/80 leading-relaxed font-medium mb-6">
              {current.desc}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={triggerAction}
              className="cartoon-btn w-full py-3.5 bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-950 font-cartoon text-base sm:text-lg font-bold rounded-2xl flex items-center justify-center gap-2 shadow-[4px_4px_0px_#3d2314]"
            >
              <Zap className="w-5 h-5 text-amber-950" />
              <span>{current.buttonText}</span>
            </button>

            <div className="flex items-center justify-between text-xs font-bold text-amber-800 pt-2 border-t border-amber-950/10">
              <span>🐾 100% Real Chennai Pup Moments</span>
              <span className="text-emerald-700">60 FPS Motion Graphics</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
