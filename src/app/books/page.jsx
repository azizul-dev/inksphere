import { getPublishedBooks } from "@/lib/api/books";
import EbookCard from "@/components/books/EbookCard";
import FilterBar from "@/components/books/FilterBar";
import PaginationControls from "@/components/books/PaginationControls";

const BrowseEbooksPage = async ({ searchParams }) => {
  const params = await searchParams;

  const { books, totalCount, totalPages, currentPage } =
    await getPublishedBooks({ ...params, limit: 12 });

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-black sm:text-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
          Browse Ebooks
        </h1>
        <p className="mt-2 text-slate-500">{totalCount} ebooks found</p>

        <div className="mt-6">
          <FilterBar />
        </div>

        <div className="mt-8 p-4 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {books?.map((book, index) => (
            <EbookCard key={book._id} book={book} index={index} />
          ))}
        </div>

        {(!books || books.length === 0) && (
          <p className="mt-12 text-center text-slate-500">
            No ebooks match your filters.
          </p>
        )}

        {/* Pagination */}
        <div className="mt-10">
          <PaginationControls
            totalPages={totalPages}
            currentPage={currentPage}
            totalCount={totalCount}
            limit={12}
          />
        </div>
      </div>
    </div>
  );
};

export default BrowseEbooksPage;