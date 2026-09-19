import { useEffect, useState } from "react";
import {

  Search,
  Filter,
  Eye,
} from "lucide-react";
import AdminSidebar from "../../components/AdminSidebar";
import Navbar from "../../components/Navbar";

function AdminIssues() {
  const [issues, setIssues] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // FETCH ALL ISSUES
  // --------------------------------------------------
  useEffect(() => {
    const fetchIssues = async () => {
      const token = localStorage.getItem("fixflowToken");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/issues",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch issues."
          );
        }

        setIssues(data.issues || []);
      } catch (error) {
        console.error("Fetch admin issues error:", error);

        setError(
          error.message ||
            "Failed to load issues. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  // --------------------------------------------------
  // FILTER ISSUES
  // --------------------------------------------------
  const filteredIssues = issues.filter((issue) => {
    const issueId = String(
      issue.issueId || ""
    ).toLowerCase();

    const title = String(
      issue.title || ""
    ).toLowerCase();

    const location = String(
      issue.location || ""
    ).toLowerCase();

    const search = searchTerm.toLowerCase();

    const matchesSearch =
      issueId.includes(search) ||
      title.includes(search) ||
      location.includes(search);

    const matchesStatus =
      statusFilter === "ALL" ||
      issue.status === statusFilter;

    const matchesPriority =
      priorityFilter === "ALL" ||
      issue.priority === priorityFilter;

    const matchesCategory =
      categoryFilter === "ALL" ||
      issue.category === categoryFilter;

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
        {/* SIDEBAR */}
        <AdminSidebar />

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0 p-8">
          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              All Issues
            </h1>

            <p className="text-slate-500 mt-1">
              View and manage all reported issues.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
              {error}
            </div>
          )}

          {/* SEARCH AND FILTERS */}
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
            <div className="flex flex-col xl:flex-row gap-4">
              {/* SEARCH */}
              <div className="relative flex-1">
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search by issue ID, title or location..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 bg-white"
                />
              </div>

              {/* FILTERS */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2">
                <div className="flex items-center gap-2">
                  <Filter
                    size={20}
                    className="text-slate-500"
                  />
                </div>

                {/* STATUS */}
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                  className="px-4 py-3 border border-slate-300 rounded-lg text-slate-900 bg-white"
                >
                  <option value="ALL">
                    All Status
                  </option>

                  <option value="OPEN">
                    OPEN
                  </option>

                  <option value="ASSIGNED">
                    ASSIGNED
                  </option>

                  <option value="IN_PROGRESS">
                    IN_PROGRESS
                  </option>

                  <option value="RESOLVED">
                    RESOLVED
                  </option>

                  <option value="CLOSED">
                    CLOSED
                  </option>
                </select>

                {/* PRIORITY */}
                <select
                  value={priorityFilter}
                  onChange={(e) =>
                    setPriorityFilter(e.target.value)
                  }
                  className="px-4 py-3 border border-slate-300 rounded-lg text-slate-900 bg-white"
                >
                  <option value="ALL">
                    All Priority
                  </option>

                  <option value="LOW">
                    LOW
                  </option>

                  <option value="MEDIUM">
                    MEDIUM
                  </option>

                  <option value="HIGH">
                    HIGH
                  </option>

                  <option value="CRITICAL">
                    CRITICAL
                  </option>
                </select>

                {/* CATEGORY */}
                <select
                  value={categoryFilter}
                  onChange={(e) =>
                    setCategoryFilter(e.target.value)
                  }
                  className="px-4 py-3 border border-slate-300 rounded-lg text-slate-900 bg-white"
                >
                  <option value="ALL">
                    All Category
                  </option>

                  <option value="ELECTRICAL">
                    ELECTRICAL
                  </option>

                  <option value="PLUMBING">
                    PLUMBING
                  </option>

                  <option value="INFRASTRUCTURE">
                    INFRASTRUCTURE
                  </option>

                  <option value="CLEANLINESS">
                    CLEANLINESS
                  </option>

                  <option value="FURNITURE">
                    FURNITURE
                  </option>

                  <option value="OTHER">
                    OTHER
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* ISSUES TABLE */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800">
                Issues ({filteredIssues.length})
              </h2>
            </div>

            {loading ? (
              <div className="p-10 text-center">
                <p className="text-slate-500">
                  Loading issues...
                </p>
              </div>
            ) : filteredIssues.length === 0 ? (
              <div className="p-10 text-center">
                <ClipboardList
                  size={40}
                  className="mx-auto text-slate-300 mb-3"
                />

                <p className="text-slate-500">
                  No issues found.
                </p>
              </div>
            ) : (
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
                        {/* ISSUE */}
                        <td className="px-5 py-4">
                          <div className="font-medium text-slate-800">
                            #{issue.issueId}
                          </div>

                          <div className="text-sm text-slate-500">
                            {issue.title}
                          </div>
                        </td>

                        {/* CATEGORY */}
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {issue.category}
                        </td>

                        {/* PRIORITY */}
                        <td className="px-5 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              issue.priority ===
                              "CRITICAL"
                                ? "bg-red-100 text-red-700"
                                : issue.priority ===
                                  "HIGH"
                                ? "bg-orange-100 text-orange-700"
                                : issue.priority ===
                                  "MEDIUM"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {issue.priority}
                          </span>
                        </td>

                        {/* STATUS */}
                        <td className="px-5 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              issue.status ===
                              "OPEN"
                                ? "bg-blue-100 text-blue-700"
                                : issue.status ===
                                  "ASSIGNED"
                                ? "bg-purple-100 text-purple-700"
                                : issue.status ===
                                  "IN_PROGRESS"
                                ? "bg-orange-100 text-orange-700"
                                : issue.status ===
                                  "RESOLVED"
                                ? "bg-green-100 text-green-700"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {issue.status}
                          </span>
                        </td>

                        {/* LOCATION */}
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {issue.location}
                        </td>

                        {/* REPORTED BY */}
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {issue.reportedByName ||
                            issue.reportedBy ||
                            "Unknown"}
                        </td>

                        {/* ACTION */}
                        <td className="px-5 py-4">
                          <a
                            href={`/admin/issues/${issue.issueId}`}
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
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminIssues;