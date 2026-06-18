"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, PencilToSquare } from "@gravity-ui/icons";
import { useRef } from "react";

// ── Letter-by-letter reveal ───────────────────────────────────────
function AnimatedWord({ text, gradient, delay = 0 }) {
  return (
    <span className="inline-flex overflow-hidden">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", opacity: 0, rotateX: -90 }}
          animate={{ y: "0%", opacity: 1, rotateX: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.04,
            ease: [0.33, 1, 0.68, 1],
          }}
          style={{ display: "inline-block", backgroundImage: gradient, WebkitBackgroundClip: gradient ? "text" : undefined, WebkitTextFillColor: gradient ? "transparent" : undefined, backgroundClip: gradient ? "text" : undefined, color: gradient ? "transparent" : undefined }}
          className={gradient ? "bg-clip-text text-transparent" : "text-gray-900"}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// ── Magnetic Button ───────────────────────────────────────────────
function MagneticButton({ children, className, style, href, variant }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY, display: "inline-block" }}
      className="w-full sm:w-auto"
    >
      <Link href={href} className="w-full sm:w-auto block">
        <Button size="lg" variant={variant} className={className} style={style}>
          {children}
        </Button>
      </Link>
    </motion.div>
  );
}

// ── Floating Orbs ─────────────────────────────────────────────────
function FloatingOrb({ size, color, x, y, duration, delay }) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full"
      style={{ width: size, height: size, left: x, top: y, background: color, filter: "blur(1px)" }}
      animate={{ y: [0, -18, 0], x: [0, 8, 0], scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ── Stats counter ─────────────────────────────────────────────────
const stats = [
  { num: "10K+", label: "Ebooks" },
  { num: "2.4K", label: "Writers" },
  { num: "50K+", label: "Readers" },
];

// ── Main Component ────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-white">

      {/* ── Ambient glows ── */}
      <div className="pointer-events-none absolute -top-48 -left-24 w-[600px] h-[600px]" style={{ background: "radial-gradient(ellipse, rgba(250,204,21,.1) 0%, transparent 65%)" }} />
      <div className="pointer-events-none absolute -bottom-36 -right-24 w-[500px] h-[500px]" style={{ background: "radial-gradient(ellipse, rgba(34,211,238,.09) 0%, transparent 65%)" }} />

      {/* ── Floating orbs ── */}
      <FloatingOrb size={12} color="rgba(250,204,21,.7)" x="8%" y="20%" duration={4} delay={0} />
      <FloatingOrb size={8} color="rgba(34,211,238,.6)" x="15%" y="70%" duration={5} delay={1} />
      <FloatingOrb size={14} color="rgba(249,115,22,.5)" x="90%" y="15%" duration={6} delay={0.5} />
      <FloatingOrb size={10} color="rgba(37,99,235,.5)" x="85%" y="75%" duration={4.5} delay={1.5} />
      <FloatingOrb size={7} color="rgba(250,204,21,.5)" x="50%" y="5%" duration={5.5} delay={0.8} />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-[1200px] w-full px-5 sm:px-8 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* ── Left Column ── */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

          {/* Badge — slides in from left */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-1.5 mb-6"
          >
            <motion.span
              className="w-1.5 h-1.5 bg-yellow-500 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[12px] text-yellow-600 font-medium tracking-wide">
              ✦ Now live — 10,000+ ebooks available
            </span>
          </motion.div>

          {/* Headline — letter by letter */}
          <h1 className="text-[clamp(32px,5vw,58px)] font-extrabold leading-[1.12] tracking-[-1.5px] mb-3" style={{ perspective: "800px" }}>
            <span className="block">
              <AnimatedWord text="Discover" delay={0.1} />
              {" "}
              <AnimatedWord text="&" delay={0.45} />
              {" "}
              <AnimatedWord text="Read" delay={0.55} />
            </span>
            <span className="block mt-1">
              <AnimatedWord text="Original" gradient="linear-gradient(90deg,#facc15,#f97316)" delay={0.85} />
              {" "}
              <AnimatedWord text="Ebooks" delay={1.2} />
            </span>
            <span className="block mt-1">
              <AnimatedWord text="Worldwide" gradient="linear-gradient(90deg,#22d3ee,#2563eb)" delay={1.55} />
            </span>
          </h1>

          {/* Subtitle — typewriter-ish reveal */}
          <motion.p
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.2, delay: 2, ease: "easeOut" }}
            className="text-[16px] sm:text-[17px] text-gray-500 leading-[1.7] mt-4 mb-8 max-w-[460px]"
          >
            A digital haven where readers meet gifted writers. Browse thousands
            of original ebooks, support creators, and build your personal library.
          </motion.p>

          {/* CTA Buttons — magnetic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10 w-full sm:w-auto"
          >
            <MagneticButton
              href="/ebooks"
              className="w-full sm:w-auto font-bold text-white rounded-xl px-7 h-[52px]"
              style={{ background: "linear-gradient(135deg,#facc15,#f97316)", boxShadow: "0 4px 24px rgba(249,115,22,.25)" }}
            >
              <span className="flex items-center gap-2">Browse Ebooks <ArrowRight size={18} /></span>
            </MagneticButton>

            <MagneticButton
              href="/auth/register"
              variant="bordered"
              className="w-full sm:w-auto font-semibold rounded-xl px-7 h-[52px] border-gray-200 text-gray-700 hover:border-cyan-400 hover:text-cyan-600 hover:bg-cyan-50 transition-all duration-200"
            >
              <span className="flex items-center gap-2">Start Writing <PencilToSquare size={16} /></span>
            </MagneticButton>
          </motion.div>

          {/* Stats — count up feel with stagger */}
          <motion.div
            className="flex items-center gap-6 sm:gap-8"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.15, delayChildren: 2.6 } } }}
          >
            {stats.map(({ num, label }, i) => (
              <div key={label} className="flex items-center gap-6 sm:gap-8">
                <motion.div
                  variants={{ hidden: { opacity: 0, scale: 0.5 }, show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 15 } } }}
                  className="flex flex-col gap-0.5"
                >
                  <span className="text-[20px] sm:text-[22px] font-bold bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg,#f97316,#22d3ee)" }}>
                    {num}
                  </span>
                  <span className="text-[11px] text-gray-400 tracking-wide uppercase">{label}</span>
                </motion.div>
                {i < stats.length - 1 && <div className="w-px h-8 bg-gray-200" />}
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right Column ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
          className="relative flex items-center justify-center"
        >
          {/* Rotating ring */}
          <motion.div
            className="absolute rounded-full border-2 border-dashed"
            style={{ width: 360, height: 360, borderColor: "rgba(250,204,21,.2)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute rounded-full border"
            style={{ width: 300, height: 300, borderColor: "rgba(34,211,238,.15)" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          />

          {/* Glow */}
          <div className="absolute w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(34,211,238,.12) 0%, transparent 70%)" }} />

          {/* Image card */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-[240px] h-[300px] sm:w-[280px] sm:h-[350px] lg:w-[500px] lg:h-[500px] rounded-[24px] overflow-hidden border border-gray-100"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,.1)" }}
          >
            <Image src="/images/hero.png" alt="InkSphere Hero" fill className="object-cover" priority />
          </motion.div>

          {/* Floating badge — Top Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1, type: "spring", stiffness: 260, damping: 18 }}
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
            initial={{ opacity: 0, scale: 0, rotate: 12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1.3, type: "spring", stiffness: 260, damping: 18 }}
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