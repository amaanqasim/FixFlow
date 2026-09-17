import React, { useState } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  BarChart3,
  Brain,
  Settings,
  History,
  QrCode,
  Download,
  Plus,
  MapPin,
} from "lucide-react";

import Navbar from "../../components/Navbar";

function QRManagement() {
  const [locations] = useState([
    {
      id: "QR-001",
      location: "Main Building - Ground Floor",
      status: "ACTIVE",
    },
    {
      id: "QR-002",
      location: "Main Building - First Floor",
      status: "ACTIVE",
    },
    {
      id: "QR-003",
      location: "Library",
      status: "ACTIVE",
    },
    {
      id: "QR-004",
      location: "Computer Laboratory",
      status: "ACTIVE",
    },
    {
      id: "QR-005",
      location: "Hostel",
      status: "ACTIVE",
    },
  ]);

  const [selectedLocation, setSelectedLocation] = useState(null);

  const generateQR = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex min-h-[calc(100vh-64px)]">

        {/* SIDEBAR */}
        <aside className="w-64 shrink-0 bg-slate-900 text-white flex flex-col">

          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <QrCode size={22} />
              </div>

              <div>
                <h2 className="font-bold text-lg">
                  Admin Panel
                </h2>

                <p className="text-xs text-slate-400">
                  FixFlow Management
                </p>
              </div>

            </div>
          </div>

          <nav className="p-4 space-y-2">

            <a
              href="/admin"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <LayoutDashboard size={19} />
              Dashboard
            </a>

            <a
              href="/admin/issues"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <ClipboardList size={19} />
              All Issues
            </a>

            <a
              href="/admin/users"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <Users size={19} />
              Manage Users
            </a>

            <a
              href="/admin/analytics"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <BarChart3 size={19} />
              Analytics
            </a>

            <a
              href="/admin/ai-insights"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <Brain size={19} />
              AI Insights
            </a>

            <a
              href="/admin/ai-analysis"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <QrCode size={19} />
              AI Issue Analysis
            </a>

            <a
              href="/admin/history"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <History size={19} />
              Issue History
            </a>

            <a
              href="/admin/qr"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white"
            >
              <QrCode size={19} />
              QR Management
            </a>

            <a
              href="/admin/settings"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <Settings size={19} />
              Settings
            </a>

          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-8">

          <div className="flex items-center justify-between mb-8">

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                QR Management
              </h1>

              <p className="text-slate-500 mt-2">
                Manage QR codes used for location-based issue reporting.
              </p>
            </div>

            <button
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
            >
              <Plus size={19} />
              Add Location
            </button>

          </div>

          {/* INFORMATION CARD */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">

            <div className="flex gap-4">

              <QrCode
                className="text-blue-600 mt-1"
                size={25}
              />

              <div>
                <h2 className="font-semibold text-blue-900">
                  QR Issue Reporting
                </h2>

                <p className="text-sm text-blue-800 mt-1">
                  Each QR code represents a specific location. Users can
                  scan the QR code to report an issue from that location.
                </p>
              </div>

            </div>

          </div>

          {/* QR TABLE */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">

            <div className="px-6 py-5 border-b border-slate-200">

              <h2 className="text-xl font-semibold text-slate-900">
                Location QR Codes
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Available QR codes for FixFlow locations
              </p>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-slate-50">

                  <tr>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      QR ID
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Location
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Status
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {locations.map((item) => (

                    <tr
                      key={item.id}
                      className="border-t border-slate-100"
                    >

                      <td className="px-6 py-5 font-semibold text-slate-800">
                        {item.id}
                      </td>

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2 text-slate-700">

                          <MapPin
                            size={18}
                            className="text-slate-400"
                          />

                          {item.location}

                        </div>

                      </td>

                      <td className="px-6 py-5">

                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                          {item.status}
                        </span>

                      </td>

                      <td className="px-6 py-5">

                        <button
                          onClick={() => generateQR(item)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
                        >
                          <QrCode size={17} />
                          Generate QR
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* QR PREVIEW */}
          {selectedLocation && (

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mt-8">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    QR Code Preview
                  </h2>

                  <p className="text-slate-500 mt-1">
                    {selectedLocation.location}
                  </p>

                </div>

                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Download size={18} />
                  Download QR
                </button>

              </div>

              <div className="flex justify-center">

                <div className="w-64 h-64 border-4 border-slate-900 rounded-xl flex flex-col items-center justify-center">

                  <QrCode size={170} strokeWidth={1.5} />

                  <p className="text-xs text-slate-500 mt-3">
                    {selectedLocation.id}
                  </p>

                </div>

              </div>

              <div className="text-center mt-6">

                <p className="font-semibold text-slate-800">
                  Scan to Report an Issue
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  Location: {selectedLocation.location}
                </p>

              </div>

            </div>

          )}

        </main>
      </div>
    </div>
  );
}

export default QRManagement;