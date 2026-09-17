import {
  LayoutDashboard,
  ClipboardList,
  Users,
  BarChart3,
  Brain,
  Settings,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  ShieldCheck,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import { issues, users } from "../../data/dummyData";

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

  const closedIssues = issues.filter(
    (issue) => issue.status === "CLOSED"
  ).length;

  const criticalIssues = issues.filter(
    (issue) => issue.priority === "CRITICAL"
  ).length;

  const staffCount = users.filter(
    (user) => user.role === "STAFF"
  ).length;

  const statusClasses = {
    OPEN: "bg-yellow-100 text-yellow-700",
    ASSIGNED: "bg-blue-100 text-blue-700",
    IN_PROGRESS: "bg-purple-100 text-purple-700",
    RESOLVED: "bg-green-100 text-green-700",
    CLOSED: "bg-slate-100 text-slate-700",
  };

  const priorityClasses = {
    CRITICAL: "bg-red-100 text-red-700",
    HIGH: "bg-orange-100 text-orange-700",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    LOW: "bg-green-100 text-green-700",
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex min-h-[calc(100vh-64px)]">

        {/* Admin Sidebar */}
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
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white text-left">
              <LayoutDashboard size={19} />
              Dashboard
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 text-left">
              <ClipboardList size={19} />
              All Issues
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 text-left">
              <Users size={19} />
              Manage Users
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 text-left">
              <BarChart3 size={19} />
              Analytics
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 text-left">
              <Brain size={19} />
              AI Insights
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 text-left">
              <Settings size={19} />
              Settings
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-hidden">
          <div className="max-w-7xl mx-auto">

            {/* Page Heading */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Admin Dashboard
              </h1>

              <p className="text-slate-500 mt-1">
                Monitor and manage all FixFlow issues.
              </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      Total Issues
                    </p>

                    <p className="text-3xl font-bold text-slate-900 mt-2">
                      {totalIssues}
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <ClipboardList size={22} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      Open Issues
                    </p>

                    <p className="text-3xl font-bold text-slate-900 mt-2">
                      {openIssues}
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center">
                    <AlertCircle size={22} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      In Progress
                    </p>

                    <p className="text-3xl font-bold text-slate-900 mt-2">
                      {inProgressIssues}
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                    <Clock size={22} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      Critical Issues
                    </p>

                    <p className="text-3xl font-bold text-slate-900 mt-2">
                      {criticalIssues}
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                    <AlertCircle size={22} />
                  </div>
                </div>
              </div>

            </div>

            {/* Issue Status Overview */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">

              <div className="mb-5">
                <h2 className="text-lg font-bold text-slate-900">
                  Issue Status Overview
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Current status of all reported issues
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">

                <div className="border border-slate-200 rounded-lg p-4">
                  <p className="text-sm text-slate-500">
                    Open
                  </p>

                  <p className="text-2xl font-bold text-yellow-600 mt-1">
                    {openIssues}
                  </p>
                </div>

                <div className="border border-slate-200 rounded-lg p-4">
                  <p className="text-sm text-slate-500">
                    Assigned
                  </p>

                  <p className="text-2xl font-bold text-blue-600 mt-1">
                    {assignedIssues}
                  </p>
                </div>

                <div className="border border-slate-200 rounded-lg p-4">
                  <p className="text-sm text-slate-500">
                    In Progress
                  </p>

                  <p className="text-2xl font-bold text-purple-600 mt-1">
                    {inProgressIssues}
                  </p>
                </div>

                <div className="border border-slate-200 rounded-lg p-4">
                  <p className="text-sm text-slate-500">
                    Resolved
                  </p>

                  <p className="text-2xl font-bold text-green-600 mt-1">
                    {resolvedIssues}
                  </p>
                </div>

                <div className="border border-slate-200 rounded-lg p-4">
                  <p className="text-sm text-slate-500">
                    Closed
                  </p>

                  <p className="text-2xl font-bold text-slate-700 mt-1">
                    {closedIssues}
                  </p>
                </div>

              </div>
            </div>

            {/* Recent Issues + Quick Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Recent Issues */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200">

                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-lg font-bold text-slate-900">
                    Recent Issues
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Latest reported issues
                  </p>
                </div>

                <div className="divide-y divide-slate-100">

                  {issues.slice(0, 5).map((issue) => (
                    <div
                      key={issue.issueId}
                      className="p-5 hover:bg-slate-50"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                        <div className="min-w-0">

                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-slate-900">
                              {issue.title}
                            </h3>

                            <span className="text-xs text-slate-500">
                              {issue.issueId}
                            </span>
                          </div>

                          <p className="text-sm text-slate-500 mt-1">
                            {issue.location}
                          </p>

                        </div>

                        <div className="flex items-center gap-2 flex-wrap">

                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              priorityClasses[issue.priority] ||
                              "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {issue.priority}
                          </span>

                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              statusClasses[issue.status] ||
                              "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {issue.status}
                          </span>

                        </div>

                      </div>
                    </div>
                  ))}

                </div>
              </div>

              {/* Quick Overview */}
              <div className="bg-white rounded-xl border border-slate-200">

                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-lg font-bold text-slate-900">
                    Quick Overview
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Administrative summary
                  </p>
                </div>

                <div className="p-6 space-y-5">

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                      <Users size={20} />
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Staff Members
                      </p>

                      <p className="font-bold text-slate-900">
                        {staffCount}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                      <CheckCircle size={20} />
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Resolved
                      </p>

                      <p className="font-bold text-slate-900">
                        {resolvedIssues}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                      <XCircle size={20} />
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Closed
                      </p>

                      <p className="font-bold text-slate-900">
                        {closedIssues}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">

                    <p className="text-sm text-slate-500">
                      System Status
                    </p>

                    <div className="flex items-center gap-2 mt-2">

                      <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>

                      <span className="text-sm font-medium text-green-700">
                        All Systems Operational
                      </span>

                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;