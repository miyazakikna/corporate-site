'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import styles from './Contact.module.scss';
import { useForm } from 'react-hook-form';
import { slideUp } from '@/utils/animations';

export const Contact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<{
    name: string;
    company?: string;
    email: string;
    message: string;
  }>()

  const onSubmit = async (data: {
    name: string;
    company?: string;
    email: string;
    message: string;
  }) => {
    try {
      setSubmitStatus('loading');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setSubmitStatus('error');
        setErrorMessage(result.message || 'エラーが発生しました');
        return;
      }

      setSubmitStatus('success');
      setIsSubmitted(true);
      reset();

      setTimeout(() => {
        setIsSubmitted(false);
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('フォーム送信中にエラーが発生しました。時間をおいて再度お試しください。');
    }
  };

  return (
    <section id='contact' className={`section ${styles.contact}`} ref={sectionRef}>
      <div className='container'>
        <motion.h2
          className='section-title'
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={slideUp}
        >
          お問い合わせ
        </motion.h2>

        <div className={styles.formContainer}>
          {isSubmitted ? (
            <div className={styles.thankYouMessage}>
              <h3>お問い合わせありがとうございます</h3>
              <p>内容を確認次第、担当者よりご連絡いたします。</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label htmlFor='name' className={styles.label}>
                  お名前 <span className={styles.required}>*</span>
                </label>
                <input
                  id='name'
                  type='text'
                  className={styles.input}
                  placeholder='山田 太郎'
                  disabled={submitStatus === 'loading'}
                  {...register('name', { required: 'お名前を入力してください' })}
                />
                <p className={errors.name ? styles.errorMessage : styles.hidden}>{errors.name?.message ?? 'error'}</p>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor='company' className={styles.label}>
                  会社名 <span className={styles.optional}>(任意)</span>
                </label>
                <input
                  id='company'
                  type='text'
                  className={styles.input}
                  placeholder='株式会社サンプル'
                  disabled={submitStatus === 'loading'}
                  {...register('company')}
                />
                <p className={styles.hidden}>{'error'}</p>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor='email' className={styles.label}>
                  メールアドレス <span className={styles.required}>*</span>
                </label>
                <input
                  id='email'
                  type='email'
                  className={styles.input}
                  placeholder='example@email.com'
                  disabled={submitStatus === 'loading'}
                  {...register('email', {
                    required: 'メールアドレスを入力してください',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: '有効なメールアドレスを入力してください',
                    },
                  })}
                />
                <p className={errors.email ? styles.errorMessage : styles.hidden}>{errors.email?.message ?? 'error'}</p>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor='message' className={styles.label}>
                  お問い合わせ内容 <span className={styles.required}>*</span>
                </label>
                <textarea
                  id='message'
                  className={styles.textarea}
                  placeholder='ご質問やお問い合わせ内容をご記入ください'
                  rows={5}
                  disabled={submitStatus === 'loading'}
                  {...register('message', { required: 'お問い合わせ内容を入力してください' })}
                ></textarea>
                <p className={errors.message ? styles.errorMessage : styles.hidden}>{errors.message?.message ?? 'error'}</p>
              </div>

              {submitStatus === 'error' && (
                <div className={styles.errorMessage}>
                  <p>{errorMessage || 'エラーが発生しました。時間をおいて再度お試しください。'}</p>
                </div>
              )}

              <div className={styles.formActions}>
                <button
                  type='submit'
                  className={`btn btn-primary ${styles.submitButton}`}
                  disabled={submitStatus === 'loading'}
                >
                  {submitStatus === 'loading' ? '送信中...' : '送信する'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};