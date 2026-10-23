import { Suspense } from 'react';
import { products } from '@/data/products';
import { notFound } from 'next/navigation';
import { ProductDetailClient } from './ProductDetailClient';
import type { Metadata } from 'next';

export const instant = false;

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) {
    return {
      title: 'Smartphone Not Found — AURA MOBILE',
    };
  }
  return {
    title: `${product.name} — AURA MOBILE Flagship`,
    description: `${product.name} (${product.storage}, ${product.color}) — Flagship smartphone specifications, USD pricing, and worldwide express delivery with 2-year AURA Care warranty.`,
  };
}

async function ProductDetailLoader({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}

export default function ProductDetailPage(props: Props) {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-xs text-[#707968]">
          Loading flagship specifications...
        </div>
      }
    >
      <ProductDetailLoader {...props} />
    </Suspense>
  );
}
