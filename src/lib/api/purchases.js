import { protectedFetch } from "../core/server";

// কিনেছে কিনা check
export const checkPurchase = async (userId, bookId) => {
  if (!userId || !bookId) return { purchased: false };
  return await protectedFetch(
    `/api/purchases/check?userId=${userId}&bookId=${bookId}`
  );
};

// User এর নিজের purchase history
export const getUserPurchases = async (userId) => {
  if (!userId) return [];
  return await protectedFetch(`/api/purchases?userId=${userId}`);
};

// Writer এর sales history
export const getWriterSales = async (writerId) => {
  if (!writerId) return [];
  return await protectedFetch(`/api/purchases/sales?writerId=${writerId}`);
};

// Admin — সব purchases
export const getAllPurchases = async () => {
  return await protectedFetch("/api/purchases");
};