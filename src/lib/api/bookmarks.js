import { protectedFetch } from "../core/server";

export const checkBookmark = async (userId, bookId) => {
  if (!userId || !bookId) return { bookmarked: false };
  return await protectedFetch(
    `/api/bookmarks/check?userId=${userId}&bookId=${bookId}`
  );
};

export const getUserBookmarks = async (userId) => {
  if (!userId) return [];
  return await protectedFetch(`/api/bookmarks?userId=${userId}`);
};