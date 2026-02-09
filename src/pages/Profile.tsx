import { NavLink, Outlet } from "react-router-dom";
import { User, Package, Zap, Heart, Settings, LogOut } from "lucide-react";

export function ProfileLayout() {
  const navItems = [
    { name: "Overview", path: "overview", icon: <User size={18} /> },
    { name: "Order History", path: "orders", icon: <Package size={18} /> },
    { name: "Digital Library", path: "library", icon: <Zap size={18} /> },
    { name: "Favorites", path: "favorites", icon: <Heart size={18} /> },
    { name: "Settings", path: "settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* SIDEBAR */}
          <aside className="w-full lg:w-64 space-y-8">
            <div className="px-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-2">Account</p>
              <h1 className="text-3xl font-black tracking-tighter">My Studio<span className="text-gray-300">.</span></h1>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={`/profile/${item.path}`}
                  className={({ isActive }) => `
                    flex items-center gap-4 px-4 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all
                    ${isActive 
                      ? "bg-gray-900 text-white shadow-xl shadow-gray-200" 
                      : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"}
                  `}
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              ))}
              <button className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all mt-10">
                <LogOut size={18} /> Logout
              </button>
            </nav>
          </aside>

          {/* DYNAMIC CONTENT */}
          <main className="flex-1 bg-gray-50/50 border border-gray-100 rounded-[3rem] p-8 md:p-12">
             <Outlet /> {/* This is where child routes render */}
          </main>

        </div>
      </div>
    </div>
  );
}