import { AlertTriangle, Filter, Download } from 'lucide-react';
import { useEffect, useState } from "react";

// ✅ TYPE DEFINITION (IMPORTANT)
type AlertType = {
  id: string;
  time: string;
  location: string;
  type: string;
  severity: string;
  status: string;
};

const Alerts = () => {
  // ✅ FIXED TYPE
  const [alerts, setAlerts] = useState<AlertType[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/alerts")
      .then(res => res.json())
      .then((data: AlertType[]) => setAlerts(data));
  }, []);

  // ✅ ADD TYPES
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-red-100 text-red-700';
      case 'Monitoring':
        return 'bg-yellow-100 text-yellow-700';
      case 'Resolved':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'Accident' ? '🚨' : type === 'Traffic' ? '🚗' : '🚧';
  };

  // ✅ SAFE FILTER (no errors)
  const highCount = alerts.filter((a) => a.severity === "High").length;
  const mediumCount = alerts.filter((a) => a.severity === "Medium").length;
  const lowCount = alerts.filter((a) => a.severity === "Low").length;

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Alert Management</h1>
          <p className="text-gray-600 mt-1">Monitor and manage highway alerts in real-time</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg">
            <Filter size={18} />
            <span>Filter</span>
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-[#0b3d91] text-white rounded-lg">
            <Download size={18} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* ✅ DYNAMIC STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 shadow border-l-4 border-red-500">
          <p>High Severity</p>
          <h2 className="text-2xl font-bold">{highCount}</h2>
        </div>

        <div className="bg-white p-6 shadow border-l-4 border-yellow-500">
          <p>Medium Severity</p>
          <h2 className="text-2xl font-bold">{mediumCount}</h2>
        </div>

        <div className="bg-white p-6 shadow border-l-4 border-green-500">
          <p>Low Severity</p>
          <h2 className="text-2xl font-bold">{lowCount}</h2>
        </div>

      </div>

      {/* ✅ TABLE */}
      <div className="bg-white shadow border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>ID</th>
              <th>Time</th>
              <th>Location</th>
              <th>Type</th>
              <th>Severity</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {alerts.map((alert: AlertType) => (
              <tr key={alert.id}>
                <td>{alert.id}</td>
                <td>{alert.time}</td>
                <td>{alert.location}</td>
                <td>{getTypeIcon(alert.type)} {alert.type}</td>
                <td className={getSeverityColor(alert.severity)}>
                  {alert.severity}
                </td>
                <td className={getStatusColor(alert.status)}>
                  {alert.status}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Alerts;