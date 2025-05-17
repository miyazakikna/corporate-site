'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.scss';
import { fadeIn } from '@/utils/animations';

export const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.3 });

  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className={styles.footer}
      ref={footerRef}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeIn}
    >
      <div className='container'>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <Link href='/' className={styles.footerLogo}>
              <Image
                src='/logo.png'
                alt='株式会社Amelio'
                width={150}
                height={40}
                priority
              />
            </Link>
            {/* <p className={styles.tagline}>
              <span className='amelio-highlight'>改善・向上</span>を軸に、ビジネスに必要な要素をワンストップで支援します
            </p> */}
          </div>

          <div className={styles.footerNav}>
            <div className={styles.navColumn}>
              <ul className={styles.navList}>
                <li><Link href='/#about'>会社紹介</Link></li>
                <li><Link href='/#services'>サービス</Link></li>
                <li><Link href='/#contact'>お問い合わせ</Link></li>
              </ul>
            </div>

            {/* <div className={styles.navColumn}>
              <h3 className={styles.navTitle}>サービス</h3>
              <ul className={styles.navList}>
                <li><Link href='#services'>デジタルマーケティング</Link></li>
                <li><Link href='#services'>システム開発</Link></li>
                <li><Link href='#services'>コンテンツ制作</Link></li>
                <li><Link href='#services'>ブランディング支援</Link></li>
              </ul>
            </div> */}

            {/* <div className={styles.navColumn}>
              <h3 className={styles.navTitle}>お問い合わせ</h3>
              <address className={styles.contactInfo}>
                <p><strong>住所:</strong> 〒123-4567<br />東京都渋谷区〇〇〇 1-2-3</p>
                <p><strong>TEL:</strong> 03-1234-5678</p>
                <p><strong>E-mail:</strong> info@amelio.co.jp</p>
              </address>
              <div className={styles.socialLinks}>
                <a href='https://twitter.com/amelio' target='_blank' rel='noopener noreferrer' aria-label='Twitter'>
                  <svg className={styles.socialIcon} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M23 3.01s-2.018 1.192-3.14 1.53a4.48 4.48 0 00-7.86 3v1a10.66 10.66 0 01-9-4.53s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83C21.94 5.674 23 3.01 23 3.01z' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                  </svg>
                </a>
                <a href='https://www.facebook.com/amelio' target='_blank' rel='noopener noreferrer' aria-label='Facebook'>
                  <svg className={styles.socialIcon} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                  </svg>
                </a>
                <a href='https://www.instagram.com/amelio' target='_blank' rel='noopener noreferrer' aria-label='Instagram'>
                  <svg className={styles.socialIcon} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M17 2H7a5 5 0 00-5 5v10a5 5 0 005 5h10a5 5 0 005-5V7a5 5 0 00-5-5z' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                    <path d='M16 11.37a4 4 0 11-7.914 1.173A4 4 0 0116 11.37zM17.5 6.5h.01' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                  </svg>
                </a>
              </div>
            </div> */}
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} 株式会社Amelio All Rights Reserved.
          </p>
          <div className={styles.footerLinks}>
            <Link href='/company'>会社概要</Link>
            <Link href='/privacy-policy'>プライバシーポリシー</Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};