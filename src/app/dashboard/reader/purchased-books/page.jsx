import Link from "next/link";
import { BookOpen, ArrowRight } from "@gravity-ui/icons";

import PurchasedBooksGrid from "@/components/dashboard/PurchasedBooksGrid";

import { getUserPurchases } from "@/lib/api/purchases";
import { getBooksByIds } from "@/lib/api/books";
import { getUserSession } from "@/lib/core/session";

async function getPurchasedBooks(userId) {
  const purchases = await getUserPurchases(userId);

  if (!purchases?.length) return [];

  const ids = purchases.map((item) => item.bookId);

  const books = await getBooksByIds(ids);

  return books.map((book) => {
    const purchase = purchases.find(
      (item) => item.bookId === book._id
    );

    return {
      ...book,
      purchaseDate: purchase?.purchaseDate,
      price: purchase?.price,
    };
  });
}

export default async function PurchasedBooksPage() {
  const user = await getUserSession();

  if (!user) return null;

  const books = await getPurchasedBooks(user.id);

  if (!books.length) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
            <BookOpen className="size-10 text-orange-500" />
          </div>

          <h1 className="mt-6 text-3xl font-black text-slate-800 sm:text-4xl">
            No Purchased Books
          </h1>

          <p className="mt-3 text-slate-500">
            Start building your ebook collection.
          </p>

          <Link
            href="/books"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            Browse Ebooks
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4 py-6 sm:px-6 md:px-8 lg:px-10 lg:py-8">
      <div>
        <span className="rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-600">
          Reader Dashboard
        </span>

        <h1 className="mt-4 text-3xl font-black bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent md:text-5xl">
          Purchased Books
        </h1>

        <p className="mt-3 text-slate-500">
          Continue reading your purchased ebooks.
        </p>
      </div>

      <PurchasedBooksGrid books={books} />
    </div>
  );
}