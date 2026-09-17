import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  ArrowLeft,
  Upload,
  Send,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { issues } from "../../data/dummyData";

function ReportIssue() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("fixflowUser");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const newIssue = {
      issueId: `ISS-${String(issues.length + 1).padStart(3, "0")}`,
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      status: "OPEN",
      location: location.trim(),
      imageUrl: image ? image.name : "",
      reportedBy: user?.userId || "USR-001",
      assignedTo: null,
      resolutionNote: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      resolvedAt: null,
      closedAt: null,
    };

    issues.push(newIssue);

    setSuccess("Issue reported successfully.");

    setTitle("");
    setDescription("");
    setCategory("");
    setPriority("");
    setLocation("");
    setImage(null);

    document.getElementById("issue-image").value = "";

    setTimeout(() => {
      navigate("/user/issues");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0">

          {/* Mobile menu */}
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-slate-100"
            >
              <Menu size={22} />
            </button>
          </div>

          <div className="p-4 md:p-6 lg:p-8 max-w-5xl">

            {/* Heading */}
            <div className="mb-6">
              <button
                onClick={() => navigate("/user")}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-4"
              >
                <ArrowLeft size={17} />
                Back to Dashboard
              </button>

              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Report an Issue
              </h1>

              <p className="text-slate-500 mt-1">
                Provide the details of the issue you want to report.
              </p>
            </div>

            {/* Success message */}
            {success && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm">
                {success}
              </div>
            )}

            {/* Form */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-7">

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Issue Title
                  </label>

                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Example: Broken classroom fan"
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description
                  </label>

                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the issue in detail..."
                    rows="5"
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Category + Priority */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Category
                    </label>

                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">
                        Select category
                      </option>

                      <option value="ELECTRICAL">
                        Electrical
                      </option>

                      <option value="PLUMBING">
                        Plumbing
                      </option>

                      <option value="INFRASTRUCTURE">
                        Infrastructure
                      </option>

                      <option value="CLEANLINESS">
                        Cleanliness
                      </option>

                      <option value="FURNITURE">
                        Furniture
                      </option>

                      <option value="OTHER">
                        Other
                      </option>
                    </select>
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Priority
                    </label>

                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">
                        Select priority
                      </option>

                      <option value="LOW">
                        Low
                      </option>

                      <option value="MEDIUM">
                        Medium
                      </option>

                      <option value="HIGH">
                        High
                      </option>

                      <option value="CRITICAL">
                        Critical
                      </option>
                    </select>
                  </div>

                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Location
                  </label>

                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Example: Block A - Room 204"
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Image */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Attach Image
                  </label>

                  <label
                    htmlFor="issue-image"
                    className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg p-8 cursor-pointer hover:bg-slate-50 transition"
                  >
                    <Upload
                      size={28}
                      className="text-slate-400 mb-2"
                    />

                    <span className="text-sm font-medium text-slate-600">
                      Click to upload an image
                    </span>

                    <span className="text-xs text-slate-400 mt-1">
                      JPG, PNG or JPEG
                    </span>

                    {image && (
                      <span className="text-sm text-blue-600 mt-3">
                        Selected: {image.name}
                      </span>
                    )}
                  </label>

                  <input
                    id="issue-image"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    className="hidden"
                    onChange={(e) => {
                      setImage(e.target.files[0] || null);
                    }}
                  />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">

                  <button
                    type="button"
                    onClick={() => navigate("/user")}
                    className="w-full sm:w-auto px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 transition"
                  >
                    <Send size={18} />
                    Submit Issue
                  </button>

                </div>

              </form>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default ReportIssue;