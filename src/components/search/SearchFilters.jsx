import React from 'react';
import { Filter } from 'lucide-react';

const categories = [
  { id: 'Shoe for Men', name: 'Shoe for Men', icon: '📱' },
  { id: 'Shoe for Women', name: 'Shoe for Women', icon: '💻' },
  { id: 'Shoe for Men (Casual)', name: 'Shoe for Men (Casual)', icon: '🎧' },
  { id: 'Shoe for Men (Formal)', name: 'Shoe for Men (Formal)', icon: '📷' },
  { id: 'Shoe for Men (Leather)', name: 'Shoe for Men (Leather)', icon: '📺' },
];

const SearchFilters = ({ selectedCategory, onCategoryChange, priceRange, onPriceRangeChange }) => {


  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-4">
        <Filter className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-medium">Filters</h2>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange('all')}
            className={`w-full flex items-center p-2 rounded-md transition-colors ${selectedCategory === 'all'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
              }`}
          >
            <span className="text-lg mr-2">🔍</span>
            <span>All Categories</span>
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full flex items-center p-2 rounded-md transition-colors ${selectedCategory === category.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;