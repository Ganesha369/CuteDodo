import React, { useState, useEffect } from 'react';
import { CuteDODOCharacter, DogAnimationState } from './CuteDODOCharacter';
import { sounds } from '../../utils/soundEffects';
import { Footprints, Pause, Play, Sparkles } from 'lucide-react';

export const SceneWalking: React.FC = () => {
  const [isWalking, setIsWalking] = useState(true);
  const [dogAction, setDogAction] = useState<DogAnimationState>('walk');
  const [walkPhase, setWalkPhase] = useState(0);
  const [statusText, setStatusText] = useState('Enjoying a pleasant stroll through Chennai Park! 🌳');

  // Coordinated walking loop
  useEffect(() => {
    if (!isWalking) return;

    const interval = setInterval(() => {
      setWalkPhase((prev) => (prev + 1) % 100);
    }, 120);

    return () => clearInterval(interval);
  }, [isWalking]);

  // Occasional natural pauses where Dodo sniffs the ground or checks out a butterfly
  useEffect(() => {
    if (!isWalking) return;

    const sniffTimer = setInterval(() => {
      // Pause walking briefly for sniffing
      setDogAction('eat'); // Head down sniffing ground
      setStatusText('Dodo stopped to sniff a sweet flower on the path! 🌸👃');
      sounds.pop();

      setTimeout(() => {
        setDogAction('look');
        setStatusText('Looking around curiously at birds in the trees! 🐦');
        setTimeout(() => {
          setDogAction('walk');
          setStatusText('Continuing the lovely walk together! 🐾🚶‍♂️');
        }, 1200);
      }, 1500);
    }, 8000);

    return () => clearInterval(sniffTimer);
  }, [isWalking]);

  const toggleWalk = () => {
    sounds.bell();
    const nextState = !isWalking;
    setIsWalking(nextState);
    if (nextState) {
      setDogAction('walk');
      setStatusText('Off we go! Leash secure, happy paws marching! 🐾');
    } else {
      setDogAction('sit');
      setStatusText('Taking a peaceful break under the shady neem tree. 🍃');
    }
  };

  // Coordinated leg cycle for the walking man
  const manLegAngle1 = isWalking ? Math.sin(walkPhase * 0.4) * 20 : 0;
  const manLegAngle2 = isWalking ? -Math.sin(walkPhase * 0.4) * 20 : 0;
  const manArmAngle = isWalking ? Math.sin(walkPhase * 0.4) * 15 : 0;
  const manBobY = isWalking ? Math.abs(Math.sin(walkPhase * 0.4)) * 4 : 0;

  // Hand position coordinates for the leash (relative to canvas)
  const handX = 148;
  const handY = 120 + manBobY;
  // Dog collar position
  const dogCollarX = 220;
  const dogCollarY = 152;

  return (
    <div className="cartoon-card bg-linear-to-b from-sky-100 via-amber-50 to-emerald-100 rounded-3xl p-5 sm:p-8 relative overflow-hidden">
      
      {/* Title & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-amber-950/10">
        <div>
          <span className="text-xs font-bold text-amber-800 bg-sky-200 border border-amber-950 px-2.5 py-0.5 rounded-full shadow-[1px_1px_0px_#3d2314] inline-block mb-1">
            Scene 02 · Park Walk
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-cartoon text-amber-950">
            A Man Taking His CuteDODO for a Walk
          </h3>
        </div>

        <div className="bg-white border-2 border-amber-950 rounded-2xl px-4 py-2 shadow-[2px_2px_0px_#3d2314] text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
          <span>{statusText}</span>
        </div>
      </div>

      {/* Main Walking Canvas with parallax scrolling background */}
      <div className="relative h-72 sm:h-88 bg-linear-to-b from-sky-200/60 to-emerald-100/60 rounded-2xl border-3 border-amber-950 overflow-hidden shadow-inner mb-6">
        
        {/* Parallax moving park background (trees, clouds, fence) */}
        <div
          className={`absolute inset-0 opacity-70 ${isWalking ? 'animate-walk-bg' : ''}`}
          style={{
            backgroundImage: `radial-gradient(circle at 50px 40px, #FFFFFF 15px, transparent 16px),
                              radial-gradient(circle at 180px 30px, #FFFFFF 22px, transparent 23px),
                              radial-gradient(circle at 320px 45px, #FFFFFF 18px, transparent 19px)`,
            backgroundSize: '400px 100%',
          }}
        />

        {/* Trees & Foliage in breeze */}
        <div className="absolute top-8 left-12 text-5xl select-none animate-float opacity-80">🌳</div>
        <div className="absolute top-6 right-20 text-6xl select-none animate-float opacity-80" style={{ animationDelay: '2s' }}>🌴</div>
        <div className="absolute top-16 right-1/3 text-4xl select-none animate-float opacity-60" style={{ animationDelay: '1s' }}>🌿</div>

        {/* Paved walking path with moving pebbles */}
        <div className="absolute bottom-0 inset-x-0 h-22 bg-[#EADCC9] border-t-3 border-amber-950 flex flex-col justify-between p-2">
          <div className="flex justify-around text-xs opacity-40 select-none">
            <span>· · ·</span><span>· · ·</span><span>· · ·</span><span>· · ·</span><span>· · ·</span>
          </div>
          <div className="flex justify-between px-6 text-sm opacity-50 select-none">
            <span>🌼</span><span>🍃</span><span>🌱</span><span>🌸</span><span>🍃</span>
          </div>
        </div>

        {/* SVG Canvas for Man, Connected Leash, and Dog */}
        <div className="absolute inset-0 flex items-end justify-center pb-6">
          <div className="relative w-96 h-64">
            
            {/* --- THE STANDING / WALKING MAN --- */}
            <svg
              viewBox="0 0 160 220"
              className="absolute left-8 bottom-3 w-36 h-52 drop-shadow-[2px_3px_0px_#3d2314] overflow-visible"
              style={{ transform: `translateY(${-manBobY}px)` }}
            >
              {/* Man Ground Shadow */}
              <ellipse cx="65" cy="208" rx="28" ry="8" fill="#3d2314" opacity="0.2" />

              {/* Back Leg */}
              <g style={{ transform: `rotate(${manLegAngle2}deg)`, transformOrigin: '65px 135px' }}>
                <path
                  d="M 62 135 L 56 175 L 54 205 L 68 205 L 70 175 Z"
                  fill="#1E293B"
                  stroke="#3d2314"
                  strokeWidth="2.5"
                />
                {/* Shoe */}
                <path d="M 50 205 C 50 200 68 200 74 205 L 76 210 L 48 210 Z" fill="#92400E" stroke="#3d2314" strokeWidth="2" />
              </g>

              {/* Front Leg */}
              <g style={{ transform: `rotate(${manLegAngle1}deg)`, transformOrigin: '65px 135px' }}>
                <path
                  d="M 68 135 L 74 175 L 76 205 L 90 205 L 86 175 Z"
                  fill="#334155"
                  stroke="#3d2314"
                  strokeWidth="2.5"
                />
                {/* Shoe */}
                <path d="M 72 205 C 72 200 90 200 96 205 L 98 210 L 70 210 Z" fill="#92400E" stroke="#3d2314" strokeWidth="2" />
              </g>

              {/* Torso / Casual Shirt */}
              <path
                d="M 45 75 L 85 75 L 88 140 L 42 140 Z"
                fill="#38BDF8"
                stroke="#3d2314"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path d="M 65 75 L 65 140" stroke="#0284C7" strokeWidth="2" />

              {/* Man's Head */}
              <circle cx="65" cy="46" r="18" fill="#FBBF24" stroke="#3d2314" strokeWidth="3" />
              {/* Hair */}
              <path
                d="M 48 42 C 48 26 82 24 82 42 C 78 35 54 34 48 42 Z"
                fill="#451A03"
                stroke="#3d2314"
                strokeWidth="2.5"
              />
              {/* Friendly smiling face */}
              <circle cx="72" cy="44" r="2.5" fill="#3d2314" />
              <path d="M 68 52 Q 74 57 78 52" fill="none" stroke="#3d2314" strokeWidth="2" strokeLinecap="round" />

              {/* Left Arm holding leash extending forward */}
              <g style={{ transform: `rotate(${manArmAngle}deg)`, transformOrigin: '50px 80px' }}>
                <path
                  d="M 50 82 Q 75 100 95 110"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <circle cx="98" cy="112" r="5" fill="#FBBF24" stroke="#3d2314" strokeWidth="2" />
              </g>
            </svg>

            {/* --- VISUALLY CONNECTED LEASH (Dynamic Curve) --- */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
            >
              {/* Leash line with natural catenary sag */}
              <path
                d={`M ${handX} ${handY} Q ${(handX + dogCollarX) / 2} ${Math.max(handY, dogCollarY) + 12} ${dogCollarX} ${dogCollarY}`}
                fill="none"
                stroke="#B45309"
                strokeWidth="3.5"
                strokeDasharray={isWalking ? 'none' : '4 2'}
                strokeLinecap="round"
                className="drop-shadow-xs"
              />
              {/* Leash clasp at collar */}
              <circle cx={dogCollarX} cy={dogCollarY} r="3" fill="#F59E0B" stroke="#3d2314" strokeWidth="1.5" />
            </svg>

            {/* --- CUTEDODO WALKING BESIDE HIM --- */}
            <div className="absolute right-6 bottom-4 z-20">
              <CuteDODOCharacter
                state={dogAction}
                facing="right"
                tailWagSpeed={isWalking ? 'normal' : 'slow'}
                scale={1}
                onClick={() => {
                  sounds.bark();
                  setDogAction('play');
                  setStatusText('Dodo wags and does a joyful hop on the leash! 🐶❤️');
                  setTimeout(() => {
                    setDogAction(isWalking ? 'walk' : 'sit');
                  }, 1200);
                }}
              />
            </div>

          </div>
        </div>

      </div>

      {/* Control Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleWalk}
            className="cartoon-btn px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-cartoon font-bold rounded-2xl flex items-center gap-2 text-sm shadow-[3px_3px_0px_#3d2314]"
          >
            {isWalking ? (
              <>
                <Pause className="w-4 h-4 text-amber-950" />
                <span>Pause Walk (Take a rest)</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-amber-950" />
                <span>Let&apos;s go for a walk! 🐾</span>
              </>
            )}
          </button>

          <span className="text-xs font-semibold text-amber-900 hidden sm:inline">
            Status: {isWalking ? 'Walking smoothly in pace' : 'Resting on sidewalk'}
          </span>
        </div>

        <button
          onClick={() => {
            sounds.pop();
            setDogAction('eat');
            setStatusText('Dodo found an interesting scent trail to explore! 🌿👃');
            setTimeout(() => {
              setDogAction(isWalking ? 'walk' : 'sit');
            }, 1800);
          }}
          className="cartoon-btn px-4 py-2 bg-emerald-200 hover:bg-emerald-300 text-emerald-950 rounded-xl text-xs font-bold flex items-center gap-1.5"
        >
          <Footprints className="w-3.5 h-3.5" />
          <span>Sniff the Ground 🌸</span>
        </button>
      </div>

    </div>
  );
};
