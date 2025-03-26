
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Categories from '@/components/home/Categories';
import Newsletter from '@/components/home/Newsletter';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  useEffect(() => {
    // Smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
          document.querySelector(href)?.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Featured Products */}
        <FeaturedProducts />
        
        {/* Promotion Banner - Updated with specific product image and improved alt text */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/b2322c9f-a55a-4816-bed7-910c45d9df93.png" 
              alt="Johnny Walker Black Label Whiskey" 
              className="w-full h-full object-cover"
              onError={(e) => {
                console.log("Failed to load promotion banner image");
                // Fallback image if the primary one fails to load
                e.currentTarget.src = "/lovable-uploads/7f36a108-d7d7-4b7a-87c2-993b8eed804b.png";
                e.currentTarget.alt = "Premium Whiskey Collection";
              }}
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-xl">
              <span className="inline-block py-1 px-3 text-xs font-medium bg-gold/20 text-gold rounded-full mb-4">
                Limited Time Offer
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                20% Off Premium Whiskey Collection
              </h2>
              <p className="text-white/80 mb-8">
                Discover our curated selection of rare and aged whiskies from renowned distilleries around the world. Limited stock available.
              </p>
              <Link 
                to="/category/whiskey" 
                className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium text-primary bg-white hover:bg-white/90 transition-colors duration-200"
              >
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Categories */}
        <Categories />
        
        {/* Features */}
        <section className="section-padding">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block py-1 px-3 text-xs font-medium bg-gold/10 text-gold rounded-full mb-4">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                The Showerman's Experience
              </h2>
              <p className="text-muted-foreground">
                We pride ourselves on offering the highest quality products and exceptional service to our valued customers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center glass-card p-8 rounded-xl">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Quality Assurance</h3>
                <p className="text-muted-foreground">
                  All our products are authentic, sourced directly from distilleries and wineries around the world.
                </p>
              </div>
              
              <div className="text-center glass-card p-8 rounded-xl">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-4.9-6H8a1 1 0 00-1 1v3m11 4h-1a4 4 0 00-4-4H8" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Quick and secure shipping on all orders. Same-day delivery available in select areas.
                </p>
              </div>
              
              <div className="text-center glass-card p-8 rounded-xl">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Expert Advice</h3>
                <p className="text-muted-foreground">
                  Our knowledgeable team is always available to help you select the perfect bottle for any occasion.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
