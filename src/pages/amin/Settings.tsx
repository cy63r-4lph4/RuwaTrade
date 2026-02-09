import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Percent, Layers, ShieldCheck, Users, 
  Globe, AlertTriangle, Save, Plus, Trash2 
} from "lucide-react";

export function Settings() {
  const [activeTab, setActiveTab] = useState("Marketplace");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto space-y-12">
      <header>
        <h2 className="text-4xl font-black tracking-tighter italic">Platform Config<span className="text-indigo-600">.</span></h2>
        <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mt-1">Global marketplace rules & governance</p>
      </header>

      {/* TABS */}
      <div className="flex gap-4 border-b border-gray-100 pb-4">
        {["Marketplace", "Categories", "Security", "Users"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab ? "bg-gray-900 text-white shadow-lg" : "text-gray-400 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          
          {/* MARKETPLACE FEES */}
          {activeTab === "Marketplace" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <section className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
                <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                  <Percent className="text-indigo-600" size={20} /> Revenue Split
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <AdminInput label="Digital Commission (%)" defaultValue="15" />
                  <AdminInput label="Physical Commission (%)" defaultValue="10" />
                  <AdminInput label="Min. Payout Threshold ($)" defaultValue="50" />
                  <AdminInput label="Platform Service Fee ($)" defaultValue="2.50" />
                </div>
              </section>

              <section className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                  <Globe className="text-indigo-600" size={20} /> Localization
                </h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="font-black text-xs uppercase">Multi-Currency Support</p>
                    <p className="text-[10px] text-gray-400 font-bold">Allow sellers to list in GHS, USD, and EUR</p>
                  </div>
                  <div className="w-12 h-6 bg-indigo-600 rounded-full relative p-1 cursor-pointer">
                    <div className="absolute right-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* CATEGORY MANAGEMENT */}
          {activeTab === "Categories" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                  <Layers className="text-indigo-600" size={20} /> Taxonomy
                </h3>
                <button className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all">
                  <Plus size={18} />
                </button>
              </div>
              <div className="space-y-3">
                {["Furniture", "UI Kits", "Templates", "Art"].map((cat) => (
                  <div key={cat} className="flex items-center justify-between p-4 border border-gray-50 rounded-2xl hover:border-indigo-100 group">
                    <span className="font-black text-sm uppercase tracking-widest">{cat}</span>
                    <button className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <button className="w-full py-6 bg-gray-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-indigo-600 transition-all shadow-xl flex items-center justify-center gap-3">
            <Save size={18} /> Deploy Global Changes
          </button>
        </div>

        {/* SIDEBAR: SYSTEM STATUS */}
        <div className="space-y-8">
          <div className="bg-red-50 p-8 rounded-[2.5rem] border border-red-100 space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle size={20} />
              <h4 className="text-[10px] font-black uppercase tracking-widest">Danger Zone</h4>
            </div>
            <p className="text-[10px] font-bold text-red-800 leading-relaxed italic">
              Maintenance mode will disable the storefront for all users. Use with extreme caution.
            </p>
            <button className="w-full py-3 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all">
              Activate Maintenance
            </button>
          </div>

          <div className="bg-white border border-gray-100 p-8 rounded-[2.5rem] space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Environment</h4>
            <div className="space-y-4">
              <StatusItem label="API Status" status="Operational" />
              <StatusItem label="Payment Gateway" status="Active" />
              <StatusItem label="Storage (S3)" status="92% Full" warning />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AdminInput({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">{label}</label>
      <input 
        {...props} 
        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-black text-gray-900 focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
      />
    </div>
  );
}

function StatusItem({ label, status, warning }: any) {
  return (
    <div className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0">
      <span className="text-[10px] font-black uppercase text-gray-400">{label}</span>
      <span className={`text-[10px] font-black uppercase ${warning ? 'text-orange-500' : 'text-green-500'}`}>
        {status}
      </span>
    </div>
  );
}