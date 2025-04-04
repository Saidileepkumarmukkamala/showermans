
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroCarousel from './HeroCarousel';

const Hero = () => {
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Make elements visible immediately to ensure buttons are clickable
    if (textRef.current) {
      textRef.current.classList.add('opacity-100');
      textRef.current.classList.remove('opacity-0');
    }
  }, []);
  
  return (
    <div className="relative w-full overflow-hidden">
      {/* Full-width Hero Carousel with Slides */}
      <HeroCarousel />
    </div>
  );
};

export default Hero;
