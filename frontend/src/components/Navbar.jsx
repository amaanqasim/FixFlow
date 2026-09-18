import { Bell, LogOut, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("fixflowUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("fixflowUser");
    localStorage.removeItem("fixflowToken");
    navigate("/login");
  };

  return (
    <nav className="h-16 bg-[#111111] border-b border-white/10 text-white flex items-center justify-between px-4 md:px-6 sticky top-0 z-50">

      {/* BRAND */}
      <div className="flex items-center gap-3">
        <div className="relative w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center overflow-hidden">
          <span className="font-black text-lg">F</span>

          <span className="absolute w-1.5 h-1.5 rounded-full bg-black/40 top-2 right-2" />
        </div>

        <div className="leading-none">
          <h1 className="text-[17px] font-semibold tracking-tight">
            FixFlow
          </h1>

          <p className="text-[9px] uppercase tracking-[0.2em] text-white/35 mt-1">
            Maintenance system
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">

        {/* SYSTEM STATUS */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/[0.03]">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />

          <span className="text-[10px] uppercase tracking-[0.16em] text-white/45">
            System online
          </span>
        </div>

        {/* NOTIFICATIONS */}
        <button
          className="relative w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-300 flex items-center justify-center group"
          title="Notifications"
        >
          <Bell
            size={17}
            className="text-white/60 group-hover:text-white transition-colors"
          />

          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-white rounded-full" />
        </button>

        {/* USER */}
        <div className="hidden sm:flex items-center gap-2.5 pl-2">
          <div className="text-right leading-tight">
            <p className="text-sm font-medium text-white/90">
              {user?.name || "User"}
            </p>

            <p className="text-[10px] uppercase tracking-widest text-white/35 mt-0.5">
              {user?.role || "USER"}
            </p>
          </div>

          <UserCircle
            size={29}
            strokeWidth={1.4}
            className="text-white/50"
          />
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="group flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white hover:text-black transition-all duration-300"
        >
          <LogOut
            size={16}
            className="text-white/50 group-hover:text-black transition-colors"
          />

          <span className="hidden sm:inline text-xs font-medium">
            Logout
          </span>
        </button>

      </div>
    </nav>
  );
}

export default Navbar;