import Hero from '@/components/home/Hero';
import TeamSection from '@/components/about/TeamSection';
import ValuesSection from '@/components/about/ValuesSection';
import CallToAction from '@/components/home/CallToAction';
import LeadMagnet from '@/components/home/LeadMagnet';
import PortfolioSection from '@/components/home/PortfolioSection';


export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ValuesSection />
      <LeadMagnet />
      <PortfolioSection />
      <TeamSection />
      <CallToAction />
    </main>
  );
}