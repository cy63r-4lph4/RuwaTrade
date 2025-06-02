import { BarChart3, FileText, LayoutDashboard, LogOut, Settings } from 'lucide-react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const links = [
  { name: 'Dashboard', path: 'dashboard', icon: LayoutDashboard },
  { name: 'Templates', path: 'templates', icon: FileText },
  { name: 'Analytics', path: 'analytics', icon: BarChart3 },
  { name: 'Settings', path: 'settings', icon: Settings }
];

export function AdminDashboard() {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6 hidden sm:block">
        <h1 className="text-2xl font-bold mb-10 text-indigo-600">RuwaAdmin</h1>
        <nav className="space-y-4">
          {links.map(({ name, path, icon: Icon }) => (
            <Link
              to={`/admin/${path}`}
              key={path}
              className={`flex items-center w-full px-4 py-2 rounded-lg text-left transition-all ${
                currentPath === path ? 'bg-indigo-100 text-indigo-600 font-semibold' : 'hover:bg-gray-100'
              }`}
            >
              <Icon className="mr-3" size={20} />
              {name}
            </Link>
          ))}
        </nav>
        <div className="mt-20">
          <button className="flex items-center text-red-500 hover:underline">
            <LogOut className="mr-2" size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold capitalize">{currentPath}</h2>
          <div className="rounded-full bg-white p-2 shadow-md">
            <img
              src="/images/admin-avatar.png"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
}
