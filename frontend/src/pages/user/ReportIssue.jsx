import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  FileImage,
  MapPin,
  Menu,
  Send,
  Upload,
  X,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function ReportIssue() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const [success, setSuccess] = useState("");

  /*
    Read location from QR URL.
    Example:
    /user/report?location=Library&qrId=QR-003
  */
  useEffect(() => {
    const qrLocation = searchParams.get("location");

    if (qrLocation) {
      setLocation(qrLocation);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    const token = localStorage.getItem("fixflowToken");

    if (!token) {
      alert("Please login again.");
      navigate("/login");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("category", category);
      formData.append("priority", priority || "MEDIUM");
      formData.append("location", location.trim());

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(
        "http://localhost:5000/api/issues",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to report issue.");
        return;
      }

      setSuccess("Issue reported successfully.");

      setTimeout(() => {
        navigate("/user/issues");
      }, 1200);
    } catch (error) {
      console.error("Create issue error:", error);
      alert("Unable to connect to the server.");
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">

      <Navbar />

      <div className="flex min-h-[calc(100vh-4rem)]">

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0 bg-[#0b0b0b]">

          {/* MOBILE MENU */}
          <div className="md:hidden px-5 pt-5">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center"
            >
              <Menu size={18} />
            </button>
          </div>

          <div className="max-w-6xl mx-auto px-5 md:px-10 lg:px-14 py-8 md:py-12">

            {/* HEADER */}
            <div className="mb-10">

              <button
                type="button"
                onClick={() => navigate("/user")}
                className="group flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/30 hover:text-white transition mb-7"
              >
                <ArrowLeft
                  size={15}
                  className="group-hover:-translate-x-1 transition-transform"
                />

                Back to dashboard
              </button>

              <p className="text-[10px] uppercase tracking-[0.3em] text-white/25 mb-3">
                New maintenance report
              </p>

              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
                Report an issue.
              </h1>

              <p className="text-white/35 mt-4 max-w-xl leading-relaxed">
                Tell us what needs attention. We'll route the problem
                to the right person and keep you updated.
              </p>

            </div>

            {/* SUCCESS */}
            {success && (
              <div className="mb-7 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-4">
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
                  <CheckCircle2 size={17} />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    Report submitted
                  </p>

                  <p className="text-xs text-white/35 mt-0.5">
                    Redirecting you to your issues...
                  </p>
                </div>
              </div>
            )}

            {/* QR LOCATION */}
            {location && searchParams.get("qrId") && (
              <div className="mb-7 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">

                <div className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center">
                  <MapPin size={17} className="text-white/60" />
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                    QR location detected
                  </p>

                  <p className="text-sm text-white/75 mt-1">
                    {location}
                  </p>
                </div>

              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit}>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

                {/* MAIN FORM */}
                <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">

                  {/* TITLE */}
                  <div className="p-6 md:p-8 border-b border-white/10">

                    <label className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">
                      Issue title
                    </label>

                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Broken classroom fan"
                      className="w-full bg-transparent text-xl md:text-2xl text-white placeholder:text-white/15 outline-none"
                      required
                    />

                  </div>

                  {/* DESCRIPTION */}
                  <div className="p-6 md:p-8 border-b border-white/10">

                    <label className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">
                      What happened?
                    </label>

                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the problem and anything that might help the maintenance team..."
                      rows="7"
                      className="w-full bg-transparent text-sm text-white/80 placeholder:text-white/15 outline-none resize-none leading-relaxed"
                      required
                    />

                  </div>

                  {/* CATEGORY + PRIORITY */}
                  <div className="grid grid-cols-1 md:grid-cols-2">

                    <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10">

                      <label className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">
                        Category
                      </label>

                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-transparent text-sm text-white/75 outline-none cursor-pointer"
                        required
                      >
                        <option value="" className="bg-[#111111]">
                          Select category
                        </option>

                        <option value="ELECTRICAL" className="bg-[#111111]">
                          Electrical
                        </option>

                        <option value="PLUMBING" className="bg-[#111111]">
                          Plumbing
                        </option>

                        <option value="INFRASTRUCTURE" className="bg-[#111111]">
                          Infrastructure
                        </option>

                        <option value="CLEANLINESS" className="bg-[#111111]">
                          Cleanliness
                        </option>

                        <option value="FURNITURE" className="bg-[#111111]">
                          Furniture
                        </option>

                        <option value="OTHER" className="bg-[#111111]">
                          Other
                        </option>
                      </select>

                    </div>

                    <div className="p-6 md:p-8 border-white/10">

                      <label className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">
                        Priority
                      </label>

                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full bg-transparent text-sm text-white/75 outline-none cursor-pointer"
                        required
                      >
                        <option value="" className="bg-[#111111]">
                          Select priority
                        </option>

                        <option value="LOW" className="bg-[#111111]">
                          Low
                        </option>

                        <option value="MEDIUM" className="bg-[#111111]">
                          Medium
                        </option>

                        <option value="HIGH" className="bg-[#111111]">
                          High
                        </option>

                        <option value="CRITICAL" className="bg-[#111111]">
                          Critical
                        </option>
                      </select>

                    </div>

                  </div>

                  {/* LOCATION */}
                  <div className="p-6 md:p-8 border-t border-white/10">

                    <label className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">
                      Location
                    </label>

                    <div className="relative">

                      <MapPin
                        size={17}
                        className="absolute left-0 top-1/2 -translate-y-1/2 text-white/25"
                      />

                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Block A — Room 204"
                        className="w-full bg-transparent text-sm text-white/80 placeholder:text-white/15 outline-none pl-7"
                        required
                      />

                    </div>

                  </div>

                </div>

                {/* RIGHT PANEL */}
                <div className="space-y-6">

                  {/* IMAGE */}
                  <div className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden">

                    <div className="p-6 border-b border-white/10">

                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                        Evidence
                      </p>

                      <h2 className="text-sm font-medium mt-2">
                        Add a photo
                      </h2>

                      <p className="text-xs text-white/25 mt-1 leading-relaxed">
                        A photo can help the maintenance team understand
                        the problem faster.
                      </p>

                    </div>

                    <div className="p-6">

                      {!image ? (
                        <label
                          htmlFor="issue-image"
                          className="group flex flex-col items-center justify-center min-h-48 rounded-xl border border-dashed border-white/15 hover:border-white/35 hover:bg-white/[0.03] cursor-pointer transition-all duration-300"
                        >

                          <div className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-black transition-all duration-300">
                            <Upload size={18} />
                          </div>

                          <p className="text-xs font-medium text-white/60">
                            Upload an image
                          </p>

                          <p className="text-[10px] text-white/25 mt-2">
                            JPG, PNG or JPEG
                          </p>

                        </label>
                      ) : (
                        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">

                          <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center">
                              <FileImage size={18} />
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-medium truncate">
                                {image.name}
                              </p>

                              <p className="text-[10px] text-white/25 mt-1">
                                Image selected
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={removeImage}
                              className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition"
                            >
                              <X size={15} />
                            </button>

                          </div>

                        </div>
                      )}

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

                  </div>

                  {/* SUBMIT */}
                  <div className="border border-white/10 rounded-2xl bg-white/[0.02] p-6">

                    <p className="text-xs text-white/30 leading-relaxed mb-5">
                      Your report will be sent to the FixFlow
                      maintenance workflow for review and assignment.
                    </p>

                    <button
                      type="submit"
                      className="group w-full flex items-center justify-center gap-3 bg-white text-black rounded-xl py-3.5 text-sm font-semibold hover:bg-white/90 transition-all duration-300"
                    >
                      <Send
                        size={16}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />

                      Submit issue
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate("/user")}
                      className="w-full mt-3 py-3 text-xs text-white/30 hover:text-white transition"
                    >
                      Cancel
                    </button>

                  </div>

                </div>

              </div>

            </form>

          </div>
        </main>
      </div>
    </div>
  );
}

export default ReportIssue;