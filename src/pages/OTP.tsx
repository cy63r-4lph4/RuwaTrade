import { useState, useEffect, useRef } from "react";
import { FaShieldAlt } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useVerifyOtp } from "@/hooks/useVerifyOtp";
import { useResendOtp } from "@/hooks/useResendOtp";
import { motion } from "framer-motion";

export function OtpVerification() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const { verifyOtp, loading, error, success } = useVerifyOtp();
  const {
    resendOtp,
    loading: resendLoading,
    error: resendError,
    success: resendSuccess,
  } = useResendOtp();

  const email = params.get("email");
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [cooldown, setCooldown] = useState(0);

  // ------------------------------------------------------------
  // Guards
  // ------------------------------------------------------------
  useEffect(() => {
    if (!email) {
      toast.error("Invalid verification link.");
      navigate("/register");
    }
  }, [email]);

  // Autofocus
  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  // ------------------------------------------------------------
  // OTP Input Logic
  // ------------------------------------------------------------
  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    startIndex: number
  ) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").split("");
    if (!digits.length) return;

    const updated = [...otp];
    digits.slice(0, 6 - startIndex).forEach((d, i) => {
      updated[startIndex + i] = d;
    });

    setOtp(updated);
    document.getElementById(`otp-${Math.min(startIndex + digits.length, 5)}`)?.focus();
  };

  // ------------------------------------------------------------
  // Submit
  // ------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("Enter all 6 digits.");
      return;
    }

    await verifyOtp({
      email: email!,
      otp_code: code,
      type: "email_verification",
    });
  };

  // ------------------------------------------------------------
  // Resend
  // ------------------------------------------------------------
  const handleResend = async () => {
    if (cooldown > 0 || !email) return;

    const result = await resendOtp(email);
    if (result?.status === "success") {
      setCooldown(120);
    }
  };

  // ------------------------------------------------------------
  // Watchers
  // ------------------------------------------------------------
  useEffect(() => {
    if (error) toast.error(error);
    if (success) {
      toast.success("OTP verified successfully!");
      navigate("/dashboard");
    }
  }, [error, success]);

  useEffect(() => {
    if (resendError) toast.error(resendError);
    if (resendSuccess) toast.success("OTP resent!");
  }, [resendError, resendSuccess]);

  // ------------------------------------------------------------
  // UI
  // ------------------------------------------------------------
return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg text-center space-y-10"
      >
        <div className="space-y-4">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto">
                <FaShieldAlt size={32} />
            </div>
            <h1 className="text-5xl font-black tracking-tighter">Security Check<span className="text-indigo-600">.</span></h1>
            <p className="text-gray-500 font-bold max-w-xs mx-auto">
              We've sent a 6-digit code to <br /><span className="text-gray-900">{email}</span>
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-center gap-3">
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                maxLength={1}
                className="w-14 h-18 text-center border-2 border-gray-100 rounded-2xl text-3xl font-black focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
              />
            ))}
          </div>

          <button
            disabled={loading}
            className="w-full max-w-sm bg-gray-900 text-white py-6 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-indigo-600 transition-all shadow-2xl shadow-gray-200"
          >
            {loading ? "VERIFYING..." : "CONFIRM ACCESS"}
          </button>
        </form>

        <div className="pt-10 border-t border-gray-50">
           <p className="text-sm font-bold text-gray-400">
             Didn't get it? 
             <button onClick={handleResend} className="ml-2 text-indigo-600 font-black uppercase tracking-tighter hover:underline">
               Resend Code
             </button>
           </p>
        </div>
      </motion.div>
    </div>
  );
}