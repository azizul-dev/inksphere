"use server";

import { protectedFetch, serverFetch, serverMutation } from "../core/server";

// Public — registration এর সময় user save
export const saveUser = async (userData) => {
  return await serverMutation("/api/users", userData);
};

// Public — login এর সময় user আনা
export const getUserByEmail = async (email) => {
  if (!email) return null;
  return await serverFetch(`/api/users/${email}`);
};

// Admin only — সব users
export const getAllUsers = async () => {
  return await protectedFetch("/api/users");
};

// Admin only — ID দিয়ে user
export const getUserById = async (id) => {
  if (!id) return null;
  return await protectedFetch(`/api/users/by-id/${id}`);
};

// Admin only — role পরিবর্তন
export const updateUserRole = async (id, role) => {
  return await serverMutation(`/api/users/role/${id}`, { role }, "PATCH");
};

// Admin only — user মুছে ফেলা
export const deleteUser = async (id) => {
  return await serverMutation(`/api/users/${id}`, null, "DELETE");
};

// Admin only — ban/unban
export const toggleUserBan = async (id, banned) => {
  return await serverMutation(`/api/users/${id}/ban`, { banned }, "PATCH");
};