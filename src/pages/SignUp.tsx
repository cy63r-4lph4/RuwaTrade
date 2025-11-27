import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useState } from "react";
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
  if (success) {
    toast.success("Account created successfully! Please sign in.");
    navigate(`/verify-otp?email=${form.email}`);
  }

  if (error) {
    toast.error(
      typeof error === "string" ? error : "Signup failed. Please try again."
    );
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const formatFullName = (name: string): string => {
    return name
      .split(" ")
      .map((word) =>
        word
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join("-")
      )
      .join(" ");
  };
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
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const passwordsMatch = password === confirmPassword;
    const isNameValid = fullName.trim().length > 0;
    const isEmailValid = isValidEmail(email);

    if (!isNameValid) toast.error("Full name is required");
    else if (!isEmailValid) toast.error("Please enter a valid email address");
    else if (!passwordsMatch) toast.error("Passwords do not match");
    else if (password.length < minLength)
      toast.error("Password must be at least 8 characters");
    else if (!hasUpperCase)
      toast.error("Password must include an uppercase letter");
    else if (!hasLowerCase)
      toast.error("Password must include a lowercase letter");
    else if (!hasNumber) toast.error("Password must include a number");
    else if (!hasSpecialChar)
      toast.error("Password must include a special character");

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar &&
      passwordsMatch &&
      isNameValid
    );
  };

  interface SignUpPayload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!validate()) return;

    const formattedName = formatFullName(form.fullName);

    try {
      await signup({
        name: formattedName,
        email: form.email,
        password: form.password,
        password_confirmation: form.confirmPassword,
        role: form.role,
      } as SignUpPayload);
    } catch (err: unknown) {
      console.log(err);
      toast.error(
        (err as { message?: string })?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-indigo-600">Create Account</h2>
          <p className="text-gray-500 mt-2">
            Join RuwaTrade and start shopping
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              className="w-full outline-none border-none text-gray-700"
              value={form.fullName}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full outline-none border-none text-gray-700"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full outline-none border-none text-gray-700"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* Confirm Password */}
          <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              className="w-full outline-none border-none text-gray-700"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link to="/signin" className="text-indigo-600 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
