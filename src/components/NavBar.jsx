"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HouseFill, BookOpen, CircleDollar } from "@gravity-ui/icons";
import NavLink from "./NavLink";
// If using Next.js, uncomment the line below to use Next.js optimized images:
// import Image from "next/image";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Simulation: Replace this with your actual authentication state
  const [user, setUser] = useState({
    isLoggedIn: false,
    role: "reader", // Options: "reader", "writer", "admin"
  });

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-black/70 text-white backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* LEFT SIDE: Logo stays fixed here */}
        <div className="flex items-center gap-4">
          <button
            className="text-zinc-400 hover:text-white md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Platform Logo using Image Tag */}
          <Link
            href="/"
            className="flex items-center gap-3 font-semibold tracking-wide"
          >
            {/* Replace src="/logo.png" with your actual logo asset path.
              If using Next.js <Image /> component, capitalize it to <Image ... />
            */}
            <Image
              src="/images/logoa.png"
              alt="Fable Logo"
              width={32}
              height={32}
              className="rounded-full object-contain"
              onError={(e) => {
                // Fallback if image asset is missing
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            {/* Fallback visual container if image is missing */}
            <span className="font-bold text-xl">
              <span className="bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Ink
              </span>
              <span className="bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Sphere
              </span>
            </span>
          </Link>
        </div>

        {/* RIGHT SIDE: All links and action items grouped together */}
        <div className="hidden items-center gap-8 md:flex">
          {/* Main Navigation Links */}
          <ul className="flex items-center gap-6 text-sm font-medium text-zinc-400">
            <li>
              <NavLink href="/">
                <HouseFill width={20} height={20} />
              </NavLink>
            </li>

            <li>
              <NavLink href="/books">
                <BookOpen width={20} height={20} />
              </NavLink>
            </li>

            <li></li>
            {/* Dynamic links based on active user role */}
            {user.isLoggedIn && (
              <>
                {user.role === "reader" && (
                  <li>
                    <Link
                      href="/dashboard/library"
                      className="hover:text-white transition-colors"
                    >
                      My Library
                    </Link>
                  </li>
                )}
                {user.role === "writer" && (
                  <li>
                    <Link
                      href="/dashboard/writer"
                      className="hover:text-white transition-colors"
                    >
                      Write Studio
                    </Link>
                  </li>
                )}
                {user.role === "admin" && (
                  <li>
                    <Link
                      href="/dashboard/admin"
                      className="hover:text-white transition-colors"
                    >
                      Admin Panel
                    </Link>
                  </li>
                )}
              </>
            )}
            <li>
              <Link
                href="/pricing"
                className="hover:text-white transition-colors"
              >
                <CircleDollar />
              </Link>
            </li>
          </ul>

          {/* Authentication System */}
          <div className="flex items-center gap-4 text-sm">
            {!user.isLoggedIn ? (
              <>
                {/* Thin vertical spacer line matches your mockup image */}
                <div className="h-4 w-px bg-zinc-800" />
                <Link
                  href="/login"
                  className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="rounded-full bg-white px-4 py-2 font-medium text-black transition-all hover:bg-zinc-200"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <span className="rounded bg-zinc-800 px-2 py-1 text-xs uppercase text-zinc-400">
                  {user.role}
                </span>
                <button
                  onClick={() => setUser({ isLoggedIn: false, role: "reader" })}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="border-t border-zinc-800 bg-black/95 md:hidden">
          <ul className="flex flex-col gap-2 p-4 text-sm font-medium text-zinc-400">
            <li>
              <NavLink href="/">
                <HouseFill width={20} height={20} />
              </NavLink>
            </li>

            <li>
              <NavLink href="/books">
                <BookOpen width={20} height={20} />
              </NavLink>
            </li>

            <li>
              <NavLink href="/pricing">
                <CircleDollar width={20} height={20} />
              </NavLink>
            </li>

            <li>
              <NavLink href="/pricing">
                <CircleDollar width={20} height={20} />
              </NavLink>
            </li>
            {user.isLoggedIn && (
              <>
                {user.role === "reader" && (
                  <li>
                    <Link
                      href="/dashboard/library"
                      className="block py-2 hover:text-white"
                    >
                      My Library
                    </Link>
                  </li>
                )}
                {user.role === "writer" && (
                  <li>
                    <Link
                      href="/dashboard/writer"
                      className="block py-2 hover:text-white"
                    >
                      Write Studio
                    </Link>
                  </li>
                )}
                {user.role === "admin" && (
                  <li>
                    <Link
                      href="/dashboard/admin"
                      className="block py-2 hover:text-white"
                    >
                      Admin Panel
                    </Link>
                  </li>
                )}
              </>
            )}
            <li>
              <Link href="/pricing" className="block py-2 hover:text-white">
                <CircleDollar />
              </Link>
            </li>

            <hr className="my-2 border-zinc-800" />

            {!user.isLoggedIn ? (
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  href="/login"
                  className="block py-2 text-center font-medium text-indigo-400"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="block rounded-full bg-white py-2 text-center font-medium text-black"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <li>
                <button
                  onClick={() => setUser({ isLoggedIn: false, role: "reader" })}
                  className="block w-full py-2 text-left text-red-400 hover:text-red-300"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
