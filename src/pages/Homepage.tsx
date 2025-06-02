import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, ShoppingCart } from "lucide-react";
import { HeroSection } from "@/components/Hero";
import { Link } from "react-router-dom";

type Template = {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
};

const sampleTemplates: Template[] = [
  {
    id: 1,
    title: "Modern HTML Template",
    category: "HTML",
    price: 10,
    thumbnail: "images/business-2.png",
  },
  {
    id: 2,
    title: "Professional Excel Sheet",
    category: "Excel",
    price: 5,
    thumbnail: "images/bbt.png",
  },
  {
    id: 3,
    title: "Creative PowerPoint Deck",
    category: "PPT",
    price: 8,
    thumbnail: "images/green.webp",
  },
  {
    id: 4,
    title: "Beautiful Educational Presentation",
    category: "PPT",
    price: 8,
    thumbnail: "images/edup.jpg",
  },
  {
    id: 5,
    title: "Learning Management System Template",
    category: "HTML",
    price: 8,
    thumbnail: "images/lms.jpg",
  },
  {
    id: 6,
    title: "Dashboard Template",
    category: "Excel",
    price: 8,
    thumbnail: "images/dbt.png",
  },
  {
    id: 7,
    title: "A Professional Resume Template",
    category: "MSWord",
    price: 8,
    thumbnail: "images/resume.jpg",
  },
  {
    id: 8,
    title: "Ultimate Sales Tracking Template",
    category: "Excel",
    price: 8,
    thumbnail: "images/ust.webp",
  },
];

export function HomePage() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Template[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredTemplates = sampleTemplates.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (template: Template) => {
    if (!cart.some((item) => item.id === template.id)) {
      setCart([...cart, template]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#f0f4ff] to-[#dbeafe] p-6 relative overflow-hidden">
      <HeroSection />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 mt-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center sm:text-left">
          Find the Perfect Template
        </h2>

        <div className="relative w-full sm:w-2/3 max-w-xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            className="pl-12 pr-5 py-3 text-base sm:text-lg rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all bg-white"
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Button className="rounded-full shadow-md px-6 py-3 text-lg">
          <Filter className="mr-2" /> Filter
        </Button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        {filteredTemplates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-3xl shadow-lg overflow-hidden transition-all"
          >
            <Link to={`/template/${template.id}`}>
              <img
                src={template.thumbnail}
                alt={template.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                  {template.title}
                </h2>
                <p className="text-sm text-gray-500 mb-1">
                  Category: {template.category}
                </p>
                <p className="text-xl font-semibold text-indigo-600 mb-4">
                  ${template.price}
                </p>
              </div>
            </Link>
            <div className="pt-0 pb-5 px-5">
              <Button
                onClick={() => addToCart(template)}
                className="w-full rounded-2xl"
              >
                Add to Cart
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <Button
          className="fixed bottom-6 right-6 z-50 bg-indigo-600 hover:bg-indigo-700 text-white text-lg rounded-full px-5 py-4 shadow-lg flex items-center gap-3 transition-colors duration-300"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart style={{ width: 28, height: 28 }} />

          <span className="bg-white text-indigo-700 font-bold text-sm rounded-full px-2.5 py-0.5 select-none">
            {cart.length}
          </span>
        </Button>
      )}

      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Slide-in Cart Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isCartOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 p-6 overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-3xl font-bold text-indigo-700">Your Cart</h3>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-500 hover:text-gray-700 text-3xl"
          >
            &times;
          </button>
        </div>
        <ul>
          {cart.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center py-2 text-lg border-b border-gray-100"
            >
              <div>
                <p>{item.title}</p>
                <button
                  className="text-sm text-red-500 hover:underline"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
              <span className="font-semibold">${item.price}</span>
            </li>
          ))}
        </ul>

        <div className="flex justify-between font-bold text-xl mt-6">
          <span>Total</span>
          <span>
            ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
          </span>
        </div>
        <Button className="mt-6 w-full py-3 text-lg rounded-full">
          Proceed to Payment
        </Button>
      </motion.div>
    </div>
  );
}
