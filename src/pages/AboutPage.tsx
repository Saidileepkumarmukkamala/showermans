import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Award, Clock, Package, Users } from 'lucide-react';
const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-secondary/50 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                About Showerman's Fine Wine & Liquor
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Premium spirits and exceptional service since 1975
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block py-1 px-3 text-xs font-medium bg-gold/10 text-gold rounded-full mb-4">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                  A Family Legacy of Quality
                </h2>
                <p className="text-muted-foreground mb-6">
                  Showerman's Fine Wine & Liquor was established in 1975 by the Showerman family with a simple vision - to provide the finest selection of wines and spirits to discerning customers in Michigan. What began as a small shop has grown into one of the region's premier destinations for quality beverages.
                </p>
                <p className="text-muted-foreground mb-6">
                  For three generations, we have maintained our commitment to exceptional products, personalized service, and deep knowledge of our craft. Each bottle in our inventory is carefully selected for its quality and value.
                </p>
                <p className="text-muted-foreground">
                  Today, we continue the family tradition of excellence while embracing innovation and expanding our offerings to include rare and limited-edition products from around the world.
                </p>
              </div>
              <div className="relative">
                <div className="rounded-lg overflow-hidden">
                  <img alt="Wine cellar" src="/lovable-uploads/28a924f9-8f6e-431d-87a6-846b08c3e93f.jpg" className="w-full h-auto object-fill" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white shadow-lg rounded-lg p-4 w-32 h-32 md:w-40 md:h-40 flex flex-col items-center justify-center">
                  <span className="text-2xl md:text-3xl font-bold text-primary">49</span>
                  <span className="text-sm md:text-base text-muted-foreground text-center">Years of Excellence</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block py-1 px-3 text-xs font-medium bg-gold/10 text-gold rounded-full mb-4">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                What Sets Us Apart
              </h2>
              <p className="text-muted-foreground">
                At Showerman's, we believe in more than just selling products. We're committed to creating exceptional experiences and building lasting relationships with our customers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-lg text-center shadow-sm">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-xl font-medium mb-4">Quality</h3>
                <p className="text-muted-foreground">
                  We carefully curate our selection to offer only the finest products from around the world.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg text-center shadow-sm">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-xl font-medium mb-4">Expertise</h3>
                <p className="text-muted-foreground">
                  Our knowledgeable staff offers personalized recommendations and education on all our products.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg text-center shadow-sm">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-xl font-medium mb-4">Tradition</h3>
                <p className="text-muted-foreground">
                  Three generations of family ownership with deep roots in the Michigan community.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg text-center shadow-sm">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-xl font-medium mb-4">Selection</h3>
                <p className="text-muted-foreground">
                  From everyday favorites to rare collectibles, we offer an unparalleled range of choices.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block py-1 px-3 text-xs font-medium bg-gold/10 text-gold rounded-full mb-4">
                Our Team
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Meet Our Experts
              </h2>
              <p className="text-muted-foreground">
                Our passionate team brings decades of combined experience and a deep love for fine wines and spirits.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="rounded-lg overflow-hidden mb-4">
                  <img src="https://images.pexels.com/photos/8090137/pexels-photo-8090137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Michael Showerman" className="w-full h-auto aspect-square object-cover" />
                </div>
                <h3 className="text-xl font-medium mb-1">Michael Showerman</h3>
                <p className="text-gold mb-2">Owner & Wine Director</p>
                <p className="text-muted-foreground text-sm">
                  With 25 years in the industry, Michael leads our wine selection with passion and expertise.
                </p>
              </div>
              
              <div className="text-center">
                <div className="rounded-lg overflow-hidden mb-4">
                  <img src="https://images.pexels.com/photos/8100067/pexels-photo-8100067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Jennifer Showerman" className="w-full h-auto aspect-square object-cover" />
                </div>
                <h3 className="text-xl font-medium mb-1">Jennifer Showerman</h3>
                <p className="text-gold mb-2">General Manager</p>
                <p className="text-muted-foreground text-sm">
                  Jennifer ensures exceptional customer service and oversees day-to-day operations.
                </p>
              </div>
              
              <div className="text-center">
                <div className="rounded-lg overflow-hidden mb-4">
                  <img src="https://images.pexels.com/photos/8100537/pexels-photo-8100537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="David Chen" className="w-full h-auto aspect-square object-cover" />
                </div>
                <h3 className="text-xl font-medium mb-1">David Chen</h3>
                <p className="text-gold mb-2">Spirits Specialist</p>
                <p className="text-muted-foreground text-sm">
                  David's extensive knowledge of whiskeys and other fine spirits guides our premium selection.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default AboutPage;