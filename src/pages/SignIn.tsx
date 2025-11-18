import { Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

export function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-indigo-600">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Sign in to continue shopping</p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Email */}
          <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email address"
              className="w-full outline-none border-none text-gray-700"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none border-none text-gray-700"
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
