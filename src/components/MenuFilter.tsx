import React from 'react';
import { Search, X, Sparkles, Filter, Leaf, Flame, ShieldAlert, Award } from 'lucide-react';
import { MenuCategory } from '../types/restaurant';

export type FilterTag =
  | 'all'
  | 'veg'
  | 'non-veg'
  | 'popular'
  | 'bestseller'
  | 'new'
  | 'under-300'
  | 'under-500'
  | 'chef-special';

interface MenuFilterProps {
  categories: MenuCategory[];
  activeCategory: string;
  onSelectCategory: (catId: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeFilter: FilterTag;
  onSelectFilter: (f: FilterTag) => void;
  totalFilteredCount: number;
}

export const MenuFilter: React.FC<MenuFilterProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  activeFilter,
  onSelectFilter,
  totalFilteredCount,
}) => {
  const filterPills: { id: FilterTag; label: string; icon?: React.ReactNode }[] = [
    { id: 'all', label: 'All Dishes' },
    { id: 'veg', label: 'Veg Only', icon: <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-1" /> },
    { id: 'non-veg', label: 'Non-Veg', icon: <span className="w-2 h-2 rounded-full bg-rose-500 inline-block mr-1" /> },
    { id: 'bestseller', label: 'Best Seller', icon: <Sparkles className="w-3 h-3 inline mr-1 text-amber-400" /> },
    { id: 'popular', label: 'Popular' },
    { id: 'chef-special', label: 'Chef Specials', icon: <Award className="w-3 h-3 inline mr-1 text-purple-400" /> },
    { id: 'under-300', label: 'Under ₹300' },
    { id: 'under-500', label: 'Under ₹500' },
    { id: 'new', label: 'New' },
  ];

  return (
    <div className="space-y-6 mb-10">
      {/* Search Bar with clear button and smart hint */}
      <div className="max-w-2xl mx-auto">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-amber-500 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by dish, ingredient ('truffle', 'spicy', 'under ₹300', 'pizza', 'coffee')..."
            className="w-full pl-12 pr-10 py-3.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 shadow-md transition-all outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 p-1 rounded-full text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Search Tag Suggestions */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2.5 text-xs text-zinc-500 dark:text-zinc-400">
          <span>Try searching:</span>
          {['spicy', 'pizza', 'truffle', 'under ₹300', 'vegetarian', 'coffee', 'dessert'].map((tag) => (
            <button
              key={tag}
              onClick={() => onSearchChange(tag)}
              className="px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 hover:bg-amber-500/20 hover:text-amber-400 transition-colors cursor-pointer text-[11px]"
            >
              &ldquo;{tag}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* Categories Horizontal Scroller */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start lg:justify-center px-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/25 scale-102 font-bold'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/40 hover:text-amber-500'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Filter Tag Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1 border-t border-zinc-200 dark:border-zinc-800/60">
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-amber-500" />
          Filter:
        </span>
        {filterPills.map((pill) => {
          const isSelected = activeFilter === pill.id;
          return (
            <button
              key={pill.id}
              onClick={() => onSelectFilter(pill.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center ${
                isSelected
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm font-semibold'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800'
              }`}
            >
              {pill.icon}
              <span>{pill.label}</span>
            </button>
          );
        })}

        <span className="text-xs text-zinc-500 ml-auto hidden sm:inline">
          Showing <span className="font-semibold text-amber-500">{totalFilteredCount}</span> delicious dishes
        </span>
      </div>
    </div>
  );
};
