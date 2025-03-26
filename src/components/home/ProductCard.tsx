
import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  className,
}: ProductCardProps) => {
  return (
    <div 
      className={cn(
        "product-card-hover bg-white rounded-lg shadow-sm overflow-hidden",
        className
      )}
    >
      {/* Product Image */}
      <div className="product-image-container">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover"
        />
        
        {/* Product Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="inline-block py-1 px-2 text-xs font-medium bg-blue-500 text-white rounded">
              New
            </span>
          )}
          
          {isSale && (
            <span className="inline-block py-1 px-2 text-xs font-medium bg-gold text-white rounded">
              Sale
            </span>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gold hover:text-white transition-colors duration-200">
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{category}</span>
        <h3 className="font-serif font-medium text-lg mt-1 mb-2">{name}</h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium text-lg">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
            )}
          </div>
          
          <button className="p-2 bg-primary text-white rounded-full hover:bg-gold transition-colors duration-200">
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
