'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import TextParticles from './3d/TextParticles';
import * as THREE from 'three';

export default function Scene() {
  // scrollOffset covers the 3D section only (200vh).
  // We map scrollY within the 3D section height (= window.innerHeight * 2) to 0..1
  const scrollOffset = useRef(0);

  useFrame((state) => {
    const sectionHeight = window.innerHeight * 2;
    scrollOffset.current = Math.min(1, window.scrollY / sectionHeight);

    // Remove camera movement based on scroll to stop zooming
    // state.camera.position.z = 5 - offset * 2;
    // state.camera.position.y = -offset * 2;
    // state.camera.lookAt(0, -offset * 2, 0);
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#0091EA" />

      <TextParticles scrollOffset={scrollOffset} />
    </>
  );
}

