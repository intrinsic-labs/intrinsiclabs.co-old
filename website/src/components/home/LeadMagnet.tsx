"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

const LeadMagnet = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="pb-20 md:py-32 relative overflow-hidden bg-primary">

      <motion.div
        className="container-custom relative z-10 parallax-content"
      >
        <div className="max-w-3xl mx-auto text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="heading-lg mb-6 pt-16 md:pt-0"
          >
            Analyze your business for free in 3 minutes.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white mb-10 max-w-3xl mx-auto"
          >
            We'll send you a report with actionable insights to help you grow your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="https://x.com/intrinsic_labs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full block text-center max-w-xl mx-auto">
              Get your report
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default LeadMagnet; 