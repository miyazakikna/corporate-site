import { Contact } from '@/components/Contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description:
    '株式会社Amelioへのお問い合わせ・ご相談フォームです。業務支援（IT・バックオフィス・Web制作・業務DX伴走）や自社サービス（FIT KARTE、WITH TRAINER）に関するご質問・お見積もりなど、お気軽にお問い合わせください。',
  alternates: {
    canonical: 'https://amelio-tech.com/contact',
  },
  openGraph: {
    title: 'お問い合わせ | 株式会社Amelio',
    description:
      '株式会社Amelioへのお問い合わせ・ご相談フォームです。業務支援（IT・バックオフィス・Web制作・業務DX伴走）や自社サービス（FIT KARTE、WITH TRAINER）に関するご質問・お見積もりなど、お気軽にお問い合わせください。',
    url: 'https://amelio-tech.com/contact',
    type: 'website',
    images: ['/ogp.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'お問い合わせ | 株式会社Amelio',
    description:
      '株式会社Amelioへのお問い合わせ・ご相談フォームです。業務支援（IT・バックオフィス・Web制作・業務DX伴走）や自社サービスに関するご質問・お見積もりなど、お気軽にお問い合わせください。',
    images: ['/ogp.png'],
  },
};

export default function ContactPage() {
  return (
    <Contact />
  );
}
