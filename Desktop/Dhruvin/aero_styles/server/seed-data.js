// Prices in INR — images use reliable picsum.photos seeds (always load)
const img = (seed) => `https://picsum.photos/seed/aerostyles-${seed}/600/800`;

module.exports = [
  {
    name: "Midnight Navy Three-Piece Suit",
    category: "suits",
    price: 74999,
    originalPrice: 89999,
    image: img("navy-suit"),
    badge: "Sale",
    description: "Impeccably tailored from premium Italian wool. Slim-fit jacket, waistcoat, and flat-front trousers.",
    sizes: ["36S", "38R", "40R", "42L", "44L"],
    colors: [{ name: "Navy", hex: "#1a2332" }, { name: "Charcoal", hex: "#2c2c2c" }],
    stock: 25,
    featured: true
  },
  {
    name: "Heritage Camel Overcoat",
    category: "outerwear",
    price: 54999,
    image: img("camel-coat"),
    badge: "New",
    description: "Timeless double-breasted overcoat in premium camel hair blend with horn buttons.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Camel", hex: "#c4a574" }, { name: "Navy", hex: "#1a2332" }],
    stock: 18,
    featured: true
  },
  {
    name: "Oxford Cotton Dress Shirt",
    category: "shirts",
    price: 3499,
    image: img("oxford-shirt"),
    description: "Classic spread-collar dress shirt in 100% Egyptian cotton with mother-of-pearl buttons.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "White", hex: "#f5f5f5" }, { name: "Sky Blue", hex: "#a8c8e8" }],
    stock: 50,
    featured: true
  },
  {
    name: "Charcoal Slim-Fit Blazer",
    category: "suits",
    price: 42999,
    image: img("charcoal-blazer"),
    description: "Versatile unstructured blazer in wool-linen blend with patch pockets.",
    sizes: ["38R", "40R", "42L", "44L"],
    colors: [{ name: "Charcoal", hex: "#3d3d3d" }, { name: "Navy", hex: "#1a2332" }],
    stock: 22,
    featured: false
  },
  {
    name: "Italian Leather Belt",
    category: "accessories",
    price: 2999,
    image: img("leather-belt"),
    description: "Handcrafted full-grain leather belt with brushed nickel buckle.",
    sizes: ["32", "34", "36", "38"],
    colors: [{ name: "Brown", hex: "#6b4226" }, { name: "Black", hex: "#1a1a1a" }],
    stock: 40,
    featured: false
  },
  {
    name: "Cashmere V-Neck Sweater",
    category: "outerwear",
    price: 18999,
    originalPrice: 24999,
    image: img("cashmere-sweater"),
    badge: "Sale",
    description: "Luxuriously soft 100% Mongolian cashmere in a classic V-neck cut.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Burgundy", hex: "#6b2737" }, { name: "Navy", hex: "#1a2332" }],
    stock: 15,
    featured: true
  },
  {
    name: "Pinstripe Executive Suit",
    category: "suits",
    price: 82999,
    image: img("pinstripe-suit"),
    badge: "Bestseller",
    description: "Fine pinstripe wool with peak lapels, surgeon cuffs, and tapered trousers.",
    sizes: ["38R", "40R", "42L", "44L"],
    colors: [{ name: "Charcoal Pinstripe", hex: "#3a3a4a" }],
    stock: 12,
    featured: true
  },
  {
    name: "Silk Pocket Square Set",
    category: "accessories",
    price: 1999,
    image: img("pocket-square"),
    description: "Set of three hand-rolled silk pocket squares in complementary patterns.",
    sizes: ["One Size"],
    colors: [{ name: "Multi", hex: "#b8956a" }],
    stock: 60,
    featured: false
  },
  {
    name: "Linen Summer Blazer",
    category: "suits",
    price: 36999,
    image: img("linen-blazer"),
    badge: "New",
    description: "Breathable Irish linen blazer with relaxed unstructured fit for warm weather.",
    sizes: ["38R", "40R", "42L"],
    colors: [{ name: "Beige", hex: "#d4c4a8" }, { name: "Light Blue", hex: "#b8c8d8" }],
    stock: 20,
    featured: false
  },
  {
    name: "French Cuff Formal Shirt",
    category: "shirts",
    price: 4499,
    image: img("french-cuff-shirt"),
    description: "Elegant formal shirt with French cuffs, designed for cufflinks.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "White", hex: "#ffffff" }, { name: "Ivory", hex: "#f5f0e8" }],
    stock: 35,
    featured: false
  },
  {
    name: "Quilted Field Jacket",
    category: "outerwear",
    price: 32999,
    image: img("field-jacket"),
    description: "Heritage quilted jacket with corduroy collar and water-resistant shell.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Olive", hex: "#4a5a3a" }, { name: "Navy", hex: "#1a2332" }],
    stock: 16,
    featured: false
  },
  {
    name: "Suede Derby Shoes",
    category: "accessories",
    price: 27999,
    image: img("derby-shoes"),
    badge: "New",
    description: "Hand-finished suede derby shoes with Goodyear welted leather soles.",
    sizes: ["8", "9", "10", "11", "12"],
    colors: [{ name: "Tan", hex: "#c4a070" }, { name: "Navy", hex: "#2a3a5a" }],
    stock: 14,
    featured: true
  }
];
