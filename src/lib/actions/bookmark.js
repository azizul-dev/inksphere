"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const addBookmark = async (userId, bookId) => {
  const res = await fetch(`${baseUrl}/api/bookmarks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, bookId }),
  });
  return res.json();
};

export const removeBookmark = async (userId, bookId) => {
  const res = await fetch(
    `${baseUrl}/api/bookmarks?userId=${userId}&bookId=${bookId}`,
    { method: "DELETE" }
  );
  return res.json();
};