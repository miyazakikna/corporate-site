'use client';

import styles from './Home.module.scss';
import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/about/About';
import { Service } from '@/components/service/Service';
import { Work } from '@/components/work/Work';
import { useEffect, useState } from 'react';
// import { Contact } from '@/components/Contact/Contact';

export const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Service />
      {/* <Work /> */}
      {/* <Contact /> */}
    </>
  );
}