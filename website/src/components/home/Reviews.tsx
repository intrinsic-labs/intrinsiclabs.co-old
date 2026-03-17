import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { reviews } from '@/lib/reviews';

const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 1; i <= 5; i += 1) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} className="text-orange" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} className="text-orange" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-orange" />);
    }
  }

  return <div className="flex gap-1">{stars}</div>;
};

const Reviews = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-background" id="reviews">
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto mb-8 md:mb-16 text-center">
          <h2 className="heading-lg mb-6 max-w-2xl mx-auto font-display">Reviews</h2>
          <p className="text-2xl max-w-2xl mx-auto">
            We&apos;ve had the privilege of working with amazing clients who trusted us to find
            the perfect solution for their needs.
          </p>
        </div>

        <div className="relative max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto">
          <div className="relative">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className={`relative w-full md:w-[400px] lg:w-[480px] ${
                  index === 0
                    ? 'md:ml-auto md:mr-24 md:-mb-3 lg:mr-24 lg:-mb-4'
                    : index === 1
                      ? 'md:mr-auto md:ml-28 md:-mb-3 lg:ml-36 lg:-mb-12'
                      : index === 2
                        ? 'md:ml-auto md:mr-12 md:-mb-3 lg:mr-18 lg:-mb-4'
                        : index === 3
                          ? 'md:mr-auto md:ml-20 md:-mb-3 lg:ml-28 lg:-mb-12'
                          : 'md:ml-auto md:mr-12 md:-mb-3 lg:mr-18 lg:-mb-4'
                }`}
              >
                <div className="bg-white/40 hover:bg-white/80 backdrop-blur-sm border border-primary/20 hover:border-accent/60 rounded-lg p-6 transition-all duration-300 relative z-10 mb-4 md:mb-0">
                  <div className="mb-4">
                    <StarRating rating={review.stars} />
                  </div>
                  <blockquote className="mb-4">
                    <p className="paragraph-serif text-lg">{review.quote}</p>
                  </blockquote>
                  <footer className="text-sm font-medium font-mono">{review.credit}</footer>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
