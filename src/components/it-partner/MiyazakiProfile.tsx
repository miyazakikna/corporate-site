'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Instagram } from 'lucide-react';
import SubPageHeader from '@/components/SubPageHeader';
import { ItPartnerResults } from './ItPartnerResults';

const skillRows = [
  { category: 'Web制作', items: 'HTML / CSS / WordPress / LP制作 / コーポレートサイト / SEO設計' },
  { category: '開発', items: 'フルスクラッチ開発 / Webアプリケーション / 予約・会員管理 / 決済連携' },
  { category: '事業推進・PM', items: 'プロジェクトマネジメント（PM） / 経営者の右腕・業務委託 / 広告運用統括 / 開発ディレクション' },
  { category: 'マーケティング', items: '広告運用（Meta / Google） / 導線改善 / データ分析' },
  { category: '業務効率化', items: '業務DX支援 / FC本部マネジメント / 新規事業立ち上げ / フロー自動化' },
] as const;

type TimelineProject = {
  name: string;
  role?: string;
  description: string;
  image?: string;
};

type TimelineEvent = {
  period: string;
  title: string;
  description: string;
  image?: string;
  projects?: TimelineProject[];
};

const timelineEvents: TimelineEvent[] = [
  {
    period: '2018 - 2021',
    title: 'NTTグループ モバイルアプリ開発に従事',
    description: 'NTTグループにてモバイルアプリおよびWebシステムの設計・開発に従事。エンジニアとしての基礎と開発・品質管理体制を習得。',
    image: '',
  },
  {
    period: '2021 - 2023',
    title: 'フリーランスエンジニアとして活動',
    description: 'Web制作・開発業務を通じて様々な業界のクライアントの課題解決を支援',
  },
  {
    period: '2023 - 2025',
    title: '株式会社Shape Fit 業務執行役員に就任',
    description: '業務執行役員として新規事業の立ち上げおよび既存事業の拡大・DXを統括。主に2つの主力事業を牽引しました。',
    projects: [
      {
        name: 'パーソナルジム FC展開・自社システム開発',
        role: 'FC本部責任者',
        description: '会員管理・予約・決済・売上レポートを一元化する自社システムを開発・導入。店舗運営工数を大幅に削減しFC展開体制を整備するとともに、新規出店・店舗拡大を推進し売上向上に貢献。',
        image: '/it/sfg.png',
      },
      {
        name: 'フィットネスコンテスト 大会運営',
        role: '運営責任者',
        description: '運営責任者としてコンセプト設計・ブランディング・スポンサー営業など事業の0→1を主導し、2,000名規模のフィットネスコンテストを成功に導く。併せてチケット販売・エントリー・当日受付の完全デジタル化を推進し、手数料削減と大幅な業務効率化を実現。',
        image: '/it/sff-app.png',
      },
    ],
  },
  {
    period: '2023 - 現在',
    // title: '株式会社Amelio 設立 / データ・エコノミーコイン株式会社 参画',
    title: '株式会社Amelio 設立',
    // description: '自社SaaS事業・ITパートナー事業の経営に加え、成長企業のIT最高責任者として最先端テクノロジーの社会実装を牽引。',
    description: '自社SaaS「FIT KARTE」やトレーナー支援「WITH TRAINER」の開発・運用を行うとともに、事業者のITパートナーとしてWeb制作・業務DX・AI導入を一貫支援。',
    image: '/it-partner/amelio-miyazaki.jpg',
    // projects: [
    //   {
    //     name: '株式会社Amelio',
    //     role: '代表取締役社長',
    //     description: '自社SaaS「FIT KARTE」やトレーナー支援「WITH TRAINER」の開発・運用を行うとともに、事業者のITパートナーとしてWeb制作・業務DX・AI導入を一貫支援。',
    //     image: '/it-partner/amelio-miyazaki.jpg',
    //   },
    //   {
    //     name: 'データ・エコノミーコイン株式会社',
    //     role: '常務取締役',
    //     description: 'AIとブロックチェーンを活用し、企業横断の購買データを安全に集約・分析するデータ経済圏プラットフォーム（DECシステム / データ拠出アプリPPI）の開発を推進。IT最高責任者としてテクノロジー戦略を牽引し、外部ベンダーの統括・ディレクションを担当。',
    //     image: '/it-partner/dec-system.webp',
    //   },
    // ],
  },
];

// スクロール検知で色とアニメーションが変化するタイムラインアイテム
function HistoryItem({
  item,
  isLast,
}: {
  item: TimelineEvent;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const center = window.innerHeight / 2;
        // 画面中央付近に入ったときにアクティブ化
        if (rect.top < center + 120 && rect.bottom > center - 120) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初期チェック
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={ref} className="relative flex gap-4 sm:gap-8 md:gap-10">
      {/* タイムラインの縦線 */}
      {!isLast && (
        <div className="absolute bottom-[-32px] left-[7px] top-4 w-[2px] bg-slate-200 md:left-[9px]" />
      )}

      {/* ドット（リングサークル） */}
      <div className="relative z-10 flex w-[16px] shrink-0 flex-col items-center pt-1.5 md:w-[20px]">
        <div
          className={`h-4 w-4 rounded-full border-4 bg-white transition-all duration-500 ease-out md:h-5 md:w-5 ${isActive
            ? 'scale-125 border-primary shadow-lg shadow-blue-200/80'
            : 'scale-100 border-slate-300'
            }`}
        />
      </div>

      {/* コンテンツ */}
      <div
        className={`flex-1 pb-10 sm:pb-12 transition-all duration-500 ${isActive ? 'translate-x-0 opacity-100' : 'translate-x-1 sm:translate-x-2 opacity-50'
          }`}
      >
        <span
          className={`font-heading mb-1.5 block whitespace-nowrap text-2xl font-black tracking-tight transition-colors duration-500 sm:text-3xl md:text-4xl ${isActive ? 'text-primary' : 'text-slate-300'
            }`}
        >
          {item.period}
        </span>
        <h3 className="mb-2 text-base font-black text-secondary sm:text-lg md:text-xl">
          {item.title}
        </h3>
        <p className="text-sm font-medium leading-relaxed text-slate-600 sm:text-base sm:leading-7">
          {item.description}
        </p>

        {/* 複数の事業プロジェクトがある場合（2カラムカード表示） */}
        {item.projects && item.projects.length > 0 && (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {item.projects.map((proj) => (
              <div
                key={proj.name}
                className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-sm transition-all duration-300 sm:p-4"
              >
                {proj.image && (
                  <div className="relative mb-3 aspect-video w-full overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                    <Image
                      src={proj.image}
                      alt={proj.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover object-center transition-transform duration-500"
                    />
                  </div>
                )}
                {proj.role && (
                  <div className="mb-1.5">
                    <span className="inline-block rounded-md bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                      {proj.role}
                    </span>
                  </div>
                )}
                <h4 className="text-sm font-black text-secondary sm:text-base leading-snug">
                  {proj.name}
                </h4>
                <p className="mt-1.5 text-xs font-medium leading-relaxed text-slate-600 sm:text-[13px] sm:leading-6">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* 単一の経歴画像（画像が指定されている場合のみ表示） */}
        {item.image && (
          <div className="mt-4 relative aspect-video w-full max-w-[440px] overflow-hidden rounded-2xl border border-slate-100/90 bg-slate-50 shadow-[0_8px_24px_rgba(1,22,39,0.06)]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 440px"
              className="object-cover object-center transition-transform duration-500"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function MiyazakiProfile() {
  return (
    <div className="min-h-screen bg-[#fbfdff] text-secondary">
      {/* Hero Header */}
      <SubPageHeader
        title="代表について"
        titleEn="PROFILE"
        crumbs={[
          { label: 'TOP', href: '/' },
          { label: '代表について' },
        ]}
      />

      {/* メインプロフィール（WITH TRAINER風 左画像・右基本情報＋スキル表） */}
      <section className="relative isolate overflow-hidden border-b border-slate-100 bg-[#fbfdff] py-12 md:py-20">
        {/* 背景光彩 */}
        <div className="absolute -left-20 top-10 -z-10 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute right-0 top-0 -z-10 h-full w-2/5 bg-[radial-gradient(circle_at_center,rgba(79,195,247,0.12),transparent_70%)]" />

        <div className="mx-auto max-w-6xl px-6 md:px-10">
          {/* スマホ用ヘッダー（写真の上に一番上に表示） */}
          <div className="mb-8 border-b border-slate-200/70 pb-6 lg:hidden">
            <span className="inline-block rounded-full bg-primary/10 px-3.5 py-1 text-[11px] font-black tracking-widest text-primary uppercase">
              IT Partner / Developer
            </span>
            <div className="mt-2.5 flex flex-wrap items-baseline justify-between gap-4">
              <div className="flex flex-wrap items-baseline gap-3">
                <h1 className="text-3xl font-black tracking-tight text-secondary sm:text-4xl">
                  宮崎 賢治
                </h1>
                <span className="font-heading text-sm font-bold tracking-[0.15em] text-slate-400 uppercase">
                  Kenji Miyazaki
                </span>
              </div>

              {/* SNSアイコン */}
              <div className="flex items-center gap-2.5">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="宮崎賢治 Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:border-[#E1306C] hover:bg-[#E1306C] hover:text-white"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="宮崎賢治 X"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            <p className="mt-3 text-sm font-bold text-secondary/80">
              株式会社Amelio 代表取締役社長
              {/* <br />データ・エコノミーコイン株式会社 常務取締役 */}
            </p>
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            {/* 左側：ポートレート写真 */}
            <div className="relative mx-auto w-full max-w-[380px] lg:col-span-5 lg:max-w-none">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[36px] border border-slate-100/90 bg-gradient-to-b from-[#edf6fc] via-[#f5faff] to-[#e6f1fa] shadow-[0_20px_50px_rgba(1,22,39,0.09)]">
                <Image
                  src="/it-partner/miyazaki-profile.png"
                  alt="宮崎 賢治"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 450px"
                  className="object-cover object-top translate-y-3 scale-105 drop-shadow-[0_16px_24px_rgba(1,22,39,0.1)] sm:translate-y-5"
                />
              </div>
            </div>

            {/* 右側：基本情報・スペック・自己紹介・ボタン */}
            <div className="space-y-6 lg:col-span-7">
              {/* PC用名前・肩書・SNS（lg以上で表示） */}
              <div className="hidden border-b border-slate-200/70 pb-6 lg:block">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="inline-block rounded-full bg-primary/10 px-3.5 py-1 text-[11px] font-black tracking-widest text-primary uppercase">
                      IT Partner / Developer
                    </span>
                    <div className="mt-2.5 flex flex-wrap items-baseline gap-3">
                      <h1 className="text-3xl font-black tracking-tight text-secondary sm:text-4xl md:text-[2.75rem]">
                        宮崎 賢治
                      </h1>
                      <span className="font-heading text-sm font-bold tracking-[0.15em] text-slate-400 uppercase sm:text-base">
                        Kenji Miyazaki
                      </span>
                    </div>
                  </div>

                  {/* SNSアイコン */}
                  <div className="flex items-center gap-2.5">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="宮崎賢治 Instagram"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#E1306C] hover:bg-[#E1306C] hover:text-white hover:shadow-md"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                    <a
                      href="https://x.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="宮崎賢治 X"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-black hover:bg-black hover:text-white hover:shadow-md"
                    >
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  </div>
                </div>

                <p className="mt-3 text-sm font-bold text-secondary/80 sm:text-base">
                  株式会社Amelio 代表取締役社長
                  {/* <br />データ・エコノミーコイン株式会社 常務取締役 */}
                </p>
              </div>

              {/* 自己紹介文 */}
              <p className="text-sm font-medium leading-relaxed text-slate-600 sm:text-base sm:leading-8">
                NTTグループにてモバイルアプリ開発に従事後、株式会社Shape Fitの業務執行役員としてパーソナルジムのFC展開・コンテスト運営DXを牽引。現在は株式会社Amelio代表として、経営者の右腕となりWeb制作・システム開発・広告運用・業務DXを一貫支援しています。
              </p>

              {/* 相談ボタン */}
              <div className="pt-3 flex justify-center lg:justify-start">
                <Link
                  href="/contact?type=it-partner"
                  className="group relative inline-flex items-center justify-center gap-3.5 rounded-full bg-gradient-to-r from-primary via-[#0055b3] to-primary bg-[length:200%_auto] px-8 py-4 text-base font-black text-white shadow-[0_16px_36px_rgba(0,102,204,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-right hover:shadow-[0_20px_44px_rgba(0,102,204,0.45)] sm:px-10 sm:py-4.5 sm:text-lg"
                >
                  <span>まずは困りごとを相談</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5 sm:h-6 sm:w-6" />
                </Link>
              </div>
            </div>
          </div>

          {/* 下段：画像やボタンの下に配置するスキルセット表 */}
          <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm sm:mt-16">
            <table className="w-full text-left text-xs sm:text-sm">
              <tbody className="divide-y divide-slate-100">
                {skillRows.map((row) => (
                  <tr key={row.category} className="transition-colors hover:bg-slate-50/50">
                    <th className="w-28 bg-slate-50/80 px-4 py-4 font-bold text-slate-500 sm:w-40 sm:px-6">
                      {row.category}
                    </th>
                    <td className="px-4 py-4 font-medium text-secondary sm:px-6">
                      {row.items}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 経歴・実績（縦タイムラインレイアウト - スクロール連動） */}
      <section className="bg-white py-16 sm:py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-8 md:px-10">
          <div className="mb-12 text-center sm:mb-16 md:mb-20">
            <p className="mb-3 text-xs font-black tracking-[0.24em] text-primary">CAREER</p>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">経歴</h2>
          </div>

          {/* タイムライン本体 */}
          <div className="mx-auto max-w-4xl px-1 sm:px-4">
            {timelineEvents.map((item, index) => (
              <HistoryItem
                key={item.period + item.title}
                item={item}
                isLast={index === timelineEvents.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 実績セクション */}
      <ItPartnerResults className="bg-[#fbfdff]" />

      {/* ボトムCTA */}
      <section className="bg-[#fbfdff] px-6 py-24 md:px-10 md:py-32">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[34px] bg-gradient-to-r from-secondary via-[#052d52] to-primary px-8 py-12 text-white shadow-[0_30px_70px_rgba(1,22,39,0.2)] md:px-14 md:py-16">
          <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full border border-white/10" />
          <div className="relative flex flex-col items-start justify-between gap-9 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-black leading-tight md:text-4xl">まずは、困りごとを聞かせてください。</h2>
              <p className="mt-4 text-sm font-medium text-white/70 md:text-base">
                何を依頼するか決まっていなくても大丈夫です。
              </p>
            </div>
            <Link
              href="/contact?type=it-partner"
              className="inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-primary shadow-[0_16px_34px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-1 md:px-9"
            >
              相談する
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
