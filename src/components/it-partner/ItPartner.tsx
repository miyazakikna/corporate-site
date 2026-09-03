'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  FolderKanban,
  Instagram,
  LayoutTemplate,
  PanelsTopLeft,
  Workflow,
} from 'lucide-react';
import { ItPartnerResults } from './ItPartnerResults';

const services = [
  {
    title: 'HP・LP制作',
    price: '0円〜',
    description:
      '伝えたいことを整理し、あなたらしさが伝わるページをつくります。',
    detail: '構成・デザイン・制作・公開後の改善まで、一貫して対応します。',
    icon: LayoutTemplate,
    visual: 'website',
  },
  {
    title: 'Webアプリケーション',
    price: '3万円〜',
    description:
      '活動に合った、使いやすいWebサービスを設計・開発します。',
    detail: '既製サービスで解決できない部分を、必要な範囲から形にします。',
    icon: PanelsTopLeft,
    visual: 'application',
  },
  {
    title: '事業推進・PM',
    price: '10万円〜',
    description:
      '経営者の右腕として、プロジェクト全体をディレクションし、事業を成功に導きます。',
    detail: '施策ごとに別々の会社へ依頼する手間をなくし、企画から開発・集客施策の実行まで一貫して推進します。',
    icon: FolderKanban,
    visual: 'management',
  },
] as const;

const faqs = [
  {
    question: 'まだ依頼内容が決まっていなくても相談できますか？',
    answer:
      'はい。現在困っていることや、これからやりたいことを伺い、必要なものを一緒に整理します。資料や仕様書がなくても問題ありません。',
  },
  {
    question: 'ITに詳しくなくても大丈夫ですか？',
    answer:
      'もちろんです。専門用語をできるだけ使わず、選択肢とそれぞれの違いを分かりやすくご説明します。',
  },
  {
    question: '料金はいくらからですか？',
    answer:
      '内容や規模により異なります。ご予算に合わせて、優先度の高い部分から小さく始める方法もご提案します。',
  },
  {
    question: 'ホームページだけでも依頼できますか？',
    answer:
      'はい。1ページのLPから複数ページのホームページまで、必要な規模に合わせて対応します。',
  },
  {
    question: '制作後の修正や運用も依頼できますか？',
    answer:
      'はい。公開後の修正、改善、保守まで継続して対応できます。必要な期間と範囲をご相談ください。',
  },
] as const;

function ServiceVisual({ type }: { type: (typeof services)[number]['visual'] }) {
  if (type === 'website') {
    return (
      <div className="relative h-full min-h-72 w-full md:min-h-full">
        <Image
          src="/it-partner/hp-lp.jpeg"
          alt="制作したパーソナルジムのホームページと料金ページを端末に表示した制作実績"
          fill
          sizes="(max-width: 768px) 100vw, 560px"
          className="object-cover object-center"
        />
      </div>
    );
  }

  if (type === 'application') {
    return (
      <div className="relative h-full min-h-72 w-full md:min-h-full">
        <Image
          src="/it-partner/fit-karte-devices.png"
          alt="パソコンにお客様カルテ画面、スマートフォンに予約画面を表示したFIT KARTEの画面イメージ"
          fill
          sizes="(max-width: 768px) 100vw, 560px"
          className="object-cover object-center"
        />
      </div>
    );
  }

  if (type === 'management') {
    return (
      <div className="relative h-full min-h-72 w-full md:min-h-full">
        <Image
          src="/it-partner/sff.jpg"
          alt="事業推進の実績"
          fill
          sizes="(max-width: 768px) 100vw, 560px"
          className="object-cover object-center"
        />
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-72 w-full md:min-h-full">
      <Image
        src="/service/fk-dashboard-md.png"
        alt="業務を一元化した管理画面のイメージ"
        fill
        sizes="(max-width: 768px) 100vw, 560px"
        className="object-cover object-center"
      />
    </div>
  );
}

const flowSteps = [
  {
    step: '01',
    title: 'ヒアリング',
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
    title: 'お見積もり',
    description:
      '合意した方針をもとに、お見積もりを行います。スコープを明確にし、他社よりも低価格でお受けします。',
  },
  {
    step: '04',
    title: '実務・伴走支援の開始',
    description:
      'チャットや定期ミーティングで密に連携しながら、実務や業務改善をスピーディーに進めます。状況の変化や追加のご要望にも柔軟に対応します。',
  },
  {
    step: '05',
    title: '継続改善・運用サポート',
    description:
      '支援開始後も定期的に状況を共有し、業務の効率化や運用の安定化を伴走サポートします。',
  },
];

export function ItPartner() {
  return (
    <div className="min-h-screen bg-[#fbfdff] text-secondary">
      <div>
        <section className="relative isolate overflow-hidden bg-[#eef5fa] text-secondary">
          {/* 背景画像 */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <Image
              src="/it-partner/hero-background.jpeg"
              alt=""
              fill
              priority
              className="object-cover object-center"
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-12 sm:px-8 sm:pt-14 sm:pb-16 lg:px-12 lg:py-12">
            {/* === スマホ・タブレット表示 (< 1024px) === */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center lg:hidden"
            >
              {/* 上部バッジ */}
              <div className="inline-flex items-center rounded-full border border-blue-200/90 bg-white/90 px-4 py-1.5 text-xs font-bold tracking-wide text-primary shadow-[0_4px_14px_rgba(0,102,204,0.12)] backdrop-blur-sm sm:text-sm">
                経営者にとって、一番「都合の良い」人材
              </div>

              {/* メインキャッチコピー */}
              <h1 className="mt-4 text-2xl font-black leading-[1.3] tracking-tight text-secondary sm:text-3xl">
                <span className="block">本業に集中。</span>
                <span className="mt-1 block text-primary">
                  裏方は、お任せください。
                </span>
              </h1>

              {/* 人物写真（宮崎氏） */}
              <div className="relative mt-3 h-[350px] w-full max-w-[360px] sm:h-[420px] sm:max-w-[420px]">
                <Image
                  src="/it-partner/miyazaki-hero.png"
                  alt="代表 宮崎賢治"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-contain object-top drop-shadow-[0_12px_24px_rgba(1,22,39,0.12)]"
                />
              </div>

              {/* 3つの円形バッジ（人物写真の胸元にオーバーレイ） */}
              <div className="relative -mt-20 z-20 flex w-full justify-center items-center gap-2 sm:-mt-24 sm:gap-3.5">
                {[
                  { lead: '伝わるページを', value: 'HP・LP制作' },
                  { lead: '必要な仕組みを', value: 'Webアプリ開発' },
                  { lead: '経営の右腕', value: '事業推進・PM' },
                ].map((item) => (
                  <div
                    key={item.value}
                    className="flex h-[106px] w-[106px] min-[390px]:h-[114px] min-[390px]:w-[114px] shrink-0 flex-col items-center justify-center rounded-full border-2 border-white/80 bg-gradient-to-br from-primary via-[#005bb8] to-primary-dark p-1.5 text-center shadow-[0_10px_24px_rgba(0,102,204,0.32)] sm:h-32 sm:w-32 sm:p-2.5"
                  >
                    <p className="text-[10px] min-[390px]:text-[10.5px] font-bold leading-tight text-blue-100 sm:text-xs">
                      {item.lead}
                    </p>
                    <p className="mt-0.5 text-xs min-[390px]:text-[13px] font-black leading-tight text-white sm:text-sm">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* 注記 */}
              <p className="mt-4 text-[11px] font-medium text-slate-500 sm:text-xs">
                ※個人事業主・法人問わず、柔軟にご相談いただけます。
              </p>

              {/* CTAボタン */}
              <div className="mt-5 w-full max-w-[340px] sm:max-w-[380px]">
                <Link
                  href="/contact?type=it-partner"
                  className="group flex w-full items-center justify-between rounded-full bg-gradient-to-r from-[#ff9a28] to-[#ff8510] py-3.5 pl-6 pr-2.5 text-base font-black text-white shadow-[0_12px_26px_rgba(255,133,16,0.35)] transition-all duration-300 hover:shadow-[0_16px_32px_rgba(255,133,16,0.45)] sm:pl-8 sm:text-lg"
                >
                  <span>まずは困りごとを相談</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#ff8510] shadow-sm transition-transform duration-300 group-hover:translate-x-1 sm:h-10 sm:w-10">
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                </Link>
              </div>
            </motion.div>

            {/* === PC表示 (>= 1024px) === */}
            <div className="hidden lg:grid lg:grid-cols-12 lg:items-center lg:gap-8 lg:min-h-[580px] xl:min-h-[640px]">
              {/* 左側コンテンツ（7カラム） */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-20 space-y-5 lg:col-span-7 xl:col-span-7"
              >
                {/* 上部バッジ */}
                <div className="inline-flex items-center rounded-full border border-blue-200/90 bg-white/90 px-4 py-1.5 text-xs font-bold tracking-wide text-primary shadow-[0_4px_14px_rgba(0,102,204,0.12)] backdrop-blur-sm sm:text-sm">
                  経営者にとって、一番「都合の良い」人材
                </div>

                {/* メインキャッチコピー */}
                <h1 className="text-3xl font-black leading-[1.28] tracking-tight text-secondary lg:text-[2.5rem] xl:text-[2.9rem]">
                  <span className="block">本業に集中。</span>
                  <span className="mt-1 block text-primary">
                    裏方は、お任せください。
                  </span>
                </h1>

                {/* 3つの円形バッジ */}
                <div className="flex items-center gap-3.5 pt-1 sm:gap-4 md:gap-5">
                  {[
                    { lead: '伝わるページを', value: 'HP・LP制作' },
                    { lead: '必要な仕組みを', value: 'Webアプリ開発' },
                    { lead: '経営の右腕', value: '事業推進・PM' },
                  ].map((item) => (
                    <div
                      key={item.value}
                      className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-white/80 bg-gradient-to-br from-primary via-[#005bb8] to-primary-dark p-2 text-center shadow-[0_10px_24px_rgba(0,102,204,0.28)] transition-transform duration-300 sm:h-28 sm:w-28 md:h-32 md:w-32 md:p-3"
                    >
                      <p className="text-[9px] font-bold leading-tight text-blue-100 sm:text-[11px] md:text-xs">
                        {item.lead}
                      </p>
                      <p className="mt-1 text-[10px] font-black leading-tight text-white sm:text-sm">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* 注記 */}
                <p className="text-xs font-medium text-slate-500 sm:text-sm">
                  ※個人事業主・法人問わず、ご予算や課題に合わせて柔軟にご相談いただけます。
                </p>

                {/* CTAボタン */}
                <div className="pt-2">
                  <Link
                    href="/contact?type=it-partner"
                    className="group inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-[#ff9a28] to-[#ff8510] py-3.5 pl-7 pr-3 text-base font-black text-white shadow-[0_12px_28px_rgba(255,133,16,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(255,133,16,0.45)] sm:pl-9 sm:text-lg"
                  >
                    <span>まずは困りごとを相談</span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#ff8510] shadow-sm transition-transform duration-300 group-hover:translate-x-1 sm:h-11 sm:w-11">
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </Link>
                </div>
              </motion.div>

              {/* 右側：人物写真（セクション下端まで完全に伸ばす） */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="pointer-events-none lg:absolute lg:right-2 lg:bottom-0 lg:h-full lg:w-[47%] xl:right-8 xl:w-[45%]"
              >
                <div className="relative h-full w-full">
                  <Image
                    src="/it-partner/miyazaki-hero.png"
                    alt="代表 宮崎賢治"
                    fill
                    priority
                    sizes="45vw"
                    className="object-contain object-bottom drop-shadow-[0_16px_28px_rgba(1,22,39,0.12)]"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="support" className="relative -mt-6 z-10 scroll-mt-24 rounded-t-[36px] bg-white pt-16 pb-24 shadow-[0_-12px_40px_rgba(1,22,39,0.03)] sm:-mt-8 sm:rounded-t-[48px] md:-mt-10 md:rounded-t-[64px] md:pt-24 md:pb-32 lg:-mt-12 lg:rounded-t-[80px]">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.5 }}
              className="mb-14 md:mb-20"
            >
              <p className="mb-3 text-xs font-black tracking-[0.24em] text-primary">SUPPORT</p>
              <h2 className="text-3xl font-black tracking-tight md:text-5xl">ご支援内容</h2>
            </motion.div>

            <div className="space-y-6 md:space-y-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                const reverse = index % 2 === 1;
                return (
                  <motion.article
                    key={service.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{ duration: 0.5 }}
                    className="grid overflow-hidden rounded-[30px] border border-slate-100 bg-white shadow-[0_24px_70px_rgba(1,22,39,0.07)] md:min-h-[340px] md:grid-cols-2"
                  >
                    <div className={`order-2 flex items-center p-7 md:p-10 lg:p-14 ${reverse ? 'md:order-2' : 'md:order-1'}`}>
                      <div>
                        <div className="mb-7 flex items-center justify-between gap-4">
                          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/8 text-primary">
                            <Icon className="h-6 w-6" />
                          </span>
                          <span className="rounded-full bg-blue-50 border border-primary/20 px-3.5 py-1 text-xs font-black tracking-wider text-primary shadow-sm sm:text-sm">
                            {service.price}
                          </span>
                        </div>
                        <h3 className="text-2xl font-black tracking-tight md:text-3xl">{service.title}</h3>
                        <p className="mt-5 text-base font-medium leading-8 text-slate-600">{service.description}</p>
                        <p className="mt-3 text-sm leading-7 text-slate-400">{service.detail}</p>
                      </div>
                    </div>
                    <div className={`order-1 relative min-h-72 w-full overflow-hidden bg-gradient-to-br from-[#f8fbff] to-[#edf6ff] md:min-h-full ${reverse ? 'md:order-1' : 'md:order-2'}`}>
                      <ServiceVisual type={service.visual} />
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 自社プロダクト紹介バナー（FIT KARTE） */}
        <section className="bg-white py-6 md:py-10">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-secondary via-[#072f57] to-primary p-6 text-white shadow-[0_16px_40px_rgba(1,22,39,0.12)] md:rounded-3xl md:p-8"
            >
              {/* 装飾の背景サークル */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-white/5 blur-xl" />
              <div className="pointer-events-none absolute -bottom-10 right-1/3 h-40 w-40 rounded-full bg-blue-400/10 blur-xl" />

              <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                {/* 左側：ロゴ・テキスト情報 */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 p-2.5 backdrop-blur-sm border border-white/20 shadow-inner">
                    <Image
                      src="/service/fk-brand-logo.png"
                      alt="FIT KARTE"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-black tracking-tight text-white sm:text-xl">
                        FIT KARTE
                      </h3>
                      <span className="hidden text-xs text-white/70 sm:inline">
                        — フィットネスジム向け管理プラットフォーム
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-white/80 sm:text-sm">
                      会員管理・予約・決済・カルテ・売上分析を完全自社開発・運営しています。
                    </p>
                  </div>
                </div>

                {/* 右側：リンクボタン */}
                <a
                  href="https://fit-karte.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-primary shadow-sm transition-all duration-300 hover:bg-blue-50 hover:shadow-md hover:-translate-y-0.5 sm:px-6 sm:py-3 sm:text-sm"
                >
                  <span>サービスサイト</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <ItPartnerResults showCta={true} />

        <section id="profile" className="scroll-mt-24 py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            {/* セクションタイトル */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.5 }}
              className="mb-12 md:mb-16"
            >
              <p className="mb-3 text-xs font-black tracking-[0.24em] text-primary">PROFILE</p>
              <h2 className="text-3xl font-black tracking-tight md:text-5xl">プロフィール</h2>
            </motion.div>

            {/* オープンレイアウト（枠なしマガジンスタイル） */}
            <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-12 lg:gap-16">
              {/* 左側：人物写真（自然なポートレートフレーム） */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.6 }}
                className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] lg:col-span-5 lg:max-w-none"
              >
                {/* 背景の柔らかな光彩 */}
                <div className="absolute -inset-4 -z-10 rounded-[40px] bg-gradient-to-tr from-blue-100/60 via-sky-50/40 to-transparent blur-2xl" />

                <div className="relative aspect-square w-full max-w-[360px] mx-auto overflow-hidden rounded-[32px] border border-slate-100/80 shadow-[0_16px_40px_rgba(1,22,39,0.08)] sm:aspect-[4/4.5] sm:max-w-none">
                  <Image
                    src="/it-partner/miyazaki-icon.jpeg"
                    alt="宮崎 賢治"
                    fill
                    sizes="(max-width: 1024px) 90vw, 420px"
                    className="object-cover object-center"
                  />
                </div>
              </motion.div>

              {/* 右側：プロフィール詳細 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-6 lg:col-span-7"
              >
                {/* 名前・肩書・SNS */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h3 className="text-3xl font-black tracking-tight text-secondary sm:text-4xl">
                        宮崎 賢治
                      </h3>
                      <span className="font-heading text-xs font-bold tracking-[0.18em] text-slate-400 uppercase sm:text-sm">
                        Kenji Miyazaki
                      </span>
                    </div>

                    {/* SNSアイコン */}
                    <div className="flex items-center gap-2.5">
                      <a
                        href="https://www.instagram.com/amelio.tech/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="宮崎賢治 Instagram"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E1306C] hover:bg-[#E1306C] hover:text-white"
                      >
                        <Instagram className="h-4 w-4" />
                      </a>
                      <a
                        href="https://x.com/miyazakikna"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="宮崎賢治 X"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-black hover:bg-black hover:text-white"
                      >
                        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* 紹介文 */}
                <p className="text-sm font-medium leading-relaxed text-slate-600 sm:text-base sm:leading-8">
                  NTTグループにてアプリ開発に従事後、株式会社Shape Fitの業務執行役員としてジムFC展開やイベント運営DXを牽引。現在は株式会社Amelio代表として、現場目線での業務DXやWeb・システム開発を一貫支援。
                </p>

                {/* 経歴・現在 */}
                <div className="border-t border-slate-100 pt-5">
                  <p className="text-[11px] font-black tracking-wider text-slate-400 uppercase">Career</p>
                  <ul className="mt-3 space-y-2 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="font-medium text-secondary">株式会社Shape Fit：業務執行役員<br />パーソナルジムFC責任者・コンテスト運営責任者を歴任</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="font-medium text-secondary">株式会社Amelio：代表取締役社長
                        {/* <br />データ・エコノミーコイン株式会社：常務取締役 */}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* 詳細リンクボタン */}
                <div className="pt-2">
                  <Link
                    href="/profile/miyazaki"
                    className="group inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/5 px-6 py-3 text-xs font-bold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white sm:text-sm"
                  >
                    <span>プロフィールを詳しく見る</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 支援の進め方 / 支援フロー */}
        <section id="flow" className="scroll-mt-24 border-t border-slate-100 bg-[#f8fbfe] py-24 md:py-32">
          <div className="mx-auto max-w-4xl px-6 md:px-10">
            {/* セクションタイトル */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.5 }}
              className="mb-14 text-center md:mb-16"
            >
              <p className="mb-3 text-xs font-black tracking-[0.24em] text-primary">FLOW</p>
              <h2 className="text-3xl font-black tracking-tight md:text-5xl">支援の進め方</h2>
            </motion.div>

            {/* フローステップ一覧 */}
            <div className="flex flex-col gap-0">
              {flowSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.5, delay: 0.08 * index }}
                  className="flex gap-5 md:gap-8"
                >
                  {/* ステップ番号＆ライン */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 font-heading text-sm font-bold text-primary shadow-xs">
                      {step.step}
                    </div>
                    {index < flowSteps.length - 1 && (
                      <div className="my-2 w-px flex-1 bg-slate-200" />
                    )}
                  </div>

                  {/* 内容 */}
                  <div className={`pt-1.5 ${index < flowSteps.length - 1 ? 'pb-8 md:pb-10' : 'pb-0'}`}>
                    <h3 className="mb-2 text-base font-bold text-secondary md:text-lg">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 md:text-base md:leading-8">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAボタン */}
            <div className="mt-14 flex justify-center md:mt-20">
              <Link
                href="/contact?type=it-partner"
                className="group relative inline-flex items-center justify-center gap-3.5 rounded-full bg-gradient-to-r from-primary via-[#0055b3] to-primary bg-[length:200%_auto] px-9 py-4.5 text-base font-black text-white shadow-[0_16px_36px_rgba(0,102,204,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-right hover:shadow-[0_20px_44px_rgba(0,102,204,0.45)] sm:px-12 sm:py-5 sm:text-lg"
              >
                <span>まずは困りごとを相談</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5 sm:h-6 sm:w-6" />
              </Link>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24 border-t border-slate-100 bg-white py-24 md:py-32">
          <div className="mx-auto max-w-4xl px-6 md:px-10">
            <div className="mb-14 md:mb-16">
              <p className="mb-3 text-xs font-black tracking-[0.24em] text-primary">FAQ</p>
              <h2 className="text-3xl font-black tracking-tight md:text-5xl">よくある質問</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-slate-100 bg-[#fbfdff] px-5 shadow-sm transition-shadow open:shadow-[0_16px_40px_rgba(1,22,39,0.06)] md:px-7"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left md:py-6 [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start gap-4 text-sm font-bold leading-7 text-secondary md:text-base">
                      <span className="font-heading text-primary">Q.</span>
                      {faq.question}
                    </span>
                    <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <div className="border-t border-slate-100 pb-6 pt-5 pl-9 text-sm leading-7 text-slate-500 md:text-base md:leading-8">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 pb-24 md:px-10 md:pb-32">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[34px] bg-gradient-to-r from-secondary via-[#052d52] to-primary px-8 py-12 text-white shadow-[0_30px_70px_rgba(1,22,39,0.2)] md:px-14 md:py-16">
            <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full border border-white/10" />
            <div className="absolute -right-2 -top-5 h-52 w-52 rounded-full bg-primary-light/10 blur-xl" />
            <div className="relative flex flex-col items-start justify-between gap-9 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-black leading-tight md:text-4xl">裏方は、お任せください。</h2>
                <p className="mt-4 text-sm font-medium text-white/70 md:text-base">
                  まずは今、困っていることを聞かせてください。
                </p>
              </div>
              <Link
                href="/contact?type=it-partner"
                className="inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-primary shadow-[0_16px_34px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-1 md:px-9"
              >
                まずは困りごとを相談
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
