
import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
  className?: string;
}

const ProductCard = ({
  id,
  name,
  category,
  price,
  originalPrice,
  image,
  isNew = false,
  isSale = false,
  className
}: ProductCardProps) => {
  // Fallback image in case the provided one is missing or fails to load
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://images.pexels.com/photos/1879610/pexels-photo-1879610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    e.currentTarget.alt = 'Product Image';
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`Added ${name} to cart`);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`Added ${name} to wishlist`);
  };

  return (
    <Link 
      to={`/product/${id}`} 
      className={cn(
        "product-card-hover relative overflow-hidden block transition-all duration-500 transform hover:scale-[1.03]",
        "glass-card-heavy rounded-xl shadow-lg hover:shadow-xl border border-white/20",
        className
      )}
    >
      {/* Product Image with Premium Container */}
      <div className="product-image-container relative overflow-hidden rounded-t-xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-70 z-10"></div>
        <img 
          src={image} 
          alt={name} 
          onError={handleImageError} 
          className="w-full h-64 object-contain p-4 transition-transform duration-700 ease-in-out" 
        />
        
        {/* Light Reflection Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        {/* Product Badges - Enhanced with luxury styling */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
          {isNew && (
            <span className="inline-block py-1 px-2 text-xs font-medium glass-card-light text-blue-500 rounded backdrop-blur-md shadow-sm">
              New
            </span>
          )}
          
          {isSale && (
            <span className="inline-block py-1 px-2 text-xs font-medium glass-card-gold backdrop-blur-md shadow-sm rounded">
              Sale
            </span>
          )}
        </div>
        
        {/* Quick Actions - Enhanced with more visible hover effect */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <button 
            className="p-2 glass-card-light rounded-full hover:bg-white/30 transition-colors duration-200 shadow-md" 
            onClick={handleAddToWishlist}
            aria-label="Add to wishlist"
          >
            <Heart className="h-4 w-4 text-primary" />
          </button>
        </div>
      </div>
      
      {/* Product Info - Enhanced with premium typography and spacing */}
      <div className="p-5 relative">
        {/* Subtle Divider with Gold Accent */}
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
        
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{category}</span>
        <h3 className="font-serif font-medium text-lg mt-1 mb-2 text-balance">{name}</h3>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="font-medium text-lg">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
            )}
          </div>
          
          <button 
            className="p-2 glass-button-gold rounded-full hover:bg-gold/40 transition-all duration-300 shadow-sm" 
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
