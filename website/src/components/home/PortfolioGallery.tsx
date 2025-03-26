'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import portfolioData from '@/data/portfolioData.json';

const PortfolioGallery = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [flippedItem, setFlippedItem] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  // Default favicon if none is provided
  const defaultFavicon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm8 8v2h1v1H4v-1h1v-2a1 1 0 011-1h8a1 1 0 011 1z" clipRule="evenodd" />
    </svg>
  );

  // Detect if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.matchMedia('(hover: none)').matches);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleCardFlip = (id: number) => {
    setFlippedItem(flippedItem === id ? null : id);
  };

  return (
    <div 
      ref={galleryRef}
      className="container-custom"
    >
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
        layout
        transition={{ 
          duration: 0.5,
          ease: "easeInOut"
        }}
      >
        {portfolioData.map((item, index) => {
          // On mobile, only use click state for flipping
          // On desktop, use both hover and click states
          const isHovered = !isMobile && hoveredItem === item.id;
          const isFlipped = flippedItem === item.id;
          const showBackside = isFlipped || isHovered;
          
          return (
            <motion.div
              key={item.id}
              className="relative"
            >
              {/* Portfolio Item Card */}
              <div 
                className={`relative overflow-hidden rounded-lg`}
                onMouseEnter={() => !isMobile && setHoveredItem(item.id)}
                onMouseLeave={() => !isMobile && setHoveredItem(null)}
                onClick={() => handleCardFlip(item.id)}
                style={{ 
                  perspective: '1000px',
                  height: '300px', // Fixed height to match flipped card
                  boxShadow: showBackside ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none',
                  transition: 'box-shadow 0.3s ease',
                  transitionDelay: showBackside ? '0.3s' : '0s'
                }}
              >
                {/* Card inner container - handles the flip */}
                <div
                  className={`relative w-full h-full`}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    transform: showBackside ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    transition: 'transform 0.5s ease'
                  }}
                >
                  {/* Front side (Image) */}
                  <div 
                    className="absolute inset-0 w-full h-full rounded-lg" 
                    style={{ 
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                  
                  {/* Back side (Content) */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-transparent border border-primary/20 text-primary flex flex-col justify-top items-top rounded-lg overflow-auto"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      position: showBackside ? 'relative' : 'absolute',
                      visibility: showBackside ? 'visible' : 'hidden',
                      transition: 'transform 0.5s ease'
                    }}
                  >
                    {/* Browser chrome/toolbar */}
                    <div className="bg-neutral-100 px-4 py-2 flex items-center rounded-lg w-full">
                        {/* Traffic light buttons */}
                        <div className="flex-shrink-0 flex space-x-2 mr-4">
                        <div className="w-3 h-3 rounded-full bg-red-500 opacity-80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500 opacity-80"></div>
                        </div>
                        
                        {/* Browser tabs container with fade effect */}
                        <div className="flex-1 relative overflow-hidden">
                        {/* Scrollable tabs container - lower z-index */}
                        <div className="overflow-x-scroll hide-scrollbar touch-pan-x relative z-0">
                            <div className="flex items-center whitespace-nowrap">
                            
                            {/* Tab items with spacing between them */}
                            {/* <div className="flex items-center">

                                <h2 className="font-display text-center mx-auto">{item.title}</h2>
                                    
                            </div> */}
                        </div>
                        
                        </div>
                    </div>
                    </div>
                    <div className="p-6 flex flex-col space-y-4 justify-left items-left border-t border-primary/20 flex-grow">
                    <h3 className="heading-sm text-left">{item.title}</h3>
                    <p className="text-sm text-left ">{item.description}</p>
                    <div className="mb-4 flex flex-wrap justify-left gap-2">
                      {item.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="inline-block px-2 py-1 text-xs bg-neutral-300 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Simple link to the project */}
                    <div className="flex justify-left items-left pt-2 mt-auto">
                    <a 
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1 bg-transparent border border-accent text-accent hover:bg-accent/10 font-semibold rounded-md text-sm transition-colors"
                      onClick={(e) => e.stopPropagation()} // Prevent card flip when clicking the link
                    >
                      Read More
                    </a>
                    </div>
                    </div>
                </div>
              </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default PortfolioGallery;