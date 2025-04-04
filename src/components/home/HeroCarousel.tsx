import React, { useEffect, useState, useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    image: "https://tse1.mm.bing.net/th?id=OIP.KachAE_iMtp0yCVqOqK9oAHaDt&pid=Api",
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
    image: "https://images.ctfassets.net/hl3shjo07dh9/4gfoNu8FFqmHkM4ifQO17x/b3ced21f486a0ec9b075682b2a9db474/PLP-Desktop_Dewars19.jpg",
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
    image: "https://img.freepik.com/premium-photo/vintage-wine-elegance-exploring-restaurant-s-fine-wine-selection_925962-18399.jpg",
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
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    autoplayRef.current = setInterval(() => {
      if (api) {
        api.scrollNext();
      }
    }, 6000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const pauseAutoplayTemporarily = () => {
    stopAutoplay();
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = setTimeout(() => {
      startAutoplay();
    }, 10000); // restart after 10s
  };

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();

    startAutoplay(); // begin autoplay on mount

    return () => {
      api.off("select", onSelect);
      stopAutoplay();
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [api]);

  const scrollToSlide = (index: number) => {
    if (!api) return;
    api.scrollTo(index);
    pauseAutoplayTemporarily();
  };

  const handleArrowClick = (direction: "next" | "prev") => {
    if (!api) return;
    if (direction === "next") {
      api.scrollNext();
    } else {
      api.scrollPrev();
    }
    pauseAutoplayTemporarily();
  };

  return (
    <div className="relative w-full h-screen mt-20 overflow-hidden">
      <Carousel
        opts={{ loop: true, duration: 800 }}
        setApi={setApi}
        className="w-full h-full"
      >
        <CarouselContent className="flex w-full h-full">
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id} className="relative min-h-screen w-full flex-shrink-0">
              {/* Image Background */}
              <div className="absolute inset-0 w-full h-full z-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${slide.overlayColor} via-transparent to-transparent`} />
              </div>

              {/* Content */}
              <div className={cn(
                "absolute inset-0 flex items-center px-6 md:px-16 lg:px-24 z-10",
                slide.alignment === "left" ? "justify-start text-left" :
                slide.alignment === "right" ? "justify-end text-right" :
                "justify-center text-center"
              )}>
                <div className="max-w-xl p-8">
                  {slide.badge && (
                    <span className="inline-block py-1 px-3 text-xs font-medium bg-gold/20 text-gold rounded-full mb-4">
                      {slide.badge}
                    </span>
                  )}
                  <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">{slide.title}</h1>
                  <p className="text-white/80 text-lg mb-6 max-w-lg">{slide.description}</p>
                  <Link to={slide.link} className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium text-primary bg-white hover:bg-white/90 transition-colors duration-200">
                    {slide.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Arrows with pause logic */}
        <CarouselPrevious
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 bg-black/30 hover:bg-black/50 text-white"
          onClick={() => handleArrowClick("prev")}
        />
        <CarouselNext
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 bg-black/30 hover:bg-black/50 text-white"
          onClick={() => handleArrowClick("next")}
        />

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-white w-6" : "bg-white/50"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
