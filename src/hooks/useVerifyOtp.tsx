import { useState } from "react";
import axios from "axios";
import { api, authApi } from "@/lib/api";

type VerifyOtpPayload = {
  email: string;
  otp_code: string;
  type?: "email_verification" | "password_reset";
};

export const useVerifyOtp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const verifyOtp = async ({
    email,
    otp_code,
    type = "email_verification",
  }: VerifyOtpPayload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.post(authApi("/verify-otp"), {
        email,
        otp: otp_code,
        type, // 🔥 future-proof
      });

      if (response.data.status === "success") {
        setSuccess(true);

        // Token is optional (depends on OTP type)
        if (response.data.token) {
          localStorage.setItem("TOKEN_KEY", response.data.token);
        }
      } else {
        setError(response.data.message || "Invalid OTP");
      }

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

  return { verifyOtp, loading, error, success };
};
