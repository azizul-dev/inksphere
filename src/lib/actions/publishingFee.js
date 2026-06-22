"use server";

import { serverFetch, serverMutation } from "../core/server";



export const createPublishingFeePayment = async ({
  userId, email, amount, transactionId,
}) => {
  return await serverMutation("/api/publishing-fee", {
    userId, email, amount, transactionId,
  });
};

export const checkPublishingFeePaid = async (userId) => {
  if (!userId) return { paid: false };
  return await serverFetch(`/api/publishing-fee/check?userId=${userId}`);
};

export const getAllPublishingFees = async () => {
  return await serverFetch("/api/publishing-fee");
};