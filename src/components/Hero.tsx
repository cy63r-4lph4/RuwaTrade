// HeroSection.tsx
import { motion } from "framer-motion";
import Sparkle from "react-sparkle";

type Props = { compact?: boolean };

export function HeroSection({ compact = false }: Props) {
  return (
    <section
      className={`relative overflow-hidden text-white rounded-3xl
        ${compact ? "h-40 py-6 bg-indigo-900" : "min-h-[80vh] bg-gradient-to-br from-purple-900 to-black py-20"}`}
    >
      {!compact && (
        <Sparkle
          color={["#8B5CF6", "#EC4899"]}
          count={50}
          minSize={5}
          maxSize={12}
          flicker
          fadeOutSpeed={80}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="z-10 text-center relative"
      >
        <h1 className={`font-extrabold ${compact ? "text-2xl" : "text-5xl mb-4"}`}>
          Welcome to RuwaTrade
        </h1>

        {!compact && (
          <>
            <p className="text-xl text-gray-300">
              Explore curated templates, assets, and tools to elevate your projects.
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-8 inline-flex space-x-4"
            >
              <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-lg font-semibold shadow-lg">
                Browse
              </button>
              <button className="px-8 py-3 bg-transparent border border-white rounded-full text-lg font-semibold hover:bg-white hover:text-black transition">
                Learn More
              </button>
            </motion.div>
          </>
        )}
      </motion.div>
    </section>
  );
}
