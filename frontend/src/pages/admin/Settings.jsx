import {
  Settings as SettingsIcon,
  Bell,
  Lock,
  UserCog,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/AdminSidebar";

function Settings() {
  return (
    <div className="h-screen bg-slate-100 overflow-hidden">
      <Navbar />

      <div className="flex h-[calc(100vh-64px)]">
        {/* SHARED ADMIN SIDEBAR */}
        <AdminSidebar />

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0 h-full overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">

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
                <SettingsIcon
                  size={22}
                  className="text-blue-600"
                />

                <h2 className="text-lg font-semibold text-slate-800">
                  General Settings
                </h2>
              </div>

              <div className="space-y-5">

                {/* SYSTEM NAME */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    System Name
                  </label>

                  <input
                    type="text"
                    value="FixFlow"
                    readOnly
                    className="w-full max-w-xl px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-800"
                  />
                </div>

                {/* SYSTEM DESCRIPTION */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    System Description
                  </label>

                  <textarea
                    value="Issue Management System"
                    readOnly
                    rows="3"
                    className="w-full max-w-xl px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-800 resize-none"
                  />
                </div>

              </div>
            </div>

            {/* NOTIFICATION SETTINGS */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell
                  size={22}
                  className="text-blue-600"
                />

                <h2 className="text-lg font-semibold text-slate-800">
                  Notification Settings
                </h2>
              </div>

              <div className="space-y-4">

                {/* ASSIGNMENT NOTIFICATIONS */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4"
                  />

                  <span className="text-slate-700">
                    Issue assignment notifications
                  </span>
                </label>

                {/* STATUS NOTIFICATIONS */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4"
                  />

                  <span className="text-slate-700">
                    Issue status update notifications
                  </span>
                </label>

                {/* CRITICAL ISSUE NOTIFICATIONS */}
                <label className="flex items-center gap-3 cursor-pointer">
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
                <Lock
                  size={22}
                  className="text-blue-600"
                />

                <h2 className="text-lg font-semibold text-slate-800">
                  Security Settings
                </h2>
              </div>

              <div className="space-y-4">

                {/* ADMIN ACCESS */}
                <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg">
                  <UserCog
                    size={22}
                    className="text-slate-500"
                  />

                  <div>
                    <h3 className="font-medium text-slate-800">
                      Administrator Access
                    </h3>

                    <p className="text-sm text-slate-500">
                      Manage administrator permissions and access.
                    </p>
                  </div>
                </div>

                {/* AUTHENTICATION */}
                <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg">
                  <Lock
                    size={22}
                    className="text-slate-500"
                  />

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

          </div>
        </main>
      </div>
    </div>
  );
}

export default Settings;