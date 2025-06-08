import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function ProductCard({ product, bestDeal }) {
    return (
        <div
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-60 object-fill"
                />
                <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 text-xs font-semibold text-gray-800">
                    {product.category}
                </div>
            </div>
            <div className="px-4 py-4">
                <h2 className="text-black font-bold text-lg">{product.name}</h2>
            </div>
            <div className="p-4">
                {product.price_vs_platform.map((platform, index) => (
                    <div key={index} className="flex justify-between items-center mb-3">
                        <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full ${platform.platform === bestDeal?.platform ? 'bg-green-500' : 'bg-gray-300'
                                }`}></div>
                            <span className="text-sm ml-1">{platform.platform}</span>
                        </div>
                        <span className="font-semibold">₹{platform.price.toLocaleString('en-IN')}</span>
                    </div>
                ))}

                {bestDeal && (
                    <div className="bg-green-50 mb-2 p-2 rounded-md text-center">
                        <span className="text-green-700 text-sm font-medium">
                            Save {bestDeal.savings}% on {bestDeal.platform}
                        </span>
                    </div>
                )}
                <a href={bestDeal.link} className="text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center" target="_blank" rel="noopener noreferrer">
                    Buy on {bestDeal.platform} <ArrowRight className="ml-1 h-4 w-4" />
                </a>

            </div>
        </div>
    );
}

export default ProductCard;
