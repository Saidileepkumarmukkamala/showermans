
import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: "Rare Bottles",
    description: "Store Picks & Limited Editions",
    image: "https://onlineliquor.com.au/cdn/shop/products/Macallan-Rare-Cask-2020-Release-Single-Malt-Scotch-Whisky-700ml_580x.jpg?v=1610095927",
  },
  {
    id: 2,
    name: "Whisky",
    description: "Single Malt & Blended",
    image: "https://onlineliquor.com.au/cdn/shop/collections/Whiskey_1200x630_93a5a795-5e7d-4fb0-9ba3-11f20f7bbde2_1200x630.jpg?v=1612505457",
  },
  {
    id: 3,
    name: "Tequila",
    description: "Blanco, Reposado & Añejo",
    image: "https://onlineliquor.com.au/cdn/shop/collections/Tequila-mezcal_1200x630.jpg?v=1612506139",
  },
  {
    id: 4,
    name: "Cognac",
    description: "Cognac & Fine Brandy",
    image: "https://onlineliquor.com.au/cdn/shop/collections/Brandy_1200x630_cd42a9f2-4c76-4c3b-87b5-a889bb4d72bc_1200x630.jpg?v=1612505731",
  },
  {
    id: 5,
    name: "Vodka",
    description: "Premium & Flavored",
    image: "https://onlineliquor.com.au/cdn/shop/collections/Vodka_1200x630_fdb12dad-6a3a-4d7f-a384-d923c5be69f8_1200x630.jpg?v=1612505654",
  },
  {
    id: 6,
    name: "Gin",
    description: "London Dry & Botanical",
    image: "https://onlineliquor.com.au/cdn/shop/collections/Gin_1200x630_f98fc651-95a5-45b2-8e65-15e1b7c548df_1200x630.jpg?v=1612505542",
  },
  {
    id: 7,
    name: "Rum",
    description: "Dark, Spiced & White",
    image: "https://onlineliquor.com.au/cdn/shop/collections/Rum_1200x630_c20ba697-9d87-46ba-bb96-8d42fef338b7_1200x630.jpg?v=1612505576",
  },
  {
    id: 8,
    name: "Wine",
    description: "Red, White & Rosé",
    image: "https://onlineliquor.com.au/cdn/shop/collections/Wine_1200x630_704ab85b-1d65-4387-abc4-fafcc06f6040_1200x630.jpg?v=1612505702",
  },
  {
    id: 9,
    name: "Champagne",
    description: "Champagne & Sparkling Wine",
    image: "https://onlineliquor.com.au/cdn/shop/collections/Champagne_1200x630_ba90df19-6e28-431e-b778-14b5679f1bb3_1200x630.jpg?v=1612505682",
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
              <Link to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`} className="category-card group h-full block">
                <div className="relative h-full rounded-lg overflow-hidden">
                  {/* Category Image */}
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      console.log(`Failed to load category image: ${category.image}`);
                      // Fallback to a generic category image if load fails
                      e.currentTarget.src = "https://onlineliquor.com.au/cdn/shop/t/3/assets/placeholder_1200x.png?v=113871083e82fe24a0c5";
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
