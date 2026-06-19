"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSingleBook } from "@/lib/api/books";
import { updateBook } from "@/lib/actions/book";
import { toast } from "react-toastify";

const genres = [
  "Fiction",
  "Non-Fiction",
  "Fantasy",
  "Sci-Fi",
  "Romance",
  "Thriller",
  "Mystery",
  "Biography",
  "Self-Help",
  "Poetry",
];

const EditBookForm = () => {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    price: "",
    coverImage: "",
    shortDescription: "",
    content: "",
    status: "draft",
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const book = await getSingleBook(id);
        if (book) {
          setFormData({
            title: book.title || "",
            genre: book.genre || "",
            price: book.price || "",
            coverImage: book.coverImage || "",
            shortDescription: book.shortDescription || "",
            content: book.content || "",
            status: book.status || "draft",
          });
        }
      } catch (err) {
        setError("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const result = await updateBook(id, {
        ...formData,
        price: parseFloat(formData.price) || 0,
      });

      if (result?.acknowledged) {
        toast.success("Book updated successfully");
        router.push("/dashboard/writer/manage");
        router.refresh();
      } else {
        toast.error("Failed to update the book");
        setError("Failed to update the book. Please try again.");
      }
    } catch (err) {
      toast.error("Something went wrong while updating the book");
      setError("Something went wrong while updating the book.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading book details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-black sm:text-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Edit Book
          </h1>
          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Update the details of your book below.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {/* Title */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Genre & Price */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Genre
              </label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
              >
                <option value="">Select genre</option>
                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Cover Image URL
            </label>
            <input
              type="url"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
            {formData.coverImage && (
              <img
                src={formData.coverImage}
                alt="Cover preview"
                className="mt-3 h-40 w-28 rounded-xl object-cover border border-slate-200"
              />
            )}
          </div>

          {/* Short Description */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Short Description
            </label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              rows={3}
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Content */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={10}
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookForm;