import { workItems } from '@/lib/work';
import WorkProjectCard from '@/components/work/WorkProjectCard';

const WorkIndex = () => {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <h1 className="heading-lg mb-6">Our Work</h1>
          <p className="paragraph text-neutral-800">
            Real products, real businesses, and real operational problems solved with software.
            Detailed case studies are coming next. For now, this is the project index.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {workItems.map((item, index) => (
            <WorkProjectCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkIndex;
