import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

// Brand logos data
const brands = [{
  id: 1,
  name: "Jameson",
  logo: "/lovable-uploads/7f36a108-d7d7-4b7a-87c2-993b8eed804b.png"
}, {
  id: 2,
  name: "Johnnie Walker",
  logo: "/lovable-uploads/b2322c9f-a55a-4816-bed7-910c45d9df93.png"
}, {
  id: 3,
  name: "Heineken",
  logo: "/lovable-uploads/6d31f34c-7095-4a38-870e-7c43c306b9bd.png"
}, {
  id: 4,
  name: "Avion",
  logo: "/lovable-uploads/b09daaab-5591-481a-b97c-c681378f045b.png"
}, {
  id: 5,
  name: "Budweiser",
  logo: "/lovable-uploads/769cfbd3-b7bd-4f57-a8a2-beb41cb8711e.png"
}, {
  id: 6,
  name: "Jack Daniels",
  logo: "/lovable-uploads/db67a993-5e70-4c88-920c-0c3bcad65e96.png"
}, {
  id: 7,
  name: "Hennessy",
  logo: "/lovable-uploads/a5c66092-426a-4cfc-bf22-37b6a578f033.png"
}];
const BrandShowcase = () => {
  const [api, setApi] = useState<any>(null);
  useEffect(() => {
    if (!api) return;

    // Auto-play the carousel
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [api]);
  return <section className="py-12 bg-white/70 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <span className="inline-block py-1 px-3 text-xs font-medium bg-gold/10 text-gold rounded-full mb-2">
            Featured Partners
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold">Our Premium Brands</h2>
        </div>

        <Carousel opts={{
        align: "start",
        loop: true,
        dragFree: true
      }} setApi={setApi} className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {brands.map(brand => <CarouselItem key={brand.id} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                <div className="glass-card p-6 rounded-xl h-24 flex items-center justify-center group hover:border-gold/30 transition-all duration-300 bg-orange-900">
                  <img src={brand.logo} alt={brand.name} className="max-h-12 max-w-32 object-contain opacity-75 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0" onError={e => {
                console.log(`Failed to load brand image: ${brand.logo}`);
                e.currentTarget.src = "/placeholder.svg";
              }} />
                </div>
              </CarouselItem>)}
          </CarouselContent>
        </Carousel>
      </div>
    </section>;
};
export default BrandShowcase;