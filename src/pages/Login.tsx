import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  interface LoginResponse {
    token: string;
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post<LoginResponse>("admin/login", {
        email,
        password,
      });

      login(response.data.token);
      navigate("/admin");
    } catch (err: any) {
      if (err.response) {
        const backendMessage =
          err.response.data.message || "Login failed. Please try again.";
        setError(backendMessage);
      } else if (err.request) {
        setError("Server not responding. Check your connection.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center text-white relative overflow-hidden">
      {/* Noise Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Floating Lights */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-300"></div>

      <form
        onSubmit={handleLogin}
        className="z-10 backdrop-blur-md bg-white/5 border border-white/10 p-10 rounded-xl shadow-xl w-full max-w-md space-y-6"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold">Admin Portal</h2>
          <p className="text-sm text-gray-300 mt-2">Welcome back, Commander.</p>
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded-md bg-white/10 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="admin@ruwatrade.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 rounded-md bg-white/10 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="text-right text-sm">
          <a href="#" className="text-cyan-400 hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-md transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
