'use client';

import { Home } from '@/components/home/Home';
import { useEffect } from 'react';

export default function Top() {
  // フレーマーモーションのアニメーションを滑らかにするためのSSRフィックス
  useEffect(() => {
    const body = document.querySelector('body');
    body?.classList.add('loaded');
  }, []);

  return (
    <Home />
  );
}