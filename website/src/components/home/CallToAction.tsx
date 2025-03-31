"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { FiCalendar, FiMail, FiPhone } from 'react-icons/fi';

const CallToAction = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="pt-8 md:pt-16 pb-8 md:pb-16 relative overflow-hidden parallax-section bg-white">

      <motion.div
        className="container-custom relative z-10 parallax-content"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="heading-sm mb-6"
          >
            Stop wishing. Start building.
          </motion.h2> */}
{/* 
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-neutral-800 max-w-3xl mb-6 mx-auto"
          >
            Call, email, or schedule now. 
          </motion.p> */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-row flex-wrap gap-4 items-center justify-center"
          >
            <Link
              href="https://x.com/intrinsic_labs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-center flex flex-row gap-2 items-center">
              <FiPhone size={20} />
              Leave a message
            </Link>

            <Link
              href="https://x.com/intrinsic_labs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-center flex flex-row gap-2 items-center">
              <FiMail size={20} />
              Email us
            </Link>

            <Link
              href="https://x.com/intrinsic_labs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-center flex flex-row gap-2 items-center">
              <FiCalendar size={20} />
              Schedule a call
            </Link>

          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction; 