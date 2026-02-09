import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, ArrowRight, Store, Download, Truck, Zap, Heart, ShieldCheck } from "lucide-react";

// --- Mock data ---
const featuredProducts = Array.from({ length: 6 }).map((_, i) => ({
  id: `p-${i + 1}`,
  title: i % 2 === 0 ? `Modern UI Kit ${i + 1}` : `Handcrafted Chair ${i + 1}`,
  price: (19.99 + i * 3).toFixed(2),
  rating: 4 + ((i % 3) * 0.3),
  type: i % 2 === 0 ? "digital" : "physical",
  image: `https://images.unsplash.com/photo-${[
    "1555066931-4365d14bab8c", "1586023492125-27b2c045efd7", "1498050108023-c5249f4df085",
    "1523275335684-37898b6baf30", "1618005182384-a83a8bd57fbe", "1505740420928-5e560c06d30e"
  ][i]}?auto=format&fit=crop&w=800&q=80`, 
  seller: { name: ["Artem Studio", "Nuru Crafts", "ByteForge"][i % 3] },
}));

const featuredSellers = [
  { id: "s-1", name: "Artem Studio", tagline: "Minimal goods & lifestyle", rating: 4.9, reviews: 312, logo: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&h=200", banner: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80", slug: "artem-studio" },
  { id: "s-2", name: "Nuru Crafts", tagline: "Handmade fashion & decor", rating: 4.8, reviews: 208, logo: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=200&h=200", banner: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80", slug: "nuru-crafts" },
  { id: "s-3", name: "ByteForge", tagline: "Digital templates & tools", rating: 4.7, reviews: 455, logo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200", banner: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80", slug: "byteforge" },
];

export function Home() {
  return (
    <div className="bg-white text-gray-900 selection:bg-purple-100">
      {/* ===== HERO: Vibrant Mesh Gradient ===== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0a0f1d]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/30 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-600/30 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-28 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8"
          >
            Shop Physical. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Go Digital.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-2xl text-indigo-100/70 max-w-2xl mx-auto font-medium mb-12"
          >
            The premium marketplace for <span className="text-white">physical goods</span> and <span className="text-white">digital assets</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Link to="/shop" className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-white text-indigo-900 font-black hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/10">
              Shop Physical <Truck size={20} />
            </Link>
            <Link to="/estore" className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-black backdrop-blur-md hover:bg-white/20 transition-all">
              Explore Digital
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== CATEGORY SPLIT ===== */}
      <section className="max-w-7xl mx-auto px-6 -mt-24 relative z-20 mb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div whileHover={{ y: -8 }} className="group relative h-[450px] rounded-[3rem] overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Physical" />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-transparent to-transparent p-12 flex flex-col justify-end">
              <h2 className="text-4xl font-black text-white mb-4">Physical Store</h2>
              <p className="text-indigo-100/80 mb-8 max-w-sm">Curated apparel, gadgets, and handcrafted decor delivered to your door.</p>
              <Link to="/shop" className="w-max px-8 py-4 bg-white text-indigo-900 font-black rounded-2xl hover:bg-indigo-50 transition-colors shadow-lg">Browse Now</Link>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -8 }} className="group relative h-[450px] rounded-[3rem] overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=1000&q=80" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Digital" />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-transparent to-transparent p-12 flex flex-col justify-end">
              <h2 className="text-4xl font-black text-white mb-4">Digital Assets</h2>
              <p className="text-purple-100/80 mb-8 max-w-sm">High-performance UI kits, templates, and creative software tools.</p>
              <Link to="/estore" className="w-max px-8 py-4 bg-white text-purple-900 font-black rounded-2xl hover:bg-purple-50 transition-colors shadow-lg">Explore Library</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-16">
          <div>
            <span className="text-indigo-600 font-black uppercase tracking-[0.2em] text-xs">The Best of Both Worlds</span>
            <h3 className="text-5xl font-black text-gray-900 mt-2">Featured Picks</h3>
          </div>
          <Link to="/shop" className="hidden sm:flex items-center gap-2 font-black text-indigo-600 hover:text-pink-500 transition-colors">
            View All <ArrowRight size={22} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {featuredProducts.map((p) => (
            <motion.div key={p.id} whileHover={{ y: -10 }} className="group">
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-100 mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className={`absolute top-6 left-6 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-lg flex items-center gap-2 
                  ${p.type === 'digital' ? 'bg-purple-600/90 text-white' : 'bg-white/90 text-gray-900'}`}>
                  {p.type === 'digital' ? <Download size={14} /> : <Truck size={14} />} {p.type}
                </div>
                <button className="absolute top-6 right-6 p-3 rounded-full bg-white/90 text-gray-900 opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-red-500">
                  <Heart size={20} className="fill-current text-transparent" />
                </button>
              </div>

              <div className="flex justify-between items-start px-4">
                <div>
                  <h4 className="text-2xl font-black text-gray-900 line-clamp-1">{p.title}</h4>
                  <p className="text-gray-500 font-bold mt-1">by {p.seller.name}</p>
                </div>
                <span className="text-2xl font-black text-indigo-600">${p.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== FEATURED SELLERS ===== */}
      <section className="bg-gray-50 py-32 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
            <h3 className="text-4xl font-black text-gray-900">Top Verified Sellers</h3>
            <Link to="/sellers" className="text-indigo-600 font-black flex items-center gap-2 hover:underline">
              Browse All <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredSellers.map((s) => (
              <motion.div key={s.id} whileHover={{ y: -10 }} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <div className="relative h-32 bg-indigo-100">
                  <img src={s.banner} className="w-full h-full object-cover" alt="banner" />
                  <div className="absolute -bottom-8 left-8 p-1 bg-white rounded-3xl shadow-lg">
                    <img src={s.logo} className="w-16 h-16 rounded-[1.25rem] object-cover" alt="logo" />
                  </div>
                </div>
                <div className="pt-12 p-8">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xl font-black flex items-center gap-1">
                      {s.name} <ShieldCheck size={18} className="text-blue-500" />
                    </h4>
                    <div className="flex items-center gap-1 text-sm font-black">
                      <Star size={16} className="fill-yellow-400 text-yellow-400" /> {s.rating}
                    </div>
                  </div>
                  <p className="text-gray-500 font-medium text-sm mb-6">{s.tagline}</p>
                  <Link to={`/s/${s.slug}`} className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gray-900 text-white font-black hover:bg-indigo-600 transition-colors">
                    <Store size={18} /> Visit Studio
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-[4rem] p-12 md:p-24 overflow-hidden text-center text-white">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-5xl md:text-7xl font-black mb-8">Join the Pulse.</h3>
            <p className="text-indigo-50/90 text-xl font-medium mb-12">Weekly drops, creator stories, and exclusive digital assets.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto bg-white/10 p-2 rounded-[2.5rem] backdrop-blur-xl border border-white/20">
              <input type="email" placeholder="you@example.com" required className="flex-1 px-8 py-4 rounded-[2rem] bg-white text-gray-900 focus:outline-none font-bold" />
              <button className="px-10 py-4 bg-indigo-950 text-white font-black rounded-[2rem] hover:bg-black transition-all">Join Now</button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== FULL FOOTER ===== */}
      <footer className="bg-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 border-b border-gray-100 pb-20">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-3xl font-black tracking-tighter">RuwaTrade.</Link>
            <p className="mt-6 text-gray-500 font-medium leading-relaxed">
              The world's first truly hybrid marketplace designed for the creator economy.
            </p>
          </div>
          <div>
            <h5 className="font-black uppercase tracking-widest text-xs mb-8 text-gray-400">Shop</h5>
            <ul className="space-y-4 font-bold text-gray-600">
              <li><Link to="/shop" className="hover:text-indigo-600">Physical Goods</Link></li>
              <li><Link to="/estore" className="hover:text-indigo-600">Digital Templates</Link></li>
              <li><Link to="/sellers" className="hover:text-indigo-600">Top Sellers</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-black uppercase tracking-widest text-xs mb-8 text-gray-400">Company</h5>
            <ul className="space-y-4 font-bold text-gray-600">
              <li><Link to="/about" className="hover:text-indigo-600">Our Story</Link></li>
              <li><Link to="/careers" className="hover:text-indigo-600">Careers</Link></li>
              <li><Link to="/press" className="hover:text-indigo-600">Press Kit</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-black uppercase tracking-widest text-xs mb-8 text-gray-400">Support</h5>
            <ul className="space-y-4 font-bold text-gray-600">
              <li><Link to="/help" className="hover:text-indigo-600">Help Center</Link></li>
              <li><Link to="/terms" className="hover:text-indigo-600">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-indigo-600">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-12 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-gray-400 font-bold text-sm tracking-tight">© {new Date().getFullYear()} RuwaTrade Global. All rights reserved.</p>
          <div className="flex gap-8 font-black text-sm text-gray-400 uppercase tracking-widest">
            <Link to="#" className="hover:text-indigo-600">Instagram</Link>
            <Link to="#" className="hover:text-indigo-600">Twitter</Link>
            <Link to="#" className="hover:text-indigo-600">Dribbble</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}