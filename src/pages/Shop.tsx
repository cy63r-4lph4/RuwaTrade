import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Star, Store } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  "All",
  "Clothing",
  "Electronics",
  "Home & Living",
  "Beauty",
  "Sports",
  "Books",
];

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 120,
    image: "https://source.unsplash.com/400x400/?headphones",
    rating: 4.5,
    seller: "AudioWorld",
  },
  {
    id: 2,
    name: "Minimalist Chair",
    price: 85,
    image: "https://source.unsplash.com/400x400/?chair",
    rating: 4.7,
    seller: "FurniSpace",
  },
  {
    id: 3,
    name: "Running Sneakers",
    price: 95,
    image: "https://source.unsplash.com/400x400/?sneakers",
    rating: 4.2,
    seller: "StepUp",
  },
  {
    id: 4,
    name: "Designer Backpack",
    price: 140,
    image: "https://source.unsplash.com/400x400/?backpack",
    rating: 4.8,
    seller: "UrbanStyle",
  },
];

export function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* 🔍 Hero Section */}
      <div className="relative py-12 text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h1 className="text-4xl font-extrabold mb-3">Explore Products</h1>
        <p className="text-lg opacity-90 mb-6">
          Discover the best from trusted sellers
        </p>
        <div className="flex justify-center max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full p-3 rounded-l-2xl text-yellow-500 outline-none"
          />
          <Button className="rounded-r-2xl bg-yellow-400 hover:bg-yellow-500">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* 🏷️ Categories */}
      <div className="flex justify-center gap-3 flex-wrap px-6 mt-6">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* 🛍️ Products Grid */}
      <div className="grid gap-8 p-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-60 object-cover"
                />
                <Button
                  size="icon"
                  className="absolute top-3 right-3 bg-white shadow hover:scale-110"
                >
                  <ShoppingCart className="text-black w-5 h-5" />
                </Button>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg truncate">
                  {product.name}
                </h3>
                <p className="text-indigo-600 font-bold text-xl">
                  ${product.price}
                </p>
                <div className="flex items-center text-yellow-500 mt-1">
                  <Star className="w-4 h-4 fill-yellow-500" />{" "}
                  <span className="ml-1 text-sm">{product.rating}</span>
                </div>
                <div className="flex items-center mt-2 text-gray-600 text-sm">
                  <Store className="w-4 h-4 mr-1" /> {product.seller}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 📖 Load More */}
      <div className="flex justify-center pb-12">
        <Button className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg">
          Load More
        </Button>
      </div>
    </div>
  );
}
