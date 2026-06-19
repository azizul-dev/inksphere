const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getWriterBooks = async (writerId) => {
  const res = await fetch(`${baseUrl}/api/books?writerId=${writerId}`);
  return res.json();
};

export const getSingleBook = async (id) => {
  const res = await fetch(`${baseUrl}/api/books/${id}`);
  return res.json();
};