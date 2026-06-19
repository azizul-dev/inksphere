import Image from "next/image";
import { Pencil, TrashBin, Eye, CirclePlus } from "@gravity-ui/icons";
import { getWriterBooks } from "@/lib/api/books";
import Link from "next/link";
import DeleteBookButton from "@/components/dashboard/DeleteBookButton";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const session = await auth.api.getSession({
  headers: await headers(),
});

const books = await getWriterBooks(session?.user?.id);

const WriterManageBookPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const books = await getWriterBooks(session?.user?.id);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
      <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
        {/* ───── Header ───── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-black sm:text-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Manage Books
            </h1>
            <p className="mt-1 text-sm text-slate-500 sm:mt-2 sm:text-base">
              Manage your ebooks, drafts and publications.
            </p>
          </div>

          <Link
            href="/dashboard/writer/manage/new"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 font-semibold text-white shadow-lg transition-opacity hover:opacity-90 sm:w-auto"
          >
            <CirclePlus className="size-5" />
            Add New Book
          </Link>
        </div>

        {/* ───── Desktop Table (xl+) ───── */}
        <div className="hidden xl:block">
          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full">
              <thead className="border-b bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                    Book
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                    Genre
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {books?.map((book) => (
                  <tr
                    key={book._id}
                    className="transition-colors duration-200 hover:bg-slate-50"
                  >
                    {/* Book info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-[70px] w-[50px] shrink-0 overflow-hidden rounded-xl">
                          <Image
                            src={book.coverImage}
                            alt={book.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">
                            {book.title}
                          </h3>
                          <p className="mt-0.5 max-w-xs truncate text-sm text-slate-500">
                            {book.shortDescription}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {book.genre}
                    </td>

                    <td className="px-6 py-4 font-semibold text-slate-800">
                      ${book.price}
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={book.status} />
                    </td>

                    <td className="px-6 py-4">
                      <ActionButtons book={book} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ───── Tablet Table (md → xl) ───── */}
        <div className="hidden md:block xl:hidden">
          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full">
              <thead className="border-b bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-bold text-slate-700">
                    Book
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-slate-700">
                    Genre
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-slate-700">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-slate-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {books?.map((book) => (
                  <tr key={book._id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={book.coverImage}
                            alt={book.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-slate-800">
                            {book.title}
                          </h3>
                          <p className="mt-0.5 w-36 truncate text-xs text-slate-500">
                            {book.shortDescription}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {book.genre}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-800">
                      ${book.price}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={book.status} />
                    </td>
                    <td className="px-4 py-3">
                      <ActionButtons size="sm" book={book} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ───── Mobile Cards (< md) ───── */}
        <div className="grid gap-4 md:hidden">
          {books?.map((book) => (
            <div
              key={book._id}
              className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <div className="flex gap-3">
                {/* Cover */}
                <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="line-clamp-2 text-sm font-bold text-slate-800 leading-tight">
                      {book.title}
                    </h3>
                    <StatusBadge status={book.status} />
                  </div>

                  <p className="mt-1 text-xs text-slate-400">{book.genre}</p>
                  <p className="mt-1.5 text-sm font-bold text-orange-500">
                    ${book.price}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-xs text-slate-500 leading-relaxed">
                    {book.shortDescription}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-3 flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                <button className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-200">
                  <Eye className="size-3.5" />
                  View
                </button>
                <button className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-200">
                  <Pencil className="size-3.5" />
                  Edit
                </button>
                <DeleteBookButton id={book._id} title={book.title} />
              </div>
            </div>
          ))}
        </div>

        {/* ───── Empty State ───── */}
        {(!books || books.length === 0) && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50">
              <CirclePlus className="size-8 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-700 sm:text-xl">
              No Books Found
            </h3>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Start publishing your first ebook.
            </p>
            <button className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90">
              <CirclePlus className="size-4" />
              Add Your First Book
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Shared sub-components ── */

const StatusBadge = ({ status }) => (
  <span
    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
      status === "published"
        ? "bg-green-100 text-green-700"
        : "bg-amber-100 text-amber-700"
    }`}
  >
    {status}
  </span>
);

const ActionButtons = ({ size = "md", book }) => {
  const cls = size === "sm" ? "rounded-lg p-1.5" : "rounded-xl p-2";
  const iconCls = size === "sm" ? "size-4" : "size-5";

  return (
    <div className="flex justify-center gap-1.5">
      <button
        className={`${cls} hover:bg-slate-100 transition-colors`}
        title="View"
      >
        <Eye className={iconCls} />
      </button>
      <button
        className={`${cls} hover:bg-slate-100 transition-colors`}
        title="Edit"
      >
        <Pencil className={iconCls} />
      </button>
      <DeleteBookButton id={book._id} title={book.title} />
    </div>
  );
};

export default WriterManageBookPage;
