'use client';

import React, { useState, useMemo } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { BenefitsSection } from '@/components/BenefitsSection';
import { PaymentPromo } from '@/components/PaymentPromo';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { Brand } from '@/types';
import { useApp } from '@/context/AppContext';
import { Search, Heart, RotateCcw } from 'lucide-react';

export default function HomePage() {
  const { lang, favorites } = useApp();
  const [selectedBrand, setSelectedBrand] = useState<Brand>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'low' | 'high'>('featured');

  const brands: Brand[] = ['All', 'Apple', 'Samsung', 'Xiaomi'];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Brand filter
        if (selectedBrand !== 'All' && p.brand !== selectedBrand) {
          return false;
        }
        // Favorites filter
        if (showFavoritesOnly && !favorites.includes(p.id)) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchColor = p.color.toLowerCase().includes(q);
          const matchStorage = p.storage.toLowerCase().includes(q);
          return matchName || matchBrand || matchColor || matchStorage;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'low') return a.price - b.price;
        if (sortBy === 'high') return b.price - a.price;
        return 0; // featured
      });
  }, [selectedBrand, showFavoritesOnly, searchQuery, sortBy, favorites]);

  const resetFilters = () => {
    setSelectedBrand('All');
    setSearchQuery('');
    setShowFavoritesOnly(false);
    setSortBy('featured');
  };

  return (
    <div className="py-2">
      {/* Hero Banner */}
      <HeroSection />

      {/* Benefits pillars */}
      <BenefitsSection />

      {/* Catalog Section */}
      <section id="catalog" className="my-14 scroll-mt-24" data-reveal suppressHydrationWarning>
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-[#5c6e51] uppercase block mb-1">
              {lang === 'en' ? 'CURATED FLAGSHIP MODELS' : 'ИЗБРАННЫЕ МОДЕЛИ'}
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#222b23] tracking-tight">
              {lang === 'en' ? 'Which Flagship Suits You?' : 'Какой подходит вам?'}
            </h2>
            <p className="text-xs sm:text-sm text-[#707968] mt-1">
              {lang === 'en'
                ? 'Engineered for exceptional daily performance and creative excellence.'
                : 'Правильный выбор смартфона для повседневной жизни и работы.'}
            </p>
          </div>

          <div className="text-xs text-[#8c9484] font-medium bg-[#f0f2e9] px-3 py-1.5 rounded-lg border border-[#e2e7da] self-start sm:self-auto">
            {filteredProducts.length} {lang === 'en' ? 'devices found' : 'моделей найдено'}
          </div>
        </div>

        {/* Toolbar: Brand filters, Search, Favorites, Sort */}
        <div className="bg-[#f7f8f3] p-4 rounded-xl border border-[#e8e9e2] mb-8 flex flex-col md:flex-row items-center justify-between gap-4" data-reveal suppressHydrationWarning>
          {/* Brand tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {brands.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setSelectedBrand(b)}
                className={`text-xs px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                  selectedBrand === b
                    ? 'bg-[#314b35] text-white shadow-xs'
                    : 'bg-white text-[#707968] hover:text-[#222b23] border border-[#e2e7da]'
                }`}
              >
                {b === 'All' ? (lang === 'en' ? 'All Brands' : 'Все бренды') : b}
              </button>
            ))}
          </div>

          {/* Search, Favorites & Sort */}
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:w-56">
              <Search className="w-4 h-4 text-[#8c9484] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="home-catalog-search"
                name="search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'en' ? 'Model or brand...' : 'Модель или бренд...'}
                className="w-full bg-white border border-[#e2e7da] rounded-lg pl-9 pr-3 py-2 text-xs text-[#222b23] placeholder-[#8c9484] focus:outline-hidden focus:border-[#314b35]"
              />
            </div>

            {/* Favorite toggle */}
            <button
              type="button"
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              title={lang === 'en' ? 'Saved models only' : 'Только избранные'}
              className={`p-2 rounded-lg border text-xs flex items-center justify-center transition-all cursor-pointer ${
                showFavoritesOnly
                  ? 'bg-[#314b35] text-white border-[#314b35]'
                  : 'bg-white text-[#707968] border-[#e2e7da] hover:text-[#314b35]'
              }`}
            >
              <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
            </button>

            {/* Sort */}
            <div className="relative">
              <select
                id="home-catalog-sort"
                name="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label={lang === 'en' ? 'Sort devices' : 'Сортировка'}
                className="bg-white border border-[#e2e7da] rounded-lg px-3 py-2 text-xs text-[#707968] focus:outline-hidden focus:border-[#314b35] cursor-pointer"
              >
                <option value="featured">
                  {lang === 'en' ? 'Featured Flagships' : 'Рекомендуемые'}
                </option>
                <option value="low">
                  {lang === 'en' ? 'Price: Low to High' : 'Сначала дешевле'}
                </option>
                <option value="high">
                  {lang === 'en' ? 'Price: High to Low' : 'Сначала дороже'}
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        ) : (
          <div className="bg-[#f7f8f3] border border-[#e8e9e2] rounded-2xl p-12 text-center max-w-md mx-auto my-8 animate-fade-in">
            <Search className="w-8 h-8 text-[#8c9484] mx-auto mb-3" />
            <h3 className="font-heading font-bold text-base text-[#222b23] mb-1">
              {lang === 'en' ? 'No matching smartphones found' : 'Смартфоны не найдены'}
            </h3>
            <p className="text-xs text-[#707968] mb-4">
              {lang === 'en'
                ? 'Try adjusting your search query or reset the filters.'
                : 'Попробуйте изменить поисковый запрос или сбросить фильтры.'}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 bg-[#314b35] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#243c28] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Reset Filters' : 'Сбросить фильтры'}</span>
            </button>
          </div>
        )}
      </section>

      {/* Payment Promo 3D Section */}
      <div data-reveal>
        <PaymentPromo />
      </div>
    </div>
  );
}
