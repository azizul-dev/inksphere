
 
import { getAllBooksAdmin } from "@/lib/api/books";
import BooksTable from "./BooksTable";
import { requireRole } from "@/lib/core/session";

const AllBooksPage = async () => {
  await requireRole("admin");
  const books = await getAllBooksAdmin(); // ✅ সরাসরি array

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-1">Manage All Ebooks</h1>
      <p className="text-gray-500 mb-6">Total Books: {books.length}</p>

      <BooksTable books={books} />
    </div>
  );
};

export default AllBooksPage;