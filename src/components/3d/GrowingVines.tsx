'use client';

import { useMemo, useRef } from 'react';
import { useFrame, extend, ThreeElement, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

const VineParticleMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0,
    uPixelRatio: 1,
  },
  // Vertex Shader
  `
    uniform float uTime;
    uniform float uProgress;
    uniform float uPixelRatio;

    attribute vec3 aColor;
    attribute float aDistance;
    attribute float aRandom;
    attribute float aSize;

    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      // Add slight floating motion for a natural, organic feel
      vec3 pos = position;
      float motionIntensity = clamp(uProgress - aDistance, 0.0, 1.0);
      pos.x += sin(uTime * 1.5 + aRandom * 10.0) * 0.03 * motionIntensity;
      pos.y += cos(uTime * 1.0 + aRandom * 10.0) * 0.03 * motionIntensity;

      // Growth animation
      // uProgress goes from 0 to 1 as we scroll
      // Particle appears when uProgress >= aDistance (where aDistance is 0 to 1 along the vine)
      float growth = smoothstep(aDistance - 0.08, aDistance + 0.02, uProgress);
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      // Scale up slightly as it grows
      float scaleAnim = mix(0.1, 1.0, growth);
      gl_PointSize = aSize * scaleAnim * uPixelRatio * (1.0 / -mvPosition.z) * 14.0;

      vColor = aColor;
      // Alpha fades in naturally
      vAlpha = growth * (0.8 + 0.2 * sin(uTime * 2.0 + aRandom * 5.0));
    }
  `,
  // Fragment Shader
  `
    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      // Create a smooth circular particle instead of a hard square
      vec2 coord = gl_PointCoord - vec2(0.5);
      float r = length(coord);
      if (r > 0.5) discard;

      // Smooth edge for a painted, soft look
      float alpha = smoothstep(0.5, 0.3, r);

      gl_FragColor = vec4(vColor, vAlpha * alpha);
    }
  `
);

extend({ VineParticleMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    vineParticleMaterial: ThreeElement<typeof THREE.ShaderMaterial>;
  }
}

export default function GrowingVines({ scrollOffset }: { scrollOffset: React.RefObject<number> }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();

  const attributes = useMemo(() => {
    const points: number[] = [];
    const colors: number[] = [];
    const distances: number[] = [];
    const randoms: number[] = [];
    const sizes: number[] = [];

    const addPoint = (p: THREE.Vector3, c: THREE.Color, d: number, s: number) => {
      points.push(p.x, p.y, p.z);
      colors.push(c.r, c.g, c.b);
      distances.push(d);
      randoms.push(Math.random());
      sizes.push(s);
    };

    // Color palette based on the reference image
    // Muted, elegant, natural tones
    const colorStem = new THREE.Color('#4c5b41'); // Deep olive green
    const colorLeaf = new THREE.Color('#7a9667'); // Soft sage green
    const colorFlowerCenter = new THREE.Color('#e0c272'); // Warm yellow/mustard
    const colorFlowerPetal = new THREE.Color('#b57385'); // Dusty rose/purple

    const generateVine = (startSide: 'left' | 'right') => {
      const isLeft = startSide === 'left';

      // Control points for a beautiful sweeping S-curve
      const curvePoints = isLeft ? [
        new THREE.Vector3(-3.5, -6, 0),
        new THREE.Vector3(-1.5, -2, 0.5),
        new THREE.Vector3(-3.5, 2, -0.5),
        new THREE.Vector3(-1.0, 6, 0),
        new THREE.Vector3(-2.5, 10, 0.5),
      ] : [
        new THREE.Vector3(3.5, -6, 0),
        new THREE.Vector3(1.5, -2, -0.5),
        new THREE.Vector3(3.5, 2, 0.5),
        new THREE.Vector3(1.0, 6, 0),
        new THREE.Vector3(2.5, 10, -0.5),
      ];

      const curve = new THREE.CatmullRomCurve3(curvePoints);

      // 1. Generate Stem
      const stemCount = 1200;
      for (let i = 0; i < stemCount; i++) {
        const t = i / stemCount;
        const pt = curve.getPointAt(t);
        // Add minimal scatter for a slightly thicker organic stem
        const r1 = (Math.random() - 0.5) * 0.15;
        const r2 = (Math.random() - 0.5) * 0.15;
        const r3 = (Math.random() - 0.5) * 0.15;
        pt.add(new THREE.Vector3(r1, r2, r3));

        addPoint(pt, colorStem, t, 1.2 + Math.random() * 0.5);
      }

      // 2. Add Leaves and Flowers along the curve
      const nodeCount = 20; // How many "nodes" along the vine where something grows
      for (let i = 1; i < nodeCount; i++) {
        const t = i / nodeCount;
        const pt = curve.getPointAt(t);
        const tangent = curve.getTangentAt(t).normalize();

        // Find a normal vector pointing outward
        const up = new THREE.Vector3(0, 0, 1);
        let normal = new THREE.Vector3().crossVectors(tangent, up).normalize();
        if (normal.lengthSq() < 0.1) {
          normal = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(1, 0, 0)).normalize();
        }

        // Alternate sides for leaves/flowers
        const sideMultiplier = i % 2 === 0 ? 1 : -1;
        normal.multiplyScalar(sideMultiplier * (isLeft ? 1 : -1));

        // Every 3rd node is a flower, others are leaves
        if (i % 3 === 0) {
          // --- Flower ---
          const flowerDistance = 0.6; // Distance from stem
          const flowerCenter = pt.clone().add(normal.clone().multiplyScalar(flowerDistance));

          // Flower Center (dense cluster)
          for (let j = 0; j < 30; j++) {
            const cp = flowerCenter.clone().add(new THREE.Vector3(
              (Math.random() - 0.5) * 0.3,
              (Math.random() - 0.5) * 0.3,
              (Math.random() - 0.5) * 0.3
            ));
            addPoint(cp, colorFlowerCenter, t, 1.0 + Math.random());
          }

          // Flower Petals (5 petals around the center)
          const numPetals = 5;
          for (let p = 0; p < numPetals; p++) {
            const angle = (p / numPetals) * Math.PI * 2;
            const petalDir = normal.clone().applyAxisAngle(tangent, angle);

            for (let j = 0; j < 45; j++) {
              const r = Math.random() * 0.7; // Petal length
              // Spread makes the petal wider in the middle and pointy at the end
              const spread = (Math.random() - 0.5) * 0.5 * Math.sin(r * Math.PI / 0.7);

              const pp = flowerCenter.clone()
                .add(petalDir.clone().multiplyScalar(r))
                .add(tangent.clone().multiplyScalar(spread));

              addPoint(pp, colorFlowerPetal, t + r * 0.03, 1.2 + Math.random() * 0.8);
            }
          }
        } else {
          // --- Leaf ---
          const leafBase = pt.clone();
          // Angle the leaf slightly forward along the tangent
          const leafDir = normal.clone().add(tangent.clone().multiplyScalar(0.7)).normalize();

          for (let j = 0; j < 60; j++) {
            const r = Math.random() * 1.0; // Leaf length
            const spread = (Math.random() - 0.5) * 0.6 * Math.sin(r * Math.PI / 1.0);

            const lp = leafBase.clone()
              .add(leafDir.clone().multiplyScalar(r))
              .add(tangent.clone().multiplyScalar(spread));

            addPoint(lp, colorLeaf, t + r * 0.02, 1.0 + Math.random());
          }
        }
      }
    };

    generateVine('left');
    generateVine('right');

    return {
      pos: new Float32Array(points),
      col: new Float32Array(colors),
      dist: new Float32Array(distances),
      rnd: new Float32Array(randoms),
      sz: new Float32Array(sizes),
      count: points.length / 3
    };
  }, []);

  // Scale down for mobile so it fits the screen width nicely
  const isMobile = size.width < 768;
  const scale = isMobile ? Math.min(1.0, viewport.width / 12) : 1.0;

  // Base Y position so the vines grow from the bottom edge
  const groupY = isMobile ? -3.0 : -4.5;

  useFrame((state, delta) => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uTime.value += delta;
    materialRef.current.uniforms.uPixelRatio.value = state.viewport.dpr;

    const offset = scrollOffset.current || 0;

    // Growth timeline:
    // 0.0 ~ 0.4: Amelio -> Rain (in TextParticles)
    // 0.4 ~ 0.8: Vines grow nicely
    const progress = Math.max(0, Math.min(1, (offset - 0.4) / 0.4));

    // Add a slight ease-out to the progress for smoother ending
    const easeOut = 1 - Math.pow(1 - progress, 3);

    materialRef.current.uniforms.uProgress.value = easeOut;
  });

  return (
    <group position={[0, groupY, 0]}>
      <points scale={scale}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={attributes.count} array={attributes.pos} itemSize={3} args={[attributes.pos, 3]} />
          <bufferAttribute attach="attributes-aColor" count={attributes.count} array={attributes.col} itemSize={3} args={[attributes.col, 3]} />
          <bufferAttribute attach="attributes-aDistance" count={attributes.count} array={attributes.dist} itemSize={1} args={[attributes.dist, 1]} />
          <bufferAttribute attach="attributes-aRandom" count={attributes.count} array={attributes.rnd} itemSize={1} args={[attributes.rnd, 1]} />
          <bufferAttribute attach="attributes-aSize" count={attributes.count} array={attributes.sz} itemSize={1} args={[attributes.sz, 1]} />
        </bufferGeometry>
        <vineParticleMaterial
          ref={materialRef}
          transparent
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
    </group>
  );
}
