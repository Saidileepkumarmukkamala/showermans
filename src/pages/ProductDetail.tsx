
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getProductById, getRelatedProducts } from '@/data/products';
import { ShoppingCart, Heart, Check } from 'lucide-react';
import ProductCard from '@/components/home/ProductCard';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = getProductById(Number(productId));
  const relatedProducts = product ? getRelatedProducts(product) : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Link 
              to="/category/all" 
              className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
            >
              Browse All Products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    toast.success(`Added ${product.name} to cart`);
  };

  const handleAddToWishlist = () => {
    toast.success(`Added ${product.name} to wishlist`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-primary">{product.category}</Link>
            <span className="mx-2">/</span>
            <span className="text-primary">{product.name}</span>
          </div>
        </div>
        
        {/* Product Details */}
        <section className="py-8">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Product Image */}
              <div className="bg-white p-4 rounded-lg">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-auto object-contain max-h-[500px] rounded"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.pexels.com/photos/1879610/pexels-photo-1879610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
                  }}
                />
              </div>
              
              {/* Product Info */}
              <div>
                <div className="mb-6">
                  <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-serif font-bold mt-1 mb-2">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    {product.description}
                  </p>
                </div>
                
                {/* Product badges */}
                <div className="flex gap-2 mb-6">
                  {product.isNew && (
                    <span className="inline-block py-1 px-2 text-xs font-medium bg-blue-500 text-white rounded">
                      New
                    </span>
                  )}
                  {product.isSale && (
                    <span className="inline-block py-1 px-2 text-xs font-medium bg-accent text-white rounded">
                      Sale
                    </span>
                  )}
                </div>
                
                {/* Availability */}
                <div className="flex items-center mb-6">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">In Stock</span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-4 mb-8">
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 px-6 rounded-md hover:bg-primary/90 transition-colors duration-200"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </button>
                  <button 
                    onClick={handleAddToWishlist}
                    className="p-3 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors duration-200"
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Product Details */}
                {product.details && (
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Product Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {product.details.origin && (
                        <div>
                          <p className="text-sm font-medium">Origin</p>
                          <p className="text-muted-foreground">{product.details.origin}</p>
                        </div>
                      )}
                      {product.details.alcohol && (
                        <div>
                          <p className="text-sm font-medium">Alcohol Content</p>
                          <p className="text-muted-foreground">{product.details.alcohol}</p>
                        </div>
                      )}
                      {product.details.volume && (
                        <div>
                          <p className="text-sm font-medium">Volume</p>
                          <p className="text-muted-foreground">{product.details.volume}</p>
                        </div>
                      )}
                    </div>
                    
                    {product.details.taste && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-1">Taste Notes</p>
                        <div className="flex flex-wrap gap-2">
                          {product.details.taste.map((note, index) => (
                            <span 
                              key={index}
                              className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground"
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {product.details.pairings && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-1">Perfect Pairings</p>
                        <div className="flex flex-wrap gap-2">
                          {product.details.pairings.map((pairing, index) => (
                            <span 
                              key={index}
                              className="text-xs px-2 py-1 rounded-full bg-gold/10 text-gold"
                            >
                              {pairing}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 bg-secondary/50">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8 text-center">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
