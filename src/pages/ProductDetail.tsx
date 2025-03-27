
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { products } from '@/data/products';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const product = products.find(p => p.id === Number(productId));
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-2xl font-serif font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/category/all">
              <Button>Browse All Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Convert single image to array for consistency
  const productImages = Array.isArray(product.image) ? product.image : [product.image];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link to={`/category/${product.category.toLowerCase()}`} className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {product.category}
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="glass-card p-4 rounded-lg mb-4">
              <div className="aspect-square overflow-hidden rounded-md">
                <img 
                  src={productImages[selectedImage] || productImages[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-all hover:scale-105"
                />
              </div>
            </div>
            
            {productImages.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {productImages.map((image, index) => (
                  <button 
                    key={index}
                    className={`aspect-square overflow-hidden rounded-md ${selectedImage === index ? 'ring-2 ring-gold' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div>
            <span className="inline-block py-1 px-3 text-xs font-medium bg-gold/10 text-gold rounded-full mb-4">
              {product.category}
            </span>
            
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-baseline mb-6">
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="ml-2 text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            <p className="text-muted-foreground mb-8">
              {product.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button className="flex-1 gap-2" onClick={() => addToCart(product.id)}>
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>
            
            <div className="glass-card p-4 rounded-lg mb-8">
              <div className="flex flex-wrap gap-8">
                {product.details?.alcohol && (
                  <div>
                    <p className="text-sm text-muted-foreground">Alcohol Content</p>
                    <p className="font-medium">{product.details.alcohol}</p>
                  </div>
                )}
                
                {product.details?.volume && (
                  <div>
                    <p className="text-sm text-muted-foreground">Volume</p>
                    <p className="font-medium">{product.details.volume}</p>
                  </div>
                )}
                
                {product.details?.origin && (
                  <div>
                    <p className="text-sm text-muted-foreground">Country</p>
                    <p className="font-medium">{product.details.origin}</p>
                  </div>
                )}
              </div>
            </div>
            
            <Tabs defaultValue="description">
              <TabsList className="w-full">
                <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
                <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                <TabsTrigger value="shipping" className="flex-1">Shipping</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="p-4">
                <p>{product.description}</p>
              </TabsContent>
              
              <TabsContent value="details" className="p-4">
                {product.details && (
                  <ul className="space-y-2">
                    {Object.entries(product.details).map(([key, value]) => (
                      <li key={key} className="flex justify-between">
                        <span className="capitalize">{key}</span>
                        <span className="font-medium">
                          {Array.isArray(value) ? value.join(', ') : String(value)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </TabsContent>
              
              <TabsContent value="shipping" className="p-4">
                <p>Free shipping on orders over $100. Standard delivery takes 2-4 business days.</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
