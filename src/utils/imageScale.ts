export function getProductImageStyle(
  productId: string,
  context: 'hero' | 'card' | 'modal' | 'detail' = 'card'
): { className: string; style?: React.CSSProperties } {
  if (context === 'hero') {
    return {
      className: 'object-contain drop-shadow-[0_20px_30px_rgba(34,43,35,0.18)] transition-transform duration-500 hover:scale-105',
    };
  }

  if (context === 'card') {
    return {
      className: 'object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_8px_16px_rgba(34,43,35,0.08)]',
    };
  }

  if (context === 'modal') {
    return {
      className: 'object-contain transition-transform duration-300 drop-shadow-[0_12px_24px_rgba(34,43,35,0.12)]',
    };
  }

  // detail page
  return {
    className: 'object-contain transition-transform duration-300 hover:scale-105 drop-shadow-[0_16px_28px_rgba(34,43,35,0.12)]',
  };
}

