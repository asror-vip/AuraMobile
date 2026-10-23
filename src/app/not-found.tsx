import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-24 text-center max-w-lg mx-auto">
      <div className="w-20 h-20 rounded-3xl bg-[#eef2e7] border border-[#dbe3d4] text-[#314b35] flex items-center justify-center mx-auto mb-6 shadow-xs">
        <span className="font-heading font-black text-3xl">404</span>
      </div>

      <h1 className="font-heading font-extrabold text-3xl text-[#222b23] tracking-tight mb-2">
        Sahifa topilmadi
      </h1>
      <p className="text-xs sm:text-sm text-[#707968] mb-8 leading-relaxed">
        Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki boshqa manzilga koʻchirilgan.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#314b35] hover:bg-[#243c28] text-white text-xs font-semibold px-6 py-3 rounded-xl transition-all shadow-xs"
        >
          <Home className="w-4 h-4" />
          <span>Bosh sahifaga qaytish</span>
        </Link>
        <Link
          href="/catalog"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#f6f7f3] border border-[#d6decd] text-[#222b23] text-xs font-semibold px-5 py-3 rounded-xl transition-colors"
        >
          <Search className="w-4 h-4 text-[#707968]" />
          <span>Smartfonlar katalogi</span>
        </Link>
      </div>
    </div>
  );
}
