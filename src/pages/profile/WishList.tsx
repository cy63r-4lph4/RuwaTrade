import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export function Favorites() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
      <div className="flex justify-between items-end">
        <h2 className="text-5xl font-black tracking-tighter">Favorites</h2>
        <p className="text-gray-400 font-bold text-sm">12 Items Saved</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="group relative bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden p-4 flex gap-6 items-center hover:shadow-2xl transition-all">
            <img 
              src={`https://images.unsplash.com/photo-15000${i}?auto=format&fit=crop&w=150&q=80`} 
              className="w-32 h-32 rounded-[1.5rem] object-cover" 
              alt="" 
            />
            <div className="flex-1">
              <h4 className="text-lg font-black tracking-tight">Essential Studio Desk</h4>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">By Artem Studio</p>
              <div className="flex items-center justify-between">
                <span className="font-black text-indigo-600">$450.00</span>
                <button className="p-3 bg-gray-900 text-white rounded-xl hover:bg-indigo-600 transition-colors">
                  <ShoppingBag size={16} />
                </button>
              </div>
            </div>
            <button className="absolute top-6 right-6 text-red-500">
              <Heart size={20} fill="currentColor" />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}