import { motion } from "framer-motion";
import { Download, Copy, Zap, FileCode, ImageIcon, Box, Check } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const DOWNLOADS = [
  {
    id: "dl-1",
    name: "Quantum UI Design System",
    seller: "Artem Studio",
    format: ".figma",
    size: "124 MB",
    version: "2.4.0",
    key: "QTUM-XXXX-8821-BC99",
    type: "Design",
    icon: <ImageIcon className="text-purple-500" />
  },
  {
    id: "dl-2",
    name: "React Neo-Brutalist Components",
    seller: "ByteForge",
    format: ".zip",
    size: "12.5 MB",
    version: "1.0.2",
    key: "NEO-CODE-7721-ZZ01",
    type: "Code",
    icon: <FileCode className="text-indigo-500" />
  },
  {
    id: "dl-3",
    name: "3D Abstract Textures Vol. 1",
    seller: "Studio 3D",
    format: ".blend",
    size: "1.2 GB",
    version: "1.0.0",
    key: "3DVL-9920-KLP2-0012",
    type: "3D Asset",
    icon: <Box className="text-orange-500" />
  }
];

export function DigitalLibrary() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    toast.success("License key copied!");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      className="space-y-10"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-[0.3em] text-[10px] mb-2">
            <Zap size={14} fill="currentColor" /> Instant Access
          </span>
          <h2 className="text-5xl font-black tracking-tighter">Digital Library</h2>
        </div>
        <p className="text-gray-400 font-bold text-sm">3 Assets Purchased</p>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 gap-6">
        {DOWNLOADS.map((item) => (
          <div 
            key={item.id} 
            className="group bg-white border border-gray-100 rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500"
          >
            {/* Visual Icon */}
            <div className="w-24 h-24 bg-gray-50 rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              {item.icon}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-gray-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg">
                  {item.format}
                </span>
                <span className="text-gray-300 font-black text-[10px] uppercase tracking-widest">
                  v{item.version} • {item.size}
                </span>
              </div>
              <h3 className="text-2xl font-black tracking-tighter mb-1">{item.name}</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Studio: {item.seller}</p>
            </div>

            {/* License & Download Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <div className="bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100 flex items-center gap-4 w-full sm:w-auto">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-1">License Key</span>
                  <code className="text-xs font-bold text-gray-900 truncate w-32">{item.key}</code>
                </div>
                <button 
                  onClick={() => copyToClipboard(item.key)}
                  className="p-2 hover:bg-white rounded-xl transition-colors text-indigo-600"
                >
                  {copiedKey === item.key ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>

              <button className="w-full sm:w-auto bg-gray-900 text-white p-6 rounded-3xl hover:bg-indigo-600 transition-all active:scale-95 flex items-center justify-center gap-3 group/btn">
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Download Asset</span>
                <Download size={18} className="group-hover/btn:translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Help Note */}
      <div className="bg-indigo-50 rounded-3xl p-8 flex items-start gap-4">
        <Zap className="text-indigo-600 mt-1" size={20} />
        <div>
          <h4 className="font-black text-sm uppercase tracking-widest text-indigo-900">Need help with your assets?</h4>
          <p className="text-sm text-indigo-700/70 font-bold leading-relaxed mt-2">
            All digital items are eligible for lifetime updates. If the download link expires, 
            simply refresh this page or contact our 24/7 technical support studio.
          </p>
        </div>
      </div>
    </motion.div>
  );
}