"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.08,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15,
      }}
    >
      <Link
        href={href}
        className={`flex items-center justify-center rounded-full p-2 ${
          isActive
            ? "bg-yellow-400 text-black shadow-lg shadow-yellow-500/30"
            : "text-zinc-400 hover:bg-yellow-400 hover:text-black"
        }`}
      >
        {children}
      </Link>
    </motion.div>
  );
}
