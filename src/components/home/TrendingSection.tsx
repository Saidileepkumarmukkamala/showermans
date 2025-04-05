
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
  // Get trending products (for demo purposes, we'll use products with id 1, 3, 7, 10)
  const trendingProducts = products.filter(p => [1, 3, 7, 10].includes(p.id)).slice(0, 4);

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-gold/10 p-2 rounded-full">
              <TrendingUp className="text-gold h-6 w-6" />
            </div>
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

        <div className="relative px-10">
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent className="-ml-4">
              {trendingProducts.map(product => (
                <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                  <div className="relative">
                    <ProductCard {...product} />
                    <div className="absolute top-3 right-3 bg-gold/90 text-white px-2 py-1 rounded-md flex items-center text-xs font-medium z-10">
                      <Star className="h-3 w-3 mr-1 fill-white" />
                      Trending
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
