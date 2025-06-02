export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  platform: 'amazon' | 'flipkart';
  features: string[];
  inStock: boolean;
  url: string;
}

export interface ComparisonItem {
  id: string;
  amazonProduct?: Product;
  flipkartProduct?: Product;
  category: string;
  searchTerm: string;
  viewCount: number;
}

export type SortOption = 'price-low-high' | 'price-high-low' | 'rating-high-low' | 'popularity';

export interface FilterOptions {
  priceRange: [number, number];
  minRating: number;
  platforms: Array<'amazon' | 'flipkart'>;
}