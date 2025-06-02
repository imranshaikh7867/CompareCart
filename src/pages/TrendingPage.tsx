import React, { useEffect } from 'react';
import { useProductStore } from '../store/useProductStore';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TrendingPage: React.FC = () => {
  const { trendingComparisons, fetchTrendingComparisons, isLoading } = useProductStore();

  useEffect(() => {
    fetchTrendingComparisons();
  }, [fetchTrendingComparisons]);

  if (isLoading && trendingComparisons.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
          Trending Comparisons
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
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

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
          Trending Comparisons
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <h2 className="text-lg font-medium text-gray-800 mb-3">Most Popular Categories</h2>
          <div className="flex flex-wrap gap-2">
            {['Smartphones', 'Laptops', 'Headphones', 'Cameras', 'TVs', 'Smart Watches', 'Gaming'].map((category) => (
              <span 
                key={category} 
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 cursor-pointer"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingComparisons.map((comparison) => {
            const amazonProduct = comparison.amazonProduct;
            const flipkartProduct = comparison.flipkartProduct;
            
            if (!amazonProduct || !flipkartProduct) return null;
            
            const priceDifference = Math.abs(amazonProduct.price - flipkartProduct.price);
            const percentDifference = ((priceDifference / Math.max(amazonProduct.price, flipkartProduct.price)) * 100).toFixed(0);
            const cheaperPlatform = amazonProduct.price < flipkartProduct.price ? 'Amazon' : 'Flipkart';
            
            return (
              <div key={comparison.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={amazonProduct.image} 
                    alt={comparison.searchTerm} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent pt-10 pb-3 px-4">
                    <h2 className="text-white font-bold text-lg">{comparison.searchTerm}</h2>
                  </div>
                  <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 text-xs font-semibold text-gray-800 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1 text-red-500" /> {comparison.viewCount.toLocaleString()} views
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Amazon Price</span>
                      <span className="font-bold">₹{amazonProduct.price.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-500">Flipkart Price</span>
                      <span className="font-bold">₹{flipkartProduct.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-2 rounded-md text-center mb-4">
                    <span className="text-green-700 font-medium">Save {percentDifference}% on {cheaperPlatform}</span>
                  </div>
                  
                  <Link 
                    to={``} 
                    className="text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center"
                  >
                    Buy on Amazon <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;