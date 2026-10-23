'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { PolicyDocument } from '@/data/policies';
import { storeInfo } from '@/data/storeInfo';
import { Home, ChevronRight, ShieldCheck, Phone, Mail, CreditCard } from 'lucide-react';

interface PolicyLayoutProps {
  policy: PolicyDocument;
  children?: React.ReactNode;
}

function PolicyLayoutContent({ policy, children }: PolicyLayoutProps) {
  const { lang } = useApp();
  const pathname = usePathname();

  const navLinks = [
    { href: '/offer', titleEn: 'Terms of Sale & Offer', titleRu: 'Публичная оферта' },
    { href: '/payment-info', titleEn: 'Payment Methods', titleRu: 'Способы оплаты' },
    { href: '/delivery', titleEn: 'Worldwide Delivery', titleRu: 'Условия доставки' },
    { href: '/cancellation', titleEn: 'Order Cancellation', titleRu: 'Отмена заказа' },
    { href: '/returns', titleEn: 'Returns & Exchange', titleRu: 'Возврат и обмен' },
    { href: '/security', titleEn: 'Payment Security', titleRu: 'Безопасность оплаты' },
    { href: '/privacy', titleEn: 'Privacy Policy', titleRu: 'Конфиденциальность' },
    { href: '/support', titleEn: 'Claims & Support', titleRu: 'Претензии и поддержка' },
    { href: '/contacts', titleEn: 'Showrooms & Contacts', titleRu: 'Контакты и шоурумы' },
  ];

  const title = lang === 'en' ? (policy.titleEn || policy.titleRu) : policy.titleRu;
  const intro = lang === 'en' ? (policy.introEn || policy.introRu) : policy.introRu;
  const sections = lang === 'en' ? (policy.sectionsEn || policy.sectionsRu) : policy.sectionsRu;

  return (
    <div className="py-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#707968] mb-8">
        <Link href="/" className="hover:text-[#314b35] flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span>{lang === 'en' ? 'Home' : 'Главная'}</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#a6b09e]" />
        <span className="font-semibold text-[#222b23] line-clamp-1">{title}</span>
      </nav>

      {/* Main Grid: Sidebar + Document */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Navigation */}
        <aside className="lg:col-span-4 bg-[#f7f8f3] border border-[#e8e9e2] rounded-2xl p-5 sticky top-24">
          <span className="text-[10px] font-bold text-[#5c6e51] uppercase tracking-wider block mb-3">
            {lang === 'en' ? 'LEGAL & POLICIES' : 'ПРАВОВЫЕ ДОКУМЕНТЫ'}
          </span>
          <nav className="flex flex-col gap-1 text-xs">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`p-2.5 rounded-xl font-medium transition-all flex items-center justify-between ${
                    active
                      ? 'bg-[#314b35] text-white shadow-xs font-semibold'
                      : 'text-[#707968] hover:bg-white hover:text-[#222b23]'
                  }`}
                >
                  <span>{lang === 'en' ? link.titleEn : link.titleRu}</span>
                  <ChevronRight className={`w-3.5 h-3.5 ${active ? 'text-white' : 'opacity-40'}`} />
                </Link>
              );
            })}
          </nav>

          {/* Quick contact mini widget */}
          <div className="mt-6 pt-5 border-t border-[#e5e8de] text-xs text-[#707968] space-y-2">
            <span className="font-bold text-[#222b23] block text-[11px] uppercase tracking-wider">
              {lang === 'en' ? 'Concierge Hotline:' : 'Оперативная связь:'}
            </span>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#314b35]" />
              <a href={`tel:${storeInfo.phone}`} className="hover:text-[#222b23] font-medium">
                {storeInfo.phoneDisplay}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#314b35]" />
              <a href={`mailto:${storeInfo.email}`} className="hover:text-[#222b23]">
                {storeInfo.email}
              </a>
            </div>
          </div>
        </aside>

        {/* Right Policy Document */}
        <article className="lg:col-span-8 bg-white border border-[#e8e9e2] rounded-3xl p-6 sm:p-10 shadow-xs">
          {/* Header */}
          <div className="border-b border-[#eff1e9] pb-6 mb-8">
            <span className="text-[11px] font-bold tracking-widest text-[#5c6e51] uppercase block mb-1">
              AURA MOBILE · {lang === 'en' ? 'CLIENT ASSURANCE' : 'ДЛЯ ПОКУПАТЕЛЕЙ'}
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#222b23] tracking-tight mb-3">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-[#707968] leading-relaxed">
              {intro}
            </p>

            {/* Model Terms Disclaimer */}
            <div className="mt-4 p-3.5 bg-[#f5f7f2] border border-[#dce2d4] rounded-xl text-xs text-[#485945] flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#314b35] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#273d2a] font-semibold">
                  {lang === 'en' ? 'Global Regulatory Framework & Buyer Safeguards' : 'Типовые правила и правовая основа'}
                </strong>
                <p className="text-[11px] text-[#5c6d59] mt-0.5 leading-relaxed">
                  {lang === 'en'
                    ? 'This policy is formulated in accordance with international consumer protection standards, PCI-DSS Level 1 specifications, and distance-selling practices. All digital transactions are protected by bank-grade TLS 1.3 encryption.'
                    : 'Настоящий документ разработан на основе международных стандартов электронной коммерции, требований PCI-DSS Level 1 и регламентов дистанционной торговли. Все онлайн-транзакции защищены протоколом TLS 1.3.'}
                </p>
              </div>
            </div>
          </div>

          {/* Document Content Sections */}
          <div className="space-y-8 text-xs sm:text-sm text-[#3b4238] leading-relaxed">
            {sections.map((sec, idx) => (
              <section key={idx} className="scroll-mt-28">
                <h2 className="font-heading font-bold text-base sm:text-lg text-[#222b23] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#eef2e7] text-[#314b35] text-xs font-black flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span>{sec.title}</span>
                </h2>
                <div className="space-y-2 pl-8">
                  {sec.content.map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-[#555d51] leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Optional custom children (e.g. Cancellation Form or interactive tools) */}
          {children && <div className="mt-8">{children}</div>}

          {/* Bottom Card / System badges */}
          <div className="mt-10 pt-6 border-t border-[#eff1e9] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#8c9484]">
              {lang === 'en' ? 'Last Updated:' : 'Дата последней редакции:'}{' '}
              <strong className="text-[#222b23]">2026</strong>
            </span>

            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-[#f7f8f3] border border-[#e2e7da] text-[11px] font-bold text-[#222b23] flex items-center gap-1">
                Pay
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#f7f8f3] border border-[#e2e7da] text-[11px] font-bold text-[#222b23]">
                GPay
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#f7f8f3] border border-[#e2e7da] text-[11px] font-extrabold text-[#1a1f71] italic">
                VISA
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#f7f8f3] border border-[#e2e7da] text-[11px] font-bold text-[#eb001b]">
                Mastercard
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#f7f8f3] border border-[#e2e7da] text-[11px] font-bold text-[#006fcf]">
                AMEX
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export function PolicyLayout(props: PolicyLayoutProps) {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-[#707968]">Loading documentation...</div>}>
      <PolicyLayoutContent {...props} />
    </Suspense>
  );
}
