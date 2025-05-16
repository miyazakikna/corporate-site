'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';
import { slideDown } from '@/utils/animations';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // スクロールしたらヘッダーのスタイルを変更する
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      initial='hidden'
      animate='visible'
      variants={slideDown}
    >
      <div className={styles.container}>
        <Link href='/' className={styles.logo}>
          <Image
            src='/logo.svg'
            alt='株式会社Amelio'
            width={150}
            height={40}
            priority
          />
        </Link>

        <nav className={styles.desktopNav}>
          <ul>
            <li>
              <Link href='/#about'>会社紹介</Link>
            </li>
            <li>
              <Link href='/#services'>サービス</Link>
            </li>
            <li>
              <Link href='/#contact' className={styles.contactBtn}>お問い合わせ</Link>
            </li>
          </ul>
        </nav>

        <button
          className={`${styles.mobileMenuBtn} ${isMobileMenuOpen ? styles.open : ''}`}
          onClick={toggleMobileMenu}
          aria-label='メニュー'
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            className={styles.mobileNav}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ul>
              <li>
                <Link href='#about' onClick={() => setIsMobileMenuOpen(false)}>
                  会社紹介
                </Link>
              </li>
              <li>
                <Link href='#services' onClick={() => setIsMobileMenuOpen(false)}>
                  サービス
                </Link>
              </li>
              <li>
                <Link
                  href='#contact'
                  className={styles.contactBtn}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};