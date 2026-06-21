"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteBook, toggleBookStatus } from "@/lib/actions/book";

const BooksTable = ({ books }) => {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "published"
        ? "unpublished"
        : "published";

    setLoadingId(id);

    try {
      await toggleBookStatus(id, newStatus);
      router.refresh();
    } catch (error) {
      console.error(error);
    }

    setLoadingId(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "আপনি কি নিশ্চিত এই বইটি ডিলিট করতে চান?"
    );

    if (!confirmDelete) return;

    setLoadingId(id);

    try {
      await deleteBook(id);
      router.refresh();
    } catch (error) {
      console.error(error);
    }

    setLoadingId(null);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "published":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";

      case "sold":
        return "bg-violet-100 text-violet-700 border border-violet-200";

      default:
        return "bg-slate-100 text-slate-700 border border-slate-200";
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Books Management
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage all ebooks across the platform
            </p>
          </div>

          <div className="inline-flex items-center rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
            Total Books: {books.length}
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Title
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Writer
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Price
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr
                  key={book._id}
                  className="border-b transition hover:bg-slate-50"
                >
                  <td className="px-6 py-5">
                    <div className="font-semibold text-slate-800">
                      {book.title}
                    </div>
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {book.writerName}
                  </td>

                  <td className="px-6 py-5 font-medium text-slate-700">
                    ${book.price}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                        book.status
                      )}`}
                    >
                      {book.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-2">
                      <button
                        disabled={loadingId === book._id}
                        onClick={() =>
                          handleToggleStatus(
                            book._id,
                            book.status
                          )
                        }
                        className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600 disabled:opacity-50"
                      >
                        {book.status === "published"
                          ? "Unpublish"
                          : "Publish"}
                      </button>

                      <button
                        disabled={loadingId === book._id}
                        onClick={() =>
                          handleDelete(book._id)
                        }
                        className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {books.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-slate-400"
                  >
                    No books found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile + Tablet Cards */}
      <div className="grid gap-4 lg:hidden">
        {books.map((book) => (
          <div
            key={book._id}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="space-y-4">

              <div>
                <h3 className="line-clamp-2 text-lg font-semibold text-slate-800">
                  {book.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  by {book.writerName}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Price
                </span>

                <span className="font-semibold text-slate-800">
                  ${book.price}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Status
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                    book.status
                  )}`}
                >
                  {book.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  disabled={loadingId === book._id}
                  onClick={() =>
                    handleToggleStatus(
                      book._id,
                      book.status
                    )
                  }
                  className="rounded-xl bg-blue-500 py-3 text-sm font-medium text-white transition hover:bg-blue-600 disabled:opacity-50"
                >
                  {book.status === "published"
                    ? "Unpublish"
                    : "Publish"}
                </button>

                <button
                  disabled={loadingId === book._id}
                  onClick={() =>
                    handleDelete(book._id)
                  }
                  className="rounded-xl bg-red-500 py-3 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {books.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-400">
            No books found
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksTable;