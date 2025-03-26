
import React, { useState, useEffect } from 'react';
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

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
          <Link to="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-serif font-bold">Showerman's Fine Wine & Liquor</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-primary hover:text-gold transition-colors duration-200 font-medium">
              Home
            </Link>
            <Link to="/category/all" className="text-primary hover:text-gold transition-colors duration-200 font-medium">
              Shop
            </Link>
            <div className="relative group">
              <button className="text-primary hover:text-gold transition-colors duration-200 font-medium flex items-center">
                Categories
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <Link to="/category/whiskey" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Whiskey</Link>
                  <Link to="/category/vodka" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Vodka</Link>
                  <Link to="/category/gin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Gin</Link>
                  <Link to="/category/wine" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Wine</Link>
                  <Link to="/category/champagne" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Champagne</Link>
                </div>
              </div>
            </div>
            <Link to="/about" className="text-primary hover:text-gold transition-colors duration-200 font-medium">
              About
            </Link>
            <Link to="/contact" className="text-primary hover:text-gold transition-colors duration-200 font-medium">
              Contact
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-1.5 hover:bg-secondary rounded-full transition-colors duration-200">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-1.5 hover:bg-secondary rounded-full transition-colors duration-200">
              <User className="h-5 w-5" />
            </button>
            <Link to="/cart" className="p-1.5 hover:bg-secondary rounded-full transition-colors duration-200 relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-gold text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Link>
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
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-primary hover:text-gold transition-colors duration-200 text-lg font-medium">
              Home
            </Link>
            <Link to="/category/all" onClick={() => setMobileMenuOpen(false)} className="text-primary hover:text-gold transition-colors duration-200 text-lg font-medium">
              Shop
            </Link>
            <div className="space-y-2">
              <p className="text-primary font-medium text-lg">Categories</p>
              <div className="pl-4 space-y-2">
                <Link to="/category/whiskey" onClick={() => setMobileMenuOpen(false)} className="block text-primary hover:text-gold transition-colors duration-200">Whiskey</Link>
                <Link to="/category/vodka" onClick={() => setMobileMenuOpen(false)} className="block text-primary hover:text-gold transition-colors duration-200">Vodka</Link>
                <Link to="/category/gin" onClick={() => setMobileMenuOpen(false)} className="block text-primary hover:text-gold transition-colors duration-200">Gin</Link>
                <Link to="/category/wine" onClick={() => setMobileMenuOpen(false)} className="block text-primary hover:text-gold transition-colors duration-200">Wine</Link>
                <Link to="/category/champagne" onClick={() => setMobileMenuOpen(false)} className="block text-primary hover:text-gold transition-colors duration-200">Champagne</Link>
              </div>
            </div>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-primary hover:text-gold transition-colors duration-200 text-lg font-medium">
              About
            </Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-primary hover:text-gold transition-colors duration-200 text-lg font-medium">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
