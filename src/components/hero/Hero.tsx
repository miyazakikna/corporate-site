'use client';

import { motion } from 'framer-motion';
import styles from './Hero.module.scss';
import { fadeIn, slideUp } from '@/utils/animations';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export const Hero = () => {

  const [isVideoView, setVideoView] = useState(true)
  const [isVideoError, setVideoError] = useState(false)
  const handleVideoError = () => {
    setVideoError(true)
  }

  useEffect(() => {
    const firstview = document.getElementById('firstview') as HTMLVideoElement
    if (firstview) {
      firstview.play().then(() => {
        setVideoError(false)
      }).catch((error) => {
        setVideoError(true)
      })
    }
  }, [])
  return (
    <section className={styles.hero}>
      <Image
        src='/main/hero.png'
        alt='株式会社Amelio'
        width={150}
        height={40}
        priority
      />
      {/* <div className={styles.overlay}></div> */}
      {/* {
        isVideoView ? (
          !isVideoError ? (
            <div className={styles.mainVideoWrap}>
              <video id='firstview' src='/main/main_firstview_background.mp4#t=1' autoPlay loop muted playsInline onError={handleVideoError} />
            </div>
          ) : (
            <div className={styles.mainVideoWrap}>
              <div className={styles.firstViewImage} />
              <img src='/main/main_firstview_background.png' alt='メイン画像' className={styles.firstViewImage} />
            </div>
          )) : (
          <div className={styles.mainVideoWrap}>
            <div className={styles.firstViewBackground} />
          </div>
        )
      } */}
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
            あなたの<span className='amelio-highlight'>'挑戦'</span>を、
            <br />
            確かな<span className='amelio-highlight'>'形'</span>へ。
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
            {/* <motion.div whileHover='hover' variants={buttonHover}>
              <Link href='#contact' className={`btn btn-primary ${styles.ctaButton}`}>
                無料相談する
              </Link>
            </motion.div> */}
          </motion.div>
        </motion.div>

        {/* <motion.div
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
        </motion.div> */}
      </div>

      <motion.div
        className={styles.scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span>SCROLL</span>
        <div className={styles.scrollArrow}></div>
      </motion.div>
    </section>
  );
};