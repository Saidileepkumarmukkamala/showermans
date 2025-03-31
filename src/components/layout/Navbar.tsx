import React, { useState, useEffect } from 'react';
import { Menu, Search, ShoppingCart, User, X, ChevronDown, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import AuthDialog from '@/components/auth/AuthDialog';
import SearchCommandDialog from './SearchCommandDialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Comprehensive category structure based on onlineliquor.com
const categoryStructure = {
  "Rare Bottles": {
    path: "/category/rare-bottles",
    subcategories: [{
      name: "Store Picks",
      path: "/category/store-picks"
    }, {
      name: "Limited Editions",
      path: "/category/limited-editions"
    }, {
      name: "Collector's Items",
      path: "/category/collectors-items"
    }]
  },
  "Whisky": {
    path: "/category/whiskey",
    subcategories: [{
      name: "Scotch",
      path: "/category/scotch"
    }, {
      name: "Bourbon",
      path: "/category/bourbon"
    }, {
      name: "Japanese Whisky",
      path: "/category/japanese-whisky"
    }, {
      name: "Irish Whiskey",
      path: "/category/irish-whiskey"
    }, {
      name: "Single Malt",
      path: "/category/single-malt"
    }]
  },
  "Tequila": {
    path: "/category/tequila",
    subcategories: [{
      name: "Blanco",
      path: "/category/tequila-blanco"
    }, {
      name: "Reposado",
      path: "/category/tequila-reposado"
    }, {
      name: "Añejo",
      path: "/category/tequila-anejo"
    }, {
      name: "Mezcal",
      path: "/category/mezcal"
    }]
  },
  "Cognac & Brandy": {
    path: "/category/cognac",
    subcategories: [{
      name: "VS",
      path: "/category/cognac-vs"
    }, {
      name: "VSOP",
      path: "/category/cognac-vsop"
    }, {
      name: "XO",
      path: "/category/cognac-xo"
    }, {
      name: "Armagnac",
      path: "/category/armagnac"
    }]
  },
  "Vodka": {
    path: "/category/vodka",
    subcategories: [{
      name: "Plain",
      path: "/category/vodka-plain"
    }, {
      name: "Flavored",
      path: "/category/vodka-flavored"
    }, {
      name: "Premium",
      path: "/category/vodka-premium"
    }]
  },
  "Gin": {
    path: "/category/gin",
    subcategories: [{
      name: "London Dry",
      path: "/category/london-dry-gin"
    }, {
      name: "Navy Strength",
      path: "/category/navy-strength-gin"
    }, {
      name: "Botanical",
      path: "/category/botanical-gin"
    }]
  },
  "Rum": {
    path: "/category/rum",
    subcategories: [{
      name: "Dark",
      path: "/category/dark-rum"
    }, {
      name: "Spiced",
      path: "/category/spiced-rum"
    }, {
      name: "White",
      path: "/category/white-rum"
    }, {
      name: "Aged",
      path: "/category/aged-rum"
    }]
  },
  "Wine": {
    path: "/category/wine",
    subcategories: [{
      name: "Red",
      path: "/category/red-wine"
    }, {
      name: "White",
      path: "/category/white-wine"
    }, {
      name: "Rosé",
      path: "/category/rose-wine"
    }, {
      name: "Sparkling",
      path: "/category/sparkling-wine"
    }]
  },
  "Champagne": {
    path: "/category/champagne",
    subcategories: [{
      name: "Brut",
      path: "/category/brut-champagne"
    }, {
      name: "Rosé",
      path: "/category/rose-champagne"
    }, {
      name: "Vintage",
      path: "/category/vintage-champagne"
    }]
  }
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState<string | null>(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileCategory = (category: string) => {
    if (activeMobileCategory === category) {
      setActiveMobileCategory(null);
    } else {
      setActiveMobileCategory(category);
    }
  };

  const handleUserButtonClick = () => {
    if (!user) {
      setAuthDialogOpen(true);
    }
  };
  
  const getInitials = (displayName: string) => {
    if (!displayName) return 'U';
    return displayName
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getUserDisplayName = () => {
    if (!user) return '';
    // Try to get name from user_metadata first, then fall back to email
    return (
      user.user_metadata?.full_name || 
      user.user_metadata?.name || 
      user.email?.split('@')[0] || 
      'User'
    );
  };

  const userDisplayName = getUserDisplayName();
  const userEmail = user?.email || '';

  return (
    <>
      <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", isScrolled ? "glass-nav py-3" : "bg-transparent py-4")}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-xl md:text-2xl font-serif font-bold">Showerman's Fine Wine & Liquor</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-primary hover:text-gold transition-colors duration-200 font-medium">
                Home
              </Link>
              <Link to="/category/all" className="text-primary hover:text-gold transition-colors duration-200 font-medium">
                Shop All
              </Link>
              
              {/* Mega Menu - Using NavigationMenu from shadcn/ui with improved styling */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-primary hover:text-gold transition-colors duration-200 font-medium bg-transparent h-auto p-0 after:hidden">
                      <span className="flex items-center text-base font-medium text-justify">
                        Categories
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="glass-card-heavy rounded-md shadow-lg p-6">
                      <div className="grid grid-cols-3 gap-4 w-[800px]">
                        {Object.entries(categoryStructure).map(([category, {
                        path,
                        subcategories
                      }]) => <div key={category} className="p-4">
                            <Link to={path} className="font-medium text-lg text-primary hover:text-gold transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>
                              {category}
                            </Link>
                            <ul className="mt-2 space-y-1">
                              {subcategories.map(sub => <li key={sub.name}>
                                  <Link to={sub.path} className="text-muted-foreground hover:text-gold transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>
                                    {sub.name}
                                  </Link>
                                </li>)}
                            </ul>
                          </div>)}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              <Link to="/about" className="text-primary hover:text-gold transition-colors duration-200 font-medium">
                About
              </Link>
              <Link to="/contact" className="text-primary hover:text-gold transition-colors duration-200 font-medium">
                Contact
              </Link>
            </nav>

            {/* Action Icons */}
            <div className="flex items-center space-x-4">
              <button 
                className="p-1.5 hover:bg-white/30 backdrop-blur-sm rounded-full transition-colors duration-200"
                onClick={() => setSearchDialogOpen(true)}
              >
                <Search className="h-5 w-5" />
              </button>
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-1 hover:bg-white/30 backdrop-blur-sm rounded-full transition-colors duration-200">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gold/20 text-gold">
                        {getInitials(userDisplayName)}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <div className="px-3 py-2">
                      <p className="font-medium">{userDisplayName}</p>
                      <p className="text-xs text-muted-foreground">{userEmail}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders" className="cursor-pointer">My Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive cursor-pointer" onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button 
                  className="p-1.5 hover:bg-white/30 backdrop-blur-sm rounded-full transition-colors duration-200"
                  onClick={handleUserButtonClick}
                >
                  <User className="h-5 w-5" />
                </button>
              )}
              
              <Link to="/cart" className="p-1.5 hover:bg-white/30 backdrop-blur-sm rounded-full transition-colors duration-200 relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>
              
              <button className="md:hidden p-1.5 hover:bg-white/30 backdrop-blur-sm rounded-full transition-colors duration-200" onClick={() => setMobileMenuOpen(true)}>
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu with glassmorphism */}
        <div className={cn("fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300", mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none")}>
          <div className={cn("fixed top-0 right-0 h-full w-[85%] max-w-sm glass-card-heavy p-6 shadow-lg transform transition-transform duration-300 overflow-y-auto", mobileMenuOpen ? "translate-x-0" : "translate-x-full")}>
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-serif font-bold">Showerman's Fine Wine & Liquor</span>
              <button className="p-1.5 hover:bg-white/30 backdrop-blur-sm rounded-full transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-6">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-primary hover:text-gold transition-colors duration-200 text-lg font-medium">
                Home
              </Link>
              <Link to="/category/all" onClick={() => setMobileMenuOpen(false)} className="text-primary hover:text-gold transition-colors duration-200 text-lg font-medium">
                Shop All
              </Link>
              
              {/* Mobile Categories Accordion */}
              <div className="space-y-2">
                <p className="text-primary font-medium text-lg">Categories</p>
                <div className="pl-4 space-y-4">
                  {Object.entries(categoryStructure).map(([category, {
                  path,
                  subcategories
                }]) => <div key={category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Link to={path} onClick={() => setMobileMenuOpen(false)} className="block text-primary hover:text-gold transition-colors duration-200 font-medium">
                          {category}
                        </Link>
                        <button onClick={() => toggleMobileCategory(category)} className="p-1 hover:bg-secondary rounded-full">
                          <ChevronDown className={`h-4 w-4 transition-transform ${activeMobileCategory === category ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      <div className={`pl-4 space-y-1 ${activeMobileCategory === category ? 'block' : 'hidden'}`}>
                        {subcategories.map(sub => <Link key={sub.name} to={sub.path} onClick={() => setMobileMenuOpen(false)} className="block text-muted-foreground hover:text-gold transition-colors duration-200 text-sm py-1">
                            {sub.name}
                          </Link>)}
                      </div>
                    </div>)}
                </div>
              </div>
              
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-primary hover:text-gold transition-colors duration-200 text-lg font-medium">
                About
              </Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-primary hover:text-gold transition-colors duration-200 text-lg font-medium">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Auth Dialog */}
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
      
      {/* Search Dialog */}
      <SearchCommandDialog open={searchDialogOpen} setOpen={setSearchDialogOpen} />
    </>
  );
};

export default Navbar;
