import {
  LayoutDashboard,
  ClipboardList,
  Users,
  BarChart3,
  Brain,
  Settings,
  History,
  QrCode,
  Sparkles,
} from "lucide-react";

function AdminSidebar() {
  const menuItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "All Issues",
      href: "/admin/issues",
      icon: ClipboardList,
    },
    {
      label: "Manage Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      label: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
    },
    {
      label: "AI Insights",
      href: "/admin/ai-insights",
      icon: Brain,
    },
    {
      label: "AI Issue Analysis",
      href: "/admin/ai-analysis",
      icon: Sparkles,
    },
    {
      label: "Issue History",
      href: "/admin/history",
      icon: History,
    },
    {
      label: "QR Management",
      href: "/admin/qr",
      icon: QrCode,
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  const currentPath = window.location.pathname;

  return (
    <aside className="w-64 min-h-[calc(100vh-64px)] bg-slate-900 text-white shrink-0">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <ClipboardList size={24} />

          <h2 className="text-xl font-bold">
            Admin Panel
          </h2>
        </div>

        <p className="text-sm text-slate-400 mt-1">
          FixFlow Management
        </p>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/admin"
              ? currentPath === "/admin"
              : currentPath.startsWith(item.href);

          return (
            <a
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={19} />

              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

export default AdminSidebar;