import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Dummy data: replace or fetch from CMS/backend
const trendingCategories = [
  {
    id: 1,
    title: 'Shop Tourney Essentials',
    image: '/images/tourney-essentials.jpg',
    isNew: false,
  },
  {
    id: 2,
    title: 'Best Kentucky Bourbons',
    image: '/images/kentucky-bourbons.jpg',
    isNew: false,
  },
  {
    id: 3,
    title: 'Stars of Vodka',
    image: '/images/vodka-stars.jpg',
    isNew: false,
  },
  {
    id: 4,
    title: 'New Arrivals',
    image: '/images/new-arrivals-wine.jpg',
    isNew: true,
  },
  {
    id: 5,
    title: 'New Beer & Seltzer',
    image: '/images/beer-seltzer.jpg',
    isNew: true,
  },
];

const TrendingNowSection = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 220;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black relative">
            Trending Now
            <span className="block w-10 h-1 bg-emerald-600 mt-1" />
          </h2>

          <div className="hidden md:flex items-center gap-2">
            <button
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-scroll no-scrollbar pb-4"
          >
            {trendingCategories.map((item) => (
              <div key={item.id} className="flex-shrink-0 w-40 text-center relative">
                {/* NEW Badge */}
                {item.isNew && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
                    NEW
                  </span>
                )}

                {/* Circular Image */}
                <div className="w-40 h-40 rounded-full overflow-hidden border border-gray-200 shadow-sm mb-3 mx-auto">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title */}
                <h3 className="text-sm font-medium text-gray-900 leading-tight">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingNowSection;
