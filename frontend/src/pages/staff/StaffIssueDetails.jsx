import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  User,
  Calendar,
  Save,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import { issues, users, issueHistory } from "../../data/dummyData";

function StaffIssueDetails() {
  const { issueId } = useParams();
  const navigate = useNavigate();

  const issue = issues.find(
    (item) => item.issueId === issueId
  );

  const [status, setStatus] = useState(
    issue?.status || "OPEN"
  );

  const [resolutionNote, setResolutionNote] = useState(
    issue?.resolutionNote || ""
  );

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
              onClick={() => navigate("/staff")}
              className="mt-5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const reporter = users.find(
    (user) => user.userId === issue.reportedBy
  );

  const assignedStaff = users.find(
    (user) => user.userId === issue.assignedTo
  );

  const history = issueHistory.filter(
    (item) => item.issueId === issue.issueId
  );

  const handleSave = () => {
    const oldStatus = issue.status;
    const now = new Date().toISOString();

    // Update issue details
    issue.status = status;
    issue.resolutionNote = resolutionNote;
    issue.updatedAt = now;

    // Handle resolved date
    if (status === "RESOLVED") {
      issue.resolvedAt = now;
    }

    // Handle closed date
    if (status === "CLOSED") {
      issue.closedAt = now;

      // If the issue is directly changed to CLOSED,
      // make sure resolvedAt also has a value.
      if (!issue.resolvedAt) {
        issue.resolvedAt = now;
      }
    }

    // Add status history only when status actually changes
    if (oldStatus !== status) {
      issueHistory.push({
        historyId: `HIS-${String(issueHistory.length + 1).padStart(3, "0")}`,
        issueId: issue.issueId,
        action: "STATUS_CHANGED",
        changedBy: "STF-001",
        oldValue: oldStatus,
        newValue: status,
        createdAt: now,
      });
    }

    alert("Issue updated successfully.");

    // Refresh the page so the updated values are displayed
    navigate(`/staff/issues/${issue.issueId}`);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="p-4 md:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">

          {/* Back button */}
          <button
            onClick={() => navigate("/staff")}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 mb-6"
          >
            <ArrowLeft size={18} />
            Back to Staff Dashboard
          </button>

          {/* Header */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

              <div>
                <p className="text-sm text-slate-400">
                  {issue.issueId}
                </p>

                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">
                  {issue.title}
                </h1>

                <p className="text-slate-500 mt-2">
                  {issue.category}
                </p>
              </div>

              <span className="px-3 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold w-fit">
                {issue.priority}
              </span>

            </div>
          </div>

          {/* Issue information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Main details */}
            <div className="lg:col-span-2 space-y-6">

              {/* Description */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  Issue Description
                </h2>

                <p className="text-slate-600 mt-3 leading-relaxed">
                  {issue.description}
                </p>
              </div>

              {/* Issue information */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-5">
                  Issue Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* Location */}
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

                  {/* Reported By */}
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
                        {reporter?.name || issue.reportedBy}
                      </p>
                    </div>
                  </div>

                  {/* Assigned To */}
                  <div className="flex items-start gap-3">
                    <User
                      size={20}
                      className="text-slate-400 mt-1"
                    />

                    <div>
                      <p className="text-xs text-slate-400">
                        Assigned To
                      </p>

                      <p className="text-sm font-medium text-slate-800 mt-1">
                        {assignedStaff?.name || issue.assignedTo}
                      </p>
                    </div>
                  </div>

                  {/* Reported On */}
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

              {/* Status update */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  Update Issue
                </h2>

                {/* Status */}
                <div className="mt-5">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value)
                    }
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="OPEN">OPEN</option>
                    <option value="ASSIGNED">ASSIGNED</option>
                    <option value="IN_PROGRESS">
                      IN_PROGRESS
                    </option>
                    <option value="RESOLVED">RESOLVED</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </div>

                {/* Resolution Note */}
                <div className="mt-5">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Resolution Note
                  </label>

                  <textarea
                    value={resolutionNote}
                    onChange={(e) =>
                      setResolutionNote(e.target.value)
                    }
                    rows="4"
                    placeholder="Enter details about the work completed..."
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                {/* Save */}
                <button
                  onClick={handleSave}
                  className="mt-5 flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                >
                  <Save size={18} />
                  Save Update
                </button>
              </div>

            </div>

            {/* Right side */}
            <div className="space-y-6">

              {/* Current status */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  Current Status
                </h2>

                <div className="mt-4 px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-semibold text-center">
                  {issue.status}
                </div>
              </div>

              {/* History */}
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
                          {item.action.replace("_", " ")}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          {item.oldValue
                            ? `${item.oldValue} → ${item.newValue}`
                            : item.newValue}
                        </p>

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