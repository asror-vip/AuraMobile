'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { storeInfo } from '@/data/storeInfo';
import {
  FileText,
  AlertCircle,
  Mail,
  Send,
  Copy,
  Check,
  RotateCcw,
  Clock,
  ArrowRight
} from 'lucide-react';

export function CancellationForm() {
  const { lang, showToast } = useApp();

  const [orderNumber, setOrderNumber] = useState('');
  const [contact, setContact] = useState('');
  const [reasonCategory, setReasonCategory] = useState('');
  const [details, setDetails] = useState('');

  const [errors, setErrors] = useState<{
    orderNumber?: string;
    contact?: string;
    reasonCategory?: string;
  }>({});

  const [preparedTicket, setPreparedTicket] = useState<{
    orderNumber: string;
    contact: string;
    reason: string;
    details: string;
    timestamp: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  // Validate form
  const validate = () => {
    const errs: typeof errors = {};

    if (!orderNumber.trim() || orderNumber.trim().length < 3) {
      errs.orderNumber =
        lang === 'en'
          ? 'Please enter a valid order number (at least 3 characters)'
          : 'Пожалуйста, введите корректный номер заказа (не менее 3 символов)';
    }

    const cleanContact = contact.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanContact);
    const isPhone = cleanContact.replace(/\D/g, '').length >= 7;

    if (!cleanContact || (!isEmail && !isPhone)) {
      errs.contact =
        lang === 'en'
          ? 'Please provide a valid phone number or email address'
          : 'Укажите номер телефона или корректный адрес эл. почты';
    }

    if (!reasonCategory) {
      errs.reasonCategory =
        lang === 'en'
          ? 'Please select a cancellation reason'
          : 'Пожалуйста, выберите причину отмены';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePrepare = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const ticket = {
      orderNumber: orderNumber.trim().toUpperCase(),
      contact: contact.trim(),
      reason: reasonCategory,
      details: details.trim(),
      timestamp: new Date().toLocaleString(lang === 'en' ? 'en-US' : 'ru-RU'),
    };

    setPreparedTicket(ticket);
    showToast(
      lang === 'en'
        ? 'Cancellation ticket generated. Choose dispatch method.'
        : 'Заявка сформирована. Выберите способ отправки оператору.'
    );
  };

  const buildMailtoUrl = () => {
    if (!preparedTicket) return '';
    const subject = `AURA MOBILE: Cancellation Request #${preparedTicket.orderNumber}`;
    const body = lang === 'en' 
      ? `PRIORITY ORDER CANCELLATION REQUEST:
--------------------------------------------------
Order Identifier: ${preparedTicket.orderNumber}
Contact Information: ${preparedTicket.contact}
Reason: ${preparedTicket.reason}
Additional Notes: ${preparedTicket.details || 'None provided'}
Timestamp: ${preparedTicket.timestamp}
--------------------------------------------------
Generated via AURA Mobile official online cancellation portal.`
      : `ЗАЯВКА НА ОТМЕНУ ЗАКАЗА:
--------------------------------------------------
Номер заказа: ${preparedTicket.orderNumber}
Контактные данные: ${preparedTicket.contact}
Причина отмены: ${preparedTicket.reason}
Дополнительно: ${preparedTicket.details || 'Не указано'}
Время обращения: ${preparedTicket.timestamp}
--------------------------------------------------
Сформировано через онлайн-портал AURA Mobile.`;

    return `mailto:${storeInfo.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const copyTicketText = async () => {
    if (!preparedTicket) return;
    const text = lang === 'en'
      ? `Order Cancellation Request:
• Order #: ${preparedTicket.orderNumber}
• Contact: ${preparedTicket.contact}
• Reason: ${preparedTicket.reason}
• Notes: ${preparedTicket.details || 'None'}
• Date: ${preparedTicket.timestamp}`
      : `Запрос на отмену заказа:
• Номер заказа: ${preparedTicket.orderNumber}
• Контакт: ${preparedTicket.contact}
• Причина: ${preparedTicket.reason}
• Комментарий: ${preparedTicket.details || 'Нет'}
• Дата: ${preparedTicket.timestamp}`;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      showToast(lang === 'en' ? 'Ticket copied to clipboard!' : 'Текст скопирован!');
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      showToast(
        lang === 'en'
          ? 'Failed to copy automatically. Please select and copy manually.'
          : 'Не удалось скопировать автоматически. Пожалуйста, выделите текст вручную.'
      );
    }
  };

  return (
    <section aria-labelledby="cancellation-form-title" className="bg-[#f7f8f3] border border-[#e2e7da] rounded-2xl p-6 sm:p-8 mt-10">
      <div className="border-b border-[#e5e8de] pb-4 mb-6">
        <div className="flex items-center gap-2 text-xs font-bold text-[#5c6e51] uppercase tracking-wider mb-1">
          <FileText className="w-4 h-4 text-[#314b35]" />
          <span>{lang === 'en' ? 'ONLINE DISPATCH' : 'ОНЛАЙН ОБРАЩЕНИЕ'}</span>
        </div>
        <h2 id="cancellation-form-title" className="font-heading font-extrabold text-xl sm:text-2xl text-[#222b23]">
          {lang === 'en' ? 'Order Cancellation Form' : 'Форма отмены заказа'}
        </h2>
        <p className="text-xs sm:text-sm text-[#707968] mt-1">
          {lang === 'en'
            ? 'If your order has not yet been delivered, generate a formal cancellation ticket for prompt processing.'
            : 'Если ваш заказ ещё не доставлен, сформируйте заявку на отмену и направьте её оператору.'}
        </p>
      </div>

      {!preparedTicket ? (
        <form onSubmit={handlePrepare} noValidate className="space-y-5">
          {/* Order number */}
          <div>
            <label htmlFor="orderNumber" className="block text-xs font-semibold text-[#222b23] mb-1.5">
              {lang === 'en' ? 'Order Identifier / Number' : 'Номер заказа'}{' '}
              <span className="text-red-500">*</span>
            </label>
            <input
              id="orderNumber"
              type="text"
              value={orderNumber}
              onChange={(e) => {
                setOrderNumber(e.target.value);
                if (errors.orderNumber) setErrors({ ...errors, orderNumber: undefined });
              }}
              placeholder={lang === 'en' ? 'e.g. AURA-84920' : 'Например: AURA-84920'}
              className={`w-full px-4 py-2.5 rounded-xl bg-white border text-xs sm:text-sm text-[#222b23] transition-colors focus:outline-none ${
                errors.orderNumber
                  ? 'border-red-400 focus:border-red-500 ring-1 ring-red-400'
                  : 'border-[#d6decb] focus:border-[#314b35] focus:ring-1 focus:ring-[#314b35]'
              }`}
            />
            {errors.orderNumber && (
              <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.orderNumber}</span>
              </p>
            )}
          </div>

          {/* Contact phone or email */}
          <div>
            <label htmlFor="contact" className="block text-xs font-semibold text-[#222b23] mb-1.5">
              {lang === 'en' ? 'Contact Phone or Email Address' : 'Номер телефона или эл. почта'}{' '}
              <span className="text-red-500">*</span>
            </label>
            <input
              id="contact"
              type="text"
              value={contact}
              onChange={(e) => {
                setContact(e.target.value);
                if (errors.contact) setErrors({ ...errors, contact: undefined });
              }}
              placeholder={lang === 'en' ? '+1 (555) 019-2834 or client@domain.com' : '+1 (555) 019-2834 или client@domain.com'}
              className={`w-full px-4 py-2.5 rounded-xl bg-white border text-xs sm:text-sm text-[#222b23] transition-colors focus:outline-none ${
                errors.contact
                  ? 'border-red-400 focus:border-red-500 ring-1 ring-red-400'
                  : 'border-[#d6decb] focus:border-[#314b35] focus:ring-1 focus:ring-[#314b35]'
              }`}
            />
            {errors.contact && (
              <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.contact}</span>
              </p>
            )}
          </div>

          {/* Cancellation reason */}
          <div>
            <label htmlFor="reasonCategory" className="block text-xs font-semibold text-[#222b23] mb-1.5">
              {lang === 'en' ? 'Reason for Cancellation' : 'Причина отмены'}{' '}
              <span className="text-red-500">*</span>
            </label>
            <select
              id="reasonCategory"
              value={reasonCategory}
              onChange={(e) => {
                setReasonCategory(e.target.value);
                if (errors.reasonCategory) setErrors({ ...errors, reasonCategory: undefined });
              }}
              className={`w-full px-4 py-2.5 rounded-xl bg-white border text-xs sm:text-sm text-[#222b23] transition-colors focus:outline-none ${
                errors.reasonCategory
                  ? 'border-red-400 focus:border-red-500 ring-1 ring-red-400'
                  : 'border-[#d6decb] focus:border-[#314b35] focus:ring-1 focus:ring-[#314b35]'
              }`}
            >
              <option value="">
                {lang === 'en' ? '-- Select a reason --' : '-- Выберите причину --'}
              </option>
              <option value={lang === 'en' ? 'Changed device model, storage, or color' : 'Нужно выбрать другую модель или цвет'}>
                {lang === 'en' ? 'Changed device model, storage, or color' : 'Нужно выбрать другую модель или цвет'}
              </option>
              <option value={lang === 'en' ? 'Estimated delivery time does not suit schedule' : 'Не подошли сроки доставки'}>
                {lang === 'en' ? 'Estimated delivery time does not suit schedule' : 'Не подошли сроки доставки'}
              </option>
              <option value={lang === 'en' ? 'Purchase postponed / Personal financial reason' : 'Покупка отложена / Финансовая причина'}>
                {lang === 'en' ? 'Purchase postponed / Personal financial reason' : 'Покупка отложена / Финансовая причина'}
              </option>
              <option value={lang === 'en' ? 'Accidental or duplicate order submission' : 'Ошибочное оформление заказа'}>
                {lang === 'en' ? 'Accidental or duplicate order submission' : 'Ошибочное оформление заказа'}
              </option>
              <option value={lang === 'en' ? 'Other inquiry' : 'Другая причина'}>
                {lang === 'en' ? 'Other inquiry' : 'Другая причина'}
              </option>
            </select>
            {errors.reasonCategory && (
              <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.reasonCategory}</span>
              </p>
            )}
          </div>

          {/* Additional details */}
          <div>
            <label htmlFor="details" className="block text-xs font-semibold text-[#222b23] mb-1.5">
              {lang === 'en' ? 'Additional Details (Optional)' : 'Дополнительный комментарий (необязательно)'}
            </label>
            <textarea
              id="details"
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={
                lang === 'en'
                  ? 'Courier arrival status, alternative address request, or special instructions...'
                  : 'Курьер уже в пути или заказ на складе? Пожелания по отмене...'
              }
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d6decb] text-xs sm:text-sm text-[#222b23] transition-colors focus:outline-none focus:border-[#314b35] focus:ring-1 focus:ring-[#314b35]"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[11px] text-[#707968]">
              {lang === 'en'
                ? '* Cancellation requests are confirmed immediately by our concierge desk.'
                : '* Заявка на отмену подтверждается оператором магазина.'}
            </span>

            <button
              type="submit"
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#314b35] hover:bg-[#243c28] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <span>{lang === 'en' ? 'Generate Cancellation Ticket' : 'Сформировать заявку'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      ) : (
        /* Prepared Ticket State */
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-4 rounded-xl bg-[#f4f7f0] border border-[#d8e2d0] text-xs text-[#3b553c] flex items-start gap-3">
            <Clock className="w-4 h-4 text-[#314b35] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="block text-[#273d2a] font-semibold mb-0.5">
                {lang === 'en'
                  ? 'Priority Processing Guarantee:'
                  : 'Порядок обработки (Дежурный менеджер):'}
              </strong>
              <p className="text-[11px] text-[#4d6148]">
                {lang === 'en'
                  ? 'Cancellation tickets are dispatched directly to our round-the-clock logistics team. To ensure fast resolution, choose Email dispatch or Telegram, or copy the ticket text directly:'
                  : 'Заявки на отмену заказа рассматриваются дежурными операторами круглосуточно. Для оперативной передачи данных выберите удобный канал связи (Email или чат Telegram) либо скопируйте сформированный текст:'}
              </p>
            </div>
          </div>

          {/* Ticket Card */}
          <div className="bg-white rounded-xl border border-[#e2e7da] p-5 shadow-xs text-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-[#eff1e9] pb-2.5">
              <span className="font-bold text-[#314b35] uppercase tracking-wider text-[11px]">
                {lang === 'en' ? 'CANCELLATION TICKET' : 'СНИМОК ЗАЯВКИ'}
              </span>
              <span className="text-[#8c9484] text-[11px]">{preparedTicket.timestamp}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div>
                <span className="text-[#8c9484] block text-[11px]">
                  {lang === 'en' ? 'Order Number:' : 'Номер заказа:'}
                </span>
                <strong className="text-[#222b23] text-sm font-heading">{preparedTicket.orderNumber}</strong>
              </div>
              <div>
                <span className="text-[#8c9484] block text-[11px]">
                  {lang === 'en' ? 'Contact Information:' : 'Контактные данные:'}
                </span>
                <strong className="text-[#222b23] text-sm">{preparedTicket.contact}</strong>
              </div>
            </div>

            <div className="pt-1">
              <span className="text-[#8c9484] block text-[11px]">
                {lang === 'en' ? 'Reason:' : 'Причина:'}
              </span>
              <span className="text-[#222b23] font-medium">{preparedTicket.reason}</span>
            </div>

            {preparedTicket.details && (
              <div className="pt-1">
                <span className="text-[#8c9484] block text-[11px]">
                  {lang === 'en' ? 'Comments:' : 'Комментарий:'}
                </span>
                <p className="text-[#555d51] bg-[#f9faf6] p-2.5 rounded-lg border border-[#eef2e7]">
                  {preparedTicket.details}
                </p>
              </div>
            )}
          </div>

          {/* Real actionable channels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Mailto button */}
            <div className="flex flex-col">
              <a
                href={buildMailtoUrl()}
                className="py-3 px-4 rounded-xl bg-[#314b35] hover:bg-[#243c28] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Mail className="w-4 h-4" />
                <span>{lang === 'en' ? 'Send via Email Client' : 'Отправить по Email'}</span>
              </a>
              <span className="text-[10px] text-[#707968] mt-1.5 text-center leading-tight">
                {lang === 'en'
                  ? 'Launches your email application (Gmail, Outlook, Mail) with prepopulated details.'
                  : 'Открывает почтовое приложение (Gmail/Outlook) с предзаполненным текстом обращения.'}
              </span>
            </div>

            {/* Telegram support button */}
            <div className="flex flex-col">
              <a
                href={storeInfo.telegramSupport}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>{lang === 'en' ? 'Send via Telegram' : 'Отправить в Telegram'}</span>
              </a>
              <span className="text-[10px] text-[#707968] mt-1.5 text-center leading-tight">
                {lang === 'en'
                  ? 'Opens 24/7 client concierge Telegram chat for real-time live support.'
                  : 'Открывает круглосуточный чат поддержки Telegram для мгновенного ответа.'}
              </span>
            </div>
          </div>

          {/* Secondary actions: Copy & Edit */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={copyTicketText}
              className="py-2.5 px-4 rounded-xl bg-white border border-[#d6decb] text-[#222b23] hover:bg-[#f6f7f3] text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (lang === 'en' ? 'Copied!' : 'Скопировано!') : (lang === 'en' ? 'Copy Ticket Text' : 'Скопировать текст')}</span>
            </button>

            <button
              type="button"
              onClick={() => setPreparedTicket(null)}
              className="py-2.5 px-4 rounded-xl text-[#707968] hover:text-[#222b23] hover:bg-[#ecefe4] text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Edit Ticket' : 'Редактировать заявку'}</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
