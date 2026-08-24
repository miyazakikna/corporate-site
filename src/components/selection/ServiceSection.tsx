'use client';

import { motion } from 'framer-motion';
import Section from '@/components/Section';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ServiceSection() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);

    // Update on resize
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate card offset based on screen width
  const getCardOffset = () => {
    if (windowWidth === 0) return 0; // SSR safe fallback
    if (windowWidth >= 1024) return 80;
    if (windowWidth >= 768) return 60;
    return 40;
  };

  const cardOffset = getCardOffset();

  return (
    <Section id="service" className="bg-secondary py-0! px-0!" contentClassName="!max-w-none">
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
          {/* ダークグラデーション背景 */}
          <div className="absolute inset-0 bg-secondary">
            {/* 装飾的なグラデーション球体 */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_70%)] rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(99,102,241,0.06)_0%,transparent_70%)] rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-10 lg:gap-16 h-full pt-20 sm:pt-24 lg:pt-0 pb-10 sm:pb-16 lg:pb-0">
            {/* 左側: テキスト情報 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="lg:flex-1 min-w-0 w-full lg:w-auto lg:pb-16"
            >
              <h3 className="text-xs font-bold text-primary-light tracking-[0.4em] mb-2 sm:mb-4 lg:mb-6 uppercase font-heading">01 / FIT KARTE</h3>
              {/* ロゴ + ブランドテキスト */}
              <div className="flex items-center gap-3 lg:gap-4 mb-2 sm:mb-4 lg:mb-6">
                <img src="/service/fk-brand-logo.png" alt="FIT KARTE Logo" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 object-contain" />
                <img src="/service/fk-brand-text-wh.png" alt="FIT KARTE" className="h-5 sm:h-6 lg:h-10 object-contain" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-2xl font-light mb-2 sm:mb-3 lg:mb-6 text-white/80 tracking-tight">フィットネスジム向け管理プラットフォーム</h3>
              <p className="text-white/50 mb-4 sm:mb-6 lg:mb-10 leading-relaxed text-xs sm:text-sm lg:text-lg font-light">
                会員管理・予約・決済はもちろん、<br />
                トレーニング記録や売上分析、目標管理まで。<br />
                フィットネスジム運営に必要な業務を、<br />
                これ１つで管理できます。
              </p>
              <Link href="https://fit-karte.com/" target="_blank" rel="noopener noreferrer" className="inline-block px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4 border border-white/20 text-white hover:bg-white hover:text-secondary transition-all duration-300 rounded-full font-bold tracking-widest text-[9px] sm:text-[10px] uppercase cursor-pointer">
                View Project
              </Link>
            </motion.div>

            {/* 右側: プロダクトスクリーンショット（立体的） */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative w-full max-w-[500px] lg:w-[550px] lg:shrink-0"
              style={{ perspective: '1200px' }}
            >
              {/* ダッシュボード画像 (タブレット) */}
              <div
                className="w-[85%] lg:w-[420px] mx-auto lg:mx-0 rounded-xl overflow-hidden shadow-2xl shadow-black/50"
                style={{ transform: 'rotateY(-20deg) rotateX(5deg)', transformStyle: 'preserve-3d' }}
              >
                <img
                  src="/service/fk-dashboard-md.png"
                  alt="FIT KARTE Dashboard"
                  className="w-full"
                />
              </div>
              {/* マイページ画像 (スマホ) */}
              <div
                className="absolute -bottom-4 right-4 lg:right-0 w-[30%] lg:w-[180px] rounded-xl overflow-hidden shadow-2xl shadow-black/50"
                style={{ transform: 'rotateY(-20deg) rotateX(5deg) translateZ(50px)', transformStyle: 'preserve-3d' }}
              >
                <img
                  src="/service/fk-mypage-sp.png"
                  alt="FIT KARTE MyPage"
                  className="w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* WITH TRAINER (Card 2) */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-20 shadow-[0_-50px_100px_rgba(1,22,39,0.8)]">
          {/* ダークグラデーション背景（FIT KARTEと同じ） */}
          <div className="absolute inset-0 bg-secondary">
            {/* 装飾的なグラデーション球体 */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_70%)] rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(99,102,241,0.06)_0%,transparent_70%)] rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 h-full pt-20 sm:pt-24 lg:pt-0 pb-10 sm:pb-16 lg:pb-0">
            {/* 左側: テキスト情報 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="lg:flex-1 min-w-0 w-full lg:w-auto lg:pb-16"
            >
              <h3 className="text-xs font-bold text-primary-light tracking-[0.4em] mb-2 sm:mb-4 lg:mb-6 uppercase font-heading">02 / WITH TRAINER</h3>
              {/* ロゴ + ブランドテキスト */}
              <div className="flex items-center gap-3 lg:gap-5 mb-2 sm:mb-4 lg:mb-8">
                <img src="/service/wt-brand-icon.png" alt="WITH TRAINER Logo" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 object-contain" />
                <img src="/service/wt-brand-text-wh.png" alt="WITH TRAINER" className="h-6 sm:h-8 lg:h-18 object-contain" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-2xl font-light mb-2 sm:mb-3 lg:mb-6 text-white/80 tracking-tight">トレーナー向けブランディング支援</h3>
              <p className="text-white/50 mb-4 sm:mb-6 lg:mb-10 leading-relaxed text-xs sm:text-sm lg:text-lg font-light">
                あなたに寄り添い、共に歩む「パーソナルトレーナー」<br />
                二人三脚で理想の身体づくりをサポートします。
              </p>
              <Link href="https://with-trainer.com/" target="_blank" rel="noopener noreferrer" className="inline-block px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4 border border-white/20 text-white hover:bg-white hover:text-secondary transition-all duration-300 rounded-full font-bold tracking-widest text-[9px] sm:text-[10px] uppercase cursor-pointer">
                View Project
              </Link>
            </motion.div>

            {/* 右側: トレーナー画像（手札風） */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative w-full max-w-[500px] lg:w-[550px] lg:shrink-0 flex justify-center group"
              style={{ perspective: '1200px', height: 'auto', minHeight: '300px' }}
            >
              {/* カード共通スタイル用のベース位置 - モバイル/タブレット/デスクトップでサイズを切り替え */}
              <div className="relative w-[130px] h-[180px] md:w-[180px] md:h-[250px] lg:w-[220px] lg:h-[320px]" style={{ transformStyle: 'preserve-3d' }}>

                {/* カード3（右に傾く） */}
                <motion.div
                  className="absolute inset-0 rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    transformOrigin: 'bottom center',
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                    zIndex: 30,
                  }}
                  animate={{
                    rotate: 15,
                    x: cardOffset,
                    y: 10
                  }}
                  whileHover={{
                    rotate: 20,
                    x: cardOffset + 20,
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <Link href="https://with-trainer.com/trainers/hiroki-ono" target="_blank" rel="noopener noreferrer">
                    <img src="/service/wt-trainer3.png" alt="トレーナー" className="w-full h-full object-cover" />
                  </Link>
                </motion.div>

                {/* カード2（左に傾く） */}
                <motion.div
                  className="absolute inset-0 rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    transformOrigin: 'bottom center',
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                    zIndex: 10,
                  }}
                  animate={{
                    rotate: -15,
                    x: -cardOffset,
                    y: 10
                  }}
                  whileHover={{
                    rotate: -20,
                    x: -(cardOffset + 20),
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <Link href="https://with-trainer.com/trainers/koki-ito" target="_blank" rel="noopener noreferrer">
                    <img src="/service/wt-trainer1.png" alt="トレーナー" className="w-full h-full object-cover" />
                  </Link>
                </motion.div>

                {/* カード1（正面・中央） */}
                <motion.div
                  className="absolute inset-0 rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    transformOrigin: 'bottom center',
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.7), 0 0 40px rgba(79,195,247,0.1), inset 0 1px 0 rgba(255,255,255,0.15)',
                    zIndex: 20,
                  }}
                  animate={{ rotate: 0, x: 0, y: 0 }}
                  whileHover={{
                    y: -20,
                    transition: { duration: 0.3 }
                  }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <img src="/service/wt-trainer2.png" alt="トレーナー" className="w-full h-full object-cover" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 業務支援 (Card 3) */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-30 shadow-[0_-50px_100px_rgba(1,22,39,0.8)]">
          {/* ダークグラデーション背景 */}
          <div className="absolute inset-0 bg-secondary">
            {/* 装飾的なグラデーション球体 */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_70%)] rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(99,102,241,0.06)_0%,transparent_70%)] rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-10 lg:gap-16 h-full pt-20 sm:pt-24 lg:pt-0 pb-10 sm:pb-16 lg:pb-0">
            {/* 左側: テキスト情報 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="lg:flex-1 min-w-0 w-full lg:w-auto lg:pb-16"
            >
              <h3 className="text-xs font-bold text-primary-light tracking-[0.4em] mb-2 sm:mb-4 lg:mb-6 uppercase font-heading">03 / IT PARTNER</h3>
              <div className="mb-2 sm:mb-4 lg:mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white leading-tight tracking-widest font-heading">
                  業務支援
                </h2>
              </div>
              <h3 className="text-base sm:text-lg lg:text-2xl font-light mb-2 sm:mb-3 lg:mb-6 text-white/80 tracking-tight">経営やITの困りごとをまるごと伴走</h3>
              <p className="text-white/50 mb-4 sm:mb-6 lg:mb-10 leading-relaxed text-xs sm:text-sm lg:text-lg font-light">
                本業に集中。裏方は、お任せください。<br />
                ホームページ制作、Web開発、AI導入、業務DXまで、<br />
                経営やITの困りごとを現場目線でまるごと支援します。
              </p>
              <Link
                href="/it-partner"
                className="inline-block px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4 border border-white/20 text-white hover:bg-white hover:text-secondary transition-all duration-300 rounded-full font-bold tracking-widest text-[9px] sm:text-[10px] uppercase cursor-pointer"
              >
                View Project
              </Link>
            </motion.div>

            {/* 右側: ビジュアル（amelio-miyazaki.jpg 立体カード） */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative w-full max-w-[500px] lg:w-[550px] lg:shrink-0 flex justify-center items-center"
              style={{ perspective: '1200px' }}
            >
              <div
                className="w-[88%] lg:w-[480px] mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/70 border border-white/15 bg-white/5 backdrop-blur-sm transition-transform duration-500 hover:scale-[1.02]"
                style={{ transform: 'rotateY(-15deg) rotateX(6deg)', transformStyle: 'preserve-3d' }}
              >
                <img
                  src="/it-partner/amelio-miyazaki.jpg"
                  alt="Amelio 業務支援 宮崎賢治"
                  className="w-full h-auto object-cover object-center"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
}
