import { useState } from "react";
import {
  Menu,
  ClipboardList,
  Clock3,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { issues } from "../../data/dummyData";

function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentUserId = "USR-001";

  const myIssues = issues.filter(
    (issue) => issue.reportedBy === currentUserId
  );

  const totalIssues = myIssues.length;

  const openIssues = myIssues.filter(
    (issue) =>
      issue.status === "OPEN" ||
      issue.status === "ASSIGNED" ||
      issue.status === "IN_PROGRESS"
  ).length;

  const resolvedIssues = myIssues.filter(
    (issue) =>
      issue.status === "RESOLVED" ||
      issue.status === "CLOSED"
  ).length;

  const criticalIssues = myIssues.filter(
    (issue) => issue.priority === "CRITICAL"
  ).length;

  const getStatusClass = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-slate-100 text-slate-700";

      case "ASSIGNED":
        return "bg-purple-100 text-purple-700";

      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700";

      case "RESOLVED":
        return "bg-green-100 text-green-700";

      case "CLOSED":
        return "bg-gray-200 text-gray-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0">
          {/* Mobile menu button */}
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-slate-100"
            >
              <Menu size={22} />
            </button>
          </div>

          <div className="p-4 md:p-6 lg:p-8">

            {/* Page heading */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                User Dashboard
              </h1>

              <p className="text-slate-500 mt-1">
                Track your reported issues and their progress.
              </p>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

              {/* Total */}
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

                  <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <ClipboardList size={22} />
                  </div>
                </div>
              </div>

              {/* Open */}
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      Active Issues
                    </p>

                    <p className="text-3xl font-bold text-slate-900 mt-2">
                      {openIssues}
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center">
                    <Clock3 size={22} />
                  </div>
                </div>
              </div>

              {/* Resolved */}
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      Resolved Issues
                    </p>

                    <p className="text-3xl font-bold text-slate-900 mt-2">
                      {resolvedIssues}
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                    <CheckCircle2 size={22} />
                  </div>
                </div>
              </div>

              {/* Critical */}
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

                  <div className="w-11 h-11 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                    <AlertCircle size={22} />
                  </div>
                </div>
              </div>

            </div>

            {/* Recent issues */}
            <div className="bg-white rounded-xl border border-slate-200">

              <div className="flex items-center justify-between p-5 border-b border-slate-200">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Recent Issues
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Your recently reported issues
                  </p>
                </div>
              </div>

              <div className="divide-y divide-slate-200">

                {myIssues.slice(0, 5).map((issue) => (
                  <div
                    key={issue.issueId}
                    className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {issue.title}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        {issue.location}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {issue.category} • {issue.priority}
                      </p>
                    </div>

                    <div>
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                          issue.status
                        )}`}
                      >
                        {issue.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                ))}

              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default UserDashboard;