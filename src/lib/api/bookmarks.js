const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const checkBookmark = async (userId, bookId) => {
  if (!userId || !bookId) return { bookmarked: false };
  const res = await fetch(
    `${baseUrl}/api/bookmarks/check?userId=${userId}&bookId=${bookId}`,
    { cache: "no-store" }
  );
  return res.json();
};

export const getUserBookmarks = async (userId) => {
  const res = await fetch(`${baseUrl}/api/bookmarks?userId=${userId}`, {
    cache: "no-store",
  });
  return res.json();
};