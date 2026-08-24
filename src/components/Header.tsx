'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  ExternalLink,
  Mail,
} from 'lucide-react';

type ServiceItem = {
  title: string;
  description: string;
  href: string;
  isExternal?: boolean;
};

const serviceItems: ServiceItem[] = [
  {
    title: 'FIT KARTE',
    description: 'フィットネスジム向け統合管理プラットフォーム',
    href: 'https://fit-karte.com',
    isExternal: true,
  },
  {
    title: 'WITH TRAINER',
    description: 'トレーナー特化のブランディング・集客支援',
    href: 'https://with-trainer.com',
    isExternal: true,
  },
  {
    title: '業務支援',
    description: '経営やITの困りごとを現場目線でまるごと伴走',
    href: '/it-partner',
    isExternal: false,
  },
];

const navLinks = [
  { label: '会社概要', href: '/company' },
  { label: '代表について', href: '/profile/miyazaki' },
];

export function Header() {
  const pathname = usePathname();
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // スクロール検知：一番上(scrollY <= 50)では非表示、スクロールでヘッダー表示
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ページ遷移時にモバイルメニュー & ドロップダウンを閉じる
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServiceOpen(false);
  }, [pathname]);

  // ドロップダウン外クリック検知
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServiceOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // モバイルメニューオープン時は背景スクロールを抑止
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 w-full bg-[#011627]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-white"
          >
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-16 md:px-10">
              {/* Brand Logo (アイコン + 画像テキスト) */}
              <Link
                href="/"
                aria-label="株式会社Amelio トップページ"
                className="group flex items-center gap-2 transition-transform duration-200 hover:scale-[0.98]"
              >
                <img
                  src="/brand-logo.png"
                  alt="Amelio Logo"
                  className="h-6 w-auto object-contain md:h-7"
                />
                <img
                  src="/brand-text.png"
                  alt="Amelio"
                  className="h-5 w-auto object-contain md:h-6"
                />
              </Link>

              {/* Desktop Navigation */}
              <nav aria-label="メインナビゲーション" className="hidden items-center gap-7 lg:flex">
                {/* Service Dropdown */}
                <div
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setIsServiceOpen(true)}
                  onMouseLeave={() => setIsServiceOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setIsServiceOpen(!isServiceOpen)}
                    className={`flex items-center gap-1.5 py-2 text-sm font-bold tracking-wide transition-colors cursor-pointer ${
                      isServiceOpen || pathname === '/it-partner'
                        ? 'text-primary-light'
                        : 'text-white/80 hover:text-primary-light'
                    }`}
                    aria-expanded={isServiceOpen}
                    aria-haspopup="true"
                  >
                    <span>サービス</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isServiceOpen ? 'rotate-180 text-primary-light' : 'text-slate-400'
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isServiceOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute left-1/2 top-full -translate-x-1/2 pt-2 w-[380px]"
                      >
                        <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#031d33]/95 p-3 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
                          <div className="mb-2 px-3 pt-1 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                            サービス一覧
                          </div>
                          <div className="grid grid-cols-1 gap-1">
                            {serviceItems.map((item) => {
                              const isCurrent = !item.isExternal && pathname === item.href;
                              return (
                                <Link
                                  key={item.title}
                                  href={item.href}
                                  target={item.isExternal ? '_blank' : undefined}
                                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                                  className={`group flex items-center justify-between rounded-xl px-3.5 py-2.5 transition-all ${
                                    isCurrent
                                      ? 'bg-primary/20 text-primary-light border border-primary/30'
                                      : 'hover:bg-white/5 text-white border border-transparent'
                                  }`}
                                >
                                  <div>
                                    <span className="text-sm font-bold tracking-tight text-white group-hover:text-primary-light transition-colors">
                                      {item.title}
                                    </span>
                                    <p className="mt-0.5 text-xs text-slate-400 line-clamp-1">
                                      {item.description}
                                    </p>
                                  </div>
                                  {item.isExternal && (
                                    <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-primary-light transition-colors shrink-0 ml-2" />
                                  )}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Regular Nav Links */}
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`py-2 text-sm font-bold tracking-wide transition-colors ${
                        isActive
                          ? 'text-primary-light'
                          : 'text-white/80 hover:text-primary-light'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                {/* Contact CTA Button */}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-white shadow-[0_4px_14px_rgba(0,102,204,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-[0_6px_20px_rgba(0,102,204,0.5)] md:text-sm"
                >
                  <span>お問い合わせ</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </nav>

              {/* Mobile Hamburger Button */}
              <div className="flex items-center lg:hidden">
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
                  aria-label={isMobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Menu (ヘッダーの真下にスライドダウン表示) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ position: 'fixed', top: '56px', left: 0, right: 0, bottom: 0 }}
              className="z-40 bg-black/60 backdrop-blur-xs lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                position: 'fixed',
                top: '56px',
                left: 0,
                right: 0,
                width: '100%',
                maxWidth: '100vw',
                boxSizing: 'border-box',
              }}
              className="z-50 max-h-[calc(100vh-3.5rem)] overflow-y-auto border-b border-white/10 bg-[#011627] px-5 py-6 shadow-2xl text-white lg:hidden"
            >
              <div className="w-full max-w-[480px] mx-auto space-y-5" style={{ width: '100%' }}>
                {/* Services Section */}
                <div className="w-full" style={{ width: '100%' }}>
                  <div className="mb-2.5 text-xs font-bold tracking-widest text-slate-400 uppercase">
                    サービス
                  </div>
                  <div className="w-full space-y-2" style={{ width: '100%' }}>
                    {serviceItems.map((item) => {
                      const isCurrent = !item.isExternal && pathname === item.href;
                      return (
                        <Link
                          key={item.title}
                          href={item.href}
                          target={item.isExternal ? '_blank' : undefined}
                          rel={item.isExternal ? 'noopener noreferrer' : undefined}
                          onClick={() => setIsMobileMenuOpen(false)}
                          style={{ width: '100%', display: 'flex' }}
                          className={`w-full items-center justify-between rounded-xl border p-4 transition-colors ${
                            isCurrent
                              ? 'border-primary/50 bg-primary/20 text-primary-light'
                              : 'border-white/10 bg-white/5 text-white active:bg-white/10'
                          }`}
                        >
                          <div className="flex-1 min-w-0 pr-3">
                            <div className="text-sm font-bold text-white tracking-wide whitespace-nowrap">
                              {item.title}
                            </div>
                            <div className="mt-1 text-xs text-slate-400 leading-normal">
                              {item.description}
                            </div>
                          </div>
                          {item.isExternal ? (
                            <ExternalLink className="h-4 w-4 shrink-0 text-slate-400 ml-2" />
                          ) : (
                            <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 ml-2" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Company & Profile */}
                <div className="w-full" style={{ width: '100%' }}>
                  <div className="mb-2.5 text-xs font-bold tracking-widest text-slate-400 uppercase">
                    会社情報
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 w-full" style={{ width: '100%' }}>
                    {navLinks.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          style={{ width: '100%', display: 'flex' }}
                          className={`w-full items-center justify-between rounded-xl border p-3.5 transition-colors ${
                            isActive
                              ? 'border-primary/50 bg-primary/20 text-primary-light'
                              : 'border-white/10 bg-white/5 text-white active:bg-white/10'
                          }`}
                        >
                          <span className="text-sm font-bold whitespace-nowrap">{link.label}</span>
                          <ArrowRight className="h-3.5 w-3.5 text-slate-400 shrink-0 ml-1" />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Contact CTA in Menu */}
                <div className="pt-2 w-full" style={{ width: '100%' }}>
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ width: '100%', display: 'flex' }}
                    className="w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-lg transition-transform active:scale-[0.99]"
                  >
                    <Mail className="h-4 w-4" />
                    <span>お問い合わせはこちら</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
