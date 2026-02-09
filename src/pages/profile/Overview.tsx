import { motion } from "framer-motion";
import { Bell, ShieldCheck, Package } from "lucide-react";

export function ProfileOverview() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-5xl font-black tracking-tighter">Hello, Alex</h2>
          <p className="text-gray-500 font-bold mt-2 italic">Member since Feb 2026</p>
        </div>
        <div className="flex gap-4">
            <button className="p-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:scale-105 transition-all"><Bell size={20}/></button>
            <button className="p-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:scale-105 transition-all"><ShieldCheck size={20}/></button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Spent" value="$1,240.00" color="bg-gray-900 text-white" />
        <StatCard label="Orders" value="12" color="bg-white text-gray-900" />
        <StatCard label="Digital Assets" value="08" color="bg-indigo-600 text-white" />
      </div>
      
      {/* ... Add Recent Activity list here ... */}
    </motion.div>
  );
}

function StatCard({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className={`p-8 rounded-[2.5rem] shadow-sm border border-gray-100 ${color}`}>
      <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{label}</p>
      <p className="text-4xl font-black tracking-tighter">{value}</p>
    </div>
  );
}