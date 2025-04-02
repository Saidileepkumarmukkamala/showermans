
import React, { useRef, useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { supabase } from '@/lib/supabase';
import { Product } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

const FeaturedProducts = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('name')
          .limit(9); // Limit to 9 products for featured section
        
        if (error) {
          throw error;
        }
        
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === sectionRef.current) {
              entry.target.classList.add('opacity-100');
              entry.target.classList.remove('opacity-0');
            } else if (entry.target === productsRef.current && products.length > 0) {
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
  }, [products]);

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
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div
            ref={productsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {products.length > 0 ? (
              products.map((product, index) => (
                <div 
                  key={product.id}
                  className="product-item opacity-0 translate-y-8 transition-all duration-500"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <ProductCard 
                    id={parseInt(product.id)} 
                    name={product.name} 
                    category={product.category} 
                    price={parseFloat(product.price.toString())} 
                    image={product.image}
                    description={product.description || undefined}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-4 text-center py-8">
                <p className="text-muted-foreground">No products found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
