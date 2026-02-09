import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, BadgeCheck, Share2, Heart, Store, 
  Grid, LayoutList, Search, MapPin, 
  Users, Zap, Package, ArrowRight, ShieldCheck 
} from "lucide-react";

// --- Mock Fetch ---
const SELLERS = {
  "artem-studio": {
    id: "s-1",
    name: "Artem Studio",
    tagline: "Minimal goods & lifestyle",
    rating: 4.9,
    reviews: 312,
    verified: true,
    country: "Ghana",
    logo: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&h=200",
    banner: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1400&q=80",
    followers: 5820,
    products: Array.from({ length: 8 }).map((_, i) => ({
      id: `p-${i + 1}`,
      title: i % 2 === 0 ? "Minimalist Oak Chair" : "Quantum Design System",
      price: (24 + i * 15).toFixed(2),
      rating: 4.8,
      image: i % 2 === 0 
        ? "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80"
        : "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=600&q=80",
      category: i % 2 === 0 ? "Furniture" : "Digital",
      type: i % 2 === 0 ? "Physical" : "Digital",
    })),
    about: "Artem Studio focuses on minimal aesthetics and timeless designs. We craft apparel and home goods with care using sustainable materials and digital precision.",
  },
};

export function SellerStorefront() {
  const { slug } = useParams<{ slug: string }>();
  const store = SELLERS[slug as keyof typeof SELLERS];
  const [view, setView] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState("Products");

  if (!store) return <div className="pt-40 text-center font-black">Store Not Found.</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img src={store.banner} className="w-full h-full object-cover scale-105 blur-[2px] brightness-75" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </section>

      {/* 2. FLOATING STORE PROFILE CARD */}
      <section className="max-w-7xl mx-auto px-6 relative -mt-32 z-10">
        <div className="bg-white border border-gray-100 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-gray-200/50">
          <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
            {/* Logo */}
            <div className="relative">
              <img src={store.logo} className="w-32 h-32 rounded-[2rem] object-cover border-8 border-white shadow-xl" alt="" />
              {store.verified && (
                <div className="absolute -top-2 -right-2 bg-indigo-600 text-white p-2 rounded-full shadow-lg">
                  <BadgeCheck size={20} />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <h1 className="text-5xl font-black tracking-tighter">{store.name}</h1>
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-black">{store.rating}</span>
                  <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest border-l pl-2 ml-1 border-gray-200">
                    {store.reviews} Reviews
                  </span>
                </div>
              </div>
              <p className="text-xl text-gray-500 font-medium max-w-xl leading-snug">{store.tagline}</p>
              
              <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                <div className="flex items-center gap-2"><MapPin size={14} className="text-indigo-600"/> {store.country}</div>
                <div className="flex items-center gap-2"><Users size={14} className="text-indigo-600"/> {store.followers.toLocaleString()} Followers</div>
                <div className="flex items-center gap-2 text-green-600"><ShieldCheck size={14}/> Top Rated Seller</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl active:scale-95">
                Follow Studio
              </button>
              <button className="p-4 bg-gray-50 text-gray-900 rounded-2xl border border-gray-100 hover:bg-white transition-all shadow-sm">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STORE NAVIGATION & FILTERS */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-gray-100 pb-8">
          <div className="flex gap-8">
            {["Products", "About", "Reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-black uppercase tracking-[0.2em] transition-all relative ${
                  activeTab === tab ? "text-indigo-600" : "text-gray-400 hover:text-gray-900"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="tab-underline" className="absolute -bottom-9 left-0 right-0 h-1 bg-indigo-600" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
              <input 
                placeholder="Search studio..." 
                className="bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-6 text-sm font-bold w-full md:w-64 focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
              />
            </div>
            <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
               <button onClick={() => setView('grid')} className={`p-2 rounded-xl ${view === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400'}`}><Grid size={20}/></button>
               <button onClick={() => setView('list')} className={`p-2 rounded-xl ${view === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400'}`}><LayoutList size={20}/></button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          {activeTab === "Products" ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className={view === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" : "space-y-6"}
            >
              {store.products.map((p) => (
                <ProductCard key={p.id} product={p} view={view} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
               className="max-w-3xl space-y-8"
            >
              <h2 className="text-4xl font-black tracking-tighter">About the Studio</h2>
              <p className="text-xl text-gray-500 font-medium leading-relaxed">{store.about}</p>
              <div className="grid grid-cols-2 gap-8 pt-8">
                 <div className="p-8 bg-gray-50 rounded-[2rem]">
                   <Package className="text-indigo-600 mb-4" />
                   <h4 className="font-black uppercase tracking-widest text-xs mb-2">Physical Logistics</h4>
                   <p className="text-sm text-gray-500 font-bold">Standard shipping globally. 14-day return window on furniture pieces.</p>
                 </div>
                 <div className="p-8 bg-indigo-50 rounded-[2rem]">
                   <Zap className="text-indigo-600 mb-4" />
                   <h4 className="font-black uppercase tracking-widest text-xs mb-2">Digital Delivery</h4>
                   <p className="text-sm text-gray-500 font-bold">Instant access via email link. Files updated quarterly with new assets.</p>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// Sub-component for clean product presentation
function ProductCard({ product, view }: any) {
  const isDigital = product.type === "Digital";
  
  if (view === 'list') {
    return (
      <div className="flex gap-8 items-center p-6 border border-gray-100 rounded-[2.5rem] hover:shadow-xl transition-all group">
        <img src={product.image} className="w-32 h-32 object-cover rounded-[1.5rem]" alt="" />
        <div className="flex-1">
           <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">{product.category}</span>
           <h3 className="text-2xl font-black tracking-tight">{product.title}</h3>
        </div>
        <div className="text-right px-8 border-l border-gray-100">
           <p className="text-2xl font-black tracking-tighter">${product.price}</p>
           <Link to={`/product/${product.id}`} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-indigo-600">View Details</Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div className="group relative flex flex-col">
      <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-100 mb-6">
        <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
        <div className="absolute top-6 left-6 flex gap-2">
           {isDigital ? (
             <div className="bg-purple-600 text-white p-2 rounded-xl shadow-lg"><Zap size={14} fill="currentColor"/></div>
           ) : (
             <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-lg"><Package size={14}/></div>
           )}
        </div>
        <button className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart size={18} />
        </button>
      </div>
      
      <div className="px-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{product.category}</span>
          <span className="font-black text-sm">${product.price}</span>
        </div>
        <h3 className="text-lg font-black tracking-tight leading-none mb-4">{product.title}</h3>
        <Link to={`/product/${product.id}`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 group-hover:gap-4 transition-all">
          Explore <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}