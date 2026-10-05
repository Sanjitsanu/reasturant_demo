import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types/restaurant';
import { Camera, X, ZoomIn, Sparkles } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Moments' },
    { id: 'food', label: 'Food & Cuisine' },
    { id: 'interior', label: 'Interior & Veranda' },
    { id: 'drinks', label: 'Roastery & Cocktails' },
    { id: 'chef', label: 'Chef & Brigade' },
    { id: 'events', label: 'Jazz & Dinners' },
  ];

  const filteredGallery =
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-semibold tracking-wider uppercase mb-3 border border-amber-500/20">
          <Camera className="w-3.5 h-3.5" />
          <span>Visual Atmosphere</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          A Glimpse Into L&apos;Aura
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          Explore our sunlit glasshouse patio, candlelit dining rooms, and chef brigade at work.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/25 font-bold'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-amber-500 border border-zinc-200 dark:border-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Photo Grid with Smooth Hover Lift & Zoom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedPhoto(item)}
            className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer shadow-lg bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 hover:-translate-y-1.5 transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            {/* Hover Icon Indicator */}
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-4 h-4" />
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-4 inset-x-4 text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 mb-1 block">
                {item.category}
              </span>
              <h3 className="font-serif font-bold text-base leading-snug line-clamp-1">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-300 line-clamp-2 mt-1 font-light opacity-90">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative flex-1 overflow-hidden max-h-[70vh] bg-black flex items-center justify-center">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <div className="p-6 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-amber-500 tracking-wider">
                  {selectedPhoto.category}
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-0.5">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs text-zinc-300 mt-1 max-w-xl font-light">
                  {selectedPhoto.caption}
                </p>
              </div>

              <span className="text-xs text-zinc-500 hidden sm:block">
                Press Esc or click anywhere outside to close
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
