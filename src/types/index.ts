export type Brand = 'All' | 'Apple' | 'Samsung' | 'Xiaomi' | 'Honor';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSpec {
  screen: string;
  storage: string;
  camera?: string;
  chip?: string;
  battery?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: 'Apple' | 'Samsung' | 'Xiaomi';
  price: number;
  color: string;
  colors: ProductColor[];
  image: string;
  screen: string;
  storage: string;
  tag?: 'popular' | 'new';
  description?: string;
  descriptionEn?: string;
  descriptionRu?: string;
  availableStorages?: string[];
  specs?: {
    processor?: string;
    camera?: string;
    battery?: string;
    os?: string;
    sim?: string;
    warranty?: string;
  };
}

export type Language = 'en' | 'ru';
