'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

// Review data
const reviews = [
  {
    id: 1,
    quote: "Intrinsic Labs has consistently delivered creative, innovative, and sustainable products to me and my team. Even the smallest request results in products that exceed initial expectations. Couldn't recommend more highly!",
    credit: "Albert Spear, Mecklenburg County",
    stars: 5,
  },
  {
    id: 2,
    quote: "Intrinsic Labs joined a project midstream and was a great addition. They didn't just check off our to-do list, they really thought about the project creatively and added solid thinking beyond what was requested.",
    credit: "Joe Murray, Wondersmith",
    stars: 5,
  },
  {
    id: 3,
    quote: "Asher is knowledgeable in his field, professional in his conduct, and a real pleasure to work with. He completed his contract on time, exceeded expectations, and met budget. I whole-heartedly recommend his services.",
    credit: "Nathan Xiques, Blackthorn Geomatics",
    stars: 5,
  },
  {
    id: 4,
    quote: "Intrinsic Labs has been an amazing company to work with! The final product was delivered in a very professional and timely manner... I highly recommend Intrinsic Labs!",
    credit: "Elliot George, Mint Hill Mowing Co",
    stars: 5,
  },
];

// Star Rating component
const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} className="text-accent-500" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} className="text-accent-500" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-accent-500" />);
    }
  }

  return <div className="flex gap-1">{stars}</div>;
};

const Reviews = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="pt-24 md:pt-32 pb-24 md:pb-32 relative overflow-hidden bg-background"
    >
      <div className="container-custom relative z-10">
        <motion.div
          className="max-w-4xl mx-auto mb-8 md:mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-lg mb-6 max-w-2xl mx-auto font-display">We Don't Speak For Ourselves.</h2>
          <p className="paragraph text-neutral-800 max-w-2xl mx-auto">
            We've had the privilege of working with amazing clients who trusted us to find the perfect solution for their needs.
          </p>
        </motion.div>

        {/* Reviews with organic overlapping layout */}
        <div className="relative max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto">
          
          <div className="relative">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.15,
                  ease: "easeOut" 
                }}
                className={`
                  relative w-[300px] md:w-[400px] lg:w-[480px]
                  ${(() => {
                    if (index === 0) return 'ml-auto mr-16 -mb-3 md:mr-24 lg:mr-24 md:-mb-3 lg:-mb-4';
                    if (index === 1) return 'mr-auto ml-16 -mb-3 md:ml-28 lg:ml-36 md:-mb-3 lg:-mb-16';
                    if (index === 2) return 'ml-auto mr-16 -mb-3 md:mr-12 lg:mr-18 md:-mb-3 lg:-mb-4';
                    if (index === 3) return 'mr-auto ml-16 -mb-3 md:ml-20 lg:ml-28 md:-mb-3 lg:-mb-4';
                    return '';
                  })()}
                `}
              >
                <div 
                  className={`
                    bg-white/40 hover:bg-white/80 backdrop-blur-sm 
                    border border-primary/20 hover:border-accent/60
                    rounded-lg p-6
                    transition-all duration-300
                    relative z-10
                  `}
                >
                  <div className="mb-4">
                    <StarRating rating={review.stars} />
                  </div>
                  <blockquote className="mb-4">
                    <p className="paragraph-serif text-neutral-700">{review.quote}</p>
                  </blockquote>
                  <footer className="text-sm text-neutral-600 font-medium font-mono">
                    {review.credit}
                  </footer>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
