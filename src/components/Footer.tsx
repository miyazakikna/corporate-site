'use client'

import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Service',
      links: [
        { label: 'FIT KARTE', href: 'https://fit-karte.com' },
        { label: 'WITH TRAINER', href: 'https://with-trainer.com' },
        // { label: 'IT SOLUTIONS', href: '/#service' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: '会社概要', href: '/company' },
        { label: 'ニュース', href: '/#news' },
        { label: 'プライバシーポリシー', href: '/privacy-policy' },
      ],
    }
  ];

  return (
    <footer className="bg-secondary text-white pt-24 md:pt-40 pb-12 md:pb-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12">

        <div className="flex flex-col md:flex-row justify-between gap-16 md:gap-8">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-start md:block"
          >
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/brand-logo.png"
                alt="Amelio Logo"
                className="h-8 md:h-10 w-auto"
              />
              <img
                src="/brand-text.png"
                alt="Amelio"
                className="h-8 md:h-10 w-auto"
              />
            </Link>
          </motion.div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:gap-12">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-6">
                <h3 className="text-[10px] tracking-[0.3em] text-white/60 uppercase font-heading font-bold">
                  {section.title}
                </h3>

                <nav className="flex flex-col space-y-4">
                  {section.links.map((link) => {
                    const isExternal = link.href.startsWith('http');
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="text-sm text-white/80 hover:text-white transition-colors duration-300 font-medium whitespace-nowrap flex items-center gap-1.5 group/link"
                      >
                        {link.label}
                        {isExternal && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-40 group-hover/link:opacity-100 transition-opacity"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}

          </div>
        </div>

        <div className="mt-16 md:mt-24 border-t border-white/5" />

        <div className="mt-8 md:mt-10 flex justify-center items-center">
          <p className="text-[10px] text-white/20 tracking-[0.2em] font-heading uppercase">
            &copy; {currentYear} Amelio Inc. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}