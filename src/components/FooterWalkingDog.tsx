import React, { useState } from 'react';
import { sounds } from '../utils/soundEffects';

interface FooterWalkingDogProps {
  className?: string;
}

const ShihTzuSvg: React.FC = () => (
  <svg
    viewBox="0 0 110 82"
    className="w-20 sm:w-24 h-16 sm:h-20 overflow-visible drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]"
  >
    {/* 1. Curled Shih Tzu Tail (Arched high over rump with white fluffy tip) */}
    <g className="animate-dog-tail-curl">
      {/* Golden main tail curl */}
      <path
        d="M 24 30 C 12 24 10 10 20 4 C 30 -2 38 6 36 17 C 34 24 27 28 24 30 Z"
        fill="#F6BA6F"
        stroke="#3D2314"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Fluffy white tip crescent on top of the spiral */}
      <path
        d="M 20 6 C 26 2 33 6 32 14 C 30 18 26 19 23 15 C 21 12 20 8 20 6 Z"
        fill="#FFFDF7"
        stroke="#3D2314"
        strokeWidth="1.2"
      />
    </g>

    {/* 2. Far Back Leg (Trailing in stride - inner shadow tone) */}
    <g className="animate-dog-leg-bl">
      <path
        d="M 23 44 C 21 52 17 62 15 74 L 21 74 C 23 66 26 56 28 47 Z"
        fill="#E5A358"
        stroke="#3D2314"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* White sock paw */}
      <path
        d="M 15 67 C 14 71 14 74 15 74 L 21 74 C 21 71 21 68 21 67 Z"
        fill="#E2E8F0"
      />
    </g>

    {/* 3. Far Front Leg (Planted back in stride - inner shadow tone) */}
    <g className="animate-dog-leg-fr">
      <path
        d="M 59 42 C 57 52 53 64 51 74 L 57 74 C 60 66 63 54 65 44 Z"
        fill="#E5A358"
        stroke="#3D2314"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* White sock paw */}
      <path
        d="M 51 68 L 51 74 L 57 74 L 57 68 Z"
        fill="#E2E8F0"
      />
    </g>

    {/* 4. Near Back Leg (Stepping forward in stride - golden with white paw) */}
    <g className="animate-dog-leg-br">
      <path
        d="M 32 43 C 34 52 37 62 40 74 L 46 74 C 44 64 40 52 38 43 Z"
        fill="#F6BA6F"
        stroke="#3D2314"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* White sock paw with soft toes */}
      <path
        d="M 39 67 C 39 71 39 74 40 74 L 46 74 C 46 71 45 68 45 67 Z"
        fill="#FFFDF7"
        stroke="#3D2314"
        strokeWidth="1.2"
      />
    </g>

    {/* 5. Main Torso Body (Golden honey fur with white underbelly) */}
    <path
      d="M 24 32 C 34 29 48 30 63 36 C 65 44 60 52 54 53 C 44 55 32 54 26 48 C 21 44 21 36 24 32 Z"
      fill="#F6BA6F"
      stroke="#3D2314"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    {/* White Underbelly & Chest */}
    <path
      d="M 30 51 C 42 53 52 52 56 46 C 58 40 59 36 61 36 C 55 46 45 51 30 51 Z"
      fill="#FFFDF7"
    />

    {/* 6. Near Front Leg (Stepping forward boldly with white paw) */}
    <g className="animate-dog-leg-fl">
      <path
        d="M 65 40 C 68 50 72 62 76 74 L 83 74 C 79 62 74 48 71 40 Z"
        fill="#F6BA6F"
        stroke="#3D2314"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* White sock paw stepping forward */}
      <path
        d="M 75 67 C 75 70 75 74 76 74 L 83 74 C 82 71 80 67 79 67 Z"
        fill="#FFFDF7"
        stroke="#3D2314"
        strokeWidth="1.2"
      />
      {/* Toe cleft lines */}
      <line x1="79" y1="71" x2="79" y2="74" stroke="#3D2314" strokeWidth="1" />
    </g>

    {/* 7. Chocolate Brown Collar around Neck with Silver Buckle Tag */}
    <path
      d="M 61 31 C 61 37 66 43 72 38 L 74 34 C 69 31 64 28 61 31 Z"
      fill="#4A2E1B"
      stroke="#3D2314"
      strokeWidth="2"
    />
    {/* Little silver/gray metallic tag hanging down */}
    <rect
      x="69"
      y="38"
      width="3.5"
      height="4.5"
      rx="1"
      fill="#E5E7EB"
      stroke="#3D2314"
      strokeWidth="1"
    />

    {/* 8. Head & Neck */}
    {/* Back Ear (far side - darker golden) */}
    <path
      d="M 60 19 L 63 8 L 70 17 Z"
      fill="#E5A358"
      stroke="#3D2314"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />

    {/* Head Base */}
    <circle cx="73" cy="24" r="14" fill="#F6BA6F" stroke="#3D2314" strokeWidth="2.2" />

    {/* Front Ear (upright perky ear with pinkish warmth) */}
    <path
      d="M 66 21 L 69 7 L 77 18 Z"
      fill="#F6BA6F"
      stroke="#3D2314"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M 69 19 L 71 11 L 75 17 Z"
      fill="#FCA5A5"
      opacity="0.65"
    />

    {/* White Muzzle, Snout & Cheeks */}
    <path
      d="M 72 26 C 74 21 82 24 87 28 C 88 32 82 36 75 35 C 70 34 68 28 72 26 Z"
      fill="#FFFDF7"
      stroke="#3D2314"
      strokeWidth="1.5"
    />

    {/* Dark Button Nose at snout tip */}
    <ellipse cx="87" cy="29" rx="2.5" ry="2" fill="#1C1917" />
    <circle cx="86.5" cy="28.5" r="0.7" fill="#FFFFFF" opacity="0.8" />

    {/* Open Smiling Mouth & Pink Tongue lolling out */}
    <path
      d="M 85 32 Q 81 35 77 33"
      stroke="#3D2314"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
    />
    {/* Cheerful Pink Lolling Tongue */}
    <path
      d="M 82 33 C 83 38 86 38 85 34 Z"
      fill="#FB7185"
      stroke="#3D2314"
      strokeWidth="1.2"
    />

    {/* Sparkling Cartoon Eye with double glint */}
    <ellipse cx="75" cy="23" rx="3.2" ry="4" fill="#1C1917" />
    <circle cx="76" cy="21.5" r="1.3" fill="#FFFFFF" />
    <circle cx="74" cy="24" r="0.7" fill="#FFFFFF" />

    {/* Soft Rosy Cheek Blush */}
    <circle cx="70" cy="28" r="2.5" fill="#FB7185" opacity="0.3" />
  </svg>
);

export const FooterWalkingDog: React.FC<FooterWalkingDogProps> = ({ className = '' }) => {
  const [barked, setBarked] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleDogClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.bark();
    sounds.bell();
    setBarked(true);
    setClickCount((c) => c + 1);
    setTimeout(() => setBarked(false), 2400);
  };

  const barks = [
    'Woof! Strolling on $DODO ground! 🐾',
    'Paws over Profits! ❤️🐶',
    'Follow me to the shelter fund! ✨',
    'Arjun and Meera say hi! 🥏',
    'Chennai to the moon! 🚀🐾',
  ];

  return (
    <div
      className={`absolute -top-[70px] sm:-top-[82px] inset-x-0 h-[72px] sm:h-[84px] overflow-hidden pointer-events-none z-30 select-none ${className}`}
      aria-label="Cute Shih Tzu Dog Walking Along Footer Top Ground Line"
    >
      <div className="relative w-full h-full">
        {/* Main Walking Shih Tzu Dog (Primary Walker matching reference image) */}
        <div
          className="absolute bottom-[-1px] animate-footer-dog-walk cursor-pointer pointer-events-auto group"
          onClick={handleDogClick}
          title="Click the walking shih tzu dog to hear him bark!"
        >
          {/* Playful Floating Speech Bubble on Click or Hover */}
          <div
            className={`absolute -top-7 left-12 whitespace-nowrap bg-white text-[#49200B] border-2 border-[#49200B] rounded-xl px-2.5 py-0.5 text-[10px] sm:text-[11px] font-black shadow-[2px_2px_0px_#49200B] transition-all duration-300 pointer-events-none z-40 ${
              barked
                ? 'opacity-100 scale-100 -translate-y-1'
                : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'
            }`}
          >
            <span>{barked ? barks[clickCount % barks.length] : 'Woof! Strolling along! 🐾'}</span>
            <div className="absolute left-3 -bottom-1.5 w-2 h-2 bg-white border-r-2 border-b-2 border-[#49200B] rotate-45" />
          </div>

          <div className="animate-dog-trot-body origin-bottom">
            <ShihTzuSvg />
          </div>
        </div>

        {/* Companion Shih Tzu Dog (Offset by -9s so a dog is always visible walking across) */}
        <div
          className="absolute bottom-[-1px] animate-footer-dog-walk cursor-pointer pointer-events-auto group"
          style={{ animationDelay: '-9s' }}
          onClick={handleDogClick}
          title="Click the walking shih tzu dog to hear him bark!"
        >
          <div
            className="absolute -top-7 left-12 whitespace-nowrap bg-white text-[#49200B] border-2 border-[#49200B] rounded-xl px-2.5 py-0.5 text-[10px] sm:text-[11px] font-black shadow-[2px_2px_0px_#49200B] opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-40"
          >
            <span>CuteDODO on the march! 🐾</span>
            <div className="absolute left-3 -bottom-1.5 w-2 h-2 bg-white border-r-2 border-b-2 border-[#49200B] rotate-45" />
          </div>

          <div className="animate-dog-trot-body origin-bottom">
            <ShihTzuSvg />
          </div>
        </div>
      </div>
    </div>
  );
};
