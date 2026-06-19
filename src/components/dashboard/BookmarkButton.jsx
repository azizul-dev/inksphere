"use client";

import { useState } from "react";
import { Bookmark } from "@gravity-ui/icons";
import { addBookmark, removeBookmark } from "@/lib/actions/bookmark";
import { toast } from "react-toastify";

export default function BookmarkButton({ userId, bookId, initialBookmarked }) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!userId) {
      toast.error("Please log in to bookmark books");
      return;
    }

    setLoading(true);
    try {
      if (bookmarked) {
        const result = await removeBookmark(userId, bookId);
        if (result?.acknowledged) {
          setBookmarked(false);
          toast.success("Removed from bookmarks");
        }
      } else {
        const result = await addBookmark(userId, bookId);
        if (result?.acknowledged) {
          setBookmarked(true);
          toast.success("Added to bookmarks");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`flex items-center gap-2 rounded-2xl border px-5 py-3 font-semibold transition-colors disabled:opacity-50 ${
        bookmarked
          ? "border-orange-300 bg-orange-50 text-orange-600"
          : "border-slate-200 text-slate-600 hover:bg-slate-50"
      }`}
    >
      <Bookmark className={`size-5 ${bookmarked ? "fill-orange-500" : ""}`} />
      {bookmarked ? "Bookmarked" : "Bookmark"}
    </button>
  );
}