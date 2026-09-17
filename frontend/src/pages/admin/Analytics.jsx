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

function Analytics() {
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

  const highPriorityIssues = issues.filter(
    (issue) => issue.priority === "HIGH"
  ).length;

  const categoryCounts = {
    ELECTRICAL: issues.filter(
      (issue) => issue.category === "ELECTRICAL"
    ).length,

    PLUMBING: issues.filter(
      (issue) => issue.category === "PLUMBING"
    ).length,

    INFRASTRUCTURE: issues.filter(
      (issue) => issue.category === "INFRASTRUCTURE"
    ).length,

    CLEANLINESS: issues.filter(
      (issue) => issue.category === "CLEANLINESS"
    ).length,

    FURNITURE: issues.filter(
      (issue) => issue.category === "FURNITURE"
    ).length,

    OTHER: issues.filter(
      (issue) => issue.category === "OTHER"
    ).length,
  };

  const categoryEntries = Object.entries(categoryCounts);

  const maxCategoryCount = Math.max(
    ...categoryEntries.map(([, count]) => count),
    1
  );

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

            {/* Dashboard */}
            <a
              href="/admin"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <LayoutDashboard size={19} />
              Dashboard
            </a>

            {/* All Issues */}
            <a
              href="/admin/issues"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <ClipboardList size={19} />
              All Issues
            </a>

            {/* Manage Users */}
            <a
              href="/admin/users"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <Users size={19} />
              Manage Users
            </a>

            {/* Analytics */}
            <a
              href="/admin/analytics"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white"
            >
              <BarChart3 size={19} />
              Analytics
            </a>

            {/* AI Insights */}
            <a
              href="/admin/ai-insights"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <Brain size={19} />
              AI Insights
            </a>

            {/* Settings */}
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
              Analytics
            </h1>

            <p className="text-slate-500 mt-1">
              Monitor issue trends and system performance
            </p>
          </div>

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

            {/* Total Issues */}
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

            {/* Open Issues */}
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

            {/* In Progress */}
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

            {/* Resolved */}
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

          {/* STATUS OVERVIEW */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">

            <h2 className="text-lg font-semibold text-slate-800 mb-5">
              Issue Status Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

              <div className="border rounded-lg p-4">
                <p className="text-sm text-slate-500">
                  OPEN
                </p>

                <p className="text-2xl font-bold text-red-600 mt-2">
                  {openIssues}
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <p className="text-sm text-slate-500">
                  ASSIGNED
                </p>

                <p className="text-2xl font-bold text-yellow-600 mt-2">
                  {assignedIssues}
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <p className="text-sm text-slate-500">
                  IN_PROGRESS
                </p>

                <p className="text-2xl font-bold text-blue-600 mt-2">
                  {inProgressIssues}
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <p className="text-sm font-bold text-green-600 mt-2">
                  RESOLVED
                </p>

                <p className="text-2xl font-bold text-green-600 mt-2">
                  {resolvedIssues}
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <p className="text-sm text-slate-500">
                  CLOSED
                </p>

                <p className="text-2xl font-bold text-slate-600 mt-2">
                  {closedIssues}
                </p>
              </div>

            </div>
          </div>

          {/* TWO COLUMN SECTION */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            {/* CATEGORY ANALYSIS */}
            <div className="bg-white rounded-xl shadow-sm p-6">

              <h2 className="text-lg font-semibold text-slate-800 mb-6">
                Issues by Category
              </h2>

              <div className="space-y-5">

                {categoryEntries.map(([category, count]) => (
                  <div key={category}>

                    <div className="flex justify-between mb-2">

                      <span className="text-sm font-medium text-slate-700">
                        {category}
                      </span>

                      <span className="text-sm font-semibold text-slate-800">
                        {count}
                      </span>

                    </div>

                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">

                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{
                          width: `${(count / maxCategoryCount) * 100}%`,
                        }}
                      />

                    </div>

                  </div>
                ))}

              </div>
            </div>

            {/* PRIORITY ANALYSIS */}
            <div className="bg-white rounded-xl shadow-sm p-6">

              <h2 className="text-lg font-semibold text-slate-800 mb-6">
                Priority Overview
              </h2>

              <div className="space-y-4">

                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-red-700">
                      CRITICAL
                    </p>

                    <p className="text-sm text-red-600">
                      Immediate attention required
                    </p>
                  </div>

                  <span className="text-2xl font-bold text-red-700">
                    {criticalIssues}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-orange-700">
                      HIGH
                    </p>

                    <p className="text-sm text-orange-600">
                      High priority issues
                    </p>
                  </div>

                  <span className="text-2xl font-bold text-orange-700">
                    {highPriorityIssues}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-yellow-700">
                      MEDIUM
                    </p>

                    <p className="text-sm text-yellow-600">
                      Medium priority issues
                    </p>
                  </div>

                  <span className="text-2xl font-bold text-yellow-700">
                    {
                      issues.filter(
                        (issue) => issue.priority === "MEDIUM"
                      ).length
                    }
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-green-700">
                      LOW
                    </p>

                    <p className="text-sm text-green-600">
                      Low priority issues
                    </p>
                  </div>

                  <span className="text-2xl font-bold text-green-700">
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

        </main>
      </div>
    </div>
  );
}

export default Analytics;