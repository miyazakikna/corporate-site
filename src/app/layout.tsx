import '@/styles/global.css'
import type { Metadata } from 'next';
import { Outfit, Zen_Kaku_Gothic_New } from 'next/font/google';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: '株式会社Amelio - あなたの挑戦を、確かな形へ。',
  description: '弊社は、事業成長に欠かせないサービスをワンストップで提供しています。他社にはない総合的な支援力で、課題の解決から成果の創出まで一貫してサポートします。',
  keywords: 'Amelio, 事業立ち立ち上げ, SNS運用, システム開発, ホームページ制作, 広告運用',
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