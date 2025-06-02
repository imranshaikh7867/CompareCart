import React from 'react';
import SearchFilters from '../components/search/SearchFilters';
import SearchResults from '../components/search/SearchResults';

const SearchResultsPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <SearchFilters />
          </div>
          <div className="md:col-span-3">
            <SearchResults />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;