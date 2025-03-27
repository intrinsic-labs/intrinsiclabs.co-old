'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import portfolioData from '@/data/portfolioData.json';

const PortfolioGallery = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [flippedItem, setFlippedItem] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

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

  // Define different heights for items to create a staggered effect
  const getItemHeight = (id: number) => {
    // Map specific items to specific heights to create a staggered pattern
    const heightMap: Record<number, string> = {
      1: '400px', // Tall
      2: '280px', // Medium
      3: '220px', // Small
      4: '350px', // Medium-tall
      5: '280px', // Medium
      6: '400px', // Tall
    };
    
    return heightMap[id] || '300px'; // Default height
  };

  return (
    <div
      ref={galleryRef}
      className="container-custom"
    >
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-2 auto-rows-4"
        style={{
          gridAutoFlow: 'dense',
        }}
      >
        {portfolioData.map((item) => {
          // On mobile, only use click state for flipping
          // On desktop, use both hover and click states
          const isHovered = !isMobile && hoveredItem === item.id;
          const isFlipped = flippedItem === item.id;
          const showBackside = isFlipped || isHovered;
          
          // Calculate grid-row-end based on item height
          const itemHeight = parseInt(getItemHeight(item.id).replace('px', ''));
          const spanRows = Math.ceil(itemHeight / 20); // 20px is our grid row height
          
          return (
            <motion.div
              key={item.id}
              className="relative"
              style={{
                gridRow: `span ${spanRows}`,
                height: getItemHeight(item.id),
              }}
              layout
              transition={{
                duration: 0.5,
                ease: "easeInOut"
              }}
            >
              {/* Portfolio Item Card */}
              <div
                className="relative overflow-hidden rounded-lg h-full"
                onMouseEnter={() => !isMobile && setHoveredItem(item.id)}
                onMouseLeave={() => !isMobile && setHoveredItem(null)}
                onClick={() => handleCardFlip(item.id)}
                style={{
                  perspective: '1000px',
                  boxShadow: showBackside ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none',
                  transition: 'box-shadow 0.5s ease',
                  transitionDelay: showBackside ? '0.3s' : '0s',
                }}
              >
                {/* Card inner container - handles the flip */}
                <div
                  className="relative w-full h-full"
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
                    <div 
                      className="bg-neutral-100 px-4 py-2 flex items-center w-full sticky top-0 z-10 border-b border-primary/20"
                      style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 20,
                        overscrollBehavior: 'none',
                        touchAction: 'none'
                      }}
                    >
                      {/* Traffic light buttons */}
                      <div className="flex-shrink-0 flex space-x-2 mr-4">
                        <div className="w-3 h-3 rounded-full bg-red-500 opacity-80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500 opacity-80"></div>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col space-y-4 justify-left items-left flex-grow overflow-y-auto overscroll-behavior-y-contain">
                      <h3 className="heading-sm text-left">{item.title}</h3>
                      <p className="text-sm text-left">{item.description}</p>
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
      </div>
    </div>
  );
};

export default PortfolioGallery;