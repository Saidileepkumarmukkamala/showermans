import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    image: "https://tse1.mm.bing.net/th?id=OIP.KachAE_iMtp0yCVqOqK9oAHaDt&pid=Api",
    title: "Premium Whiskey Collection",
    description:
      "Discover our curated selection of rare and aged whiskies from renowned distilleries around the world.",
    cta: "Shop Collection",
    link: "/category/whiskey",
    alignment: "left",
    overlayColor: "from-black/70",
    badge: "New Arrival"
  },
  {
    id: 2,
    image:
      "https://images.ctfassets.net/hl3shjo07dh9/4gfoNu8FFqmHkM4ifQO17x/b3ced21f486a0ec9b075682b2a9db474/PLP-Desktop_Dewars19.jpg",
    title: "Limited Edition Spirits",
    description:
      "Exclusive bottles for the most discerning connoisseurs. Premium quality guaranteed.",
    cta: "Explore Now",
    link: "/category/all",
    alignment: "right",
    overlayColor: "from-black/60",
    badge: "Limited Stock"
  },
  {
    id: 3,
    image:
      "https://img.freepik.com/premium-photo/vintage-wine-elegance-exploring-restaurant-s-fine-wine-selection_925962-18399.jpg",
    title: "Exquisite Wine Selection",
    description:
      "From bold reds to crisp whites, explore our hand-picked selection of fine wines from around the world.",
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
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect(); // Set initial slide

    const interval = setInterval(() => {
      api.scrollNext();
    }, 6000);

    return () => {
      api.off("select", onSelect);
      clearInterval(interval);
    };
  }, [api]);

  const scrollToSlide = (index: number) => {
    if (!api) return;
    api.scrollTo(index);
    setCurrentSlide(index);
  };

  const handleImageLoad = (slideId: number) => {
    setImagesLoaded(prev => ({ ...prev, [slideId]: true }));
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, slide: any) => {
    console.error(`Failed to load image: ${slide.image}`);
    e.currentTarget.src = "/placeholder.svg";
    setImagesLoaded(prev => ({ ...prev, [slide.id]: true }));
  };

  return (
    <div className="relative w-full h-screen pt-20 overflow-hidden transition-opacity duration-500">
      <Carousel
        opts={{
          loop: true,
          duration: 800
        }}
        setApi={setApi}
        className="w-full h-full"
      >
        <CarouselContent className="flex w-full h-full">
          {heroSlides.map(slide => (
            <CarouselItem
              key={slide.id}
              className="relative w-full min-h-screen flex-shrink-0 overflow-hidden"
            >
              {/* Image Background */}
              <div className="absolute inset-0 w-full h-full z-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  onLoad={() => handleImageLoad(slide.id)}
                  onError={e => handleImageError(e, slide)}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${slide.overlayColor} via-transparent to-transparent`}
                ></div>
              </div>

              {/* Content Overlay */}
              <div
                className={cn(
                  "absolute inset-0 flex items-center px-6 md:px-16 lg:px-24 z-10",
                  slide.alignment === "left"
                    ? "justify-start text-left"
                    : slide.alignment === "right"
                    ? "justify-end text-right"
                    : "justify-center text-center"
                )}
              >
                <div className="max-w-xl p-8">
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
                  <Link
                    to={slide.link}
                    className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium text-primary bg-white hover:bg-white/90 transition-colors duration-200"
                  >
                    {slide.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrows */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 border-white/20 bg-black/30 hover:bg-black/50 text-white" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 border-white/20 bg-black/30 hover:bg-black/50 text-white" />

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 z-20">
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