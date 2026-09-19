import {
  LayoutDashboard,
  ClipboardList,
  Users,
  BarChart3,
  Brain,
  Settings,
  History,
  Clock,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/AdminSidebar";

import { issueHistory, issues, users } from "../../data/dummyData";

function IssueHistory() {
  const getIssueTitle = (issueId) => {
    const issue = issues.find(
      (issue) => issue.issueId === issueId
    );

    return issue ? issue.title : "Unknown Issue";
  };

  const getUserName = (userId) => {
    const user = users.find(
      (user) => user.userId === userId
    );

    return user ? user.name : userId;
  };

  const formatAction = (action) => {
    return action.replaceAll("_", " ");
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex">
        {/* SIDEBAR */}
        <AdminSidebar />

        {/* MAIN CONTENT */}
        <main className="flex-1 p-8">

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              Issue History
            </h1>

            <p className="text-slate-500 mt-1">
              Track all changes made to reported issues
            </p>
          </div>

          {/* HISTORY LIST */}
          <div className="space-y-5">

            {issueHistory.map((history) => (
              <div
                key={history.historyId}
                className="bg-white rounded-xl shadow-sm p-6"
              >

                <div className="flex items-start gap-4">

                  {/* ICON */}
                  <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Clock size={22} />
                  </div>

                  {/* DETAILS */}
                  <div className="flex-1">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">

                      <div>
                        <h2 className="font-semibold text-slate-800">
                          {getIssueTitle(history.issueId)}
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                          Issue ID: {history.issueId}
                        </p>
                      </div>

                      <span className="text-sm text-slate-500">
                        {formatDate(history.createdAt)}
                      </span>

                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">

                      <div>
                        <p className="text-xs text-slate-500 uppercase">
                          Action
                        </p>

                        <p className="font-medium text-slate-800 mt-1">
                          {formatAction(history.action)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500 uppercase">
                          Changed By
                        </p>

                        <p className="font-medium text-slate-800 mt-1">
                          {getUserName(history.changedBy)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500 uppercase">
                          History ID
                        </p>

                        <p className="font-medium text-slate-800 mt-1">
                          {history.historyId}
                        </p>
                      </div>

                    </div>

                    <div className="mt-4 p-4 bg-slate-50 rounded-lg">

                      <div className="flex flex-col md:flex-row gap-3 md:items-center">

                        <div>
                          <p className="text-xs text-slate-500">
                            Old Value
                          </p>

                          <p className="font-medium text-slate-700 mt-1">
                            {history.oldValue || "—"}
                          </p>
                        </div>

                        <span className="hidden md:block text-slate-400">
                          →
                        </span>

                        <div>
                          <p className="text-xs text-slate-500">
                            New Value
                          </p>

                          <p className="font-medium text-blue-600 mt-1">
                            {history.newValue || "—"}
                          </p>
                        </div>

                      </div>

                    </div>

                  </div>
                </div>
              </div>
            ))}

          </div>

          {issueHistory.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-10 text-center text-slate-500">
              No issue history available.
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default IssueHistory;