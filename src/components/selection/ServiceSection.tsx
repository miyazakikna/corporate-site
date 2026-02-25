'use client';

import { motion } from 'framer-motion';
import Section from '@/components/Section';

export default function ServiceSection() {
  return (
    <Section id="service" className="bg-secondary !py-0 !px-0" contentClassName="!max-w-none">
      <div className="w-full pt-32 pb-16 px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-3xl md:text-5xl font-black mb-16 text-center tracking-widest"
        >
          SERVICE
        </motion.h2>
      </div>

      <div className="relative w-full">
        {/* FIT KARTE (Card 1) */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />
          </div>

          <div className="relative z-10 w-full max-w-7xl px-8 flex items-center pb-30 h-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="max-w-2xl"
            >
              <h3 className="text-xs font-bold text-[#4FC3F7] tracking-[0.4em] mb-4 uppercase font-heading">01 / PLATFORM</h3>
              <h2 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter !text-white font-heading">FIT KARTE</h2>
              <h3 className="text-xl md:text-2xl font-light mb-8 text-white/80 tracking-tight">フィットネスジム運営プラットフォーム</h3>
              <p className="text-white/50 mb-10 leading-relaxed text-lg font-light">
                Gym Management, Reimagined.<br />
                会員管理から予約、決済まで、シームレスな体験を提供します。
              </p>
              <button className="px-10 py-4 border border-white/20 text-white hover:bg-white hover:text-secondary transition-all duration-300 rounded-full font-bold tracking-widest text-[10px] uppercase cursor-pointer">
                View Project
              </button>
            </motion.div>
          </div>
        </div>

        {/* WITH TRAINER (Card 2) */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-20 shadow-[0_-50px_100px_rgba(1,22,39,0.8)]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1920&auto=format&fit=crop)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />
          </div>

          <div className="relative z-10 w-full max-w-7xl px-8 flex items-center pb-30 h-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="max-w-2xl"
            >
              <h3 className="text-xs font-bold text-[#4FC3F7] tracking-[0.4em] mb-4 uppercase font-heading">02 / BRANDING</h3>
              <h2 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter !text-white font-heading leading-none">WITH<br />TRAINER</h2>
              <h3 className="text-xl md:text-2xl font-light mb-8 text-white/80 tracking-tight">トレーナー向けブランディング支援</h3>
              <p className="text-white/50 mb-10 leading-relaxed text-lg font-light">
                Your Brand, Your Way.<br />
                あなたの価値を最大化し、クライアントとの絆を深めます。
              </p>
              <button className="px-10 py-4 border border-white/20 text-white hover:bg-white hover:text-secondary transition-all duration-300 rounded-full font-bold tracking-widest text-[10px] uppercase cursor-pointer">
                View Project
              </button>
            </motion.div>
          </div>
        </div>

        {/* IT CONSULTING (Card 3) */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-30 shadow-[0_-50px_100px_rgba(1,22,39,0.8)]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1920&auto=format&fit=crop)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />
          </div>

          <div className="relative z-10 w-full max-w-7xl px-8 flex items-center pb-30 h-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="max-w-2xl"
            >
              <h3 className="text-xs font-bold text-[#4FC3F7] tracking-[0.4em] mb-4 uppercase font-heading">03 / DEVELOPMENT</h3>
              <h2 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter !text-white font-heading uppercase">SOLUTION</h2>
              <h3 className="text-xl md:text-2xl font-light mb-8 text-white/80 tracking-tight">ITコンサルティング / システム開発</h3>
              <p className="text-white/50 mb-10 leading-relaxed text-lg font-light">
                Beyond Technology, For Your Success.<br />
                課題解決から実装まで。ITの力でビジネスの変革に伴走します。
              </p>
              <button className="px-10 py-4 border border-white/20 text-white hover:bg-white hover:text-secondary transition-all duration-300 rounded-full font-bold tracking-widest text-[10px] uppercase cursor-pointer">
                View Project
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
}
