"use server";

import { serverMutation } from "../core/server";

export const createPurchase = async ({
  userId,
  bookId,
  writerId,
  price,
  transactionId,
}) => {
  return await serverMutation("/api/purchases", {
    userId,
    bookId,
    writerId,
    price,
    transactionId,
  });
};