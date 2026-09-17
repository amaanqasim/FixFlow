import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Authentication
import Login from "./pages/Login";
import Register from "./pages/Register";

// User pages
import UserDashboard from "./pages/user/UserDashboard";
import ReportIssue from "./pages/user/ReportIssue";
import MyIssues from "./pages/user/MyIssues";
import IssueDetails from "./pages/user/IssueDetails";

// Staff
import StaffDashboard from "./pages/staff/StaffDashboard";
import StaffIssueDetails from "./pages/staff/StaffIssueDetails";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminIssues from "./pages/admin/AdminIssues";
import ManageUsers from "./pages/admin/ManageUsers";
import Analytics from "./pages/admin/Analytics";
import AIInsights from "./pages/admin/AIInsights";
import Settings from "./pages/admin/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER */}
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/user/report" element={<ReportIssue />} />
        <Route path="/user/issues" element={<MyIssues />} />
        <Route
          path="/user/issues/:issueId"
          element={<IssueDetails />}
        />

        {/* STAFF */}
        <Route path="/staff" element={<StaffDashboard />} />
        <Route
          path="/staff/issues/:issueId"
          element={<StaffIssueDetails />}
        />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/issues" element={<AdminIssues />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/ai-insights" element={<AIInsights />} />
        <Route path="/admin/settings" element={<Settings />} />

        {/* Unknown URL */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;