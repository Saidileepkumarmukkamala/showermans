
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

// Brand logos data - using the uploaded images
const brands = [
  {
    id: 1,
    name: "FRS",
    logo: "/lovable-uploads/c2382e18-1567-4a53-ae88-bab7265675d6.png"
  },
  {
    id: 2,
    name: "APD",
    logo: "/lovable-uploads/294f9495-a2b4-473e-8f35-05436e00092f.png"
  },
  {
    id: 3,
    name: "MMSI",
    logo: "/lovable-uploads/a8db1b11-bb5d-4fcd-b5da-a5d5dc10765b.png"
  },
  {
    id: 4,
    name: "Budweiser",
    logo: "/lovable-uploads/d7238c25-b6af-406d-96e6-4deca1c57731.png"
  }
];

const BrandShowcase = () => {
  // Using Embla's autoplay plugin directly
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      slidesToScroll: 1,
      skipSnaps: false,
      dragFree: false,
    },
    [
      Autoplay({ 
        delay: 2000, // 2 seconds delay between transitions
        stopOnInteraction: false, // Continue autoplay even after user interaction
        stopOnMouseEnter: false, // Don't pause on mouse enter
      })
    ]
  );

  return (
    <section className="py-12 bg-gold/10 backdrop-blur-sm overflow-hidden border-y border-gold/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <span className="inline-block py-1 px-3 text-xs font-medium bg-gold/10 text-gold rounded-full mb-2">
            Featured Partners
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold">Our Premium Brands</h2>
        </div>

        {/* Use the direct embla reference instead of the Carousel component */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {/* Triple the brand array for more continuous scrolling effect */}
            {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
              <div 
                key={`${brand.id}-${index}`} 
                className="flex-none pl-4 md:pl-6 w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6"
              >
                <div className="bg-white rounded-lg shadow-sm p-4 h-24 flex items-center justify-center">
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="max-h-16 w-auto object-contain transition-opacity duration-300 opacity-90 hover:opacity-100" 
                    onError={e => {
                      console.log(`Failed to load brand image: ${brand.logo}`);
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
