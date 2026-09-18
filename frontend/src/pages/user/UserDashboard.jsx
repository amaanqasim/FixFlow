import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Menu,
  Plus,
  Wrench,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { issues } from "../../data/dummyData";

function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const storedUser = localStorage.getItem("fixflowUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const currentUserId = user?.userId || "USR-001";

  const myIssues = useMemo(
    () => issues.filter((issue) => issue.reportedBy === currentUserId),
    [currentUserId]
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

  const getStatus = (status) => {
    if (status === "OPEN") {
      return {
        label: "Reported",
        icon: AlertCircle,
      };
    }

    if (status === "ASSIGNED") {
      return {
        label: "Assigned",
        icon: Clock3,
      };
    }

    if (status === "IN_PROGRESS") {
      return {
        label: "In progress",
        icon: Wrench,
      };
    }

    return {
      label: "Resolved",
      icon: CheckCircle2,
    };
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">

      <Navbar />

      <div className="flex min-h-[calc(100vh-4rem)]">

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 bg-[#0b0b0b] overflow-hidden">

          {/* MOBILE MENU */}
          <div className="md:hidden px-5 pt-5">
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center"
            >
              <Menu size={18} />
            </button>
          </div>

          {/* HEADER */}
          <section className="px-5 md:px-10 lg:px-14 pt-8 md:pt-12 pb-10">

            <div className="max-w-6xl">

              <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4">
                Personal workspace
              </p>

              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
                    Hello, {user?.name?.split(" ")[0] || "there"}.
                  </h1>

                  <p className="text-white/40 mt-4 max-w-lg leading-relaxed">
                    Track the problems you've reported and see how
                    they're moving toward resolution.
                  </p>
                </div>

                <a
                  href="/user/report"
                  className="group inline-flex items-center gap-3 self-start lg:self-auto px-5 py-3.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all duration-300"
                >
                  <Plus size={17} />

                  Report an issue

                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>

              </div>
            </div>
          </section>

          {/* OVERVIEW */}
          <section className="px-5 md:px-10 lg:px-14 pb-10">

            <div className="max-w-6xl">

              <div className="grid grid-cols-2 lg:grid-cols-4 border border-white/10 rounded-2xl overflow-hidden">

                <div className="p-5 md:p-6 bg-white/[0.025] border-r border-b lg:border-b-0 border-white/10">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                    Total
                  </p>

                  <p className="text-3xl md:text-4xl font-semibold mt-3">
                    {totalIssues}
                  </p>

                  <p className="text-xs text-white/30 mt-2">
                    Issues reported
                  </p>
                </div>

                <div className="p-5 md:p-6 bg-white/[0.025] border-b lg:border-b-0 lg:border-r border-white/10">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                    Active
                  </p>

                  <p className="text-3xl md:text-4xl font-semibold mt-3">
                    {openIssues}
                  </p>

                  <p className="text-xs text-white/30 mt-2">
                    Still being handled
                  </p>
                </div>

                <div className="p-5 md:p-6 bg-white/[0.025] border-r border-white/10">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                    Resolved
                  </p>

                  <p className="text-3xl md:text-4xl font-semibold mt-3">
                    {resolvedIssues}
                  </p>

                  <p className="text-xs text-white/30 mt-2">
                    Completed issues
                  </p>
                </div>

                <div className="p-5 md:p-6 bg-white/[0.025]">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                    Critical
                  </p>

                  <p className="text-3xl md:text-4xl font-semibold mt-3">
                    {criticalIssues}
                  </p>

                  <p className="text-xs text-white/30 mt-2">
                    Need attention
                  </p>
                </div>

              </div>

            </div>
          </section>

          {/* ISSUE FLOW */}
          <section className="px-5 md:px-10 lg:px-14 pb-12">

            <div className="max-w-6xl">

              <div className="border-t border-white/10 pt-7">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-7">

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                      How FixFlow works
                    </p>

                    <h2 className="text-xl font-medium mt-2">
                      Every report has a path.
                    </h2>
                  </div>

                  <span className="text-xs text-white/25">
                    Report → repair → resolution
                  </span>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 border border-white/10 rounded-2xl overflow-hidden">

                  {[
                    ["01", "Reported", "Your issue enters the system."],
                    ["02", "Assigned", "A staff member takes ownership."],
                    ["03", "In progress", "The repair is underway."],
                    ["04", "Resolved", "The issue is completed."],
                  ].map(([number, title, description]) => (
                    <div
                      key={number}
                      className="group p-5 md:p-6 bg-white/[0.02] border-b md:border-b-0 md:border-r last:border-0 border-white/10 hover:bg-white/[0.055] transition-all duration-500"
                    >
                      <span className="text-[10px] text-white/20 tracking-widest">
                        {number}
                      </span>

                      <h3 className="mt-8 text-sm font-medium">
                        {title}
                      </h3>

                      <p className="text-xs text-white/30 leading-relaxed mt-2">
                        {description}
                      </p>

                      <div className="mt-7 w-6 h-px bg-white/20 group-hover:w-12 transition-all duration-500" />
                    </div>
                  ))}

                </div>

              </div>

            </div>
          </section>

          {/* RECENT ISSUES */}
          <section className="px-5 md:px-10 lg:px-14 pb-16">

            <div className="max-w-6xl">

              <div className="flex items-end justify-between mb-5">

                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                    Activity
                  </p>

                  <h2 className="text-xl font-medium mt-2">
                    Your recent reports
                  </h2>
                </div>

                <a
                  href="/user/issues"
                  className="text-xs text-white/40 hover:text-white transition"
                >
                  View all →
                </a>

              </div>

              <div className="border border-white/10 rounded-2xl overflow-hidden">

                {myIssues.length === 0 ? (
                  <div className="p-10 text-center">
                    <p className="text-white/40">
                      No issues reported yet.
                    </p>
                  </div>
                ) : (
                  myIssues.slice(0, 5).map((issue, index) => {
                    const status = getStatus(issue.status);
                    const StatusIcon = status.icon;

                    return (
                      <a
                        key={issue.issueId}
                        href={`/user/issues/${issue.issueId}`}
                        className={`
                          group flex items-center gap-4 p-5
                          bg-white/[0.015]
                          hover:bg-white/[0.055]
                          transition-all duration-300
                          ${index !== 0 ? "border-t border-white/10" : ""}
                        `}
                      >

                        <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center flex-shrink-0">
                          <StatusIcon
                            size={17}
                            className="text-white/50 group-hover:text-white transition-colors"
                          />
                        </div>

                        <div className="min-w-0 flex-1">

                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-medium truncate">
                              {issue.title}
                            </h3>

                            {issue.priority === "CRITICAL" && (
                              <span className="text-[9px] uppercase tracking-wider text-white/50 border border-white/15 rounded-full px-2 py-0.5">
                                Critical
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-white/30 mt-1 truncate">
                            {issue.category} · {issue.location}
                          </p>

                        </div>

                        <div className="hidden sm:block text-right mr-2">
                          <p className="text-[10px] uppercase tracking-wider text-white/30">
                            Status
                          </p>

                          <p className="text-xs text-white/65 mt-1">
                            {status.label}
                          </p>
                        </div>

                        <ArrowUpRight
                          size={17}
                          className="text-white/20 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                        />

                      </a>
                    );
                  })
                )}

              </div>

            </div>

          </section>

        </main>
      </div>
    </div>
  );
}

export default UserDashboard;