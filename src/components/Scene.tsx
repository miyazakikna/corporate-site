'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import TextParticles from './3d/TextParticles';
import StarField from './3d/StarField';

export default function Scene() {
  // scrollOffset covers the 3D section only (200vh).
  // We map scrollY within the 3D section height (= window.innerHeight * 2) to 0..1
  const scrollOffset = useRef(0);

  useFrame((state) => {
    const sectionHeight = window.innerHeight * 2;
    scrollOffset.current = Math.min(1, window.scrollY / sectionHeight);
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#0091EA" />

      {/* Stars: always floating in the background */}
      <StarField scrollOffset={scrollOffset} />

      {/* Text particles: Amelio -> Rain -> Flower */}
      <TextParticles scrollOffset={scrollOffset} />
    </>
  );
}

