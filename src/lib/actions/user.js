"use server";

import { serverFetch, serverMutation } from "../core/server";



export const getAllUsers = async () => {
  return await serverFetch("/api/users");
};

export const saveUser = async (userData) => {
  return await serverMutation("/api/users", userData);
};

export const getUserByEmail = async (email) => {
  if (!email) return null;
  return await serverFetch(`/api/users/${email}`);
};

export const updateUserRole = async (id, role) => {
  return await serverMutation(`/api/users/role/${id}`, { role }, "PATCH");
};

export const deleteUser = async (id) => {
  return await serverMutation(`/api/users/${id}`, null, "DELETE");
};

export const getUserById = async (id) => {
  if (!id) return null;
  return await serverFetch(`/api/users/by-id/${id}`);
};

export const toggleUserBan = async (id, banned) => {
  return await serverMutation(`/api/users/${id}/ban`, { banned }, "PATCH");
};