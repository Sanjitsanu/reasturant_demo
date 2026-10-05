import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import {
  RESTAURANT_INFO,
  MENU_CATEGORIES,
  MENU_ITEMS,
  SPECIAL_OFFERS
} from './src/data/restaurantData.ts';
import {
  ReservationRequest,
  OrderRequest,
  LeadInquiry,
  ContactMessage
} from './src/types/restaurant.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

// Initialize Google GenAI client if key exists
let genAI: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// In-Memory Data Stores (seeded with sample records for admin demonstration)
let reservationsStore: ReservationRequest[] = [
  {
    id: 'res-sample-1',
    referenceNumber: 'AURA-RES-8492',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '20:00',
    guests: 2,
    seatingArea: 'romantic',
    customerName: 'Rahul Sharma',
    phone: '+91 98451 98765',
    email: 'rahul.sharma@example.com',
    occasion: 'Anniversary Dinner',
    specialRequests: 'Candlelight table in garden veranda. Vegetarian preferences.',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'res-sample-2',
    referenceNumber: 'AURA-RES-9120',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    time: '19:30',
    guests: 6,
    seatingArea: 'patio',
    customerName: 'Ananya Deshmukh',
    phone: '+91 99880 12345',
    email: 'ananya.d@example.com',
    occasion: 'Birthday Celebration',
    specialRequests: 'High chair needed, complimentary birthday cake slice request.',
    status: 'pending',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  }
];

let ordersStore: OrderRequest[] = [
  {
    id: 'ord-sample-1',
    orderNumber: 'AURA-ORD-1044',
    orderType: 'delivery',
    items: [
      {
        menuItemId: 'pza-1',
        name: 'Tartufo & Wild Funghi Pizza',
        price: 480,
        quantity: 1,
        selectedAddOns: [{ id: 'ao-extra-cheese', name: 'Fresh Fior di Latte Mozzarella', price: 70 }]
      },
      {
        menuItemId: 'des-1',
        name: 'Deconstructed Tiramisu al Mascarpone',
        price: 340,
        quantity: 1,
        selectedAddOns: []
      }
    ],
    subtotal: 890,
    packagingFee: 25,
    tax: 44.5,
    deliveryFee: 0,
    discount: 100,
    couponCode: 'AURA15',
    total: 859.5,
    customerName: 'Vikram Mehta',
    phone: '+91 97412 34567',
    email: 'vikram.m@example.com',
    address: 'Flat 402, Prestige Tower, Vittal Mallya Road, Bangalore',
    deliveryNotes: 'Please ring bell twice and leave with security if unavailable.',
    paymentMethod: 'upi',
    paymentStatus: 'completed',
    orderStatus: 'kitchen',
    estimatedMinutes: 30,
    createdAt: new Date(Date.now() - 900000).toISOString()
  }
];

let leadsStore: LeadInquiry[] = [
  {
    id: 'lead-1',
    name: 'Siddharth Rao',
    phone: '+91 98200 44556',
    email: 'siddharth.rao@techcorp.in',
    requirement: 'Private Dining for 16 colleagues on Friday evening.',
    preferredDate: '2026-10-12',
    preferredTime: '19:00',
    guestsCount: 16,
    notes: 'Inquired about customized corporate set menu.',
    status: 'new',
    createdAt: new Date(Date.now() - 7200000).toISOString()
  }
];

let contactStore: ContactMessage[] = [
  {
    id: 'cnt-1',
    name: 'Dr. Meera Nambiar',
    email: 'meera.nambiar@healthclinic.org',
    phone: '+91 98450 77889',
    subject: 'Allergy Inquiry regarding Nut-Free Kitchen',
    message: 'Hello, our group has a guest with severe peanut allergies. Could the chef confirm strict cross-contamination protocols?',
    status: 'unread',
    createdAt: new Date(Date.now() - 14400000).toISOString()
  }
];

async function startServer() {
  const app = express();
  app.use(express.json());

  // 1. Restaurant Info
  app.get('/api/restaurant', (_req: Request, res: Response) => {
    res.json(RESTAURANT_INFO);
  });

  // 2. Menu Items and Categories
  app.get('/api/menu', (_req: Request, res: Response) => {
    res.json({
      categories: MENU_CATEGORIES,
      items: MENU_ITEMS,
    });
  });

  // 3. Special Offers
  app.get('/api/offers', (_req: Request, res: Response) => {
    res.json(SPECIAL_OFFERS);
  });

  // 4. Reservations
  app.post('/api/reservations', (req: Request, res: Response) => {
    const { date, time, guests, seatingArea, customerName, phone, email, occasion, specialRequests } = req.body;

    if (!date || !time || !guests || !customerName || !phone) {
      res.status(400).json({ error: 'Please provide all required fields: date, time, guests, name, and phone.' });
      return;
    }

    const refNum = `AURA-RES-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReservation: ReservationRequest = {
      id: `res-${Date.now()}`,
      referenceNumber: refNum,
      date,
      time,
      guests: Number(guests),
      seatingArea: seatingArea || 'indoor',
      customerName,
      phone,
      email: email || '',
      occasion: occasion || 'Casual Dining',
      specialRequests: specialRequests || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    reservationsStore.unshift(newReservation);

    // Note: User prompt mandates: "Never claim a reservation is confirmed unless the backend actually confirms it. Show Awaiting confirmation."
    res.status(201).json({
      success: true,
      reservation: newReservation,
      message: 'Reservation Request Received. Status: Awaiting confirmation from restaurant manager.',
    });
  });

  app.get('/api/reservations', (_req: Request, res: Response) => {
    res.json(reservationsStore);
  });

  app.patch('/api/reservations/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const index = reservationsStore.findIndex((r) => r.id === id);
    if (index === -1) {
      res.status(404).json({ error: 'Reservation not found' });
      return;
    }
    if (status) {
      reservationsStore[index].status = status;
    }
    res.json(reservationsStore[index]);
  });

  // 5. Orders
  app.post('/api/orders', (req: Request, res: Response) => {
    const {
      orderType,
      items,
      customerName,
      phone,
      email,
      address,
      deliveryNotes,
      tableNumber,
      paymentMethod,
      couponCode,
    } = req.body;

    if (!items || !items.length || !customerName || !phone) {
      res.status(400).json({ error: 'Please provide order items, customer name, and phone number.' });
      return;
    }

    let subtotal = 0;
    for (const it of items) {
      let itemPrice = Number(it.price) || 0;
      if (it.selectedAddOns && Array.isArray(it.selectedAddOns)) {
        for (const ao of it.selectedAddOns) {
          itemPrice += Number(ao.price) || 0;
        }
      }
      subtotal += itemPrice * (Number(it.quantity) || 1);
    }

    const packagingFee = orderType === 'dine-in' ? 0 : 25;
    const tax = Math.round(subtotal * 0.05 * 100) / 100; // 5% GST
    const deliveryFee = orderType === 'delivery' ? (subtotal > 600 ? 0 : 40) : 0;

    let discount = 0;
    if (couponCode) {
      const match = SPECIAL_OFFERS.find(
        (o) => o.code.toUpperCase() === couponCode.trim().toUpperCase()
      );
      if (match) {
        if (match.discountType === 'percentage') {
          discount = Math.round((subtotal * match.discountValue) / 100);
          if (match.maxDiscount && discount > match.maxDiscount) {
            discount = match.maxDiscount;
          }
        } else {
          discount = match.discountValue;
        }
      }
    }

    const total = Math.max(0, subtotal + packagingFee + tax + deliveryFee - discount);
    const orderNum = `AURA-ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: OrderRequest = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      orderType: orderType || 'delivery',
      tableNumber,
      items,
      subtotal,
      packagingFee,
      tax,
      deliveryFee,
      discount,
      couponCode,
      total,
      customerName,
      phone,
      email: email || '',
      address: address || '',
      deliveryNotes: deliveryNotes || '',
      paymentMethod: paymentMethod || 'upi',
      paymentStatus: paymentMethod === 'cod' ? 'cash_on_delivery' : 'completed',
      orderStatus: 'received',
      estimatedMinutes: orderType === 'delivery' ? 35 : 20,
      createdAt: new Date().toISOString(),
    };

    ordersStore.unshift(newOrder);

    res.status(201).json({
      success: true,
      order: newOrder,
      message: 'Order placed successfully! Ticket transmitted to the kitchen.',
    });
  });

  app.get('/api/orders', (_req: Request, res: Response) => {
    res.json(ordersStore);
  });

  app.patch('/api/orders/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { orderStatus, paymentStatus } = req.body;
    const index = ordersStore.findIndex((o) => o.id === id);
    if (index === -1) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    if (orderStatus) ordersStore[index].orderStatus = orderStatus;
    if (paymentStatus) ordersStore[index].paymentStatus = paymentStatus;
    res.json(ordersStore[index]);
  });

  // 6. Lead Capture Workflow ("Need help deciding?")
  app.post('/api/leads', (req: Request, res: Response) => {
    const { name, phone, email, requirement, preferredDate, preferredTime, guestsCount, notes } = req.body;
    if (!name || !phone) {
      res.status(400).json({ error: 'Name and phone are required.' });
      return;
    }
    const newLead: LeadInquiry = {
      id: `lead-${Date.now()}`,
      name,
      phone,
      email,
      requirement: requirement || 'General Inquires & Event Concierge',
      preferredDate,
      preferredTime,
      guestsCount: guestsCount ? Number(guestsCount) : undefined,
      notes,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    leadsStore.unshift(newLead);
    res.status(201).json({
      success: true,
      lead: newLead,
      message: 'Thank you! Our dining concierge will call you within 15 minutes.',
    });
  });

  app.get('/api/leads', (_req: Request, res: Response) => {
    res.json(leadsStore);
  });

  // 7. Contact Messages
  app.post('/api/contact', (req: Request, res: Response) => {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !message || (!email && !phone)) {
      res.status(400).json({ error: 'Please provide name, contact details, and message.' });
      return;
    }
    const msg: ContactMessage = {
      id: `cnt-${Date.now()}`,
      name,
      email: email || '',
      phone: phone || '',
      subject: subject || 'General Dining Inquiry',
      message,
      status: 'unread',
      createdAt: new Date().toISOString(),
    };
    contactStore.unshift(msg);
    res.status(201).json({
      success: true,
      message: 'Thanks! Your message has been received. Our team will get back to you shortly.',
    });
  });

  app.get('/api/contact', (_req: Request, res: Response) => {
    res.json(contactStore);
  });

  // 8. Dedicated AI Restaurant Agent ("AIRA")
  app.post('/api/ai/chat', async (req: Request, res: Response) => {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required.' });
      return;
    }

    const trimmedMsg = message.trim();

    // System prompt grounding strictly in actual restaurant data
    const systemPrompt = `You are AIRA, the dedicated AI Restaurant Dining Assistant for "L'Aura Bistro & Artisan Roastery".
Restaurant Facts (Strict Grounding - NEVER invent facts, prices, or policies):
- Name: L'Aura Bistro & Artisan Roastery (Bangalore, Lavelle Road)
- Hours: Mon-Thu 08:30 AM to 11:30 PM; Fri-Sun 08:30 AM to 01:00 AM. Breakfast 08:30 AM - 12:00 PM.
- Cuisine: Handcrafted European, Woodfired Neapolitan Pizza, Fresh Bronzed Pastas, Single-Origin Coffee, Decadent Desserts, Botanical Mocktails.
- Parking: Complimentary dedicated Valet Parking available at main boulevard entrance.
- Transit: MG Road Metro Station (550m, 6 min walk).
- Ambience: Open-air glasshouse patio, romantic candlelight alcoves, executive business lounge, live jazz on weekend evenings.
- Table Reservations: Guests can book online. Table requests are received by the staff and confirmed via SMS/WhatsApp within 15 minutes. NEVER say a reservation is already confirmed unless the customer has a confirmed booking ticket from staff.
- Popular Dishes & Pricing:
  * Truffle & Edamame Dumplings: ₹360 (Veg, Mild)
  * Smoked Burrata & Heirloom Caprese: ₹440 (Veg)
  * Charred Saffron Malai Broccoli: ₹290 (Veg, Under ₹300)
  * Crispy Calamari & Rock Shrimp: ₹490 (Non-Veg)
  * Wild Forest Mushroom & Truffle Risotto: ₹540 (Veg, Best Seller)
  * Pan-Seared Chilean Seabass: ₹780 (Chef Special, Non-Veg)
  * Sous-Vide Herb Butter Chicken Supreme: ₹490 (Non-Veg)
  * Dum Pukht Awadhi Paneer Kofta: ₹390 (Veg, Spicy)
  * Slow-Cooked Kashmiri Lamb Shank: ₹680 (Non-Veg, Spicy)
  * Tartufo & Wild Funghi Pizza: ₹480 (Veg, 72-hr fermented sourdough)
  * Margherita Autentica DOP: ₹380 (Veg)
  * Spicy Diavola & Smoked Pepperoni: ₹520 (Non-Veg)
  * Handcrafted Truffle Tagliolini: ₹490 (Veg, Best Seller)
  * Fiery Rigatoni alla Vodka: ₹410 (Veg, Spicy)
  * Prime Black Angus & Truffle Burger: ₹490 (Non-Veg)
  * Crispy Korean Gochujang Fried Chicken Burger: ₹420 (Non-Veg, Spicy)
  * Deconstructed Tiramisu: ₹340 (Veg)
  * Warm Belgian Chocolate Fondant: ₹360 (Veg, Molten)
  * Basque Saffron Cheesecake: ₹320 (Veg)
  * Chikmagalur Single-Origin Pour Over: ₹220 (Under ₹300)
  * Velvet Vanilla Bean Flat White: ₹240 (Under ₹300)
  * Smoked Rosemary Grapefruit Paloma: ₹280 (Under ₹300)
- Offers:
  * "WEEKEND20": 20% off on weekends (Fri-Sun) for orders/bookings above ₹800.
  * "AURA15": 15% off first order/visit above ₹500.
  * "BREW50": 50% off second coffee during Happy Hours (Mon-Thu 3 PM - 6 PM).
  * "ROMANCE": Complimentary dessert platter on Date Night candlelight reservations.

Tone & Style:
- Warm, elegant, knowledgeable, concise, hospitable, and food-focused.
- If a customer asks for recommendations (e.g. spicy, veg, under ₹400, date night), recommend specific exact items with real prices.
- If information is unavailable, politely state: "I don't have that specific information yet. Please contact our front desk at +91 98450 12345 or speak with our manager."
- Keep responses concise (2 to 4 sentences or bullet points).`;

    // Try Gemini API if initialized
    if (genAI) {
      try {
        const response = await genAI.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: trimmedMsg,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
          },
        });

        const replyText = response.text || "I'd be delighted to assist you with our menu, table reservations, or private dining!";

        // Detect helpful action suggestions
        const suggestions: string[] = [];
        let action: any = undefined;

        const lower = trimmedMsg.toLowerCase();
        if (lower.includes('book') || lower.includes('table') || lower.includes('reserve') || lower.includes('date night')) {
          action = { type: 'reserve', label: 'Open Table Booking' };
          suggestions.push('Book a table for tonight', 'Show available seating areas', 'What are dinner timings?');
        } else if (lower.includes('order') || lower.includes('pizza') || lower.includes('pasta') || lower.includes('delivery')) {
          action = { type: 'order', label: 'View Menu & Order' };
          suggestions.push('Show vegetarian best-sellers', 'Dishes under ₹400', 'Check today offers');
        } else if (lower.includes('spicy') || lower.includes('veg')) {
          suggestions.push('Show all vegetarian dishes', 'Dishes under ₹400', 'Book a table');
        } else {
          suggestions.push('What is your chef special?', 'Are tables available tonight?', 'Do you have valet parking?');
        }

        res.json({
          reply: replyText,
          suggestions,
          action,
        });
        return;
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, falling back to intelligent restaurant knowledge matcher:', geminiError?.message);
      }
    }

    // High-fidelity fallback knowledge engine (never leaves user stuck)
    const lower = trimmedMsg.toLowerCase();
    let reply = '';
    let suggestions: string[] = ['Book a table', 'Show vegetarian dishes', 'What are today offers?'];
    let action: any = undefined;

    if (lower.includes('spicy') && (lower.includes('400') || lower.includes('under') || lower.includes('veg'))) {
      reply = "For spicy delights under ₹400, I highly recommend our Dum Pukht Awadhi Paneer Kofta (₹390, rich & aromatic) or our Charred Saffron Malai Broccoli (₹290). If you fancy pasta, our Fiery Rigatoni alla Vodka is ₹410!";
      suggestions = ['Show vegetarian menu', 'Book a dinner table', 'Check current offers'];
      action = { type: 'view_menu', label: 'Explore Spicy Options' };
    } else if (lower.includes('spicy')) {
      reply = "Our most celebrated spicy dishes include the Spicy Diavola & Smoked Pepperoni Pizza (₹520), the Slow-Cooked Kashmiri Lamb Shank (₹680), and the Fiery Rigatoni alla Vodka (₹410). Let me know if you prefer vegetarian or meat options!";
      suggestions = ['Vegetarian spicy options', 'Dishes under ₹400', 'Book a table'];
    } else if (lower.includes('vegetarian') || lower.includes('veg')) {
      reply = "We take pride in our vegetarian creations! Guests rave about our Truffle & Edamame Dumplings (₹360), Smoked Burrata Caprese (₹440), Wild Forest Mushroom Risotto (₹540), and the 72-hr fermented Tartufo & Funghi Pizza (₹480).";
      suggestions = ['Dishes under ₹300', 'Book vegetarian dinner', 'Dessert recommendations'];
      action = { type: 'view_menu', label: 'View Vegetarian Menu' };
    } else if (lower.includes('under') && (lower.includes('300') || lower.includes('₹300'))) {
      reply = "Here are our finest options under ₹300: Zaatar Hummus & Sourdough (₹280), Charred Saffron Broccoli (₹290), Chikmagalur Pour Over (₹220), Vanilla Flat White (₹240), and our Smoked Grapefruit Paloma (₹280).";
      suggestions = ['Order for delivery', 'Show full menu', 'Book a table'];
      action = { type: 'view_menu', label: 'View Under ₹300 Dishes' };
    } else if (lower.includes('book') || lower.includes('table') || lower.includes('reserve') || lower.includes('reservation')) {
      reply = "I would love to help you book a table! We offer our lush Glasshouse Patio, Romantic Candlelight alcoves, and indoor fine dining. You can select your date, time, and party size right here.";
      suggestions = ['Reserve for 2 tonight', 'Reserve for 4 guests', 'What are dinner timings?'];
      action = { type: 'reserve', label: 'Book a Table Now' };
    } else if (lower.includes('offer') || lower.includes('discount') || lower.includes('coupon')) {
      reply = "Today's featured offers: Use code WEEKEND20 for 20% off Friday to Sunday (orders/bookings > ₹800), AURA15 for 15% off first visit, and BREW50 for 50% off your second coffee during Happy Hours (3-6 PM Mon-Thu)!";
      suggestions = ['Apply WEEKEND20', 'Book with offer', 'Order food online'];
      action = { type: 'offer', label: 'View All Offers' };
    } else if (lower.includes('parking') || lower.includes('valet')) {
      reply = "Yes! Complimentary valet parking is available for all guests at our main boulevard entrance on Lavelle Road. Our valet team will assist you upon arrival.";
      suggestions = ['Get directions', 'Opening hours', 'Book a table'];
    } else if (lower.includes('timing') || lower.includes('hour') || lower.includes('open')) {
      reply = "We are open Monday to Thursday from 08:30 AM to 11:30 PM, and Friday to Sunday from 08:30 AM to 01:00 AM. Our Artisan Breakfast & Coffee bar starts every morning at 08:30 AM!";
      suggestions = ['Book dinner table', 'Breakfast menu', 'Contact restaurant'];
    } else if (lower.includes('date night') || lower.includes('romantic') || lower.includes('anniversary')) {
      reply = "For an unforgettable date night, I recommend reserving our Candlelight Table in the Veranda. Pair our Handcrafted Truffle Tagliolini (₹490) with Chilean Seabass (₹780) and molten Belgian Dark Chocolate Fondant (₹360). Use code ROMANCE for a complimentary dessert platter!";
      suggestions = ['Reserve Date Night Table', 'View romantic menu', 'Special requests'];
      action = { type: 'reserve', label: 'Reserve Date Night Table' };
    } else {
      reply = "Welcome to L'Aura Bistro & Artisan Roastery! I can assist you with chef recommendations, dietary preferences, wine and mocktail pairings, table reservations, and current offers. What can I curate for you today?";
      suggestions = ['What is popular?', 'Show vegetarian food', 'Book a table for tonight'];
    }

    res.json({
      reply,
      suggestions,
      action,
    });
  });

  // Serve Frontend
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`L'Aura Bistro Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start L\'Aura server:', err);
});
