'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import SubPageHeader from '@/components/SubPageHeader';

const companyData = [
  { label: '会社名', value: '株式会社Amelio' },
  { label: '設立', value: '2023年10月2日' },
  { label: '所在地', value: '〒289-2317 千葉県香取郡多古町井戸山722番地1' },
  { label: '資本金', value: '500万円' },
  { label: '代表取締役', value: '宮崎 賢治' },
  {
    label: '事業内容',
    value: null,
    list: ['ITコンサルティング', 'マーケティング支援', '業務改善支援', 'システム開発'],
  },
  { label: '主な取引先', value: '株式会社Shape Fit' },
  { label: '取引銀行', value: 'GMOあおぞらネット銀行' },
  { label: '適格請求書番号', value: 'T5040001130374' },
];

export const Company = () => {
  const tableRef = useRef(null);
  const isInView = useInView(tableRef, { once: true, amount: 0.15 });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <SubPageHeader
        title="会社概要"
        titleEn="COMPANY"
        crumbs={[
          { label: 'TOP', href: '/' },
          { label: '会社概要' },
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
            {companyData.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.06 }}
                className={`flex flex-col md:flex-row ${index !== companyData.length - 1 ? 'border-b border-slate-100' : ''
                  } group hover:bg-slate-50/50 transition-colors duration-300`}
              >
                {/* Label */}
                <div className="w-full md:w-[200px] lg:w-[240px] shrink-0 px-6 pt-5 pb-1 md:py-6 md:px-8 bg-slate-50/60 md:border-r md:border-slate-100">
                  <span className="text-xs md:text-sm font-bold text-secondary tracking-wider">
                    {item.label}
                  </span>
                </div>

                {/* Value */}
                <div className="flex-1 px-6 pb-5 pt-1 md:py-6 md:px-8">
                  {item.list ? (
                    <ul className="list-none p-0 m-0 space-y-2">
                      {item.list.map((li, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-sm md:text-base text-slate-700 leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {li}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-sm md:text-base text-slate-700 leading-relaxed">
                      {item.value}
                    </span>
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