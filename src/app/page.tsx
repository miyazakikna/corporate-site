'use client';

import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/about/About';
import { Service } from '@/components/service/Service';
import { Work } from '@/components/work/Work';
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
      <Service />
      <Work />
      {/* <Contact /> */}
    </>
  );
}