
import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '@/data/products';

// Hero slide data with properly referenced images
const heroSlides = [
  {
    id: 1,
    image: "/lovable-uploads/b7cdd800-7470-480b-958d-7fb505ee3bf9.png", // Using uploaded image instead of external URL
    title: "Premium Whiskey Collection",
    description: "Discover our curated selection of rare and aged whiskies from renowned distilleries around the world.",
    cta: "Shop Collection",
    link: "/category/whiskey",
    alignment: "left",
    overlayColor: "from-black/70",
    badge: "New Arrival"
  },
  {
    id: 2,
    image: "/lovable-uploads/2f8cebd6-fce7-4648-a875-4cbc73e740aa.png", // Using uploaded image instead of external URL
    title: "Limited Edition Spirits",
    description: "Exclusive bottles for the most discerning connoisseurs. Premium quality guaranteed.",
    cta: "Explore Now",
    link: "/category/all",
    alignment: "right",
    overlayColor: "from-black/60",
    badge: "Limited Stock"
  },
  {
    id: 3,
    image: "/lovable-uploads/afe2eb7d-d6b4-4031-854f-23f91a100b3b.png", // Using uploaded image instead of external URL
    title: "Exquisite Wine Selection",
    description: "From bold reds to crisp whites, explore our hand-picked selection of fine wines from around the world.",
    cta: "View Collection",
    link: "/category/wine",
    alignment: "center",
    overlayColor: "from-black/50",
    badge: "Featured"
  }
];

const HeroCarousel = () => {
  const [api, setApi] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});

  // Auto-play the carousel
  useEffect(() => {
    // Set a small delay to ensure images have time to load
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Check if all images are loaded
  useEffect(() => {
    const allImagesLoaded = heroSlides.every(slide => imagesLoaded[slide.id] === true);
    if (allImagesLoaded && Object.keys(imagesLoaded).length === heroSlides.length) {
      console.log("All images loaded successfully");
    }
  }, [imagesLoaded]);

  // Control auto-rotation and slides
  useEffect(() => {
    if (!api) return;

    // Set up auto-play interval
    const interval = setInterval(() => {
      api.scrollNext();

      // Update current slide for indicators
      setCurrentSlide(prev => {
        const nextSlide = prev + 1 >= heroSlides.length ? 0 : prev + 1;
        return nextSlide;
      });
    }, 6000); // Change slide every 6 seconds

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

  // Handle image load
  const handleImageLoad = (slideId: number) => {
    console.log(`Image ${slideId} loaded successfully`);
    setImagesLoaded(prev => ({ ...prev, [slideId]: true }));
  };

  // Handle image error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, slide: any) => {
    console.error(`Failed to load image: ${slide.image}`);
    e.currentTarget.src = "/placeholder.svg"; // Fallback image
    setImagesLoaded(prev => ({ ...prev, [slide.id]: true })); // Mark as loaded even if it's a fallback
  };

  return (
    <div className={`relative w-full h-[85vh] ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Carousel
        opts={{
          loop: true,
          duration: 800
        }}
        setApi={setApi}
        className="w-full h-full"
      >
        <CarouselContent className="h-full">
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id} className="h-full relative overflow-hidden">
              {/* Image Background */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="w-full h-full object-cover"
                  onLoad={() => handleImageLoad(slide.id)}
                  onError={(e) => handleImageError(e, slide)}
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${slide.overlayColor} via-transparent to-transparent`}></div>
              </div>

              {/* Content Overlay */}
              <div className={cn(
                "absolute inset-0 flex items-center px-6 md:px-16 lg:px-24",
                slide.alignment === "left" ? "justify-start text-left" : 
                slide.alignment === "right" ? "justify-end text-right" : 
                "justify-center text-center"
              )}>
                <div className="max-w-xl backdrop-blur-sm bg-black/20 p-8 rounded-lg">
                  {slide.badge && (
                    <span className="inline-block py-1 px-3 text-xs font-medium bg-gold/20 text-gold rounded-full mb-4">
                      {slide.badge}
                    </span>
                  )}
                  <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-white/80 text-lg mb-6 max-w-lg">
                    {slide.description}
                  </p>
                  <Link to={slide.link} className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium text-primary bg-white hover:bg-white/90 transition-colors duration-200">
                    {slide.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Custom Navigation Arrows */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 border-white/20 bg-black/30 hover:bg-black/50 text-white" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 border-white/20 bg-black/30 hover:bg-black/50 text-white" />
        
        {/* Custom Dot Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-white w-6" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
