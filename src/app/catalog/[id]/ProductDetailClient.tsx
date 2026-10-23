'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { products, formatPrice } from '@/data/products';
import { useApp } from '@/context/AppContext';
import { storeInfo } from '@/data/storeInfo';
import { ProductCard } from '@/components/ProductCard';
import {
  Home,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  Phone,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle2,
  CreditCard,
} from 'lucide-react';

interface Props {
  product: Product;
}

export function ProductDetailClient({ product }: Props) {
  const { lang, isFavorite, toggleFavorite } = useApp();

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(product.storage);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const isFav = isFavorite(product.id);
  const activeColor = product.colors[selectedColorIndex] || {
    name: product.color,
    hex: '#888',
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.brand === product.brand || p.tag === 'popular'))
    .slice(0, 4);

  return (
    <div className="py-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#707968] mb-8">
        <Link href="/" className="hover:text-[#314b35] flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span>{lang === 'en' ? 'Home' : 'Главная'}</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#a6b09e]" />
        <Link href="/catalog" className="hover:text-[#314b35]">
          {lang === 'en' ? 'Catalog' : 'Каталог'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#a6b09e]" />
        <span className="font-semibold text-[#222b23] line-clamp-1">{product.name}</span>
      </nav>

      {/* Main Product Showcase Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl border border-[#e8e9e2] p-6 sm:p-10 shadow-xs mb-16">
        {/* Left: Product image presentation */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="relative w-full h-80 sm:h-96 lg:h-[460px] bg-[#f5f6f1] rounded-2xl p-8 flex items-center justify-center overflow-hidden border border-[#edf0e7]">
            {product.tag && (
              <span className="absolute top-4 left-4 z-10 text-[11px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-[#e6ebdd] text-[#4d6639] border border-[#d6dec9]">
                {product.tag === 'new'
                  ? lang === 'en' ? 'New Release' : 'Новинка'
                  : lang === 'en' ? 'Popular Flagship' : 'Популярный флагман'}
              </span>
            )}

            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              aria-label={isFav ? 'Remove favorite' : 'Add favorite'}
              className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                isFav
                  ? 'bg-[#314b35] text-white shadow-xs'
                  : 'bg-white text-[#707968] hover:text-[#314b35] shadow-xs'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={product.image}
                alt={`${product.name} ${activeColor.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain drop-shadow-[0_20px_35px_rgba(34,43,35,0.15)] transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Color swatch selection strip */}
          <div className="mt-4 p-4 rounded-xl bg-[#f9faf6] border border-[#e8ece0] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#707968] font-medium">
                {lang === 'en' ? 'Available Finishes:' : 'Доступные цвета:'}
              </span>
              <span className="text-xs font-bold text-[#222b23]">{activeColor.name}</span>
            </div>

            <div className="flex items-center gap-2">
              {product.colors.map((color, idx) => (
                <button
                  key={color.name + idx}
                  type="button"
                  onClick={() => setSelectedColorIndex(idx)}
                  className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${
                    selectedColorIndex === idx
                      ? 'ring-2 ring-offset-2 ring-[#314b35] scale-110'
                      : 'opacity-80 hover:opacity-100 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Details, pricing, specs, actions */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#eef2e7] text-[#314b35] text-xs font-bold tracking-wider uppercase mb-2">
              <Sparkles className="w-3 h-3" />
              <span>{product.brand}</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#222b23] tracking-tight mb-2">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-[#707968] leading-relaxed mb-6">
              {lang === 'en' ? (product.descriptionEn || product.description) : (product.descriptionRu || product.description)}
            </p>

            {/* Storage selection */}
            {product.availableStorages && (
              <div className="mb-6">
                <span className="text-xs font-bold text-[#222b23] uppercase tracking-wider block mb-2">
                  {lang === 'en' ? 'Select Storage Capacity:' : 'Выберите объём памяти:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.availableStorages.map((storage) => (
                    <button
                      key={storage}
                      type="button"
                      onClick={() => setSelectedStorage(storage)}
                      className={`text-xs px-4 py-2.5 rounded-xl border font-semibold transition-all cursor-pointer ${
                        selectedStorage === storage
                          ? 'bg-[#314b35] text-white border-[#314b35] shadow-xs'
                          : 'bg-[#f7f8f3] text-[#707968] border-[#e2e7da] hover:border-[#b8c2af]'
                      }`}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price Box */}
            <div className="p-5 rounded-2xl bg-[#edf0e6] border border-[#dbe3d4] mb-6">
              <span className="text-[11px] text-[#707968] font-bold uppercase tracking-wider block mb-1">
                {lang === 'en' ? 'Flagship Price' : 'Розничная цена'}
              </span>
              <div className="flex items-baseline gap-2">
                <strong className="font-heading font-black text-3xl text-[#222b23]">
                  {formatPrice(product.price)}
                </strong>
                <span className="text-xs text-[#707968]">
                  {lang === 'en' ? '(Insured Dispatch)' : '(с гарантией)'}
                </span>
              </div>
              <p className="text-[11px] text-[#6d7965] mt-2 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {lang === 'en'
                    ? 'Global door-to-door courier and 24-month AURA Care warranty included.'
                    : 'Международная доставка курьером и 2 года гарантии AURA Care включены.'}
                </span>
              </p>
            </div>

            {/* Guarantees 3 badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f9faf6] border border-[#e8ece0] text-xs text-[#5c6859]">
                <ShieldCheck className="w-4 h-4 text-[#314b35] shrink-0" />
                <span>{lang === 'en' ? '2-Yr AURA Care' : '2 года гарантии'}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f9faf6] border border-[#e8ece0] text-xs text-[#5c6859]">
                <Truck className="w-4 h-4 text-[#314b35] shrink-0" />
                <span>{lang === 'en' ? 'Express Dispatch' : 'Экспресс-доставка'}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f9faf6] border border-[#e8ece0] text-xs text-[#5c6859]">
                <RotateCcw className="w-4 h-4 text-[#314b35] shrink-0" />
                <span>{lang === 'en' ? '30-Day Return' : '30 дней возврат'}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href={`/payment?productId=${encodeURIComponent(product.id)}&name=${encodeURIComponent(product.name)}&color=${encodeURIComponent(activeColor.name)}&storage=${encodeURIComponent(selectedStorage || '')}&price=${product.price}`}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-[#314b35] hover:bg-[#243c28] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Express Checkout' : 'Оформить заказ'}</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setContactModalOpen(true)}
                  className="py-3.5 px-5 rounded-xl bg-[#eef3e8] hover:bg-[#e0ecd7] border border-[#d3dfc7] text-[#243c28] active:scale-[0.98] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#314b35]" />
                  <span>{lang === 'en' ? 'Concierge Desk' : 'Консьерж'}</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-[#707968] pt-1">
                <span>
                  {lang === 'en' ? 'Warranty & shipping terms:' : 'Условия доставки и гарантии:'}
                </span>
                <Link
                  href="/payment-info"
                  className="text-[#314b35] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>{lang === 'en' ? 'Payment Methods' : 'Правила оплаты'}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Table */}
      <section className="bg-white rounded-3xl border border-[#e8e9e2] p-6 sm:p-10 mb-16 shadow-xs">
        <div className="border-b border-[#eff1e9] pb-4 mb-6">
          <span className="text-[11px] font-bold tracking-widest text-[#5c6e51] uppercase block mb-1">
            {lang === 'en' ? 'SPECIFICATIONS' : 'ХАРАКТЕРИСТИКИ'}
          </span>
          <h2 className="font-heading font-extrabold text-2xl text-[#222b23]">
            {lang === 'en' ? 'Technical Architecture' : 'Технические характеристики'}
          </h2>
        </div>

        <div className="divide-y divide-[#eff1e9] text-xs sm:text-sm">
          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <span className="text-[#8c9484] font-medium">
              {lang === 'en' ? 'Model & Brand' : 'Модель и бренд'}
            </span>
            <span className="sm:col-span-2 text-[#222b23] font-semibold">
              {product.brand} {product.name}
            </span>
          </div>

          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <span className="text-[#8c9484] font-medium">
              {lang === 'en' ? 'Display' : 'Дисплей'}
            </span>
            <span className="sm:col-span-2 text-[#222b23]">{product.screen}</span>
          </div>

          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <span className="text-[#8c9484] font-medium">
              {lang === 'en' ? 'Storage Capacity' : 'Встроенная память'}
            </span>
            <span className="sm:col-span-2 text-[#222b23]">{selectedStorage}</span>
          </div>

          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <span className="text-[#8c9484] font-medium">
              {lang === 'en' ? 'Color Finish' : 'Цвет'}
            </span>
            <span className="sm:col-span-2 text-[#222b23]">{activeColor.name}</span>
          </div>

          {product.specs?.processor && (
            <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="text-[#8c9484] font-medium">
                {lang === 'en' ? 'Processor' : 'Процессор'}
              </span>
              <span className="sm:col-span-2 text-[#222b23]">{product.specs.processor}</span>
            </div>
          )}

          {product.specs?.camera && (
            <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="text-[#8c9484] font-medium">
                {lang === 'en' ? 'Camera System' : 'Камера'}
              </span>
              <span className="sm:col-span-2 text-[#222b23]">{product.specs.camera}</span>
            </div>
          )}

          {product.specs?.battery && (
            <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="text-[#8c9484] font-medium">
                {lang === 'en' ? 'Battery & Power' : 'Аккумулятор'}
              </span>
              <span className="sm:col-span-2 text-[#222b23]">{product.specs.battery}</span>
            </div>
          )}

          {product.specs?.os && (
            <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="text-[#8c9484] font-medium">
                {lang === 'en' ? 'Operating System' : 'Операционная система'}
              </span>
              <span className="sm:col-span-2 text-[#222b23]">{product.specs.os}</span>
            </div>
          )}

          {product.specs?.warranty && (
            <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="text-[#8c9484] font-medium">
                {lang === 'en' ? 'Warranty' : 'Гарантийный сервис'}
              </span>
              <span className="sm:col-span-2 text-[#314b35] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                {product.specs.warranty}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="my-16">
          <div className="mb-8">
            <span className="text-[11px] font-bold tracking-widest text-[#5c6e51] uppercase block mb-1">
              {lang === 'en' ? 'SIMILAR MODELS' : 'ПОХОЖИЕ МОДЕЛИ'}
            </span>
            <h2 className="font-heading font-extrabold text-2xl text-[#222b23]">
              {lang === 'en' ? 'You May Also Consider' : 'Вам также может подойти'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Order Inquiry Modal */}
      {contactModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
          onClick={() => setContactModalOpen(false)}
        >
          <div
            className="bg-[#fcfcf9] rounded-2xl border border-[#e8e9e2] p-6 sm:p-8 max-w-md w-full shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#eef2e7] text-[#314b35] flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-[#222b23]">
                  {lang === 'en' ? 'VIP Concierge Desk' : 'Оформление заказа'}
                </h3>
                <span className="text-xs text-[#707968]">
                  {product.name} ({selectedStorage}, {activeColor.name})
                </span>
              </div>
            </div>

            <p className="text-xs text-[#707968] leading-relaxed mb-6">
              {lang === 'en'
                ? 'Connect with an AURA Concierge specialist for bespoke ordering, express logistics, or private showroom visits:'
                : 'Для оформления заказа, доставки или консультации свяжитесь с нашими операторами:'}
            </p>

            <div className="space-y-3 mb-6 text-xs">
              <a
                href={`tel:${storeInfo.phone}`}
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#e2e7da] hover:border-[#314b35] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#314b35]" />
                  <span className="font-bold text-[#222b23]">{storeInfo.phoneDisplay}</span>
                </div>
                <span className="text-[11px] text-[#314b35] font-semibold">
                  {lang === 'en' ? 'Call Now' : 'Позвонить'}
                </span>
              </a>

              <a
                href={storeInfo.telegramSupport}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#e2e7da] hover:border-[#314b35] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-[#0088cc]">Telegram</span>
                  <span className="text-[#222b23]">@auramobile_concierge</span>
                </div>
                <span className="text-[11px] text-[#314b35] font-semibold">
                  {lang === 'en' ? 'Message' : 'Написать'}
                </span>
              </a>
            </div>

            <button
              type="button"
              onClick={() => setContactModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#f0f2e9] text-[#314b35] text-xs font-semibold hover:bg-[#e2e7da] transition-colors cursor-pointer"
            >
              {lang === 'en' ? 'Close' : 'Закрыть'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
