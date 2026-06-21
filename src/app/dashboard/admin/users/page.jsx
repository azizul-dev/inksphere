

import { requireRole } from "@/lib/core/session";
import UsersTable from "./UsersTable";
import { getAllUsers } from "@/lib/actions/user";
 

const AllUsersPage = async () => {
  await requireRole("admin");
  const users = await getAllUsers();

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-1">Manage Users</h1>
      <p className="text-gray-500 mb-6">Total Users: {users.length}</p>

      <UsersTable users={users} />
    </div>
  );
};

export default AllUsersPage;