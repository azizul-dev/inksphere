"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllUsers = async () => {
  const res = await fetch(`${baseUrl}/api/users`, { cache: "no-store" });
  return res.json();
};

export const saveUser = async (userData) => {
  const res = await fetch(`${baseUrl}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const getUserByEmail = async (email) => {
  if (!email) return null;
  const res = await fetch(`${baseUrl}/api/users/${email}`, { cache: "no-store" });
  return res.json();
};

export const updateUserRole = async (id, role) => {
  const res = await fetch(`${baseUrl}/api/users/role/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role }),
  });
  return res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${baseUrl}/api/users/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const getUserById = async (id) => {
  if (!id) return null;
  const res = await fetch(`${baseUrl}/api/users/by-id/${id}`, {
    cache: "no-store",
  });
  return res.json();
};