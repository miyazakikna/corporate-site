'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './About.module.scss';
import { fadeIn, slideUp, slideInLeft, slideInRight } from '@/utils/animations';

export const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section id='about' className={`section ${styles.about}`} ref={sectionRef}>
      <div className='container'>
        <motion.h2
          className='section-title'
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={slideUp}
        >
          Ameliorate Your Business
        </motion.h2>

        <div className={styles.content}>
          <motion.div
            className={styles.imageWrapper}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            variants={slideInLeft}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.graphicContainer}>
              <div className={styles.dropGraphic}>
                <div className={styles.waterDrop}></div>
                <div className={styles.waterRipple}></div>
                <div className={styles.growthArrow}></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.textContent}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            variants={slideInRight}
            transition={{ delay: 0.4 }}
          >
            <p className={styles.emphasis}>
              <span className='amelio-drop-icon'>A</span>melioは「改善・向上」を意味します
            </p>

            <p>
              株式会社Amelioは<span className='amelio-highlight'>「改善・向上」</span>を軸に、ビジネスに必要な要素をワンストップで支援します。
            </p>

            <p>
              スピーディかつ丁寧に、あなたのアイディアを成果へとつなげます。デジタルマーケティングからシステム開発、コンテンツ制作まで、事業成長に必要なあらゆる分野をカバーし、価値ある結果を生み出します。
            </p>

            <ul className={styles.valueList}>
              <li>
                <span className={styles.valueIcon}>✓</span>
                <span className={styles.valueText}>確かな専門知識と経験</span>
              </li>
              <li>
                <span className={styles.valueIcon}>✓</span>
                <span className={styles.valueText}>迅速なレスポンスとサポート</span>
              </li>
              <li>
                <span className={styles.valueIcon}>✓</span>
                <span className={styles.valueText}>お客様の目標に合わせたカスタムソリューション</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};