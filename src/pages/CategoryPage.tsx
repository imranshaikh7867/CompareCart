import React, { useEffect, useState } from 'react';
import { useProductStore } from '../store/useProductStore';
import { LayoutGrid, Filter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ComparisonItem } from '../types';

const categories = [
  { id: 'smartphones', name: 'Smartphones', icon: '📱' },
  { id: 'laptops', name: 'Laptops', icon: '💻' },
  { id: 'headphones', name: 'Headphones', icon: '🎧' },
  { id: 'cameras', name: 'Cameras', icon: '📷' },
  { id: 'tvs', name: 'TVs', icon: '📺' },
  { id: 'watches', name: 'Smart Watches', icon: '⌚' },
  { id: 'tablets', name: 'Tablets', icon: '📱' },
  { id: 'gaming', name: 'Gaming', icon: '🎮' }
];

const CategoryPage: React.FC = () => {
  const { trendingComparisons, fetchTrendingComparisons, isLoading } = useProductStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredComparisons, setFilteredComparisons] = useState<ComparisonItem[]>([]);

  useEffect(() => {
    fetchTrendingComparisons();
  }, [fetchTrendingComparisons]);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredComparisons(trendingComparisons);
    } else {
      setFilteredComparisons(
        trendingComparisons.filter(comp =>
          comp.category.toLowerCase().includes(selectedCategory) ||
          comp.searchTerm.toLowerCase().includes(selectedCategory)
        )
      );
    }
  }, [selectedCategory, trendingComparisons]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <LayoutGrid className="h-6 w-6 mr-2 text-blue-600" />
          Categories
        </h1>

        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-medium">Filter by Category</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-colors ${selectedCategory === 'all'
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
            >
              <span className="text-2xl mb-1">🔍</span>
              <span className="text-sm font-medium">All</span>
            </button>

            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-colors ${selectedCategory === category.id
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <span className="text-2xl mb-1">{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
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
        ) : filteredComparisons.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No products found in this category.</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              View All Categories
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComparisons.map(comparison => {
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
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative">
                    <img
                      src={amazonProduct.image}
                      alt={comparison.searchTerm}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent pt-10 pb-3 px-4">
                      <h2 className="text-white font-bold text-lg">{comparison.searchTerm}</h2>
                    </div>
                    <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 text-xs font-semibold text-gray-800">
                      {comparison.category}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full ${amazonProduct.price <= flipkartProduct.price ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                        <span className="text-sm ml-1">Amazon</span>
                      </div>
                      <span className="font-semibold">₹{amazonProduct.price.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full ${flipkartProduct.price <= amazonProduct.price ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                        <span className="text-sm ml-1">Flipkart</span>
                      </div>
                      <span className="font-semibold">₹{flipkartProduct.price.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="bg-green-50 mb-2 p-2 rounded-md text-center">
                      <span className="text-green-700 text-sm font-medium">Save {percentDifference}% on {cheaperPlatform}</span>
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
        )}
      </div>
    </div>
  );
};

export default CategoryPage;