import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import * as Dialog from "@radix-ui/react-dialog";

export function LoginModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: (email: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    setLoading(true);
    try {
      await api.post("/auth/send-otp", { email });
      setOtpSent(true);
      toast.success("OTP sent to your email");
    } catch {
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    console.log("Verifying OTP for email:", email, "with OTP:", otp);
    try {
      const response = await api.post("/auth/verify-otp", { email, otp });
      const { token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      onSuccess(email);
    } catch {
      toast.error("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl space-y-4">
          <Dialog.Title className="text-xl font-semibold text-gray-800">
            {otpSent ? "Enter OTP" : "Login with Email"}
          </Dialog.Title>

          {!otpSent ? (
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                onClick={sendOtp}
                disabled={loading || !email}
                className="w-full"
              >
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button
                onClick={verifyOtp}
                disabled={loading || otp.length !== 6}
                className="w-full"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </div>
          )}

          <Dialog.Close asChild>
            <button className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none">
              &times;
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
