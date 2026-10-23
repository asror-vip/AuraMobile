'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { storeInfo } from '@/data/storeInfo';
import { Brand } from '@/types';
import { useApp } from '@/context/AppContext';
import { Search, Heart, RotateCcw, Home, ChevronRight, Phone } from 'lucide-react';

function CatalogContent() {
  const { lang, favorites } = useApp();
  const searchParams = useSearchParams();

  const initialBrand = (searchParams.get('brand') as Brand) || 'All';
  const initialFav = searchParams.get('favorites') === 'true';

  const [selectedBrand, setSelectedBrand] = useState<Brand>(initialBrand);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStorage, setSelectedStorage] = useState<string>('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(initialFav);
  const [sortBy, setSortBy] = useState<'featured' | 'low' | 'high'>('featured');

  useEffect(() => {
    const brandParam = searchParams.get('brand') as Brand;
    if (brandParam && ['Apple', 'Samsung', 'Xiaomi', 'Honor'].includes(brandParam)) {
      setSelectedBrand(brandParam);
    }
    if (searchParams.get('favorites') === 'true') {
      setShowFavoritesOnly(true);
    }
  }, [searchParams]);

  const brands: Brand[] = ['All', 'Apple', 'Samsung', 'Xiaomi', 'Honor'];
  const storages = ['All', '128 GB', '256 GB'];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedBrand !== 'All' && p.brand !== selectedBrand) return false;
        if (showFavoritesOnly && !favorites.includes(p.id)) return false;
        if (selectedStorage !== 'All' && !p.storage.includes(selectedStorage)) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchColor = p.color.toLowerCase().includes(q);
          return matchName || matchBrand || matchColor;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'low') return a.price - b.price;
        if (sortBy === 'high') return b.price - a.price;
        return 0;
      });
  }, [selectedBrand, showFavoritesOnly, selectedStorage, searchQuery, sortBy, favorites]);

  const resetFilters = () => {
    setSelectedBrand('All');
    setSearchQuery('');
    setSelectedStorage('All');
    setShowFavoritesOnly(false);
    setSortBy('featured');
  };

  return (
    <div className="py-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#707968] mb-6">
        <Link href="/" className="hover:text-[#314b35] flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span>{lang === 'en' ? 'Home' : 'Главная'}</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#a6b09e]" />
        <span className="font-semibold text-[#222b23]">
          {lang === 'en' ? 'Smartphone Catalog' : 'Каталог смартфонов'}
        </span>
      </nav>

      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-[#5c6e51] uppercase block mb-1">
            {lang === 'en' ? 'AUTHENTIC FLAGSHIPS' : 'ОРИГИНАЛЬНАЯ ПРОДУКЦИЯ'}
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#222b23] tracking-tight">
            {lang === 'en' ? 'Flagship Smartphone Catalog' : 'Каталог смартфонов'}
          </h1>
          <p className="text-xs sm:text-sm text-[#707968] mt-1 max-w-xl">
            {lang === 'en'
              ? 'Discover next-generation devices from Apple, Samsung, and Xiaomi with worldwide express delivery.'
              : 'Новейшие флагманские смартфоны Apple, Samsung и Xiaomi с международной экспресс-доставкой.'}
          </p>
        </div>

        <div className="text-xs font-semibold text-[#314b35] bg-[#eef2e7] border border-[#dbe3d4] px-4 py-2 rounded-xl self-start sm:self-auto">
          {filteredProducts.length} {lang === 'en' ? 'models available' : 'моделей доступно'}
        </div>
      </div>

      {/* Main Filter & Search Toolbar */}
      <div className="bg-[#f7f8f3] border border-[#e8e9e2] rounded-2xl p-5 mb-8 flex flex-col gap-4">
        {/* Row 1: Brand tabs + Search input */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Brand pills */}
          <div className="flex flex-wrap items-center gap-2">
            {brands.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setSelectedBrand(b)}
                className={`text-xs px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedBrand === b
                    ? 'bg-[#314b35] text-white shadow-xs'
                    : 'bg-white text-[#707968] hover:text-[#222b23] border border-[#e2e7da]'
                }`}
              >
                {b === 'All' ? (lang === 'en' ? 'All Brands' : 'Все бренды') : b}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-[#8c9484] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="catalog-search"
              name="search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'en' ? 'Search (e.g. iPhone 16)...' : 'Поиск (напр.: iPhone 16)...'}
              className="w-full bg-white border border-[#e2e7da] rounded-xl pl-10 pr-4 py-2 text-xs text-[#222b23] placeholder-[#8c9484] focus:outline-none focus:border-[#314b35]"
            />
          </div>
        </div>

        {/* Row 2: Secondary filters (Storage, Favorites, Sort, Reset) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#e8ece0]">
          {/* Storage pills */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-[#8c9484]">
              {lang === 'en' ? 'Storage:' : 'Память:'}
            </span>
            {storages.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedStorage(s)}
                className={`text-[11px] px-3 py-1 rounded-lg transition-all ${
                  selectedStorage === s
                    ? 'bg-[#486348] text-white font-semibold'
                    : 'bg-white text-[#707968] border border-[#e2e7da] hover:text-[#222b23]'
                }`}
              >
                {s === 'All' ? (lang === 'en' ? 'All' : 'Все') : s}
              </button>
            ))}
          </div>

          {/* Favorites, Sort & Reset */}
          <div className="flex items-center gap-3">
            {/* Favorites toggle */}
            <button
              type="button"
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all ${
                showFavoritesOnly
                  ? 'bg-[#314b35] text-white border-[#314b35]'
                  : 'bg-white text-[#707968] border-[#e2e7da] hover:text-[#314b35]'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-current' : ''}`} />
              <span>{lang === 'en' ? 'Wishlist' : 'Избранное'}</span>
            </button>

            {/* Sort */}
            <select
              id="catalog-sort"
              name="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label={lang === 'en' ? 'Sort by' : 'Сортировка'}
              className="bg-white border border-[#e2e7da] rounded-lg px-3 py-1.5 text-xs text-[#707968] focus:outline-none focus:border-[#314b35] cursor-pointer"
            >
              <option value="featured">
                {lang === 'en' ? 'Featured First' : 'Рекомендуемые'}
              </option>
              <option value="low">
                {lang === 'en' ? 'Price: Low to High' : 'Сначала дешевле'}
              </option>
              <option value="high">
                {lang === 'en' ? 'Price: High to Low' : 'Сначала дороже'}
              </option>
            </select>

            {/* Reset */}
            {(selectedBrand !== 'All' || searchQuery || selectedStorage !== 'All' || showFavoritesOnly || sortBy !== 'featured') && (
              <button
                type="button"
                onClick={resetFilters}
                title={lang === 'en' ? 'Reset' : 'Сбросить'}
                className="p-1.5 rounded-lg bg-white border border-[#e2e7da] text-[#707968] hover:text-[#b34032]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of products */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      ) : (
        <div className="bg-[#f7f8f3] border border-[#e8e9e2] rounded-2xl p-10 sm:p-14 text-center max-w-lg mx-auto my-12 animate-fade-in shadow-xs">
          <Search className="w-10 h-10 text-[#8c9484] mx-auto mb-3" />
          <h3 className="font-heading font-bold text-lg text-[#222b23] mb-1">
            {selectedBrand === 'Honor'
              ? (lang === 'en' ? 'Honor Flagships — Made to Order' : 'Смартфоны Honor — Под заказ')
              : (lang === 'en' ? 'No smartphones found' : 'Смартфоны не найдены')}
          </h3>
          <p className="text-xs text-[#707968] mb-6 leading-relaxed">
            {selectedBrand === 'Honor' ? (
              lang === 'en'
                ? 'Honor flagship configurations are sourced on bespoke customer request with full international warranty. Contact our concierge to inquire about available colors and storage tiers.'
                : 'Флагманские устройства Honor поставляются по индивидуальному заказу с полной международной гарантией. Уточняйте наличие цветов и модификаций у консьержа.'
            ) : (
              lang === 'en'
                ? 'No devices match your selected criteria. Try resetting filters to browse our full collection.'
                : 'По выбранным параметрам смартфонов нет. Попробуйте сбросить фильтры.'
            )}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {selectedBrand === 'Honor' && (
              <a
                href={`tel:${storeInfo.phone}`}
                className="inline-flex items-center gap-2 bg-[#314b35] text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-[#243c28] transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? `Call: ${storeInfo.phoneDisplay}` : `Позвонить: ${storeInfo.phoneDisplay}`}</span>
              </a>
            )}
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 bg-white border border-[#d6decb] text-[#222b23] text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-[#f3f5ee] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Show All Brands' : 'Показать все бренды'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-[#707968]">Loading catalog...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
