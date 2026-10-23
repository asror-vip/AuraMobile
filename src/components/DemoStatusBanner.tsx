'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Sparkles, ArrowRight, Globe } from 'lucide-react';
import Link from 'next/link';

export function DemoStatusBanner() {
  const { lang } = useApp();

  return (
    <aside
      aria-label="AURA Global Showcase Announcement"
      className="bg-[#18281b] text-white py-2 px-3 text-[11px] sm:text-xs font-medium tracking-wide border-b border-[#263c2b] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2 justify-center">
          <span className="inline-flex items-center gap-1 bg-[#2e4c34] text-[#a4e0b0] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-[#7fe093]" />
            AURA 2026
          </span>
          <span className="text-white/90">
            {lang === 'en'
              ? 'Next-Gen Flagship Collection: Worldwide Express Dispatch & 2-Year AURA Care'
              : 'Флагманская коллекция нового поколения: Экспресс-доставка по миру и 2 года гарантии AURA Care'}
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-[#c2d6c6]">
          <span className="hidden md:inline-flex items-center gap-1 text-[#9ec4a4]">
            <Globe className="w-3 h-3" />
            24/7 Global Concierge
          </span>
          <span className="hidden md:inline text-white/30">|</span>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1 text-white hover:text-[#a4e0b0] font-semibold transition-colors group"
          >
            <span>{lang === 'en' ? 'Explore Catalog' : 'В каталог'}</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
