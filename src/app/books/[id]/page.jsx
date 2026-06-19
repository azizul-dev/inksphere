import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getSingleBook } from "@/lib/api/books";
import { checkBookmark } from "@/lib/api/bookmarks";
import BookmarkButton from "@/components/dashboard/BookmarkButton";
import { CircleCheck } from "@gravity-ui/icons";
import Link from "next/link";

const BookDetailPage = async ({ params }) => {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  const book = await getSingleBook(id);

  if (!book || book.message) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-700">Ebook not found</h2>
          <p className="mt-2 text-slate-500">
            The ebook you are looking for does not exist or was removed.
          </p>
        </div>
      </div>
    );
  }

  const { bookmarked } = await checkBookmark(userId, id);
  const isOwner = userId && book.writerId === userId;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr]">
            {/* ── Cover ── */}
            <div className="relative aspect-[3/4] w-full lg:aspect-auto lg:h-full lg:min-h-[480px]">
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r" />

              <span
                className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold capitalize backdrop-blur-md ${
                  book.status === "published"
                    ? "bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-300/40"
                    : "bg-amber-500/20 text-amber-200 ring-1 ring-amber-300/40"
                }`}
              >
                {book.status}
              </span>
            </div>

            {/* ── Info ── */}
            <div className="flex flex-col p-6 sm:p-8 lg:p-10">
              <span className="w-fit rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                {book.genre}
              </span>

              <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-800 sm:text-4xl">
                {book.title}
              </h1>

              <p className="mt-2 text-sm font-medium text-slate-500">
                by{" "}
                <span className="text-slate-700">
                  {book.writerName || "Unknown Writer"}
                </span>
              </p>

              <p className="mt-6 leading-relaxed text-slate-600">
                {book.shortDescription}
              </p>

              <div className="mt-8 flex items-end justify-between rounded-2xl bg-slate-50 p-5">
                <div>
                  <p className="text-xs font-medium text-slate-400">Price</p>
                  <p className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-3xl font-black text-transparent">
                    ${book.price}
                  </p>
                </div>

                {isOwner && (
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                    <CircleCheck className="size-4" />
                    This is your ebook
                  </div>
                )}
              </div>

              {/* ── Action buttons ── */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {isOwner ? (
                  <button
                    disabled
                    title="You can't buy your own book"
                    className="flex h-14 flex-1 cursor-not-allowed items-center justify-center rounded-2xl bg-slate-200 px-6 font-semibold text-slate-500"
                  >
                    You can not buy your own book
                  </button>
                ) : (
                  <form
                    action="/api/checkout_sessions"
                    method="POST"
                    className="flex-1"
                  >
                    <input type="hidden" name="bookId" value={id} />

                    <button
                      type="submit"
                      className="flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 font-bold text-white"
                    >
                      Buy Now — ${book.price}
                    </button>
                  </form>
                )}

                <BookmarkButton
                  userId={userId}
                  bookId={id}
                  initialBookmarked={bookmarked}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Full content ── */}
        {book.content && (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
            <h2 className="text-xl font-bold text-slate-800">
              About this Ebook
            </h2>
            <p className="mt-4 whitespace-pre-line leading-relaxed text-slate-600">
              {book.content}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetailPage;
