import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Updated with the uploaded images and improved descriptions
const heroImages = [{
  id: 1,
  src: "/lovable-uploads/7f36a108-d7d7-4b7a-87c2-993b8eed804b.png",
  alt: "Premium Spirits Collection"
}, {
  id: 2,
  src: "/lovable-uploads/b2322c9f-a55a-4816-bed7-910c45d9df93.png",
  alt: "Johnny Walker Black Label"
}, {
  id: 3,
  src: "/lovable-uploads/6d31f34c-7095-4a38-870e-7c43c306b9bd.png",
  alt: "Patrón Silver Tequila"
}, {
  id: 4,
  src: "/lovable-uploads/b09daaab-5591-481a-b97c-c681378f045b.png",
  alt: "Rémy Martin XO Cognac"
}, {
  id: 5,
  src: "/lovable-uploads/769cfbd3-b7bd-4f57-a8a2-beb41cb8711e.png",
  alt: "Grey Goose Vodka"
}];

const HeroCarousel = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [api, setApi] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Set loaded state when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-play the carousel with improved reliability
  useEffect(() => {
    if (!api) return;

    // Set up auto-play interval
    const interval = setInterval(() => {
      api.scrollNext();

      // Update current slide for indicators
      setCurrentSlide(prev => {
        const nextSlide = prev + 1 >= heroImages.length ? 0 : prev + 1;
        return nextSlide;
      });
    }, 5000); // Change slide every 5 seconds for better viewing experience

    // Handle manual navigation events
    const onSelect = () => {
      if (!api) return;
      setCurrentSlide(api.selectedScrollSnap());
    };
    api.on("select", onSelect);

    // Cleanup on component unmount
    return () => {
      clearInterval(interval);
      api.off("select", onSelect);
    };
  }, [api]);

  // Handle dot indicator clicks
  const scrollToSlide = (index: number) => {
    if (!api) return;
    api.scrollTo(index);
    setCurrentSlide(index);
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden glass-card transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Carousel
        opts={{
          loop: true,
          duration: 600 // Smoother transitions
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {heroImages.map(image => (
            <CarouselItem key={image.id}>
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-10000 hover:scale-105"
                  onError={e => {
                    // Fallback image if the primary one fails to load
                    console.log(`Failed to load image: ${image.src}`);
                    e.currentTarget.src = "/lovable-uploads/7f36a108-d7d7-4b7a-87c2-993b8eed804b.png";
                    e.currentTarget.alt = "Premium spirits";
                  }}
                />
                
                {/* Caption overlay for better UX */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 rounded-sm">
                  <h3 className="text-white text-xl md:text-2xl font-serif font-bold">{image.alt}</h3>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation arrows (visible but carousel will auto-play) */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
        
        {/* Dot indicators for enhanced user experience */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? "bg-white w-4" : "bg-white/50"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
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
