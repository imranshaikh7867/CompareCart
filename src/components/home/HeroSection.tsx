import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { searchProducts } = useProductStore();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchProducts(searchQuery);
      navigate('/search-results');
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-10"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-center sm:text-5xl lg:text-6xl mb-6">
          <span className="block">Find the Best Deals</span>
          <span className="block mt-1">Compare Before You Buy</span>
        </h1>
        
        <p className="mt-6 max-w-lg mx-auto text-xl text-blue-100 text-center">
          Compare prices, features, and reviews between Amazon and Flipkart to make smarter shopping decisions.
        </p>
        
        <div className="mt-10 max-w-xl w-full">
          <form onSubmit={handleSearch} className="w-full relative">
            <input
              type="text"
              placeholder="Search for products to compare..."
              className="w-full py-4 px-5 pr-16 rounded-full text-gray-800 border-0 shadow-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bg-blue-600 p-2 rounded-full shadow-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Search className="h-6 w-6 text-white" />
            </button>
          </form>
          
          <div className="mt-4 flex justify-center space-x-4 text-sm">
            <button 
              onClick={() => {
                setSearchQuery('iPhone 14');
                searchProducts('iPhone 14');
                navigate('/search-results');
              }}
              className="bg-blue-700 bg-opacity-40 hover:bg-opacity-60 px-3 py-1 rounded-full"
            >
              iPhone 14
            </button>
            <button 
              onClick={() => {
                setSearchQuery('Headphones');
                searchProducts('Headphones');
                navigate('/search-results');
              }}
              className="bg-blue-700 bg-opacity-40 hover:bg-opacity-60 px-3 py-1 rounded-full"
            >
              Headphones
            </button>
            <button 
              onClick={() => {
                setSearchQuery('Laptop');
                searchProducts('Laptop');
                navigate('/search-results');
              }}
              className="bg-blue-700 bg-opacity-40 hover:bg-opacity-60 px-3 py-1 rounded-full"
            >
              Laptops
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;