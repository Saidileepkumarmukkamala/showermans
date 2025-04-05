
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from '@/lib/utils';

// Comprehensive navigation structure similar to TotalWine
const navStructure = {
  "Wine": {
    path: "/category/wine",
    subcategories: [
      {
        name: "Red Wine",
        path: "/category/red-wine",
        subItems: [
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
        subItems: [
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
        subItems: [
          { name: "Dry Rosé", path: "/category/dry-rose" },
          { name: "Sweet Rosé", path: "/category/sweet-rose" },
          { name: "Sparkling Rosé", path: "/category/sparkling-rose" }
        ]
      },
      {
        name: "Sparkling Wine",
        path: "/category/sparkling-wine",
        subItems: [
          { name: "Champagne", path: "/category/champagne" },
          { name: "Prosecco", path: "/category/prosecco" },
          { name: "Cava", path: "/category/cava" },
          { name: "American Sparkling", path: "/category/american-sparkling" }
        ]
      },
      {
        name: "Dessert & Fortified",
        path: "/category/dessert-fortified",
        subItems: [
          { name: "Port", path: "/category/port" },
          { name: "Sherry", path: "/category/sherry" },
          { name: "Dessert Wine", path: "/category/dessert-wine" },
          { name: "Madeira", path: "/category/madeira" }
        ]
      },
      {
        name: "Shop By Region",
        path: "/category/wine-regions",
        subItems: [
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
        subItems: [
          { name: "Bourbon", path: "/category/bourbon" },
          { name: "Scotch", path: "/category/scotch" },
          { name: "Irish Whiskey", path: "/category/irish-whiskey" },
          { name: "Canadian Whisky", path: "/category/canadian-whisky" },
          { name: "Japanese Whisky", path: "/category/japanese-whisky" },
          { name: "American Whiskey", path: "/category/american-whiskey" }
        ]
      },
      {
        name: "Vodka",
        path: "/category/vodka",
        subItems: [
          { name: "Unflavored Vodka", path: "/category/unflavored-vodka" },
          { name: "Flavored Vodka", path: "/category/flavored-vodka" },
          { name: "Imported Vodka", path: "/category/imported-vodka" },
          { name: "Domestic Vodka", path: "/category/domestic-vodka" }
        ]
      },
      {
        name: "Tequila",
        path: "/category/tequila",
        subItems: [
          { name: "Blanco/Silver", path: "/category/blanco-tequila" },
          { name: "Reposado", path: "/category/reposado-tequila" },
          { name: "Añejo", path: "/category/anejo-tequila" },
          { name: "Mezcal", path: "/category/mezcal" }
        ]
      },
      {
        name: "Rum",
        path: "/category/rum",
        subItems: [
          { name: "White/Silver Rum", path: "/category/white-rum" },
          { name: "Dark/Gold Rum", path: "/category/dark-rum" },
          { name: "Spiced Rum", path: "/category/spiced-rum" },
          { name: "Flavored Rum", path: "/category/flavored-rum" }
        ]
      },
      {
        name: "Gin",
        path: "/category/gin",
        subItems: [
          { name: "London Dry Gin", path: "/category/london-dry-gin" },
          { name: "New American Gin", path: "/category/american-gin" },
          { name: "Flavored Gin", path: "/category/flavored-gin" }
        ]
      },
      {
        name: "Cognac & Brandy",
        path: "/category/cognac-brandy",
        subItems: [
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
        subItems: [
          { name: "IPA", path: "/category/ipa" },
          { name: "Lager", path: "/category/lager" },
          { name: "Stout", path: "/category/stout" },
          { name: "Porter", path: "/category/porter" },
          { name: "Ale", path: "/category/ale" },
          { name: "Wheat Beer", path: "/category/wheat-beer" },
          { name: "Sour Beer", path: "/category/sour-beer" }
        ]
      },
      {
        name: "Domestic Craft",
        path: "/category/domestic-craft",
        subItems: [
          { name: "West Coast Craft", path: "/category/west-coast-craft" },
          { name: "East Coast Craft", path: "/category/east-coast-craft" },
          { name: "Midwest Craft", path: "/category/midwest-craft" },
          { name: "Southern Craft", path: "/category/southern-craft" }
        ]
      },
      {
        name: "Imported Beer",
        path: "/category/imported-beer",
        subItems: [
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
        subItems: [
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
        subItems: [
          { name: "Wine Glasses", path: "/category/wine-glasses" },
          { name: "Whiskey Glasses", path: "/category/whiskey-glasses" },
          { name: "Beer Glasses", path: "/category/beer-glasses" },
          { name: "Cocktail Glasses", path: "/category/cocktail-glasses" }
        ]
      },
      {
        name: "Bar Tools",
        path: "/category/bar-tools",
        subItems: [
          { name: "Cocktail Shakers", path: "/category/cocktail-shakers" },
          { name: "Corkscrews", path: "/category/corkscrews" },
          { name: "Bar Sets", path: "/category/bar-sets" },
          { name: "Ice Molds", path: "/category/ice-molds" }
        ]
      },
      {
        name: "Wine Storage",
        path: "/category/wine-storage",
        subItems: [
          { name: "Wine Coolers", path: "/category/wine-coolers" },
          { name: "Wine Racks", path: "/category/wine-racks" },
          { name: "Wine Preservation", path: "/category/wine-preservation" }
        ]
      },
      {
        name: "Gift Sets",
        path: "/category/gift-sets",
        subItems: [
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
        subItems: [
          { name: "Weddings", path: "/catering/weddings" },
          { name: "Corporate Events", path: "/catering/corporate" },
          { name: "Private Parties", path: "/catering/private-parties" }
        ]
      },
      {
        name: "Bar Services",
        path: "/catering/bar-services",
        subItems: [
          { name: "Full Bar Service", path: "/catering/full-bar" },
          { name: "Wine Service", path: "/catering/wine-service" },
          { name: "Bartender Hire", path: "/catering/bartenders" }
        ]
      },
      {
        name: "Rentals",
        path: "/catering/rentals",
        subItems: [
          { name: "Glassware Rental", path: "/catering/glassware-rental" },
          { name: "Bar Equipment", path: "/catering/bar-equipment" },
          { name: "Furniture", path: "/catering/furniture" }
        ]
      }
    ]
  }
};

// The component for rendering the multi-level nav menu
const MultiLevelNavMenu: React.FC = () => {
  return (
    <div className="hidden md:flex items-center space-x-6">
      {Object.entries(navStructure).map(([category, { path, subcategories }]) => (
        <MainCategory 
          key={category} 
          category={category} 
          path={path} 
          subcategories={subcategories} 
        />
      ))}
    </div>
  );
};

// Main category component with hover trigger
interface MainCategoryProps {
  category: string;
  path: string;
  subcategories: {
    name: string;
    path: string;
    subItems: { name: string; path: string }[];
  }[];
}

const MainCategory: React.FC<MainCategoryProps> = ({ category, path, subcategories }) => {
  return (
    <HoverCard openDelay={0} closeDelay={200}>
      <HoverCardTrigger asChild>
        <Link 
          to={path} 
          className="text-primary hover:text-gold transition-colors duration-200 font-medium flex items-center"
        >
          {category}
          <ChevronRight className="h-4 w-4 transform rotate-90 ml-1 opacity-70" />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-[800px] p-0 glass-card-heavy" align="start" sideOffset={8}>
        <div className="grid grid-cols-3 gap-2 p-4">
          {subcategories.map((subcat) => (
            <SubCategory key={subcat.name} subcat={subcat} />
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

// Subcategory component with hover functionality for tertiary menu
interface SubCategoryProps {
  subcat: {
    name: string;
    path: string;
    subItems: { name: string; path: string }[];
  };
}

const SubCategory: React.FC<SubCategoryProps> = ({ subcat }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="p-2 relative" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={subcat.path} className="font-medium text-lg text-primary hover:text-gold transition-colors duration-200 block">
        {subcat.name}
      </Link>
      
      <ul className={cn(
        "space-y-1 mt-2 transition-all duration-200",
        isHovered ? "opacity-100 max-h-96" : "opacity-70 max-h-96"
      )}>
        {subcat.subItems.map((item) => (
          <li key={item.name}>
            <Link 
              to={item.path} 
              className={cn(
                "text-muted-foreground hover:text-gold transition-colors duration-200 block text-sm py-1",
                isHovered && "hover:pl-1"
              )}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultiLevelNavMenu;
