"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center justify-center rounded-full p-2 transition-all duration-300 ${
        isActive
          ? "bg-yellow-400 text-black shadow-lg shadow-yellow-500/30"
          : "text-zinc-400 hover:bg-yellow-400 hover:text-black"
      }`}
    >
      {children}
    </Link>
  );
}
