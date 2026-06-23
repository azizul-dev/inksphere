"use server";

import { protectedFetch, serverFetch, serverMutation } from "../core/server";

// Public — login ছাড়াও browse করা যাবে
export const getPublishedBooks = async (searchParams = {}) => {
  const params = new URLSearchParams({ status: "published", ...searchParams });
  return await serverFetch(`/api/books?${params.toString()}`);
};

// Public — single book details page
export const getSingleBook = async (id) => {
  return await serverFetch(`/api/books/${id}`);
};

// Public — bookmark/purchased gallery এর জন্য
export const getBooksByIds = async (ids) => {
  if (!ids || ids.length === 0) return [];
  return await serverMutation("/api/books/by-ids", { ids });
};

// Writer only — নিজের বই দেখা
export const getWriterBooks = async (writerId) => {
  const data = await protectedFetch(`/api/books?writerId=${writerId}`);
  return data?.books || [];
};

// Admin only — সব বই দেখা
export const getAllBooksAdmin = async () => {
  const data = await protectedFetch("/api/books?limit=1000");
  return data?.books || [];
};

// Home page — Featured Ebooks (latest 6 published)
export const getFeaturedBooks = async () => {
  const params = new URLSearchParams({
    status: "published",
    limit: 6,
    sort: "newest",
  });
  const data = await serverFetch(`/api/books?${params.toString()}`);
  return data?.books || [];
};

// Home page — Top Writers (most sales)
export const getTopWriters = async () => {
  return await serverFetch("/api/writers/top");
};
