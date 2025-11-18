import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs,  TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Download, Filter } from "lucide-react";

const mockDigitalProducts = [
  {
    id: 1,
    title: "Modern Business Template",
    category: "Website",
    price: 25,
    rating: 4.8,
    downloads: 120,
    thumbnail: "https://source.unsplash.com/random/600x400?tech,minimal",
  },
  {
    id: 2,
    title: "Professional Resume Pack",
    category: "Resume",
    price: 10,
    rating: 4.5,
    downloads: 210,
    thumbnail: "https://source.unsplash.com/random/600x400?resume,design",
  },
  {
    id: 3,
    title: "Pitch Deck Presentation",
    category: "Presentation",
    price: 18,
    rating: 4.7,
    downloads: 95,
    thumbnail: "https://source.unsplash.com/random/600x400?slides,creative",
  },
];

export function EStore() {
  const [search, setSearch] = useState("");

  const filteredProducts = mockDigitalProducts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero / Banner */}
      <section className="text-center py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Discover Premium Digital Assets
        </motion.h1>
        <p className="text-lg opacity-90">
          Templates, designs, e-books, and tools crafted by top creators
        </p>
        <div className="mt-6 max-w-lg mx-auto flex gap-2">
          <Input
            placeholder="Search digital assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white text-black"
          />
          <Button variant="secondary">Search</Button>
        </div>
      </section>

      {/* Filters + Categories */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">Explore Digital Assets</h2>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} /> Filters
          </Button>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="website">Website</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="presentation">Presentation</TabsTrigger>
            <TabsTrigger value="ebooks">E-books</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Product Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-2">{product.title}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="font-semibold text-indigo-600">
                      ${product.price}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Star size={16} className="text-yellow-500" />
                      {product.rating}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-3 text-gray-500 text-sm">
                    <span className="flex items-center gap-1">
                      <Download size={16} /> {product.downloads}
                    </span>
                    <Button size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-indigo-50 py-12 mt-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Become a Digital Seller</h2>
        <p className="text-gray-600 mb-6">
          Share your templates, e-books, and designs with the world. Start
          earning today.
        </p>
        <Button size="lg">Register as Seller</Button>
      </section>
    </div>
  );
}
