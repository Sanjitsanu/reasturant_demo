import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { AnimatedButton } from './AnimatedButton';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    closeCartDrawer,
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSummary,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    navigateTo,
  } = useRestaurant();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    if (applyCoupon(couponInput)) {
      setCouponInput('');
    }
  };

  const handleCheckoutClick = () => {
    closeCartDrawer();
    navigateTo('/order');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0f1015] border-l border-zinc-800 shadow-2xl h-full flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/80">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <h3 className="font-serif font-bold text-lg text-white">Your Order</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-semibold">
              {cartSummary.itemsCount} items
            </span>
          </div>

          <button
            onClick={closeCartDrawer}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 text-zinc-600">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-zinc-200 text-lg mb-1">Your cart is empty</h4>
              <p className="text-xs text-zinc-500 max-w-xs mb-6">
                Explore our woodfired pizzas, bronze-cut pastas, and specialty coffees.
              </p>
              <button
                onClick={() => {
                  closeCartDrawer();
                  navigateTo('/menu');
                }}
                className="px-6 py-2.5 rounded-full bg-amber-500 text-stone-950 text-xs font-bold hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {cart.map((ci, idx) => (
                <div
                  key={`${ci.menuItem.id}-${idx}`}
                  className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex gap-3 items-center group"
                >
                  <img
                    src={ci.menuItem.image}
                    alt={ci.menuItem.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-sm font-semibold text-zinc-100 truncate">
                        {ci.menuItem.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(ci.menuItem.id)}
                        className="text-zinc-500 hover:text-rose-400 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Add-ons tag */}
                    {ci.selectedAddOns && ci.selectedAddOns.length > 0 && (
                      <p className="text-[10px] text-amber-400/90 mt-0.5">
                        +{ci.selectedAddOns.map((a) => a.name).join(', ')}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-amber-500">
                        ₹{ci.menuItem.price * ci.quantity}
                      </span>

                      {/* Quantity counter */}
                      <div className="flex items-center gap-2 bg-zinc-800 rounded-full px-2 py-0.5 border border-zinc-700">
                        <button
                          onClick={() => updateQuantity(ci.menuItem.id, -1)}
                          className="text-zinc-400 hover:text-white p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-zinc-100 min-w-[14px] text-center">
                          {ci.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(ci.menuItem.id, 1)}
                          className="text-zinc-400 hover:text-white p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-xs text-zinc-500 hover:text-rose-400 block ml-auto transition-colors"
              >
                Clear all items
              </button>
            </>
          )}
        </div>

        {/* Footer & Checkout Area */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-zinc-800 bg-zinc-950/95 space-y-4">
            {/* Promo Code Form */}
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>
                    Code <strong>{appliedCoupon.code}</strong> applied (-₹{cartSummary.discount})
                  </span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-[11px] underline hover:text-emerald-200"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Promo code (WEEKEND20, AURA15)"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-100 uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>
            )}

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-zinc-800/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-zinc-200 font-medium">₹{cartSummary.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Restaurant Packaging</span>
                <span className="text-zinc-200">₹{cartSummary.packagingFee}</span>
              </div>
              <div className="flex justify-between">
                <span>GST & Restaurant Taxes (5%)</span>
                <span className="text-zinc-200">₹{cartSummary.tax}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="text-zinc-200">
                  {cartSummary.deliveryFee === 0 ? (
                    <span className="text-emerald-400 font-semibold">FREE</span>
                  ) : (
                    `₹${cartSummary.deliveryFee}`
                  )}
                </span>
              </div>
              {cartSummary.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Offer Discount</span>
                  <span>-₹{cartSummary.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-800">
                <span>Total Amount</span>
                <span className="text-amber-400 text-base">₹{cartSummary.total}</span>
              </div>
            </div>

            <AnimatedButton
              variant="primary"
              size="lg"
              showArrow
              className="w-full"
              onClick={handleCheckoutClick}
            >
              Proceed to Order (₹{cartSummary.total})
            </AnimatedButton>
          </div>
        )}
      </div>
    </div>
  );
};
