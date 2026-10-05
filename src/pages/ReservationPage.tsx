import React from 'react';
import { ReservationFlow } from '../components/ReservationFlow';
import { RESTAURANT_INFO } from '../data/restaurantData';
import {
  CalendarDays,
  Clock,
  Car,
  Wine,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const ReservationPage: React.FC = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-semibold tracking-wider uppercase mb-3 border border-amber-500/20">
          <CalendarDays className="w-3.5 h-3.5" />
          <span>Table Bookings</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Reserve Your Dining Experience
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          From intimate candlelight dinners to weekend gatherings on our lush glasshouse veranda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Multi-step booking form */}
        <div className="lg:col-span-7">
          <ReservationFlow />
        </div>

        {/* Right Column: Seating Atmospheres & Policies */}
        <div className="lg:col-span-5 space-y-6">
          {/* Seating Ambiance Preview Cards */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Distinct Dining Ambiance</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 flex gap-3">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&auto=format&fit=crop&q=80"
                  alt="Glasshouse Patio"
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Glasshouse Patio</h4>
                  <p className="text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Lush botanical greenery, natural breeze, ambient evening bistro lights.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 flex gap-3">
                <img
                  src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=200&auto=format&fit=crop&q=80"
                  alt="Candlelight Alcove"
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Candlelight Alcove</h4>
                  <p className="text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Romantic secluded corner with warm acoustic jazz and tailored dessert treats.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 flex gap-3">
                <img
                  src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=200&auto=format&fit=crop&q=80"
                  alt="Chef Tasting Counter"
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Chef Tasting Counter</h4>
                  <p className="text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Front-row seat to the culinary brigade plating hand-rolled pastas and woodfired sourdough.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dining Policies & Valet Information */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Dining Etiquette &amp; Policies</span>
            </h3>

            <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Grace Period:</strong> Tables are held for 15 minutes past the reserved time before releasing to walk-in guests.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Complimentary Valet:</strong> Dedicated valet drivers will welcome and park your vehicle at our main boulevard entrance.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Dietary Requirements:</strong> Our culinary team accommodates vegetarian, vegan, gluten-free, and nut-allergy requests with prior note.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Confirmation:</strong> Our reservation manager confirms table requests via WhatsApp/SMS within 15 minutes.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
