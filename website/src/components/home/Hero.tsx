"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import ScrollIndicator from '../ui/ScrollIndicator';
import Image from 'next/image';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!heroRef.current || !isLoaded) return;

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });

    tl.to(heroRef.current, {
      backgroundPosition: '100% 100%',
      duration: 15,
      ease: 'sine.inOut',
    });

    return () => {
      tl.kill();
    };
  }, [isLoaded]);

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
    <div ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background parallax-section">
      <motion.div className="container-custom relative z-10 pt-8 pb-16 md:py-16" style={{ y: y2 }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            className="flex justify-center items-center pb-8"
          >
            <Image
              src="/images/logo/intrinsic-labs-logo-v2-accent-lighter.svg"
              alt="Intrinsic Labs Logo"
              width={300}
              height={300}
              className="w-[250px] h-[250px] md:w-[400px] md:h-[400px]"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
            className="heading-xl mb-6 tracking-tight"
          >
            We will fix your life with code.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-xl md:text-2xl text-neutral-800 mb-4 md:mb-12 max-w-3xl mx-auto"
          >
            Imagine anything. Make it so.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}>
            <ScrollIndicator text="" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
