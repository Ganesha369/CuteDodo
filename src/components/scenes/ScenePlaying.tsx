import React, { useState, useEffect } from 'react';
import { CuteDODOCharacter, DogAnimationState } from './CuteDODOCharacter';
import { sounds } from '../../utils/soundEffects';
import { Sparkles, RotateCcw } from 'lucide-react';

export const ScenePlaying: React.FC = () => {
  const [dogState, setDogState] = useState<DogAnimationState>('idle');
  const [dogPosition, setDogPosition] = useState(25); // percentage along X
  const [dogFacing, setDogFacing] = useState<'left' | 'right'>('right');
  const [isBlinking, setIsBlinking] = useState(false);
  const [activeToy, setActiveToy] = useState<'ball' | 'bone' | 'frisbee'>('ball');
  const [toyPosition, setToyPosition] = useState(75); // percentage along X
  const [toyBounce, setToyBounce] = useState(false);
  const [actionLog, setActionLog] = useState('Click a toy to throw it for CuteDODO! 🎾');
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);

  // Random idle blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  // Throw toy & run play sequence
  const throwToy = (toyType: 'ball' | 'bone' | 'frisbee') => {
    if (isPlayingSequence) return;
    setIsPlayingSequence(true);
    setActiveToy(toyType);
    sounds.pop();

    // 1. Toy bounces to random location (65% to 80%)
    const targetX = Math.floor(Math.random() * 15) + 65;
    setToyPosition(targetX);
    setToyBounce(true);
    setActionLog(`Throwing the ${toyType}! Watch Dodo zoom! 🚀`);

    // 2. Dog spots toy, alerts and runs toward toy
    setTimeout(() => {
      sounds.bark();
      setDogFacing('right');
      setDogState('run');
      setDogPosition(targetX - 12);
      setActionLog('Dodo is sprinting excitedly toward the toy! 🐾💨');
    }, 450);

    // 3. Playful bow in front of toy
    setTimeout(() => {
      sounds.bell();
      setDogState('play');
      setToyBounce(false);
      setActionLog('Playful bow! Wiggle waggle! 🎉');
    }, 1400);

    // 4. Jump & turn around
    setTimeout(() => {
      sounds.pop();
      setDogFacing('left');
      setDogState('run');
      setDogPosition(targetX - 25);
      setActionLog('Light jump and happy turn-around! 🔄✨');
    }, 2400);

    // 5. Briefly sit, tilt head, and look toward viewer
    setTimeout(() => {
      sounds.bell();
      setDogState('look');
      setActionLog('Dodo proudly tilts his head: "Look what I caught!" 🐶');
    }, 3400);

    // 6. Return to idle after playing
    setTimeout(() => {
      setDogState('idle');
      setIsPlayingSequence(false);
      setActionLog('Ready for another throw! Tap any toy below. 🎾🦴');
    }, 4800);
  };

  const handleDogHover = () => {
    if (isPlayingSequence) return;
    setIsBlinking(true);
    setDogState('look');
    setTimeout(() => {
      setIsBlinking(false);
      if (!isPlayingSequence) setDogState('idle');
    }, 1200);
  };

  const handleDogClick = () => {
    if (isPlayingSequence) return;
    sounds.bark();
    setDogState('play');
    setActionLog('Dodo gives a joyful puppy bow and wags! ❤️');
    setTimeout(() => {
      setDogState('idle');
    }, 1500);
  };

  return (
    <div className="cartoon-card bg-linear-to-b from-sky-100 via-amber-50 to-emerald-100 rounded-3xl p-5 sm:p-8 relative overflow-hidden">
      
      {/* Background Decor (Playful Park setting with clouds and flowers) */}
      <div className="absolute top-4 left-8 text-2xl animate-float select-none opacity-40">☁️</div>
      <div className="absolute top-8 right-16 text-3xl animate-float select-none opacity-40" style={{ animationDelay: '1.5s' }}>☁️</div>
      <div className="absolute bottom-2 left-6 text-xl select-none opacity-50">🌼</div>
      <div className="absolute bottom-3 left-1/3 text-lg select-none opacity-50">🌸</div>
      <div className="absolute bottom-2 right-12 text-xl select-none opacity-50">🌻</div>

      {/* Title & Action status banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-amber-950/10">
        <div>
          <span className="text-xs font-bold text-amber-800 bg-amber-200 border border-amber-950 px-2.5 py-0.5 rounded-full shadow-[1px_1px_0px_#3d2314] inline-block mb-1">
            Scene 01 · Playtime
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-cartoon text-amber-950">
            CuteDODO Playing Happily
          </h3>
        </div>

        <div className="bg-white border-2 border-amber-950 rounded-2xl px-4 py-2 shadow-[2px_2px_0px_#3d2314] text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{actionLog}</span>
        </div>
      </div>

      {/* Main Play Yard Canvas */}
      <div className="relative h-64 sm:h-80 bg-linear-to-b from-sky-50 to-emerald-50 rounded-2xl border-3 border-amber-950 overflow-hidden shadow-inner mb-6">
        
        {/* Soft grass baseline */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-emerald-200/80 border-t-2 border-amber-950/20 flex items-center justify-around text-xs text-emerald-800/40 select-none">
          <span>🌱</span><span>🌿</span><span>🌱</span><span>🌿</span><span>🌱</span><span>🌿</span>
        </div>

        {/* The Interactive Toy on the field */}
        <div
          onClick={() => throwToy(activeToy)}
          style={{
            left: `${toyPosition}%`,
            transition: 'left 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s ease-out',
            transform: toyBounce ? 'translateY(-30px) rotate(360deg)' : 'translateY(0px)',
          }}
          className="absolute bottom-10 z-20 cursor-pointer group"
          title="Click to throw this toy!"
        >
          <div className="relative w-12 h-12 flex items-center justify-center bg-white/90 border-2 border-amber-950 rounded-2xl shadow-[2px_2px_0px_#3d2314] hover:scale-110 active:scale-95 transition-transform">
            <span className="text-2xl animate-pulse">
              {activeToy === 'ball' && '🎾'}
              {activeToy === 'bone' && '🦴'}
              {activeToy === 'frisbee' && '🥏'}
            </span>
            <span className="absolute -top-6 text-[10px] font-bold bg-amber-400 border border-amber-950 px-1.5 py-0.2 rounded-md whitespace-nowrap shadow-xs">
              Fetch!
            </span>
          </div>
        </div>

        {/* CuteDODO Character */}
        <div
          style={{
            left: `${dogPosition}%`,
            transition: isPlayingSequence ? 'left 0.8s cubic-bezier(0.25, 1, 0.5, 1)' : 'left 0.4s ease',
          }}
          className="absolute bottom-7 z-20"
        >
          <CuteDODOCharacter
            state={dogState}
            facing={dogFacing}
            isBlinking={isBlinking}
            tailWagSpeed={dogState === 'play' || dogState === 'run' ? 'fast' : 'normal'}
            onClick={handleDogClick}
            onMouseEnter={handleDogHover}
            scale={1.05}
          />
        </div>

      </div>

      {/* Toy Selection & Play Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-900">Choose Toy to Throw:</span>
          
          <button
            onClick={() => throwToy('ball')}
            className={`cartoon-btn px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
              activeToy === 'ball' ? 'bg-amber-400 text-amber-950' : 'bg-white text-amber-900'
            }`}
          >
            <span>🎾 Tennis Ball</span>
          </button>

          <button
            onClick={() => throwToy('bone')}
            className={`cartoon-btn px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
              activeToy === 'bone' ? 'bg-amber-400 text-amber-950' : 'bg-white text-amber-900'
            }`}
          >
            <span>🦴 Squeaky Bone</span>
          </button>

          <button
            onClick={() => throwToy('frisbee')}
            className={`cartoon-btn px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
              activeToy === 'frisbee' ? 'bg-amber-400 text-amber-950' : 'bg-white text-amber-900'
            }`}
          >
            <span>🥏 Flying Frisbee</span>
          </button>
        </div>

        <button
          onClick={() => {
            sounds.bell();
            setDogPosition(25);
            setDogFacing('right');
            setDogState('idle');
            setActionLog('Dodo reset to start position. Ready to play! 🐶');
          }}
          className="cartoon-btn px-3.5 py-1.5 bg-amber-200 hover:bg-amber-300 rounded-xl text-xs font-bold text-amber-950 flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Position</span>
        </button>
      </div>

    </div>
  );
};
