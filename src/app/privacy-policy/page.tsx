import { Privacy } from '@/components/Privacy';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | 株式会社Amelio',
  description:
    '株式会社Amelioのプライバシーポリシーです。当社が収集する個人情報の取り扱い、利用目的、および保護に関する方針を詳しく説明しています。',
  openGraph: {
    title: 'プライバシーポリシー | 株式会社Amelio',
    description:
      '株式会社Amelioのプライバシーポリシーです。当社が収集する個人情報の取り扱い、利用目的、および保護に関する方針を詳しく説明しています。',
  },
  twitter: {
    title: 'プライバシーポリシー | 株式会社Amelio',
    description:
      '株式会社Amelioのプライバシーポリシーです。当社が収集する個人情報の取り扱い、利用目的、および保護に関する方針を詳しく説明しています。',
  },
};

export default function PrivacyPage() {
  return (
    <Privacy />
  );
}