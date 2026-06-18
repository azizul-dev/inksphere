"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  HouseFill,
  BookOpen,
  CircleDollar,
  ArrowRightFromSquare,
  ArrowShapeLeftFromLine,
} from "@gravity-ui/icons";
import NavLink from "./NavLink";
import { useSession, signOut } from "@/lib/auth-client";
// If using Next.js, uncomment the line below to use Next.js optimized images:
// import Image from "next/image";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  // console.log("Session data in Navbar", session, "is pending", isPending)
  const user = session?.user;

  // Simulation: Replace this with your actual authentication state

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-cyan-800 text-white backdrop-blur-lg">
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
            {user && (
              <>
                {user.role === "reader" && (
                  <li>
                    <Link
                      href="/dashboard/writer"
                      className="hover:text-white transition-colors"
                    >
                      Dashboard
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
              <NavLink href="/pricing">
                <CircleDollar width={20} height={20} />
              </NavLink>
            </li>
          </ul>

          <div className="h-10 w-px bg-gradient-to-b from-transparent via-yellow-600/50 to-transparent" />

          {/* Authentication System */}
          <div className="flex items-center gap-4 text-sm">
            {!user ? (
              <>
                <div className="h-4 w-px" />

                <Link
                  href="/auth/signin"
                  className="font-medium text-black hover-indigo-300"
                >
                  <div className=" flex justify-center items-center gap-2">
                    <ArrowShapeLeftFromLine />
                    <span>Login</span>
                  </div>
                </Link>

                <Link
                  href="/auth/signup"
                  className="rounded-full  px-4 py-2 font-medium text-black"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <span className="font-medium text-black">Hi.{user.name}</span>

                <button
                  onClick={async () => await signOut()}
                  className="text-red-400 hover:text-red-300"
                >
                  <ArrowRightFromSquare />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="border-t border-y-lime-500 md:hidden">
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

            {user && (
              <>
                {user.role === "reader" && (
                  <li>
                    <Link
                      href="/dashboard/writer"
                      className="block py-2 hover:text-white"
                    >
                     Dashboard
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
              <NavLink href="/pricing">
                <CircleDollar width={20} height={20} />
              </NavLink>
            </li>

            <hr className="my-2 border-zinc-800" />

            {!user ? (
              <div className="flex items-center gap-4 text-sm">
                {!user ? (
                  <>
                    <div className="h-4 w-px" />

                    <Link
                      href="/auth/signin"
                      className="font-medium text-black hover-indigo-300"
                    >
                      <div className=" flex justify-center items-center gap-2">
                        <ArrowShapeLeftFromLine />
                        <span>Login</span>
                      </div>
                    </Link>

                    <Link
                      href="/auth/signup"
                      className="rounded-full  px-4 py-2 font-medium text-black"
                    >
                      Get Started
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-black">
                      Hi.{user.name}
                    </span>

                    <button
                      onClick={async () => await signOut()}
                      className="text-red-400 hover:text-red-300"
                    >
                      <ArrowRightFromSquare />
                    </button>
                  </div>
                )}
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
