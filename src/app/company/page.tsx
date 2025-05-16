import { Company } from '@/components/company/Company';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '会社概要 | 株式会社Amelio',
  description: '株式会社Amelioの会社概要ページです。企業理念やビジョン、事業内容など、弊社についての詳細情報をご覧いただけます。',
};

export default function CompanyPage() {
  return <Company />
}