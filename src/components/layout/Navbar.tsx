import React, { useState, useEffect } from 'react';
import { Menu, Search, ShoppingCart, User, X, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
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
import MultiLevelNavMenu from './MultiLevelNavMenu';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Mobile navigation structure
const mobileNavStructure = {
  "Wine": {
    path: "/category/wine",
    subcategories: [
      {
        name: "Red Wine",
        path: "/category/red-wine",
        items: [
          { name: "Cabernet Sauvignon", path: "/category/cabernet-sauvignon" },
          { name: "Merlot", path: "/category/merlot" },
          { name: "Pinot Noir", path: "/category/pinot-noir" },
          { name: "Syrah/Shiraz", path: "/category/syrah" },
          { name: "Malbec", path: "/category/malbec" },
          { name: "Zinfandel", path: "/category/zinfandel" },
          { name: "Red Blends", path: "/category/red-blends" }
        ]
      },
      {
        name: "White Wine",
        path: "/category/white-wine",
        items: [
          { name: "Chardonnay", path: "/category/chardonnay" },
          { name: "Sauvignon Blanc", path: "/category/sauvignon-blanc" },
          { name: "Pinot Grigio", path: "/category/pinot-grigio" },
          { name: "Riesling", path: "/category/riesling" },
          { name: "Moscato", path: "/category/moscato" },
          { name: "White Blends", path: "/category/white-blends" }
        ]
      },
      {
        name: "Rosé Wine",
        path: "/category/rose-wine",
        items: [
          { name: "Dry Rosé", path: "/category/dry-rose" },
          { name: "Sweet Rosé", path: "/category/sweet-rose" },
          { name: "Sparkling Rosé", path: "/category/sparkling-rose" }
        ]
      },
      {
        name: "Sparkling Wine",
        path: "/category/sparkling-wine",
        items: [
          { name: "Champagne", path: "/category/champagne" },
          { name: "Prosecco", path: "/category/prosecco" },
          { name: "Cava", path: "/category/cava" },
          { name: "American Sparkling", path: "/category/american-sparkling" }
        ]
      },
      {
        name: "Dessert & Fortified",
        path: "/category/dessert-fortified",
        items: [
          { name: "Port", path: "/category/port" },
          { name: "Sherry", path: "/category/sherry" },
          { name: "Dessert Wine", path: "/category/dessert-wine" },
          { name: "Madeira", path: "/category/madeira" }
        ]
      },
      {
        name: "Shop By Region",
        path: "/category/wine-regions",
        items: [
          { name: "France", path: "/category/france-wine" },
          { name: "Italy", path: "/category/italy-wine" },
          { name: "California", path: "/category/california-wine" },
          { name: "Spain", path: "/category/spain-wine" },
          { name: "Australia", path: "/category/australia-wine" }
        ]
      }
    ]
  },
  "Spirits": {
    path: "/category/spirits",
    subcategories: [
      {
        name: "Whiskey",
        path: "/category/whiskey",
        items: [
          { name: "Bourbon", path: "/category/bourbon" },
          { name: "Scotch", path: "/category/scotch" },
          { name: "Irish Whiskey", path: "/category/irish-whiskey" },
          { name: "Japanese Whisky", path: "/category/japanese-whisky" },
          { name: "American Whiskey", path: "/category/american-whiskey" }
        ]
      },
      {
        name: "Vodka",
        path: "/category/vodka",
        items: [
          { name: "Unflavored Vodka", path: "/category/unflavored-vodka" },
          { name: "Flavored Vodka", path: "/category/flavored-vodka" }
        ]
      },
      {
        name: "Tequila",
        path: "/category/tequila",
        items: [
          { name: "Blanco/Silver", path: "/category/blanco-tequila" },
          { name: "Reposado", path: "/category/reposado-tequila" },
          { name: "Añejo", path: "/category/anejo-tequila" },
          { name: "Mezcal", path: "/category/mezcal" }
        ]
      },
      {
        name: "Rum",
        path: "/category/rum",
        items: [
          { name: "White/Silver Rum", path: "/category/white-rum" },
          { name: "Dark/Gold Rum", path: "/category/dark-rum" },
          { name: "Spiced Rum", path: "/category/spiced-rum" },
          { name: "Flavored Rum", path: "/category/flavored-rum" }
        ]
      },
      {
        name: "Gin",
        path: "/category/gin",
        items: [
          { name: "London Dry Gin", path: "/category/london-dry-gin" },
          { name: "New American Gin", path: "/category/american-gin" },
          { name: "Flavored Gin", path: "/category/flavored-gin" }
        ]
      },
      {
        name: "Cognac & Brandy",
        path: "/category/cognac-brandy",
        items: [
          { name: "VS Cognac", path: "/category/vs-cognac" },
          { name: "VSOP Cognac", path: "/category/vsop-cognac" },
          { name: "XO Cognac", path: "/category/xo-cognac" },
          { name: "Armagnac", path: "/category/armagnac" }
        ]
      }
    ]
  },
  "Craft Beer": {
    path: "/category/craft-beer",
    subcategories: [
      {
        name: "Beer Style",
        path: "/category/beer-styles",
        items: [
          { name: "IPA", path: "/category/ipa" },
          { name: "Lager", path: "/category/lager" },
          { name: "Stout", path: "/category/stout" }
        ]
      },
      {
        name: "Domestic Craft",
        path: "/category/domestic-craft",
        items: [
          { name: "West Coast Craft", path: "/category/west-coast-craft" },
          { name: "East Coast Craft", path: "/category/east-coast-craft" },
          { name: "Midwest Craft", path: "/category/midwest-craft" },
          { name: "Southern Craft", path: "/category/southern-craft" }
        ]
      },
      {
        name: "Imported Beer",
        path: "/category/imported-beer",
        items: [
          { name: "Belgian Beer", path: "/category/belgian-beer" },
          { name: "German Beer", path: "/category/german-beer" },
          { name: "British Beer", path: "/category/british-beer" },
          { name: "Irish Beer", path: "/category/irish-beer" },
          { name: "Mexican Beer", path: "/category/mexican-beer" }
        ]
      },
      {
        name: "Cider & Hard Seltzer",
        path: "/category/cider-seltzer",
        items: [
          { name: "Hard Cider", path: "/category/hard-cider" },
          { name: "Hard Seltzer", path: "/category/hard-seltzer" },
          { name: "Flavored Malt Beverages", path: "/category/flavored-malt" }
        ]
      }
    ]
  },
  "Accessories & More": {
    path: "/category/accessories",
    subcategories: [
      {
        name: "Glassware",
        path: "/category/glassware",
        items: [
          { name: "Wine Glasses", path: "/category/wine-glasses" },
          { name: "Whiskey Glasses", path: "/category/whiskey-glasses" }
        ]
      },
      {
        name: "Bar Tools",
        path: "/category/bar-tools",
        items: [
          { name: "Cocktail Shakers", path: "/category/cocktail-shakers" },
          { name: "Corkscrews", path: "/category/corkscrews" },
          { name: "Bar Sets", path: "/category/bar-sets" },
          { name: "Ice Molds", path: "/category/ice-molds" }
        ]
      },
      {
        name: "Wine Storage",
        path: "/category/wine-storage",
        items: [
          { name: "Wine Coolers", path: "/category/wine-coolers" },
          { name: "Wine Racks", path: "/category/wine-racks" },
          { name: "Wine Preservation", path: "/category/wine-preservation" }
        ]
      },
      {
        name: "Gift Sets",
        path: "/category/gift-sets",
        items: [
          { name: "Wine Gift Sets", path: "/category/wine-gift-sets" },
          { name: "Whiskey Gift Sets", path: "/category/whiskey-gift-sets" },
          { name: "Cocktail Gift Sets", path: "/category/cocktail-gift-sets" }
        ]
      }
    ]
  },
  "Catering": {
    path: "/catering",
    subcategories: [
      {
        name: "Event Planning",
        path: "/catering/event-planning",
        items: [
          { name: "Weddings", path: "/catering/weddings" },
          { name: "Corporate Events", path: "/catering/corporate" }
        ]
      },
      {
        name: "Bar Services",
        path: "/catering/bar-services",
        items: [
          { name: "Full Bar Service", path: "/catering/full-bar" },
          { name: "Wine Service", path: "/catering/wine-service" },
          { name: "Bartender Hire", path: "/catering/bartenders" }
        ]
      },
      {
        name: "Rentals",
        path: "/catering/rentals",
        items: [
          { name: "Glassware Rental", path: "/catering/glassware-rental" },
          { name: "Bar Equipment", path: "/catering/bar-equipment" },
          { name: "Furniture", path: "/catering/furniture" }
        ]
      }
    ]
  }
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileCategories, setActiveMobileCategories] = useState<{
    main: string | null;
    sub: string | null;
  }>({
    main: null,
    sub: null
  });
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

  const toggleMobileMainCategory = (category: string) => {
    setActiveMobileCategories(prev => ({
      main: prev.main === category ? null : category,
      sub: null
    }));
  };

  const toggleMobileSubCategory = (category: string) => {
    setActiveMobileCategories(prev => ({
      ...prev,
      sub: prev.sub === category ? null : category
    }));
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

            {/* Desktop Navigation - Using our new MultiLevelNavMenu */}
            <MultiLevelNavMenu />

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

        {/* Improved Mobile Menu with Accordions for better navigation */}
        <div className={cn("fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300", mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none")}>
          <div className={cn("fixed top-0 right-0 h-full w-[85%] max-w-sm glass-card-heavy p-4 shadow-lg transform transition-transform duration-300 overflow-y-auto", mobileMenuOpen ? "translate-x-0" : "translate-x-full")}>
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-serif font-bold">Showerman's Fine Wine & Liquor</span>
              <button className="p-1.5 hover:bg-white/30 backdrop-blur-sm rounded-full transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Mobile Navigation with Accordion */}
            <nav className="flex flex-col space-y-2">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-primary hover:text-gold transition-colors duration-200 text-lg font-medium py-2">
                Home
              </Link>
              
              <Accordion type="single" collapsible className="w-full">
                {Object.entries(mobileNavStructure).map(([category, { path, subcategories }]) => (
                  <AccordionItem key={category} value={category} className="border-b border-white/10">
                    <div className="flex items-center">
                      <Link 
                        to={path} 
                        className="flex-1 py-2 text-primary hover:text-gold transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {category}
                      </Link>
                      <AccordionTrigger className="p-0" />
                    </div>
                    
                    <AccordionContent>
                      <div className="pl-4 space-y-1">
                        {subcategories.map(subcat => (
                          <Accordion key={subcat.name} type="single" collapsible className="w-full">
                            <AccordionItem value={subcat.name} className="border-b border-white/5">
                              <div className="flex items-center">
                                <Link 
                                  to={subcat.path} 
                                  className="flex-1 py-1 text-muted-foreground hover:text-gold"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {subcat.name}
                                </Link>
                                <AccordionTrigger className="p-0" />
                              </div>
                              
                              <AccordionContent>
                                <div className="pl-4 space-y-1">
                                  {subcat.items.map(item => (
                                    <Link 
                                      key={item.name}
                                      to={item.path}
                                      className="block text-sm text-muted-foreground hover:text-gold py-1"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-primary hover:text-gold transition-colors duration-200 text-lg font-medium py-2">
                About
              </Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-primary hover:text-gold transition-colors duration-200 text-lg font-medium py-2">
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
