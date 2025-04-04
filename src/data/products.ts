
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
  description?: string;
  details?: {
    origin?: string;
    alcohol?: string;
    volume?: string;
    taste?: string[];
    pairings?: string[];
  };
}

export const products: Product[] = [
  {
    id: 1,
    name: "Macallan 18 Years",
    category: "Whiskey",
    price: 299.99,
    // Updated image to use the correct uploaded image
    image: "/lovable-uploads/fa48fcd8-00c2-460c-a526-31075be3a614.png",
    isNew: true,
    description: "The Macallan 18 Year Old Sherry Oak is matured exclusively in hand-picked sherry seasoned oak casks from Jerez, Spain. A full-bodied palate of mature oak, ginger and raisin flavors.",
    details: {
      origin: "Scotland",
      alcohol: "43%",
      volume: "750ml",
      taste: ["Rich dried fruits", "Spice", "Chocolate", "Orange"],
      pairings: ["Dark chocolate", "Blue cheese", "Nuts"]
    }
  },
  {
    id: 2,
    name: "Grey Goose Original",
    category: "Vodka",
    price: 45.99,
    originalPrice: 55.99,
    // Updated image to use the correct uploaded image
    image: "/lovable-uploads/c2382e18-1567-4a53-ae88-bab7265675d6.png",
    isSale: true,
    description: "Grey Goose is made with soft winter wheat grown in Picardy, France and is distilled in the same region. It's then blended with spring water from Gensac-la-Pallue that has been naturally filtered through limestone.",
    details: {
      origin: "France",
      alcohol: "40%",
      volume: "750ml",
      taste: ["Smooth", "Crisp", "Subtle sweetness"],
      pairings: ["Caviar", "Smoked salmon", "Chocolate desserts"]
    }
  },
  {
    id: 3,
    name: "Hendrick's Gin",
    category: "Gin",
    price: 39.99,
    image: "/lovable-uploads/a8db1b11-bb5d-4fcd-b5da-a5d5dc10765b.png",
    description: "Hendrick's Gin is a superb, super-premium gin handcrafted in Scotland. The unusual distillation process combined with the oddly delicious infusion of rose and cucumber yields a one-of-a-kind gin.",
    details: {
      origin: "Scotland",
      alcohol: "44%",
      volume: "750ml",
      taste: ["Floral", "Cucumber", "Rose", "Juniper"],
      pairings: ["Cucumber tonic", "Earl Grey tea", "Strawberries"]
    }
  },
  {
    id: 4,
    name: "Dom Pérignon Vintage",
    category: "Champagne",
    price: 199.99,
    // Corrected: Using proper Dom Pérignon image
    image: "/lovable-uploads/4ab37fae-7adf-434f-a0ce-85987941644f.png",
    isNew: true,
    description: "Only the best grapes from the most exceptional years are used in the creation of Dom Pérignon. Each vintage is unique and reinterprets the uniqueness of the seasons. Dom Pérignon commits to this reinvention and expresses itself through each Vintage.",
    details: {
      origin: "France",
      alcohol: "12.5%",
      volume: "750ml",
      taste: ["Almond", "Cocoa", "White fruit", "Dried flowers"],
      pairings: ["Oysters", "Caviar", "White truffles", "Seafood"]
    }
  },
  {
    id: 5,
    name: "Rémy Martin XO",
    category: "Cognac",
    price: 179.99,
    originalPrice: 199.99,
    image: "/lovable-uploads/360eb85e-ddf4-4ca5-9164-96c80523e308.png",
    isSale: true,
    description: "Rémy Martin XO is composed of eaux-de-vie coming exclusively from the most sought-after vineyards of Cognac: Grande Champagne and Petite Champagne. These eaux-de-vie offer an extraordinary aromatic complexity and exceptionally long finish.",
    details: {
      origin: "France",
      alcohol: "40%",
      volume: "750ml",
      taste: ["Plum", "Fig", "Cinnamon", "Hazelnuts", "Rich fruit cake"],
      pairings: ["Dark chocolate", "Dried fruits", "Blue cheese"]
    }
  },
  {
    id: 6,
    name: "Patrón Silver",
    category: "Tequila",
    price: 49.99,
    // Corrected: Using proper Patrón Silver image
    image: "/lovable-uploads/3f3fd353-7ef4-459d-816b-aded65a7a7e3.png",
    description: "Patrón Silver is handcrafted from the finest 100% Weber Blue Agave and is carefully distilled in small batches at Hacienda Patrón distillery in Jalisco, Mexico.",
    details: {
      origin: "Mexico",
      alcohol: "40%",
      volume: "750ml",
      taste: ["Citrus", "Pepper", "Agave sweetness"],
      pairings: ["Lime", "Mexican cuisine", "Spicy dishes"]
    }
  },
  {
    id: 7,
    name: "Château Margaux 2015",
    category: "Wine",
    price: 399.99,
    image: "/lovable-uploads/b55decef-0602-49e0-90e9-045021ab6403.png",
    isNew: true,
    description: "Château Margaux 2015 is one of the greatest vintages of this First Growth Bordeaux estate. It shows incredible power and finesse, with remarkable aromas of dark berries, violets, minerals, and spice.",
    details: {
      origin: "France",
      alcohol: "13.5%",
      volume: "750ml",
      taste: ["Blackcurrant", "Violet", "Tobacco", "Truffles"],
      pairings: ["Lamb", "Game", "Truffles", "Aged cheeses"]
    }
  },
  {
    id: 8,
    name: "Monkey 47",
    category: "Gin",
    price: 79.99,
    originalPrice: 89.99,
    // Corrected: Using proper Monkey 47 image
    image: "/lovable-uploads/afe2eb7d-d6b4-4031-854f-23f91a100b3b.png",
    isSale: true,
    description: "Monkey 47 is a unique gin from the Black Forest in Germany. Made with 47 botanicals and bottled at 47%, it has an impressive complexity and balance.",
    details: {
      origin: "Germany",
      alcohol: "47%",
      volume: "500ml",
      taste: ["Citrus", "Berries", "Herbs", "Pine", "Pepper"],
      pairings: ["Tonic water", "Mediterranean herbs", "Citrus zest"]
    }
  },
  {
    id: 9,
    name: "Jack Daniel's Old No. 7",
    category: "Whiskey",
    price: 29.99,
    image: "/lovable-uploads/1bdddcca-625f-4ee1-b8d8-ecc2f0724f69.png",
    description: "Mellowed drop by drop through 10-feet of sugar maple charcoal, then matured in handcrafted barrels of our own making. And our Tennessee Whiskey doesn't follow a calendar. It's only ready when our tasters say it is.",
    details: {
      origin: "USA",
      alcohol: "40%",
      volume: "750ml",
      taste: ["Caramel", "Vanilla", "Oak", "Banana"],
      pairings: ["Cola", "BBQ", "Chocolate"]
    }
  },
  {
    id: 10,
    name: "Belvedere Vodka",
    category: "Vodka",
    price: 32.99,
    image: "/lovable-uploads/b2322c9f-a55a-4816-bed7-910c45d9df93.png",
    description: "Created from 600 years of Polish vodka-making tradition, Belvedere is produced using 100% Polska rye and water from its own natural well, with no additives or sugar.",
    details: {
      origin: "Poland",
      alcohol: "40%",
      volume: "750ml",
      taste: ["Vanilla", "Rye", "White pepper", "Creamy"],
      pairings: ["Citrus mixers", "Oysters", "Light appetizers"]
    }
  },
  {
    id: 11,
    name: "Moet & Chandon Imperial Brut",
    category: "Champagne",
    price: 49.99,
    image: "/lovable-uploads/5ca10da0-9bbc-4aea-b474-ad08aa087fd3.png",
    description: "Moët Impérial is the House's iconic champagne. Created in 1869, it embodies Moët & Chandon's unique style, a style distinguished by its bright fruitiness, its seductive palate and its elegant maturity.",
    details: {
      origin: "France",
      alcohol: "12%",
      volume: "750ml",
      taste: ["Green apple", "Citrus", "Brioche", "Minerals"],
      pairings: ["Shellfish", "Light fish", "Sushi", "Canapés"]
    }
  },
  {
    id: 12,
    name: "Oban 14 Year Old",
    category: "Whiskey",
    price: 79.99,
    image: "/lovable-uploads/6d31f34c-7095-4a38-870e-7c43c306f9bd.png",
    description: "Oban 14 Year Old is a classic Highland malt with a smoky sweetness. Notes of citrus, smooth sweetness and a hint of sea-salt and peaty smokiness.",
    details: {
      origin: "Scotland",
      alcohol: "43%",
      volume: "750ml",
      taste: ["Sea salt", "Peat", "Honey", "Citrus", "Dried figs"],
      pairings: ["Grilled seafood", "Blue cheese", "Dark chocolate"]
    }
  },
  {
    id: 13,
    name: "Veuve Clicquot Yellow Label",
    category: "Champagne",
    price: 59.99,
    image: "/lovable-uploads/5ca10da0-9bbc-4aea-b474-ad08aa087fd3.png",
    isNew: true,
    description: "Veuve Clicquot Yellow Label manages to reconcile two opposing factors - strength and silkiness - and to hold them in perfect balance with aromatic intensity and a lot of freshness.",
    details: {
      origin: "France",
      alcohol: "12%",
      volume: "750ml",
      taste: ["Yellow apple", "Peach", "Brioche", "Vanilla"],
      pairings: ["Seafood", "Sushi", "White meat", "Mild cheeses"]
    }
  },
  {
    id: 14,
    name: "Bombay Sapphire",
    category: "Gin",
    price: 24.99,
    image: "https://cdn.shopify.com/s/files/1/0078/2721/3941/products/bombay-sapphire_1000x.jpg",
    description: "Bombay Sapphire is a London dry gin with 10 hand-selected botanicals from exotic locations around the world. Its distinctive blue bottle is iconic.",
    details: {
      origin: "England",
      alcohol: "47%",
      volume: "750ml",
      taste: ["Juniper", "Lemon peel", "Coriander", "Angelica"],
      pairings: ["Tonic water", "Lime", "Mediterranean cuisine"]
    }
  },
  {
    id: 15,
    name: "Caymus Cabernet Sauvignon",
    category: "Wine",
    price: 89.99,
    originalPrice: 99.99,
    image: "https://www.wine.com/product/images/w_1440,h_1812,c_fit/cfogpdqgthwcfnmvzv4k.jpg",
    isSale: true,
    description: "Caymus Vineyards produces this Cabernet Sauvignon from Napa Valley with rich, ripe fruit and supple tannins, making it approachable when young yet capable of aging gracefully.",
    details: {
      origin: "USA",
      alcohol: "14.6%",
      volume: "750ml",
      taste: ["Black cherry", "Cocoa", "Cassis", "Vanilla"],
      pairings: ["Steak", "Prime rib", "Strong cheeses", "Dark chocolate"]
    }
  },
  {
    id: 16,
    name: "Woodford Reserve",
    category: "Whiskey",
    price: 34.99,
    image: "https://cdn.shopify.com/s/files/1/0013/2477/7569/products/woodford-reserve-bourbon-whiskey-750ml_1080x.jpg",
    description: "Woodford Reserve is crafted in small batches using a blend of historic character with modern-day innovation. Rich, rounded and smooth with complex citrus, cinnamon and cocoa notes.",
    details: {
      origin: "USA",
      alcohol: "45.2%",
      volume: "750ml",
      taste: ["Dried fruit", "Vanilla", "Tobacco spice", "Cocoa"],
      pairings: ["Caramel desserts", "Nuts", "Aged cheeses"]
    }
  }
];

export const getProductsByCategory = (category: string) => {
  if (category === "all") return products;
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
};

export const getProductById = (id: number) => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (product: Product, limit: number = 4) => {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
};
