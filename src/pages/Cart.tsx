import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Trash2, Plus, Minus, ShieldCheck, 
  Truck, Zap, CreditCard, ArrowRight, 
  ShoppingBag, Mail 
} from "lucide-react";

const INITIAL_CART = [
  {
    id: "p1",
    name: "Series 01 Minimalist Chair",
    type: "physical",
    price: 299.00,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=300&q=80",
    seller: "Artem Studio"
  },
  {
    id: "d1",
    name: "Quantum UI System",
    type: "digital",
    price: 49.00,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=300&q=80",
    seller: "ByteForge",
    format: ".figma"
  }
];

export function CartPage() {
  const [items, setItems] = useState(INITIAL_CART);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = items.some(i => i.type === "physical") ? 15.00 : 0;
  const total = subtotal + shipping;

  const updateQty = (id, delta) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => setItems(items.filter(item => item.id !== id));

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 text-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="flex items-end justify-between mb-12 border-b border-gray-100 pb-10">
          <div>
            <span className="text-indigo-600 font-black uppercase tracking-[0.3em] text-[10px]">Your Selection</span>
            <h1 className="text-6xl font-black tracking-tighter mt-2">Shopping <span className="text-gray-300">Bag</span></h1>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Bag Total</p>
            <p className="text-3xl font-black">${total.toFixed(2)}</p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center">
             <ShoppingBag size={64} className="mx-auto text-gray-100 mb-6" />
             <h2 className="text-2xl font-black mb-4">Your bag is empty</h2>
             <Link to="/shop" className="text-indigo-600 font-black uppercase tracking-widest text-sm border-b-2 border-indigo-600 pb-1">Start Browsing</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* LEFT: ITEM LIST */}
            <div className="lg:col-span-8 space-y-8">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item.id} 
                    className="flex flex-col md:flex-row gap-8 p-6 rounded-[2.5rem] bg-gray-50/50 border border-gray-100 group"
                  >
                    {/* Thumbnail */}
                    <div className="w-full md:w-40 h-40 rounded-3xl overflow-hidden relative">
                      <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                      <div className="absolute top-3 left-3">
                         {item.type === 'digital' ? 
                          <span className="bg-purple-600 text-white p-1.5 rounded-lg shadow-xl block"><Zap size={14} fill="currentColor"/></span> :
                          <span className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-xl block"><Truck size={14}/></span>
                         }
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-black tracking-tight mb-1">{item.name}</h3>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">By {item.seller}</p>
                          {item.type === 'digital' && (
                            <span className="inline-block mt-2 px-2 py-1 bg-purple-50 text-purple-600 rounded text-[10px] font-black uppercase">{item.format}</span>
                          )}
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors p-2">
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-6 md:mt-0">
                        <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-1">
                          <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-xl transition-colors"><Minus size={14}/></button>
                          <span className="font-black w-4 text-center text-sm">{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-xl transition-colors"><Plus size={14}/></button>
                        </div>
                        <p className="text-2xl font-black tracking-tighter">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* RIGHT: SUMMARY & CHECKOUT */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 bg-gray-900 text-white rounded-[3rem] p-10 shadow-2xl">
                <h2 className="text-2xl font-black tracking-tighter mb-8">Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-400 font-bold text-sm uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 font-bold text-sm uppercase tracking-widest">
                    <span>Shipping</span>
                    <span className="text-white">{shipping > 0 ? `$${shipping.toFixed(2)}` : 'FREE'}</span>
                  </div>
                  <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-end">
                    <span className="font-black text-lg">Total</span>
                    <span className="text-4xl font-black tracking-tighter text-indigo-400">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Delivery Notifications */}
                <div className="space-y-3 mb-10">
                  {items.some(i => i.type === 'digital') && (
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-tighter bg-white/5 p-3 rounded-xl border border-white/10">
                      <Mail size={16} className="text-purple-400" />
                      Digital items sent to your email
                    </div>
                  )}
                  {items.some(i => i.type === 'physical') && (
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-tighter bg-white/5 p-3 rounded-xl border border-white/10">
                      <Truck size={16} className="text-indigo-400" />
                      Physical items arrive in 3-5 days
                    </div>
                  )}
                </div>

                <button className="w-full py-6 bg-white text-gray-900 rounded-3xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-indigo-400 hover:text-white transition-all active:scale-95">
                  SECURE CHECKOUT <ArrowRight size={18} />
                </button>

                <div className="mt-8 flex items-center justify-center gap-2 opacity-30">
                  <ShieldCheck size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">AES-256 Encryption</span>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}