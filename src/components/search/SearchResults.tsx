import React, { useMemo } from 'react';
import { useProductStore } from '../../store/useProductStore';
import ProductCard from '../common/ProductCard';
import { LayoutGrid, AlertCircle } from 'lucide-react';
import { Product } from '../../types';
import { Link } from 'react-router-dom';

const SearchResults: React.FC = () => {
  const { searchResults, isLoading, searchTerm, filterOptions, sortOption } = useProductStore();

  const filteredResults = useMemo(() => {
    if (!searchResults.length) return [];

    return searchResults.filter(product => {
      const [minPrice, maxPrice] = filterOptions.priceRange;
      const priceMatch = product.price >= minPrice && product.price <= maxPrice;
      const ratingMatch = product.rating >= filterOptions.minRating;
      const platformMatch = filterOptions.platforms.includes(product.platform);
      
      return priceMatch && ratingMatch && platformMatch;
    });
  }, [searchResults, filterOptions]);

  const sortedResults = useMemo(() => {
    if (!filteredResults.length) return [];

    return [...filteredResults].sort((a, b) => {
      if (sortOption === 'price-low-high') {
        return a.price - b.price;
      } else if (sortOption === 'price-high-low') {
        return b.price - a.price;
      } else if (sortOption === 'rating-high-low') {
        return b.rating - a.rating;
      } else if (sortOption === 'popularity') {
        return b.reviewCount - a.reviewCount;
      }
      return 0;
    });
  }, [filteredResults, sortOption]);

  // Group products by name for easy comparison
  const groupedProducts = useMemo(() => {
    const groups: { [key: string]: Product[] } = {};
    
    sortedResults.forEach(product => {
      const normalizedName = product.name.toLowerCase().trim();
      if (!groups[normalizedName]) {
        groups[normalizedName] = [];
      }
      groups[normalizedName].push(product);
    });
    
    return Object.values(groups).filter(group => group.length > 0);
  }, [sortedResults]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Loading results...
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-lg overflow-hidden shadow-md bg-white animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!searchResults.length) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No results found</h3>
        <p className="mt-1 text-sm text-gray-500">Try searching for another product or adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          {sortedResults.length} {sortedResults.length === 1 ? 'result' : 'results'} for "{searchTerm}"
        </h2>
        <div className="flex items-center text-gray-500 text-sm">
          <LayoutGrid className="w-4 h-4 mr-1" />
          Showing products with best comparison matches
        </div>
      </div>
      
      <div className="space-y-8">
        {groupedProducts.map((group, i) => {
          // Check if we have both Amazon and Flipkart products for comparison
          const hasAmazon = group.some(p => p.platform === 'amazon');
          const hasFlipkart = group.some(p => p.platform === 'flipkart');
          const amazonProduct = group.find(p => p.platform === 'amazon');
          const flipkartProduct = group.find(p => p.platform === 'flipkart');
          
          // Determine if we can create a direct comparison
          const canCompare = hasAmazon && hasFlipkart;
          
          return (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h3 className="font-medium text-gray-900">{group[0].name}</h3>
              </div>
              
              {canCompare ? (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    <ProductCard 
                      product={amazonProduct!} 
                      isHighlighted={amazonProduct!.price <= flipkartProduct!.price} 
                    />
                    <ProductCard 
                      product={flipkartProduct!} 
                      isHighlighted={flipkartProduct!.price <= amazonProduct!.price} 
                    />
                  </div>
                  <div className="bg-blue-50 p-3 border-t border-blue-100 flex justify-center">
                    <Link 
                      to={`/comparison/${amazonProduct!.id}-${flipkartProduct!.id}`} 
                      className="text-blue-600 font-medium hover:text-blue-800"
                    >
                      View detailed comparison
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {group.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;