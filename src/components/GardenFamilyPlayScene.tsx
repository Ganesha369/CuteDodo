import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Sun, Wind, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

type GardenPlayAction = 'frisbee' | 'ball' | 'bubbles' | 'treat' | 'bellyrub';

interface BubbleItem {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const GardenFamilyPlayScene: React.FC = () => {
  // Always paused and sound OFF until user clicks Play
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [currentAction, setCurrentAction] = useState<GardenPlayAction>('frisbee');
  const [toyPhase, setToyPhase] = useState<'throw' | 'fly' | 'caught'>('throw');
  const [bubbles, setBubbles] = useState<BubbleItem[]>([]);
  const [caption, setCaption] = useState('Game paused · Sound OFF ⏸️ Click Play to launch frisbees & catch with Dodo!');
  const [breezeActive, setBreezeActive] = useState(false);
  const [caughtCount, setCaughtCount] = useState(14);

  // Play loop for dynamic catch cycle - only active when user explicitly clicks Play
  useEffect(() => {
    if (!isPlaying) {
      setToyPhase('throw');
      return;
    }

    if (currentAction !== 'frisbee' && currentAction !== 'ball') {
      return;
    }

    // Sequence: Throw -> Fly -> Catch -> Repeat
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    const runCycle = () => {
      setToyPhase('throw');
      
      t1 = setTimeout(() => {
        setToyPhase('fly');
        if (soundEnabled && isPlaying) {
          sounds.whoosh();
        }
      }, 500);

      t2 = setTimeout(() => {
        setToyPhase('caught');
        if (soundEnabled && isPlaying) {
          sounds.bark();
          sounds.bell();
        }
        setCaughtCount((c) => c + 1);
      }, 1900);
    };

    runCycle();
    interval = setInterval(runCycle, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(interval);
    };
  }, [isPlaying, soundEnabled, currentAction]);

  // Initial peaceful bubbles cluster
  useEffect(() => {
    const initBubbles: BubbleItem[] = [
      { id: 1, x: 26, y: 32, size: 30, color: '#38BDF8' },
      { id: 2, x: 34, y: 20, size: 38, color: '#F472B6' },
      { id: 3, x: 44, y: 36, size: 26, color: '#FBBF24' },
      { id: 4, x: 54, y: 22, size: 34, color: '#34D399' },
      { id: 5, x: 64, y: 38, size: 28, color: '#A78BFA' },
    ];
    setBubbles(initBubbles);
  }, []);

  const popBubble = (id: number) => {
    if (soundEnabled && isPlaying) sounds.pop();
    setBubbles((prev) => prev.filter((b) => b.id !== id));
    setTimeout(() => {
      setBubbles((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: Math.floor(Math.random() * 50) + 20,
          y: Math.floor(Math.random() * 35) + 18,
          size: Math.floor(Math.random() * 18) + 24,
          color: ['#38BDF8', '#F472B6', '#FBBF24', '#34D399', '#A78BFA'][Math.floor(Math.random() * 5)],
        },
      ]);
    }, 1800);
  };

  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setSoundEnabled(true);
      sounds.pop();
      setCaption(
        currentAction === 'frisbee'
          ? 'Game running! Arjun launches the red frisbee — watch CuteDODO make an epic leap! 🥏'
          : currentAction === 'ball'
          ? 'Game running! Bouncing the neon tennis ball across the green lawn! 🎾'
          : `Game running! Enjoying sunny garden playtime with CuteDODO! 🐾`
      );
    } else {
      setIsPlaying(false);
      setSoundEnabled(false);
      setCaption('Game paused · Sound OFF ⏸️ Click Play whenever you want Dodo and Arjun to play again!');
    }
  };

  const handleActionSelect = (action: GardenPlayAction) => {
    setCurrentAction(action);
    switch (action) {
      case 'frisbee':
        if (soundEnabled && isPlaying) sounds.whoosh();
        setCaption(
          isPlaying
            ? 'Arjun throws the frisbee across the garden — Dodo is in hot pursuit! 🥏'
            : 'Frisbee selected! Press Play to start catching (Sound ON)! 🥏'
        );
        break;
      case 'ball':
        if (soundEnabled && isPlaying) sounds.boing();
        setCaption(
          isPlaying
            ? 'Tossing the bouncy tennis ball! Look at those happy paws sprinting! 🎾'
            : 'Tennis ball selected! Press Play to start fetching (Sound ON)! 🎾'
        );
        break;
      case 'bubbles':
        if (soundEnabled && isPlaying) sounds.pop();
        setCaption('Little Meera is blowing shimmering soap bubbles! Tap them to pop! 🫧');
        break;
      case 'treat':
        if (soundEnabled && isPlaying) sounds.bell();
        setCaption('Mom opens the golden treat tin — Dodo does his famous begging sit! 🦴✨');
        break;
      case 'bellyrub':
        if (soundEnabled && isPlaying) sounds.giggle();
        setCaption('Dad gives gentle tummy scratches under the mango tree — pure bliss! ❤️');
        break;
    }
  };

  const toggleBreeze = () => {
    if (soundEnabled && isPlaying) sounds.whoosh();
    setBreezeActive(!breezeActive);
  };

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden border-3 border-amber-950 shadow-[6px_8px_0px_#3d2314] select-none mb-14 bg-gradient-to-b from-sky-200 via-emerald-50 to-emerald-200"
      style={{ minHeight: '440px', height: '460px' }}
      aria-label="CuteDODO Garden Family Play Scene"
    >
      <style>{`
        @keyframes sunRaySpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes cloudFloat {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(18px); }
        }
        @keyframes flowerBreeze {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes butterflyFlap {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(0.2); }
        }
        @keyframes butterflyDrift1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -18px); }
        }
        @keyframes earJoyBounce {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-10deg) translateY(-2px); }
        }
        @keyframes dogTailJoy {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(18deg); }
        }
        @keyframes dogCatchLeap {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-14px, -20px) rotate(-8deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes frisbeeTrajectory {
          0% {
            left: 32%;
            top: 58%;
            transform: scale(0.85) rotate(0deg);
            opacity: 1;
          }
          50% {
            left: 55%;
            top: 36%;
            transform: scale(1.1) rotate(540deg);
            opacity: 1;
          }
          100% {
            left: 76%;
            top: 56%;
            transform: scale(0.9) rotate(1080deg);
            opacity: 0.95;
          }
        }
        @keyframes tennisBallBounce {
          0% {
            left: 32%;
            top: 60%;
            transform: scale(0.85);
          }
          30% {
            left: 48%;
            top: 38%;
            transform: scale(1.05);
          }
          60% {
            left: 64%;
            top: 66%;
            transform: scale(0.95);
          }
          100% {
            left: 77%;
            top: 57%;
            transform: scale(1);
          }
        }
      `}</style>

      {/* ============================================================ */}
      {/* 1. SKY, SUN, CLOUDS & DISTANT FOLIAGE                        */}
      {/* ============================================================ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#7dd3fc] via-[#bae6fd] to-[#d9f99d] opacity-90" />

        {/* Cheerful Sun */}
        <div className="absolute top-4 right-16 sm:right-28 w-20 h-20 sm:w-22 sm:h-22">
          <div
            className="absolute inset-0"
            style={{
              animation: 'sunRaySpin 20s linear infinite',
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400 opacity-80">
              {Array.from({ length: 12 }).map((_, i) => (
                <rect
                  key={i}
                  x="48"
                  y="2"
                  width="4"
                  height="14"
                  rx="2"
                  fill="#F59E0B"
                  transform={`rotate(${i * 30} 50 50)`}
                />
              ))}
            </svg>
          </div>
          {/* Sun Face */}
          <div className="absolute inset-2.5 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 border-2.5 border-amber-950 shadow-[2px_2px_0px_#3d2314] flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-8 h-8">
              <rect x="6" y="14" width="11" height="8" rx="2" fill="#1E293B" stroke="#000" strokeWidth="1" />
              <rect x="23" y="14" width="11" height="8" rx="2" fill="#1E293B" stroke="#000" strokeWidth="1" />
              <line x1="17" y1="17" x2="23" y2="17" stroke="#1E293B" strokeWidth="2" />
              <line x1="8" y1="16" x2="14" y2="16" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />
              <line x1="25" y1="16" x2="31" y2="16" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />
              <path d="M 12 25 Q 20 31 28 25" stroke="#3D2314" strokeWidth="2" fill="none" strokeLinecap="round" />
              <circle cx="8" cy="24" r="2.5" fill="#FB7185" opacity="0.7" />
              <circle cx="32" cy="24" r="2.5" fill="#FB7185" opacity="0.7" />
            </svg>
          </div>
        </div>

        {/* Fluffy Cartoon Clouds */}
        <div
          className="absolute top-6 left-12 sm:left-24 opacity-85"
          style={{ animation: 'cloudFloat 7s ease-in-out infinite' }}
        >
          <svg viewBox="0 0 120 60" className="w-24 sm:w-28 h-12">
            <path
              d="M 20 40 A 18 18 0 0 1 45 25 A 24 24 0 0 1 85 24 A 18 18 0 0 1 105 40 Z"
              fill="#FFFFFF"
              stroke="#3D2314"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Distant Coconut & Mango Trees */}
        <div className="absolute bottom-28 inset-x-0 h-28 flex justify-between px-6 sm:px-14 opacity-55">
          <svg viewBox="0 0 200 160" className="w-32 h-26 text-emerald-800" fill="currentColor">
            <path d="M 60 160 Q 55 100 50 40" stroke="#78350F" strokeWidth="6" fill="none" />
            <path d="M 50 40 Q 20 20 0 45" stroke="#065F46" strokeWidth="4" fill="none" />
            <path d="M 50 40 Q 30 10 20 0" stroke="#065F46" strokeWidth="4" fill="none" />
            <path d="M 50 40 Q 70 10 90 20" stroke="#065F46" strokeWidth="4" fill="none" />
            <path d="M 50 40 Q 80 35 95 60" stroke="#065F46" strokeWidth="4" fill="none" />
          </svg>
          <svg viewBox="0 0 200 160" className="w-36 h-28 text-emerald-700 hidden sm:block" fill="currentColor">
            <path d="M 100 160 L 100 90" stroke="#5C2B10" strokeWidth="12" fill="none" />
            <circle cx="100" cy="70" r="45" fill="#047857" />
            <circle cx="75" cy="65" r="30" fill="#059669" />
            <circle cx="125" cy="65" r="30" fill="#10B981" />
          </svg>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. THE LUSH LAWN & SWAYING GARDEN FLOWERS                    */}
      {/* ============================================================ */}
      <div className="absolute bottom-0 inset-x-0 h-40 sm:h-44 z-10 pointer-events-none">
        {/* Rolling Green Turf */}
        <div className="absolute bottom-0 inset-x-0 h-36 sm:h-40 bg-gradient-to-b from-[#86efac] via-[#4ade80] to-[#15803d] border-t-3 border-amber-950 rounded-t-[36px] shadow-inner" />

        {/* Subtle grass tufts */}
        <div className="absolute bottom-14 inset-x-0 flex justify-around px-4 opacity-35">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="text-emerald-950 text-sm font-black">
              𝒱
            </div>
          ))}
        </div>

        {/* Swaying Flowers along bottom borders */}
        <div className="absolute bottom-5 inset-x-0 flex justify-between px-6 sm:px-12">
          {[
            { color: '#EF4444', center: '#FBBF24' },
            { color: '#EC4899', center: '#FEF08A' },
            { color: '#F59E0B', center: '#7C2D12' },
            { color: '#8B5CF6', center: '#FEF08A' },
            { color: '#EF4444', center: '#FDE047' },
            { color: '#38BDF8', center: '#FFFFFF' },
          ].map((flower, idx) => (
            <div
              key={idx}
              className="origin-bottom"
              style={{ animation: 'flowerBreeze 3s ease-in-out infinite', animationDelay: `${idx * 0.3}s` }}
            >
              <svg viewBox="0 0 30 50" className="w-5 sm:w-7 h-9 sm:h-11 overflow-visible">
                <path d="M 15 50 Q 14 30 15 15" stroke="#166534" strokeWidth="2.5" fill="none" />
                <ellipse cx="10" cy="35" rx="5" ry="2.5" fill="#22C55E" stroke="#166534" strokeWidth="0.8" transform="rotate(-25 10 35)" />
                <circle cx="15" cy="15" r="8" fill={flower.color} stroke="#3D2314" strokeWidth="1.2" />
                <circle cx="15" cy="15" r="4" fill={flower.center} stroke="#3D2314" strokeWidth="1" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. FLUTTERING BUTTERFLIES                                    */}
      {/* ============================================================ */}
      <div
        className="absolute top-28 left-1/3 z-25 pointer-events-none"
        style={{ animation: 'butterflyDrift1 6s ease-in-out infinite' }}
      >
        <div style={{ animation: 'butterflyFlap 0.25s ease-in-out infinite' }}>
          <svg viewBox="0 0 30 24" className="w-6 h-5 drop-shadow-xs">
            <ellipse cx="9" cy="8" rx="7" ry="6" fill="#F43F5E" stroke="#3D2314" strokeWidth="1" />
            <ellipse cx="21" cy="8" rx="7" ry="6" fill="#F43F5E" stroke="#3D2314" strokeWidth="1" />
            <ellipse cx="11" cy="17" rx="5" ry="4" fill="#FDE047" stroke="#3D2314" strokeWidth="1" />
            <ellipse cx="19" cy="17" rx="5" ry="4" fill="#FDE047" stroke="#3D2314" strokeWidth="1" />
            <line x1="15" y1="4" x2="15" y2="20" stroke="#3D2314" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. COMPOSITION GRID: 3 BALANCED ZONES                        */}
      {/* ============================================================ */}
      
      {/* ZONE A (LEFT): Mom & Dad on Picnic Blanket + Sister Meera */}
      <div className="absolute bottom-12 sm:bottom-16 left-3 sm:left-6 z-20 flex items-end gap-3 sm:gap-4 pointer-events-auto">
        
        {/* Picnic Area */}
        <div className="relative">
          {/* Blanket */}
          <div className="w-28 sm:w-36 h-7 sm:h-9 bg-rose-200 border-2.5 border-amber-950 rounded-2xl shadow-[2.5px_2.5px_0px_#3d2314] overflow-hidden rotate-[-1.5deg]">
            <div className="w-full h-full bg-[radial-gradient(#e11d48_2px,transparent_2px)] [background-size:8px_8px] opacity-40" />
          </div>

          {/* Chennai Filter Coffee Davarah */}
          <div className="absolute bottom-1 right-2 w-4 h-5">
            <svg viewBox="0 0 20 28" className="w-full h-full">
              <rect x="3" y="10" width="14" height="15" rx="1" fill="#D97706" stroke="#3D2314" strokeWidth="1" />
              <rect x="1" y="22" width="18" height="5" rx="1" fill="#B45309" stroke="#3D2314" strokeWidth="1" />
              <path d="M 7 6 Q 9 2 7 0" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.8" className="animate-pulse" />
              <path d="M 12 7 Q 14 3 12 1" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.8" className="animate-pulse" />
            </svg>
          </div>

          {/* Seated Parents */}
          <div className="absolute -top-14 sm:-top-17 left-1 flex items-end gap-1">
            {/* Dad in Teal Kurta */}
            <svg viewBox="0 0 60 70" className="w-11 sm:w-14 h-13 sm:h-16 overflow-visible">
              <circle cx="30" cy="18" r="11" fill="#FBBF24" stroke="#3D2314" strokeWidth="1.8" />
              <path d="M 19 16 C 19 8 41 8 41 16 Z" fill="#1C1917" />
              <path d="M 24 18 Q 27 15 30 18" stroke="#3D2314" strokeWidth="1.5" fill="none" />
              <path d="M 33 18 Q 36 15 39 18" stroke="#3D2314" strokeWidth="1.5" fill="none" />
              <path d="M 27 24 Q 31 27 35 24" stroke="#3D2314" strokeWidth="1.5" fill="none" />
              <path d="M 16 35 L 44 35 L 42 65 L 18 65 Z" fill="#0D9488" stroke="#3D2314" strokeWidth="1.8" />
              <path d="M 40 40 Q 52 30 54 22" stroke="#0D9488" strokeWidth="5" strokeLinecap="round" fill="none" />
              <circle cx="54" cy="21" r="3" fill="#FBBF24" stroke="#3D2314" strokeWidth="1" />
            </svg>

            {/* Mom in Golden Yellow Saree */}
            <svg viewBox="0 0 60 70" className="w-10 sm:w-13 h-12 sm:h-15 overflow-visible">
              <circle cx="30" cy="18" r="10" fill="#FCD34D" stroke="#3D2314" strokeWidth="1.8" />
              <ellipse cx="18" cy="16" rx="6" ry="7" fill="#1C1917" />
              <ellipse cx="14" cy="16" rx="3.5" ry="3.5" fill="#FFFFFF" stroke="#3D2314" strokeWidth="0.8" />
              <path d="M 21 16 C 21 9 39 9 39 16 Z" fill="#1C1917" />
              <circle cx="30" cy="14" r="1.3" fill="#DC2626" />
              <circle cx="26" cy="18" r="1.2" fill="#1C1917" />
              <circle cx="34" cy="18" r="1.2" fill="#1C1917" />
              <path d="M 27 23 Q 30 26 33 23" stroke="#3D2314" strokeWidth="1.4" fill="none" />
              <path d="M 18 34 L 42 34 L 40 64 L 20 64 Z" fill="#F59E0B" stroke="#3D2314" strokeWidth="1.8" />
              <ellipse cx="30" cy="42" rx="4" ry="2.5" fill="#FCD34D" stroke="#3D2314" strokeWidth="1" className="animate-pulse" />
            </svg>
          </div>
        </div>

        {/* Little Sister Meera (Blowing Bubbles) */}
        <div
          className="relative cursor-pointer group"
          onClick={() => handleActionSelect('bubbles')}
          title="Click Meera to blow bubbles!"
        >
          <svg viewBox="0 0 50 80" className="w-11 sm:w-14 h-17 sm:h-21 overflow-visible">
            <circle cx="10" cy="18" r="4.5" fill="#1C1917" />
            <circle cx="40" cy="18" r="4.5" fill="#1C1917" />
            <polygon points="9,18 11,20 10,22" fill="#EC4899" />
            <polygon points="39,18 41,20 40,22" fill="#EC4899" />
            <circle cx="25" cy="22" r="10.5" fill="#FDE68A" stroke="#3D2314" strokeWidth="1.8" />
            <path d="M 16 19 C 16 13 34 13 34 19 Z" fill="#1C1917" />
            <circle cx="21" cy="22" r="2.2" fill="#1C1917" />
            <circle cx="21" cy="21" r="0.7" fill="#FFFFFF" />
            <circle cx="29" cy="22" r="2.2" fill="#1C1917" />
            <circle cx="29" cy="21" r="0.7" fill="#FFFFFF" />
            <ellipse cx="25" cy="28" rx="2" ry="1.5" fill="#F43F5E" stroke="#3D2314" strokeWidth="1" />
            <path d="M 18 36 L 32 36 L 38 60 L 12 60 Z" fill="#F472B6" stroke="#3D2314" strokeWidth="1.8" />
            <path d="M 28 42 L 38 32" stroke="#3D2314" strokeWidth="1.5" />
            <circle cx="40" cy="30" r="3.5" fill="none" stroke="#0284C7" strokeWidth="1.5" />
            <rect x="18" y="60" width="3.5" height="11" fill="#FDE68A" stroke="#3D2314" strokeWidth="1" />
            <rect x="28" y="60" width="3.5" height="11" fill="#FDE68A" stroke="#3D2314" strokeWidth="1" />
            <ellipse cx="19" cy="72" rx="3.5" ry="2" fill="#DC2626" stroke="#3D2314" strokeWidth="1" />
            <ellipse cx="29" cy="72" rx="3.5" ry="2" fill="#DC2626" stroke="#3D2314" strokeWidth="1" />
          </svg>
        </div>

      </div>

      {/* ZONE B (CENTER-LEFT): Little Brother Arjun Throwing */}
      <div
        className="absolute bottom-11 sm:bottom-15 left-[30%] sm:left-[32%] z-20 cursor-pointer group pointer-events-auto"
        onClick={() => {
          if (!isPlaying) {
            togglePlay();
          } else {
            handleActionSelect(currentAction === 'frisbee' ? 'ball' : 'frisbee');
          }
        }}
        title="Click Arjun to throw!"
      >
        <svg viewBox="0 0 65 95" className="w-13 sm:w-18 h-20 sm:h-26 overflow-visible">
          <path d="M 22 17 Q 35 11 48 17 L 55 18 L 48 22 Z" fill="#3B82F6" stroke="#3D2314" strokeWidth="1.5" />
          <circle cx="35" cy="24" r="11" fill="#FDE68A" stroke="#3D2314" strokeWidth="1.8" />
          <path d="M 26 22 C 26 18 44 18 44 22 Z" fill="#1C1917" />
          <circle cx="30" cy="24" r="2.2" fill="#1C1917" />
          <path d="M 37 24 Q 40 22 43 24" stroke="#3D2314" strokeWidth="2" fill="none" />
          <path d="M 32 30 Q 36 34 40 30" stroke="#3D2314" strokeWidth="2" fill="#F43F5E" />
          <path d="M 25 40 L 45 40 L 47 65 L 23 65 Z" fill="#F97316" stroke="#3D2314" strokeWidth="1.8" />
          <line x1="24" y1="48" x2="46" y2="48" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="24" y1="56" x2="46" y2="56" stroke="#FFFFFF" strokeWidth="2" />
          {/* Throwing Arm */}
          <path
            d="M 43 45 Q 56 36 62 30"
            stroke="#FDE68A"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            className={toyPhase === 'throw' ? 'animate-bounce' : ''}
          />
          <path d="M 23 65 L 47 65 L 45 76 L 36 76 L 35 72 L 34 76 L 25 76 Z" fill="#1D4ED8" stroke="#3D2314" strokeWidth="1.5" />
          <line x1="28" y1="76" x2="24" y2="90" stroke="#FDE68A" strokeWidth="4" strokeLinecap="round" />
          <line x1="42" y1="76" x2="48" y2="90" stroke="#FDE68A" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="23" cy="91" rx="4.5" ry="2.5" fill="#EF4444" stroke="#3D2314" strokeWidth="1" />
          <ellipse cx="49" cy="91" rx="4.5" ry="2.5" fill="#EF4444" stroke="#3D2314" strokeWidth="1" />
        </svg>
      </div>

      {/* ============================================================ */}
      {/* 5. INTERACTIVE SOAP BUBBLES                                  */}
      {/* ============================================================ */}
      {bubbles.map((b) => (
        <div
          key={b.id}
          onClick={() => popBubble(b.id)}
          className="absolute z-25 cursor-pointer transition-transform hover:scale-125"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
          }}
          title="Click to pop bubble!"
        >
          <div
            className="w-full h-full rounded-full border-2 border-white/80 shadow-[inset_3px_3px_6px_rgba(255,255,255,0.8),0_0_8px_rgba(255,255,255,0.4)] backdrop-blur-xs relative overflow-hidden"
            style={{
              background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), ${b.color}40 60%, ${b.color}80 100%)`,
            }}
          >
            <div className="absolute top-1 left-1.5 w-2 h-2 rounded-full bg-white opacity-85" />
          </div>
        </div>
      ))}

      {/* ============================================================ */}
      {/* 6. TOY FLIGHT CORRIDOR (DYNAMIC PARABOLIC ARC)               */}
      {/* ============================================================ */}
      {isPlaying && currentAction === 'frisbee' && (
        <div
          className="absolute z-30 pointer-events-none"
          style={{
            animation: 'frisbeeTrajectory 4.2s ease-in-out infinite',
          }}
        >
          <div className="relative w-11 sm:w-13 h-5 rounded-full bg-gradient-to-b from-rose-500 via-rose-600 to-amber-500 border-2 border-amber-950 shadow-[0_4px_6px_rgba(0,0,0,0.3)] flex items-center justify-center">
            <div className="w-7 h-1.5 rounded-full border border-amber-200/80" />
            <div className="absolute inset-0 flex items-center justify-center text-[7px] font-black text-white uppercase tracking-wider">
              DODO
            </div>
          </div>
        </div>
      )}

      {isPlaying && currentAction === 'ball' && (
        <div
          className="absolute z-30 pointer-events-none"
          style={{
            animation: 'tennisBallBounce 4.2s ease-in-out infinite',
          }}
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-lime-400 border-2.5 border-amber-950 shadow-[2px_3px_0px_#3d2314] relative overflow-hidden">
            <svg viewBox="0 0 40 40" className="w-full h-full">
              <path d="M 5 20 C 15 20 20 15 20 5" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M 35 20 C 25 20 20 25 20 35" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      )}

      {currentAction === 'treat' && (
        <div className="absolute top-32 right-36 sm:right-48 z-30 animate-bounce">
          <div className="flex items-center">
            <div className="w-3 h-5 rounded-full bg-amber-400 border border-amber-950 -mr-1" />
            <div className="w-8 h-3.5 bg-amber-300 border-y border-amber-950" />
            <div className="w-3 h-5 rounded-full bg-amber-400 border border-amber-950 -ml-1" />
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 7. ZONE C (RIGHT): CUTEDODO THE PLAYFUL STAR                 */}
      {/* ============================================================ */}
      <div
        className="absolute bottom-10 sm:bottom-14 right-6 sm:right-16 z-25 select-none cursor-pointer"
        style={{
          animation:
            currentAction === 'bellyrub'
              ? 'earJoyBounce 1s ease-in-out infinite'
              : toyPhase === 'caught'
              ? 'dogCatchLeap 0.8s ease-in-out'
              : 'none',
        }}
        onClick={() => {
          if (soundEnabled && isPlaying) {
            sounds.bark();
            sounds.bell();
          }
          setCaughtCount((c) => c + 1);
        }}
        title="Click CuteDODO to hear a happy bark!"
      >
        {/* Catch Score Pop */}
        {toyPhase === 'caught' && (currentAction === 'frisbee' || currentAction === 'ball') && (
          <div className="absolute -top-10 -left-6 z-30 flex items-center gap-1 bg-amber-300 border-2 border-amber-950 px-2.5 py-0.5 rounded-full shadow-[2px_2px_0px_#3d2314] text-[10px] font-black uppercase text-amber-950 animate-bounce">
            <Sparkles className="w-3 h-3 text-amber-950" />
            <span>CATCH! +10 XP</span>
          </div>
        )}

        {/* CuteDODO Vector Rig */}
        <svg viewBox="0 0 120 95" className="w-28 sm:w-34 h-22 sm:h-26 overflow-visible drop-shadow-md">
          {/* Fluffy Wagging Tail */}
          <g
            style={{
              transformOrigin: '28px 54px',
              animation: 'dogTailJoy 0.6s ease-in-out infinite',
            }}
          >
            <path
              d="M 28 54 C 14 42 12 28 20 22 C 28 24 28 36 24 48 Z"
              fill="#F5F5F4"
              stroke="#3D2314"
              strokeWidth="2.2"
            />
            <path d="M 18 26 C 22 22 26 24 24 30 Z" fill="#FFFFFF" />
          </g>

          {/* Body */}
          <ellipse cx="58" cy="58" rx="30" ry="22" fill="#FFFBEB" stroke="#3D2314" strokeWidth="2.5" />
          <path d="M 45 42 C 58 40 70 48 68 62 C 60 70 45 68 45 54 Z" fill="#D97706" />

          {/* Running Paws */}
          <ellipse cx="38" cy="76" rx="6.5" ry="4.5" fill="#FFFBEB" stroke="#3D2314" strokeWidth="2" />
          <ellipse cx="48" cy="78" rx="6.5" ry="4.5" fill="#FFFBEB" stroke="#3D2314" strokeWidth="2" />
          <ellipse cx="75" cy="78" rx="7" ry="4.8" fill="#FFFBEB" stroke="#3D2314" strokeWidth="2" />
          <ellipse cx="86" cy="75" rx="7" ry="4.8" fill="#FFFBEB" stroke="#3D2314" strokeWidth="2" />

          {/* Collar with Bell */}
          <path d="M 68 46 Q 78 54 88 46" stroke="#DC2626" strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="78" cy="52" r="4.5" fill="#FBBF24" stroke="#3D2314" strokeWidth="1.5" />
          <line x1="75" y1="54" x2="81" y2="54" stroke="#78350F" strokeWidth="1" />

          {/* Head */}
          <circle cx="85" cy="38" r="20" fill="#FFFBEB" stroke="#3D2314" strokeWidth="2.5" />
          <path d="M 72 32 C 72 24 84 22 88 28 C 88 36 78 38 72 32 Z" fill="#D97706" />
          <path d="M 94 32 C 94 24 104 22 106 28 C 106 36 98 38 94 32 Z" fill="#D97706" />

          {/* Ears with Joy Bounce */}
          <g style={{ animation: 'earJoyBounce 0.8s ease-in-out infinite' }}>
            <ellipse cx="72" cy="40" rx="6.5" ry="14" fill="#B45309" stroke="#3D2314" strokeWidth="2" transform="rotate(-18 72 40)" />
            <ellipse cx="100" cy="40" rx="6.5" ry="14" fill="#B45309" stroke="#3D2314" strokeWidth="2" transform="rotate(18 100 40)" />
          </g>

          {/* Big Sparkling Cartoon Eyes */}
          <ellipse cx="80" cy="36" rx="3.5" ry="4.5" fill="#1C1917" />
          <circle cx="81" cy="34" r="1.4" fill="#FFFFFF" />
          <circle cx="79" cy="38" r="0.8" fill="#FFFFFF" />

          <ellipse cx="94" cy="36" rx="3.5" ry="4.5" fill="#1C1917" />
          <circle cx="95" cy="34" r="1.4" fill="#FFFFFF" />
          <circle cx="93" cy="38" r="0.8" fill="#FFFFFF" />

          {/* Cute Muzzle & Button Nose */}
          <ellipse cx="87" cy="44" rx="6.5" ry="4.5" fill="#FEF3C7" stroke="#3D2314" strokeWidth="1.5" />
          <ellipse cx="87" cy="42" rx="3" ry="2.2" fill="#1C1917" />

          {/* Mouth with Tongue */}
          <path d="M 83 46 Q 87 50 91 46" stroke="#3D2314" strokeWidth="1.8" fill="none" />
          <path d="M 85 47 Q 87 55 89 47" fill="#FB7185" stroke="#3D2314" strokeWidth="1.2" />

          {/* Topknot Red Ribbon */}
          <polygon points="85,18 89,18 87,14" fill="#EF4444" stroke="#3D2314" strokeWidth="1.2" />
          <circle cx="87" cy="18" r="2.5" fill="#FBBF24" stroke="#3D2314" strokeWidth="1" />
        </svg>

        {/* Happy Hearts popping up */}
        <div className="absolute -top-3 right-2 text-rose-500 animate-bounce">
          <Heart className="w-5 h-5 fill-rose-500 text-amber-950" />
        </div>
      </div>

      {/* Centered Play Prompt Badge when game is paused */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <button
            onClick={togglePlay}
            className="pointer-events-auto cartoon-btn px-4 py-2 sm:px-6 sm:py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-black font-heading text-xs sm:text-sm rounded-2xl border-2 border-amber-950 shadow-[3px_4px_0px_#3d2314] flex items-center gap-2 animate-bounce active:scale-95 transition-all"
            title="Click to play game and enable sound"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Play Game &amp; Turn Sound ON</span>
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* 8. TOP HUD: ACTION CONTROLS & STATUS BAR                     */}
      {/* ============================================================ */}
      <div className="absolute top-2.5 sm:top-3.5 left-2 sm:left-5 z-40 flex items-center gap-1.5 sm:gap-2 flex-wrap max-w-[calc(100%-110px)] sm:max-w-none">
        {/* Play / Pause Button */}
        <button
          onClick={togglePlay}
          className={`cartoon-btn flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-black shrink-0 transition-all shadow-[2px_2px_0px_#3d2314] active:translate-y-0.5 border-2 border-amber-950 ${
            isPlaying
              ? 'bg-amber-400 hover:bg-amber-500 text-amber-950'
              : 'bg-emerald-500 hover:bg-emerald-400 text-white animate-pulse'
          }`}
          title={isPlaying ? "Pause game" : "Play game (Sound ON)"}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Play Game</span>
            </>
          )}
        </button>

        {/* Audio Mute/Unmute quick toggle */}
        <button
          onClick={() => {
            const next = !soundEnabled;
            setSoundEnabled(next);
            if (next && isPlaying) sounds.pop();
          }}
          className={`cartoon-btn flex items-center gap-1 px-2 py-1 rounded-xl text-[11px] font-bold border-2 border-amber-950 transition-all shadow-[1.5px_1.5px_0px_#3d2314] ${
            soundEnabled && isPlaying
              ? 'bg-amber-300 text-amber-950'
              : 'bg-white/95 text-zinc-600'
          }`}
          title={soundEnabled && isPlaying ? "Mute garden sounds" : "Enable garden sounds"}
        >
          {soundEnabled && isPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-amber-950" />
              <span className="hidden sm:inline">Sound ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
              <span className="hidden sm:inline">Sound OFF</span>
            </>
          )}
        </button>

        <span className="text-xs font-black text-amber-950 bg-amber-300 border-2 border-amber-950 px-2 py-1 rounded-xl shadow-[1.5px_1.5px_0px_#3d2314] shrink-0 hidden md:inline font-cartoon">
          🎬 Play With Dodo:
        </span>

        {[
          { id: 'frisbee', label: '🥏 Frisbee' },
          { id: 'ball', label: '🎾 Ball' },
          { id: 'bubbles', label: '🫧 Bubbles' },
          { id: 'treat', label: '🦴 Treat' },
          { id: 'bellyrub', label: '❤️ Belly Rubs' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => handleActionSelect(item.id as GardenPlayAction)}
            className={`cartoon-btn px-2 sm:px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all border-2 border-amber-950 ${
              currentAction === item.id
                ? 'bg-amber-400 text-amber-950 shadow-[2px_2px_0px_#3d2314] -translate-y-0.5'
                : 'bg-white/95 text-amber-950 hover:bg-amber-100 shadow-[1px_1px_0px_#3d2314]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Top Right Quick Toggles */}
      <div className="absolute top-2.5 sm:top-3.5 right-2 sm:right-5 z-40 flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={toggleBreeze}
          className={`cartoon-btn p-1.5 rounded-xl border-2 border-amber-950 text-xs font-bold transition-all shadow-[1.5px_1.5px_0px_#3d2314] ${
            breezeActive ? 'bg-sky-300 text-amber-950' : 'bg-white text-amber-950'
          }`}
          title="Toggle garden breeze"
        >
          <Wind className={`w-3.5 h-3.5 ${breezeActive ? 'animate-spin' : ''}`} />
        </button>

        <div className="bg-amber-400 border-2 border-amber-950 px-2 sm:px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-black text-amber-950 shadow-[2px_2px_0px_#3d2314] flex items-center gap-1 shrink-0">
          <span className="hidden sm:inline">🏆 Catches:</span>
          <span className="sm:hidden">🏆</span>
          <span className="font-mono text-amber-950">{caughtCount}</span>
        </div>
      </div>

      {/* Bottom Subtitle / Story Caption */}
      <div className="absolute bottom-2 inset-x-3 sm:inset-x-6 z-30 flex items-center justify-between gap-2 pointer-events-none">
        <div className="bg-white/95 border-2 border-amber-950 rounded-xl px-3 py-1 text-xs font-bold text-amber-950 shadow-[2px_2px_0px_#3d2314] max-w-xl truncate">
          <span className="text-amber-800 mr-1.5">🌟 Garden Story:</span>
          <span>{caption}</span>
        </div>
        <div className="hidden md:flex items-center gap-1 text-[11px] font-bold text-emerald-900 bg-emerald-100/90 border border-emerald-800 px-2.5 py-1 rounded-xl">
          <span>🌿 Chennai Suburban Garden · Family Happiness</span>
        </div>
      </div>

    </div>
  );
};
