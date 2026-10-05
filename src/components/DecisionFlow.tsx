import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { DECISION_FLOWS, MENU_ITEMS } from '../data/restaurantData';
import { AnimatedButton } from './AnimatedButton';
import {
  Sparkles,
  Heart,
  CheckCircle2,
  Calendar,
  Utensils,
  MapPin,
  Tag
} from 'lucide-react';

export const DecisionFlow: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('date-night');
  const { openReservationModal, navigateTo, addToCart } = useRestaurant();

  const currentOption =
    DECISION_FLOWS.find((f) => f.id === selectedId) || DECISION_FLOWS[3];

  // Match actual dish objects
  const matchingDishes = currentOption.suggestedDishes.map((name) =>
    MENU_ITEMS.find((item) => item.name === name)
  ).filter(Boolean);

  const handleCta = () => {
    if (currentOption.ctaAction === 'reserve') {
      openReservationModal({ occasion: currentOption.label });
    } else if (currentOption.ctaAction === 'order') {
      navigateTo('/order');
    } else {
      navigateTo('/menu');
    }
  };

  return (
    <section id="decision-flow-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-3 border border-amber-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated For Your Occasion</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          What Are You Looking For?
        </h2>
        <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          Select your dining mood or visit purpose. We’ll tailor handpicked recommendations, seating, and special perks instantly.
        </p>
      </div>

      {/* Decision Buttons Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-12">
        {DECISION_FLOWS.map((flow) => {
          const isSelected = flow.id === selectedId;
          return (
            <button
              key={flow.id}
              onClick={() => setSelectedId(flow.id)}
              className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-lg shadow-amber-500/25 scale-105 border border-amber-400'
                  : 'bg-zinc-100 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/40 hover:text-amber-500'
              }`}
            >
              <span className="text-base">{flow.icon}</span>
              <span>{flow.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Recommendation Card */}
      <div className="bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900/90 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all duration-500">
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Details & Insights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-amber-500 text-sm font-medium">
              <Heart className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>Perfect Choice &bull; {currentOption.label}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
              {currentOption.title}
            </h3>

            <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
              {currentOption.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/50">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Recommended Seating
                  </p>
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {currentOption.recommendedSeating}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/50">
                <Tag className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Exclusive Perk
                  </p>
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {currentOption.specialOfferNote}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <AnimatedButton
                variant="primary"
                size="md"
                showArrow
                onClick={handleCta}
              >
                {currentOption.ctaText}
              </AnimatedButton>
              <button
                onClick={() => navigateTo('/menu')}
                className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 hover:text-amber-500 font-medium underline underline-offset-4 cursor-pointer"
              >
                View Full Menu
              </button>
            </div>
          </div>

          {/* Right Column: Suggested Culinary Pairings Cards */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-amber-500" />
              <span>Recommended Dishes for this vibe:</span>
            </p>

            <div className="space-y-2.5">
              {matchingDishes.map((dish) => {
                if (!dish) return null;
                return (
                  <div
                    key={dish.id}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 hover:border-amber-500/40 transition-all group"
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                          {dish.name}
                        </h4>
                        <span className="text-sm font-bold text-amber-500 shrink-0">
                          ₹{dish.price}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                        {dish.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            dish.isVeg
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {dish.isVeg ? 'Veg' : 'Non-Veg'}
                        </span>
                        <button
                          onClick={() => addToCart(dish)}
                          className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer ml-auto"
                        >
                          + Add to Order
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
