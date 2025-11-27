import { useState } from "react";
import axios from "axios";
import { api } from "@/lib/api";

export const useResendOtp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const resendOtp = async (email: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/auth/resend-otp", { email });

      setSuccess(true);
      setMessage(response.data.message);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to resend OTP");
      } else {
        setError("Failed to resend OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  return { resendOtp, loading, error, success, message };
};
