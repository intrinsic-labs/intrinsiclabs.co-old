import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import CallToAction from '@/components/home/CallToAction';
import Reviews from '@/components/home/Reviews';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <CallToAction />
      <Reviews />
    </main>
  );
}
