import React, { useState, useEffect, useRef, useCallback } from 'react';

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  type: 'paw' | 'bone' | 'heart' | 'sparkle';
  color: string;
  opacity: number;
  scale: number;
  vx: number;
  vy: number;
}

interface ClickRipple {
  id: number;
  x: number;
  y: number;
  color: string;
}

export const InteractiveMouseTrail: React.FC = () => {
  const [trailEnabled, setTrailEnabled] = useState(true);
  const [trailTheme, setTrailTheme] = useState<'mixed' | 'paws' | 'sparkles' | 'bones'>('mixed');
  const [particles, setParticles] = useState<TrailParticle[]>([]);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  
  const mousePosRef = useRef({ x: -100, y: -100 });
  const lastSpawnTimeRef = useRef(0);
  const nextIdRef = useRef(1);
  const isMovingRef = useRef(false);
  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Themes & particle types
  const getParticleType = useCallback((): 'paw' | 'bone' | 'heart' | 'sparkle' => {
    if (trailTheme === 'paws') return 'paw';
    if (trailTheme === 'bones') return 'bone';
    if (trailTheme === 'sparkles') return 'sparkle';
    const choices: ('paw' | 'bone' | 'heart' | 'sparkle')[] = ['paw', 'paw', 'bone', 'heart', 'sparkle'];
    return choices[Math.floor(Math.random() * choices.length)];
  }, [trailTheme]);

  const colors = [
    '#F59E0B', // Amber
    '#FB7185', // Rose
    '#38BDF8', // Sky
    '#34D399', // Emerald
    '#A78BFA', // Purple
  ];

  // Mouse move handler with rate-limiting for silky 60fps
  useEffect(() => {
    if (!trailEnabled) {
      setParticles([]);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      mousePosRef.current = { x, y };

      const now = performance.now();
      // Throttle spawn to once every 32ms (~30 particles/sec while moving)
      if (now - lastSpawnTimeRef.current > 32) {
        lastSpawnTimeRef.current = now;
        isMovingRef.current = true;

        if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
        moveTimeoutRef.current = setTimeout(() => {
          isMovingRef.current = false;
        }, 120);

        const newId = nextIdRef.current++;
        const pType = getParticleType();
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = (Math.random() * 30 - 15) * (Math.PI / 180);
        const speed = Math.random() * 0.8 + 0.2;

        const newParticle: TrailParticle = {
          id: newId,
          x: x + (Math.random() * 8 - 4),
          y: y + (Math.random() * 8 - 4),
          size: pType === 'paw' ? 18 : pType === 'bone' ? 16 : 14,
          rotation: Math.random() * 40 - 20,
          type: pType,
          color,
          opacity: 0.9,
          scale: 1,
          vx: Math.sin(angle) * speed,
          vy: -Math.cos(angle) * speed - 0.5, // gentle float upward
        };

        setParticles((prev) => {
          const next = [...prev, newParticle];
          // Cap at max 22 particles for zero lag
          return next.length > 22 ? next.slice(next.length - 22) : next;
        });
      }
    };

    // Click burst ripple effect
    const handleClick = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      const rippleId = nextIdRef.current++;
      
      const newRipple: ClickRipple = {
        id: rippleId,
        x,
        y,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setRipples((prev) => [...prev.slice(-3), newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== rippleId));
      }, 700);

      // Spawn 5 burst particles radiating outward
      const burstParticles: TrailParticle[] = Array.from({ length: 5 }).map((_, i) => {
        const id = nextIdRef.current++;
        const angle = (i * (360 / 5) + Math.random() * 20) * (Math.PI / 180);
        const speed = Math.random() * 2.5 + 1.5;
        const pType = getParticleType();
        return {
          id,
          x,
          y,
          size: 18,
          rotation: Math.random() * 360,
          type: pType,
          color: colors[i % colors.length],
          opacity: 1,
          scale: 1.2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        };
      });

      setParticles((prev) => [...prev.slice(-15), ...burstParticles]);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
    };
  }, [trailEnabled, getParticleType]);

  // Particle physics animation loop
  useEffect(() => {
    if (!trailEnabled || particles.length === 0) return;

    let animId: number;
    const updatePhysics = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            opacity: p.opacity - 0.028,
            scale: Math.max(0, p.scale - 0.022),
            rotation: p.rotation + (p.vx > 0 ? 1 : -1),
          }))
          .filter((p) => p.opacity > 0.05 && p.scale > 0.1)
      );
      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [trailEnabled, particles.length]);

  return (
    <>
      {/* Non-intrusive Canvas / Overlay Particles (zero pointer events, completely passive) */}
      {trailEnabled && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
          {/* Click Ripples */}
          {ripples.map((ripple) => (
            <div
              key={ripple.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 animate-ping"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 44,
                height: 44,
                borderColor: ripple.color,
                opacity: 0.8,
                animationDuration: '600ms',
              }}
            />
          ))}

          {/* Mouse Trail Particles */}
          {particles.map((p) => {
            return (
              <div
                key={p.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform transition-transform"
                style={{
                  left: p.x,
                  top: p.y,
                  opacity: p.opacity,
                  transform: `scale(${p.scale}) rotate(${p.rotation}deg)`,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.12))',
                }}
              >
                {p.type === 'paw' && (
                  <span className="text-base select-none inline-block">🐾</span>
                )}
                {p.type === 'bone' && (
                  <span className="text-base select-none inline-block">🦴</span>
                )}
                {p.type === 'heart' && (
                  <span className="text-sm select-none inline-block text-rose-500">❤️</span>
                )}
                {p.type === 'sparkle' && (
                  <span className="text-base select-none inline-block text-amber-400">✨</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
