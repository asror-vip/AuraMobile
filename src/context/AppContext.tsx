'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Product } from '@/types';
import { products } from '@/data/products';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('aura_lang') as Language;
      if (savedLang === 'en' || savedLang === 'ru') {
        setLangState(savedLang);
      }
      const savedFavs = JSON.parse(localStorage.getItem('aura_favs') || '[]');
      if (Array.isArray(savedFavs)) {
        setFavorites(savedFavs);
      }
    } catch {
      // ignore SSR or storage errors
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('aura_lang', newLang);
    } catch {}
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem('aura_favs', JSON.stringify(next));
      } catch {}
      const prod = products.find(p => p.id === id);
      const name = prod ? prod.name : '';
      if (exists) {
        showToast(lang === 'en' ? `${name} removed from saved` : `${name} удален из избранного`);
      } else {
        showToast(lang === 'en' ? `${name} saved to favorites` : `${name} добавлен в избранное`);
      }
      return next;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 2800);
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        favorites,
        toggleFavorite,
        isFavorite,
        selectedProduct,
        setSelectedProduct,
        toastMessage,
        showToast,
      }}
    >
      {children}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#314b35] text-white px-5 py-3 rounded-lg shadow-xl text-xs md:text-sm font-medium flex items-center gap-2 border border-[#486b4e] animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span>{toastMessage}</span>
        </div>
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
