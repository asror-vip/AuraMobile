'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { storeInfo } from '@/data/storeInfo';
import {
  Home,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Building2,
  Send,
  CheckCircle2,
  ShieldCheck,
  Copy,
  Check,
  Sparkles,
  Globe2,
} from 'lucide-react';

export default function ContactsPage() {
  const { lang, showToast } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phoneOrEmail: '',
    inquiryType: 'concierge',
    preferredModel: 'iPhone 16 Pro',
    message: '',
  });

  const [preparedTicket, setPreparedTicket] = useState<{
    id: string;
    name: string;
    contact: string;
    type: string;
    model: string;
    message: string;
    timestamp: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phoneOrEmail.trim()) {
      showToast(
        lang === 'en'
          ? 'Please enter your name and contact info'
          : 'Пожалуйста, введите имя и контактные данные'
      );
      return;
    }

    const ticketId = `AURA-${Date.now().toString(36).slice(-5).toUpperCase()}`;
    const timestamp = new Date().toLocaleString(lang === 'en' ? 'en-US' : 'ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    setPreparedTicket({
      id: ticketId,
      name: formData.name.trim(),
      contact: formData.phoneOrEmail.trim(),
      type: formData.inquiryType,
      model: formData.preferredModel,
      message: formData.message.trim(),
      timestamp,
    });

    showToast(
      lang === 'en'
        ? 'VIP concierge ticket generated successfully!'
        : 'VIP-заявка успешно сформирована!'
    );
  };

  const copyTicketText = async () => {
    if (!preparedTicket) return;
    const text = lang === 'en'
      ? `AURA MOBILE VIP CONCIERGE TICKET [#${preparedTicket.id}]
• Client: ${preparedTicket.name}
• Contact: ${preparedTicket.contact}
• Inquiry Type: ${preparedTicket.type}
• Model of Interest: ${preparedTicket.model}
• Message: ${preparedTicket.message || 'Standard VIP purchase consultation'}
• Timestamp: ${preparedTicket.timestamp}`
      : `VIP-ТИКЕТ AURA MOBILE [#${preparedTicket.id}]
• Клиент: ${preparedTicket.name}
• Контакт: ${preparedTicket.contact}
• Направление: ${preparedTicket.type}
• Модель: ${preparedTicket.model}
• Комментарий: ${preparedTicket.message || 'Стандартная VIP-консультация'}
• Время: ${preparedTicket.timestamp}`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      }
      setCopied(true);
      showToast(lang === 'en' ? 'Ticket copied to clipboard!' : 'Билет скопирован!');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast(lang === 'en' ? 'Failed to copy' : 'Не удалось скопировать');
    }
  };

  const showrooms = [
    {
      cityEn: 'San Francisco Global HQ',
      cityRu: 'Штаб-квартира в Сан-Франциско',
      badge: 'GLOBAL HEADQUARTERS',
      addressEn: '100 Innovation Blvd, Suite 400, San Francisco, CA 94105',
      addressRu: '100 Innovation Blvd, Suite 400, San Francisco, CA 94105',
      phone: storeInfo.phoneDisplay,
      hoursEn: 'Mon – Fri: 08:00 – 19:00 PST',
      hoursRu: 'Пн – Пт: 08:00 – 19:00 PST',
    },
    {
      cityEn: 'London Flagship Boutique',
      cityRu: 'Флагманский Бутик Лондон',
      badge: 'EUROPE EXPERIENCE HUB',
      addressEn: '45 Mayfair High St, London W1J 8FF, United Kingdom',
      addressRu: '45 Mayfair High St, London W1J 8FF, Великобритания',
      phone: storeInfo.secondaryPhoneDisplay,
      hoursEn: 'Mon – Sat: 10:00 – 20:00 GMT',
      hoursRu: 'Пн – Сб: 10:00 – 20:00 GMT',
    },
    {
      cityEn: 'Dubai Luxury Showcase',
      cityRu: 'Галерея Впечатлений Дубай',
      badge: 'LUXURY SHOWCASE',
      addressEn: 'Marina Gate Tower 2, Level G, Dubai Marina, UAE',
      addressRu: 'Marina Gate Tower 2, Level G, Dubai Marina, ОАЭ',
      phone: '+971 4 200 AURA',
      hoursEn: 'Daily: 10:00 – 22:00 GST',
      hoursRu: 'Ежедневно: 10:00 – 22:00 GST',
    },
  ];

  return (
    <div className="py-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#707968] mb-8">
        <Link href="/" className="hover:text-[#314b35] flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span>{lang === 'en' ? 'Home' : 'Главная'}</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#a6b09e]" />
        <span className="font-semibold text-[#222b23]">
          {lang === 'en' ? 'Showrooms & Global Concierge' : 'Шоурумы и Консьерж-сервис'}
        </span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-1.5 bg-[#edf3ea] border border-[#d3e3cc] text-[#2c4730] px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase mb-3">
          <Sparkles className="w-3 h-3 text-[#527d49]" />
          <span>AURA GLOBAL CONCIERGE</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#222b23] tracking-tight mb-4">
          {lang === 'en' ? 'Global Showrooms & Concierge Desk' : 'Флагманские шоурумы и связь с нами'}
        </h1>
        <p className="text-sm sm:text-base text-[#707968] max-w-2xl leading-relaxed">
          {lang === 'en'
            ? 'Visit an official AURA Mobile experience lounge, book a private VIP preview session, or connect with our 24/7 global client concierge team.'
            : 'Посетите флагманские центры AURA Mobile, получите индивидуальную консультацию или свяжитесь с круглосуточной службой консьерж-сервиса.'}
        </p>
      </div>

      {/* 3 Showroom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        {showrooms.map((hub, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white border border-[#e8e9e2] shadow-xs flex flex-col justify-between hover:border-[#314b35]/40 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-extrabold tracking-wider bg-[#f0f4ec] text-[#314b35] px-2.5 py-1 rounded-md uppercase">
                  {hub.badge}
                </span>
                <Globe2 className="w-4 h-4 text-[#8c9684]" />
              </div>

              <h2 className="font-heading font-bold text-lg text-[#222b23] mb-2 group-hover:text-[#314b35] transition-colors">
                {lang === 'en' ? hub.cityEn : hub.cityRu}
              </h2>

              <p className="text-xs text-[#707968] leading-relaxed mb-4 flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#314b35] shrink-0 mt-0.5" />
                <span>{lang === 'en' ? hub.addressEn : hub.addressRu}</span>
              </p>
            </div>

            <div className="pt-4 border-t border-[#f2f4ee] flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between text-[#707968]">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#8c9684]" />
                  <span>{lang === 'en' ? hub.hoursEn : hub.hoursRu}</span>
                </span>
              </div>
              <div className="flex items-center justify-between font-semibold text-[#222b23]">
                <span className="flex items-center gap-1.5 text-[#314b35]">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{hub.phone}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Left: Quick Connect & Standards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-[#e8e9e2] p-6 shadow-xs">
            <h2 className="font-heading font-bold text-base text-[#222b23] mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#314b35]" />
              <span>{lang === 'en' ? 'Direct Communication Desks' : 'Быстрые каналы связи'}</span>
            </h2>

            <div className="space-y-4 text-xs">
              <a
                href={`tel:${storeInfo.phone}`}
                className="p-3.5 rounded-xl bg-[#f7f9f5] border border-[#e5ebe0] flex items-center justify-between hover:bg-[#edf3ea] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#314b35] text-white flex items-center justify-center">
                    <Globe2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#7a8572] block">
                      {lang === 'en' ? 'North America & Global Toll-Free' : 'Северная Америка & Global Toll-Free'}
                    </span>
                    <strong className="text-sm font-heading text-[#222b23] group-hover:text-[#314b35]">
                      {storeInfo.phoneDisplay}
                    </strong>
                  </div>
                </div>
              </a>

              <a
                href={`tel:${storeInfo.secondaryPhone}`}
                className="p-3.5 rounded-xl bg-[#f7f9f5] border border-[#e5ebe0] flex items-center justify-between hover:bg-[#edf3ea] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#314b35] text-white flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#7a8572] block">
                      {lang === 'en' ? 'London & European Operations Desk' : 'Лондон & Европейское отделение'}
                    </span>
                    <strong className="text-sm font-heading text-[#222b23] group-hover:text-[#314b35]">
                      {storeInfo.secondaryPhoneDisplay}
                    </strong>
                  </div>
                </div>
              </a>

              <a
                href={`mailto:${storeInfo.email}`}
                className="p-3.5 rounded-xl bg-[#f7f9f5] border border-[#e5ebe0] flex items-center justify-between hover:bg-[#edf3ea] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#314b35] text-white flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#7a8572] block">
                      {lang === 'en' ? 'VIP Concierge & Orders' : 'VIP Консьерж & Заказы'}
                    </span>
                    <strong className="text-xs font-semibold text-[#222b23] group-hover:text-[#314b35]">
                      {storeInfo.email}
                    </strong>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Quality & Care Guarantee Card */}
          <div className="bg-[#18281b] text-white rounded-2xl p-6 shadow-xs border border-[#2b4230]">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-[#a4e0b0]" />
              <h2 className="font-heading font-bold text-sm tracking-wide">
                AURA CARE GUARANTEE
              </h2>
            </div>
            <p className="text-xs text-white/80 leading-relaxed mb-4">
              {lang === 'en'
                ? 'Every smartphone is 100% genuine, delivered in certified factory-sealed packaging with 2-Year AURA Care international warranty protection.'
                : 'Каждое устройство на 100% оригинально, поставляется в сертифицированной заводской упаковке и защищено 2 годами гарантии AURA Care.'}
            </p>
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-[11px] text-[#c2d9c6]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#a4e0b0]" />
                <span>Express Dispatch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#a4e0b0]" />
                <span>256-bit SSL Security</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive VIP Concierge Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-[#e8e9e2] p-7 shadow-xs">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#eff1e9]">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#5c6e51] uppercase block mb-1">
                  {lang === 'en' ? 'ONLINE RESERVATION & CONSULTATION' : 'ОНЛАЙН РЕЗЕРВАЦИЯ И КОНСУЛЬТАЦИЯ'}
                </span>
                <h2 className="font-heading font-extrabold text-xl text-[#222b23]">
                  {lang === 'en' ? 'VIP Inquiries & Private Lounge Visits' : 'VIP-заявка или посещение шоурума'}
                </h2>
              </div>
              <Sparkles className="w-5 h-5 text-[#314b35]" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#222b23] block mb-1.5">
                    {lang === 'en' ? 'Your Name' : 'Ваше имя'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'en' ? 'e.g. Alexander Vance' : 'Например, Александр Вэнс'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6dcce] text-xs focus:outline-hidden focus:border-[#314b35] bg-[#fafbf9]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#222b23] block mb-1.5">
                    {lang === 'en' ? 'Phone or Email' : 'Телефон или Email'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'en' ? '+1 (555) 019-2834 / client@domain.com' : '+1 (555) 019-2834 / client@domain.com'}
                    value={formData.phoneOrEmail}
                    onChange={(e) => setFormData({ ...formData, phoneOrEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6dcce] text-xs focus:outline-hidden focus:border-[#314b35] bg-[#fafbf9]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#222b23] block mb-1.5">
                    {lang === 'en' ? 'Inquiry Type' : 'Тип обращения'}
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6dcce] text-xs focus:outline-hidden focus:border-[#314b35] bg-[#fafbf9]"
                  >
                    <option value="concierge">
                      {lang === 'en' ? 'VIP Private Purchase & Consultation' : 'VIP-покупка и консультация'}
                    </option>
                    <option value="showroom">
                      {lang === 'en' ? 'Book Private Lounge Preview' : 'Бронирование визита в шоурум'}
                    </option>
                    <option value="b2b">
                      {lang === 'en' ? 'Corporate & Executive Fleet Fleet' : 'Корпоративное / B2B сотрудничество'}
                    </option>
                    <option value="shipping">
                      {lang === 'en' ? 'Worldwide Express Logistics' : 'Международная экспресс-доставка'}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#222b23] block mb-1.5">
                    {lang === 'en' ? 'Preferred Device Model' : 'Интересующая модель'}
                  </label>
                  <select
                    value={formData.preferredModel}
                    onChange={(e) => setFormData({ ...formData, preferredModel: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6dcce] text-xs focus:outline-hidden focus:border-[#314b35] bg-[#fafbf9]"
                  >
                    <option value="iPhone 16 Pro (Desert Titanium)">iPhone 16 Pro (Desert Titanium)</option>
                    <option value="Galaxy S25 Ultra (Titanium Silverblue)">Galaxy S25 Ultra (Silverblue)</option>
                    <option value="iPhone 16 (Ultramarine)">iPhone 16 (Ultramarine)</option>
                    <option value="Xiaomi 14T Pro (Titan Black)">Xiaomi 14T Pro (Titan Black)</option>
                    <option value="Custom Model">
                      {lang === 'en' ? 'Other / Bespoke Sourcing' : 'Другая модель / Индивидуальный заказ'}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#222b23] block mb-1.5">
                  {lang === 'en' ? 'Additional Preferences or Inquiries' : 'Дополнительные пожелания'}
                </label>
                <textarea
                  rows={3}
                  placeholder={
                    lang === 'en'
                      ? 'Preferred delivery date, bespoke color request, or showroom visit time...'
                      : 'Время визита, предпочтительный способ оплаты или детали заказа...'
                  }
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6dcce] text-xs focus:outline-hidden focus:border-[#314b35] bg-[#fafbf9]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#314b35] hover:bg-[#233827] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>
                  {lang === 'en' ? 'Submit VIP Concierge Request' : 'Отправить VIP-заявку'}
                </span>
              </button>
            </form>

            {/* Generated Ticket Box */}
            {preparedTicket && (
              <div className="mt-6 p-5 rounded-xl bg-[#f5f8f3] border border-[#d8e3d3] animate-fade-in-up">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#e1ebd9]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#314b35]" />
                    <span className="font-heading font-extrabold text-xs text-[#222b23]">
                      TICKET ID: #{preparedTicket.id}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#707e69] font-mono">{preparedTicket.timestamp}</span>
                </div>

                <div className="text-xs text-[#44533e] space-y-1.5 mb-4">
                  <p><strong>{lang === 'en' ? 'Client:' : 'Клиент:'}</strong> {preparedTicket.name} ({preparedTicket.contact})</p>
                  <p><strong>{lang === 'en' ? 'Model:' : 'Модель:'}</strong> {preparedTicket.model}</p>
                  {preparedTicket.message && (
                    <p><strong>{lang === 'en' ? 'Notes:' : 'Комментарий:'}</strong> {preparedTicket.message}</p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={copyTicketText}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-[#c9d6c3] text-[#222b23] hover:bg-[#fafbf9] transition-all"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-[#314b35]" />}
                    <span>{copied ? (lang === 'en' ? 'Copied!' : 'Скопировано!') : (lang === 'en' ? 'Copy Ticket' : 'Скопировать')}</span>
                  </button>

                  <a
                    href={`mailto:${storeInfo.email}?subject=${encodeURIComponent(
                      `AURA VIP Ticket #${preparedTicket.id}: ${preparedTicket.name}`
                    )}&body=${encodeURIComponent(
                      `AURA VIP TICKET #${preparedTicket.id}\nName: ${preparedTicket.name}\nContact: ${preparedTicket.contact}\nModel: ${preparedTicket.model}\nNotes: ${preparedTicket.message}\nTime: ${preparedTicket.timestamp}`
                    )}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#314b35] text-white hover:bg-[#233827] transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Dispatch via Email' : 'Отправить по Email'}</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
