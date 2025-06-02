import { Product, ComparisonItem } from '../types';

// Mock data for Amazon products
const amazonProducts: Product[] = [
  {
    id: 'a1',
    name: 'Apple iPhone 14 Pro (128GB)',
    description: 'Apple iPhone 14 Pro with A16 Bionic chip, 128GB storage, and Dynamic Island',
    price: 119900,
    rating: 4.5,
    reviewCount: 2456,
    image: 'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg',
    platform: 'amazon',
    features: ['A16 Bionic Chip', '128GB Storage', '6.1" Super Retina XDR Display', 'Dynamic Island', '48MP Camera System'],
    inStock: true,
    url: '#amazon-iphone-14-pro'
  },
  {
    id: 'a2',
    name: 'Samsung Galaxy S23 Ultra (256GB)',
    description: 'Samsung Galaxy S23 Ultra with Snapdragon 8 Gen 2 processor and S-Pen support',
    price: 109999,
    rating: 4.6,
    reviewCount: 1876,
    image: 'https://images.pexels.com/photos/214487/pexels-photo-214487.jpeg',
    platform: 'amazon',
    features: ['Snapdragon 8 Gen 2', '256GB Storage', '6.8" Dynamic AMOLED Display', 'S-Pen included', '200MP Camera System'],
    inStock: true,
    url: '#amazon-galaxy-s23-ultra'
  },
  {
    id: 'a3',
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Premium noise cancelling wireless headphones with exceptional sound quality',
    price: 26990,
    rating: 4.7,
    reviewCount: 3421,
    image: 'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg',
    platform: 'amazon',
    features: ['Industry-leading Noise Cancellation', '30-hour Battery Life', 'Wearing Detection', 'Speak-to-chat Technology', 'Multi-point Connection'],
    inStock: true,
    url: '#amazon-sony-wh-1000xm5'
  },
  {
    id: 'a4',
    name: 'Dell XPS 15 Laptop',
    description: 'Premium laptop with 12th Gen Intel Core i7, 16GB RAM and 512GB SSD',
    price: 139990,
    rating: 4.4,
    reviewCount: 867,
    image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg',
    platform: 'amazon',
    features: ['Intel Core i7-12700H', '16GB RAM', '512GB SSD', '15.6" FHD+ Display', 'NVIDIA RTX 3050 Ti'],
    inStock: false,
    url: '#amazon-dell-xps-15'
  }
];

// Mock data for Flipkart products
const flipkartProducts: Product[] = [
  {
    id: 'f1',
    name: 'Apple iPhone 14 Pro (128GB)',
    description: 'Apple iPhone 14 Pro with A16 Bionic chip and Dynamic Island',
    price: 118900,
    rating: 4.6,
    reviewCount: 3245,
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
    platform: 'flipkart',
    features: ['A16 Bionic Chip', '128GB Storage', '6.1" Super Retina XDR Display', 'Dynamic Island', '48MP Camera System'],
    inStock: true,
    url: '#flipkart-iphone-14-pro'
  },
  {
    id: 'f2',
    name: 'Samsung Galaxy S23 Ultra (256GB)',
    description: 'Samsung Galaxy S23 Ultra with Snapdragon 8 Gen 2 processor and S-Pen support',
    price: 104999,
    rating: 4.5,
    reviewCount: 1234,
    image: 'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg',
    platform: 'flipkart',
    features: ['Snapdragon 8 Gen 2', '256GB Storage', '6.8" Dynamic AMOLED Display', 'S-Pen included', '200MP Camera System'],
    inStock: true,
    url: '#flipkart-galaxy-s23-ultra'
  },
  {
    id: 'f3',
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Premium noise cancelling wireless headphones with exceptional sound quality',
    price: 25990,
    rating: 4.8,
    reviewCount: 2876,
    image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg',
    platform: 'flipkart',
    features: ['Industry-leading Noise Cancellation', '30-hour Battery Life', 'Wearing Detection', 'Speak-to-chat Technology', 'Multi-point Connection'],
    inStock: true,
    url: '#flipkart-sony-wh-1000xm5'
  },
  {
    id: 'f4',
    name: 'Dell XPS 15 Laptop',
    description: 'Premium laptop with 12th Gen Intel Core i7, 16GB RAM and 512GB SSD',
    price: 142990,
    rating: 4.3,
    reviewCount: 456,
    image: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg',
    platform: 'flipkart',
    features: ['Intel Core i7-12700H', '16GB RAM', '512GB SSD', '15.6" FHD+ Display', 'NVIDIA RTX 3050 Ti'],
    inStock: true,
    url: '#flipkart-dell-xps-15'
  }
];

// Mock trending comparisons
const mockTrendingComparisons: ComparisonItem[] = [
  {
    id: 'comp-1',
    amazonProduct: amazonProducts[0],
    flipkartProduct: flipkartProducts[0],
    category: 'Smartphones',
    searchTerm: 'iPhone 14 Pro',
    viewCount: 15243
  },
  {
    id: 'comp-2',
    amazonProduct: amazonProducts[1],
    flipkartProduct: flipkartProducts[1],
    category: 'Smartphones',
    searchTerm: 'Samsung Galaxy S23',
    viewCount: 8765
  },
  {
    id: 'comp-3',
    amazonProduct: amazonProducts[2],
    flipkartProduct: flipkartProducts[2],
    category: 'Headphones',
    searchTerm: 'Sony WH-1000XM5',
    viewCount: 5432
  },
  {
    id: 'comp-4',
    amazonProduct: amazonProducts[3],
    flipkartProduct: flipkartProducts[3],
    category: 'Laptops',
    searchTerm: 'Dell XPS 15',
    viewCount: 3210
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Search products function (mock API call)
export const searchProducts = async (term: string): Promise<Product[]> => {
  await delay(800); // Simulate network delay
  
  const normalizedTerm = term.toLowerCase();
  
  const results = [...amazonProducts, ...flipkartProducts].filter(product => 
    product.name.toLowerCase().includes(normalizedTerm) ||
    product.description.toLowerCase().includes(normalizedTerm) ||
    product.features.some(feature => feature.toLowerCase().includes(normalizedTerm))
  );
  
  return results;
};

// Get trending comparisons
export const fetchTrendingComparisons = async (): Promise<ComparisonItem[]> => {
  await delay(600); // Simulate network delay
  return mockTrendingComparisons;
};

// Get product recommendations (mock API call)
export const getRecommendations = async (productId: string): Promise<Product[]> => {
  await delay(700); // Simulate network delay
  
  // Return 3 random products as recommendations
  const allProducts = [...amazonProducts, ...flipkartProducts];
  const shuffled = allProducts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

// Get product details by ID
export const getProductById = async (id: string, platform: 'amazon' | 'flipkart'): Promise<Product | undefined> => {
  await delay(300); // Simulate network delay
  
  const products = platform === 'amazon' ? amazonProducts : flipkartProducts;
  return products.find(product => product.id === id);
};

// Get comparison by ID
export const getComparisonById = async (id: string): Promise<ComparisonItem | undefined> => {
  await delay(500); // Simulate network delay
  return mockTrendingComparisons.find(comp => comp.id === id);
};

export const getAllProducts = async (): Promise<Product[]> => {
  await delay(500);
  return [...amazonProducts, ...flipkartProducts];
};