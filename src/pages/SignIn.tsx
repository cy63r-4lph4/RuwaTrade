import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { api, authApi } from "@/lib/api";

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.post(authApi("/login"), { email, password });
      if (res.data.status === "success" && res.data.token) {
        localStorage.setItem("TOKEN_KEY", res.data.token);
        navigate("/");
      } else {
        setError(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      setError(axios.isAxiosError(err) ? err.response?.data?.message : "Something went wrong");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* LEFT SIDE: BRAND ENERGY (Desktop Only) */}
      <div className="hidden lg:flex bg-gray-900 p-16 flex-col justify-between text-white relative overflow-hidden">
        <div className="relative z-10">
          <Link to="/" className="text-3xl font-black tracking-tighter">RuwaTrade<span className="text-indigo-500">.</span></Link>
          <h2 className="text-7xl font-black tracking-tighter leading-tight mt-20">
            THE <br /><span className="text-indigo-500 italic">CURATED</span> <br />MARKET.
          </h2>
        </div>
        <div className="relative z-10 text-sm font-black uppercase tracking-[0.3em] opacity-40">
          © 2026 PREMIUM ASSETS & GOODS
        </div>
        {/* Decorative Blob */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full" />
      </div>

      {/* RIGHT SIDE: FORM */}
      <div className="flex items-center justify-center p-8 md:p-16">
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="w-full max-w-md space-y-12"
        >
          <div>
            <span className="text-indigo-600 font-black uppercase tracking-widest text-xs">Welcome Back</span>
            <h1 className="text-5xl font-black tracking-tighter mt-2">Sign In<span className="text-gray-200">.</span></h1>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</label>
              <div className="flex items-center border-b-2 border-gray-100 focus-within:border-indigo-600 transition-colors py-3">
                <FaEnvelope className="text-gray-300 mr-4" />
                <input
                  type="email"
                  className="w-full outline-none text-lg font-bold bg-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Password</label>
              <div className="flex items-center border-b-2 border-gray-100 focus-within:border-indigo-600 transition-colors py-3">
                <FaLock className="text-gray-300 mr-4" />
                <input
                  type="password"
                  className="w-full outline-none text-lg font-bold bg-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-xs font-black uppercase tracking-tighter">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all active:scale-95 shadow-2xl shadow-gray-200"
            >
              {loading ? "AUTHENTICATING..." : <>ENTER STUDIO <FaArrowRight /></>}
            </button>
          </form>

          <p className="text-center font-bold text-gray-500">
            New here? <Link to="/signup" className="text-indigo-600 font-black uppercase tracking-tighter border-b-2 border-indigo-600 ml-1">Create Account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}