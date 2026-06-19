"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "@gravity-ui/icons";

export default function EbookCard({ book }) {
  return (
    <motion.div
      initial={false}
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.25,
      }}
      className="h-full"
    >
      <Link
        href={`/books/${book._id}`}
        className="group relative block aspect-square overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.08)] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(15,23,42,0.18)]"
      >
        {/* Image */}

        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Top */}

        <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-bold backdrop-blur-md ${
              book.status === "published"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                : "bg-amber-500/20 text-amber-200 border border-amber-400/30"
            }`}
          >
            {book.status}
          </span>

          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
            {book.genre}
          </span>
        </div>

        {/* Bottom */}

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="space-y-2">
            <h3 className="line-clamp-1 text-xl font-black text-white">
              {book.title}
            </h3>

            <p className="text-sm text-white/80">
              {book.writerName || "Unknown Writer"}
            </p>

            <p className="line-clamp-2 text-xs text-white/60">
              {book.shortDescription}
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-white/50">
                Price
              </p>

              <h4 className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 bg-clip-text text-2xl font-black text-transparent">
                ${book.price}
              </h4>
            </div>

            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-bold text-white shadow-lg"
            >
              View
              <ArrowRight className="size-4" />
            </motion.div>
          </div>
        </div>

        {/* Premium Glow */}

        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-amber-500/10" />
        </div>
      </Link>
    </motion.div>
  );
}