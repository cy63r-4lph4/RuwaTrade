import { motion } from "framer-motion";
import { 
  TrendingUp, Users, DollarSign, MousePointer2, 
  ArrowUpRight, ArrowDownRight, Globe, Zap 
} from "lucide-react";

export function SellerInsights() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-12"
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-indigo-600 font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">Performance Overview</span>
          <h2 className="text-5xl font-black tracking-tighter italic">Studio Insights<span className="text-gray-200">.</span></h2>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
           {['7D', '30D', 'ALL'].map((range) => (
             <button key={range} className={`px-6 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${range === '30D' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-400 hover:text-gray-900'}`}>
               {range}
             </button>
           ))}
        </div>
      </div>

      {/* BIG STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InsightCard label="Total Revenue" value="$12,840" trend="+12%" up icon={<DollarSign size={20}/>} />
        <InsightCard label="Studio Visits" value="48.2k" trend="+5.4%" up icon={<Users size={20}/>} />
        <InsightCard label="Conv. Rate" value="3.2%" trend="-0.8%" icon={<MousePointer2 size={20}/>} />
        <InsightCard label="Followers" value="5,820" trend="+142" up icon={<TrendingUp size={20}/>} />
      </div>

      {/* CHARTS SECTION (MOCKUP) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* MAIN CHART */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-[3rem] p-10 relative overflow-hidden">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h3 className="text-xl font-black tracking-tight">Sales Volume</h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Daily studio earnings</p>
            </div>
            <ArrowUpRight className="text-green-500" />
          </div>
          
          {/* VISUAL CHART PLACEHOLDER */}
          <div className="h-64 w-full flex items-end gap-2">
            {[40, 70, 45, 90, 65, 80, 100, 55, 85, 40, 75, 95].map((h, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.05, duration: 0.8 }}
                className={`flex-1 rounded-t-lg ${i === 6 ? 'bg-indigo-600' : 'bg-gray-100'}`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-6 text-[10px] font-black text-gray-300 uppercase tracking-widest px-2">
            <span>Feb 01</span>
            <span>Feb 08</span>
          </div>
        </div>

        {/* DISTRIBUTION */}
        <div className="bg-gray-900 text-white rounded-[3rem] p-10 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-black tracking-tight">Product Split</h3>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Digital vs Physical</p>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                <span className="flex items-center gap-2"><Zap size={14} className="text-indigo-400" /> Digital</span>
                <span>65%</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full w-[65%] bg-indigo-500 rounded-full" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                <span className="flex items-center gap-2"><Globe size={14} className="text-green-400" /> Physical</span>
                <span>35%</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full w-[35%] bg-green-500 rounded-full" />
              </div>
            </div>
          </div>

          <button className="w-full py-4 bg-white/10 hover:bg-white/20 transition-all rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10">
            Download Report
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function InsightCard({ label, value, trend, up, icon }: any) {
  return (
    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all group">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-gray-50 rounded-2xl text-gray-400 group-hover:text-indigo-600 transition-colors">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${up ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
          {up ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
          {trend}
        </div>
      </div>
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{label}</p>
      <p className="text-4xl font-black tracking-tighter">{value}</p>
    </div>
  );
}