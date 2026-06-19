import EditBookForm from "@/components/dashboard/EditBookForm";
import { getSingleBook } from "@/lib/api/books";

const EditPage = async ({ params }) => {
  const { id } = await params;

  const book = await getSingleBook(id);

  if (!book || book.message) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-red-500">
          Book Not Found
        </h2>
      </div>
    );
  }

  return <EditBookForm book={book} />;
};

export default EditPage;