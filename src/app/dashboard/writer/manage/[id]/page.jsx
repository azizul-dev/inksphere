import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getSingleBook } from "@/lib/api/books";
import { checkBookmark } from "@/lib/api/bookmarks";
import BookmarkButton from "@/components/dashboard/BookmarkButton";
import PurchaseButton from "@/components/dashboard/PurchaseButton";

const BookDetailsPage = async ({ params }) => {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  const book = await getSingleBook(id);

  if (!book || book.message) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Book not found.</p>
      </div>
    );
  }

  const { bookmarked } = await checkBookmark(userId, id);
  const isOwner = userId && book.writerId === userId;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 md:grid-cols-[280px_1fr]">
          {/* Cover */}
          <div className="relative mx-auto h-[380px] w-[260px] overflow-hidden rounded-2xl shadow-md md:mx-0">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span
              className={`mb-3 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                book.status === "published"
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {book.status}
            </span>

            <h1 className="text-3xl font-black text-slate-800 sm:text-4xl">
              {book.title}
            </h1>

            <p className="mt-2 text-sm font-medium text-slate-400">
              {book.genre}
            </p>

            <p className="mt-4 text-2xl font-bold text-orange-500">
              ${book.price}
            </p>

            <p className="mt-4 text-slate-600 leading-relaxed">
              {book.shortDescription}
            </p>

            {/* Action buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <PurchaseButton isOwner={isOwner} price={book.price} />
              <BookmarkButton
                userId={userId}
                bookId={id}
                initialBookmarked={bookmarked}
              />
            </div>
          </div>
        </div>

        {/* Full content / description */}
        {book.content && (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-slate-800">
              About this Book
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

export default BookDetailsPage;