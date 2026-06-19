"use client";

import { useState } from "react";
import { ToggleOff, ToggleOn } from "@gravity-ui/icons";
import { updateBook } from "@/lib/actions/book";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function PublishToggleButton({ id, status, size = "md" }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isPublished = status === "published";
  const cls = size === "sm" ? "rounded-lg p-1.5" : "rounded-xl p-2";
  const iconCls = size === "sm" ? "size-4" : "size-5";

  const handleToggle = async () => {
    setLoading(true);
    const newStatus = isPublished ? "draft" : "published";

    try {
      const result = await updateBook(id, { status: newStatus });

      if (result?.acknowledged) {
        toast.success(
          newStatus === "published"
            ? "Book published successfully"
            : "Book unpublished"
        );
        router.refresh();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      title={isPublished ? "Unpublish" : "Publish"}
      className={`${cls} transition-colors disabled:opacity-50 ${
        isPublished
          ? "text-green-600 hover:bg-green-50"
          : "text-slate-400 hover:bg-slate-100"
      }`}
    >
      {isPublished ? (
        <ToggleOn className={iconCls} />
      ) : (
        <ToggleOff className={iconCls} />
      )}
    </button>
  );
}