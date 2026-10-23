'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ArrowRight, FileCheck, RotateCcw } from 'lucide-react';

interface PolicyCalloutProps {
  type: 'offer' | 'returns';
}

export function PolicyCallout({ type }: PolicyCalloutProps) {
  const { lang } = useApp();

  if (type === 'offer') {
    return (
      <div className="p-5 rounded-2xl bg-[#f0f4ea] border border-[#d6e0cc] text-xs text-[#3b553c] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <FileCheck className="w-5 h-5 text-[#314b35] shrink-0 mt-0.5" />
          <div>
            <strong className="block text-[#273d2a] font-semibold text-sm">
              {lang === 'en'
                ? 'Order Cancellation & Prior Dispatches'
                : 'Отмена заказа до передачи в доставку'}
            </strong>
            <p className="text-[11px] text-[#556955] mt-0.5">
              {lang === 'en'
                ? 'Need to cancel an unfulfilled order or review refund parameters? Visit our dedicated cancellation desk.'
                : 'Необходимо отменить заказ или ознакомиться с порядком возврата средств? Перейдите в раздел отмены заказов.'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/cancellation"
            className="shrink-0 py-2.5 px-4 rounded-xl bg-[#314b35] hover:bg-[#243c28] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>{lang === 'en' ? 'Cancellation Desk' : 'Регламент отмены'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl bg-[#f0f4ea] border border-[#d6e0cc] text-xs text-[#3b553c] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <RotateCcw className="w-5 h-5 text-[#314b35] shrink-0 mt-0.5" />
        <div>
          <strong className="block text-[#273d2a] font-semibold text-sm">
            {lang === 'en'
              ? 'Has your package not arrived yet?'
              : 'Ваш заказ ещё не был доставлен?'}
          </strong>
          <p className="text-[11px] text-[#556955] mt-0.5">
            {lang === 'en'
              ? 'If the order has not been handed over yet, you can utilize our fast-track pre-delivery cancellation form.'
              : 'Если посылка ещё не получена, вы можете воспользоваться ускоренной формой отмены до вручения курьером.'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/cancellation"
          className="shrink-0 py-2.5 px-4 rounded-xl bg-[#314b35] hover:bg-[#243c28] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <span>{lang === 'en' ? 'Cancel Order' : 'Отменить заказ'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
