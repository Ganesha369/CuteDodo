import React, { useState } from 'react';
import { Play, Pause, Sun, Moon, Sunset, Sparkles, Heart } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface ForestDriveSceneProps {
  className?: string;
}

export const ForestDriveScene: React.FC<ForestDriveSceneProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'sunset' | 'night'>('day');
  const [speed, setSpeed] = useState<'cruise' | 'turbo'>('cruise');
  const [honking, setHonking] = useState(false);
  const [dodoHappy, setDodoHappy] = useState(false);
  const [ownerWaving, setOwnerWaving] = useState(false);
  const [speechText, setSpeechText] = useState<string | null>(null);

  // Trigger Horn
  const triggerHorn = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    sounds.carHorn();
    setHonking(true);
    setSpeechText('BEEP BEEP! 📯💨');
    setTimeout(() => setHonking(false), 900);
    setTimeout(() => setSpeechText(null), 2400);
  };

  // Click on Dodo
  const petDodo = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.bark();
    sounds.bell();
    setDodoHappy(true);
    setSpeechText('Woof! The breeze feels amazing! 🐾❤️');
    setTimeout(() => setDodoHappy(false), 1600);
    setTimeout(() => setSpeechText(null), 2500);
  };

  // Click on Owner
  const waveOwner = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.pop();
    setOwnerWaving(true);
    setSpeechText('Cruising Chennai to the hills with Dodo! 🚗✨');
    setTimeout(() => setOwnerWaving(false), 1600);
    setTimeout(() => setSpeechText(null), 2500);
  };

  const isFast = speed === 'turbo';
  const animPlayState = isPlaying ? 'running' : 'paused';

  // Synchronized animation durations
  // Road wave period: 4.0s (cruise) / 2.2s (turbo)
  // Car wavy pitch & roll matches the wave period for realistic physics!
  const roadDuration = isFast ? '2.2s' : '4.0s';
  const farTreesDuration = isFast ? '14s' : '24s';
  const nearTreesDuration = isFast ? '7s' : '12s';
  const cloudDuration = isFast ? '35s' : '65s';

  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden border-3 border-[#49200B] shadow-[6px_8px_0px_#49200B] select-none mb-10 ${className}`}
      style={{ minHeight: '400px', height: '420px' }}
      aria-label="Owner and Shih Tzu dog driving on infinite wavy forest highway"
    >
      <style>{`
        /* Perfectly seamless horizontal loops */
        @keyframes roadLoop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes parallaxFarTrees {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes parallaxNearTrees {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes cloudDriftSmooth {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Natural suspension bounce & pitch aligned with the 2-crest sine wave */
        @keyframes carRoadPhysics {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          15% {
            transform: translateY(-8px) rotate(-3deg);
          }
          30% {
            transform: translateY(2px) rotate(0.5deg);
          }
          50% {
            transform: translateY(9px) rotate(3deg);
          }
          65% {
            transform: translateY(0px) rotate(0deg);
          }
          80% {
            transform: translateY(-7px) rotate(-2.5deg);
          }
          92% {
            transform: translateY(5px) rotate(1.5deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        @keyframes wheelSpinSmooth {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes earFlapGentle {
          0%, 100% { transform: rotate(0deg) scaleY(1); }
          50% { transform: rotate(-12deg) scaleY(0.9); }
        }
        @keyframes tailWagHappy {
          0%, 100% { transform: rotate(-14deg); }
          50% { transform: rotate(16deg); }
        }
        @keyframes hairBreeze {
          0%, 100% { transform: skewX(0deg); }
          50% { transform: skewX(-7deg); }
        }
        @keyframes exhaustStream {
          0% {
            opacity: 0.85;
            transform: translate(0, 0) scale(0.6);
          }
          100% {
            opacity: 0;
            transform: translate(-60px, -18px) scale(1.5);
          }
        }
        @keyframes fireflyDrift {
          0%, 100% { transform: translate(0, 0); opacity: 0.35; }
          50% { transform: translate(12px, -15px); opacity: 0.95; }
        }
      `}</style>

      {/* ============================================================ */}
      {/* 1. SKY & DISTANT HORIZON LAYER                                */}
      {/* ============================================================ */}
      <div
        className={`absolute inset-0 transition-colors duration-700 pointer-events-none ${
          timeOfDay === 'day'
            ? 'bg-gradient-to-b from-[#38BDF8] via-[#7DD3FC] via-40% to-[#E0F2FE]'
            : timeOfDay === 'sunset'
            ? 'bg-gradient-to-b from-[#581C87] via-[#BE185D] via-35% via-[#F97316] to-[#FDE047]'
            : 'bg-gradient-to-b from-[#0B0F19] via-[#111827] via-50% to-[#1E293B]'
        }`}
      >
        {/* Celestial Body: Sun / Sunset Glow / Full Moon */}
        {timeOfDay === 'day' && (
          <div className="absolute top-6 right-20 sm:right-28 w-16 h-16 pointer-events-none">
            <div className="absolute -inset-3 rounded-full bg-amber-300/25 blur-md animate-pulse" />
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 shadow-[0_0_24px_rgba(251,191,36,0.7)] flex items-center justify-center border-2 border-amber-500/40">
              <span className="text-2xl">☀️</span>
            </div>
          </div>
        )}

        {timeOfDay === 'sunset' && (
          <div className="absolute top-10 right-20 sm:right-28 w-18 h-18 pointer-events-none">
            <div className="absolute -inset-4 rounded-full bg-rose-500/30 blur-lg" />
            <div className="w-18 h-18 rounded-full bg-gradient-to-t from-rose-500 via-orange-400 to-amber-300 shadow-[0_0_35px_rgba(249,115,22,0.85)] flex items-center justify-center border-2 border-orange-600/40">
              <span className="text-2xl">🌅</span>
            </div>
          </div>
        )}

        {timeOfDay === 'night' && (
          <div className="absolute top-6 right-20 sm:right-28 pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-[#FFFBEB] shadow-[0_0_28px_rgba(255,251,235,0.85)] flex items-center justify-center border border-amber-200/60">
              <span className="text-xl">🌕</span>
            </div>
            {/* Twinkling Night Stars */}
            {[
              { top: '14%', left: '8%' },
              { top: '24%', left: '20%' },
              { top: '12%', left: '36%' },
              { top: '26%', left: '52%' },
              { top: '16%', left: '68%' },
              { top: '10%', left: '84%' },
            ].map((s, idx) => (
              <div
                key={idx}
                className="absolute text-yellow-100 text-xs animate-pulse"
                style={{ top: s.top, left: s.left, animationDuration: `${1.4 + idx * 0.3}s` }}
              >
                ✦
              </div>
            ))}
          </div>
        )}

        {/* Drifting Clouds (Day & Sunset) */}
        {timeOfDay !== 'night' && (
          <div
            className="absolute top-5 left-0 flex gap-40 opacity-80 pointer-events-none"
            style={{
              width: '200%',
              animationName: 'cloudDriftSmooth',
              animationDuration: cloudDuration,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationPlayState: animPlayState,
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center gap-1 text-white/90 filter drop-shadow-sm">
                <span className="text-2xl sm:text-3xl">☁️</span>
              </div>
            ))}
          </div>
        )}

        {/* Distant Mountain Ridge */}
        <svg
          viewBox="0 0 1200 160"
          preserveAspectRatio="none"
          className="absolute bottom-28 inset-x-0 w-full h-24 opacity-50 pointer-events-none"
          fill={timeOfDay === 'night' ? '#0F172A' : timeOfDay === 'sunset' ? '#4A044E' : '#2D6A4F'}
        >
          <path d="M0,160 L0,90 Q140,30 280,80 Q440,130 580,50 Q720,-10 880,65 Q1040,140 1200,50 L1200,160 Z" />
        </svg>

        {/* Soft Horizon Mist Gradient */}
        <div
          className={`absolute bottom-28 inset-x-0 h-16 pointer-events-none ${
            timeOfDay === 'night'
              ? 'bg-gradient-to-t from-[#0B132B]/85 to-transparent'
              : timeOfDay === 'sunset'
              ? 'bg-gradient-to-t from-[#9D174D]/40 to-transparent'
              : 'bg-gradient-to-t from-[#52B788]/30 to-transparent'
          }`}
        />
      </div>

      {/* ============================================================ */}
      {/* 2. INFINITE PARALLAX FOREST TREES (FAR & NEAR)                 */}
      {/* ============================================================ */}
      
      {/* Far Pine Trees Parallax Layer */}
      <div
        className="absolute bottom-24 left-0 flex pointer-events-none z-10"
        style={{
          width: '200%',
          animationName: 'parallaxFarTrees',
          animationDuration: farTreesDuration,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationPlayState: animPlayState,
        }}
      >
        <div className="flex items-end justify-around w-1/2 px-2">
          {Array.from({ length: 12 }).map((_, i) => {
            const h = 70 + (i % 4) * 14;
            const darkPine = timeOfDay === 'night' ? '#132A22' : timeOfDay === 'sunset' ? '#3B1238' : '#1B4332';
            return (
              <div key={i} className="flex flex-col items-center opacity-85" style={{ height: `${h}px` }}>
                <div
                  className="w-0 h-0 border-l-[16px] border-r-[16px] border-b-[40px] border-l-transparent border-r-transparent"
                  style={{ borderBottomColor: darkPine }}
                />
                <div
                  className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[45px] border-l-transparent border-r-transparent -mt-4"
                  style={{ borderBottomColor: darkPine }}
                />
                <div className="w-2 h-5 bg-[#3E2723]" />
              </div>
            );
          })}
        </div>
        {/* Seamless duplicate */}
        <div className="flex items-end justify-around w-1/2 px-2">
          {Array.from({ length: 12 }).map((_, i) => {
            const h = 70 + (i % 4) * 14;
            const darkPine = timeOfDay === 'night' ? '#132A22' : timeOfDay === 'sunset' ? '#3B1238' : '#1B4332';
            return (
              <div key={i} className="flex flex-col items-center opacity-85" style={{ height: `${h}px` }}>
                <div
                  className="w-0 h-0 border-l-[16px] border-r-[16px] border-b-[40px] border-l-transparent border-r-transparent"
                  style={{ borderBottomColor: darkPine }}
                />
                <div
                  className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[45px] border-l-transparent border-r-transparent -mt-4"
                  style={{ borderBottomColor: darkPine }}
                />
                <div className="w-2 h-5 bg-[#3E2723]" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Near Lush Pine & Oak Trees Parallax Layer */}
      <div
        className="absolute bottom-16 left-0 flex pointer-events-none z-15"
        style={{
          width: '200%',
          animationName: 'parallaxNearTrees',
          animationDuration: nearTreesDuration,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationPlayState: animPlayState,
        }}
      >
        <div className="flex items-end justify-around w-1/2 px-2">
          {Array.from({ length: 8 }).map((_, i) => {
            const isOak = i % 3 === 0;
            const treeColor = timeOfDay === 'night' ? '#0E3B29' : timeOfDay === 'sunset' ? '#831843' : '#2D6A4F';
            const highlightColor = timeOfDay === 'night' ? '#1B4D3E' : timeOfDay === 'sunset' ? '#BE185D' : '#40916C';
            return (
              <div key={i} className="flex flex-col items-center" style={{ height: isOak ? '115px' : '130px' }}>
                {isOak ? (
                  <div className="relative">
                    <div
                      className="w-14 h-14 rounded-full border-2 border-[#1B4332]/40 shadow-xs"
                      style={{ backgroundColor: treeColor }}
                    />
                    <div
                      className="w-10 h-10 rounded-full absolute -top-2 left-2"
                      style={{ backgroundColor: highlightColor }}
                    />
                    <div className="w-3.5 h-10 bg-[#4E342E] mx-auto -mt-2 rounded-b" />
                  </div>
                ) : (
                  <>
                    <div
                      className="w-0 h-0 border-l-[22px] border-r-[22px] border-b-[45px] border-l-transparent border-r-transparent filter drop-shadow-xs"
                      style={{ borderBottomColor: highlightColor }}
                    />
                    <div
                      className="w-0 h-0 border-l-[28px] border-r-[28px] border-b-[55px] border-l-transparent border-r-transparent -mt-5"
                      style={{ borderBottomColor: treeColor }}
                    />
                    <div className="w-3 h-6 bg-[#3E2723] rounded-b" />
                  </>
                )}
              </div>
            );
          })}
        </div>
        {/* Seamless duplicate */}
        <div className="flex items-end justify-around w-1/2 px-2">
          {Array.from({ length: 8 }).map((_, i) => {
            const isOak = i % 3 === 0;
            const treeColor = timeOfDay === 'night' ? '#0E3B29' : timeOfDay === 'sunset' ? '#831843' : '#2D6A4F';
            const highlightColor = timeOfDay === 'night' ? '#1B4D3E' : timeOfDay === 'sunset' ? '#BE185D' : '#40916C';
            return (
              <div key={i} className="flex flex-col items-center" style={{ height: isOak ? '115px' : '130px' }}>
                {isOak ? (
                  <div className="relative">
                    <div
                      className="w-14 h-14 rounded-full border-2 border-[#1B4332]/40 shadow-xs"
                      style={{ backgroundColor: treeColor }}
                    />
                    <div
                      className="w-10 h-10 rounded-full absolute -top-2 left-2"
                      style={{ backgroundColor: highlightColor }}
                    />
                    <div className="w-3.5 h-10 bg-[#4E342E] mx-auto -mt-2 rounded-b" />
                  </div>
                ) : (
                  <>
                    <div
                      className="w-0 h-0 border-l-[22px] border-r-[22px] border-b-[45px] border-l-transparent border-r-transparent filter drop-shadow-xs"
                      style={{ borderBottomColor: highlightColor }}
                    />
                    <div
                      className="w-0 h-0 border-l-[28px] border-r-[28px] border-b-[55px] border-l-transparent border-r-transparent -mt-5"
                      style={{ borderBottomColor: treeColor }}
                    />
                    <div className="w-3 h-6 bg-[#3E2723] rounded-b" />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Night fireflies */}
      {timeOfDay === 'night' && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {[
            { top: '40%', left: '15%', delay: '0s' },
            { top: '32%', left: '42%', delay: '0.8s' },
            { top: '50%', left: '68%', delay: '1.4s' },
            { top: '38%', left: '85%', delay: '0.4s' },
            { top: '60%', left: '25%', delay: '1.9s' },
          ].map((f, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_8px_#FDE047]"
              style={{
                top: f.top,
                left: f.left,
                animationName: 'fireflyDrift',
                animationDuration: '3s',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: f.delay,
                animationPlayState: animPlayState,
              }}
            />
          ))}
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. INFINITE WAVY HIGHWAY (PERFECT CONTINUOUS SINE WAVE LOOP)   */}
      {/* ============================================================ */}
      <div className="absolute bottom-0 inset-x-0 h-40 z-20 overflow-hidden pointer-events-none">
        
        {/* Rolling Grassy Hill Verge (Above road) */}
        <div
          className="absolute inset-x-0 -top-3 h-12"
          style={{
            backgroundColor: timeOfDay === 'night' ? '#0F291E' : timeOfDay === 'sunset' ? '#4A1D24' : '#2D6A4F',
            borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
          }}
        />

        {/* Infinite Wavy Road Ribbon SVG Container */}
        <div
          className="absolute inset-0 w-[200%] flex"
          style={{
            animationName: 'roadLoop',
            animationDuration: roadDuration,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationPlayState: animPlayState,
          }}
        >
          {/* Tile 1: Mathematically seamless sine wave from x=0 to x=1000 */}
          <div className="relative w-1/2 h-full">
            <svg
              viewBox="0 0 1000 160"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              {/* Road Asphalt Bed */}
              <path
                d="M 0,55 Q 250,20 500,55 T 1000,55 L 1000,160 L 0,160 Z"
                fill={timeOfDay === 'night' ? '#1E232F' : '#2D3440'}
              />
              
              {/* Top Red & White Curb Edge */}
              <path
                d="M 0,55 Q 250,20 500,55 T 1000,55"
                stroke="#E2E8F0"
                strokeWidth="6"
                fill="none"
              />
              <path
                d="M 0,55 Q 250,20 500,55 T 1000,55"
                stroke="#EF4444"
                strokeWidth="6"
                strokeDasharray="24 24"
                fill="none"
              />

              {/* Glowing Yellow Dashed Center Line (Highway Wave) */}
              <path
                d="M 0,105 Q 250,70 500,105 T 1000,105"
                stroke="#FACC15"
                strokeWidth="5"
                strokeDasharray="36 32"
                fill="none"
              />

              {/* Bottom Road Curb */}
              <path
                d="M 0,152 Q 250,117 500,152 T 1000,152"
                stroke="#FFFFFF"
                strokeWidth="5"
                fill="none"
                opacity="0.8"
              />
            </svg>

            {/* Roadside Mileage Milestone Sign 1 (Elevated so it doesn't clip car) */}
            <div className="absolute top-1 left-72 flex flex-col items-center">
              <div className="bg-amber-100 border-2 border-[#49200B] px-2.5 py-0.5 rounded text-[10px] font-black font-heading text-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] whitespace-nowrap">
                🌲 CHENNAI HILLS 24 KM
              </div>
              <div className="w-1.5 h-5 bg-[#49200B]" />
            </div>

            {/* Roadside Milestone Sign 2 */}
            <div className="absolute top-1 left-[780px] flex flex-col items-center">
              <div className="bg-[#B7F34A] border-2 border-[#49200B] px-2.5 py-0.5 rounded text-[10px] font-black font-heading text-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] whitespace-nowrap">
                🐶 DODO $1M SHELTER RUN
              </div>
              <div className="w-1.5 h-5 bg-[#49200B]" />
            </div>
          </div>

          {/* Tile 2 (Exact Duplicate for seamless infinite loop) */}
          <div className="relative w-1/2 h-full">
            <svg
              viewBox="0 0 1000 160"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                d="M 0,55 Q 250,20 500,55 T 1000,55 L 1000,160 L 0,160 Z"
                fill={timeOfDay === 'night' ? '#1E232F' : '#2D3440'}
              />
              <path
                d="M 0,55 Q 250,20 500,55 T 1000,55"
                stroke="#E2E8F0"
                strokeWidth="6"
                fill="none"
              />
              <path
                d="M 0,55 Q 250,20 500,55 T 1000,55"
                stroke="#EF4444"
                strokeWidth="6"
                strokeDasharray="24 24"
                fill="none"
              />
              <path
                d="M 0,105 Q 250,70 500,105 T 1000,105"
                stroke="#FACC15"
                strokeWidth="5"
                strokeDasharray="36 32"
                fill="none"
              />
              <path
                d="M 0,152 Q 250,117 500,152 T 1000,152"
                stroke="#FFFFFF"
                strokeWidth="5"
                fill="none"
                opacity="0.8"
              />
            </svg>

            <div className="absolute top-1 left-72 flex flex-col items-center">
              <div className="bg-amber-100 border-2 border-[#49200B] px-2.5 py-0.5 rounded text-[10px] font-black font-heading text-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] whitespace-nowrap">
                🌲 CHENNAI HILLS 24 KM
              </div>
              <div className="w-1.5 h-5 bg-[#49200B]" />
            </div>

            <div className="absolute top-1 left-[780px] flex flex-col items-center">
              <div className="bg-[#B7F34A] border-2 border-[#49200B] px-2.5 py-0.5 rounded text-[10px] font-black font-heading text-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] whitespace-nowrap">
                🐶 DODO $1M SHELTER RUN
              </div>
              <div className="w-1.5 h-5 bg-[#49200B]" />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. THE ROADSTER CAR, OWNER & SHIH TZU (SYNCHRONIZED PHYSICS) */}
      {/* ============================================================ */}
      <div
        className="absolute bottom-6 left-[16%] sm:left-[22%] md:left-[26%] z-30"
        style={{
          animationName: 'carRoadPhysics',
          animationDuration: roadDuration,
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
          animationPlayState: animPlayState,
        }}
      >
        {/* Floating Speech / Action Bubble */}
        {speechText && (
          <div className="absolute -top-14 left-8 z-50 bg-white border-2 border-[#49200B] px-3.5 py-1.5 rounded-2xl shadow-[3px_3px_0px_#49200B] text-xs font-black font-heading text-[#49200B] whitespace-nowrap animate-bounce flex items-center gap-1.5">
            <span>{speechText}</span>
            <div className="absolute -bottom-2 left-6 w-3 h-3 bg-white border-r-2 border-b-2 border-[#49200B] rotate-45" />
          </div>
        )}

        {/* Honk Wave Visuals */}
        {honking && (
          <div className="absolute -top-10 right-4 z-40 flex items-center gap-1">
            <span className="text-xl animate-ping">🔊</span>
            <span className="text-xs font-black font-heading text-yellow-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              HONK!
            </span>
          </div>
        )}

        {/* Headlight beam (Night & Sunset mode) */}
        {timeOfDay !== 'day' && (
          <div
            className="absolute -right-36 top-10 w-48 h-20 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at left, rgba(254, 240, 138, 0.75) 0%, rgba(254, 240, 138, 0.3) 50%, transparent 80%)',
              clipPath: 'polygon(0% 40%, 100% 0%, 100% 100%, 0% 70%)',
            }}
          />
        )}

        {/* Exhaust Puffs */}
        <div className="absolute -left-6 bottom-4 pointer-events-none">
          <div
            className="w-3.5 h-3.5 rounded-full bg-slate-200/80"
            style={{
              animationName: 'exhaustStream',
              animationDuration: isFast ? '0.6s' : '1.0s',
              animationTimingFunction: 'ease-out',
              animationIterationCount: 'infinite',
              animationPlayState: animPlayState,
            }}
          />
          <div
            className="w-3 h-3 rounded-full bg-slate-300/70 absolute -top-1.5 left-2"
            style={{
              animationName: 'exhaustStream',
              animationDuration: isFast ? '0.6s' : '1.0s',
              animationTimingFunction: 'ease-out',
              animationIterationCount: 'infinite',
              animationDelay: '0.35s',
              animationPlayState: animPlayState,
            }}
          />
        </div>

        {/* Main Convertible Car Rig */}
        <div className="relative w-64 sm:w-72 h-36">

          {/* ======================================================== */}
          {/* PASSENGERS: OWNER (VJDurga) & SHIH TZU (CuteDODO)        */}
          {/* ======================================================== */}
          
          {/* 1. OWNER (DRIVER) - Sitting on Left */}
          <div
            className="absolute bottom-14 left-14 z-10 cursor-pointer group flex flex-col items-center"
            onClick={waveOwner}
            title="Click to interact with Owner!"
          >
            {/* Hover Tooltip */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5 text-[11px] font-bold text-amber-900 bg-white px-1.5 py-0.5 rounded border border-[#49200B]">
              👋 Hi!
            </div>

            {/* Hair with Wind Animation */}
            <div
              className="w-10 h-7 bg-[#2D1B13] rounded-t-full -mb-2 z-10 relative"
              style={{
                animationName: 'hairBreeze',
                animationDuration: '1s',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationPlayState: animPlayState,
              }}
            >
              <div className="absolute -top-1 left-1 w-3 h-3 bg-[#2D1B13] rounded-full" />
              <div className="absolute -top-1 right-1 w-4 h-3 bg-[#2D1B13] rounded-full" />
            </div>

            {/* Face */}
            <div className="w-9 h-8 bg-[#ECC9A8] rounded-full border-2 border-[#49200B] relative flex flex-col items-center justify-center shadow-xs">
              {/* Retro Sunglasses */}
              <div className="flex items-center gap-0.5 mt-0.5">
                <div className="w-3.5 h-2.5 bg-[#1E293B] border border-black rounded-sm" />
                <div className="w-1 h-0.5 bg-black" />
                <div className="w-3.5 h-2.5 bg-[#1E293B] border border-black rounded-sm" />
              </div>
              {/* Friendly Smile */}
              <div className="w-3 h-1.5 border-b-2 border-[#49200B] rounded-full mt-1" />
            </div>

            {/* Shoulders & Jacket */}
            <div className="w-14 h-7 bg-[#EF4444] rounded-t-xl border-2 border-[#49200B] -mt-1 flex items-center justify-center relative">
              <div className="w-4 h-full bg-[#B91C1C]" />
              <div className="absolute right-0 top-1 w-5 h-3 bg-[#EF4444] rounded-full border border-[#49200B] rotate-12" />
            </div>
          </div>

          {/* Steering Wheel */}
          <div className="absolute bottom-15 left-27 z-20 pointer-events-none">
            <div className="w-6 h-6 rounded-full border-3 border-[#1E293B] bg-transparent flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            </div>
            <div className="w-1 h-4 bg-[#49200B] mx-auto -mt-1" />
          </div>

          {/* 2. SHIH TZU (CuteDODO) - Front Passenger with paws on door */}
          <div
            className="absolute bottom-12 left-36 z-15 cursor-pointer group flex flex-col items-center"
            onClick={petDodo}
            title="Click to pet Shih Tzu CuteDODO!"
          >
            {/* Heart on happy */}
            {dodoHappy && (
              <div className="absolute -top-6 text-sm animate-ping">
                ❤️
              </div>
            )}

            {/* Shih Tzu Top-Knot Ribbon */}
            <div className="relative z-20">
              <div className="w-4 h-3 bg-[#E11D48] rounded-full mx-auto flex items-center justify-center shadow-xs">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
            </div>

            {/* Shih Tzu Head */}
            <div className="relative -mt-1">
              
              {/* Left Fluffy Ear */}
              <div
                className="absolute -left-3 top-1 w-3.5 h-7 bg-[#C49767] rounded-2xl border border-[#49200B] origin-top shadow-xs"
                style={{
                  animationName: 'earFlapGentle',
                  animationDuration: isFast ? '0.4s' : '0.7s',
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  animationPlayState: animPlayState,
                }}
              >
                <div className="w-2 h-4 bg-[#FAF7F2] rounded-full mt-2 ml-0.5" />
              </div>

              {/* Right Fluffy Ear */}
              <div
                className="absolute -right-3 top-1 w-3.5 h-7 bg-[#C49767] rounded-2xl border border-[#49200B] origin-top shadow-xs"
                style={{
                  animationName: 'earFlapGentle',
                  animationDuration: isFast ? '0.4s' : '0.7s',
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  animationDelay: '0.15s',
                  animationPlayState: animPlayState,
                }}
              >
                <div className="w-2 h-4 bg-[#FAF7F2] rounded-full mt-2 ml-0.5" />
              </div>

              {/* Fluffy Face Body */}
              <div className="w-10 h-9 rounded-2xl bg-[#FFFDF9] border-2 border-[#49200B] relative flex flex-col items-center justify-center shadow-xs overflow-hidden">
                <div className="absolute top-1 left-0.5 w-4 h-4 bg-[#E0B27A] rounded-full opacity-80" />
                <div className="absolute top-1 right-0.5 w-4 h-4 bg-[#E0B27A] rounded-full opacity-80" />

                {/* Big cute shiny eyes */}
                <div className="flex items-center justify-between w-6 mt-1 z-10">
                  <div className="w-2 h-2 rounded-full bg-[#201007] relative flex items-center justify-center">
                    <div className="w-0.5 h-0.5 rounded-full bg-white absolute top-0.5 left-0.5" />
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#201007] relative flex items-center justify-center">
                    <div className="w-0.5 h-0.5 rounded-full bg-white absolute top-0.5 left-0.5" />
                  </div>
                </div>

                {/* Button Nose */}
                <div className="w-2.5 h-2 rounded-full bg-[#2A160A] mt-0.5 z-10" />

                {/* Happy Mouth */}
                <div className="w-3 h-2 rounded-b-full bg-[#991B1B] overflow-hidden flex justify-center z-10">
                  <div className="w-2 h-2 bg-[#FB7185] rounded-full mt-0.5" />
                </div>
              </div>
            </div>

            {/* Collar with Bell */}
            <div className="w-8 h-2 bg-[#DC2626] rounded-full border border-[#49200B] -mt-1 z-20 flex items-center justify-center shadow-xs">
              <div className="w-2 h-2 rounded-full bg-[#FACC15] border border-[#49200B]" />
            </div>

            {/* Front Paws on car door */}
            <div className="flex items-center gap-2 -mt-1 z-25">
              <div className="w-3 h-2.5 bg-white rounded-full border border-[#49200B] shadow-xs" />
              <div className="w-3 h-2.5 bg-white rounded-full border border-[#49200B] shadow-xs" />
            </div>

            {/* Wagging Tail */}
            <div
              className="absolute -left-3 bottom-0 w-3 h-5 bg-[#FAF7F2] border border-[#49200B] rounded-full origin-bottom"
              style={{
                animationName: 'tailWagHappy',
                animationDuration: '0.6s',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationPlayState: animPlayState,
              }}
            />
          </div>

          {/* ======================================================== */}
          {/* CAR BODY & CHASSIS (VINTAGE CONVERTIBLE ROADSTER)        */}
          {/* ======================================================== */}

          {/* Windshield Glass */}
          <div className="absolute bottom-16 left-25 w-16 h-10 border-t-3 border-r-3 border-slate-300 rounded-tr-2xl bg-cyan-200/35 backdrop-blur-[1px] rotate-14 z-20 pointer-events-none">
            <div className="w-1.5 h-8 bg-white/70 rounded-full rotate-25 ml-4 mt-1" />
          </div>

          {/* Rear Car Tail & Back Seat */}
          <div className="absolute bottom-6 left-6 w-14 h-12 bg-[#FFD36A] border-3 border-[#49200B] rounded-tl-3xl z-10 shadow-xs" />

          {/* Main Car Body Profile */}
          <div className="absolute bottom-6 left-6 w-56 sm:w-60 h-11 bg-gradient-to-r from-[#FFC72C] via-[#FFD36A] to-[#FFBF00] border-3 border-[#49200B] rounded-3xl z-20 flex items-center justify-between px-3 shadow-[2px_3px_0px_#49200B]">
            <div className="w-full h-1.5 bg-white border border-[#49200B]/30 rounded-full opacity-80" />
            <div className="absolute top-2 left-24 w-4 h-1 bg-[#49200B] rounded-full" />
            <div className="absolute top-3.5 left-18 bg-white border border-[#49200B] px-1.5 py-0.2 rounded-md text-[9px] font-black font-heading text-[#49200B] shadow-[1px_1px_0px_#49200B]">
              $DODO
            </div>
          </div>

          {/* Front Hood & Fender */}
          <div className="absolute bottom-6 right-3 w-16 h-9 bg-[#FFC72C] border-3 border-[#49200B] rounded-tr-3xl z-20" />

          {/* Round Headlight */}
          <div
            className={`absolute bottom-8 right-2 w-5 h-5 rounded-full border-2 border-[#49200B] z-30 flex items-center justify-center ${
              timeOfDay === 'night'
                ? 'bg-yellow-200 shadow-[0_0_15px_#FEF08A]'
                : 'bg-white shadow-xs'
            }`}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-300/80" />
          </div>

          {/* Bumpers & Exhaust */}
          <div className="absolute bottom-5 -right-0.5 w-3 h-5 bg-slate-200 border-2 border-[#49200B] rounded-r-md z-30" />
          <div className="absolute bottom-5 left-3.5 w-3 h-5 bg-slate-200 border-2 border-[#49200B] rounded-l-md z-30" />
          <div className="absolute bottom-5 left-1 w-4 h-2 bg-[#334155] border border-black rounded-l" />

          {/* ======================================================== */}
          {/* SPINNING CAR WHEELS                                      */}
          {/* ======================================================== */}
          
          {/* Rear Wheel */}
          <div className="absolute bottom-2 left-14 z-30">
            <div
              className="w-10 h-10 rounded-full bg-[#1E293B] border-3 border-[#49200B] flex items-center justify-center shadow-md"
              style={{
                animationName: 'wheelSpinSmooth',
                animationDuration: isFast ? '0.35s' : '0.65s',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationPlayState: animPlayState,
              }}
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-slate-300 to-white border border-[#49200B] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
              </div>
            </div>
          </div>

          {/* Front Wheel */}
          <div className="absolute bottom-2 right-10 z-30">
            <div
              className="w-10 h-10 rounded-full bg-[#1E293B] border-3 border-[#49200B] flex items-center justify-center shadow-md"
              style={{
                animationName: 'wheelSpinSmooth',
                animationDuration: isFast ? '0.35s' : '0.65s',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationPlayState: animPlayState,
              }}
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-slate-300 to-white border border-[#49200B] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* 5. TOP HUD: CLEAN CONTROLS & STATUS BADGE                    */}
      {/* ============================================================ */}
      
      {/* Top Left: Title Badge */}
      <div className="absolute top-3 left-3 sm:left-4 z-40 flex items-center gap-2">
        <div className="bg-white/95 border-2 border-[#49200B] px-3 py-1 rounded-2xl shadow-[2px_2px_0px_#49200B] flex items-center gap-2">
          <span className="text-base">🌲</span>
          <span className="font-heading font-black text-xs sm:text-sm text-[#49200B]">
            Forest Highway Cruise
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFD36A] border border-[#49200B] text-[#49200B] hidden md:inline">
            VJDurga &amp; Shih Tzu Dodo
          </span>
        </div>
      </div>

      {/* Top Right: Interactive Controls */}
      <div className="absolute top-3 right-3 sm:right-4 z-40 flex items-center gap-1.5 sm:gap-2">
        
        {/* Honk Horn Button */}
        <button
          onClick={triggerHorn}
          className="cartoon-btn px-2.5 sm:px-3 py-1.5 bg-[#FFD36A] hover:bg-[#ffc947] border-2 border-[#49200B] text-[#49200B] rounded-xl text-xs font-black font-heading shadow-[2px_2px_0px_#49200B] flex items-center gap-1"
          title="Press to honk the car horn!"
        >
          <span>📯</span>
          <span className="hidden sm:inline">Honk</span>
        </button>

        {/* Time of Day Cycle Button */}
        <button
          onClick={() => {
            sounds.pop();
            setTimeOfDay((prev) => (prev === 'day' ? 'sunset' : prev === 'sunset' ? 'night' : 'day'));
          }}
          className="cartoon-btn p-1.5 sm:px-2.5 sm:py-1.5 bg-white hover:bg-slate-50 border-2 border-[#49200B] text-[#49200B] rounded-xl text-xs font-bold font-heading shadow-[2px_2px_0px_#49200B] flex items-center gap-1"
          title="Toggle Day / Sunset / Night mode"
        >
          {timeOfDay === 'day' && <Sun className="w-4 h-4 text-amber-500" />}
          {timeOfDay === 'sunset' && <Sunset className="w-4 h-4 text-rose-500" />}
          {timeOfDay === 'night' && <Moon className="w-4 h-4 text-indigo-400" />}
          <span className="hidden sm:inline capitalize">{timeOfDay}</span>
        </button>

        {/* Speed Toggle */}
        <button
          onClick={() => {
            sounds.pop();
            setSpeed((prev) => (prev === 'cruise' ? 'turbo' : 'cruise'));
          }}
          className={`cartoon-btn px-2 sm:px-2.5 py-1.5 border-2 border-[#49200B] text-xs font-bold font-heading rounded-xl shadow-[2px_2px_0px_#49200B] flex items-center gap-1 ${
            speed === 'turbo'
              ? 'bg-[#FF9F00] text-white'
              : 'bg-white text-[#49200B]'
          }`}
          title="Toggle speed: Cruise vs Turbo"
        >
          <span>{speed === 'turbo' ? '⚡ Turbo' : '🚗 35 mph'}</span>
        </button>

        {/* Play / Pause Toggle */}
        <button
          onClick={() => {
            sounds.pop();
            setIsPlaying((prev) => !prev);
          }}
          className={`cartoon-btn p-1.5 sm:px-2.5 sm:py-1.5 border-2 border-[#49200B] rounded-xl text-xs font-bold font-heading shadow-[2px_2px_0px_#49200B] flex items-center gap-1 ${
            isPlaying ? 'bg-[#C6EAD7] text-[#49200B]' : 'bg-[#FFD36A] text-[#49200B]'
          }`}
          title={isPlaying ? 'Pause animation' : 'Start animation'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
        </button>

      </div>

      {/* Bottom Hint Banner */}
      <div className="absolute bottom-2 left-4 z-40 text-[10px] sm:text-xs font-bold font-heading text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] pointer-events-none hidden sm:flex items-center gap-2">
        <span>💡 Tap CuteDODO to hear him bark · Tap Driver to wave · Tap 📯 to Honk</span>
      </div>

    </div>
  );
};
