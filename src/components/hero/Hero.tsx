'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './Hero.module.scss';
import { fadeIn, slideUp, buttonHover } from '@/utils/animations';
import { CtaButton } from '@/components/cta-button/CtaButton';

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial='hidden'
          animate='visible'
          variants={fadeIn}
        >
          <motion.h1
            className={styles.title}
            variants={slideUp}
            transition={{ delay: 0.2 }}
          >
            あなたの<span className='amelio-highlight'>"挑戦"</span>を、
            <br />
            確かな<span className='amelio-highlight'>"形"</span>へ。
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            variants={slideUp}
            transition={{ delay: 0.4 }}
          >
            〜 株式会社Amelioは、事業の未来を共に創ります 〜
          </motion.p>

          <motion.div
            className={styles.ctaButtons}
            variants={slideUp}
            transition={{ delay: 0.8 }}
          >
            <motion.div whileHover='hover' variants={buttonHover}>
              <CtaButton
                text="無料相談する"
                href="#contact"
                isPrimary={true}
                className={styles.ctaButton}
              />
              {/* <Link href='#contact' className={`btn btn-primary ${styles.ctaButton}`}>
                無料相談する
              </Link> */}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.heroGraphic}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 1,
            type: 'spring',
            stiffness: 100,
            damping: 15
          }}
        >
          <div className={styles.dropShape}>
            <div className={styles.arrow}></div>
            <div className={styles.chart}></div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span>スクロールして詳しく見る</span>
        <div className={styles.scrollArrow}></div>
      </motion.div>
    </section>
  );
};