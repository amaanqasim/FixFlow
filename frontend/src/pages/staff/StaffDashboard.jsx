import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  ClipboardList,
  Clock3,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import StaffSidebar from "../../components/StaffSidebar";
import { issues, users } from "../../data/dummyData";

function StaffDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("fixflowUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const currentStaffId = user?.userId || "STF-001";

  const assignedIssues = issues.filter(
    (issue) => issue.assignedTo === currentStaffId
  );

  const inProgressIssues = assignedIssues.filter(
    (issue) => issue.status === "IN_PROGRESS"
  );

  const resolvedIssues = assignedIssues.filter(
    (issue) =>
      issue.status === "RESOLVED" ||
      issue.status === "CLOSED"
  );

  const criticalIssues = assignedIssues.filter(
    (issue) => issue.priority === "CRITICAL"
  );

  const getStatusClass = (status) => {
    switch (status) {
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

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "LOW":
        return "bg-slate-100 text-slate-600";

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

      <div className="flex">

        <StaffSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0">

          {/* Mobile menu */}
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3">

            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-slate-100"
            >
              <Menu size={22} />
            </button>

          </div>

          <div className="p-4 md:p-6 lg:p-8">

            {/* Heading */}
            <div className="mb-8">

              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Staff Dashboard
              </h1>

              <p className="text-slate-500 mt-1">
                Manage and resolve issues assigned to you.
              </p>

            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

              {/* Assigned */}
              <div className="bg-white rounded-xl border border-slate-200 p-5">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-slate-500">
                      Assigned Issues
                    </p>

                    <p className="text-3xl font-bold text-slate-900 mt-2">
                      {assignedIssues.length}
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                    <ClipboardList size={22} />
                  </div>

                </div>

              </div>

              {/* In Progress */}
              <div className="bg-white rounded-xl border border-slate-200 p-5">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-slate-500">
                      In Progress
                    </p>

                    <p className="text-3xl font-bold text-slate-900 mt-2">
                      {inProgressIssues.length}
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Clock3 size={22} />
                  </div>

                </div>

              </div>

              {/* Resolved */}
              <div className="bg-white rounded-xl border border-slate-200 p-5">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-slate-500">
                      Resolved
                    </p>

                    <p className="text-3xl font-bold text-slate-900 mt-2">
                      {resolvedIssues.length}
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
                      Critical
                    </p>

                    <p className="text-3xl font-bold text-slate-900 mt-2">
                      {criticalIssues.length}
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                    <AlertCircle size={22} />
                  </div>

                </div>

              </div>

            </div>

            {/* Assigned issues */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">

              <div className="p-5 border-b border-slate-200">

                <h2 className="text-lg font-semibold text-slate-900">
                  Assigned Issues
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Issues currently assigned to you
                </p>

              </div>

              <div className="divide-y divide-slate-200">

                {assignedIssues.map((issue) => {

                  const reporter = users.find(
                    (item) =>
                      item.userId === issue.reportedBy
                  );

                  return (
                    <div
                      key={issue.issueId}
                      className="p-5 hover:bg-slate-50 transition"
                    >

                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                        <div>

                          <div className="flex flex-wrap items-center gap-2">

                            <h3 className="font-semibold text-slate-900">
                              {issue.title}
                            </h3>

                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                                issue.status
                              )}`}
                            >
                              {issue.status.replace(
                                "_",
                                " "
                              )}
                            </span>

                          </div>

                          <p className="text-sm text-slate-500 mt-2">
                            {issue.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mt-3">

                            <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                              {issue.category}
                            </span>

                            <span
                              className={`text-xs px-2.5 py-1 rounded-md font-medium ${getPriorityClass(
                                issue.priority
                              )}`}
                            >
                              {issue.priority}
                            </span>

                            <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                              {issue.location}
                            </span>

                          </div>

                          <p className="text-xs text-slate-400 mt-3">
                            Reported by:{" "}
                            {reporter?.name ||
                              issue.reportedBy}
                          </p>

                        </div>

                        <div className="text-left lg:text-right">

  <p className="text-xs text-slate-400">
    Issue ID
  </p>

  <p className="text-sm font-semibold text-slate-700 mt-1">
    {issue.issueId}
  </p>

  <button
    onClick={() => navigate(`/staff/issues/${issue.issueId}`)}
    className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition"
  >
    View Details
  </button>

</div>

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default StaffDashboard;