import { NavLink, Outlet, Link } from "react-router-dom";
import { 
  BarChart3, Box, PlusCircle, Settings, 
  MessageSquare, Eye, LogOut, ChevronRight 
} from "lucide-react";

export function SellerLayout() {
  const menuItems = [
    { name: "Insights", path: "insights", icon: <BarChart3 size={20} /> },
    { name: "Inventory", path: "inventory", icon: <Box size={20} /> },
    { name: "Upload Product", path: "upload", icon: <PlusCircle size={20} /> },
    { name: "Settings", path: "settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col md:flex-row">
      {/* SIDEBAR */}
      <aside className="w-full md:w-80 bg-white border-r border-gray-100 p-8 flex flex-col sticky top-0 h-screen">
        <div className="mb-12">
          <Link to="/" className="text-2xl font-black tracking-tighter">RUWA<span className="text-indigo-600">TRADE</span></Link>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">Studio Partner</p>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={`/dashboard/${item.path}`}
              className={({ isActive }) => `
                flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all
                ${isActive ? "bg-gray-900 text-white shadow-xl" : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"}
              `}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="pt-8 border-t border-gray-100 space-y-4">
          <Link to="/s/artem-studio" className="flex items-center justify-between p-4 bg-indigo-50 rounded-2xl group">
             <div className="flex items-center gap-3">
               <Eye size={18} className="text-indigo-600"/>
               <span className="text-[10px] font-black uppercase tracking-widest text-indigo-900">View Store</span>
             </div>
             <ChevronRight size={14} className="text-indigo-400 group-hover:translate-x-1 transition-transform"/>
          </Link>
          <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN STAGE */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}