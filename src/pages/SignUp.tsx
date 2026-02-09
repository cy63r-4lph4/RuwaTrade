import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSignUp } from "@/hooks/useSignUp";
import toast from "react-hot-toast";
import { motion } from "framer-motion";


export function SignUp() {
  const navigate = useNavigate();
  const { signup, loading, error, success } = useSignUp();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });

  // ------------------------------------------------------------
  // Side effects (SUCCESS / ERROR)
  // ------------------------------------------------------------
  useEffect(() => {
    if (success) {
      toast.success("Account created! Verify your email to continue.");
      navigate(`/verify-otp?email=${encodeURIComponent(form.email)}`);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(
        typeof error === "string" ? error : "Signup failed. Please try again."
      );
    }
  }, [error]);

  // ------------------------------------------------------------
  // Handlers
  // ------------------------------------------------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const formatFullName = (name: string): string =>
    name
      .trim()
      .split(" ")
      .map((word) =>
        word
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join("-")
      )
      .join(" ");

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) return false;
    if (email.includes("..")) return false;

    const [local, domain] = email.split("@");
    if (local.startsWith(".") || local.endsWith(".")) return false;
    if (domain.startsWith("-") || domain.endsWith("-")) return false;

    return true;
  };

  const validate = () => {
    const { password, confirmPassword, fullName, email } = form;

    const checks = {
      name: fullName.trim().length > 0,
      email: isValidEmail(email),
      match: password === confirmPassword,
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    if (!checks.name) toast.error("Full name is required");
    else if (!checks.email) toast.error("Please enter a valid email address");
    else if (!checks.match) toast.error("Passwords do not match");
    else if (!checks.length)
      toast.error("Password must be at least 8 characters");
    else if (!checks.upper)
      toast.error("Password must include an uppercase letter");
    else if (!checks.lower)
      toast.error("Password must include a lowercase letter");
    else if (!checks.number) toast.error("Password must include a number");
    else if (!checks.special)
      toast.error("Password must include a special character");

    return Object.values(checks).every(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await signup({
      name: formatFullName(form.fullName),
      email: form.email.trim(),
      password: form.password,
      password_confirmation: form.confirmPassword,
      role: form.role,
    });
  };

  // ------------------------------------------------------------
  // UI
  // ------------------------------------------------------------
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* FORM SIDE */}
      <div className="flex items-center justify-center p-8 md:p-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="w-full max-w-md space-y-10"
        >
          <div>
            <span className="text-indigo-600 font-black uppercase tracking-widest text-xs">Join the Community</span>
            <h1 className="text-5xl font-black tracking-tighter mt-2">Sign Up<span className="text-gray-200">.</span></h1>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
             {/* Reusing a styled version of your Input component */}
             <div className="grid grid-cols-1 gap-5">
               <Input label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} placeholder="John Doe" />
               <Input label="Email Address" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
               <div className="grid grid-cols-2 gap-4">
                  <Input label="Password" type="password" name="password" value={form.password} onChange={handleChange} />
                  <Input label="Confirm" type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
               </div>
             </div>

             <button
                disabled={loading}
                className="w-full bg-gray-900 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all shadow-xl"
              >
                {loading ? "CREATING..." : <>CREATE ACCOUNT <FaArrowRight /></>}
              </button>
          </form>

          <p className="text-center font-bold text-gray-500">
            Already a member? <Link to="/signin" className="text-indigo-600 font-black uppercase tracking-tighter border-b-2 border-indigo-600 ml-1">Sign In</Link>
          </p>
        </motion.div>
      </div>

      {/* BRAND SIDE */}
      <div className="hidden lg:flex bg-indigo-600 p-16 flex-col justify-between text-white relative overflow-hidden">
         <div className="relative z-10">
          <Link to="/" className="text-3xl font-black tracking-tighter text-white">RuwaTrade<span className="text-gray-900">.</span></Link>
          <h2 className="text-7xl font-black tracking-tighter leading-tight mt-20">
            START <br /><span className="text-gray-900 italic">YOUR</span> <br />JOURNEY.
          </h2>
        </div>
        <div className="relative z-10 p-8 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20">
            <p className="text-xs font-black uppercase tracking-widest mb-4">Why RuwaTrade?</p>
            <ul className="space-y-3 text-sm font-bold opacity-80">
                <li className="flex items-center gap-2">✓ Verified Premium Sellers</li>
                <li className="flex items-center gap-2">✓ Instant Digital Delivery</li>
                <li className="flex items-center gap-2">✓ Global Shipping Network</li>
            </ul>
        </div>
      </div>
    </div>
  );
}

// Updated Styled Input Component
function Input({ label, ...props }: any) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</label>
      <input
        {...props}
        className="w-full border-b-2 border-gray-100 focus:border-indigo-600 outline-none text-lg font-bold bg-transparent py-3 transition-colors"
      />
    </div>
  );
}