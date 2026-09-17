import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  QrCode,
  Download,
  Plus,
  MapPin,
  CheckCircle,
  X,
} from "lucide-react";
import Navbar from "../../components/Navbar";

function QRManagement() {
  const [locations, setLocations] = useState([
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
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [newLocation, setNewLocation] = useState("");
  const [clickMessage, setClickMessage] = useState("");

  const generateQR = (location) => {
    setClickMessage(`QR selected for ${location.location}`);
    setSelectedLocation(location);
  };

  const getQRValue = (location) => {
    return `http://localhost:5173/user/report?location=${encodeURIComponent(
      location.location
    )}&qrId=${encodeURIComponent(location.id)}`;
  };

  const downloadQR = () => {
    if (!selectedLocation) return;

    const svg = document.getElementById("fixflow-qr");

    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);

    const blob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedLocation.id}-FixFlow-QR.svg`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const addLocation = () => {
    const trimmedLocation = newLocation.trim();

    if (!trimmedLocation) return;

    const newQRLocation = {
      id: `QR-${String(locations.length + 1).padStart(3, "0")}`,
      location: trimmedLocation,
      status: "ACTIVE",
    };

    setLocations([...locations, newQRLocation]);
    setNewLocation("");
    setShowAddLocation(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                QR Management
              </h1>

              <p className="text-gray-500 mt-1">
                Generate QR codes for issue reporting locations
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddLocation(true)}
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
            >
              <Plus size={20} />
              Add Location
            </button>
          </div>

          {/* Click confirmation */}
          {clickMessage && (
            <div className="mb-6 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle size={20} />
                <span>{clickMessage}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Location List */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-5">
                QR Locations
              </h2>

              <div className="space-y-4">
                {locations.map((location) => (
                  <div
                    key={location.id}
                    className="flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <MapPin
                          className="text-green-600"
                          size={22}
                        />
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {location.location}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {location.id}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 text-green-600 text-sm">
                        <CheckCircle size={16} />
                        {location.status}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => generateQR(location)}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      <QrCode size={18} />
                      Generate QR
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* QR Preview */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-5">
                QR Preview
              </h2>

              {selectedLocation ? (
                <div className="text-center">
                  <div className="flex justify-center mb-5">
                    <QRCodeSVG
                      id="fixflow-qr"
                      value={getQRValue(selectedLocation)}
                      size={220}
                      level="H"
                      includeMargin={true}
                    />
                  </div>

                  <h3 className="font-semibold text-gray-800">
                    {selectedLocation.location}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {selectedLocation.id}
                  </p>

                  <button
                    type="button"
                    onClick={downloadQR}
                    className="mt-5 w-full flex items-center justify-center gap-2 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-900"
                  >
                    <Download size={18} />
                    Download QR
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-80 text-center">
                  <div className="bg-gray-100 p-6 rounded-full mb-4">
                    <QrCode
                      size={60}
                      className="text-gray-400"
                    />
                  </div>

                  <h3 className="font-semibold text-gray-700">
                    No QR Selected
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    Click "Generate QR" for a location to preview its QR
                    code.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Location Modal */}
      {showAddLocation && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-gray-800">
                Add Location
              </h2>

              <button
                type="button"
                onClick={() => setShowAddLocation(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={22} />
              </button>
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location Name
            </label>

            <input
              type="text"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              placeholder="Enter location"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={() => setShowAddLocation(false)}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={addLocation}
                className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700"
              >
                Add Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QRManagement;