import { NavLink, Outlet, Link } from "react-router-dom";
import { LayoutDashboard, Layers, BarChart3, Settings, ShieldCheck, LogOut } from "lucide-react";

export function AdminDashboard() {
  const adminNav = [
    { name: "Pulse", path: "dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Templates", path: "templates", icon: <Layers size={20} /> },
    { name: "Analytics", path: "analytics", icon: <BarChart3 size={20} /> },
    { name: "Settings", path: "settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* ADMIN SIDEBAR */}
      <aside className="w-full md:w-72 bg-white border-r border-gray-100 p-8 flex flex-col sticky top-0 h-screen">
        <div className="mb-12 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <ShieldCheck size={20} />
          </div>
          <h1 className="text-xl font-black tracking-tighter">HQ<span className="text-gray-300">.</span></h1>
        </div>

        <nav className="flex-1 space-y-2">
          {adminNav.map((item) => (
            <NavLink
              key={item.path}
              to={`/admin/${item.path}`}
              className={({ isActive }) => `
                flex items-center gap-4 px-5 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all
                ${isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"}
              `}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        <button className="flex items-center gap-4 px-5 py-4 text-red-500 font-black text-[10px] uppercase tracking-widest mt-auto hover:bg-red-50 rounded-2xl transition-all">
          <LogOut size={20} /> Sign Out
        </button>
      </aside>

      {/* ADMIN CONTENT AREA */}
      <main className="flex-1 p-8 md:p-12 h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}