import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeftRight, CheckCircle2, XCircle, PercentIcon, AlertTriangle } from 'lucide-react';
import ProductCard from '../common/ProductCard';
import { useProductStore } from '../../store/useProductStore';
import { Product, ComparisonItem } from '../../types';
import { getProductById, getRecommendations } from '../../services/api';

const ComparisonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [amazonProduct, setAmazonProduct] = useState<Product | null>(null);
  const [flipkartProduct, setFlipkartProduct] = useState<Product | null>(null);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comparisonData, setComparisonData] = useState<Record<string, { amazon: string | boolean, flipkart: string | boolean, better: 'amazon' | 'flipkart' | 'equal' }>>({});
  
  useEffect(() => {
    const fetchComparisonData = async () => {
      setIsLoading(true);
      
      if (id) {
        const parts = id.split('-');
        
        if (parts.length === 2) {
          const [amazonId, flipkartId] = parts;
          
          // Fetch both products in parallel
          const [amazonResult, flipkartResult] = await Promise.all([
            amazonId !== 'none' ? getProductById(amazonId, 'amazon') : Promise.resolve(undefined),
            flipkartId !== 'none' ? getProductById(flipkartId, 'flipkart') : Promise.resolve(undefined)
          ]);
          
          if (amazonResult) setAmazonProduct(amazonResult);
          if (flipkartResult) setFlipkartProduct(flipkartResult);
          
          // Get recommendations based on one of the products
          const targetProduct = amazonResult || flipkartResult;
          if (targetProduct) {
            const recs = await getRecommendations(targetProduct.id);
            setRecommendations(recs);
          }
          
          // Create comparison data
          if (amazonResult && flipkartResult) {
            createComparisonData(amazonResult, flipkartResult);
          }
        }
      }
      
      setIsLoading(false);
    };
    
    fetchComparisonData();
  }, [id]);
  
  const createComparisonData = (amazon: Product, flipkart: Product) => {
    const data: Record<string, { amazon: string | boolean, flipkart: string | boolean, better: 'amazon' | 'flipkart' | 'equal' }> = {
      price: {
        amazon: `₹${amazon.price.toLocaleString('en-IN')}`,
        flipkart: `₹${flipkart.price.toLocaleString('en-IN')}`,
        better: amazon.price < flipkart.price ? 'amazon' : flipkart.price < amazon.price ? 'flipkart' : 'equal'
      },
      rating: {
        amazon: `${amazon.rating}★`,
        flipkart: `${flipkart.rating}★`,
        better: amazon.rating > flipkart.rating ? 'amazon' : flipkart.rating > amazon.rating ? 'flipkart' : 'equal'
      },
      reviews: {
        amazon: amazon.reviewCount.toLocaleString(),
        flipkart: flipkart.reviewCount.toLocaleString(),
        better: amazon.reviewCount > flipkart.reviewCount ? 'amazon' : flipkart.reviewCount > amazon.reviewCount ? 'flipkart' : 'equal'
      },
      inStock: {
        amazon: amazon.inStock,
        flipkart: flipkart.inStock,
        better: amazon.inStock && !flipkart.inStock ? 'amazon' : !amazon.inStock && flipkart.inStock ? 'flipkart' : 'equal'
      }
    };
    
    // Compare features
    amazon.features.forEach((feature, index) => {
      const normalizedFeature = feature.toLowerCase().trim();
      const hasFeature = flipkart.features.some(f => f.toLowerCase().trim() === normalizedFeature);
      
      if (!hasFeature) {
        data[`feature_${index}`] = {
          amazon: feature,
          flipkart: false,
          better: 'amazon'
        };
      }
    });
    
    flipkart.features.forEach((feature, index) => {
      const normalizedFeature = feature.toLowerCase().trim();
      const hasFeature = amazon.features.some(f => f.toLowerCase().trim() === normalizedFeature);
      
      if (!hasFeature) {
        data[`flipkart_feature_${index}`] = {
          amazon: false,
          flipkart: feature,
          better: 'flipkart'
        };
      }
    });
    
    setComparisonData(data);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-4xl animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
          <div className="mt-8 h-80 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // If no products found
  if (!amazonProduct && !flipkartProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Comparison Not Found</h2>
        <p className="text-gray-600 mb-6">We couldn't find the comparison you're looking for.</p>
      </div>
    );
  }

  const priceDifference = amazonProduct && flipkartProduct 
    ? Math.abs(amazonProduct.price - flipkartProduct.price)
    : 0;
  
  const savingsPercentage = amazonProduct && flipkartProduct
    ? ((priceDifference / Math.max(amazonProduct.price, flipkartProduct.price)) * 100).toFixed(0)
    : '0';
  
  const betterDeal = amazonProduct && flipkartProduct
    ? amazonProduct.price <= flipkartProduct.price ? 'amazon' : 'flipkart'
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {amazonProduct?.name || flipkartProduct?.name}
      </h1>
      
      {betterDeal && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 flex items-center">
          <div className="mr-4 bg-green-100 rounded-full p-2">
            <PercentIcon className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-bold text-green-800">Save ₹{priceDifference.toLocaleString('en-IN')} ({savingsPercentage}%)</h3>
            <p className="text-green-700">
              Better deal on {betterDeal === 'amazon' ? 'Amazon' : 'Flipkart'} - Get the same product for less!
            </p>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {amazonProduct && (
          <div className={betterDeal === 'amazon' ? 'relative' : ''}>
            {betterDeal === 'amazon' && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-1 px-4 rounded-full text-sm font-medium z-10">
                Best Deal
              </div>
            )}
            <ProductCard product={amazonProduct} isHighlighted={betterDeal === 'amazon'} />
          </div>
        )}
        
        {flipkartProduct && (
          <div className={betterDeal === 'flipkart' ? 'relative' : ''}>
            {betterDeal === 'flipkart' && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-1 px-4 rounded-full text-sm font-medium z-10">
                Best Deal
              </div>
            )}
            <ProductCard product={flipkartProduct} isHighlighted={betterDeal === 'flipkart'} />
          </div>
        )}
      </div>
      
      {/* Detailed Comparison */}
      {amazonProduct && flipkartProduct && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
          <div className="bg-gray-50 py-3 px-4 border-b">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <ArrowLeftRight className="h-5 w-5 mr-2 text-blue-600" />
              Detailed Comparison
            </h2>
          </div>
          
          <div className="divide-y">
            {Object.entries(comparisonData).map(([key, { amazon, flipkart, better }]) => {
              // Skip feature comparisons for the main table
              if (key.startsWith('feature_') || key.startsWith('flipkart_feature_')) {
                return null;
              }
              
              const label = key.charAt(0).toUpperCase() + key.slice(1);
              
              return (
                <div key={key} className="grid grid-cols-3 py-3 px-4 items-center">
                  <div className="font-medium text-gray-700">{label}</div>
                  
                  <div className={`text-center ${better === 'amazon' ? 'font-semibold text-green-700' : ''}`}>
                    {typeof amazon === 'boolean' ? (
                      amazon ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      amazon
                    )}
                  </div>
                  
                  <div className={`text-center ${better === 'flipkart' ? 'font-semibold text-green-700' : ''}`}>
                    {typeof flipkart === 'boolean' ? (
                      flipkart ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      flipkart
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Unique Features Comparison */}
      {amazonProduct && flipkartProduct && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
          <div className="bg-gray-50 py-3 px-4 border-b">
            <h2 className="text-lg font-medium text-gray-900">Unique Features Comparison</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-orange-50 py-2 px-3 border-b border-orange-100">
                <h3 className="font-medium text-orange-800">Amazon Exclusive Features</h3>
              </div>
              <div className="p-3">
                <ul className="space-y-2">
                  {Object.entries(comparisonData)
                    .filter(([key, { better }]) => key.startsWith('feature_') && better === 'amazon')
                    .map(([key, { amazon }]) => (
                      <li key={key} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{amazon as string}</span>
                      </li>
                    ))}
                  {!Object.entries(comparisonData).some(([key, { better }]) => key.startsWith('feature_') && better === 'amazon') && (
                    <li className="text-gray-500 italic">No exclusive features found</li>
                  )}
                </ul>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-blue-50 py-2 px-3 border-b border-blue-100">
                <h3 className="font-medium text-blue-800">Flipkart Exclusive Features</h3>
              </div>
              <div className="p-3">
                <ul className="space-y-2">
                  {Object.entries(comparisonData)
                    .filter(([key, { better }]) => key.startsWith('flipkart_feature_') && better === 'flipkart')
                    .map(([key, { flipkart }]) => (
                      <li key={key} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{flipkart as string}</span>
                      </li>
                    ))}
                  {!Object.entries(comparisonData).some(([key, { better }]) => key.startsWith('flipkart_feature_') && better === 'flipkart') && (
                    <li className="text-gray-500 italic">No exclusive features found</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Similar Products */}
      {recommendations.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonDetail;