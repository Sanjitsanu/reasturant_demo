import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useRestaurant } from '../context/RestaurantContext';
import { AnimatedButton } from './AnimatedButton';
import { SeatingArea, ReservationRequest } from '../types/restaurant';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  User,
  Phone,
  Mail,
  Sparkles,
  Heart,
  CheckCircle2,
  AlertCircle,
  MapPin,
  X
} from 'lucide-react';

interface ReservationFlowProps {
  onSuccess?: (res: ReservationRequest) => void;
  isModal?: boolean;
  prefillOccasion?: string;
}

export const ReservationFlow: React.FC<ReservationFlowProps> = ({
  onSuccess,
  isModal = false,
  prefillOccasion = '',
}) => {
  const { showToast, reservationPrefill } = useRestaurant();

  // Booking states
  const [step, setStep] = useState<number>(1);
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState<string>('20:00');
  const [guests, setGuests] = useState<number>(2);
  const [seatingArea, setSeatingArea] = useState<SeatingArea>('indoor');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [occasion, setOccasion] = useState<string>(
    prefillOccasion || reservationPrefill?.occasion || 'Casual Dinner'
  );
  const [specialRequests, setSpecialRequests] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);
  const [submittedReservation, setSubmittedReservation] = useState<ReservationRequest | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Quick Date shortcuts
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  const weekend = new Date();
  weekend.setDate(weekend.getDate() + ((5 - weekend.getDay() + 7) % 7 || 7)); // Next Friday
  const weekendStr = weekend.toISOString().split('T')[0];

  const timeSlots = [
    { label: '12:30 PM', val: '12:30', period: 'Lunch' },
    { label: '01:15 PM', val: '13:15', period: 'Lunch' },
    { label: '02:00 PM', val: '14:00', period: 'Lunch' },
    { label: '07:00 PM', val: '19:00', period: 'Dinner' },
    { label: '07:45 PM', val: '19:45', period: 'Dinner' },
    { label: '08:30 PM', val: '20:30', period: 'Dinner' },
    { label: '09:15 PM', val: '21:15', period: 'Dinner' },
    { label: '10:00 PM', val: '22:00', period: 'Dinner' },
  ];

  const occasions = [
    'Date Night',
    'Anniversary',
    'Birthday',
    'Family Dinner',
    'Business Meeting',
    'Casual Dining',
    'Quiet Table Request',
  ];

  const seatingOptions: { id: SeatingArea; label: string; desc: string }[] = [
    { id: 'indoor', label: 'Indoor Dining Room', desc: 'Air-conditioned luxury ambiance' },
    { id: 'patio', label: 'Glasshouse Garden Patio', desc: 'Lush tropical open-air veranda' },
    { id: 'romantic', label: 'Candlelight Alcove', desc: 'Intimate table with dim lighting' },
    { id: 'chef-counter', label: 'Chef Tasting Counter', desc: 'Direct view of the open kitchen' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Please enter your full name and contact phone number.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date,
          time,
          guests,
          seatingArea,
          customerName: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          occasion,
          specialRequests,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit reservation.');
      }

      setSubmittedReservation(data.reservation);
      if (onSuccess) onSuccess(data.reservation);
      showToast('Reservation request received! Awaiting confirmation.', 'success');

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#d97706', '#fbbf24', '#ffffff'],
        });
      } catch (e) {
        // ignore
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please check your network.');
    } finally {
      setIsLoading(false);
    }
  };

  // If already submitted, show official Confirmation Ticket
  if (submittedReservation) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-center max-w-xl mx-auto animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-amber-500/10">
          <Clock className="w-8 h-8 text-amber-500 animate-pulse" />
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Reservation Request Received
        </h3>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          Status: Awaiting confirmation
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 max-w-md mx-auto leading-relaxed">
          Thank you, <strong className="text-zinc-900 dark:text-zinc-100">{submittedReservation.customerName}</strong>! Our host desk has received your table reservation request. Our manager will confirm availability via SMS/WhatsApp within 15 minutes.
        </p>

        {/* Structured Ticket Details */}
        <div className="bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 text-left space-y-3 mb-6">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500">
            <span>REFERENCE NUMBER</span>
            <span className="font-mono font-bold text-amber-500 text-sm">
              {submittedReservation.referenceNumber}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-zinc-400">Date</p>
              <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                {submittedReservation.date}
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-400">Time</p>
              <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                {submittedReservation.time}
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-400">Guests</p>
              <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                {submittedReservation.guests} Persons
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-400">Seating Area</p>
              <p className="font-semibold text-zinc-800 dark:text-zinc-200 capitalize">
                {submittedReservation.seatingArea.replace('-', ' ')}
              </p>
            </div>
          </div>

          {submittedReservation.specialRequests && (
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 text-xs">
              <span className="text-zinc-400">Special Notes: </span>
              <span className="text-zinc-700 dark:text-zinc-300">
                {submittedReservation.specialRequests}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="tel:+919845012345"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Call Restaurant Host (+91 98450 12345)</span>
          </a>

          <button
            onClick={() => {
              setSubmittedReservation(null);
              setStep(1);
            }}
            className="text-xs text-amber-500 hover:underline py-2"
          >
            Book Another Table
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-2xl mx-auto">
      {/* Progress Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 mb-2">
          <span>STEP {step} OF 3</span>
          <span className="text-amber-500">
            {step === 1 ? 'Date & Time' : step === 2 ? 'Party & Seating' : 'Guest Details'}
          </span>
        </div>
        <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 rounded-full"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* STEP 1: Date & Time */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Select Date
            </label>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <button
                type="button"
                onClick={() => setDate(todayStr)}
                className={`py-2 px-3 rounded-xl text-xs font-medium border cursor-pointer ${
                  date === todayStr
                    ? 'bg-amber-500/15 border-amber-500 text-amber-500 font-semibold'
                    : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300'
                }`}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setDate(tomorrowStr)}
                className={`py-2 px-3 rounded-xl text-xs font-medium border cursor-pointer ${
                  date === tomorrowStr
                    ? 'bg-amber-500/15 border-amber-500 text-amber-500 font-semibold'
                    : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300'
                }`}
              >
                Tomorrow
              </button>
              <button
                type="button"
                onClick={() => setDate(weekendStr)}
                className={`py-2 px-3 rounded-xl text-xs font-medium border cursor-pointer ${
                  date === weekendStr
                    ? 'bg-amber-500/15 border-amber-500 text-amber-500 font-semibold'
                    : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300'
                }`}
              >
                Weekend (Fri)
              </button>
            </div>

            <input
              type="date"
              value={date}
              min={todayStr}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Select Time Slot
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {timeSlots.map((slot) => {
                const isSelected = time === slot.val;
                return (
                  <button
                    key={slot.val}
                    type="button"
                    onClick={() => setTime(slot.val)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-md shadow-amber-500/20'
                        : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-amber-500/40'
                    }`}
                  >
                    <span>{slot.label}</span>
                    <span className="block text-[10px] opacity-70 mt-0.5">{slot.period}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <AnimatedButton
              variant="primary"
              showArrow
              onClick={() => setStep(2)}
            >
              Continue to Party Size
            </AnimatedButton>
          </div>
        </div>
      )}

      {/* STEP 2: Guests & Seating & Occasion */}
      {step === 2 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Number of Guests
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setGuests(num)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold border shrink-0 transition-all cursor-pointer ${
                    guests === num
                      ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md shadow-amber-500/20'
                      : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-amber-500/40'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            {guests > 8 && (
              <p className="text-[11px] text-amber-500 mt-1">
                * Large party detected. We will arrange adjoining tables or our private dining room.
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Seating Atmosphere Preference
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {seatingOptions.map((opt) => {
                const isSelected = seatingArea === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSeatingArea(opt.id)}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500 text-zinc-900 dark:text-zinc-100 shadow-sm'
                        : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-amber-500/40'
                    }`}
                  >
                    <p className="text-xs font-bold">{opt.label}</p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">{opt.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Occasion
            </label>
            <div className="flex flex-wrap gap-2">
              {occasions.map((occ) => (
                <button
                  key={occ}
                  type="button"
                  onClick={() => setOccasion(occ)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border cursor-pointer ${
                    occasion === occ
                      ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                      : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-amber-500/40'
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              &larr; Back
            </button>
            <AnimatedButton
              variant="primary"
              showArrow
              onClick={() => setStep(3)}
            >
              Continue to Details
            </AnimatedButton>
          </div>
        </div>
      )}

      {/* STEP 3: Contact & Special Requests */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in duration-200">
          <div>
            <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98450 XXXXX"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                Email Address (Optional)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
              Special Requests (Dietary, High Chair, Window Seat, Flowers)
            </label>
            <textarea
              rows={2}
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="e.g. Vegetarian only, anniversary candle on dessert, quiet corner table..."
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* Quick Summary Pill */}
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-500 flex items-center justify-between">
            <span>
              {date} at {time} &bull; {guests} Guests ({seatingArea})
            </span>
            <span className="font-semibold">{occasion}</span>
          </div>

          <div className="pt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              &larr; Back
            </button>
            <AnimatedButton
              type="submit"
              variant="primary"
              isLoading={isLoading}
              showArrow
            >
              Confirm Reservation
            </AnimatedButton>
          </div>
        </form>
      )}
    </div>
  );
};
