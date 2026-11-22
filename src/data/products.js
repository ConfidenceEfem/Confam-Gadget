// ─────────────────────────────────────────────────────────────
//  PRODUCTS. To add one, copy a row and edit it.
//  Row: [name, brand, category, art, color, price, oldPrice, rating, reviews, stock, tags, specs, description]
//   category: phones laptops tablets watches audio gaming cameras tv accessories smart-home
//   art: phone laptop tablet watch headphones earbuds speaker gamepad console camera tv powerbank keyboard router charger
//   stock: 'in' | 'low' | 'out'      tags: best, new, flash
//   specs: 4 values, labelled automatically (see SPEC_LABELS)
//   To use a real photo, add  image: 'https://...'  in the object at the bottom.
// ─────────────────────────────────────────────────────────────
import localImages from './images.json' with { type: 'json' };

export const CATEGORIES = [
  { slug: 'phones', name: 'Phones', art: 'phone', color: '#3b82f6' },
  { slug: 'laptops', name: 'Laptops', art: 'laptop', color: '#94a3b8' },
  { slug: 'tablets', name: 'Tablets', art: 'tablet', color: '#8b5cf6' },
  { slug: 'watches', name: 'Watches', art: 'watch', color: '#f97316' },
  { slug: 'audio', name: 'Audio', art: 'headphones', color: '#ef4444' },
  { slug: 'gaming', name: 'Gaming', art: 'gamepad', color: '#22c55e' },
  { slug: 'cameras', name: 'Cameras', art: 'camera', color: '#475569' },
  { slug: 'tv', name: 'TVs', art: 'tv', color: '#0ea5e9' },
  { slug: 'accessories', name: 'Accessories', art: 'powerbank', color: '#14b8a6' },
  { slug: 'smart-home', name: 'Smart Home', art: 'router', color: '#6366f1' },
];

const SPEC_LABELS = {
  phone: ['Display', 'Storage', 'Camera', 'Battery'],
  laptop: ['Processor', 'Memory', 'Storage', 'Display'],
  tablet: ['Display', 'Storage', 'Battery', 'Connectivity'],
  watch: ['Display', 'Battery', 'Water resistance', 'Sensors'],
  headphones: ['Type', 'Battery', 'Connectivity', 'Features'],
  earbuds: ['Type', 'Battery', 'Connectivity', 'Features'],
  speaker: ['Type', 'Battery', 'Connectivity', 'Features'],
  gamepad: ['Type', 'Compatibility', 'Connectivity', 'Features'],
  console: ['Type', 'Storage', 'Output', 'Features'],
  camera: ['Sensor', 'Video', 'Lens', 'Battery'],
  tv: ['Screen size', 'Resolution', 'Smart features', 'Ports'],
  powerbank: ['Capacity', 'Output', 'Ports', 'Features'],
  charger: ['Output', 'Ports', 'Compatibility', 'Features'],
  keyboard: ['Type', 'Connectivity', 'Layout', 'Battery'],
  router: ['Standard', 'Speed', 'Coverage', 'Features'],
};

const rows = [
  // ───── PHONES
  ['Samsung Galaxy S24 Ultra', 'Samsung', 'phones', 'phone', '#3a3f4b', 1450000, 1650000, 4.8, 312, 'in', 'best,flash', ['6.8" QHD+ AMOLED, 120Hz', '256GB / 12GB RAM', '200MP quad camera', '5000mAh, 45W fast charge'], 'Samsung\'s most powerful phone with a built-in S Pen, titanium frame and Galaxy AI. A flagship camera and a screen that stays bright outdoors.'],
  ['iPhone 15 Pro Max 256GB', 'Apple', 'phones', 'phone', '#7a7d84', 1780000, 1900000, 4.9, 268, 'low', 'best,new', ['6.7" Super Retina XDR', '256GB', '48MP main + 5x telephoto', 'Up to 29 hrs video'], 'Titanium design, A17 Pro chip and USB-C. The best iPhone camera system yet, with a 5x optical zoom.'],
  ['iPhone 14 128GB', 'Apple', 'phones', 'phone', '#3b5bdb', 780000, 850000, 4.7, 421, 'in', 'best', ['6.1" Super Retina XDR', '128GB', '12MP dual camera', 'Up to 20 hrs video'], 'A dependable iPhone with a great camera, Emergency SOS via satellite and all-day battery life.'],
  ['iPhone 12 Pro Max (UK Used)', 'Apple', 'phones', 'phone', '#1f3a5f', 520000, 600000, 4.5, 198, 'in', 'flash', ['6.7" Super Retina XDR', '128GB', '12MP triple camera', 'Up to 20 hrs video'], 'Clean UK used iPhone 12 Pro Max, tested and verified. Great value for a large-screen premium phone.'],
  ['Samsung Galaxy A55 5G', 'Samsung', 'phones', 'phone', '#5a4e9d', 395000, 440000, 4.5, 143, 'in', 'new', ['6.6" Super AMOLED, 120Hz', '256GB / 8GB RAM', '50MP OIS camera', '5000mAh, 25W'], 'Premium metal-and-glass design with a smooth AMOLED display and years of software updates.'],
  ['Tecno Camon 30 Pro', 'Tecno', 'phones', 'phone', '#14b8a6', 345000, 389000, 4.4, 96, 'in', 'new', ['6.78" AMOLED curved', '256GB / 12GB RAM', '50MP RGBW portrait camera', '5000mAh, 70W'], 'Made for portraits and low-light photos, with very fast charging and a stylish curved screen.'],
  ['Infinix Note 40 Pro', 'Infinix', 'phones', 'phone', '#22c55e', 245000, 280000, 4.3, 211, 'in', 'best,flash', ['6.78" AMOLED, 120Hz', '256GB / 8GB RAM', '108MP camera', '5000mAh, 70W + wireless'], 'Wireless charging and magnetic accessories at a price that makes sense.'],
  ['Xiaomi Redmi Note 13 Pro', 'Xiaomi', 'phones', 'phone', '#0ea5e9', 285000, 320000, 4.4, 130, 'in', '', ['6.67" AMOLED, 120Hz', '256GB / 8GB RAM', '200MP camera', '5100mAh, 67W'], 'A 200MP camera and a vivid AMOLED screen make this one of the best mid-range phones.'],
  ['Google Pixel 8', 'Google', 'phones', 'phone', '#64748b', 640000, 720000, 4.6, 74, 'low', '', ['6.2" OLED, 120Hz', '128GB / 8GB RAM', '50MP main + ultrawide', '4575mAh, 27W'], 'Clean Android, brilliant photos and 7 years of updates, powered by Google Tensor G3.'],
  ['Itel A70', 'Itel', 'phones', 'phone', '#f59e0b', 95000, 110000, 4.0, 305, 'in', 'best', ['6.6" HD+ 90Hz', '128GB / 4GB RAM', '13MP camera', '5000mAh'], 'Big screen, big battery, small price. A solid everyday phone.'],

  // ───── LAPTOPS
  ['MacBook Air M2 13"', 'Apple', 'laptops', 'laptop', '#b9bfc9', 1250000, 1400000, 4.9, 187, 'in', 'best,flash', ['Apple M2 8-core', '8GB unified', '256GB SSD', '13.6" Liquid Retina'], 'Thin, silent and fast. Up to 18 hours of battery life and MagSafe charging.'],
  ['MacBook Pro 14" M3', 'Apple', 'laptops', 'laptop', '#2d3139', 2350000, 2550000, 4.9, 92, 'low', 'new', ['Apple M3 8-core', '8GB unified', '512GB SSD', '14.2" Liquid Retina XDR'], 'Pro performance and a gorgeous mini-LED display for developers, editors and designers.'],
  ['HP Pavilion 15 (Core i5)', 'HP', 'laptops', 'laptop', '#cbd5e1', 640000, 710000, 4.3, 164, 'in', 'best', ['Intel Core i5 13th Gen', '16GB DDR4', '512GB SSD', '15.6" FHD IPS'], 'A reliable all-rounder for school, office work and streaming.'],
  ['Dell XPS 13', 'Dell', 'laptops', 'laptop', '#9ca3af', 1480000, 1620000, 4.7, 58, 'in', 'new', ['Intel Core Ultra 7', '16GB LPDDR5X', '512GB SSD', '13.4" FHD+ InfinityEdge'], 'Premium compact laptop with a near borderless display and a machined aluminium body.'],
  ['Lenovo ThinkPad E14', 'Lenovo', 'laptops', 'laptop', '#111827', 720000, 790000, 4.4, 77, 'in', '', ['Intel Core i5 13th Gen', '16GB DDR4', '512GB SSD', '14" FHD IPS'], 'Business-grade durability with a legendary keyboard.'],
  ['Asus VivoBook 15', 'Asus', 'laptops', 'laptop', '#a5b4fc', 520000, 590000, 4.2, 119, 'in', 'flash', ['Intel Core i3 12th Gen', '8GB DDR4', '256GB SSD', '15.6" FHD'], 'Light, affordable and fast enough for everyday work.'],
  ['HP EliteBook 840 G5 (UK Used)', 'HP', 'laptops', 'laptop', '#475569', 285000, 340000, 4.3, 241, 'in', 'best', ['Intel Core i5 8th Gen', '16GB DDR4', '256GB SSD', '14" FHD'], 'Tested UK used business laptop. Great budget option for students and freelancers.'],

  // ───── TABLETS
  ['iPad 10th Generation 64GB', 'Apple', 'tablets', 'tablet', '#f472b6', 465000, 510000, 4.7, 134, 'in', 'best', ['10.9" Liquid Retina', '64GB', 'Up to 10 hrs', 'Wi-Fi'], 'Colourful, capable and works with Apple Pencil (1st gen) and the Magic Keyboard Folio.'],
  ['iPad Air M2 11"', 'Apple', 'tablets', 'tablet', '#818cf8', 890000, 970000, 4.8, 63, 'low', 'new', ['11" Liquid Retina', '128GB', 'Up to 10 hrs', 'Wi-Fi'], 'M2 power in a thin, light design. Perfect for creators and students.'],
  ['Samsung Galaxy Tab S9 FE', 'Samsung', 'tablets', 'tablet', '#a3e635', 420000, 470000, 4.5, 88, 'in', '', ['10.9" TFT 90Hz', '128GB', '8000mAh', 'Wi-Fi + S Pen included'], 'IP68 water resistance and an S Pen in the box.'],
  ['Lenovo Tab P12', 'Lenovo', 'tablets', 'tablet', '#38bdf8', 310000, 350000, 4.2, 41, 'in', 'flash', ['12.7" 3K display', '128GB', '10200mAh', 'Wi-Fi'], 'A huge, sharp screen for movies and notes at a friendly price.'],
  ['Xiaomi Pad 6', 'Xiaomi', 'tablets', 'tablet', '#334155', 295000, 335000, 4.4, 52, 'out', '', ['11" 2.8K 144Hz', '128GB', '8840mAh, 33W', 'Wi-Fi'], 'Smooth 144Hz screen and a Snapdragon 870 for gaming and streaming.'],

  // ───── WATCHES
  ['Apple Watch Series 9 45mm', 'Apple', 'watches', 'watch', '#e11d48', 420000, 470000, 4.8, 109, 'in', 'best,new', ['45mm Always-On Retina', 'Up to 18 hrs', '50m', 'ECG, Blood Oxygen, Temp'], 'Brighter display, faster chip and a new double-tap gesture.'],
  ['Samsung Galaxy Watch 6', 'Samsung', 'watches', 'watch', '#334155', 245000, 280000, 4.5, 84, 'in', 'flash', ['1.5" Super AMOLED', 'Up to 40 hrs', '5ATM + IP68', 'Heart rate, BIA, Sleep'], 'Sleep coaching, body composition and a sleek rotating-bezel look.'],
  ['Xiaomi Smart Band 8', 'Xiaomi', 'watches', 'watch', '#f97316', 38000, 45000, 4.4, 520, 'in', 'best,flash', ['1.62" AMOLED', 'Up to 16 days', '5ATM', 'Heart rate, SpO2, 150+ sports'], 'The most popular fitness band on the market with a bright AMOLED screen.'],
  ['Amazfit GTR 4', 'Amazfit', 'watches', 'watch', '#0f172a', 185000, 215000, 4.4, 47, 'in', '', ['1.45" AMOLED', 'Up to 14 days', '5ATM', 'GPS, Heart rate, SpO2'], 'Dual-band GPS and a two-week battery in a classic round design.'],
  ['Garmin Venu 3', 'Garmin', 'watches', 'watch', '#a8a29e', 520000, 575000, 4.7, 29, 'low', 'new', ['1.4" AMOLED', 'Up to 14 days', '5ATM', 'GPS, Sleep Coach, Body Battery'], 'Premium health and fitness watch with Garmin\'s best sleep tracking.'],
  ['Huawei Watch Fit 3', 'Huawei', 'watches', 'watch', '#7c3aed', 115000, 135000, 4.3, 62, 'in', '', ['1.82" AMOLED', 'Up to 10 days', '5ATM', 'Heart rate, SpO2, 100+ sports'], 'Slim, light and colourful with an Apple Watch-style design.'],

  // ───── AUDIO
  ['Apple AirPods Pro (2nd Gen)', 'Apple', 'audio', 'earbuds', '#f8fafc', 235000, 265000, 4.8, 356, 'in', 'best', ['True wireless earbuds', 'Up to 6 hrs (30 with case)', 'Bluetooth 5.3', 'ANC, Transparency, USB-C'], 'Twice the noise cancelling, adaptive transparency and personalised spatial audio.'],
  ['Sony WH-1000XM5', 'Sony', 'audio', 'headphones', '#1f2937', 385000, 470000, 4.8, 173, 'in', 'best,flash', ['Over-ear wireless', 'Up to 30 hrs', 'Bluetooth 5.2, multipoint', 'Industry-leading ANC'], 'The reference for noise cancelling headphones. Crystal clear calls and all-day comfort.'],
  ['JBL Tune 520BT', 'JBL', 'audio', 'headphones', '#2563eb', 42000, 50000, 4.3, 289, 'in', 'best', ['On-ear wireless', 'Up to 57 hrs', 'Bluetooth 5.3', 'JBL Pure Bass, Fast Pair'], 'Punchy JBL bass and a huge 57-hour battery for very little money.'],
  ['JBL Flip 6 Portable Speaker', 'JBL', 'audio', 'speaker', '#ef4444', 135000, 155000, 4.7, 203, 'in', 'flash', ['Portable Bluetooth speaker', 'Up to 12 hrs', 'Bluetooth 5.1, PartyBoost', 'IP67 waterproof'], 'Loud, clear and nearly indestructible. Take it to the beach or the pool.'],
  ['Samsung Galaxy Buds2 Pro', 'Samsung', 'audio', 'earbuds', '#7c3aed', 125000, 150000, 4.5, 76, 'in', '', ['True wireless earbuds', 'Up to 5 hrs (18 with case)', 'Bluetooth 5.3', 'ANC, 360 Audio, IPX7'], 'Hi-Fi 24-bit audio and smart noise control in a tiny shell.'],
  ['Oraimo FreePods 4', 'Oraimo', 'audio', 'earbuds', '#0f172a', 28000, 34000, 4.2, 612, 'in', 'best', ['True wireless earbuds', 'Up to 7 hrs (35 with case)', 'Bluetooth 5.3', 'ANC, Gaming mode'], 'The Nigerian favourite: great sound, strong battery and wallet-friendly.'],
  ['Anker Soundcore Q30', 'Anker', 'audio', 'headphones', '#334155', 65000, 78000, 4.5, 118, 'in', '', ['Over-ear wireless', 'Up to 40 hrs', 'Bluetooth 5.0', 'Hybrid ANC, Hi-Res'], 'Affordable ANC headphones with tunable sound in the Soundcore app.'],
  ['Bose SoundLink Flex', 'Bose', 'audio', 'speaker', '#f59e0b', 175000, 195000, 4.7, 45, 'low', '', ['Portable Bluetooth speaker', 'Up to 12 hrs', 'Bluetooth 5.3', 'IP67, PositionIQ'], 'Bose clarity in a rugged, pocketable speaker.'],
  ['Xiaomi Buds 4', 'Xiaomi', 'audio', 'earbuds', '#e5e7eb', 36000, 42000, 4.1, 94, 'in', '', ['True wireless earbuds', 'Up to 9 hrs (30 with case)', 'Bluetooth 5.3', 'ANC, IP54'], 'Comfortable and clear with decent ANC at a budget price.'],

  // ───── GAMING
  ['PlayStation 5 Slim (Disc)', 'Sony', 'gaming', 'console', '#f1f5f9', 780000, 860000, 4.9, 221, 'low', 'best,flash', ['Home console', '1TB SSD', '4K up to 120fps', 'Ray tracing, DualSense'], 'Lightning-fast loading and immersive haptic feedback. Includes one DualSense controller.'],
  ['Xbox Series S 512GB', 'Microsoft', 'gaming', 'console', '#f8fafc', 410000, 450000, 4.6, 87, 'in', '', ['Home console', '512GB SSD', '1440p up to 120fps', 'Game Pass ready'], 'Next-gen speed in a compact white box. Perfect with Game Pass.'],
  ['Nintendo Switch OLED', 'Nintendo', 'gaming', 'console', '#ef4444', 395000, 430000, 4.8, 103, 'in', 'new', ['Hybrid console', '64GB', '7" OLED / TV 1080p', 'Joy-Con, Handheld mode'], 'Play at home or on the go with a vibrant 7-inch OLED screen.'],
  ['PS5 DualSense Controller', 'Sony', 'gaming', 'gamepad', '#f8fafc', 58000, 68000, 4.8, 276, 'in', 'best', ['Wireless controller', 'PS5, PC, Mobile', 'Bluetooth, USB-C', 'Haptics, Adaptive triggers'], 'Feel every moment with haptic feedback and adaptive triggers.'],
  ['Xbox Wireless Controller', 'Microsoft', 'gaming', 'gamepad', '#111827', 48000, 56000, 4.7, 190, 'in', '', ['Wireless controller', 'Xbox, PC, Mobile', 'Bluetooth, USB-C', 'Hybrid D-pad, Share button'], 'Comfortable ergonomics and wide compatibility.'],
  ['8BitDo Pro 2 Controller', '8BitDo', 'gaming', 'gamepad', '#a3a3a3', 38000, 44000, 4.5, 39, 'out', '', ['Wireless controller', 'Switch, PC, Android', 'Bluetooth, 2.4G', 'Back paddles, Custom profiles'], 'A classic layout with modern features and full button remapping.'],

  // ───── CAMERAS
  ['Canon EOS R50 Kit', 'Canon', 'cameras', 'camera', '#1f2937', 785000, 860000, 4.7, 36, 'low', 'new', ['24.2MP APS-C', '4K 30p', 'RF-S 18-45mm kit', 'Up to 370 shots'], 'Compact mirrorless camera for creators with great autofocus and easy controls.'],
  ['Sony ZV-E10 Vlog Camera', 'Sony', 'cameras', 'camera', '#111827', 640000, 710000, 4.6, 51, 'in', '', ['24.2MP APS-C', '4K 30p', 'E 16-50mm kit', 'Up to 440 shots'], 'Built for vlogging with a side-flip screen, directional mic and product showcase mode.'],
  ['GoPro HERO12 Black', 'GoPro', 'cameras', 'camera', '#0f172a', 395000, 440000, 4.6, 64, 'in', 'flash', ['27MP sensor', '5.3K 60p', 'Ultra-wide HyperView', 'Up to 70 mins 5.3K'], 'Rugged waterproof action camera with ultra-smooth HyperSmooth stabilisation.'],
  ['DJI Osmo Pocket 3', 'DJI', 'cameras', 'camera', '#e2e8f0', 520000, 570000, 4.8, 28, 'low', 'new', ['1" CMOS', '4K 120p', 'Rotating 2" screen', 'Up to 166 mins'], 'A pocket gimbal camera for silky, cinema-looking video.'],

  // ───── TVs
  ['Samsung 55" Crystal UHD 4K', 'Samsung', 'tv', 'tv', '#0f172a', 520000, 580000, 4.5, 118, 'in', 'best', ['55 inch', '4K UHD 3840 x 2160', 'Tizen, Netflix, YouTube', '3 HDMI, 1 USB'], 'Crystal Processor 4K gives rich colour and clear detail in every scene.'],
  ['LG 43" Smart FHD TV', 'LG', 'tv', 'tv', '#1e293b', 285000, 320000, 4.3, 157, 'in', '', ['43 inch', 'Full HD 1920 x 1080', 'webOS, Netflix, YouTube', '2 HDMI, 1 USB'], 'Compact smart TV with webOS and ThinQ AI for bedrooms and small living rooms.'],
  ['Hisense 65" ULED 4K', 'Hisense', 'tv', 'tv', '#0b1220', 845000, 950000, 4.4, 42, 'low', 'flash', ['65 inch', '4K UHD, Quantum Dot', 'VIDAA, Netflix, YouTube', '4 HDMI, 2 USB'], 'A giant, bright quantum-dot display with Dolby Vision and Atmos.'],
  ['TCL 50" Google TV 4K', 'TCL', 'tv', 'tv', '#111827', 345000, 390000, 4.3, 73, 'in', '', ['50 inch', '4K UHD HDR', 'Google TV, Chromecast', '3 HDMI, 2 USB'], 'Google TV built in, with hands-free voice control and Dolby Audio.'],

  // ───── ACCESSORIES
  ['Anker PowerCore 20000mAh', 'Anker', 'accessories', 'powerbank', '#0f172a', 48000, 56000, 4.7, 331, 'in', 'best', ['20,000mAh', '22.5W fast charge', 'USB-C + 2x USB-A', 'PowerIQ, Multi-protection'], 'Charges most phones 4+ times. Trusted Anker safety and quality.'],
  ['Oraimo Power Bank 10000mAh', 'Oraimo', 'accessories', 'powerbank', '#f59e0b', 14500, 17500, 4.2, 480, 'in', 'best,flash', ['10,000mAh', '22.5W fast charge', 'USB-C + USB-A', 'LED display'], 'Slim, affordable and fast. A daily carry essential.'],
  ['Apple 20W USB-C Charger', 'Apple', 'accessories', 'charger', '#f8fafc', 22000, 26000, 4.6, 145, 'in', '', ['20W', '1x USB-C', 'iPhone, iPad, AirPods', 'Fast charge'], 'Original Apple fast charger for iPhone 8 and later.'],
  ['Anker 65W GaN Charger', 'Anker', 'accessories', 'charger', '#334155', 38000, 45000, 4.7, 98, 'in', 'new', ['65W', '2x USB-C + 1x USB-A', 'Laptop, phone, tablet', 'GaN, PowerIQ 3.0'], 'One tiny charger for your laptop, phone and tablet.'],
  ['Logitech MX Keys Keyboard', 'Logitech', 'accessories', 'keyboard', '#1f2937', 115000, 130000, 4.7, 56, 'in', '', ['Wireless full-size', 'Bluetooth + Bolt', 'QWERTY, backlit', 'Up to 10 days'], 'Perfect-stroke keys, smart backlighting and multi-device switching.'],
  ['Keychron K2 Mechanical Keyboard', 'Keychron', 'accessories', 'keyboard', '#38bdf8', 95000, 108000, 4.6, 44, 'low', 'new', ['Wireless mechanical', 'Bluetooth + USB-C', '75% layout, hot-swap', 'Up to 240 hrs'], 'Compact mechanical typing for Mac and Windows.'],
  ['Samsung 25W Super Fast Charger', 'Samsung', 'accessories', 'charger', '#f1f5f9', 19500, 24000, 4.4, 210, 'in', '', ['25W', '1x USB-C', 'Galaxy phones and tablets', 'Cable included'], 'Original Samsung charger with Super Fast Charging.'],

  // ───── SMART HOME
  ['TP-Link Archer AX55 Wi-Fi 6 Router', 'TP-Link', 'smart-home', 'router', '#111827', 68000, 78000, 4.6, 82, 'in', 'best', ['Wi-Fi 6 (AX3000)', 'Up to 3 Gbps', 'Large home, 4 antennas', 'OneMesh, Parental controls'], 'Fast, stable Wi-Fi for the whole house with Wi-Fi 6.'],
  ['Huawei 4G Mobile Wi-Fi Router', 'Huawei', 'smart-home', 'router', '#f1f5f9', 32000, 38000, 4.2, 140, 'in', '', ['4G LTE', 'Up to 150 Mbps', '10 devices', 'Works with all SIMs, 1500mAh'], 'Pocket Wi-Fi that works with any network SIM.'],
  ['Amazon Echo Dot (5th Gen)', 'Amazon', 'smart-home', 'speaker', '#1e293b', 58000, 68000, 4.5, 59, 'in', 'new', ['Smart speaker', 'Plug-in', 'Wi-Fi, Bluetooth', 'Alexa, Temperature sensor'], 'Compact smart speaker with improved bass and Alexa voice control.'],
  ['Google Nest Mini (2nd Gen)', 'Google', 'smart-home', 'speaker', '#a8a29e', 42000, 48000, 4.4, 37, 'out', '', ['Smart speaker', 'Plug-in', 'Wi-Fi, Bluetooth', 'Google Assistant'], 'Hands-free help from Google Assistant. Wall-mountable.'],
];

const slugify = (s) =>
  s.toLowerCase().replace(/["']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const products = rows.map((r, i) => {
  const [name, brand, category, art, color, price, oldPrice, rating, reviews, stock, tags, specVals, description] = r;
  const labels = SPEC_LABELS[art];
  return {
    id: i + 1,
    slug: slugify(name),
    name, brand, category, art, color, price, oldPrice, rating, reviews, stock,
    tags: tags ? tags.split(',') : [],
    specs: specVals.map((v, k) => [labels[k], v]),
    description,
    discount: Math.round(((oldPrice - price) / oldPrice) * 100),
    // Real photo: filled by `npm run images`, or add the file path/URL to src/data/images.json
    image: localImages[slugify(name)],
  };
});

export const BRANDS = [...new Set(products.map((p) => p.brand))].sort();
