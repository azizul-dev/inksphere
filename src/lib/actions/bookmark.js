"use server";

import { serverMutation } from "../core/server";



export const addBookmark = async (userId, bookId) => {
  return await serverMutation("/api/bookmarks", { userId, bookId });
};

export const removeBookmark = async (userId, bookId) => {
  return await serverMutation(
    `/api/bookmarks?userId=${userId}&bookId=${bookId}`,
    null,
    "DELETE"
  );
};