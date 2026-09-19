import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      // Store JWT token
      localStorage.setItem("fixflowToken", data.token);

      // Store logged-in user
      localStorage.setItem(
        "fixflowUser",
        JSON.stringify(data.user)
      );

      // Redirect based on role
      if (data.user.role === "USER") {
        navigate("/user");
      } else if (data.user.role === "STAFF") {
        navigate("/staff");
      } else if (data.user.role === "ADMIN") {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to the server.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-md">

        {/* BRANDING */}
        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-slate-900 text-white mb-4 shadow-sm">
            <ShieldCheck size={28} strokeWidth={1.8} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            FixFlow
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Report. Track. Resolve.
          </p>

        </div>


        {/* LOGIN CARD */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">

          <div className="mb-6">

            <h2 className="text-2xl font-semibold text-slate-900">
              Welcome Back
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Sign in to continue to FixFlow.
            </p>

          </div>


          {/* ERROR */}
          {error && (
            <div className="flex items-start gap-3 bg-red-50 text-red-700 border border-red-200 rounded-lg p-3 mb-5 text-sm">

              <AlertCircle
                size={18}
                className="mt-0.5 flex-shrink-0"
              />

              <span>{error}</span>

            </div>
          )}


          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* EMAIL */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  strokeWidth={1.8}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-3 text-sm text-slate-900 bg-white outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 placeholder:text-slate-400"
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}
            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  strokeWidth={1.8}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-3 text-sm text-slate-900 bg-white outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 placeholder:text-slate-400"
                  required
                />

              </div>

            </div>


            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-sm"
            >
              Login
            </button>

          </form>


          {/* REGISTER */}
          <p className="text-center text-sm text-slate-500 mt-6">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-slate-900 font-semibold hover:text-slate-700 hover:underline"
            >
              Register
            </Link>

          </p>

        </div>


        {/* FOOTER */}
        <div className="text-center text-xs text-slate-400 mt-5">
          FixFlow Issue Management System
        </div>

      </div>

    </div>
  );
}

export default Login;