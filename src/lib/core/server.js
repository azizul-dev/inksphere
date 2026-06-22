import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const authHeader = async () => {
  const token = await getUserToken();
  const header = token ? { authorization: `Bearer ${token}` } : {};
  return header;
};

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      ...(await authHeader()), 
    },
    cache: "no-store",
  }); 
  return res.json();
};

export const protectedFetch = async (path) => {
  const res = await fetch(
    `${baseUrl}${path}`,

    {
      headers: await authHeader(),
    },
  );

  return res.json();
};

export const serverMutation = async (path, data, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    ...(data !== null && { body: JSON.stringify(data) }), // ← null check যোগ হলো
  });
  return res.json();
};
