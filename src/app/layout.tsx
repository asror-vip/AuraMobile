import type { Metadata } from 'next';
import { Manrope, DM_Sans } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductModal } from '@/components/ProductModal';
import { ScrollReveal } from '@/components/ScrollReveal';
import { DemoStatusBanner } from '@/components/DemoStatusBanner';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'AURA MOBILE — Next-Gen Flagship Smartphone Experience',
  description:
    'A curated portfolio collection of flagship smartphones: Apple iPhone 16 Pro, Samsung Galaxy S25 Ultra, and Xiaomi 14T. Worldwide express delivery, 2-year AURA Care warranty, and seamless checkout.',
  icons: {
    icon: '/assets/brand-mark.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning className={`${manrope.variable} ${dmSans.variable} h-full`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#fcfcf9] text-[#222b23] font-sans antialiased">
        <AppProvider>
          <ScrollReveal />
          <DemoStatusBanner />
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6">
            {children}
          </main>
          <Footer />
          <ProductModal />
        </AppProvider>
      </body>
    </html>
  );
}
