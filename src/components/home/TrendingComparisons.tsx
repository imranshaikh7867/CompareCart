import React, { useEffect } from 'react';
import { useProductStore } from '../../store/useProductStore';
import { ArrowRight, ChevronRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const TrendingComparisons: React.FC = () => {
  const { trendingComparisons, fetchTrendingComparisons, isLoading } = useProductStore();

  useEffect(() => {
    fetchTrendingComparisons();
  }, [fetchTrendingComparisons]);

  if (isLoading && trendingComparisons.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
          Trending Comparisons
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-lg overflow-hidden shadow-md bg-white animate-pulse">
              <div className="h-40 bg-gray-200"></div>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
          Trending Comparisons
        </h2>
        <Link
          to="/trending"
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
        >
          View All
          <ChevronRight className="h-5 w-5 ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingComparisons.map((comparison) => {
          const amazonProduct = comparison.amazonProduct;
          const flipkartProduct = comparison.flipkartProduct;

          if (!amazonProduct || !flipkartProduct) return null;

          const priceDifference = Math.abs(amazonProduct.price - flipkartProduct.price);
          const percentDifference = ((priceDifference / Math.max(amazonProduct.price, flipkartProduct.price)) * 100).toFixed(0);
          const cheaperPlatform = amazonProduct.price < flipkartProduct.price ? 'Amazon' : 'Flipkart';

          return (
            <Link
              key={comparison.id}
              to={``}
              className="rounded-lg overflow-hidden shadow-md bg-white hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-black/20 z-10"></div>
                <img
                  src={amazonProduct.price <= flipkartProduct.price ? amazonProduct.image : flipkartProduct.image}
                  alt={comparison.searchTerm}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-semibold text-gray-800 z-10">
                  {comparison.viewCount.toLocaleString()} views
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white z-10">
                  <h3 className="font-bold truncate">{comparison.searchTerm}</h3>
                </div>
              </div>

              <div className="p-3">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-1 items-center">
                    <div className={`w-2 h-2 rounded-full ${amazonProduct.price <= flipkartProduct.price ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                    <span className="text-sm">Amazon</span>
                  </div>
                  <div className="flex space-x-1 items-center">
                    <div className={`w-2 h-2 rounded-full ${flipkartProduct.price <= amazonProduct.price ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                    <span className="text-sm">Flipkart</span>
                  </div>
                </div>

                <div className="mt-2 mb-2 bg-green-50 rounded p-2 text-sm text-center">
                  <span className="font-semibold text-green-800">Save {percentDifference}%</span>
                  <span className="text-gray-600 ml-1">on {cheaperPlatform}</span>
                </div>
                <Link
                  to={``}
                  className="text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center"
                >
                  Buy on Flipkart <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingComparisons;