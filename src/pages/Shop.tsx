import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Star,
  Store,
  Filter,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

// Real Unsplash IDs for a "High-End Physical" look
const categories = [
  "All Collections",
  "Apparel",
  "Electronics",
  "Home Decor",
  "Wellness",
];

const products = [
  {
    id: 1,
    name: "Series 1 Wireless Over-Ear",
    price: 299.0,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    seller: "AudioWorld",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Nordic Minimalist Lounge",
    price: 850.0,
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    seller: "FurniSpace",
    category: "Home Decor",
  },
  {
    id: 3,
    name: "Essential Cotton Oversize",
    price: 45.0,
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    seller: "UrbanStyle",
    category: "Apparel",
  },
  {
    id: 4,
    name: "Raw Ceramics Vase Set",
    price: 120.0,
    image:
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    seller: "Nuru Crafts",
    category: "Home Decor",
  },
  {
    id: 5,
    name: "Mechanical Keyboard G3",
    price: 185.0,
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    seller: "ByteForge",
    category: "Electronics",
  },
  {
    id: 6,
    name: "Leather Weekend Bag",
    price: 210.0,
    image:
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    seller: "Artem Studio",
    category: "Apparel",
  },
];

export function Shop() {
  const [activeCategory, setActiveCategory] = useState("All Collections");

  return (
    <div className="bg-white min-h-screen pt-24">
      {/* ===== EDITORIAL HERO ===== */}
      <section className="px-6 max-w-7xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-100 pb-12">
          <div>
            <span className="text-indigo-600 font-black uppercase tracking-[0.3em] text-xs">
              Physical Goods
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mt-4">
              The <span className="text-gray-300 italic">Shop</span>
            </h1>
          </div>
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-gray-900 font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
            <Search
              className="absolute right-5 top-4 text-gray-400"
              size={20}
            />
          </div>
        </div>
      </section>

      {/* ===== FILTER BAR ===== */}
      <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md border-b border-gray-50 mb-12">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-gray-900 text-white shadow-lg shadow-gray-200"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button className="hidden md:flex items-center gap-2 font-black text-sm uppercase tracking-widest text-gray-900 border-l pl-8">
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>

      {/* ===== PRODUCTS GRID ===== */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          <AnimatePresence>
            {products.map((p) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={p.id}
                className="group"
              >
                {/* Wrap the clickable area in a Link */}
                <Link to={`/product/${p.id}`}>
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-gray-100 mb-6">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Keep the cart button outside or stop propagation if you want it 
         to add to cart without navigating 
      */}
                    <div className="absolute top-6 right-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <button
                        onClick={(e) => {
                          e.preventDefault(); // Prevents navigating to details page
                          e.stopPropagation();
                          console.log("Added to cart");
                        }}
                        className="p-4 bg-white rounded-2xl shadow-xl hover:bg-indigo-600 hover:text-white transition-colors"
                      >
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-1 px-2">
                    <h3 className="text-2xl font-black tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {p.name}
                    </h3>
                    {/* ... rest of your product info */}
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ===== FOOTER ACTION ===== */}
        <div className="mt-32 text-center">
          <button className="group relative px-12 py-6 bg-gray-900 text-white rounded-3xl font-black text-lg overflow-hidden transition-all hover:scale-105">
            <span className="relative z-10 flex items-center gap-3">
              LOAD MORE PRODUCTS <ArrowRight size={20} />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </main>
    </div>
  );
}
