"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const writerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

const medals = ["🥇", "🥈", "🥉"];

const WriterSkeleton = () => (
  <div className="flex flex-col items-center gap-3 animate-pulse">
    <div className="w-24 h-24 rounded-full bg-slate-200" />
    <div className="h-4 w-28 bg-slate-200 rounded" />
    <div className="h-3 w-20 bg-slate-200 rounded" />
  </div>
);

export default function TopWriters({ writers = [], isLoading = false }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-1">
            Community Stars
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800">
            Top Writers
          </h2>
          <p className="mt-3 text-slate-500 max-w-md mx-auto text-sm">
            Meet the authors our readers love most — ranked by total sales.
          </p>
        </motion.div>

        {/* Writers Row */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <WriterSkeleton key={i} />
              ))
            : writers.map((writer, i) => (
                <div key={writer._id?.toString() || i}>
                  <motion.div
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={writerVariants}
                    className={`flex flex-col items-center text-center ${
                      i === 0 ? "sm:-translate-y-4" : ""
                    }`}
                  >
                    <Link
                      href={`/books?writerId=${writer._id}`}
                      className="group flex flex-col items-center gap-3"
                    >
                      {/* Avatar */}
                      <div className="relative">
                        <div
                          className={`w-24 h-24 rounded-full overflow-hidden ring-4 transition-all duration-300 group-hover:ring-amber-400 ${
                            i === 0
                              ? "ring-amber-400 w-28 h-28"
                              : "ring-slate-200"
                          }`}
                        >
                          {writer.image ? (
                            <Image
                              src={writer.image}
                              alt={writer.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                              <span className="text-white font-black text-2xl">
                                {writer.name?.[0]?.toUpperCase() || "W"}
                              </span>
                            </div>
                          )}
                        </div>
                        {/* Medal badge */}
                        <span className="absolute -bottom-1 -right-1 text-xl">
                          {medals[i]}
                        </span>
                      </div>

                      {/* Info */}
                      <div>
                        <h3 className="font-bold text-slate-800 group-hover:text-amber-500 transition-colors">
                          {writer.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {writer.totalSales}{" "}
                          {writer.totalSales === 1 ? "sale" : "sales"}
                        </p>
                      </div>

                      {/* View books */}
                      <span className="text-xs font-semibold text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity -mt-1">
                        View books →
                      </span>
                    </Link>
                  </motion.div>
                </div>
              ))}

          {/* Empty state */}
          {!isLoading && writers.length === 0 && (
            <p className="text-slate-400 text-sm">No writers yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
