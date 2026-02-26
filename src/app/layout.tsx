import '@/styles/global.css'
import type { Metadata } from 'next';
import { Outfit, Zen_Kaku_Gothic_New } from 'next/font/google';
import { Footer } from '@/components/Footer';

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: '株式会社Amelio',
  description:
    'あなたの挑戦を支える土台となる。株式会社Amelioは、テクノロジーで可能性を最大化し、成長が続く仕組みを構築。フィットネス業界向けシステム「FIT KARTE」やトレーナー支援「WITH TRAINER」を展開しています。',
  keywords: [
    'Amelio',
    '株式会社Amelio',
    'アメリオ',
    'MAKES GROWTH SCALABLE',
    'FIT KARTE',
    'フィットカルテ',
    'WITH TRAINER',
    'ウィズトレーナー',
    'フィットネスDX',
    'ジム経営支援',
    'トレーナーブランディング',
    'システム開発',
  ],
  alternates: {
    canonical: 'https://amelio-tech.com',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: '株式会社Amelio',
    description:
      'あなたの挑戦を支える土台となる。株式会社Amelioは、テクノロジーで可能性を最大化し、成長が続く仕組みを構築。フィットネス業界向けシステム「FIT KARTE」やトレーナー支援「WITH TRAINER」を展開しています。',
    url: 'https://amelio-tech.com',
    siteName: '株式会社Amelio',
    images: [
      {
        url: '/ogp.png',
        width: 1200,
        height: 630,
        alt: '株式会社Amelio',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '株式会社Amelio',
    description:
      'あなたの挑戦を支える土台となる。株式会社Amelioは、テクノロジーで可能性を最大化し、成長が続く仕組みを構築。',
    images: ['/ogp.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const zenKakuGothic = Zen_Kaku_Gothic_New({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-zen',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${outfit.variable} ${zenKakuGothic.variable}`}>
      <body className="overflow-x-hidden bg-slate-50">
        <main>{children}</main>
        <Footer />
      </body>

      {/* {process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID} />
      )} */}
    </html>
  );
}