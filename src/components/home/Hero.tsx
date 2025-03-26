
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import HeroCarousel from './HeroCarousel';

const Hero = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (textRef.current) observer.observe(textRef.current);
    if (imageRef.current) observer.observe(imageRef.current);

    return () => {
      if (textRef.current) observer.unobserve(textRef.current);
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <div className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 right-0 h-full">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/60 to-transparent opacity-70" />
        <div className="absolute top-1/3 -left-10 w-40 h-40 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-60 h-60 rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div 
            ref={textRef}
            className="opacity-0 transition-opacity duration-1000 ease-out"
          >
            <span className="inline-block py-1 px-3 text-xs font-medium bg-gold/10 text-gold rounded-full mb-4">
              Premium Selection
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              Discover Exquisite <span className="h1-gradient">Spirits</span> & Fine Wines
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Curated collection of the finest liquors from around the world. Explore premium quality spirits for the most discerning connoisseurs.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#shop" 
                className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a 
                href="#categories" 
                className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium text-primary border border-primary hover:bg-primary/5 transition-colors duration-200"
              >
                Explore Categories
              </a>
            </div>
          </div>

          {/* Hero Carousel */}
          <div 
            ref={imageRef}
            className="opacity-0 transition-opacity duration-1000 ease-out delay-300"
          >
            <HeroCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
