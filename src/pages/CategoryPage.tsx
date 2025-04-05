
import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/home/ProductCard';
import { getProductsByCategory } from '@/data/products';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const location = useLocation();
  const products = getProductsByCategory(categoryName || 'all');
  
  // Extract catering paths if that's where we are
  const isCatering = location.pathname.startsWith('/catering');
  const cateringPath = isCatering ? location.pathname.split('/').slice(2).join('/') : '';
  
  const formatCategoryName = (name: string) => {
    if (name === 'all') return 'All Products';
    // Handle catering path
    if (isCatering) {
      if (!cateringPath) return 'Catering Services';
      return cateringPath
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    // Handle regular category paths with hyphens and slashes
    return name
      .split(/[-/]/)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  };

  // Get page title and description based on the category
  const getPageMeta = () => {
    if (isCatering) {
      return {
        title: formatCategoryName(cateringPath || 'Catering Services'),
        description: `Professional catering services for your events. Explore our ${cateringPath || 'catering'} options.`
      };
    }
    
    const title = formatCategoryName(categoryName || 'all');
    
    // Special descriptions for specific categories
    const descriptions: Record<string, string> = {
      'all': 'Explore our curated selection of premium spirits and wines',
      'wine': 'Discover our extensive selection of fine wines from around the world',
      'red-wine': 'Bold and complex red wines to complement your meal or collection',
      'white-wine': 'Crisp and refreshing white wines for any occasion',
      'whiskey': 'From bourbon to scotch, explore our premium whiskey selection',
      'bourbon': 'Kentucky's finest bourbons with rich caramel and vanilla notes',
      'vodka': 'Premium vodkas from around the world, perfectly distilled for smoothness',
      'tequila': 'Authentic tequilas from Mexico's finest agave plants',
      'gin': 'Botanical gins with complex flavor profiles for the perfect cocktail',
      'beer': 'Craft beers from local breweries and international favorites',
      'accessories': 'Everything you need to enhance your drinking experience'
    };
    
    return {
      title,
      description: descriptions[categoryName || 'all'] || `Explore our curated selection of premium ${title.toLowerCase()}`
    };
  };

  const { title, description } = getPageMeta();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryName, location.pathname]);

  const sortOptions = [
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Best Selling', value: 'best-selling' },
    { label: 'Newest', value: 'newest' },
    { label: 'Rating', value: 'rating' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Page Header */}
        <div className="bg-secondary/50 py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-center">
              {title}
            </h1>
            <p className="text-muted-foreground text-center mt-2 max-w-lg mx-auto">
              {description}
            </p>
          </div>
        </div>
        
        {/* Filter and Sort Controls */}
        <div className="bg-secondary/20 py-4 border-y border-secondary/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <span className="text-sm text-muted-foreground">
                  {products.length} products
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-1">
                      <span>Sort By</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-0">
                    <div className="flex flex-col">
                      {sortOptions.map(option => (
                        <button
                          key={option.value}
                          className="text-left px-4 py-2 hover:bg-secondary/50 transition-colors text-sm"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
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
