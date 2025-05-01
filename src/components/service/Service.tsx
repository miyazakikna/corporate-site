'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Rocket, Share2, Code, MessageSquare, Layout, ShoppingCart, BarChart } from 'lucide-react';
import styles from './Service.module.scss';
import { fadeIn, slideUp, serviceCardContainer, serviceCard } from '@/utils/animations';

export const Service = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const services = [
    {
      icon: <Rocket className={styles.icon} />,
      title: '事業立ち上げ支援',
      description: 'アイデアから事業計画、資金調達戦略まで、起業初期段階のあらゆる課題を解決し、ビジネスの成功へと導きます。'
    },
    {
      icon: <Share2 className={styles.icon} />,
      title: 'SNS運用',
      description: 'Instagram、Twitter、Facebook等の運用代行。ターゲットに合わせたコンテンツ制作と分析で、フォロワーと顧客エンゲージメントを向上させます。'
    },
    {
      icon: <Code className={styles.icon} />,
      title: 'システム開発',
      description: '業務効率化や顧客体験向上のためのシステム開発。要件定義から実装、運用保守まで一貫したサポートを提供します。'
    },
    {
      icon: <MessageSquare className={styles.icon} />,
      title: 'LINE構築',
      description: 'LINE公式アカウントの設定から運用まで。自動応答機能やリッチメニューなどを活用し、顧客とのコミュニケーションを強化します。'
    },
    {
      icon: <Layout className={styles.icon} />,
      title: 'ホームページ制作',
      description: 'ブランドの魅力を最大限に引き出すデザインと、高いコンバージョン率を実現するUI/UXを兼ね備えたWebサイトを制作します。'
    },
    {
      icon: <ShoppingCart className={styles.icon} />,
      title: 'ECサイト構築',
      description: '商品管理や決済、物流連携まで、お客様のビジネスモデルに最適化されたECサイトを構築。売上向上のための戦略もご提案します。'
    },
    {
      icon: <BarChart className={styles.icon} />,
      title: '広告運用',
      description: 'Google広告、SNS広告など、目的に合わせた広告戦略の立案から実行、改善まで。ROIを最大化する広告運用を実現します。'
    }
  ];

  return (
    <section id='services' className={`section ${styles.services}`} ref={sectionRef}>
      <div className='container'>
        <motion.h2
          className='section-title'
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={slideUp}
        >
          サービス
        </motion.h2>

        <motion.p
          className='section-description'
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          株式会社Amelioは、事業成長に必要なサービスをワンストップで提供しています。
          それぞれのサービスは単体でもご利用いただけますが、組み合わせることでより大きな成果を発揮します。
        </motion.p>

        <motion.div
          className={styles.servicesGrid}
          variants={serviceCardContainer}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={styles.serviceCard}
              variants={serviceCard}
              whileHover='hover'
            >
              <div className={styles.iconWrapper}>
                {service.icon}
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.moreServicesLink}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeIn}
          transition={{ delay: 0.6 }}
          whileHover={{ x: 5 }}
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          サービスについて詳しく相談する <ArrowRight size={16} className={styles.moreIcon} />
        </motion.div>
      </div>
    </section>
  );
};