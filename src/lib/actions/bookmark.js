"use server";

import { serverMutation } from "../core/server";

// Bookmark যোগ করা
export const addBookmark = async (userId, bookId) => {
  return await serverMutation("/api/bookmarks", { userId, bookId });
};

// Bookmark সরানো
export const removeBookmark = async (userId, bookId) => {
  return await serverMutation(
    `/api/bookmarks?userId=${userId}&bookId=${bookId}`,
    null,
    "DELETE"
  );
};