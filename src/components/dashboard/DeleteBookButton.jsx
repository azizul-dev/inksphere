"use client";

import { useState } from "react";
import { TrashBin } from "@gravity-ui/icons";
import { deleteBook } from "@/lib/actions/book";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function DeleteBookButton({ id, title }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const result = await deleteBook(id);

      if (result.deletedCount > 0) {
        toast.success("Book deleted successfully");
        setOpen(false);
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to delete book");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl p-2 hover:bg-red-50 transition-colors"
      >
        <TrashBin className="size-5 text-red-500" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold">Delete Book</h2>

            <p className="mt-3 text-slate-600">
              Are you sure you want to delete
              <span className="font-semibold"> {title}</span>?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border px-4 py-2"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="rounded-xl bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}