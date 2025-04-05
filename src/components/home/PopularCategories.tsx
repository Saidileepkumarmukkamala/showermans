
import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ArrowRight } from 'lucide-react';

const PopularCategories = () => {
  const popularCategories = [
    {
      id: 1,
      name: "Whiskey",
      image: "/lovable-uploads/fa48fcd8-00c2-460c-a526-31075be3a614.png",
      path: "/category/whiskey"
    },
    {
      id: 2,
      name: "Wine",
      image: "/lovable-uploads/b55decef-0602-49e0-90e9-045021ab6403.png",
      path: "/category/wine"
    },
    {
      id: 3,
      name: "Vodka",
      image: "/lovable-uploads/c2382e18-1567-4a53-ae88-bab7265675d6.png", 
      path: "/category/vodka"
    },
    {
      id: 4,
      name: "Tequila",
      image: "/lovable-uploads/3f3fd353-7ef4-459d-816b-aded65a7a7e3.png",
      path: "/category/tequila"
    }
  ];

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Award className="text-gold h-6 w-6" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold">Popular Categories in Livonia</h2>
          </div>
          <Link 
            to="/category/all" 
            className="text-sm font-medium text-primary flex items-center hover:text-gold transition-colors"
          >
            Browse All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCategories.map(category => (
            <Link key={category.id} to={category.path} className="group relative rounded-lg overflow-hidden h-64">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-medium mb-1 group-hover:text-gold transition-colors duration-200">
                  {category.name}
                </h3>
                <span className="inline-flex items-center text-sm font-medium text-white group-hover:text-gold transition-colors duration-200">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
