// SellersDirectory.tsx
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Search, Filter, Store, BadgeCheck, ChevronRight } from "lucide-react";

// --- Mock data (swap with API data) ---
const ALL_SELLERS = [
  {
    id: "s-1",
    name: "Artem Studio",
    slug: "artem-studio",
    tagline: "Minimal goods & lifestyle",
    rating: 4.9,
    reviews: 312,
    categories: ["Apparel", "Home"],
    logo: "/images/sellers/artem.png",
    banner: "/images/sellers/artem-banner.jpeg",
    verified: true,
    productsCount: 184,
    country: "Ghana",
  },
  {
    id: "s-2",
    name: "Nuru Crafts",
    slug: "nuru-crafts",
    tagline: "Handmade fashion & decor",
    rating: 4.8,
    reviews: 208,
    categories: ["Apparel", "Accessories", "Decor"],
    logo: "/images/sellers/nuru.png",
    banner: "/images/sellers/nuru-banner.jpeg",
    verified: true,
    productsCount: 96,
    country: "Kenya",
  },
  {
    id: "s-3",
    name: "ByteForge",
    slug: "byteforge",
    tagline: "Digital templates & tools",
    rating: 4.7,
    reviews: 455,
    categories: ["Digital", "Templates", "Design"],
    logo: "/images/sellers/byteforge.png",
    banner: "/images/sellers/byteforge-banner.jpeg",
    verified: false,
    productsCount: 320,
    country: "Nigeria",
  },
  // ...add more
];

const ALL_TAGS = ["Apparel", "Accessories", "Home", "Decor", "Digital", "Templates", "Design"];

export  function SellersDirectory() {
  const [q, setQ] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sort, setSort] = useState<"top" | "new" | "alpha">("top");

  const filtered = useMemo(() => {
    let list = ALL_SELLERS.filter((s) =>
      [s.name, s.tagline, s.categories.join(" "), s.country]
        .join(" ")
        .toLowerCase()
        .includes(q.toLowerCase())
    );
    if (activeTags.length) {
      list = list.filter((s) => activeTags.every((t) => s.categories.includes(t)));
    }
    if (sort === "top") {
      list = list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    } else if (sort === "alpha") {
      list = list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // "new" — placeholder; in real app, sort by createdAt desc
      list = list;
    }
    return list;
  }, [q, activeTags, sort]);

  const toggleTag = (tag: string) =>
    setActiveTags((t) => (t.includes(tag) ? t.filter((x) => x !== tag) : [...t, tag]));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Explore Sellers</h1>
          <p className="mt-3 text-white/90 max-w-2xl">
            Discover verified stores and creative brands. Shop confidently across the RuwaTrade marketplace.
          </p>

          {/* Search + Filters */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-8 bg-white/95 backdrop-blur rounded-xl shadow p-2 flex items-center">
              <Search className="mx-3 text-gray-400" size={18} />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search sellers by name, niche, country…"
                className="w-full bg-transparent outline-none py-3 text-gray-800 placeholder:text-gray-400"
              />
            </div>
            <div className="lg:col-span-4 flex gap-2">
              <div className="flex-1 bg-white/95 backdrop-blur rounded-xl shadow p-2">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as any)}
                  className="w-full bg-transparent outline-none py-3 px-3 text-gray-800"
                >
                  <option value="top">Top Rated</option>
                  <option value="alpha">A → Z</option>
                  <option value="new">Newest</option>
                </select>
              </div>
              <button className="px-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold inline-flex items-center gap-2">
                <Filter size={16} /> Filters
              </button>
            </div>
          </div>

          {/* Quick tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  activeTags.includes(tag) ? "bg-white text-indigo-700" : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Decorative blobs */}
        <motion.div
          className="absolute -top-16 -left-16 w-[24rem] h-[24rem] rounded-full bg-white/10 blur-3xl"
          animate={{ x: [0, 24, 0], y: [0, 16, 0] }}
          transition={{ repeat: Infinity, duration: 14 }}
        />
        <motion.div
          className="absolute -bottom-16 -right-16 w-[24rem] h-[24rem] rounded-full bg-white/10 blur-3xl"
          animate={{ x: [0, -24, 0], y: [0, -16, 0] }}
          transition={{ repeat: Infinity, duration: 16 }}
        />
      </section>

      {/* Sellers Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-lg text-gray-600">No sellers match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filtered.map((s, idx) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="rounded-2xl overflow-hidden bg-white shadow hover:shadow-xl transition group"
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
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold">{s.name}</h3>
                        {s.verified && <BadgeCheck className="text-indigo-600" size={18} />}
                      </div>
                      <p className="text-sm text-gray-500">{s.tagline}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1 text-yellow-500">
                        <Star size={16} className="fill-yellow-500" />
                        <span className="text-sm text-gray-700">{s.rating}</span>
                        <span className="text-xs text-gray-500">({s.reviews})</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{s.country}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.categories.slice(0, 3).map((c) => (
                      <span
                        key={c}
                        className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                      >
                        {c}
                      </span>
                    ))}
                    {s.categories.length > 3 && (
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">+{s.categories.length - 3}</span>
                    )}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">{s.productsCount}</span> products
                    </div>
                    <Link
                      to={`/s/${s.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                    >
                      <Store size={16} /> Visit Store
                    </Link>
                  </div>
                </div>

                <Link
                  to={`/s/${s.slug}`}
                  className="block border-t px-5 py-3 text-sm text-indigo-700 hover:bg-indigo-50/60 transition flex items-center justify-between"
                >
                  View storefront <ChevronRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
