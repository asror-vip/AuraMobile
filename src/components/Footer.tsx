'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { storeInfo } from '@/data/storeInfo';
import { ShieldCheck, MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';

export function Footer() {
  const { lang } = useApp();
  const currentYear = 2026;

  return (
    <footer className="bg-[#f7f8f3] border-t border-[#e8e9e2] text-[#222b23] pt-14 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main 4-column footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#e5e8de]">
          {/* Brand info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <svg
                className="w-7 h-10 text-[#314b35]"
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
                <span className="font-heading font-extrabold text-xl tracking-tight leading-none flex items-center">
                  AURA<span className="text-[#314b35]">.</span>
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#527d49] uppercase leading-tight">
                  MOBILE
                </span>
              </div>
            </Link>
            <p className="text-xs text-[#707968] leading-relaxed max-w-sm">
              {lang === 'en'
                ? 'A curated global collection of flagship smartphones. Official Apple, Samsung, and Xiaomi devices with bespoke concierge care and 2-year AURA Care warranty.'
                : 'AURA MOBILE — международная коллекция флагманских смартфонов Apple, Samsung и Xiaomi с премиальным сервисом и гарантией AURA Care.'}
            </p>

            {/* Service & Guarantee indicator */}
            <div className="mt-2 p-3 bg-[#eef2e7] border border-[#dce3d4] rounded-lg text-xs text-[#486348] flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#314b35] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#273d2a] font-semibold text-[11px] uppercase tracking-wider">
                  {lang === 'en' ? '2-Year Global AURA Care' : '2 Года Гарантии AURA Care'}
                </strong>
                <p className="text-[11px] text-[#556955] leading-normal mt-0.5">
                  {lang === 'en'
                    ? 'All devices include international warranty coverage and 256-bit bank-grade payment encryption.'
                    : 'Все устройства поставляются с полной международной гарантией и защитой платежей банковского уровня.'}
                </p>
              </div>
            </div>
          </div>

          {/* Col 1: Catalog */}
          <div className="flex flex-col gap-3">
            <h2 className="font-heading font-semibold text-xs uppercase tracking-wider text-[#314b35]">
              {lang === 'en' ? 'Catalog' : 'Каталог'}
            </h2>
            <ul className="flex flex-col gap-2 text-xs text-[#707968]">
              <li>
                <Link href="/catalog" className="hover:text-[#222b23] transition-colors">
                  {lang === 'en' ? 'All Flagships' : 'Все смартфоны'}
                </Link>
              </li>
              <li>
                <Link href="/catalog?brand=Apple" className="hover:text-[#222b23] transition-colors">
                  Apple iPhone
                </Link>
              </li>
              <li>
                <Link href="/catalog?brand=Samsung" className="hover:text-[#222b23] transition-colors">
                  Samsung Galaxy
                </Link>
              </li>
              <li>
                <Link href="/catalog?brand=Xiaomi" className="hover:text-[#222b23] transition-colors">
                  Xiaomi 14T Series
                </Link>
              </li>
              <li>
                <Link href="/catalog?favorites=true" className="hover:text-[#222b23] transition-colors">
                  {lang === 'en' ? 'Saved Models' : 'Избранные модели'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Customer Care */}
          <div className="flex flex-col gap-3">
            <h2 className="font-heading font-semibold text-xs uppercase tracking-wider text-[#314b35]">
              {lang === 'en' ? 'Customer Care' : 'Покупателям'}
            </h2>
            <ul className="flex flex-col gap-2 text-xs text-[#707968]">
              <li>
                <Link href="/offer" className="hover:text-[#222b23] transition-colors">
                  {lang === 'en' ? 'Terms of Service' : 'Публичная оферта'}
                </Link>
              </li>
              <li>
                <Link href="/payment-info" className="hover:text-[#222b23] transition-colors">
                  {lang === 'en' ? 'Payment Methods' : 'Способы оплаты'}
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="hover:text-[#222b23] transition-colors">
                  {lang === 'en' ? 'Worldwide Delivery' : 'Условия доставки'}
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-[#222b23] transition-colors">
                  {lang === 'en' ? '30-Day Returns & Care' : 'Возврат и обмен'}
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="hover:text-[#222b23] transition-colors">
                  {lang === 'en' ? 'Order Cancellation' : 'Отмена заказа'}
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-[#222b23] transition-colors">
                  {lang === 'en' ? 'Payment Security' : 'Безопасность оплаты'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Global Hubs & Concierge */}
          <div className="flex flex-col gap-3">
            <h2 className="font-heading font-semibold text-xs uppercase tracking-wider text-[#314b35]">
              {lang === 'en' ? 'Global Showrooms' : 'Шоурумы и связь'}
            </h2>
            <ul className="flex flex-col gap-2.5 text-xs text-[#707968]">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#314b35] shrink-0 mt-0.5" />
                <span>
                  {lang === 'en' ? storeInfo.addressEn : storeInfo.addressRu}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#314b35] shrink-0" />
                <a href={`tel:${storeInfo.phone}`} className="hover:text-[#222b23]">
                  {storeInfo.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#314b35] shrink-0" />
                <a href={`mailto:${storeInfo.email}`} className="hover:text-[#222b23]">
                  {storeInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#314b35] shrink-0 mt-0.5" />
                <span>
                  {lang === 'en' ? storeInfo.workingHoursEn : storeInfo.workingHoursRu}
                </span>
              </li>
              <li className="pt-1">
                <Link
                  href="/contacts"
                  className="inline-flex items-center gap-1 text-[#314b35] font-semibold hover:underline"
                >
                  <span>{lang === 'en' ? 'All Global Locations' : 'Все адреса шоурумов'}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Catalog information note */}
        <div className="py-6 border-b border-[#e5e8de] text-[11px] text-[#707968] leading-relaxed">
          <p>
            {lang === 'en' ? (
              <>
                <strong className="text-[#222b23]">AURA Flagship Experience:</strong> Curated consumer electronics showcase engineered for high performance, luxury aesthetics, and seamless global commerce. 256-bit AES encryption across all checkout endpoints.
              </>
            ) : (
              <>
                <strong className="text-[#222b23]">AURA Flagship Experience:</strong> Платформа представляет премиальный опыт электронной коммерции флагманских смартфонов Apple, Samsung и Xiaomi. Экспресс-доставка, 256-битное шифрование и интерактивный чекаут.
              </>
            )}
          </p>
        </div>

        {/* Footer bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8a9182]">
          <div>
            <span>© {currentYear} AURA MOBILE. </span>
            <span className="hidden sm:inline">
              {lang === 'en' ? 'All rights reserved. Contra Portfolio Showcase Edition.' : 'Все права защищены. Contra Showcase Edition.'}
            </span>
          </div>

          {/* Payment method logos (International: Apple Pay, Google Pay, Visa, Mastercard, Amex, PayPal) */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-[#9da595]">
              {lang === 'en' ? 'Global Gateways:' : 'Платёжные системы:'}
            </span>
            <div className="flex items-center gap-2">
              <div className="h-6 px-2 bg-white rounded border border-[#e2e7da] flex items-center justify-center font-heading font-extrabold text-[11px] text-[#222b23]">
                Pay
              </div>
              <div className="h-6 px-2 bg-white rounded border border-[#e2e7da] flex items-center justify-center font-heading font-extrabold text-[11px] text-[#4285F4]">
                GPay
              </div>
              <div className="h-6 w-12 relative bg-white rounded border border-[#e2e7da] p-0.5 flex items-center justify-center">
                <Image
                  src="/assets/visa.webp"
                  alt="Visa"
                  width={38}
                  height={18}
                  style={{ width: 'auto', height: 'auto' }}
                  className="object-contain max-h-4"
                />
              </div>
              <div className="h-6 px-1.5 bg-white rounded border border-[#e2e7da] flex items-center justify-center gap-0.5 text-[10px] font-bold">
                <span className="text-[#eb001b]">Master</span><span className="text-[#f79e1b]">card</span>
              </div>
              <div className="h-6 px-2 bg-white rounded border border-[#e2e7da] flex items-center justify-center font-heading font-bold text-[10px] text-[#006fcf]">
                AMEX
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
