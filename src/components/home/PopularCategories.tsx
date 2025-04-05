
import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ArrowRight, Glasses } from 'lucide-react';

const PopularCategories = () => {
  const popularCategories = [
    {
      id: 1,
      name: "Whiskey",
      description: "From scotch to bourbon, discover premium whiskeys",
      count: "65+ products",
      image: "/lovable-uploads/fa48fcd8-00c2-460c-a526-31075be3a614.png",
      path: "/category/whiskey",
      bgColor: "from-amber-900/40 to-amber-700/70"
    },
    {
      id: 2,
      name: "Wine",
      description: "Fine wines from around the world",
      count: "124+ products",
      image: "/lovable-uploads/b55decef-0602-49e0-90e9-045021ab6403.png",
      path: "/category/wine",
      bgColor: "from-red-900/40 to-red-700/70"
    },
    {
      id: 3,
      name: "Vodka",
      description: "Smooth and clean premium vodkas",
      count: "42+ products",
      image: "/lovable-uploads/c2382e18-1567-4a53-ae88-bab7265675d6.png", 
      path: "/category/vodka",
      bgColor: "from-blue-900/40 to-blue-700/70"
    },
    {
      id: 4,
      name: "Tequila",
      description: "Authentic agave tequilas from Mexico",
      count: "35+ products",
      image: "/lovable-uploads/3f3fd353-7ef4-459d-816b-aded65a7a7e3.png",
      path: "/category/tequila",
      bgColor: "from-yellow-900/40 to-yellow-700/70"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-gold/10 p-2 rounded-full">
              <Glasses className="text-gold h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold">Popular in Livonia</h2>
              <p className="text-muted-foreground text-sm mt-1">Our most sought-after categories</p>
            </div>
          </div>
          <Link 
            to="/category/all" 
            className="text-sm font-medium text-primary flex items-center hover:text-gold transition-colors"
          >
            Browse All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {popularCategories.map(category => (
            <Link 
              key={category.id} 
              to={category.path} 
              className="group relative rounded-xl overflow-hidden h-96 flex items-end"
            >
              <img 
                src={category.image} 
                alt={category.name} 
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 z-0"
              />
              
              {/* Add a gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${category.bgColor} opacity-80 z-10`}></div>
              
              {/* Content */}
              <div className="relative z-20 p-8 w-full">
                <span className="inline-block text-xs font-medium bg-white/20 text-white rounded-full px-3 py-1 backdrop-blur-sm mb-3">
                  {category.count}
                </span>
                <h3 className="text-3xl font-serif font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-white/90 mb-4">
                  {category.description}
                </p>
                <span className="inline-flex items-center text-white group-hover:text-gold transition-colors duration-300 font-medium">
                  Browse Category
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Curated collections section */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="glass-card-heavy p-6 rounded-xl">
            <Award className="h-8 w-8 text-gold mb-4" />
            <h3 className="text-lg font-bold mb-2">Award Winners</h3>
            <p className="text-muted-foreground text-sm mb-4">The most prestigious and acclaimed spirits in our collection.</p>
            <Link 
              to="/category/all?award=true" 
              className="text-sm font-medium text-primary flex items-center hover:text-gold transition-colors"
            >
              Explore
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="glass-card-heavy p-6 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-gold mb-4">
              <path d="M7 10v12"></path>
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
            </svg>
            <h3 className="text-lg font-bold mb-2">Staff Picks</h3>
            <p className="text-muted-foreground text-sm mb-4">Hand-selected favorites chosen by our expert team.</p>
            <Link 
              to="/category/all?staff-pick=true" 
              className="text-sm font-medium text-primary flex items-center hover:text-gold transition-colors"
            >
              Discover
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="glass-card-heavy p-6 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-gold mb-4">
              <path d="M5.8 11.3 2 22l10.7-3.79"></path>
              <path d="M4 3h.01"></path>
              <path d="M22 8h.01"></path>
              <path d="M15 2h.01"></path>
              <path d="M22 20h.01"></path>
              <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"></path>
              <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17"></path>
              <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7"></path>
              <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"></path>
            </svg>
            <h3 className="text-lg font-bold mb-2">New Arrivals</h3>
            <p className="text-muted-foreground text-sm mb-4">The latest additions to our ever-growing collection.</p>
            <Link 
              to="/category/all?new=true" 
              className="text-sm font-medium text-primary flex items-center hover:text-gold transition-colors"
            >
              Shop New
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
