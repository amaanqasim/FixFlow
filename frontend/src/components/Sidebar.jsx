import {
  LayoutDashboard,
  PlusCircle,
  ClipboardList,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/user",
      icon: LayoutDashboard,
    },
    {
      name: "Report Issue",
      path: "/user/report",
      icon: PlusCircle,
    },
    {
      name: "My Issues",
      path: "/user/issues",
      icon: ClipboardList,
    },
  ];

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed md:static
          top-0 left-0
          z-50
          w-64
          h-screen md:h-[calc(100vh-4rem)]
          bg-[#111111]
          text-white
          border-r border-white/10
          transition-transform duration-500 ease-out
          ${isOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
          }
        `}
      >

        {/* MOBILE HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 md:hidden">
          <div>
            <p className="text-sm font-semibold">FixFlow</p>

            <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 mt-1">
              Navigation
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* DESKTOP LABEL */}
        <div className="hidden md:block px-6 pt-7 pb-4">
          <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
            Workspace
          </p>
        </div>

        {/* NAVIGATION */}
        <nav className="px-3 space-y-1">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `
                  group relative
                  flex items-center gap-3
                  px-4 py-3
                  rounded-xl
                  text-sm
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-white text-black"
                      : "text-white/45 hover:text-white hover:bg-white/[0.06]"
                  }
                  `
                }
              >
                <Icon
                  size={18}
                  strokeWidth={1.7}
                  className="transition-transform duration-300 group-hover:scale-105"
                />

                <span>{item.name}</span>

                {/* ACTIVE INDICATOR */}
                <span className="ml-auto text-[10px] opacity-40">
                  →
                </span>
              </NavLink>
            );
          })}

        </nav>

        {/* BOTTOM SYSTEM DETAIL */}
        <div className="absolute bottom-6 left-5 right-5 hidden md:block">
          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />

              <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">
                Maintenance network active
              </span>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
}

export default Sidebar;