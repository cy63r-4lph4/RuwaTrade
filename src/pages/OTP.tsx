import { useState, useEffect, useRef } from "react";
import { FaShieldAlt } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <FaShieldAlt className="mx-auto text-indigo-600 text-4xl mb-3" />
          <h2 className="text-3xl font-bold text-indigo-600">Verify OTP</h2>
          <p className="text-gray-500 mt-2">
            Enter the code sent to <span className="font-medium">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2">
            {otp.map((digit, i) => (
              <input
                ref={i === 0 ? firstInputRef : undefined}
                key={i}
                id={`otp-${i}`}
                maxLength={1}
                inputMode="numeric"
                className="w-12 h-12 text-center border rounded-lg text-lg font-semibold focus:ring-2 focus:ring-indigo-600 outline-none"
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                onPaste={(e) => handlePaste(e, i)}
              />
            ))}
          </div>

          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          Didn’t receive code?{" "}
          <button
            onClick={handleResend}
            disabled={cooldown > 0 || resendLoading}
            className="text-indigo-600 hover:underline disabled:opacity-50"
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
