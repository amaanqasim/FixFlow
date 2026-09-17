import { useState } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  BarChart3,
  Brain,
  Settings,
  History,
  Search,
  Filter,
  Eye,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import { issues } from "../../data/dummyData";

function AdminIssues() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.issueId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || issue.status === statusFilter;

    const matchesPriority =
      priorityFilter === "ALL" || issue.priority === priorityFilter;

    const matchesCategory =
      categoryFilter === "ALL" || issue.category === categoryFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesCategory
    );
  });

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-[calc(100vh-64px)] bg-slate-900 text-white">
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <ClipboardList size={24} />
              <h2 className="text-xl font-bold">Admin Panel</h2>
            </div>
          </div>

          <nav className="p-4 space-y-2">
            <a
              href="/admin"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <LayoutDashboard size={19} />
              Dashboard
            </a>

            <a
              href="/admin/issues"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white"
            >
              <ClipboardList size={19} />
              All Issues
            </a>

            <a
              href="/admin/users"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <Users size={19} />
              Manage Users
            </a>

            <a
              href="/admin/analytics"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <BarChart3 size={19} />
              Analytics
            </a>

            <a
              href="/admin/ai-insights"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <Brain size={19} />
              AI Insights
            </a>

            {/* ISSUE HISTORY */}
            <a
              href="/admin/history"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <History size={19} />
              Issue History
            </a>

            <a
              href="/admin/settings"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <Settings size={19} />
              Settings
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              All Issues
            </h1>

            <p className="text-slate-500 mt-1">
              View and manage all reported issues
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search by issue ID, title or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter size={20} className="text-slate-500" />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 border border-slate-300 rounded-lg"
                >
                  <option value="ALL">All Status</option>
                  <option value="OPEN">OPEN</option>
                  <option value="ASSIGNED">ASSIGNED</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="RESOLVED">RESOLVED</option>
                  <option value="CLOSED">CLOSED</option>
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-4 py-3 border border-slate-300 rounded-lg"
                >
                  <option value="ALL">All Priority</option>
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                  <option value="CRITICAL">CRITICAL</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-3 border border-slate-300 rounded-lg"
                >
                  <option value="ALL">All Category</option>
                  <option value="ELECTRICAL">ELECTRICAL</option>
                  <option value="PLUMBING">PLUMBING</option>
                  <option value="INFRASTRUCTURE">INFRASTRUCTURE</option>
                  <option value="CLEANLINESS">CLEANLINESS</option>
                  <option value="FURNITURE">FURNITURE</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>
            </div>
          </div>

          {/* Issues Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800">
                Issues ({filteredIssues.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-5 py-4 text-sm font-semibold text-slate-600">
                      Issue
                    </th>

                    <th className="text-left px-5 py-4 text-sm font-semibold text-slate-600">
                      Category
                    </th>

                    <th className="text-left px-5 py-4 text-sm font-semibold text-slate-600">
                      Priority
                    </th>

                    <th className="text-left px-5 py-4 text-sm font-semibold text-slate-600">
                      Status
                    </th>

                    <th className="text-left px-5 py-4 text-sm font-semibold text-slate-600">
                      Location
                    </th>

                    <th className="text-left px-5 py-4 text-sm font-semibold text-slate-600">
                      Reported By
                    </th>

                    <th className="text-left px-5 py-4 text-sm font-semibold text-slate-600">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredIssues.map((issue) => (
                    <tr
                      key={issue.issueId}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div className="font-medium text-slate-800">
                          {issue.issueId}
                        </div>

                        <div className="text-sm text-slate-500">
                          {issue.title}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {issue.category}
                      </td>

                      <td className="px-5 py-4 text-sm font-medium">
                        {issue.priority}
                      </td>

                      <td className="px-5 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {issue.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {issue.location}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {issue.reportedBy}
                      </td>

                      <td className="px-5 py-4">
                        <a
                          href={`/staff/issues/${issue.issueId}`}
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          <Eye size={17} />
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredIssues.length === 0 && (
              <div className="p-10 text-center text-slate-500">
                No issues found.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminIssues;