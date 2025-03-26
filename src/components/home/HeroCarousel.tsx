
import React, { useEffect, useState } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const heroImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    alt: "Premium spirits collection"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1609951651791-703dec449b3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    alt: "Whiskey tasting experience"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1516358045903-b686e6bd3814?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    alt: "Fine wine selection"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1508253730651-e5ace40d34ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    alt: "Rare bourbon collection"
  }
];

const HeroCarousel = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Delay setting loaded to true to ensure smooth animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative rounded-2xl overflow-hidden glass-card transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Carousel opts={{ loop: true, duration: 40 }}>
        <CarouselContent>
          {heroImages.map((image) => (
            <CarouselItem key={image.id}>
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-10000 hover:scale-105"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
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
