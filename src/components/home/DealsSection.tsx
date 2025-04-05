
import React from 'react';
import { Link } from 'react-router-dom';
import { Percent, ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from './ProductCard';

const DealsSection = () => {
  // Get products that are on sale (have originalPrice)
  const dealsProducts = products.filter(p => p.isSale || p.originalPrice).slice(0, 4);

  return (
    <section className="py-12 bg-secondary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Percent className="text-gold h-6 w-6" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold">Hot Deals</h2>
          </div>
          <Link 
            to="/category/all?sale=true" 
            className="text-sm font-medium text-primary flex items-center hover:text-gold transition-colors"
          >
            View All Deals
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealsProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
