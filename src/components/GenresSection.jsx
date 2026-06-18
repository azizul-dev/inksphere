"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const genres = [
  { label: "Fiction",     emoji: "📖", color: "from-yellow-400/20 to-orange-400/20", border: "border-yellow-400/30", hover: "hover:border-yellow-400/60", text: "text-yellow-600" },
  { label: "Mystery",     emoji: "🔍", color: "from-purple-400/20 to-indigo-400/20", border: "border-purple-400/30", hover: "hover:border-purple-400/60", text: "text-purple-600" },
  { label: "Romance",     emoji: "💕", color: "from-pink-400/20 to-rose-400/20",     border: "border-pink-400/30",   hover: "hover:border-pink-400/60",   text: "text-pink-600" },
  { label: "Sci-Fi",      emoji: "🚀", color: "from-cyan-400/20 to-blue-400/20",     border: "border-cyan-400/30",   hover: "hover:border-cyan-400/60",   text: "text-cyan-600" },
  { label: "Fantasy",     emoji: "🧙", color: "from-emerald-400/20 to-teal-400/20", border: "border-emerald-400/30",hover: "hover:border-emerald-400/60",text: "text-emerald-600" },
  { label: "Horror",      emoji: "👻", color: "from-red-400/20 to-orange-400/20",   border: "border-red-400/30",    hover: "hover:border-red-400/60",    text: "text-red-600" },
  { label: "Biography",   emoji: "🧑", color: "from-amber-400/20 to-yellow-400/20", border: "border-amber-400/30",  hover: "hover:border-amber-400/60",  text: "text-amber-600" },
  { label: "Self-Help",   emoji: "💡", color: "from-lime-400/20 to-green-400/20",   border: "border-lime-400/30",   hover: "hover:border-lime-400/60",   text: "text-lime-600" },
  { label: "History",     emoji: "🏛️", color: "from-stone-400/20 to-zinc-400/20",   border: "border-stone-400/30",  hover: "hover:border-stone-400/60",  text: "text-stone-600" },
  { label: "Adventure",   emoji: "🗺️", color: "from-orange-400/20 to-red-400/20",   border: "border-orange-400/30", hover: "hover:border-orange-400/60", text: "text-orange-600" },
  { label: "Poetry",      emoji: "🎭", color: "from-violet-400/20 to-purple-400/20",border: "border-violet-400/30", hover: "hover:border-violet-400/60", text: "text-violet-600" },
  { label: "Thriller",    emoji: "⚡", color: "from-blue-400/20 to-cyan-400/20",    border: "border-blue-400/30",   hover: "hover:border-blue-400/60",   text: "text-blue-600" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 18 } },
};

export default function GenresSection() {
  return (
    <section className="relative py-20 sm:py-24 bg-white overflow-hidden">

      {/* subtle bg accent */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(250,204,21,.06) 0%, transparent 60%)" }} />

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-8">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-12"
        >
          {/* pill */}
          <div className="inline-flex items-center gap-2 bg-orange-400/10 border border-orange-400/25 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[12px] text-orange-500 font-medium tracking-wide">✦ Browse by Category</span>
          </div>

          <h2 className="text-[clamp(26px,4vw,42px)] font-extrabold tracking-tight text-gray-900 mb-3">
            Explore{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg,#facc15,#f97316)" }}>
              Ebook
            </span>{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg,#22d3ee,#2563eb)" }}>
              Genres
            </span>
          </h2>
          <p className="text-gray-500 text-[15px] max-w-[480px] leading-relaxed">
            From spine-chilling thrillers to heartwarming romance — find your next favorite read by genre.
          </p>
        </motion.div>

        {/* ── Genre grid ── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"
        >
          {genres.map(({ label, emoji, color, border, hover, text }) => (
            <motion.div key={label} variants={item}>
              <Link
                href={`/ebooks?genre=${label.toLowerCase().replace(" ", "-")}`}
                className={`group flex flex-col items-center justify-center gap-3 p-4 sm:p-5 rounded-2xl border bg-gradient-to-br ${color} ${border} ${hover} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
              >
                {/* emoji with scale on hover */}
                <motion.span
                  className="text-3xl sm:text-4xl"
                  whileHover={{ scale: 1.25, rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.35 }}
                >
                  {emoji}
                </motion.span>
                <span className={`text-[13px] sm:text-[14px] font-semibold ${text} text-center leading-tight`}>
                  {label}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-center mt-10"
        >
          <Link
            href="/ebooks"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-gray-500 hover:text-gray-800 transition-colors duration-200 group"
          >
            View all ebooks
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}