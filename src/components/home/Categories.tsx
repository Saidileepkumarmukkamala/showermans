
import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: "Rare Bottles",
    description: "Store Picks & Limited Editions",
    image: "https://images.unsplash.com/photo-1518760105280-256e5efef91f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    name: "Whiskey",
    description: "Single Malt & Blended",
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    name: "Tequila",
    description: "Blanco, Reposado & Añejo",
    image: "https://images.unsplash.com/photo-1660919486107-3a6a68888387?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    name: "Cognac",
    description: "Cognac & Fine Brandy",
    image: "https://images.unsplash.com/photo-1605753540488-0021d452cd96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    name: "Vodka",
    description: "Premium & Flavored",
    image: "https://images.unsplash.com/photo-1614313511387-1436a4480ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    name: "Gin",
    description: "London Dry & Botanical",
    image: "https://images.unsplash.com/photo-1607622750671-6cd9a99eabd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 7,
    name: "Rum",
    description: "Dark, Spiced & White",
    image: "https://images.unsplash.com/photo-1571976533653-4163684f91fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 8,
    name: "Wine",
    description: "Red, White & Rosé",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 9,
    name: "Champagne",
    description: "Champagne & Sparkling Wine",
    image: "https://images.unsplash.com/photo-1546171044-6a27abe05599?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
              <Link to={`/category/${category.name.toLowerCase()}`} className="category-card group h-full block">
                <div className="relative h-full rounded-lg overflow-hidden">
                  {/* Category Image */}
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
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
