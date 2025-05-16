import '@/styles/global.scss'
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '株式会社Amelio - あなたの挑戦を、確かな形へ。',
  description: '弊社は、事業成長に欠かせないサービスをワンストップで提供しています。他社にはない総合的な支援力で、課題の解決から成果の創出まで一貫してサポートします。',
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