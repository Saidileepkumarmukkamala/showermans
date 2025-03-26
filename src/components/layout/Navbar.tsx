
import React, { useState, useEffect } from 'react';
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent py-4",
        isScrolled && "bg-white/90 backdrop-blur-sm shadow-sm py-3"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-serif font-bold">Showerman's Fine Wine & Liquor</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-primary hover:text-gold transition-colors duration-200 font-medium">
              Home
            </a>
            <a href="#shop" className="text-primary hover:text-gold transition-colors duration-200 font-medium">
              Shop
            </a>
            <a href="#categories" className="text-primary hover:text-gold transition-colors duration-200 font-medium">
              Categories
            </a>
            <a href="#about" className="text-primary hover:text-gold transition-colors duration-200 font-medium">
              About
            </a>
            <a href="#contact" className="text-primary hover:text-gold transition-colors duration-200 font-medium">
              Contact
            </a>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-1.5 hover:bg-secondary rounded-full transition-colors duration-200">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-1.5 hover:bg-secondary rounded-full transition-colors duration-200">
              <User className="h-5 w-5" />
            </button>
            <button className="p-1.5 hover:bg-secondary rounded-full transition-colors duration-200 relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-gold text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </button>
            <button 
              className="md:hidden p-1.5 hover:bg-secondary rounded-full transition-colors duration-200"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div 
          className={cn(
            "fixed top-0 right-0 h-full w-[75%] max-w-sm bg-white p-6 shadow-lg transform transition-transform duration-300",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-serif font-bold">Showerman's Fine Wine & Liquor</span>
            <button 
              className="p-1.5 hover:bg-secondary rounded-full transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <nav className="flex flex-col space-y-6">
            <a href="/" className="text-primary hover:text-gold transition-colors duration-200 text-lg font-medium">
              Home
            </a>
            <a href="#shop" className="text-primary hover:text-gold transition-colors duration-200 text-lg font-medium">
              Shop
            </a>
            <a href="#categories" className="text-primary hover:text-gold transition-colors duration-200 text-lg font-medium">
              Categories
            </a>
            <a href="#about" className="text-primary hover:text-gold transition-colors duration-200 text-lg font-medium">
              About
            </a>
            <a href="#contact" className="text-primary hover:text-gold transition-colors duration-200 text-lg font-medium">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
