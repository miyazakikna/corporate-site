'use client';

import { motion } from 'framer-motion';
import Section from '@/components/Section';
import Link from 'next/link';

export default function NewsSection() {

  const newsItems: {
    date: string;
    category: string;
    title: string;
    href?: string;
  }[] = [
      {
        date: '2026.03.01',
        category: 'お知らせ',
        title: 'コーポレートサイトをリニューアルしました。',
      }, {
        date: '2026.02.12',
        category: 'リリース',
        title: 'WITH TRAINERの提供を開始しました。',
        href: 'https://with-trainer.com',
      }, {
        date: '2025.10.01',
        category: 'リリース',
        title: 'Fit Karte β版をリリースしました。',
        href: 'https://fit-karte.com',
      },
      {
        date: '2023.10.02',
        category: 'お知らせ',
        title: '株式会社Amelioを設立しました。',
      },
    ];

  return (
    <Section id="news" className="items-center justify-center bg-secondary pointer-events-auto" contentClassName="w-full">
      <div className="max-w-4xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-3xl md:text-5xl font-black mb-16 text-center tracking-widest"
        >
          NEWS
        </motion.h2>
        <div className="space-y-0">
          {newsItems.map((item, i) => {
            const isLink = !!item.href && item.href !== '#';
            const Content = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className={`flex flex-col md:flex-row gap-6 border-b border-white/10 py-10 px-0 group ${isLink ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="text-white/40 text-sm font-light tracking-widest w-32 font-heading">{item.date}</div>
                <div className="flex-1 pr-12 relative">
                  <div className="inline-block px-3 py-1 bg-[#4FC3F7]/10 text-[#4FC3F7] text-[9px] font-bold tracking-[0.2em] rounded-full mb-3 uppercase font-heading">
                    {item.category}
                  </div>
                  <h3 className={`text-lg md:text-xl font-medium !text-white leading-snug transition-colors ${isLink ? 'group-hover:text-[#4FC3F7]' : ''}`}>
                    {item.title}
                  </h3>

                  {isLink && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-[#4FC3F7] transition-colors">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                  )}
                </div>
              </motion.div>
            );

            return isLink ? (
              <Link key={i} href={item.href!} target="_blank" rel="noopener noreferrer" className="block">
                {Content}
              </Link>
            ) : (
              <div key={i}>{Content}</div>
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          {/* <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 1)', color: '#000000' }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 border border-white/20 text-white text-xs font-bold tracking-widest transition-all rounded-full uppercase cursor-pointer"
          >
            View All
          </motion.button> */}
        </motion.div>
      </div>
    </Section>
  );
}
