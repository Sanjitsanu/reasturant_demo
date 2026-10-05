import React, { useState, useMemo } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/restaurantData';
import { MenuCard } from '../components/MenuCard';
import { MenuFilter, FilterTag } from '../components/MenuFilter';
import { useRestaurant } from '../context/RestaurantContext';
import { Sparkles, UtensilsCrossed, AlertCircle, ShoppingBag } from 'lucide-react';

export const MenuPage: React.FC = () => {
  const { openCartDrawer, cartSummary } = useRestaurant();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<FilterTag>('all');

  // Intelligent filtering algorithm supporting keywords like "spicy", "under 300", "under 400", "under 500", "veg", "pizza"
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // 1. Category check
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // 2. Tag filter check
      if (activeFilter === 'veg' && !item.isVeg) return false;
      if (activeFilter === 'non-veg' && item.isVeg) return false;
      if (activeFilter === 'popular' && !item.isPopular) return false;
      if (activeFilter === 'bestseller' && !item.isBestSeller) return false;
      if (activeFilter === 'new' && !item.isNew) return false;
      if (activeFilter === 'chef-special' && !item.isChefSpecial) return false;
      if (activeFilter === 'under-300' && item.price > 300) return false;
      if (activeFilter === 'under-500' && item.price > 500) return false;

      // 3. Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();

        // Price query check e.g. "under 300", "under ₹400", "< 400"
        const priceMatch = q.match(/under\s*(?:₹|rs\.?|inr)?\s*(\d+)/i) || q.match(/<\s*(\d+)/);
        if (priceMatch && priceMatch[1]) {
          const maxPrice = Number(priceMatch[1]);
          if (item.price > maxPrice) return false;
        }

        // Special semantic matches
        if (q.includes('spicy') || q.includes('hot')) {
          if (item.spiceLevel === 0) return false;
        }
        if (q.includes('vegetarian') || q.includes('veg only')) {
          if (!item.isVeg) return false;
        }
        if (q.includes('non veg') || q.includes('meat') || q.includes('chicken') || q.includes('seafood')) {
          if (item.isVeg) return false;
        }

        // Textual matching across name, description, category, dietary notes
        const textToSearch = `${item.name} ${item.description} ${item.category} ${(item.dietaryNotes || []).join(' ')} ${(item.allergens || []).join(' ')}`.toLowerCase();

        // If the query was purely a price filter (like "under 300"), don't filter out by word match
        if (!priceMatch) {
          const words = q.split(' ').filter(Boolean);
          const hasMatch = words.some((w) => textToSearch.includes(w));
          if (!hasMatch) return false;
        }
      }

      return true;
    });
  }, [activeCategory, activeFilter, searchQuery]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-semibold tracking-wider uppercase mb-3 border border-amber-500/20">
          <UtensilsCrossed className="w-3.5 h-3.5" />
          <span>Handcrafted Culinary Menu</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          The Culinary Collection
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          From heirloom 72-hour sourdough Neapolitan pizzas to bronze-cut pastas and single-origin estate roasts. Freshly made with locally sourced organic ingredients.
        </p>
      </div>

      {/* Search and Filters */}
      <MenuFilter
        categories={MENU_CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
        totalFilteredCount={filteredItems.length}
      />

      {/* Dishes Grid */}
      {filteredItems.length === 0 ? (
        <div className="py-20 text-center bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 max-w-xl mx-auto">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
            No dishes found
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto mb-6">
            We couldn&apos;t find any items matching &ldquo;{searchQuery || activeFilter}&rdquo;. Try adjusting your search or resetting filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
              setActiveFilter('all');
            }}
            className="px-6 py-2.5 rounded-full bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400 transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Floating Cart Indicator if items exist */}
      {cartSummary.itemsCount > 0 && (
        <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-30">
          <button
            onClick={openCartDrawer}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold shadow-2xl shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>
              {cartSummary.itemsCount} {cartSummary.itemsCount === 1 ? 'dish' : 'dishes'} in order &bull; ₹{cartSummary.total}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
