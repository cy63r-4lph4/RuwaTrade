import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Search, Store, BadgeCheck, ChevronRight, MapPin, Package, ArrowRight } from "lucide-react";

// Using the same mock data but with Unsplash IDs for a premium look
const ALL_SELLERS = [
  {
    id: "s-1",
    name: "Artem Studio",
    slug: "artem-studio",
    tagline: "Minimal goods & lifestyle",
    rating: 4.9,
    reviews: 312,
    categories: ["Apparel", "Home"],
    logo: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&h=200",
    banner: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
    verified: true,
    productsCount: 184,
    country: "Ghana",
  },
  {
    id: "s-2",
    name: "Nuru Crafts",
    slug: "nuru-crafts",
    tagline: "Handmade fashion & decor",
    rating: 4.8,
    reviews: 208,
    categories: ["Apparel", "Accessories", "Decor"],
    logo: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=200&h=200",
    banner: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    verified: true,
    productsCount: 96,
    country: "Kenya",
  },
  {
    id: "s-3",
    name: "ByteForge",
    slug: "byteforge",
    tagline: "Digital templates & tools",
    rating: 4.7,
    reviews: 455,
    categories: ["Digital", "Templates", "Design"],
    logo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200",
    banner: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    verified: true,
    productsCount: 320,
    country: "Nigeria",
  },
];

const ALL_TAGS = ["Apparel", "Home", "Decor", "Digital", "Design"];

export function SellersDirectory() {
  const [q, setQ] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return ALL_SELLERS.filter((s) =>
      s.name.toLowerCase().includes(q.toLowerCase()) &&
      (activeTags.length === 0 || activeTags.some(t => s.categories.includes(t)))
    );
  }, [q, activeTags]);

  const toggleTag = (tag: string) =>
    setActiveTags((t) => (t.includes(tag) ? t.filter((x) => x !== tag) : [...t, tag]));

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* ===== EDITORIAL HEADER ===== */}
      <section className="px-6 max-w-7xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-gray-100 pb-16">
          <div className="max-w-2xl">
            <span className="text-indigo-600 font-black uppercase tracking-[0.3em] text-xs">Verified Partners</span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mt-4 leading-[0.85]">
              Meet the <br />
              <span className="text-gray-300 italic">Creators</span>
            </h1>
          </div>
          <div className="relative w-full md:w-96">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by brand name..."
              className="w-full bg-gray-50 border-none rounded-2xl py-5 px-6 text-gray-900 font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
            <Search className="absolute right-6 top-5 text-gray-400" size={22} />
          </div>
        </div>
      </section>

      {/* ===== TAG FILTER BAR ===== */}
      <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md border-b border-gray-50 mb-12">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-4 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mr-2">Niches:</span>
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                activeTags.includes(tag)
                  ? "bg-gray-900 border-gray-900 text-white shadow-xl shadow-gray-200"
                  : "bg-white border-gray-200 text-gray-500 hover:border-gray-900 hover:text-gray-900"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ===== SELLERS GRID ===== */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {filtered.map((s, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={s.id}
                className="group relative flex flex-col"
              >
                {/* Visual Card */}
                <div className="relative h-48 rounded-[2.5rem] overflow-hidden bg-gray-100 mb-[-40px] z-0">
                  <img src={s.banner} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                </div>

                {/* Info Card */}
                <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm group-hover:shadow-2xl transition-all duration-500 relative z-10 mx-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative">
                      <img src={s.logo} className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-lg" alt="" />
                      {s.verified && (
                        <div className="absolute -top-2 -right-2 bg-indigo-600 text-white p-1 rounded-full shadow-lg">
                          <BadgeCheck size={14} />
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                       <div className="flex items-center gap-1 font-black text-lg">
                         <Star size={16} className="fill-yellow-400 text-yellow-400" />
                         {s.rating}
                       </div>
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.reviews} Reviews</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black tracking-tight mb-1">{s.name}</h3>
                  <p className="text-gray-500 font-medium text-sm mb-6 leading-tight">{s.tagline}</p>
                  
                  <div className="flex items-center gap-4 border-t border-gray-50 pt-6 mb-8">
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{s.country}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Package size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{s.productsCount} items</span>
                    </div>
                  </div>

                  <Link
                    to={`/s/${s.slug}`}
                    className="w-full py-4 rounded-2xl bg-gray-900 text-white font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-indigo-600 transition-colors shadow-lg active:scale-95"
                  >
                    Visit Studio <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}