import { motion } from "framer-motion";
import { Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const cartItems = [
  {
    id: 1,
    name: "Premium Leather Backpack",
    price: 129.99,
    image: "/images/backpack.jpeg",
    quantity: 1,
  },
  {
    id: 2,
    name: "Running Sneakers",
    price: 89.99,
    image: "/images/sneakers.jpeg",
    quantity: 2,
  },
];

export function CartPage() {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center bg-white rounded-2xl shadow p-4 gap-6"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <div className="flex items-center gap-3 mt-3">
                  <label className="text-sm text-gray-500">Qty:</label>
                  <Input
                    type="number"
                    min={1}
                    value={item.quantity}
                    className="w-16"
                  />
                </div>
              </div>
              <Button variant="ghost" className="text-red-500 hover:bg-red-50">
                <Trash2 size={18} />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <Card className="h-fit sticky top-10 rounded-2xl shadow-lg border border-gray-200">
          <CardContent className="p-6 space-y-6">
            <h2 className="text-xl font-bold">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full flex items-center justify-center gap-2">
              Checkout <ArrowRight size={18} />
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Secure checkout with SSL encryption.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
