
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/home/ProductCard';
import { getProductsByCategory } from '@/data/products';

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const products = getProductsByCategory(categoryName || 'all');
  
  const formatCategoryName = (name: string) => {
    return name === 'all' ? 'All Products' : name.charAt(0).toUpperCase() + name.slice(1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryName]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Page Header */}
        <div className="bg-secondary/50 py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-center">
              {formatCategoryName(categoryName || 'all')}
            </h1>
            <p className="text-muted-foreground text-center mt-2 max-w-lg mx-auto">
              Explore our curated selection of premium {categoryName === 'all' ? 'spirits and wines' : categoryName}
            </p>
          </div>
        </div>
        
        {/* Products */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground">Please check back later for updates to our inventory.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
