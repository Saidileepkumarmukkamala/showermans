
import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: "Rare Bottles",
    description: "Store Picks & Limited Editions",
    image: "https://i.imgur.com/aVq8qJr.jpg",
    path: "/category/rare-bottles"
  },
  {
    id: 2,
    name: "Whisky",
    description: "Single Malt & Blended",
    image: "https://i.imgur.com/SHxmIYk.jpg",
    path: "/category/whiskey"
  },
  {
    id: 3,
    name: "Tequila",
    description: "Blanco, Reposado & Añejo",
    image: "https://i.imgur.com/vYuHLdV.jpg",
    path: "/category/tequila"
  },
  {
    id: 4,
    name: "Cognac",
    description: "Cognac & Fine Brandy",
    image: "https://i.imgur.com/e1j8PF3.jpg",
    path: "/category/cognac"
  },
  {
    id: 5,
    name: "Vodka",
    description: "Premium & Flavored",
    image: "https://i.imgur.com/BrF8DdS.jpg",
    path: "/category/vodka"
  },
  {
    id: 6,
    name: "Gin",
    description: "London Dry & Botanical",
    image: "https://i.imgur.com/w3KHHV5.jpg",
    path: "/category/gin"
  },
  {
    id: 7,
    name: "Rum",
    description: "Dark, Spiced & White",
    image: "https://i.imgur.com/0d3CqDU.jpg",
    path: "/category/rum"
  },
  {
    id: 8,
    name: "Wine",
    description: "Red, White & Rosé",
    image: "https://i.imgur.com/jO2Xhbk.jpg",
    path: "/category/wine"
  },
  {
    id: 9,
    name: "Champagne",
    description: "Champagne & Sparkling Wine",
    image: "https://i.imgur.com/JmRNTAI.jpg",
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
