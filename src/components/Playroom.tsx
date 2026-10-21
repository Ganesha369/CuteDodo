import React, { useState } from 'react';
import { Heart, Sparkles, Award, RefreshCw, Smile } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const Playroom: React.FC = () => {
  const [treatsFed, setTreatsFed] = useState(14);
  const [happiness, setHappiness] = useState(96);
  const [lastAction, setLastAction] = useState('Dodo is wagging happily!');
  const [selectedSticker, setSelectedSticker] = useState<string>('crown');
  const [customText, setCustomText] = useState('Much Wholesome. Very Solana. 🐾');
  const [memeSavedNotice, setMemeSavedNotice] = useState(false);

  const stickers = [
    { id: 'crown', label: '👑 Royal Crown', emoji: '👑' },
    { id: 'shades', label: '🕶️ Cool Shades', emoji: '🕶️' },
    { id: 'bone', label: '🦴 Golden Bone', emoji: '🦴' },
    { id: 'bow', label: '🎀 Cute Bow Tie', emoji: '🎀' },
    { id: 'bell', label: '🔔 Jingle Bell', emoji: '🔔' },
  ];

  const handleFeedBone = () => {
    sounds.chew();
    setTreatsFed((prev) => prev + 1);
    setHappiness((prev) => Math.min(100, prev + 2));
    setLastAction('Crunch crunch! Dodo loves his biscuit bone! 🦴');
  };

  const handleGiveWater = () => {
    sounds.pop();
    setHappiness((prev) => Math.min(100, prev + 1));
    setLastAction('Slurp slurp! Fresh cool water for the little hero! 💧');
  };

  const handleBellyRub = () => {
    sounds.bark();
    setHappiness(100);
    setLastAction('Tail wagging at maximum speed! 100% pure doggy joy! ❤️');
  };

  const handleRingBell = () => {
    sounds.bell();
    setLastAction('Ding dong! Dodo perks up his fluffy ears! 🔔');
  };

  return (
    <section id="playroom" className="py-16 md:py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-300 border-2 border-amber-950 rounded-full text-xs font-bold text-amber-950 shadow-[2px_2px_0px_#3d2314] mb-3">
            <span>🎮 Dodo Interactive Playroom</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-cartoon text-amber-950 tracking-tight mb-3">
            Feed, Play &amp; Create With Dodo
          </h2>
          <p className="text-base sm:text-lg text-amber-900/80 font-medium">
            A playful interactive corner loved by kids and dog enthusiasts. Care for Dodo and customize cute meme stickers!
          </p>
        </div>

        {/* 2-Column interactive dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Virtual Pet Feeding & Care Station (7 Cols) */}
          <div className="lg:col-span-7 cartoon-card bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-amber-950/10">
                <div className="flex items-center gap-2">
                  <Smile className="w-6 h-6 text-amber-600" />
                  <h3 className="text-2xl font-bold font-cartoon text-amber-950">
                    Dodo Care Station
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 border border-amber-950/40 px-3 py-1 rounded-full">
                    🦴 Treats Given: <strong className="text-amber-950">{treatsFed}</strong>
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-amber-950/40 px-3 py-1 rounded-full">
                    Tail Wag: <strong className="text-emerald-950">{happiness}%</strong>
                  </span>
                </div>
              </div>

              {/* Central Mascot Interactive Canvas */}
              <div className="relative rounded-2xl bg-amber-50 border-3 border-amber-950 p-6 flex flex-col items-center justify-center mb-6 shadow-inner">
                
                {/* Floating status speech */}
                <div className="bg-amber-200 border-2 border-amber-950 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold text-amber-950 shadow-[2px_2px_0px_#3d2314] mb-4 text-center">
                  {lastAction}
                </div>

                <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden border-3 border-amber-950 bg-amber-300 shadow-[4px_4px_0px_#3d2314]">
                  <img
                    src="/assets/images/cutedodo_hero_mascot_1791659602047.jpg"
                    alt="CuteDodo mascot happy"
                    className="w-full h-full object-cover animate-float"
                  />
                  <div className="absolute top-2 right-2 text-2xl animate-bounce">
                    ✨
                  </div>
                </div>

                {/* Happiness meter bar */}
                <div className="w-full max-w-md mt-5">
                  <div className="flex justify-between text-xs font-bold text-amber-900 mb-1">
                    <span>Happiness Level</span>
                    <span>{happiness}% (Super Wagging!)</span>
                  </div>
                  <div className="w-full h-4 bg-amber-200 border-2 border-amber-950 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-rose-400 rounded-full transition-all duration-300"
                      style={{ width: `${happiness}%` }}
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Care Action Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <button
                onClick={handleFeedBone}
                className="cartoon-btn p-3 bg-amber-300 hover:bg-amber-200 rounded-2xl flex flex-col items-center justify-center gap-1 text-center"
              >
                <span className="text-2xl">🦴</span>
                <span className="text-xs font-bold text-amber-950">Feed Bone</span>
              </button>

              <button
                onClick={handleGiveWater}
                className="cartoon-btn p-3 bg-sky-200 hover:bg-sky-100 rounded-2xl flex flex-col items-center justify-center gap-1 text-center"
              >
                <span className="text-2xl">💧</span>
                <span className="text-xs font-bold text-amber-950">Cool Water</span>
              </button>

              <button
                onClick={handleBellyRub}
                className="cartoon-btn p-3 bg-rose-300 hover:bg-rose-200 rounded-2xl flex flex-col items-center justify-center gap-1 text-center"
              >
                <span className="text-2xl">❤️</span>
                <span className="text-xs font-bold text-amber-950">Belly Rub</span>
              </button>

              <button
                onClick={handleRingBell}
                className="cartoon-btn p-3 bg-amber-400 hover:bg-amber-300 rounded-2xl flex flex-col items-center justify-center gap-1 text-center"
              >
                <span className="text-2xl">🔔</span>
                <span className="text-xs font-bold text-amber-950">Collar Bell</span>
              </button>
            </div>

          </div>

          {/* Card 2: Cartoon Sticker & Meme Studio (5 Cols) */}
          <div className="lg:col-span-5 cartoon-card bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-amber-950/10">
                <Sparkles className="w-6 h-6 text-amber-600" />
                <h3 className="text-2xl font-bold font-cartoon text-amber-950">
                  Dodo Meme Studio
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-amber-900/80 font-medium mb-4">
                Pick a costume badge and write your favorite meme caption for the Dodo community!
              </p>

              {/* Meme Preview Container */}
              <div className="relative aspect-square w-full max-w-xs mx-auto rounded-3xl overflow-hidden border-3 border-amber-950 bg-amber-200 shadow-[4px_4px_0px_#3d2314] mb-4">
                <img
                  src="/assets/images/cutedodo_hero_mascot_1791659602047.jpg"
                  alt="Dodo meme base"
                  className="w-full h-full object-cover"
                />

                {/* Selected Sticker Badge */}
                <div className="absolute top-4 left-4 bg-white/95 border-2 border-amber-950 px-3 py-1 rounded-xl shadow-[2px_2px_0px_#3d2314] text-lg">
                  {stickers.find((s) => s.id === selectedSticker)?.emoji}
                </div>

                <div className="absolute top-4 right-4 bg-amber-400 border-2 border-amber-950 px-2 py-0.5 rounded-lg text-[10px] font-bold text-amber-950 shadow">
                  $DODO
                </div>

                {/* Meme Caption Banner */}
                <div className="absolute bottom-3 inset-x-3 bg-amber-950/90 text-amber-100 border-2 border-amber-400 p-2 rounded-xl text-center text-xs font-bold font-cartoon shadow">
                  {customText || 'CuteDODO to the moon! 🐾'}
                </div>
              </div>

              {/* Sticker Selector */}
              <div className="mb-4">
                <span className="text-xs font-bold text-amber-900 block mb-2">Pick an Accessory:</span>
                <div className="flex flex-wrap gap-2">
                  {stickers.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        sounds.pop();
                        setSelectedSticker(s.id);
                      }}
                      className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border-2 border-amber-950 transition-all ${
                        selectedSticker === s.id
                          ? 'bg-amber-400 shadow-[2px_2px_0px_#3d2314]'
                          : 'bg-amber-100 hover:bg-amber-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Caption Input */}
              <div className="mb-4">
                <label className="text-xs font-bold text-amber-900 block mb-1">Meme Text:</label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  maxLength={40}
                  className="w-full bg-amber-50 border-2 border-amber-950 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="Enter meme caption..."
                />
              </div>
            </div>

            <button
              onClick={() => {
                sounds.coin();
                navigator.clipboard?.writeText(`CuteDODO Meme: "${customText}" #CuteDODO #Solana`);
                setMemeSavedNotice(true);
                setTimeout(() => setMemeSavedNotice(false), 4000);
              }}
              className="cartoon-btn w-full py-2.5 bg-amber-400 hover:bg-amber-300 rounded-xl text-xs sm:text-sm font-bold text-amber-950 flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4 text-amber-900" />
              <span>{memeSavedNotice ? 'Meme Copied! Share on X & TG ✓' : 'Save & Share Meme'}</span>
            </button>
            {memeSavedNotice && (
              <p className="text-[11px] font-bold text-emerald-800 text-center mt-2 animate-bounce">
                🐾 Meme caption copied! Paste on X (@CuteDODO_018) or Telegram!
              </p>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
