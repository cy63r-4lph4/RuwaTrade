import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Zap, Package, Image as ImageIcon, X } from "lucide-react";

export function SellerUpload() {
  const [productType, setProductType] = useState<"Physical" | "Digital">("Physical");

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-12">
      <header>
        <h2 className="text-5xl font-black tracking-tighter italic">Create Asset<span className="text-indigo-600">.</span></h2>
        <p className="text-gray-500 font-bold mt-2 uppercase text-xs tracking-widest">Add a new creation to your studio inventory</p>
      </header>

      {/* TYPE SWITCHER */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => setProductType("Physical")}
          className={`p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-4 ${productType === 'Physical' ? 'border-gray-900 bg-white shadow-2xl' : 'border-transparent bg-gray-100 opacity-50'}`}
        >
          <Package size={32} className={productType === 'Physical' ? 'text-indigo-600' : ''} />
          <span className="font-black uppercase tracking-widest text-xs">Physical Goods</span>
        </button>
        <button 
          onClick={() => setProductType("Digital")}
          className={`p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-4 ${productType === 'Digital' ? 'border-indigo-600 bg-white shadow-2xl' : 'border-transparent bg-gray-100 opacity-50'}`}
        >
          <Zap size={32} className={productType === 'Digital' ? 'text-indigo-600' : ''} />
          <span className="font-black uppercase tracking-widest text-xs">Digital Asset</span>
        </button>
      </div>

      <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm space-y-10">
        {/* MEDIA UPLOAD */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Product Gallery</label>
          <div className="grid grid-cols-4 gap-4">
            <div className="aspect-square rounded-[2rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 hover:bg-indigo-50 hover:border-indigo-200 transition-colors cursor-pointer group">
               <Upload size={24} className="text-gray-300 group-hover:text-indigo-600"/>
               <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">Add Media</span>
            </div>
            {/* Mock for uploaded image */}
            <div className="relative aspect-square rounded-[2rem] overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=300" className="w-full h-full object-cover" />
               <button className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X size={12}/></button>
            </div>
          </div>
        </div>

        {/* DETAILS FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <InputGroup label="Product Name" placeholder="e.g. Minimalist Oak Chair" />
           <InputGroup label="Category" placeholder="Furniture" />
           <InputGroup label="Price (USD)" placeholder="0.00" type="number" />
           {productType === "Digital" ? (
             <InputGroup label="File Version" placeholder="1.0.0" />
           ) : (
             <InputGroup label="Stock Quantity" placeholder="20" />
           )}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Description</label>
          <textarea className="w-full bg-gray-50 rounded-[2rem] p-6 min-h-[150px] font-medium outline-none focus:ring-2 focus:ring-indigo-600 transition-all" />
        </div>

        <button className="w-full py-6 bg-gray-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-indigo-600 transition-all shadow-xl active:scale-95">
          Publish to Studio
        </button>
      </div>
    </motion.div>
  );
}

function InputGroup({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">{label}</label>
      <input 
        {...props} 
        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
      />
    </div>
  );
}