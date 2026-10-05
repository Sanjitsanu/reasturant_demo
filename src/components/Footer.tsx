import React, { useState } from 'react';
import { useRestaurant, AppRoute } from '../context/RestaurantContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import {
  UtensilsCrossed,
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, openReservationModal, showToast } = useRestaurant();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    showToast('Subscribed to chef invitations and exclusive tasting events!', 'success');
  };

  const footerLinks: { label: string; route: AppRoute }[] = [
    { label: 'Digital Menu', route: '/menu' },
    { label: 'Book a Table', route: '/reservation' },
    { label: 'Order Online', route: '/order' },
    { label: 'Seasonal Offers', route: '/offers' },
    { label: 'Restaurant Story', route: '/about' },
    { label: 'Visual Gallery', route: '/gallery' },
    { label: 'Contact & Location', route: '/contact' },
    { label: 'Staff Management', route: '/admin' },
  ];

  return (
    <footer className="bg-[#07080b] text-zinc-400 border-t border-zinc-800/80 pt-16 pb-24 md:pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800/80">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  L&apos;Aura
                  <span className="text-amber-500 text-xs font-sans uppercase tracking-widest">
                    Bistro
                  </span>
                </span>
                <p className="text-[10px] tracking-wider text-amber-400 uppercase font-sans font-medium">
                  Artisan Roastery &amp; Fine Dining
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed">
              {RESTAURANT_INFO.subheadline}
            </p>

            <div className="flex items-center gap-3 pt-2 text-zinc-400">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-sans">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {footerLinks.map((link) => (
                <li key={link.route}>
                  <button
                    onClick={() => navigateTo(link.route)}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-sans flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              Dining Hours
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <p className="text-zinc-200 font-medium">Mon &ndash; Thu</p>
                <p className="text-zinc-500">08:30 AM &ndash; 11:30 PM</p>
              </div>
              <div>
                <p className="text-zinc-200 font-medium">Fri &ndash; Sun</p>
                <p className="text-zinc-500">08:30 AM &ndash; 01:00 AM</p>
              </div>
              <div>
                <p className="text-amber-400/90 font-medium">Breakfast &amp; Coffee</p>
                <p className="text-zinc-500">08:30 AM &ndash; 12:00 PM Daily</p>
              </div>
            </div>
          </div>

          {/* Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-sans flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              Visit Us
            </h4>
            <p className="text-xs leading-relaxed text-zinc-400">
              {RESTAURANT_INFO.address}, {RESTAURANT_INFO.locality}, {RESTAURANT_INFO.city} - {RESTAURANT_INFO.pincode}
            </p>
            <div className="pt-1 space-y-1 text-xs">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="flex items-center gap-1.5 text-amber-400 hover:underline"
              >
                <Phone className="w-3 h-3" />
                <span>{RESTAURANT_INFO.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${RESTAURANT_INFO.email}`}
                className="flex items-center gap-1.5 hover:text-white"
              >
                <Mail className="w-3 h-3" />
                <span>{RESTAURANT_INFO.email}</span>
              </a>
            </div>
            <p className="text-[11px] text-zinc-500 flex items-center gap-1 pt-1">
              <Car className="w-3 h-3 text-amber-500" />
              Complimentary Valet Available
            </p>
          </div>
        </div>

        {/* Bottom Bar with Copyright & Schema indicator */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} L&apos;Aura Bistro &amp; Artisan Roastery. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo('/admin')}
              className="text-zinc-500 hover:text-amber-400 flex items-center gap-1 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Dashboard</span>
            </button>
            <span>&bull;</span>
            <span className="text-zinc-500">Fine Dining &bull; Neapolitan Pizza &bull; Roastery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
