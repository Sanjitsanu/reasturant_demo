import React, { useState, useEffect } from 'react';
import { REVIEWS } from '../data/restaurantData';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  // Auto scroll
  useEffect(() => {
    const timer = setInterval(() => {
      nextReview();
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const review = REVIEWS[currentIndex];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest block mb-2">
          Verified Guest Reviews
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Loved by Food Lovers
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          Over 1,400+ five-star experiences across romantic dinners, celebrations, and morning coffee rituals.
        </p>
      </div>

      {/* Main Review Card */}
      <div className="relative max-w-4xl mx-auto bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-14 shadow-xl">
        <Quote className="w-12 h-12 text-amber-500/20 absolute top-8 left-8 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Star rating */}
          <div className="flex items-center gap-1 mb-6 text-amber-400">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>

          {/* Testimonial Quote */}
          <p className="font-serif text-lg sm:text-2xl text-zinc-800 dark:text-zinc-200 leading-relaxed font-normal mb-8 max-w-2xl">
            &ldquo;{review.review}&rdquo;
          </p>

          {/* Author Meta */}
          <div className="flex items-center gap-4">
            <img
              src={review.avatar}
              alt={review.author}
              className="w-14 h-14 rounded-full object-cover border-2 border-amber-500/40"
            />
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                  {review.author}
                </h4>
                {review.verified && (
                  <span title="Verified Diner">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {review.visitType} &bull; {review.date}
              </p>
              {review.favoriteDish && (
                <p className="text-[11px] text-amber-500 font-medium mt-0.5">
                  Favorite: {review.favoriteDish}
                </p>
              )}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 mt-10">
            <button
              onClick={prevReview}
              className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 text-zinc-600 dark:text-zinc-400 hover:text-amber-500 transition-colors cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1.5">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === i ? 'w-6 bg-amber-500' : 'w-2 bg-zinc-300 dark:bg-zinc-700'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 text-zinc-600 dark:text-zinc-400 hover:text-amber-500 transition-colors cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
