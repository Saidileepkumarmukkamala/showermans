import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ArrowRight, Star } from 'lucide-react';
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
  // Get trending products (for demo purposes)
  const trendingProducts = products.filter(p => [1, 3, 7, 10].includes(p.id)).slice(0, 4);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-gold/20 p-3 rounded-full shadow-sm">
              <TrendingUp className="text-gold h-6 w-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-foreground">
              Trending Now
            </h2>
          </div>
          <Link
            to="/category/all"
            className="text-sm font-medium text-primary hover:text-gold flex items-center transition-colors"
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative px-4 sm:px-6">
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {trendingProducts.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/4"
                >
                  <div className="relative group">
                    <ProductCard {...product} />
                    <div className="absolute top-3 right-3 bg-gold/90 text-white px-2 py-1 rounded-md flex items-center text-xs font-medium shadow-sm z-10">
                      <Star className="h-3 w-3 mr-1 fill-white" />
                      Trending
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Arrows */}
            <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 h-10 w-10 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-sm shadow-md" />
            <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 h-10 w-10 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-sm shadow-md" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
