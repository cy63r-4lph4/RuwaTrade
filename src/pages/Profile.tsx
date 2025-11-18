import { useState } from "react";
import { motion } from "framer-motion";

export  function ProfilePage() {
  const [activeTab, setActiveTab] = useState("saved");

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b pb-6">
        <img
          src="/images/avatar.jpeg"
          alt="Profile"
          className="w-28 h-28 rounded-full shadow-lg border-4 border-white"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">John Doe</h1>
          <p className="text-gray-500">john@example.com</p>
          <p className="mt-2 text-sm">
            📍 Default Address: 123 Main St, Digital Addr: <span className="font-mono">DGT-555-ABC</span>
          </p>
          <button className="mt-4 px-5 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition">
            Edit Profile
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <StatCard label="Saved" value="12" />
          <StatCard label="Purchases" value="8" />
          <StatCard label="Spent" value="$1,245" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mt-6 border-b">
        {["saved", "library", "history"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 capitalize font-semibold ${
              activeTab === tab
                ? "border-b-2 border-indigo-500 text-indigo-600"
                : "text-gray-500 hover:text-indigo-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6"
      >
        {activeTab === "saved" && <SavedProducts />}
        {activeTab === "library" && <DigitalLibrary />}
        {activeTab === "history" && <PurchaseHistory />}
      </motion.div>
    </div>
  );
}

type StatCardProps = {
  label: string;
  value: string;
};

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
      <p className="text-lg font-bold">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

function SavedProducts() {
  const products = [
    { id: 1, name: "Wireless Headphones", price: 99, img: "/images/prod1.jpeg" },
    { id: 2, name: "Smartwatch Pro", price: 199, img: "/images/prod2.jpeg" },
    { id: 3, name: "Gaming Keyboard", price: 129, img: "/images/prod3.jpeg" },
    { id: 4, name: "Portable Speaker", price: 79, img: "/images/prod4.jpeg" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map(p => (
        <div key={p.id} className="bg-white rounded-xl shadow hover:shadow-lg transition">
          <img src={p.img} alt={p.name} className="rounded-t-xl w-full h-40 object-cover" />
          <div className="p-4">
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="text-indigo-600 font-bold">${p.price}</p>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 bg-indigo-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-indigo-600">
                Move to Cart
              </button>
              <button className="flex-1 bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm hover:bg-gray-200">
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DigitalLibrary() {
  const digitalItems = [
    { id: 1, name: "E-book: Learn Laravel", date: "2025-07-15", img: "/ebook.jpg" },
    { id: 2, name: "Course: React Mastery", date: "2025-06-20", img: "/course.jpg" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {digitalItems.map(item => (
        <div key={item.id} className="bg-white rounded-lg shadow hover:shadow-lg transition flex">
          <img src={item.img} alt={item.name} className="w-24 h-24 object-cover rounded-l-lg" />
          <div className="p-4 flex-1">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500">Purchased: {item.date}</p>
            <button className="mt-2 px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600">
              Download
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function PurchaseHistory() {
  const orders = [
    { id: "#1001", date: "2025-07-12", items: 3, total: 199, status: "Delivered" },
    { id: "#1002", date: "2025-07-01", items: 1, total: 99, status: "Pending" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="border p-3 text-left">Order ID</th>
            <th className="border p-3">Date</th>
            <th className="border p-3">Items</th>
            <th className="border p-3">Total</th>
            <th className="border p-3">Status</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="border p-3">{order.id}</td>
              <td className="border p-3">{order.date}</td>
              <td className="border p-3 text-center">{order.items}</td>
              <td className="border p-3 text-center">${order.total}</td>
              <td className="border p-3 text-center">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="border p-3 text-center">
                <button className="px-3 py-1 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
