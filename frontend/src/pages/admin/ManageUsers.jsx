import { useState } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  BarChart3,
  Brain,
  Settings,
  Search,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/AdminSidebar";
import { users } from "../../data/dummyData";

function ManageUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole =
      roleFilter === "ALL" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              Manage Users
            </h1>

            <p className="text-slate-500 mt-1">
              View and manage all registered users
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search by user ID, name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-lg"
              >
                <option value="ALL">All Roles</option>
                <option value="USER">USER</option>
                <option value="STAFF">STAFF</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800">
                Users ({filteredUsers.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-5 py-4 text-sm font-semibold text-slate-600">
                      User ID
                    </th>

                    <th className="text-left px-5 py-4 text-sm font-semibold text-slate-600">
                      Name
                    </th>

                    <th className="text-left px-5 py-4 text-sm font-semibold text-slate-600">
                      Email
                    </th>

                    <th className="text-left px-5 py-4 text-sm font-semibold text-slate-600">
                      Role
                    </th>

                    <th className="text-left px-5 py-4 text-sm font-semibold text-slate-600">
                      Created At
                    </th>

                    <th className="text-left px-5 py-4 text-sm font-semibold text-slate-600">
                      Updated At
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.userId}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-5 py-4 text-sm font-medium text-slate-800">
                        {user.userId}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-700">
                        {user.name}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {user.email}
                      </td>

                      <td className="px-5 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {user.role}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {user.createdAt}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {user.updatedAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="p-10 text-center text-slate-500">
                No users found.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ManageUsers;