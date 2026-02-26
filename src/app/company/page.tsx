import { Company } from '@/components/Company';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '会社概要 | 株式会社Amelio',
  description:
    '株式会社Amelioの企業情報をご覧いただけます。所在地、設立日、事業内容、適格請求書番号などの基本情報を掲載しています。',
  openGraph: {
    title: '会社概要 | 株式会社Amelio',
    description:
      '株式会社Amelioの企業情報をご覧いただけます。所在地、設立日、事業内容、適格請求書番号などの基本情報を掲載しています。',
  },
  twitter: {
    title: '会社概要 | 株式会社Amelio',
    description:
      '株式会社Amelioの企業情報をご覧いただけます。所在地、設立日、事業内容、適格請求書番号などの基本情報を掲載しています。',
  },
};

export default function CompanyPage() {
  return (
    <Company />
  );
}