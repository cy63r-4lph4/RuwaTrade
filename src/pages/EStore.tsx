import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Download, Zap, Monitor, Code, Layout, ArrowRight, ShieldCheck, Layers } from "lucide-react";

const digitalCategories = [
  { name: "All Assets", icon: <Layers size={16} /> },
  { name: "UI Kits", icon: <Layout size={16} /> },
  { name: "React Templates", icon: <Code size={16} /> },
  { name: "3D Models", icon: <Monitor size={16} /> },
];

const digitalAssets = [
  {
    id: "d1",
    name: "Quantum UI System",
    version: "v2.4",
    price: 49.00,
    category: "UI Kits",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=800&q=80",
    format: "Figma",
    sales: "1.2k+",
    tag: "Best Seller"
  },
  {
    id: "d2",
    name: "Nebula Dashboard Kit",
    version: "v1.0",
    price: 89.00,
    category: "React Templates",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    format: "React / Tailwind",
    sales: "850",
    tag: "New"
  },
  {
    id: "d3",
    name: "Abstract 3D Shapes Pack",
    version: "v3.1",
    price: 24.00,
    category: "3D Models",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    format: "Blender / PNG",
    sales: "3.4k",
    tag: "Asset"
  },
  {
    id: "d4",
    name: "SaaS Landing Page Pro",
    version: "v1.2",
    price: 59.00,
    category: "React Templates",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    format: "Next.js",
    sales: "2.1k",
    tag: "Premium"
  }
];

export function EStore() {
  const [activeTab, setActiveTab] = useState("All Assets");

  // Filtering logic using the activeTab
  const filteredAssets = digitalAssets.filter(asset => 
    activeTab === "All Assets" || asset.category === activeTab
  );

  return (
    <div className="bg-[#0a0f1d] min-h-screen text-white pt-24 selection:bg-purple-500/30">
      {/* ===== DIGITAL HERO ===== */}
      <section className="px-6 max-w-7xl mx-auto mb-12 relative">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-0 -left-24 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-b border-white/10 pb-16 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-purple-500/20">
                Direct Download
              </span>
              <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">• 2,400+ Assets</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              E-<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">Store</span>
            </h1>
          </div>
          
          <div className="relative w-full md:w-96 group">
            <input
              type="text"
              placeholder="Search components..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold focus:ring-2 focus:ring-purple-500 transition-all outline-none group-hover:bg-white/10"
            />
            <Search className="absolute right-5 top-4 text-white/30 group-hover:text-purple-400 transition-colors" size={20} />
          </div>
        </div>
      </section>

      {/* ===== CATEGORY FILTER BAR (Using the icons!) ===== */}
      <div className="sticky top-20 z-40 bg-[#0a0f1d]/80 backdrop-blur-xl border-b border-white/5 mb-12">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-4 overflow-x-auto no-scrollbar">
          {digitalCategories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveTab(cat.name)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                activeTab === cat.name 
                ? "bg-purple-600 border-purple-400 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)]" 
                : "bg-white/5 border-white/5 text-white/50 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* ===== ASSET GRID ===== */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredAssets.map((asset) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={asset.id}
                className="group relative bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row p-5 gap-6 hover:border-purple-500/30 hover:bg-white/[0.04] transition-all duration-500"
              >
                {/* Glowing Background Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Preview Image */}
                <div className="w-full md:w-56 h-48 md:h-auto rounded-[2rem] overflow-hidden relative border border-white/5">
                  <img src={asset.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={asset.name} />
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] font-black uppercase tracking-widest bg-purple-600 px-2 py-1 rounded-md shadow-lg">
                      {asset.tag}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between py-1 relative z-10">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-black tracking-tight group-hover:text-purple-400 transition-colors">
                        {asset.name}
                      </h3>
                      <span className="bg-white/5 px-2 py-1 rounded text-[10px] font-bold text-white/40">{asset.version}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-white/40 text-[11px] font-black uppercase tracking-widest mb-6">
                      <div className="flex items-center gap-1.5"><Download size={14} className="text-purple-500"/> {asset.sales}</div>
                      <div className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-blue-400"/> {asset.format}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div>
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-tighter">Instant Access</p>
                        <span className="text-3xl font-black text-white tracking-tighter">${asset.price}</span>
                    </div>
                    <button className="flex items-center gap-2 px-8 py-4 bg-white text-[#0a0f1d] hover:bg-purple-500 hover:text-white rounded-2xl font-black text-xs transition-all shadow-xl active:scale-95">
                      DOWNLOAD NOW <Zap size={16} className="fill-current" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Load More Section */}
        <div className="mt-32 border-t border-white/5 pt-20 text-center">
            <h4 className="text-xl font-black mb-8 text-white/40">Looking for something custom?</h4>
            <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center gap-3 mx-auto">
                Explore Entire Library <ArrowRight size={18} className="text-purple-400"/>
            </button>
        </div>
      </main>
    </div>
  );
}