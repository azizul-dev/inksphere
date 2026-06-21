"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createPurchase = async ({
  userId,
  bookId,
  writerId,
  price,
  transactionId,
}) => {
  const res = await fetch(`${baseUrl}/api/purchases`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, bookId, writerId, price, transactionId }),
  });
  return res.json();
};

export const checkPurchase = async (userId, bookId) => {
  if (!userId || !bookId) return { purchased: false };
  const res = await fetch(
    `${baseUrl}/api/purchases/check?userId=${userId}&bookId=${bookId}`,
    { cache: "no-store" },
  );
  return res.json();
};

export const getUserPurchases = async (userId) => {
  if (!userId) return [];
  const res = await fetch(`${baseUrl}/api/purchases?userId=${userId}`, {
    cache: "no-store",
  });
  return res.json();
};

export const getWriterSales = async (writerId) => {
  if (!writerId) return [];
  const res = await fetch(
    `${baseUrl}/api/purchases/sales?writerId=${writerId}`,
    {
      cache: "no-store",
    },
  );
  return res.json();
};

export const getAllPurchases = async () => {
  const res = await fetch(`${baseUrl}/api/purchases`, {
    cache: "no-store",
  });
  return res.json();
};
