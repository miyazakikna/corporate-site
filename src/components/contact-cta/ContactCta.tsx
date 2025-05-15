'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './ContactCta.module.scss';
import { slideUp, serviceCardContainer } from '@/utils/animations';

export const ContactCta = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id='contact-cta' className={`section ${styles.contactCta}`} ref={sectionRef}>
      <div className='container'>
        <motion.h2
          className='section-title'
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={slideUp}
        >
          お問い合わせ
        </motion.h2>
      </div>
    </section>
  );
};