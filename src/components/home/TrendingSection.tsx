import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from './ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

const TrendingSection = () => {
  const trendingProducts = products.filter(p => [1, 3, 7, 10].includes(p.id)).slice(0, 8);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-gray-900">
            Trending Alcohol
          </h2>
          <Link
            to="/category/all"
            className="text-sm font-medium text-primary hover:text-gold flex items-center transition-colors"
          >
            Shop All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel opts={{ align: 'start', loop: true }}>
            <CarouselContent>
              {trendingProducts.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="px-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-base font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{product.volume || '750ml'}</p>
                      <p className="text-lg font-bold text-primary mb-3">${product.price.toFixed(2)}</p>
                      <Link
                        to={`/product/${product.id}`}
                        className="inline-block w-full text-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
