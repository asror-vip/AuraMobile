'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { formatPrice } from '@/data/products';
import { X, ArrowRight, Phone, ShieldCheck } from 'lucide-react';

export function ProductModal() {
  const { lang, selectedProduct, setSelectedProduct } = useApp();

  if (!selectedProduct) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={() => setSelectedProduct(null)}
    >
      <div
        className="relative bg-[#fcfcf9] rounded-2xl border border-[#e8e9e2] shadow-2xl max-w-3xl w-full overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setSelectedProduct(null)}
          aria-label={lang === 'en' ? 'Close' : 'Закрыть'}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#f0f2e9] text-[#222b23] hover:bg-[#e2e7da] active:scale-90 flex items-center justify-center transition-all duration-200"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Image showcase */}
          <div className="bg-[#f0f2e9] p-8 flex items-center justify-center relative min-h-[300px] md:min-h-[420px]">
            <div className="relative w-full h-full min-h-[260px] md:min-h-[360px] flex items-center justify-center">
              <Image
                src={selectedProduct.image}
                alt={`${selectedProduct.name} ${selectedProduct.color}`}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-contain drop-shadow-[0_16px_28px_rgba(34,43,35,0.14)]"
              />
            </div>
          </div>

          {/* Right: Details & specs */}
          <div className="p-6 md:p-8 flex flex-col justify-between gap-6 max-h-[85vh] overflow-y-auto">
            <div>
              {/* Brand and category */}
              <div className="flex items-center gap-2 text-xs text-[#707968] mb-1">
                <span className="font-bold uppercase tracking-wider text-[#314b35]">
                  {selectedProduct.brand}
                </span>
                <span>·</span>
                <span>{selectedProduct.color}</span>
              </div>

              {/* Title */}
              <h2 id="modal-title" className="font-heading font-extrabold text-2xl text-[#222b23]">
                {selectedProduct.name}
              </h2>

              {/* Storage pills */}
              {selectedProduct.availableStorages && (
                <div className="mt-4">
                  <span className="text-[11px] font-semibold text-[#707968] uppercase tracking-wider block mb-2">
                    {lang === 'en' ? 'Storage Capacity' : 'Объём памяти'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.availableStorages.map((storage) => (
                      <span
                        key={storage}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-medium ${
                          storage === selectedProduct.storage
                            ? 'bg-[#314b35] text-white border-[#314b35]'
                            : 'bg-white text-[#707968] border-[#e8e9e2]'
                        }`}
                      >
                        {storage}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Specs list */}
              <div className="mt-5 space-y-2.5 text-xs text-[#5c6859] border-t border-b border-[#e8e9e2] py-4">
                <div className="flex justify-between">
                  <span className="text-[#8c9484]">{lang === 'en' ? 'Display:' : 'Экран:'}</span>
                  <strong className="text-[#222b23] text-right font-medium">
                    {selectedProduct.screen}
                  </strong>
                </div>
                {selectedProduct.specs?.processor && (
                  <div className="flex justify-between">
                    <span className="text-[#8c9484]">{lang === 'en' ? 'Processor:' : 'Процессор:'}</span>
                    <strong className="text-[#222b23] text-right font-medium">
                      {selectedProduct.specs.processor}
                    </strong>
                  </div>
                )}
                {selectedProduct.specs?.camera && (
                  <div className="flex justify-between">
                    <span className="text-[#8c9484]">{lang === 'en' ? 'Camera:' : 'Камера:'}</span>
                    <strong className="text-[#222b23] text-right font-medium">
                      {selectedProduct.specs.camera}
                    </strong>
                  </div>
                )}
                {selectedProduct.specs?.warranty && (
                  <div className="flex justify-between">
                    <span className="text-[#8c9484]">{lang === 'en' ? 'Warranty:' : 'Гарантия:'}</span>
                    <strong className="text-[#222b23] text-right font-medium">
                      {selectedProduct.specs.warranty}
                    </strong>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="mt-5">
                <span className="text-[11px] text-[#8c9484] uppercase tracking-wider block">
                  {lang === 'en' ? 'Price' : 'Цена'}
                </span>
                <strong className="font-heading font-black text-2xl text-[#222b23]">
                  {formatPrice(selectedProduct.price)}
                </strong>
                <p className="text-[11px] text-[#8c9484] mt-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#314b35] shrink-0" />
                  <span>
                    {lang === 'en'
                      ? 'Official AURA Care warranty & worldwide delivery'
                      : 'Официальная гарантия AURA Care и доставка'}
                  </span>
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2 pt-2">
              <Link
                href={`/catalog/${selectedProduct.id}`}
                onClick={() => setSelectedProduct(null)}
                className="w-full py-3 bg-[#314b35] hover:bg-[#243c28] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span>{lang === 'en' ? 'Full Device Specifications' : 'Все характеристики'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contacts"
                onClick={() => setSelectedProduct(null)}
                className="w-full py-2.5 bg-[#f0f2e9] hover:bg-[#e2e7da] text-[#314b35] text-xs font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Showroom & Concierge' : 'Консьерж-сервис'}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
