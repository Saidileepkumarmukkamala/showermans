
import React, { useEffect, useState } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Updated with proper liquor store related images
const heroImages = [
  {
    id: 1,
    src: "https://cdn.shopify.com/s/files/1/0474/1849/3562/files/slider-01-1050x550_2400x.jpg",
    alt: "Premium spirits collection"
  },
  {
    id: 2,
    src: "https://cdn.shopify.com/s/files/1/0474/1849/3562/files/slider-02-1050x550_2400x.jpg",
    alt: "Whiskey selection"
  },
  {
    id: 3,
    src: "https://cdn.shopify.com/s/files/1/0474/1849/3562/files/slider-03-1050x550_2400x.jpg",
    alt: "Fine wine collection"
  },
  {
    id: 4,
    src: "https://cdn.shopify.com/s/files/1/0474/1849/3562/files/Hennessy-XO-Cognac-700ml_750x.jpg",
    alt: "Rare cognac collection"
  }
];

const HeroCarousel = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [api, setApi] = useState<any>(null);
  
  // Set loaded state when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Auto-play the carousel
  useEffect(() => {
    if (!api) return;

    // Set up auto-play interval
    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000); // Change slide every 4 seconds

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className={`relative rounded-2xl overflow-hidden glass-card transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Carousel 
        opts={{ 
          loop: true, 
          duration: 40 
        }} 
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {heroImages.map((image) => (
            <CarouselItem key={image.id}>
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-10000 hover:scale-105"
                  onError={(e) => {
                    // Fallback image if the primary one fails to load
                    e.currentTarget.src = "https://cdn.shopify.com/s/files/1/0474/1849/3562/files/Vodka_750x.jpg";
                    e.currentTarget.alt = "Premium spirits";
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation arrows (still visible but carousel will auto-play) */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>
      
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-gold/10 filter blur-xl mix-blend-multiply" />
      <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
        <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-full p-4 w-24 h-24 flex flex-col items-center justify-center animate-image-glow">
          <span className="text-xs font-medium text-muted-foreground">Up to</span>
          <span className="text-xl font-bold text-gold">30%</span>
          <span className="text-sm font-medium">Off</span>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
