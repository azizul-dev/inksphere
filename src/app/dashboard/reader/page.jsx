import Image from "next/image";
import Link from "next/link";

import { BookOpen, Bookmark, CreditCard, ArrowRight } from "@gravity-ui/icons";

import { getUserSession } from "@/lib/core/session";
import { getUserPurchases } from "@/lib/api/purchases";
import { getUserBookmarks } from "@/lib/api/bookmarks";
import { getBooksByIds } from "@/lib/api/books";

async function getDashboardData(userId) {
  const [purchases, bookmarks] = await Promise.all([
    getUserPurchases(userId),
    getUserBookmarks(userId),
  ]);

  const recentPurchaseIds = purchases.slice(0, 4).map((p) => p.bookId);

  const recentBooks = recentPurchaseIds.length
    ? await getBooksByIds(recentPurchaseIds)
    : [];

  const totalSpent = purchases.reduce(
    (sum, p) => sum + Number(p.price || 0),
    0,
  );

  return {
    totalPurchased: purchases.length,
    totalBookmarks: bookmarks.length,
    totalSpent,
    recentBooks: recentBooks.map((book) => {
      const info = purchases.find((p) => p.bookId === book._id);

      return {
        ...book,
        purchaseDate: info?.purchaseDate,
      };
    }),
  };
}

export default async function ReaderHomePage() {
  const user = await getUserSession();

  if (!user) return null;

  const { totalPurchased, totalBookmarks, totalSpent, recentBooks } =
    await getDashboardData(user.id);

  return (
    <div className="space-y-8 p-4">
      {/* Header */}

      <div className="relative overflow-hidden rounded-[32px] border border-orange-100 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-orange-200/30 blur-3xl" />

        <div className="relative">
          <span className="inline-flex rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-600">
            Reader Dashboard
          </span>

          <h1 className="mt-4 text-3xl font-black md:text-5xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Welcome Back, {user?.name || "Reader"} 👋
          </h1>

          <p className="mt-3 max-w-2xl text-slate-500">
            Track your purchases, manage bookmarks, and continue reading your
            favorite ebooks.
          </p>
        </div>
      </div>

      {/* Stats Cards */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {/* Purchased */}

        <div className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Purchased Books</p>

              <h2 className="mt-3 text-4xl font-black text-slate-900">
                {totalPurchased}
              </h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500">
              <BookOpen className="size-7 text-white" />
            </div>
          </div>
        </div>

        {/* Bookmarks */}

        <div className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Bookmarked Books</p>

              <h2 className="mt-3 text-4xl font-black text-amber-500">
                {totalBookmarks}
              </h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500">
              <Bookmark className="size-7 text-white" />
            </div>
          </div>
        </div>

        {/* Spent */}

        <div className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] md:col-span-2 xl:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Spent</p>

              <h2 className="mt-3 text-4xl font-black text-emerald-500">
                ${totalSpent.toFixed(2)}
              </h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500">
              <CreditCard className="size-7 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Purchases */}

      <div className="rounded-[32px] border border-slate-200 bg-white p-5 md:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.05)]">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900">
              Recent Purchases
            </h2>

            <p className="text-sm text-slate-500">
              Continue reading your latest ebooks.
            </p>
          </div>

          <Link
            href="/dashboard/reader/purchased-books"
            className="hidden md:flex items-center gap-2 rounded-xl border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
          >
            View All
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {!recentBooks.length ? (
          <div className="rounded-3xl border border-dashed border-orange-200 py-14 text-center">
            <BookOpen className="mx-auto size-10 text-orange-400" />

            <h3 className="mt-4 text-lg font-bold">No Purchases Yet</h3>

            <p className="mt-2 text-slate-500">
              Explore and purchase your first ebook.
            </p>

            <Link
              href="/books"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 font-semibold text-white shadow-lg"
            >
              Browse Ebooks
              <ArrowRight className="size-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
            {recentBooks.map((book) => (
              <Link
                key={book._id}
                href={`/books/${book._id}`}
                className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="flex justify-center p-4 md:p-5s">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    width={160}
                    height={220}
                    className="h-40 w-28 rounded-xl object-cover shadow-[0_20px_40px_rgba(0,0,0,0.25)] transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105 sm:h-44 sm:w-32 md:h-52 md:w-36 lg:h-56 lg:w-40"
                  />
                </div>

                <div className="p-4">
                  <h3 className="line-clamp-1 font-bold text-slate-800">
                    {book.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Continue Reading
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
