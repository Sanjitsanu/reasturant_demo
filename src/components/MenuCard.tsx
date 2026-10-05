import React from 'react';
import { MenuItem } from '../types/restaurant';
import { useRestaurant } from '../context/RestaurantContext';
import { Star, Flame, Clock, Plus, Sparkles, Crown } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const { addToCart, openItemDetail } = useRestaurant();

  return (
    <div className="group relative bg-white dark:bg-zinc-900/90 rounded-3xl border border-zinc-200 dark:border-zinc-800/90 overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
      {/* Image Container with Zoom & Floating Badges */}
      <div
        className="relative h-52 sm:h-56 w-full overflow-hidden bg-zinc-800 cursor-pointer"
        onClick={() => openItemDetail(item)}
      >
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
        />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {item.isBestSeller && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500 text-stone-950 shadow-md">
              <Sparkles className="w-3 h-3" />
              Best Seller
            </span>
          )}
          {item.isChefSpecial && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-purple-600 text-white shadow-md">
              <Crown className="w-3 h-3" />
              Chef Special
            </span>
          )}
          {item.isNew && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500 text-white shadow-md">
              New
            </span>
          )}
        </div>

        {/* Veg / Non-Veg Indicator at Top Right */}
        <div className="absolute top-3 right-3 z-10">
          <div
            className={`w-6 h-6 rounded-md bg-white/95 dark:bg-zinc-950/95 flex items-center justify-center p-1 border shadow-md ${
              item.isVeg ? 'border-emerald-600' : 'border-rose-600'
            }`}
            title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
              }`}
            />
          </div>
        </div>

        {/* Bottom Floating Info over image */}
        <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-xs text-white/90">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-white">{item.rating}</span>
            <span className="text-zinc-300 text-[10px]">({item.reviewsCount})</span>
          </div>

          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md">
            <Clock className="w-3 h-3 text-zinc-300" />
            <span>{item.prepTimeMinutes} mins</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3
              onClick={() => openItemDetail(item)}
              className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-500 transition-colors cursor-pointer line-clamp-1"
            >
              {item.name}
            </h3>

            {/* Spice Level Indicator */}
            {item.spiceLevel > 0 && (
              <div
                className="flex items-center text-rose-500 shrink-0"
                title={`Spice Level: ${item.spiceLevel}/3`}
              >
                {Array.from({ length: item.spiceLevel }).map((_, idx) => (
                  <Flame key={idx} className="w-3.5 h-3.5 fill-rose-500 -ml-1 first:ml-0" />
                ))}
              </div>
            )}
          </div>

          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
            {item.description}
          </p>

          {/* Dietary notes */}
          {item.dietaryNotes && item.dietaryNotes.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {item.dietaryNotes.slice(0, 2).map((note, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium"
                >
                  {note}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Price & CTA Action */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-zinc-400 block font-medium">Price</span>
            <span className="text-lg font-bold text-zinc-900 dark:text-amber-400">
              ₹{item.price}
            </span>
          </div>

          <button
            onClick={() => addToCart(item)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};
