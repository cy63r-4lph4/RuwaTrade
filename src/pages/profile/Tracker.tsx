import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { 
  Package, Truck, CheckCircle2, MapPin, 
  ArrowLeft, ExternalLink, Box, Clock 
} from "lucide-react";

const TRACKING_STEPS = [
  { status: "Order Placed", date: "Oct 24, 10:00 AM", completed: true, current: false },
  { status: "Processing", date: "Oct 24, 02:30 PM", completed: true, current: false },
  { status: "In Transit", date: "Oct 25, 08:00 AM", completed: false, current: true },
  { status: "Delivered", date: "Pending", completed: false, current: false },
];

export function OrderTracking() {
  const { id } = useParams(); // Get Order ID from URL

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-12"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <Link to="/profile/orders" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-indigo-600 transition-colors mb-4">
            <ArrowLeft size={14} /> Back to History
          </Link>
          <h2 className="text-5xl font-black tracking-tighter">Track Order<span className="text-gray-200">.</span></h2>
          <p className="text-gray-500 font-bold mt-2">Order ID: <span className="text-gray-900">#{id || "RW-9901"}</span></p>
        </div>
        <div className="bg-indigo-600 text-white px-8 py-4 rounded-[2rem] shadow-xl shadow-indigo-100 flex items-center gap-4">
          <Truck size={24} />
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Estimated Arrival</p>
            <p className="text-xl font-black tracking-tight">Oct 28, 2026</p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: STATUS TIMELINE */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-gray-100 rounded-[3rem] p-10 space-y-10">
            <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
              <Clock className="text-indigo-600" /> Shipment Status
            </h3>
            
            <div className="relative space-y-12 ml-4">
              {/* Vertical Line */}
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100" />

              {TRACKING_STEPS.map((step, idx) => (
                <div key={idx} className="relative flex gap-8">
                  <div className={`z-10 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${
                    step.completed ? "bg-green-500" : step.current ? "bg-indigo-600" : "bg-gray-200"
                  }`}>
                    {step.completed && <CheckCircle2 size={12} className="text-white" />}
                  </div>
                  <div>
                    <p className={`font-black text-sm uppercase tracking-tight ${step.current ? "text-indigo-600" : "text-gray-900"}`}>
                      {step.status}
                    </p>
                    <p className="text-xs text-gray-400 font-bold">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ITEM SUMMARY */}
          <div className="bg-white border border-gray-100 rounded-[3rem] p-10">
            <h3 className="text-xl font-black tracking-tight mb-8">Package Content</h3>
            <div className="space-y-4">
               {[1].map((item) => (
                 <div key={item} className="flex items-center gap-6 p-4 bg-gray-50 rounded-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=80&q=80" 
                      className="w-16 h-16 rounded-xl object-cover shadow-sm"
                      alt=""
                    />
                    <div className="flex-1">
                      <p className="font-black text-sm">Minimalist Oak Chair</p>
                      <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Qty: 01 • Artem Studio</p>
                    </div>
                    <p className="font-black text-indigo-600">$314.00</p>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* RIGHT: SHIPPING INFO */}
        <div className="space-y-8">
          <div className="bg-gray-900 text-white rounded-[3rem] p-10 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Carrier Details</h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 font-bold italic">Carrier</p>
                <p className="text-lg font-black tracking-tight">DHL Express Worldwide</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold italic">Tracking Number</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-black tracking-tight">JD0144552233</p>
                  <ExternalLink size={14} className="text-indigo-400 cursor-pointer hover:text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-[3rem] p-10 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Destination</h4>
            <div className="flex gap-4">
              <MapPin className="text-gray-300" />
              <div>
                <p className="text-sm font-black text-gray-900 leading-tight">
                  Alex Rivera <br />
                  22 Studio Lane, Digital District <br />
                  Accra, Ghana
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 border-2 border-dashed border-gray-100 rounded-[3rem] text-center">
            <Box size={32} className="mx-auto text-gray-200 mb-4" />
            <p className="text-xs font-bold text-gray-400">Need help with this shipment?</p>
            <button className="mt-4 text-[10px] font-black uppercase tracking-widest text-indigo-600 border-b-2 border-indigo-600">Contact Support</button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}