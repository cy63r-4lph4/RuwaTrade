import { motion } from "framer-motion";
import { 
  MoreVertical, Edit3, Trash2, Eye, 
  ExternalLink, Search, Filter, Plus 
} from "lucide-react";
import { Link } from "react-router-dom";

const INVENTORY = [
  {
    id: "p-1",
    name: "Minimalist Oak Chair",
    sku: "FUR-CH-001",
    price: 314.00,
    stock: 12,
    status: "Active",
    type: "Physical",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=100"
  },
  {
    id: "p-2",
    name: "Quantum UI Design System",
    sku: "DIG-UI-99",
    price: 89.00,
    stock: "∞",
    status: "Active",
    type: "Digital",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=100"
  },
  {
    id: "p-3",
    name: "Brutalist Ceramic Vase",
    sku: "ACC-VA-04",
    price: 45.00,
    stock: 0,
    status: "Out of Stock",
    type: "Physical",
    image: "https://images.unsplash.com/photo-1581557991964-125469da3b8a?auto=format&fit=crop&w=100"
  }
];

export function SellerInventory() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
      {/* HEADER ACTIONS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-5xl font-black tracking-tighter italic">Inventory<span className="text-gray-200">.</span></h2>
          <p className="text-gray-500 font-bold mt-2 uppercase text-[10px] tracking-widest">Manage your {INVENTORY.length} studio assets</p>
        </div>
        <Link to="/dashboard/upload" className="flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-900 transition-all shadow-xl active:scale-95">
          <Plus size={18} /> New Product
        </Link>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          <input 
            placeholder="Search SKU or Product..." 
            className="w-full bg-white border border-gray-100 rounded-2xl py-5 pl-14 pr-6 font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
          />
        </div>
        <button className="flex items-center gap-3 bg-white border border-gray-100 px-8 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all">
          <Filter size={16} /> Filters
        </button>
      </div>

      {/* INVENTORY LIST */}
      <div className="bg-white border border-gray-100 rounded-[3rem] overflow-hidden shadow-sm">
        <div className="hidden md:grid grid-cols-6 p-8 border-b border-gray-50 text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">
          <div className="col-span-2">Product</div>
          <div>Type</div>
          <div>Price</div>
          <div>Inventory</div>
          <div className="text-right">Action</div>
        </div>

        <div className="divide-y divide-gray-50">
          {INVENTORY.map((item) => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-6 p-8 items-center hover:bg-gray-50/50 transition-colors group">
              {/* Product Info */}
              <div className="md:col-span-2 flex items-center gap-4">
                <img src={item.image} className="w-16 h-16 rounded-xl object-cover bg-gray-100" />
                <div>
                  <h4 className="font-black text-gray-900 leading-tight">{item.name}</h4>
                  <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-1">{item.sku}</p>
                </div>
              </div>

              {/* Type Badge */}
              <div>
                <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                  item.type === 'Digital' ? 'bg-purple-50 text-purple-600' : 'bg-indigo-50 text-indigo-600'
                }`}>
                  {item.type}
                </span>
              </div>

              {/* Price */}
              <div className="font-black text-gray-900 text-lg tracking-tighter">
                ${item.price.toFixed(2)}
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${item.stock === 0 ? 'bg-red-500' : 'bg-green-500'}`} />
                <span className="font-bold text-sm text-gray-600">{item.stock} in stock</span>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2">
                <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-white transition-all"><Edit3 size={18} /></button>
                <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-white transition-all"><Eye size={18} /></button>
                <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}