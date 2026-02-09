import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Camera, MapPin, Globe, CreditCard, 
  Store, Bell, ShieldCheck, Check
} from "lucide-react";

export function SellerSettings() {
  const [activeTab, setActiveTab] = useState("Branding");

  const tabs = ["Branding", "Logistics", "Payouts", "Security"];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto space-y-12">
      <header>
        <h2 className="text-5xl font-black tracking-tighter">Studio Settings</h2>
        <p className="text-gray-500 font-bold mt-2 uppercase text-[10px] tracking-widest">Configure your studio presence and preferences</p>
      </header>

      {/* HORIZONTAL NAV */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
              activeTab === tab 
              ? "bg-gray-900 text-white shadow-xl" 
              : "bg-white text-gray-400 border border-gray-100 hover:border-gray-900 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* LEFT: SETTINGS FORM */}
        <div className="md:col-span-2 space-y-8">
          
          {activeTab === "Branding" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
              <section className="space-y-6 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                  <Store className="text-indigo-600" size={20} /> Studio Identity
                </h3>
                <div className="space-y-6">
                  <InputGroup label="Studio Name" defaultValue="Artem Studio" />
                  <InputGroup label="Tagline" defaultValue="Minimal goods & lifestyle" />
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">About the Studio</label>
                    <textarea 
                      className="w-full bg-gray-50 rounded-[2rem] p-6 min-h-[150px] font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-600 transition-all border-none"
                      defaultValue="Artem Studio focuses on minimal aesthetics and timeless designs..."
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-6 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                 <h3 className="text-xl font-black tracking-tight">Public Links</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="Website" placeholder="https://artem.com" icon={<Globe size={16}/>} />
                    <InputGroup label="Location" defaultValue="Accra, Ghana" icon={<MapPin size={16}/>} />
                 </div>
              </section>
            </motion.div>
          )}

          {activeTab === "Payouts" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="bg-indigo-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <CreditCard className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 -rotate-12" />
                <div className="relative z-10 space-y-8">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Connected Account</p>
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-[8px] font-black">ACTIVE</span>
                  </div>
                  <p className="text-3xl font-black tracking-tighter italic">Stripe ••••• 4421</p>
                  <button className="px-6 py-3 bg-white text-indigo-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform">
                    Change Payout Method
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          <button className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-gray-900 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3">
             <Check size={18} /> Save Settings
          </button>
        </div>

        {/* RIGHT: MEDIA ASSETS */}
        <div className="space-y-8">
          <div className="bg-white border border-gray-100 rounded-[3rem] p-8 space-y-8 shadow-sm">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Studio Logo</h4>
            <div className="relative group">
              <img 
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200" 
                className="w-32 h-32 rounded-[2rem] object-cover mx-auto" 
                alt="Logo"
              />
              <button className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]">
                <Camera className="text-white" />
              </button>
            </div>
            <p className="text-[9px] text-center text-gray-400 font-bold leading-relaxed">Recommended size: 500x500px. <br/> Transparent PNG preferred.</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-[3rem] p-8 space-y-6 shadow-sm">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Store Banner</h4>
            <div className="relative group h-32 rounded-2xl overflow-hidden">
               <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=400" className="w-full h-full object-cover" alt="Banner" />
               <button className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white" size={20} />
              </button>
            </div>
          </div>

          <div className="p-8 border-2 border-dashed border-gray-100 rounded-[3rem] space-y-4">
             <div className="flex items-center gap-3 text-indigo-600">
               <ShieldCheck size={20} />
               <span className="text-[10px] font-black uppercase tracking-widest">Verification Status</span>
             </div>
             <p className="text-[10px] font-bold text-gray-400 leading-relaxed">Your studio is verified. You have access to instant payouts and priority search placement.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function InputGroup({ label, icon, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">{label}</label>
      <div className="relative group">
        {icon && (
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-600 transition-colors">
            {icon}
          </div>
        )}
        <input 
          {...props} 
          className={`w-full bg-gray-50 border-none rounded-2xl py-4 pr-6 font-bold text-gray-900 focus:ring-2 focus:ring-indigo-600 outline-none transition-all ${icon ? 'pl-14' : 'pl-6'}`}
        />
      </div>
    </div>
  );
}