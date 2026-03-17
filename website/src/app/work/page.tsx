import type { Metadata } from 'next';
import WorkIndex from '@/components/work/WorkIndex';
import CallToAction from '@/components/home/CallToAction';

export const metadata: Metadata = {
  title: 'Work | Intrinsic Labs',
  description:
    'Browse a selection of software projects delivered by Intrinsic Labs across mobile, web, and custom business systems.',
};

export default function WorkPage() {
  return (
    <main className="min-h-screen">
      <WorkIndex />
      <CallToAction />
    </main>
  );
}
