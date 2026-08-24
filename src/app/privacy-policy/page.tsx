import { Privacy } from '@/components/Privacy';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description:
    '株式会社Amelioのプライバシーポリシーです。当社が収集する個人情報の取り扱い、利用目的、および保護に関する方針を詳しく説明しています。',
  alternates: {
    canonical: 'https://amelio-tech.com/privacy-policy',
  },
  openGraph: {
    title: 'プライバシーポリシー | 株式会社Amelio',
    description:
      '株式会社Amelioのプライバシーポリシーです。当社が収集する個人情報の取り扱い、利用目的、および保護に関する方針を詳しく説明しています。',
    url: 'https://amelio-tech.com/privacy-policy',
    type: 'website',
    images: ['/ogp.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'プライバシーポリシー | 株式会社Amelio',
    description:
      '株式会社Amelioのプライバシーポリシーです。当社が収集する個人情報の取り扱い、利用目的、および保護に関する方針を詳しく説明しています。',
    images: ['/ogp.png'],
  },
};

export default function PrivacyPage() {
  return (
    <Privacy />
  );
}