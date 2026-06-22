"use server";

import { protectedFetch, serverMutation } from "../core/server";

// Writer হওয়ার fee payment
export const createPublishingFeePayment = async ({
  userId,
  email,
  amount,
  transactionId,
}) => {
  return await serverMutation("/api/publishing-fee", {
    userId,
    email,
    amount,
    transactionId,
  });
};

// Fee দিয়েছে কিনা check
export const checkPublishingFeePaid = async (userId) => {
  if (!userId) return { paid: false };
  return await protectedFetch(`/api/publishing-fee/check?userId=${userId}`);
};

// Admin — সব publishing fees
export const getAllPublishingFees = async () => {
  return await protectedFetch("/api/publishing-fee");
};