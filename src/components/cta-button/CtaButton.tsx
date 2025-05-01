'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './CtaButton.module.scss';
import { buttonHover } from '@/utils/animations';

interface CtaButtonProps {
  text: string;
  href: string;
  isPrimary?: boolean;
  className?: string;
}

export const CtaButton = ({
  text,
  href,
  isPrimary = true,
  className = ''
}: CtaButtonProps) => {
  return (
    <motion.div className={styles.container} whileHover='hover' variants={buttonHover}>
      <Link
        href={href}
        className={`${isPrimary ? 'btn btn-primary' : 'btn btn-secondary'} ${styles.ctaButton} ${className}`}
      >
        {text}
        <span className={styles.arrow}>→</span>
        <span className={styles.ripple}></span>
      </Link>
    </motion.div>
  );
};