"use server";

import { serverFetch, serverMutation } from "../core/server";

 

export const createPurchase = async ({
  userId, bookId, writerId, price, transactionId,
}) => {
  return await serverMutation("/api/purchases", {
    userId, bookId, writerId, price, transactionId,
  });
};

export const checkPurchase = async (userId, bookId) => {
  if (!userId || !bookId) return { purchased: false };
  return await serverFetch(`/api/purchases/check?userId=${userId}&bookId=${bookId}`);
};

export const getUserPurchases = async (userId) => {
  if (!userId) return [];
  return await serverFetch(`/api/purchases?userId=${userId}`);
};

export const getWriterSales = async (writerId) => {
  if (!writerId) return [];
  return await serverFetch(`/api/purchases/sales?writerId=${writerId}`);
};

export const getAllPurchases = async () => {
  return await serverFetch("/api/purchases");
};