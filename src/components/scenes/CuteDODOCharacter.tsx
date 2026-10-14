import React from 'react';

export type DogAnimationState =
  | 'idle'
  | 'walk'
  | 'run'
  | 'play'
  | 'sit'
  | 'look'
  | 'pet'
  | 'eat'
  | 'rest';

export interface CuteDODOCharacterProps {
  state: DogAnimationState;
  facing?: 'left' | 'right';
  className?: string;
  isBlinking?: boolean;
  tailWagSpeed?: 'slow' | 'fast' | 'normal' | 'none';
  onClick?: () => void;
  onMouseEnter?: () => void;
  scale?: number;
}

export const CuteDODOCharacter: React.FC<CuteDODOCharacterProps> = ({
  state,
  facing = 'right',
  className = '',
  isBlinking = false,
  tailWagSpeed = 'normal',
  onClick,
  onMouseEnter,
  scale = 1,
}) => {
  // Flip transform for facing direction
  const flip = facing === 'left' ? 'scaleX(-1)' : 'scaleX(1)';

  // Determine state-specific posture transforms
  let bodyTransform = 'translate(0, 0)';
  let headTransform = 'translate(0, 0) rotate(0deg)';
  let frontLegsTransform = 'translate(0, 0)';
  let backLegsTransform = 'translate(0, 0)';
  let tailTransform = 'rotate(0deg)';
  let tailAnim = 'animate-wag';

  if (tailWagSpeed === 'fast') {
    tailAnim = 'animate-[wagSlow_0.5s_ease-in-out_infinite]';
  } else if (tailWagSpeed === 'slow') {
    tailAnim = 'animate-[wagSlow_2s_ease-in-out_infinite]';
  } else if (tailWagSpeed === 'none') {
    tailAnim = '';
  }

  switch (state) {
    case 'walk':
      bodyTransform = 'translate(0, -3px)';
      headTransform = 'translate(1px, -2px) rotate(2deg)';
      frontLegsTransform = 'translate(0, -2px)';
      backLegsTransform = 'translate(0, 2px)';
      tailTransform = 'rotate(15deg)';
      break;

    case 'run':
      bodyTransform = 'translate(0, -6px) scaleY(0.95)';
      headTransform = 'translate(4px, -4px) rotate(6deg)';
      frontLegsTransform = 'translate(4px, -5px)';
      backLegsTransform = 'translate(-4px, 3px)';
      tailTransform = 'rotate(25deg)';
      tailAnim = 'animate-[wagSlow_0.4s_ease-in-out_infinite]';
      break;

    case 'play': // Playful bow: front down, rear up
      bodyTransform = 'translate(0, 4px) rotate(8deg)';
      headTransform = 'translate(4px, 8px) rotate(-6deg)';
      frontLegsTransform = 'translate(2px, 6px) scaleY(0.7)';
      backLegsTransform = 'translate(-2px, -3px) scaleY(1.1)';
      tailTransform = 'rotate(35deg)';
      tailAnim = 'animate-[wagSlow_0.4s_ease-in-out_infinite]';
      break;

    case 'sit':
      bodyTransform = 'translate(0, 6px) scaleY(0.92)';
      headTransform = 'translate(0, 2px) rotate(-3deg)';
      frontLegsTransform = 'translate(0, 4px)';
      backLegsTransform = 'translate(0, 10px) scaleY(0.65)';
      tailTransform = 'rotate(-10deg)';
      break;

    case 'look': // Curious head tilt towards viewer
      bodyTransform = 'translate(0, 2px)';
      headTransform = 'translate(0, 0) rotate(16deg)';
      tailTransform = 'rotate(10deg)';
      break;

    case 'pet': // Leaning lovingly into hand, eyes closed, tail wagging rapidly
      bodyTransform = 'translate(0, 3px) rotate(4deg)';
      headTransform = 'translate(3px, 1px) rotate(8deg)';
      tailTransform = 'rotate(20deg)';
      tailAnim = 'animate-[wagSlow_0.5s_ease-in-out_infinite]';
      break;

    case 'eat': // Head lowered into bowl, rhythmic chewing
      bodyTransform = 'translate(0, 4px) rotate(6deg)';
      headTransform = 'translate(5px, 14px) rotate(-10deg)';
      frontLegsTransform = 'translate(1px, 4px)';
      tailTransform = 'rotate(15deg)';
      break;

    case 'rest': // Lying down comfortably
      bodyTransform = 'translate(0, 12px) scaleY(0.75) scaleX(1.05)';
      headTransform = 'translate(3px, 10px) rotate(-4deg)';
      frontLegsTransform = 'translate(0, 12px) scaleY(0.4)';
      backLegsTransform = 'translate(0, 12px) scaleY(0.4)';
      tailTransform = 'rotate(-5deg)';
      tailAnim = 'animate-[wagSlow_3s_ease-in-out_infinite]';
      break;

    case 'idle':
    default:
      bodyTransform = 'translate(0, 0)';
      headTransform = 'translate(0, 0)';
      break;
  }

  const isEating = state === 'eat';
  const isPetting = state === 'pet';
  const isResting = state === 'rest';

  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      style={{
        transform: `${flip} scale(${scale})`,
        transformOrigin: 'bottom center',
      }}
      className={`relative inline-block cursor-pointer select-none transition-transform duration-300 ${className}`}
    >
      <svg
        viewBox="0 0 160 140"
        className="w-32 h-28 sm:w-40 sm:h-36 drop-shadow-[2px_3px_0px_#3d2314] overflow-visible"
      >
        {/* Shadow on ground plane */}
        <ellipse
          cx="78"
          cy="126"
          rx={state === 'rest' ? '54' : '44'}
          ry={state === 'rest' ? '12' : '10'}
          fill="#3d2314"
          opacity="0.18"
        />

        {/* --- TAIL (Wags at the back) --- */}
        <g
          style={{ transform: tailTransform, transformOrigin: '28px 75px' }}
          className={`transition-transform duration-300 ${tailAnim}`}
        >
          {/* Fluffy plume tail curving up */}
          <path
            d="M 28 78 C 14 65 6 42 20 28 C 30 18 42 30 36 48 C 32 60 30 70 28 78 Z"
            fill="#FFFDF7"
            stroke="#3d2314"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Brown fur patch on tail */}
          <path
            d="M 18 36 C 22 28 32 30 30 40 C 26 48 20 44 18 36 Z"
            fill="#9C6638"
          />
        </g>

        {/* --- BACK LEGS --- */}
        <g style={{ transform: backLegsTransform }} className="transition-transform duration-300">
          {/* Rear Left Paw */}
          <path
            d="M 38 88 C 34 98 32 114 36 122 C 40 126 50 126 52 120 C 54 110 50 94 46 88 Z"
            fill="#FFFDF7"
            stroke="#3d2314"
            strokeWidth="3"
          />
          {/* Rear Right Paw */}
          <path
            d="M 52 86 C 48 98 48 114 52 122 C 56 126 64 126 66 120 C 68 110 64 94 60 86 Z"
            fill="#F4EDE0"
            stroke="#3d2314"
            strokeWidth="3"
          />
        </g>

        {/* --- BODY --- */}
        <g style={{ transform: bodyTransform }} className="transition-transform duration-300">
          {/* Fluffy CuteDODO Body (White with rich brown saddle patch) */}
          <ellipse
            cx="68"
            cy="84"
            rx="36"
            ry="26"
            fill="#FFFDF7"
            stroke="#3d2314"
            strokeWidth="3.5"
          />
          {/* Brown saddle patch on back */}
          <path
            d="M 44 68 C 50 62 76 64 88 74 C 92 84 84 94 72 96 C 58 98 44 92 42 80 Z"
            fill="#9C6638"
            stroke="#3d2314"
            strokeWidth="2.5"
          />
          {/* Fluffy body tufts */}
          <path
            d="M 50 98 C 54 104 64 104 68 98"
            fill="none"
            stroke="#E5DAC8"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* --- FRONT LEGS --- */}
        <g style={{ transform: frontLegsTransform }} className="transition-transform duration-300">
          {/* Front Left Paw */}
          <path
            d="M 76 86 C 74 98 72 116 76 122 C 80 126 90 126 92 120 C 94 110 90 92 86 86 Z"
            fill="#FFFDF7"
            stroke="#3d2314"
            strokeWidth="3"
          />
          {/* Front Right Paw */}
          <path
            d="M 92 86 C 90 98 90 116 94 122 C 98 126 106 126 108 120 C 110 110 106 92 102 86 Z"
            fill="#F4EDE0"
            stroke="#3d2314"
            strokeWidth="3"
          />
        </g>

        {/* --- HEAD & NECK --- */}
        <g style={{ transform: headTransform, transformOrigin: '96px 56px' }} className="transition-transform duration-300">
          
          {/* Left Floppy Brown Ear */}
          <path
            d="M 76 42 C 64 45 60 70 66 82 C 72 88 80 80 82 62 Z"
            fill="#7C4A27"
            stroke="#3d2314"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Right Floppy Brown Ear */}
          <path
            d="M 124 42 C 136 45 140 70 134 82 C 128 88 120 80 118 62 Z"
            fill="#7C4A27"
            stroke="#3d2314"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Main Head Base (Fluffy white sphere) */}
          <circle
            cx="100"
            cy="56"
            r="30"
            fill="#FFFDF7"
            stroke="#3d2314"
            strokeWidth="3.5"
          />

          {/* Brown facial fur mask (forehead & eyes) */}
          <path
            d="M 80 46 C 78 32 94 30 100 32 C 106 30 122 32 120 46 C 114 48 110 42 100 42 C 90 42 86 48 80 46 Z"
            fill="#9C6638"
            stroke="#3d2314"
            strokeWidth="2.5"
          />

          {/* Topknot Fluff + Cyan Bow */}
          <path
            d="M 95 30 C 95 20 105 20 105 30 Z"
            fill="#FFFDF7"
            stroke="#3d2314"
            strokeWidth="2.5"
          />
          <circle cx="100" cy="28" r="3.5" fill="#38BDF8" stroke="#3d2314" strokeWidth="2" />

          {/* EYES */}
          {isBlinking || isPetting || isResting ? (
            // Curved closed happy eyes (^.^)
            <g>
              <path
                d="M 86 52 Q 91 57 96 52"
                fill="none"
                stroke="#3d2314"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M 104 52 Q 109 57 114 52"
                fill="none"
                stroke="#3d2314"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </g>
          ) : (
            // Big sparkling round eyes
            <g>
              {/* Left Eye */}
              <ellipse cx="89" cy="52" rx="4.8" ry="5.8" fill="#3d2314" />
              <circle cx="87.5" cy="50" r="1.8" fill="#FFFFFF" />
              <circle cx="90.5" cy="53.5" r="0.9" fill="#FFFFFF" />

              {/* Right Eye */}
              <ellipse cx="111" cy="52" rx="4.8" ry="5.8" fill="#3d2314" />
              <circle cx="109.5" cy="50" r="1.8" fill="#FFFFFF" />
              <circle cx="112.5" cy="53.5" r="0.9" fill="#FFFFFF" />

              {/* Cute Eyebrows */}
              <path d="M 85 45 Q 89 43 93 46" fill="none" stroke="#3d2314" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 107 46 Q 111 43 115 45" fill="none" stroke="#3d2314" strokeWidth="1.8" strokeLinecap="round" />
            </g>
          )}

          {/* Rosy Cheeks */}
          <ellipse cx="80" cy="61" rx="4.5" ry="3" fill="#FDA4AF" opacity="0.6" />
          <ellipse cx="120" cy="61" rx="4.5" ry="3" fill="#FDA4AF" opacity="0.6" />

          {/* SNOUT & NOSE */}
          <ellipse
            cx="100"
            cy="65"
            rx="13"
            ry="9.5"
            fill="#FFFFFF"
            stroke="#3d2314"
            strokeWidth="2.2"
          />
          {/* Black Nose */}
          <path
            d="M 96.5 61.5 C 96.5 59 103.5 59 103.5 61.5 C 103.5 64 101 66 100 66 C 99 66 96.5 64 96.5 61.5 Z"
            fill="#291407"
          />
          <ellipse cx="98.5" cy="61" rx="1" ry="0.6" fill="#FFFFFF" />

          {/* Mouth & Tongue */}
          <path
            d="M 100 66 L 100 68.5 M 96 68.5 Q 100 71.5 104 68.5"
            fill="none"
            stroke="#3d2314"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Happy open tongue in Play, Run, or Pet state */}
          {(state === 'play' || state === 'run' || state === 'pet') && (
            <path
              d="M 97.5 69.5 C 97.5 75 102.5 75 102.5 69.5 Z"
              fill="#FB7185"
              stroke="#3d2314"
              strokeWidth="1.5"
            />
          )}

          {/* Chewing food in eating state */}
          {isEating && (
            <g className="animate-bounce">
              <circle cx="98" cy="72" r="1.5" fill="#B45309" />
              <circle cx="102" cy="71" r="1.2" fill="#B45309" />
            </g>
          )}

          {/* Collar & Golden Jingle Bell */}
          <path
            d="M 84 80 C 92 84 108 84 116 80"
            fill="none"
            stroke="#1E293B"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle
            cx="100"
            cy="84"
            r="5"
            fill="#FBBF24"
            stroke="#3d2314"
            strokeWidth="1.8"
          />
          <circle cx="100" cy="85" r="1" fill="#78350F" />
        </g>
      </svg>
    </div>
  );
};
