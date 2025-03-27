
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ArrowLeft, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, getCartItemDetails } = useCart();
  const { toast } = useToast();
  
  const handleCheckout = () => {
    toast({
      title: "Checkout initiated",
      description: "This would normally redirect to a payment page",
    });
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-2xl font-serif font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/category/all">
              <Button className="gap-2">
                <ArrowLeft size={16} />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-serif font-bold mb-8">Shopping Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="glass-card p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Your Items ({totalItems})</h2>
                  <Button variant="ghost" size="sm" onClick={clearCart} className="text-destructive hover:text-destructive">
                    <Trash2 size={16} className="mr-2" />
                    Clear Cart
                  </Button>
                </div>
                
                <Separator className="mb-4" />
                
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const itemDetails = getCartItemDetails(item);
                    if (!itemDetails) return null;
                    
                    return (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="h-24 w-24 rounded-md overflow-hidden bg-muted">
                          <img 
                            src={itemDetails.product.image} 
                            alt={itemDetails.product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <Link 
                            to={`/product/${item.id}`}
                            className="font-medium hover:text-gold transition-colors"
                          >
                            {itemDetails.product.name}
                          </Link>
                          <p className="text-muted-foreground text-sm">
                            ${itemDetails.product.price.toFixed(2)} each
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </Button>
                          
                          <span className="w-10 text-center">{item.quantity}</span>
                          
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                        
                        <div className="text-right min-w-[80px]">
                          <div className="font-medium">
                            ${(itemDetails.product.price * item.quantity).toFixed(2)}
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-sm text-destructive hover:underline mt-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="mt-6">
                <Link to="/category/all">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft size={16} />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="glass-card p-6 rounded-lg sticky top-24">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                <Separator className="mb-4" />
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${(totalPrice * 0.07).toFixed(2)}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-medium text-lg mb-6">
                  <span>Total</span>
                  <span>${(totalPrice + (totalPrice * 0.07)).toFixed(2)}</span>
                </div>
                
                <Button className="w-full gap-2" onClick={handleCheckout}>
                  <CreditCard size={16} />
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
