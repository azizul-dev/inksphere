"use client";

import { useState } from "react";
import { TrashBin } from "@gravity-ui/icons";
import { removeBookmark } from "@/lib/actions/bookmark";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function RemoveBookmarkButton({ userId, bookId }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRemove = async () => {
    setLoading(true);
    try {
      const result = await removeBookmark(userId, bookId);
      if (result?.acknowledged) {
        toast.success("Bookmark removed");
        router.refresh();
      } else {
        toast.error("Failed to remove bookmark");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleRemove}
      disabled={loading}
      title="Remove bookmark"
      className="rounded-xl p-2 hover:bg-red-50 transition-colors disabled:opacity-50"
    >
      <TrashBin className="size-5 text-red-500" />
    </button>
  );
}