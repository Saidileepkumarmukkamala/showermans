
import React, { useRef, useEffect } from 'react';
import ProductCard from './ProductCard';

// Sample product data
const products = [
  {
    id: 1,
    name: "Macallan 18 Years",
    category: "Whiskey",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isNew: true
  },
  {
    id: 2,
    name: "Grey Goose Original",
    category: "Vodka",
    price: 45.99,
    originalPrice: 55.99,
    image: "https://images.unsplash.com/photo-1608885898957-a52fa9af1a45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isSale: true
  },
  {
    id: 3,
    name: "Hendrick's Gin",
    category: "Gin",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1547781668-fa96d8856693?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Dom Pérignon Vintage",
    category: "Champagne",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1593536587119-3fcea3bee29e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isNew: true
  },
  {
    id: 5,
    name: "Rémy Martin XO",
    category: "Cognac",
    price: 179.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1557682204-e53b55fd750c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isSale: true
  },
  {
    id: 6,
    name: "Patrón Silver",
    category: "Tequila",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1656895703071-4db5757988db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    name: "Château Margaux",
    category: "Wine",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1597130203392-6570a259ce6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isNew: true
  },
  {
    id: 8,
    name: "Monkey 47",
    category: "Gin",
    price: 79.99,
    originalPrice: 89.99,
    image: "https://images.unsplash.com/photo-1543253687-c931c8e01820?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isSale: true
  }
];

const FeaturedProducts = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === sectionRef.current) {
              entry.target.classList.add('opacity-100');
              entry.target.classList.remove('opacity-0');
            } else if (entry.target === productsRef.current) {
              entry.target.querySelectorAll('.product-item').forEach((item, index) => {
                setTimeout(() => {
                  (item as HTMLElement).classList.add('opacity-100', 'translate-y-0');
                  (item as HTMLElement).classList.remove('opacity-0', 'translate-y-8');
                }, index * 100);
              });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (productsRef.current) observer.observe(productsRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (productsRef.current) observer.unobserve(productsRef.current);
    };
  }, []);

  return (
    <section id="shop" className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div 
          ref={sectionRef}
          className="text-center max-w-2xl mx-auto mb-12 opacity-0 transition-opacity duration-700"
        >
          <span className="inline-block py-1 px-3 text-xs font-medium bg-gold/10 text-gold rounded-full mb-4">
            Featured Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Our Premium Selection
          </h2>
          <p className="text-muted-foreground">
            Discover our hand-picked selection of the finest spirits and wines, perfect for connoisseurs and casual enthusiasts alike.
          </p>
        </div>

        {/* Products Grid */}
        <div
          ref={productsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="product-item opacity-0 translate-y-8 transition-all duration-500"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
