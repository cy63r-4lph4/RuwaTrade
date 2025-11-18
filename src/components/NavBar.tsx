import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaUserCircle } from "react-icons/fa";
import { useState } from "react";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            RuwaTrade
          </Link>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6 font-medium">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
          <Link to="/shop" className="text-gray-700 hover:text-indigo-600">Shop</Link>
          <Link to="/estore" className="text-gray-700 hover:text-indigo-600">eStore</Link>
          <Link to="/about" className="text-gray-700 hover:text-indigo-600">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-indigo-600">Contact</Link>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4 relative">
          {/* Search */}
          <button className="text-gray-600 hover:text-indigo-600">
            <FaSearch size={18} />
          </button>

          {/* Cart */}
          <Link to="/cart" className="relative text-gray-600 hover:text-indigo-600">
            <FaShoppingCart size={20} />
            {/* Example cart count */}
            {/* <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">2</span> */}
          </Link>

          {/* User Section */}
          {!isLoggedIn ? (
            <Link
              to="/signin"
              className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
            >
              Sign In
            </Link>
          ) : (
            <div className="relative">
              <button
                className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaUserCircle size={22} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={() => setIsLoggedIn(false)}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
