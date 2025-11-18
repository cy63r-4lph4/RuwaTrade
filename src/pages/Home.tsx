import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, ArrowRight, Store } from "lucide-react";

// --- Mock data (replace with API data later) ---
const featuredProducts = Array.from({ length: 6 }).map((_, i) => ({
  id: `p-${i + 1}`,
  title: `Product Title ${i + 1}`,
  price: (19.99 + i * 3).toFixed(2),
  rating: 4 + ((i % 3) * 0.3),
  image: `/images/placeholder-${(i % 3) + 1}.jpeg`, // replace with real images
  seller: { name: ["Artem Studio", "Nuru Crafts", "ByteForge"][i % 3] },
}));

const featuredSellers = [
  {
    id: "s-1",
    name: "Artem Studio",
    tagline: "Minimal goods & lifestyle",
    rating: 4.9,
    reviews: 312,
    logo: "/images/sellers/artem.png",
    banner: "/images/sellers/artem-banner.jpeg",
    slug: "artem-studio",
  },
  {
    id: "s-2",
    name: "Nuru Crafts",
    tagline: "Handmade fashion & decor",
    rating: 4.8,
    reviews: 208,
    logo: "/images/sellers/nuru.png",
    banner: "/images/sellers/nuru-banner.jpeg",
    slug: "nuru-crafts",
  },
  {
    id: "s-3",
    name: "ByteForge",
    tagline: "Digital templates & tools",
    rating: 4.7,
    reviews: 455,
    logo: "/images/sellers/byteforge.png",
    banner: "/images/sellers/byteforge-banner.jpeg",
    slug: "byteforge",
  },
];

export  function Home() {
  return (
    <div className="bg-gray-50 text-gray-900">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-28 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
          >
            Discover. Shop. Sell. Create.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-lg md:text-2xl/relaxed max-w-3xl mx-auto text-white/90"
          >
            A modern marketplace for <span className="font-semibold">physical</span> goods and{" "}
            <span className="font-semibold">digital</span> templates — built for creators, businesses, and dreamers.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/shop"
              className="px-6 py-3 rounded-xl bg-white text-indigo-700 font-semibold shadow hover:shadow-lg transition inline-flex items-center gap-2"
            >
              Shop Products <ArrowRight size={18} />
            </Link>
            <Link
              to="/estore"
              className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold backdrop-blur hover:bg-white/15 transition"
            >
              Explore Digital Templates
            </Link>
          </motion.div>
        </div>

        {/* Floating blobs */}
        <motion.div
          className="absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-white/10 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 14 }}
        />
        <motion.div
          className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-white/10 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 16 }}
        />
      </section>

      {/* ===== CATEGORY HIGHLIGHTS ===== */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Physical */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-3xl overflow-hidden shadow-lg group">
            <Link to="/shop" className="block">
              <img
                src="/images/shop.jpeg"
                alt="Shop Physical Products"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/45 flex flex-col justify-end p-8 text-white">
                <h2 className="text-3xl font-bold mb-2">Shop Physical Products</h2>
                <p className="text-sm text-white/90 max-w-md">
                  Fashion, accessories, collectibles, gadgets and more — curated from top sellers.
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-black bg-white px-4 py-2 rounded-lg font-semibold w-max">
                  Explore Now <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Digital */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-3xl overflow-hidden shadow-lg group">
            <Link to="/estore" className="block">
              <img
                src="/images/estore.jpeg"
                alt="Explore Digital Templates"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/45 flex flex-col justify-end p-8 text-white">
                <h2 className="text-3xl font-bold mb-2">Explore Digital Templates</h2>
                <p className="text-sm text-white/90 max-w-md">
                  HTML, Excel, PowerPoint, and design assets — ready to use for work & creativity.
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-black bg-white px-4 py-2 rounded-lg font-semibold w-max">
                  Browse Templates <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl md:text-3xl font-bold">Featured Products</h3>
          <Link to="/shop" className="text-indigo-700 font-semibold hover:underline inline-flex items-center gap-1">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredProducts.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group"
            >
              <div className="relative">
                <img src={p.image} alt={p.title} className="h-56 w-full object-cover group-hover:opacity-95" />
                <button
                  aria-label="Save"
                  className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow hover:scale-110 transition"
                >
                  ❤️
                </button>
              </div>
              <div className="p-5">
                <h4 className="text-lg font-semibold line-clamp-1">{p.title}</h4>
                <p className="text-sm text-gray-500 line-clamp-1">by {p.seller.name}</p>

                <div className="mt-2 flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className={i < Math.round(p.rating) ? "fill-yellow-500" : ""} />
                  ))}
                  <span className="text-gray-600 text-sm ml-1">{p.rating.toFixed(1)}</span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-indigo-700 font-bold text-lg">${p.price}</span>
                  <Link
                    to={`/product/${p.id}`}
                    className="text-sm font-semibold px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== FEATURED SELLERS ===== */}
      <section className="max-w-7xl mx-auto px-6 py-10 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl md:text-3xl font-bold">Featured Sellers</h3>
          <Link to="/sellers" className="text-indigo-700 font-semibold hover:underline inline-flex items-center gap-1">
            View all sellers <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredSellers.map((s) => (
            <motion.div
              key={s.id}
              whileHover={{ y: -6 }}
              className="rounded-2xl overflow-hidden shadow-lg bg-white group"
            >
              <div className="relative">
                <img src={s.banner} alt={`${s.name} banner`} className="h-36 w-full object-cover" />
                <img
                  src={s.logo}
                  alt={`${s.name} logo`}
                  className="absolute -bottom-8 left-5 w-16 h-16 rounded-xl object-cover border-4 border-white shadow"
                />
              </div>
              <div className="pt-10 px-5 pb-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-bold">{s.name}</h4>
                    <p className="text-sm text-gray-500">{s.tagline}</p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} className="fill-yellow-500" />
                    <span className="text-sm text-gray-700">{s.rating}</span>
                    <span className="text-xs text-gray-500">({s.reviews})</span>
                  </div>
                </div>
                <Link
                  to={`/s/${s.slug}`}
                  className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                >
                  <Store size={16} /> Visit Store
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== SELLER CTA ===== */}
      <section className="max-w-7xl mx-auto px-6 py-10 md:py-16">
        <div className="rounded-3xl bg-white shadow-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Open your store on RuwaTrade
            </h3>
            <p className="mt-3 text-gray-600">
              Reach new customers with a marketplace designed for both physical and digital products.
            </p>
          </div>
          <Link
            to="/register-seller"
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition inline-flex items-center gap-2"
          >
            Become a Seller <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 py-16 text-center text-white overflow-hidden">
        <h3 className="text-2xl md:text-3xl font-bold">Join the RuwaTrade Community</h3>
        <p className="opacity-90 mt-2 mb-8">Get exclusive deals, marketplace news, and product updates.</p>
        <form className="flex flex-col md:flex-row justify-center gap-4 max-w-xl mx-auto px-6">
          <input
            type="email"
            placeholder="you@example.com"
            className="px-5 py-3 rounded-lg w-full md:w-auto text-gray-200"
          />
          <button
            type="submit"
            className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold shadow hover:shadow-lg transition"
          >
            Subscribe
          </button>
        </form>
        <motion.div
          className="pointer-events-none absolute -top-10 left-10 w-60 h-60 bg-white/20 rounded-full blur-3xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 7 }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-10 right-10 w-60 h-60 bg-white/20 rounded-full blur-3xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 7 }}
        />
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-lg">RuwaTrade</h4>
            <p className="mt-2 text-sm text-gray-600">
              A modern multi-tenant marketplace for digital and physical products.
            </p>
          </div>
          <div>
            <h5 className="font-semibold">Marketplace</h5>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><Link to="/shop" className="hover:underline">Shop Products</Link></li>
              <li><Link to="/estore" className="hover:underline">Digital Templates</Link></li>
              <li><Link to="/sellers" className="hover:underline">Sellers</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold">Company</h5>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><Link to="/about" className="hover:underline">About</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              <li><Link to="/careers" className="hover:underline">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold">Legal</h5>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
              <li><Link to="/refunds" className="hover:underline">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} RuwaTrade. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
