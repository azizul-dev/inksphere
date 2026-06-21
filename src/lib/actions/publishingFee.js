"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createPublishingFeePayment = async ({
  userId,
  email,
  amount,
  transactionId,
}) => {
  const res = await fetch(`${baseUrl}/api/publishing-fee`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, email, amount, transactionId }),
  });
  return res.json();
};

export const checkPublishingFeePaid = async (userId) => {
  if (!userId) return { paid: false };
  const res = await fetch(
    `${baseUrl}/api/publishing-fee/check?userId=${userId}`,
    { cache: "no-store" }
  );
  return res.json();
};

export const getAllPublishingFees = async () => {
  const res = await fetch(`${baseUrl}/api/publishing-fee`, {
    cache: "no-store",
  });
  return res.json();
};