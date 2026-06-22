"use client";

import { useSession } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import {
  Person,
  Pencil,
  Star,
  BookOpen,
} from "@gravity-ui/icons";

import { motion } from "framer-motion";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // Fetch real role from Express backend (better-auth admin() plugin
  // blocks client-set roles, so session.user.role is always null)
  const [dbRole, setDbRole] = useState(null);
  useEffect(() => {
    if (!user?.email) return;
    fetch(`${BASE_URL}/api/users/${user.email}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((dbUser) => { if (dbUser?.role) setDbRole(dbUser.role); })
      .catch(() => {});
  }, [user?.email]);

  const role = dbRole || user?.role || null;

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
          className="h-12 w-12 rounded-full border-4 border-orange-200 border-t-orange-500"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-800">
            Not Signed In
          </h2>

          <p className="mt-2 text-slate-500">
            You need to be signed in to view this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 lg:px-8"
    >
      {/* Header */}

      <div className="mb-8">
        <span className="inline-flex rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-1.5 text-sm font-semibold text-white shadow-lg">
          My Account
        </span>

        <h1 className="mt-4 text-3xl font-black md:text-5xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
          Profile
        </h1>

        <p className="mt-3 text-slate-500">
          Manage your account information and activity.
        </p>
      </div>

      {/* Profile Card */}

      <motion.div
        whileHover={{
          y: -4,
        }}
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-[0_20px_60px_rgba(15,23,42,0.08)]
        "
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          {/* Avatar */}

          <div
            className="
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-amber-100
              via-orange-100
              to-red-100
              shadow-inner
            "
          >
            <Person className="size-12 text-orange-500" />
          </div>

          {/* User Info */}

          <div className="flex-1">
            <h2 className="text-2xl font-black text-slate-800">
              {user.name}
            </h2>

            <p className="mt-1 break-all text-slate-500">
              {user.email}
            </p>

            <span
              className="
                mt-3
                inline-flex
                rounded-full
                bg-gradient-to-r
                from-amber-500
                to-orange-500
                px-4
                py-1
                text-xs
                font-bold
                uppercase
                tracking-wide
                text-white
              "
            >
              {role || "—"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Stats */}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Account Status"
          value="Active"
          icon="🚀"
        />

        <StatCard
          title="Member Since"
          value={
            user.createdAt
              ? new Date(user.createdAt).getFullYear()
              : "2026"
          }
          icon="📅"
        />

        <StatCard
          title="Role"
          value={role || "—"}
          icon="⭐"
        />
      </div>

      {/* Role Section */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        className="
          mt-6
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-[0_20px_60px_rgba(15,23,42,0.08)]
        "
      >
        {role === "reader" && (
          <ReaderProfileDetails user={user} />
        )}

        {role === "writer" && (
          <WriterProfileDetails user={user} />
        )}

        {role === "admin" && (
          <AdminProfileDetails user={user} />
        )}
      </motion.div>
    </motion.div>
  );
}

function StatCard({
  title,
  value,
  icon,
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
      "
    >
      <div className="text-2xl">
        {icon}
      </div>

      <p className="mt-3 text-sm text-slate-500">
        {title}
      </p>

      <h3 className="mt-1 text-xl font-black text-slate-800 capitalize">
        {value}
      </h3>
    </motion.div>
  );
}

function ReaderProfileDetails({
  user,
}) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
        <BookOpen className="size-5 text-orange-500" />
        Reading Activity
      </h3>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <InfoCard
          label="Books Purchased"
          value={user.purchasedCount ?? 0}
        />

        <InfoCard
          label="Bookmarked Books"
          value={user.bookmarkCount ?? 0}
        />
      </div>
    </div>
  );
}

function WriterProfileDetails({
  user,
}) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
        <Pencil className="size-5 text-orange-500" />
        Writer Information
      </h3>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <InfoCard
          label="Published Books"
          value={user.publishedCount ?? 0}
        />

        <InfoCard
          label="Total Earnings"
          value={`$${user.earnings ?? 0}`}
        />
      </div>
    </div>
  );
}

function AdminProfileDetails({
  user,
}) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
        <Star className="size-5 text-orange-500" />
        Admin Access
      </h3>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <InfoCard
          label="Permission Level"
          value="Full Access"
        />

        <InfoCard
          label="Joined"
          value={
            user.createdAt
              ? new Date(
                  user.createdAt
                ).toLocaleDateString()
              : "—"
          }
        />
      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <h4 className="mt-2 text-2xl font-black text-slate-800">
        {value}
      </h4>
    </div>
  );
}