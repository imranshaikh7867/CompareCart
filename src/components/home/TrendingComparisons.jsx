import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../common/ProductCard';
import { backend_url } from '../../constants/constant';

const TrendingComparisons = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllProducts = async () => {
    try {
      const response = await fetch(`${backend_url}/api/v1/product`, {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
          All Products
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
  const calculateBestDeal = (priceVsPlatform) => {
    if (!priceVsPlatform || priceVsPlatform.length === 0) return null;
    
    // Convert price strings to numbers, handling comma-separated values
    const platformsWithNumericPrices = priceVsPlatform.map(platform => ({
      ...platform,
      price: typeof platform.price === 'string' 
        ? parseFloat(platform.price.replace(/,/g, ''))
        : platform.price
    }));

    const sortedPlatforms = [...platformsWithNumericPrices].sort((a, b) => a.price - b.price);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
          All Products
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
        {products.slice(0, 4).map(product => {
          const bestDeal = calculateBestDeal(product.price_vs_platform);

          return (
            <ProductCard product={product} bestDeal={bestDeal} key={product._id}/>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingComparisons;