'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import SubPageHeader from '@/components/SubPageHeader';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, CreditCard, HelpCircle, RefreshCw, Users } from 'lucide-react';

// ---- 課題（ターゲット共感）----
const pains = [
  {
    title: '何から始めるべきかわからない',
    text: 'IT化したい気持ちはあるが、どこから手をつけるべきか整理できていない。',
    icon: HelpCircle
  },
  {
    title: 'ITに時間をかけられない',
    text: '本業が忙しく、システムやサイト改善まで手が回らない。やり取りや管理も含めて任せたい。',
    icon: RefreshCw
  },
  {
    title: 'ITコストが高すぎる',
    text: '中間マージンや不要な工程で費用が膨らんでいる。本当に必要な部分だけ頼みたい。',
    icon: CreditCard
  },
];

// ---- 提供サービス ----
const services = [
  {
    number: '01',
    title: 'Web制作・リニューアル',
    description:
      'コーポレートサイト・LP・採用サイトなど。設計〜デザイン〜制作〜公開後の改善まで一貫対応。成果につながるWeb基盤を構築します。',
    tags: ['コーポレートサイト', 'LP制作', 'CMS構築', 'SEO設計'],
    price: {
      market: '10万円〜',
      amelio: '3万円〜',
      note: '※ページ数・内容により個別お見積り'
    }
  },
  {
    number: '02',
    title: 'システム・業務ツール開発',
    description:
      '既製ツールでは解決できない業務課題に、オーダーメイドで設計・開発。予約・顧客・在庫・決済などの業務を一元化し効率化します。',
    tags: ['業務システム', 'Webアプリ', 'API連携', 'クラウド構築'],
    price: {
      market: '50万円〜',
      amelio: '25万円〜',
      note: '※機能・スコープにより変動'
    }
  },
  {
    number: '03',
    title: 'IT戦略・ツール整理',
    description:
      '現状を整理し、IT投資の優先順位を定めます。既存ツールも含めて最適な構成を設計し、過剰投資を防ぎます。',
    tags: ['IT戦略', 'ツール選定', 'DX支援'],
    price: {
      market: '50万円〜',
      amelio: '10万円〜',
      note: '※支援内容により変動'
    }
  },
  {
    number: '04',
    title: '保守・継続改善',
    description:
      'サイト・システムを長期的に価値向上させるため、保守・改善を継続的に支援します。',
    tags: ['保守運用', 'パフォーマンス改善'],
    price: {
      market: '3万円〜',
      amelio: '1万円〜',
      note: '※対応範囲により変動'
    }
  },
];

// ---- 実績 ----
const results = [
  {
    id: 'shape-fit-gym-system',
    label: 'フィットネスジム管理システム',
    category: 'システム開発・運用',
    image: '/it/sfg.png',
    summary:
      '会員管理・予約・決済・売上レポートを統合した業務システムをスクラッチ開発。スタッフの手作業を大幅に削減し、FC展開体制を構築しました。',
    metrics: [
      { label: '管理工数削減', value: '約90％削減' },
      { label: '売上', value: '16.2%UP' },
    ],
  },
  {
    id: 'shape-fit-festival-system',
    label: 'チケット販売システム',
    category: 'システム開発',
    image: '/it/sff.png',
    summary:
      'イベントのチケット販売・選手エントリー・当日受付管理を一元化したシステムを開発。紙ベースの運営から完全デジタル化を実現しました。',
    metrics: [
      { label: '手数料大幅削減', value: '約300万円削減' },
      { label: '当日受付時間', value: '約3.3倍短縮' },
    ],
  },
  {
    id: 'fit-karte-saas',
    label: 'フィットネス向けSaaS「FIT KARTE」',
    client: '自社プロダクト',
    category: 'プロダクト開発・運用',
    image: '/it/fit-karte.png',
    summary:
      'フィットネスジム向けの会員管理・予約・決済・トレーニング記録を統合したSaaSを自社で企画・開発・運用。複数ジムへの導入実績があり、現在も継続的な機能拡張を進めています。',
    metrics: [
      { label: '開発・運用体制', value: '自社完結体制' },
      { label: '継続運用', value: '継続的に機能追加中' },
    ],
  },
];

// ---- 支援フロー ----
const flowSteps = [
  {
    step: '01',
    title: 'ヒアリング（無料）',
    description:
      '現状の課題・やりたいこと・体制・予算感をざっくばらんに伺います。資料や仕様書がなくても問題ありません。まず話せる状態から始めます。',
  },
  {
    step: '02',
    title: '課題整理・提案',
    description:
      '何が問題で、どう解決すべきかを言語化します。複数の選択肢とそのメリット・リスクを整理した提案書を作成します。',
  },
  {
    step: '03',
    title: '設計・見積もり',
    description:
      '合意した方針をもとに、要件定義・設計・工数見積もりを行います。スコープを明確にし、ブレのないプロジェクト計画を立てます。',
  },
  {
    step: '04',
    title: '開発・実装',
    description:
      '定期的に進捗を共有しながら、スプリント単位で開発を進めます。途中の仕様変更にも柔軟に対応し、手戻りを最小化します。',
  },
  {
    step: '05',
    title: '継続改善・運用サポート',
    description:
      'リリース後も月次で数値と課題を共有し、改善を続けます。「作ったら終わり」ではなく、成果が出るまで伴走します。',
  },
];

// ---- 他社との違い ----
const differentiators = [
  {
    ours: '戦略から実装まで一気通貫',
    theirs: '制作だけ・開発だけ・相談だけ',
  },
  {
    ours: '自社SaaSを持つ実装力',
    theirs: '下請け・転受注がメイン',
  },
  {
    ours: '継続改善を前提とした契約設計',
    theirs: '納品後はサポート別料金',
  },
  {
    ours: '経営目線での課題整理から着手',
    theirs: '言われたものをそのまま作る',
  },
];

export const ItConsulting = () => {
  const painsRef = useRef(null);
  const featuresRef = useRef(null);
  const servicesRef = useRef(null);
  const resultsRef = useRef(null);
  const flowRef = useRef(null);
  const diffRef = useRef(null);
  const ctaRef = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % results.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 2000); // 2秒ごとにスライド
    return () => clearInterval(interval);
  }, [isAutoPlaying, activeIndex]);

  useEffect(() => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const isMobile = window.innerWidth < 768;
      const cardWidth = isMobile ? 280 : 400;
      const gap = isMobile ? 16 : 24; // gap-4 is 16px, gap-6 is 24px
      const itemTotalWidth = cardWidth + gap;

      const targetScrollLeft = (activeIndex * itemTotalWidth);

      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

  const isPainsInView = useInView(painsRef, { once: true, amount: 0.1 });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.1 });
  const isServicesInView = useInView(servicesRef, { once: true, amount: 0.1 });
  const isResultsInView = useInView(resultsRef, { once: true, amount: 0.05 });
  const isFlowInView = useInView(flowRef, { once: true, amount: 0.1 });
  const isDiffInView = useInView(diffRef, { once: true, amount: 0.1 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.2 });

  return (
    <div className="min-h-screen bg-white">
      {/* ---- SubPageHeader ---- */}
      <SubPageHeader
        title="WEB・システム支援"
        titleEn="WEB・SYSTEM SUPPORT"
        crumbs={[
          { label: 'TOP', href: '/' },
          { label: 'WEB・システム支援' },
        ]}
      />

      <section className="w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full h-[20vh] md:h-[40vh] relative"
        >
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
            alt="IT Consulting and System Support"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-secondary/20 mix-blend-multiply" />
        </motion.div>
      </section>


      {/* ======================================
          課題提示: こんなお悩み、ありませんか？
      ====================================== */}
      <section className="py-20 md:py-28 bg-slate-50" ref={painsRef}>
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isPainsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-xl md:text-3xl font-bold text-secondary font-heading">
              こんなお悩み、ありませんか？
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {pains.map((pain, index) => {
              const Icon = pain.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isPainsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col text-center hover:shadow-md hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary border border-slate-100">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-4 text-secondary font-heading">{pain.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1">
                    {pain.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="w-full bg-secondary relative h-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-40 border-l-transparent border-r-40 border-r-transparent border-t-40 border-t-slate-50 z-10" />
      </div>

      <section className="pb-20 md:pb-28 bg-secondary" ref={featuresRef}>
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 md:mb-32 pt-8"
          >
            <h2 className="text-xl md:text-4xl font-bold text-white font-heading tracking-tight leading-tight flex flex-col items-center">
              <span>そのお悩み、</span>
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-4 md:mt-6">
                <div className="flex items-center gap-x-2 md:gap-x-3">
                  <img
                    src="/brand-logo.png"
                    alt="Amelio Logo"
                    className="h-8 md:h-12 w-auto"
                  />
                  <img
                    src="/brand-text.png"
                    alt="Amelio"
                    className="h-8 md:h-12 w-auto"
                  />
                </div>
                <span className="text-primary-light whitespace-nowrap">にお任せください</span>
              </div>
            </h2>
          </motion.div>

          <div className="space-y-24 md:space-y-32">
            {/* Feature 01 */}
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isFeaturesInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-1 order-2 md:order-1"
              >
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-5xl md:text-6xl font-black text-white/10 font-heading tracking-tighter">01</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white font-heading leading-tight">
                    的確に提案
                  </h3>
                </div>
                <p className="text-white/60 leading-relaxed text-sm md:text-base">
                  現状を整理し、優先順位を明確にします。「何をやるか」から伴走します。
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isFeaturesInView ? { opacity: 1, x: 0 } : {}}
                className="flex-1 order-1 md:order-2 w-full"
              >
                <div className="aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 shadow-lg shadow-slate-200/50">
                  <img src="/it/feature1.png" alt="一貫対応" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </motion.div>
            </div>

            {/* Feature 02 */}
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isFeaturesInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex-1 order-1 md:order-1 w-full"
              >
                <div className="aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 shadow-lg shadow-slate-200/50">
                  <img src="/it/feature2.png" alt="自社SaaSのノウハウ" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isFeaturesInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex-1 order-2 md:order-2"
              >
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-5xl md:text-6xl font-black text-white/10 font-heading tracking-tighter">02</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white font-heading leading-tight">
                    丸ごとお任せ
                  </h3>
                </div>
                <p className="text-white/60 leading-relaxed text-sm md:text-base">
                  課題整理から実装、改善まで責任を持って進めます。経営者がITに時間を取られない体制を構築します。
                </p>
              </motion.div>
            </div>

            {/* Feature 03 */}
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isFeaturesInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex-1 order-2 md:order-1"
              >
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-5xl md:text-6xl font-black text-white/10 font-heading tracking-tighter">03</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white font-heading leading-tight">
                    無駄なコストなし
                  </h3>
                </div>
                <p className="text-white/60 leading-relaxed text-sm md:text-base">
                  営業・ディレクター・エンジニアを分けない体制。中間マージンや不要な工程を省き、必要な部分だけにコストをかけます。
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isFeaturesInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex-1 order-1 md:order-2 w-full"
              >
                <div className="aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 shadow-lg shadow-slate-200/50">
                  <img src="/it/feature3.png" alt="IT投資最適化" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================
          提供サービス
      ====================================== */}
      <section className="py-20 md:py-28 bg-slate-50" ref={servicesRef}>
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >
            <p className="text-[10px] md:text-xs tracking-[0.3em] text-primary/80 uppercase font-heading font-bold mb-3">
              SERVICES
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-secondary font-heading">
              提供サービス
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col"
              >
                {/* ヘッダー情報 (Number, Title) */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-sm font-bold text-primary tracking-[0.2em] font-heading">
                    {service.number}
                  </span>
                  <h3 className="text-xl font-bold text-secondary font-heading">
                    {service.title}
                  </h3>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-600 text-[10px] md:text-xs rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 説明 */}
                <p className="text-sm text-slate-600 leading-relaxed mb-8 grow">
                  {service.description}
                </p>

                {/* Pricing Block (Vertical Stack) */}
                <div className="bg-slate-50 rounded-2xl p-6 md:p-8 flex flex-col gap-5">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold tracking-wider mb-1.5 uppercase">一般的な相場</p>
                    <p className="text-sm text-slate-400 line-through decoration-slate-300">
                      {service.price.market}
                    </p>
                  </div>

                  <div className="w-full h-px bg-slate-200"></div>

                  <div>
                    <p className="text-[10px] text-primary font-bold tracking-wider mb-1.5 uppercase">Amelioの費用感</p>
                    <div className="flex flex-col gap-1">
                      <p className="text-xl font-bold text-secondary font-heading">
                        {service.price.amelio}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {service.price.note}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================
          実績
      ====================================== */}
      <section
        className="py-20 md:py-28 bg-white overflow-hidden"
        ref={resultsRef}
      >
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-[10px] md:text-xs tracking-[0.3em] text-primary/80 uppercase font-heading font-bold mb-3">
              RESULTS
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-secondary font-heading">
              実績
            </h2>
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full">
          {/* Main Card Slider Window */}
          <div className="w-full overflow-hidden">
            <div
              ref={carouselRef}
              className="flex overflow-x-hidden gap-4 md:gap-6 px-[calc(50%-140px)] md:px-[calc(50%-200px)] py-8"
              style={{ scrollBehavior: 'smooth' }}
            >
              {results.map((result, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={result.id}
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                    className={`w-[280px] md:w-[400px] shrink-0 rounded-2xl border border-slate-100 overflow-hidden bg-white shadow-lg transition-all duration-500 flex flex-col ${isActive ? 'scale-100 opacity-100 z-10' : 'scale-95 opacity-50 blur-[1px] hover:opacity-80'}`}
                  >
                    {/* 画像 */}
                    <div className="w-full h-[180px] md:h-[220px] bg-slate-100 overflow-hidden relative shrink-0">
                      <img
                        src={result.image}
                        alt={result.label}
                        className="w-full h-full object-cover transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {result.client && (
                          <span className="text-[10px] text-slate-600 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full font-medium">
                            {result.client}
                          </span>
                        )}
                        <span className="text-[10px] text-primary bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full font-medium">
                          {result.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-secondary font-heading leading-tight mb-4">
                        {result.label}
                      </h3>

                      {/* 概要 */}
                      <p className="text-[13px] text-slate-500 leading-relaxed mb-6 flex-1">
                        {result.summary}
                      </p>

                      {/* 数値 */}
                      <div className="mt-auto pt-5 border-t border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-3">
                          RESULT
                        </p>
                        <ul className="space-y-2.5">
                          {result.metrics.map((m) => (
                            <li key={m.label} className="flex items-center justify-between gap-4">
                              <span className="text-[11px] text-slate-500">{m.label}</span>
                              <span className="text-sm font-bold text-primary text-right">
                                {m.value}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Area: [Prev] [Thumbnails] [Next] */}
          <div className="mx-auto max-w-5xl px-6 flex justify-center items-center gap-4 md:gap-8">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-300 text-slate-400 hover:text-white hover:bg-slate-900 hover:border-slate-900 flex items-center justify-center transition-all duration-300 shrink-0 bg-white shadow-sm z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-300 text-slate-400 hover:text-white hover:bg-slate-900 hover:border-slate-900 flex items-center justify-center transition-all duration-300 shrink-0 bg-white shadow-sm z-10"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ======================================
          支援フロー
      ====================================== */}
      <section className="py-20 md:py-28 bg-secondary overflow-hidden relative" ref={flowRef}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isFlowInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-[10px] md:text-xs tracking-[0.3em] text-primary-light uppercase font-heading font-bold mb-3">
              FLOW
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-white font-heading">
              支援の進め方
            </h2>
          </motion.div>

          <div className="flex flex-col gap-0">
            {flowSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                animate={isFlowInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="flex gap-5 md:gap-8"
              >
                {/* ステップ番号＆ライン */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-light/10 border border-primary-light/30 flex items-center justify-center shrink-0">
                    <span className="text-[11px] font-bold text-primary-light font-heading">
                      {step.step}
                    </span>
                  </div>
                  {index < flowSteps.length - 1 && (
                    <div className="w-px flex-1 bg-white/10 my-2" />
                  )}
                </div>

                {/* 内容 */}
                <div className={`pb-${index < flowSteps.length - 1 ? '8' : '0'} pt-1.5`}>
                  <h3 className="text-base md:text-lg font-bold text-white mb-2 font-heading">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================
          CTA
      ====================================== */}
      <section
        id="contact-cta"
        className="py-20 md:py-28 bg-white relative overflow-hidden"
        ref={ctaRef}
      >
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <div className="bg-linear-to-br from-slate-50 to-sky-50/50 rounded-[2.5rem] px-8 py-16 md:px-16 md:py-24 relative overflow-hidden shadow-xl shadow-sky-900/5 border border-sky-100/50">
            {/* 装飾 */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(2,132,199,0.05)_0%,transparent_70%)] rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(2,132,199,0.03)_0%,transparent_70%)] rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="text-[10px] md:text-xs tracking-[0.4em] text-primary uppercase font-heading font-bold mb-6"
              >
                CONTACT
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-2xl md:text-4xl font-bold text-secondary mb-6 tracking-tight font-heading leading-tight"
              >
                ITのご相談
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-slate-600 text-sm md:text-base leading-relaxed mb-10 font-medium"
              >
                現状の課題整理から実装まで、貴社に最適なプランをご提案します。<br className="hidden md:block" />まずはお気軽にお問い合わせください。
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 px-12 py-5 bg-primary text-white font-bold tracking-widest text-sm rounded-full hover:bg-secondary transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-secondary/30 hover:-translate-y-1"
                >
                  無料相談はこちら
                  <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
