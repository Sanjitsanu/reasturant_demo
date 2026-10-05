import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useRestaurant } from '../context/RestaurantContext';
import { AnimatedButton } from '../components/AnimatedButton';
import { OrderRequest } from '../types/restaurant';
import { SPECIAL_OFFERS } from '../data/restaurantData';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Tag,
  Clock,
  MapPin,
  Phone,
  User,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Truck,
  Store
} from 'lucide-react';

export const OrderPage: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSummary,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    navigateTo,
    showToast,
  } = useRestaurant();

  const [orderType, setOrderType] = useState<'delivery' | 'takeaway'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [couponInput, setCouponInput] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<OrderRequest | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    if (applyCoupon(couponInput)) {
      setCouponInput('');
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setErrorMsg('Your order cart is empty.');
      return;
    }
    if (!customerName.trim() || !phone.trim()) {
      setErrorMsg('Please provide your name and contact phone number.');
      return;
    }
    if (orderType === 'delivery' && !address.trim()) {
      setErrorMsg('Please enter your complete delivery address.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    try {
      const itemsPayload = cart.map((ci) => ({
        menuItemId: ci.menuItem.id,
        name: ci.menuItem.name,
        price: ci.menuItem.price,
        quantity: ci.quantity,
        selectedAddOns: ci.selectedAddOns,
        notes: ci.notes,
      }));

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderType,
          items: itemsPayload,
          customerName: customerName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          address: orderType === 'delivery' ? address.trim() : 'Pickup from L\'Aura Bistro Lavelle Road',
          deliveryNotes: deliveryNotes.trim(),
          paymentMethod,
          couponCode: appliedCoupon?.code,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to place order.');
      }

      setSubmittedOrder(data.order);
      clearCart();
      showToast('Order received! Kitchen ticket created.', 'success');

      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#10b981', '#fbbf24', '#ffffff'],
        });
      } catch (e) {
        // ignore
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong processing your order.');
    } finally {
      setIsLoading(false);
    }
  };

  // If order placed, show real Order Tracking Screen
  if (submittedOrder) {
    return (
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto min-h-screen">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-center animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Order Transmitted to Kitchen!
          </h2>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Kitchen Status: Ticket Received &bull; Prep Time ~{submittedOrder.estimatedMinutes} mins
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
            Thank you, <strong className="text-zinc-900 dark:text-zinc-100">{submittedOrder.customerName}</strong>! Your order has been registered in the restaurant kitchen display.
          </p>

          {/* Structured Order Summary */}
          <div className="bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 text-left space-y-4 mb-6">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 text-xs">
              <span className="text-zinc-400 font-semibold uppercase">ORDER ID</span>
              <span className="font-mono font-bold text-amber-500 text-sm">
                {submittedOrder.orderNumber}
              </span>
            </div>

            {/* Live Progress Timeline */}
            <div className="py-2">
              <p className="text-xs text-zinc-400 uppercase font-semibold mb-3">Live Progress</p>
              <div className="flex items-center justify-between relative">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-200 dark:bg-zinc-800 -translate-y-1/2 z-0" />
                <div className="flex flex-col items-center gap-1 z-10 bg-zinc-50 dark:bg-zinc-950 px-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-[10px] font-bold text-emerald-500">Received</span>
                </div>

                <div className="flex flex-col items-center gap-1 z-10 bg-zinc-50 dark:bg-zinc-950 px-2">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center text-xs font-bold animate-pulse">
                    2
                  </div>
                  <span className="text-[10px] font-bold text-amber-500">In Kitchen</span>
                </div>

                <div className="flex flex-col items-center gap-1 z-10 bg-zinc-50 dark:bg-zinc-950 px-2">
                  <div className="w-6 h-6 rounded-full bg-zinc-300 dark:bg-zinc-800 text-zinc-500 flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <span className="text-[10px] font-medium text-zinc-400">
                    {submittedOrder.orderType === 'delivery' ? 'Dispatched' : 'Ready'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Order Type:</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200 uppercase">
                  {submittedOrder.orderType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Payment:</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200 uppercase">
                  {submittedOrder.paymentMethod} &bull; {submittedOrder.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Delivery To:</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-right truncate max-w-[240px]">
                  {submittedOrder.address}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-zinc-900 dark:text-white pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <span>Total Paid / Payable:</span>
                <span className="text-amber-500">₹{submittedOrder.total}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigateTo('/menu')}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-semibold bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors"
            >
              Order More Food
            </button>
            <button
              onClick={() => navigateTo('/')}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-semibold bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Checkout &amp; Online Order
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Handcrafted dishes freshly packed in eco-friendly insulated packaging.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 max-w-md mx-auto shadow-lg">
          <ShoppingBag className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
          <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            No items in your order
          </h3>
          <p className="text-xs text-zinc-500 mb-6">
            Choose your favorite woodfired pizzas, pastas, or beverages from our menu first.
          </p>
          <AnimatedButton
            variant="primary"
            showArrow
            onClick={() => navigateTo('/menu')}
          >
            Explore Digital Menu
          </AnimatedButton>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Delivery Type + Customer Form + Payment */}
          <div className="lg:col-span-7 space-y-6">
            {/* Delivery vs Takeaway Switch */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-2 flex gap-2 shadow-sm">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  orderType === 'delivery'
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>Doorstep Delivery (~35 mins)</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  orderType === 'takeaway'
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Takeaway / Curbside (~20 mins)</span>
              </button>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Customer Details Form */}
            <form onSubmit={handleSubmitOrder} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
              <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <User className="w-5 h-5 text-amber-500" />
                <span>Customer &amp; Contact Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Vikram Mehta"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                    Phone Number (for SMS Tracking) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98450 XXXXX"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                  Email Address (for receipt)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              {orderType === 'delivery' && (
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                    Complete Delivery Address *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Building, Flat No, Street, Landmark..."
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                  Delivery Notes / Gate Code
                </label>
                <input
                  type="text"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="e.g. Ring bell twice, leave with security..."
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Payment Methods */}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      paymentMethod === 'upi'
                        ? 'bg-amber-500/15 border-amber-500 text-zinc-900 dark:text-zinc-100 font-bold'
                        : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-amber-500" />
                    <div>
                      <p className="text-xs font-bold">UPI / QR</p>
                      <p className="text-[10px] text-zinc-500">Google Pay, PhonePe, Paytm</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-amber-500/15 border-amber-500 text-zinc-900 dark:text-zinc-100 font-bold'
                        : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-amber-500" />
                    <div>
                      <p className="text-xs font-bold">Credit / Debit Card</p>
                      <p className="text-[10px] text-zinc-500">Visa, Mastercard, Amex</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'bg-amber-500/15 border-amber-500 text-zinc-900 dark:text-zinc-100 font-bold'
                        : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-amber-500" />
                    <div>
                      <p className="text-xs font-bold">Pay on Arrival</p>
                      <p className="text-[10px] text-zinc-500">Cash or Card at Door</p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <AnimatedButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full text-base"
                  isLoading={isLoading}
                  showArrow
                >
                  Place Order &bull; ₹{cartSummary.total}
                </AnimatedButton>
              </div>
            </form>
          </div>

          {/* Right Column: Order Items Summary & Promo Code */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xl space-y-5">
              <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center justify-between">
                <span>Order Summary ({cartSummary.itemsCount} dishes)</span>
                <span className="text-xs text-amber-500 hover:underline cursor-pointer" onClick={() => navigateTo('/menu')}>
                  + Add more
                </span>
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {cart.map((ci) => (
                  <div
                    key={ci.menuItem.id}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60"
                  >
                    <img
                      src={ci.menuItem.image}
                      alt={ci.menuItem.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-bold text-zinc-900 dark:text-zinc-100 truncate">
                        {ci.menuItem.name}
                      </p>
                      <p className="text-zinc-500 dark:text-zinc-400 text-[11px]">
                        ₹{ci.menuItem.price} &times; {ci.quantity}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-700 rounded-full px-2 py-0.5 border border-zinc-200 dark:border-zinc-600">
                      <button
                        type="button"
                        onClick={() => updateQuantity(ci.menuItem.id, -1)}
                        className="text-zinc-400 hover:text-white p-0.5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-zinc-900 dark:text-white px-1">
                        {ci.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(ci.menuItem.id, 1)}
                        className="text-zinc-400 hover:text-white p-0.5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-bold text-amber-500 ml-1">
                      ₹{ci.menuItem.price * ci.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400">
                  <span>
                    Applied <strong>{appliedCoupon.code}</strong> (-₹{cartSummary.discount})
                  </span>
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
                      placeholder="Coupon Code (e.g. WEEKEND20)"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-zinc-100 uppercase tracking-wider focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-800 text-white text-xs font-semibold hover:bg-zinc-800 cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Cost Calculation */}
              <div className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="text-zinc-800 dark:text-zinc-200 font-medium">₹{cartSummary.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Packaging &amp; Eco-Boxes</span>
                  <span className="text-zinc-800 dark:text-zinc-200">₹{cartSummary.packagingFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST &amp; Restaurant Taxes (5%)</span>
                  <span className="text-zinc-800 dark:text-zinc-200">₹{cartSummary.tax}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-zinc-800 dark:text-zinc-200">
                    {cartSummary.deliveryFee === 0 ? (
                      <span className="text-emerald-500 font-semibold">FREE (Above ₹600)</span>
                    ) : (
                      `₹${cartSummary.deliveryFee}`
                    )}
                  </span>
                </div>
                {cartSummary.discount > 0 && (
                  <div className="flex justify-between text-emerald-500 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-₹{cartSummary.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-zinc-900 dark:text-white pt-3 border-t border-zinc-200 dark:border-zinc-800">
                  <span>Total Amount</span>
                  <span className="text-amber-500 text-xl font-bold">₹{cartSummary.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
