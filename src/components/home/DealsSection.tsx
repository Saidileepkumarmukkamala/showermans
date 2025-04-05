
import React from 'react';
import { Link } from 'react-router-dom';
import { Percent, ArrowRight, Tag } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from './ProductCard';

const DealsSection = () => {
  // Get products that are on sale (have originalPrice)
  const dealsProducts = products.filter(p => p.isSale || p.originalPrice).slice(0, 4);

  // Calculate discount percentage
  const calculateDiscount = (price: number, originalPrice?: number) => {
    if (!originalPrice) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <section className="py-12 bg-secondary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-red-500/10 p-2 rounded-full">
              <Percent className="text-red-500 h-6 w-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold">Hot Deals</h2>
          </div>
          <Link 
            to="/category/all?sale=true" 
            className="text-sm font-medium text-primary flex items-center hover:text-red-500 transition-colors"
          >
            View All Deals
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealsProducts.map(product => (
            <div key={product.id} className="relative group">
              <ProductCard {...product} />
              {product.originalPrice && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md flex items-center text-xs font-medium z-10">
                  <Tag className="h-3 w-3 mr-1" />
                  Save {calculateDiscount(product.price, product.originalPrice)}%
                </div>
              )}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/30 rounded-xl transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 bg-gradient-to-r from-red-500/10 via-red-500/20 to-red-500/10 rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">Limited Time Offers</h3>
              <p className="text-muted-foreground">Save up to 30% on premium spirits and wines</p>
            </div>
            <Link 
              to="/category/all?sale=true" 
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-medium transition-colors inline-flex items-center"
            >
              Shop Deals
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
