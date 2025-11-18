// SellerStorefront.tsx
import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, BadgeCheck, Share2, Heart, Store, Filter, Grid3X3, ListFilter, Info } from "lucide-react";

// --- Mock Fetch (replace with real data fetch using slug) ---
const SELLERS = {
  "artem-studio": {
    id: "s-1",
    name: "Artem Studio",
    tagline: "Minimal goods & lifestyle",
    rating: 4.9,
    reviews: 312,
    verified: true,
    country: "Ghana",
    logo: "/images/sellers/artem.png",
    banner: "/images/sellers/artem-banner.jpeg",
    followers: 5820,
    products: Array.from({ length: 18 }).map((_, i) => ({
      id: `p-${i + 1}`,
      title: `Artem Product ${i + 1}`,
      price: (24 + i * 2).toFixed(2),
      rating: 4 + ((i % 3) * 0.4),
      image: `/images/placeholder-${(i % 3) + 1}.jpeg`,
      category: ["Apparel", "Home", "Accessories"][i % 3],
      type: i % 4 === 0 ? "Digital" : "Physical",
    })),
    about:
      "Artem Studio focuses on minimal aesthetics and timeless designs. We craft apparel and home goods with care.",
    policies: {
      shipping: "Ships within 2–4 business days. International shipping available.",
      returns: "Returns accepted within 14 days in original condition.",
      digital: "Digital purchases are delivered instantly and non-refundable.",
    },
  },
  // Add more sellers keyed by slug...
};

export  function SellerStorefront() {
  const { slug } = useParams<{ slug: string }>();
  const store = SELLERS[slug as keyof typeof SELLERS];

  const [view, setView] = useState<"grid" | "compact">("grid");
  const [q, setQ] = useState("");
  const [typeFilter, setTypeFilter] = useState<"All" | "Physical" | "Digital">("All");
  const [category, setCategory] = useState("All");
  const categories = useMemo(
    () => ["All", ...new Set(store?.products.map((p) => p.category) || [])],
    [store]
  );

  const filtered = useMemo(() => {
    if (!store) return [];
    return store.products.filter((p) => {
      const matchesQ = p.title.toLowerCase().includes(q.toLowerCase());
      const matchesType = typeFilter === "All" || p.type === typeFilter;
      const matchesCat = category === "All" || p.category === category;
      return matchesQ && matchesType && matchesCat;
    });
  }, [store, q, typeFilter, category]);

  if (!store) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-semibold">Store not found</p>
          <Link to="/sellers" className="text-indigo-600 hover:underline mt-2 inline-block">
            Back to Sellers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="relative">
        <div className="h-64 md:h-80 w-full overflow-hidden">
          <img src={store.banner} alt={`${store.name} banner`} className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative -mt-12 md:-mt-16 bg-white rounded-2xl shadow-xl p-5 md:p-7 flex flex-col md:flex-row items-start md:items-center gap-6">
            <img
              src={store.logo}
              className="w-20 h-20 rounded-xl object-cover border-4 border-white shadow"
              alt={`${store.name} logo`}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-extrabold">{store.name}</h1>
                {store.verified && <BadgeCheck className="text-indigo-600" />}
              </div>
              <p className="text-gray-600">{store.tagline}</p>
              <div className="mt-2 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={16} className="fill-yellow-500" />
                  <span className="text-sm text-gray-800">{store.rating}</span>
                  <span className="text-xs text-gray-500">({store.reviews} reviews)</span>
                </div>
                <div className="text-sm text-gray-600">{store.country}</div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">{store.followers.toLocaleString()}</span> followers
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
                Follow Store
              </button>
              <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 font-semibold hover:bg-gray-200 transition inline-flex items-center gap-2">
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Announcement / Info */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="rounded-xl bg-indigo-50 text-indigo-900 p-4 flex items-start gap-3">
          <Info className="mt-0.5" size={18} />
          <p className="text-sm">
            Free shipping on local orders over <span className="font-semibold">$60</span>. Instant access for digital purchases.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <section className="max-w-7xl mx-auto px-6 mt-6">
        <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="flex-1 flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 flex-1">
              <Filter size={16} className="text-gray-500" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products in this store…"
                className="bg-transparent outline-none w-full"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="bg-gray-100 rounded-lg px-3 py-2 text-sm"
            >
              <option>All</option>
              <option>Physical</option>
              <option>Digital</option>
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-100 rounded-lg px-3 py-2 text-sm"
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setView("grid")}
              className={`px-3 py-2 rounded-lg border ${
                view === "grid" ? "bg-gray-100 border-gray-200" : "border-transparent hover:bg-gray-100"
              }`}
              aria-label="Grid view"
            >
              <Grid3X3 size={18} />
            </button>
            <button
              onClick={() => setView("compact")}
              className={`px-3 py-2 rounded-lg border ${
                view === "compact" ? "bg-gray-100 border-gray-200" : "border-transparent hover:bg-gray-100"
              }`}
              aria-label="Compact view"
            >
              <ListFilter size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Tabs (Products / About / Reviews / Policies) */}
      <section className="max-w-7xl mx-auto px-6 mt-6">
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="border-b px-4 md:px-6">
            <div className="flex flex-wrap">
              {["Products", "About", "Reviews", "Policies"].map((tab, i) => (
                <button
                  key={tab}
                  className={`px-4 md:px-6 py-3 text-sm font-semibold border-b-2 -mb-[2px] ${
                    i === 0 ? "border-indigo-600 text-indigo-700" : "border-transparent text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="p-4 md:p-6">
            {filtered.length === 0 ? (
              <div className="py-16 text-center text-gray-600">No products match your filters.</div>
            ) : view === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p, idx) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition group"
                  >
                    <div className="relative">
                      <img src={p.image} className="h-52 w-full object-cover group-hover:opacity-95" alt={p.title} />
                      <button className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow hover:scale-110 transition">
                        <Heart size={16} />
                      </button>
                      <span className="absolute bottom-3 left-3 text-xs px-2 py-1 rounded-full bg-black/70 text-white">
                        {p.type}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold line-clamp-1">{p.title}</h3>
                      <p className="text-xs text-gray-500">{p.category}</p>

                      <div className="mt-2 flex items-center gap-1 text-yellow-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={14} className={i < Math.round(p.rating) ? "fill-yellow-500" : ""} />
                        ))}
                        <span className="text-xs text-gray-600 ml-1">{p.rating.toFixed(1)}</span>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-indigo-700 font-bold">${p.price}</span>
                        <Link
                          to={`/product/${p.id}`}
                          className="text-xs font-semibold px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              // Compact list view
              <div className="space-y-4">
                {filtered.map((p) => (
                  <div key={p.id} className="flex gap-4 rounded-xl border bg-white p-3 hover:shadow transition">
                    <img src={p.image} alt={p.title} className="w-28 h-24 object-cover rounded-lg" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{p.title}</h4>
                          <p className="text-xs text-gray-500">
                            {p.category} • <span className="uppercase">{p.type}</span>
                          </p>
                          <div className="mt-1 flex items-center gap-1 text-yellow-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} size={14} className={i < Math.round(p.rating) ? "fill-yellow-500" : ""} />
                            ))}
                            <span className="text-xs text-gray-600 ml-1">{p.rating.toFixed(1)}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-indigo-700 font-bold">${p.price}</div>
                          <Link
                            to={`/product/${p.id}`}
                            className="mt-2 inline-block text-xs font-semibold px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* About / Reviews / Policies (preview blocks) */}
          <div className="border-t grid grid-cols-1 lg:grid-cols-3 gap-0">
            <div className="p-6">
              <h4 className="font-bold mb-2">About</h4>
              <p className="text-sm text-gray-600">{store.about}</p>
            </div>
            <div className="p-6 border-t lg:border-t-0 lg:border-l">
              <h4 className="font-bold mb-2">Top Review</h4>
              <p className="text-sm text-gray-600">
                “Fantastic quality and quick shipping. The digital templates are beautifully designed and easy to use.”
              </p>
              <div className="mt-2 flex items-center gap-1 text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < 5 ? "fill-yellow-500" : ""} />
                ))}
              </div>
            </div>
            <div className="p-6 border-t lg:border-t-0 lg:border-l">
              <h4 className="font-bold mb-2">Store Policies</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><span className="font-medium">Shipping:</span> {store.policies.shipping}</li>
                <li><span className="font-medium">Returns:</span> {store.policies.returns}</li>
                <li><span className="font-medium">Digital:</span> {store.policies.digital}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="max-w-7xl mx-auto px-6 mt-10 mb-16">
        <div className="rounded-3xl bg-white shadow-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">Open your store on RuwaTrade</h3>
            <p className="mt-3 text-gray-600">
              Sell physical and digital products with powerful tools and a beautiful storefront like this.
            </p>
          </div>
          <Link
            to="/register-seller"
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition inline-flex items-center gap-2"
          >
            <Store size={18} /> Become a Seller
          </Link>
        </div>
      </section>
    </div>
  );
}
