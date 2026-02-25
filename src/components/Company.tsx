'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeIn, slideUp } from '@/utils/animations';
import Breadcrumb from '@/components/Breadcrumb';

export const Company = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <div className="bg-white py-xl min-h-[calc(100vh-200px)]" ref={sectionRef}>
      <div className='container'>
        <motion.div
          className="flex justify-between mt-xl"
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeIn}
          transition={{ delay: 0.8 }}
        >
          <Breadcrumb crumbs={[
            { label: 'TOP', href: '/' },
            { label: '会社概要' }
          ]} />
        </motion.div>

        <motion.h1
          className='section-title'
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={slideUp}
        >
          会社概要
        </motion.h1>

        <motion.div
          className="bg-white rounded-md shadow-md p-xs mb-xl md:p-lg"
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <th className="p-sm md:p-base border-b border-light-gray text-left text-sm md:text-base w-[30%] md:w-[25%] font-semibold text-secondary align-top">会社名</th>
                <td className="p-sm md:p-base border-b border-light-gray text-left text-sm md:text-base">株式会社Amelio</td>
              </tr>
              <tr>
                <th className="p-sm md:p-base border-b border-light-gray text-left text-sm md:text-base w-[30%] md:w-[25%] font-semibold text-secondary align-top">設立</th>
                <td className="p-sm md:p-base border-b border-light-gray text-left text-sm md:text-base">2023年10月2日</td>
              </tr>
              <tr>
                <th className="p-sm md:p-base border-b border-light-gray text-left text-sm md:text-base w-[30%] md:w-[25%] font-semibold text-secondary align-top">所在地</th>
                <td className="p-sm md:p-base border-b border-light-gray text-left text-sm md:text-base">〒289-2317 千葉県香取郡多古町井戸山722番地1</td>
              </tr>
              <tr>
                <th className="p-sm md:p-base border-b border-light-gray text-left text-sm md:text-base w-[30%] md:w-[25%] font-semibold text-secondary align-top">資本金</th>
                <td className="p-sm md:p-base border-b border-light-gray text-left text-sm md:text-base">500万円</td>
              </tr>
              <tr>
                <th className="p-sm md:p-base border-b border-light-gray text-left text-sm md:text-base w-[30%] md:w-[25%] font-semibold text-secondary align-top">代表取締役</th>
                <td className="p-sm md:p-base border-b border-light-gray text-left text-sm md:text-base">宮崎 賢治</td>
              </tr>
              <tr>
                <th className="p-sm md:p-base border-b border-light-gray text-left text-sm md:text-base w-[30%] md:w-[25%] font-semibold text-secondary align-top">事業内容</th>
                <td className="p-sm md:p-base border-b border-light-gray text-left text-sm md:text-base">
                  <ul className="list-none p-0 m-0">
                    <li className="mb-xs relative pl-sm before:content-['•'] before:absolute before:left-0 last:mb-0">ITコンサルティング</li>
                    <li className="mb-xs relative pl-sm before:content-['•'] before:absolute before:left-0 last:mb-0">マーケティング支援</li>
                    <li className="mb-xs relative pl-sm before:content-['•'] before:absolute before:left-0 last:mb-0">業務改善支援</li>
                    <li className="mb-xs relative pl-sm before:content-['•'] before:absolute before:left-0 last:mb-0">システム開発</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th className="p-sm md:p-base border-b border-light-gray text-left text-sm md:text-base w-[30%] md:w-[25%] font-semibold text-secondary align-top">主な取引先</th>
                <td className="p-sm md:p-base border-b border-light-gray text-left text-sm md:text-base">株式会社Shape Fit</td>
              </tr>
              <tr>
                <th className="p-sm md:p-base border-b border-light-gray text-left text-sm md:text-base w-[30%] md:w-[25%] font-semibold text-secondary align-top">取引銀行</th>
                <td className="p-sm md:p-base border-b border-light-gray text-left text-sm md:text-base">GMOあおぞらネット銀行</td>
              </tr>
              <tr>
                <th className="p-sm md:p-base text-left text-sm md:text-base w-[30%] md:w-[25%] font-semibold text-secondary align-top border-none">適格請求書番号</th>
                <td className="p-sm md:p-base text-left text-sm md:text-base border-none">T5040001130374</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};