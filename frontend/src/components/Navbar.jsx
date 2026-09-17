import { Bell, LogOut, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("fixflowUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("fixflowUser");
    navigate("/login");
  };

  return (
    <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center">
          <span className="font-bold">F</span>
        </div>

        <h1 className="text-xl font-bold text-slate-900">
          FixFlow
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {/* Notification */}
        <button
          className="relative p-2 rounded-lg hover:bg-slate-100 transition"
          title="Notifications"
        >
          <Bell size={20} className="text-slate-600" />

          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User */}
        <div className="hidden sm:flex items-center gap-2">
          <UserCircle
            size={32}
            className="text-slate-500"
          />

          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-800">
              {user?.name || "User"}
            </p>

            <p className="text-xs text-slate-500">
              {user?.role || "USER"}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition"
        >
          <LogOut size={18} />

          <span className="hidden sm:inline">
            Logout
          </span>
        </button>

      </div>

    </nav>
  );
}

export default Navbar;