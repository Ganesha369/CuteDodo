import React, { useState } from 'react';
import { ScenePlaying } from './scenes/ScenePlaying';
import { SceneWalking } from './scenes/SceneWalking';
import { SceneGrandma } from './scenes/SceneGrandma';
import { SceneFeedingTray } from './scenes/SceneFeedingTray';
import { SceneStreetDogs } from './scenes/SceneStreetDogs';
import { InteractivePlayfulModesTheater } from './InteractivePlayfulModesTheater';
import { sounds } from '../utils/soundEffects';
import { ChevronLeft, ChevronRight, Film, Sparkles } from 'lucide-react';

export const InteractiveDogScenes: React.FC = () => {
  const [activeSceneIdx, setActiveSceneIdx] = useState<number>(0);

  const scenes = [
    {
      id: 'play',
      num: '01',
      title: 'Playful Zoomies',
      subtitle: 'CuteDODO Playing Happily',
      icon: '🎾',
      component: <ScenePlaying />,
    },
    {
      id: 'walk',
      num: '02',
      title: 'Park Stroll',
      subtitle: 'Walking on Leash with Dad',
      icon: '🚶‍♂️',
      component: <SceneWalking />,
    },
    {
      id: 'grandma',
      num: '03',
      title: 'Grandma’s Lap',
      subtitle: 'Affectionate Veranda Story',
      icon: '👵',
      component: <SceneGrandma />,
    },
    {
      id: 'feeding',
      num: '04',
      title: 'Mealtime Tray',
      subtitle: 'Preparing Wholesome Food',
      icon: '🥣',
      component: <SceneFeedingTray />,
    },
    {
      id: 'street',
      num: '05',
      title: 'Saving Strays',
      subtitle: 'Feeding Street Dogs in Chennai',
      icon: '🐕',
      component: <SceneStreetDogs />,
    },
  ];

  const currentScene = scenes[activeSceneIdx];

  const handleNext = () => {
    sounds.pop();
    setActiveSceneIdx((prev) => (prev + 1) % scenes.length);
  };

  const handlePrev = () => {
    sounds.pop();
    setActiveSceneIdx((prev) => (prev - 1 + scenes.length) % scenes.length);
  };

  return (
    <section id="scenes" className="py-16 md:py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#F7D9C7] border border-[#49200B]/30 rounded-xl text-xs font-bold font-heading text-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] mb-3">
            <Film className="w-3.5 h-3.5 text-[#49200B]" />
            <span>Interactive Animated Theater · 5 Life Scenes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#49200B] tracking-tight mb-3">
            The Life &amp; Mission of <span className="text-[#FF9F00]">CuteDODO</span>
          </h2>
          <p className="text-base sm:text-lg text-[#79513B] font-medium leading-relaxed">
            Explore 5 hand-crafted animated scenes showing Dodo playing, walking on leash, cuddling with grandma, enjoying meals, and sharing food with street dogs.
          </p>
        </div>

        {/* Scene Navigation Selector Tabs */}
        <div className="flex items-center justify-between gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
          <div className="flex items-center gap-2 sm:gap-3 mx-auto">
            {scenes.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => {
                  sounds.pop();
                  setActiveSceneIdx(idx);
                }}
                className={`cartoon-btn px-3 sm:px-5 py-2 sm:py-3 rounded-2xl flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm font-bold font-heading transition-all ${
                  activeSceneIdx === idx
                    ? 'bg-[#FFD36A] text-[#49200B] shadow-[3px_3px_0px_#49200B] -translate-y-0.5'
                    : 'bg-white text-[#79513B] hover:bg-[#FFF3DC] border border-[#49200B]/20'
                }`}
              >
                <span className="text-base sm:text-lg">{scene.icon}</span>
                <div className="text-left hidden sm:block">
                  <div className="text-[10px] font-mono opacity-70">Scene {scene.num}</div>
                  <div>{scene.title}</div>
                </div>
                <span className="sm:hidden">{scene.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Scene Theater Viewport Container with Smooth Crossfade Animation */}
        <div className="relative min-h-[500px]">
          <div
            key={currentScene.id}
            className="transition-opacity duration-300 animate-[popIn_0.3s_cubic-bezier(0.16,1,0.3,1)]"
          >
            {currentScene.component}
          </div>
        </div>

        {/* Bottom Pager Controls */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#49200B]/10 mb-12">
          <button
            onClick={handlePrev}
            className="cartoon-btn px-4 sm:px-5 py-2.5 bg-white hover:bg-[#FFF3DC] rounded-xl text-xs sm:text-sm font-bold font-heading text-[#49200B] flex items-center gap-2 shadow-[2px_2px_0px_#49200B]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Scene</span>
          </button>

          <div className="text-xs font-bold font-heading text-[#79513B] hidden sm:block">
            Scene {activeSceneIdx + 1} of {scenes.length} · {currentScene.subtitle}
          </div>

          <button
            onClick={handleNext}
            className="cartoon-btn px-4 sm:px-5 py-2.5 bg-[#FFD36A] hover:bg-[#FF9F00] rounded-xl text-xs sm:text-sm font-bold font-heading text-[#49200B] flex items-center gap-2 shadow-[2px_2px_0px_#49200B]"
          >
            <span>Next Scene</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5 Playfulness Modes Interactive Stage */}
        <InteractivePlayfulModesTheater />

      </div>
    </section>
  );
};
