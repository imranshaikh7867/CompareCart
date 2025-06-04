import React, { useEffect, useState } from 'react';
import { useProductStore } from '../store/useProductStore';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';

const TrendingPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let data = await getAllProducts();
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);
  if (isLoading && products.length === 0) {
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
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
          All Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => {
            const bestDeal = calculateBestDeal(product.price_vs_platform);

            return (
              <ProductCard product={product} bestDeal={bestDeal} key={product._id} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;