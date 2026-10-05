import React, { useState } from 'react';
import { SPECIAL_OFFERS } from '../data/restaurantData';
import { useRestaurant } from '../context/RestaurantContext';
import { AnimatedButton } from '../components/AnimatedButton';
import { Tag, Copy, Check, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

export const OffersPage: React.FC = () => {
  const { applyCoupon, navigateTo, openReservationModal, showToast } = useRestaurant();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    applyCoupon(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const handleClaim = (offer: typeof SPECIAL_OFFERS[0]) => {
    applyCoupon(offer.code);
    if (offer.code === 'ROMANCE') {
      openReservationModal({ occasion: 'Date Night' });
    } else {
      navigateTo('/order');
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-semibold tracking-wider uppercase mb-3 border border-amber-500/20">
          <Tag className="w-3.5 h-3.5" />
          <span>Curated Privileges</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Special Dining Offers
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          Celebrate memorable lunches, weekend wine dinners, and weekday coffee rituals with our seasonal privileges.
        </p>
      </div>

      {/* Offers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SPECIAL_OFFERS.map((offer) => (
          <div
            key={offer.id}
            className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xl flex flex-col justify-between group hover:border-amber-500/40 transition-all duration-300"
          >
            {/* Banner Image */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={offer.bannerImage}
                alt={offer.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-stone-950 shadow-md">
                {offer.badge}
              </span>
              <span className="absolute bottom-4 right-4 text-xs font-semibold text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full">
                Valid: {offer.validDays}
              </span>
            </div>

            {/* Offer Body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                  {offer.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                  {offer.subtitle}
                </p>

                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">Terms: </span>
                  {offer.terms}
                </div>
              </div>

              {/* Action & Code Bar */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500 uppercase font-semibold">Promo Code:</span>
                  <button
                    onClick={() => handleCopy(offer.code)}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-500 dark:text-amber-400 font-mono font-bold text-xs flex items-center gap-1.5 hover:bg-amber-500/25 transition-colors cursor-pointer"
                    title="Click to copy promo code"
                  >
                    <span>{offer.code}</span>
                    {copiedCode === offer.code ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <AnimatedButton
                  variant="primary"
                  size="sm"
                  showArrow
                  onClick={() => handleClaim(offer)}
                >
                  {offer.code === 'ROMANCE' ? 'Reserve with Offer' : 'Claim & Order'}
                </AnimatedButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
