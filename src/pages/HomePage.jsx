import React, { useEffect, useState } from 'react';
import { LayoutGrid, Filter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Lightbulb, BarChart3, Zap } from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import TrendingComparisons from '../components/home/TrendingComparisons';
import ProductCard from '../components/common/ProductCard';

const categories = [
  { id: 'Smartphones', name: 'Smartphones', icon: '📱' },
  { id: 'Laptops', name: 'Laptops', icon: '💻' },
  { id: 'Headphones', name: 'Headphones', icon: '🎧' },
  { id: 'Cameras', name: 'Cameras', icon: '📷' },
  { id: 'TVs', name: 'TVs', icon: '📺' },
  { id: 'Smart Watches', name: 'Smart Watches', icon: '⌚' },
  { id: 'Tablets', name: 'Tablets', icon: '📱' },
];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const handleCategorySelection = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const getAllProducts = async () => {
    try {
      const response = await fetch('http://localhost:4080/api/v1/product', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();

      if (json.success) {
        return json.data;
      } else {
        console.error('Error fetching products:', json.message);
        return [];
      }
    } catch (error) {
      console.error('Error in getAllProducts:', error);
      return [];
    }
  };

  const getProductByCategory = async (category) => {
    try {
      const response = await fetch(`http://localhost:4080/api/v1/product/category/${category}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();

      if (json.success) {
        return json.data;
      } else {
        console.error('Error fetching products:', json.message);
        return [];
      }
    } catch (error) {
      console.error('Error in getProductByCategory:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let data = [];
        if (selectedCategory === 'all') {
          data = await getAllProducts();
        } else {
          data = await getProductByCategory(selectedCategory);
        }
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

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

  return (
    <div className='bg-gray-50'>
      <HeroSection />
      <TrendingComparisons />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">        
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-medium">Filter by Category</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2">
            <button
              onClick={() => handleCategorySelection('all')}
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
                onClick={() => handleCategorySelection(category.id)}
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
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No products found in this category.</p>
            <button
              onClick={() => handleCategorySelection('all')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              View All Categories
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => {
              const bestDeal = calculateBestDeal(product.price_vs_platform);

              return (
                <ProductCard product={product} bestDeal={bestDeal} key={product._id}/>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Compare Before You Buy?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Make smarter shopping decisions and save money with our side-by-side comparison tools
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg transform -translate-y-1/2">
                        <BarChart3 className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Price Comparison</h3>
                    <p className="mt-4 text-base text-gray-500">
                      See which platform offers the better deal and how much you can save by choosing the right seller.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg transform -translate-y-1/2">
                        <Lightbulb className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Feature Analysis</h3>
                    <p className="mt-4 text-base text-gray-500">
                      Compare product features side-by-side to ensure you're getting exactly what you need from your purchase.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg transform -translate-y-1/2">
                        <Zap className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Time Savings</h3>
                    <p className="mt-4 text-base text-gray-500">
                      Save time by viewing comprehensive comparisons in one place instead of switching between multiple websites.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;