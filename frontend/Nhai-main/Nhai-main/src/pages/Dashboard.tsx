import { Video, AlertCircle, MapPin } from 'lucide-react';
import { useEffect, useState } from "react";

// TYPE
type DashboardData = {
  accidents: number;
  traffic_density: number;
  alerts: number;
  cameras: number;
};

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  // ✅ EMERGENCY MODAL STATE
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/dashboard")
      .then(res => res.json())
      .then((data: DashboardData) => setData(data));
  }, []);

  const upload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://127.0.0.1:5000/api/detect", {
      method: "POST",
      body: formData
    });

    const result = await res.json();
    alert(`🚗 Vehicles: ${result.vehicles}\n🚦 Traffic: ${result.traffic}`);
  };

  const cameras = [
    { id: 1, location: 'NH-48, Delhi-Jaipur' },
    { id: 2, location: 'NH-44, Hyderabad-Nagpur' },
    { id: 3, location: 'NH-1, Delhi-Amritsar' },
    { id: 4, location: 'NH-8, Delhi-Mumbai' },
  ];

  const detections = [
    { type: 'Accident', count: data?.accidents || 0, bg: 'bg-red-100' },
    { type: 'Traffic', count: data?.traffic_density || 0, bg: 'bg-orange-100' },
    { type: 'Alerts', count: data?.alerts || 0, bg: 'bg-blue-100' },
    { type: 'Cameras', count: data?.cameras || 0, bg: 'bg-green-100' },
  ];

  if (!data) return <div className="p-6">Loading dashboard...</div>;

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">Live Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* CAMERAS */}
          <div className="bg-white p-4 shadow rounded">
            <h2 className="flex items-center gap-2 font-bold">
              <Video /> Live Camera Feeds
            </h2>

            <div className="grid grid-cols-2 gap-4 mt-4">
              {cameras.map((cam) => (
                <div key={cam.id} className="bg-black text-white p-4 rounded">
                  Camera {cam.id}
                  <p className="text-xs">{cam.location}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* AI DETECTION */}
          <div className="bg-white p-4 shadow rounded">
            <h2 className="flex gap-2 font-bold">
              <AlertCircle /> AI Detection
            </h2>

            <div className="space-y-3 mt-3">
              {detections.map((d, i) => (
                <div key={i} className={`${d.bg} p-2 rounded`}>
                  {d.type}: <b>{d.count}</b>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    upload(e.target.files[0]);
                  }
                }}
                className="border p-2"
              />
            </div>
          </div>

          {/* STATS */}
          <div className="bg-white p-4 shadow rounded">
            <h2 className="font-bold">Stats</h2>
            <p>Alerts: {data.alerts}</p>
            <p>Cameras: {data.cameras}</p>
            <p>Traffic: {data.traffic_density}%</p>
          </div>

          {/* 🚨 EMERGENCY RESPONSE (NOW WORKING) */}
          <div className="bg-blue-700 text-white p-4 rounded shadow">
            <h2 className="font-bold mb-2">Emergency Response</h2>
            <p className="text-sm mb-3">Rapid response teams on standby</p>

            <button
              onClick={() => setOpen(true)}
              className="w-full bg-white text-blue-700 py-2 rounded font-semibold"
            >
              Contact Control Room
            </button>
          </div>

        </div>

      </div>

      {/* 🗺️ MAP SECTION */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="flex items-center gap-2 font-bold mb-3">
          <MapPin /> Highway Network Map
        </h2>

        <div className="h-64 flex flex-col items-center justify-center text-gray-400 border border-dashed">
          <MapPin size={40} />
          <p className="mt-2 font-medium">India Highway Network</p>
          <p className="text-sm">Interactive map showing all monitored highways</p>
        </div>

        {/* ZONE STATUS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4 text-sm">

          <div className="bg-green-100 p-2 rounded">
            <b>North Zone</b><br/>
            NH-1, NH-44, NH-48<br/>
            <span className="text-green-600">Normal</span>
          </div>

          <div className="bg-red-100 p-2 rounded">
            <b>South Zone</b><br/>
            NH-44, NH-66, NH-75<br/>
            <span className="text-red-600">Heavy Traffic</span>
          </div>

          <div className="bg-green-100 p-2 rounded">
            <b>East Zone</b><br/>
            NH-2, NH-16, NH-27<br/>
            <span className="text-green-600">Normal</span>
          </div>

          <div className="bg-yellow-100 p-2 rounded">
            <b>West Zone</b><br/>
            NH-8, NH-48, NH-62<br/>
            <span className="text-yellow-600">Moderate</span>
          </div>

        </div>
      </div>

      {/* 🚨 MODAL POPUP */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg text-center w-80">
            <h2 className="text-xl font-bold mb-2">Emergency Contact</h2>
            <p className="mb-4">Call NHAI Control Room</p>
            <p className="text-2xl font-bold text-blue-700 mb-4">📞 1033</p>

            <button
              onClick={() => setOpen(false)}
              className="bg-blue-700 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;