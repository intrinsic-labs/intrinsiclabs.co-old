'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PortfolioGallery from './PortfolioGallery';
import CallToAction from './CallToAction';

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
      <section
        id="portfolio"
        ref={sectionRef}
        className="py-20 md:py-32 bg-background relative overflow-hidden"
      >
        <div className="container-custom relative z-10 pb-8">
          <motion.div
            className="max-w-4xl mx-auto mb-8 md:mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-lg mb-6 font-display">Our Work</h2>

            <p className="text-lg text-neutral-800 max-w-2xl mx-auto">
              Explore our portfolio of innovative projects that push the boundaries of what's possible.
            </p>
          </motion.div>

          {/* Portfolio Gallery. No friken idea why I need this negative margin lol */}
          <div className="-mx-5 md:-mx-4">
            <PortfolioGallery />
          </div>
        </div>
        <CallToAction />
      </section>
  );
};

export default PortfolioSection; 