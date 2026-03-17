'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import BrowserWindow from '@/components/ui/BrowserWindow';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import { teamMembers } from '@/lib/team';

const TeamSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const getTeamMemberFavicon = (id: number) => {
    switch (id) {
      case 1:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        );
      case 2:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
          </svg>
        );
      case 3:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 8a6 6 0 1112 0A6 6 0 014 8zm4.5 1a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm3 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM2 17a8 8 0 1116 0H2z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const browserTabs = teamMembers.map((member) => ({
    id: member.id,
    label: member.name,
    favicon: getTeamMemberFavicon(member.id),
    content: (
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
        <div className="relative aspect-square overflow-hidden rounded-md bg-neutral-400 backdrop-blur-sm border border-primary/20">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              width={600}
              height={800}
              className="rounded-lg overflow-hidden object-cover w-full h-full"
              priority={member.id === 1}
            />
          ) : (
            <PlaceholderImage text={member.imagePlaceholder} className="group" />
          )}
        </div>

        <div>
          <h3 className="text-2xl font-display text-primary mb-1">{member.name}</h3>
          <p className="text-sm text-neutral-800 mb-4">{member.role}</p>

          <div className="h-[1px] w-16 bg-accent mb-4" />

          <p className="text-neutral-800 mb-6">{member.bio}</p>

          <h4 className="text-sm font-bold text-primary mb-3">Expertise</h4>
          <div className="flex flex-wrap gap-2 mb-6">
            {member.skills.map((skill) => (
              <span key={skill} className="text-xs px-2 py-1 rounded-sm bg-primary/10 text-primary/80">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <section id="team" ref={sectionRef} className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background/90" />
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-5" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          className="max-w-4xl mx-auto mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-lg mb-6 font-display">Meet The Team</h2>

          <p className="paragraph text-neutral-800 max-w-2xl mx-auto pb-4">
            Intrinsic Labs is a small team of developers, business professionals, and creatives.
            We&apos;re dedicated to creating exceptional digital experiences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <BrowserWindow tabs={browserTabs} initialTabId={1} height={500} />
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
