import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSignUp } from "@/hooks/useSignUp";
import toast from "react-hot-toast";

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
  // UI (unchanged)
  // ------------------------------------------------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      {/* UI unchanged */}
    </div>
  );
}
