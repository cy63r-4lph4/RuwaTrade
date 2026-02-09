import { motion } from "framer-motion";
import { Package, Truck, CheckCircle2, MapPin, ExternalLink } from "lucide-react";

const ORDERS = [
  {
    id: "RW-9901",
    date: "Oct 24, 2026",
    status: "In Transit",
    total: 314.00,
    items: 2,
    carrier: "DHL Express",
    tracking: "JD0144552233",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "RW-8842",
    date: "Oct 12, 2026",
    status: "Delivered",
    total: 89.00,
    items: 1,
    carrier: "FedEx",
    tracking: "7721009944",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=100&q=80"
  }
];

export function OrderHistory() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
      <div>
        <span className="text-indigo-600 font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">Logistics</span>
        <h2 className="text-5xl font-black tracking-tighter">Order History</h2>
      </div>

      <div className="space-y-6">
        {ORDERS.map((order) => (
          <div key={order.id} className="bg-white border border-gray-100 rounded-[2.5rem] p-8 hover:shadow-xl transition-all">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-6">
                <img src={order.image} className="w-20 h-20 rounded-2xl object-cover bg-gray-50" alt="" />
                <div>
                  <h3 className="text-xl font-black tracking-tight">Order #{order.id}</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{order.date} • {order.items} Items</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <div className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${
                  order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-indigo-50 text-indigo-600'
                }`}>
                  {order.status === 'Delivered' ? <CheckCircle2 size={14}/> : <Truck size={14}/>}
                  {order.status}
                </div>
                <p className="text-2xl font-black tracking-tighter">${order.total.toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between gap-6">
              <div className="flex items-center gap-4 text-sm font-bold text-gray-500">
                <MapPin size={18} className="text-indigo-600" />
                <span>Tracking: <span className="text-gray-900 font-black uppercase ml-1">{order.tracking}</span></span>
              </div>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 border-b-2 border-indigo-600 pb-1 hover:text-gray-900 hover:border-gray-900 transition-all">
                Track Shipment <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}