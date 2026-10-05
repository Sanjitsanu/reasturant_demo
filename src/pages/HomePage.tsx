import React from 'react';
import { Hero } from '../components/Hero';
import { DecisionFlow } from '../components/DecisionFlow';
import { BestSellers } from '../components/BestSellers';
import { ReviewsSection } from '../components/ReviewsSection';
import { AnimatedButton } from '../components/AnimatedButton';
import { useRestaurant } from '../context/RestaurantContext';
import { SPECIAL_OFFERS, RESTAURANT_INFO } from '../data/restaurantData';
import {
  Sparkles,
  ArrowRight,
  Clock,
  Car,
  MapPin,
  Tag,
  ChefHat,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo, openReservationModal, openLeadModal, applyCoupon } = useRestaurant();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    applyCoupon(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="space-y-4">
      {/* 1. Visually Powerful Hero Section */}
      <Hero />

      {/* 2. Decision-Based Customer Flow ("What are you looking for?") */}
      <DecisionFlow />

      {/* 3. Best Sellers Section */}
      <BestSellers />

      {/* 4. Featured Offers Banner Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-semibold uppercase tracking-wider mb-2">
              <Tag className="w-3.5 h-3.5" />
              <span>Special Privileges</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
              Limited-Time Offers
            </h2>
          </div>

          <button
            onClick={() => navigateTo('/offers')}
            className="text-xs sm:text-sm text-amber-500 hover:text-amber-400 font-semibold underline underline-offset-4 mt-3 sm:mt-0 cursor-pointer"
          >
            View All Offers &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SPECIAL_OFFERS.slice(0, 2).map((offer) => (
            <div
              key={offer.id}
              className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between shadow-lg group hover:border-amber-500/40 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={offer.bannerImage}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-stone-950 shadow-md">
                  {offer.badge}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    {offer.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                    {offer.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500 uppercase font-semibold">Code:</span>
                    <button
                      onClick={() => handleCopyCode(offer.code)}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-500 dark:text-amber-400 font-mono font-bold text-xs flex items-center gap-1.5 hover:bg-amber-500/25 transition-colors cursor-pointer"
                      title="Click to copy & apply"
                    >
                      <span>{offer.code}</span>
                      {copiedCode === offer.code ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      applyCoupon(offer.code);
                      navigateTo('/order');
                    }}
                    className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                  >
                    Claim &amp; Order &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Chef Story & Philosophy Teaser */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1000&auto=format&fit=crop&q=80"
                alt="Executive Chef Julian Vane crafting artisanal plates"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block mb-1">
                  Executive Chef &amp; Co-Founder
                </span>
                <p className="font-serif text-2xl font-bold">Julian Vane</p>
                <p className="text-xs text-zinc-300">Formerly of Osteria Francescana &amp; Le Gavroche</p>
              </div>
            </div>

            {/* Floating Trust Card */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-xl max-w-xs hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-serif font-bold text-lg">
                  72
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">72-Hour Fermentation</p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Heirloom grain sourdough dough</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-semibold uppercase tracking-wider">
              <ChefHat className="w-3.5 h-3.5" />
              <span>Artisan Heritage</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
              Honoring Tradition, Reimagined With Modern Precision
            </h2>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
              At L&apos;Aura Bistro, we believe true luxury lies in patience and provenance. From hand-kneading bronze-cut pasta dough fresh every dawn to roasting single-origin Arabica micro-lots from Chikmagalur estates, every plate tells a story of relentless devotion to flavor.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="border-l-2 border-amber-500 pl-4">
                <span className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100">100%</span>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Farm-to-table organic microgreens &amp; herbs</p>
              </div>

              <div className="border-l-2 border-amber-500 pl-4">
                <span className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100">Zero</span>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Artificial stabilizers, colors, or preservatives</p>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <AnimatedButton
                variant="primary"
                showArrow
                onClick={() => navigateTo('/about')}
              >
                Read Our Story
              </AnimatedButton>
              <button
                onClick={() => openReservationModal()}
                className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-amber-500 cursor-pointer"
              >
                Reserve a Table &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Lead Capture Banner ("Planning a special celebration or event?") */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-amber-600/20 via-amber-500/10 to-transparent border border-amber-500/30 p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs uppercase font-bold text-amber-500 tracking-widest flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              <span>Event &amp; Private Dining Concierge</span>
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
              Planning a Birthday, Anniversary, or Private Event?
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
              Let our dedicated hospitality team customize your table decor, curated tasting menus, and wine pairings.
            </p>
            <div className="pt-2">
              <AnimatedButton
                variant="primary"
                size="md"
                showArrow
                onClick={() => openLeadModal('Private celebration & custom menu inquiry')}
              >
                Request Concierge Call
              </AnimatedButton>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Reviews Carousel Section */}
      <ReviewsSection />

      {/* 8. Location & Valet Parking teaser */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-xl">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-xl text-zinc-900 dark:text-zinc-100">Our Location</h4>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {RESTAURANT_INFO.address}, {RESTAURANT_INFO.locality}, Bangalore
            </p>
            <p className="text-xs text-amber-500 font-medium">
              Near MG Road Metro &bull; 6 min walk
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-xl text-zinc-900 dark:text-zinc-100">Dining Timings</h4>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Mon &ndash; Thu: 08:30 AM &ndash; 11:30 PM<br />
              Fri &ndash; Sun: 08:30 AM &ndash; 01:00 AM
            </p>
            <p className="text-xs text-zinc-500">
              Kitchen closes 45 mins prior to closing.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center">
              <Car className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-xl text-zinc-900 dark:text-zinc-100">Valet &amp; Parking</h4>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {RESTAURANT_INFO.parking}
            </p>
            <AnimatedButton
              variant="outline"
              size="sm"
              onClick={() => navigateTo('/contact')}
            >
              Get Directions
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  );
};
