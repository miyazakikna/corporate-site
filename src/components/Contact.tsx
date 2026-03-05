'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import SubPageHeader from '@/components/SubPageHeader';
import { submitContactForm } from '@/libs/email';
import { ContactForm } from '@/types';

export const Contact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<{
    name: string;
    company?: string;
    email: string;
    inquiryType: string;
    message: string;
  }>({
    defaultValues: {
      inquiryType: 'WEB・システム開発のご相談'
    }
  });

  const inquiryTypes = [
    'FIT KARTE について',
    'WITH TRAINER について',
    'WEB・システム開発のご相談',
    'パートナーシップ・協業のご相談',
    '採用について',
    'その他',
  ];

  const onSubmit = async (data: {
    name: string;
    company?: string;
    email: string;
    inquiryType: string;
    message: string;
  }) => {
    try {
      setSubmitStatus('loading');

      const result = await submitContactForm(data);

      if (!result.success) {
        setSubmitStatus('error');
        setErrorMessage(result.message || 'エラーが発生しました');
        return;
      }

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('フォーム送信中にエラーが発生しました。時間をおいて再度お試しください。');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SubPageHeader
        title="お問い合わせ"
        titleEn="CONTACT"
        crumbs={[
          { label: 'TOP', href: '/' },
          { label: 'お問い合わせ' },
        ]}
      />

      <section className="py-6 md:py-10" ref={sectionRef}>
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-white "
          >
            {submitStatus === 'success' ? (
              <div className="text-center py-20 px-10">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-4 font-heading">お問い合わせありがとうございます</h3>
                <p className="text-slate-500 leading-relaxed mx-auto text-sm md:text-base">
                  内容を受け付けました。担当者より順次ご連絡させていただきます。<br />
                  自動返信メールもお送りしておりますので、ご確認ください。
                </p>
                <div className="mt-12">
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="inline-flex items-center justify-center px-12 py-4 bg-secondary text-white font-bold rounded-full hover:bg-secondary/90 transition-all duration-300 tracking-widest text-sm"
                  >
                    フォームに戻る
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-8 md:py-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* お名前 */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-bold text-secondary flex items-center gap-2">
                        お名前 <span className="bg-red/10 text-red text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">必須</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.name ? 'border-red' : 'border-slate-200'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 placeholder:text-slate-300 text-slate-700`}
                        placeholder="山田 太郎"
                        autoComplete="name"
                        {...register('name', { required: 'お名前を入力してください' })}
                      />
                      {errors.name && <p className="text-red text-xs mt-1 ml-1">{errors.name.message}</p>}
                    </div>

                    {/* 会社名 */}
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-bold text-secondary flex items-center gap-2">
                        会社名 <span className="bg-slate-100 text-slate-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">任意</span>
                      </label>
                      <input
                        id="company"
                        type="text"
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 placeholder:text-slate-300 text-slate-700"
                        placeholder="株式会社サンプル"
                        autoComplete="organization"
                        {...register('company')}
                      />
                    </div>

                    {/* メールアドレス */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-bold text-secondary flex items-center gap-2">
                        メールアドレス <span className="bg-red/10 text-red text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">必須</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.email ? 'border-red' : 'border-slate-200'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 placeholder:text-slate-300 text-slate-700`}
                        placeholder="example@email.com"
                        autoComplete="email"
                        {...register('email', {
                          required: 'メールアドレスを入力してください',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: '有効なメールアドレスを入力してください',
                          },
                        })}
                      />
                      {errors.email && <p className="text-red text-xs mt-1 ml-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  {/* 用件選択 */}
                  <div className="space-y-2">
                    <label htmlFor="inquiryType" className="text-sm font-bold text-secondary flex items-center gap-2">
                      ご用件 <span className="bg-red/10 text-red text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">必須</span>
                    </label>
                    <div className="relative">
                      <select
                        id="inquiryType"
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 appearance-none text-slate-700"
                        {...register('inquiryType', { required: '用件を選択してください' })}
                      >
                        {inquiryTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* メッセージ */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold text-secondary flex items-center gap-2">
                      お問い合わせ内容 <span className="bg-red/10 text-red text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">必須</span>
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.message ? 'border-red' : 'border-slate-200'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 placeholder:text-slate-300 text-slate-700 resize-none`}
                      placeholder="ご相談内容の詳細をご記入ください"
                      {...register('message', { required: 'お問い合わせ内容を入力してください' })}
                    ></textarea>
                    {errors.message && <p className="text-red text-xs mt-1 ml-1">{errors.message.message}</p>}
                  </div>

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red/5 border border-red/20 rounded-2xl text-red text-sm">
                      {errorMessage || 'エラーが発生しました。時間をおいて再度お試しください。'}
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={submitStatus === 'loading'}
                      className="w-full inline-flex items-center justify-center px-10 py-5 bg-secondary text-white font-bold tracking-[0.2em] text-base rounded-full hover:bg-secondary/90 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-black/5"
                    >
                      {submitStatus === 'loading' ? (
                        <span className="flex items-center gap-3">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          送信中...
                        </span>
                      ) : (
                        "同意して送信する"
                      )}
                    </button>
                    <p className="text-[11px] text-slate-400 text-center mt-8">
                      ※送信いただいた内容は、弊社のプライバシーポリシーに従い厳重に管理されます。<br className="hidden md:block" />
                      お問い合わせ送信により、各規約に同意したものとみなされます。
                    </p>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};