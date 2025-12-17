import { api } from "@/lib/api";
import axios from "axios";
import { useState } from "react";

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const signup = async ({
    email,
    password,
    password_confirmation,
    name,
    role = "customer",
  }: {
    email: string;
    password: string;
    password_confirmation: string;
    name: string;
    role?: string;
  }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { data } = await api.post("/register", {
        email,
        password,
        password_confirmation,
        name,
        role,
      });

      if (data.otp_status !== "success") {
        setError(data.otp_message || "Failed to send OTP");
        return data;
      }

      setSuccess(true);
      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || err.response?.data || "Signup failed"
        );
      } else {
        setError("Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error, success };
};
