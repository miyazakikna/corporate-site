import { Company } from '@/components/Company';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '会社概要',
  description:
    '株式会社Amelioの企業情報をご覧いただけます。所在地、設立日、事業内容、代表取締役、適格請求書番号などの基本情報を掲載しています。',
  alternates: {
    canonical: 'https://amelio-tech.com/company',
  },
  openGraph: {
    title: '会社概要 | 株式会社Amelio',
    description:
      '株式会社Amelioの企業情報をご覧いただけます。所在地、設立日、事業内容、代表取締役、適格請求書番号などの基本情報を掲載しています。',
    url: 'https://amelio-tech.com/company',
    type: 'website',
    images: ['/ogp.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '会社概要 | 株式会社Amelio',
    description:
      '株式会社Amelioの企業情報をご覧いただけます。所在地、設立日、事業内容、代表取締役、適格請求書番号などの基本情報を掲載しています。',
    images: ['/ogp.png'],
  },
};

export default function CompanyPage() {
  return (
    <Company />
  );
}