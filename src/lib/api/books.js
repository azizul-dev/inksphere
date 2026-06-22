const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getWriterBooks = async (writerId) => {
  const res = await fetch(`${baseUrl}/api/books?writerId=${writerId}`);
  const data = await res.json();
  return data.books; // array বের করে আনা
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

export const getPublishedBooks = async (searchParams = {}) => {
  const params = new URLSearchParams({
    status: "published",
    ...searchParams,
  });

  const res = await fetch(`${baseUrl}/api/books?${params.toString()}`, {
    cache: "no-store",
  });
  return res.json(); 
};

export const getAllBooksAdmin = async () => {
  const res = await fetch(`${baseUrl}/api/books?limit=1000`, {
    cache: "no-store",
  });
  return res.json();
};


