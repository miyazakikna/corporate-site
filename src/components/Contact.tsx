'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
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
    <section id='contact' className="section bg-light-gray relative pb-xxl" ref={sectionRef}>
      <div className='container'>
        <motion.h2
          className='section-title'
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={slideUp}
        >
          お問い合わせ
        </motion.h2>

        <div className="w-full max-w-[800px] mx-auto bg-white rounded-md shadow-md p-sm md:p-lg">
          {isSubmitted ? (
            <div className="text-center py-xl">
              <h3 className="text-xl text-primary mb-md font-bold">お問い合わせありがとうございます</h3>
              <p className="text-base text-dark-gray">内容を確認次第、担当者よりご連絡いたします。</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-xxs">
              <div className="flex flex-col gap-xs">
                <label htmlFor='name' className="font-medium text-secondary text-sm md:text-base flex items-center gap-xxs">
                  お名前 <span className="text-red text-sm">*</span>
                </label>
                <input
                  id='name'
                  type='text'
                  className="w-full p-xs md:p-sm border border-gray rounded-md font-sans text-base bg-white transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-dark-gray/60 placeholder:text-sm md:placeholder:text-base"
                  placeholder='山田 太郎'
                  disabled={submitStatus === 'loading'}
                  {...register('name', { required: 'お名前を入力してください' })}
                />
                <p className={errors.name ? "text-red text-sm" : "text-sm invisible"}>{errors.name?.message ?? 'error'}</p>
              </div>

              <div className="flex flex-col gap-xs">
                <label htmlFor='company' className="font-medium text-secondary text-sm md:text-base flex items-center gap-xxs">
                  会社名 <span className="text-gray text-sm">(任意)</span>
                </label>
                <input
                  id='company'
                  type='text'
                  className="w-full p-xs md:p-sm border border-gray rounded-md font-sans text-base bg-white transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-dark-gray/60 placeholder:text-sm md:placeholder:text-base"
                  placeholder='株式会社サンプル'
                  disabled={submitStatus === 'loading'}
                  {...register('company')}
                />
                <p className="text-sm invisible">{'error'}</p>
              </div>

              <div className="flex flex-col gap-xs">
                <label htmlFor='email' className="font-medium text-secondary text-sm md:text-base flex items-center gap-xxs">
                  メールアドレス <span className="text-red text-sm">*</span>
                </label>
                <input
                  id='email'
                  type='email'
                  className="w-full p-xs md:p-sm border border-gray rounded-md font-sans text-base bg-white transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-dark-gray/60 placeholder:text-sm md:placeholder:text-base"
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
                <p className={errors.email ? "text-red text-sm" : "text-sm invisible"}>{errors.email?.message ?? 'error'}</p>
              </div>

              <div className="flex flex-col gap-xs">
                <label htmlFor='message' className="font-medium text-secondary text-sm md:text-base flex items-center gap-xxs">
                  お問い合わせ内容 <span className="text-red text-sm">*</span>
                </label>
                <textarea
                  id='message'
                  className="w-full p-xs md:p-sm border border-gray rounded-md font-sans text-base bg-white transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-dark-gray/60 placeholder:text-sm md:placeholder:text-base resize-y min-h-[120px]"
                  placeholder='ご質問やお問い合わせ内容をご記入ください'
                  rows={5}
                  disabled={submitStatus === 'loading'}
                  {...register('message', { required: 'お問い合わせ内容を入力してください' })}
                ></textarea>
                <p className={errors.message ? "text-red text-sm" : "text-sm invisible"}>{errors.message?.message ?? 'error'}</p>
              </div>

              {submitStatus === 'error' && (
                <div className="text-red text-sm">
                  <p>{errorMessage || 'エラーが発生しました。時間をおいて再度お試しください。'}</p>
                </div>
              )}

              <div className="flex justify-center mt-md md:mt-lg">
                <button
                  type='submit'
                  className="btn btn-primary min-w-[200px] disabled:bg-gray disabled:cursor-not-allowed"
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