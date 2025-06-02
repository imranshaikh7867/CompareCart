import React from 'react';
import { Star, ExternalLink, Truck, ShieldCheck } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  isHighlighted?: boolean;
  showAsSingle?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isHighlighted = false, 
  showAsSingle = false 
}) => {
  const { name, price, rating, reviewCount, image, platform, inStock, url } = product;

  // Format price with commas for Indian Rupees
  const formattedPrice = price.toLocaleString('en-IN');

  return (
    <div 
      className={`
        relative rounded-lg overflow-hidden transition-all duration-300
        ${showAsSingle ? 'max-w-md mx-auto' : 'w-full'}
        ${isHighlighted 
          ? 'border-2 border-green-500 shadow-lg transform hover:-translate-y-1' 
          : 'border border-gray-200 shadow hover:shadow-md'}
      `}
    >
      {isHighlighted && (
        <div className="absolute top-0 left-0 bg-green-500 text-white py-1 px-3 rounded-br-lg text-sm font-medium z-10">
          Best Deal
        </div>
      )}
      
      <div className="relative h-48 bg-gray-100">
        <img 
          src={image} 
          alt={name}
          loading="lazy"
          className="w-full h-full object-contain p-2"
        />
        <div className={`absolute top-2 right-2 rounded-full px-2 py-1 text-xs text-white font-medium ${platform === 'amazon' ? 'bg-orange-500' : 'bg-blue-500'}`}>
          {platform === 'amazon' ? 'Amazon' : 'Flipkart'}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 line-clamp-2" title={name}>{name}</h3>
        
        <div className="flex items-center mt-2">
          <div className="flex items-center bg-green-100 px-2 py-1 rounded">
            <span className="text-sm font-medium text-green-800">{rating}</span>
            <Star className="w-4 h-4 ml-1 fill-current text-yellow-500 stroke-yellow-500" />
          </div>
          <span className="ml-2 text-sm text-gray-500">({reviewCount} reviews)</span>
        </div>
        
        <div className="mt-3">
          <p className="text-2xl font-bold text-gray-900">₹{formattedPrice}</p>
        </div>
        
        <div className="mt-2 flex items-center space-x-2 text-sm">
          {inStock ? (
            <span className="text-green-600 flex items-center">
              <Truck className="w-4 h-4 mr-1" /> In Stock
            </span>
          ) : (
            <span className="text-red-600">Out of Stock</span>
          )}
          
          <span className="text-gray-600 flex items-center">
            <ShieldCheck className="w-4 h-4 mr-1" /> 7 day replacement
          </span>
        </div>
        
        <div className="mt-4">
          <a 
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              flex items-center justify-center w-full py-2 px-4 rounded-lg text-white font-medium
              transition-colors duration-200 ease-in-out
              ${platform === 'amazon' 
                ? 'bg-orange-500 hover:bg-orange-600' 
                : 'bg-blue-500 hover:bg-blue-600'}
            `}
          >
            Buy Now <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;