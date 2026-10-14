import React, { useState } from 'react';
import { sounds } from '../../utils/soundEffects';
import { Heart, Sparkles, Play, RotateCcw } from 'lucide-react';

export const SceneStreetDogs: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [isDistributing, setIsDistributing] = useState(false);

  // States for 3 distinct street dogs
  // Dog 1: Indie Brown dog (Shadow)
  // Dog 2: Spotted rescue pup (Patch)
  // Dog 3: Golden village dog (Sunny)
  const steps = [
    {
      title: 'Volunteer approaches with fresh meals',
      desc: 'A caring volunteer approaches the community spot under the neem tree with clean stainless bowls and nourishing food.',
      volunteerPos: 20,
      bowlsPlaced: false,
      dog1State: 'look', // alert and watching
      dog2State: 'look',
      dog3State: 'look',
      dog1Pos: 55,
      dog2Pos: 70,
      dog3Pos: 84,
    },
    {
      title: 'Placing individual bowls & fresh water',
      desc: 'Individual bowls are set out with safe spacing so every dog can eat calmly without competing.',
      volunteerPos: 38,
      bowlsPlaced: true,
      dog1State: 'walk',
      dog2State: 'look',
      dog3State: 'walk',
      dog1Pos: 50,
      dog2Pos: 68,
      dog3Pos: 82,
    },
    {
      title: 'Street dogs approach peacefully',
      desc: 'The dogs step forward respectfully to their assigned bowls, tails beginning to wag with gratitude.',
      volunteerPos: 20, // steps back to give space
      bowlsPlaced: true,
      dog1State: 'walk',
      dog2State: 'walk',
      dog3State: 'walk',
      dog1Pos: 46,
      dog2Pos: 62,
      dog3Pos: 78,
    },
    {
      title: 'Every dog eats peacefully',
      desc: 'Each dog lowers their head to eat from their own bowl, while drinking fresh clean water. Heads and ears move naturally.',
      volunteerPos: 14, // respectful observing distance
      bowlsPlaced: true,
      dog1State: 'eat',
      dog2State: 'eat',
      dog3State: 'eat',
      dog1Pos: 44,
      dog2Pos: 60,
      dog3Pos: 76,
    },
    {
      title: 'Calm, nourished & sheltered',
      desc: 'Tummies full, the dogs sit and rest in the shade. The volunteer watches over them with love. This is CuteDODO’s 1% mission in action.',
      volunteerPos: 14,
      bowlsPlaced: true,
      dog1State: 'sit',
      dog2State: 'rest',
      dog3State: 'sit',
      dog1Pos: 44,
      dog2Pos: 60,
      dog3Pos: 76,
    },
  ];

  const current = steps[step];

  const advanceStep = (nextIdx: number) => {
    setStep(nextIdx);
    if (nextIdx === 1) sounds.coin();
    else if (nextIdx === 3) sounds.chew();
    else sounds.pop();
  };

  const runFullSequence = async () => {
    if (isDistributing) return;
    setIsDistributing(true);

    for (let i = 0; i < steps.length; i++) {
      advanceStep(i);
      await new Promise((r) => setTimeout(r, 2800));
    }

    setIsDistributing(false);
  };

  return (
    <div className="cartoon-card bg-linear-to-b from-sky-100 via-amber-50 to-emerald-100 rounded-3xl p-5 sm:p-8 relative overflow-hidden">
      
      {/* Title & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-amber-950/10">
        <div>
          <span className="text-xs font-bold text-emerald-900 bg-emerald-200 border border-amber-950 px-2.5 py-0.5 rounded-full shadow-[1px_1px_0px_#3d2314] inline-block mb-1">
            Scene 05 · Community Charity Mission
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-cartoon text-amber-950">
            Feeding Street Dogs in Chennai
          </h3>
        </div>

        <div className="bg-white border-2 border-amber-950 rounded-2xl px-4 py-2 shadow-[2px_2px_0px_#3d2314] text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-2">
          <Heart className="w-4 h-4 fill-emerald-600 text-emerald-600 shrink-0" />
          <span>Stage {step + 1} of 5: {current.title}</span>
        </div>
      </div>

      {/* Main Sidewalk / Community Tree Canvas */}
      <div className="relative h-76 sm:h-92 bg-linear-to-b from-amber-50/70 to-emerald-100/80 rounded-2xl border-3 border-amber-950 overflow-hidden shadow-inner mb-6">
        
        {/* Shady Indian Banyan / Neem Tree in background */}
        <div className="absolute top-2 left-10 text-6xl select-none opacity-80 animate-float">🌳</div>
        <div className="absolute top-6 right-16 text-5xl select-none opacity-70">🌴</div>
        <div className="absolute top-12 left-1/3 text-3xl select-none opacity-40">🐦</div>

        {/* Chennai street sidewalk pavement */}
        <div className="absolute bottom-0 inset-x-0 h-22 bg-[#E6D5C3] border-t-2 border-amber-950 flex items-center justify-between px-6 text-xs text-amber-950/40 select-none">
          <span>🌿 Street Dog Care Corner · Chennai, TN</span>
          <span>1% Charity Fund at Work 🐾</span>
        </div>

        {/* --- CARING VOLUNTEER CHARACTER --- */}
        <div
          style={{
            left: `${current.volunteerPos}%`,
            transition: 'left 1s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
          className="absolute bottom-9 z-20"
        >
          <svg viewBox="0 0 100 160" className="w-24 h-40 drop-shadow-[2px_3px_0px_#3d2314] overflow-visible">
            {/* Volunteer Shadow */}
            <ellipse cx="50" cy="155" rx="22" ry="6" fill="#3d2314" opacity="0.2" />
            {/* Legs */}
            <path d="M 40 95 L 38 152 L 48 152 L 46 95 Z" fill="#1E293B" stroke="#3d2314" strokeWidth="2" />
            <path d="M 54 95 L 56 152 L 66 152 L 60 95 Z" fill="#334155" stroke="#3d2314" strokeWidth="2" />
            {/* Shoes */}
            <rect x="34" y="148" width="16" height="6" rx="2" fill="#78350F" />
            <rect x="54" y="148" width="16" height="6" rx="2" fill="#78350F" />
            {/* T-shirt with Paw Print */}
            <path d="M 32 50 L 68 50 L 70 100 L 30 100 Z" fill="#10B981" stroke="#3d2314" strokeWidth="2.5" />
            <circle cx="50" cy="70" r="3" fill="#FFFFFF" />
            {/* Head */}
            <circle cx="50" cy="30" r="14" fill="#FBBF24" stroke="#3d2314" strokeWidth="2" />
            {/* Hair */}
            <path d="M 38 28 C 38 16 62 16 62 28 Z" fill="#451A03" />
            {/* Friendly smile */}
            <circle cx="56" cy="28" r="1.5" fill="#3d2314" />
            <path d="M 52 35 Q 56 38 60 35" stroke="#3d2314" strokeWidth="1.5" fill="none" />
            {/* Arms holding food container */}
            <path d="M 35 55 Q 50 72 65 65" stroke="#10B981" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Stainless steel food bucket */}
            <rect x="58" y="58" width="16" height="18" rx="3" fill="#CBD5E1" stroke="#3d2314" strokeWidth="1.5" />
            <path d="M 56 60 Q 66 52 76 60" stroke="#64748B" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        {/* --- STABLE GROUND BOWLS (When Placed) --- */}
        {current.bowlsPlaced && (
          <div className="absolute inset-x-0 bottom-7 z-10 pointer-events-none">
            {/* Bowl 1 (Brown dog) */}
            <div className="absolute left-[38%] bottom-0 flex flex-col items-center">
              <div className="w-10 h-5 bg-amber-200 border-2 border-amber-950 rounded-b-xl flex items-center justify-center">
                <span className="text-[8px] font-bold text-amber-950">Bowl 1</span>
              </div>
            </div>

            {/* Clean Water Bowl (Shared in middle) */}
            <div className="absolute left-[54%] bottom-0 flex flex-col items-center">
              <div className="w-12 h-6 bg-sky-200 border-2 border-amber-950 rounded-b-xl flex items-center justify-center">
                <span className="text-[8px] font-bold text-sky-950">Water 💧</span>
              </div>
            </div>

            {/* Bowl 2 (Spotted dog) */}
            <div className="absolute left-[66%] bottom-0 flex flex-col items-center">
              <div className="w-10 h-5 bg-amber-200 border-2 border-amber-950 rounded-b-xl flex items-center justify-center">
                <span className="text-[8px] font-bold text-amber-950">Bowl 2</span>
              </div>
            </div>

            {/* Bowl 3 (Golden dog) */}
            <div className="absolute left-[80%] bottom-0 flex flex-col items-center">
              <div className="w-10 h-5 bg-amber-200 border-2 border-amber-950 rounded-b-xl flex items-center justify-center">
                <span className="text-[8px] font-bold text-amber-950">Bowl 3</span>
              </div>
            </div>
          </div>
        )}

        {/* --- THREE VISUALLY DISTINCT STREET DOGS --- */}
        
        {/* DOG 1: Indie Brown dog (Shadow) */}
        <div
          style={{
            left: `${current.dog1Pos}%`,
            transition: 'left 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="absolute bottom-8 z-20"
        >
          <div className="relative text-center">
            <span className="text-[9px] font-bold bg-white/90 border border-amber-950 px-1 rounded-md text-amber-900 inline-block mb-1">
              Raju (Brown Indie)
            </span>
            <svg viewBox="0 0 100 80" className="w-24 h-20 overflow-visible drop-shadow-sm">
              <ellipse cx="50" cy="72" rx="26" ry="6" fill="#3d2314" opacity="0.2" />
              {/* Indie Body (Warm earthy brown) */}
              <ellipse cx="45" cy="48" rx="22" ry="15" fill="#854D0E" stroke="#3d2314" strokeWidth="2" />
              {/* Tail wags independently */}
              <path
                d="M 23 44 Q 14 30 18 20"
                stroke="#854D0E"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                className={current.dog1State === 'eat' ? 'animate-[wagSlow_0.7s_infinite]' : 'animate-[wagSlow_2s_infinite]'}
              />
              {/* Legs */}
              <rect x="32" y="58" width="5" height="15" rx="2" fill="#854D0E" stroke="#3d2314" strokeWidth="1.5" />
              <rect x="52" y="58" width="5" height="15" rx="2" fill="#854D0E" stroke="#3d2314" strokeWidth="1.5" />
              {/* Head with pointier Indie ears */}
              <g
                style={{
                  transform: current.dog1State === 'eat' ? 'translate(0, 10px) rotate(12deg)' : 'translate(0, 0)',
                  transformOrigin: '65px 35px',
                  transition: 'transform 0.5s ease',
                }}
              >
                <circle cx="68" cy="35" r="14" fill="#854D0E" stroke="#3d2314" strokeWidth="2" />
                {/* Perked brown ear */}
                <path d="M 64 22 L 60 10 L 70 20 Z" fill="#713F12" stroke="#3d2314" strokeWidth="1.5" />
                <circle cx="73" cy="32" r="2" fill="#3d2314" />
                <ellipse cx="78" cy="38" rx="6" ry="4" fill="#A16207" />
                <circle cx="82" cy="37" r="1.5" fill="#1C1917" />
              </g>
            </svg>
          </div>
        </div>

        {/* DOG 2: Spotted Rescue pup (Patch) */}
        <div
          style={{
            left: `${current.dog2Pos}%`,
            transition: 'left 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="absolute bottom-8 z-20"
        >
          <div className="relative text-center">
            <span className="text-[9px] font-bold bg-white/90 border border-amber-950 px-1 rounded-md text-amber-900 inline-block mb-1">
              Chotu (Spotted)
            </span>
            <svg viewBox="0 0 100 80" className="w-22 h-18 overflow-visible drop-shadow-sm">
              <ellipse cx="50" cy="72" rx="22" ry="5" fill="#3d2314" opacity="0.2" />
              {/* White body with dark spots */}
              <ellipse cx="45" cy="50" rx="19" ry="13" fill="#F8FAFC" stroke="#3d2314" strokeWidth="2" />
              <circle cx="40" cy="46" r="5" fill="#334155" />
              <circle cx="52" cy="53" r="4" fill="#334155" />
              {/* Tail */}
              <path
                d="M 26 46 Q 16 35 22 25"
                stroke="#F8FAFC"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                className={current.dog2State === 'eat' ? 'animate-[wagSlow_0.5s_infinite]' : 'animate-[wagSlow_1.6s_infinite]'}
              />
              <rect x="34" y="58" width="4.5" height="13" rx="2" fill="#F8FAFC" stroke="#3d2314" strokeWidth="1.5" />
              <rect x="50" y="58" width="4.5" height="13" rx="2" fill="#F8FAFC" stroke="#3d2314" strokeWidth="1.5" />
              {/* Head with eye patch */}
              <g
                style={{
                  transform: current.dog2State === 'eat' ? 'translate(0, 9px) rotate(14deg)' : 'translate(0, 0)',
                  transformOrigin: '65px 38px',
                  transition: 'transform 0.6s ease',
                }}
              >
                <circle cx="64" cy="38" r="12" fill="#F8FAFC" stroke="#3d2314" strokeWidth="2" />
                {/* Eye patch */}
                <ellipse cx="68" cy="36" rx="4" ry="5" fill="#334155" />
                <circle cx="68" cy="36" r="1.5" fill="#FFFFFF" />
                {/* Floppy ear */}
                <path d="M 58 30 C 52 35 54 45 58 42 Z" fill="#334155" stroke="#3d2314" strokeWidth="1.5" />
                <ellipse cx="72" cy="42" rx="4.5" ry="3" fill="#F1F5F9" />
                <circle cx="75" cy="41" r="1.2" fill="#0F172A" />
              </g>
            </svg>
          </div>
        </div>

        {/* DOG 3: Golden Street Dog (Sunny) */}
        <div
          style={{
            left: `${current.dog3Pos}%`,
            transition: 'left 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="absolute bottom-8 z-20"
        >
          <div className="relative text-center">
            <span className="text-[9px] font-bold bg-white/90 border border-amber-950 px-1 rounded-md text-amber-900 inline-block mb-1">
              Mani (Golden)
            </span>
            <svg viewBox="0 0 100 80" className="w-24 h-20 overflow-visible drop-shadow-sm">
              <ellipse cx="50" cy="72" rx="24" ry="5" fill="#3d2314" opacity="0.2" />
              {/* Golden body */}
              <ellipse cx="46" cy="49" rx="21" ry="14" fill="#D97706" stroke="#3d2314" strokeWidth="2" />
              {/* Tail */}
              <path
                d="M 25 45 Q 16 32 20 22"
                stroke="#D97706"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                className={current.dog3State === 'eat' ? 'animate-[wagSlow_0.8s_infinite]' : 'animate-[wagSlow_2.2s_infinite]'}
              />
              <rect x="34" y="59" width="5" height="14" rx="2" fill="#D97706" stroke="#3d2314" strokeWidth="1.5" />
              <rect x="52" y="59" width="5" height="14" rx="2" fill="#D97706" stroke="#3d2314" strokeWidth="1.5" />
              {/* Head */}
              <g
                style={{
                  transform: current.dog3State === 'eat' ? 'translate(0, 10px) rotate(10deg)' : 'translate(0, 0)',
                  transformOrigin: '66px 36px',
                  transition: 'transform 0.55s ease',
                }}
              >
                <circle cx="66" cy="36" r="13" fill="#D97706" stroke="#3d2314" strokeWidth="2" />
                <path d="M 60 25 L 56 14 L 66 22 Z" fill="#B45309" stroke="#3d2314" strokeWidth="1.5" />
                <circle cx="71" cy="33" r="2" fill="#3d2314" />
                <ellipse cx="76" cy="39" rx="5" ry="3.5" fill="#F59E0B" />
                <circle cx="79" cy="38" r="1.4" fill="#1C1917" />
              </g>
            </svg>
          </div>
        </div>

      </div>

      {/* Narrative Story Box */}
      <div className="bg-white border-2 border-amber-950 rounded-2xl p-4 shadow-[2px_2px_0px_#3d2314] mb-6">
        <p className="text-sm sm:text-base font-semibold text-amber-950 leading-relaxed">
          {current.desc}
        </p>
      </div>

      {/* Control Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {steps.map((st, idx) => (
            <button
              key={idx}
              onClick={() => advanceStep(idx)}
              className={`cartoon-btn px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                step === idx
                  ? 'bg-emerald-300 text-emerald-950 shadow-[2px_2px_0px_#3d2314]'
                  : 'bg-white text-amber-900/80 hover:bg-amber-50'
              }`}
            >
              <span>Stage {idx + 1}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={isDistributing}
            onClick={runFullSequence}
            className="cartoon-btn px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#3d2314]"
          >
            <Play className="w-3.5 h-3.5 fill-emerald-950" />
            <span>{isDistributing ? 'Providing Care...' : 'Distribute Food & Water 🥣'}</span>
          </button>

          <button
            onClick={() => advanceStep(0)}
            className="cartoon-btn p-2 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-xl text-xs font-bold"
            title="Reset scene"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
