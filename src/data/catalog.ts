import kitchen from "@/assets/p-kitchen.jpg";
import electronics from "@/assets/p-electronics.jpg";
import beauty from "@/assets/p-beauty.jpg";
import fitness from "@/assets/p-fitness.jpg";
import kids from "@/assets/p-kids.jpg";
import pets from "@/assets/p-pets.jpg";

export const CATEGORIES = [
  { slug: "home-kitchen", name: "Home & Kitchen", image: kitchen },
  { slug: "electronics", name: "Electronics", image: electronics },
  { slug: "beauty-accessories", name: "Beauty & Accessories", image: beauty },
  { slug: "fitness", name: "Fitness", image: fitness },
  { slug: "kids", name: "Kids", image: kids },
  { slug: "pets", name: "Pets", image: pets },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

const IMAGES: Record<CategorySlug, string> = {
  "home-kitchen": kitchen,
  electronics,
  "beauty-accessories": beauty,
  fitness,
  kids,
  pets,
};

const ALL_IMAGES: string[] = [kitchen, electronics, beauty, fitness, kids, pets];

export type OptionGroup = { label: string; values: string[] };

export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  category: CategorySlug;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  stock: number;
  description: string;
  details: string[];
  specs: { label: string; value: string }[];
  options: OptionGroup[];
};

type Seed = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  category: CategorySlug;
  rating: number;
  reviews: number;
  stock: number;
  description: string;
  details: string[];
  specs: [string, string][];
  options?: OptionGroup[];
};

const COLORS: OptionGroup = {
  label: "Colour",
  values: ["Obsidian", "Graphite", "Ivory"],
};
const SIZES: OptionGroup = { label: "Size", values: ["S", "M", "L", "XL"] };

const SEEDS: Seed[] = [
  {
    id: "obsidian-tea-ritual",
    name: "Obsidian Tea Ritual Set",
    tagline: "Hand-glazed stoneware set",
    price: 4499,
    originalPrice: 6999,
    category: "home-kitchen",
    rating: 4.9,
    reviews: 214,
    stock: 130,
    description:
      "A slow-fired stoneware service finished in a matte obsidian glaze, gilded by hand along the rim. Made for unhurried mornings and long conversations.",
    details: ["Hand-glazed stoneware", "Gold leaf rim detail", "Serves four", "Dishwasher safe"],
    specs: [
      ["Material", "Stoneware"],
      ["Finish", "Matte obsidian glaze"],
      ["Pieces", "Teapot + 4 cups"],
      ["Capacity", "900 ml"],
      ["Care", "Dishwasher safe"],
    ],
    options: [COLORS],
  },
  {
    id: "monolith-cookware",
    name: "Monolith Cast Skillet",
    tagline: "Seasoned iron, lifetime piece",
    price: 3299,
    originalPrice: 4999,
    category: "home-kitchen",
    rating: 4.8,
    reviews: 132,
    stock: 46,
    description:
      "Sand-cast in a single pour and pre-seasoned with cold-pressed oil for an ink-black patina that deepens with every service.",
    details: ["Single-pour cast iron", "Pre-seasoned surface", "Induction ready", "28 cm"],
    specs: [
      ["Material", "Cast iron"],
      ["Diameter", "28 cm"],
      ["Weight", "2.4 kg"],
      ["Compatibility", "Induction, gas, oven"],
    ],
  },
  {
    id: "ember-kettle",
    name: "Ember Pour-Over Kettle",
    tagline: "Gooseneck precision",
    price: 3899,
    originalPrice: 5499,
    category: "home-kitchen",
    rating: 4.7,
    reviews: 318,
    stock: 88,
    description:
      "A counter-balanced gooseneck kettle with variable temperature control and a matte black shell that stays cool to the touch.",
    details: ["Variable temperature", "0.9 L", "Counter-balanced handle", "Keep-warm mode"],
    specs: [
      ["Capacity", "0.9 L"],
      ["Power", "1200 W"],
      ["Temperature", "40–100 °C"],
      ["Material", "Stainless steel"],
    ],
  },
  {
    id: "noir-knife-set",
    name: "Noir Damascus Knife Set",
    tagline: "Folded steel, five pieces",
    price: 7499,
    originalPrice: 11999,
    category: "home-kitchen",
    rating: 4.9,
    reviews: 96,
    stock: 21,
    description:
      "Sixty-seven layers of folded Damascus steel with a blackened cladding and stabilised ebony handles, balanced at the bolster.",
    details: ["67-layer Damascus", "Ebony handles", "Five pieces", "Magnetic block"],
    specs: [
      ["Layers", "67"],
      ["Handle", "Stabilised ebony"],
      ["Pieces", "5"],
      ["Hardness", "60 HRC"],
    ],
  },
  {
    id: "atelier-dinner-set",
    name: "Atelier Dinner Service",
    tagline: "Sixteen pieces, matte black",
    price: 5999,
    originalPrice: 8999,
    category: "home-kitchen",
    rating: 4.6,
    reviews: 174,
    stock: 0,
    description:
      "A sixteen-piece service in reactive black glaze — every plate is fired individually, so no two carry the same halo.",
    details: ["16 pieces", "Reactive glaze", "Microwave safe", "Stackable"],
    specs: [
      ["Pieces", "16"],
      ["Glaze", "Reactive black"],
      ["Service", "Four settings"],
      ["Care", "Dishwasher safe"],
    ],
  },
  {
    id: "eclipse-headphones",
    name: "Eclipse ANC Headphones",
    tagline: "Studio silence, engineered",
    price: 18999,
    originalPrice: 27999,
    category: "electronics",
    rating: 5,
    reviews: 986,
    stock: 210,
    description:
      "Adaptive noise cancellation with a machined aluminium chassis and lambskin cushions. Forty hours of uninterrupted sound.",
    details: ["Adaptive hybrid ANC", "40 h battery life", "Machined aluminium", "Hi-res LDAC"],
    specs: [
      ["Drivers", "40 mm beryllium"],
      ["Battery", "40 hours"],
      ["Codec", "LDAC, AAC, SBC"],
      ["Weight", "268 g"],
    ],
    options: [COLORS],
  },
  {
    id: "noir-turntable",
    name: "Noir Precision Turntable",
    tagline: "Analogue, uncompromised",
    price: 54999,
    originalPrice: 74999,
    category: "electronics",
    rating: 4.9,
    reviews: 78,
    stock: 12,
    description:
      "A belt-driven platter suspended on magnetic bearings, housed in a monolithic black plinth for absolute stillness.",
    details: ["Magnetic bearing", "Carbon tonearm", "Hand-matched cartridge", "Made in Denmark"],
    specs: [
      ["Drive", "Belt"],
      ["Tonearm", "Carbon fibre"],
      ["Speeds", "33 / 45 rpm"],
      ["Plinth", "Solid MDF, black"],
    ],
  },
  {
    id: "aura-earbuds",
    name: "Aura Wireless Earbuds",
    tagline: "Invisible sound",
    price: 8999,
    originalPrice: 12999,
    category: "electronics",
    rating: 4.7,
    reviews: 2410,
    stock: 460,
    description:
      "Six microphones, adaptive transparency and a ceramic-coated case that closes with a magnet you can feel across the room.",
    details: ["Adaptive transparency", "32 h with case", "IPX5", "Wireless charging"],
    specs: [
      ["Battery", "8 h + 24 h case"],
      ["Rating", "IPX5"],
      ["Charging", "USB-C, wireless"],
      ["Drivers", "11 mm dynamic"],
    ],
    options: [COLORS],
  },
  {
    id: "monolith-speaker",
    name: "Monolith Studio Speaker",
    tagline: "Room-filling stillness",
    price: 24999,
    originalPrice: 33999,
    category: "electronics",
    rating: 4.8,
    reviews: 342,
    stock: 64,
    description:
      "A sealed-cabinet monitor with a woven carbon woofer and a machined waveguide that keeps the stage wide at low volume.",
    details: ["Sealed cabinet", "Carbon woofer", "Room correction", "Bi-amped"],
    specs: [
      ["Power", "2 × 120 W"],
      ["Response", "38 Hz – 24 kHz"],
      ["Inputs", "HDMI, optical, BT 5.3"],
      ["Finish", "Matte black"],
    ],
  },
  {
    id: "veil-smartwatch",
    name: "Veil Titanium Smartwatch",
    tagline: "Sapphire on titanium",
    price: 29999,
    originalPrice: 39999,
    category: "electronics",
    rating: 4.6,
    reviews: 512,
    stock: 38,
    description:
      "Grade-5 titanium, sapphire crystal and a black micro-LED display readable in direct sun. Eleven days between charges.",
    details: ["Grade-5 titanium", "Sapphire crystal", "11-day battery", "100 m water rating"],
    specs: [
      ["Case", "44 mm titanium"],
      ["Display", "Micro-LED"],
      ["Battery", "11 days"],
      ["Water", "10 ATM"],
    ],
    options: [SIZES],
  },
  {
    id: "lumiere-serum",
    name: "Lumière Perfecting Serum",
    tagline: "Luminosity in 30 ml",
    price: 2499,
    originalPrice: 3499,
    category: "beauty-accessories",
    rating: 4.9,
    reviews: 1420,
    stock: 320,
    description:
      "A weightless emulsion of encapsulated retinal and glacial mineral water that leaves skin lit from within.",
    details: ["Encapsulated retinal", "Fragrance free", "30 ml apothecary glass", "Cruelty free"],
    specs: [
      ["Volume", "30 ml"],
      ["Fragrance", "None"],
      ["Key active", "Encapsulated retinal 0.1%"],
      ["Skin type", "All"],
    ],
  },
  {
    id: "onyx-timepiece",
    name: "Onyx Dress Timepiece",
    tagline: "Sapphire on midnight steel",
    price: 44999,
    originalPrice: 59999,
    category: "beauty-accessories",
    rating: 4.8,
    reviews: 302,
    stock: 17,
    description:
      "A 38 mm automatic with a smoked sapphire dial, brushed to catch a single line of light across the hour markers.",
    details: ["Swiss automatic", "38 mm PVD steel", "72 h reserve", "Alligator strap"],
    specs: [
      ["Movement", "Swiss automatic"],
      ["Case", "38 mm PVD steel"],
      ["Reserve", "72 hours"],
      ["Strap", "Alligator leather"],
    ],
  },
  {
    id: "noir-parfum",
    name: "Noir Absolu Parfum",
    tagline: "Oud, iris, cold smoke",
    price: 6999,
    originalPrice: 9499,
    category: "beauty-accessories",
    rating: 4.7,
    reviews: 864,
    stock: 142,
    description:
      "A parfum extrait built on Laotian oud and powdered iris, finished with a breath of cold smoke that lingers for hours.",
    details: ["Extrait de parfum", "50 ml", "12 h wear", "Refillable flacon"],
    specs: [
      ["Volume", "50 ml"],
      ["Fragrance", "Oud, iris, smoke"],
      ["Concentration", "Extrait 25%"],
      ["Wear", "10–12 hours"],
    ],
  },
  {
    id: "eclat-lip",
    name: "Éclat Satin Lip",
    tagline: "Nine hours of colour",
    price: 1899,
    originalPrice: 2699,
    category: "beauty-accessories",
    rating: 4.5,
    reviews: 1120,
    stock: 240,
    description:
      "A satin lip colour weighted with squalane so pigment stays saturated without ever setting dry.",
    details: ["Satin finish", "Squalane base", "9 h wear", "Refill available"],
    specs: [
      ["Weight", "3.8 g"],
      ["Finish", "Satin"],
      ["Shades", "Six"],
      ["Formula", "Vegan"],
    ],
    options: [{ label: "Shade", values: ["Ink", "Rouge Noir", "Nude Ash"] }],
  },
  {
    id: "obsidian-clutch",
    name: "Obsidian Evening Clutch",
    tagline: "Box calf, silver clasp",
    price: 12999,
    originalPrice: 17999,
    category: "beauty-accessories",
    rating: 4.8,
    reviews: 208,
    stock: 29,
    description:
      "Box calf leather over a rigid frame with a solid silver clasp that closes with a single, quiet note.",
    details: ["Box calf leather", "Solid silver clasp", "Suede lining", "Detachable chain"],
    specs: [
      ["Material", "Box calf leather"],
      ["Dimensions", "24 × 13 × 5 cm"],
      ["Lining", "Suede"],
      ["Hardware", "Solid silver"],
    ],
    options: [COLORS],
  },
  {
    id: "hex-dumbbell",
    name: "Hex Signature Dumbbell",
    tagline: "Cold-forged, matte black",
    price: 2999,
    originalPrice: 4299,
    category: "fitness",
    rating: 4.7,
    reviews: 168,
    stock: 96,
    description:
      "Cold-forged steel with a knurled handle and elastomer shell — silent on stone, sculptural at rest.",
    details: ["Cold-forged steel", "Elastomer shell", "Knurled handle", "5–30 kg"],
    specs: [
      ["Material", "Forged steel"],
      ["Coating", "Elastomer"],
      ["Weights", "5–30 kg"],
      ["Sold as", "Pair"],
    ],
    options: [{ label: "Weight", values: ["5 kg", "10 kg", "15 kg", "20 kg"] }],
  },
  {
    id: "atelier-mat",
    name: "Atelier Training Mat",
    tagline: "Cork and natural rubber",
    price: 3499,
    originalPrice: 4999,
    category: "fitness",
    rating: 4.8,
    reviews: 96,
    stock: 74,
    description:
      "A dense natural-rubber core faced in charcoal cork for grip that improves as you warm.",
    details: ["Natural rubber core", "Charcoal cork face", "6 mm", "Leather carry strap"],
    specs: [
      ["Thickness", "6 mm"],
      ["Surface", "Charcoal cork"],
      ["Size", "183 × 66 cm"],
      ["Weight", "2.6 kg"],
    ],
  },
  {
    id: "onyx-kettlebell",
    name: "Onyx Competition Kettlebell",
    tagline: "Single-cast balance",
    price: 4299,
    originalPrice: 5999,
    category: "fitness",
    rating: 4.6,
    reviews: 143,
    stock: 52,
    description:
      "A single-cast competition bell with a 35 mm handle finished in matte powder coat for chalk-free grip.",
    details: ["Single cast", "35 mm handle", "Powder coat", "8–32 kg"],
    specs: [
      ["Handle", "35 mm"],
      ["Weights", "8–32 kg"],
      ["Finish", "Matte powder coat"],
      ["Base", "Flat, non-marking"],
    ],
    options: [{ label: "Weight", values: ["8 kg", "12 kg", "16 kg", "24 kg"] }],
  },
  {
    id: "shadow-rower",
    name: "Shadow Air Rower",
    tagline: "Whisper resistance",
    price: 42999,
    originalPrice: 56999,
    category: "fitness",
    rating: 4.9,
    reviews: 61,
    stock: 9,
    description:
      "An air-and-magnet hybrid rower on a blackened steel rail, tuned to run quieter than the room around it.",
    details: ["Air + magnetic", "Blackened steel rail", "Foldable", "Performance display"],
    specs: [
      ["Resistance", "Air + magnetic"],
      ["Rail", "Blackened steel"],
      ["Max user", "150 kg"],
      ["Footprint", "215 × 56 cm"],
    ],
  },
  {
    id: "carbon-jump-rope",
    name: "Carbon Speed Rope",
    tagline: "Bearing-smooth turns",
    price: 1499,
    originalPrice: 2199,
    category: "fitness",
    rating: 4.4,
    reviews: 388,
    stock: 180,
    description:
      "Machined aluminium handles on sealed bearings with a coated steel cable that holds its arc at speed.",
    details: ["Sealed bearings", "Aluminium handles", "Coated steel cable", "Adjustable length"],
    specs: [
      ["Handles", "Machined aluminium"],
      ["Cable", "Coated steel, 3 m"],
      ["Bearings", "Sealed"],
      ["Weight", "180 g"],
    ],
  },
  {
    id: "little-voyager",
    name: "Little Voyager Rocket",
    tagline: "Heirloom hardwood toy",
    price: 1899,
    originalPrice: 2699,
    category: "kids",
    rating: 4.9,
    reviews: 211,
    stock: 118,
    description:
      "Turned from FSC maple and finished in food-safe ebony wash — a first spacecraft built to outlast childhood.",
    details: ["FSC maple", "Food-safe finish", "Ages 3+", "Hand-turned"],
    specs: [
      ["Material", "FSC maple"],
      ["Finish", "Food-safe ebony wash"],
      ["Age", "3+"],
      ["Height", "24 cm"],
    ],
  },
  {
    id: "night-sky-mobile",
    name: "Night Sky Mobile",
    tagline: "Brushed brass constellations",
    price: 2299,
    originalPrice: 3199,
    category: "kids",
    rating: 4.7,
    reviews: 64,
    stock: 43,
    description:
      "Balanced brass arcs and hand-cut stars that turn slowly on the faintest current of air.",
    details: ["Brushed brass", "Hand-balanced", "Silent rotation", "Nursery safe mount"],
    specs: [
      ["Material", "Brushed brass"],
      ["Span", "46 cm"],
      ["Mount", "Ceiling hook"],
      ["Age", "0+"],
    ],
  },
  {
    id: "ink-storybook",
    name: "Ink & Lantern Storybook",
    tagline: "Linen-bound, gilt edges",
    price: 1299,
    originalPrice: 1899,
    category: "kids",
    rating: 4.8,
    reviews: 276,
    stock: 210,
    description:
      "Twelve bedtime stories set in a city of lanterns, printed on uncoated stock and bound in charcoal linen.",
    details: ["Linen bound", "Gilt edges", "12 stories", "Ages 4+"],
    specs: [
      ["Pages", "148"],
      ["Binding", "Charcoal linen"],
      ["Age", "4+"],
      ["Print", "Uncoated stock"],
    ],
  },
  {
    id: "shadow-block-set",
    name: "Shadow Block Set",
    tagline: "Sixty beech forms",
    price: 2799,
    originalPrice: 3899,
    category: "kids",
    rating: 4.6,
    reviews: 132,
    stock: 66,
    description:
      "Sixty solid beech forms in graphite, chalk and natural, packed in a canvas roll that becomes the play mat.",
    details: ["60 pieces", "Solid beech", "Water-based dye", "Canvas roll"],
    specs: [
      ["Pieces", "60"],
      ["Material", "Solid beech"],
      ["Dye", "Water-based"],
      ["Age", "2+"],
    ],
  },
  {
    id: "lantern-nightlight",
    name: "Lantern Nightlight",
    tagline: "Warm dimmable glow",
    price: 1699,
    originalPrice: 2399,
    category: "kids",
    rating: 4.5,
    reviews: 402,
    stock: 156,
    description:
      "A rechargeable lantern with a stepless dimmer that holds its lowest setting for twelve hours.",
    details: ["Stepless dimmer", "12 h runtime", "USB-C", "Silicone shell"],
    specs: [
      ["Runtime", "12 hours"],
      ["Charging", "USB-C"],
      ["Colour", "2700 K"],
      ["Shell", "Food-grade silicone"],
    ],
  },
  {
    id: "atelier-collar",
    name: "Atelier Leather Collar",
    tagline: "Vegetable-tanned, silver hardware",
    price: 2599,
    originalPrice: 3699,
    category: "pets",
    rating: 4.9,
    reviews: 143,
    stock: 88,
    description:
      "Saddle-stitched by hand in vegetable-tanned leather with solid silver hardware and an engraved medallion.",
    details: ["Vegetable-tanned leather", "Solid silver hardware", "Saddle-stitched", "XS–XL"],
    specs: [
      ["Material", "Vegetable-tanned leather"],
      ["Hardware", "Solid silver"],
      ["Width", "20 mm"],
      ["Sizes", "XS–XL"],
    ],
    options: [SIZES],
  },
  {
    id: "noir-pet-bed",
    name: "Noir Bouclé Pet Bed",
    tagline: "Bouclé over memory core",
    price: 5499,
    originalPrice: 7499,
    category: "pets",
    rating: 4.8,
    reviews: 87,
    stock: 34,
    description: "A deep memory core wrapped in charcoal bouclé with a removable, washable cover.",
    details: ["Charcoal bouclé", "Memory foam core", "Removable cover", "Two sizes"],
    specs: [
      ["Cover", "Charcoal bouclé"],
      ["Core", "Memory foam"],
      ["Sizes", "M, L"],
      ["Care", "Machine washable cover"],
    ],
    options: [{ label: "Size", values: ["Medium", "Large"] }],
  },
  {
    id: "onyx-feeding-set",
    name: "Onyx Feeding Set",
    tagline: "Stoneware on oak stand",
    price: 3199,
    originalPrice: 4599,
    category: "pets",
    rating: 4.7,
    reviews: 121,
    stock: 71,
    description:
      "Two matte stoneware bowls seated in a blackened oak stand, raised to a posture that suits a long back.",
    details: ["Stoneware bowls", "Blackened oak", "Raised posture", "Non-slip feet"],
    specs: [
      ["Bowls", "2 × 700 ml"],
      ["Stand", "Blackened oak"],
      ["Height", "16 cm"],
      ["Care", "Dishwasher safe bowls"],
    ],
  },
  {
    id: "shadow-lead",
    name: "Shadow Rope Lead",
    tagline: "Marine rope, brass clasp",
    price: 1999,
    originalPrice: 2899,
    category: "pets",
    rating: 4.6,
    reviews: 194,
    stock: 0,
    description:
      "Braided marine rope spliced by hand around a blackened brass clasp, softened by a leather collar sleeve.",
    details: ["Marine rope", "Blackened brass clasp", "Leather sleeve", "1.6 m"],
    specs: [
      ["Length", "1.6 m"],
      ["Rope", "12 mm marine braid"],
      ["Clasp", "Blackened brass"],
      ["Load", "120 kg"],
    ],
  },
  {
    id: "velvet-pet-carrier",
    name: "Velvet Travel Carrier",
    tagline: "Quilted, cabin approved",
    price: 7999,
    originalPrice: 10999,
    category: "pets",
    rating: 4.5,
    reviews: 76,
    stock: 25,
    description:
      "A quilted velvet carrier on an aluminium frame with mesh panels that stay open without a zip pull.",
    details: ["Aluminium frame", "Quilted velvet", "Cabin approved", "Washable base"],
    specs: [
      ["Frame", "Aluminium"],
      ["Exterior", "Quilted velvet"],
      ["Dimensions", "45 × 28 × 25 cm"],
      ["Max pet", "8 kg"],
    ],
  },
];

export const PRODUCTS: Product[] = SEEDS.map((s, i) => {
  const primary = IMAGES[s.category];
  const extras = [0, 1, 2].map((k) => ALL_IMAGES[(i + k + 1) % ALL_IMAGES.length] ?? primary);
  return {
    ...s,
    image: primary,
    images: [primary, ...extras],
    specs: s.specs.map(([label, value]) => ({ label, value })),
    options: s.options ?? [],
  };
});

export const findProduct = (id: string) => PRODUCTS.find((p) => p.id === id);

export const categoryName = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug)?.name ?? "All";

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export const discountPercent = (p: Product) =>
  Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);

const rotate = (offset: number, count = 10): Product[] =>
  Array.from({ length: count }, (_, k) => PRODUCTS[(offset + k) % PRODUCTS.length]!);

export const SIGNATURE = rotate(0);
export const LATEST = rotate(6);
export const FAVORITES = [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 10);
export const TOP_RATED = [...PRODUCTS]
  .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
  .slice(0, 10);
export const TRENDING = rotate(14);

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter((p) =>
    [p.name, p.tagline, p.description, categoryName(p.category)]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}

export const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
] as const;

export const deliveryWindow = () => {
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const a = new Date();
  a.setDate(a.getDate() + 3);
  const b = new Date();
  b.setDate(b.getDate() + 7);
  return `${fmt(a)} — ${fmt(b)}`;
};
