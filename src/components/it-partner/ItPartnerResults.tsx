'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const editorialWorks = [
  {
    title: 'フィットネスジム LP制作',
    category: 'HP & Landing Page',
    image: '/it-partner/hp-lp.jpeg',
    span: 'lg:col-span-8 lg:row-span-2',
    height: 'lg:min-h-[520px]',
  },
  {
    title: '身体機能診断アプリ',
    category: 'Web System & App',
    image: '/it-partner/tennis-check.jpeg',
    span: 'lg:col-span-4',
    height: 'lg:min-h-[255px]',
  },
  {
    title: 'チケット販売・受付アプリ',
    category: 'Ticket DX',
    image: '/it/sff-app.png',
    span: 'lg:col-span-4',
    height: 'lg:min-h-[255px]',
  },
  {
    title: '電子カルテ・予約管理SaaS',
    category: 'SaaS Platform',
    image: '/it-partner/fit-karte-devices.png',
    span: 'lg:col-span-4',
    height: 'lg:min-h-[260px]',
  },
  {
    title: 'ジム会員管理・予約アプリ',
    category: 'Web System & App',
    image: '/it/sfg.png',
    span: 'lg:col-span-4',
    height: 'lg:min-h-[260px]',
  },
  {
    title: 'フィットネスジム HP制作',
    category: 'HP & Landing Page',
    image: '/it-partner/hp-lp2.jpeg',
    span: 'lg:col-span-4',
    height: 'lg:min-h-[260px]',
  },
];

// 上段と下段で完全に3つずつ分割（上下で重複なし）
const row1Works = editorialWorks.slice(0, 3); // 1〜3個目
const row2Works = editorialWorks.slice(3, 6); // 4〜6個目

// マーキーが途切れないように4回繰り返してループ（前半50%から後半50%へシームレス移動）
const row1Items = [...row1Works, ...row1Works, ...row1Works, ...row1Works];
const row2Items = [...row2Works, ...row2Works, ...row2Works, ...row2Works];

interface WorkCardProps {
  item: (typeof editorialWorks)[number];
}

function WorkCard({ item }: WorkCardProps) {
  return (
    <div className="group relative h-[160px] w-[260px] shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-100 shadow-sm transition-all duration-300 sm:h-[190px] sm:w-[320px]">
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 320px, 400px"
        className="object-cover object-center"
      />

      {/* スマホ・タブレット向けに常時視認できるグラデーション＋キャプション */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/35 to-transparent p-4 sm:p-5">
        <span className="text-[10px] font-black tracking-widest text-primary-light uppercase sm:text-xs">
          {item.category}
        </span>
        <h3 className="mt-0.5 text-xs font-black text-white sm:text-sm leading-snug">
          {item.title}
        </h3>
      </div>
    </div>
  );
}

export function ItPartnerResults({
  className = '',
  showCta = false,
}: {
  className?: string;
  showCta?: boolean;
}) {
  return (
    <section id="results" className={`scroll-mt-24 border-y border-slate-100 bg-white py-20 md:py-28 overflow-hidden ${className}`}>
      <div className="mx-auto max-w-6xl px-6 md:px-10 mb-8 md:mb-12">
        {/* セクション見出し */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-black tracking-[0.24em] text-primary uppercase">WORKS</p>
            <h2 className="text-3xl font-black tracking-tight text-secondary md:text-5xl">実績</h2>
          </div>
        </div>
      </div>

      {/* ========================================================
          スマホ・タブレット表示 (< lg): 2段逆方向マーキー（上下重複なし）
      ======================================================== */}
      <div className="relative w-full space-y-3 sm:space-y-4 lg:hidden">
        {/* 左右フェードマスク */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-r from-white via-white/80 to-transparent sm:w-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-l from-white via-white/80 to-transparent sm:w-20" />

        {/* 上段：右から左へ流れる (←) [LP制作・診断アプリ・チケットアプリ] */}
        <div className="flex w-max gap-3 sm:gap-4 animate-marquee-left">
          {row1Items.map((item, index) => (
            <WorkCard key={`row1-${index}`} item={item} />
          ))}
        </div>

        {/* 下段：左から右へ流れる (→) [電子カルテSaaS・ジム管理アプリ・ジムHP制作] */}
        <div className="flex w-max gap-3 sm:gap-4 animate-marquee-right">
          {row2Items.map((item, index) => (
            <WorkCard key={`row2-${index}`} item={item} />
          ))}
        </div>
      </div>

      {/* ========================================================
          PC表示 (>= lg): 従来通りのエディトリアルグリッド（ホバーでズーム＆表示）
      ======================================================== */}
      <div className="mx-auto hidden max-w-6xl px-6 md:px-10 lg:block">
        <div className="grid grid-cols-12 gap-2">
          {editorialWorks.map((item, index) => (
            <motion.div
              key={item.image + index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`group relative overflow-hidden bg-slate-100 ${item.span} ${item.height}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 1200px) 50vw, 800px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* ホバー時に写真上に浮かぶミニマルなキャプション */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-7 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-[11px] font-black tracking-widest text-primary-light uppercase">
                  {item.category}
                </span>
                <h3 className="mt-1 text-base md:text-lg font-black text-white">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTAボタン（showCta有効時のみ表示） */}
      {showCta && (
        <div className="mt-14 flex justify-center px-6 md:mt-20">
          <Link
            href="/contact?type=it-partner"
            className="group relative inline-flex items-center justify-center gap-3.5 rounded-full bg-gradient-to-r from-primary via-[#0055b3] to-primary bg-[length:200%_auto] px-9 py-4.5 text-base font-black text-white shadow-[0_16px_36px_rgba(0,102,204,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-right hover:shadow-[0_20px_44px_rgba(0,102,204,0.45)] sm:px-12 sm:py-5 sm:text-lg"
          >
            <span>まずは困りごとを相談</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5 sm:h-6 sm:w-6" />
          </Link>
        </div>
      )}

      <style>{`
        @keyframes marqueeLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marqueeRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-marquee-left {
          animation: marqueeLeft 28s linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight 28s linear infinite;
        }
      `}</style>
    </section>
  );
}
