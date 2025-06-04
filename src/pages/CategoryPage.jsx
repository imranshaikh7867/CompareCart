import React, { useEffect, useState } from 'react';
import { LayoutGrid, Filter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'Smartphones', name: 'Smartphones', icon: '📱' },
  { id: 'Laptops', name: 'Laptops', icon: '💻' },
  { id: 'Headphones', name: 'Headphones', icon: '🎧' },
  { id: 'Cameras', name: 'Cameras', icon: '📷' },
  { id: 'TVs', name: 'TVs', icon: '📺' },
  { id: 'Smart Watches', name: 'Smart Watches', icon: '⌚' },
  { id: 'Tablets', name: 'Tablets', icon: '📱' },
  { id: 'Gaming', name: 'Gaming', icon: '🎮' }
];

function CategoryPage() {
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
      savings: savings
    };
  };

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
              onClick={() => handleCategorySelection('all')}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-colors ${
                selectedCategory === 'all'
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
                className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-colors ${
                  selectedCategory === category.id
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
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent pt-10 pb-3 px-4">
                      <h2 className="text-white font-bold text-lg">{product.name}</h2>
                    </div>
                    <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 text-xs font-semibold text-gray-800">
                      {product.category}
                    </div>
                  </div>

                  <div className="p-4">
                    {product.price_vs_platform.map((platform, index) => (
                      <div key={index} className="flex justify-between items-center mb-3">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full ${
                            platform.platform === bestDeal?.platform ? 'bg-green-500' : 'bg-gray-300'
                          }`}></div>
                          <span className="text-sm ml-1">{platform.platform}</span>
                        </div>
                        <span className="font-semibold">₹{platform.price.toLocaleString('en-IN')}</span>
                      </div>
                    ))}

                    {bestDeal && (
                      <div className="bg-green-50 mb-2 p-2 rounded-md text-center">
                        <span className="text-green-700 text-sm font-medium">
                          Save {bestDeal.savings}% on {bestDeal.platform}
                        </span>
                      </div>
                    )}

                    <Link
                      to={`/CompareCart/comparison/${product._id}`}
                      className="text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center"
                    >
                      View Comparison <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryPage; 