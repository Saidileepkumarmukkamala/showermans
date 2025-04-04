'use client';

import * as React from 'react';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

type CarouselContextType = {
  emblaRef: (node?: HTMLElement | null) => void;
  scrollTo: (index: number) => void;
  scrollNext: () => void;
  scrollPrev: () => void;
  selectedScrollSnap: () => number;
  on: (event: string, callback: () => void) => void;
};

const CarouselContext = React.createContext<CarouselContextType | null>(null);

export function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error('Carousel components must be wrapped in <Carousel>');
  }
  return context;
}

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: EmblaOptionsType;
  setApi?: (api: CarouselContextType) => void;
}

export const Carousel = ({
  opts,
  setApi,
  className,
  children,
  ...props
}: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(opts);

  const contextValue = React.useMemo(() => {
    if (!emblaApi) return null;
    return {
      emblaRef,
      scrollTo: emblaApi.scrollTo,
      scrollNext: emblaApi.scrollNext,
      scrollPrev: emblaApi.scrollPrev,
      selectedScrollSnap: emblaApi.selectedScrollSnap,
      on: emblaApi.on
    };
  }, [emblaApi]);

  React.useEffect(() => {
    if (setApi && contextValue) {
      setApi(contextValue);
    }
  }, [contextValue, setApi]);

  return (
    <CarouselContext.Provider value={contextValue}>
      <div className={cn('relative', className)} ref={emblaRef} {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex touch-pan-y transition-transform duration-500 ease-in-out will-change-transform',
      className
    )}
    {...props}
  />
));
CarouselContent.displayName = 'CarouselContent';

export const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('min-w-0 shrink-0 grow-0 basis-full', className)}
    {...props}
  />
));
CarouselItem.displayName = 'CarouselItem';

export const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { scrollPrev } = useCarousel();
  return (
    <button
      ref={ref}
      onClick={scrollPrev}
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-black/50 p-2 text-white hover:bg-black/70',
        className
      )}
      {...props}
    >
      <ChevronLeft className="h-5 w-5" />
    </button>
  );
});
CarouselPrevious.displayName = 'CarouselPrevious';

export const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { scrollNext } = useCarousel();
  return (
    <button
      ref={ref}
      onClick={scrollNext}
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-black/50 p-2 text-white hover:bg-black/70',
        className
      )}
      {...props}
    >
      <ChevronRight className="h-5 w-5" />
    </button>
  );
});
CarouselNext.displayName = 'CarouselNext';