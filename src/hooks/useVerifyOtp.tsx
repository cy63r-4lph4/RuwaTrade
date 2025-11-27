import { useState } from "react";
import axios from "axios";
import { api, authApi } from "@/lib/api";

export const useVerifyOtp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState<any>(null);

  const verifyOtp = async ({
    email,
    otp_code,
  }: {
    email: string;
    otp_code: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post(authApi("/verify-otp"), {
        email,
        otp_code,
      });

      setSuccess(true);
      setData(response.data);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Invalid OTP");
      } else {
        setError("Verification failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return { verifyOtp, loading, error, success, data };
};
