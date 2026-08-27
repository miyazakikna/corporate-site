'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';
import SubPageHeader from '@/components/SubPageHeader';
import { submitContactForm } from '@/libs/email';
import { ContactForm } from '@/types';

export const Contact = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<{
    name: string;
    company?: string;
    email: string;
    inquiryType: string;
    message: string;
    notSales: boolean;
  }>({
    defaultValues: {
      inquiryType: '業務支援のご相談',
      notSales: false,
    }
  });

  useEffect(() => {
    const inquiryType = new URLSearchParams(window.location.search).get('type');
    if (inquiryType === 'it-partner') {
      setValue('inquiryType', '業務支援のご相談');
    }
  }, [setValue]);

  useEffect(() => {
    if (submitStatus === 'success') {
      sectionRef.current?.scrollIntoView({ block: 'start', behavior: 'auto' });
    }
  }, [submitStatus]);

  const inquiryTypes = [
    '業務支援のご相談',
    'FIT KARTE について',
    'WITH TRAINER について',
    'パートナーシップ・協業のご相談',
    '採用について',
    'その他のお問い合わせ',
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

      <section className="scroll-mt-20 py-6 md:scroll-mt-24 md:py-10" ref={sectionRef}>
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
                {/* 営業・セールスお断りバナー */}
                <div className="mb-8 rounded-2xl border border-amber-200/90 bg-amber-50/70 p-4 sm:p-5 text-amber-900 shadow-xs">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-amber-950">
                        営業・勧誘・セールス等のご提案を目的としたご連絡は固くお断りいたします
                      </h4>
                      <p className="mt-1 text-[11px] sm:text-xs leading-relaxed text-amber-800">
                        当フォームはお客様からのご相談・お問い合わせ専用窓口です。営業・勧誘・セールス等のメッセージを送信いただきましても、返信および対応は一切いたしかねます。
                      </p>
                    </div>
                  </div>
                </div>

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
                        className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.name ? 'border-red' : 'border-slate-200'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 placeholder:text-slate-400 text-slate-700`}
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
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 placeholder:text-slate-400 text-slate-700"
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
                        className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.email ? 'border-red' : 'border-slate-200'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 placeholder:text-slate-400 text-slate-700`}
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
                      className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.message ? 'border-red' : 'border-slate-200'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 placeholder:text-slate-400 text-slate-700 resize-none leading-relaxed`}
                      placeholder="ご相談内容の詳細をご記入ください。&#10;（例：業務の効率化について相談したい、Webサイト制作やアプリ開発の概算費用を知りたい、FIT KARTEの導入を検討している、など。ざっくばらんな内容で構いません。）"
                      {...register('message', { required: 'お問い合わせ内容を入力してください' })}
                    ></textarea>
                    {errors.message && <p className="text-red text-xs mt-1 ml-1">{errors.message.message}</p>}
                  </div>

                  {/* 営業目的ではない確認チェックボックス */}
                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 sm:p-5">
                    <label className="flex items-start gap-3 cursor-pointer group select-none">
                      <input
                        type="checkbox"
                        id="notSales"
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/20 cursor-pointer shrink-0"
                        {...register('notSales', {
                          required: '営業・セールス目的ではないことのご確認にチェックをお願いいたします',
                        })}
                      />
                      <span className="text-xs sm:text-sm font-bold text-secondary leading-snug">
                        営業・勧誘・セールス目的のお問い合わせではないことを確認しました
                        <span className="bg-red/10 text-red text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ml-2">必須</span>
                      </span>
                    </label>
                    {errors.notSales && (
                      <p className="text-red text-xs mt-2 ml-7">{errors.notSales.message}</p>
                    )}
                  </div>

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red/5 border border-red/20 rounded-2xl text-red text-sm">
                      {errorMessage || 'エラーが発生しました。時間をおいて再度お試しください。'}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitStatus === 'loading'}
                      className="w-full inline-flex items-center justify-center px-10 py-4.5 bg-gradient-to-r from-primary via-[#0055b3] to-primary bg-[length:200%_auto] text-white font-black tracking-widest text-base rounded-full hover:bg-right disabled:bg-slate-300 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_12px_28px_rgba(0,102,204,0.25)] hover:shadow-[0_16px_36px_rgba(0,102,204,0.35)] cursor-pointer"
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
                    <p className="text-[11px] text-slate-400 text-center mt-6">
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
