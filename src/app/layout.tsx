
import '@/styles/global.scss'
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '株式会社Amelio - あなたの"挑戦"を、確かな"形"へ',
  description: 'Ameliorate（改善・向上）を社名の由来に、企業や個人の成長を後押しします。事業立ち上げ支援、SNS運用、システム開発、LINE構築などのサービスを提供しています。',
  keywords: 'Amelio, 事業立ち上げ, SNS運用, システム開発, ホームページ制作, 広告運用',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ja'>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}