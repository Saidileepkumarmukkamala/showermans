
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';

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

  // Get the Macallan 18 Years for the hero image
  const heroProduct = products[0];

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
              <Link 
                to="/category/all" 
                className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a 
                href="#categories" 
                className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium text-primary border border-primary hover:bg-primary/5 transition-colors duration-200"
              >
                Explore Categories
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div 
            ref={imageRef}
            className="opacity-0 transition-opacity duration-1000 ease-out delay-300"
          >
            <div className="relative rounded-2xl overflow-hidden glass-card">
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img 
                  src={heroProduct.image} 
                  alt={heroProduct.name} 
                  className="w-full h-full object-cover transition-transform duration-10000 hover:scale-105" 
                  onError={(e) => {
                    console.log("Failed to load hero image");
                    e.currentTarget.src = "https://cdn.shopify.com/s/files/1/0105/4464/9843/products/machaeaayeeaadquaddabiabigaduabsabrabiabmaciaamabcabsacuaa_600x.png";
                    e.currentTarget.alt = "Premium spirits";
                  }}
                />
                
                {/* Caption overlay for better UX */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 rounded-sm">
                  <h3 className="text-white text-xl md:text-2xl font-serif font-bold">{heroProduct.name}</h3>
                </div>
              </div>
              
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-gold/10 filter blur-xl mix-blend-multiply" />
              <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-full p-4 w-24 h-24 flex flex-col items-center justify-center animate-image-glow">
                  <span className="text-xs font-medium text-muted-foreground">Up to</span>
                  <span className="text-xl font-bold text-gold">30%</span>
                  <span className="text-sm font-medium">Off</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
