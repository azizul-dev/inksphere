"use client";

import { motion } from "framer-motion";
import { useSession } from "@/lib/auth-client";

const stats = [
  {
    title: "Purchased Books",
    value: "12",
    icon: "📚",
  },
  {
    title: "Bookmarked Books",
    value: "08",
    icon: "🔖",
  },
  {
    title: "Currently Reading",
    value: "03",
    icon: "📖",
  },
  {
    title: "Reading Streak",
    value: "14 Days",
    icon: "🔥",
  },
];

const recentBooks = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    progress: 75,
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    progress: 45,
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    progress: 90,
  },
];

export default function DashboardHomePage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        Loading...
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="w-full max-w-screen-2xl mx-auto p-4 md:p-6 lg:p-8">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-6 md:p-10 shadow-[0_20px_60px_rgba(249,115,22,0.35)] mb-8"
      >
        <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

        <div className="relative z-10">
          <p className="text-white/80 text-sm mb-2">
            Welcome Back 👋
          </p>

          <h1 className="text-3xl md:text-5xl font-bold text-white">
            {user?.name}
          </h1>

          <p className="text-white/90 mt-4 max-w-2xl text-sm md:text-base">
            Continue your reading journey, discover inspiring stories,
            and support talented writers from around the world.
          </p>

          <button
            className="mt-6 px-6 py-3 rounded-2xl bg-white text-orange-600 font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Explore New Books →
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              y: -6,
              scale: 1.03,
            }}
            className="group bg-white border border-orange-100 rounded-[28px] p-5 shadow-[0_10px_35px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.15)] transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">
                  {item.title}
                </p>

                <h3 className="text-2xl md:text-3xl font-bold mt-2 text-gray-800">
                  {item.value}
                </h3>
              </div>

              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-3xl">
                {item.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress + Genres */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border border-orange-100 rounded-[30px] p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-xl">
              Reading Progress
            </h2>

            <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-sm font-medium">
              70%
            </span>
          </div>

          <div className="h-4 rounded-full bg-orange-100 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "70%" }}
              transition={{ duration: 1.2 }}
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500"
            />
          </div>

          <p className="text-gray-500 mt-4">
            You have completed 70% of your monthly reading goal.
          </p>
        </motion.div>

        {/* Genres */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border border-orange-100 rounded-[30px] p-6 shadow-lg"
        >
          <h2 className="font-bold text-xl mb-5">
            Favorite Genres
          </h2>

          <div className="flex flex-wrap gap-3">
            {[
              "Fiction",
              "Self Help",
              "Technology",
              "Mystery",
              "Business",
              "Productivity",
            ].map((genre) => (
              <span
                key={genre}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-orange-700 font-medium hover:scale-105 transition"
              >
                {genre}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Books */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-orange-100 rounded-[30px] p-6 shadow-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-xl">
            Continue Reading
          </h2>

          <button className="text-orange-500 font-medium hover:text-orange-600">
            View All
          </button>
        </div>

        <div className="space-y-5">
          {recentBooks.map((book, index) => (
            <motion.div
              key={book.title}
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.15,
              }}
              className="group border border-gray-100 rounded-3xl p-5 hover:border-orange-200 hover:bg-orange-50/40 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {book.title}
                  </h3>

                  <p className="text-gray-500">
                    {book.author}
                  </p>

                  <div className="mt-4 w-full lg:w-80 h-2 bg-orange-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                      style={{
                        width: `${book.progress}%`,
                      }}
                    />
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    {book.progress}% completed
                  </p>
                </div>

                <button
                  className="px-5 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-orange-200 transition-all"
                >
                  Continue Reading
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-8 rounded-[30px] p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-xl"
      >
        <h2 className="text-2xl font-bold">
          Discover Your Next Favorite Book
        </h2>

        <p className="mt-2 text-white/70">
          Thousands of books and stories are waiting for you.
        </p>

        <button className="mt-5 px-5 py-3 rounded-2xl bg-white text-slate-900 font-semibold hover:scale-105 transition">
          Browse Library
        </button>
      </motion.div>
    </div>
  );
}