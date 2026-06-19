"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  ArrowLeft,
  House,
} from "@gravity-ui/icons";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-orange-50 px-4">
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="w-full max-w-xl"
      >
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-12">
          {/* Icon */}

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 shadow-xl">
            <Shield className="size-12 text-white" />
          </div>

          {/* Title */}

          <h1 className="mt-8 text-center text-4xl font-black bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Access Denied
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-slate-500">
            You do not have permission to access this page.
            Please contact the administrator or switch to
            an authorized account.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 font-semibold text-white shadow-lg transition-all hover:scale-[1.02]"
            >
              <House className="size-5" />
              Go Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white font-semibold text-slate-700 transition-all hover:bg-slate-50"
            >
              <ArrowLeft className="size-5" />
              Go Back
            </button>
          </div>

          {/* Footer */}

          <div className="mt-8 rounded-2xl bg-slate-50 p-4 text-center">
            <p className="text-sm text-slate-500">
              Error Code:
              <span className="ml-2 font-bold text-red-500">
                403 Forbidden
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}