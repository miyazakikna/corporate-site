'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './Company.module.scss';
import { fadeIn, slideUp } from '@/utils/animations';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb';

export const Company = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <div className={styles.company} ref={sectionRef}>
      <div className='container'>
        <motion.div
          className={styles.linkArea}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeIn}
          transition={{ delay: 0.8 }}
        >
          <Breadcrumb crumbs={[
            { label: 'TOP', href: '/' },
            { label: '会社概要' }
          ]} />
        </motion.div>

        <motion.h1
          className='section-title'
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={slideUp}
        >
          会社概要
        </motion.h1>

        <motion.div
          className={styles.companyCard}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          <table className={styles.companyTable}>
            <tbody>
              <tr>
                <th>会社名</th>
                <td>株式会社Amelio</td>
              </tr>
              <tr>
                <th>設立</th>
                <td>2023年10月2日</td>
              </tr>
              <tr>
                <th>所在地</th>
                <td>〒289-2317 千葉県香取郡多古町井戸山722-1</td>
              </tr>
              <tr>
                <th>資本金</th>
                <td>500万円</td>
              </tr>
              <tr>
                <th>代表取締役</th>
                <td>宮崎 賢治</td>
              </tr>
              <tr>
                <th>事業内容</th>
                <td>
                  <ul className={styles.serviceList}>
                    <li>ITコンサルティング</li>
                    <li>マーケティング支援</li>
                    <li>業務改善支援</li>
                    <li>システム開発</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th>主な取引先</th>
                <td>株式会社Shape Fit</td>
              </tr>
              <tr>
                <th>取引銀行</th>
                <td>GMOあおぞらネット銀行</td>
              </tr>
              <tr>
                <th>適格請求書番号</th>
                <td>T5040001130374</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};