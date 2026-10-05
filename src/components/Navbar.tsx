import React, { useState, useEffect } from 'react';
import { useRestaurant, AppRoute } from '../context/RestaurantContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { AnimatedButton } from './AnimatedButton';
import {
  UtensilsCrossed,
  ShoppingBag,
  Sun,
  Moon,
  Menu as MenuIcon,
  X,
  CalendarDays,
  Sparkles,
  Phone,
  Home,
  BookOpen,
  ShieldCheck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentRoute,
    navigateTo,
    isDark,
    toggleTheme,
    cartSummary,
    openCartDrawer,
    openReservationModal,
    openAIChat,
  } = useRestaurant();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; route: AppRoute }[] = [
    { label: 'Home', route: '/' },
    { label: 'Menu', route: '/menu' },
    { label: 'Reservations', route: '/reservation' },
    { label: 'Order Online', route: '/order' },
    { label: 'Offers', route: '/offers' },
    { label: 'Our Story', route: '/about' },
    { label: 'Gallery', route: '/gallery' },
    { label: 'Contact', route: '/contact' },
  ];

  const handleNavClick = (route: AppRoute) => {
    navigateTo(route);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Banner Alert (Operating hours & quick call) */}
      <div className="bg-amber-950/40 border-b border-amber-500/10 text-amber-200/90 text-xs py-1.5 px-4 backdrop-blur-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-sans">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open Today: 08:30 AM – 11:30 PM &bull; Lavelle Road, Bangalore</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigateTo('/offers')}
              className="hover:text-amber-100 underline decoration-amber-500/50 underline-offset-2 transition-colors cursor-pointer"
            >
              Weekend Special: Flat 20% OFF with code <span className="font-semibold text-amber-300">WEEKEND20</span>
            </button>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center gap-1.5 hover:text-amber-100 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{RESTAURANT_INFO.phoneDisplay}</span>
            </a>
            <button
              onClick={() => navigateTo('/admin')}
              className="flex items-center gap-1 text-zinc-400 hover:text-amber-300 transition-colors text-[11px]"
              title="Restaurant Staff Dashboard"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Staff Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0b0c10]/90 dark:bg-[#0b0c10]/95 backdrop-blur-md border-b border-white/10 shadow-xl py-3'
            : 'bg-[#0b0c10]/60 dark:bg-[#0b0c10]/70 backdrop-blur-sm border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center p-0.5 shadow-md shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow">
              <div className="w-full h-full rounded-full bg-[#0b0c10] flex items-center justify-center">
                <UtensilsCrossed className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white dark:text-zinc-100 flex items-center gap-1.5">
                L&apos;Aura
                <span className="text-amber-500 text-sm font-sans font-light tracking-widest uppercase">
                  Bistro
                </span>
              </span>
              <p className="text-[10px] tracking-wider text-amber-400/80 uppercase font-sans font-medium">
                Artisan Roastery & Dining
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Elements */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-zinc-300 hover:text-amber-400 hover:bg-white/5 border border-white/5 transition-colors cursor-pointer"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle dark/light theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-300" />}
            </button>

            {/* Cart Button */}
            <button
              onClick={openCartDrawer}
              className="relative p-2 rounded-full text-zinc-300 hover:text-amber-400 hover:bg-white/5 border border-white/5 transition-colors cursor-pointer"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartSummary.itemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-stone-950 font-bold text-[11px] rounded-full flex items-center justify-center animate-in zoom-in">
                  {cartSummary.itemsCount}
                </span>
              )}
            </button>

            {/* Primary Action Button */}
            <div className="hidden sm:block">
              <AnimatedButton
                variant="primary"
                size="sm"
                showArrow
                onClick={() => openReservationModal()}
              >
                Book a Table
              </AnimatedButton>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/5 lg:hidden cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#111218] border-l border-zinc-800 p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-serif font-bold text-sm">
                    L
                  </div>
                  <span className="font-serif font-bold text-lg text-white">L&apos;Aura Bistro</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-1">
                {navItems.map((item) => {
                  const isActive = currentRoute === item.route;
                  return (
                    <button
                      key={item.route}
                      onClick={() => handleNavClick(item.route)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                        isActive
                          ? 'bg-amber-500/15 text-amber-400 font-semibold border border-amber-500/30'
                          : 'text-zinc-300 hover:bg-zinc-800/60 hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-zinc-800">
                <button
                  onClick={() => {
                    navigateTo('/admin');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-zinc-400 hover:text-amber-400 flex items-center gap-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Restaurant Staff Portal</span>
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-zinc-800">
              <AnimatedButton
                variant="primary"
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openReservationModal();
                }}
              >
                Book a Table
              </AnimatedButton>
              <AnimatedButton
                variant="secondary"
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo('/order');
                }}
              >
                Order Online
              </AnimatedButton>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Dedicated Bottom Dock Navigation (Thumb-Friendly) */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#0e0f14]/95 backdrop-blur-lg border-t border-zinc-800/80 px-2 py-2 flex items-center justify-around md:hidden shadow-2xl">
        <button
          onClick={() => navigateTo('/')}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
            currentRoute === '/' ? 'text-amber-400' : 'text-zinc-400'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => navigateTo('/menu')}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
            currentRoute === '/menu' ? 'text-amber-400' : 'text-zinc-400'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Menu</span>
        </button>

        <button
          onClick={() => navigateTo('/order')}
          className={`relative flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
            currentRoute === '/order' ? 'text-amber-400' : 'text-zinc-400'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Order</span>
          {cartSummary.itemsCount > 0 && (
            <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-amber-500 text-stone-950 font-bold text-[9px] rounded-full flex items-center justify-center">
              {cartSummary.itemsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => openReservationModal()}
          className="flex flex-col items-center gap-1 text-[11px] font-medium text-amber-400"
        >
          <CalendarDays className="w-4 h-4" />
          <span>Book</span>
        </button>

        <button
          onClick={() => openAIChat()}
          className="flex flex-col items-center gap-1 text-[11px] font-medium text-amber-300"
        >
          <Sparkles className="w-4 h-4 animate-bounce" />
          <span>AI Concierge</span>
        </button>
      </nav>
    </>
  );
};
