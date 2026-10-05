import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { ReservationFlow } from './ReservationFlow';
import { X, UtensilsCrossed } from 'lucide-react';

export const ReservationModal: React.FC = () => {
  const { isReservationModalOpen, closeReservationModal, reservationPrefill } = useRestaurant();

  if (!isReservationModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0f1015] border border-zinc-800 shadow-2xl p-4 sm:p-6">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white">Book Your Table</h3>
              <p className="text-xs text-zinc-400">
                L&apos;Aura Bistro &bull; Lavelle Road, Bangalore
              </p>
            </div>
          </div>

          <button
            onClick={closeReservationModal}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The booking flow */}
        <ReservationFlow
          isModal
          prefillOccasion={reservationPrefill?.occasion}
          onSuccess={() => {
            // keep open on confirmation ticket
          }}
        />
      </div>
    </div>
  );
};
