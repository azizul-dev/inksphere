import { protectedFetch, serverFetch, serverMutation } from "../core/server";


export const getWriterBooks = async (writerId) => {
  const data = await serverFetch(`/api/books?writerId=${writerId}`);
  return data.books;
};

export const getSingleBook = async (id) => {
  return await protectedFetch(`/api/books/${id}`);
};

export const getBooksByIds = async (ids) => {
  if (!ids || ids.length === 0) return [];
  return await serverMutation("/api/books/by-ids", { ids });
};

export const getPublishedBooks = async (searchParams = {}) => {
  const params = new URLSearchParams({ status: "published", ...searchParams });
  return await serverFetch(`/api/books?${params.toString()}`);
};

export const getAllBooksAdmin = async () => {
  return await serverFetch("/api/books?limit=1000");
};