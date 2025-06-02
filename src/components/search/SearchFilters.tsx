import React from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { SortOption } from '../../types';

const SearchFilters: React.FC = () => {
  const { filterOptions, setFilterOptions, sortOption, setSortOption } = useProductStore();

  const handlePriceRangeChange = (min: number, max: number) => {
    setFilterOptions({ priceRange: [min, max] });
  };

  const handleRatingChange = (rating: number) => {
    setFilterOptions({ minRating: rating });
  };

  const handlePlatformChange = (platform: 'amazon' | 'flipkart', checked: boolean) => {
    const currentPlatforms = [...filterOptions.platforms];
    
    if (checked && !currentPlatforms.includes(platform)) {
      currentPlatforms.push(platform);
    } else if (!checked && currentPlatforms.includes(platform)) {
      const index = currentPlatforms.indexOf(platform);
      currentPlatforms.splice(index, 1);
    }
    
    setFilterOptions({ platforms: currentPlatforms });
  };

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
    { value: 'rating-high-low', label: 'Rating: High to Low' },
    { value: 'popularity', label: 'Popularity' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="mb-4 pb-2 border-b">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Filter className="w-5 h-5 mr-2 text-blue-600" />
          Filters
        </h3>
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range</h4>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handlePriceRangeChange(0, 5000)}
            className={`py-1 px-2 text-xs rounded border ${filterOptions.priceRange[1] === 5000 ? 'bg-blue-100 border-blue-500 text-blue-700' : 'border-gray-300 text-gray-700'}`}
          >
            Under ₹5,000
          </button>
          <button
            onClick={() => handlePriceRangeChange(5000, 15000)}
            className={`py-1 px-2 text-xs rounded border ${filterOptions.priceRange[0] === 5000 && filterOptions.priceRange[1] === 15000 ? 'bg-blue-100 border-blue-500 text-blue-700' : 'border-gray-300 text-gray-700'}`}
          >
            ₹5,000 - ₹15,000
          </button>
          <button
            onClick={() => handlePriceRangeChange(15000, 30000)}
            className={`py-1 px-2 text-xs rounded border ${filterOptions.priceRange[0] === 15000 && filterOptions.priceRange[1] === 30000 ? 'bg-blue-100 border-blue-500 text-blue-700' : 'border-gray-300 text-gray-700'}`}
          >
            ₹15,000 - ₹30,000
          </button>
          <button
            onClick={() => handlePriceRangeChange(30000, 100000)}
            className={`py-1 px-2 text-xs rounded border ${filterOptions.priceRange[0] === 30000 ? 'bg-blue-100 border-blue-500 text-blue-700' : 'border-gray-300 text-gray-700'}`}
          >
            Above ₹30,000
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Minimum Rating</h4>
        <div className="flex items-center space-x-1">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`py-1 px-3 rounded text-sm ${
                filterOptions.minRating === rating
                  ? 'bg-blue-100 text-blue-700 border border-blue-500'
                  : 'bg-gray-100 text-gray-700 border border-gray-300'
              }`}
            >
              {rating}★ & up
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Platforms</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filterOptions.platforms.includes('amazon')}
              onChange={(e) => handlePlatformChange('amazon', e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span className="ml-2 text-gray-700">Amazon</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filterOptions.platforms.includes('flipkart')}
              onChange={(e) => handlePlatformChange('flipkart', e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span className="ml-2 text-gray-700">Flipkart</span>
          </label>
        </div>
      </div>
      
      <div>
        <div className="flex items-center mb-2">
          <SlidersHorizontal className="w-5 h-5 mr-2 text-blue-600" />
          <h4 className="text-sm font-medium text-gray-700">Sort By</h4>
        </div>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilters;