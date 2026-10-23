'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface HeroSlide {
  id: string;
  brand: string;
  model: string;
  shortTitle: string;
  colorName: string;
  accentColor: string;
  auraGlow: string;
  priceFormatted: string;
  tag: string;
  eyebrowEn: string;
  eyebrowRu: string;
  titleEn1: string;
  titleEnAccent: string;
  titleRu1: string;
  titleRuAccent: string;
  descEn: string;
  descRu: string;
  image: string;
  backdropText: string;
  badgeTitle: string;
  badgeDescEn: string;
  badgeDescRu: string;
  catalogPath: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'iphone-16-pro',
    brand: 'Apple',
    model: 'iPhone 16 Pro',
    shortTitle: 'iPhone 16 Pro',
    colorName: 'Desert Titanium',
    accentColor: '#bfa68b',
    auraGlow: 'radial-gradient(circle, rgba(210, 180, 150, 0.45) 0%, rgba(225, 205, 185, 0.2) 50%, transparent 75%)',
    priceFormatted: '$1,199',
    tag: 'APPLE · IPHONE 16 PRO (DESERT TITANIUM)',
    eyebrowEn: 'Next-Gen Flagship · Apple',
    eyebrowRu: 'Новейший флагман · Apple',
    titleEn1: 'Next-Gen Power.',
    titleEnAccent: 'Forged in Titanium.',
    titleRu1: 'Новые возможности.',
    titleRuAccent: 'Каждый день.',
    descEn: 'A18 Pro neural architecture, tactile Camera Control, and immersive ProMotion Super Retina XDR.',
    descRu: 'Процессор A18 Pro, титановый корпус и кнопка Camera Control в топовом флагмане Apple.',
    image: '/assets/iphone-16-pro.png',
    backdropText: 'Pro.',
    badgeTitle: 'iPhone 16 Pro',
    badgeDescEn: 'Closer. Brighter. Pro.',
    badgeDescRu: 'Ближе. Ярче. Pro.',
    catalogPath: '/catalog/iphone-16-pro',
  },
  {
    id: 'galaxy-s25-ultra',
    brand: 'Samsung',
    model: 'Galaxy S25 Ultra',
    shortTitle: 'Galaxy S25 Ultra',
    colorName: 'Titanium Silverblue',
    accentColor: '#8ca2bc',
    auraGlow: 'radial-gradient(circle, rgba(160, 190, 225, 0.5) 0%, rgba(195, 215, 235, 0.22) 50%, transparent 75%)',
    priceFormatted: '$1,299',
    tag: 'SAMSUNG · GALAXY S25 ULTRA (TITANIUM SILVERBLUE)',
    eyebrowEn: 'Galaxy AI Leader · Samsung',
    eyebrowRu: 'Лидер Galaxy AI · Samsung',
    titleEn1: 'Galaxy AI Precision.',
    titleEnAccent: '200 MP Optical Prowess.',
    titleRu1: 'Сила Galaxy AI и',
    titleRuAccent: 'камера 200 Мп.',
    descEn: 'Snapdragon 8 Elite computing, integrated S Pen, and ultra-bright 2,600 nits Dynamic AMOLED 2X display.',
    descRu: 'Snapdragon 8 Elite, встроенный S Pen и сверхъяркий экран Dynamic AMOLED 2X нового поколения.',
    image: '/assets/galaxy-s25-ultra.png',
    backdropText: 'Ultra.',
    badgeTitle: 'Galaxy S25 Ultra',
    badgeDescEn: 'A New Era of Galaxy AI.',
    badgeDescRu: 'Новая эра с Galaxy AI.',
    catalogPath: '/catalog/galaxy-s25-ultra',
  },
  {
    id: 'xiaomi-14t',
    brand: 'Xiaomi',
    model: 'Xiaomi 14T',
    shortTitle: 'Xiaomi 14T',
    colorName: 'Titan Gray',
    accentColor: '#858c8b',
    auraGlow: 'radial-gradient(circle, rgba(160, 180, 185, 0.45) 0%, rgba(190, 205, 208, 0.2) 50%, transparent 75%)',
    priceFormatted: '$699',
    tag: 'XIAOMI · 14T (TITAN GRAY)',
    eyebrowEn: 'Leica Summilux · Xiaomi',
    eyebrowRu: 'Оптика Leica · Xiaomi',
    titleEn1: 'Leica Master Optics.',
    titleEnAccent: '144 Hz Fluidity.',
    titleRu1: 'Оптика Leica и',
    titleRuAccent: 'экран 144 Гц.',
    descEn: 'Co-engineered with Leica optical lenses, 144Hz AI AMOLED display, and 67W HyperCharge velocity.',
    descRu: 'Оптика Leica Summilux, экран нового поколения CrystalRes 144 Гц и сверхбыстрая зарядка 67 Вт.',
    image: '/assets/xiaomi-14t.png',
    backdropText: '14T.',
    badgeTitle: 'Xiaomi 14T',
    badgeDescEn: 'Light catches, night shines.',
    badgeDescRu: 'Лови свет, сияй в ночи.',
    catalogPath: '/catalog/xiaomi-14t',
  },
  {
    id: 'galaxy-s25',
    brand: 'Samsung',
    model: 'Galaxy S25',
    shortTitle: 'Galaxy S25',
    colorName: 'Icy Blue',
    accentColor: '#a1bad0',
    auraGlow: 'radial-gradient(circle, rgba(175, 205, 230, 0.45) 0%, rgba(205, 225, 240, 0.2) 50%, transparent 75%)',
    priceFormatted: '$799',
    tag: 'SAMSUNG · GALAXY S25 (ICY BLUE)',
    eyebrowEn: 'Compact Flagship · Samsung',
    eyebrowRu: 'Компактный флагман · Samsung',
    titleEn1: 'Ergonomic Elegance.',
    titleEnAccent: 'Snapdragon 8 Elite.',
    titleRu1: 'Элегантность и мощь.',
    titleRuAccent: 'В твоих руках.',
    descEn: 'Featherweight 162g profile, Armor Aluminum shielding, and ProVisual AI processing engines.',
    descRu: 'Компактный корпус 162 г, усиленный Armor Aluminum и интеллектуальная обработка снимков.',
    image: '/assets/galaxy-s25.png',
    backdropText: 'S25.',
    badgeTitle: 'Galaxy S25',
    badgeDescEn: 'Compact without compromises.',
    badgeDescRu: 'Компактный без компромиссов.',
    catalogPath: '/catalog/galaxy-s25',
  },
];

export function HeroSection() {
  const { lang } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative overflow-hidden bg-[#ecefe4] rounded-2xl border border-[#dfe5d6] my-6 transition-colors duration-500 shadow-2xs select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label={lang === 'en' ? 'Flagship smartphone showcase' : 'Слайдер флагманских смартфонов'}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        {/* Left Copy & Interactive Story Cards */}
        <div className="lg:col-span-7 p-7 sm:p-10 lg:p-14 flex flex-col justify-between z-10">
          <div>
            {/* Pill Eyebrow Tag */}
            <div
              key={`eyebrow-${currentSlide}`}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/75 border border-[#d6decb] text-[#55634b] text-[11px] font-bold tracking-wider uppercase mb-5 backdrop-blur-xs animate-fade-in-up"
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: activeSlide.accentColor }}
              />
              <span>{lang === 'en' ? activeSlide.eyebrowEn : activeSlide.eyebrowRu}</span>
            </div>

            {/* Kinetic Headline */}
            <h1
              key={`title-${currentSlide}`}
              className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#222b23] leading-[1.12] mb-5 animate-fade-in-up"
            >
              {lang === 'en' ? (
                <>
                  {activeSlide.titleEn1} <br />
                  <span className="text-[#314b35]">{activeSlide.titleEnAccent}</span>
                </>
              ) : (
                <>
                  {activeSlide.titleRu1} <br />
                  <span className="text-[#314b35]">{activeSlide.titleRuAccent}</span>
                </>
              )}
            </h1>

            {/* Description */}
            <p
              key={`desc-${currentSlide}`}
              className="text-sm sm:text-base text-[#687360] leading-relaxed max-w-lg mb-7 min-h-[44px] animate-fade-in-up"
            >
              {lang === 'en' ? activeSlide.descEn : activeSlide.descRu}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-3 bg-[#314b35] hover:bg-[#243c28] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <span>{lang === 'en' ? 'Explore Catalog' : 'Смотреть каталог'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={activeSlide.catalogPath}
                className="inline-flex items-center gap-2 bg-white/80 hover:bg-white active:scale-[0.98] text-[#222b23] border border-[#d6decb] text-xs sm:text-sm font-semibold px-5 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
              >
                <span>{lang === 'en' ? 'Device Overview' : 'Обзор модели'}</span>
                <ArrowUpRight className="w-4 h-4 opacity-60" />
              </Link>
            </div>
          </div>

          {/* Modern Segmented Interactive Story / Carousel Navigation */}
          <div className="pt-8">
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-2"
              role="tablist"
              aria-label="Flagship model selection"
            >
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={slide.model}
                    onClick={() => setCurrentSlide(idx)}
                    className={`group relative text-left p-2.5 sm:p-3 rounded-xl transition-all duration-300 cursor-pointer overflow-hidden border ${
                      isActive
                        ? 'bg-white shadow-sm border-[#314b35]/40 -translate-y-0.5'
                        : 'bg-white/40 hover:bg-white/70 border-transparent hover:border-[#dfe5d6]'
                    }`}
                  >
                    {/* Animated Progress Bar */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#dbe2d1] overflow-hidden">
                      {isActive && !isPaused && (
                        <div
                          className="h-full bg-[#314b35] rounded-full animate-progress"
                          style={{ animationDuration: '5500ms' }}
                        />
                      )}
                      {isActive && isPaused && (
                        <div className="h-full w-full bg-[#314b35]" />
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-1 mb-1 pt-0.5">
                      <span
                        className={`text-[11px] font-heading font-extrabold truncate transition-colors ${
                          isActive ? 'text-[#222b23]' : 'text-[#707968]'
                        }`}
                      >
                        {slide.shortTitle}
                      </span>
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: slide.accentColor }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#8c9484] truncate">{slide.colorName}</span>
                      <span className="font-semibold text-[#314b35]">{slide.priceFormatted}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 3D Smartphone Visual with Dynamic Aura Glow */}
        <div className="lg:col-span-5 relative flex items-center justify-center p-8 sm:p-12 overflow-hidden min-h-[400px]">
          {/* Giant Ambient Watermark / Typography Backdrop */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none font-heading font-black text-[130px] sm:text-[180px] lg:text-[210px] text-[#222b23]/[0.035] leading-none transition-all duration-700"
            style={{ transform: `scale(${1 + currentSlide * 0.03})` }}
          >
            {activeSlide.backdropText}
          </div>

          {/* Dynamic Chromatic Aura Glow matching phone metallic pigment */}
          <div
            className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full transition-all duration-1000 blur-3xl opacity-80 pointer-events-none"
            style={{ background: activeSlide.auraGlow }}
          />

          {/* Product showcase image with 3D fluid entrance */}
          <div className="relative w-72 h-72 sm:w-84 sm:h-84 lg:w-[410px] lg:h-[410px] z-10 flex items-center justify-center animate-float-phone">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive
                      ? 'opacity-100 scale-100 translate-y-0 z-10 pointer-events-auto filter-none'
                      : 'opacity-0 scale-90 translate-y-6 pointer-events-none -z-10 blur-xs'
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={`${slide.model} ${slide.colorName}`}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 1024px) 380px, 440px"
                    className="object-contain drop-shadow-[0_24px_45px_rgba(34,43,35,0.22)] hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
              );
            })}
          </div>

          {/* Glassmorphic Interactive Model Card */}
          <Link
            href={activeSlide.catalogPath}
            key={`badge-${currentSlide}`}
            aria-label={`${lang === 'en' ? 'View' : 'Смотреть'} ${activeSlide.badgeTitle}`}
            className="group absolute bottom-6 left-6 z-20 bg-white/90 hover:bg-white backdrop-blur-md border border-[#dfe5d6] hover:border-[#314b35]/40 px-4 py-2.5 rounded-xl shadow-xs transition-all hover:shadow-md animate-fade-in-up flex items-center gap-3"
          >
            <div>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: activeSlide.accentColor }}
                />
                <span className="font-heading font-bold text-xs text-[#222b23]">
                  {activeSlide.badgeTitle}
                </span>
              </div>
              <div className="text-[10px] text-[#707968] mt-0.5">
                {lang === 'en' ? activeSlide.badgeDescEn : activeSlide.badgeDescRu}
              </div>
            </div>
            <div className="w-7 h-7 rounded-lg bg-[#f0f3eb] group-hover:bg-[#314b35] group-hover:text-white text-[#314b35] flex items-center justify-center transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
