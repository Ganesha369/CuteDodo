import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Sparkles, Heart, Sun, Moon, Sunset, Compass } from 'lucide-react';
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
    setTimeout(() => setSpeechText(null), 2200);
  };

  // Click on Dodo
  const petDodo = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.bark();
    sounds.bell();
    setDodoHappy(true);
    setSpeechText('Woof! The breeze feels amazing! 🐾❤️');
    setTimeout(() => setDodoHappy(false), 1500);
    setTimeout(() => setSpeechText(null), 2500);
  };

  // Click on Owner
  const waveOwner = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.pop();
    setOwnerWaving(true);
    setSpeechText('Cruising Chennai to the hills with Dodo! 🚗✨');
    setTimeout(() => setOwnerWaving(false), 1500);
    setTimeout(() => setSpeechText(null), 2500);
  };

  const isFast = speed === 'turbo';
  const animPlayState = isPlaying ? 'running' : 'paused';

  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden border-3 border-[#49200B] shadow-[6px_8px_0px_#49200B] select-none mb-10 ${className}`}
      style={{ minHeight: '380px' }}
      aria-label="Owner and Shih Tzu dog driving on infinite wavy forest highway"
    >
      <style>{`
        @keyframes wavyRoadFlow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes treeParallaxFar {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes treeParallaxNear {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes carWavyBounce {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          20% {
            transform: translateY(-9px) rotate(-3.5deg);
          }
          40% {
            transform: translateY(-2px) rotate(1deg);
          }
          60% {
            transform: translateY(11px) rotate(4deg);
          }
          80% {
            transform: translateY(4px) rotate(-1.5deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        @keyframes wheelSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes shihTzuEarFlap {
          0%, 100% { transform: rotate(0deg) scaleY(1); }
          50% { transform: rotate(-14deg) scaleY(0.85); }
        }
        @keyframes dogTailWag {
          0%, 100% { transform: rotate(-12deg); }
          50% { transform: rotate(18deg); }
        }
        @keyframes windHair {
          0%, 100% { transform: skewX(0deg); }
          50% { transform: skewX(-8deg); }
        }
        @keyframes exhaustPuff {
          0% {
            opacity: 0.9;
            transform: translate(0, 0) scale(0.6);
          }
          100% {
            opacity: 0;
            transform: translate(-70px, -22px) scale(1.6);
          }
        }
        @keyframes cloudDrift {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes sunRayRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fireflyFloat {
          0%, 100% { transform: translate(0, 0); opacity: 0.3; }
          50% { transform: translate(15px, -18px); opacity: 0.9; }
        }
      `}</style>

      {/* ============================================================ */}
      {/* 1. SKY & DISTANT MOUNTAINS BACKGROUND                          */}
      {/* ============================================================ */}
      <div
        className={`absolute inset-0 transition-colors duration-700 pointer-events-none ${
          timeOfDay === 'day'
            ? 'bg-gradient-to-b from-[#4BA3E3] via-[#7EC2E8] via-45% to-[#CDE9F6]'
            : timeOfDay === 'sunset'
            ? 'bg-gradient-to-b from-[#6D28D9] via-[#BE185D] via-35% via-[#EA580C] to-[#FDE047]'
            : 'bg-gradient-to-b from-[#090D16] via-[#111A2E] via-50% to-[#1E293B]'
        }`}
      >
        {/* Celestial body (Sun / Sunset sun / Moon) */}
        {timeOfDay === 'day' && (
          <div className="absolute top-6 right-16 w-16 h-16 pointer-events-none">
            <div
              className="absolute inset-0 rounded-full bg-yellow-300/30 blur-md animate-pulse"
              style={{ animationDuration: '3s' }}
            />
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 shadow-[0_0_25px_rgba(250,204,21,0.7)] flex items-center justify-center">
              <span className="text-xl">☀️</span>
            </div>
          </div>
        )}

        {timeOfDay === 'sunset' && (
          <div className="absolute top-14 right-20 w-20 h-20 pointer-events-none">
            <div className="absolute inset-0 rounded-full bg-orange-500/30 blur-lg" />
            <div className="w-20 h-20 rounded-full bg-gradient-to-t from-rose-500 via-orange-400 to-amber-300 shadow-[0_0_35px_rgba(249,115,22,0.9)] flex items-center justify-center">
              <span className="text-2xl">🌅</span>
            </div>
          </div>
        )}

        {timeOfDay === 'night' && (
          <div className="absolute top-6 right-16 pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-[#FFFBEB] shadow-[0_0_25px_rgba(255,251,235,0.85)] flex items-center justify-center">
              <span className="text-xl">🌕</span>
            </div>
            {/* Stars */}
            {[
              { top: '15%', left: '10%' },
              { top: '25%', left: '22%' },
              { top: '12%', left: '38%' },
              { top: '28%', left: '55%' },
              { top: '18%', left: '72%' },
              { top: '10%', left: '88%' },
            ].map((s, idx) => (
              <div
                key={idx}
                className="absolute text-yellow-100 text-xs animate-pulse"
                style={{ top: s.top, left: s.left, animationDuration: `${1.5 + idx * 0.4}s` }}
              >
                ✦
              </div>
            ))}
          </div>
        )}

        {/* Drifting Clouds (Day & Sunset) */}
        {timeOfDay !== 'night' && (
          <div
            className="absolute top-6 left-0 flex gap-48 opacity-75 pointer-events-none"
            style={{
              width: '200%',
              animationName: 'cloudDrift',
              animationDuration: isFast ? '35s' : '60s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationPlayState: animPlayState,
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center gap-1 text-white/80 filter drop-shadow">
                <span className="text-2xl sm:text-3xl">☁️</span>
              </div>
            ))}
          </div>
        )}

        {/* Distant Mountain Silhouettes */}
        <svg
          viewBox="0 0 1200 180"
          preserveAspectRatio="none"
          className="absolute bottom-32 inset-x-0 w-full h-28 opacity-45 pointer-events-none"
          fill={timeOfDay === 'night' ? '#0F172A' : timeOfDay === 'sunset' ? '#4A044E' : '#2D6A4F'}
        >
          <path d="M0,180 L0,110 Q120,40 260,95 Q400,140 550,60 Q700,-10 860,75 Q1020,150 1200,60 L1200,180 Z" />
        </svg>

        {/* Misty Ridge Horizon */}
        <div
          className={`absolute bottom-32 inset-x-0 h-16 pointer-events-none ${
            timeOfDay === 'night'
              ? 'bg-gradient-to-t from-[#0B132B]/80 to-transparent'
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
        className="absolute bottom-28 left-0 flex pointer-events-none z-10"
        style={{
          width: '200%',
          animationName: 'treeParallaxFar',
          animationDuration: isFast ? '12s' : '20s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationPlayState: animPlayState,
        }}
      >
        <div className="flex items-end justify-around w-1/2 px-2">
          {Array.from({ length: 14 }).map((_, i) => {
            const h = 75 + (i % 5) * 14;
            const darkPine = timeOfDay === 'night' ? '#132A22' : timeOfDay === 'sunset' ? '#3B1238' : '#1B4332';
            return (
              <div key={i} className="flex flex-col items-center opacity-85" style={{ height: `${h}px` }}>
                <div
                  className="w-0 h-0 border-l-[18px] border-r-[18px] border-b-[45px] border-l-transparent border-r-transparent"
                  style={{ borderBottomColor: darkPine }}
                />
                <div
                  className="w-0 h-0 border-l-[22px] border-r-[22px] border-b-[50px] border-l-transparent border-r-transparent -mt-5"
                  style={{ borderBottomColor: darkPine }}
                />
                <div className="w-2.5 h-6 bg-[#3E2723]" />
              </div>
            );
          })}
        </div>
        {/* Duplicate for infinite loop */}
        <div className="flex items-end justify-around w-1/2 px-2">
          {Array.from({ length: 14 }).map((_, i) => {
            const h = 75 + (i % 5) * 14;
            const darkPine = timeOfDay === 'night' ? '#132A22' : timeOfDay === 'sunset' ? '#3B1238' : '#1B4332';
            return (
              <div key={i} className="flex flex-col items-center opacity-85" style={{ height: `${h}px` }}>
                <div
                  className="w-0 h-0 border-l-[18px] border-r-[18px] border-b-[45px] border-l-transparent border-r-transparent"
                  style={{ borderBottomColor: darkPine }}
                />
                <div
                  className="w-0 h-0 border-l-[22px] border-r-[22px] border-b-[50px] border-l-transparent border-r-transparent -mt-5"
                  style={{ borderBottomColor: darkPine }}
                />
                <div className="w-2.5 h-6 bg-[#3E2723]" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Near Lush Pine & Oak Trees Parallax Layer */}
      <div
        className="absolute bottom-20 left-0 flex pointer-events-none z-15"
        style={{
          width: '200%',
          animationName: 'treeParallaxNear',
          animationDuration: isFast ? '6s' : '10s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationPlayState: animPlayState,
        }}
      >
        <div className="flex items-end justify-around w-1/2 px-2">
          {Array.from({ length: 9 }).map((_, i) => {
            const isOak = i % 3 === 0;
            const treeColor = timeOfDay === 'night' ? '#0E3B29' : timeOfDay === 'sunset' ? '#831843' : '#2D6A4F';
            const highlightColor = timeOfDay === 'night' ? '#1B4D3E' : timeOfDay === 'sunset' ? '#BE185D' : '#40916C';
            return (
              <div key={i} className="flex flex-col items-center" style={{ height: isOak ? '125px' : '140px' }}>
                {isOak ? (
                  // Stylized Round Forest Oak
                  <div className="relative">
                    <div
                      className="w-16 h-16 rounded-full border-2 border-[#1B4332]/40 shadow-sm"
                      style={{ backgroundColor: treeColor }}
                    />
                    <div
                      className="w-12 h-12 rounded-full absolute -top-3 left-2"
                      style={{ backgroundColor: highlightColor }}
                    />
                    <div className="w-4 h-12 bg-[#4E342E] mx-auto -mt-2 rounded-b" />
                  </div>
                ) : (
                  // Tall Lush Pine
                  <>
                    <div
                      className="w-0 h-0 border-l-[24px] border-r-[24px] border-b-[50px] border-l-transparent border-r-transparent filter drop-shadow"
                      style={{ borderBottomColor: highlightColor }}
                    />
                    <div
                      className="w-0 h-0 border-l-[30px] border-r-[30px] border-b-[60px] border-l-transparent border-r-transparent -mt-6"
                      style={{ borderBottomColor: treeColor }}
                    />
                    <div
                      className="w-0 h-0 border-l-[36px] border-r-[36px] border-b-[65px] border-l-transparent border-r-transparent -mt-7"
                      style={{ borderBottomColor: treeColor }}
                    />
                    <div className="w-3.5 h-7 bg-[#3E2723] rounded-b" />
                  </>
                )}
              </div>
            );
          })}
        </div>
        {/* Duplicate for infinite loop */}
        <div className="flex items-end justify-around w-1/2 px-2">
          {Array.from({ length: 9 }).map((_, i) => {
            const isOak = i % 3 === 0;
            const treeColor = timeOfDay === 'night' ? '#0E3B29' : timeOfDay === 'sunset' ? '#831843' : '#2D6A4F';
            const highlightColor = timeOfDay === 'night' ? '#1B4D3E' : timeOfDay === 'sunset' ? '#BE185D' : '#40916C';
            return (
              <div key={i} className="flex flex-col items-center" style={{ height: isOak ? '125px' : '140px' }}>
                {isOak ? (
                  <div className="relative">
                    <div
                      className="w-16 h-16 rounded-full border-2 border-[#1B4332]/40 shadow-sm"
                      style={{ backgroundColor: treeColor }}
                    />
                    <div
                      className="w-12 h-12 rounded-full absolute -top-3 left-2"
                      style={{ backgroundColor: highlightColor }}
                    />
                    <div className="w-4 h-12 bg-[#4E342E] mx-auto -mt-2 rounded-b" />
                  </div>
                ) : (
                  <>
                    <div
                      className="w-0 h-0 border-l-[24px] border-r-[24px] border-b-[50px] border-l-transparent border-r-transparent filter drop-shadow"
                      style={{ borderBottomColor: highlightColor }}
                    />
                    <div
                      className="w-0 h-0 border-l-[30px] border-r-[30px] border-b-[60px] border-l-transparent border-r-transparent -mt-6"
                      style={{ borderBottomColor: treeColor }}
                    />
                    <div
                      className="w-0 h-0 border-l-[36px] border-r-[36px] border-b-[65px] border-l-transparent border-r-transparent -mt-7"
                      style={{ borderBottomColor: treeColor }}
                    />
                    <div className="w-3.5 h-7 bg-[#3E2723] rounded-b" />
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
            { top: '45%', left: '15%', delay: '0s' },
            { top: '35%', left: '42%', delay: '0.8s' },
            { top: '55%', left: '68%', delay: '1.4s' },
            { top: '40%', left: '85%', delay: '0.4s' },
            { top: '65%', left: '25%', delay: '1.9s' },
          ].map((f, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_8px_#FDE047]"
              style={{
                top: f.top,
                left: f.left,
                animationName: 'fireflyFloat',
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
      {/* 3. INFINITE WAVY HIGHWAY ROAD (SMOOTH ROLLING MOTION)        */}
      {/* ============================================================ */}
      <div className="absolute bottom-0 inset-x-0 h-44 z-20 overflow-hidden pointer-events-none">
        
        {/* Rolling Grassy Hill Bank (Above road) */}
        <div
          className="absolute inset-x-0 -top-3 h-14"
          style={{
            backgroundColor: timeOfDay === 'night' ? '#0F291E' : timeOfDay === 'sunset' ? '#4A1D24' : '#2D6A4F',
            borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
          }}
        />

        {/* Infinite Wavy Road Ribbon SVG */}
        <div
          className="absolute inset-0 w-[200%] flex"
          style={{
            animationName: 'wavyRoadFlow',
            animationDuration: isFast ? '2.4s' : '4.5s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationPlayState: animPlayState,
          }}
        >
          {/* Tile 1 */}
          <div className="relative w-1/2 h-full">
            <svg
              viewBox="0 0 1000 176"
              className="w-full h-full preserve-3d"
              preserveAspectRatio="none"
            >
              {/* Road Asphalt Bed */}
              <path
                d="M 0,60 Q 250,15 500,65 T 1000,60 L 1000,176 L 0,176 Z"
                fill={timeOfDay === 'night' ? '#1E232F' : '#2D3440'}
              />
              
              {/* Top Red & White Curb Edge */}
              <path
                d="M 0,60 Q 250,15 500,65 T 1000,60"
                stroke="#E2E8F0"
                strokeWidth="7"
                fill="none"
              />
              <path
                d="M 0,60 Q 250,15 500,65 T 1000,60"
                stroke="#EF4444"
                strokeWidth="7"
                strokeDasharray="24 24"
                fill="none"
              />

              {/* Glowing Yellow Dashed Center Line (Highway Wave) */}
              <path
                d="M 0,110 Q 250,65 500,115 T 1000,110"
                stroke="#FACC15"
                strokeWidth="5"
                strokeDasharray="36 32"
                fill="none"
              />

              {/* Bottom Road Curb */}
              <path
                d="M 0,165 Q 250,120 500,170 T 1000,165"
                stroke="#FFFFFF"
                strokeWidth="5"
                fill="none"
                opacity="0.8"
              />
            </svg>

            {/* Roadside Mileage Milestone Sign */}
            <div className="absolute top-4 left-64 flex flex-col items-center">
              <div className="bg-amber-100 border-2 border-[#49200B] px-2 py-0.5 rounded text-[10px] font-black font-heading text-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] whitespace-nowrap">
                🌲 CHENNAI HILLS 24 KM
              </div>
              <div className="w-1.5 h-6 bg-[#49200B]" />
            </div>

            {/* Another roadside milestone sign */}
            <div className="absolute top-12 left-[780px] flex flex-col items-center">
              <div className="bg-[#B7F34A] border-2 border-[#49200B] px-2 py-0.5 rounded text-[10px] font-black font-heading text-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] whitespace-nowrap">
                🐶 DODO $1M SHELTER RUN
              </div>
              <div className="w-1.5 h-5 bg-[#49200B]" />
            </div>
          </div>

          {/* Tile 2 (Seamless loop duplicate) */}
          <div className="relative w-1/2 h-full">
            <svg
              viewBox="0 0 1000 176"
              className="w-full h-full preserve-3d"
              preserveAspectRatio="none"
            >
              <path
                d="M 0,60 Q 250,15 500,65 T 1000,60 L 1000,176 L 0,176 Z"
                fill={timeOfDay === 'night' ? '#1E232F' : '#2D3440'}
              />
              <path
                d="M 0,60 Q 250,15 500,65 T 1000,60"
                stroke="#E2E8F0"
                strokeWidth="7"
                fill="none"
              />
              <path
                d="M 0,60 Q 250,15 500,65 T 1000,60"
                stroke="#EF4444"
                strokeWidth="7"
                strokeDasharray="24 24"
                fill="none"
              />
              <path
                d="M 0,110 Q 250,65 500,115 T 1000,110"
                stroke="#FACC15"
                strokeWidth="5"
                strokeDasharray="36 32"
                fill="none"
              />
              <path
                d="M 0,165 Q 250,120 500,170 T 1000,165"
                stroke="#FFFFFF"
                strokeWidth="5"
                fill="none"
                opacity="0.8"
              />
            </svg>

            <div className="absolute top-4 left-64 flex flex-col items-center">
              <div className="bg-amber-100 border-2 border-[#49200B] px-2 py-0.5 rounded text-[10px] font-black font-heading text-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] whitespace-nowrap">
                🌲 CHENNAI HILLS 24 KM
              </div>
              <div className="w-1.5 h-6 bg-[#49200B]" />
            </div>

            <div className="absolute top-12 left-[780px] flex flex-col items-center">
              <div className="bg-[#B7F34A] border-2 border-[#49200B] px-2 py-0.5 rounded text-[10px] font-black font-heading text-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] whitespace-nowrap">
                🐶 DODO $1M SHELTER RUN
              </div>
              <div className="w-1.5 h-5 bg-[#49200B]" />
            </div>
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* 4. THE CAR, OWNER & SHIH TZU (WAVY BOUNCE & PHYSICS)          */}
      {/* ============================================================ */}
      <div
        className="absolute bottom-8 left-[18%] sm:left-[24%] md:left-[28%] z-30"
        style={{
          animationName: 'carWavyBounce',
          animationDuration: isFast ? '2.4s' : '4.5s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
          animationPlayState: animPlayState,
        }}
      >
        {/* Floating Speech / Action Bubble */}
        {speechText && (
          <div className="absolute -top-16 left-6 z-50 bg-white border-2 border-[#49200B] px-3.5 py-1.5 rounded-2xl shadow-[3px_3px_0px_#49200B] text-xs font-black font-heading text-[#49200B] whitespace-nowrap animate-bounce flex items-center gap-1.5">
            <span>{speechText}</span>
            <div className="absolute -bottom-2 left-6 w-3 h-3 bg-white border-r-2 border-b-2 border-[#49200B] rotate-45" />
          </div>
        )}

        {/* Honk Wave Ripples */}
        {honking && (
          <div className="absolute -top-10 right-2 z-40 flex items-center gap-1">
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
            className="w-4 h-4 rounded-full bg-slate-200/80"
            style={{
              animationName: 'exhaustPuff',
              animationDuration: isFast ? '0.7s' : '1.2s',
              animationTimingFunction: 'ease-out',
              animationIterationCount: 'infinite',
              animationPlayState: animPlayState,
            }}
          />
          <div
            className="w-3 h-3 rounded-full bg-slate-300/70 absolute -top-2 left-2"
            style={{
              animationName: 'exhaustPuff',
              animationDuration: isFast ? '0.7s' : '1.2s',
              animationTimingFunction: 'ease-out',
              animationIterationCount: 'infinite',
              animationDelay: '0.4s',
              animationPlayState: animPlayState,
            }}
          />
        </div>

        {/* Main Convertible Car Rig */}
        <div className="relative w-64 sm:w-72 h-36">

          {/* ======================================================== */}
          {/* PASSENGERS: OWNER (VJDurga) & SHIH TZU (CuteDODO)        */}
          {/* ======================================================== */}
          
          {/* 1. OWNER (DRIVER) - Sitting on Left/Center */}
          <div
            className="absolute bottom-14 left-16 z-10 cursor-pointer group flex flex-col items-center"
            onClick={waveOwner}
            title="Click to interact with Owner!"
          >
            {/* Heart on hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5 text-xs">
              👋 Hi!
            </div>

            {/* Hair */}
            <div
              className="w-10 h-7 bg-[#2D1B13] rounded-t-full -mb-2 z-10 relative"
              style={{
                animationName: 'windHair',
                animationDuration: '1s',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationPlayState: animPlayState,
              }}
            >
              {/* Front hair tuft */}
              <div className="absolute -top-1 left-1 w-3 h-3 bg-[#2D1B13] rounded-full" />
              <div className="absolute -top-1 right-1 w-4 h-3 bg-[#2D1B13] rounded-full" />
            </div>

            {/* Face */}
            <div className="w-9 h-8 bg-[#ECC9A8] rounded-full border-2 border-[#49200B] relative flex flex-col items-center justify-center shadow-xs">
              {/* Cool Retro Sunglasses */}
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
              {/* Arm on steering wheel */}
              <div className="absolute right-0 top-1 w-5 h-3 bg-[#EF4444] rounded-full border border-[#49200B] rotate-12" />
            </div>
          </div>

          {/* Steering Wheel */}
          <div className="absolute bottom-16 left-28 z-20 pointer-events-none">
            <div className="w-6 h-6 rounded-full border-3 border-[#1E293B] bg-transparent flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            </div>
            <div className="w-1 h-4 bg-[#49200B] mx-auto -mt-1" />
          </div>

          {/* 2. SHIH TZU (CuteDODO) - Front Passenger with paws on door */}
          <div
            className="absolute bottom-12 left-34 z-15 cursor-pointer group flex flex-col items-center"
            onClick={petDodo}
            title="Click to pet Shih Tzu CuteDODO!"
          >
            {/* Heart badge when happy */}
            {dodoHappy && (
              <div className="absolute -top-6 text-sm animate-ping">
                ❤️
              </div>
            )}

            {/* Shih Tzu Top-Knot Ribbon / Hair Tuft */}
            <div className="relative z-20">
              <div className="w-4 h-3 bg-[#E11D48] rounded-full mx-auto flex items-center justify-center shadow-xs">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
            </div>

            {/* Shih Tzu Head (Fluffy White & Honey coat) */}
            <div className="relative -mt-1">
              
              {/* Fluffy Shih Tzu Left Ear (Flapping in the wind!) */}
              <div
                className="absolute -left-3 top-1 w-3.5 h-7 bg-[#C49767] rounded-2xl border border-[#49200B] origin-top shadow-xs"
                style={{
                  animationName: 'shihTzuEarFlap',
                  animationDuration: isFast ? '0.4s' : '0.8s',
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  animationPlayState: animPlayState,
                }}
              >
                <div className="w-2 h-4 bg-[#FAF7F2] rounded-full mt-2 ml-0.5" />
              </div>

              {/* Shih Tzu Right Ear (Flapping in the wind!) */}
              <div
                className="absolute -right-3 top-1 w-3.5 h-7 bg-[#C49767] rounded-2xl border border-[#49200B] origin-top shadow-xs"
                style={{
                  animationName: 'shihTzuEarFlap',
                  animationDuration: isFast ? '0.4s' : '0.8s',
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
                {/* Honey/Golden Fur Eye Patches */}
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

                {/* Shih Tzu Button Nose & Whiskers */}
                <div className="w-2.5 h-2 rounded-full bg-[#2A160A] mt-0.5 z-10" />

                {/* Happy Open Mouth & Pink Tongue */}
                <div className="w-3 h-2 rounded-b-full bg-[#991B1B] overflow-hidden flex justify-center z-10">
                  <div className="w-2 h-2 bg-[#FB7185] rounded-full mt-0.5" />
                </div>
              </div>
            </div>

            {/* Shih Tzu Collar with Golden Bell */}
            <div className="w-8 h-2 bg-[#DC2626] rounded-full border border-[#49200B] -mt-1 z-20 flex items-center justify-center shadow-xs">
              <div className="w-2 h-2 rounded-full bg-[#FACC15] border border-[#49200B]" />
            </div>

            {/* Fluffy Front Paws propped on car door! */}
            <div className="flex items-center gap-2 -mt-1 z-25">
              <div className="w-3 h-2.5 bg-white rounded-full border border-[#49200B] shadow-xs" />
              <div className="w-3 h-2.5 bg-white rounded-full border border-[#49200B] shadow-xs" />
            </div>

            {/* Fluffy Wagging Tail behind */}
            <div
              className="absolute -left-3 bottom-0 w-3 h-5 bg-[#FAF7F2] border border-[#49200B] rounded-full origin-bottom"
              style={{
                animationName: 'dogTailWag',
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
          <div className="absolute bottom-16 left-26 w-16 h-10 border-t-3 border-r-3 border-slate-300 rounded-tr-2xl bg-cyan-200/35 backdrop-blur-[1px] rotate-14 z-20 pointer-events-none">
            {/* Windshield Reflection Streak */}
            <div className="w-1.5 h-8 bg-white/70 rounded-full rotate-25 ml-4 mt-1" />
          </div>

          {/* Rear Car Tail & Back Seat */}
          <div className="absolute bottom-6 left-6 w-14 h-12 bg-[#FFD36A] border-3 border-[#49200B] rounded-tl-3xl z-10 shadow-sm" />

          {/* Main Car Body Profile */}
          <div className="absolute bottom-6 left-6 w-56 sm:w-60 h-11 bg-gradient-to-r from-[#FFC72C] via-[#FFD36A] to-[#FFBF00] border-3 border-[#49200B] rounded-3xl z-20 flex items-center justify-between px-3 shadow-[2px_3px_0px_#49200B]">
            {/* Retro Chrome Side Trim */}
            <div className="w-full h-1.5 bg-white border border-[#49200B]/30 rounded-full opacity-80" />
            
            {/* Door handle */}
            <div className="absolute top-2 left-24 w-4 h-1 bg-[#49200B] rounded-full" />

            {/* DODO Logo on door */}
            <div className="absolute top-4 left-20 bg-white border border-[#49200B] px-1.5 py-0.2 rounded-md text-[9px] font-black font-heading text-[#49200B] shadow-[1px_1px_0px_#49200B]">
              $DODO
            </div>
          </div>

          {/* Front Hood & Fender */}
          <div className="absolute bottom-6 right-3 w-16 h-9 bg-[#FFC72C] border-3 border-[#49200B] rounded-tr-3xl z-20" />

          {/* Round Glowing Headlight */}
          <div
            className={`absolute bottom-8 right-2 w-5 h-5 rounded-full border-2 border-[#49200B] z-30 flex items-center justify-center ${
              timeOfDay === 'night'
                ? 'bg-yellow-200 shadow-[0_0_15px_#FEF08A]'
                : 'bg-white shadow-xs'
            }`}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-300/80" />
          </div>

          {/* Front Chrome Bumper */}
          <div className="absolute bottom-5 -right-0.5 w-3 h-5 bg-slate-200 border-2 border-[#49200B] rounded-r-md z-30" />

          {/* Rear Chrome Bumper */}
          <div className="absolute bottom-5 left-3.5 w-3 h-5 bg-slate-200 border-2 border-[#49200B] rounded-l-md z-30" />

          {/* Dual Chrome Exhaust Pipes */}
          <div className="absolute bottom-5 left-1 w-4 h-2 bg-[#334155] border border-black rounded-l" />

          {/* ======================================================== */}
          {/* SPINNING CAR WHEELS (CHROME SPOKES & TREADS)             */}
          {/* ======================================================== */}
          
          {/* Rear Wheel */}
          <div className="absolute bottom-2 left-14 z-30">
            <div
              className="w-10 h-10 rounded-full bg-[#1E293B] border-3 border-[#49200B] flex items-center justify-center shadow-md"
              style={{
                animationName: 'wheelSpin',
                animationDuration: isFast ? '0.35s' : '0.7s',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationPlayState: animPlayState,
              }}
            >
              {/* Chrome Hubcap */}
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
                animationName: 'wheelSpin',
                animationDuration: isFast ? '0.35s' : '0.7s',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationPlayState: animPlayState,
              }}
            >
              {/* Chrome Hubcap */}
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-slate-300 to-white border border-[#49200B] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* 5. TOP CONTROLS & INTERACTIVE HUD OVERLAY                     */}
      {/* ============================================================ */}
      
      {/* Top Left: Title Badge */}
      <div className="absolute top-3 left-3 sm:left-4 z-40 flex items-center gap-2">
        <div className="bg-white/95 border-2 border-[#49200B] px-3 py-1 rounded-2xl shadow-[2px_2px_0px_#49200B] flex items-center gap-2">
          <span className="text-base">🌲</span>
          <span className="font-heading font-black text-xs sm:text-sm text-[#49200B]">
            Forest Highway Cruise
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFD36A] border border-[#49200B] text-[#49200B] hidden sm:inline">
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
