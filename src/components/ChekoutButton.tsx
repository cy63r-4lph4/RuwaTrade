// // import { PaystackButton } from "react-paystack";
// import { PUBLIC_KEY } from "./constants";
// import toast from "react-hot-toast";
// import { useState, useEffect } from "react";
// import { LoginModal } from "./LoginModal";

// export function CheckoutButton({
//   amount,
//   currency,
//   onSuccess,
// }: {
//   amount: number;
//   currency: string;
//   onSuccess: (reference: string) => void;
// }) {
//   const [showLogin, setShowLogin] = useState(false);
//   const [email, setEmail] = useState<string | null>(null);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const storedEmail = localStorage.getItem("email");
//     if (token && storedEmail) {
//       setEmail(storedEmail);
//     }
//   }, [token]);

//   if (!token || !email) {
//     return (
//       <>
//         <button
//           onClick={() => setShowLogin(true)}
//           className="mt-6 w-full py-3 text-lg rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md hover:shadow-lg"
//         >
//           Proceed to Checkout
//         </button>

//         {showLogin && (
//           <LoginModal
//             onClose={() => setShowLogin(false)}
//             onSuccess={(userEmail: string) => {
//               toast.success("Logged in successfully!");
//               setEmail(userEmail);
//               setShowLogin(false);
//             }}
//           />
//         )}
//       </>
//     );
//   }

//   const componentProps = {
//     email,
//     amount: amount * 100,
//     publicKey: PUBLIC_KEY,
//     currency,
//     text: "Proceed to Checkout",
//     metadata: {
//       custom_fields: [
//         {
//           display_name: "Customer Email",
//           variable_name: "customer_email",
//           value: email,
//         },
//       ],
//     },
//     onSuccess: (response: any) => {
//       toast.success("Payment Successful");
//       onSuccess(response.reference);
//     },
//     onClose: () => toast.error("Payment Closed!"),
//   };

//   return (
//     <PaystackButton
//       {...componentProps}
//       className="mt-6 w-full py-3 text-lg rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md hover:shadow-lg"
//     />
//   );
// }
