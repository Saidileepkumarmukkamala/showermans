
import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: "Rare Bottles",
    description: "Store Picks & Limited Editions",
    image: "/lovable-uploads/7f36a108-d7d7-4b7a-87c2-993b8eed804b.png",
    path: "/category/rare-bottles"
  },
  {
    id: 2,
    name: "Whiskey",
    description: "Single Malt & Blended",
    image: "https://sdmntprwestus.oaiusercontent.com/files/00000000-ee38-5230-b5b6-21245ebd360d/raw?se=2025-04-04T03%3A42%3A03Z&sp=r&sv=2024-08-04&sr=b&scid=980ee007-79f6-5008-907e-659bfbaade8b&skoid=e872f19f-7b7f-4feb-9998-20052dec61d6&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-04T02%3A08%3A58Z&ske=2025-04-05T02%3A08%3A58Z&sks=b&skv=2024-08-04&sig=O%2BV2giM4eNnHzwKhRuTgJfKJmGYMxiRYhvJKD0z7sb4%3D",
    path: "/category/whiskey"
  },
  {
    id: 3,
    name: "Tequila",
    description: "Blanco, Reposado & Añejo",
    image: "/lovable-uploads/6d31f34c-7095-4a38-870e-7c43c306b9bd.png",
    path: "/category/tequila"
  },
  {
    id: 4,
    name: "Cognac & Brandy",
    description: "Cognac & Fine Brandy",
    image: "/lovable-uploads/b09daaab-5591-481a-b97c-c681378f045b.png",
    path: "/category/cognac"
  },
  {
    id: 5,
    name: "Vodka",
    description: "Premium & Flavored",
    image: "/lovable-uploads/769cfbd3-b7bd-4f57-a8a2-beb41cb8711e.png",
    path: "/category/vodka"
  },
  {
    id: 6,
    name: "Gin",
    description: "London Dry & Botanical",
    image: "https://sdmntprwestus.oaiusercontent.com/files/00000000-2b60-5230-bc88-fd758cbe0dd8/raw?se=2025-04-04T03%3A39%3A44Z&sp=r&sv=2024-08-04&sr=b&scid=e572283f-291e-5083-aae8-d019434ee5d5&skoid=e872f19f-7b7f-4feb-9998-20052dec61d6&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-04T01%3A59%3A45Z&ske=2025-04-05T01%3A59%3A45Z&sks=b&skv=2024-08-04&sig=N02jv5bFqGmPoWeEuY9vX%2B3dALcfrlKIu10Kb8mFYag%3D",
    path: "/category/gin"
  },
  {
    id: 7,
    name: "Rum",
    description: "Dark, Spiced & White",
    image: "/lovable-uploads/a5c66092-426a-4cfc-bf22-37b6a578f033.png",
    path: "/category/rum"
  },
  {
    id: 8,
    name: "Wine",
    description: "Red, White & Rosé",
    image: "/lovable-uploads/5ca10da0-9bbc-4aea-b474-ad08aa087fd3.png",
    path: "/category/wine"
  },
  {
    id: 9,
    name: "Champagne",
    description: "Champagne & Sparkling Wine",
    image: "/lovable-uploads/294f9495-a2b4-473e-8f35-05436e00092f.png",
    path: "/category/champagne"
  },
];

const Categories = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === sectionRef.current) {
              entry.target.classList.add('opacity-100');
              entry.target.classList.remove('opacity-0');
            } else if (entry.target === categoriesRef.current) {
              entry.target.querySelectorAll('.category-item').forEach((item, index) => {
                setTimeout(() => {
                  (item as HTMLElement).classList.add('opacity-100', 'translate-y-0');
                  (item as HTMLElement).classList.remove('opacity-0', 'translate-y-8');
                }, index * 150);
              });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (categoriesRef.current) observer.observe(categoriesRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (categoriesRef.current) observer.unobserve(categoriesRef.current);
    };
  }, []);

  return (
    <section id="categories" className="section-padding bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div 
          ref={sectionRef}
          className="text-center max-w-2xl mx-auto mb-12 opacity-0 transition-opacity duration-700"
        >
          <span className="inline-block py-1 px-3 text-xs font-medium bg-gold/10 text-gold rounded-full mb-4">
            Categories
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Browse By Category
          </h2>
          <p className="text-muted-foreground">
            Explore our vast collection of premium spirits organized by category, from rare whiskies to vintage wines.
          </p>
        </div>

        {/* Categories Grid */}
        <div
          ref={categoriesRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {categories.map((category, index) => (
            <div 
              key={category.id}
              className="category-item opacity-0 translate-y-8 transition-all duration-500"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Link to={category.path} className="category-card group h-full block">
                <div className="relative h-full rounded-lg overflow-hidden">
                  {/* Category Image */}
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      console.log(`Failed to load category image: ${category.image}`);
                      // Fallback to a generic category image if load fails
                      e.currentTarget.src = "https://i.imgur.com/aVq8qJr.jpg";
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                    <h3 className="text-xl font-medium mb-1 group-hover:text-gold transition-colors duration-200">{category.name}</h3>
                    <p className="text-sm text-white/80 mb-4">{category.description}</p>
                    <span 
                      className="inline-flex items-center text-sm font-medium text-white group-hover:text-gold transition-colors duration-200"
                    >
                      Explore Collection
                      <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
