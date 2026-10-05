import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { AnimatedButton } from './AnimatedButton';
import {
  Sparkles,
  Star,
  Award,
  Clock,
  Car,
  ChevronDown
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { openReservationModal, navigateTo, openAIChat } = useRestaurant();

  return (
    <section className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&auto=format&fit=crop&q=85"
          alt="L'Aura Bistro & Artisan Roastery interior dining room"
          className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[12000ms]"
        />
        {/* Dark gradients for perfect contrast in both dark and light styling */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/75 to-[#0b0c10]/50" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0b0c10]/40 to-[#0b0c10]/90" />
        {/* Subtle warm amber ambient glow spot */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-ambient-glow" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Michelin / Award Honor Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/70 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium tracking-wide mb-6 backdrop-blur-md shadow-lg shadow-amber-950/30">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Michelin Guide Selected 2026</span>
          <span className="text-amber-500/40">&bull;</span>
          <span className="flex items-center gap-1 text-amber-200">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            4.9 Rating (1,420+ Reviews)
          </span>
        </div>

        {/* Cinematic Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
          Good Food.{' '}
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
            Great Moments.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="font-sans text-base sm:text-xl text-zinc-300 max-w-2xl font-light leading-relaxed mb-10">
          Freshly prepared artisanal dishes, woodfired sourdough pizzas, handcrafted single-origin coffee, and unforgettable dining experiences in an ambiance of understated luxury.
        </p>

        {/* Primary, Secondary, and Additional CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mb-12">
          <AnimatedButton
            variant="primary"
            size="lg"
            showArrow
            onClick={() => openReservationModal()}
            className="w-full sm:w-auto text-base px-8 py-3.5"
          >
            Book a Table
          </AnimatedButton>

          <AnimatedButton
            variant="secondary"
            size="lg"
            onClick={() => navigateTo('/menu')}
            className="w-full sm:w-auto text-base px-8 py-3.5"
          >
            Explore Menu
          </AnimatedButton>

          <AnimatedButton
            variant="outline"
            size="lg"
            onClick={() => navigateTo('/order')}
            className="w-full sm:w-auto text-base px-7 py-3.5"
          >
            Order Now
          </AnimatedButton>
        </div>

        {/* Trust Badges & Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 pt-8 border-t border-white/10 w-full max-w-4xl text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Artisan Craft</p>
              <p className="text-sm font-medium text-white">72-Hr Sourdough</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Hours</p>
              <p className="text-sm font-medium text-white">08:30 AM – Late</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Arrival</p>
              <p className="text-sm font-medium text-white">Valet Parking</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Guest Rating</p>
              <p className="text-sm font-medium text-white">4.9 / 5.0 Stars</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="pt-10 flex flex-col items-center">
          <button
            onClick={() => {
              const el = document.getElementById('decision-flow-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs text-zinc-400 hover:text-amber-400 transition-colors flex flex-col items-center gap-1 cursor-pointer"
          >
            <span>What are you looking for?</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-amber-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
