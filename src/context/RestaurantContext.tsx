import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, CartItem, SpecialOffer } from '../types/restaurant';
import { SPECIAL_OFFERS, MENU_ITEMS } from '../data/restaurantData';

export type AppRoute =
  | '/'
  | '/menu'
  | '/about'
  | '/gallery'
  | '/offers'
  | '/reservation'
  | '/order'
  | '/contact'
  | '/admin';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface RestaurantContextType {
  currentRoute: AppRoute;
  navigateTo: (route: AppRoute) => void;
  isDark: boolean;
  toggleTheme: () => void;
  cart: CartItem[];
  addToCart: (item: MenuItem, addOns?: { id: string; name: string; price: number }[], notes?: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  appliedCoupon: SpecialOffer | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  cartSummary: {
    itemsCount: number;
    subtotal: number;
    tax: number;
    packagingFee: number;
    deliveryFee: number;
    discount: number;
    total: number;
  };
  isReservationModalOpen: boolean;
  openReservationModal: (prefill?: Partial<any>) => void;
  closeReservationModal: () => void;
  reservationPrefill: any;
  isAIChatOpen: boolean;
  openAIChat: (initialPrompt?: string) => void;
  closeAIChat: () => void;
  aiInitialPrompt: string;
  isLeadModalOpen: boolean;
  openLeadModal: (reason?: string) => void;
  closeLeadModal: () => void;
  leadPrefillReason: string;
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  selectedItemDetail: MenuItem | null;
  openItemDetail: (item: MenuItem) => void;
  closeItemDetail: () => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export function RestaurantProvider({ children }: { children: React.ReactNode }) {
  // Theme: default dark for luxury restaurant atmosphere
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('laura_theme');
      if (saved) return saved === 'dark';
      return true; // Default dark
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.remove('bg-stone-50', 'text-stone-900');
      document.body.classList.add('bg-[#0b0c10]', 'text-zinc-100');
      localStorage.setItem('laura_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-[#0b0c10]', 'text-zinc-100');
      document.body.classList.add('bg-stone-50', 'text-stone-900');
      localStorage.setItem('laura_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Routing
  const getInitialRoute = (): AppRoute => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname as AppRoute;
      const validRoutes: AppRoute[] = [
        '/',
        '/menu',
        '/about',
        '/gallery',
        '/offers',
        '/reservation',
        '/order',
        '/contact',
        '/admin',
      ];
      if (validRoutes.includes(path)) return path;
    }
    return '/';
  };

  const [currentRoute, setCurrentRoute] = useState<AppRoute>(getInitialRoute);

  const navigateTo = (route: AppRoute) => {
    setCurrentRoute(route);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname as AppRoute;
      setCurrentRoute(path || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('laura_cart');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<SpecialOffer | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('laura_cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (
    item: MenuItem,
    addOns: { id: string; name: string; price: number }[] = [],
    notes?: string
  ) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (ci) =>
          ci.menuItem.id === item.id &&
          JSON.stringify(ci.selectedAddOns) === JSON.stringify(addOns)
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [...prev, { menuItem: item, quantity: 1, selectedAddOns: addOns, notes }];
    });
    showToast(`Added ${item.name} to order`, 'success');
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((ci) => {
          if (ci.menuItem.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.menuItem.id !== itemId));
    showToast('Item removed from order', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    const match = SPECIAL_OFFERS.find((o) => o.code === clean);
    if (!match) {
      showToast('Invalid or expired promo code', 'error');
      return false;
    }
    setAppliedCoupon(match);
    showToast(`Applied ${match.code}: ${match.title}`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promo code removed', 'info');
  };

  // Cart Totals
  const itemsCount = cart.reduce((acc, ci) => acc + ci.quantity, 0);
  const subtotal = cart.reduce((acc, ci) => {
    const addOnTotal = ci.selectedAddOns.reduce((sum, ao) => sum + ao.price, 0);
    return acc + (ci.menuItem.price + addOnTotal) * ci.quantity;
  }, 0);

  const packagingFee = itemsCount > 0 ? 25 : 0;
  const tax = Math.round(subtotal * 0.05 * 100) / 100;
  const deliveryFee = subtotal > 600 || itemsCount === 0 ? 0 : 40;

  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrder) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      if (appliedCoupon.maxDiscount && discount > appliedCoupon.maxDiscount) {
        discount = appliedCoupon.maxDiscount;
      }
    } else {
      discount = appliedCoupon.discountValue;
    }
  }

  const total = Math.max(0, subtotal + packagingFee + tax + deliveryFee - discount);

  // Modals & Drawers
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [reservationPrefill, setReservationPrefill] = useState<any>(null);

  const openReservationModal = (prefill?: any) => {
    setReservationPrefill(prefill || null);
    setIsReservationModalOpen(true);
  };
  const closeReservationModal = () => setIsReservationModalOpen(false);

  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState('');

  const openAIChat = (prompt?: string) => {
    if (prompt) setAiInitialPrompt(prompt);
    setIsAIChatOpen(true);
  };
  const closeAIChat = () => {
    setIsAIChatOpen(false);
    setAiInitialPrompt('');
  };

  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadPrefillReason, setLeadPrefillReason] = useState('');

  const openLeadModal = (reason?: string) => {
    setLeadPrefillReason(reason || 'Need help deciding table or customized dining?');
    setIsLeadModalOpen(true);
  };
  const closeLeadModal = () => setIsLeadModalOpen(false);

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const [selectedItemDetail, setSelectedItemDetail] = useState<MenuItem | null>(null);
  const openItemDetail = (item: MenuItem) => setSelectedItemDetail(item);
  const closeItemDetail = () => setSelectedItemDetail(null);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <RestaurantContext.Provider
      value={{
        currentRoute,
        navigateTo,
        isDark,
        toggleTheme,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartSummary: {
          itemsCount,
          subtotal,
          tax,
          packagingFee,
          deliveryFee,
          discount,
          total,
        },
        isReservationModalOpen,
        openReservationModal,
        closeReservationModal,
        reservationPrefill,
        isAIChatOpen,
        openAIChat,
        closeAIChat,
        aiInitialPrompt,
        isLeadModalOpen,
        openLeadModal,
        closeLeadModal,
        leadPrefillReason,
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        selectedItemDetail,
        openItemDetail,
        closeItemDetail,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
}
