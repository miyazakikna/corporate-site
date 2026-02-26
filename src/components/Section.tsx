import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  style?: React.CSSProperties;
  id?: string;
}

export default function Section({ children, className = '', contentClassName = '', style, id }: SectionProps) {
  return (
    <section
      id={id}
      className={`w-screen flex flex-col justify-center items-center py-32 px-10 relative ${className}`}
      style={style}
    >
      <div className={`max-w-7xl w-full mx-auto flex flex-col justify-center items-center ${contentClassName}`}>
        {children}
      </div>
    </section>
  );
}
