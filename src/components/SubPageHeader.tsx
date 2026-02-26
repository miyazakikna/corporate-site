'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

type Crumb = {
  label: string;
  href?: string;
};

type SubPageHeaderProps = {
  title: string;
  titleEn: string;
  crumbs: Crumb[];
};

export default function SubPageHeader({ title, titleEn, crumbs }: SubPageHeaderProps) {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12 pt-16 pb-14 md:pt-24 md:pb-16">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          aria-label="パンくずリスト"
          className="mb-8 md:mb-12"
        >
          <ol className="flex flex-wrap m-0 p-0 list-none text-xs md:text-sm">
            {crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1;
              return (
                <li
                  key={index}
                  className="flex items-center text-slate-400 after:content-['/'] after:mx-2 after:text-slate-200 last:after:content-['']"
                >
                  {crumb.href && !isLast ? (
                    <Link
                      href={crumb.href}
                      className="text-slate-500 no-underline hover:text-primary transition-colors duration-300"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-secondary font-medium">{crumb.label}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </motion.nav>

        {/* Title */}
        <div className="space-y-2 md:space-y-3">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[10px] md:text-xs tracking-[0.3em] text-primary/80 uppercase font-heading font-bold"
          >
            {titleEn}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl md:text-4xl font-bold text-secondary tracking-wider font-heading"
          >
            {title}
          </motion.h1>
        </div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-0 left-6 right-6 h-px bg-slate-100 origin-left"
        />
      </div>
    </div>
  );
}
