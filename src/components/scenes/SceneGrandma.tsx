import React, { useState } from 'react';
import { CuteDODOCharacter, DogAnimationState } from './CuteDODOCharacter';
import { sounds } from '../../utils/soundEffects';
import { Heart, Sparkles, Play, RotateCcw } from 'lucide-react';

export const SceneGrandma: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [dogState, setDogState] = useState<DogAnimationState>('sit');
  const [dogPosition, setDogPosition] = useState(65); // percentage along X
  const [grandmaPetting, setGrandmaPetting] = useState(false);
  const [isPlayingStory, setIsPlayingStory] = useState(false);

  const storySteps = [
    {
      title: 'Grandma sits peacefully',
      text: 'Grandma sits comfortably on her traditional wooden veranda chair in Chennai, enjoying the morning breeze.',
      dogAction: 'idle' as DogAnimationState,
      pos: 70,
      petting: false,
    },
    {
      title: 'Grandma calls CuteDODO',
      text: 'Grandma gently claps her hands: "Dodo-kanna, come here little one!" 🐶',
      dogAction: 'look' as DogAnimationState,
      pos: 65,
      petting: false,
    },
    {
      title: 'Dodo trots over happily',
      text: 'Dodo prances across the veranda with his bell jingling, looking up with big brown puppy eyes! 🐾',
      dogAction: 'walk' as DogAnimationState,
      pos: 42,
      petting: false,
    },
    {
      title: 'Grandma reaches down to pet',
      text: 'Grandma tenderly strokes Dodo behind his fluffy ears. Dodo wags rapidly and leans into her hand with pure love! ❤️',
      dogAction: 'pet' as DogAnimationState,
      pos: 40,
      petting: true,
    },
    {
      title: 'Grandma gives a sweet biscuit toy',
      text: 'She offers him a tiny biscuit toy. Dodo does a joyful puppy bow and dances in circles! 🦴✨',
      dogAction: 'play' as DogAnimationState,
      pos: 45,
      petting: false,
    },
    {
      title: 'Resting by Grandma’s feet',
      text: 'After play, Dodo curls up warmly at Grandma’s feet for an afternoon nap. A true family bond.',
      dogAction: 'rest' as DogAnimationState,
      pos: 38,
      petting: true,
    },
  ];

  const advanceStep = (stepIdx: number) => {
    setCurrentStep(stepIdx);
    const s = storySteps[stepIdx];
    setDogState(s.dogAction);
    setDogPosition(s.pos);
    setGrandmaPetting(s.petting);

    if (s.petting) sounds.bell();
    else if (s.dogAction === 'play') sounds.bark();
    else sounds.pop();
  };

  const playFullStory = async () => {
    if (isPlayingStory) return;
    setIsPlayingStory(true);

    for (let i = 0; i < storySteps.length; i++) {
      advanceStep(i);
      await new Promise((res) => setTimeout(res, 2600));
    }

    setIsPlayingStory(false);
  };

  const currentStory = storySteps[currentStep];

  return (
    <div className="cartoon-card bg-linear-to-b from-amber-100 via-rose-50 to-amber-50 rounded-3xl p-5 sm:p-8 relative overflow-hidden">
      
      {/* Title & Story Step Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-amber-950/10">
        <div>
          <span className="text-xs font-bold text-rose-900 bg-rose-200 border border-amber-950 px-2.5 py-0.5 rounded-full shadow-[1px_1px_0px_#3d2314] inline-block mb-1">
            Scene 03 · Grandma&apos;s Love
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-cartoon text-amber-950">
            A Grandmother Playing With Her CuteDODO
          </h3>
        </div>

        <div className="bg-white border-2 border-amber-950 rounded-2xl px-4 py-2 shadow-[2px_2px_0px_#3d2314] text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-2">
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500 shrink-0" />
          <span>Step {currentStep + 1} of 6: {currentStory.title}</span>
        </div>
      </div>

      {/* Main Warm Veranda / Balcony Setting Canvas */}
      <div className="relative h-72 sm:h-92 bg-linear-to-b from-amber-100/70 to-[#FFF3DC] rounded-2xl border-3 border-amber-950 overflow-hidden shadow-inner mb-6">
        
        {/* Soft sunlight rays and traditional kolam pattern */}
        <div className="absolute top-4 right-8 text-4xl select-none animate-float opacity-30">☀️</div>
        <div className="absolute top-10 left-10 text-3xl select-none opacity-40">🪴</div>
        <div className="absolute top-14 right-24 text-2xl select-none opacity-40">🪟</div>
        
        {/* Veranda Wooden Railing / Garden plants */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-[#F5DEB3] border-t-2 border-amber-950 flex items-center justify-between px-6 text-xs text-amber-950/40 select-none">
          <span>🌿 Marigold &amp; Tulsi Garden</span>
          <span>Chennai Traditional Veranda 🌸</span>
        </div>

        {/* --- GRANDMOTHER IN HER VERANDA CHAIR --- */}
        <div className="absolute left-8 sm:left-14 bottom-12 z-10">
          <svg viewBox="0 0 160 180" className="w-36 h-44 sm:w-44 sm:h-52 drop-shadow-[2px_3px_0px_#3d2314] overflow-visible">
            
            {/* Wooden Armchair */}
            <path
              d="M 20 80 L 32 30 L 76 30 L 80 80 L 82 155 L 70 155 L 68 110 L 32 110 L 30 155 L 18 155 Z"
              fill="#78350F"
              stroke="#3d2314"
              strokeWidth="3"
            />
            {/* Soft Chair Cushion */}
            <rect x="26" y="80" width="54" height="28" rx="8" fill="#FDE68A" stroke="#3d2314" strokeWidth="2" />

            {/* Grandma's Traditional Cotton Saree (Soft Saffron / Maroon border) */}
            <path
              d="M 32 65 C 32 50 68 48 72 65 L 78 135 C 78 145 28 145 28 135 Z"
              fill="#F97316"
              stroke="#3d2314"
              strokeWidth="3"
            />
            {/* Saree Pallu drape */}
            <path
              d="M 36 60 Q 55 90 70 115"
              fill="none"
              stroke="#991B1B"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Grandma's Head & Face */}
            <circle cx="52" cy="38" r="17" fill="#FBBF24" stroke="#3d2314" strokeWidth="2.5" />
            {/* Silver / Grey Hair Bun */}
            <ellipse cx="50" cy="24" rx="15" ry="10" fill="#E2E8F0" stroke="#3d2314" strokeWidth="2.5" />
            <circle cx="34" cy="28" r="8" fill="#CBD5E1" stroke="#3d2314" strokeWidth="2" />
            
            {/* Glasses & Gentle Smile */}
            <circle cx="48" cy="37" r="4" fill="none" stroke="#78350F" strokeWidth="1.5" />
            <circle cx="58" cy="37" r="4" fill="none" stroke="#78350F" strokeWidth="1.5" />
            <line x1="52" y1="37" x2="54" y2="37" stroke="#78350F" strokeWidth="1.5" />
            <path d="M 50 45 Q 54 48 58 45" fill="none" stroke="#3d2314" strokeWidth="1.8" strokeLinecap="round" />
            {/* Traditional Bindi */}
            <circle cx="53" cy="32" r="1.5" fill="#DC2626" />

            {/* Grandma's Gentle Arm Reaching Down (Petting animation) */}
            <g
              style={{
                transform: grandmaPetting ? 'rotate(12deg)' : 'rotate(0deg)',
                transformOrigin: '68px 65px',
                transition: 'transform 0.4s ease',
              }}
            >
              <path
                d="M 66 65 Q 85 90 102 110"
                fill="none"
                stroke="#F97316"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Grandma's hand */}
              <circle cx="104" cy="112" r="6" fill="#FBBF24" stroke="#3d2314" strokeWidth="2" />
              {/* Golden bangle */}
              <circle cx="98" cy="106" r="3" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
            </g>
          </svg>
        </div>

        {/* --- CUTE DODO CHARACTER INTERACTING WITH GRANDMA --- */}
        <div
          style={{
            left: `${dogPosition}%`,
            transition: 'left 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="absolute bottom-11 z-20"
        >
          <CuteDODOCharacter
            state={dogState}
            facing="left"
            scale={1.05}
            tailWagSpeed={grandmaPetting ? 'fast' : 'normal'}
            onClick={() => {
              sounds.bark();
              advanceStep(3); // Jump to affectionate petting
            }}
          />
        </div>

      </div>

      {/* Narrative Story Description Box */}
      <div className="bg-white border-2 border-amber-950 rounded-2xl p-4 shadow-[2px_2px_0px_#3d2314] mb-6">
        <p className="text-sm sm:text-base font-semibold text-amber-950 leading-relaxed">
          {currentStory.text}
        </p>
      </div>

      {/* Interactive Story Progression Stepper */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {storySteps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => advanceStep(idx)}
              className={`cartoon-btn px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentStep === idx
                  ? 'bg-amber-400 text-amber-950 shadow-[2px_2px_0px_#3d2314]'
                  : 'bg-white text-amber-900/80 hover:bg-amber-50'
              }`}
            >
              <span>{idx + 1}. {step.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={isPlayingStory}
            onClick={playFullStory}
            className="cartoon-btn px-4 py-2 bg-rose-400 hover:bg-rose-300 text-rose-950 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#3d2314]"
          >
            <Play className="w-3.5 h-3.5 fill-rose-950" />
            <span>{isPlayingStory ? 'Playing...' : 'Play Full Story'}</span>
          </button>

          <button
            onClick={() => advanceStep(0)}
            className="cartoon-btn p-2 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-xl text-xs font-bold"
            title="Reset scene to beginning"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
