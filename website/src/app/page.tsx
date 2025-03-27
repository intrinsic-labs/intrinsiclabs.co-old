import Hero from '@/components/home/Hero';
import TeamSection from '@/components/home/TeamSection';
import ValuesSection from '@/components/home/ValuesSection';
import LeadMagnet from '@/components/home/LeadMagnet';
import PortfolioSection from '@/components/home/PortfolioSection';
import Reviews from '@/components/home/Reviews';


export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ValuesSection />
      <LeadMagnet />
      <PortfolioSection />
      <TeamSection />
      <Reviews />
    </main>
  );
}