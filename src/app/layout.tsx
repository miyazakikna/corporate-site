import '@/styles/global.css'
import type { Metadata } from 'next';
import { Outfit, Zen_Kaku_Gothic_New } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GoogleTagManager } from '@next/third-parties/google'

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://amelio-tech.com'),
  title: {
    default: '株式会社Amelio | テクノロジーと現場伴走で挑戦を支える',
    template: '%s | 株式会社Amelio',
  },
  description:
    '株式会社Amelio（アメリオ）は、経営者の右腕となる業務支援（IT・Web制作・業務DX・バックオフィス伴走）や、フィットネス業界向けSaaS「FIT KARTE」、トレーナー支援「WITH TRAINER」を展開しています。',
  keywords: [
    'Amelio',
    '株式会社Amelio',
    'アメリオ',
    '業務支援',
    'ITパートナー',
    '業務DX',
    'Web制作',
    'システム開発',
    'FIT KARTE',
    'フィットカルテ',
    'WITH TRAINER',
    'ウィズトレーナー',
    'フィットネスDX',
    'ジム経営支援',
  ],
  alternates: {
    canonical: 'https://amelio-tech.com',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: '株式会社Amelio | テクノロジーと現場伴走で挑戦を支える',
    description:
      '株式会社Amelio（アメリオ）は、経営者の右腕となる業務支援（IT・Web制作・業務DX・バックオフィス伴走）や、フィットネス業界向けSaaS「FIT KARTE」、トレーナー支援「WITH TRAINER」を展開しています。',
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
    title: '株式会社Amelio | テクノロジーと現場伴走で挑戦を支える',
    description:
      '株式会社Amelio（アメリオ）は、経営者の右腕となる業務支援（IT・Web制作・業務DX・バックオフィス伴走）や、フィットネス業界向けSaaS「FIT KARTE」、トレーナー支援「WITH TRAINER」を展開しています。',
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>

      {process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID} />
      )}
    </html>
  );
}
