import {
  LayoutDashboard,
  ClipboardList,
  Users,
  BarChart3,
  Brain,
  Settings,
  ShieldCheck,
  AlertCircle,
  CheckCircle,
  Clock,
  Activity,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import { issues } from "../../data/dummyData";

function AdminDashboard() {
  const totalIssues = issues.length;

  const openIssues = issues.filter(
    (issue) => issue.status === "OPEN"
  ).length;

  const assignedIssues = issues.filter(
    (issue) => issue.status === "ASSIGNED"
  ).length;

  const inProgressIssues = issues.filter(
    (issue) => issue.status === "IN_PROGRESS"
  ).length;

  const resolvedIssues = issues.filter(
    (issue) => issue.status === "RESOLVED"
  ).length;

  const criticalIssues = issues.filter(
    (issue) => issue.priority === "CRITICAL"
  ).length;

  const highPriorityIssues = issues.filter(
    (issue) => issue.priority === "HIGH"
  ).length;

  const recentIssues = [...issues]
    .sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 5);

  const getStatusClass = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-red-100 text-red-700";
      case "ASSIGNED":
        return "bg-yellow-100 text-yellow-700";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700";
      case "RESOLVED":
        return "bg-green-100 text-green-700";
      case "CLOSED":
        return "bg-slate-200 text-slate-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "LOW":
        return "bg-green-100 text-green-700";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-700";
      case "HIGH":
        return "bg-orange-100 text-orange-700";
      case "CRITICAL":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex min-h-[calc(100vh-64px)]">

        {/* SIDEBAR */}
        <aside className="w-64 shrink-0 bg-slate-900 text-white flex flex-col">

          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h2 className="font-bold text-lg">
                  Admin Panel
                </h2>

                <p className="text-xs text-slate-400">
                  FixFlow Management
                </p>
              </div>

            </div>
          </div>

          <nav className="p-4 space-y-2">

            {/* DASHBOARD */}
            <a
              href="/admin"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white"
            >
              <LayoutDashboard size={19} />
              Dashboard
            </a>

            {/* ALL ISSUES */}
            <a
              href="/admin/issues"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <ClipboardList size={19} />
              All Issues
            </a>

            {/* MANAGE USERS */}
            <a
              href="/admin/users"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <Users size={19} />
              Manage Users
            </a>

            {/* ANALYTICS */}
            <a
              href="/admin/analytics"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <BarChart3 size={19} />
              Analytics
            </a>

            {/* AI INSIGHTS */}
            <a
              href="/admin/ai-insights"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <Brain size={19} />
              AI Insights
            </a>

            {/* SETTINGS */}
            <a
              href="/admin/settings"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <Settings size={19} />
              Settings
            </a>

          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">

          {/* HEADER */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800">
              Admin Dashboard
            </h1>

            <p className="text-slate-500 mt-1">
              Monitor and manage the FixFlow issue management system
            </p>
          </div>

          {/* STAT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

            {/* TOTAL */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Total Issues
                  </p>

                  <h2 className="text-3xl font-bold text-slate-800 mt-2">
                    {totalIssues}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Activity size={24} />
                </div>

              </div>
            </div>

            {/* OPEN */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Open Issues
                  </p>

                  <h2 className="text-3xl font-bold text-slate-800 mt-2">
                    {openIssues}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                  <AlertCircle size={24} />
                </div>

              </div>
            </div>

            {/* IN PROGRESS */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    In Progress
                  </p>

                  <h2 className="text-3xl font-bold text-slate-800 mt-2">
                    {inProgressIssues}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
                  <Clock size={24} />
                </div>

              </div>
            </div>

            {/* RESOLVED */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Resolved
                  </p>

                  <h2 className="text-3xl font-bold text-slate-800 mt-2">
                    {resolvedIssues}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                  <CheckCircle size={24} />
                </div>

              </div>
            </div>

          </div>

          {/* ISSUE OVERVIEW */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

            {/* STATUS */}
            <div className="bg-white rounded-xl shadow-sm p-6">

              <h2 className="text-lg font-semibold text-slate-800 mb-5">
                Issue Status Overview
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between items-center">
                  <span className="text-slate-600">
                    OPEN
                  </span>

                  <span className="font-bold text-red-600">
                    {openIssues}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-600">
                    ASSIGNED
                  </span>

                  <span className="font-bold text-yellow-600">
                    {assignedIssues}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-600">
                    IN_PROGRESS
                  </span>

                  <span className="font-bold text-blue-600">
                    {inProgressIssues}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-600">
                    RESOLVED
                  </span>

                  <span className="font-bold text-green-600">
                    {resolvedIssues}
                  </span>
                </div>

              </div>
            </div>

            {/* PRIORITY */}
            <div className="bg-white rounded-xl shadow-sm p-6">

              <h2 className="text-lg font-semibold text-slate-800 mb-5">
                Priority Overview
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between items-center">
                  <span className="text-slate-600">
                    CRITICAL
                  </span>

                  <span className="font-bold text-red-600">
                    {criticalIssues}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-600">
                    HIGH
                  </span>

                  <span className="font-bold text-orange-600">
                    {highPriorityIssues}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-600">
                    MEDIUM
                  </span>

                  <span className="font-bold text-yellow-600">
                    {
                      issues.filter(
                        (issue) => issue.priority === "MEDIUM"
                      ).length
                    }
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-600">
                    LOW
                  </span>

                  <span className="font-bold text-green-600">
                    {
                      issues.filter(
                        (issue) => issue.priority === "LOW"
                      ).length
                    }
                  </span>
                </div>

              </div>
            </div>

          </div>

          {/* RECENT ISSUES */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">

            <div className="px-6 py-5 border-b border-slate-200">

              <h2 className="text-lg font-semibold text-slate-800">
                Recent Issues
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Latest issues reported in FixFlow
              </p>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-slate-50">

                  <tr>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Issue
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Category
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Priority
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Status
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Location
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {recentIssues.map((issue) => (

                    <tr
                      key={issue.issueId}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >

                      <td className="px-6 py-4">

                        <p className="font-semibold text-slate-800">
                          {issue.issueId}
                        </p>

                        <p className="text-slate-500">
                          {issue.title}
                        </p>

                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {issue.category}
                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityClass(
                            issue.priority
                          )}`}
                        >
                          {issue.priority}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                            issue.status
                          )}`}
                        >
                          {issue.status}
                        </span>

                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {issue.location}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;