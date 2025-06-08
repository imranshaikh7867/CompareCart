import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Instagram, Twitter, Facebook, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">CompareKar</span>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Making shopping decisions easier with comprehensive product comparisons.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Categories</h3>
            <ul className="mt-4 space-y-2">
              {["Shoe for Men", "Shoe for Women", "Shoe for Men (Casual)", "Shoe for Men (Formal)", "Shoe for Men (Leather)"].map((item) => (
                <li key={item}>
                  <Link to={`/categories?category=${item.toLowerCase()}`} className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              {["About", "How it Works", "Blog", "Careers", "Press"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              {["Terms", "Privacy", "Cookies", "Affiliate Disclosure", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} CompareKar. All rights reserved.
          </p>
          <p className="mt-2 text-sm text-gray-500 text-center">
            Amazon and Flipkart are trademarks of Amazon.com, Inc. and Flipkart Private Limited respectively.
            CompareKar is not affiliated with either company.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
