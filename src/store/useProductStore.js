import { create } from 'zustand';
import { fetchTrendingComparisons, searchProducts } from '../services/api';

const defaultFilterOptions = {
  priceRange: [0, 100000],
  minRating: 0,
  platforms: ['amazon', 'flipkart']
};

export const useProductStore = create((set, get) => ({
  products: [],
  searchResults: [],
  comparisons: [],
  trendingComparisons: [],
  currentComparison: null,
  isLoading: false,
  searchTerm: '',
  filterOptions: defaultFilterOptions,
  sortOption: 'price-low-high',
  
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  setFilterOptions: (options) => set({ 
    filterOptions: { ...get().filterOptions, ...options } 
  }),
  
  setSortOption: (option) => set({ sortOption: option }),
  
  searchProducts: async (term) => {
    set({ isLoading: true, searchTerm: term });
    try {
      const results = await searchProducts(term);
      set({ searchResults: results, isLoading: false });
    } catch (error) {
      console.error('Error searching products:', error);
      set({ isLoading: false });
    }
  },
  
  fetchTrendingComparisons: async () => {
    set({ isLoading: true });
    try {
      const trending = await fetchTrendingComparisons();
      set({ trendingComparisons: trending, isLoading: false });
    } catch (error) {
      console.error('Error fetching trending comparisons:', error);
      set({ isLoading: false });
    }
  },
  
  compareProducts: (amazonProductId, flipkartProductId) => {
    const { products } = get();
    const amazonProduct = products.find(p => p.id === amazonProductId && p.platform === 'amazon');
    const flipkartProduct = products.find(p => p.id === flipkartProductId && p.platform === 'flipkart');
    
    if (amazonProduct || flipkartProduct) {
      const newComparison = {
        id: `${amazonProductId || 'none'}-${flipkartProductId || 'none'}`,
        amazonProduct,
        flipkartProduct,
        category: amazonProduct?.name.split(' ')[0] || flipkartProduct?.name.split(' ')[0] || 'General',
        searchTerm: get().searchTerm,
        viewCount: 1
      };
      
      set({ 
        currentComparison: newComparison,
        comparisons: [newComparison, ...get().comparisons]
      });
    }
  },
  
  setCurrentComparison: (comparison) => set({ currentComparison: comparison })
})); 