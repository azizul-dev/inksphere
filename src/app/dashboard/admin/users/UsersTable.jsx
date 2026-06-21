"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { deleteUser, updateUserRole } from "@/lib/actions/user";

const UsersTable = ({ users }) => {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);

  const handleRoleChange = async (id, newRole) => {
    setLoadingId(id);

    try {
      await updateUserRole(id, newRole);
      router.refresh();
    } catch (error) {
      console.error(error);
    }

    setLoadingId(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "আপনি কি নিশ্চিত এই ইউজার ডিলিট করতে চান?"
    );

    if (!confirmDelete) return;

    setLoadingId(id);

    try {
      await deleteUser(id);
      router.refresh();
    } catch (error) {
      console.error(error);
    }

    setLoadingId(null);
  };

  const roleStyle = (role) => {
    switch (role) {
      case "admin":
        return "bg-amber-100 text-amber-700 border border-amber-200";
      case "writer":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      default:
        return "bg-slate-100 text-slate-700 border border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              User Management
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage readers, writers and administrators
            </p>
          </div>

          <div className="inline-flex items-center rounded-full bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-700">
            Total Users: {users.length}
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b transition hover:bg-slate-50"
                >
                  <td className="px-6 py-5">
                    <div className="font-semibold text-slate-800">
                      {user.name}
                    </div>
                  </td>

                  <td className="px-6 py-5 text-slate-500">
                    {user.email}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${roleStyle(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <select
                        defaultValue={user.role}
                        disabled={loadingId === user._id}
                        onChange={(e) =>
                          handleRoleChange(
                            user._id,
                            e.target.value
                          )
                        }
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-yellow-400"
                      >
                        <option value="user">User</option>
                        <option value="writer">Writer</option>
                        <option value="admin">Admin</option>
                      </select>

                      <button
                        disabled={loadingId === user._id}
                        onClick={() => handleDelete(user._id)}
                        className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-10 text-center text-slate-400"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile & Tablet Cards */}
      <div className="grid gap-4 md:hidden">
        {users.map((user) => (
          <div
            key={user._id}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-800">
                  {user.name}
                </h3>

                <p className="break-all text-sm text-slate-500">
                  {user.email}
                </p>
              </div>

              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${roleStyle(
                  user.role
                )}`}
              >
                {user.role}
              </span>

              <select
                defaultValue={user.role}
                disabled={loadingId === user._id}
                onChange={(e) =>
                  handleRoleChange(
                    user._id,
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
              >
                <option value="user">User</option>
                <option value="writer">Writer</option>
                <option value="admin">Admin</option>
              </select>

              <button
                disabled={loadingId === user._id}
                onClick={() => handleDelete(user._id)}
                className="w-full rounded-xl bg-red-500 py-3 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-50"
              >
                Delete User
              </button>
            </div>
          </div>
        ))}

        {users.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-400">
            No users found
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersTable;