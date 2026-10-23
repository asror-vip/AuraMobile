'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Home,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  Lock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Download,
  Check,
  Tag,
  Zap,
} from 'lucide-react';

function PaymentCheckoutContent() {
  const { lang, showToast } = useApp();
  const searchParams = useSearchParams();

  const paramName = searchParams.get('name') || 'iPhone 16 Pro (Desert Titanium)';
  const paramColor = searchParams.get('color') || 'Desert Titanium';
  const paramStorage = searchParams.get('storage') || '256 GB';
  const paramPrice = searchParams.get('price');

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'googlepay'>('card');
  const [basePrice, setBasePrice] = useState(1199);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  // Card Inputs
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('888');
  const [cardHolder, setCardHolder] = useState('ALEXANDER VANCE');
  const [isProcessing, setIsProcessing] = useState(false);

  const [receipt, setReceipt] = useState<null | {
    orderId: string;
    date: string;
    totalAmountFormatted: string;
    productName: string;
    storage: string;
    color: string;
    last4: string;
    method: string;
  }>(null);

  useEffect(() => {
    if (paramPrice) {
      const num = Number(paramPrice);
      if (!isNaN(num) && num > 0) {
        setBasePrice(num);
      }
    }
  }, [paramPrice]);

  const finalPrice = Math.round(basePrice * (1 - discountPercent / 100));

  const formatPrice = (val: number) => {
    return `$${new Intl.NumberFormat('en-US').format(val)}`;
  };

  const detectBrand = (num: string) => {
    const clean = num.replace(/\D/g, '');
    if (/^4/.test(clean)) return 'VISA';
    if (/^5[1-5]/.test(clean)) return 'MASTERCARD';
    if (/^3[47]/.test(clean)) return 'AMEX';
    return 'VISA';
  };

  const detectedBrand = detectBrand(cardNumber);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'CONTRA' || clean === 'AURA20' || clean === 'VIP') {
      setDiscountPercent(20);
      setPromoApplied(true);
      showToast(
        lang === 'en'
          ? '🎉 20% VIP exclusive discount applied!'
          : '🎉 Специальная скидка 20% успешно применена!'
      );
    } else {
      showToast(
        lang === 'en'
          ? 'Invalid promo code. (Try: CONTRA)'
          : 'Промокод не найден. (Попробуйте: CONTRA)'
      );
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length > 2) {
      setExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setExpiry(raw);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const orderId = `AURA-${Math.floor(100000 + Math.random() * 900000)}`;
      const date = new Date().toLocaleString(lang === 'en' ? 'en-US' : 'ru-RU', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      setReceipt({
        orderId,
        date,
        totalAmountFormatted: formatPrice(finalPrice),
        productName: paramName,
        storage: paramStorage,
        color: paramColor,
        last4: cardNumber.replace(/\D/g, '').slice(-4) || '4444',
        method: paymentMethod === 'applepay' ? 'Apple Pay' : paymentMethod === 'googlepay' ? 'Google Pay' : detectedBrand,
      });

      showToast(
        lang === 'en'
          ? '✨ Order authorized and confirmed!'
          : '✨ Заказ успешно подтверждён!'
      );
    }, 900);
  };

  return (
    <div className="py-8 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#707968] mb-8">
        <Link href="/" className="hover:text-[#314b35] flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span>{lang === 'en' ? 'Home' : 'Главная'}</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#a6b09e]" />
        <Link href="/catalog" className="hover:text-[#314b35]">
          <span>{lang === 'en' ? 'Catalog' : 'Каталог'}</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#a6b09e]" />
        <span className="font-semibold text-[#222b23]">
          {lang === 'en' ? 'Secure Checkout' : 'Безопасный чекаут'}
        </span>
      </nav>

      {/* Top Banner */}
      <div className="mb-8 p-4 bg-gradient-to-r from-[#17271b] via-[#213827] to-[#17271b] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm border border-[#2e4933]">
        <div className="flex items-center gap-2.5 text-xs">
          <ShieldCheck className="w-4 h-4 text-[#a4e0b0] shrink-0" />
          <span>
            <strong className="text-white">AURA Encrypted Checkout:</strong> 256-bit AES Bank-Grade Protocol · Zero Fraud Protection
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full text-[11px] text-[#c2e2c9] font-medium">
          <Sparkles className="w-3 h-3 text-[#a4e0b0]" />
          <span>Worldwide Priority Dispatch</span>
        </div>
      </div>

      {!receipt ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Payment Form & Visual Card */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-[#e8e9e2] p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#eff1e9]">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#5c6e51] uppercase block mb-1">
                    {lang === 'en' ? 'PAYMENT INSTRUMENT' : 'СПОСОБ ОПЛАТЫ'}
                  </span>
                  <h1 className="font-heading font-extrabold text-2xl text-[#222b23]">
                    {lang === 'en' ? 'Encrypted Checkout' : 'Безопасная оплата'}
                  </h1>
                </div>

                <div className="flex items-center gap-1.5 bg-[#f0f3eb] px-3 py-1 rounded-xl border border-[#d6dfce] text-xs font-bold text-[#314b35]">
                  <span>$ USD</span>
                </div>
              </div>

              {/* Express checkout tabs */}
              <div className="grid grid-cols-3 gap-2.5 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-3 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 border transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#314b35] bg-[#f2f6ee] text-[#222b23]'
                      : 'border-[#e4e8de] bg-white text-[#707a68] hover:bg-[#fafbf9]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#314b35]" />
                  <span>Card (Visa/MC/Amex)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('applepay')}
                  className={`py-3 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 border transition-all ${
                    paymentMethod === 'applepay'
                      ? 'border-[#314b35] bg-[#f2f6ee] text-[#222b23]'
                      : 'border-[#e4e8de] bg-white text-[#707a68] hover:bg-[#fafbf9]'
                  }`}
                >
                  <span className="font-heading font-extrabold text-sm tracking-tight"> Pay</span>
                  <span>Apple Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('googlepay')}
                  className={`py-3 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 border transition-all ${
                    paymentMethod === 'googlepay'
                      ? 'border-[#314b35] bg-[#f2f6ee] text-[#222b23]'
                      : 'border-[#e4e8de] bg-white text-[#707a68] hover:bg-[#fafbf9]'
                  }`}
                >
                  <span className="font-heading font-extrabold text-sm tracking-tight text-[#4285F4]">G Pay</span>
                  <span>Google Pay</span>
                </button>
              </div>

              {/* Visual Card Preview */}
              {paymentMethod === 'card' && (
                <div className="mb-6 relative h-48 w-full rounded-2xl p-6 bg-gradient-to-br from-[#1a2d1d] via-[#243c29] to-[#0f1b11] text-white shadow-lg overflow-hidden border border-[#3b593f]">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#49704e]/20 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-7 rounded bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 border border-amber-500/40 opacity-90 shadow-xs flex items-center justify-center">
                        <div className="w-6 h-4 border border-amber-900/30 rounded-xs" />
                      </div>
                      <span className="font-heading font-extrabold text-sm tracking-widest text-[#a4e0b0]">
                        {detectedBrand}
                      </span>
                    </div>

                    <div className="font-mono text-lg sm:text-xl tracking-[0.2em] text-white/95">
                      {cardNumber || '•••• •••• •••• ••••'}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#c0d4c4]">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-white/50 block">CARDHOLDER</span>
                        <span className="font-semibold tracking-wider uppercase text-white truncate max-w-[180px] block">
                          {cardHolder || 'CARDHOLDER NAME'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-white/50 block">EXPIRES</span>
                        <span className="font-mono font-semibold text-white">{expiry || 'MM/YY'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {paymentMethod === 'card' ? (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-[#222b23] mb-1">
                        {lang === 'en' ? 'Card Number' : 'Номер карты'}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="4111 •••• •••• 4444"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#d6dcce] text-xs font-mono focus:outline-hidden focus:border-[#314b35] bg-[#fafbf9]"
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#314b35] bg-[#eef3ea] px-2 py-0.5 rounded">
                          {detectedBrand}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#222b23] mb-1">
                          {lang === 'en' ? 'Expiry Date' : 'Срок действия'}
                        </label>
                        <input
                          type="text"
                          required
                          value={expiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#d6dcce] text-xs font-mono focus:outline-hidden focus:border-[#314b35] bg-[#fafbf9]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#222b23] mb-1">
                          CVC / CVV
                        </label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                          placeholder="•••"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#d6dcce] text-xs font-mono focus:outline-hidden focus:border-[#314b35] bg-[#fafbf9]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#222b23] mb-1">
                        {lang === 'en' ? 'Cardholder Full Name' : 'Имя держателя карты'}
                      </label>
                      <input
                        type="text"
                        required
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                        placeholder="ALEXANDER VANCE"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#d6dcce] text-xs uppercase focus:outline-hidden focus:border-[#314b35] bg-[#fafbf9]"
                      />
                    </div>
                  </>
                ) : (
                  <div className="p-6 rounded-2xl bg-[#f7f9f5] border border-[#e1e7db] text-center">
                    <span className="text-2xl mb-2 block">
                      {paymentMethod === 'applepay' ? '' : 'G'}
                    </span>
                    <h3 className="font-heading font-bold text-sm text-[#222b23] mb-1">
                      {paymentMethod === 'applepay' ? 'Apple Pay Express Checkout' : 'Google Pay 1-Click Pay'}
                    </h3>
                    <p className="text-xs text-[#707e69] max-w-sm mx-auto">
                      {lang === 'en'
                        ? 'Instant biometric one-touch checkout via Face ID or Touch ID.'
                        : 'Мгновенная и безопасная авторизация через Face ID / Touch ID.'}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 bg-[#314b35] hover:bg-[#223625] text-white font-heading font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-75"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{lang === 'en' ? 'Processing transaction...' : 'Обработка платежа...'}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>
                        {paymentMethod === 'applepay'
                          ? `Pay with Pay (${formatPrice(finalPrice)})`
                          : paymentMethod === 'googlepay'
                          ? `Pay with GPay (${formatPrice(finalPrice)})`
                          : `${lang === 'en' ? 'Authorize Payment' : 'Оплатить'} · ${formatPrice(finalPrice)}`}
                      </span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right: Order Summary & Promo Code */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-[#e8e9e2] p-6 sm:p-7 shadow-xs">
              <span className="text-[10px] font-bold tracking-widest text-[#5c6e51] uppercase block mb-3">
                {lang === 'en' ? 'ORDER SUMMARY' : 'СВОДКА ЗАКАЗА'}
              </span>

              <div className="pb-4 mb-4 border-b border-[#eff1e9] flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-heading font-extrabold text-base text-[#222b23]">
                    {paramName}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#707968] mt-1">
                    <span>{paramStorage}</span>
                    <span>·</span>
                    <span>{paramColor}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#314b35] bg-[#f0f4ec] px-2.5 py-1 rounded-md">
                  In Stock
                </span>
              </div>

              {/* Promo Code Input */}
              <form onSubmit={applyPromo} className="mb-5">
                <label className="text-xs font-semibold text-[#222b23] block mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#314b35]" />
                  <span>{lang === 'en' ? 'Promotional Voucher' : 'Промокод'}</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="e.g. CONTRA"
                    className="flex-1 px-3 py-2 rounded-xl border border-[#d6dcce] text-xs font-mono uppercase bg-[#fafbf9] focus:outline-hidden focus:border-[#314b35]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#f0f4ec] hover:bg-[#e4ecde] text-[#314b35] font-semibold text-xs rounded-xl border border-[#d1dec9] transition-colors"
                  >
                    {lang === 'en' ? 'Apply' : 'Применить'}
                  </button>
                </div>
                {promoApplied && (
                  <span className="text-[11px] text-green-700 font-semibold block mt-1.5 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    {lang === 'en' ? '20% VIP Exclusive Discount Applied!' : 'Скидка 20% применена!'}
                  </span>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs text-[#707968] pb-4 mb-4 border-b border-[#eff1e9]">
                <div className="flex justify-between">
                  <span>{lang === 'en' ? 'Subtotal:' : 'Стоимость товара:'}</span>
                  <span className="font-medium text-[#222b23]">{formatPrice(basePrice)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-green-700 font-semibold">
                    <span>{lang === 'en' ? 'Discount (-20%):' : 'Скидка (-20%):'}</span>
                    <span>-{formatPrice(Math.round(basePrice * 0.2))}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{lang === 'en' ? 'Worldwide Express Shipping:' : 'Доставка (Express):'}</span>
                  <span className="font-semibold text-[#314b35]">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'en' ? '2-Year AURA Care Warranty:' : '2 Года AURA Care:'}</span>
                  <span className="font-semibold text-[#314b35]">INCLUDED</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between text-sm sm:text-base font-heading font-extrabold text-[#222b23]">
                <span>{lang === 'en' ? 'Grand Total:' : 'Итого к оплате:'}</span>
                <span className="text-xl sm:text-2xl text-[#314b35]">{formatPrice(finalPrice)}</span>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="p-4 rounded-2xl bg-[#edf3ea] border border-[#d5e2cf] text-xs text-[#3c5240] space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#314b35] shrink-0" />
                <span>
                  {lang === 'en' ? 'Worldwide Express Dispatch within 24h' : 'Международная экспресс-отправка за 24ч'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#314b35] shrink-0" />
                <span>
                  {lang === 'en' ? '14-Day Global Return Assurance' : '14 дней гарантия возврата и обмена'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Order Confirmed Screen */
        <div className="bg-white rounded-3xl border border-[#e8e9e2] p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm animate-fade-in-up">
          <div className="w-16 h-16 rounded-full bg-[#edf5ec] text-[#314b35] flex items-center justify-center mx-auto mb-6 shadow-xs border border-[#cfe1cd]">
            <Check className="w-8 h-8" />
          </div>

          <span className="text-[11px] font-bold tracking-widest text-[#5c6e51] uppercase block mb-1">
            {lang === 'en' ? 'TRANSACTION COMPLETED' : 'ОПЛАТА УСПЕШНО ЗАВЕРШЕНА'}
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#222b23] mb-3">
            {lang === 'en' ? 'Thank You, Your Order Is Confirmed!' : 'Спасибо, ваш заказ оформлен!'}
          </h2>
          <p className="text-xs sm:text-sm text-[#707968] max-w-md mx-auto mb-8">
            {lang === 'en'
              ? 'Your electronic invoice and insured tracking number have been generated and dispatched to our logistics fulfillment hub.'
              : 'Электронный чек и номер отправления зарегистрированы в системе AURA Concierge.'}
          </p>

          {/* Receipt details */}
          <div className="bg-[#f7f9f5] rounded-2xl border border-[#e1e7db] p-6 text-xs text-left mb-8 space-y-3">
            <div className="flex justify-between pb-2 border-b border-[#e6ecdf]">
              <span className="text-[#7a8572]">Order ID:</span>
              <strong className="font-mono text-[#222b23]">#{receipt.orderId}</strong>
            </div>
            <div className="flex justify-between pb-2 border-b border-[#e6ecdf]">
              <span className="text-[#7a8572]">Device:</span>
              <span className="font-semibold text-[#222b23]">{receipt.productName} ({receipt.storage})</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-[#e6ecdf]">
              <span className="text-[#7a8572]">Method:</span>
              <span className="font-medium text-[#222b23]">{receipt.method} (•••• {receipt.last4})</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-[#e6ecdf]">
              <span className="text-[#7a8572]">Date & Time:</span>
              <span className="text-[#222b23]">{receipt.date}</span>
            </div>
            <div className="flex justify-between pt-1 text-sm font-heading font-extrabold">
              <span className="text-[#222b23]">Paid Total:</span>
              <span className="text-[#314b35]">{receipt.totalAmountFormatted}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-[#d1d8c9] text-[#222b23] text-xs font-semibold hover:bg-[#fafbf8] transition-all"
            >
              <Download className="w-4 h-4 text-[#314b35]" />
              <span>{lang === 'en' ? 'Print Official Invoice' : 'Печать квитанции'}</span>
            </button>

            <Link
              href="/catalog"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#314b35] text-white text-xs font-semibold hover:bg-[#223625] transition-all shadow-sm"
            >
              <span>{lang === 'en' ? 'Return to Catalog' : 'Вернуться в каталог'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-xs text-[#707968]">
          Loading checkout...
        </div>
      }
    >
      <PaymentCheckoutContent />
    </Suspense>
  );
}
