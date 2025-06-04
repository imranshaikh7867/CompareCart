export const Product = {
  id: '',
  name: '',
  description: '',
  price: 0,
  rating: 0,
  reviewCount: 0,
  image: '',
  platform: '', // 'amazon' or 'flipkart'
  features: [],
  inStock: false,
  url: '',
};

export const ComparisonItem = {
  id: '',
  amazonProduct: null, // Optional: Product object
  flipkartProduct: null, // Optional: Product object
  category: '',
  searchTerm: '',
  viewCount: 0,
};

export const SortOption = ['price-low-high', 'price-high-low', 'rating-high-low', 'popularity'];

export const FilterOptions = {
  priceRange: [0, 0], // Min and max price range
  minRating: 0,
  platforms: [], // Array of 'amazon' or 'flipkart'
};
