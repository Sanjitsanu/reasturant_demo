export type DietaryPreference = 'all' | 'veg' | 'non-veg';

export interface MenuItem {
  id: string;
  name: string;
  category: string; // starters, mains, pizza, burgers, pasta, desserts, beverages, coffee, mocktails, chef-specials
  description: string;
  price: number;
  isVeg: boolean;
  spiceLevel: 0 | 1 | 2 | 3; // 0 = mild, 1 = medium, 2 = spicy, 3 = very spicy
  isPopular?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  isChefSpecial?: boolean;
  image: string;
  prepTimeMinutes: number;
  calories?: number;
  rating: number;
  reviewsCount: number;
  allergens?: string[];
  dietaryNotes?: string[];
  customizableAddOns?: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export type SeatingArea = 'indoor' | 'patio' | 'romantic' | 'chef-counter';

export interface ReservationRequest {
  id: string;
  referenceNumber: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: SeatingArea;
  customerName: string;
  phone: string;
  email: string;
  occasion: string;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedAddOns: {
    id: string;
    name: string;
    price: number;
  }[];
  notes?: string;
}

export interface OrderRequest {
  id: string;
  orderNumber: string;
  orderType: 'delivery' | 'takeaway' | 'dine-in';
  tableNumber?: string;
  items: {
    menuItemId: string;
    name: string;
    price: number;
    quantity: number;
    selectedAddOns: { id: string; name: string; price: number }[];
    notes?: string;
  }[];
  subtotal: number;
  packagingFee: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  customerName: string;
  phone: string;
  email: string;
  address?: string;
  deliveryNotes?: string;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  paymentStatus: 'pending' | 'completed' | 'cash_on_delivery';
  orderStatus: 'received' | 'kitchen' | 'out_for_delivery' | 'ready' | 'completed';
  estimatedMinutes: number;
  createdAt: string;
}

export interface RestaurantInfo {
  name: string;
  shortName: string;
  tagline: string;
  subheadline: string;
  address: string;
  locality: string;
  city: string;
  pincode: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  whatsapp: string;
  mapsUrl: string;
  rating: number;
  totalReviews: number;
  hours: {
    days: string;
    timing: string;
    note?: string;
  }[];
  amenities: string[];
  parking: string;
  nearestTransit: string;
}

export interface SpecialOffer {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrder: number;
  maxDiscount?: number;
  validDays: string;
  validTill: string;
  badge: string;
  terms: string;
  bannerImage: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  verified: boolean;
  visitType: string;
  review: string;
  favoriteDish?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'food' | 'interior' | 'drinks' | 'chef' | 'events';
  image: string;
  caption: string;
}

export interface LeadInquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  requirement: string;
  preferredDate?: string;
  preferredTime?: string;
  guestsCount?: number;
  notes?: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  suggestions?: string[];
  action?: {
    type: 'reserve' | 'order' | 'view_menu' | 'offer';
    label: string;
    payload?: any;
  };
}
