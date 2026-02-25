'use client';

import { useMemo, useRef } from 'react';
import { useFrame, extend, ThreeElement, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

// Star particle material with twinkle and drift
const StarFieldMaterial = shaderMaterial(
  {
    uTime: 0,
    uPixelRatio: 1,
    uFade: 1,
  },

  // Vertex Shader
  `
    uniform float uTime;
    uniform float uPixelRatio;

    attribute float aRandom;
    attribute float aSpeed;
    attribute float aSize;

    varying float vAlpha;

    void main() {
      vec3 pos = position;

      // Gentle drift: slow and organic
      pos.x += sin(uTime * aSpeed * 0.35 + aRandom * 6.28) * 1.2
             + cos(uTime * aSpeed * 0.2 + aRandom * 4.0) * 0.4;
      pos.y += cos(uTime * aSpeed * 0.28 + aRandom * 6.28) * 0.9
             + sin(uTime * aSpeed * 0.16 + aRandom * 3.5) * 0.3;
      pos.z += sin(uTime * aSpeed * 0.22 + aRandom * 3.14) * 0.6;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      // Twinkle: gentle pulse
      float twinkle  = sin(uTime * aSpeed * 1.2 + aRandom * 20.0) * 0.5 + 0.5;
      float twinkle2 = cos(uTime * aSpeed * 0.8 + aRandom * 15.0) * 0.5 + 0.5;
      vAlpha = mix(0.05, 1.0, twinkle * 0.7 + twinkle2 * 0.3);

      // Size pulses slightly with twinkle
      float sizeBoost = 1.0 + twinkle * 0.3;
      gl_PointSize = aSize * sizeBoost * uPixelRatio * (1.0 / -mvPosition.z);
    }
  `,

  // Fragment Shader
  `
    uniform float uFade;
    varying float vAlpha;

    void main() {
      vec2 coord = gl_PointCoord - vec2(0.5);
      float r = length(coord);
      if (r > 0.5) discard;

      // Soft glow core
      float glow = 1.0 - (r * 2.0);
      glow = pow(glow, 2.0);

      // Color: mostly white-blue with subtle variation
      vec3 color = vec3(0.9, 0.9, 1.0);

      gl_FragColor = vec4(color, vAlpha * glow * uFade);
    }
  `
);

extend({ StarFieldMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    starFieldMaterial: ThreeElement<typeof THREE.ShaderMaterial>;
  }
}

const STAR_COUNT = 3000;

export default function StarField({ scrollOffset }: { scrollOffset: React.RefObject<number> }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const attributes = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3);
    const randoms = new Float32Array(STAR_COUNT);
    const speeds = new Float32Array(STAR_COUNT);
    const sizes = new Float32Array(STAR_COUNT);

    for (let i = 0; i < STAR_COUNT; i++) {
      // Spread stars across a wide area (viewport-aware)
      positions[i * 3 + 0] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2; // slightly behind text

      randoms[i] = Math.random();
      speeds[i] = 0.2 + Math.random() * 0.8; // gentle speed spread
      sizes[i] = 3 + Math.random() * 14;    // bigger range: tiny dots to bright stars
    }

    return { positions, randoms, speeds, sizes };
  }, []);

  useFrame((state, delta) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value += delta;
    materialRef.current.uniforms.uPixelRatio.value = state.viewport.dpr;

    // Fade out when TextParticles start to rain (scroll > 0.3)
    const offset = scrollOffset.current || 0;
    const fade = 1.0 - Math.max(0, Math.min(1, (offset - 0.3) / 0.15));
    materialRef.current.uniforms.uFade.value = fade;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={STAR_COUNT}
          array={attributes.positions}
          itemSize={3}
          args={[attributes.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          count={STAR_COUNT}
          array={attributes.randoms}
          itemSize={1}
          args={[attributes.randoms, 1]}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          count={STAR_COUNT}
          array={attributes.speeds}
          itemSize={1}
          args={[attributes.speeds, 1]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={STAR_COUNT}
          array={attributes.sizes}
          itemSize={1}
          args={[attributes.sizes, 1]}
        />
      </bufferGeometry>
      <starFieldMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
