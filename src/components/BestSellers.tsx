import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuCard } from './MenuCard';
import { AnimatedButton } from './AnimatedButton';
import { Sparkles, ArrowRight } from 'lucide-react';

export const BestSellers: React.FC = () => {
  const { navigateTo } = useRestaurant();

  // Pick top rated and bestseller dishes
  const bestSellers = MENU_ITEMS.filter((item) => item.isBestSeller).slice(0, 4);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-semibold tracking-wider uppercase mb-3 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer Favorites</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Best Sellers &amp; Signatures
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl">
            Our most requested culinary creations, prepared from heirloom recipes with our 72-hour sourdough and estate roasts.
          </p>
        </div>

        <div className="mt-6 md:mt-0">
          <AnimatedButton
            variant="outline"
            size="md"
            showArrow
            onClick={() => navigateTo('/menu')}
          >
            Explore Full Menu
          </AnimatedButton>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bestSellers.map((dish) => (
          <MenuCard key={dish.id} item={dish} />
        ))}
      </div>
    </section>
  );
};
