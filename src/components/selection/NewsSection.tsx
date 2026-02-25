'use client';

import { motion } from 'framer-motion';
import Section from '@/components/Section';

export default function NewsSection() {

  const newsItems: {
    date: string;
    category: string;
    title: string;
  }[] = [{
    date: '2026.03.01',
    category: 'お知らせ',
    title: 'サイトをリニューアルしました。',
  }];

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
        <div className="space-y-10">
          {newsItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col md:flex-row gap-6 border-b border-white/10 pb-10 group"
            >
              <div className="text-white/40 text-sm font-light tracking-widest w-32 font-heading">{item.date}</div>
              <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-[#4FC3F7]/10 text-[#4FC3F7] text-[9px] font-bold tracking-[0.2em] rounded-full mb-3 uppercase font-heading">
                  {item.category}
                </div>
                <h3 className="text-lg md:text-xl font-medium !text-white group-hover:text-[#4FC3F7] transition-colors cursor-pointer leading-snug">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 1)', color: '#000000' }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 border border-white/20 text-white text-xs font-bold tracking-widest transition-all rounded-full uppercase cursor-pointer"
          >
            View All
          </motion.button>
        </motion.div>
      </div>
    </Section>
  );
}
