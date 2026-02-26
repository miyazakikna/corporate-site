'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useLoader, extend, ThreeElement, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';
import { shaderMaterial } from '@react-three/drei';

const TextParticleMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color('#fff'),
    uProgress: 0,   // Amelio -> Rain
    uProgress3: 0,  // Rain -> Flower
    uIntro: 0,
    uPixelRatio: 1,
    uMobile: 0,
    uFlowerY: -2.5,    // 花のY中心（動的に変化）
    uTextY: 0.0,       // Amelioテキストのオフセット
    uFlowerScale: 1.0, // 花のサイズ（スマホ時に縮小）
  },

  // Vertex Shader
  `
    uniform float uTime;
    uniform float uProgress;
    uniform float uProgress3;
    uniform float uIntro;
    uniform float uPixelRatio;
    uniform float uMobile;
    uniform float uFlowerY;
    uniform float uTextY;
    uniform float uFlowerScale;

    attribute vec3 aTarget1;  // Rain (random)
    attribute vec3 aTarget3;  // Flower
    attribute float aRandom;

    varying float vAlpha;
    varying vec3 vColor;

    void main() {
      vec3 pos = position;
      vec3 rainPos = aTarget1;
      vec3 flowerPos = aTarget3;

      // --- Intro animation ---
      float introP = smoothstep(0.0, 1.0, clamp((uIntro - aRandom * 0.5) * 2.0, 0.0, 1.0));
      vec3 introPos = rainPos * 2.5;
      pos = mix(introPos, pos, introP);

      // --- Floating motion (Amelio) ---
      pos.y += sin(uTime * 2.0 + aRandom * 10.0) * 0.05;
      pos.x += cos(uTime * 1.5 + aRandom * 10.0) * 0.05;
      pos.z += sin(uTime * 1.0 + aRandom * 5.0) * 0.05;

      // --- Transition 1: Amelio -> Rain ---
      float p = smoothstep(0.0, 1.0, (uProgress - aRandom * 0.4) * 2.5);
      p = clamp(p, 0.0, 1.0);

      float speedMult = mix(3.0, 10.0, uMobile);
      float fallSpeed = (1.0 + aRandom * 2.0) * speedMult;
      float fallDist = uTime * fallSpeed;
      rainPos.y = mod(rainPos.y - fallDist + 15.0, 30.0) - 15.0;

      vec3 currentPos = mix(pos, rainPos, p);

      // --- Transition 2: Rain -> Flower ---
      float p3 = smoothstep(0.0, 1.0, (uProgress3 - aRandom * 0.4) * 2.0);
      p3 = clamp(p3, 0.0, 1.0);

      // Flower bloom: rotate, tilt, scale up from center bottom
      vec3 flowerCenter = vec3(0.0, uFlowerY, 0.0);
      vec3 localFlowerPos = flowerPos - flowerCenter;

      float rotAngle = p3 * 3.14159 + (uTime * 0.15);
      float rs = sin(rotAngle);
      float rc = cos(rotAngle);
      mat2 rotY = mat2(rc, -rs, rs, rc);
      localFlowerPos.xz = rotY * localFlowerPos.xz;

      float tiltAngle = 0.5;
      float ts = sin(tiltAngle);
      float tc = cos(tiltAngle);
      mat2 rotX = mat2(tc, -ts, ts, tc);
      localFlowerPos.yz = rotX * localFlowerPos.yz;

      // uFlowerScale: スマホ時は花全体を縮小して画面下部に収める
      localFlowerPos *= uFlowerScale;
      localFlowerPos *= p3;
      localFlowerPos.y += (1.0 - p3) * -2.0;

      vec3 animatedFlowerPos = localFlowerPos + flowerCenter;

      currentPos = mix(currentPos, animatedFlowerPos, p3);

      vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      // Particle size: grow slightly for flower
      float pSize = mix(16.0, 22.0, p3);
      gl_PointSize = pSize * uPixelRatio * (1.0 / -mvPosition.z);

      float alphaBase = mix(1.0, 0.85, uMobile);
      vAlpha = alphaBase * introP * (1.0 - p * 0.3 + p3 * 0.3);

      // Color: white -> warm gold/rose for flower
      vec3 baseColor = vec3(1.0, 1.0, 1.0);
      // flowerPos は aTarget3 (uniform で渡せないため attribute ベース)
      // uFlowerY を使って flower から中心への距離を計算
      vec3 centeredFlower = flowerPos - flowerCenter;
      float distFromCenter = length(centeredFlower.xz);
      vec3 centerColor = vec3(1.0, 0.85, 0.4);   // Gold
      vec3 petalColor  = vec3(1.0, 0.96, 0.98);  // White-rose
      vec3 flowerColor = mix(centerColor, petalColor, smoothstep(0.0, 2.5, distFromCenter));
      flowerColor += vec3(0.1) * sin(uTime * 2.0 + aRandom * 10.0) * p3;

      vColor = mix(baseColor, flowerColor, p3);
    }
  `,

  // Fragment Shader
  `
    uniform vec3 uColor;
    varying float vAlpha;
    varying vec3 vColor;

    void main() {
      vec2 coord = gl_PointCoord - vec2(0.5);
      float r = length(coord);
      if (r > 0.5) discard;

      float glow = 1.0 - (r * 2.0);
      glow = pow(glow, 1.5);

      gl_FragColor = vec4(vColor * uColor, vAlpha * glow);
    }
  `
);

extend({ TextParticleMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    textParticleMaterial: ThreeElement<typeof THREE.ShaderMaterial>;
  }
}

export default function TextParticles({ scrollOffset }: { scrollOffset: React.RefObject<number> }) {
  const font = useLoader(
    FontLoader,
    'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json'
  );
  return <TextParticlesImpl font={font} scrollOffset={scrollOffset} />;
}

function TextParticlesImpl({
  font,
  scrollOffset,
}: {
  font: any;
  scrollOffset: React.RefObject<number>;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();

  const count = useMemo(() => {
    if (size.width < 480) return 1500;
    if (size.width < 768) return 3000;
    if (size.width < 1024) return 6000;
    return 8000;
  }, [size.width]);

  const attributes = useMemo(() => {
    // --- Amelio geometry (position) ---
    // size: スマホでもはみ出さないよう1.4に縮小
    const geom = new TextGeometry('Amelio', {
      font,
      size: 1.4,
      depth: 0.1,
      curveSegments: 12,
      bevelEnabled: false,
    });
    geom.center();
    geom.translate(0, 0.8, 0);

    const mesh = new THREE.Mesh(geom);
    const sampler = new MeshSurfaceSampler(mesh).build();
    const pos1 = new Float32Array(count * 3);
    const temp = new THREE.Vector3();
    for (let i = 0; i < count; i++) {
      sampler.sample(temp);
      pos1[i * 3] = temp.x;
      pos1[i * 3 + 1] = temp.y;
      pos1[i * 3 + 2] = temp.z;
    }

    // --- Rain positions ---
    const posRain = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      posRain[i * 3] = (Math.random() - 0.5) * 40;
      posRain[i * 3 + 1] = (Math.random() - 0.5) * 40;
      posRain[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    // --- Flower geometry (mathematically generated) ---
    const pos3 = new Float32Array(count * 3);
    let pIndex = 0;

    const addPoint = (x: number, y: number, z: number) => {
      if (pIndex < count) {
        pos3[pIndex * 3] = x;
        pos3[pIndex * 3 + 1] = y;
        pos3[pIndex * 3 + 2] = z;
        pIndex++;
      }
    };

    const createLotusPetal = (
      cx: number, cy: number, cz: number,
      scale: number, angleY: number, bendAngle: number, numParticles: number
    ) => {
      for (let i = 0; i < numParticles; i++) {
        const u = Math.random();
        const v = Math.random() * 2 - 1;
        const length = 2.5 * scale;
        const width = 1.0 * scale * Math.sin(u * Math.PI) * (1.0 - 0.3 * u);

        let px = v * width;
        let py = u * length;
        let pz = (1.0 - v * v) * 0.4 * scale * Math.sin(u * Math.PI);

        const currentBend = u * bendAngle;
        const bentY = py * Math.cos(currentBend) - pz * Math.sin(currentBend);
        const bentZ = py * Math.sin(currentBend) + pz * Math.cos(currentBend);

        const finalX = px * Math.cos(angleY) - bentZ * Math.sin(angleY);
        const finalZ = px * Math.sin(angleY) + bentZ * Math.cos(angleY);
        const finalY = bentY;

        addPoint(cx + finalX, cy + finalY, cz + finalZ);
      }
    };

    const createElegantFlower = (cx: number, cy: number, cz: number, scale: number) => {
      // Stamen (dense center core)
      const stamenCount = Math.floor(count * 0.06);
      for (let i = 0; i < stamenCount; i++) {
        const u = Math.random();
        const theta = Math.random() * Math.PI * 2;
        const r = Math.random() * 0.3 * scale;
        const h = u * 0.8 * scale;
        const sr = r + Math.pow(u, 2.0) * 0.4 * scale;
        addPoint(cx + sr * Math.cos(theta), cy + h, cz + sr * Math.sin(theta));
      }

      const layers = [
        { num: 5, bend: 0.5, scale: 0.7 },
        { num: 7, bend: 0.9, scale: 1.0 },
        { num: 9, bend: 1.4, scale: 1.2 },
      ];

      const remainingParticles = count - pIndex;
      const totalPetals = layers.reduce((sum, l) => sum + l.num, 0);
      const pPerPetal = Math.floor(remainingParticles / totalPetals);

      layers.forEach((layer, layerIdx) => {
        for (let p = 0; p < layer.num; p++) {
          const angle = (p / layer.num) * Math.PI * 2 + layerIdx * 0.5;
          createLotusPetal(cx, cy, cz, layer.scale * scale, angle, layer.bend, pPerPetal);
        }
      });
    };

    createElegantFlower(0, -2.5, 0, 1.0);

    // Fill remaining slots
    while (pIndex < count) {
      addPoint(0, -2.5, 0);
    }

    // --- Randoms ---
    const randoms = new Float32Array(count);
    for (let i = 0; i < count; i++) randoms[i] = Math.random();

    return { pos1, posRain, pos3, randoms };
  }, [font, count]);

  // スマホ縦画面でも十分なスケールになるよう、heightとwidthの両方を考慮
  // テキスト幅 ≈ 5.0（size:1.4のHelvetica「Amelio」）
  // viewport.width 内に確実に収めるため viewport.width / 5.0 を上限とする
  const isMobile = size.width < 768;
  const scale = isMobile
    ? Math.min(viewport.width / 5.0, viewport.height / 14)
    : Math.min(1, viewport.width / 12);

  // 花のY中心座標：画面最下部
  // points 子空間での画面下端 = viewport.height / (2 * scale)
  const halfH = viewport.height / (2 * scale);
  // スマホ時は花を flowerScale=0.75倍に縮小 → 花の実効半径 ≈ 2.5*0.75 = 1.875
  // 画面下端から 2.0 上に中心を置くと上端が画面内に収まる
  const flowerScale = 1.5;
  const flowerY = isMobile ? -1.0 : -2.5;

  useFrame((state, delta) => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uTime.value += delta;
    materialRef.current.uniforms.uPixelRatio.value = state.viewport.dpr;
    materialRef.current.uniforms.uMobile.value = state.size.width < 768 ? 1.0 : 0.0;
    materialRef.current.uniforms.uFlowerY.value = flowerY;
    materialRef.current.uniforms.uFlowerScale.value = flowerScale;
    materialRef.current.uniforms.uTextY.value = 0.0;

    if (materialRef.current.uniforms.uIntro.value < 1.0) {
      materialRef.current.uniforms.uIntro.value += delta * 0.4;
    }

    const offset = scrollOffset.current || 0;

    // Amelio -> Rain: scroll 0 ~ 0.4
    const progress = Math.max(0, Math.min(1, offset / 0.4));
    materialRef.current.uniforms.uProgress.value = progress;

    // Rain -> Flower: scroll 0.4 ~ 0.7
    const progress3 = Math.max(0, Math.min(1, (offset - 0.4) / 0.3));
    materialRef.current.uniforms.uProgress3.value = progress3;

    // Fade out: scroll 0.7 ~ 0.9
    const fadeOut = 1.0 - Math.max(0, Math.min(1, (offset - 0.7) / 0.2));
    materialRef.current.uniforms.uColor.value.set('#fff').multiplyScalar(fadeOut);
  });

  return (
    <points scale={scale}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={attributes.pos1} itemSize={3} args={[attributes.pos1, 3]} />
        <bufferAttribute attach="attributes-aTarget1" count={count} array={attributes.posRain} itemSize={3} args={[attributes.posRain, 3]} />
        <bufferAttribute attach="attributes-aTarget3" count={count} array={attributes.pos3} itemSize={3} args={[attributes.pos3, 3]} />
        <bufferAttribute attach="attributes-aRandom" count={count} array={attributes.randoms} itemSize={1} args={[attributes.randoms, 1]} />
      </bufferGeometry>
      <textParticleMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}