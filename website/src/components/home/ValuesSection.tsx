'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import FeatureCard from '@/components/ui/FeatureCard';
import CallToAction from '@/components/home/CallToAction';

// Values data
const values = [
  {
    id: 1,
    title: 'Continuous Innovation',
    description: 'We spend significant time learning new technologies and discovering ways to build solutions that go beyond industry standards.',
    // icon: (
    //   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    //   </svg>
    // ),
  },
  {
    id: 2,
    title: 'Clarity & Honesty',
    description: 'We belive in building long-term relationships with our clients through clear and open communication.',
    // icon: (
    //   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    //   </svg>
    // ),
  },
  {
    id: 3,
    title: 'Commitment to Quality',
    description: 'We never call a project finished until we exceed our clients\' expectations.',
    // description: 'We have an obsession with doing things right. We never call a project finished until the client is really excited to show it off.',
    // icon: (
    //   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    //   </svg>
    // ),
  },
];

const ValuesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section 
      id="values"
      ref={sectionRef}
      className="pb-16 md:pb-24 bg-background relative overflow-hidden"
    >
      {/* Background elements */}
      {/* <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background to-background/80"></div>
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-5"></div>
      </div> */}

      <div className="container-custom relative z-10 pb-8 md:pb-0">
        <motion.div 
          className="max-w-4xl mx-auto mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          
          <h2 className="heading-lg mb-6 font-display">Every decision matters.</h2>
          
          <p className="text-lg text-neutral-800 max-w-lg mx-auto">
            We're proud to stand by our core values in every action we take.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mx-auto"
        >
          {values.map((value) => (
            <div key={value.id} className="h-full max-w-md mx-auto">
              <FeatureCard
                title={value.title}
                description={value.description}
                // icon={value.icon}
                variants={itemVariants}
                className="h-full"
              />
            </div>
          ))}
        </motion.div>
      </div>
      <CallToAction />
    </section>
  );
};

export default ValuesSection; 