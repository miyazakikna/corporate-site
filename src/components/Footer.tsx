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
        { label: 'FIT KARTE', href: '/#service' },
        { label: 'WITH TRAINER', href: '/#service' },
        { label: 'IT SOLUTIONS', href: '/#service' },
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
    <footer className="bg-secondary text-white pt-40 pb-20">
      <div className="mx-auto max-w-6xl px-8 md:px-12">

        <div className="flex justify-between gap-8">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="inline-block">
              <img
                src="/logo.png"
                alt="Amelio Inc."
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
          </motion.div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-12">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-6">
                <h3 className="text-[10px] tracking-[0.3em] text-white/20 uppercase font-heading font-bold">
                  {section.title}
                </h3>

                <nav className="flex flex-col space-y-4">
                  {section.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors duration-300 font-medium"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}

          </div>
        </div>

        <div className="mt-24 border-t border-white/5" />

        <div className="mt-10 flex justify-center items-center">
          <p className="text-[10px] text-white/20 tracking-[0.2em] font-heading uppercase">
            &copy; {new Date().getFullYear()} Amelio Inc. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}