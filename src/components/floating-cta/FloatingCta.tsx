'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import styles from './FloatingCta.module.scss';

export const FloatingCta = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const footerObserverRef = useRef<IntersectionObserver | null>(null);

  // スクロール位置による表示制御
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // ヒーローセクションを過ぎたら表示
      if (scrollY > viewportHeight * 0.7) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // 初期表示のチェック
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // フッター表示による非表示制御
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    footerObserverRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        rootMargin: '0px 0px 100px 0px',
        threshold: 0.1,
      }
    );

    footerObserverRef.current.observe(footer);

    return () => {
      if (footerObserverRef.current) {
        footerObserverRef.current.disconnect();
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {(isVisible && !isFooterVisible) && (
        <motion.div
          className={styles.floatingCta}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div className={styles.ctaContent}>
            <div className={styles.ctaText}>
              <span className={styles.ctaHighlight}>今すぐ無料相談！</span>
              <span className={styles.ctaSubtext}>ビジネスの成長をサポートします</span>
            </div>
            <Link href='#contact' className={`btn btn-primary ${styles.ctaButton}`}>
              相談する
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};