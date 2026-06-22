import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
const baseUrl = rawBaseUrl.endsWith("/") ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

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
  return handleStatus(res);
};

export const protectedFetch = async (path) => {
  const res = await fetch(
    `${baseUrl}${path}`,

    {
      headers: await authHeader(),
    },
  );

  return handleStatus(res);
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

  return handleStatus(res);
};

const handleStatus = (res) => {
  if (res.status === 401) {
    redirect("/unauthorized");
  } else if (res.status === 403) {
    redirect("/unauthorized");
  }
  return res.json();
};
