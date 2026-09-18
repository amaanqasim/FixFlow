import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  ClipboardList,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";


function MyIssues() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const storedUser = localStorage.getItem("fixflowUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [myIssues, setMyIssues] = useState([]);

useEffect(() => {
  const fetchMyIssues = async () => {
    const token = localStorage.getItem("fixflowToken");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/issues/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      

      if (!response.ok) {
        console.error(data.message || "Failed to fetch issues");
        return;
      }

      setMyIssues(data.issues);
    } catch (error) {
      console.error("Fetch my issues error:", error);
    }
  };

  fetchMyIssues();
}, [navigate]);

  const filteredIssues = myIssues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || issue.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
        return "bg-slate-100 text-slate-600";
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
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                My Issues
              </h1>

              <p className="text-slate-500 mt-1">
                View and track the issues you have reported.
              </p>
            </div>

            {/* Search and filter */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">

                {/* Search */}
                <div className="relative flex-1">
                  <Search
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search issues..."
                    className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Status filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="md:w-52 border border-slate-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="ALL">All Status</option>
                  <option value="OPEN">Open</option>
                  <option value="ASSIGNED">Assigned</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="CLOSED">Closed</option>
                </select>

              </div>
            </div>

            {/* Issues */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">

              <div className="p-5 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">
                  Reported Issues
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  {filteredIssues.length} issue
                  {filteredIssues.length !== 1 ? "s" : ""} found
                </p>
              </div>

              {filteredIssues.length === 0 ? (
                <div className="p-10 text-center">

                  <ClipboardList
                    size={42}
                    className="mx-auto text-slate-300"
                  />

                  <h3 className="text-lg font-semibold text-slate-700 mt-4">
                    No issues found
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Try changing your search or status filter.
                  </p>

                </div>
              ) : (
                <div className="divide-y divide-slate-200">

                  {filteredIssues.map((issue) => (
                    <div
                      key={issue.issueId}
                      onClick={() =>
                        navigate(`/user/issues/${issue.issueId}`)
                      }
                      className="p-5 hover:bg-slate-50 cursor-pointer transition"
                    >

                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                        {/* Issue information */}
                        <div className="min-w-0">

                          <div className="flex flex-wrap items-center gap-2">

                            <h3 className="font-semibold text-slate-900">
                              {issue.title}
                            </h3>

                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                                issue.status
                              )}`}
                            >
                              {issue.status.replace("_", " ")}
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

                        </div>

                        {/* Issue ID */}
                        <div className="text-left lg:text-right shrink-0">

                          <p className="text-xs text-slate-400">
                            Issue ID
                          </p>

                          <p className="text-sm font-semibold text-slate-700 mt-1">
                            {issue.issueId}
                          </p>

                        </div>

                      </div>

                    </div>
                  ))}

                </div>
              )}

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default MyIssues;