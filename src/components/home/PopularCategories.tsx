
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const PopularCategories = () => {
  // Updated categories with larger images that span the full width
  const popularCategories = [
    {
      id: 1,
      name: "Whiskey",
      description: "Scotch, Bourbon, Rye & more",
      count: "65+ products",
      image: "/lovable-uploads/fa48fcd8-00c2-460c-a526-31075be3a614.png",
      path: "/category/whiskey"
    },
    {
      id: 2,
      name: "Wine",
      description: "Red, White, Rosé & Sparkling",
      count: "124+ products",
      image: "/lovable-uploads/b55decef-0602-49e0-90e9-045021ab6403.png",
      path: "/category/wine"
    },
    {
      id: 3,
      name: "Vodka",
      description: "Traditional & Flavored",
      count: "42+ products",
      image: "/lovable-uploads/c2382e18-1567-4a53-ae88-bab7265675d6.png", 
      path: "/category/vodka"
    },
    {
      id: 4,
      name: "Tequila",
      description: "Blanco, Reposado & Añejo",
      count: "35+ products",
      image: "/lovable-uploads/3f3fd353-7ef4-459d-816b-aded65a7a7e3.png",
      path: "/category/tequila"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Title section - simplified to match Total Wine */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Popular in Livonia</h2>
        </div>

        {/* Categories - Redesigned to match Total Wine's layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {popularCategories.map(category => (
            <Card key={category.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
              <Link to={category.path} className="block">
                <div className="relative aspect-[16/9]">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover"
                  />
                  {/* Dark overlay at the bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  
                  {/* Content at the bottom of the image */}
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {category.name}
                    </h3>
                    <p className="text-white/90 text-sm mb-3">
                      {category.description}
                    </p>
                    <div className="flex items-center text-white text-sm font-medium">
                      Shop Now 
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
        
        {/* Collections links row - similar to the "MY STORE" links at Total Wine */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 border border-gray-200 hover:border-primary/40 transition-colors">
            <CardContent className="p-2">
              <Link 
                to="/category/award-winners" 
                className="flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium">Award Winners</h3>
                  <p className="text-sm text-muted-foreground">Top-rated selections</p>
                </div>
                <ArrowRight className="h-5 w-5 text-primary" />
              </Link>
            </CardContent>
          </Card>
          
          <Card className="p-4 border border-gray-200 hover:border-primary/40 transition-colors">
            <CardContent className="p-2">
              <Link 
                to="/category/staff-picks" 
                className="flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium">Staff Picks</h3>
                  <p className="text-sm text-muted-foreground">Expert recommendations</p>
                </div>
                <ArrowRight className="h-5 w-5 text-primary" />
              </Link>
            </CardContent>
          </Card>
          
          <Card className="p-4 border border-gray-200 hover:border-primary/40 transition-colors">
            <CardContent className="p-2">
              <Link 
                to="/category/new-arrivals" 
                className="flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium">New Arrivals</h3>
                  <p className="text-sm text-muted-foreground">Latest additions</p>
                </div>
                <ArrowRight className="h-5 w-5 text-primary" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
