import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

export function HeroSection() {
  return (
    <section className="text-center py-20 px-4 sm:px-10 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl shadow-xl max-w-6xl mx-auto">
      <motion.h1
        className="text-5xl sm:text-6xl font-extrabold leading-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 12 }}
      >
        Welcome to{' '}
        <motion.span
          className="inline-block relative"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <span className="absolute inset-0 text-indigo-500 blur-md opacity-30 select-none animate-pulse">
              RuwaTrade
            </span>
            RuwaTrade
          </span>
        </motion.span>
      </motion.h1>

      <motion.p
        className="mt-6 text-lg sm:text-xl text-gray-700 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Typewriter
          words={[
            'Buy stunning HTML templates.',
            'Download clean Excel sheets.',
            'Present like a pro with PowerPoint.',
          ]}
          loop
          cursor
          cursorStyle="_"
          typeSpeed={60}
          deleteSpeed={40}
          delaySpeed={1400}
        />
      </motion.p>

      <motion.div
        className="mt-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-md transition-all duration-300">
          Browse Templates
        </button>
      </motion.div>
    </section>
  );
}
