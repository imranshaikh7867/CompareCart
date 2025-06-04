import React from 'react';
import { LayoutGrid, AlertCircle } from 'lucide-react';
import ProductCard from '../common/ProductCard';

const SearchResults = ({ products, isLoading, searchTerm }) => {
  const calculateBestDeal = (priceVsPlatform) => {
    if (!priceVsPlatform || priceVsPlatform.length === 0) return null;

    const sortedPlatforms = [...priceVsPlatform].sort((a, b) => a.price - b.price);
    const lowestPrice = sortedPlatforms[0].price;
    const highestPrice = sortedPlatforms[sortedPlatforms.length - 1].price;
    const savings = ((highestPrice - lowestPrice) / highestPrice * 100).toFixed(0);

    return {
      platform: sortedPlatforms[0].platform,
      link: sortedPlatforms[0].link,
      savings: savings
    };
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Loading results...</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
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

  if (!products.length) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No results found</h3>
        <p className="mt-1 text-sm text-gray-500">
          {searchTerm ? `No products found for "${searchTerm}"` : 'Try adjusting your filters.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          {products.length} {products.length === 1 ? 'result' : 'results'}
          {searchTerm && ` for "${searchTerm}"`}
        </h2>
        <div className="flex items-center text-gray-500 text-sm">
          <LayoutGrid className="w-4 h-4 mr-1" />
          Showing products with best comparison matches
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => {
          const bestDeal = calculateBestDeal(product.price_vs_platform);
          return (
            <ProductCard
              key={product._id}
              product={product}
              bestDeal={bestDeal}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;
