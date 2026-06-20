import Image from "next/image";
import Link from "next/link";

import { Calendar, ArrowRight } from "@gravity-ui/icons";

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-GB").format(new Date(date));
};

export default function PurchasedBooksGrid({ books }) {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6">
          <p className="text-sm font-medium text-slate-500">Total Books</p>
          <h2 className="mt-3 text-4xl font-black text-slate-800 sm:text-5xl">
            {books.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6">
          <p className="text-sm font-medium text-slate-500">Library Status</p>
          <h2 className="mt-3 text-4xl font-black text-emerald-500 sm:text-5xl">
            Active
          </h2>
        </div>

        <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6">
          <p className="text-sm font-medium text-slate-500">Collection</p>
          <h2 className="mt-3 text-4xl font-black text-orange-500 sm:text-5xl">
            Growing
          </h2>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {books.map((book) => (
          <Link
            key={book._id}
            href={`/books/${book._id}`}
            className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg sm:p-4"
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

            <div className="mt-3 flex justify-center sm:mt-4">
              <span className="rounded-full bg-green-500 px-3 py-1 text-[10px] font-bold text-white">
                Purchased
              </span>
            </div>

            <div className="mt-3 sm:mt-4">
              <h3 className="line-clamp-1 text-base font-bold text-slate-800 sm:text-lg">
                {book.title}
              </h3>

              <p className="mt-1 line-clamp-2 text-xs text-slate-500 sm:text-sm">
                {book.shortDescription}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-black text-orange-500 sm:text-xl">
                  ${book.price}
                </span>

                <span className="flex items-center gap-1 text-xs font-bold text-orange-500">
                  Read
                  <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>

              <div className="mt-3 h-px bg-slate-100" />

              <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                <Calendar className="size-3" />
                {book.purchaseDate && formatDate(book.purchaseDate)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
