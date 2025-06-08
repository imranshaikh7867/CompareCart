import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchFilters from '../components/search/SearchFilters';
import SearchResults from '../components/search/SearchResults';
import { backend_url } from '../constants/constant';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const query = searchParams.get('q');

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

  const getProductByCategory = async (category) => {
    try {
      const response = await fetch(`${backend_url}/api/v1/product/category/${category}`, {
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

  const filterProducts = (products) => {
    return products.filter(product => {
      // Filter by search query
      const matchesSearch = query ? 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.features.toLowerCase().includes(query.toLowerCase()) :
        true;

      // Filter by price range
      const minPrice = priceRange.min ? Number(priceRange.min) : 0;
      const maxPrice = priceRange.max ? Number(priceRange.max) : Infinity;
      
      const lowestPrice = Math.min(...product.price_vs_platform.map(p => p.price));
      const highestPrice = Math.max(...product.price_vs_platform.map(p => p.price));

      return matchesSearch && lowestPrice >= minPrice && highestPrice <= maxPrice;
    });
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
        const filteredData = filterProducts(data);
        setProducts(filteredData);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, priceRange, query]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <SearchFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
            />
          </div>
          <div className="md:col-span-3">
            <SearchResults
              products={products}
              isLoading={isLoading}
              searchTerm={query}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;