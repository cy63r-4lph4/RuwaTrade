import { useState, useEffect } from "react";
import { FaShieldAlt } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useVerifyOtp } from "@/hooks/useVerifyOtp";
import { useResendOtp } from "@/hooks/useResendOtp";

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

  const email = params.get("email") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // resend cooldown
  const [cooldown, setCooldown] = useState(0);

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
      const next = document.getElementById(`otp-${index + 1}`);
      (next as HTMLInputElement)?.focus();
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    startIndex: number
  ) => {
    e.preventDefault();

    const raw = e.clipboardData.getData("text");
    const digits = raw.replace(/\D/g, "").split("");
    if (digits.length === 0) return;

    const updated = [...otp];

    // full OTP
    if (digits.length >= 6) {
      digits.slice(0, 6).forEach((d, i) => {
        updated[i] = d;
      });

      setOtp(updated);
      const last = document.getElementById("otp-5");
      (last as HTMLInputElement)?.focus();
      return;
    }

    // partial OTP
    let idx = startIndex;
    digits.forEach((d) => {
      if (idx < 6) {
        updated[idx] = d;
        idx++;
      }
    });

    setOtp(updated);

    const next = document.getElementById(`otp-${Math.min(idx, 5)}`);
    (next as HTMLInputElement)?.focus();
  };

  // ------------------------------------------------------------
  // Submit Logic
  // ------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("Enter all 6 digits, champ.");
      return;
    }

    const result = await verifyOtp({ email, otp_code: code });

    if (result?.status === "success") {
      toast.success("OTP verified — you're in. 🚀");
      // handle redirect
      // navigate("/dashboard");
    }
  };

  // ------------------------------------------------------------
  // Resend Logic
  // ------------------------------------------------------------
  const handleResend = async () => {
    if (cooldown > 0) return;

    const result = await resendOtp(email);

    if (result?.status === "success") {
      toast.success("A fresh OTP is flying to your inbox.");
      setCooldown(120);
    }
    else{
        toast.error(result?.message || "Failed to resend OTP");
    }
  };

  // ------------------------------------------------------------
  // Toast error watchers
  // ------------------------------------------------------------
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (resendError) toast.error(resendError);
  }, [resendError]);

  // ------------------------------------------------------------
  // UI
  // ------------------------------------------------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Heading */}
        <div className="text-center">
          <FaShieldAlt className="mx-auto text-indigo-600 text-4xl mb-3" />
          <h2 className="text-3xl font-bold text-indigo-600">Verify OTP</h2>
          <p className="text-gray-500 mt-2">
            Enter the code we sent to{" "}
            <span className="font-medium">{email}</span>
          </p>
        </div>

        {/* OTP Fields */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2">
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-12 h-12 text-center border rounded-lg text-lg font-semibold focus:ring-2 focus:ring-indigo-600 outline-none"
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                onPaste={(e) => handlePaste(e, i)}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          Didn’t receive code?{" "}
          <button
            className={`text-indigo-600 hover:underline ${
              cooldown > 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleResend}
            disabled={cooldown > 0 || resendLoading}
          >
            {resendLoading
              ? "Sending..."
              : cooldown > 0
              ? `Wait ${cooldown}s`
              : "Resend"}
          </button>
        </div>
      </div>
    </div>
  );
}
