'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import styles from './Work.module.scss';
import { slideUp } from '@/utils/animations';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Work = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const caseStudies = [
    {
      id: 'shape-fit-festival',
      title: 'Shape Fit Festival',
      client: 'Shape Fit Inc.',
      tags: ['イベント集客', 'SNS運用', 'LP制作'],
      description: 'フィットネスイベント「Shape Fit Festival」の集客から運営まで総合的にサポート。SNS運用戦略の再構築とコンバージョン重視のランディングページ制作により、前年比150%の参加者増加を実現しました。',
      achievements: ['参加者数：前年比150%増', 'SNSフォロワー：3ヶ月で2倍に増加', '申込みコンバージョン率：32%向上'],
      imageSrc: '/images/works/shape-fit-festival.jpg',
      imageAlt: 'Shape Fit Festival イベントの様子',
    },
    {
      id: 'shape-fit-gym',
      title: 'Shape Fit Gym',
      client: 'Shape Fit Inc.',
      tags: ['ホームページ制作', '予約システム導入', 'UI/UXデザイン'],
      description: '多店舗展開するフィットネスジム「Shape Fit Gym」のブランドイメージに合わせたホームページをデザイン。また、顧客満足度を高めるための予約システムを導入し、運用サポートも行いました。',
      achievements: ['Web予約率：導入後3ヶ月で全体の65%に', '顧客満足度調査：92%が「使いやすい」と回答', '店舗スタッフの業務効率：約40%改善'],
      imageSrc: '/images/works/shape-fit-gym.jpg',
      imageAlt: 'Shape Fit Gym ウェブサイトと予約システム',
    }
  ];

  return (
    <section id='works' className={`section ${styles.works}`} ref={sectionRef}>
      <div className='container'>
        <motion.h2
          className='section-title'
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={slideUp}
        >
          実績紹介
        </motion.h2>

        <motion.div
          className={styles.sliderContainer}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            onInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = navigationNextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            className={styles.swiper}
          >
            {caseStudies.map((caseStudy) => (
              <SwiperSlide key={caseStudy.id} className={styles.slide}>
                <div className={styles.caseContent}>
                  <div className={styles.imageContainer}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={caseStudy.imageSrc}
                        alt={caseStudy.imageAlt}
                        fill
                        sizes='(max-width: 768px) 100vw, 50vw'
                        className={styles.caseImage}
                      />
                    </div>
                  </div>

                  <div className={styles.textContent}>
                    <h3 className={styles.caseTitle}>{caseStudy.title}</h3>
                    <p className={styles.clientName}>
                      <span className={styles.clientLabel}>クライアント：</span>
                      {caseStudy.client}
                    </p>

                    <div className={styles.tagContainer}>
                      {caseStudy.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className={styles.tag}>{tag}</span>
                      ))}
                    </div>

                    <p className={styles.description}>{caseStudy.description}</p>

                    <div className={styles.achievementsContainer}>
                      <h4 className={styles.achievementsTitle}>成果</h4>
                      <ul className={styles.achievementsList}>
                        {caseStudy.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className={styles.achievementItem}>
                            <span className={styles.achievementIcon}>✓</span>
                            <span className={styles.achievementText}>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={styles.navigationControls}>
            <button ref={navigationPrevRef} className={styles.navButton} aria-label='前へ'>
              <ChevronLeft />
            </button>
            <button ref={navigationNextRef} className={styles.navButton} aria-label='次へ'>
              <ChevronRight />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
