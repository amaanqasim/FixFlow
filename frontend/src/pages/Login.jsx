import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { users } from "../data/dummyData";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    const user = users.find(
      (item) =>
        item.email === email.trim() &&
        item.password === password
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    // Temporary frontend-only authentication.
    // Later this will be replaced by Person 2's API.
    localStorage.setItem(
      "fixflowUser",
      JSON.stringify(user)
    );

    if (user.role === "USER") {
      navigate("/user");
    } else if (user.role === "STAFF") {
      navigate("/staff");
    } else if (user.role === "ADMIN") {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">

        {/* Logo / Branding */}
        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 text-white mb-4">
            <ShieldCheck size={30} />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            FixFlow
          </h1>

          <p className="text-slate-500 mt-2">
            Report. Track. Resolve.
          </p>

        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-semibold text-slate-900">
            Welcome Back
          </h2>

          <p className="text-slate-500 mt-1 mb-6">
            Sign in to continue to FixFlow.
          </p>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 rounded-lg p-3 mb-5 text-sm">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* Email */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />

              </div>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Login
            </button>

          </form>

          {/* Register Link */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>

          </p>

        </div>

        <div className="text-center text-xs text-slate-400 mt-5">
          FixFlow Issue Management System
        </div>

      </div>
    </div>
  );
}

export default Login;