import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Menu,
  ArrowLeft,
  MapPin,
  CalendarDays,
  User,
  Clock,
  CheckCircle2,
  Circle,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function IssueDetails() {
  const navigate = useNavigate();
  const { issueId } = useParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  // Fetch issue details
  useEffect(() => {
    const fetchIssue = async () => {
      const token = localStorage.getItem("fixflowToken");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/issues/${issueId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(data.message || "Failed to fetch issue");
          setIssue(null);
          return;
        }

        setIssue(data.issue || data);
      } catch (error) {
        console.error("Fetch issue error:", error);
        setIssue(null);
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [issueId, navigate]);

  // Fetch issue history
  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("fixflowToken");

      if (!token || !issue) {
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/issues/${issue.issueId}/history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(data.message || "Failed to fetch history");
          return;
        }

        setHistory(data.history || data);
      } catch (error) {
        console.error("Fetch history error:", error);
      }
    };

    fetchHistory();
  }, [issue]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100">
        <Navbar />

        <div className="flex items-center justify-center p-8">
          <p className="text-slate-500">Loading issue details...</p>
        </div>
      </div>
    );
  }

  // Issue not found
  if (!issue) {
    return (
      <div className="min-h-screen bg-slate-100">
        <Navbar />

        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Issue Not Found
          </h1>

          <button
            onClick={() => navigate("/user/issues")}
            className="mt-4 px-5 py-2.5 bg-blue-600 text-white rounded-lg"
          >
            Back to My Issues
          </button>
        </div>
      </div>
    );
  }

  

  const statusSteps = [
    "OPEN",
    "ASSIGNED",
    "IN_PROGRESS",
    "RESOLVED",
    "CLOSED",
  ];

  const currentStatusIndex = statusSteps.indexOf(issue.status);

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

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAction = (action) => {
    return action
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
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

          {/* Mobile menu */}
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-slate-100"
            >
              <Menu size={22} />
            </button>
          </div>

          <div className="p-4 md:p-6 lg:p-8 max-w-6xl">

            {/* Back button */}
            <button
              onClick={() => navigate("/user/issues")}
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-5"
            >
              <ArrowLeft size={17} />
              Back to My Issues
            </button>

            {/* Header */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-7 mb-6">

              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

                <div>
                  <div className="flex flex-wrap items-center gap-3">

                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                      {issue.title}
                    </h1>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                        issue.status
                      )}`}
                    >
                      {issue.status.replace("_", " ")}
                    </span>

                  </div>

                  <p className="text-sm text-slate-400 mt-2">
                    Issue ID: {issue.issueId}
                  </p>
                </div>

                <span
                  className={`self-start px-3 py-1.5 rounded-lg text-sm font-semibold ${getPriorityClass(
                    issue.priority
                  )}`}
                >
                  {issue.priority} PRIORITY
                </span>

              </div>

            </div>

            {/* Main content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Left content */}
              <div className="lg:col-span-2 space-y-6">

                {/* Description */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6">

                  <h2 className="text-lg font-semibold text-slate-900 mb-4">
                    Issue Description
                  </h2>

                  <p className="text-slate-600 leading-7">
                    {issue.description}
                  </p>

                </div>

                {/* Issue information */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6">

                  <h2 className="text-lg font-semibold text-slate-900 mb-5">
                    Issue Information
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    {/* Location */}
                    <div className="flex items-start gap-3">
                      <MapPin
                        size={20}
                        className="text-slate-400 mt-0.5"
                      />

                      <div>
                        <p className="text-xs text-slate-400">
                          Location
                        </p>

                        <p className="text-sm font-medium text-slate-800 mt-1">
                          {issue.location}
                        </p>
                      </div>
                    </div>

                    {/* Reported On */}
                    <div className="flex items-start gap-3">
                      <CalendarDays
                        size={20}
                        className="text-slate-400 mt-0.5"
                      />

                      <div>
                        <p className="text-xs text-slate-400">
                          Reported On
                        </p>

                        <p className="text-sm font-medium text-slate-800 mt-1">
                          {formatDate(issue.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Reported By */}
                    <div className="flex items-start gap-3">
                      <User
                        size={20}
                        className="text-slate-400 mt-0.5"
                      />

                      <div>
                        <p className="text-xs text-slate-400">
                          Reported By
                        </p>

                        <p className="text-sm font-medium text-slate-800 mt-1">
                          {issue.reportedBy}
                        </p>
                      </div>
                    </div>

                    {/* Assigned Staff */}
                    <div className="flex items-start gap-3">
                      <User
                        size={20}
                        className="text-slate-400 mt-0.5"
                      />

                      <div>
                        <p className="text-xs text-slate-400">
                          Assigned Staff
                        </p>

                        <p className="text-sm font-medium text-slate-800 mt-1">
                          {issue.assignedTo || "Not assigned"}
                        </p>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Resolution note */}
                {issue.resolutionNote && (
                  <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6">

                    <h2 className="text-lg font-semibold text-slate-900 mb-4">
                      Resolution Note
                    </h2>

                    <p className="text-slate-600 leading-7">
                      {issue.resolutionNote}
                    </p>

                  </div>
                )}

                {/* Activity history */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6">

                  <h2 className="text-lg font-semibold text-slate-900 mb-6">
                    Activity History
                  </h2>

                  {history.length === 0 ? (
                    <p className="text-sm text-slate-500">
                      No activity history available.
                    </p>
                  ) : (
                    <div className="space-y-6">

                      {history.map((item, index) => (
                        <div
                          key={item.historyId}
                          className="flex gap-4"
                        >

                          <div className="flex flex-col items-center">

                            {index === history.length - 1 ? (
                              <CheckCircle2
                                size={22}
                                className="text-green-600"
                              />
                            ) : (
                              <Circle
                                size={22}
                                className="text-slate-400"
                              />
                            )}

                            {index !== history.length - 1 && (
                              <div className="w-px h-full bg-slate-200 mt-2" />
                            )}

                          </div>

                          <div className="pb-2">

                            <p className="font-medium text-slate-800">
                              {formatAction(item.action)}
                            </p>

                            {item.oldValue && (
                              <p className="text-sm text-slate-500 mt-1">
                                {item.oldValue.replace("_", " ")}
                                {" → "}
                                {item.newValue?.replace("_", " ")}
                              </p>
                            )}

                            {!item.oldValue && item.newValue && (
                              <p className="text-sm text-slate-500 mt-1">
                                Assigned to {item.newValue}
                                </p>
)}
                            
                            

                            <p className="text-xs text-slate-400 mt-2">
                              {formatDate(item.createdAt)}
                            </p>

                          </div>

                        </div>
                      ))}

                    </div>
                  )}

                </div>

              </div>

              {/* Right side - status tracker */}
              <div>

                <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6 lg:sticky lg:top-6">

                  <h2 className="text-lg font-semibold text-slate-900 mb-6">
                    Issue Progress
                  </h2>

                  <div className="space-y-0">

                    {statusSteps.map((status, index) => {
                      const completed =
                        index <= currentStatusIndex;

                      const isCurrent =
                        index === currentStatusIndex;

                      return (
                        <div
                          key={status}
                          className="flex gap-4"
                        >

                          <div className="flex flex-col items-center">

                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center ${
                                completed
                                  ? "bg-blue-600 text-white"
                                  : "bg-slate-100 text-slate-400"
                              }`}
                            >
                              {completed ? (
                                <CheckCircle2 size={19} />
                              ) : (
                                <Clock size={18} />
                              )}
                            </div>

                            {index !== statusSteps.length - 1 && (
                              <div
                                className={`w-0.5 h-12 ${
                                  index < currentStatusIndex
                                    ? "bg-blue-600"
                                    : "bg-slate-200"
                                }`}
                              />
                            )}

                          </div>

                          <div className="pt-1">

                            <p
                              className={`text-sm font-semibold ${
                                completed
                                  ? "text-slate-900"
                                  : "text-slate-400"
                              }`}
                            >
                              {status.replace("_", " ")}
                            </p>

                            {isCurrent && (
                              <p className="text-xs text-blue-600 mt-1">
                                Current Status
                              </p>
                            )}

                          </div>

                        </div>
                      );
                    })}

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

export default IssueDetails;