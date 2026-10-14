import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Train } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface IndianRailSceneProps {
  className?: string;
}

export const IndianRailScene: React.FC<IndianRailSceneProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [hornActive, setHornActive] = useState(false);
  const [signalState, setSignalState] = useState<'green' | 'amber'>('green');

  const triggerHorn = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.indianTrainHorn();
    setHornActive(true);
    setTimeout(() => setHornActive(false), 1200);
  };

  const toggleSignal = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.pop();
    setSignalState((prev) => (prev === 'green' ? 'amber' : 'green'));
  };

  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden border-3 border-amber-950 shadow-[6px_8px_0px_#3d2314] select-none mb-14 bg-slate-950 ${className}`}
      style={{ minHeight: '340px' }}
      aria-label="Indian Railway Station Scene with passing express train"
    >
      {/* ============================================================ */}
      {/* 1. SKY & BACKGROUND CITY PARALLAX LAYER                      */}
      {/* ============================================================ */}
      <div className="absolute inset-0 bg-linear-to-b from-[#0b1026] via-[#1e1b4b] via-45% via-[#431407] to-[#78350f] overflow-hidden pointer-events-none">
        {/* Evening stars */}
        <div className="absolute top-4 left-12 text-[10px] text-amber-200 opacity-60 animate-pulse">✦</div>
        <div className="absolute top-8 left-1/4 text-xs text-amber-100 opacity-70">✧</div>
        <div className="absolute top-3 left-1/2 text-[9px] text-amber-200 opacity-50 animate-pulse">✦</div>
        <div className="absolute top-10 right-1/3 text-xs text-amber-100 opacity-60">✧</div>
        <div className="absolute top-5 right-14 text-sm text-amber-200 opacity-80 animate-pulse">✦</div>

        {/* Crescent Moon */}
        <div className="absolute top-6 right-20 w-8 h-8 rounded-full shadow-[inset_4px_-2px_0px_1px_#FEF08A] opacity-85 rotate-[-20deg]" />

        {/* Distant Chennai Central Heritage & Ripon Building Skyline Silhouette */}
        <svg
          viewBox="0 0 1200 160"
          className="absolute bottom-24 inset-x-0 w-full h-28 opacity-40 text-[#09071b] preserve-3d"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          {/* Colonial clock tower, domes, and arches silhouette */}
          <path d="M 0 160 L 0 110 L 80 110 L 95 90 L 110 110 L 180 110 L 190 70 L 205 50 L 220 70 L 230 110 L 310 110 L 330 95 L 350 110 L 440 110 L 460 30 L 475 10 L 490 30 L 510 110 L 590 110 L 610 85 L 630 110 L 720 110 L 740 60 L 760 110 L 850 110 L 870 90 L 890 110 L 980 110 L 1000 45 L 1020 110 L 1110 110 L 1130 95 L 1200 110 L 1200 160 Z" />
        </svg>

        {/* Golden twilight horizon glow */}
        <div className="absolute bottom-20 inset-x-0 h-16 bg-linear-to-t from-amber-500/25 via-rose-500/15 to-transparent blur-sm" />
      </div>

      {/* ============================================================ */}
      {/* 2. OVERHEAD ELECTRICITY (OHE) CATENARY MASTS & WIRES         */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Horizontal contact wire & catenary messenger cable */}
        <div className="absolute top-[138px] inset-x-0 h-[1.5px] bg-slate-300/70 shadow-[0_0_2px_rgba(255,255,255,0.4)]" />
        <div className="absolute top-[124px] inset-x-0 h-[1px] bg-slate-400/50" />

        {/* Vertical dropper wires */}
        <div className="absolute top-[124px] inset-x-0 flex justify-around">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-[1px] h-[14px] bg-slate-400/40" />
          ))}
        </div>

        {/* OHE Steel Lattice Masts (3 masts across the screen) */}
        <div className="absolute inset-x-0 top-12 flex justify-between px-12 md:px-24">
          {[0, 1, 2].map((idx) => (
            <div key={idx} className="relative flex flex-col items-center opacity-85">
              {/* Insulator & Cantilever Arm */}
              <div className="w-16 h-3 border-t-2 border-r-2 border-slate-400/80 -mr-6 relative">
                <div className="absolute right-0 top-0 w-2 h-4 bg-amber-800 rounded-xs" />
              </div>
              {/* Steel mast column */}
              <div className="w-2.5 h-44 bg-linear-to-b from-slate-600 via-slate-700 to-slate-800 border-x border-slate-500/50 relative shadow-md">
                {/* Cross bracing markings */}
                <div className="absolute inset-0 flex flex-col justify-around opacity-40">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <div key={j} className="w-full h-[1px] bg-slate-300" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. RAILWAY TRACK LAYER (GROUND LEVEL)                        */}
      {/* ============================================================ */}
      <div className="absolute bottom-0 inset-x-0 h-32 z-20 overflow-hidden pointer-events-none">
        {/* Ballast bed (crushed granite stones) */}
        <div className="absolute bottom-10 inset-x-0 h-14 bg-gradient-to-b from-[#292524] via-[#1c1917] to-[#0c0a09] border-t border-amber-950/40">
          {/* Ballast stone texture dots */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#a8a29e_1px,transparent_1px)] [background-size:6px_6px]" />
        </div>

        {/* Concrete Sleepers (Ties) */}
        <div className="absolute bottom-13 inset-x-0 flex justify-between px-1">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className="w-3.5 h-6 bg-gradient-to-b from-stone-400 via-stone-500 to-stone-600 rounded-xs shadow-[1px_1px_0px_#000]"
            />
          ))}
        </div>

        {/* Dual Steel Rails */}
        {/* Top Rail */}
        <div className="absolute bottom-18 inset-x-0 h-2 bg-linear-to-b from-slate-200 via-slate-400 to-slate-700 shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <div className="h-[1px] bg-white opacity-80" />
        </div>
        {/* Bottom Rail */}
        <div className="absolute bottom-12 inset-x-0 h-2 bg-linear-to-b from-slate-200 via-slate-400 to-slate-700 shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <div className="h-[1px] bg-white opacity-80" />
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. THE INDIAN EXPRESS TRAIN (WAP-7 LOCOMOTIVE + LHB COACHES) */}
      {/* ============================================================ */}
      <div
        className={`absolute bottom-14 left-0 z-25 flex items-end will-change-transform ${
          isPlaying ? 'animate-indian-train-loop' : ''
        }`}
        style={{
          // Train total width covers Engine (260px) + 3 Coaches (3 x 290px) + Guard Van (260px) = ~1390px
          width: '1420px',
        }}
      >
        {/* Ground shadow beneath the entire train */}
        <div className="absolute -bottom-1 inset-x-0 h-4 bg-black/60 blur-[3px] rounded-full" />

        {/* ---------------------------------------------------- */}
        {/* TRAIN BODY GROUP (With subtle rail suspension jostle) */}
        {/* ---------------------------------------------------- */}
        <div className="flex items-end w-full animate-rail-sway">

          {/* ================================================== */}
          {/* A. WAP-7 ELECTRIC LOCOMOTIVE (LEADING ENGINE)      */}
          {/* ================================================== */}
          <div className="relative shrink-0 w-[270px] h-[132px] mr-1">
            {/* Raised Pantograph (touching overhead contact wire) */}
            <div className="absolute -top-7 left-12 w-14 h-8 pointer-events-none">
              <svg viewBox="0 0 70 40" className="w-full h-full">
                {/* Red single-arm articulated pantograph */}
                <path d="M 10 38 L 28 14 L 46 38" stroke="#DC2626" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M 28 14 L 38 4" stroke="#DC2626" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                {/* Carbon collector strip touching contact wire */}
                <rect x="22" y="1" width="30" height="3" rx="1" fill="#1E293B" stroke="#94A3B8" strokeWidth="0.8" />
                {/* Occasional electric spark glint */}
                <circle cx="36" cy="2" r="2.5" fill="#38BDF8" className="animate-ping opacity-75" />
              </svg>
            </div>

            {/* Rear Pantograph (lowered) */}
            <div className="absolute -top-3 right-10 w-10 h-4 opacity-70 pointer-events-none">
              <svg viewBox="0 0 50 20" className="w-full h-full">
                <path d="M 8 18 L 24 8 L 40 18" stroke="#DC2626" strokeWidth="2" fill="none" />
                <rect x="18" y="6" width="16" height="2" fill="#1E293B" />
              </svg>
            </div>

            {/* Locomotive Body Shell SVG */}
            <svg viewBox="0 0 270 110" className="w-full h-full overflow-visible">
              <defs>
                {/* Forward headlight illumination beam */}
                <linearGradient id="headlightBeam" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.85" />
                  <stop offset="60%" stopColor="#FDE047" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#FACC15" stopOpacity="0" />
                </linearGradient>
                {/* WAP-7 Body Gradient */}
                <linearGradient id="wap7Body" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="70%" stopColor="#F1F5F9" />
                  <stop offset="100%" stopColor="#CBD5E1" />
                </linearGradient>
              </defs>

              {/* Headlight Forward Light Beam (Cuts across platform & track) */}
              <polygon
                points="260,68 380,45 380,105 260,76"
                fill="url(#headlightBeam)"
                className="opacity-75 pointer-events-none"
              />

              {/* Main WAP-7 Aerodynamic Engine Body */}
              {/* Cab Roof Curve */}
              <path
                d="M 12 95 L 12 30 C 12 25 18 20 25 20 L 225 20 C 238 20 252 28 258 45 L 266 75 C 268 82 265 95 258 95 Z"
                fill="url(#wap7Body)"
                stroke="#0F172A"
                strokeWidth="2.2"
              />

              {/* Dark Slate Roof Top Curve */}
              <path
                d="M 18 20 L 230 20 C 242 20 250 25 254 32 L 20 32 Z"
                fill="#334155"
              />

              {/* Iconic Indian Tricolour Band across Locomotive */}
              {/* Saffron */}
              <path d="M 12 56 L 262 56 L 264 61 L 12 61 Z" fill="#FF9933" />
              {/* White */}
              <path d="M 12 61 L 264 61 L 265 66 L 12 66 Z" fill="#FFFFFF" />
              {/* Ashoka Blue / Navy Accent Line */}
              <path d="M 12 66 L 265 66 L 266 69 L 12 69 Z" fill="#000080" />
              {/* India Green */}
              <path d="M 12 69 L 266 69 L 267 74 L 12 74 Z" fill="#138808" />

              {/* Driver Cab Windows */}
              {/* Front Windshield */}
              <polygon points="230,28 252,36 250,50 228,50" fill="#0F172A" stroke="#475569" strokeWidth="1.2" />
              <polygon points="232,30 250,37 248,48 230,48" fill="#38BDF8" opacity="0.85" />
              {/* Windshield Reflection */}
              <line x1="234" y1="32" x2="246" y2="44" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.75" />

              {/* Side Cab Window */}
              <rect x="204" y="32" width="18" height="18" rx="2" fill="#0F172A" stroke="#475569" strokeWidth="1" />
              <rect x="206" y="34" width="14" height="14" rx="1" fill="#38BDF8" opacity="0.8" />
              {/* Driver Silhouette */}
              <circle cx="213" cy="40" r="3.2" fill="#0F172A" />

              {/* Middle Engine Louvers / Air Filters */}
              <rect x="70" y="32" width="110" height="16" rx="2" fill="#E2E8F0" stroke="#64748B" strokeWidth="1" />
              {Array.from({ length: 12 }).map((_, k) => (
                <line key={k} x1={76 + k * 8.5} y1="34" x2={76 + k * 8.5} y2="46" stroke="#475569" strokeWidth="1.5" />
              ))}

              {/* Locomotive Text Markings: WAP-7 & Indian Railways Crest */}
              <text x="75" y="52" fill="#1E293B" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
                WAP-7 · 30201
              </text>
              <text x="145" y="52" fill="#1E293B" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">
                भारतीय रेल · CHENNAI
              </text>

              {/* High-Beam Twin Headlights */}
              <circle cx="261" cy="71" r="5" fill="#FEF08A" stroke="#0F172A" strokeWidth="1.5" />
              <circle cx="261" cy="71" r="3" fill="#FFFFFF" />
              {/* Lower Marker Lamps */}
              <circle cx="258" cy="85" r="2.5" fill="#EF4444" stroke="#0F172A" strokeWidth="1" />

              {/* Red Buffer Beam & Cattle Guard (Cowcatcher) */}
              <rect x="254" y="90" width="12" height="10" rx="1" fill="#DC2626" stroke="#0F172A" strokeWidth="1.2" />
              {/* Diagonal Cattle Guard Grate (Iconic Indian Train Cowcatcher) */}
              <polygon points="256,98 268,98 264,106 254,106" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />
              <line x1="257" y1="100" x2="263" y2="105" stroke="#FACC15" strokeWidth="1.5" />
              <line x1="262" y1="100" x2="258" y2="105" stroke="#FACC15" strokeWidth="1.5" />

              {/* Underframe Co-Co Bogies & Wheels (Front & Rear) */}
              {/* Bogie 1 (Front) */}
              <rect x="180" y="93" width="70" height="6" rx="2" fill="#1E293B" />
              <circle cx="192" cy="102" r="7" fill="#334155" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx="192" cy="102" r="3" fill="#94A3B8" />
              <circle cx="215" cy="102" r="7" fill="#334155" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx="215" cy="102" r="3" fill="#94A3B8" />
              <circle cx="238" cy="102" r="7" fill="#334155" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx="238" cy="102" r="3" fill="#94A3B8" />

              {/* Bogie 2 (Rear) */}
              <rect x="30" y="93" width="70" height="6" rx="2" fill="#1E293B" />
              <circle cx="42" cy="102" r="7" fill="#334155" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx="42" cy="102" r="3" fill="#94A3B8" />
              <circle cx="65" cy="102" r="7" fill="#334155" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx="65" cy="102" r="3" fill="#94A3B8" />
              <circle cx="88" cy="102" r="7" fill="#334155" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx="88" cy="102" r="3" fill="#94A3B8" />
            </svg>
          </div>

          {/* ================================================== */}
          {/* B. LHB PASSENGER COACH 1 (AC CHAIR CAR / 2-TIER)   */}
          {/* ================================================== */}
          <div className="relative shrink-0 w-[290px] h-[122px] mr-1">
            {/* Gangway Coupler / Vestibule Rubber Bellows */}
            <div className="absolute top-8 -right-2.5 w-3 h-18 bg-[#18181b] rounded-xs border border-zinc-700 z-10" />

            <svg viewBox="0 0 290 105" className="w-full h-full overflow-visible">
              <defs>
                {/* LHB Rajdhani Maroon / Utkrisht Livery Gradient */}
                <linearGradient id="lhbLivery" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#B91C1C" />
                  <stop offset="50%" stopColor="#991B1B" />
                  <stop offset="100%" stopColor="#7F1D1D" />
                </linearGradient>
              </defs>

              {/* Coach Body Shell */}
              <rect x="2" y="16" width="284" height="76" rx="5" fill="url(#lhbLivery)" stroke="#0F172A" strokeWidth="2" />
              
              {/* Stainless Steel Roof with Corrugation */}
              <rect x="4" y="14" width="280" height="12" rx="3" fill="#94A3B8" stroke="#0F172A" strokeWidth="1.2" />
              {Array.from({ length: 24 }).map((_, i) => (
                <line key={i} x1={12 + i * 11.5} y1="16" x2={12 + i * 11.5} y2="24" stroke="#64748B" strokeWidth="1" />
              ))}

              {/* Golden Yellow Racing Stripes (Classic LHB Rajdhani styling) */}
              <rect x="2" y="32" width="284" height="4" fill="#FACC15" />
              <rect x="2" y="72" width="284" height="4" fill="#FACC15" />

              {/* Destination Board Display in Center */}
              <rect x="95" y="27" width="100" height="7" rx="1.5" fill="#FEF08A" stroke="#0F172A" strokeWidth="0.8" />
              <text x="98" y="33" fill="#0F172A" fontSize="5" fontWeight="bold" fontFamily="sans-serif">
                CHENNAI CENTRAL ➔ $DODO EXPRESS
              </text>

              {/* AC Sealed Windows with Warm Cabin Light & Safety Glass */}
              {Array.from({ length: 7 }).map((_, w) => (
                <g key={w} transform={`translate(${20 + w * 36}, 39)`}>
                  {/* Outer Window Frame */}
                  <rect x="0" y="0" width="28" height="24" rx="3" fill="#0F172A" stroke="#475569" strokeWidth="1" />
                  {/* Warm Illuminated Glass */}
                  <rect x="1.5" y="1.5" width="25" height="21" rx="2" fill="#FEF08A" opacity="0.9" />
                  {/* Window tint / reflection gradient */}
                  <line x1="4" y1="3" x2="22" y2="21" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.75" />
                  {/* Passenger silhouette (CuteDODO passenger or commuter silhouette) */}
                  {w === 3 ? (
                    // CuteDODO looking out window!
                    <g transform="translate(6, 6) scale(0.65)">
                      <ellipse cx="12" cy="14" rx="8" ry="6" fill="#FFFBEB" />
                      <circle cx="12" cy="8" r="6" fill="#92400E" />
                      <circle cx="10" cy="8" r="1.5" fill="#FFFFFF" />
                      <circle cx="14" cy="8" r="1.5" fill="#FFFFFF" />
                    </g>
                  ) : (
                    // Subtle traveler silhouette
                    <circle cx="14" cy="14" r="4.5" fill="#78350F" opacity="0.45" />
                  )}
                </g>
              ))}

              {/* End Entrance Doors with Handrails */}
              <rect x="6" y="30" width="10" height="52" rx="1" fill="#7F1D1D" stroke="#0F172A" strokeWidth="1" />
              <line x1="14" y1="36" x2="14" y2="76" stroke="#FACC15" strokeWidth="1.2" />

              <rect x="272" y="30" width="10" height="52" rx="1" fill="#7F1D1D" stroke="#0F172A" strokeWidth="1" />
              <line x1="274" y1="36" x2="274" y2="76" stroke="#FACC15" strokeWidth="1.2" />

              {/* Coach Bogies & Wheels (Front and Back) */}
              <rect x="35" y="88" width="56" height="5" rx="1.5" fill="#1E293B" />
              <circle cx="46" cy="97" r="6.5" fill="#334155" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx="46" cy="97" r="2.5" fill="#94A3B8" />
              <circle cx="78" cy="97" r="6.5" fill="#334155" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx="78" cy="97" r="2.5" fill="#94A3B8" />

              <rect x="195" y="88" width="56" height="5" rx="1.5" fill="#1E293B" />
              <circle cx="206" cy="97" r="6.5" fill="#334155" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx="206" cy="97" r="2.5" fill="#94A3B8" />
              <circle cx="238" cy="97" r="6.5" fill="#334155" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx="238" cy="97" r="2.5" fill="#94A3B8" />
            </svg>
          </div>

          {/* ================================================== */}
          {/* C. LHB PASSENGER COACH 2 (PANTRY & SLEEPER CAR)    */}
          {/* ================================================== */}
          <div className="relative shrink-0 w-[290px] h-[122px] mr-1">
            {/* Gangway Coupler */}
            <div className="absolute top-8 -right-2.5 w-3 h-18 bg-[#18181b] rounded-xs border border-zinc-700 z-10" />

            <svg viewBox="0 0 290 105" className="w-full h-full overflow-visible">
              <rect x="2" y="16" width="284" height="76" rx="5" fill="url(#lhbLivery)" stroke="#0F172A" strokeWidth="2" />
              <rect x="4" y="14" width="280" height="12" rx="3" fill="#94A3B8" stroke="#0F172A" strokeWidth="1.2" />
              {Array.from({ length: 24 }).map((_, i) => (
                <line key={i} x1={12 + i * 11.5} y1="16" x2={12 + i * 11.5} y2="24" stroke="#64748B" strokeWidth="1" />
              ))}
              <rect x="2" y="32" width="284" height="4" fill="#FACC15" />
              <rect x="2" y="72" width="284" height="4" fill="#FACC15" />

              {/* Center Coach Marking */}
              <text x="120" y="80" fill="#FEF08A" fontSize="6" fontWeight="bold" fontFamily="sans-serif">
                INDIAN RAILWAYS · B3
              </text>

              {/* Windows with Warm Interior Glow */}
              {Array.from({ length: 7 }).map((_, w) => (
                <g key={w} transform={`translate(${20 + w * 36}, 39)`}>
                  <rect x="0" y="0" width="28" height="24" rx="3" fill="#0F172A" stroke="#475569" strokeWidth="1" />
                  <rect x="1.5" y="1.5" width="25" height="21" rx="2" fill="#FEF08A" opacity="0.9" />
                  <line x1="4" y1="3" x2="22" y2="21" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.75" />
                  <circle cx="14" cy="14" r="4.5" fill="#78350F" opacity="0.45" />
                </g>
              ))}

              {/* Bogies */}
              <rect x="35" y="88" width="56" height="5" rx="1.5" fill="#1E293B" />
              <circle cx="46" cy="97" r="6.5" fill="#334155" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx="46" cy="97" r="2.5" fill="#94A3B8" />
              <circle cx="78" cy="97" r="6.5" fill="#334155" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx="78" cy="97" r="2.5" fill="#94A3B8" />

              <rect x="195" y="88" width="56" height="5" rx="1.5" fill="#1E293B" />
              <circle cx="206" cy="97" r="6.5" fill="#334155" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx="206" cy="97" r="2.5" fill="#94A3B8" />
              <circle cx="238" cy="97" r="6.5" fill="#334155" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx="238" cy="97" r="2.5" fill="#94A3B8" />
            </svg>
          </div>

          {/* ================================================== */}
          {/* D. LHB GUARD VAN / LUGGAGE BRAKE (EOG / SLR CAR)   */}
          {/* ================================================== */}
          <div className="relative shrink-0 w-[270px] h-[122px]">
            <svg viewBox="0 0 270 105" className="w-full h-full overflow-visible">
              <rect x="2" y="16" width="264" height="76" rx="5" fill="url(#lhbLivery)" stroke="#0F172A" strokeWidth="2" />
              <rect x="4" y="14" width="260" height="12" rx="3" fill="#94A3B8" stroke="#0F172A" strokeWidth="1.2" />
              <rect x="2" y="32" width="264" height="4" fill="#FACC15" />
              <rect x="2" y="72" width="264" height="4" fill="#FACC15" />

              {/* Luggage Shutter Door (Corrugated metal roller shutter) */}
              <rect x="45" y="38" width="46" height="34" rx="2" fill="#334155" stroke="#0F172A" strokeWidth="1" />
              {Array.from({ length: 6 }).map((_, s) => (
                <line key={s} x1="45" y1={42 + s * 5} x2="91" y2={42 + s * 5} stroke="#64748B" strokeWidth="1.2" />
              ))}

              {/* Guard Compartment Windows */}
              <rect x="120" y="42" width="26" height="22" rx="3" fill="#0F172A" stroke="#475569" strokeWidth="1" />
              <rect x="122" y="44" width="22" height="18" rx="2" fill="#FEF08A" opacity="0.95" />

              {/* Rear End Flashing Red Warning Tail Lamp (Blinking LED) */}
              <circle cx="6" cy="50" r="4.5" fill="#EF4444" stroke="#0F172A" strokeWidth="1.5" className="animate-ping" />
              <circle cx="6" cy="50" r="3" fill="#EF4444" />

              {/* Rear 'LV' (Last Vehicle) Metal Disc (Mandatory Indian Railways safety emblem) */}
              <circle cx="16" cy="74" r="7" fill="#FACC15" stroke="#0F172A" strokeWidth="1.2" />
              <text x="12" y="77" fill="#0F172A" fontSize="7.5" fontWeight="black" fontFamily="sans-serif">
                LV
              </text>

              {/* Bogies */}
              <rect x="30" y="88" width="56" height="5" rx="1.5" fill="#1E293B" />
              <circle cx="41" cy="97" r="6.5" fill="#334155" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx="41" cy="97" r="2.5" fill="#94A3B8" />
              <circle cx="73" cy="97" r="6.5" fill="#334155" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx="73" cy="97" r="2.5" fill="#94A3B8" />

              <rect x="175" y="88" width="56" height="5" rx="1.5" fill="#1E293B" />
              <circle cx="186" cy="97" r="6.5" fill="#334155" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx="186" cy="97" r="2.5" fill="#94A3B8" />
              <circle cx="218" cy="97" r="6.5" fill="#334155" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx="218" cy="97" r="2.5" fill="#94A3B8" />
            </svg>
          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* 5. STATION PLATFORM FOREGROUND (INDIAN RAILWAY AESTHETIC)    */}
      {/* ============================================================ */}
      <div className="absolute bottom-0 inset-x-0 z-30 pointer-events-none">
        {/* Raised Platform Surface */}
        <div className="h-10 sm:h-12 bg-linear-to-b from-[#f5f5f4] via-[#e7e5e4] to-[#d6d3d1] border-t-3 border-amber-950 relative shadow-[0_-4px_12px_rgba(0,0,0,0.5)]">
          {/* Yellow Safety Tactile Stripe along Platform Edge */}
          <div className="h-2 bg-[#FACC15] border-b border-amber-950/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#000_0px,#000_6px,#FACC15_6px,#FACC15_12px)] opacity-20" />
          </div>

          {/* Platform stone tile floor lines */}
          <div className="absolute inset-x-0 bottom-1 flex justify-around opacity-30">
            {Array.from({ length: 30 }).map((_, p) => (
              <div key={p} className="w-[1px] h-6 bg-stone-600" />
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* PLATFORM OVERHEAD CANOPY TRUSSES & PILLARS           */}
        {/* ---------------------------------------------------- */}
        {/* Canopy Roof Edge */}
        <div className="absolute -top-68 sm:-top-76 inset-x-0 h-6 bg-[#047857] border-b-3 border-amber-950 shadow-md">
          {/* Scalloped decorative trim */}
          <div className="absolute -bottom-1.5 inset-x-0 flex justify-between">
            {Array.from({ length: 35 }).map((_, c) => (
              <div key={c} className="w-4 h-2 bg-[#065F46] rounded-b-full border-b border-amber-950/60" />
            ))}
          </div>
        </div>

        {/* Left Cast-Iron Victorian Pillar */}
        <div className="absolute -top-68 left-8 sm:left-14 w-3.5 h-68 bg-linear-to-b from-emerald-800 via-emerald-950 to-stone-900 border-x border-amber-950 rounded-t-xs">
          {/* Pillar capital / bracket */}
          <div className="absolute -top-1 -left-2 w-7 h-3 bg-emerald-700 border border-amber-950 rounded-xs" />
        </div>

        {/* Right Cast-Iron Pillar */}
        <div className="absolute -top-68 right-8 sm:right-16 w-3.5 h-68 bg-linear-to-b from-emerald-800 via-emerald-950 to-stone-900 border-x border-amber-950 rounded-t-xs">
          <div className="absolute -top-1 -left-2 w-7 h-3 bg-emerald-700 border border-amber-950 rounded-xs" />
        </div>

        {/* ---------------------------------------------------- */}
        {/* AUTHENTIC INDIAN RAILWAY YELLOW STATION SIGNBOARD    */}
        {/* ---------------------------------------------------- */}
        <div className="absolute -top-40 sm:-top-46 left-3 sm:left-20 z-35 pointer-events-auto scale-85 sm:scale-100 origin-top-left">
          {/* Dual steel hanging poles */}
          <div className="w-[2px] h-10 bg-slate-600 mx-auto -mb-1" />
          
          <div className="bg-[#FACC15] border-3 border-amber-950 rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 shadow-[4px_5px_0px_#3d2314] text-center min-w-[170px] sm:min-w-[230px]">
            {/* Tamil (Local State Language) */}
            <div className="text-[10px] sm:text-xs font-bold text-amber-950 leading-tight tracking-wide font-sans">
              சென்னை சென்ட்ரல்
            </div>
            {/* English (Main Station Name) */}
            <div className="text-xs sm:text-base font-black text-amber-950 tracking-wider font-sans uppercase">
              CHENNAI CENTRAL
            </div>
            {/* Hindi (National Language) */}
            <div className="text-[10px] sm:text-xs font-bold text-amber-950 leading-tight font-sans">
              चेन्नई सेंट्रल
            </div>
            {/* Elevation above Mean Sea Level & Station Division */}
            <div className="text-[7.5px] sm:text-[8px] font-semibold text-amber-900/80 border-t border-amber-950/20 pt-0.5 mt-0.5">
              MSL: 6.2M · MAS DIVISION · SOUTHERN RAILWAY
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* PLATFORM INDICATOR & VINTAGE CLOCK                   */}
        {/* ---------------------------------------------------- */}
        {/* Platform 1 Indicator Enamel Disc */}
        <div className="absolute -top-28 left-52 sm:left-64 hidden sm:flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-[#1D4ED8] border-2 border-amber-950 rounded-full shadow-[2px_2px_0px_#000] text-white font-black text-xs font-mono">
          PF 1
        </div>

        {/* Vintage Hanging Railway Station Clock */}
        <div className="absolute -top-42 sm:-top-48 right-24 sm:right-48 flex flex-col items-center pointer-events-none scale-85 sm:scale-100 origin-top">
          <div className="w-[2px] h-8 bg-zinc-600 -mb-1" />
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFFBEB] border-3 border-amber-950 shadow-[3px_3px_0px_#3d2314] relative flex items-center justify-center">
            {/* Clock numerals dots */}
            <div className="absolute top-1 w-1 h-1 bg-amber-950 rounded-full" />
            <div className="absolute bottom-1 w-1 h-1 bg-amber-950 rounded-full" />
            <div className="absolute left-1 w-1 h-1 bg-amber-950 rounded-full" />
            <div className="absolute right-1 w-1 h-1 bg-amber-950 rounded-full" />
            {/* Hour hand (pointing to 6) */}
            <div className="absolute w-[2px] h-3 sm:h-3.5 bg-amber-950 origin-bottom bottom-5 sm:bottom-6 rotate-180" />
            {/* Minute hand (pointing to 9 -> 18:45 evening dusk) */}
            <div className="absolute w-[1.5px] h-4 sm:h-4.5 bg-amber-950 origin-bottom bottom-5 sm:bottom-6 rotate-270" />
            {/* Center brass pin */}
            <div className="w-1.5 h-1.5 bg-[#B45309] rounded-full z-10" />
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* WARM GLOWING PLATFORM LANTERN                        */}
        {/* ---------------------------------------------------- */}
        <div className="absolute -top-34 right-14 sm:right-24 pointer-events-none scale-85 sm:scale-100">
          <div className="w-6 h-10 border-t-2 border-r-2 border-zinc-700 -mr-2 relative">
            {/* Brass lamp housing */}
            <div className="absolute right-0 top-3 w-4 h-6 bg-[#B45309] rounded-xs border border-amber-950 flex items-center justify-center shadow-md">
              <div className="w-2.5 h-4 bg-[#FEF08A] rounded-xs animate-pulse shadow-[0_0_12px_#FDE047]" />
            </div>
            {/* Soft conical light pool on platform */}
            <div className="absolute -right-6 top-8 w-16 h-20 bg-radial from-amber-300/35 via-amber-200/10 to-transparent pointer-events-none blur-xs" />
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* RAILWAY COLOR LIGHT SIGNAL (Interactive Toggle)      */}
        {/* ---------------------------------------------------- */}
        <div
          onClick={toggleSignal}
          className="absolute -top-32 right-2 sm:right-6 pointer-events-auto cursor-pointer group scale-85 sm:scale-100 origin-bottom-right"
          title="Click to toggle railway signal"
        >
          {/* Signal post */}
          <div className="w-2 h-32 bg-zinc-800 border-x border-zinc-950 relative flex flex-col items-center">
            {/* Signal head target board */}
            <div className="w-5 h-11 bg-zinc-950 border border-zinc-700 rounded-md -mt-2 flex flex-col items-center justify-around py-1 shadow-md">
              {/* Red (Top) */}
              <div className="w-3 h-3 rounded-full bg-zinc-800 border border-zinc-900" />
              {/* Amber (Middle) */}
              <div
                className={`w-3 h-3 rounded-full border border-zinc-900 transition-colors ${
                  signalState === 'amber'
                    ? 'bg-[#F59E0B] shadow-[0_0_8px_#FBBF24]'
                    : 'bg-zinc-800'
                }`}
              />
              {/* Green (Bottom) */}
              <div
                className={`w-3 h-3 rounded-full border border-zinc-900 transition-colors ${
                  signalState === 'green'
                    ? 'bg-[#10B981] shadow-[0_0_8px_#34D399]'
                    : 'bg-zinc-800'
                }`}
              />
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* CUTEDODO ON PLATFORM WOODEN BENCH (No crowd, serene) */}
        {/* ---------------------------------------------------- */}
        <div className="absolute -top-16 left-32 xs:left-40 sm:left-72 md:left-96 block pointer-events-auto scale-75 sm:scale-100 origin-bottom-left">
          {/* Wooden Bench */}
          <div className="relative w-24 h-12">
            {/* Cast-iron legs */}
            <div className="absolute bottom-0 left-2 w-1.5 h-6 bg-zinc-800" />
            <div className="absolute bottom-0 right-2 w-1.5 h-6 bg-zinc-800" />
            {/* Wooden slats seat */}
            <div className="absolute bottom-6 inset-x-0 h-2 bg-[#B45309] border border-amber-950 rounded-xs shadow-[1px_1px_0px_#000]" />
            {/* Wooden slats backrest */}
            <div className="absolute top-0 inset-x-0 h-4 bg-[#92400E] border border-amber-950 rounded-xs shadow-[1px_1px_0px_#000]" />

            {/* CuteDODO sitting peacefully watching the train pass */}
            <div
              className="absolute -top-7 left-5 cursor-pointer group"
              onClick={() => {
                sounds.bark();
                sounds.bell();
              }}
              title="Click Dodo to hear a happy woof!"
            >
              <svg viewBox="0 0 50 45" className="w-12 h-11 overflow-visible">
                {/* Fluffy wagging tail */}
                <path d="M 8 26 C 2 20 2 12 8 10 C 14 10 14 18 10 24 Z" fill="#F5F5F4" stroke="#3d2314" strokeWidth="1.2" className="animate-wag" />
                {/* Body */}
                <ellipse cx="22" cy="26" rx="14" ry="10" fill="#FFFBEB" stroke="#3d2314" strokeWidth="1.5" />
                <path d="M 16 20 C 22 20 28 24 28 30 C 24 34 16 34 16 26 Z" fill="#B45309" />
                {/* Front paws */}
                <ellipse cx="28" cy="34" rx="3.5" ry="2.5" fill="#FFFBEB" stroke="#3d2314" strokeWidth="1" />
                {/* Collar with golden bell */}
                <path d="M 27 21 Q 31 25 35 21" stroke="#DC2626" strokeWidth="2" fill="none" />
                <circle cx="31" cy="24" r="2.2" fill="#FBBF24" stroke="#3d2314" strokeWidth="0.8" />
                {/* Head */}
                <circle cx="34" cy="15" r="9" fill="#FFFBEB" stroke="#3d2314" strokeWidth="1.5" />
                <ellipse cx="31" cy="14" rx="3" ry="3.5" fill="#B45309" />
                <ellipse cx="37" cy="14" rx="3" ry="3.5" fill="#B45309" />
                {/* Cute Eyes watching the train */}
                <circle cx="32" cy="14" r="1.2" fill="#1C1917" />
                <circle cx="38" cy="14" r="1.2" fill="#1C1917" />
                {/* Nose & Muzzle */}
                <ellipse cx="35" cy="18" rx="2.5" ry="1.8" fill="#FEF3C7" stroke="#3d2314" strokeWidth="0.8" />
                <circle cx="35" cy="17" r="1" fill="#1C1917" />
                {/* Topknot red ribbon */}
                <polygon points="34,6 36,6 35,4" fill="#EF4444" stroke="#3d2314" strokeWidth="0.6" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* 6. CINEMATIC OVERLAY CONTROLS (Top Right of the Scene)       */}
      {/* ============================================================ */}
      <div className="absolute top-3.5 right-4 z-40 flex items-center gap-2">
        {/* Authentic Indian Railways Dual-Tone Electric Horn Button */}
        <button
          onClick={triggerHorn}
          className={`cartoon-btn px-2.5 py-1.5 rounded-xl border-2 border-amber-950 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
            hornActive
              ? 'bg-amber-400 text-amber-950 scale-105 shadow-[2px_2px_0px_#000]'
              : 'bg-white/90 hover:bg-amber-100 text-amber-950 shadow-[2px_2px_0px_#3d2314]'
          }`}
          title="Sound the authentic Indian Railways WAP-7 dual-tone electric horn"
        >
          <Train className={`w-3.5 h-3.5 text-amber-900 ${hornActive ? 'animate-bounce' : ''}`} />
          <span className="hidden sm:inline font-cartoon">
            {hornActive ? '📢 WAP-7 Horn!' : '🚂 Train Horn'}
          </span>
          <span className="sm:hidden font-cartoon">Horn</span>
        </button>

        {/* Train Animation Play / Pause Toggle */}
        <button
          onClick={() => {
            sounds.pop();
            setIsPlaying(!isPlaying);
          }}
          className="cartoon-btn p-1.5 bg-white/90 hover:bg-amber-100 rounded-xl border-2 border-amber-950 text-amber-950 shadow-[2px_2px_0px_#3d2314] transition-all active:scale-95"
          title={isPlaying ? 'Pause train movement' : 'Resume train movement'}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 text-amber-950" />
          ) : (
            <Play className="w-3.5 h-3.5 text-emerald-800" />
          )}
        </button>
      </div>

      {/* Bottom Live Status Banner */}
      <div className="absolute bottom-2 left-3 sm:left-4 z-40 text-[9px] sm:text-[11px] font-bold text-amber-950 flex items-center gap-2 pointer-events-none max-w-[calc(100%-24px)]">
        <span className="bg-amber-200/90 border border-amber-950/40 px-2 py-0.5 rounded-full flex items-center gap-1 truncate">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="truncate">Southern Railway · Chennai Central Express (WAP-7)</span>
        </span>
      </div>
    </div>
  );
};
