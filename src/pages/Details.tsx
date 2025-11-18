import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Example product data (in real use, fetch from API or router params)
const product = {
  id: 1,
  name: "Premium Leather Backpack",
  price: 129.99,
  image: "/images/backpack.jpeg",
  category: "Bags",
  rating: 4.8,
  reviews: 142,
  description:
    "Handcrafted from the finest full-grain leather, this backpack combines timeless design with modern functionality. Perfect for daily commutes, weekend getaways, and business trips.",
  features: [
    "100% genuine leather",
    "Padded laptop compartment",
    "Adjustable shoulder straps",
    "Water-resistant finish",
    "Lifetime warranty",
  ],
};

export  function ProductDetails() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl overflow-hidden shadow-lg bg-white"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="bg-gray-200 text-gray-700">
                {product.category}
              </Badge>
              <div className="flex items-center text-yellow-500">
                {Array(Math.floor(product.rating))
                  .fill(null)
                  .map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                <span className="ml-2 text-gray-600 text-sm">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          {/* Features */}
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {product.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>

          {/* Price & Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <span className="text-3xl font-bold text-green-600">
              ${product.price}
            </span>
            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Heart size={16} className="text-red-500" /> Wishlist
              </Button>
              <Button className="flex items-center gap-2">
                <ShoppingCart size={16} /> Add to Cart
              </Button>
            </div>
          </div>

          {/* Shipping & Return Info */}
          <div className="mt-8 bg-white rounded-xl shadow p-6 space-y-3">
            <h3 className="text-lg font-semibold">Shipping & Returns</h3>
            <p className="text-sm text-gray-600">
              Free worldwide shipping on all orders. Easy returns within 30 days
              of purchase. See our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                return policy
              </a>{" "}
              for more details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
