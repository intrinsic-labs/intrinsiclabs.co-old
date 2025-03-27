"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import Link from 'next/link';
import ScrollIndicator from '../ui/ScrollIndicator';
import Image from 'next/image';
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  

  // Ensure component is mounted before animations
  useEffect(() => {
    setIsLoaded(true);
  }, []);


  // Text animation variants for Framer Motion
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  // Render a simple placeholder while loading
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="paragraph">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background parallax-section"
    >

      <motion.div 
        className="container-custom relative z-10 pt-8 pb-16 md:py-16"
      >
        <div className="max-w-xl mx-auto text-center" ref={textRef}>

          <motion.div 
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="flex justify-center items-center pb-8"
          >
            <Image 
              src="/images/logo/new/vertical_black.svg" 
              alt="Intrinsic Labs Logo" 
              width={300}
              height={300}
              className="w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
            />
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="heading-md mb-12 tracking-tight"
          >
            Let's grow your <span className="text-accent">revenue</span> with top notch apps and websites.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <ScrollIndicator text="" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero; 