import { motion } from "framer-motion";
import { 
  Users, Store, AlertCircle, CheckCircle2, 
  ArrowUpRight, DollarSign, Activity, ShieldAlert 
} from "lucide-react";

export function Dashboard() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
      <header>
        <h2 className="text-4xl font-black tracking-tighter">Platform Pulse</h2>
        <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mt-1">Real-time marketplace oversight</p>
      </header>

      {/* SYSTEM HEALTH STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <AdminStat card label="Total Revenue" value="$2.4M" trend="+18%" color="text-green-600" />
        <AdminStat card label="Active Sellers" value="1,240" trend="+42" color="text-indigo-600" />
        <AdminStat card label="Pending Approvals" value="18" trend="Urgent" color="text-red-500" />
        <AdminStat card label="Support Tickets" value="5" trend="-2" color="text-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PENDING ACTIONS LIST */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-[2.5rem] p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-lg tracking-tight flex items-center gap-2">
              <ShieldAlert className="text-orange-500" size={20} /> Seller Verifications
            </h3>
            <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600">View All</button>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-xs">A{i}</div>
                  <div>
                    <p className="font-black text-sm uppercase">Studio Alpha {i}</p>
                    <p className="text-[10px] text-gray-400 font-bold">Applied 2 hours ago • Ghana</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white text-green-600 border border-green-100 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all">Approve</button>
                  <button className="px-4 py-2 bg-white text-gray-400 border border-gray-100 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all">Review</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT TRANSACTIONS */}
        <div className="bg-gray-900 text-white rounded-[2.5rem] p-8">
          <h3 className="font-black text-lg tracking-tight mb-8">Live Sales</h3>
          <div className="space-y-6">
            {[1, 2, 4, 5].map((i) => (
              <div key={i} className="flex justify-between items-start border-b border-white/5 pb-4 last:border-0">
                <div>
                  <p className="text-xs font-black uppercase tracking-tight text-white/90">#ORD-992{i}</p>
                  <p className="text-[10px] text-white/40 font-bold italic">2 mins ago</p>
                </div>
                <p className="font-black text-indigo-400 text-sm">+$240.00</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
            Finance Ledger
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function AdminStat({ label, value, trend, color }: any) {
  return (
    <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm">
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{label}</p>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-black tracking-tighter">{value}</p>
        <span className={`text-[10px] font-black ${color}`}>{trend}</span>
      </div>
    </div>
  );
}