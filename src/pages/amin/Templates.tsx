import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileCode, CheckCircle, XCircle, Eye, 
  Download, ShieldAlert, Layers, ExternalLink 
} from "lucide-react";

const PENDING_TEMPLATES = [
  {
    id: "temp-01",
    name: "Quantum Dashboard Kit",
    author: "Digital Craft Co.",
    category: "UI Design",
    submitted: "1 hour ago",
    files: "124MB",
    previewUrl: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=600",
    status: "Pending"
  },
  {
    id: "temp-02",
    name: "Neo-Brutalist React Theme",
    author: "Studio 44",
    category: "Web Templates",
    submitted: "3 hours ago",
    files: "42MB",
    previewUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=600",
    status: "Pending"
  }
];

export function Templates() {
  const [selected, setSelected] = useState(PENDING_TEMPLATES[0]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black tracking-tighter italic">Template Lab<span className="text-indigo-600">.</span></h2>
          <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mt-1">Asset Verification Queue</p>
        </div>
        <div className="bg-orange-50 text-orange-600 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest border border-orange-100 flex items-center gap-2">
          <ShieldAlert size={14}/> {PENDING_TEMPLATES.length} Items Awaiting Review
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[70vh]">
        
        {/* LEFT: PENDING LIST */}
        <div className="lg:col-span-4 space-y-4">
          {PENDING_TEMPLATES.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className={`w-full text-left p-6 rounded-[2rem] border transition-all ${
                selected.id === item.id 
                ? "bg-white border-indigo-600 shadow-xl" 
                : "bg-white/50 border-gray-100 opacity-60 hover:opacity-100"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <FileCode className={selected.id === item.id ? "text-indigo-600" : "text-gray-400"} />
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-tight">{item.name}</h4>
                  <p className="text-[10px] font-bold text-gray-400 mt-1">By {item.author}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* RIGHT: INSPECTION PANEL */}
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-[3rem] overflow-hidden flex flex-col shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div 
              key={selected.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              {/* Preview Header */}
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                    {selected.category}
                  </div>
                  <span className="text-xs text-gray-300 font-bold tracking-widest italic">{selected.files} ZIP</span>
                </div>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 border-b-2 border-indigo-600 pb-1">
                   Download for Code Review <Download size={14} />
                </button>
              </div>

              {/* Visual Preview */}
              <div className="flex-1 p-8 bg-gray-50/50">
                 <div className="aspect-video w-full rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl">
                    <img src={selected.previewUrl} className="w-full h-full object-cover" alt="" />
                 </div>
                 <div className="mt-8 grid grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Author Reputation</p>
                       <p className="font-black">Top Rated Seller</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Submitted</p>
                       <p className="font-black">{selected.submitted}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Live Demo</p>
                       <a href="#" className="flex items-center gap-2 font-black text-indigo-600 hover:text-gray-900 transition-colors">
                          Preview <ExternalLink size={14}/>
                       </a>
                    </div>
                 </div>
              </div>

              {/* Action Footer */}
              <div className="p-8 border-t border-gray-100 flex gap-4">
                 <button className="flex-1 py-5 bg-green-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-green-600 transition-all shadow-lg active:scale-95">
                    <CheckCircle size={20} /> Approve Template
                 </button>
                 <button className="flex-1 py-5 bg-white border-2 border-red-100 text-red-500 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-red-500 hover:text-white transition-all active:scale-95">
                    <XCircle size={20} /> Reject Submission
                 </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}