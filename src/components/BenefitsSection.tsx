'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ShieldCheck, Truck, CreditCard, Sparkles } from 'lucide-react';

export function BenefitsSection() {
  const { lang } = useApp();

  const benefits = [
    {
      icon: Sparkles,
      titleEn: 'Curated Flagships',
      titleRu: 'Флагманская коллекция',
      descEn: 'Official Apple, Samsung & Xiaomi devices',
      descRu: 'Оригинальные флагманы Apple, Samsung и Xiaomi',
    },
    {
      icon: ShieldCheck,
      titleEn: '2-Year AURA Care',
      titleRu: '2 Года AURA Care',
      descEn: 'Comprehensive global warranty on every phone',
      descRu: 'Полная международная гарантия на каждое устройство',
    },
    {
      icon: Truck,
      titleEn: 'Global Express Dispatch',
      titleRu: 'Международный экспресс',
      descEn: 'Fast insured worldwide door-to-door courier',
      descRu: 'Быстрая экспресс-доставка по всему миру',
    },
    {
      icon: CreditCard,
      titleEn: 'Encrypted Checkout',
      titleRu: 'Безопасная оплата',
      descEn: 'Apple Pay, Google Pay, Visa & Mastercard',
      descRu: 'Apple Pay, Google Pay, Visa и Mastercard',
    },
  ];

  return (
    <section data-reveal className="border-t border-b border-[#e8e9e2] py-8 my-10 bg-[#f9faf6]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {benefits.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              data-reveal
              style={{ '--reveal-delay': `${(idx % 4) * 65}ms` } as React.CSSProperties}
              className="flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-white hover:shadow-xs"
            >
              <div className="w-12 h-12 rounded-xl bg-[#eef2e7] text-[#314b35] flex items-center justify-center shrink-0 border border-[#dfe5d6]">
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <strong className="font-heading font-bold text-sm text-[#222b23]">
                  {lang === 'en' ? item.titleEn : item.titleRu}
                </strong>
                <span className="text-xs text-[#707968] mt-0.5">
                  {lang === 'en' ? item.descEn : item.descRu}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
