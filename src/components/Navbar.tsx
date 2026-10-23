'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { storeInfo } from '@/data/storeInfo';
import { Menu, X, Phone, Heart, CreditCard, ArrowUpRight } from 'lucide-react';

function NavbarContent() {
  const { lang, setLang, favorites } = useApp();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/catalog', labelEn: 'Catalog', labelRu: 'Каталог' },
    { href: '/payment-info', labelEn: 'Payment Methods', labelRu: 'Способы оплаты' },
    { href: '/delivery', labelEn: 'Global Delivery', labelRu: 'Доставка' },
    { href: '/cancellation', labelEn: 'Order Cancellation', labelRu: 'Отмена заказа' },
    { href: '/returns', labelEn: 'Warranty & Care', labelRu: 'Возврат и гарантия' },
    { href: '/security', labelEn: 'Security', labelRu: 'Безопасность' },
    { href: '/contacts', labelEn: 'Showrooms', labelRu: 'Шоурумы' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Topbar */}
      <div className="bg-[#eef0e7] text-[#5c6859] text-[11px] border-b border-[#e2e7da] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#527d49] inline-block animate-pulse"></span>
            <span>
              {lang === 'en' ? storeInfo.cityEn : storeInfo.cityRu}
            </span>
            <span className="text-[#aab3a4] hidden sm:inline">·</span>
            <span className="hidden sm:inline text-[#6d7966]">
              {lang === 'en' ? storeInfo.taglineEn : storeInfo.taglineRu}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[#6d7966]">
            <a
              href={`tel:${storeInfo.phone}`}
              className="hover:text-[#222b23] transition-colors flex items-center gap-1 font-medium"
            >
              <Phone className="w-3 h-3 text-[#314b35]" />
              <span>{storeInfo.phoneDisplay}</span>
            </a>
            <span className="text-[#aab3a4]">·</span>
            <span className="font-semibold text-[#314b35]">$ USD</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#fcfcf9]/95 backdrop-blur-md border-b border-[#e8e9e2] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <svg
              className="w-8 h-11 text-[#314b35] transition-transform duration-200 group-hover:scale-105"
              viewBox="0 0 64 88"
              fill="none"
              aria-hidden="true"
            >
              <path
                className="stroke-current"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 38V14C5 7.9 9.9 3 16 3h32c6.1 0 11 4.9 11 11v24"
              />
              <path
                d="M22 3h20v4a2 2 0 0 1-2 2H24a2 2 0 0 1-2-2Z"
                fill="currentColor"
              />
              <path
                className="stroke-current"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 43h54v29c0 6.1-4.9 11-11 11H16C9.9 83 5 78.1 5 72V43Z"
              />
              <path
                className="stroke-current"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 43c3-8.7 8.1-13 15-13s12 4.3 15 13"
              />
            </svg>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-2xl tracking-tight text-[#222b23] leading-none flex items-center">
                AURA<span className="text-[#314b35]">.</span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#527d49] uppercase leading-tight">
                MOBILE
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors relative py-2 ${
                    active
                      ? 'text-[#314b35] font-semibold'
                      : 'text-[#707968] hover:text-[#222b23]'
                  }`}
                >
                  <span>{lang === 'en' ? link.labelEn : link.labelRu}</span>
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#314b35] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            {/* Favorites link */}
            <Link
              href="/catalog?favorites=true"
              aria-label={lang === 'en' ? 'Saved Devices' : 'Избранное'}
              className="relative p-2.5 rounded-lg border border-[#e8e9e2] text-[#707968] hover:text-[#314b35] hover:border-[#cfd5c7] hover:bg-[#f0f2e9] transition-all"
            >
              <Heart className="w-4 h-4" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#314b35] text-white text-[10px] font-bold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Language Switcher: EN / RU */}
            <div className="flex items-center bg-[#f0f2e9] border border-[#e2e7da] rounded-lg p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded transition-all ${
                  lang === 'en'
                    ? 'bg-[#314b35] text-white shadow-xs'
                    : 'text-[#707968] hover:text-[#222b23]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('ru')}
                className={`px-2 py-1 rounded transition-all ${
                  lang === 'ru'
                    ? 'bg-[#314b35] text-white shadow-xs'
                    : 'text-[#707968] hover:text-[#222b23]'
                }`}
              >
                RU
              </button>
            </div>

            {/* Express Checkout CTA */}
            <Link
              href="/payment"
              className="hidden sm:inline-flex items-center gap-2 bg-[#314b35] text-white hover:bg-[#243c28] text-xs font-medium px-4 py-2.5 rounded-lg transition-all shadow-xs button-hover-arrow"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Checkout' : 'Оформить'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70 transition-transform duration-200" />
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-[#e8e9e2] text-[#222b23] hover:bg-[#f0f2e9]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#e8e9e2] bg-[#fcfcf9] px-4 pt-3 pb-6 animate-fade-in-up">
            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium ${
                  pathname === '/'
                    ? 'bg-[#314b35] text-white'
                    : 'text-[#707968] hover:bg-[#f0f2e9] hover:text-[#222b23]'
                }`}
              >
                {lang === 'en' ? 'Home' : 'Главная'}
              </Link>
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                      active
                        ? 'bg-[#314b35] text-white font-semibold'
                        : 'text-[#707968] hover:bg-[#f0f2e9] hover:text-[#222b23]'
                    }`}
                  >
                    <span>{lang === 'en' ? link.labelEn : link.labelRu}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-50" />
                  </Link>
                );
              })}
              <div className="pt-3 mt-2 border-t border-[#e8e9e2] flex flex-col gap-2">
                <Link
                  href="/payment"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 bg-[#314b35] text-white font-medium text-xs rounded-lg transition-colors"
                >
                  {lang === 'en' ? 'Secure Checkout' : 'Безопасная оплата'}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

export function Navbar() {
  return (
    <Suspense fallback={<div className="h-20 bg-[#fcfcf9]" />}>
      <NavbarContent />
    </Suspense>
  );
}
