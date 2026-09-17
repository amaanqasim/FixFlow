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
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static
          top-0 left-0
          z-50
          w-64
          h-screen md:h-[calc(100vh-4rem)]
          bg-white
          border-r border-slate-200
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >

        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 md:hidden">
          <h2 className="font-bold text-slate-900">
            FixFlow
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-100"
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

        </nav>

      </aside>
    </>
  );
}

export default Sidebar;