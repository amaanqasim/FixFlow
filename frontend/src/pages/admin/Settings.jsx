import {
  LayoutDashboard,
  ClipboardList,
  Users,
  BarChart3,
  Brain,
  Settings as SettingsIcon,
  ShieldCheck,
  Bell,
  Lock,
  UserCog,
} from "lucide-react";

import Navbar from "../../components/Navbar";

function Settings() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex min-h-[calc(100vh-64px)]">

        {/* SIDEBAR */}
        <aside className="w-64 shrink-0 bg-slate-900 text-white flex flex-col">

          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h2 className="font-bold text-lg">
                  Admin Panel
                </h2>

                <p className="text-xs text-slate-400">
                  FixFlow Management
                </p>
              </div>

            </div>
          </div>

          <nav className="p-4 space-y-2">

            <a
              href="/admin"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <LayoutDashboard size={19} />
              Dashboard
            </a>

            <a
              href="/admin/issues"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <ClipboardList size={19} />
              All Issues
            </a>

            <a
              href="/admin/users"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <Users size={19} />
              Manage Users
            </a>

            <a
              href="/admin/analytics"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <BarChart3 size={19} />
              Analytics
            </a>

            <a
              href="/admin/ai-insights"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <Brain size={19} />
              AI Insights
            </a>

            <a
              href="/admin/settings"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white"
            >
              <SettingsIcon size={19} />
              Settings
            </a>

          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">

          {/* HEADER */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800">
              Settings
            </h1>

            <p className="text-slate-500 mt-1">
              Manage FixFlow administrator settings
            </p>
          </div>

          {/* GENERAL SETTINGS */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">

            <div className="flex items-center gap-3 mb-6">
              <SettingsIcon size={22} className="text-blue-600" />

              <h2 className="text-lg font-semibold text-slate-800">
                General Settings
              </h2>
            </div>

            <div className="space-y-5">

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  System Name
                </label>

                <input
                  type="text"
                  value="FixFlow"
                  readOnly
                  className="w-full max-w-xl px-4 py-3 border border-slate-300 rounded-lg bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  System Description
                </label>

                <textarea
                  value="Issue Management System"
                  readOnly
                  rows="3"
                  className="w-full max-w-xl px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 resize-none"
                />
              </div>

            </div>
          </div>

          {/* NOTIFICATION SETTINGS */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">

            <div className="flex items-center gap-3 mb-6">
              <Bell size={22} className="text-blue-600" />

              <h2 className="text-lg font-semibold text-slate-800">
                Notification Settings
              </h2>
            </div>

            <div className="space-y-4">

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4"
                />

                <span className="text-slate-700">
                  Issue assignment notifications
                </span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4"
                />

                <span className="text-slate-700">
                  Issue status update notifications
                </span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4"
                />

                <span className="text-slate-700">
                  Critical issue notifications
                </span>
              </label>

            </div>
          </div>

          {/* SECURITY SETTINGS */}
          <div className="bg-white rounded-xl shadow-sm p-6">

            <div className="flex items-center gap-3 mb-6">
              <Lock size={22} className="text-blue-600" />

              <h2 className="text-lg font-semibold text-slate-800">
                Security Settings
              </h2>
            </div>

            <div className="space-y-4">

              <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg">
                <UserCog size={22} className="text-slate-500" />

                <div>
                  <h3 className="font-medium text-slate-800">
                    Administrator Access
                  </h3>

                  <p className="text-sm text-slate-500">
                    Manage administrator permissions and access.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg">
                <Lock size={22} className="text-slate-500" />

                <div>
                  <h3 className="font-medium text-slate-800">
                    Authentication
                  </h3>

                  <p className="text-sm text-slate-500">
                    User authentication and role-based access are enabled.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

export default Settings;