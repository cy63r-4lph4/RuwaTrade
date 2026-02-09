import { motion } from "framer-motion";
export function AccountSettings() {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
      <h2 className="text-5xl font-black tracking-tighter">Settings</h2>

      <section className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InputGroup label="Display Name" placeholder="Alex Rivera" />
          <InputGroup label="Email Address" placeholder="alex@studio.com" />
        </div>
        
        <div className="p-8 bg-white border border-gray-100 rounded-[2.5rem] space-y-6">
          <h3 className="text-xl font-black tracking-tight">Change Password</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup label="New Password" type="password" />
            <InputGroup label="Confirm Password" type="password" />
          </div>
          <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all">
            Update Security
          </button>
        </div>

        <div className="p-8 border-2 border-red-50 rounded-[2.5rem] flex items-center justify-between">
          <div>
            <h4 className="font-black text-red-600 uppercase tracking-widest text-xs">Danger Zone</h4>
            <p className="text-sm text-gray-400 font-bold">Permanently delete your account and data.</p>
          </div>
          <button className="px-6 py-3 border-2 border-red-500 text-red-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
            Delete Account
          </button>
        </div>
      </section>
    </motion.div>
  );
}

function InputGroup({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">{label}</label>
      <input 
        {...props} 
        className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 font-bold text-gray-900 focus:ring-2 focus:ring-indigo-600 outline-none transition-all shadow-sm"
      />
    </div>
  );
}