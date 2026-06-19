const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getWriterBooks = async (writerId) => {
  const res = await fetch(`${baseUrl}/api/books?writerId=${writerId}`);
  return res.json();
};

export const getSingleBook = async (id) => {
  const res = await fetch(`${baseUrl}/api/books/${id}`);
  return res.json();
};

export const getBooksByIds = async (ids) => {
  if (!ids || ids.length === 0) return [];
  const res = await fetch(`${baseUrl}/api/books/by-ids`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
    cache: "no-store",
  });
  return res.json();
};
