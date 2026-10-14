import React, { useState, useEffect, useRef } from 'react';
import { sounds } from '../utils/soundEffects';

type IdleAnimation = 'normal' | 'blinking' | 'tilting-left' | 'tilting-right' | 'sniffing' | 'perking';

export const HeaderDodo: React.FC = () => {
  const [animState, setAnimState] = useState<IdleAnimation>('normal');
  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const [isExcited, setIsExcited] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Randomized idle animation state machine
  useEffect(() => {
    const triggerRandomAnimation = () => {
      const choices: { state: IdleAnimation; text: string | null; duration: number }[] = [
        { state: 'blinking', text: null, duration: 650 },
        { state: 'tilting-left', text: 'Hmm? 👀', duration: 1600 },
        { state: 'tilting-right', text: 'Woof? 🐶', duration: 1600 },
        { state: 'sniffing', text: 'Sniff sniff... 👃', duration: 1800 },
        { state: 'perking', text: 'Treats?! 🦴', duration: 1400 },
      ];

      // Pick a random idle behavior
      const chosen = choices[Math.floor(Math.random() * choices.length)];
      setAnimState(chosen.state);
      if (chosen.text) {
        setBubbleText(chosen.text);
      }

      // Return to normal after duration
      timeoutRef.current = setTimeout(() => {
        setAnimState('normal');
        setBubbleText(null);

        // Next animation after random delay 2.5s - 5.5s
        const nextDelay = 2500 + Math.random() * 3000;
        timeoutRef.current = setTimeout(triggerRandomAnimation, nextDelay);
      }, chosen.duration);
    };

    // First trigger after 1.5s
    timeoutRef.current = setTimeout(triggerRandomAnimation, 1500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.bark();
    sounds.bell();
    setIsExcited(true);
    setBubbleText('Woof! Ruff! 🐾');
    setAnimState('perking');

    setTimeout(() => {
      setIsExcited(false);
      setBubbleText(null);
      setAnimState('normal');
    }, 1800);
  };

  // Compute CSS rotation / transform for head tilt
  let headTransform = 'rotate(0deg)';
  if (animState === 'tilting-left') headTransform = 'rotate(-14deg) translateY(-2px)';
  if (animState === 'tilting-right') headTransform = 'rotate(14deg) translateY(-2px)';
  if (isExcited) headTransform = 'scale(1.1) translateY(-4px)';

  return (
    <div
      onClick={handleClick}
      title="CuteDODO: Click me! (I tilt, sniff, and blink!)"
      className="relative flex items-center cursor-pointer select-none group"
    >
      {/* Speech / Reaction Bubble Container (div:nth-of-type(1)) */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        {bubbleText && (
          <div className="bg-white border-2 border-amber-950 px-2 py-0.5 rounded-lg text-[10px] font-extrabold text-amber-950 shadow-[1px_1px_0px_#3d2314] whitespace-nowrap animate-bounce">
            {bubbleText}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r-2 border-b-2 border-amber-950 rotate-45" />
          </div>
        )}
      </div>

      {/* Floating Animated Character Vessel (div:nth-of-type(2)) */}
      <div
        className={`relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center transition-transform duration-300 ease-out ${
          isExcited ? 'animate-bounce' : 'animate-float'
        }`}
        style={{ marginTop: '-8px', transform: headTransform }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[2px_3px_0px_#3d2314]"
        >
          {/* Floppy CuteDODO Ears (Left & Right) */}
          {/* Left Brown Ear */}
          <path
            d="M 24 35 C 10 38 6 62 14 74 C 20 80 28 72 30 55 Z"
            fill="#7C4A27"
            stroke="#3d2314"
            strokeWidth="3.5"
            strokeLinejoin="round"
            className={animState === 'perking' || isExcited ? 'transition-all -rotate-6 origin-top-left' : 'transition-all'}
          />
          {/* Left Ear Fluff detail */}
          <path
            d="M 16 52 C 14 62 18 68 22 70"
            fill="none"
            stroke="#5A341A"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Right Brown Ear */}
          <path
            d="M 76 35 C 90 38 94 62 86 74 C 80 80 72 72 70 55 Z"
            fill="#7C4A27"
            stroke="#3d2314"
            strokeWidth="3.5"
            strokeLinejoin="round"
            className={animState === 'perking' || isExcited ? 'transition-all rotate-6 origin-top-right' : 'transition-all'}
          />
          {/* Right Ear Fluff detail */}
          <path
            d="M 84 52 C 86 62 82 68 78 70"
            fill="none"
            stroke="#5A341A"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Head Base - Fluffy White Coat */}
          <circle
            cx="50"
            cy="52"
            r="34"
            fill="#FFFDF7"
            stroke="#3d2314"
            strokeWidth="3.5"
          />

          {/* Fluffy Head Top Patch (Brown fur mask around forehead/eyes) */}
          <path
            d="M 28 40 C 26 24 42 22 50 24 C 58 22 74 24 72 40 C 66 42 62 36 50 36 C 38 36 34 42 28 40 Z"
            fill="#9C6638"
            stroke="#3d2314"
            strokeWidth="2.5"
          />

          {/* Topknot Fluff / Bow or Hair tuft */}
          <path
            d="M 44 23 C 44 14 56 14 56 23 Z"
            fill="#FFFDF7"
            stroke="#3d2314"
            strokeWidth="2.5"
          />
          {/* Tiny Cyan Bow / Hairband */}
          <circle cx="50" cy="22" r="3.5" fill="#38BDF8" stroke="#3d2314" strokeWidth="2" />

          {/* Eyes (Left and Right) */}
          {animState === 'blinking' ? (
            // Blinking curved eyelids
            <g>
              <path
                d="M 32 49 Q 38 54 44 49"
                fill="none"
                stroke="#3d2314"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M 56 49 Q 62 54 68 49"
                fill="none"
                stroke="#3d2314"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </g>
          ) : (
            // Wide happy, shiny cartoon eyes
            <g>
              {/* Left Eye */}
              <ellipse cx="37" cy="49" rx="5.5" ry="6.5" fill="#3d2314" />
              <circle cx="35.5" cy="47" r="2.2" fill="#FFFFFF" />
              <circle cx="39" cy="51" r="1.1" fill="#FFFFFF" />

              {/* Right Eye */}
              <ellipse cx="63" cy="49" rx="5.5" ry="6.5" fill="#3d2314" />
              <circle cx="61.5" cy="47" r="2.2" fill="#FFFFFF" />
              <circle cx="65" cy="51" r="1.1" fill="#FFFFFF" />

              {/* Cute Eyebrow highlights */}
              <path
                d="M 33 40 Q 38 38 42 41"
                fill="none"
                stroke="#3d2314"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M 58 41 Q 62 38 67 40"
                fill="none"
                stroke="#3d2314"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Rosy Cheeks */}
          <ellipse cx="27" cy="59" rx="5" ry="3.5" fill="#FDA4AF" opacity="0.6" />
          <ellipse cx="73" cy="59" rx="5" ry="3.5" fill="#FDA4AF" opacity="0.6" />

          {/* Snout & Nose area (wiggles during sniffing) */}
          <g
            className={
              animState === 'sniffing'
                ? 'transition-transform translate-y-[-2px] duration-150'
                : 'transition-transform'
            }
          >
            {/* White fluffy muzzle */}
            <ellipse
              cx="50"
              cy="63"
              rx="15"
              ry="11"
              fill="#FFFFFF"
              stroke="#3d2314"
              strokeWidth="2.5"
            />

            {/* Nose */}
            <path
              d="M 46 59 C 46 56 54 56 54 59 C 54 62 51 64 50 64 C 49 64 46 62 46 59 Z"
              fill="#291407"
            />
            {/* Nose shine */}
            <ellipse cx="48.5" cy="58.5" rx="1.2" ry="0.8" fill="#FFFFFF" />

            {/* Mouth & Tongue */}
            <path
              d="M 50 64 L 50 67 M 45 67 Q 50 71 55 67"
              fill="none"
              stroke="#3d2314"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Open tongue or happy smile */}
            {isExcited || animState === 'perking' ? (
              <path
                d="M 47 68 C 47 74 53 74 53 68 Z"
                fill="#FB7185"
                stroke="#3d2314"
                strokeWidth="1.8"
              />
            ) : null}

            {/* Sniffing little air puffs indicator */}
            {animState === 'sniffing' && (
              <g className="animate-pulse">
                <circle cx="38" cy="56" r="1.5" fill="#93C5FD" />
                <circle cx="34" cy="53" r="2" fill="#93C5FD" opacity="0.7" />
                <circle cx="62" cy="56" r="1.5" fill="#93C5FD" />
                <circle cx="66" cy="53" r="2" fill="#93C5FD" opacity="0.7" />
              </g>
            )}
          </g>

          {/* Collar & Golden Jingle Bell */}
          <path
            d="M 32 80 C 40 85 60 85 68 80"
            fill="none"
            stroke="#1E293B"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Bell */}
          <circle
            cx="50"
            cy="84"
            r="6"
            fill="#FBBF24"
            stroke="#3d2314"
            strokeWidth="2"
            className="group-hover:rotate-12 transition-transform origin-center"
          />
          <circle cx="50" cy="85.5" r="1.2" fill="#78350F" />
        </svg>

        {/* Small floating activity badge */}
        <span className="absolute -bottom-1 -right-1 text-[10px] bg-amber-400 border border-amber-950 rounded-full px-1 py-0.2 font-black text-amber-950 shadow-[1px_1px_0px_#3d2314] scale-90 group-hover:scale-105 transition-transform">
          {animState === 'sniffing' ? '👃' : animState === 'blinking' ? '✨' : '🐾'}
        </span>
      </div>
    </div>
  );
};
