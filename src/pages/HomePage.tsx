import React, { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import TrendingComparisons from '../components/home/TrendingComparisons';
import { useProductStore } from '../store/useProductStore';
import { Lightbulb, BarChart3, Zap } from 'lucide-react';

const HomePage: React.FC = () => {
  const { fetchTrendingComparisons } = useProductStore();
  
  useEffect(() => {
    fetchTrendingComparisons();
  }, [fetchTrendingComparisons]);

  return (
    <div>
      <HeroSection />
      <TrendingComparisons />
      
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Compare Before You Buy?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Make smarter shopping decisions and save money with our side-by-side comparison tools
            </p>
          </div>
          
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg transform -translate-y-1/2">
                        <BarChart3 className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Price Comparison</h3>
                    <p className="mt-4 text-base text-gray-500">
                      See which platform offers the better deal and how much you can save by choosing the right seller.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg transform -translate-y-1/2">
                        <Lightbulb className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Feature Analysis</h3>
                    <p className="mt-4 text-base text-gray-500">
                      Compare product features side-by-side to ensure you're getting exactly what you need from your purchase.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg transform -translate-y-1/2">
                        <Zap className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Time Savings</h3>
                    <p className="mt-4 text-base text-gray-500">
                      Save time by viewing comprehensive comparisons in one place instead of switching between multiple websites.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default HomePage;