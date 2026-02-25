'use client';

import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { Suspense } from 'react';
import Scene from '@/components/Scene';
import HeroSection from '@/components/selection/HeroSection';
import PhilosophySection from '@/components/selection/PhilosophySection';
import NewsSection from '@/components/selection/NewsSection';
import ServiceSection from '@/components/selection/ServiceSection';

export default function Top() {
  return (
    <div className="relative w-full bg-secondary">
      {/* === 3D Section: Hero + Philosophy (2 screens) === */}
      {/* Canvas stays sticky for Hero and Philosophy */}
      <div className="relative h-[200vh]">
        <div className="sticky top-0 h-screen w-full pointer-events-none z-0">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ antialias: true, alpha: false }}
            dpr={[1, 2]}
          >
            <color attach="background" args={['#011627']} />
            <Suspense fallback={null}>
              <Scene />
              <Preload all />
            </Suspense>
          </Canvas>
        </div>

        {/* Hero and Philosophy sit on top of the sticky Canvas */}
        <div className="absolute inset-0 z-10 w-full">
          <HeroSection />
          <PhilosophySection />
        </div>
      </div>

      <div className="relative z-10 w-full text-white">
        <NewsSection />

        <ServiceSection />

      </div>
    </div>
  );
}