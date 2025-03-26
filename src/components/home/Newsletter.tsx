
import React, { useState } from 'react';
import { toast } from 'sonner';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Thank you for subscribing!');
      setEmail('');
    }, 1000);
  };

  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Subscribe To Our Newsletter
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-lg">
              Stay updated with our newest arrivals, special offers, and exclusive events. Join our community of liquor enthusiasts.
            </p>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-gold font-bold text-xl">1</span>
              </div>
              <div>
                <h4 className="font-medium">Exclusive Offers</h4>
                <p className="text-sm text-primary-foreground/70">Get access to members-only deals</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-4">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-gold font-bold text-xl">2</span>
              </div>
              <div>
                <h4 className="font-medium">New Arrivals</h4>
                <p className="text-sm text-primary-foreground/70">Be the first to know about new products</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-4">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-gold font-bold text-xl">3</span>
              </div>
              <div>
                <h4 className="font-medium">Event Invitations</h4>
                <p className="text-sm text-primary-foreground/70">Exclusive tastings and VIP events</p>
              </div>
            </div>
          </div>
          
          {/* Newsletter Form */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-medium mb-4">Join Our Community</h3>
              <p className="text-primary-foreground/80 text-sm mb-6">
                Sign up today and receive a 10% discount on your first order.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2.5 rounded-md bg-white/10 border border-white/20 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-md bg-white/10 border border-white/20 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="Your email address"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold hover:bg-gold/90 text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200 flex justify-center items-center"
                >
                  {loading ? (
                    <span className="inline-block h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                  ) : null}
                  {loading ? 'Subscribing...' : 'Subscribe Now'}
                </button>
                
                <p className="text-xs text-center text-primary-foreground/60 mt-4">
                  By subscribing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
