"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, Input, Divider } from "@heroui/react";

// Gravity UI Icons — install: npm install @gravity-ui/icons
import {
  LogoFacebook,
  LogoLinkedin,
  LogoGithub,
  ArrowRight,
} from "@gravity-ui/icons";
import Image from "next/image";

// ── Column data ──────────────────────────────────────────────────
const exploreLinks = [
  { label: "Browse Ebooks", href: "/ebooks" },
  { label: "Featured Titles", href: "/ebooks?filter=featured" },
  { label: "Top Writers", href: "/#top-writers" },
  { label: "Genres", href: "/#genres" },
  { label: "New Releases", href: "/ebooks?sort=newest" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Help Center", href: "/help" },
];

const socialLinks = [
  { icon: LogoFacebook, href: "#", label: "Facebook" },
  { icon: LogoLinkedin, href: "#", label: "LinkedIn" },
  { icon: LogoGithub, href: "#", label: "GitHub" },
];

// ── Sub-components ───────────────────────────────────────────────
function FooterLinkColumn({ title, links }) {
  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[1.2px] uppercase  mb-5">
        {title}
      </p>
      <ul className="flex flex-col gap-3">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="group flex items-center gap-2 text-sm  transition-colors duration-200 hover:text-white/90"

            >
              {/* animated underline accent */}
              <span
                className="block h-px w-0 bg-linear-to-r from-cyan-400 to-blue-600 transition-all duration-200 group-hover:w-3"

              />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Main Footer ──────────────────────────────────────────────────
export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden  border-t border-white/[0.06]">
      {/* ── Decorative top glow line ── */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-[700px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(250,204,21,.4), rgba(249,115,22,.4), rgba(34,211,238,.4), rgba(37,99,235,.4), transparent)",
        }}
      />

      {/* ── Ambient radial glow ── */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-100"
        style={{
          background:
            "radial-gradient(ellipse, rgba(34,211,238,.04) 0%, transparent 70%)",
        }}
      />

      {/* ── Main grid ── */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-5 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-12 pb-12 border-b border-white/[0.06]">
          {/* ── Brand column ── */}
          <div>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 mb-4 w-fit">
              <div
                className="w-10 h-10 rounded-[10px] flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,.25)]"
                style={{
                  background:
                    "linear-gradient(135deg,#facc15,#f97316,#22d3ee,#2563eb)",
                }}
              >
                <Image
                  src="/images/logoa.png"
                  alt="InkSphere Logo"
                  width={40}
                  height={40}
                  className="w-full rounded-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight leading-none">
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(90deg,#facc15,#f97316)",
                  }}
                >
                  Ink
                </span>
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(90deg,#22d3ee,#2563eb)",
                  }}
                >
                  Sphere
                </span>
              </span>
            </Link>

            {/* Active badge */}
            <div className="inline-flex items-center gap-1.5 bg-cyan-400/[0.08] border border-cyan-400/[0.15] rounded-full px-2.5 py-1 mb-4">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
              <span className="text-[11px] text-cyan-600/70">
                Platform Active
              </span>
            </div>

            <p className="text-sm leading-[1.7] mb-6 max-w-[280px]">
              A digital haven for ebook lovers and emerging writers. Discover,
              read, and share original stories from creators worldwide.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/50 transition-all duration-200 hover:bg-cyan-400/[0.12] hover:border-cyan-400/30 hover:text-cyan-400 hover:-translate-y-0.5"
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>

          {/* ── Explore column ── */}
          <FooterLinkColumn title="Explore" links={exploreLinks} />

          {/* ── Company column ── */}
          <FooterLinkColumn title="Company" links={companyLinks} />

          {/* ── Newsletter column ── */}
          <div>
            <p className="text-[11px] font-semibold tracking-[1.2px] uppercase text-white/30 mb-5">
              Newsletter
            </p>
            <p className="text-[13px] text-white/40 leading-relaxed mb-4">
              Get the latest ebooks and author updates delivered to your inbox.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-cyan-400 text-sm">
                <span>✓</span>
                <span>You&apos;re subscribed!</span>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  className="w-full bg-white/[0.05] border border-white/10 hover:border-cyan-400/30 focus:border-cyan-400/40 focus:outline-none rounded-lg px-3 py-2 text-sm text-white/80 placeholder:text-white/30 transition-colors duration-200"
                />
                <Button
                  onPress={handleSubscribe}
                  size="sm"
                  className="
                    w-full font-semibold rounded-lg text-[#0a0a0f]
                    transition-all duration-200 hover:opacity-90 hover:-translate-y-px
                  "
                  style={{
                    background: "linear-gradient(135deg,#facc15,#f97316)",
                  }}
                  endContent={<ArrowRight size={14} />}
                >
                  Subscribe
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[13px] ">
            © {new Date().getFullYear()}{" "}
            <span
              className="font-semibold bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg,#facc15,#22d3ee)",
              }}
            >
              InkSphere
            </span>
            . All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-[13px]  hover:text-white/70 transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
