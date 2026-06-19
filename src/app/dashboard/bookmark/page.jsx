import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getUserBookmarks } from "@/lib/api/bookmarks";
import { getBooksByIds } from "@/lib/api/books";
import { Eye, Bookmark } from "@gravity-ui/icons";
import RemoveBookmarkButton from "@/components/dashboard/RemoveBookmarkButton";



const BookmarkedBooksPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  const bookmarks = await getUserBookmarks(userId);
  const bookIds = bookmarks?.map((b) => b.bookId) || [];
  const books = await getBooksByIds(bookIds);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
      <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-2xl font-black sm:text-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Bookmarked Books
          </h1>
          <p className="mt-1 text-sm text-slate-500 sm:mt-2 sm:text-base">
            Books you have saved for later.
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block">
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
                      <div className="flex justify-center gap-1.5">
                        <Link
                          href={`/dashboard/writer/manage/${book._id}`}
                          className="rounded-xl p-2 hover:bg-slate-100 transition-colors"
                          title="View"
                        >
                          <Eye className="size-5" />
                        </Link>
                        <RemoveBookmarkButton userId={userId} bookId={book._id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="grid gap-4 md:hidden">
          {books?.map((book) => (
            <div
              key={book._id}
              className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex gap-3">
                <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col min-w-0">
                  <h3 className="line-clamp-2 text-sm font-bold text-slate-800">
                    {book.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">{book.genre}</p>
                  <p className="mt-1.5 text-sm font-bold text-orange-500">
                    ${book.price}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                <Link
                  href={`/dashboard/writer/manage/${book._id}`}
                  className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200"
                >
                  <Eye className="size-3.5" />
                  View
                </Link>
                <RemoveBookmarkButton userId={userId} bookId={book._id} />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(!books || books.length === 0) && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50">
              <Bookmark className="size-8 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-700 sm:text-xl">
              No Bookmarks Yet
            </h3>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Books you bookmark will show up here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkedBooksPage;