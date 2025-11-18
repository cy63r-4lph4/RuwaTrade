import axios from "axios";
import { useState } from "react";

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const signUp = async (
    email: string,
    password: string,
    password_confirmation: string,
    name: string,
    role = "customer"
  ) => {
    if (password !== password_confirmation) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/auth/register", {
        email,
        password,
        name,
        role,
      });

      setSuccess(true);
      setLoading(false);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, signUp };
};
