import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem } from '../types/restaurant';
import { AnimatedButton } from './AnimatedButton';
import {
  X,
  Star,
  Clock,
  Flame,
  Plus,
  Minus,
  Check,
  Sparkles,
  Info,
  ShieldCheck
} from 'lucide-react';

export const ItemDetailModal: React.FC = () => {
  const { selectedItemDetail, closeItemDetail, addToCart } = useRestaurant();

  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<{ id: string; name: string; price: number }[]>([]);
  const [cookingNotes, setCookingNotes] = useState('');

  if (!selectedItemDetail) return null;

  const item = selectedItemDetail;

  const toggleAddOn = (addOn: { id: string; name: string; price: number }) => {
    setSelectedAddOns((prev) => {
      const exists = prev.some((a) => a.id === addOn.id);
      if (exists) {
        return prev.filter((a) => a.id !== addOn.id);
      }
      return [...prev, addOn];
    });
  };

  const addOnTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const singleItemTotal = item.price + addOnTotal;
  const totalPrice = singleItemTotal * quantity;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(item, selectedAddOns, cookingNotes);
    }
    closeItemDetail();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0f1015] border border-zinc-800 shadow-2xl text-zinc-100 flex flex-col justify-between">
        {/* Close Button */}
        <button
          onClick={closeItemDetail}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 backdrop-blur-md text-zinc-300 hover:text-white hover:bg-black/90 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 w-full bg-zinc-900 overflow-hidden shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1015] via-transparent to-transparent" />

          {/* Badges on image */}
          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                item.isVeg
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              }`}
            >
              {item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            </span>

            {item.spiceLevel > 0 && (
              <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300">
                <Flame className="w-3.5 h-3.5 fill-rose-500" />
                Spice: {item.spiceLevel}/3
              </span>
            )}

            <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-black/60 text-amber-400 border border-amber-500/30">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              {item.rating} ({item.reviewsCount} reviews)
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-serif text-2xl font-bold text-white">{item.name}</h3>
              <span className="text-2xl font-bold text-amber-500">₹{item.price}</span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed mt-2.5">{item.description}</p>
          </div>

          {/* Dietary Notes & Allergens */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-zinc-500 block mb-1 font-semibold uppercase tracking-wider text-[10px]">
                Preparation Time
              </span>
              <span className="text-zinc-200 font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {item.prepTimeMinutes} minutes
              </span>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-zinc-500 block mb-1 font-semibold uppercase tracking-wider text-[10px]">
                Nutrition & Calories
              </span>
              <span className="text-zinc-200 font-medium">
                {item.calories ? `~${item.calories} kcal` : 'Freshly Prepared'}
              </span>
            </div>
          </div>

          {item.allergens && item.allergens.length > 0 && (
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Contains allergens: {item.allergens.join(', ')}</span>
            </div>
          )}

          {/* Customizable Add-Ons */}
          {item.customizableAddOns && item.customizableAddOns.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
                Customize with Add-Ons
              </h4>
              <div className="space-y-2">
                {item.customizableAddOns.map((addon) => {
                  const isChecked = selectedAddOns.some((a) => a.id === addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddOn(addon)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                        isChecked
                          ? 'bg-amber-500/15 border-amber-500 text-white'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isChecked
                              ? 'bg-amber-500 border-amber-400 text-stone-950'
                              : 'border-zinc-700'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>{addon.name}</span>
                      </div>
                      <span className="text-amber-400 font-semibold">+₹{addon.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Cooking instructions input */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
              Cooking Notes for Chef
            </label>
            <input
              type="text"
              value={cookingNotes}
              onChange={(e) => setCookingNotes(e.target.value)}
              placeholder="e.g. Less spicy, dressing on the side, no onion..."
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-500 focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-6 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between gap-4">
          {/* Quantity Counter */}
          <div className="flex items-center gap-3 bg-zinc-900 rounded-full px-3 py-1.5 border border-zinc-800">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="text-zinc-400 hover:text-white p-1"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold text-sm min-w-[20px] text-center">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="text-zinc-400 hover:text-white p-1"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <AnimatedButton
            variant="primary"
            size="md"
            className="flex-1"
            onClick={handleAddToCart}
          >
            Add to Order &bull; ₹{totalPrice}
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};
