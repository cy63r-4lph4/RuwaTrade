import { motion } from "framer-motion";
import { 
  TrendingUp, BarChart, PieChart, Download, 
  ArrowUpRight, ArrowDownRight, Activity, Zap, Globe 
} from "lucide-react";

export function Analytics() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-12"
    >
      {/* HEADER WITH EXPORT */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-5xl font-black tracking-tighter italic uppercase">Market Stats<span className="text-indigo-600">.</span></h2>
          <p className="text-gray-500 font-bold mt-2 uppercase text-[10px] tracking-widest">Platform-wide financial performance</p>
        </div>
        <button className="flex items-center gap-3 bg-white border border-gray-100 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-gray-900 hover:shadow-xl transition-all active:scale-95">
          <Download size={16} /> Export Financials
        </button>
      </div>

      {/* TOP TIER STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RevenueCard 
          label="Total GMV" 
          value="$4.2M" 
          sub="Gross Merchandise Volume" 
          trend="+12.4%" 
          up 
        />
        <RevenueCard 
          label="Platform Revenue" 
          value="$630k" 
          sub="15% Average Commission" 
          trend="+8.2%" 
          up 
        />
        <RevenueCard 
          label="Active Subs" 
          value="842" 
          sub="Seller Pro Plans" 
          trend="-2.1%" 
          up={false} 
        />
      </div>

      {/* GROWTH CHART & DISTRIBUTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* VOLUME CHART */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-[3rem] p-10 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h3 className="text-xl font-black tracking-tight">Growth Velocity</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Order volume vs previous month</p>
            </div>
            <div className="flex gap-2">
               <div className="flex items-center gap-2 text-[10px] font-black uppercase"><span className="w-2 h-2 rounded-full bg-indigo-600"></span> Digital</div>
               <div className="flex items-center gap-2 text-[10px] font-black uppercase"><span className="w-2 h-2 rounded-full bg-gray-200"></span> Physical</div>
            </div>
          </div>
          
          {/* MOCK CHART BARS */}
          <div className="h-64 w-full flex items-end gap-3 px-4">
            {[30, 45, 60, 40, 70, 85, 100, 75, 90, 65, 80, 95].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col gap-1 items-center group relative">
                <div className="absolute -top-8 bg-gray-900 text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  ${h}k
                </div>
                <motion.div 
                  initial={{ height: 0 }} 
                  animate={{ height: `${h}%` }} 
                  transition={{ delay: i * 0.05 }}
                  className="w-full bg-indigo-600 rounded-t-md"
                />
                <motion.div 
                  initial={{ height: 0 }} 
                  animate={{ height: `${h * 0.6}%` }} 
                  transition={{ delay: i * 0.05 + 0.2 }}
                  className="w-full bg-gray-100 rounded-t-md"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 text-[10px] font-black text-gray-300 uppercase tracking-widest border-t pt-4">
            <span>Jan</span><span>Mar</span><span>Jun</span><span>Sep</span><span>Dec</span>
          </div>
        </div>

        {/* PIE / RADIAL DATA */}
        <div className="bg-gray-900 text-white rounded-[3rem] p-10 flex flex-col justify-between shadow-2xl">
          <header>
             <h3 className="text-xl font-black tracking-tight">Market Split</h3>
             <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">Niche Distribution</p>
          </header>

          <div className="space-y-8 py-10">
            <MetricLine label="Home & Living" percent={45} color="bg-indigo-500" icon={<Globe size={14}/>}/>
            <MetricLine label="UI Kits & Code" percent={30} color="bg-purple-500" icon={<Zap size={14}/>}/>
            <MetricLine label="Fashion" percent={15} color="bg-emerald-500" icon={<Activity size={14}/>}/>
            <MetricLine label="Other" percent={10} color="bg-gray-600" icon={<BarChart size={14}/>}/>
          </div>

          <div className="pt-6 border-t border-white/10">
            <div className="flex justify-between items-center text-[10px] font-black uppercase">
              <span className="text-white/40">Market Saturation</span>
              <span className="text-indigo-400">82% Capacity</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function RevenueCard({ label, value, sub, trend, up }: any) {
  return (
    <div className="bg-white border border-gray-100 p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all">
      <div className="flex justify-between items-start mb-6">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</p>
        <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${up ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
          {up ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
          {trend}
        </div>
      </div>
      <h4 className="text-5xl font-black tracking-tighter mb-2">{value}</h4>
      <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{sub}</p>
    </div>
  );
}

function MetricLine({ label, percent, color, icon }: any) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-[10px] font-black uppercase">
        <span className="flex items-center gap-2 text-white/60">{icon} {label}</span>
        <span>{percent}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: `${percent}%` }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );
}