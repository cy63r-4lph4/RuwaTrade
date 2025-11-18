// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Search, Filter, ShoppingCart, BookOpen } from "lucide-react";
// import { HeroSection } from "@/components/Hero";
// import { Link } from "react-router-dom";

// import { useEffect } from "react";
// import type { DisplayTemplate } from "@/components/Interfaces";
// import { addToCart, api, removeFromCart } from "@/lib/api";
// import CartDrawer from "@/components/CartDrawer";
// import toast from "react-hot-toast";
// import { useCart, useLibrary } from "@/hooks/global";
// import { LibraryModal } from "@/components/Library";
// import { CUSTOMER_KEY, GUEST_CART_KEY } from "@/components/constants";

// export function HomePage() {
//   const [search, setSearch] = useState("");
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   const { items: cart, isLoggedIn, addToGuestCart, fetchCart } = useCart();

//   const addItem = async (template: DisplayTemplate) => {
//     const alreadyInCart = cart.some((item) => item.id === template.id);

//     if (alreadyInCart) {
//       toast.error(`'${template.title}' is already in Cart`);
//       return;
//     }

//     try {
//       if (isLoggedIn) {
//         await addToCart(template.id);
//         await fetchCart();
//       } else {
//         addToGuestCart(template);
//       }

//       toast.success(`'${template.title}' has been added to Cart`);
//     } catch (err) {
//       toast.error("Failed to add to cart");
//     }
//   };

//   const [templates, setTemplates] = useState<DisplayTemplate[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isLibraryOpen, setIsLibraryOpen] = useState(false);
//   const [removingId, setRemovingId] = useState<number | null>(null);
//   const { templates: libraryTemplate } = useLibrary();

//   const isInCart = (id: number) => cart.some((item) => item.id === id);
//   const isInLibrary = (id: number) =>
//     libraryTemplate.some((item) => item.id === id);

//   useEffect(() => {
//     api
//       .get("/templates")
//       .then((res) => {
//         setTemplates(res.data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Failed to load templates");
//         setLoading(false);
//       });
//   }, []);

//   const filteredTemplates = templates.filter((t) =>
//     t.title.toLowerCase().includes(search.toLowerCase())
//   );

//   const removeItem = async (id: number) => {
//     setRemovingId(id);

//     try {
//       const token = localStorage.getItem(CUSTOMER_KEY);

//       if (!token) {
//         const current = JSON.parse(
//           localStorage.getItem(GUEST_CART_KEY) || "[]"
//         );
//         const updated = current.filter(
//           (item: DisplayTemplate) => item.id !== id
//         );
//         localStorage.setItem(GUEST_CART_KEY, JSON.stringify(updated));
//         fetchCart?.();

//         toast.success("Item removed from cart (guest)");
//         return;
//       }

//       await removeFromCart(id);
//       await fetchCart();
//       toast.success("Item removed from cart");
//     } catch (err) {
//       toast.error("Failed to remove item");
//     } finally {
//       setRemovingId(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center space-y-8 bg-gradient-to-b from-white via-blue-50 to-indigo-50">
//         <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
//         <p className="text-indigo-700 font-medium">Loading templates…</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <HeroSection />

//         <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-gradient-to-b from-white via-blue-50 to-indigo-50">
//           <img
//             src="/images/cancel.svg"
//             alt="error"
//             className="w-40 h-40 opacity-70"
//           />
//           <p className="text-red-600 font-semibold">{error}</p>
//         </div>
//       </>
//     );
//   }
//   const hasTemplates = templates.length > 0;

//   return (
//     <div className="bg-gradient-to-b from-white via-blue-50 to-indigo-50 min-h-screen pb-24">
//       {/* ▸ Compact hero if we already have templates */}
//       <HeroSection compact={hasTemplates} />

//       {/* Empty‑state if no templates at all */}
//       {!hasTemplates && (
//         <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
//           <img
//             src="/images/void.svg"
//             alt="No templates"
//             className="w-40 h-40 opacity-80"
//           />
//           <h2 className="text-3xl font-semibold text-indigo-800">
//             No templates yet
//           </h2>
//           <p className="max-w-sm text-gray-600">
//             We're working hard to bring you premium content. Check back soon or
//             subscribe for updates!
//           </p>
//         </div>
//       )}
//       {hasTemplates && (
//         <>
//           {/* Search & Filters */}
//           <div className="max-w-7xl mx-auto px-6 py-12">
//             <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//               <h2 className="text-4xl font-bold text-indigo-900 text-center md:text-left">
//                 Premium Templates for Any Project
//               </h2>

//               <div className="flex w-full md:max-w-xl items-center space-x-3">
//                 <div className="relative flex-1">
//                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <Input
//                     className="pl-11 pr-4 py-2.5 text-sm rounded-full border-gray-300 shadow focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Search templates..."
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                   />
//                 </div>
//                 <Button
//                   variant="outline"
//                   className="rounded-full px-4 py-2 flex items-center"
//                 >
//                   <Filter className="w-4 h-4 mr-2" />
//                   Filter
//                 </Button>
//               </div>
//               {isLoggedIn && (
//                 <div className="flex items-center gap-3">
//                   <Button
//                     onClick={() => setIsLibraryOpen(true)}
//                     className={`flex items-center gap-2 border px-4 py-2 rounded-full ${
//                       libraryTemplate.length > 0
//                         ? "border-indigo-600 text-indigo-700 bg-indigo-50 hover:bg-white hover:text-purple-500"
//                         : "border-gray-300 text-gray-700"
//                     }`}
//                   >
//                     <BookOpen className="w-4 h-4" />
//                     Library
//                     {libraryTemplate.length > 0 && (
//                       <span className="ml-2 text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">
//                         {libraryTemplate.length}
//                       </span>
//                     )}
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Template Grid */}
//           {filteredTemplates.length === 0 ? (
//             <p className="text-center text-gray-500 mt-20">
//               No templates match&nbsp;
//               <span className="font-semibold">&ldquo;{search}&rdquo;</span>
//             </p>
//           ) : (
//             <div className="max-w-8xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6">
//               {filteredTemplates.map((template) => {
//                 const inLibrary = isInLibrary(template.id);
//                 const inCart = isInCart(template.id);
//                 const disabled = inCart || inLibrary;
//                 return (
//                   <motion.div
//                     key={template.id}
//                     whileHover={{
//                       y: -4,
//                       boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
//                     }}
//                     transition={{ type: "spring", stiffness: 260, damping: 20 }}
//                     className="bg-white rounded-3xl overflow-hidden border border-gray-100"
//                   >
//                     <Link to={`/template/${template.id}`} className="block">
//                       <div className="relative">
//                         <img
//                           src={template.thumbnail}
//                           alt={template.title}
//                           className="w-full h-52 object-cover"
//                         />
//                         <span className="absolute top-3 left-3 backdrop-blur-md bg-indigo-600/80 text-white text-xs px-3 py-1 rounded-full font-medium shadow">
//                           {template.category}
//                         </span>
//                       </div>
//                       <div className="p-5 space-y-1">
//                         <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
//                           {template.title}
//                         </h3>
//                         <p className="text-sm text-gray-500">
//                           Price:{" "}
//                           <span className="font-bold text-indigo-600">
//                             GH₵ {template.price}
//                           </span>
//                         </p>
//                       </div>
//                     </Link>
//                     <div className="px-5 pb-5">
//                       <Button
//                         disabled={disabled}
//                         onClick={() => !disabled && addItem(template)}
//                         className={`w-full rounded-full font-medium ${
//                           disabled
//                             ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                             : "bg-indigo-600 hover:bg-indigo-700 text-white"
//                         }`}
//                       >
//                         {inCart
//                           ? "In Cart"
//                           : inLibrary
//                           ? "In Library"
//                           : "Add to Cart"}
//                       </Button>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           )}
//         </>
//       )}

//       {/* Floating Cart */}
//       {cart.length > 0 && (
//         <Button
//           onClick={() => setIsCartOpen(true)}
//           className="fixed bottom-6 right-6 z-50 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-4 rounded-full shadow-lg flex items-center gap-3"
//         >
//           <ShoppingCart className="w-6 h-6" />
//           <span className="bg-white text-indigo-700 font-bold text-sm rounded-full px-2.5 py-0.5">
//             {cart.length}
//           </span>
//         </Button>
//       )}

//       {/* Backdrop */}
//       {isCartOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40"
//           onClick={() => setIsCartOpen(false)}
//         />
//       )}

//       {/* Slide-in Cart Drawer */}
//       <CartDrawer
//         cart={cart}
//         handleRemove={removeItem}
//         removingId={removingId}
//         isCartOpen={isCartOpen}
//         setIsCartOpen={setIsCartOpen}
//       />

//       <LibraryModal
//         isOpen={isLibraryOpen}
//         onClose={() => setIsLibraryOpen(false)}
//       />
//     </div>
//   );
// }
