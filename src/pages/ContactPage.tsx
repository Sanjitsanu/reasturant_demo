import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { AnimatedButton } from '../components/AnimatedButton';
import { useRestaurant } from '../context/RestaurantContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  Navigation,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useRestaurant();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setErrorMsg('Please enter your name and message.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          subject: subject.trim() || 'General Dining Inquiry',
          message: message.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit inquiry.');

      setSubmitted(true);
      showToast(data.message || 'Thanks! Your message has been received.', 'success');
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try calling directly.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen space-y-16">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-semibold tracking-wider uppercase mb-3 border border-amber-500/20">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Connect With Us</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Contact &amp; Location
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          Have an inquiry, dietary consultation, or special event request? We’re always here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-xl">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Message Received!
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                Thanks, {name}! Your message has reached our front desk. A member of our team will get back to you shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                  setSubject('');
                }}
                className="text-xs text-amber-500 font-semibold underline pt-2 cursor-pointer"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                Send Us a Note
              </h3>

              {errorMsg && (
                <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ananya Deshmukh"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98450 XXXXX"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Dietary Questions, Private Dining, Corporate Booking"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                  Your Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist your culinary experience?"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <AnimatedButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                  isLoading={isLoading}
                  showArrow
                >
                  Send Message
                </AnimatedButton>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Details & Map */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Restaurant Information
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-zinc-900 dark:text-zinc-100">Address</p>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {RESTAURANT_INFO.address}, {RESTAURANT_INFO.locality}, {RESTAURANT_INFO.city} - {RESTAURANT_INFO.pincode}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-zinc-900 dark:text-zinc-100">Direct Telephone</p>
                  <a
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="text-amber-500 font-semibold hover:underline"
                  >
                    {RESTAURANT_INFO.phoneDisplay}
                  </a>
                  <p className="text-[11px] text-zinc-400">Available during operating hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-zinc-900 dark:text-zinc-100">Reservations Desk</p>
                  <a
                    href={`mailto:${RESTAURANT_INFO.email}`}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-amber-500 transition-colors"
                  >
                    {RESTAURANT_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Car className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-zinc-900 dark:text-zinc-100">Valet &amp; Parking</p>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {RESTAURANT_INFO.parking}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-semibold transition-colors"
              >
                <Navigation className="w-4 h-4 text-amber-500" />
                <span>Get Directions (Google Maps)</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Visual Container */}
          <div className="rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 h-60 relative shadow-xl">
            <iframe
              title="Restaurant Location Map"
              src="https://maps.google.com/maps?q=Lavelle+Road+Bangalore&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 filter contrast-125 dark:invert dark:hue-rotate-180"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
