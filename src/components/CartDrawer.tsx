// import { FiShoppingCart, FiTrash, FiX } from "react-icons/fi";
// import type { CartDrawerProps } from "./Interfaces";
// import { motion } from "framer-motion";
// import { CheckoutButton } from "./ChekoutButton";
// import toast from "react-hot-toast";
// import { api } from "@/lib/api";

// const CartDrawer: React.FC<CartDrawerProps> = ({
//   isCartOpen,
//   setIsCartOpen,
//   cart,
//   removingId,
//   handleRemove,
// }) => {
//   return (
//     <motion.div
//       initial={{ x: "100%" }}
//       animate={{ x: isCartOpen ? 0 : "100%" }}
//       transition={{ type: "spring", stiffness: 300, damping: 30 }}
//       className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 p-6 overflow-y-auto shadow-2xl rounded-l-2xl"
//     >
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-2 text-indigo-700">
//           <FiShoppingCart size={28} />
//           <h3 className="text-2xl font-bold">Your Cart</h3>
//         </div>
//         <button
//           onClick={() => setIsCartOpen(false)}
//           className="text-gray-400 hover:text-gray-600 transition-colors"
//         >
//           <FiX size={28} />
//         </button>
//       </div>
//       {cart.length > 0 ? (
//         <>
//           <ul className="space-y-5">
//             {cart.map((item) => (
//               <li
//                 key={item.id}
//                 className="flex items-center justify-between border-b pb-4"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
//                     {item.thumbnail ? (
//                       <img
//                         src={item.thumbnail}
//                         alt={item.title}
//                         className="w-full h-full object-cover rounded-lg"
//                       />
//                     ) : (
//                       <FiShoppingCart size={20} />
//                     )}
//                   </div>
//                   <div className="text-sm">
//                     <p className="font-medium text-gray-800">{item.title}</p>
//                     <button
//                       onClick={() => handleRemove(item.id)}
//                       disabled={removingId === item.id}
//                       className={`flex items-center gap-1 text-xs mt-1 ${
//                         removingId === item.id
//                           ? "text-gray-400 cursor-not-allowed"
//                           : "text-red-500 hover:underline"
//                       }`}
//                     >
//                       {removingId === item.id ? (
//                         <span className="w-3 h-3 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
//                       ) : (
//                         <>
//                           <FiTrash size={12} /> Remove
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//                 <span className="font-semibold text-gray-800">
//                   GH₵ {item.price}
//                 </span>
//               </li>
//             ))}
//           </ul>

//           <div className="flex justify-between font-semibold text-lg mt-6 border-t pt-4 text-gray-900">
//             <span>Total</span>
//             <span>
//               GH₵ 
//               {cart
//                 .reduce((total, item) => total + Number(item.price), 0)
//                 .toFixed(2)}
//             </span>
//           </div>

//           <CheckoutButton
//             amount={cart.reduce((t, i) => t + Number(i.price), 0)}
//             currency="GHS"
//             onSuccess={async (reference) => {
//               try {
//                 const response = await api.get(`/paystack/verify/${reference}`);
//                 if (response.data.status === true) {
//                   toast.success("Payment Verified");
//                 } else {
//                   toast.error("Verification failed");
//                 }
//               } catch (err) {
//                 console.error(err);
//                 toast.error("Something went wrong verifying payment");
//               }
//             }}
//           />
//         </>
//       ) : (
//         <div className="flex flex-col items-center justify-center mt-20 text-center text-gray-500">
//           <FiShoppingCart size={64} className="mb-4 text-indigo-400" />
//           <h4 className="text-xl font-semibold text-gray-700 mb-2">
//             Your cart is empty
//           </h4>
//           <p className="mb-4">
//             Looks like you haven't added anything to your cart yet.
//           </p>
//           <button
//             onClick={() => setIsCartOpen(false)}
//             className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
//           >
//             Browse Products
//           </button>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default CartDrawer;
