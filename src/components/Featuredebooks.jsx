"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import EbookCard from "@/components/books/EbookCard";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const EbookCardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
    <div className="h-52 bg-slate-200" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-slate-200 rounded w-3/4" />
      <div className="h-3 bg-slate-200 rounded w-1/2" />
      <div className="h-3 bg-slate-200 rounded w-1/4" />
    </div>
  </div>
);

export default function FeaturedEbooks({ books = [], isLoading = false }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-1">
              Fresh Picks
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800">
              Featured Ebooks
            </h2>
          </div>
          <Link
            href="/books"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-amber-500 hover:text-amber-600 transition-colors"
          >
            Browse all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <EbookCardSkeleton key={i} />)
            : books.map((book, i) => (
                <motion.div
                  key={book._id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                >
                  <EbookCard book={book} index={i} />
                </motion.div>
              ))}
        </div>

        {/* Mobile browse link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/books"
            className="inline-flex items-center gap-1 text-sm font-semibold text-amber-500"
          >
            Browse all ebooks
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}