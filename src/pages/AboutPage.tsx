import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { AnimatedButton } from '../components/AnimatedButton';
import {
  ChefHat,
  Award,
  Sparkles,
  Coffee,
  Heart,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { openReservationModal } = useRestaurant();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen space-y-24">
      {/* 1. Hero Split Story */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-semibold tracking-wider uppercase border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Journey</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
            The Philosophy of Pure Culinary Sincerity
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
            Founded in 2014 by Executive Chef Julian Vane and Master Coffee Roaster Maya Sen, L&apos;Aura Bistro was conceived with a singular devotion: bringing together honest European bistro traditions, woodfired stone ovens, and estate-direct micro-lot coffees under one roof.
          </p>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
            We reject mass shortcuts. Every batch of Neapolitan pizza dough ferments slowly for 72 hours using heirloom Italian flours. Bronze-cut pastas are rolled fresh each morning with organic free-range eggs. Our single-origin Arabica beans are cupped and roasted weekly to highlight crisp floral and honeyed notes.
          </p>

          <div className="pt-2">
            <AnimatedButton
              variant="primary"
              size="lg"
              showArrow
              onClick={() => openReservationModal()}
            >
              Reserve a Table
            </AnimatedButton>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80"
              alt="L'Aura Bistro Glasshouse and Dining Room"
              className="w-full h-[460px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. Key Pillars & Numbers */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-y border-zinc-200 dark:border-zinc-800 py-12">
        <div className="space-y-1">
          <span className="font-serif text-4xl sm:text-5xl font-bold text-amber-500">12+</span>
          <p className="text-xs uppercase font-semibold text-zinc-500 tracking-wider">Years of Culinary Craft</p>
        </div>

        <div className="space-y-1">
          <span className="font-serif text-4xl sm:text-5xl font-bold text-amber-500">72-Hr</span>
          <p className="text-xs uppercase font-semibold text-zinc-500 tracking-wider">Sourdough Fermentation</p>
        </div>

        <div className="space-y-1">
          <span className="font-serif text-4xl sm:text-5xl font-bold text-amber-500">140k+</span>
          <p className="text-xs uppercase font-semibold text-zinc-500 tracking-wider">Delighted Diners</p>
        </div>

        <div className="space-y-1">
          <span className="font-serif text-4xl sm:text-5xl font-bold text-amber-500">4.9★</span>
          <p className="text-xs uppercase font-semibold text-zinc-500 tracking-wider">Michelin Recommended</p>
        </div>
      </section>

      {/* 3. The Founders & Leadership */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase font-bold text-amber-500 tracking-widest block mb-2">
            The Artisans Behind The Plate
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            Meet Our Culinary Leaders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Chef Julian */}
          <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xl flex flex-col sm:flex-row">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&auto=format&fit=crop&q=80"
              alt="Executive Chef Julian Vane"
              className="w-full sm:w-48 h-64 sm:h-auto object-cover"
            />
            <div className="p-6 flex-1 space-y-2">
              <span className="text-xs uppercase text-amber-500 font-bold tracking-wider">Executive Chef</span>
              <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100">Julian Vane</h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                Trained in Modena and Paris with over 18 years of kitchen leadership. Julian curates our seasonal tasting menus, woodfired pizzas, and signature lamb shanks.
              </p>
            </div>
          </div>

          {/* Maya Sen */}
          <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xl flex flex-col sm:flex-row">
            <img
              src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=600&auto=format&fit=crop&q=80"
              alt="Head of Coffee Maya Sen"
              className="w-full sm:w-48 h-64 sm:h-auto object-cover"
            />
            <div className="p-6 flex-1 space-y-2">
              <span className="text-xs uppercase text-amber-500 font-bold tracking-wider">Head of Roastery</span>
              <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100">Maya Sen</h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                Q-Grader and two-time National Barista judge. Maya directly partners with shade-grown estate farmers in Chikmagalur and Yirgacheffe to curate our single-origin lots.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
