import { Privacy } from '@/components/Privacy';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | 株式会社Amelio',
  description: '株式会社Amelioのプライバシーポリシーページです。当社が収集する個人情報の取り扱いについて詳しく説明しています。',
};

export default function PrivacyPage() {
  return (
    <Privacy />
  );
}