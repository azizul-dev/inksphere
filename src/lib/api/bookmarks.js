import { serverFetch } from "../core/server";


export const checkBookmark = async (userId, bookId) => {
  if (!userId || !bookId) return { bookmarked: false };
  return await serverFetch(`/api/bookmarks/check?userId=${userId}&bookId=${bookId}`);
};

export const getUserBookmarks = async (userId) => {
  return await serverFetch(`/api/bookmarks?userId=${userId}`);
};