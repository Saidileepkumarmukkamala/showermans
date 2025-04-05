
import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from './ProductCard';

const TrendingSection = () => {
  // Get trending products (for demo purposes, we'll use products with id 1, 3, 7, 10)
  const trendingProducts = products.filter(p => [1, 3, 7, 10].includes(p.id)).slice(0, 4);

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-gold h-6 w-6" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold">Trending Now</h2>
          </div>
          <Link 
            to="/category/all" 
            className="text-sm font-medium text-primary flex items-center hover:text-gold transition-colors"
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
