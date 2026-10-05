import React, { useState, useEffect } from 'react';
import { ReservationRequest, OrderRequest, LeadInquiry, ContactMessage } from '../types/restaurant';
import { useRestaurant } from '../context/RestaurantContext';
import {
  ShieldCheck,
  Calendar,
  ShoppingBag,
  Users,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  Phone,
  RefreshCw,
  Send,
  Bell
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { showToast } = useRestaurant();

  const [activeTab, setActiveTab] = useState<'reservations' | 'orders' | 'leads' | 'automation'>('reservations');
  const [reservations, setReservations] = useState<ReservationRequest[]>([]);
  const [orders, setOrders] = useState<OrderRequest[]>([]);
  const [leads, setLeads] = useState<LeadInquiry[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [resR, ordR, leadR, cntR] = await Promise.all([
        fetch('/api/reservations'),
        fetch('/api/orders'),
        fetch('/api/leads'),
        fetch('/api/contact'),
      ]);

      if (resR.ok) setReservations(await resR.json());
      if (ordR.ok) setOrders(await ordR.json());
      if (leadR.ok) setLeads(await leadR.json());
      if (cntR.ok) setContacts(await cntR.json());
    } catch (e) {
      console.error('Error fetching admin data', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateReservationStatus = async (id: string, status: 'confirmed' | 'cancelled' | 'pending') => {
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setReservations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status } : r))
        );
        showToast(`Reservation marked as ${status}`, 'success');
      }
    } catch (e) {
      showToast('Failed to update reservation', 'error');
    }
  };

  const updateOrderStatus = async (id: string, orderStatus: any) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, orderStatus } : o))
        );
        showToast(`Order status updated to ${orderStatus}`, 'success');
      }
    } catch (e) {
      showToast('Failed to update order status', 'error');
    }
  };

  const pendingCount = reservations.filter((r) => r.status === 'pending').length;
  const activeOrdersCount = orders.filter((o) => o.orderStatus !== 'completed').length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-amber-500 text-xs font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Management &amp; Host Control</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            L&apos;Aura Operations Dashboard
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Real-time feed of table bookings, kitchen orders, concierge leads, and automation dispatch.
          </p>
        </div>

        <button
          onClick={fetchData}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors w-fit"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Pending Bookings</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-serif text-2xl font-bold text-amber-500">{pendingCount}</span>
            <span className="text-[11px] text-zinc-400">awaiting confirmation</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Active Kitchen Orders</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-serif text-2xl font-bold text-emerald-500">{activeOrdersCount}</span>
            <span className="text-[11px] text-zinc-400">in preparation/dispatch</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Orders Revenue</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              ₹{totalRevenue.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Concierge Leads</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-serif text-2xl font-bold text-purple-500">{leads.length}</span>
            <span className="text-[11px] text-zinc-400">event &amp; VIP inquiries</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('reservations')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'reservations'
              ? 'bg-amber-500 text-stone-950 shadow-md'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Reservations ({reservations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-amber-500 text-stone-950 shadow-md'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Kitchen Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('leads')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'leads'
              ? 'bg-amber-500 text-stone-950 shadow-md'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Leads &amp; Inquiries ({leads.length + contacts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('automation')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'automation'
              ? 'bg-amber-500 text-stone-950 shadow-md'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Automations &amp; Webhooks</span>
        </button>
      </div>

      {/* TAB 1: Reservations Table */}
      {activeTab === 'reservations' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-950/70 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Ref #</th>
                  <th className="py-3 px-4">Guest</th>
                  <th className="py-3 px-4">Date &amp; Time</th>
                  <th className="py-3 px-4">Party &amp; Area</th>
                  <th className="py-3 px-4">Occasion &amp; Notes</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {reservations.map((res) => (
                  <tr key={res.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-500">
                      {res.referenceNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-zinc-900 dark:text-zinc-100">{res.customerName}</p>
                      <p className="text-[11px] text-zinc-500">{res.phone}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-zinc-800 dark:text-zinc-200">{res.date}</p>
                      <p className="text-[11px] text-zinc-500">{res.time}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-medium text-zinc-800 dark:text-zinc-200">{res.guests} Guests</p>
                      <p className="text-[11px] text-zinc-500 capitalize">{res.seatingArea}</p>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <span className="font-medium text-zinc-800 dark:text-zinc-200">{res.occasion}</span>
                      {res.specialRequests && (
                        <p className="text-[11px] text-zinc-500 truncate" title={res.specialRequests}>
                          {res.specialRequests}
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          res.status === 'confirmed'
                            ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30'
                            : res.status === 'cancelled'
                            ? 'bg-rose-500/15 text-rose-500 border border-rose-500/30'
                            : 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                        }`}
                      >
                        {res.status === 'pending' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />}
                        {res.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      {res.status === 'pending' && (
                        <button
                          onClick={() => updateReservationStatus(res.id, 'confirmed')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500 text-emerald-600 dark:text-emerald-400 hover:text-white font-semibold transition-colors cursor-pointer"
                        >
                          Confirm
                        </button>
                      )}
                      {res.status !== 'cancelled' && (
                        <button
                          onClick={() => updateReservationStatus(res.id, 'cancelled')}
                          className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white font-semibold transition-colors cursor-pointer"
                        >
                          Decline
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Kitchen Orders */}
      {activeTab === 'orders' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-lg space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                <span className="font-mono font-bold text-amber-500 text-sm">
                  {ord.orderNumber}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    ord.orderStatus === 'completed'
                      ? 'bg-emerald-500/15 text-emerald-500'
                      : ord.orderStatus === 'kitchen'
                      ? 'bg-amber-500/15 text-amber-500'
                      : 'bg-purple-500/15 text-purple-500'
                  }`}
                >
                  {ord.orderStatus.replace('_', ' ')}
                </span>
              </div>

              <div className="text-xs space-y-1">
                <p className="font-bold text-zinc-900 dark:text-zinc-100">{ord.customerName}</p>
                <p className="text-zinc-500">{ord.phone} &bull; {ord.orderType}</p>
                {ord.address && (
                  <p className="text-zinc-400 text-[11px] truncate">{ord.address}</p>
                )}
              </div>

              {/* Items List */}
              <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                {ord.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="text-zinc-700 dark:text-zinc-300">
                      {it.quantity} &times; {it.name}
                    </span>
                    <span className="text-zinc-500">₹{it.price * it.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800 text-xs font-bold">
                <span>Total: ₹{ord.total}</span>
                <span className="text-amber-500 uppercase">{ord.paymentMethod}</span>
              </div>

              {/* Status Stepper Actions */}
              <div className="pt-2 flex gap-2">
                {ord.orderStatus === 'received' && (
                  <button
                    onClick={() => updateOrderStatus(ord.id, 'kitchen')}
                    className="w-full py-1.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400 transition-colors"
                  >
                    Start Cooking &rarr;
                  </button>
                )}
                {ord.orderStatus === 'kitchen' && (
                  <button
                    onClick={() => updateOrderStatus(ord.id, 'out_for_delivery')}
                    className="w-full py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 transition-colors"
                  >
                    Dispatch / Ready &rarr;
                  </button>
                )}
                {ord.orderStatus === 'out_for_delivery' && (
                  <button
                    onClick={() => updateOrderStatus(ord.id, 'completed')}
                    className="w-full py-1.5 rounded-xl bg-emerald-500 text-stone-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
                  >
                    Mark Delivered / Completed ✓
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Leads & Contact Messages */}
      {activeTab === 'leads' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Concierge Leads */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-500" />
              <span>Event &amp; Table Concierge Leads ({leads.length})</span>
            </h3>

            <div className="space-y-3">
              {leads.map((ld) => (
                <div key={ld.id} className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">{ld.name}</span>
                    <a href={`tel:${ld.phone}`} className="text-amber-500 font-semibold hover:underline">
                      {ld.phone}
                    </a>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400">{ld.requirement}</p>
                  {(ld.preferredDate || ld.preferredTime) && (
                    <p className="text-zinc-500 text-[11px]">
                      Preferred: {ld.preferredDate} at {ld.preferredTime}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Inquiries */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-500" />
              <span>General Inquiries ({contacts.length})</span>
            </h3>

            <div className="space-y-3">
              {contacts.map((c) => (
                <div key={c.id} className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">{c.name}</span>
                    <span className="text-zinc-400 text-[10px]">{c.createdAt.split('T')[0]}</span>
                  </div>
                  <p className="font-semibold text-amber-500 text-[11px]">{c.subject}</p>
                  <p className="text-zinc-600 dark:text-zinc-400">{c.message}</p>
                  <p className="text-zinc-500 text-[10px] pt-1">
                    Contact: {c.phone || c.email}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Automation Architecture & Webhooks */}
      {activeTab === 'automation' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-2 text-amber-500 text-xs font-semibold uppercase tracking-wider">
            <Bell className="w-4 h-4" />
            <span>Architecture &amp; Webhook Triggers</span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Multi-Channel Restaurant Notification Pipeline
          </h3>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
            When a customer reserves a table or submits an order through the website or AIRA AI assistant, the backend registers the record and dispatches real-time automated webhooks:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 space-y-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                1. WhatsApp Webhook
              </h4>
              <p className="text-xs text-zinc-500">
                Sends automated booking request summary to restaurant manager phone &amp; sends &ldquo;Awaiting Confirmation&rdquo; status to customer.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 space-y-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                2. SMS Gateway
              </h4>
              <p className="text-xs text-zinc-500">
                Transmits 6-digit Reference Code and instant live tracking link upon status updates.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 space-y-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                3. Kitchen Printer / KDS
              </h4>
              <p className="text-xs text-zinc-500">
                Automatically prints itemized cooking tickets with custom add-on modifications and table numbers.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
