import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaSearch, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false); // <--- Using FaBars / FaTimes logic
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => {
        window.removeEventListener("scroll", handleScroll);
        document.body.style.overflow = "unset"; // Cleanup body lock
    };
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenu) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [mobileMenu]);

  const isHome = location.pathname === "/";
  const navTheme = !scrolled && isHome 
    ? "text-white bg-transparent" 
    : "text-gray-900 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm";

  const navLinks = [
    { name: "Shop", path: "/shop" },
    { name: "eStore", path: "/estore" },
    { name: "Sellers", path: "/sellers" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navTheme}`}>
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-2 relative z-[60]">
          RuwaTrade<span className="text-indigo-500">.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-black uppercase tracking-widest hover:text-indigo-500 transition-colors ${
                location.pathname === link.path ? "text-indigo-500" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side Tools */}
        <div className="flex items-center gap-4 md:gap-6 relative z-[60]">
          <button className="hover:scale-110 transition-transform hidden sm:block">
            <FaSearch size={18} />
          </button>

          <Link to="/cart" className="relative hover:scale-110 transition-transform">
            <FaShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </Link>

          {/* User Auth - Desktop */}
          <div className="hidden md:block">
            {!isLoggedIn ? (
                <Link to="/signin" className="px-6 py-2 rounded-full text-sm font-black bg-gray-900 text-white hover:bg-indigo-600 transition-all">
                    SIGN IN
                </Link>
            ) : (
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="hover:scale-110 transition-transform">
                    <FaUserCircle size={24} />
                </button>
            )}
          </div>

          {/* Mobile Menu Toggle - Utilizing FaBars and FaTimes */}
          <button 
            className="md:hidden p-2 hover:bg-black/5 rounded-xl transition-colors"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-white z-[55] flex flex-col justify-center px-12 md:hidden"
            >
              <div className="space-y-8">
                {navLinks.map((link) => (
                  <motion.div key={link.name} whileTap={{ scale: 0.9 }}>
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenu(false)}
                      className="text-5xl font-black tracking-tighter text-gray-900 hover:text-indigo-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-8 border-t border-gray-100 flex flex-col gap-6">
                    <Link to="/signin" onClick={() => setMobileMenu(false)} className="text-xl font-black text-gray-400">Account</Link>
                    <Link to="/search" onClick={() => setMobileMenu(false)} className="text-xl font-black text-gray-400">Search</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}