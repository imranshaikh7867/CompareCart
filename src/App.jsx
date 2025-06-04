import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import TrendingPage from './pages/TrendingPage';
import CategoryPage from './pages/CategoryPage';

function App() {
  // Initialize store

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/CompareCart" element={<HomePage />} />
            <Route path="/CompareCart/search-results" element={<SearchResultsPage />} />
            <Route path="/CompareCart/trending" element={<TrendingPage />} />
            <Route path="/CompareCart/categories" element={<CategoryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 