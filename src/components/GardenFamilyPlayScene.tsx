import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Sun, Wind, Volume2, Play, Pause } from 'lucide-react';
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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentAction, setCurrentAction] = useState<GardenPlayAction>('frisbee');
  const [toyPhase, setToyPhase] = useState<'idle' | 'flying' | 'caught'>('idle');
  const [bubbles, setBubbles] = useState<BubbleItem[]>([]);
  const [caption, setCaption] = useState('Game paused · Click the Play button to play catch with CuteDODO and Arjun! 🐾');
  const [breezeActive, setBreezeActive] = useState(false);
  const [caughtCount, setCaughtCount] = useState(12);

  // Game loop: ONLY runs when isPlaying is true and frisbee or ball is active
  useEffect(() => {
    if (!isPlaying) {
      setToyPhase('idle');
      return;
    }

    if (currentAction !== 'frisbee' && currentAction !== 'ball') return;

    setToyPhase('flying');
    sounds.whoosh();

    const timer = setTimeout(() => {
      setToyPhase('caught');
      sounds.bark();
      sounds.coin();
      setCaughtCount((c) => c + 1);
    }, 1400);

    const resetTimer = setTimeout(() => {
      setToyPhase('flying');
      sounds.whoosh();
    }, 3200);

    const interval = setInterval(() => {
      setToyPhase('caught');
      sounds.bark();
      setCaughtCount((c) => c + 1);
      setTimeout(() => {
        setToyPhase('flying');
        sounds.whoosh();
      }, 1600);
    }, 4200);

    return () => {
      clearTimeout(timer);
      clearTimeout(resetTimer);
      clearInterval(interval);
    };
  }, [isPlaying, currentAction]);

  // Initial bubble cluster
  useEffect(() => {
    const initBubbles: BubbleItem[] = [
      { id: 1, x: 28, y: 35, size: 34, color: '#38BDF8' },
      { id: 2, x: 38, y: 22, size: 42, color: '#F472B6' },
      { id: 3, x: 50, y: 40, size: 28, color: '#FBBF24' },
      { id: 4, x: 62, y: 26, size: 38, color: '#34D399' },
      { id: 5, x: 74, y: 48, size: 30, color: '#A78BFA' },
    ];
    setBubbles(initBubbles);
  }, []);

  const popBubble = (id: number) => {
    sounds.pop();
    setBubbles((prev) => prev.filter((b) => b.id !== id));
    // Spawn a new one after 2 seconds
    setTimeout(() => {
      setBubbles((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: Math.floor(Math.random() * 60) + 20,
          y: Math.floor(Math.random() * 45) + 15,
          size: Math.floor(Math.random() * 20) + 26,
          color: ['#38BDF8', '#F472B6', '#FBBF24', '#34D399', '#A78BFA'][Math.floor(Math.random() * 5)],
        },
      ]);
    }, 2000);
  };

  const togglePlay = () => {
    sounds.pop();
    if (!isPlaying) {
      setIsPlaying(true);
      setCaption(
        currentAction === 'frisbee'
          ? 'Game running! Arjun launches the bright red frisbee — watch Dodo leap to catch it! 🥏'
          : currentAction === 'ball'
          ? 'Game running! Bouncing the neon tennis ball across the green lawn! 🎾'
          : `Game running! Playing ${currentAction} with CuteDODO! 🐾`
      );
    } else {
      setIsPlaying(false);
      setToyPhase('idle');
      setCaption('Game paused ⏸️ Click the small Play button whenever you want Dodo to fetch again!');
    }
  };

  const handleActionSelect = (action: GardenPlayAction) => {
    setCurrentAction(action);
    switch (action) {
      case 'frisbee':
        if (isPlaying) sounds.whoosh();
        setCaption(
          isPlaying
            ? 'Arjun launches the bright red frisbee high across the lawn — Dodo is in hot pursuit! 🥏'
            : 'Frisbee chosen! Click the small Play button to watch Arjun throw and Dodo catch! 🥏'
        );
        break;
      case 'ball':
        if (isPlaying) sounds.boing();
        setCaption(
          isPlaying
            ? 'Tossing the bouncy neon tennis ball! Look at those happy paws sprinting! 🎾'
            : 'Tennis ball chosen! Click the small Play button to start the game! 🎾'
        );
        break;
      case 'bubbles':
        sounds.pop();
        setCaption('Little Meera is blowing shimmering soap bubbles! Tap them to pop! 🫧');
        break;
      case 'treat':
        sounds.bell();
        setCaption('Mom opens the golden treat tin — Dodo does his famous begging sit! 🦴✨');
        break;
      case 'bellyrub':
        sounds.giggle();
        setCaption('Dad gives gentle tummy scratches under the mango tree — pure bliss! ❤️');
        break;
    }
  };

  const toggleBreeze = () => {
    sounds.whoosh();
    setBreezeActive(!breezeActive);
  };

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden border-3 border-amber-950 shadow-[6px_8px_0px_#3d2314] select-none mb-14 bg-linear-to-b from-sky-200 via-emerald-50 to-emerald-200"
      style={{ minHeight: '440px' }}
      aria-label="CuteDODO Garden Family Play Scene"
    >
      {/* ============================================================ */}
      {/* 1. SKY, SUN, CLOUDS & DISTANT TREES                          */}
      {/* ============================================================ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft pastel sky gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-[#7dd3fc] via-[#bae6fd] to-[#d9f99d] opacity-90" />

        {/* Happy Smiling Cartoon Sun with Spinning Rays */}
        <div className="absolute top-4 right-8 sm:right-16 w-20 h-20 sm:w-24 sm:h-24">
          {/* Rotating rays */}
          <div className="absolute inset-0 animate-sun-spin">
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
          {/* Golden Sun Face */}
          <div className="absolute inset-3 rounded-full bg-linear-to-br from-amber-300 via-amber-400 to-amber-500 border-2.5 border-amber-950 shadow-[2px_2px_0px_#3d2314] flex items-center justify-center">
            {/* Sunglasses / Cheerful cartoon face */}
            <svg viewBox="0 0 40 40" className="w-8 h-8">
              {/* Cool Cartoon Sunglasses */}
              <rect x="6" y="14" width="11" height="8" rx="2" fill="#1E293B" stroke="#000" strokeWidth="1" />
              <rect x="23" y="14" width="11" height="8" rx="2" fill="#1E293B" stroke="#000" strokeWidth="1" />
              <line x1="17" y1="17" x2="23" y2="17" stroke="#1E293B" strokeWidth="2" />
              {/* White glint on glasses */}
              <line x1="8" y1="16" x2="14" y2="16" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />
              <line x1="25" y1="16" x2="31" y2="16" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />
              {/* Cheerful wide smile */}
              <path d="M 12 25 Q 20 31 28 25" stroke="#3D2314" strokeWidth="2" fill="none" strokeLinecap="round" />
              {/* Rosy pink cheeks */}
              <circle cx="8" cy="24" r="2.5" fill="#FB7185" opacity="0.7" />
              <circle cx="32" cy="24" r="2.5" fill="#FB7185" opacity="0.7" />
            </svg>
          </div>
        </div>

        {/* Fluffy Cartoon Clouds */}
        <div className="absolute top-6 left-10 sm:left-24 opacity-90 animate-float" style={{ animationDuration: '6s' }}>
          <svg viewBox="0 0 120 60" className="w-24 sm:w-32 h-12">
            <path
              d="M 20 40 A 18 18 0 0 1 45 25 A 24 24 0 0 1 85 24 A 18 18 0 0 1 105 40 Z"
              fill="#FFFFFF"
              stroke="#3D2314"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="absolute top-12 left-1/2 -translate-x-1/2 opacity-75 animate-float" style={{ animationDuration: '8s' }}>
          <svg viewBox="0 0 90 45" className="w-20 sm:w-24 h-10">
            <path
              d="M 15 30 A 14 14 0 0 1 35 18 A 18 18 0 0 1 65 18 A 14 14 0 0 1 80 30 Z"
              fill="#FFFFFF"
              stroke="#3D2314"
              strokeWidth="1.8"
            />
          </svg>
        </div>

        {/* Distant Coconut Palm & Mango Trees Silhouette */}
        <div className="absolute bottom-28 inset-x-0 h-32 flex justify-between px-4 sm:px-12 opacity-60">
          <svg viewBox="0 0 200 160" className="w-36 h-28 text-emerald-800" fill="currentColor">
            {/* Coconut Palm */}
            <path d="M 60 160 Q 55 100 50 40" stroke="#78350F" strokeWidth="6" fill="none" />
            <path d="M 50 40 Q 20 20 0 45" stroke="#065F46" strokeWidth="4" fill="none" />
            <path d="M 50 40 Q 30 10 20 0" stroke="#065F46" strokeWidth="4" fill="none" />
            <path d="M 50 40 Q 70 10 90 20" stroke="#065F46" strokeWidth="4" fill="none" />
            <path d="M 50 40 Q 80 35 95 60" stroke="#065F46" strokeWidth="4" fill="none" />
          </svg>
          <svg viewBox="0 0 200 160" className="w-40 h-32 text-emerald-700 hidden sm:block" fill="currentColor">
            {/* Shady Mango Tree */}
            <path d="M 100 160 L 100 90" stroke="#5C2B10" strokeWidth="12" fill="none" />
            <circle cx="100" cy="70" r="45" fill="#047857" />
            <circle cx="75" cy="65" r="30" fill="#059669" />
            <circle cx="125" cy="65" r="30" fill="#10B981" />
          </svg>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. THE LUSH GARDEN LAWN & TROPICAL FLOWERS                  */}
      {/* ============================================================ */}
      <div className="absolute bottom-0 inset-x-0 h-40 sm:h-48 z-10 pointer-events-none">
        {/* Rolling Green Turf */}
        <div className="absolute bottom-0 inset-x-0 h-36 sm:h-44 bg-linear-to-b from-[#86efac] via-[#4ade80] to-[#15803d] border-t-3 border-amber-950 rounded-t-[40px] shadow-inner" />

        {/* Grass Tuft Markings */}
        <div className="absolute bottom-16 inset-x-0 flex justify-around px-4 opacity-40">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="text-emerald-950 text-sm font-black">
              𝒱
            </div>
          ))}
        </div>

        {/* Cartoon Swaying Flowers along the Garden Borders */}
        <div className="absolute bottom-6 inset-x-0 flex justify-between px-4 sm:px-10">
          {[
            { color: '#EF4444', center: '#FBBF24', delay: '0s' },
            { color: '#EC4899', center: '#FEF08A', delay: '0.4s' },
            { color: '#F59E0B', center: '#7C2D12', delay: '0.8s' },
            { color: '#8B5CF6', center: '#FEF08A', delay: '0.2s' },
            { color: '#EF4444', center: '#FDE047', delay: '0.6s' },
            { color: '#38BDF8', center: '#FFFFFF', delay: '1.0s' },
          ].map((flower, idx) => (
            <div
              key={idx}
              className="animate-flower-sway origin-bottom"
              style={{ animationDelay: flower.delay }}
            >
              <svg viewBox="0 0 30 50" className="w-6 sm:w-8 h-10 sm:h-12 overflow-visible">
                {/* Stem */}
                <path d="M 15 50 Q 14 30 15 15" stroke="#166534" strokeWidth="2.5" fill="none" />
                {/* Leaf */}
                <ellipse cx="10" cy="35" rx="5" ry="2.5" fill="#22C55E" stroke="#166534" strokeWidth="0.8" transform="rotate(-25 10 35)" />
                {/* Petals */}
                <circle cx="15" cy="15" r="9" fill={flower.color} stroke="#3D2314" strokeWidth="1.2" />
                {/* Center */}
                <circle cx="15" cy="15" r="4.5" fill={flower.center} stroke="#3D2314" strokeWidth="1" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. FLUTTERING BUTTERFLIES                                    */}
      {/* ============================================================ */}
      <div className="absolute top-24 left-1/3 z-25 pointer-events-none animate-butterfly">
        <div className="animate-wing-flap">
          <svg viewBox="0 0 30 24" className="w-7 h-6 drop-shadow-sm">
            <ellipse cx="9" cy="8" rx="7" ry="6" fill="#F43F5E" stroke="#3D2314" strokeWidth="1" />
            <ellipse cx="21" cy="8" rx="7" ry="6" fill="#F43F5E" stroke="#3D2314" strokeWidth="1" />
            <ellipse cx="11" cy="17" rx="5" ry="4" fill="#FDE047" stroke="#3D2314" strokeWidth="1" />
            <ellipse cx="19" cy="17" rx="5" ry="4" fill="#FDE047" stroke="#3D2314" strokeWidth="1" />
            <line x1="15" y1="4" x2="15" y2="20" stroke="#3D2314" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute top-36 right-1/4 z-25 pointer-events-none animate-butterfly" style={{ animationDelay: '1.5s' }}>
        <div className="animate-wing-flap">
          <svg viewBox="0 0 30 24" className="w-6 h-5 drop-shadow-sm">
            <ellipse cx="9" cy="8" rx="7" ry="6" fill="#38BDF8" stroke="#3D2314" strokeWidth="1" />
            <ellipse cx="21" cy="8" rx="7" ry="6" fill="#38BDF8" stroke="#3D2314" strokeWidth="1" />
            <ellipse cx="11" cy="17" rx="5" ry="4" fill="#FEF08A" stroke="#3D2314" strokeWidth="1" />
            <ellipse cx="19" cy="17" rx="5" ry="4" fill="#FEF08A" stroke="#3D2314" strokeWidth="1" />
            <line x1="15" y1="4" x2="15" y2="20" stroke="#3D2314" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. THE OWNER'S FAMILY: DAD, MOM, BOY (ARJUN) & GIRL (MEERA)  */}
      {/* ============================================================ */}
      <div className="absolute bottom-16 sm:bottom-20 left-2 sm:left-8 z-20 flex items-end gap-2 sm:gap-4 pointer-events-auto">
        
        {/* Checkered Picnic Blanket with Dad & Mom */}
        <div className="relative">
          {/* Picnic Blanket */}
          <div className="w-28 sm:w-40 h-8 sm:h-10 bg-rose-200 border-2.5 border-amber-950 rounded-2xl shadow-[3px_3px_0px_#3d2314] overflow-hidden rotate-[-2deg]">
            <div className="w-full h-full bg-[radial-gradient(#e11d48_2px,transparent_2px)] [background-size:8px_8px] opacity-40" />
          </div>

          {/* Chennai Brass Filter Coffee Tumbler & Davarah on blanket */}
          <div className="absolute bottom-2 right-2 sm:right-4 w-4 h-6">
            <svg viewBox="0 0 20 28" className="w-full h-full">
              <rect x="3" y="10" width="14" height="15" rx="1" fill="#D97706" stroke="#3D2314" strokeWidth="1" />
              <rect x="1" y="22" width="18" height="5" rx="1" fill="#B45309" stroke="#3D2314" strokeWidth="1" />
              {/* Steaming aromatic vapor */}
              <path d="M 7 6 Q 9 2 7 0" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.8" className="animate-pulse" />
              <path d="M 12 7 Q 14 3 12 1" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.8" className="animate-pulse" />
            </svg>
          </div>

          {/* Mom & Dad Sitting Cheerfully */}
          <div className="absolute -top-16 sm:-top-20 left-1 flex items-end gap-1">
            {/* Dad in Teal Kurta */}
            <svg viewBox="0 0 60 70" className="w-12 sm:w-16 h-14 sm:h-18 overflow-visible">
              {/* Head */}
              <circle cx="30" cy="18" r="11" fill="#FBBF24" stroke="#3D2314" strokeWidth="1.8" />
              {/* Neat black hair */}
              <path d="M 19 16 C 19 8 41 8 41 16 Z" fill="#1C1917" />
              {/* Cheerful Smiling Eyes */}
              <path d="M 24 18 Q 27 15 30 18" stroke="#3D2314" strokeWidth="1.5" fill="none" />
              <path d="M 33 18 Q 36 15 39 18" stroke="#3D2314" strokeWidth="1.5" fill="none" />
              {/* Smile & Mustache */}
              <path d="M 27 24 Q 31 27 35 24" stroke="#3D2314" strokeWidth="1.5" fill="none" />
              {/* Kurta Body */}
              <path d="M 16 35 L 44 35 L 42 65 L 18 65 Z" fill="#0D9488" stroke="#3D2314" strokeWidth="1.8" />
              {/* Waving Arm */}
              <path d="M 40 40 Q 52 30 54 22" stroke="#0D9488" strokeWidth="5" strokeLinecap="round" fill="none" />
              <circle cx="54" cy="21" r="3" fill="#FBBF24" stroke="#3D2314" strokeWidth="1" />
            </svg>

            {/* Mom in Golden Yellow Saree with Jasmine Flowers */}
            <svg viewBox="0 0 60 70" className="w-11 sm:w-15 h-13 sm:h-17 overflow-visible">
              {/* Head */}
              <circle cx="30" cy="18" r="10" fill="#FCD34D" stroke="#3D2314" strokeWidth="1.8" />
              {/* Hair bun with Jasmine (Mallipoo) */}
              <ellipse cx="18" cy="16" rx="6" ry="7" fill="#1C1917" />
              <ellipse cx="14" cy="16" rx="3.5" ry="3.5" fill="#FFFFFF" stroke="#3D2314" strokeWidth="0.8" />
              {/* Hair */}
              <path d="M 21 16 C 21 9 39 9 39 16 Z" fill="#1C1917" />
              {/* Red Bindi */}
              <circle cx="30" cy="14" r="1.3" fill="#DC2626" />
              {/* Smiling Face */}
              <circle cx="26" cy="18" r="1.2" fill="#1C1917" />
              <circle cx="34" cy="18" r="1.2" fill="#1C1917" />
              <path d="M 27 23 Q 30 26 33 23" stroke="#3D2314" strokeWidth="1.4" fill="none" />
              {/* Saree Body */}
              <path d="M 18 34 L 42 34 L 40 64 L 20 64 Z" fill="#F59E0B" stroke="#3D2314" strokeWidth="1.8" />
              {/* Clapping Hands */}
              <ellipse cx="30" cy="42" rx="4" ry="2.5" fill="#FCD34D" stroke="#3D2314" strokeWidth="1" className="animate-pulse" />
            </svg>
          </div>
        </div>

        {/* Little Sister (Meera) - Blowing Bubbles */}
        <div
          className="relative cursor-pointer group"
          onClick={() => handleActionSelect('bubbles')}
          title="Click Meera to blow more bubbles!"
        >
          <svg viewBox="0 0 50 80" className="w-12 sm:w-16 h-18 sm:h-24 overflow-visible">
            {/* Pigtails */}
            <circle cx="10" cy="18" r="4.5" fill="#1C1917" />
            <circle cx="40" cy="18" r="4.5" fill="#1C1917" />
            <polygon points="9,18 11,20 10,22" fill="#EC4899" />
            <polygon points="39,18 41,20 40,22" fill="#EC4899" />
            {/* Head */}
            <circle cx="25" cy="22" r="10.5" fill="#FDE68A" stroke="#3D2314" strokeWidth="1.8" />
            <path d="M 16 19 C 16 13 34 13 34 19 Z" fill="#1C1917" />
            {/* Big cute cartoon eyes */}
            <circle cx="21" cy="22" r="2.2" fill="#1C1917" />
            <circle cx="21" cy="21" r="0.7" fill="#FFFFFF" />
            <circle cx="29" cy="22" r="2.2" fill="#1C1917" />
            <circle cx="29" cy="21" r="0.7" fill="#FFFFFF" />
            {/* Pouting lips blowing bubbles */}
            <ellipse cx="25" cy="28" rx="2" ry="1.5" fill="#F43F5E" stroke="#3D2314" strokeWidth="1" />
            {/* Pink Dress */}
            <path d="M 18 36 L 32 36 L 38 60 L 12 60 Z" fill="#F472B6" stroke="#3D2314" strokeWidth="1.8" />
            {/* Hands holding bubble wand */}
            <path d="M 28 42 L 38 32" stroke="#3D2314" strokeWidth="1.5" />
            <circle cx="40" cy="30" r="3.5" fill="none" stroke="#0284C7" strokeWidth="1.5" />
            {/* Little legs with white socks and red Mary Janes */}
            <rect x="18" y="60" width="3.5" height="12" fill="#FDE68A" stroke="#3D2314" strokeWidth="1" />
            <rect x="28" y="60" width="3.5" height="12" fill="#FDE68A" stroke="#3D2314" strokeWidth="1" />
            <ellipse cx="19" cy="73" rx="3.5" ry="2" fill="#DC2626" stroke="#3D2314" strokeWidth="1" />
            <ellipse cx="29" cy="73" rx="3.5" ry="2" fill="#DC2626" stroke="#3D2314" strokeWidth="1" />
          </svg>
        </div>

        {/* Little Brother (Arjun) - Throwing Frisbee / Ball */}
        <div
          className="relative cursor-pointer group"
          onClick={() => {
            if (!isPlaying) {
              togglePlay();
            } else {
              handleActionSelect(currentAction === 'frisbee' ? 'ball' : 'frisbee');
            }
          }}
          title={isPlaying ? "Click Arjun to throw the frisbee or toss the ball!" : "Click to Play Game with Arjun!"}
        >
          <svg viewBox="0 0 65 95" className="w-14 sm:w-20 h-22 sm:h-28 overflow-visible">
            {/* Backwards Cap */}
            <path d="M 22 17 Q 35 11 48 17 L 55 18 L 48 22 Z" fill="#3B82F6" stroke="#3D2314" strokeWidth="1.5" />
            {/* Head */}
            <circle cx="35" cy="24" r="11" fill="#FDE68A" stroke="#3D2314" strokeWidth="1.8" />
            {/* Hair peeking */}
            <path d="M 26 22 C 26 18 44 18 44 22 Z" fill="#1C1917" />
            {/* Winking excited face */}
            <circle cx="30" cy="24" r="2.2" fill="#1C1917" />
            <path d="M 37 24 Q 40 22 43 24" stroke="#3D2314" strokeWidth="2" fill="none" />
            <path d="M 32 30 Q 36 34 40 30" stroke="#3D2314" strokeWidth="2" fill="#F43F5E" />
            {/* Striped T-Shirt Body */}
            <path d="M 25 40 L 45 40 L 47 65 L 23 65 Z" fill="#F97316" stroke="#3D2314" strokeWidth="1.8" />
            <line x1="24" y1="48" x2="46" y2="48" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="24" y1="56" x2="46" y2="56" stroke="#FFFFFF" strokeWidth="2" />
            {/* Energetic Throwing Arm (Extended toward the right lawn) */}
            <path
              d="M 43 45 Q 56 36 62 30"
              stroke="#FDE68A"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              className={toyPhase === 'flying' ? 'animate-bounce' : ''}
            />
            {/* Shorts */}
            <path d="M 23 65 L 47 65 L 45 76 L 36 76 L 35 72 L 34 76 L 25 76 Z" fill="#1D4ED8" stroke="#3D2314" strokeWidth="1.5" />
            {/* Running Legs */}
            <line x1="28" y1="76" x2="24" y2="90" stroke="#FDE68A" strokeWidth="4" strokeLinecap="round" />
            <line x1="42" y1="76" x2="48" y2="90" stroke="#FDE68A" strokeWidth="4" strokeLinecap="round" />
            {/* Sneakers */}
            <ellipse cx="23" cy="91" rx="4.5" ry="2.5" fill="#EF4444" stroke="#3D2314" strokeWidth="1" />
            <ellipse cx="49" cy="91" rx="4.5" ry="2.5" fill="#EF4444" stroke="#3D2314" strokeWidth="1" />
          </svg>
        </div>

      </div>

      {/* ============================================================ */}
      {/* 5. INTERACTIVE SOAP BUBBLES FLOATING (Click to Pop!)         */}
      {/* ============================================================ */}
      {bubbles.map((b) => (
        <div
          key={b.id}
          onClick={() => popBubble(b.id)}
          className="absolute z-30 cursor-pointer animate-bubble-float transition-transform hover:scale-125"
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
            {/* Crescent shine reflection */}
            <div className="absolute top-1 left-1.5 w-2 h-2 rounded-full bg-white opacity-85" />
          </div>
        </div>
      ))}

      {/* ============================================================ */}
      {/* 6. TOY TRAJECTORY: SPINNING FRISBEE OR BOUNCING TENNIS BALL  */}
      {/* ============================================================ */}
      {currentAction === 'frisbee' && (
        <div
          className={`absolute z-25 pointer-events-none transition-all duration-700 ${
            toyPhase === 'flying'
              ? 'top-28 left-48 sm:left-72 scale-110 rotate-[720deg]'
              : toyPhase === 'caught'
              ? 'top-40 right-28 sm:right-56 scale-95'
              : 'top-36 left-24 sm:left-36 scale-90'
          }`}
        >
          {/* Detailed Cartoon Frisbee */}
          <div className="relative w-12 sm:w-14 h-5 sm:h-6 rounded-full bg-linear-to-b from-rose-500 via-rose-600 to-amber-500 border-2.5 border-amber-950 shadow-[0_4px_6px_rgba(0,0,0,0.3)] flex items-center justify-center animate-spin-slow">
            {/* Concentric grooved rings */}
            <div className="w-8 h-2 rounded-full border border-amber-200/80" />
            <div className="absolute inset-0 flex items-center justify-center text-[7px] font-black text-white uppercase tracking-wider">
              DODO
            </div>
          </div>
        </div>
      )}

      {currentAction === 'ball' && (
        <div
          className={`absolute z-25 pointer-events-none transition-all duration-500 ${
            toyPhase === 'flying'
              ? 'top-24 left-56 sm:left-80 scale-110'
              : toyPhase === 'caught'
              ? 'top-44 right-32 sm:right-60 scale-100'
              : 'top-36 left-28 sm:left-40 scale-90'
          }`}
        >
          {/* Cartoon Tennis Ball with curved white seams */}
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-lime-400 border-2.5 border-amber-950 shadow-[2px_3px_0px_#3d2314] relative overflow-hidden animate-spin-slow">
            <svg viewBox="0 0 40 40" className="w-full h-full">
              <path d="M 5 20 C 15 20 20 15 20 5" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M 35 20 C 25 20 20 25 20 35" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      )}

      {currentAction === 'treat' && (
        <div className="absolute top-28 right-40 sm:right-64 z-25 animate-bounce">
          {/* Golden Bone Treat */}
          <div className="flex items-center">
            <div className="w-3 h-5 rounded-full bg-amber-400 border border-amber-950 -mr-1" />
            <div className="w-8 h-3.5 bg-amber-300 border-y border-amber-950" />
            <div className="w-3 h-5 rounded-full bg-amber-400 border border-amber-950 -ml-1" />
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 7. CUTEDODO THE PLAYFUL STAR (LEAPING, CATCHING, PLAYING)     */}
      {/* ============================================================ */}
      <div
        className={`absolute bottom-14 sm:bottom-18 right-8 sm:right-32 z-25 transition-all duration-500 select-none cursor-pointer ${
          currentAction === 'bellyrub'
            ? 'animate-belly-wiggle'
            : toyPhase === 'flying'
            ? 'animate-dog-gallop translate-y-[-10px]'
            : 'animate-wag'
        }`}
        onClick={() => {
          sounds.bark();
          sounds.bell();
          setCaughtCount((c) => c + 1);
        }}
        title="Click CuteDODO to hear a happy woof!"
      >
        {/* Dynamic Catch Starburst & Sparkles when toy is caught */}
        {toyPhase === 'caught' && (currentAction === 'frisbee' || currentAction === 'ball') && (
          <div className="absolute -top-12 -left-6 z-30 flex items-center gap-1 bg-amber-300 border-2 border-amber-950 px-2.5 py-0.5 rounded-full shadow-[2px_2px_0px_#3d2314] text-[10px] font-black uppercase text-amber-950 animate-bounce">
            <Sparkles className="w-3 h-3 text-amber-950" />
            <span>CATCH! +10 XP</span>
          </div>
        )}

        {/* CuteDODO Studio Vector Rig */}
        <svg viewBox="0 0 120 95" className="w-28 sm:w-36 h-22 sm:h-28 overflow-visible drop-shadow-md">
          {/* Ground Dust Puff (when dashing) */}
          {toyPhase === 'flying' && (
            <g className="opacity-70 animate-ping">
              <ellipse cx="25" cy="88" rx="8" ry="3.5" fill="#FEF08A" />
              <ellipse cx="15" cy="85" rx="6" ry="2.5" fill="#FEF08A" />
            </g>
          )}

          {/* Fluffy Wagging Tail */}
          <g className="animate-tail-fast origin-bottom-left">
            <path
              d="M 28 54 C 14 42 12 28 20 22 C 28 24 28 36 24 48 Z"
              fill="#F5F5F4"
              stroke="#3D2314"
              strokeWidth="2.2"
            />
            {/* White fluffy tail tip feathering */}
            <path d="M 18 26 C 22 22 26 24 24 30 Z" fill="#FFFFFF" />
          </g>

          {/* Body (Plump, friendly cartoon pup) */}
          <ellipse cx="58" cy="58" rx="30" ry="22" fill="#FFFBEB" stroke="#3D2314" strokeWidth="2.5" />
          {/* Golden Honey Patches */}
          <path d="M 45 42 C 58 40 70 48 68 62 C 60 70 45 68 45 54 Z" fill="#D97706" />

          {/* Four Running / Galloping Paws */}
          {/* Back Paws */}
          <ellipse
            cx="38"
            cy="76"
            rx="6.5"
            ry="4.5"
            fill="#FFFBEB"
            stroke="#3D2314"
            strokeWidth="2"
            className={toyPhase === 'flying' ? 'animate-bounce' : ''}
          />
          <ellipse
            cx="48"
            cy="78"
            rx="6.5"
            ry="4.5"
            fill="#FFFBEB"
            stroke="#3D2314"
            strokeWidth="2"
          />

          {/* Front Paws (Reaching forward) */}
          <ellipse
            cx="75"
            cy="78"
            rx="7"
            ry="4.8"
            fill="#FFFBEB"
            stroke="#3D2314"
            strokeWidth="2"
          />
          <ellipse
            cx="86"
            cy="75"
            rx="7"
            ry="4.8"
            fill="#FFFBEB"
            stroke="#3D2314"
            strokeWidth="2"
            className={toyPhase === 'flying' ? 'animate-bounce' : ''}
          />

          {/* Collar with Golden Bell */}
          <path d="M 68 46 Q 78 54 88 46" stroke="#DC2626" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Golden Bell that rings */}
          <circle cx="78" cy="52" r="4.5" fill="#FBBF24" stroke="#3D2314" strokeWidth="1.5" />
          <line x1="75" y1="54" x2="81" y2="54" stroke="#78350F" strokeWidth="1" />

          {/* Fluffy Head */}
          <circle cx="85" cy="38" r="20" fill="#FFFBEB" stroke="#3D2314" strokeWidth="2.5" />
          {/* Honey patch over eyes */}
          <path d="M 72 32 C 72 24 84 22 88 28 C 88 36 78 38 72 32 Z" fill="#D97706" />
          <path d="M 94 32 C 94 24 104 22 106 28 C 106 36 98 38 94 32 Z" fill="#D97706" />

          {/* Floppy Cartoon Ears (Bouncing with joy!) */}
          <g className="animate-ear-bounce">
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

          {/* Open Happy Mouth with Pink Lolling Tongue */}
          <path d="M 83 46 Q 87 50 91 46" stroke="#3D2314" strokeWidth="1.8" fill="none" />
          <path d="M 85 47 Q 87 55 89 47" fill="#FB7185" stroke="#3D2314" strokeWidth="1.2" />

          {/* Iconic Topknot Red Ribbon */}
          <polygon points="85,18 89,18 87,14" fill="#EF4444" stroke="#3D2314" strokeWidth="1.2" />
          <circle cx="87" cy="18" r="2.5" fill="#FBBF24" stroke="#3D2314" strokeWidth="1" />
        </svg>

        {/* Happy Hearts popping up */}
        <div className="absolute -top-4 right-2 text-rose-500 animate-bounce">
          <Heart className="w-5 h-5 fill-rose-500 text-amber-950" />
        </div>
      </div>

      {/* ============================================================ */}
      {/* 8. INTERACTIVE ACTION SELECTOR BAR                           */}
      {/* ============================================================ */}
      <div className="absolute top-2.5 sm:top-3.5 left-2 sm:left-6 z-40 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar max-w-[calc(100%-105px)] sm:max-w-none">
        {/* Small Play / Pause Button */}
        <button
          onClick={togglePlay}
          className={`cartoon-btn flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-black shrink-0 transition-all shadow-[2px_2px_0px_#3d2314] active:translate-y-0.5 border-2 border-amber-950 ${
            isPlaying
              ? 'bg-amber-400 hover:bg-amber-500 text-amber-950'
              : 'bg-emerald-500 hover:bg-emerald-400 text-white animate-pulse'
          }`}
          title={isPlaying ? "Click to Pause game" : "Click to Play game"}
          aria-label={isPlaying ? "Pause game" : "Play game"}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Play</span>
            </>
          )}
        </button>

        <span className="text-xs font-black text-amber-950 bg-amber-300 border-2 border-amber-950 px-2.5 py-1 rounded-xl shadow-[2px_2px_0px_#3d2314] shrink-0 hidden sm:inline font-cartoon">
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
            className={`cartoon-btn px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all ${
              currentAction === item.id
                ? 'bg-amber-400 text-amber-950 shadow-[2px_3px_0px_#3d2314] -translate-y-0.5'
                : 'bg-white/95 text-amber-950 hover:bg-amber-100 shadow-[1px_2px_0px_#3d2314]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Top Right Quick Toggles (Breeze & Catch Counter) */}
      <div className="absolute top-2.5 sm:top-3.5 right-2 sm:right-6 z-40 flex items-center gap-1 sm:gap-2">
        <button
          onClick={toggleBreeze}
          className={`cartoon-btn p-1 sm:p-1.5 rounded-xl border-2 border-amber-950 text-xs font-bold transition-all ${
            breezeActive ? 'bg-sky-300 text-amber-950' : 'bg-white text-amber-950'
          }`}
          title="Toggle garden breeze"
        >
          <Wind className={`w-3.5 h-3.5 ${breezeActive ? 'animate-spin' : ''}`} />
        </button>

        <div className="bg-amber-400 border-2 border-amber-950 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-xl text-[11px] sm:text-xs font-black text-amber-950 shadow-[2px_2px_0px_#3d2314] flex items-center gap-1 shrink-0">
          <span className="hidden sm:inline">🏆 Catches:</span>
          <span className="sm:hidden">🏆</span>
          <span className="font-mono text-amber-950">{caughtCount}</span>
        </div>
      </div>

      {/* Centered Small Play Prompt when stopped */}
      {!isPlaying && (
        <div className="absolute inset-0 z-35 flex items-center justify-center pointer-events-none">
          <button
            onClick={togglePlay}
            className="pointer-events-auto cartoon-btn flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-black font-heading text-xs sm:text-sm rounded-2xl border-2 sm:border-3 border-amber-950 shadow-[4px_4px_0px_#3d2314] active:translate-y-0.5 transition-all hover:scale-105"
            title="Start game"
          >
            <Play className="w-4 h-4 fill-white text-white" />
            <span>Play Game</span>
          </button>
        </div>
      )}

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
