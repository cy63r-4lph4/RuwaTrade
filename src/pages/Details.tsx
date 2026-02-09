import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Zap,
  ArrowLeft,
  Star,
  ShieldCheck,
  Download,
  Truck,
  RefreshCw,
  ChevronRight,
  Globe,
  Layers,
} from "lucide-react";

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // For the ArrowLeft back button

  // In a real app, you'd use 'id' to find the product in an array or database
  // Const product = allProducts.find(p => p.id === id);
  
  const ALL_PRODUCTS = [{
    id: "1",
    type: "physical",
    name: "Series 1 Wireless Over-Ear",
    price: 299.00,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80"],
    category: "Electronics",
    rating: 4.9,
    reviews: 128,
    seller: "AudioWorld",
    sellerWebsite: "https://audioworld.com",
    specs: { Driver: "40mm", Battery: "40h", Connection: "Bluetooth 5.2", Weight: "250g" },
    description: "Experience studio-grade sound with the Series 1. Designed for the purist who demands both aesthetic and acoustic perfection."
  }];
  const product = ALL_PRODUCTS.find((p) => p.id === id);
if (!product) {
    return (
      <div className="pt-40 text-center">
        <h2 className="text-2xl font-black italic">Product Lost in Transit.</h2>
        <button onClick={() => navigate("/shop")} className="mt-4 text-indigo-600 font-black uppercase text-xs">Back to Shop</button>
      </div>
    );
  }
  const isDigital = product.type === "digital";
  const themeClass = isDigital ? "bg-[#0a0f1d] text-white" : "bg-white text-gray-900";
  const accentColor = isDigital ? "text-purple-400" : "text-indigo-600";
  const buttonClass = isDigital
    ? "bg-purple-600 hover:bg-white hover:text-purple-600"
    : "bg-gray-900 hover:bg-indigo-600 text-white";

  return (
    <div className={`min-h-screen pt-24 pb-20 transition-colors duration-500 ${themeClass}`}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Navigation & Back Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-2 opacity-50 text-xs font-black uppercase tracking-widest">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight size={12} />
            <Link to={isDigital ? "/estore" : "/shop"} className="hover:underline">
              {isDigital ? "eStore" : "Shop"}
            </Link>
            <ChevronRight size={12} />
            <span className={accentColor}>{product.name}</span>
          </div>

          {/* UTILIZING: ArrowLeft */}
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:translate-x-[-4px] transition-transform"
          >
            <ArrowLeft size={16} /> Back to Browse
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT: IMAGE GALLERY */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className={`relative aspect-square rounded-[3rem] overflow-hidden border ${isDigital ? "border-white/10" : "border-gray-100 shadow-xl"}`}>
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              
              {/* UTILIZING: Layers */}
              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl flex items-center gap-2 text-black shadow-lg">
                 <Layers size={14} className="text-indigo-600" />
                 <span className="text-[10px] font-black uppercase tracking-tighter">{product.category}</span>
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`w-24 h-24 rounded-2xl overflow-hidden border cursor-pointer opacity-50 hover:opacity-100 transition-all ${isDigital ? "border-white/10" : "border-gray-200"}`}>
                  <img src={product.images[0]} className="w-full h-full object-cover" alt="thumbnail" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: INFO */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${accentColor}`}>
                  {isDigital ? "Direct Asset Download" : "Premium Physical Good"}
                </span>
                
                {/* UTILIZING: Globe */}
                <a href={product.sellerWebsite} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-indigo-500 transition-colors">
                  <Globe size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Storefront</span>
                </a>
              </div>

              <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-black">{product.rating}</span>
                  <span className="opacity-40 text-sm font-bold">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest opacity-60">Available Now</span>
                </div>
              </div>
            </div>

            <p className="text-lg opacity-70 font-medium leading-relaxed mb-10 max-w-xl">
              {product.description}
            </p>

            {/* SPECS GRID */}
            <div className={`grid grid-cols-2 gap-4 mb-10 p-8 rounded-[2.5rem] border ${isDigital ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-100"}`}>
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key}>
                  <p className="text-[10px] uppercase font-black opacity-40 tracking-widest mb-1">{key}</p>
                  <p className="font-bold text-sm">{value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
              <div className="flex-1 w-full">
                <p className="text-xs font-black opacity-40 uppercase tracking-widest mb-2">Investment</p>
                <div className="text-5xl font-black tracking-tighter">${product.price.toFixed(2)}</div>
              </div>
              <button className={`w-full sm:w-auto px-12 py-6 rounded-3xl font-black flex items-center justify-center gap-3 transition-all active:scale-95 shadow-2xl ${buttonClass}`}>
                {isDigital ? (
                  <>PURCHASE ACCESS <Zap size={20} className="fill-current" /></>
                ) : (
                  <>ADD TO CART <ShoppingCart size={20} /></>
                )}
              </button>
            </div>

            {/* TRUST BADGES */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              <Badge icon={isDigital ? <Download size={20}/> : <Truck size={20}/>} label={isDigital ? "Instant" : "Free Ship"} />
              <Badge icon={<ShieldCheck size={20}/>} label="Verified" />
              <Badge icon={<RefreshCw size={20}/>} label="Secured" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Sub-component for clean badges
function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-2 group cursor-default">
      <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">{icon}</div>
      <span className="text-[9px] font-black uppercase tracking-tighter opacity-50">{label}</span>
    </div>
  );
}