import React, { useMemo } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  BarChart3,
  Brain,
  History,
  Settings,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Lightbulb,
  Activity,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import { issues } from "../../data/dummyData";

function AIAnalysis() {
  const analysis = useMemo(() => {
    const criticalIssues = issues.filter(
      (issue) => issue.priority === "CRITICAL"
    );

    const highIssues = issues.filter(
      (issue) => issue.priority === "HIGH"
    );

    const openIssues = issues.filter(
      (issue) => issue.status === "OPEN"
    );

    const inProgressIssues = issues.filter(
      (issue) => issue.status === "IN_PROGRESS"
    );

    const categoryCounts = {};

    issues.forEach((issue) => {
      categoryCounts[issue.category] =
        (categoryCounts[issue.category] || 0) + 1;
    });

    const mostCommonCategory =
      Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0];

    return {
      criticalIssues,
      highIssues,
      openIssues,
      inProgressIssues,
      categoryCounts,
      mostCommonCategory,
    };
  }, []);

  const getCategoryName = (category) => {
    return category
      ? category.charAt(0) + category.slice(1).toLowerCase()
      : "Unknown";
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-[calc(100vh-64px)] bg-slate-900 text-white p-5">
          <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

          <nav className="space-y-2">
            <a
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800"
            >
              <LayoutDashboard size={19} />
              Dashboard
            </a>

            <a
              href="/admin/issues"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800"
            >
              <ClipboardList size={19} />
              All Issues
            </a>

            <a
              href="/admin/users"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800"
            >
              <Users size={19} />
              Manage Users
            </a>

            <a
              href="/admin/analytics"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800"
            >
              <BarChart3 size={19} />
              Analytics
            </a>

            <a
              href="/admin/ai-insights"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800"
            >
              <Brain size={19} />
              AI Insights
            </a>

            <a
              href="/admin/history"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800"
            >
              <History size={19} />
              Issue History
            </a>

            <a
              href="/admin/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800"
            >
              <Settings size={19} />
              Settings
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              AI Issue Analysis
            </h1>

            <p className="text-slate-500 mt-2">
              AI-powered analysis of reported issues and priority patterns.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <p className="text-slate-500">Critical Issues</p>
                <AlertTriangle className="text-red-500" size={24} />
              </div>

              <h2 className="text-3xl font-bold text-red-600 mt-3">
                {analysis.criticalIssues.length}
              </h2>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <p className="text-slate-500">High Priority</p>
                <TrendingUp className="text-orange-500" size={24} />
              </div>

              <h2 className="text-3xl font-bold text-orange-600 mt-3">
                {analysis.highIssues.length}
              </h2>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <p className="text-slate-500">Open Issues</p>
                <Activity className="text-blue-500" size={24} />
              </div>

              <h2 className="text-3xl font-bold text-blue-600 mt-3">
                {analysis.openIssues.length}
              </h2>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <p className="text-slate-500">In Progress</p>
                <CheckCircle className="text-green-500" size={24} />
              </div>

              <h2 className="text-3xl font-bold text-green-600 mt-3">
                {analysis.inProgressIssues.length}
              </h2>
            </div>
          </div>

          {/* AI Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Brain className="text-purple-600" size={24} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  AI Analysis Summary
                </h2>

                <p className="text-sm text-slate-500">
                  Analysis generated from current issue records
                </p>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-100 rounded-lg p-5">
              <p className="text-slate-700 leading-7">
                The system identified{" "}
                <strong>{analysis.criticalIssues.length}</strong>{" "}
                critical issue(s) and{" "}
                <strong>{analysis.highIssues.length}</strong>{" "}
                high-priority issue(s).
                {analysis.mostCommonCategory && (
                  <>
                    {" "}
                    The most frequently reported category is{" "}
                    <strong>
                      {getCategoryName(analysis.mostCommonCategory[0])}
                    </strong>
                    .
                  </>
                )}
              </p>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="text-yellow-500" size={25} />

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  AI Recommendations
                </h2>

                <p className="text-sm text-slate-500">
                  Suggested actions based on issue patterns
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {analysis.criticalIssues.length > 0 && (
                <div className="flex gap-4 p-4 rounded-lg bg-red-50 border border-red-100">
                  <AlertTriangle
                    className="text-red-600 mt-1"
                    size={21}
                  />

                  <div>
                    <h3 className="font-semibold text-red-800">
                      Critical issues require immediate attention
                    </h3>

                    <p className="text-sm text-red-700 mt-1">
                      Review and prioritize the currently reported
                      critical issues.
                    </p>
                  </div>
                </div>
              )}

              {analysis.highIssues.length > 0 && (
                <div className="flex gap-4 p-4 rounded-lg bg-orange-50 border border-orange-100">
                  <TrendingUp
                    className="text-orange-600 mt-1"
                    size={21}
                  />

                  <div>
                    <h3 className="font-semibold text-orange-800">
                      Monitor high-priority issues
                    </h3>

                    <p className="text-sm text-orange-700 mt-1">
                      High-priority issues should be reviewed regularly
                      to prevent escalation.
                    </p>
                  </div>
                </div>
              )}

              {analysis.openIssues.length > 0 && (
                <div className="flex gap-4 p-4 rounded-lg bg-blue-50 border border-blue-100">
                  <Activity
                    className="text-blue-600 mt-1"
                    size={21}
                  />

                  <div>
                    <h3 className="font-semibold text-blue-800">
                      Review unresolved issues
                    </h3>

                    <p className="text-sm text-blue-700 mt-1">
                      Open issues should be assigned and tracked until
                      resolution.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Category Analysis */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Category Analysis
            </h2>

            <div className="space-y-5">
              {Object.entries(analysis.categoryCounts).map(
                ([category, count]) => {
                  const percentage =
                    issues.length > 0
                      ? Math.round((count / issues.length) * 100)
                      : 0;

                  return (
                    <div key={category}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-slate-700">
                          {getCategoryName(category)}
                        </span>

                        <span className="text-sm text-slate-500">
                          {count} issue(s)
                        </span>
                      </div>

                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div
                          className="bg-purple-500 h-3 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AIAnalysis;