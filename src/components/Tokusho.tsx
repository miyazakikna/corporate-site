'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import SubPageHeader from '@/components/SubPageHeader';

type TokushoItem = {
  label: string;
  value: string;
  note?: string;
};

const tokushoData: TokushoItem[] = [
  {
    label: '販売事業者名',
    value: '株式会社Amelio',
  },
  {
    label: '運営統括責任者',
    value: '宮崎 賢治',
  },
  {
    label: '所在地',
    value: '〒289-2317 千葉県香取郡多古町井戸山722番地1',
  },
  {
    label: '電話番号',
    value: '請求があり次第、遅滞なく開示いたします。',
  },
  {
    label: 'メールアドレス',
    value: 'contact@amelio-tech.com',
  },
  {
    label: 'サービス価格',
    value: `・HP・LP制作：0円〜11,000円 (税込)
・システム開発：30,000円〜55,000円 (税込)
・業務支援：100,000円〜220,000円 (税込)`,
    note: '※金額はご依頼内容、プラン、契約形態、または個別のお見積もりによって決定いたします。',
  },
  {
    label: '商品代金以外の必要料金',
    value: '銀行振込時の振込手数料、インターネット接続料金等の通信費用',
  },
  {
    label: 'お支払方法',
    value: 'クレジットカード決済、銀行振込',
  },
  {
    label: 'お支払時期',
    value: `クレジットカード：各カード会社の引き落とし日
銀行振込：請求書発行の翌月末日まで（または個別契約に定める期日まで）`,
  },
  {
    label: 'サービスの提供時期',
    value: 'お申し込み手続きおよびアカウント設定完了後、または個別契約にて合意した提供開始日よりご利用いただけます。',
  },
  {
    label: '返品・キャンセルについて',
    value: 'サービスの性質上、お申し込み成立後・サービス提供開始後の返品・返金は原則として承っておりません。解約については当社所定の手続きまたは契約条件に従ってください。',
  },
];

export const Tokusho = () => {
  const tableRef = useRef(null);
  const isInView = useInView(tableRef, { once: true, amount: 0.05 });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <SubPageHeader
        title="特定商取引法に基づく表記"
        titleEn="LEGAL NOTATION"
        crumbs={[
          { label: 'TOP', href: '/' },
          { label: '特定商取引法に基づく表記' },
        ]}
      />

      {/* Content */}
      <div className="relative">
        <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12 py-12 md:py-20" ref={tableRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden"
          >
            {tokushoData.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: 0.05 + index * 0.04 }}
                className={`flex flex-col md:flex-row ${index !== tokushoData.length - 1 ? 'border-b border-slate-100' : ''
                  } group hover:bg-slate-50/50 transition-colors duration-300`}
              >
                {/* Label */}
                <div className="w-full md:w-[220px] lg:w-[260px] shrink-0 px-6 pt-5 pb-2 md:py-6 md:px-8 bg-slate-50/60 md:border-r md:border-slate-100">
                  <span className="text-xs md:text-sm font-bold text-secondary tracking-wider">
                    {item.label}
                  </span>
                </div>

                {/* Value */}
                <div className="flex-1 px-6 pb-5 pt-2 md:py-6 md:px-8">
                  <div className="text-sm md:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                    {item.value}
                  </div>
                  {item.note && (
                    <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                      {item.note}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
