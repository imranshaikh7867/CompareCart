import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { searchProducts } = useProductStore();
  const navigate = useNavigate();

  const handleSearch = (e) => {
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
      </div>
    </div>
  );
};

export default HeroSection;