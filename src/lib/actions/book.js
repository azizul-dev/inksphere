"use server";

import { serverFetch, serverMutation } from "../core/server";



export const createNewBook = async (newBookData) => {
  return await serverMutation("/api/books", newBookData);
};

export const deleteBook = async (id) => {
  return await serverMutation(`/api/books/${id}`, null, "DELETE");
};

export const updateBook = async (id, bookData) => {
  return await serverMutation(`/api/books/${id}`, bookData, "PUT");
};

export const getAllBooksAdmin = async () => {
  return await serverFetch("/api/books?limit=1000");
};

export const toggleBookStatus = async (id, status) => {
  return await serverMutation(`/api/books/${id}`, { status }, "PUT");
};