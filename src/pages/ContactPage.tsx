
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-secondary/50 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Contact Us
              </h1>
              <p className="text-lg text-muted-foreground">
                We'd love to hear from you. Get in touch with our team.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Information & Form */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <span className="inline-block py-1 px-3 text-xs font-medium bg-gold/10 text-gold rounded-full mb-4">
                  Get In Touch
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                  We're Here For You
                </h2>
                <p className="text-muted-foreground mb-8">
                  Whether you have a question about a product, need advice on selecting the perfect bottle, or want to inquire about special orders, our team is ready to assist you.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-gold/10 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Visit Our Store</h3>
                      <p className="text-muted-foreground">
                        15333 Merriman Road<br />
                        Livonia, Michigan, USA, 48154
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-gold/10 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Email Us</h3>
                      <p className="text-muted-foreground">
                        showermans@gmail.com
                      </p>
                      <p className="text-muted-foreground text-sm mt-1">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-gold/10 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Call Us</h3>
                      <p className="text-muted-foreground">
                        +1 734 427-0930
                      </p>
                      <p className="text-muted-foreground text-sm mt-1">
                        Mon-Sat: 9:00 AM - 9:00 PM
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Google Map */}
                <div className="mt-8 rounded-lg overflow-hidden h-[300px]">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2947.4729205395486!2d-83.34955252346095!3d42.374722271371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824b68b44158eff%3A0x1ce2c5f24c629d4a!2s15333%20Merriman%20Rd%2C%20Livonia%2C%20MI%2048154%2C%20USA!5e0!3m2!1sen!2sph!4v1715414424656!5m2!1sen!2sph" 
                    width="100%" 
                    height="300" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Showerman's Fine Wine & Liquor Location"
                  ></iframe>
                </div>
              </div>
              
              {/* Contact Form */}
              <div>
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm">
                  <h3 className="text-2xl font-serif font-bold mb-6">Send Us a Message</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Email
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={5} 
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-primary/90 transition-colors duration-200"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* Hours & FAQ */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Business Hours */}
              <div>
                <h3 className="text-2xl font-serif font-bold mb-6">Business Hours</h3>
                <div className="bg-white p-6 rounded-lg">
                  <ul className="space-y-4">
                    <li className="flex justify-between">
                      <span className="font-medium">Monday</span>
                      <span>9:00 AM - 9:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Tuesday</span>
                      <span>9:00 AM - 9:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Wednesday</span>
                      <span>9:00 AM - 9:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Thursday</span>
                      <span>9:00 AM - 9:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Friday</span>
                      <span>9:00 AM - 9:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Saturday</span>
                      <span>9:00 AM - 9:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Sunday</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* FAQ */}
              <div>
                <h3 className="text-2xl font-serif font-bold mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-medium mb-2">Do you offer delivery services?</h4>
                    <p className="text-muted-foreground text-sm">
                      Yes, we offer local delivery within a 10-mile radius of our store with a minimum purchase of $50. Orders are typically delivered within 2-3 hours during business hours.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-medium mb-2">Can I place a special order for items not in stock?</h4>
                    <p className="text-muted-foreground text-sm">
                      Absolutely! We're happy to place special orders for items not currently in our inventory. Please contact us with your request, and we'll do our best to source it for you.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-medium mb-2">Do you offer gift wrapping?</h4>
                    <p className="text-muted-foreground text-sm">
                      Yes, we offer complimentary gift wrapping services for all purchases. We also have gift bags and custom wooden boxes available for an additional fee.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
