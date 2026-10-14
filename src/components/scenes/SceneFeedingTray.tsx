import React, { useState } from 'react';
import { CuteDODOCharacter, DogAnimationState } from './CuteDODOCharacter';
import { sounds } from '../../utils/soundEffects';
import { Sparkles, Utensils, RotateCcw } from 'lucide-react';

export const SceneFeedingTray: React.FC = () => {
  const [bowlStatus, setBowlStatus] = useState<'empty' | 'pouring' | 'full' | 'half' | 'clean'>('empty');
  const [dogAction, setDogAction] = useState<DogAnimationState>('idle');
  const [dogX, setDogX] = useState<number>(20); // starts further away
  const [message, setMessage] = useState('Dodo’s feeding tray is empty. Tap "Prepare Meal" to serve fresh nutrition! 🥣');
  const [isProcessing, setIsProcessing] = useState(false);

  const startFeedingSequence = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    // 1. Person pours food into bowl
    setBowlStatus('pouring');
    setMessage('Scooping balanced, wholesome dog nutrition into the clean bowl... 🥣✨');
    sounds.pop();

    await new Promise((r) => setTimeout(r, 1200));

    // 2. Bowl is filled
    setBowlStatus('full');
    sounds.coin();
    setMessage('Bowl is ready! CuteDODO notices the aroma and perks his ears! 👃🦴');
    setDogAction('look');

    await new Promise((r) => setTimeout(r, 900));

    // 3. Dog approaches bowl
    setDogAction('walk');
    setDogX(52);
    setMessage('Trotting over happily to the feeding mat... 🐾');

    await new Promise((r) => setTimeout(r, 1400));

    // 4. Lowers head & eats
    setDogAction('eat');
    sounds.chew();
    setMessage('Crunch, crunch! Enjoying the wholesome meal! 🐶🥣');

    await new Promise((r) => setTimeout(r, 2000));

    // 5. Briefly lifts head, licks lips
    setDogAction('look');
    setBowlStatus('half');
    setMessage('Lifts head happily with a wag, then continues finishing the meal! ❤️');

    await new Promise((r) => setTimeout(r, 1500));

    // 6. Continues eating
    setDogAction('eat');
    sounds.chew();

    await new Promise((r) => setTimeout(r, 2200));

    // 7. Finishes, bowl clean, sits/rests happily beside tray
    setBowlStatus('clean');
    setDogAction('sit');
    sounds.bell();
    setMessage('All finished! Dodo sits happily beside his tray, 100% satisfied and full! 🐾');

    setIsProcessing(false);
  };

  const resetTray = () => {
    setBowlStatus('empty');
    setDogAction('idle');
    setDogX(20);
    setMessage('Tray reset to clean and empty state. Ready for mealtime! 🥣');
  };

  return (
    <div className="cartoon-card bg-linear-to-b from-amber-50 via-sky-50 to-amber-100 rounded-3xl p-5 sm:p-8 relative overflow-hidden">
      
      {/* Title & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-amber-950/10">
        <div>
          <span className="text-xs font-bold text-amber-800 bg-amber-200 border border-amber-950 px-2.5 py-0.5 rounded-full shadow-[1px_1px_0px_#3d2314] inline-block mb-1">
            Scene 04 · Pet Care
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-cartoon text-amber-950">
            Preparing a CuteDODO Feeding Tray
          </h3>
        </div>

        <div className="bg-white border-2 border-amber-950 rounded-2xl px-4 py-2 shadow-[2px_2px_0px_#3d2314] text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-2">
          <Utensils className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{message}</span>
        </div>
      </div>

      {/* Feeding Area Canvas */}
      <div className="relative h-68 sm:h-84 bg-linear-to-b from-[#FFFDF7] to-amber-100/60 rounded-2xl border-3 border-amber-950 overflow-hidden shadow-inner mb-6">
        
        {/* Cozy Kitchen/Dining Wall Background */}
        <div className="absolute top-4 left-6 text-2xl select-none opacity-30">🪟</div>
        <div className="absolute top-6 right-8 text-2xl select-none opacity-30">⏰</div>
        
        {/* Tiled kitchen floor */}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-[#F5ECE0] border-t-2 border-amber-950 flex items-center justify-around text-xs text-amber-950/20 select-none">
          <span>◽◽◽</span><span>◽◽◽</span><span>◽◽◽</span><span>◽◽◽</span><span>◽◽◽</span>
        </div>

        {/* Non-slip Feeding Silicone Tray Mat */}
        <div className="absolute right-16 sm:right-24 bottom-6 z-10 w-52 h-20 bg-amber-300 border-3 border-amber-950 rounded-3xl shadow-[3px_3px_0px_#3d2314] flex items-center justify-around px-4">
          
          {/* FOOD BOWL */}
          <div className="relative flex flex-col items-center">
            {/* Hand pouring food during 'pouring' state */}
            {bowlStatus === 'pouring' && (
              <div className="absolute -top-16 z-30 animate-bounce flex flex-col items-center">
                <span className="text-2xl">🥄</span>
                <span className="text-[10px] font-bold bg-amber-400 border border-amber-950 px-1.5 rounded">
                  Pouring...
                </span>
              </div>
            )}

            <div className="w-18 h-10 bg-amber-100 border-2 border-amber-950 rounded-b-2xl rounded-t-lg shadow-sm flex items-center justify-center overflow-hidden">
              {bowlStatus === 'empty' && (
                <span className="text-[10px] font-bold text-amber-900/50">Empty</span>
              )}
              {bowlStatus === 'pouring' && (
                <div className="flex gap-1 text-xs animate-pulse">
                  <span>🟤</span><span>🟤</span>
                </div>
              )}
              {bowlStatus === 'full' && (
                <div className="w-full h-full bg-[#B45309] border-t border-amber-950/40 flex items-center justify-center text-[11px] font-bold text-amber-100">
                  Kibble 🥣
                </div>
              )}
              {bowlStatus === 'half' && (
                <div className="w-full h-1/2 bg-[#B45309] mt-auto flex items-center justify-center text-[9px] font-bold text-amber-100">
                  Half
                </div>
              )}
              {bowlStatus === 'clean' && (
                <span className="text-[10px] font-bold text-emerald-700">Licked Clean ✨</span>
              )}
            </div>
            <span className="text-[10px] font-bold text-amber-950 mt-1">Nutrition</span>
          </div>

          {/* FRESH CLEAN WATER BOWL */}
          <div className="relative flex flex-col items-center">
            <div className="w-18 h-10 bg-sky-200 border-2 border-amber-950 rounded-b-2xl rounded-t-lg shadow-sm flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-sky-400/80 border-t border-sky-600 flex items-center justify-center text-[10px] font-bold text-sky-950">
                Fresh 💧
              </div>
            </div>
            <span className="text-[10px] font-bold text-amber-950 mt-1">Water</span>
          </div>

        </div>

        {/* --- CUTEDODO APPROACHING & EATING --- */}
        <div
          style={{
            left: `${dogX}%`,
            transition: 'left 1.2s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
          className="absolute bottom-6 z-20"
        >
          <CuteDODOCharacter
            state={dogAction}
            facing="right"
            scale={1.05}
            onClick={() => {
              if (!isProcessing) startFeedingSequence();
            }}
          />
        </div>

      </div>

      {/* Control Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <button
          disabled={isProcessing}
          onClick={startFeedingSequence}
          className="cartoon-btn px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-cartoon font-bold rounded-2xl flex items-center gap-2 text-sm shadow-[3px_3px_0px_#3d2314] disabled:opacity-50"
        >
          <Utensils className="w-4 h-4 text-amber-950" />
          <span>{isProcessing ? 'Serving Meal...' : 'Prepare & Serve Meal 🥣'}</span>
        </button>

        <button
          onClick={resetTray}
          className="cartoon-btn px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-xl text-xs font-bold flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Tray</span>
        </button>
      </div>

    </div>
  );
};
