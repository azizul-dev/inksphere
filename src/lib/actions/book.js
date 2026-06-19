"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const createNewBook = async (newBookData) => {
  const res = await fetch(`${baseUrl}/api/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBookData),
  });
  return res.json();
};

export const deleteBook = async (id) => {
  const res = await fetch(`${baseUrl}/api/books/${id}`, {
    method: "DELETE",
  });

  return res.json();
};

export const updateBook = async (id, bookData) => {
  const res = await fetch(`${baseUrl}/api/books/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  });

  return res.json();
};