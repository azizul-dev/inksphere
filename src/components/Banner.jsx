"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { ArrowRight, PencilToSquare } from "@gravity-ui/icons";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

const stats = [
  { num: "10K+", label: "Ebooks" },
  { num: "2.4K", label: "Writers" },
  { num: "50K+", label: "Readers" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-white">

      {/* ── Ambient glows ── */}
      <div className="pointer-events-none absolute -top-48 -left-24 w-[600px] h-[600px]" style={{ background: "radial-gradient(ellipse, rgba(250,204,21,.12) 0%, transparent 65%)" }} />
      <div className="pointer-events-none absolute -bottom-36 -right-24 w-[500px] h-[500px]" style={{ background: "radial-gradient(ellipse, rgba(34,211,238,.1) 0%, transparent 65%)" }} />
      <div className="pointer-events-none absolute top-1/3 left-1/2 w-[400px] h-[400px]" style={{ background: "radial-gradient(ellipse, rgba(37,99,235,.06) 0%, transparent 65%)" }} />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-[1200px] w-full px-5 sm:px-8 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* ── Left Column ── */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" />
            <span className="text-[12px] text-yellow-600 font-medium tracking-wide">
              ✦ Now live — 10,000+ ebooks available
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="text-[clamp(32px,5vw,58px)] font-extrabold leading-[1.08] tracking-[-1.5px] text-gray-900 mb-3"
          >
            Discover &amp; Read
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg,#facc15,#f97316)" }}
            >
              Original
            </span>{" "}
            <span className="text-gray-900">Ebooks</span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg,#22d3ee,#2563eb)" }}
            >
              Worldwide
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.2}
            className="text-[16px] sm:text-[17px] text-gray-500 leading-[1.7] mt-4 mb-8 max-w-[460px]"
          >
            A digital haven where readers meet gifted writers. Browse thousands
            of original ebooks, support creators, and build your personal library.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.3}
            className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10 w-full sm:w-auto"
          >
            <Link href="/ebooks" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto font-bold text-white rounded-xl px-7 h-[52px] transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg,#facc15,#f97316)",
                  boxShadow: "0 4px 24px rgba(249,115,22,.25)",
                }}
                endContent={<ArrowRight size={18} />}
              >
                Browse Ebooks
              </Button>
            </Link>

            <Link href="/auth/register" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="bordered"
                className="w-full sm:w-auto font-semibold rounded-xl px-7 h-[52px] border-gray-200 text-gray-700 hover:border-cyan-400 hover:text-cyan-600 hover:bg-cyan-50 transition-all duration-200"
                endContent={<PencilToSquare size={16} />}
              >
                Start Writing
              </Button>
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.4}
            className="flex items-center gap-6 sm:gap-8"
          >
            {stats.map(({ num, label }, i) => (
              <div key={label} className="flex items-center gap-6 sm:gap-8">
                <div className="flex flex-col gap-0.5">
                  <span
                    className="text-[20px] sm:text-[22px] font-bold bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(90deg,#f97316,#22d3ee)" }}
                  >
                    {num}
                  </span>
                  <span className="text-[11px] text-gray-400 tracking-wide uppercase">
                    {label}
                  </span>
                </div>
                {i < stats.length - 1 && (
                  <div className="w-px h-8 bg-gray-200" />
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right Column — Hero Image ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          {/* Glow behind image */}
          <div
            className="absolute w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(34,211,238,.15) 0%, transparent 70%)" }}
          />

          {/* Main image card */}
          <div
            className="relative z-10 w-[240px] h-[300px] sm:w-[280px] sm:h-[350px] lg:w-[500px] lg:h-[500px] rounded-[24px] overflow-hidden border border-gray-100"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,.08)" }}
          >
            <Image
              src="/images/hero.png"
              alt="InkSphere Hero"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Floating badge — Top Right */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="absolute top-4 -right-2 sm:-right-5 z-20 flex items-center gap-2.5 rounded-xl px-3 sm:px-3.5 py-2 sm:py-2.5 border border-gray-100"
            style={{ background: "rgba(255,255,255,.95)", boxShadow: "0 4px 20px rgba(0,0,0,.08)", backdropFilter: "blur(12px)" }}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-sm sm:text-base" style={{ background: "rgba(250,204,21,.15)" }}>⭐</div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] sm:text-[12px] font-semibold text-gray-800">Top Rated</span>
              <span className="text-[10px] sm:text-[11px] text-gray-400">4.9 / 5 stars</span>
            </div>
          </motion.div>

          {/* Floating badge — Bottom Left */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="absolute bottom-8 -left-2 sm:-left-8 z-20 flex items-center gap-2.5 rounded-xl px-3 sm:px-3.5 py-2 sm:py-2.5 border border-gray-100"
            style={{ background: "rgba(255,255,255,.95)", boxShadow: "0 4px 20px rgba(0,0,0,.08)", backdropFilter: "blur(12px)" }}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-sm sm:text-base" style={{ background: "rgba(34,211,238,.15)" }}>🔥</div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] sm:text-[12px] font-semibold text-gray-800">Trending Now</span>
              <span className="text-[10px] sm:text-[11px] text-gray-400">+230 reads today</span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}