
import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <h3 className="text-xl font-serif font-bold mb-2">Showerman's Fine Wine & Liquor</h3>
              <p className="text-sm leading-relaxed opacity-80">
                Premium liquor store featuring a curated selection of the finest wines, spirits, and craft beers from around the world.
              </p>
            </div>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="hover:text-gold transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-gold transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-gold transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 hover:text-gold transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 hover:text-gold transition-colors duration-200">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 hover:text-gold transition-colors duration-200">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 hover:text-gold transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 hover:text-gold transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 hover:text-gold transition-colors duration-200">
                  Whiskey
                </a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 hover:text-gold transition-colors duration-200">
                  Vodka
                </a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 hover:text-gold transition-colors duration-200">
                  Gin
                </a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 hover:text-gold transition-colors duration-200">
                  Wine
                </a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 hover:text-gold transition-colors duration-200">
                  Champagne
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="text-sm opacity-80">
                15333 Merriman Road, Livonia, Michigan, USA, 48154
              </li>
              <li className="text-sm opacity-80">
                showermans@gmail.com
              </li>
              <li className="text-sm opacity-80">
                +1 734 427-0930
              </li>
              <li className="text-sm opacity-80">
                Mon-Sat: 9:00 AM - 9:00 PM
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-sm opacity-70">
            © {new Date().getFullYear()} Showerman's Fine Wine & Liquor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
