import Image from "next/image";

import {
  BookOpen,
  CreditCard,
  SquareChartColumn,
  Calendar,
} from "@gravity-ui/icons";

import { getUserSession } from "@/lib/core/session";
import { getWriterSales } from "@/lib/api/purchases";
import { getBooksByIds } from "@/lib/api/books";

async function getSalesData(writerId) {
  const sales = await getWriterSales(writerId);

  if (!Array.isArray(sales) || sales.length === 0) {
    return {
      sales: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }

  const bookIds = sales.map((sale) => sale.bookId);

  const books = await getBooksByIds(bookIds);

  const mergedSales = sales.map((sale) => {
    const book = books.find((item) => item._id === sale.bookId);

    return {
      ...sale,
      bookTitle: book?.title || "Unknown Book",
      bookCover: book?.coverImage,
    };
  });

  const totalRevenue = sales.reduce(
    (sum, sale) => sum + Number(sale.price || 0),
    0,
  );

  return {
    sales: mergedSales,
    totalRevenue,
    totalSales: sales.length,
  };
}

export default async function SalesHistoryPage() {
  const user = await getUserSession();

  if (!user) return null;

  const { sales, totalRevenue, totalSales } = await getSalesData(user.id);

  return (
    <div className="space-y-8 p-4">
      {/* Header */}

      <div>
        <span className="inline-flex rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-600">
          Writer Dashboard
        </span>

        <h1 className="mt-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-3xl font-black text-transparent md:text-5xl">
          Sales History
        </h1>

        <p className="mt-3 text-slate-500">
          Track all ebook sales and revenue performance.
        </p>
      </div>

      {/* Stats */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="group rounded-3xl border border-orange-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Sales</p>

              <h2 className="mt-2 text-4xl font-black text-orange-600">
                {totalSales}
              </h2>
            </div>

            <div className="rounded-2xl bg-orange-100 p-3">
              <BookOpen className="size-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="group rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Revenue</p>

              <h2 className="mt-2 text-4xl font-black text-emerald-600">
                ${totalRevenue.toFixed(2)}
              </h2>
            </div>

            <div className="rounded-2xl bg-emerald-100 p-3">
              <CreditCard className="size-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="group rounded-3xl border border-violet-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Performance</p>

              <h2 className="mt-2 text-4xl font-black text-violet-600">
                Growth
              </h2>
            </div>

            <div className="rounded-2xl bg-violet-100 p-3">
              <SquareChartColumn className="size-6 text-violet-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}

      {!sales.length ? (
        <div className="rounded-[32px] border border-dashed border-orange-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
            <BookOpen className="size-10 text-orange-500" />
          </div>

          <h3 className="mt-5 text-2xl font-bold text-slate-800">
            No Sales Yet
          </h3>

          <p className="mt-2 text-slate-500">
            Your ebook sales will appear here once readers start purchasing.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}

          <div className="hidden overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm lg:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-5 text-left text-sm font-bold">
                      Book
                    </th>

                    <th className="px-6 py-5 text-left text-sm font-bold">
                      Price
                    </th>

                    <th className="px-6 py-5 text-left text-sm font-bold">
                      Date
                    </th>

                    <th className="px-6 py-5 text-left text-sm font-bold">
                      Transaction ID
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {sales.map((sale) => (
                    <tr
                      key={sale._id}
                      className="border-t transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <Image
                            src={sale.bookCover}
                            alt={sale.bookTitle}
                            width={55}
                            height={75}
                            className="rounded-xl object-cover"
                          />

                          <div>
                            <h3 className="font-semibold text-slate-800">
                              {sale.bookTitle}
                            </h3>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 font-bold text-emerald-600">
                        ${Number(sale.price).toFixed(2)}
                      </td>

                      <td className="px-6 py-4 text-slate-500">
                        {new Date(sale.purchaseDate).toLocaleDateString(
                          "en-GB",
                        )}
                      </td>

                      <td className="max-w-[250px] truncate px-6 py-4 text-xs text-slate-400">
                        {sale.transactionId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}

          <div className="grid gap-4 lg:hidden">
            {sales.map((sale) => (
              <div
                key={sale._id}
                className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex gap-4">
                  <Image
                    src={sale.bookCover}
                    alt={sale.bookTitle}
                    width={70}
                    height={100}
                    className="rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 font-bold text-slate-800">
                      {sale.bookTitle}
                    </h3>

                    <p className="mt-2 text-lg font-black text-emerald-600">
                      ${Number(sale.price).toFixed(2)}
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                      <Calendar className="size-3" />

                      {new Date(sale.purchaseDate).toLocaleDateString("en-GB")}
                    </div>

                    <p className="mt-3 break-all text-[11px] text-slate-400">
                      {sale.transactionId}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
