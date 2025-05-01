'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import styles from './FloatingCta.module.scss';

export const FloatingCta = () => {
  const [isVisible, setIsVisible] = useState(false);

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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
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