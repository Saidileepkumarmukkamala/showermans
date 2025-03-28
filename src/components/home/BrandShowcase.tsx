import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

// Updated brand logos - added Hennessy, Jameson, and Avion
const brands = [{
  id: 4,
  name: "Budweiser",
  logo: "/lovable-uploads/d7238c25-b6af-406d-96e6-4deca1c57731.png"
}, {
  id: 5,
  name: "Jack Daniel's",
  logo: "/lovable-uploads/b7cdd800-7470-480b-958d-7fb505ee3bf9.png"
}, {
  id: 7,
  name: "Heineken",
  logo: "/lovable-uploads/04a6035b-7724-4fe7-a0a7-562b975c7b8c.png"
}, {
  id: 8,
  name: "Johnnie Walker",
  logo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngmart.com%2Ffiles%2F22%2FJohnnie-Walker-Logo-PNG-Clipart.png&f=1&nofb=1&ipt=4cca2db186d63285ccc67d1812f2e883bed21d98b5111602d2e7a7f69e5c4916&ipo=images"
}, {
  id: 9,
  name: "Hennessy",
  logo: "https://www.hennessy.com/themes/custom/hennessy/assets/images/logo-hennessy-white.png"
}, {
  id: 10,
  name: "Jameson",
  logo: "https://www.jamesonwhiskey.com/wp-content/themes/global-gutenberg-theme/static/images/icons-logos/jameson-logo.svg"
}, {
  id: 11,
  name: "Avion",
  logo: "https://tequilaavion.com/wp-content/uploads/2022/06/logo-avion.svg"
}];

const BrandShowcase = () => {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    skipSnaps: false,
    dragFree: false
  }, [Autoplay({
    delay: 1000,
    stopOnInteraction: false,
    stopOnMouseEnter: false
  })]);

  return (
    <section className="py-12 overflow-hidden bg-transparent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <span className="inline-block py-1 px-3 text-xs font-medium bg-gold/10 text-gold rounded-full mb-2">
            Featured Partners
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold">Our Premium Brands</h2>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
              <div key={`${brand.id}-${index}`} className="flex-none pl-4 md:pl-6 w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6">
                <div className="p-4 h-24 flex items-center justify-center bg-transparent transition-all duration-300">
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className={`max-h-16 w-auto object-contain transition-all duration-300 opacity-85 hover:opacity-100 filter ${
                      brand.name === "Johnnie Walker" ? "" : "invert"
                    }`} 
                    onError={e => {
                      console.log(`Failed to load brand image: ${brand.logo}`);
                      e.currentTarget.src = "/placeholder.svg";
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;