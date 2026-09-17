import {
  LayoutDashboard,
  ClipboardList,
  Users,
  BarChart3,
  Brain,
  Settings,
  AlertTriangle,
  TrendingUp,
  Activity,
  CheckCircle,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import { issues } from "../../data/dummyData";

function AIInsights() {
  const criticalIssues = issues.filter(
    (issue) => issue.priority === "CRITICAL"
  ).length;

  const highPriorityIssues = issues.filter(
    (issue) => issue.priority === "HIGH"
  ).length;

  const openIssues = issues.filter(
    (issue) => issue.status === "OPEN"
  ).length;

  const inProgressIssues = issues.filter(
    (issue) => issue.status === "IN_PROGRESS"
  ).length;

  const categoryCounts = {};

  issues.forEach((issue) => {
    categoryCounts[issue.category] =
      (categoryCounts[issue.category] || 0) + 1;
  });

  const recommendations = [];

  if (criticalIssues > 0) {
    recommendations.push({
      icon: AlertTriangle,
      title: "Critical Issues Need Attention",
      text: `${criticalIssues} critical issue(s) require immediate administrative attention.`,
    });
  }

  if (highPriorityIssues > 0) {
    recommendations.push({
      icon: TrendingUp,
      title: "High Priority Issues",
      text: `${highPriorityIssues} high priority issue(s) should be monitored closely.`,
    });
  }

  if (openIssues > 0) {
    recommendations.push({
      icon: Activity,
      title: "Open Issues",
      text: `${openIssues} issue(s) are currently open and may need assignment.`,
    });
  }

  if (inProgressIssues > 0) {
    recommendations.push({
      icon: CheckCircle,
      title: "Issues Under Progress",
      text: `${inProgressIssues} issue(s) are currently being worked on by staff.`,
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">
              Admin Panel
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              System Management
            </p>
          </div>

          <nav className="p-4 space-y-2">
            <a
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <LayoutDashboard size={19} />
              Dashboard
            </a>

            <a
              href="/admin/issues"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <ClipboardList size={19} />
              All Issues
            </a>

            <a
              href="/admin/users"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <Users size={19} />
              Manage Users
            </a>

            <a
              href="/admin/analytics"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <BarChart3 size={19} />
              Analytics
            </a>

            <a
              href="/admin/ai-insights"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-900 text-white"
            >
              <Brain size={19} />
              AI Insights
            </a>

            <a
              href="/admin/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <Settings size={19} />
              Settings
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              AI Insights
            </h1>
            <p className="text-gray-500 mt-2">
              AI-based analysis and recommendations for reported issues.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Critical Issues
                  </p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {criticalIssues}
                  </p>
                </div>

                <AlertTriangle className="text-red-500" size={30} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    High Priority
                  </p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {highPriorityIssues}
                  </p>
                </div>

                <TrendingUp className="text-orange-500" size={30} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Open Issues
                  </p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {openIssues}
                  </p>
                </div>

                <Activity className="text-blue-500" size={30} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    In Progress
                  </p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {inProgressIssues}
                  </p>
                </div>

                <CheckCircle className="text-green-500" size={30} />
              </div>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Brain size={24} className="text-gray-800" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  AI Issue Analysis
                </h2>
                <p className="text-sm text-gray-500">
                  Automated analysis based on current issue data.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-5">
              <div className="flex items-center gap-3">
                <CheckCircle
                  size={22}
                  className="text-green-600"
                />

                <div>
                  <p className="font-semibold text-gray-800">
                    Analysis Available
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    AI insights have been generated from the current
                    issue records.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              AI Recommendations
            </h2>

            <div className="space-y-4">
              {recommendations.length > 0 ? (
                recommendations.map((recommendation, index) => {
                  const Icon = recommendation.icon;

                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <Icon
                        size={22}
                        className="text-gray-700 mt-1"
                      />

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {recommendation.title}
                        </h3>

                        <p className="text-sm text-gray-600 mt-1">
                          {recommendation.text}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500">
                  No recommendations available.
                </p>
              )}
            </div>
          </div>

          {/* Category Analysis */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Issue Category Analysis
            </h2>

            <div className="space-y-4">
              {Object.entries(categoryCounts).map(
                ([category, count]) => (
                  <div
                    key={category}
                    className="flex items-center justify-between border-b border-gray-100 pb-3"
                  >
                    <span className="text-gray-700">
                      {category}
                    </span>

                    <span className="font-semibold text-gray-800">
                      {count}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AIInsights;