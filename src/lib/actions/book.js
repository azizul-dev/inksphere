"use server";

import { serverMutation } from "../core/server";

// Writer — নতুন বই তৈরি
export const createNewBook = async (newBookData) => {
  return await serverMutation("/api/books", newBookData);
};

// Writer/Admin — বই মুছে ফেলা
export const deleteBook = async (id) => {
  return await serverMutation(`/api/books/${id}`, null, "DELETE");
};

// Writer/Admin — বই আপডেট
export const updateBook = async (id, bookData) => {
  return await serverMutation(`/api/books/${id}`, bookData, "PUT");
};

// Admin — বই publish/unpublish
export const toggleBookStatus = async (id, status) => {
  return await serverMutation(`/api/books/${id}`, { status }, "PUT");
};