'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { ArrowRight, CheckCircle2, ShieldCheck, CreditCard } from 'lucide-react';

export function PaymentPromo() {
  const { lang } = useApp();

  return (
    <section className="my-16 bg-[#edf0e6] rounded-2xl border border-[#dfe4d6] p-8 sm:p-12 lg:p-16 overflow-hidden relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left copy */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <span className="text-[11px] font-bold tracking-widest text-[#5c6e51] uppercase mb-3 block">
            {lang === 'en' ? 'SEAMLESS & SECURE CHECKOUT' : 'УДОБНАЯ И НАДЁЖНАЯ ОПЛАТА'}
          </span>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#222b23] tracking-tight mb-4 leading-tight">
            {lang === 'en' ? (
              <>
                Precision Hardware. <br />
                <span className="text-[#314b35]">Uncompromising Security.</span>
              </>
            ) : (
              <>
                Ваша техника. <br />
                <span className="text-[#314b35]">Ваша безопасность.</span>
              </>
            )}
          </h2>

          <p className="text-sm text-[#6c7664] leading-relaxed max-w-lg mb-6">
            {lang === 'en'
              ? 'Instant global checkout via Apple Pay, Google Pay, Visa and Mastercard. Zero-fraud protection with 256-bit AES encryption.'
              : 'Мгновенная оплата через Apple Pay, Google Pay, Visa и Mastercard. Защита от мошенничества и 256-битное шифрование.'}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <Link
              href="/payment"
              className="inline-flex items-center gap-3 bg-[#314b35] hover:bg-[#243c28] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl transition-all shadow-xs"
            >
              <span>{lang === 'en' ? 'Express Checkout' : 'Оформить заказ'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/payment-info"
              className="inline-flex items-center gap-2 bg-white text-[#222b23] hover:bg-[#f6f7f3] border border-[#d6decd] text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl transition-all"
            >
              <span>{lang === 'en' ? 'Payment Methods' : 'Правила оплаты'}</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#7e8a76]">
            <ShieldCheck className="w-4 h-4 text-[#314b35] shrink-0" />
            <span>
              {lang === 'en'
                ? 'Bank-Grade Global Payment Encryption Protocol'
                : 'Стандарты безопасности банковского эквайринга'}
            </span>
          </div>
        </div>

        {/* Right 3D Card Visual */}
        <div className="lg:col-span-5 relative flex items-center justify-center py-6">
          {/* Card Mockup */}
          <div className="relative w-80 sm:w-88 h-52 rounded-2xl p-6 bg-gradient-to-tr from-[#243827] via-[#314b35] to-[#4c6645] text-white shadow-2xl shadow-[#243827]/30 transform -rotate-6 hover:rotate-0 transition-transform duration-300 border border-white/10 flex flex-col justify-between">
            {/* Card top */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="font-heading font-extrabold text-lg tracking-tight leading-none">
                  AURA BLACK CARD
                </div>
              </div>
              <CreditCard className="w-5 h-5 text-white/60" />
            </div>

            {/* Chip */}
            <div className="w-11 h-8 rounded-md bg-gradient-to-br from-[#d4af37] via-[#f3e5ab] to-[#aa820a] border border-[#d4af37]/60 shadow-inner flex items-center justify-center opacity-90">
              <div className="w-8 h-5 border border-black/20 rounded-xs"></div>
            </div>

            {/* Card Number */}
            <div className="font-mono text-base tracking-[0.2em] text-[#e0ebd8]">
              4111 &nbsp; •••• &nbsp; •••• &nbsp; 4242
            </div>

            {/* Card bottom */}
            <div className="flex items-center justify-between text-[10px] text-[#b8ccb2]">
              <div>
                <span className="block text-[8px] tracking-wider text-[#8fa688]">PREMIUM CLIENT</span>
                <span className="font-semibold text-white">AURA VERIFIED</span>
              </div>
              <div className="bg-white/95 px-2 py-0.5 rounded flex items-center justify-center">
                <Image
                  src="/assets/visa.webp"
                  alt="Visa"
                  width={38}
                  height={14}
                  style={{ width: 'auto', height: 'auto' }}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Floating Payment Success Pill */}
          <div className="absolute -bottom-2 right-2 sm:right-6 bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-lg border border-[#e2e8da] flex items-center gap-3 transform rotate-3">
            <div className="w-8 h-8 rounded-full bg-[#eef5e9] text-[#314b35] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-[#314b35]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#707968]">
                {lang === 'en' ? 'Verified Transaction' : 'Онлайн-оплата'}
              </span>
              <strong className="text-xs font-bold text-[#222b23]">
                $1,199 USD
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
