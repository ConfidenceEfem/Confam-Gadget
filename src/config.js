// ─────────────────────────────────────────────────────────────
//  ONE FILE TO REBRAND THE STORE
//  Name, WhatsApp number, contact details, delivery info and
//  hero banners live here. Products are in src/data/products.js
// ─────────────────────────────────────────────────────────────
export const config = {
  brand: {
    name: 'Confam Gadget',
    first: 'Confam',
    second: 'Gadget',
    tagline: 'Original gadgets. Confam quality.',
    description:
      'Phones, laptops, tablets, watches, audio and accessories. 100% original products with warranty and nationwide delivery.',
  },

  // WhatsApp number in international format, digits only (no + or spaces).
  whatsapp: {
    number: '2348000000000',
    greeting: 'Hello Confam Gadget, I would like to ask about a product.',
  },

  contact: {
    phone: '+234 800 000 0000',
    email: 'hello@confamgadget.example',
    instagram: '@confamgadget',
    address: 'Shop 12, Computer Village, Ikeja, Lagos, Nigeria',
    mapsUrl: 'https://maps.google.com',
    hours: [
      ['Monday to Saturday', '9:00am to 7:00pm'],
      ['Sunday', '1:00pm to 5:00pm'],
    ],
  },

  currency: '₦',
  productsPerPage: 12,
  topBarText: 'Welcome to Confam Gadget. Original gadgets, delivered nationwide.',

  // Free delivery threshold shown in the cart
  freeDeliveryAbove: 250000,

  heroSlides: [
    { kicker: 'New Arrival', title: 'Samsung Galaxy S24 Ultra', sub: 'Sale up to', badge: '12% OFF', note: 'Free delivery in Lagos on all orders.', art: 'phone', color: '#3a3f4b', link: '/product/samsung-galaxy-s24-ultra', bg: 'a' },
    { kicker: 'Work Smarter', title: 'MacBook Air M2 13"', sub: 'Save up to', badge: '₦150K', note: 'Original with 1 year warranty.', art: 'laptop', color: '#b9bfc9', link: '/product/macbook-air-m2-13', bg: 'b' },
    { kicker: 'Hear Everything', title: 'Sony WH-1000XM5 Headphones', sub: 'Sale up to', badge: '18% OFF', note: 'Best-in-class noise cancelling.', art: 'headphones', color: '#1f2937', link: '/product/sony-wh-1000xm5', bg: 'c' },
  ],

  sideBanners: [
    { kicker: 'Weekend Deal', title: 'Up to 20% OFF', sub: 'Smart watches and bands', art: 'watch', color: '#f97316', to: '/shop?cat=watches', tone: 'dark' },
    { kicker: 'Game Time', title: 'PS5 Slim', sub: 'In stock. Order today.', art: 'console', color: '#e5e7eb', to: '/shop?cat=gaming', tone: 'blue' },
  ],

  faqs: [
    ['Are your products original?', 'Yes. Every gadget is 100% original and comes with a warranty. Used (UK used) items are clearly labelled.'],
    ['How do I order?', 'Add items to your cart, then tap "Checkout on WhatsApp". Your order is sent to us as a message and we confirm availability, delivery fee and payment.'],
    ['Do you deliver nationwide?', 'Yes. Lagos deliveries take 24 to 48 hours. Other states take 2 to 5 working days.'],
    ['Can I pay on delivery?', 'Pay on delivery is available within Lagos. Other states pay before dispatch.'],
    ['What if the item is faulty?', 'Report within 7 days and we will replace it or fix it under warranty.'],
  ],
};
