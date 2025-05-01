'use client';

import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/about/About';
// import { Services } from '@/components/Services/Services';
// import { Portfolio } from '@/components/Portfolio/Portfolio';
// import { Contact } from '@/components/Contact/Contact';
import { useEffect } from 'react';

export default function Home() {
  // フレーマーモーションのアニメーションを滑らかにするためのSSRフィックス
  useEffect(() => {
    const body = document.querySelector('body');
    body?.classList.add('loaded');
  }, []);

  return (
    <>
      <Hero />
      <About />
      {/* <Hero />

      <Services />
      <Portfolio />
      <Contact /> */}
    </>
  );
}