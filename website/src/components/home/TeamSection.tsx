'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Team member data
const teamMembers = [
  {
    id: 1,
    name: 'Asher Pope',
    role: 'Founder & Lead Developer',
    bio: 'Software engineer with expertise in mobile and web development. AI researcher and developer. Understander of many things.',
    skills: ['Mobile Development', 'Web Development', 'AI Research', 'UX Design'],
    imagePlaceholder: 'Asher Pope',
    image: '/images/team/asher.jpg',
  },
  {
    id: 2,
    name: 'Elaine Pope',
    role: 'Client Relations',
    bio: 'Experienced sales professional with a background in client relations. Helps clients identify their needs and ensures our solutions meet their expectations.',
    skills: ['Client Relations', 'Sales Strategy', 'Project Management', 'Business Development'],
    imagePlaceholder: 'Elaine Pope',
    image: '/images/logo/new/planet_black_padding.svg',
  },
  {
    id: 3,
    name: 'Quinten Harris',
    role: 'Business Development',
    bio: 'Sales professional with a drive for growth and innovation. Focused on expanding our client base and identifying new opportunities for the company.',
    skills: ['Business Strategy', 'Client Acquisition', 'Market Research', 'Sales'],
    imagePlaceholder: 'Quinten Harris',
    image: '/images/logo/new/planet_black_padding.svg',
  },
  {
    id: 4,
    name: 'Lena Skov',
    role: 'Marketing Advisor',
    bio: 'Sales professional with a drive for growth and innovation. Focused on expanding our client base and identifying new opportunities for the company.',
    skills: ['Business Strategy', 'Client Acquisition', 'Market Research', 'Sales'],
    imagePlaceholder: 'Lena Skov',
    image: '/images/logo/new/planet_black_padding.svg',
  },
];

const TeamSection = () => {
  const [activeTeamMember, setActiveTeamMember] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const navigateTeam = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setActiveTeamMember(prev => (prev === 0 ? teamMembers.length - 1 : prev - 1));
    } else {
      setActiveTeamMember(prev => (prev === teamMembers.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <section 
      id="team"
      ref={sectionRef}
      className="bg-background relative overflow-hidden py-8"
    >
      <div className="container-custom relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto mb-8 md:mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-lg mb-6 font-display">Meet The Team</h2>
          
          <p className="paragraph text-neutral-800 max-w-2xl mx-auto">
            Asher founded Intrinsic Labs with a vision for building a team of exceptional thinkers. Think you'd be a good fit? <Link className="underline" href="/contact">Reach out.</Link>
          </p>
        </motion.div>

        {/* Team Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto"
        >
          {/* Team carousel */}
          <div className="relative">
            {/* Team members */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/40 hover:bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden border border-primary/20 hover:border-accent/60 flex flex-col transition-all duration-300"
                >
                  <div className="relative aspect-[1] overflow-hidden">
                    <Image
                      src={member.image || ''}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                  
                  <div className="py-2 md:py-3 px-3 md:px-4">
                    <div className="flex flex-col mb-2">
                    <h3 className="text-xl font-display font-bold">{member.name}</h3>
                    <p className="text-sm text-neutral-700">{member.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection; 