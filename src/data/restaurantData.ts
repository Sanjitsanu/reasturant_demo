import {
  MenuItem,
  MenuCategory,
  RestaurantInfo,
  SpecialOffer,
  Review,
  GalleryItem
} from '../types/restaurant';

export const RESTAURANT_INFO: RestaurantInfo = {
  name: "L'Aura Bistro & Artisan Roastery",
  shortName: "L'Aura",
  tagline: "Good Food. Great Moments.",
  subheadline: "Freshly prepared artisanal dishes, single-origin roasts, and unforgettable culinary dining experiences.",
  address: "84 Grand Boulevard, Royal Garden Quarter, Lavelle Enclave",
  locality: "Lavelle Road, Central Business District",
  city: "Bangalore",
  pincode: "560001",
  phone: "+919845012345",
  phoneDisplay: "+91 98450 12345",
  email: "reservations@laurabistro.com",
  whatsapp: "+919845012345",
  mapsUrl: "https://maps.google.com/?q=Bangalore+Lavelle+Road",
  rating: 4.9,
  totalReviews: 1420,
  hours: [
    { days: "Monday – Thursday", timing: "08:30 AM – 11:30 PM", note: "Kitchen closes at 10:45 PM" },
    { days: "Friday – Sunday", timing: "08:30 AM – 01:00 AM", note: "Late night bistro & cocktails" },
    { days: "Artisan Breakfast & Coffee", timing: "08:30 AM – 12:00 PM Daily", note: "Single-origin pour-overs & fresh bakes" }
  ],
  amenities: [
    "Valet Parking Available",
    "Open-Air Glasshouse Patio",
    "High-Speed Wi-Fi for Work",
    "Private Dining Room (Up to 24 guests)",
    "Wheelchair Accessible",
    "Live Jazz on Weekends"
  ],
  parking: "Dedicated complimentary valet parking at the main boulevard entrance.",
  nearestTransit: "MG Road Metro Station (550m, 6 min walk)"
};

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: 'all', name: 'All Dishes', icon: 'Sparkles', description: 'Explore our complete handcrafted collection' },
  { id: 'starters', name: 'Starters', icon: 'UtensilsCrossed', description: 'Small plates & appetizing creations' },
  { id: 'mains', name: 'Main Course', icon: 'Flame', description: 'Signature hearty culinary masterpieces' },
  { id: 'pizza', name: 'Woodfired Pizza', icon: 'CircleDot', description: '72-hr fermented Neapolitan sourdough crust' },
  { id: 'pasta', name: 'Handcrafted Pasta', icon: 'Wheat', description: 'Fresh bronze-cut pastas made daily in-house' },
  { id: 'burgers', name: 'Gourmet Burgers', icon: 'Sandwich', description: 'Artisan brioche buns & prime fillings' },
  { id: 'desserts', name: 'Desserts', icon: 'Cake', description: 'Decadent European sweets & patisserie' },
  { id: 'coffee', name: 'Artisan Coffee', icon: 'Coffee', description: 'Estate single-origin beans roasted on-site' },
  { id: 'mocktails', name: 'Mocktails', icon: 'Wine', description: 'Botanical infusions & crafted shrubs' },
  { id: 'beverages', name: 'Beverages', icon: 'GlassWater', description: 'Kombuchas, cold-pressed elixirs & iced teas' },
  { id: 'chef-specials', name: 'Chef Specials', icon: 'Crown', description: 'Limited seasonal tasting creations' }
];

export const MENU_ITEMS: MenuItem[] = [
  // STARTERS
  {
    id: 'str-1',
    name: 'Truffle & Edamame Crystal Dumplings',
    category: 'starters',
    description: 'Delicate translucent skins filled with crushed edamame, water chestnut, and infused with white winter truffle oil. Served with chili-soy emulsion.',
    price: 360,
    isVeg: true,
    spiceLevel: 1,
    isPopular: true,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 15,
    calories: 240,
    rating: 4.9,
    reviewsCount: 312,
    dietaryNotes: ['Vegan Option Available', 'Nut-Free'],
    allergens: ['Soy', 'Gluten'],
    customizableAddOns: [
      { id: 'ao-truffle', name: 'Extra Truffle Emulsion', price: 60 },
      { id: 'ao-crispy-garlic', name: 'Crispy Garlic Crunch', price: 30 }
    ]
  },
  {
    id: 'str-2',
    name: 'Smoked Burrata & Heirloom Caprese',
    category: 'starters',
    description: 'Pugliese artisanal burrata lightly cold-smoked with hickory wood, paired with organic heirloom cherry tomatoes, basil caviar, and 12-year aged Modena balsamic glaze.',
    price: 440,
    isVeg: true,
    spiceLevel: 0,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 12,
    calories: 320,
    rating: 4.8,
    reviewsCount: 184,
    dietaryNotes: ['Vegetarian', 'Gluten-Free']
  },
  {
    id: 'str-3',
    name: 'Charred Saffron Malai Broccoli',
    category: 'starters',
    description: 'Crisp broccoli florets marinated in Kashmiri saffron, Greek yogurt, cardamom, and toasted almond flakes, roasted over tandoor embers.',
    price: 290,
    isVeg: true,
    spiceLevel: 1,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 14,
    calories: 210,
    rating: 4.7,
    reviewsCount: 95,
    dietaryNotes: ['Vegetarian', 'Low Carb', 'Under ₹300']
  },
  {
    id: 'str-4',
    name: 'Crispy Calamari & Rock Shrimp Fritti',
    category: 'starters',
    description: 'Tender Monterey calamari and wild rock shrimp flash-fried in light semolina crust. Served with preserved lemon aioli and charred lime.',
    price: 490,
    isVeg: false,
    spiceLevel: 1,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 14,
    calories: 380,
    rating: 4.9,
    reviewsCount: 140,
    allergens: ['Shellfish', 'Dairy']
  },
  {
    id: 'str-5',
    name: 'Zaatar Hummus & Sourdough Crisp',
    category: 'starters',
    description: 'Ultra-creamy slow-simmered chickpeas blended with Lebanese tahini, pomegranate gems, pine nuts, and freshly baked sourdough zaatar crisps.',
    price: 280,
    isVeg: true,
    spiceLevel: 0,
    image: 'https://images.unsplash.com/photo-1577906096429-f73c2c312435?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 10,
    calories: 260,
    rating: 4.6,
    reviewsCount: 88,
    dietaryNotes: ['Vegan', 'Under ₹300']
  },

  // MAIN COURSE
  {
    id: 'mn-1',
    name: 'Wild Forest Mushroom & Truffle Risotto',
    category: 'mains',
    description: 'Slow-simmered Acquerello carnaroli rice with porcini and chanterelles, finished with 24-month Parmigiano Reggiano and fresh black truffle shavings.',
    price: 540,
    isVeg: true,
    spiceLevel: 0,
    isPopular: true,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 20,
    calories: 460,
    rating: 4.9,
    reviewsCount: 420,
    dietaryNotes: ['Vegetarian', 'Gluten-Free Option']
  },
  {
    id: 'mn-2',
    name: 'Pan-Seared Herb Butter Chilean Seabass',
    category: 'mains',
    description: 'Sustainably sourced sea bass crusted with thyme and rosemary, served over sweet pea purée, charred asparagus, and saffron beurre blanc.',
    price: 780,
    isVeg: false,
    spiceLevel: 0,
    isChefSpecial: true,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 22,
    calories: 490,
    rating: 5.0,
    reviewsCount: 165
  },
  {
    id: 'mn-3',
    name: 'Sous-Vide Herb Butter Chicken Supreme',
    category: 'mains',
    description: 'Tender corn-fed chicken breast cooked sous-vide to perfection, served with garlic potato mousseline, blistered baby carrots, and wild morel jus.',
    price: 490,
    isVeg: false,
    spiceLevel: 1,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 20,
    calories: 520,
    rating: 4.8,
    reviewsCount: 210
  },
  {
    id: 'mn-4',
    name: 'Dum Pukht Awadhi Paneer Kofta',
    category: 'mains',
    description: 'Melt-in-mouth cottage cheese and apricot dumplings enveloped in velvety cashew and brown onion gravy, tempered with green cardamom and rose petals.',
    price: 390,
    isVeg: true,
    spiceLevel: 2,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 18,
    calories: 440,
    rating: 4.8,
    reviewsCount: 195,
    dietaryNotes: ['Vegetarian', 'Spicy']
  },
  {
    id: 'mn-5',
    name: 'Slow-Cooked Kashmiri Lamb Shank Rogan Josh',
    category: 'mains',
    description: 'Prime pasture-raised lamb shank braised for 8 hours with Ratan Jot, dried ginger, and Kashmiri chilies. Rich, aromatic, and deeply flavorful.',
    price: 680,
    isVeg: false,
    spiceLevel: 2,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 22,
    calories: 650,
    rating: 4.9,
    reviewsCount: 230
  },

  // PIZZA (Woodfired 72-hr sourdough)
  {
    id: 'pza-1',
    name: 'Tartufo & Wild Funghi Pizza',
    category: 'pizza',
    description: 'Fior di latte mozzarella, roasted cremini & shiitake mushrooms, fresh thyme, truffle cream sauce, and pecorino romano on a charred puffy sourdough crust.',
    price: 480,
    isVeg: true,
    spiceLevel: 0,
    isPopular: true,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 15,
    calories: 720,
    rating: 4.9,
    reviewsCount: 380,
    customizableAddOns: [
      { id: 'ao-extra-cheese', name: 'Fresh Fior di Latte Mozzarella', price: 70 },
      { id: 'ao-jalapeno', name: 'Spicy Pickled Jalapeños', price: 40 }
    ]
  },
  {
    id: 'pza-2',
    name: 'Margherita Autentica DOP',
    category: 'pizza',
    description: 'San Marzano DOP tomato sauce, fresh buffalo mozzarella, hand-torn sweet basil, and extra virgin cold-pressed olive oil. Pure Neapolitan classic.',
    price: 380,
    isVeg: true,
    spiceLevel: 0,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 14,
    calories: 640,
    rating: 4.8,
    reviewsCount: 290
  },
  {
    id: 'pza-3',
    name: 'Spicy Diavola & Smoked Pepperoni',
    category: 'pizza',
    description: 'Italian spicy salami and artisanal smoked pepperoni, San Marzano tomatoes, mozzarella, Calabrian chili honey drizzle, and fresh oregano.',
    price: 520,
    isVeg: false,
    spiceLevel: 2,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 15,
    calories: 810,
    rating: 4.9,
    reviewsCount: 310
  },
  {
    id: 'pza-4',
    name: 'Smoked Paneer Tikka Woodfired Pizza',
    category: 'pizza',
    description: 'Clay-oven smoked spiced paneer chunks, charred bell peppers, caramelized red onions, mint-coriander drizzle, and gooey mozzarella.',
    price: 420,
    isVeg: true,
    spiceLevel: 2,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 15,
    calories: 740,
    rating: 4.7,
    reviewsCount: 175
  },

  // PASTAS
  {
    id: 'pst-1',
    name: 'Handcrafted Truffle Tagliolini',
    category: 'pasta',
    description: 'Silky bronze-cut egg pasta rolled fresh daily, tossed in cultured butter, cracked black pepper, Parmigiano Reggiano, and fragrant shaved truffle.',
    price: 490,
    isVeg: true,
    spiceLevel: 0,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281728?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 16,
    calories: 540,
    rating: 4.9,
    reviewsCount: 260
  },
  {
    id: 'pst-2',
    name: 'Fiery Rigatoni alla Vodka',
    category: 'pasta',
    description: 'Al dente ridged rigatoni enveloped in silky slow-simmered tomato vodka cream sauce with Calabrian chilies and freshly grated pecorino.',
    price: 410,
    isVeg: true,
    spiceLevel: 2,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 15,
    calories: 510,
    rating: 4.8,
    reviewsCount: 190
  },
  {
    id: 'pst-3',
    name: 'Classic Pappardelle Slow-Braised Lamb Ragu',
    category: 'pasta',
    description: 'Wide hand-cut pasta ribbons smothered in 6-hour braised lamb ragù with aromatic root vegetables, rosemary, and aged grana padano.',
    price: 560,
    isVeg: false,
    spiceLevel: 1,
    image: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 18,
    calories: 630,
    rating: 4.9,
    reviewsCount: 145
  },

  // BURGERS
  {
    id: 'bgr-1',
    name: 'Prime Black Angus & Truffle Burger',
    category: 'burgers',
    description: 'Double-smashed prime tender beef patty, melted aged English cheddar, truffle mushroom marmalade, and roasted garlic aioli in a toasted brioche bun.',
    price: 490,
    isVeg: false,
    spiceLevel: 1,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 16,
    calories: 780,
    rating: 4.9,
    reviewsCount: 280
  },
  {
    id: 'bgr-2',
    name: 'Crispy Korean Gochujang Fried Chicken Burger',
    category: 'burgers',
    description: 'Buttermilk fried chicken thigh drenched in sweet & spicy sticky gochujang glaze, house sesame kimchi slaw, and pickled daikon on brioche.',
    price: 420,
    isVeg: false,
    spiceLevel: 2,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 15,
    calories: 710,
    rating: 4.8,
    reviewsCount: 198
  },
  {
    id: 'bgr-3',
    name: 'Spiced Edamame & Quinoa Smash Burger',
    category: 'burgers',
    description: 'Crispy plant-based patty of edamame, red quinoa, and sweet corn, topped with crushed avocado guacamole, chipotle crema, and micro sprouts.',
    price: 360,
    isVeg: true,
    spiceLevel: 1,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 14,
    calories: 490,
    rating: 4.7,
    reviewsCount: 112,
    dietaryNotes: ['Vegetarian']
  },

  // DESSERTS
  {
    id: 'des-1',
    name: 'Deconstructed Tiramisu al Mascarpone',
    category: 'desserts',
    description: 'Espresso-soaked Savoiardi sponge, light zabaglione mascarpone mousse, 70% Valrhona cocoa dust, and single-origin coffee bean crunch.',
    price: 340,
    isVeg: true,
    spiceLevel: 0,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 10,
    calories: 420,
    rating: 4.9,
    reviewsCount: 460
  },
  {
    id: 'des-2',
    name: 'Warm Belgian Dark Chocolate Fondant',
    category: 'desserts',
    description: 'Rich molten lava cake made with 72% Belgian dark chocolate, yielding a warm silky core. Served with Madagascar bourbon vanilla bean gelato.',
    price: 360,
    isVeg: true,
    spiceLevel: 0,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 12,
    calories: 520,
    rating: 4.9,
    reviewsCount: 390
  },
  {
    id: 'des-3',
    name: 'Burnt Basque Saffron Cheesecake',
    category: 'desserts',
    description: 'Caramelized rustic Basque cheesecake with creamy molten center, infused with Persian saffron and accompanied by wild raspberry coulis.',
    price: 320,
    isVeg: true,
    spiceLevel: 0,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 8,
    calories: 380,
    rating: 4.8,
    reviewsCount: 175
  },
  {
    id: 'des-4',
    name: 'Bronte Pistachio & Wild Berry Panna Cotta',
    category: 'desserts',
    description: 'Silky Sicilian pistachio cream panna cotta topped with blueberry gelée, candied rose petals, and crushed roasted pistachios.',
    price: 290,
    isVeg: true,
    spiceLevel: 0,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 6,
    calories: 310,
    rating: 4.7,
    reviewsCount: 130,
    dietaryNotes: ['Vegetarian', 'Under ₹300']
  },

  // COFFEE & ARTISAN ROASTS
  {
    id: 'cof-1',
    name: 'Chikmagalur Single-Origin Pour Over',
    category: 'coffee',
    description: 'Light roast washed Arabica from Baba Budangiri hills (1400m). Notes of Meyer lemon, jasmine blossoms, honey nectar, and silky tea-like finish.',
    price: 220,
    isVeg: true,
    spiceLevel: 0,
    isPopular: true,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 6,
    calories: 5,
    rating: 4.9,
    reviewsCount: 340,
    dietaryNotes: ['Vegan', 'Sugar-Free', 'Under ₹300']
  },
  {
    id: 'cof-2',
    name: 'Velvet Vanilla Bean Flat White',
    category: 'coffee',
    description: 'Double ristretto shot of our signature house blend with micro-foamed steamed whole milk and natural Tahitian vanilla bean syrup.',
    price: 240,
    isVeg: true,
    spiceLevel: 0,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 5,
    calories: 140,
    rating: 4.8,
    reviewsCount: 275,
    customizableAddOns: [
      { id: 'ao-oat-milk', name: 'Barista Oat Milk', price: 40 },
      { id: 'ao-extra-shot', name: 'Extra Espresso Shot', price: 50 }
    ],
    dietaryNotes: ['Under ₹300']
  },
  {
    id: 'cof-3',
    name: 'Smoked Sea Salt Cold Brew with Tonic',
    category: 'coffee',
    description: '18-hour cold steeped single-origin coffee poured over artisanal Indian tonic water, aromatic orange wheel, and a whisper of smoked sea salt.',
    price: 260,
    isVeg: true,
    spiceLevel: 0,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 4,
    calories: 45,
    rating: 4.8,
    reviewsCount: 160,
    dietaryNotes: ['Vegan', 'Under ₹300']
  },
  {
    id: 'cof-4',
    name: 'Spanish Cortado al Caramelo',
    category: 'coffee',
    description: 'Equal parts dense espresso and silky warm milk with raw turbinado caramel swirl and cinnamon dusting in a fluted glass.',
    price: 210,
    isVeg: true,
    spiceLevel: 0,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 5,
    calories: 90,
    rating: 4.7,
    reviewsCount: 95,
    dietaryNotes: ['Under ₹300']
  },

  // MOCKTAILS
  {
    id: 'mck-1',
    name: 'Smoked Rosemary Grapefruit Paloma',
    category: 'mocktails',
    description: 'Fresh pink grapefruit juice, agave syrup, torched organic rosemary sprig, sparkling yuzu water, and Himalayan pink salt rim.',
    price: 280,
    isVeg: true,
    spiceLevel: 0,
    isPopular: true,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 5,
    calories: 95,
    rating: 4.9,
    reviewsCount: 220,
    dietaryNotes: ['Vegan', 'Under ₹300']
  },
  {
    id: 'mck-2',
    name: 'Passionfruit & Kaffir Lime Botanical Fizz',
    category: 'mocktails',
    description: 'Crushed passionfruit pulp, bruised Thai kaffir lime leaves, lemongrass cordial, tonic splash, and edible viola blossoms.',
    price: 290,
    isVeg: true,
    spiceLevel: 0,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 5,
    calories: 110,
    rating: 4.8,
    reviewsCount: 140,
    dietaryNotes: ['Vegan', 'Under ₹300']
  },
  {
    id: 'mck-3',
    name: 'Hibiscus Rose & Pomegranate Spritz',
    category: 'mocktails',
    description: 'Slow-brewed organic Egyptian hibiscus tea, fresh pomegranate reduction, Damascus rose water, and elderflower mist.',
    price: 270,
    isVeg: true,
    spiceLevel: 0,
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 5,
    calories: 85,
    rating: 4.8,
    reviewsCount: 125,
    dietaryNotes: ['Vegan', 'Under ₹300']
  },

  // BEVERAGES
  {
    id: 'bev-1',
    name: 'Wild Berry Fermented Kombucha',
    category: 'beverages',
    description: 'In-house brewed probiotic kombucha infused with wild mountain blueberries, raspberries, and a touch of ginger zest.',
    price: 240,
    isVeg: true,
    spiceLevel: 0,
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 2,
    calories: 45,
    rating: 4.7,
    reviewsCount: 89,
    dietaryNotes: ['Probiotic', 'Vegan', 'Under ₹300']
  },
  {
    id: 'bev-2',
    name: 'Ceremonial Uji Matcha Iced Latte',
    category: 'beverages',
    description: 'First harvest stone-ground ceremonial matcha from Kyoto, whisked with coconut sugar and velvety chilled oat milk.',
    price: 310,
    isVeg: true,
    spiceLevel: 0,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 6,
    calories: 120,
    rating: 4.9,
    reviewsCount: 190,
    dietaryNotes: ['Vegan', 'Antioxidant Rich']
  },

  // CHEF SPECIALS
  {
    id: 'chf-1',
    name: '24-Hour Braised Prime Lamb Shank & Saffron Polenta',
    category: 'chef-specials',
    description: 'Executive Chef Julian Vane signature: Prime lamb shank slowly braised with Barolo wine, mirepoix, and juniper berries over creamy saffron polenta.',
    price: 820,
    isVeg: false,
    spiceLevel: 1,
    isChefSpecial: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 25,
    calories: 790,
    rating: 5.0,
    reviewsCount: 180
  },
  {
    id: 'chf-2',
    name: 'Pan-Roasted Morels & Gold Leaf Truffle Risotto',
    category: 'chef-specials',
    description: 'Himalayan wild morels stuffed with herbed goat cheese, 24-carat edible gold leaf, vintage balsamic reduction, and white truffle emulsion.',
    price: 740,
    isVeg: true,
    spiceLevel: 0,
    isChefSpecial: true,
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 22,
    calories: 480,
    rating: 4.9,
    reviewsCount: 110,
    dietaryNotes: ['Vegetarian', 'Signature Dish']
  }
];

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'off-1',
    code: 'WEEKEND20',
    title: 'Weekend Culinary Rendezvous',
    subtitle: 'Flat 20% OFF on all signature dishes, woodfired pizzas, and pastas every Friday to Sunday.',
    discountType: 'percentage',
    discountValue: 20,
    minOrder: 800,
    maxDiscount: 350,
    validDays: 'Friday, Saturday & Sunday',
    validTill: 'Ongoing Seasonal Promotion',
    badge: '20% OFF WEEKEND',
    terms: 'Valid on dine-in bookings and online orders above ₹800. Cannot be combined with other promotional vouchers.',
    bannerImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop&q=80'
  },
  {
    id: 'off-2',
    code: 'AURA15',
    title: 'First Dining Welcome Treat',
    subtitle: 'Experience our hospitality with 15% off your first online order or table reservation.',
    discountType: 'percentage',
    discountValue: 15,
    minOrder: 500,
    maxDiscount: 250,
    validDays: 'All Days',
    validTill: 'Valid on First Order',
    badge: '15% OFF FIRST VISIT',
    terms: 'Applies automatically at checkout or booking when code AURA15 is entered.',
    bannerImage: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1000&auto=format&fit=crop&q=80'
  },
  {
    id: 'off-3',
    code: 'BREW50',
    title: 'Artisan Coffee Happy Hour',
    subtitle: 'Buy 1 Get 50% OFF on your second single-origin pour-over or barista coffee.',
    discountType: 'percentage',
    discountValue: 50,
    minOrder: 300,
    validDays: 'Monday to Thursday (3 PM – 6 PM)',
    validTill: 'Mon - Thu 3:00 PM - 6:00 PM',
    badge: 'HAPPY HOUR 50% OFF',
    terms: 'Discount applies to lower-priced beverage in cart during happy hours.',
    bannerImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1000&auto=format&fit=crop&q=80'
  },
  {
    id: 'off-4',
    code: 'ROMANCE',
    title: 'Candlelight Date Night Experience',
    subtitle: 'Complimentary dessert platter + two botanical mocktails on reserving our Candlelight Table.',
    discountType: 'flat',
    discountValue: 450,
    minOrder: 1500,
    validDays: 'Every Evening from 7 PM',
    validTill: 'Table Reservation Exclusive',
    badge: 'DATE NIGHT SPECIAL',
    terms: 'Minimum 2 guests required. Select "Date Night / Anniversary" in reservation form.',
    bannerImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&auto=format&fit=crop&q=80'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Natasha Singhania',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    date: '3 days ago',
    verified: true,
    visitType: 'Date Night Dinner',
    review: "Hands down the most sublime dining experience in Bangalore. The Wild Mushroom & Truffle Risotto was an absolute revelation, and the open-air glasshouse patio feels straight out of Lake Como. Exceptional wine pairings and the AI reservation assistant made table booking effortless!",
    favoriteDish: 'Wild Forest Mushroom & Truffle Risotto'
  },
  {
    id: 'rev-2',
    author: 'Chef David Morante',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    date: '1 week ago',
    verified: true,
    visitType: 'Culinary Enthusiast',
    review: "As a traveling chef, I scrutinize pasta dough relentlessly. L'Aura's bronze-cut Handcrafted Truffle Tagliolini has the exact bite, silkiness, and emulsified emulsion you only find in Bologna. Their single-origin pour-overs are roasted with master precision.",
    favoriteDish: 'Handcrafted Truffle Tagliolini'
  },
  {
    id: 'rev-3',
    author: 'Pooja & Rohan Iyer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    date: '2 weeks ago',
    verified: true,
    visitType: '5th Anniversary Celebration',
    review: "We celebrated our 5th anniversary at the romantic candlelight corner. The team welcomed us with handwritten notes, rose petal décor, and complimentary molten chocolate fondant. Truly world-class hospitality and food that lingers in your memory.",
    favoriteDish: 'Belgian Dark Chocolate Fondant'
  },
  {
    id: 'rev-4',
    author: 'Arjun Swaminathan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    date: '3 weeks ago',
    verified: true,
    visitType: 'Business Lunch',
    review: "Ideal setting for senior client meetings. Swift valet service, quiet alcove seating, prompt high-speed Wi-Fi, and phenomenal woodfired Neapolitan pizzas. The Tartufo & Funghi pizza has ruined all other pizzas for me!",
    favoriteDish: 'Tartufo & Wild Funghi Pizza'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Woodfired Culinary Magic',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&auto=format&fit=crop&q=80',
    caption: '72-hour fermented sourdough blistered to perfection in our custom Italian stone oven.'
  },
  {
    id: 'gal-2',
    title: 'The Glasshouse Dining Veranda',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80',
    caption: 'Intimate ambiance bathed in ambient candlelight and lush tropical flora.'
  },
  {
    id: 'gal-3',
    title: 'Botanical Paloma & Craft Mixology',
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200&auto=format&fit=crop&q=80',
    caption: 'Handcrafted botanical elixirs, house-smoked herbs, and artisanal tonics.'
  },
  {
    id: 'gal-4',
    title: 'Executive Chef Julian Vane at the Counter',
    category: 'chef',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1200&auto=format&fit=crop&q=80',
    caption: 'Plating the signature 24-hr braised lamb shank with micro-culinary precision.'
  },
  {
    id: 'gal-5',
    title: 'Intimate Candlelight Evenings',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1200&auto=format&fit=crop&q=80',
    caption: 'Live acoustic jazz duos and curated wine pairing nights every Friday & Saturday.'
  },
  {
    id: 'gal-6',
    title: 'Chikmagalur Pour-Over Station',
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&auto=format&fit=crop&q=80',
    caption: 'Precision water temperature and fresh estate micro-lot roasts.'
  },
  {
    id: 'gal-7',
    title: 'The Private Tasting Vault',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200&auto=format&fit=crop&q=80',
    caption: 'Exclusive alcove for corporate dinners and bespoke anniversary celebrations.'
  },
  {
    id: 'gal-8',
    title: 'Bronze-Cut Tagliolini & Black Winter Truffle',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281728?w=1200&auto=format&fit=crop&q=80',
    caption: 'Fresh pasta rolled every morning using organic heritage egg yolks.'
  }
];

export const DECISION_FLOWS = [
  {
    id: 'quick-bite',
    icon: '🍕',
    label: 'Quick Bite',
    title: 'Fast, Flavor-Packed Delights',
    description: 'Need something quick yet extraordinary? Grab our crisp sourdough slices or gourmet smash burgers paired with cold brew.',
    suggestedDishes: ['Tartufo & Wild Funghi Pizza', 'Spiced Edamame & Quinoa Smash Burger', 'Smoked Sea Salt Cold Brew with Tonic'],
    recommendedSeating: 'High-Top Roastery Bar or Express Bistro Booth',
    specialOfferNote: 'Ready in 12–15 minutes guaranteed.',
    ctaAction: 'order',
    ctaText: 'Order Quick Bite'
  },
  {
    id: 'coffee-chill',
    icon: '☕',
    label: 'Coffee & Chill',
    title: 'Artisan Roastery & Relaxed Vibes',
    description: 'Unwind with specialty single-origin pour-overs, freshly whipped Basque saffron cheesecake, and lush green terrace views.',
    suggestedDishes: ['Chikmagalur Single-Origin Pour Over', 'Velvet Vanilla Bean Flat White', 'Burnt Basque Saffron Cheesecake'],
    recommendedSeating: 'Glasshouse Garden Lounge with charging docks',
    specialOfferNote: 'Happy hour 50% off second brew (3 PM – 6 PM).',
    ctaAction: 'menu',
    ctaText: 'Explore Coffee Bar'
  },
  {
    id: 'family-dinner',
    icon: '🍽️',
    label: 'Family Dinner',
    title: 'Abundant Feast for Everyone',
    description: 'Shareable starters, woodfired artisanal pizzas, decadent Awadhi curries, and delightful dessert platters for all generations.',
    suggestedDishes: ['Margherita Autentica DOP', 'Dum Pukht Awadhi Paneer Kofta', 'Deconstructed Tiramisu al Mascarpone'],
    recommendedSeating: 'Spacious Center Family Booths with high chairs available',
    specialOfferNote: '20% off weekend family orders above ₹1500.',
    ctaAction: 'reserve',
    ctaText: 'Reserve Family Table'
  },
  {
    id: 'date-night',
    icon: '❤️',
    label: 'Date Night',
    title: 'Intimate Romance & Candlelight',
    description: 'Soft jazz melodies, warm amber lighting, hand-rolled truffle pastas, paired botanical palomas, and molten chocolate fondant.',
    suggestedDishes: ['Handcrafted Truffle Tagliolini', 'Pan-Seared Chilean Seabass', 'Warm Belgian Dark Chocolate Fondant', 'Smoked Rosemary Grapefruit Paloma'],
    recommendedSeating: 'Intimate Candlelit Alcove or Veranda Garden Corner',
    specialOfferNote: 'Complimentary dessert platter on reservation code ROMANCE.',
    ctaAction: 'reserve',
    ctaText: 'Reserve Romantic Table'
  },
  {
    id: 'party',
    icon: '🎉',
    label: 'Celebration / Party',
    title: 'Birthdays & Special Milestones',
    description: 'Custom customized menus, personalized table decorations, handcrafted mocktails, and chef-curated tasting platters for groups.',
    suggestedDishes: ['Charred Saffron Malai Broccoli', 'Spicy Diavola & Smoked Pepperoni', 'Crispy Calamari Fritti', 'Ceremonial Uji Matcha Iced Latte'],
    recommendedSeating: 'Private Dining Room or Semi-Private Glasshouse Terrace',
    specialOfferNote: 'Complimentary celebration cake for parties of 6+.',
    ctaAction: 'reserve',
    ctaText: 'Plan Celebration'
  },
  {
    id: 'business',
    icon: '💼',
    label: 'Business Dining',
    title: 'Polished & Discerning Ambiance',
    description: 'Discreet service, comfortable leather banquettes, low acoustic interference, seamless Wi-Fi, and sophisticated culinary presentation.',
    suggestedDishes: ['Wild Forest Mushroom & Truffle Risotto', 'Sous-Vide Herb Butter Chicken Supreme', 'Spanish Cortado al Caramelo'],
    recommendedSeating: 'Executive Mezzanine Lounge',
    specialOfferNote: 'Fast express business bill presentation available.',
    ctaAction: 'reserve',
    ctaText: 'Book Business Table'
  }
];
