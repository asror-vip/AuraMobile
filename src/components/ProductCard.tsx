'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatPrice } from '@/data/products';
import { useApp } from '@/context/AppContext';
import { getProductImageStyle } from '@/utils/imageScale';
import { Heart, ArrowUpRight, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { lang, isFavorite, toggleFavorite, setSelectedProduct } = useApp();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const isFav = isFavorite(product.id);

  const activeColor = product.colors[selectedColorIndex] || {
    name: product.color,
    hex: '#888',
  };

  return (
    <article
      data-reveal
      suppressHydrationWarning
      style={{ '--reveal-delay': `${(index % 4) * 65}ms` } as React.CSSProperties}
      className="product-card group bg-white rounded-xl border border-[#e8e9e2] overflow-hidden hover:shadow-lg hover:border-[#cfd8c7] hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col justify-between"
    >
      {/* Image container */}
      <div className="relative h-64 bg-[#f5f6f1] p-6 flex items-center justify-center overflow-hidden">
        {/* Tag badge */}
        {product.tag && (
          <span className="absolute top-3 left-3 z-10 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-[#e6ebdd] text-[#4d6639] border border-[#d6dec9]">
            {product.tag === 'new'
              ? lang === 'en' ? 'New' : 'Новинка'
              : lang === 'en' ? 'Featured' : 'Хит'}
          </span>
        )}

        {/* Favorite toggle button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          aria-label={
            isFav
              ? lang === 'en' ? 'Remove from saved' : 'Удалить из избранного'
              : lang === 'en' ? 'Save to favorites' : 'Добавить в избранное'
          }
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-all duration-200 ${
            isFav
              ? 'bg-[#314b35] text-white shadow-xs'
              : 'bg-white/80 backdrop-blur-xs text-[#707968] hover:text-[#314b35] hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
        </button>

        {/* Product image with link to detail page */}
        <Link
          href={`/catalog/${product.id}`}
          className="relative w-full h-full flex items-center justify-center p-3 transition-transform duration-300 ease-out group-hover:scale-105"
        >
          <Image
            src={product.image}
            alt={`${product.name} ${product.color}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className={getProductImageStyle(product.id, 'card').className}
            loading="lazy"
          />
        </Link>
      </div>

      {/* Product Content */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Brand & Storage */}
          <div className="flex items-center justify-between text-[11px] text-[#8c9484] mb-1">
            <span className="font-semibold uppercase tracking-wider text-[#314b35]">
              {product.brand}
            </span>
            <span>{product.storage}</span>
          </div>

          {/* Title */}
          <Link
            href={`/catalog/${product.id}`}
            className="font-heading font-bold text-base text-[#222b23] hover:text-[#314b35] transition-colors line-clamp-1"
          >
            {product.name}
          </Link>

          {/* Color description */}
          <p className="text-xs text-[#707968] mt-1 line-clamp-1">
            {activeColor.name}
          </p>

          {/* Swatches */}
          <div className="flex items-center gap-1.5 mt-3">
            {product.colors.map((color, idx) => (
              <button
                key={color.name + idx}
                type="button"
                onClick={() => setSelectedColorIndex(idx)}
                aria-label={color.name}
                className={`w-3.5 h-3.5 rounded-full transition-transform ${
                  selectedColorIndex === idx
                    ? 'ring-2 ring-offset-1 ring-[#314b35] scale-110'
                    : 'opacity-80 hover:opacity-100 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>

        {/* Bottom price and actions */}
        <div className="pt-3 border-t border-[#eff1e9] flex items-center justify-between gap-2">
          <div>
            <span className="block text-[10px] text-[#8c9484] uppercase tracking-wider">
              {lang === 'en' ? 'Price' : 'Цена'}
            </span>
            <strong className="font-heading font-extrabold text-sm text-[#222b23]">
              {formatPrice(product.price)}
            </strong>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick preview modal button */}
            <button
              type="button"
              onClick={() => setSelectedProduct(product)}
              className="p-2 rounded-lg bg-[#f0f2e9] text-[#314b35] hover:bg-[#e2e7da] active:scale-90 transition-all duration-200"
              title={lang === 'en' ? 'Quick view' : 'Быстрый просмотр'}
              aria-label={lang === 'en' ? 'Quick view' : 'Быстрый просмотр'}
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Direct view button */}
            <Link
              href={`/catalog/${product.id}`}
              className="p-2 rounded-lg bg-[#314b35] text-white hover:bg-[#243c28] active:scale-90 transition-all duration-200 group/btn"
              title={lang === 'en' ? 'Device Details' : 'Подробнее'}
              aria-label={lang === 'en' ? 'Device Details' : 'Подробнее'}
            >
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
