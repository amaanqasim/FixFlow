import {
  LayoutDashboard,
  ClipboardList,
  Users,
  BarChart3,
  Brain,
  Sparkles,
  History,
  QrCode,
  Settings,
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

  return (
    <div className="h-screen overflow-hidden bg-slate-100">
      <Navbar />

      {/* DASHBOARD AREA */}
      <div className="flex h-[calc(100vh-64px)]">

        {/* SIDEBAR */}
        <aside className="w-64 shrink-0 h-full bg-[#111111] text-white">

          <div className="p-5">
            <h2 className="text-xl font-bold">
              Admin Panel
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              FixFlow Management
            </p>
          </div>

          <nav className="px-3 space-y-1">

            <a
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800 text-white"
            >
              <LayoutDashboard size={19} />
              Dashboard
            </a>

            <a
              href="/admin/issues"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <ClipboardList size={19} />
              All Issues
            </a>

            <a
              href="/admin/users"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <Users size={19} />
              Manage Users
            </a>

            <a
              href="/admin/analytics"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <BarChart3 size={19} />
              Analytics
            </a>

            <a
              href="/admin/ai-insights"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <Brain size={19} />
              AI Insights
            </a>

            <a
              href="/admin/ai-analysis"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <Sparkles size={19} />
              AI Issue Analysis
            </a>

            <a
              href="/admin/history"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <History size={19} />
              Issue History
            </a>

            <a
              href="/admin/qr"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <QrCode size={19} />
              QR Management
            </a>

            <a
              href="/admin/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <Settings size={19} />
              Settings
            </a>

          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0 h-full overflow-y-auto p-8">

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              Admin Dashboard
            </h1>

            <p className="text-slate-500 mt-1">
              Monitor and manage all FixFlow issues.
            </p>
          </div>

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

            <div className="bg-white rounded-xl shadow-sm p-5">
              <p className="text-sm text-slate-500">
                Total Issues
              </p>

              <p className="text-3xl font-bold text-slate-800 mt-2">
                {totalIssues}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5">
              <p className="text-sm text-slate-500">
                Open Issues
              </p>

              <p className="text-3xl font-bold text-blue-600 mt-2">
                {openIssues}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5">
              <p className="text-sm text-slate-500">
                In Progress
              </p>

              <p className="text-3xl font-bold text-orange-600 mt-2">
                {inProgressIssues}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5">
              <p className="text-sm text-slate-500">
                Resolved
              </p>

              <p className="text-3xl font-bold text-green-600 mt-2">
                {resolvedIssues}
              </p>
            </div>

          </div>

          {/* ISSUE STATUS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

            <div className="bg-white rounded-xl shadow-sm p-6">

              <h2 className="text-lg font-semibold text-slate-800 mb-5">
                Issue Status
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between">
                  <span className="text-slate-600">
                    OPEN
                  </span>

                  <span className="font-semibold">
                    {openIssues}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">
                    ASSIGNED
                  </span>

                  <span className="font-semibold">
                    {assignedIssues}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">
                    IN_PROGRESS
                  </span>

                  <span className="font-semibold">
                    {inProgressIssues}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">
                    RESOLVED
                  </span>

                  <span className="font-semibold">
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

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Critical Issues
                  </p>

                  <p className="text-3xl font-bold text-red-600 mt-2">
                    {criticalIssues}
                  </p>
                </div>

                <div className="text-right">

                  <p className="text-sm text-slate-500">
                    Total Issues
                  </p>

                  <p className="text-3xl font-bold text-slate-800 mt-2">
                    {totalIssues}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* QUICK ACCESS */}
          <div className="bg-white rounded-xl shadow-sm p-6">

            <h2 className="text-lg font-semibold text-slate-800 mb-5">
              Quick Access
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <a
                href="/admin/issues"
                className="border rounded-lg p-4 hover:bg-slate-50"
              >
                <ClipboardList className="mb-2 text-slate-700" />

                <p className="font-semibold text-slate-800">
                  View All Issues
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  Manage reported issues
                </p>
              </a>

              <a
                href="/admin/analytics"
                className="border rounded-lg p-4 hover:bg-slate-50"
              >
                <BarChart3 className="mb-2 text-slate-700" />

                <p className="font-semibold text-slate-800">
                  Analytics
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  View issue statistics
                </p>
              </a>

              <a
                href="/admin/qr"
                className="border rounded-lg p-4 hover:bg-slate-50"
              >
                <QrCode className="mb-2 text-slate-700" />

                <p className="font-semibold text-slate-800">
                  QR Management
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  Manage issue reporting QR codes
                </p>
              </a>

            </div>

          </div>

        </main>

      </div>
    </div>
  );
}

export default AdminDashboard;