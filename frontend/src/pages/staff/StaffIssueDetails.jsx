import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  User,
  Calendar,
  Save,
  UserPlus,
} from "lucide-react";

import Navbar from "../../components/Navbar";

function StaffIssueDetails() {
  const { issueId } = useParams();
  const navigate = useNavigate();

  const isAdminView =
    window.location.pathname.startsWith("/admin/issues/");

  const [issue, setIssue] = useState(null);
  const [history, setHistory] = useState([]);
  const [staff, setStaff] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingStaff, setLoadingStaff] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [saving, setSaving] = useState(false);

  const [status, setStatus] = useState("OPEN");
  const [resolutionNote, setResolutionNote] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");

  // --------------------------------------------------
  // FETCH ISSUE
  // --------------------------------------------------
  useEffect(() => {
    const fetchIssue = async () => {
      const token = localStorage.getItem("fixflowToken");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);

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
          console.error(
            data.message || "Failed to fetch issue"
          );
          setIssue(null);
          return;
        }

        setIssue(data.issue);
        setStatus(data.issue.status || "OPEN");
        setResolutionNote(
          data.issue.resolutionNote || ""
        );

        if (data.issue.assignedTo) {
          setSelectedStaff(
            String(data.issue.assignedTo)
          );
        } else {
          setSelectedStaff("");
        }
      } catch (error) {
        console.error("Fetch issue error:", error);
        setIssue(null);
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [issueId, navigate]);

  // --------------------------------------------------
  // FETCH HISTORY
  // --------------------------------------------------
  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("fixflowToken");

      if (!token || !issueId) {
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/issues/${issueId}/history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(
            data.message || "Failed to fetch history"
          );
          return;
        }

        setHistory(data.history || []);
      } catch (error) {
        console.error(
          "Fetch history error:",
          error
        );
      }
    };

    fetchHistory();
  }, [issueId]);

  // --------------------------------------------------
  // FETCH STAFF MEMBERS
  // --------------------------------------------------
  useEffect(() => {
    const fetchStaff = async () => {
      if (!isAdminView) {
        return;
      }

      const token =
        localStorage.getItem("fixflowToken");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoadingStaff(true);

        const response = await fetch(
          "http://localhost:5000/api/auth/staff",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(
            data.message ||
              "Failed to fetch staff members"
          );
          return;
        }

        setStaff(data.staff || []);
      } catch (error) {
        console.error(
          "Fetch staff error:",
          error
        );
      } finally {
        setLoadingStaff(false);
      }
    };

    fetchStaff();
  }, [isAdminView, navigate]);

  // --------------------------------------------------
  // ASSIGN STAFF
  // --------------------------------------------------
  const handleAssignStaff = async () => {
    const token =
      localStorage.getItem("fixflowToken");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!selectedStaff) {
      alert("Please select a staff member.");
      return;
    }

    try {
      setAssigning(true);

      const response = await fetch(
        `http://localhost:5000/api/issues/${issue.issueId}/assign`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            staffId: Number(selectedStaff),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to assign staff."
        );
        return;
      }

      if (data.issue) {
        /*
         * The assign endpoint returns the raw issue,
         * so preserve the existing names from the
         * current issue object.
         */
        setIssue((previousIssue) => ({
          ...data.issue,
          reportedByName:
            previousIssue?.reportedByName ||
            "Unknown",
          assignedToName:
            staff.find(
              (member) =>
                String(member.userId) ===
                String(data.issue.assignedTo)
            )?.name || "Not assigned",
        }));

        setStatus(
          data.issue.status || "ASSIGNED"
        );
      }

      // Refresh the complete issue so names are
      // definitely retrieved from the backend.
      const issueResponse = await fetch(
        `http://localhost:5000/api/issues/${issue.issueId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const issueData =
        await issueResponse.json();

      if (issueResponse.ok && issueData.issue) {
        setIssue(issueData.issue);
      }

      // Refresh history
      const historyResponse =
        await fetch(
          `http://localhost:5000/api/issues/${issue.issueId}/history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      const historyData =
        await historyResponse.json();

      if (historyResponse.ok) {
        setHistory(
          historyData.history || []
        );
      }

      alert("Staff assigned successfully.");
    } catch (error) {
      console.error(
        "Assign staff error:",
        error
      );

      alert(
        "Something went wrong while assigning staff."
      );
    } finally {
      setAssigning(false);
    }
  };

  // --------------------------------------------------
  // UPDATE STATUS
  // --------------------------------------------------
  const handleSave = async () => {
    const token =
      localStorage.getItem("fixflowToken");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!issue) {
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        `http://localhost:5000/api/issues/${issue.issueId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
            resolutionNote,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to update issue."
        );
        return;
      }

      if (data.issue) {
        /*
         * Preserve the names because the status
         * endpoint returns the issue without joins.
         */
        setIssue((previousIssue) => ({
          ...data.issue,
          reportedByName:
            previousIssue?.reportedByName ||
            "Unknown",
          assignedToName:
            previousIssue?.assignedToName ||
            "Not assigned",
        }));

        setStatus(
          data.issue.status || status
        );

        setResolutionNote(
          data.issue.resolutionNote ||
            resolutionNote
        );
      }

      // Refresh complete issue to get names
      const issueResponse = await fetch(
        `http://localhost:5000/api/issues/${issue.issueId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const issueData =
        await issueResponse.json();

      if (issueResponse.ok && issueData.issue) {
        setIssue(issueData.issue);
      }

      // Refresh history
      const historyResponse =
        await fetch(
          `http://localhost:5000/api/issues/${issue.issueId}/history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      const historyData =
        await historyResponse.json();

      if (historyResponse.ok) {
        setHistory(
          historyData.history || []
        );
      }

      alert("Issue updated successfully.");
    } catch (error) {
      console.error(
        "Update issue error:",
        error
      );

      alert(
        "Something went wrong while updating the issue."
      );
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100">
        <Navbar />

        <div className="p-6">
          <div className="max-w-3xl mx-auto bg-white rounded-xl border border-slate-200 p-8 text-center">
            <p className="text-slate-600">
              Loading issue...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // ISSUE NOT FOUND
  // --------------------------------------------------
  if (!issue) {
    return (
      <div className="min-h-screen bg-slate-100">
        <Navbar />

        <div className="p-6">
          <div className="max-w-3xl mx-auto bg-white rounded-xl border border-slate-200 p-8 text-center">

            <h1 className="text-2xl font-bold text-slate-900">
              Issue Not Found
            </h1>

            <p className="text-slate-500 mt-2">
              The requested issue does not exist.
            </p>

            <button
              onClick={() =>
                navigate(
                  isAdminView
                    ? "/admin/issues"
                    : "/staff"
                )
              }
              className="mt-5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              {isAdminView
                ? "Back to Admin Issues"
                : "Back to Staff Dashboard"}
            </button>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="p-4 md:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">

          {/* BACK BUTTON */}
          <button
            onClick={() =>
              navigate(
                isAdminView
                  ? "/admin/issues"
                  : "/staff"
              )
            }
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 mb-6"
          >
            <ArrowLeft size={18} />

            {isAdminView
              ? "Back to Admin Issues"
              : "Back to Staff Dashboard"}
          </button>

          {/* HEADER */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

              <div>

                <p className="text-sm text-slate-400">
                  Issue #{issue.issueId}
                </p>

                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">
                  {issue.title}
                </h1>

                <p className="text-slate-500 mt-2">
                  {issue.category}
                </p>

              </div>

              <div className="flex flex-wrap gap-2">

                <span className="px-3 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold w-fit">
                  {issue.priority}
                </span>

                <span className="px-3 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold w-fit">
                  {issue.status}
                </span>

              </div>

            </div>
          </div>

          {/* CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">

              {/* DESCRIPTION */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">

                <h2 className="text-lg font-semibold text-slate-900">
                  Issue Description
                </h2>

                <p className="text-slate-600 mt-3 leading-relaxed">
                  {issue.description}
                </p>

              </div>

              {/* ISSUE INFORMATION */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">

                <h2 className="text-lg font-semibold text-slate-900 mb-5">
                  Issue Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* LOCATION */}
                  <div className="flex items-start gap-3">

                    <MapPin
                      size={20}
                      className="text-slate-400 mt-1"
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

                  {/* REPORTED BY */}
                  <div className="flex items-start gap-3">

                    <User
                      size={20}
                      className="text-slate-400 mt-1"
                    />

                    <div>

                      <p className="text-xs text-slate-400">
                        Reported By
                      </p>

                      <p className="text-sm font-medium text-slate-800 mt-1">
                        {issue.reportedByName ||
                          "Unknown"}
                      </p>

                    </div>
                  </div>

                  {/* ASSIGNED TO */}
                  <div className="flex items-start gap-3">

                    <User
                      size={20}
                      className="text-slate-400 mt-1"
                    />

                    <div>

                      <p className="text-xs text-slate-400">
                        Assigned Staff
                      </p>

                      <p className="text-sm font-medium text-slate-800 mt-1">
                        {issue.assignedToName ||
                          "Not assigned"}
                      </p>

                    </div>
                  </div>

                  {/* REPORTED ON */}
                  <div className="flex items-start gap-3">

                    <Calendar
                      size={20}
                      className="text-slate-400 mt-1"
                    />

                    <div>

                      <p className="text-xs text-slate-400">
                        Reported On
                      </p>

                      <p className="text-sm font-medium text-slate-800 mt-1">
                        {new Date(
                          issue.createdAt
                        ).toLocaleString()}
                      </p>

                    </div>
                  </div>

                </div>
              </div>

              {/* ADMIN STAFF ASSIGNMENT */}
              {isAdminView && (
                <div className="bg-white rounded-xl border border-slate-200 p-6">

                  <div className="flex items-center gap-2 mb-5">

                    <UserPlus
                      size={20}
                      className="text-blue-600"
                    />

                    <h2 className="text-lg font-semibold text-slate-900">
                      Assign Staff
                    </h2>

                  </div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select Staff Member
                  </label>

                  <select
                    value={selectedStaff}
                    onChange={(e) =>
                      setSelectedStaff(
                        e.target.value
                      )
                    }
                    disabled={
                      loadingStaff || assigning
                    }
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 bg-white"
                  >

                    <option value="">
                      {loadingStaff
                        ? "Loading staff members..."
                        : "Select a staff member"}
                    </option>

                    {staff.map((member) => (
                      <option
                        key={member.userId}
                        value={member.userId}
                      >
                        {member.name} —{" "}
                        {member.email}
                      </option>
                    ))}

                  </select>

                  {staff.length === 0 &&
                    !loadingStaff && (
                      <p className="text-sm text-red-500 mt-2">
                        No staff members found.
                      </p>
                    )}

                  <button
                    onClick={handleAssignStaff}
                    disabled={
                      assigning ||
                      loadingStaff ||
                      !selectedStaff
                    }
                    className="mt-4 flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold rounded-lg transition"
                  >

                    <UserPlus size={18} />

                    {assigning
                      ? "Assigning..."
                      : "Assign Staff"}

                  </button>

                </div>
              )}

              {/* UPDATE ISSUE */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">

                <h2 className="text-lg font-semibold text-slate-900">
                  Update Issue
                </h2>

                {/* STATUS */}
                <div className="mt-5">

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value)
                    }
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 bg-white"
                  >

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

                </div>

                {/* RESOLUTION NOTE */}
                <div className="mt-5">

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Resolution Note
                  </label>

                  <textarea
                    value={resolutionNote}
                    onChange={(e) =>
                      setResolutionNote(
                        e.target.value
                      )
                    }
                    rows="4"
                    placeholder="Enter details about the work completed..."
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none text-slate-900 bg-white placeholder:text-slate-400"
                  />

                </div>

                {/* SAVE */}
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="mt-5 flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold rounded-lg transition"
                >

                  <Save size={18} />

                  {saving
                    ? "Saving..."
                    : "Save Update"}

                </button>

              </div>

            </div>

            {/* RIGHT */}
            <div className="space-y-6">

              {/* CURRENT STATUS */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">

                <h2 className="text-lg font-semibold text-slate-900">
                  Current Status
                </h2>

                <div className="mt-4 px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-semibold text-center">
                  {issue.status}
                </div>

              </div>

              {/* HISTORY */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">

                <h2 className="text-lg font-semibold text-slate-900">
                  Activity History
                </h2>

                <div className="mt-5 space-y-5">

                  {history.length === 0 ? (
                    <p className="text-sm text-slate-500">
                      No activity recorded.
                    </p>
                  ) : (
                    history.map((item) => (
                      <div
                        key={item.historyId}
                        className="border-l-2 border-blue-200 pl-4"
                      >

                        <p className="text-sm font-semibold text-slate-800">
                          {item.action?.replaceAll(
                            "_",
                            " "
                          )}
                        </p>

                        {item.oldValue && (
                          <p className="text-xs text-slate-500 mt-1">
                            {item.oldValue} →{" "}
                            {item.newValue}
                          </p>
                        )}

                        {!item.oldValue &&
                          item.newValue && (
                            <p className="text-xs text-slate-500 mt-1">
                              {item.newValue}
                            </p>
                          )}

                        <p className="text-xs text-slate-400 mt-1">
                          {new Date(
                            item.createdAt
                          ).toLocaleString()}
                        </p>

                      </div>
                    ))
                  )}

                </div>

              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default StaffIssueDetails;